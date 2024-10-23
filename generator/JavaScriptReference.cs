namespace DocGenerator;

public static class JavaScriptReference
{
    public static async Task UpdateJavaScriptReference(string jsReferenceOutput)
    {
        Directory.Delete(jsReferenceOutput, true);
        Directory.CreateDirectory(jsReferenceOutput);

        var workDir = Path.Combine(AppContext.BaseDirectory, "ref_JS");
        if (Directory.Exists(workDir)) {
            Directory.Delete(workDir, true);
        }

        Directory.CreateDirectory(workDir);

        await Util.StartShellProcess("npm", ["pack", "velopack"], workDir);
        var tarball = Directory.GetFiles(workDir, "*.tgz").Single();
        await Util.StartShellProcess("tar", ["-xzf", tarball], workDir);

        var packageDir = Path.Combine(workDir, "package");
        await Util.StartShellProcess("npm", ["i", "typedoc", "typedoc-plugin-markdown"], packageDir);
        await Util.StartShellProcess(
            "npx",
            [
                "typedoc",
                "--out",
                Path.GetFullPath(jsReferenceOutput),
                "--plugin",
                "typedoc-plugin-markdown",
                "--flattenOutputFiles",
                "--readme",
                "none",
                "--entryFileName",
                "index",
                "--hidePageHeader",
                "--hideBreadcrumbs",
                "--indexFormat",
                "table",
                "--parametersFormat",
                "table",
                "--disableSources",
                "lib/index.d.ts"
            ],
            packageDir);

        var indexMd = Path.Combine(jsReferenceOutput, "index.md");
        await Util.SetPageSidebarOverview(indexMd);
    }
}