using System.Runtime.InteropServices;

namespace DocGenerator;

public class CppHeaderReference
{
    [DllImport("libc")]
    private static extern uint getuid();

    [DllImport("libc")]
    private static extern uint getgid();
    
    public static async Task UpdateCppReference(string outputPath)
    {
        outputPath = Path.GetFullPath(outputPath);

        var cHeaderUrl = "https://raw.githubusercontent.com/velopack/velopack/refs/heads/develop/src/lib-cpp/include/Velopack.h";
        var cHeader = Util.DownloadString(cHeaderUrl);
        var cHeaderPath = Path.Combine(outputPath, "Velopack.h");

        var cppHeaderUrl = "https://raw.githubusercontent.com/velopack/velopack/refs/heads/develop/src/lib-cpp/include/Velopack.hpp";
        var cppHeader = Util.DownloadString(cppHeaderUrl);
        var cppHeaderPath = Path.Combine(outputPath, "Velopack.hpp");

        await File.WriteAllTextAsync(cHeaderPath, cHeader);
        await File.WriteAllTextAsync(cppHeaderPath, cppHeader);

        Console.WriteLine($"Mounting {outputPath}");
        await Util.StartShellProcess("docker",
            [
                "run",
                "--rm",
                "-v",
                outputPath + ":/include",
                "-w",
                "/include",
                "standardese/standardese",
                "ls",
                "-la",
                "/include"
            ],
            outputPath);

        await Util.StartShellProcess("docker",
            [
                "run",
                "--rm",
                "--user",
                $"{getuid()}:{getgid()}",
                "-v",
                outputPath + ":/include:rw",
                "-w",
                "/include",
                "standardese/standardese",
                "standardese",
                "--compilation.standard=c++17",
                "--comment.free_file_comments=1",
                "--output.format=commonmark_html",
                "Velopack.h"
                ],
            outputPath);

        Console.WriteLine("Generated files:");
        foreach (var f in Directory.GetFiles(outputPath)) {
            Console.WriteLine(f);
        }

        File.Delete(cHeaderPath);
        File.Delete(cppHeaderPath);
        File.Delete(Path.Combine(outputPath, "standardese_files.md"));
        File.Delete(Path.Combine(outputPath, "standardese_modules.md"));

        var indexMd = Path.Combine(outputPath, "index.md");
        File.Move(Path.Combine(outputPath, "standardese_entities.md"), indexMd, true);
        await Util.SetPageSidebarOverview(indexMd);

        var velopackMd = Path.Combine(outputPath, "doc_Velopack.md");
        var velopack = await File.ReadAllTextAsync(velopackMd);
        velopack = velopack.Replace("href=\"doc_Velopack.md#", "href=\"#");
        await File.WriteAllTextAsync(velopackMd, velopack);
    }
}