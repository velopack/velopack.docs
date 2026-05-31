using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DocGenerator.Languages.CSharp;

/// <summary>
/// Result of the C# extraction step: a directory of docfx ManagedReference YAML files
/// plus the resolved package version.
/// </summary>
internal sealed record CSharpExtractResult(string YamlDir, string Version);

/// <summary>
/// Downloads the published <c>Velopack</c> NuGet package and runs <c>docfx metadata</c>
/// over the DLL + <c>Velopack.xml</c> to produce Roslyn ManagedReference YAML.
///
/// docfx is used instead of mddocs because its Roslyn pipeline emits clean signatures
/// (no <c>[AsyncStateMachine]</c> / <c>[NullableContext]</c> / <c>[Nullable]</c> compiler
/// attribute noise) and a stable machine-readable schema our adapter can consume.
/// </summary>
internal static class CSharpExtractor
{
    public static async Task<CSharpExtractResult?> ExtractAsync()
    {
        var workDir = Util.GetWorkDir("csharp-work");
        Util.EnsureEmptyDirectory(workDir);

        var pkg = await NugetHelper.DownloadAndExtractAsync("Velopack", Path.Combine(workDir, "pkg"));

        var dllPath = FindVelopackDll(pkg.ExtractDir);
        if (dllPath == null)
        {
            Console.WriteLine("  Velopack.dll not found in package; skipping C# reference.");
            return null;
        }
        Console.WriteLine($"  Found {Path.GetFileName(dllPath)} (v{pkg.Version})");

        var docfx = await Util.EnsureDotnetToolAsync("docfx", "docfx");
        if (docfx == null)
        {
            Console.WriteLine("  docfx tool unavailable; skipping C# reference.");
            return null;
        }

        var dllDir = Path.GetDirectoryName(dllPath)!;
        var apiOut = Path.Combine(workDir, "docfx-api");
        Util.EnsureEmptyDirectory(apiOut);

        // Minimal docfx.json that points the metadata step at the compiled assembly.
        // docfx reads the DLL via Roslyn and merges the adjacent Velopack.xml doc comments.
        var docfxJson = Path.Combine(workDir, "docfx.json");
        await File.WriteAllTextAsync(docfxJson, $$"""
        {
          "metadata": [
            {
              "src": [
                { "files": ["{{Path.GetFileName(dllPath)}}"], "src": "{{dllDir.Replace("\\", "/")}}" }
              ],
              "dest": "{{apiOut.Replace("\\", "/")}}",
              "disableGitFeatures": true,
              "disableDefaultFilter": false
            }
          ]
        }
        """);

        await RunDocfxMetadataAsync(docfx, docfxJson, workDir);

        if (!Directory.GetFiles(apiOut, "*.yml").Any())
        {
            Console.WriteLine("  docfx produced no YAML; skipping C# reference.");
            return null;
        }

        return new CSharpExtractResult(apiOut, pkg.Version);
    }

    private static async Task RunDocfxMetadataAsync(string docfx, string docfxJson, string workDir)
    {
        // `docfx metadata <docfx.json>` runs only the ManagedReference (Roslyn) step.
        await Util.RunProcessAsync(docfx, new[] { "metadata", docfxJson, "--logLevel", "Warning" }, workDir);
    }

    private static string? FindVelopackDll(string packageDir)
    {
        var libDir = Path.Combine(packageDir, "lib");
        if (!Directory.Exists(libDir))
            return null;

        // Prefer the highest netX.0 TFM; that's where the richest API + xml docs live.
        foreach (var dir in Directory.GetDirectories(libDir).OrderByDescending(Path.GetFileName))
        {
            var dll = Path.Combine(dir, "Velopack.dll");
            if (File.Exists(dll))
                return dll;
        }
        return null;
    }
}
