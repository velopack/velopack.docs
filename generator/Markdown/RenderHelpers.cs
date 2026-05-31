using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using DocGenerator.Model;

namespace DocGenerator.Markdown;

/// <summary>
/// Shared, language-agnostic helpers used by <see cref="MarkdownWriter"/>:
/// Markdown table building, MDX-safe escaping (the site builds with
/// <c>onBrokenMarkdownLinks: 'throw'</c>), deterministic anchor slugging, the
/// <c>_category_.yml</c> unique-key workaround, and <see cref="ApiTypeRef"/> rendering.
/// </summary>
internal static class RenderHelpers
{
    /// <summary>
    /// Build a Markdown table. <paramref name="rows"/> cells are emitted verbatim
    /// (callers pass already-escaped / already-inline-rendered content).
    /// Returns an empty string when there are no rows.
    /// </summary>
    public static string Table(IReadOnlyList<string> headers, IEnumerable<IReadOnlyList<string>> rows)
    {
        var rowList = rows.ToList();
        if (rowList.Count == 0)
            return "";

        var sb = new StringBuilder();
        sb.Append("| ").Append(string.Join(" | ", headers)).AppendLine(" |");
        sb.Append("| ").Append(string.Join(" | ", headers.Select(_ => "---"))).AppendLine(" |");
        foreach (var row in rowList)
            sb.Append("| ").Append(string.Join(" | ", row)).AppendLine(" |");
        return sb.ToString();
    }

    /// <summary>
    /// Escape text so it is safe inside a Markdown table cell: pipes break the table,
    /// and newlines must become <c>&lt;br/&gt;</c>. Also collapses runs of whitespace.
    /// </summary>
    public static string CellEscape(string? text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return "";
        var t = text.Replace("\r\n", "\n").Replace('\r', '\n');
        // Collapse markdown links to their label — relative links can't be rebased inside a
        // table cell and would break the build, so summaries render as plain text in tables.
        t = Regex.Replace(t, @"\[([^\]]*)\]\([^)]*\)", "$1");
        t = t.Replace("|", "\\|");
        t = Regex.Replace(t, @"\n+", "<br/>");
        t = Regex.Replace(t, @"[ \t]+", " ").Trim();
        return t;
    }

    /// <summary>
    /// Escape free-flowing Markdown body text so Docusaurus' MDX parser does not choke.
    /// MDX treats <c>&lt;</c> and <c>{</c> as JSX/expression syntax; bare ones in prose
    /// (e.g. <c>List&lt;T&gt;</c>, <c>{0}</c>) crash the build. Content inside inline-code
    /// spans is left untouched.
    /// </summary>
    public static string MdxSafe(string? text)
    {
        if (string.IsNullOrEmpty(text))
            return "";

        var sb = new StringBuilder(text.Length + 16);
        bool inCode = false; // inside `...` inline code — leave untouched
        for (int i = 0; i < text.Length; i++)
        {
            char c = text[i];

            if (c == '`')
            {
                inCode = !inCode;
                sb.Append(c);
                continue;
            }

            if (inCode)
            {
                sb.Append(c);
                continue;
            }

            switch (c)
            {
                case '<':
                    sb.Append("&lt;");
                    break;
                case '>':
                    sb.Append("&gt;");
                    break;
                case '{':
                    sb.Append("&#123;");
                    break;
                case '}':
                    sb.Append("&#125;");
                    break;
                default:
                    sb.Append(c);
                    break;
            }
        }
        return sb.ToString();
    }

    /// <summary>
    /// Deterministically slug a signature (or member name) into a stable, URL-safe anchor.
    /// Same input always yields the same anchor so cross-links remain valid run-to-run.
    /// </summary>
    public static string Anchor(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return "member";

        var sb = new StringBuilder(text.Length);
        bool lastDash = false;
        foreach (char c in text.ToLowerInvariant())
        {
            if (char.IsLetterOrDigit(c))
            {
                sb.Append(c);
                lastDash = false;
            }
            else if (!lastDash && sb.Length > 0)
            {
                sb.Append('-');
                lastDash = true;
            }
        }
        var slug = sb.ToString().Trim('-');
        return slug.Length == 0 ? "member" : slug;
    }

    /// <summary>Escape characters that would break an inline code span / table cell.</summary>
    public static string InlineCodeEscape(string? text)
    {
        if (string.IsNullOrEmpty(text))
            return "";
        return text.Replace("|", "\\|").Replace("\n", " ").Trim();
    }

    /// <summary>
    /// The <c>_category_.yml</c> body. The <c>key:</c> must be unique across the whole
    /// docs tree (per-language + per-path) or the i18n build collides — see
    /// <c>CSharpReference.cs</c> history. Centralized here so every language gets it.
    /// </summary>
    public static string CategoryYml(string label, string uniqueKey, int? position = null)
    {
        var sb = new StringBuilder();
        sb.Append("label: ").AppendLine(YamlScalar(label));
        if (position.HasValue)
            sb.Append("position: ").Append(position.Value).AppendLine();
        sb.Append("key: ").AppendLine(uniqueKey);
        return sb.ToString();
    }

    /// <summary>Quote a YAML scalar if it contains characters that need it.</summary>
    public static string YamlScalar(string value)
    {
        if (value.Length == 0)
            return "\"\"";
        if (Regex.IsMatch(value, @"^[A-Za-z0-9 ._/#+-]+$") && value.Trim() == value)
            return value;
        return "\"" + value.Replace("\\", "\\\\").Replace("\"", "\\\"") + "\"";
    }

    /// <summary>Slug a string for use as a path/key segment (lowercase, dashed).</summary>
    public static string KeySegment(string text)
    {
        var slug = Regex.Replace(text.ToLowerInvariant(), @"[^a-z0-9]+", "-").Trim('-');
        return slug.Length == 0 ? "root" : slug;
    }
}
