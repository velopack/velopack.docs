using System.ComponentModel;
using System.Diagnostics;
using System.Net;
using System.Runtime.InteropServices;
using System.Runtime.Versioning;
using NuGet.Packaging;

namespace DocGenerator;

internal class Util
{
    public static async Task StartShellProcess(string path, string[] arguments, string workDir)
    {
        var psi = new ProcessStartInfo() {
            FileName = path,
            WorkingDirectory = workDir,
            UseShellExecute = true,
        };
        psi.ArgumentList.AddRange(arguments);

        var process = Process.Start(psi);
        if (process == null) {
            throw new Exception($"Failed to start process '{path} {String.Join(" ", arguments)}'");
        }

        await process.WaitForExitAsync();

        if (process.ExitCode != 0) {
            throw new Exception($"Process '{path} {String.Join(" ", arguments)}' exited with code {process.ExitCode}");
        }
    }

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
