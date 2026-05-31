using System;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace DocGenerator.Languages.Cpp;

/// <param name="XmlDir">Directory holding the C++ ManagedReference-style standardese XML (from <c>Velopack.hpp</c>).</param>
/// <param name="CApiMarkdownFile">standardese's commonmark dump of the raw C ABI (<c>Velopack.h</c>), or null if it failed.</param>
internal sealed record CppExtractResult(string XmlDir, string? CApiMarkdownFile, string Version);

/// <summary>
/// Downloads the published C / C++ headers from GitHub and runs standardese in Docker twice:
///
/// <list type="bullet">
/// <item><b>C++ API</b> — <c>--output.format=xml</c> over <c>Velopack.hpp</c>. The hpp
/// <c>#include</c>s the C header so it compiles, but standardese only documents entities declared
/// in the file it is given, so this yields the idiomatic C++ API (<c>namespace Velopack</c>:
/// classes, structs, member functions). A real adapter turns the XML into clean per-type pages,
/// consistent with the other languages.</item>
/// <item><b>C ABI</b> — <c>--output.format=commonmark</c> over <c>Velopack.h</c>. The raw
/// <c>vpkc_*</c> functions and structs are a flat list with no inheritance to model, so rather than
/// re-deriving structure we embed standardese's own single-page markdown verbatim as one "C API"
/// page (see <see cref="CppAdapter.WriteCApiPage"/>).</item>
/// </list>
/// </summary>
internal static class CppExtractor
{
    [DllImport("libc")] private static extern uint getuid();
    [DllImport("libc")] private static extern uint getgid();

    private const string CHeaderUrl = "https://raw.githubusercontent.com/velopack/velopack/refs/heads/develop/src/lib-cpp/include/Velopack.h";
    private const string CppHeaderUrl = "https://raw.githubusercontent.com/velopack/velopack/refs/heads/develop/src/lib-cpp/include/Velopack.hpp";

    public static async Task<CppExtractResult?> ExtractAsync()
    {
        if (!await Util.IsCommandAvailableAsync("docker", "--version"))
        {
            Console.WriteLine("  Docker unavailable; skipping C/C++ reference (standardese runs in Docker).");
            return null;
        }

        var workDir = Util.GetWorkDir("cpp-work");
        Util.EnsureEmptyDirectory(workDir);

        var cHeader = Path.Combine(workDir, "Velopack.h");
        var cppHeader = Path.Combine(workDir, "Velopack.hpp");
        await Util.DownloadFileAsync(CHeaderUrl, cHeader);
        await Util.DownloadFileAsync(CppHeaderUrl, cppHeader);

        var version = TryReadVersion(cHeader) ?? TryReadVersion(cppHeader) ?? "";

        // Pass 1: C++ API → XML (the structured model the adapter consumes).
        var xmlDir = Path.Combine(workDir, "cpp-xml");
        Util.EnsureEmptyDirectory(xmlDir);
        File.Copy(cHeader, Path.Combine(xmlDir, "Velopack.h"));
        File.Copy(cppHeader, Path.Combine(xmlDir, "Velopack.hpp"));
        await RunStandardeseAsync(xmlDir, "Velopack.hpp", "xml");

        if (!Directory.GetFiles(xmlDir, "*.xml").Any())
        {
            Console.WriteLine("  standardese produced no XML; skipping C/C++ reference.");
            return null;
        }

        // Pass 2: C ABI → commonmark (embedded verbatim as the "C API" page). Best-effort.
        string? cApiMarkdown = null;
        try
        {
            var mdDir = Path.Combine(workDir, "c-md");
            Util.EnsureEmptyDirectory(mdDir);
            File.Copy(cHeader, Path.Combine(mdDir, "Velopack.h"));
            await RunStandardeseAsync(mdDir, "Velopack.h", "commonmark");
            var doc = Path.Combine(mdDir, "doc_Velopack.md");
            cApiMarkdown = File.Exists(doc) ? doc : null;
            if (cApiMarkdown == null)
                Console.WriteLine("  standardese produced no C API markdown; skipping C API page.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"  C API page generation failed: {ex.Message}");
        }

        return new CppExtractResult(xmlDir, cApiMarkdown, version);
    }

    /// <summary>Run standardese in Docker over <paramref name="headerFileName"/> inside <paramref name="dir"/>.</summary>
    private static async Task RunStandardeseAsync(string dir, string headerFileName, string format)
    {
        var user = RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? null : $"{getuid()}:{getgid()}";
        var args = new System.Collections.Generic.List<string> { "run", "--rm" };
        if (user != null) { args.Add("--user"); args.Add(user); }
        args.AddRange(new[]
        {
            "-v", dir + ":/include:rw",
            "-w", "/include",
            "standardese/standardese",
            "standardese",
            "--compilation.standard=c++17",
            "--comment.free_file_comments=1",
            $"--output.format={format}",
            headerFileName,
        });
        await Util.RunProcessAsync("docker", args.ToArray(), dir, throwOnError: false);
    }

    private static string? TryReadVersion(string headerPath)
    {
        try
        {
            foreach (var line in File.ReadLines(headerPath))
            {
                // Headers usually carry a "Velopack vX.Y.Z" banner comment.
                var m = System.Text.RegularExpressions.Regex.Match(line, @"[Vv]elopack\s+v?(\d+\.\d+\.\d+\S*)");
                if (m.Success) return m.Groups[1].Value;
            }
        }
        catch { }
        return null;
    }
}
