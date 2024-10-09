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

        // Console.WriteLine("Updating C# / VPK / CLI Reference...");
        // var outputCsharpReference = Path.Combine(docRootDir, "docs", "reference", "cs");
        // var outputCliReference = Path.Combine(docRootDir, "docs", "reference", "cli", "content");
        // await CSharpReference.UpdateCSharpReference(outputCsharpReference);
        // await CSharpReference.UpdateVpkCliReference(outputCliReference);

        Console.WriteLine("Updating Rust QuickStart...");
        string rustQuickStartOutput = Path.Combine(docRootDir, "docs", "getting-started", "rust.mdx");
        await UpdateRustQuickStart(rustQuickStartOutput);

        Console.WriteLine("Updating Sample TOC...");
        var sidebarConfigPath = Path.Combine(docRootDir, "sidebars.ts");
        await UpdateSampleToc(sidebarConfigPath);

    }

    static async Task UpdateSampleToc(string sidebarConfigPath)
    {
        string sampleBasePrefix = "https://github.com/velopack/velopack/tree/develop/samples/";
        string sampleReadmeUrl = "https://raw.githubusercontent.com/velopack/velopack/refs/heads/develop/samples/readme.md";
        string sampleReadme = Downloader.DownloadString(sampleReadmeUrl);
        var sampleMatches = Regex.Matches(sampleReadme, @"^-\s?\[(?<name>.*?)\]\((?<url>.*?)\)\s?-\s?(?<description>.*)$", RegexOptions.Multiline);
        var sampleToc = new StringBuilder();
        foreach (Match match in sampleMatches) {
            var name = match.Groups["name"].Value.Trim('*');
            var url = match.Groups["url"].Value;
            var description = match.Groups["description"].Value;
            sampleToc.AppendLine($"""link("{name}", "{sampleBasePrefix}{url}", "{description}"),""");
        }

        var sidebarConfig = await File.ReadAllTextAsync(sidebarConfigPath);
        ReplaceTextBetween(ref sidebarConfig, "SAMPLES-TOC", sampleToc.ToString());
        await File.WriteAllTextAsync(sidebarConfigPath, sidebarConfig);
    }

    static async Task UpdateRustQuickStart(string rustQuickStartOutput)
    {
        string rustLibUrl = "https://raw.githubusercontent.com/velopack/velopack/refs/heads/develop/src/lib-rust/src/lib.rs";
        string rustLibSrc = Downloader.DownloadString(rustLibUrl);
        var rustLines = rustLibSrc.Split(['\n', '\r'], StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)
            .Where(l => l.StartsWith("//!"))
            .Select(l => l.Substring(3).Trim())
            .ToList();
        var firstLine = rustLines.FindIndex(l => l.StartsWith("## Quick Start"));
        string rustIntro = """
            # Getting Started: Rust
            <AppliesTo all />
            Get started with our official cross-platform Rust Crate.

            :::tip
            To find the most accurate documentation for Rust please visit https://docs.rs/velopack
            :::
            """;
        string rustQuickStart = rustIntro + Environment.NewLine + String.Join(Environment.NewLine, rustLines.Skip(firstLine));
        await File.WriteAllTextAsync(rustQuickStartOutput, rustQuickStart);
    }

    static void ReplaceTextBetween(ref string body, string placeholderName, string text)
    {
        var start = $"//!! AUTO-GENERATED-START {placeholderName}";
        var end = $"//!! AUTO-GENERATED-END {placeholderName}";
        var startIndex = body.IndexOf(start);
        var endIndex = body.IndexOf(end);
        if (startIndex == -1 || endIndex == -1) {
            throw new InvalidOperationException($"Could not find placeholder {placeholderName}");
        }

        // normalize the start index to the beginning of the next line and end index to the end of the previous line
        startIndex = body.IndexOf('\n', startIndex) + 1;
        endIndex = body.LastIndexOf('\n', endIndex);

        body = body.Remove(startIndex, endIndex - startIndex);
        body = body.Insert(startIndex, text.Trim());
    }
}