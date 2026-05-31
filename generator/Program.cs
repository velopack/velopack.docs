using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using DocGenerator.Languages.Cli;
using DocGenerator.Languages.Cpp;
using DocGenerator.Languages.CSharp;
using DocGenerator.Languages.Python;
using DocGenerator.Languages.TypeScript;
using DocGenerator.Markdown;
using DocGenerator.Model;

namespace DocGenerator;

class Program
{
    static async Task Main(string[] args)
    {
        var scriptsDir = Assembly.GetEntryAssembly()!
            .GetCustomAttributes<AssemblyMetadataAttribute>()
            .Single(x => x.Key == "ScriptsDir").Value!;
        string docRootDir = Path.GetFullPath(Path.Combine(scriptsDir, ".."));
        string ReferenceDir(string lang) => Path.Combine(docRootDir, "docs", "reference", lang);

        // CLI-only mode (used by the per-OS CI matrix to capture native help text).
        if (args.Length == 2 && args[0] == "cli") {
            Console.WriteLine("Generating CLI Reference Only...");
            await CliReference.UpdateVpkCliReference(args[1]);
            return;
        }

        // Fixture mode: render the hand-built model so the generator can be eyeballed without
        // running any extractor. Writes to docs/reference/_fixture (not wired into the site).
        if (args.Length >= 1 && args[0] == "fixture") {
            var fixtureDir = ReferenceDir("_fixture");
            Util.EnsureEmptyDirectory(fixtureDir);
            MarkdownWriter.Write(Fixture.Build(), fixtureDir);
            Console.WriteLine($"Wrote fixture to {fixtureDir}");
            return;
        }

        var only = args.Length >= 2 && args[0] == "only"
            ? new HashSet<string>(args[1].Split(',', StringSplitOptions.RemoveEmptyEntries))
            : null;
        bool Enabled(string lang) => only == null || only.Contains(lang);

        Console.WriteLine("Updating Rust QuickStart...");
        await UpdateRustQuickStart(Path.Combine(docRootDir, "docs", "getting-started", "rust.mdx"));

        Console.WriteLine("Updating Sample TOC...");
        await UpdateSampleToc(Path.Combine(docRootDir, "sidebars.ts"));

        // Unified pipeline: extractor → adapter → ApiModel → MarkdownWriter, one per language.
        if (Enabled("cs"))
            await RunLanguageAsync("C#", ReferenceDir("cs"),
                async () => { var e = await CSharpExtractor.ExtractAsync(); return e == null ? null : CSharpAdapter.Build(e); });

        if (Enabled("js"))
            await RunLanguageAsync("JavaScript", ReferenceDir("js"),
                async () => { var e = await TypeScriptExtractor.ExtractAsync(); return e == null ? null : TypeScriptAdapter.Build(e); });

        if (Enabled("cpp"))
        {
            CppExtractResult? cppExtract = null;
            await RunLanguageAsync("C++", ReferenceDir("cpp"),
                async () => { cppExtract = await CppExtractor.ExtractAsync(); return cppExtract == null ? null : CppAdapter.Build(cppExtract); },
                afterWrite: dir => CppAdapter.WriteCApiPage(cppExtract!, dir));
        }

        if (Enabled("py"))
            await RunLanguageAsync("Python", ReferenceDir("py"),
                async () => { var e = await PythonExtractor.ExtractAsync(); return e == null ? null : PythonAdapter.Build(e); });

        Console.WriteLine("Updating CLI Reference...");
        try {
            await CliReference.UpdateVpkCliReference(Path.Combine(docRootDir, "docs", "reference", "cli", "content"));
        } catch (Exception ex) {
            Console.WriteLine($"  CLI reference failed: {ex.Message}");
        }

        Console.WriteLine("Done!");
    }

    /// <summary>
    /// Run one language pipeline. On any failure (tool missing, network down, empty model)
    /// the existing committed docs are left untouched so the site keeps building.
    /// </summary>
    static async Task RunLanguageAsync(string display, string outputDir, Func<Task<ApiModel?>> build, Action<string>? afterWrite = null)
    {
        Console.WriteLine($"Updating {display} Reference...");
        try {
            var model = await build();
            if (model == null) {
                Console.WriteLine($"  {display}: extractor unavailable — keeping existing docs.");
                return;
            }
            var typeCount = model.Namespaces.Sum(n => n.Types.Count);
            if (typeCount == 0) {
                Console.WriteLine($"  {display}: model has no types — keeping existing docs.");
                return;
            }
            Util.EnsureEmptyDirectory(outputDir);
            MarkdownWriter.Write(model, outputDir);
            afterWrite?.Invoke(outputDir);
            Console.WriteLine($"  {display}: wrote {typeCount} type page(s) to {outputDir}.");
        } catch (Exception ex) {
            Console.WriteLine($"  {display} reference failed: {ex.Message}");
            Console.WriteLine($"  Keeping existing {display} docs.");
        }
    }

    static async Task UpdateSampleToc(string sidebarConfigPath)
    {
        string sampleBasePrefix = "https://github.com/velopack/velopack/tree/develop/samples/";
        string sampleReadmeUrl = "https://raw.githubusercontent.com/velopack/velopack/refs/heads/develop/samples/README.md";
        try {
            string sampleReadme = Util.DownloadString(sampleReadmeUrl);
            var sampleMatches = Regex.Matches(sampleReadme, @"^-\s?\[(?<name>.*?)\]\((?<url>.*?)\)\s?-\s?(?<description>.*)$", RegexOptions.Multiline);
            var sampleToc = new StringBuilder();
            foreach (Match match in sampleMatches) {
                var name = match.Groups["name"].Value.Trim('*');
                var url = match.Groups["url"].Value;
                var description = match.Groups["description"].Value;
                sampleToc.AppendLine($"""        link("{name}", "{sampleBasePrefix}{url}", "{description}"),""");
            }

            var sidebarConfig = await File.ReadAllTextAsync(sidebarConfigPath);
            Util.ReplaceTextBetween(ref sidebarConfig, "SAMPLES-TOC", sampleToc.ToString());
            await File.WriteAllTextAsync(sidebarConfigPath, sidebarConfig);
        } catch (Exception ex) {
            Console.WriteLine($"  Sample TOC update failed: {ex.Message}");
        }
    }

    static async Task UpdateRustQuickStart(string rustQuickStartOutput)
    {
        string rustLibUrl = "https://raw.githubusercontent.com/velopack/velopack/refs/heads/develop/src/lib-rust/src/lib.rs";
        try {
            string rustLibSrc = Util.DownloadString(rustLibUrl);
            var rustLines = rustLibSrc.Split(new char[] { '\n', '\r' }, StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)
                .Where(l => l.StartsWith("//!"))
                .Select(l => l.Substring(3).Trim())
                .ToList();
            var firstLine = rustLines.FindIndex(l => l.StartsWith("## Quick Start"));
            string rustIntro = """
                # Getting Started: Rust
                <AppliesTo all />
                Get started with our official cross-platform Rust crate.

                :::tip
                To find the most accurate and complete documentation for Rust please visit https://docs.rs/velopack
                :::
                """;
            string rustQuickStart = rustIntro + Environment.NewLine + String.Join(Environment.NewLine, rustLines.Skip(firstLine));
            await File.WriteAllTextAsync(rustQuickStartOutput, rustQuickStart);
        } catch (Exception ex) {
            Console.WriteLine($"  Rust quickstart update failed: {ex.Message}");
        }
    }
}
