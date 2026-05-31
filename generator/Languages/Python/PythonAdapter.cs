using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using DocGenerator.Markdown;
using DocGenerator.Model;

namespace DocGenerator.Languages.Python;

/// <summary>
/// Converts the introspection JSON produced by <c>introspect.py</c> into the unified
/// <see cref="ApiModel"/>. Python is flat: classes/enums across all (sub)modules become type
/// pages in one unnamed namespace, and free functions are collected into a <c>Functions</c>
/// page. Type annotations that name an in-API class resolve to relative links.
/// </summary>
internal static class PythonAdapter
{
    public static ApiModel Build(PythonExtractResult extract)
    {
        using var doc = JsonDocument.Parse(File.ReadAllText(extract.JsonFile));
        var root = doc.RootElement;
        var modules = root.TryGetProperty("modules", out var m) && m.ValueKind == JsonValueKind.Array
            ? m.EnumerateArray().ToList()
            : new List<JsonElement>();

        // Index class/enum names for link resolution.
        var typeNames = new HashSet<string>(StringComparer.Ordinal);
        foreach (var mod in modules)
        {
            foreach (var cls in Arr(mod, "classes")) typeNames.Add(Str(cls, "name"));
            foreach (var en in Arr(mod, "enums")) typeNames.Add(Str(en, "name"));
        }
        var resolver = new PyResolver(typeNames);

        var types = new List<ApiType>();
        var freeFunctions = new List<ApiMember>();
        var seen = new HashSet<string>(StringComparer.Ordinal);

        foreach (var mod in modules)
        {
            foreach (var cls in Arr(mod, "classes"))
            {
                var name = Str(cls, "name");
                if (name.Length == 0 || !seen.Add("c:" + name)) continue;
                types.Add(BuildClass(cls, resolver));
            }
            foreach (var en in Arr(mod, "enums"))
            {
                var name = Str(en, "name");
                if (name.Length == 0 || !seen.Add("e:" + name)) continue;
                types.Add(BuildEnum(en, resolver));
            }
            foreach (var fn in Arr(mod, "functions"))
            {
                var name = Str(fn, "name");
                if (name.Length == 0 || !seen.Add("f:" + name)) continue;
                freeFunctions.Add(BuildMember(fn, resolver));
            }
        }

        if (freeFunctions.Count > 0)
        {
            types.Add(new ApiType
            {
                Kind = ApiTypeKind.FreeFunctionGroup,
                Name = "Functions",
                FullName = "Functions",
                Namespace = "",
                Summary = "Module-level functions exported by the package.",
                Members = freeFunctions,
            });
        }

        // The update-source classes form an obvious family, so we lift them into a synthetic
        // "Sources" namespace (rendered as a Sources/ sub-folder) like the C++ reference does,
        // while everything else stays at the language root. Presentation grouping only.
        var namespaces = new List<ApiNamespace>
        {
            new() { Name = "", Types = TypesIn(types, "") },
        };
        var sourceTypes = TypesIn(types, "Sources");
        if (sourceTypes.Count > 0)
            namespaces.Add(new()
            {
                Name = "Sources",
                Summary = "Built-in update sources for fetching release feeds and downloading assets.",
                Types = sourceTypes,
            });

        return new ApiModel
        {
            Language = "py",
            DisplayName = "Python",
            PackageName = "velopack",
            Version = extract.Version,
            Namespaces = namespaces,
        };
    }

    /// <summary>Update-source types (anything whose name contains "Source") are grouped together.</summary>
    private static bool IsSourceName(string name) => name.Contains("Source", StringComparison.Ordinal);

    private static List<ApiType> TypesIn(IEnumerable<ApiType> types, string ns)
        => types.Where(t => t.Namespace == ns).OrderBy(t => t.Name, StringComparer.Ordinal).ToList();

    private static ApiType BuildClass(JsonElement cls, PyResolver resolver)
    {
        var name = Str(cls, "name");
        var bases = Arr(cls, "bases").Select(b => resolver.Ref(b.GetString() ?? "")).Where(r => r != null).Select(r => r!).ToList();
        return new ApiType
        {
            Kind = ApiTypeKind.Class,
            Name = name,
            FullName = Str(cls, "qualname", name),
            Namespace = IsSourceName(name) ? "Sources" : "",
            Summary = Doc(cls),
            Signature = BuildClassSignature(name, bases),
            BaseTypes = bases,
            Members = Arr(cls, "members").Select(mem => BuildMember(mem, resolver)).ToList(),
        };
    }

    private static ApiType BuildEnum(JsonElement en, PyResolver resolver)
    {
        var name = Str(en, "name");
        var values = Arr(en, "values").Select(v => new ApiMember
        {
            Kind = ApiMemberKind.EnumValue,
            Name = Str(v, "name"),
            Summary = JoinDocValue(Doc(v), Str(v, "value")),
            Anchor = RenderHelpers.Anchor(Str(v, "name")),
        }).ToList();
        return new ApiType
        {
            Kind = ApiTypeKind.Enum,
            Name = name,
            FullName = name,
            Namespace = "",
            Summary = Doc(en),
            Signature = $"class {name}(Enum)",
            Members = values,
        };
    }

    private static ApiMember BuildMember(JsonElement mem, PyResolver resolver)
    {
        var kind = Str(mem, "kind") switch
        {
            "property" => ApiMemberKind.Property,
            "attribute" => ApiMemberKind.Field,
            "constructor" => ApiMemberKind.Constructor,
            _ => ApiMemberKind.Method,
        };
        var name = Str(mem, "name");

        var parameters = Arr(mem, "params").Select(p => new ApiParameter
        {
            Name = Str(p, "name"),
            Type = resolver.Ref(NullableStr(p, "annotation")),
            Default = NullableStr(p, "default"),
            Optional = NullableStr(p, "default") != null,
        }).ToList();

        ApiReturn? returns = null;
        var retType = resolver.Ref(NullableStr(mem, "returns"));
        if (retType != null)
            returns = new ApiReturn { Type = retType };

        // Build the signature from the (already self-free) parameter list rather than the raw
        // __text_signature__, which carries Python's implicit `self, /` positional-only marker.
        bool callable = kind is ApiMemberKind.Method or ApiMemberKind.Constructor;
        return new ApiMember
        {
            Kind = kind,
            Name = name,
            Signature = callable ? BuildCallableSignature(name, parameters) : name,
            Summary = Doc(mem),
            Parameters = parameters,
            Returns = returns,
            Anchor = RenderHelpers.Anchor(name),
        };
    }

    private static string BuildCallableSignature(string name, IReadOnlyList<ApiParameter> ps)
    {
        var parts = ps.Select(p => p.Default != null ? $"{p.Name}={p.Default}" : p.Name);
        return $"{name}({string.Join(", ", parts)})";
    }

    private static string BuildClassSignature(string name, IReadOnlyList<ApiTypeRef> bases)
        => bases.Count > 0 ? $"class {name}({string.Join(", ", bases.Select(b => b.Name))})" : $"class {name}";

    private static string? JoinDocValue(string? doc, string? value)
    {
        var parts = new List<string>();
        if (!string.IsNullOrEmpty(value)) parts.Add($"`= {value}`");
        if (!string.IsNullOrEmpty(doc)) parts.Add(doc);
        return parts.Count > 0 ? string.Join(" — ", parts) : null;
    }

    // ── JSON helpers ─────────────────────────────────────────────────────────

    private static IEnumerable<JsonElement> Arr(JsonElement el, string name)
        => el.TryGetProperty(name, out var a) && a.ValueKind == JsonValueKind.Array
            ? a.EnumerateArray()
            : Enumerable.Empty<JsonElement>();

    private static string Str(JsonElement el, string name, string fallback = "")
        => el.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.String ? v.GetString() ?? fallback : fallback;

    private static string? NullableStr(JsonElement el, string name)
        => el.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.String ? v.GetString() : null;

    private static string? Doc(JsonElement el)
    {
        var d = NullableStr(el, "doc");
        return string.IsNullOrWhiteSpace(d) ? null : d;
    }
}

/// <summary>Resolves Python type-annotation strings to <see cref="ApiTypeRef"/>s.</summary>
internal sealed class PyResolver
{
    private readonly HashSet<string> _typeNames;
    public PyResolver(HashSet<string> typeNames) => _typeNames = typeNames;

    public ApiTypeRef? Ref(string? annotation)
    {
        if (string.IsNullOrWhiteSpace(annotation) || annotation == "None")
            return null;
        // Link when the (possibly bare) annotation names an in-API type.
        var bare = annotation.Trim();
        if (_typeNames.Contains(bare))
            return new ApiTypeRef(bare, MarkdownWriter.PageHref("", bare));
        return new ApiTypeRef(annotation);
    }
}
