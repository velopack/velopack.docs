using System.Diagnostics;
using System.IO.Compression;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.RegularExpressions;
using NuGet.Common;

namespace DocGenerator;

class Program
{
    static async Task Main(string[] args)
    {
        var scriptsDir = Assembly.GetEntryAssembly()!
            .GetCustomAttributes<AssemblyMetadataAttribute>()
            .Single(x => x.Key == "ScriptsDir").Value!;

        var outputCsharpReference = Path.Combine(scriptsDir, "..", "docs", "reference", "cs");
        var outputCliReference = Path.Combine(scriptsDir, "..", "docs", "reference", "cli", "content");
        await CSharpReference.UpdateCSharpReference(outputCsharpReference);
        await CSharpReference.UpdateVpkCliReference(outputCliReference);
        
        
    }
}