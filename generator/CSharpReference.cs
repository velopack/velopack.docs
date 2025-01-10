using System.Diagnostics;
using System.IO.Compression;
using System.Runtime.InteropServices;
using System.Text;
using NuGet.Common;
using NuGet.Packaging;

namespace DocGenerator;

public static class CSharpReference
{
    public static async Task UpdateCSharpReference(string outputCsharpReference)
    {
        Console.WriteLine("Installing mddocs");
        var mdInstall = Process.Start("dotnet", "tool update --global Grynwald.MdDocs");
        await mdInstall.WaitForExitAsync();
        if (mdInstall.ExitCode != 0) {
            throw new Exception("Failed to install mddocs");
        }

        Console.WriteLine("Searching for latest Velopack nuget package");
        var dl = new NugetDownloader(new NullLogger());
        var velopackMetadata = await dl.GetPackageMetadata("Velopack", "latest", CancellationToken.None);

        Console.WriteLine($"Velopack: {velopackMetadata.Identity.Version}");

        Console.WriteLine("Downloading Velopack nuget package");
        using var velopackStream = new MemoryStream();
        await dl.DownloadPackageToStream(velopackMetadata, velopackStream, CancellationToken.None);

        Console.WriteLine("Extracting Velopack nuget package");
        velopackStream.Position = 0;

        var extractedVelopack = Path.Combine(AppContext.BaseDirectory, "ref_Velopack");
        if (Directory.Exists(outputCsharpReference)) Directory.Delete(outputCsharpReference, true);
        if (Directory.Exists(extractedVelopack)) Directory.Delete(extractedVelopack, true);

        ZipFile.ExtractToDirectory(velopackStream, extractedVelopack);

        var velopackDll = Path.Combine(extractedVelopack, "lib", "netstandard2.0", "Velopack.dll");

        var p = Process.Start("mddocs", ["apireference", "-a", velopackDll, "-o", outputCsharpReference]);
        await p.WaitForExitAsync();
        if (p.ExitCode != 0) {
            throw new Exception("Failed to generate C# reference");
        }

        foreach (var dir in new DirectoryInfo(outputCsharpReference).EnumerateDirectories(
                     "*",
                     SearchOption.AllDirectories)) {
            var categoryPath = Path.Combine(dir.FullName, "_category_.yml");
            var indexPath = Path.Combine(dir.FullName, "index.md");

            if (dir.Name == "methods") {
                File.WriteAllText(categoryPath, "label: Methods");
            } else if (dir.Name == "properties") {
                File.WriteAllText(categoryPath, "label: Properties");
            } else if (dir.Name == "events") {
                File.WriteAllText(categoryPath, "label: Events");
            } else if (dir.Name == "fields") {
                File.WriteAllText(categoryPath, "label: Fields");
            } else if (dir.Name == "operators") {
                File.WriteAllText(categoryPath, "label: Operators");
            } else if (dir.Name == "constructors") {
                File.WriteAllText(categoryPath, "label: Constructors");
                if (File.Exists(indexPath)) {
                    var indexContent = File.ReadAllText(indexPath);
                    File.WriteAllText(
                        indexPath,
                        $"""
                        ---
                        title: Constructors
                        ---
                        {indexContent}
                        """);
                }
            } else if (File.Exists(indexPath)) {
                var indexContent = File.ReadAllText(indexPath);

                var name = indexContent
                    .Split(
                        new char[] { '\r', '\n' },
                        StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)
                    .Where(l => l.StartsWith("# "))
                    .Select(l => l.Substring(2))
                    .First();

                // File.WriteAllText(categoryPath, $"label: {name}");

                var sidebarPos = 10;
                // var sidebarIcon = "";

                if (name.EndsWith("Namespace")) {
                    sidebarPos = 1;
                    name = name.Substring(0, name.LastIndexOf(" "));
                    // sidebarIcon = "🔶 ";
                } else if (name.EndsWith("Class")) {
                    sidebarPos = 2;
                    name = name.Substring(0, name.LastIndexOf(" "));
                    // sidebarIcon = "🟦 ";
                } else if (name.EndsWith("Struct")) {
                    sidebarPos = 3;
                    // sidebarIcon = "🟩 ";
                    name = name.Substring(0, name.LastIndexOf(" "));
                } else if (name.EndsWith("Enum")) {
                    sidebarPos = 4;
                    // sidebarIcon = "🟣 ";
                    name = name.Substring(0, name.LastIndexOf(" "));
                }

                File.WriteAllText(
                    indexPath,
                    $"""
                    ---
                    title: {name}
                    sidebar_position: {sidebarPos}
                    sidebar_label: {name}
                    ---
                    {indexContent}
                    """);
            }
        }
    }

    public static async Task UpdateVpkCliReference(string outputCliReference)
    {
        var dl = new NugetDownloader(new NullLogger());
        Console.WriteLine("Searching for latest VPK nuget package");

        var vpkMetadata = await dl.GetPackageMetadata("vpk", "latest", CancellationToken.None);

        Console.WriteLine($"VPK: {vpkMetadata.Identity.Version}");

        Console.WriteLine("Downloading VPK nuget package");
        using var vpkStream = new MemoryStream();
        await dl.DownloadPackageToStream(vpkMetadata, vpkStream, CancellationToken.None);

        Console.WriteLine("Extracting VPK nuget package");
        vpkStream.Position = 0;

        var extractedVpk = Path.Combine(AppContext.BaseDirectory, "ref_VPK");

        if (Directory.Exists(extractedVpk)) Directory.Delete(extractedVpk, true);
        if (Directory.Exists(outputCliReference)) Directory.Delete(outputCliReference, true);
        ZipFile.ExtractToDirectory(vpkStream, extractedVpk);

        var vpkDll = Path.Combine(extractedVpk, "tools", "net8.0", "any", "vpk.dll");

        Directory.CreateDirectory(outputCliReference);

        Console.WriteLine("Generating Reference to: " + outputCliReference);

        if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows)) {
            Console.WriteLine("Generating Win Setup.exe");
            try {
                var setupExe = Path.Combine(extractedVpk, "vendor", "setup.exe");
                var setupHelp = await RunCaptureStdOut(setupExe, ["-h"]);
                File.WriteAllText(
                    Path.Combine(outputCliReference, "setup-windows.mdx"),
                    $"""
                # Setup.exe (Windows)
                ```
                {setupHelp}
                ```
                """);
            } catch (TaskCanceledException ex) {
                Console.WriteLine("Failed to generate setup-windows.mdx: " + ex.Message);
            }

            Console.WriteLine("Generating Win Update.exe");
            var updateExe = Path.Combine(extractedVpk, "vendor", "update.exe");
            var updateHelp = await RunCaptureStdOut(updateExe, ["-h"]);
            File.WriteAllText(
                Path.Combine(outputCliReference, "update-windows.mdx"),
                $"""
                # Update.exe (Windows)
                ```
                {updateHelp}
                ```
                """);

            Console.WriteLine("Generating Win VPK");
            var vpkWindows = await GetVpkHelpForDirective("[win]", vpkDll);
            var vpkStringBuilder = new StringBuilder();
            var vpkTocSb = new StringBuilder();
            AppendVpkCommand(vpkStringBuilder, vpkTocSb, vpkWindows, "vpk", 0);
            File.WriteAllText(
                Path.Combine(outputCliReference, "vpk-windows.mdx"),
                $"""
                # vpk (Windows)

                {vpkStringBuilder}
                """
            );
        }

        if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux)) {
            Console.WriteLine("Generating Linux UpdateNix_x64");
            var updateExe = Path.Combine(extractedVpk, "vendor", "UpdateNix_x64");
            Util.ChmodFileAsExecutable(updateExe);
            var updateHelp = await RunCaptureStdOut(updateExe, ["-h"]);
            File.WriteAllText(
                Path.Combine(outputCliReference, "update-linux.mdx"),
                $"""
                # Update.exe (Linux)
                ```
                {updateHelp}
                ```
                """);

            Console.WriteLine("Generating Linux VPK");
            var vpkLinux = await GetVpkHelpForDirective("[linux]", vpkDll);
            var vpkStringBuilder = new StringBuilder();
            var vpkTocSb = new StringBuilder();
            AppendVpkCommand(vpkStringBuilder, vpkTocSb, vpkLinux, "vpk", 0);
            File.WriteAllText(
                Path.Combine(outputCliReference, "vpk-linux.mdx"),
                $"""
                # vpk (Linux)

                {vpkStringBuilder}
                """
            );
        }

        if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX)) {
            Console.WriteLine("Generating MacOS UpdateMac");
            var updateExe = Path.Combine(extractedVpk, "vendor", "UpdateMac");
            Util.ChmodFileAsExecutable(updateExe);
            var updateHelp = await RunCaptureStdOut(updateExe, ["-h"]);
            File.WriteAllText(
                Path.Combine(outputCliReference, "update-osx.mdx"),
                $"""
                # Update.exe (MacOS)
                ```
                {updateHelp}
                ```
                """);

            Console.WriteLine("Generating MacOS VPK");
            var vpkOsx = await GetVpkHelpForDirective("[osx]", vpkDll);

            var vpkStringBuilder = new StringBuilder();
            var vpkTocSb = new StringBuilder();
            AppendVpkCommand(vpkStringBuilder, vpkTocSb, vpkOsx, "vpk", 0);
            File.WriteAllText(
                Path.Combine(outputCliReference, "vpk-osx.mdx"),
                $"""
                # vpk (MacOS)

                {vpkStringBuilder}
                """
            );
        }
    }

    static void AppendVpkCommand(StringBuilder helpsb, StringBuilder tocsb, VpkCommand command, string parentCmd,
        int depth = 0)
    {
        var commandString = $"{parentCmd.Trim()} {command.Name}";
        helpsb.AppendLine();
        helpsb.AppendLine($"## `{commandString.Trim()} -H`");
        helpsb.AppendLine($"```");
        helpsb.AppendLine(command.HelpText);
        helpsb.AppendLine($"```");

        // sb.AppendLine($"{new string(' ', depth * 2)}## {command.Name}");
        // sb.AppendLine($"{new string(' ', depth * 2)}{command.HelpText}");
        // sb.AppendLine();

        foreach (var subCommand in command.SubCommands) {
            AppendVpkCommand(helpsb, tocsb, subCommand, commandString, depth + 1);
        }
    }

    static async Task<VpkCommand> GetVpkHelpForDirective(string directive, string vpkDll)
    {
        var help = await RunCaptureStdOut("dotnet", [vpkDll, directive, "-h"]);
        var root = new VpkCommand("", help);

        await RecursivelyPopulateSubCommands(root, [vpkDll, directive]);
        return root;
    }

    static async Task RecursivelyPopulateSubCommands(VpkCommand root, IEnumerable<string> args)
    {
        var subCommands = GetCommandsFromHelp(root.HelpText);

        foreach (var subCommand in subCommands) {
            var subCommandHelp = await RunCaptureStdOut("dotnet", [.. args, subCommand, "-H"]);
            var subCommandObj = new VpkCommand(subCommand, subCommandHelp);
            root.SubCommands.Add(subCommandObj);
            await RecursivelyPopulateSubCommands(subCommandObj, [.. args, subCommand]);
        }
    }

    class VpkCommand
    {
        public VpkCommand(string name, string helpText)
        {
            Name = name;
            HelpText = helpText.Trim();

            if (helpText.Contains("Directive enabled"))
                HelpText = helpText.Substring(helpText.IndexOf("\n")).Trim();
        }

        public string Name { get; set; }
        public string HelpText { get; set; }
        public List<VpkCommand> SubCommands { get; set; } = new();
    }

    static string[] GetCommandsFromHelp(string stdout)
    {
        //Console.WriteLine("Trying to determine sub commands from output:");
        //Console.WriteLine(stdout);

        var commandsIdx = stdout.IndexOf("Commands:");
        if (commandsIdx == -1) return [];
        var commandsText = stdout.Substring(commandsIdx);

        var lines = commandsText.Split(new[] { '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);

        //Console.WriteLine("Lines: ");
        //foreach (var line in lines) {
        //    Console.WriteLine(" - " + line);
        //}

        var commands = lines.Skip(1)
            .Where(l => !l.StartsWith("    "))
            .Select(l => l.Trim())
            .Select(l => l.Substring(0, l.IndexOf(" ")))
            .ToArray();

        //Console.WriteLine("Commands: ");
        //foreach (var cmd in commands) {
        //    Console.WriteLine(" - " + cmd);
        //}

        return commands;
    }

    static async Task<string> RunCaptureStdOut(string exePath, string[] args)
    {
        var psi = new ProcessStartInfo {
            FileName = exePath,
            //Arguments = string.Join(" ", args),
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            UseShellExecute = false,
        };
        psi.ArgumentList.AddRange(args);

        Console.WriteLine($"Running: {exePath} {string.Join(" ", args)}");

        string output = await RunCaptureStdOut(psi);
        return Util.RemoveConsoleColors(output);
    }

    static async Task<string> RunCaptureStdOut(ProcessStartInfo psi)
    {
        var p = new Process();
        p.StartInfo = psi;
        var sw = new StringBuilder();
        p.OutputDataReceived += (sender, e) => sw.AppendLine(e?.Data);
        p.Start();
        p.BeginOutputReadLine();

        var timeout = new CancellationTokenSource(60 * 1000);
        await p.WaitForExitAsync(timeout.Token);
        return sw.ToString();
    }
}