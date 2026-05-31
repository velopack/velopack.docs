using System.Collections.Generic;

namespace DocGenerator.Model;

/// <summary>
/// Language-agnostic, serializable description of a public API surface.
///
/// This is the single contract that every language pipeline produces:
///
///     source artifact ──extractor──▶ machine format ──adapter──▶ ApiModel ──MarkdownWriter──▶ docs
///
/// Each per-language adapter is responsible for translating its tool's doc dialect
/// (XML <c>&lt;see cref&gt;</c>, TSDoc <c>{@link}</c>, standardese refs, Python docstrings)
/// into <b>Markdown strings</b> with intra-API links already resolved into
/// <see cref="ApiTypeRef.Href"/>. The generator never sees the original dialect.
/// </summary>
public sealed record ApiModel
{
    /// <summary>Output directory slug + code-fence language id (e.g. <c>cs</c>, <c>js</c>, <c>cpp</c>, <c>py</c>).</summary>
    public required string Language { get; init; }

    /// <summary>Human-facing language name shown on the overview page (e.g. <c>C#</c>, <c>JavaScript</c>).</summary>
    public required string DisplayName { get; init; }

    /// <summary>Source package id (e.g. <c>Velopack</c>, <c>velopack</c>).</summary>
    public required string PackageName { get; init; }

    /// <summary>Resolved version of the source artifact, if known.</summary>
    public string? Version { get; init; }

    public IReadOnlyList<ApiNamespace> Namespaces { get; init; } = new List<ApiNamespace>();
}

/// <summary>
/// A grouping of types. For flat languages (JS/C/Python) a single namespace with
/// <see cref="Name"/> = <c>""</c> is used; the writer renders it without a sub-folder.
/// </summary>
public sealed record ApiNamespace
{
    /// <summary>Dotted namespace (e.g. <c>Velopack</c>, <c>Velopack.Sources</c>). Empty for flat languages.</summary>
    public required string Name { get; init; }

    public string? Summary { get; init; }

    public IReadOnlyList<ApiType> Types { get; init; } = new List<ApiType>();
}

public enum ApiTypeKind
{
    Class,
    Struct,
    Interface,
    Enum,
    Delegate,
    /// <summary>A synthetic page grouping related free functions (e.g. C <c>vpkc_app_*</c>).</summary>
    FreeFunctionGroup,
    /// <summary>A Python module rendered as a type page.</summary>
    Module,
}

public sealed record ApiType
{
    public required ApiTypeKind Kind { get; init; }

    /// <summary>Short name used for the file/title (e.g. <c>UpdateManager</c>).</summary>
    public required string Name { get; init; }

    /// <summary>Fully-qualified name (e.g. <c>Velopack.UpdateManager</c>).</summary>
    public required string FullName { get; init; }

    /// <summary>Owning namespace name. Empty for flat languages.</summary>
    public string Namespace { get; init; } = "";

    /// <summary>Doc summary as Markdown.</summary>
    public string? Summary { get; init; }

    /// <summary>Longer remarks as Markdown.</summary>
    public string? Remarks { get; init; }

    /// <summary>Rendered declaration in the source language (shown in a code fence).</summary>
    public string? Signature { get; init; }

    /// <summary>Generic/template parameter names (e.g. <c>T</c>, <c>TResult</c>).</summary>
    public IReadOnlyList<string> TypeParameters { get; init; } = new List<string>();

    /// <summary>Base class(es) — for most languages at most one.</summary>
    public IReadOnlyList<ApiTypeRef> BaseTypes { get; init; } = new List<ApiTypeRef>();

    /// <summary>Implemented interfaces.</summary>
    public IReadOnlyList<ApiTypeRef> Interfaces { get; init; } = new List<ApiTypeRef>();

    public bool IsObsolete { get; init; }
    public string? ObsoleteMessage { get; init; }

    public IReadOnlyList<ApiMember> Members { get; init; } = new List<ApiMember>();
}

public enum ApiMemberKind
{
    Constructor,
    Method,
    Property,
    Field,
    Event,
    Operator,
    EnumValue,
}

public sealed record ApiMember
{
    public required ApiMemberKind Kind { get; init; }

    /// <summary>Member name (e.g. <c>CheckForUpdatesAsync</c>).</summary>
    public required string Name { get; init; }

    /// <summary>Rendered member declaration in the source language.</summary>
    public string? Signature { get; init; }

    public string? Summary { get; init; }
    public string? Remarks { get; init; }

    public ApiReturn? Returns { get; init; }

    public IReadOnlyList<ApiParameter> Parameters { get; init; } = new List<ApiParameter>();

    /// <summary>Modifiers / qualifiers to surface (e.g. <c>static</c>, <c>readonly</c>, <c>async</c>).</summary>
    public IReadOnlyList<string> Modifiers { get; init; } = new List<string>();

    public bool IsObsolete { get; init; }
    public string? ObsoleteMessage { get; init; }

    /// <summary>Stable in-page anchor (slug). Set by the adapter or filled in by the writer if null.</summary>
    public string? Anchor { get; init; }
}

public sealed record ApiParameter
{
    public required string Name { get; init; }
    public ApiTypeRef? Type { get; init; }
    public string? Description { get; init; }
    public string? Default { get; init; }
    public bool Optional { get; init; }
}

public sealed record ApiReturn
{
    public ApiTypeRef? Type { get; init; }
    public string? Description { get; init; }
}

/// <summary>
/// A reference to a type. When the referenced type lives in this same API,
/// <see cref="Href"/> is a relative link (e.g. <c>./UpdateManager.md</c> or
/// <c>../Sources/IFileDownloader.md</c>); otherwise it is null and the name renders
/// as plain text.
/// </summary>
public sealed record ApiTypeRef
{
    public required string Name { get; init; }

    /// <summary>Relative link to the type's page, or null for external/plain text.</summary>
    public string? Href { get; init; }

    public ApiTypeRef() { }

    [System.Diagnostics.CodeAnalysis.SetsRequiredMembers]
    public ApiTypeRef(string name, string? href = null)
    {
        Name = name;
        Href = href;
    }
}
