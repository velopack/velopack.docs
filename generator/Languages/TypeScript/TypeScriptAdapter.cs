using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using DocGenerator.Markdown;
using DocGenerator.Model;

namespace DocGenerator.Languages.TypeScript;

/// <summary>
/// Converts a TypeDoc JSON model into the unified <see cref="ApiModel"/>. JavaScript is a
/// "flat" language: everything lives in a single unnamed namespace. Classes / interfaces /
/// enums become type pages; top-level functions and variables are packed into a synthetic
/// <c>Functions</c> page (a <see cref="ApiTypeKind.FreeFunctionGroup"/>).
/// </summary>
internal static class TypeScriptAdapter
{
    // TypeDoc ReflectionKind bit values.
    private const int KindEnum = 8;
    private const int KindEnumMember = 16;
    private const int KindVariable = 32;
    private const int KindFunction = 64;
    private const int KindClass = 128;
    private const int KindInterface = 256;
    private const int KindConstructor = 512;
    private const int KindProperty = 1024;
    private const int KindMethod = 2048;
    private const int KindAccessor = 262144;

    public static ApiModel Build(TypeScriptExtractResult extract)
    {
        using var doc = JsonDocument.Parse(File.ReadAllText(extract.JsonFile));
        var root = doc.RootElement;

        var children = root.TryGetProperty("children", out var c) && c.ValueKind == JsonValueKind.Array
            ? c.EnumerateArray().ToList()
            : new List<JsonElement>();

        // Index linkable types by TypeDoc id so references can resolve to page links.
        var idToName = new Dictionary<int, string>();
        foreach (var ch in children)
        {
            var kind = Kind(ch);
            if (kind is KindClass or KindInterface or KindEnum)
                idToName[Id(ch)] = Name(ch);
        }
        var resolver = new TsResolver(idToName);

        var types = new List<ApiType>();
        var freeFunctions = new List<ApiMember>();

        foreach (var ch in children)
        {
            switch (Kind(ch))
            {
                case KindClass: types.Add(BuildType(ch, ApiTypeKind.Class, resolver)); break;
                case KindInterface: types.Add(BuildType(ch, ApiTypeKind.Interface, resolver)); break;
                case KindEnum: types.Add(BuildEnum(ch, resolver)); break;
                case KindFunction: freeFunctions.Add(BuildFunction(ch, resolver)); break;
                case KindVariable: freeFunctions.Add(BuildVariable(ch, resolver)); break;
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
                Summary = "Top-level functions and values exported by the package.",
                Members = freeFunctions,
            });
        }

        return new ApiModel
        {
            Language = "js",
            DisplayName = "JavaScript",
            PackageName = "velopack",
            Version = extract.Version,
            Namespaces = new List<ApiNamespace>
            {
                new() { Name = "", Types = types.OrderBy(t => t.Name, StringComparer.Ordinal).ToList() },
            },
        };
    }

    private static ApiType BuildType(JsonElement el, ApiTypeKind kind, TsResolver resolver)
    {
        var name = Name(el);
        var (summary, remarks, obsolete, obsoleteMsg) = ReadComment(el, resolver);
        var members = new List<ApiMember>();

        foreach (var m in Children(el))
        {
            switch (Kind(m))
            {
                case KindConstructor: members.Add(BuildCallable(m, ApiMemberKind.Constructor, resolver)); break;
                case KindMethod: members.Add(BuildCallable(m, ApiMemberKind.Method, resolver)); break;
                case KindProperty: members.Add(BuildProperty(m, resolver)); break;
                case KindAccessor: members.Add(BuildProperty(m, resolver)); break;
            }
        }

        return new ApiType
        {
            Kind = kind,
            Name = name,
            FullName = name,
            Namespace = "",
            Summary = summary,
            Remarks = remarks,
            Signature = BuildTypeSignature(el, kind, name, resolver),
            TypeParameters = TypeParameterNames(el),
            BaseTypes = TypeRefList(el, "extendedTypes", resolver),
            Interfaces = TypeRefList(el, "implementedTypes", resolver),
            IsObsolete = obsolete,
            ObsoleteMessage = obsoleteMsg,
            Members = members,
        };
    }

    private static ApiType BuildEnum(JsonElement el, TsResolver resolver)
    {
        var name = Name(el);
        var (summary, remarks, obsolete, obsoleteMsg) = ReadComment(el, resolver);
        var values = Children(el)
            .Where(m => Kind(m) == KindEnumMember)
            .Select(m =>
            {
                var (s, _, o, om) = ReadComment(m, resolver);
                return new ApiMember
                {
                    Kind = ApiMemberKind.EnumValue,
                    Name = Name(m),
                    Summary = s,
                    IsObsolete = o,
                    ObsoleteMessage = om,
                    Anchor = RenderHelpers.Anchor(Name(m)),
                };
            }).ToList();

        return new ApiType
        {
            Kind = ApiTypeKind.Enum,
            Name = name,
            FullName = name,
            Namespace = "",
            Summary = summary,
            Remarks = remarks,
            Signature = $"enum {name}",
            IsObsolete = obsolete,
            ObsoleteMessage = obsoleteMsg,
            Members = values,
        };
    }

    private static ApiMember BuildCallable(JsonElement el, ApiMemberKind kind, TsResolver resolver)
    {
        var name = Name(el);
        var sig = FirstSignature(el);
        var (summary, remarks, obsolete, obsoleteMsg) = sig.HasValue
            ? ReadComment(sig.Value, resolver)
            : ReadComment(el, resolver);

        var parameters = sig.HasValue ? ReadParameters(sig.Value, resolver) : new List<ApiParameter>();
        var returns = sig.HasValue ? ReadReturns(sig.Value, resolver) : null;

        return new ApiMember
        {
            Kind = kind,
            Name = name,
            Signature = BuildCallableSignature(name, kind, sig, resolver),
            Summary = summary,
            Remarks = remarks,
            Parameters = parameters,
            Returns = kind == ApiMemberKind.Constructor ? null : returns,
            Modifiers = Modifiers(el),
            IsObsolete = obsolete,
            ObsoleteMessage = obsoleteMsg,
            Anchor = RenderHelpers.Anchor(name + "-" + string.Join("-", parameters.Select(p => p.Name))),
        };
    }

    private static ApiMember BuildProperty(JsonElement el, TsResolver resolver)
    {
        var name = Name(el);
        var (summary, remarks, obsolete, obsoleteMsg) = ReadComment(el, resolver);
        var typeRef = el.TryGetProperty("type", out var t) ? resolver.RefForType(t) : null;
        var sig = typeRef != null ? $"{name}: {typeRef.Name}" : name;

        return new ApiMember
        {
            Kind = ApiMemberKind.Property,
            Name = name,
            Signature = sig,
            Summary = summary,
            Remarks = remarks,
            Returns = typeRef != null ? new ApiReturn { Type = typeRef } : null,
            Modifiers = Modifiers(el),
            IsObsolete = obsolete,
            ObsoleteMessage = obsoleteMsg,
            Anchor = RenderHelpers.Anchor(name),
        };
    }

    private static ApiMember BuildFunction(JsonElement el, TsResolver resolver)
        => BuildCallable(el, ApiMemberKind.Method, resolver);

    private static ApiMember BuildVariable(JsonElement el, TsResolver resolver)
    {
        var name = Name(el);
        var (summary, remarks, obsolete, obsoleteMsg) = ReadComment(el, resolver);
        var typeRef = el.TryGetProperty("type", out var t) ? resolver.RefForType(t) : null;
        return new ApiMember
        {
            Kind = ApiMemberKind.Field,
            Name = name,
            Signature = typeRef != null ? $"const {name}: {typeRef.Name}" : $"const {name}",
            Summary = summary,
            Remarks = remarks,
            Returns = typeRef != null ? new ApiReturn { Type = typeRef } : null,
            IsObsolete = obsolete,
            ObsoleteMessage = obsoleteMsg,
            Anchor = RenderHelpers.Anchor(name),
        };
    }

    // ── signature synthesis ──────────────────────────────────────────────────

    private static string BuildTypeSignature(JsonElement el, ApiTypeKind kind, string name, TsResolver resolver)
    {
        var keyword = kind == ApiTypeKind.Interface ? "interface" : "class";
        var sb = new StringBuilder(keyword).Append(' ').Append(name);
        var tps = TypeParameterNames(el);
        if (tps.Count > 0) sb.Append('<').Append(string.Join(", ", tps)).Append('>');

        var bases = TypeRefList(el, "extendedTypes", resolver);
        if (bases.Count > 0) sb.Append(" extends ").Append(string.Join(", ", bases.Select(b => b.Name)));
        var impls = TypeRefList(el, "implementedTypes", resolver);
        if (impls.Count > 0) sb.Append(" implements ").Append(string.Join(", ", impls.Select(b => b.Name)));
        return sb.ToString();
    }

    private static string BuildCallableSignature(string name, ApiMemberKind kind, JsonElement? sig, TsResolver resolver)
    {
        var sb = new StringBuilder(name).Append('(');
        if (sig.HasValue)
        {
            var ps = ReadParameters(sig.Value, resolver);
            sb.Append(string.Join(", ", ps.Select(p =>
                $"{p.Name}{(p.Optional ? "?" : "")}: {p.Type?.Name ?? "any"}")));
        }
        sb.Append(')');
        if (kind != ApiMemberKind.Constructor && sig.HasValue && sig.Value.TryGetProperty("type", out var rt))
            sb.Append(": ").Append(resolver.RenderType(rt));
        return sb.ToString();
    }

    // ── comment + parameter parsing ──────────────────────────────────────────

    private static (string? summary, string? remarks, bool obsolete, string? obsoleteMsg) ReadComment(JsonElement el, TsResolver resolver)
    {
        if (!el.TryGetProperty("comment", out var comment) || comment.ValueKind != JsonValueKind.Object)
            return (null, null, false, null);

        string? summary = comment.TryGetProperty("summary", out var s) ? resolver.RenderCommentParts(s) : null;
        string? remarks = null;
        bool obsolete = false;
        string? obsoleteMsg = null;

        if (comment.TryGetProperty("blockTags", out var tags) && tags.ValueKind == JsonValueKind.Array)
        {
            foreach (var tag in tags.EnumerateArray())
            {
                var tagName = tag.TryGetProperty("tag", out var tn) ? tn.GetString() : null;
                var content = tag.TryGetProperty("content", out var ct) ? resolver.RenderCommentParts(ct) : null;
                switch (tagName)
                {
                    case "@remarks": remarks = content; break;
                    case "@deprecated": obsolete = true; obsoleteMsg = content; break;
                }
            }
        }
        return (Nullify(summary), Nullify(remarks), obsolete, Nullify(obsoleteMsg));
    }

    private static List<ApiParameter> ReadParameters(JsonElement sig, TsResolver resolver)
    {
        if (!sig.TryGetProperty("parameters", out var ps) || ps.ValueKind != JsonValueKind.Array)
            return new List<ApiParameter>();

        return ps.EnumerateArray().Select(p =>
        {
            var optional = p.TryGetProperty("flags", out var f) && f.TryGetProperty("isOptional", out var io) && io.ValueKind == JsonValueKind.True;
            string? desc = null;
            if (p.TryGetProperty("comment", out var pc) && pc.TryGetProperty("summary", out var psum))
                desc = resolver.RenderCommentParts(psum);
            return new ApiParameter
            {
                Name = Name(p),
                Type = p.TryGetProperty("type", out var t) ? resolver.RefForType(t) : null,
                Description = Nullify(desc),
                Default = p.TryGetProperty("defaultValue", out var dv) ? dv.GetString() : null,
                Optional = optional,
            };
        }).ToList();
    }

    private static ApiReturn? ReadReturns(JsonElement sig, TsResolver resolver)
    {
        var typeRef = sig.TryGetProperty("type", out var t) ? resolver.RefForType(t) : null;
        string? desc = null;
        if (sig.TryGetProperty("comment", out var c) && c.TryGetProperty("blockTags", out var tags) && tags.ValueKind == JsonValueKind.Array)
        {
            foreach (var tag in tags.EnumerateArray())
                if (tag.TryGetProperty("tag", out var tn) && tn.GetString() == "@returns")
                    desc = tag.TryGetProperty("content", out var ct) ? resolver.RenderCommentParts(ct) : null;
        }
        if (typeRef == null && desc == null) return null;
        return new ApiReturn { Type = typeRef, Description = Nullify(desc) };
    }

    // ── small JSON helpers ───────────────────────────────────────────────────

    private static int Kind(JsonElement el) => el.TryGetProperty("kind", out var k) && k.ValueKind == JsonValueKind.Number ? k.GetInt32() : 0;
    private static int Id(JsonElement el) => el.TryGetProperty("id", out var k) && k.ValueKind == JsonValueKind.Number ? k.GetInt32() : 0;
    private static string Name(JsonElement el) => el.TryGetProperty("name", out var n) ? n.GetString() ?? "" : "";

    private static IEnumerable<JsonElement> Children(JsonElement el)
        => el.TryGetProperty("children", out var c) && c.ValueKind == JsonValueKind.Array
            ? c.EnumerateArray()
            : Enumerable.Empty<JsonElement>();

    private static JsonElement? FirstSignature(JsonElement el)
        => el.TryGetProperty("signatures", out var s) && s.ValueKind == JsonValueKind.Array && s.GetArrayLength() > 0
            ? s[0]
            : (JsonElement?)null;

    private static List<string> TypeParameterNames(JsonElement el)
    {
        foreach (var key in new[] { "typeParameters", "typeParameter" })
            if (el.TryGetProperty(key, out var tp) && tp.ValueKind == JsonValueKind.Array)
                return tp.EnumerateArray().Select(Name).Where(n => n.Length > 0).ToList();
        return new List<string>();
    }

    private static List<ApiTypeRef> TypeRefList(JsonElement el, string key, TsResolver resolver)
        => el.TryGetProperty(key, out var arr) && arr.ValueKind == JsonValueKind.Array
            ? arr.EnumerateArray().Select(resolver.RefForType).Where(r => r != null).Select(r => r!).ToList()
            : new List<ApiTypeRef>();

    private static List<string> Modifiers(JsonElement el)
    {
        var mods = new List<string>();
        if (el.TryGetProperty("flags", out var f) && f.ValueKind == JsonValueKind.Object)
        {
            if (Flag(f, "isStatic")) mods.Add("static");
            if (Flag(f, "isReadonly")) mods.Add("readonly");
            if (Flag(f, "isAbstract")) mods.Add("abstract");
        }
        return mods;
    }

    private static bool Flag(JsonElement flags, string name)
        => flags.TryGetProperty(name, out var v) && v.ValueKind == JsonValueKind.True;

    private static string? Nullify(string? s) => string.IsNullOrWhiteSpace(s) ? null : s;
}

/// <summary>Resolves TypeDoc types and comment parts to Markdown + intra-API links.</summary>
internal sealed class TsResolver
{
    private readonly Dictionary<int, string> _idToName;

    public TsResolver(Dictionary<int, string> idToName) => _idToName = idToName;

    /// <summary>Build an <see cref="ApiTypeRef"/> for a TypeDoc type node.</summary>
    public ApiTypeRef? RefForType(JsonElement type)
    {
        if (type.ValueKind != JsonValueKind.Object) return null;
        var display = RenderType(type);
        // Link only when the outermost node is a reference to an in-API type.
        if (type.TryGetProperty("type", out var tt) && tt.GetString() == "reference" &&
            type.TryGetProperty("target", out var target) && target.ValueKind == JsonValueKind.Number &&
            _idToName.TryGetValue(target.GetInt32(), out var name))
        {
            return new ApiTypeRef(display, MarkdownWriter.PageHref("", name));
        }
        return new ApiTypeRef(display);
    }

    /// <summary>Render a TypeDoc type node to a TypeScript-ish string.</summary>
    public string RenderType(JsonElement type)
    {
        if (type.ValueKind != JsonValueKind.Object) return "any";
        var kind = type.TryGetProperty("type", out var t) ? t.GetString() : null;
        switch (kind)
        {
            case "literal":
                // A literal type node: null / true / false / "str" / 42.
                return type.TryGetProperty("value", out var lit) ? RenderLiteral(lit) : "any";
            case "intrinsic":
            case "reference":
            {
                var name = type.TryGetProperty("name", out var n) ? n.GetString() ?? "" :
                           type.TryGetProperty("value", out var v) ? v.ToString() : "any";
                if (type.TryGetProperty("typeArguments", out var ta) && ta.ValueKind == JsonValueKind.Array && ta.GetArrayLength() > 0)
                    name += "<" + string.Join(", ", ta.EnumerateArray().Select(RenderType)) + ">";
                return name;
            }
            case "array":
                return type.TryGetProperty("elementType", out var et) ? RenderType(et) + "[]" : "any[]";
            case "union":
                return type.TryGetProperty("types", out var ut) ? string.Join(" | ", ut.EnumerateArray().Select(RenderType)) : "any";
            case "intersection":
                return type.TryGetProperty("types", out var it) ? string.Join(" & ", it.EnumerateArray().Select(RenderType)) : "any";
            case "reflection":
                return "object";
            default:
                return type.TryGetProperty("name", out var dn) ? dn.GetString() ?? "any" : "any";
        }
    }

    /// <summary>Render a TypeDoc literal type value (null / bool / string / number) to its TS source form.</summary>
    private static string RenderLiteral(JsonElement value) => value.ValueKind switch
    {
        JsonValueKind.Null => "null",
        JsonValueKind.True => "true",
        JsonValueKind.False => "false",
        JsonValueKind.String => $"\"{value.GetString()}\"",
        _ => value.ToString(),
    };

    /// <summary>Render a TypeDoc comment "parts" array (summary / tag content) to Markdown.</summary>
    public string RenderCommentParts(JsonElement parts)
    {
        if (parts.ValueKind != JsonValueKind.Array) return "";
        var sb = new StringBuilder();
        foreach (var part in parts.EnumerateArray())
        {
            var kind = part.TryGetProperty("kind", out var k) ? k.GetString() : null;
            var text = part.TryGetProperty("text", out var tx) ? tx.GetString() ?? "" : "";
            switch (kind)
            {
                case "text": sb.Append(text); break;
                case "code": sb.Append(text); break; // already includes backticks
                case "inline-tag":
                    // {@link Target} — link to in-API type when the target resolves.
                    if (part.TryGetProperty("target", out var tgt) && tgt.ValueKind == JsonValueKind.Number &&
                        _idToName.TryGetValue(tgt.GetInt32(), out var name))
                        sb.Append($"[`{name}`]({MarkdownWriter.PageHref("", name)})");
                    else
                        sb.Append('`').Append(text).Append('`');
                    break;
                default: sb.Append(text); break;
            }
        }
        return sb.ToString().Trim();
    }
}
