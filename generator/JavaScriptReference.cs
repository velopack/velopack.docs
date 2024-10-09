using System.Diagnostics;
using NuGet.Packaging;

namespace DocGenerator;

public static class JavaScriptReference
{
    public static async Task UpdateJavaScriptReference(string jsReferenceOutput)
    {
        Directory.Delete(jsReferenceOutput, true);
        Directory.CreateDirectory(jsReferenceOutput);

        var workDir = Path.Combine(AppContext.BaseDirectory, "ref_JS");
        Directory.CreateDirectory(workDir);

        await StartProcess("npm", ["pack", "velopack"], workDir);
        var tarball = Directory.GetFiles(workDir, "*.tgz").Single();
        await StartProcess("tar", ["-xzf", tarball], workDir);

        var packageDir = Path.Combine(workDir, "package");
        await StartProcess("npm", ["i", "typedoc", "typedoc-plugin-markdown"], packageDir);
        await StartProcess(
            "npx",
            [
                "typedoc", "--out", Path.GetFullPath(jsReferenceOutput), "--plugin", "typedoc-plugin-markdown",
                "--flattenOutputFiles", "--readme", "none", "--entryFileName", "index", "--hidePageHeader", "--hideBreadcrumbs",
                "--indexFormat", "table", "--parametersFormat", "table", "--disableSources",
                "lib/index.d.ts"
            ],
            packageDir);

        var indexMd = Path.Combine(jsReferenceOutput, "index.md");

        var content = await File.ReadAllTextAsync(indexMd);
        var prefix = """
            ---
            sidebar_label: Overview
            sidebar_position: 0
            ---
            """;
        await File.WriteAllTextAsync(indexMd, prefix + Environment.NewLine + content);
    }

    static async Task StartProcess(string path, string[] arguments, string workDir)
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
}