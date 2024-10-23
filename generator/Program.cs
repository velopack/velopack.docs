using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

namespace DocGenerator;

class Program
{
    static async Task Main(string[] args)
    {
        var scriptsDir = Assembly.GetEntryAssembly()!
            .GetCustomAttributes<AssemblyMetadataAttribute>()
            .Single(x => x.Key == "ScriptsDir").Value!;
        string docRootDir = Path.GetFullPath(Path.Combine(scriptsDir, ".."));
        
        if (args.Length == 2 && args[0] == "cli") {
            Console.WriteLine("Generating CLI Reference Only...");
            await CSharpReference.UpdateVpkCliReference(args[1]);
            return;
        }

        Console.WriteLine("Updating C# / VPK / CLI Reference...");
        var outputCsharpReference = Path.Combine(docRootDir, "docs", "reference", "cs");
        var outputCliReference = Path.Combine(docRootDir, "docs", "reference", "cli", "content");
        await CSharpReference.UpdateCSharpReference(outputCsharpReference);
        await CSharpReference.UpdateVpkCliReference(outputCliReference);

        Console.WriteLine("Updating Rust QuickStart...");
        string rustQuickStartOutput = Path.Combine(docRootDir, "docs", "getting-started", "rust.mdx");
        await UpdateRustQuickStart(rustQuickStartOutput);

        Console.WriteLine("Updating Sample TOC...");
        var sidebarConfigPath = Path.Combine(docRootDir, "sidebars.ts");
        await UpdateSampleToc(sidebarConfigPath);

        Console.WriteLine("Updating JavaScript Reference...");
        var outputJsReference = Path.Combine(docRootDir, "docs", "reference", "js");
        await JavaScriptReference.UpdateJavaScriptReference(outputJsReference);

        Console.WriteLine("Updating C / C++ Reference");
        var outputCppReference = Path.Combine(docRootDir, "docs", "reference", "cpp");
        await CppHeaderReference.UpdateCppReference(outputCppReference);

        Console.WriteLine("Done!");
    }

    static async Task UpdateSampleToc(string sidebarConfigPath)
    {
        string sampleBasePrefix = "https://github.com/velopack/velopack/tree/develop/samples/";
        string sampleReadmeUrl = "https://raw.githubusercontent.com/velopack/velopack/refs/heads/develop/samples/README.md";
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
    }

    static async Task UpdateRustQuickStart(string rustQuickStartOutput)
    {
        string rustLibUrl = "https://raw.githubusercontent.com/velopack/velopack/refs/heads/develop/src/lib-rust/src/lib.rs";
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
    }
}