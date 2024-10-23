using System.Diagnostics;
using System.Net;
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
}
