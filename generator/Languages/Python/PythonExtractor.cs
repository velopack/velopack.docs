using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace DocGenerator.Languages.Python;

internal sealed record PythonExtractResult(string JsonFile, string Version);

/// <summary>
/// Installs the published <c>velopack</c> PyPI wheel into a throwaway virtualenv and runs
/// <c>introspect.py</c> inside it. The wheel is a binary PyO3 extension with no <c>.py</c>
/// source, so static doc tools can't see it — runtime introspection (<c>inspect</c> +
/// <c>__text_signature__</c> + <c>__doc__</c>) is the only way to recover the API, and PyO3
/// surfaces the Rust <c>///</c> comments as docstrings.
/// </summary>
internal static class PythonExtractor
{
    public static async Task<PythonExtractResult?> ExtractAsync()
    {
        var python = await ResolvePythonAsync();
        if (python == null)
        {
            Console.WriteLine("  python3 unavailable; skipping Python reference.");
            return null;
        }

        var workDir = Util.GetWorkDir("python-work");
        Util.EnsureEmptyDirectory(workDir);

        var venvDir = Path.Combine(workDir, "venv");
        await Util.RunProcessAsync(python, new[] { "-m", "venv", venvDir }, workDir);

        var isWindows = RuntimeInformation.IsOSPlatform(OSPlatform.Windows);
        var venvPython = isWindows
            ? Path.Combine(venvDir, "Scripts", "python.exe")
            : Path.Combine(venvDir, "bin", "python");

        await Util.RunProcessAsync(venvPython, new[] { "-m", "pip", "install", "--upgrade", "pip" }, workDir, throwOnError: false);
        var install = await Util.RunCaptureAsync(venvPython, new[] { "-m", "pip", "install", "velopack" }, workDir);
        Console.WriteLine(install.StdOut);
        if (install.ExitCode != 0)
        {
            Console.WriteLine(install.StdErr);
            Console.WriteLine("  pip install velopack failed; skipping Python reference.");
            return null;
        }

        var script = LocateIntrospectScript();
        if (script == null)
        {
            Console.WriteLine("  introspect.py not found; skipping Python reference.");
            return null;
        }

        var result = await Util.RunCaptureAsync(venvPython, new[] { script, "velopack" }, workDir);
        if (result.ExitCode != 0 || string.IsNullOrWhiteSpace(result.StdOut))
        {
            Console.WriteLine(result.StdErr);
            Console.WriteLine("  introspect.py produced no output; skipping Python reference.");
            return null;
        }

        var jsonOut = Path.Combine(workDir, "python.json");
        await File.WriteAllTextAsync(jsonOut, result.StdOut);

        var version = ReadVersion(result.StdOut);
        return new PythonExtractResult(jsonOut, version);
    }

    private static async Task<string?> ResolvePythonAsync()
    {
        foreach (var candidate in new[] { "python3", "python" })
            if (await Util.IsCommandAvailableAsync(candidate, "--version"))
                return candidate;
        return null;
    }

    private static string? LocateIntrospectScript()
    {
        // Committed alongside this source; resolve relative to the repo root.
        var candidates = new[]
        {
            Path.Combine(Util.RepoRoot, "generator", "Languages", "Python", "introspect.py"),
            Path.Combine(AppContext.BaseDirectory, "introspect.py"),
        };
        return Array.Find(candidates, File.Exists);
    }

    private static string ReadVersion(string json)
    {
        try
        {
            using var doc = System.Text.Json.JsonDocument.Parse(json);
            return doc.RootElement.TryGetProperty("version", out var v) ? v.GetString() ?? "" : "";
        }
        catch { return ""; }
    }
}
