using System.ComponentModel;
using System.Diagnostics;
using System.Net;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using System.Text;
using System.Text.RegularExpressions;

namespace DocGenerator;

internal class Util
{
    // ── repo / output paths ──────────────────────────────────────────────────

    public static string RepoRoot { get; } = FindRepoRoot();

    private static string FindRepoRoot()
    {
        var dir = AppContext.BaseDirectory;
        while (dir != null)
        {
            if (Directory.Exists(Path.Combine(dir, ".git")))
                return dir;
            dir = Path.GetDirectoryName(dir);
        }
        // Fallback: generator/ lives one level under the repo root.
        return Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", ".."));
    }

    public static string GetReferenceOutputDir(string lang)
        => Path.Combine(RepoRoot, "docs", "reference", lang);

    /// <summary>Per-language scratch directory under generator/obj (git-ignored).</summary>
    public static string GetWorkDir(string name)
        => Path.Combine(AppContext.BaseDirectory, "work", name);

    public static void EnsureEmptyDirectory(string dir)
    {
        if (Directory.Exists(dir))
            Directory.Delete(dir, recursive: true);
        Directory.CreateDirectory(dir);
    }

    // ── process helpers ─────────────────────────────────────────────────────

    public static string RemoveConsoleColors(string input)
    {
        return Regex.Replace(input, @"[][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]", "");
    }

    /// <summary>Launch a process inheriting the console (no output capture). Throws on non-zero exit.</summary>
    public static async Task StartShellProcess(string path, string[] arguments, string workDir)
    {
        var psi = new ProcessStartInfo() {
            FileName = path,
            WorkingDirectory = workDir,
            UseShellExecute = true,
        };
        foreach (var arg in arguments) psi.ArgumentList.Add(arg);

        var process = Process.Start(psi);
        if (process == null) {
            throw new Exception($"Failed to start process '{path} {String.Join(" ", arguments)}'");
        }

        await process.WaitForExitAsync();

        if (process.ExitCode != 0) {
            throw new Exception($"Process '{path} {String.Join(" ", arguments)}' exited with code {process.ExitCode}");
        }
    }

    /// <summary>Run a process and capture stdout/stderr. Does not throw on non-zero exit.</summary>
    public static async Task<ProcessResult> RunCaptureAsync(string fileName, string[] arguments, string? workingDirectory = null)
    {
        var psi = new ProcessStartInfo
        {
            FileName = fileName,
            WorkingDirectory = workingDirectory ?? Environment.CurrentDirectory,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
            CreateNoWindow = true,
        };
        foreach (var arg in arguments) psi.ArgumentList.Add(arg);

        using var process = new Process { StartInfo = psi };
        var stdout = new StringBuilder();
        var stderr = new StringBuilder();
        process.OutputDataReceived += (_, e) => { if (e.Data != null) stdout.AppendLine(e.Data); };
        process.ErrorDataReceived += (_, e) => { if (e.Data != null) stderr.AppendLine(e.Data); };

        if (!process.Start())
            throw new InvalidOperationException($"Failed to start process {fileName}.");

        process.BeginOutputReadLine();
        process.BeginErrorReadLine();
        await process.WaitForExitAsync();

        return new ProcessResult(process.ExitCode, stdout.ToString(), stderr.ToString());
    }

    /// <summary>Run a process, echoing its output to the console. Throws on non-zero exit when requested.</summary>
    public static async Task RunProcessAsync(string fileName, string[] arguments, string? workingDirectory = null, bool throwOnError = true)
    {
        Console.WriteLine($"  $ {fileName} {string.Join(" ", arguments)}");
        var result = await RunCaptureAsync(fileName, arguments, workingDirectory);
        if (!string.IsNullOrWhiteSpace(result.StdOut))
            Console.WriteLine(Indent(result.StdOut));
        if (!string.IsNullOrWhiteSpace(result.StdErr))
            Console.WriteLine(Indent(result.StdErr));
        if (throwOnError && result.ExitCode != 0)
            throw new InvalidOperationException($"{fileName} exited with code {result.ExitCode}.");
    }

    public static async Task<bool> IsCommandAvailableAsync(string command, params string[] args)
    {
        try
        {
            var result = await RunCaptureAsync(command, args.Length == 0 ? new[] { "--version" } : args);
            return result.ExitCode == 0;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Ensure a global dotnet tool is installed and return an invocable path to it, or null
    /// if it can't be made available. Falls back to the well-known global-tools directory
    /// (<c>~/.dotnet/tools</c>) when the tool isn't on PATH — installing a global tool does not
    /// add it to PATH for the current process, so a bare command lookup would spuriously fail.
    /// </summary>
    public static async Task<string?> EnsureDotnetToolAsync(string command, string packageId)
    {
        if (await IsCommandAvailableAsync(command))
            return command;

        var existing = ResolveDotnetToolPath(command);
        if (existing != null)
            return existing;

        Console.WriteLine($"  Installing {packageId}...");
        try
        {
            var install = await RunCaptureAsync("dotnet", new[] { "tool", "install", "--global", packageId });
            if (install.ExitCode != 0)
            {
                // already installed (different path) or update needed
                await RunCaptureAsync("dotnet", new[] { "tool", "update", "--global", packageId });
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"  Failed to install {packageId}: {ex.Message}");
        }

        if (await IsCommandAvailableAsync(command))
            return command;
        return ResolveDotnetToolPath(command);
    }

    /// <summary>Resolve a global dotnet tool to its on-disk path under the well-known tools dir.</summary>
    private static string? ResolveDotnetToolPath(string command)
    {
        var home = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var toolsDir = Environment.GetEnvironmentVariable("DOTNET_TOOLS_PATH")
                       ?? Path.Combine(home, ".dotnet", "tools");
        var exe = RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? command + ".exe" : command;
        var full = Path.Combine(toolsDir, exe);
        return File.Exists(full) ? full : null;
    }

    private static string Indent(string text)
        => "  " + text.Replace("\n", "\n  ").TrimEnd();

    // ── markdown / page helpers (used by CLI + legacy callers) ────────────────

    public static async Task SetPageSidebarOverview(string path)
    {
        var content = await File.ReadAllTextAsync(path);
        var prefix = """
            ---
            sidebar_label: Overview
            sidebar_position: 0
            ---
            """;
        await File.WriteAllTextAsync(path, prefix + Environment.NewLine + content);
    }

    public static void ReplaceTextBetween(ref string body, string placeholderName, string text)
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
        body = body.Insert(startIndex, text.TrimEnd());
    }

    public static string DownloadString(string url)
    {
#pragma warning disable SYSLIB0014
        using var wc = new WebClient();
#pragma warning restore SYSLIB0014
        return wc.DownloadString(url);
    }

    public static async Task DownloadFileAsync(string url, string destPath)
    {
        using var http = new HttpClient();
        var bytes = await http.GetByteArrayAsync(url);
        await File.WriteAllBytesAsync(destPath, bytes);
    }

    // ── native chmod (used by CLI binaries on unix) ──────────────────────────

    private const string OSX_CSTD_LIB = "libSystem.dylib";
    private const string NIX_CSTD_LIB = "libc";

    [SupportedOSPlatform("osx")]
    [DllImport(OSX_CSTD_LIB, EntryPoint = "chmod", SetLastError = true)]
    private static extern int osx_chmod(string pathname, int mode);

    [SupportedOSPlatform("linux")]
    [DllImport(NIX_CSTD_LIB, EntryPoint = "chmod", SetLastError = true)]
    private static extern int nix_chmod(string pathname, int mode);

    public static void ChmodFileAsExecutable(string filePath)
    {
        Func<string, int, int> chmod;

        if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX)) chmod = osx_chmod;
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux)) chmod = nix_chmod;
        else return; // no-op on windows, all .exe files can be executed.

        var filePermissionOctal = Convert.ToInt32("755", 8);
        const int EINTR = 4;
        int chmodReturnCode;

        do {
            chmodReturnCode = chmod(filePath, filePermissionOctal);
        } while (chmodReturnCode == -1 && Marshal.GetLastWin32Error() == EINTR);

        if (chmodReturnCode == -1) {
            throw new Win32Exception(Marshal.GetLastWin32Error(), $"Could not set file permission {filePermissionOctal} for {filePath}.");
        }
    }
}

internal readonly record struct ProcessResult(int ExitCode, string StdOut, string StdErr);
