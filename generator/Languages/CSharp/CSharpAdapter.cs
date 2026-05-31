using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using DocGenerator.Markdown;
using DocGenerator.Model;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace DocGenerator.Languages.CSharp;

/// <summary>
/// Converts a directory of docfx ManagedReference YAML files into the unified
/// <see cref="ApiModel"/>. Each YAML file contains one type (or namespace) as its first
/// item followed by that type's members; a trailing <c>references</c> block maps uids to
/// friendly names. We build a uid→page map so intra-API <c>&lt;see cref&gt;</c> / parameter
/// type references resolve to real relative links.
/// </summary>
internal static class CSharpAdapter
{
    public static ApiModel Build(CSharpExtractResult extract)
    {
        var deserializer = new DeserializerBuilder()
            .WithNamingConvention(CamelCaseNamingConvention.Instance)
            .IgnoreUnmatchedProperties()
            .Build();

        var files = Directory.GetFiles(extract.YamlDir, "*.yml")
            .Where(f => !Path.GetFileName(f).Equals("toc.yml", StringComparison.OrdinalIgnoreCase))
            .Select(f =>
            {
                try { return deserializer.Deserialize<MrFile>(File.ReadAllText(f)); }
                catch { return null; }
            })
            .Where(f => f?.Items is { Count: > 0 })
            .Select(f => f!)
            .ToList();

        // Global reference table (uid -> friendly name) merged from every file.
        var refNames = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var f in files)
            foreach (var r in f.References ?? new List<MrReference>())
                if (!string.IsNullOrEmpty(r.Uid) && r.Name != null)
                    refNames.TryAdd(r.Uid, r.Name);

        // First pass: discover every in-API type so we can resolve links by uid.
        // uid (== fullName) -> (namespace, typeName)
        var typeIndex = new Dictionary<string, (string Ns, string Type)>(StringComparer.Ordinal);
        foreach (var f in files)
        {
            var head = f.Items![0];
            if (IsTypeKind(head.Type))
            {
                var typeName = head.Name ?? head.Uid ?? "";
                typeIndex[head.Uid ?? typeName] = (head.Namespace ?? "", typeName);
            }
        }

        var resolver = new CSharpRefResolver(typeIndex, refNames);

        var namespaces = new Dictionary<string, List<ApiType>>(StringComparer.Ordinal);

        foreach (var f in files)
        {
            var head = f.Items![0];
            if (!IsTypeKind(head.Type))
                continue; // namespace files: skip, namespaces are derived from types

            var nsName = head.Namespace ?? "";
            var type = BuildType(head, f.Items.Skip(1).ToList(), resolver);
            if (!namespaces.TryGetValue(nsName, out var list))
                namespaces[nsName] = list = new List<ApiType>();
            list.Add(type);
        }

        var nsModels = namespaces
            .OrderBy(kv => kv.Key, StringComparer.Ordinal)
            .Select(kv => new ApiNamespace
            {
                Name = kv.Key,
                Types = kv.Value.OrderBy(t => t.Name, StringComparer.Ordinal).ToList(),
            })
            .ToList();

        return new ApiModel
        {
            Language = "cs",
            DisplayName = "C#",
            PackageName = "Velopack",
            Version = extract.Version,
            Namespaces = nsModels,
        };
    }

    private static ApiType BuildType(MrItem head, List<MrItem> members, CSharpRefResolver resolver)
    {
        var kind = MapTypeKind(head.Type);
        var (obsolete, obsoleteMsg) = ReadObsolete(head);

        return new ApiType
        {
            Kind = kind,
            Name = head.Name ?? head.Uid ?? "",
            FullName = head.FullName ?? head.Uid ?? "",
            Namespace = head.Namespace ?? "",
            Summary = resolver.Doc(head.Summary),
            Remarks = resolver.Doc(head.Remarks),
            Signature = head.Syntax?.Content,
            TypeParameters = (head.TypeParameters ?? new List<MrTypeParam>()).Select(tp => tp.Id ?? "").Where(s => s.Length > 0).ToList(),
            BaseTypes = (head.Inheritance ?? new List<string>())
                .Where(uid => !IsObjectUid(uid))
                .Select(resolver.RefFor).Where(r => r != null).Select(r => r!).ToList(),
            Interfaces = (head.Implements ?? new List<string>()).Select(resolver.RefFor).Where(r => r != null).Select(r => r!).ToList(),
            IsObsolete = obsolete,
            ObsoleteMessage = obsoleteMsg,
            Members = members.Select(m => BuildMember(m, resolver)).Where(m => m != null).Select(m => m!).ToList(),
        };
    }

    private static ApiMember? BuildMember(MrItem item, CSharpRefResolver resolver)
    {
        var kind = MapMemberKind(item.Type);
        if (kind == null)
            return null;

        var (obsolete, obsoleteMsg) = ReadObsolete(item);

        ApiReturn? ret = null;
        if (item.Syntax?.Return != null)
        {
            ret = new ApiReturn
            {
                Type = resolver.RefFor(item.Syntax.Return.Type),
                Description = resolver.Doc(item.Syntax.Return.Description),
            };
        }

        var parameters = (item.Syntax?.Parameters ?? new List<MrParam>()).Select(p => new ApiParameter
        {
            Name = p.Id ?? "",
            Type = resolver.RefFor(p.Type),
            Description = resolver.Doc(p.Description),
        }).ToList();

        return new ApiMember
        {
            Kind = kind.Value,
            Name = StripParens(item.Name) ?? item.Id ?? "",
            Signature = item.Syntax?.Content,
            Summary = resolver.Doc(item.Summary),
            Remarks = resolver.Doc(item.Remarks),
            Returns = ret,
            Parameters = parameters,
            IsObsolete = obsolete,
            ObsoleteMessage = obsoleteMsg,
            Anchor = RenderHelpers.Anchor(item.Name ?? item.Id ?? ""),
        };
    }

    private static (bool, string?) ReadObsolete(MrItem item)
    {
        var attr = item.Attributes?.FirstOrDefault(a =>
            a.Type == "System.ObsoleteAttribute" || (a.Type?.EndsWith("ObsoleteAttribute") ?? false));
        if (attr == null)
            return (false, null);
        var msg = attr.Arguments?.FirstOrDefault()?.Value?.ToString();
        return (true, msg);
    }

    private static bool IsTypeKind(string? type) => MapTypeKindOrNull(type) != null;

    private static ApiTypeKind MapTypeKind(string? type) => MapTypeKindOrNull(type) ?? ApiTypeKind.Class;

    private static ApiTypeKind? MapTypeKindOrNull(string? type) => type switch
    {
        "Class" => ApiTypeKind.Class,
        "Struct" => ApiTypeKind.Struct,
        "Interface" => ApiTypeKind.Interface,
        "Enum" => ApiTypeKind.Enum,
        "Delegate" => ApiTypeKind.Delegate,
        _ => null,
    };

    private static ApiMemberKind? MapMemberKind(string? type) => type switch
    {
        "Constructor" => ApiMemberKind.Constructor,
        "Method" => ApiMemberKind.Method,
        "Property" => ApiMemberKind.Property,
        "Field" => ApiMemberKind.Field,
        "Event" => ApiMemberKind.Event,
        "Operator" => ApiMemberKind.Operator,
        _ => null,
    };

    private static bool IsObjectUid(string? uid)
        => uid == "System.Object" || uid == "object";

    private static string? StripParens(string? name)
    {
        if (name == null) return null;
        var idx = name.IndexOf('(');
        return idx >= 0 ? name[..idx] : name;
    }
}

// ── docfx YAML DTOs ──────────────────────────────────────────────────────────

internal sealed class MrFile
{
    public List<MrItem>? Items { get; set; }
    public List<MrReference>? References { get; set; }
}

internal sealed class MrItem
{
    public string? Uid { get; set; }
    public string? CommentId { get; set; }
    public string? Id { get; set; }
    public string? Parent { get; set; }
    public List<string>? Children { get; set; }
    public string? Name { get; set; }
    public string? NameWithType { get; set; }
    public string? FullName { get; set; }
    public string? Type { get; set; }
    public string? Namespace { get; set; }
    public string? Summary { get; set; }
    public string? Remarks { get; set; }
    public MrSyntax? Syntax { get; set; }
    public List<string>? Inheritance { get; set; }
    public List<string>? Implements { get; set; }
    public List<MrTypeParam>? TypeParameters { get; set; }
    public List<MrAttribute>? Attributes { get; set; }
}

internal sealed class MrSyntax
{
    public string? Content { get; set; }
    public List<MrParam>? Parameters { get; set; }

    [YamlMember(Alias = "return")]
    public MrReturn? Return { get; set; }
}

internal sealed class MrParam
{
    public string? Id { get; set; }
    public string? Type { get; set; }
    public string? Description { get; set; }
}

internal sealed class MrReturn
{
    public string? Type { get; set; }
    public string? Description { get; set; }
}

internal sealed class MrTypeParam
{
    public string? Id { get; set; }
    public string? Description { get; set; }
}

internal sealed class MrReference
{
    public string? Uid { get; set; }
    public string? Name { get; set; }
    public string? NameWithType { get; set; }
    public string? FullName { get; set; }
    public bool IsExternal { get; set; }
}

internal sealed class MrAttribute
{
    public string? Type { get; set; }
    public string? Ctor { get; set; }
    public List<MrAttributeArg>? Arguments { get; set; }
}

internal sealed class MrAttributeArg
{
    public string? Type { get; set; }
    public object? Value { get; set; }
}

// ── reference + doc-text resolution ──────────────────────────────────────────

/// <summary>
/// Resolves docfx uids to <see cref="ApiTypeRef"/>s (linking in-API types) and converts
/// docfx's HTML-ish doc dialect (<c>&lt;xref&gt;</c>, <c>&lt;c&gt;</c>, <c>&lt;para&gt;</c>, …)
/// into clean Markdown.
/// </summary>
internal sealed class CSharpRefResolver
{
    private readonly Dictionary<string, (string Ns, string Type)> _typeIndex;
    private readonly Dictionary<string, string> _refNames;

    public CSharpRefResolver(Dictionary<string, (string Ns, string Type)> typeIndex, Dictionary<string, string> refNames)
    {
        _typeIndex = typeIndex;
        _refNames = refNames;
    }

    /// <summary>Build an <see cref="ApiTypeRef"/> for a docfx type uid.</summary>
    public ApiTypeRef? RefFor(string? uid)
    {
        if (string.IsNullOrEmpty(uid))
            return null;

        var display = FriendlyName(uid);
        var href = HrefForUid(uid);
        return new ApiTypeRef(display, href);
    }

    private string? HrefForUid(string uid)
    {
        // Strip generic argument encoding, e.g. Task{Velopack.UpdateInfo} -> Task ; we
        // only link the outermost simple type. Nested generic args still render as text.
        var bare = StripGeneric(uid);
        if (_typeIndex.TryGetValue(bare, out var loc))
            return MarkdownWriter.PageHref(loc.Ns, loc.Type);
        return null;
    }

    private string FriendlyName(string uid)
    {
        if (_refNames.TryGetValue(uid, out var name))
            return name;
        // Fall back to the last dotted segment of the uid. Member crefs (methods/properties)
        // arrive URL-encoded with a parameter list (e.g.
        // "Velopack.UpdateManager.ApplyUpdatesAndRestart(Velopack.VelopackAsset,System.String%5b%5d)");
        // decode and drop the parameter list so we render the member name, not "String%5b%5d)".
        var bare = StripGeneric(System.Net.WebUtility.UrlDecode(uid));
        var paren = bare.IndexOf('(');
        if (paren >= 0) bare = bare[..paren];
        var idx = bare.LastIndexOf('.');
        return idx >= 0 ? bare[(idx + 1)..] : bare;
    }

    private static string StripGeneric(string uid)
    {
        var brace = uid.IndexOf('{');
        if (brace >= 0) uid = uid[..brace];
        var tick = uid.IndexOf('`');
        if (tick >= 0) uid = uid[..tick];
        return uid;
    }

    /// <summary>Convert a docfx doc-comment string to Markdown with resolved links.</summary>
    public string? Doc(string? text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return null;

        var s = text;

        // <xref href="UID" ...>label?</xref>  →  link or inline code
        s = Regex.Replace(s, "<xref\\s+[^>]*?href=\"([^\"]+)\"[^>]*?>(.*?)</xref>", m =>
        {
            var uid = System.Net.WebUtility.HtmlDecode(m.Groups[1].Value);
            var label = m.Groups[2].Value;
            return RenderXref(uid, label);
        }, RegexOptions.Singleline);
        // self-closing xref
        s = Regex.Replace(s, "<xref\\s+[^>]*?href=\"([^\"]+)\"[^>]*?/>", m =>
        {
            var uid = System.Net.WebUtility.HtmlDecode(m.Groups[1].Value);
            return RenderXref(uid, "");
        }, RegexOptions.Singleline);

        // inline code
        s = Regex.Replace(s, "</?code>", "`", RegexOptions.IgnoreCase);
        s = Regex.Replace(s, "<c>(.*?)</c>", "`$1`", RegexOptions.Singleline | RegexOptions.IgnoreCase);

        // paragraphs / line breaks
        s = Regex.Replace(s, "</?para>", "\n\n", RegexOptions.IgnoreCase);
        s = Regex.Replace(s, "<br\\s*/?>", "\n", RegexOptions.IgnoreCase);

        // strip any remaining tags
        s = Regex.Replace(s, "<[^>]+>", "");

        s = System.Net.WebUtility.HtmlDecode(s);
        s = Regex.Replace(s, "[ \t]+", " ");
        s = Regex.Replace(s, "\n{3,}", "\n\n");
        return s.Trim();
    }

    private string RenderXref(string uid, string label)
    {
        var bare = StripGeneric(uid);
        var name = !string.IsNullOrWhiteSpace(label)
            ? label
            : FriendlyName(uid);
        if (_typeIndex.TryGetValue(bare, out var loc))
            return $"[`{name}`]({MarkdownWriter.PageHref(loc.Ns, loc.Type)})";
        return $"`{name}`";
    }
}
