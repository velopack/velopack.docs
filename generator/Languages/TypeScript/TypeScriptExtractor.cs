using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DocGenerator.Languages.TypeScript;

internal sealed record TypeScriptExtractResult(string JsonFile, string Version);

/// <summary>
/// Downloads the published <c>velopack</c> npm package and runs <c>typedoc --json</c>
/// against its real types entry point (<c>lib/index.d.ts</c>) to produce a TypeDoc JSON
/// model.
///
/// The previous generator pointed typedoc at a non-existent <c>Velopack.d.ts</c>, so its
/// committed output was just <c>"# velopack"</c>. The package's <c>package.json</c> "types"
/// field is <c>lib/index.d.ts</c> — that's the entry point we use here.
/// </summary>
internal static class TypeScriptExtractor
{
    public static async Task<TypeScriptExtractResult?> ExtractAsync()
    {
        if (!await Util.IsCommandAvailableAsync("npm", "--version"))
        {
            Console.WriteLine("  npm unavailable; skipping JavaScript reference.");
            return null;
        }

        var workDir = Util.GetWorkDir("ts-work");
        Util.EnsureEmptyDirectory(workDir);

        // npm pack downloads the tarball without installing it.
        await Util.RunProcessAsync("npm", new[] { "pack", "velopack" }, workDir);
        var tarball = Directory.GetFiles(workDir, "*.tgz").FirstOrDefault();
        if (tarball == null)
        {
            Console.WriteLine("  npm pack produced no tarball; skipping JavaScript reference.");
            return null;
        }

        await Util.RunProcessAsync("tar", new[] { "-xzf", tarball }, workDir);
        var packageDir = Path.Combine(workDir, "package");

        var version = ReadVersion(packageDir);

        var entry = ResolveEntryPoint(packageDir);
        if (entry == null)
        {
            Console.WriteLine("  Could not find a .d.ts entry point; skipping JavaScript reference.");
            return null;
        }
        Console.WriteLine($"  TypeDoc entry point: {Path.GetRelativePath(packageDir, entry)}");

        // Install typedoc + typescript locally in the extracted package.
        await Util.RunProcessAsync("npm", new[] { "install", "--no-audit", "--no-fund", "typedoc", "typescript" }, packageDir);

        // TypeScript discovers a tsconfig.json by walking up the directory tree from the entry
        // point. The work dir lives inside this docs repo, whose root tsconfig.json extends
        // "@docusaurus/tsconfig" — not installed here — so the walk-up resolves to it and fails
        // with TS6053, killing the run. Write a self-contained tsconfig next to the entry point
        // and point typedoc at it so the search never escapes the package.
        var tsconfig = Path.Combine(packageDir, "tsconfig.typedoc.json");
        await File.WriteAllTextAsync(tsconfig, """
        {
          "compilerOptions": {
            "target": "ESNext",
            "module": "ESNext",
            "moduleResolution": "node",
            "skipLibCheck": true,
            "noEmit": true
          },
          "include": ["**/*.d.ts"]
        }
        """);

        var jsonOut = Path.Combine(workDir, "typedoc.json");
        var result = await Util.RunCaptureAsync("npx", new[]
        {
            "typedoc",
            "--json", jsonOut,
            "--tsconfig", tsconfig,
            "--entryPoints", entry,
            "--entryPointStrategy", "expand",
            "--skipErrorChecking",
            "--excludeExternals",
            "--readme", "none",
        }, packageDir);
        Console.WriteLine(result.StdOut);
        if (result.ExitCode != 0)
            Console.WriteLine(result.StdErr);

        if (!File.Exists(jsonOut))
        {
            Console.WriteLine("  typedoc produced no JSON; skipping JavaScript reference.");
            return null;
        }

        return new TypeScriptExtractResult(jsonOut, version);
    }

    private static string ReadVersion(string packageDir)
    {
        try
        {
            using var doc = System.Text.Json.JsonDocument.Parse(File.ReadAllText(Path.Combine(packageDir, "package.json")));
            return doc.RootElement.TryGetProperty("version", out var v) ? v.GetString() ?? "" : "";
        }
        catch { return ""; }
    }

    private static string? ResolveEntryPoint(string packageDir)
    {
        // Prefer the package.json "types"/"typings" field, then the canonical lib/index.d.ts.
        try
        {
            using var doc = System.Text.Json.JsonDocument.Parse(File.ReadAllText(Path.Combine(packageDir, "package.json")));
            foreach (var key in new[] { "types", "typings" })
            {
                if (doc.RootElement.TryGetProperty(key, out var t) && t.GetString() is { } rel)
                {
                    var full = Path.Combine(packageDir, rel.Replace('/', Path.DirectorySeparatorChar));
                    if (File.Exists(full)) return full;
                }
            }
        }
        catch { /* fall through */ }

        foreach (var candidate in new[] { "lib/index.d.ts", "dist/index.d.ts", "index.d.ts", "types/index.d.ts" })
        {
            var full = Path.Combine(packageDir, candidate.Replace('/', Path.DirectorySeparatorChar));
            if (File.Exists(full)) return full;
        }

        return Directory.GetFiles(packageDir, "*.d.ts", SearchOption.AllDirectories).FirstOrDefault();
    }
}
