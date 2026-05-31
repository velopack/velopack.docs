using System.IO.Compression;
using NuGet.Common;

namespace DocGenerator;

internal readonly record struct NugetPackage(string ExtractDir, string Version);

/// <summary>
/// Thin static convenience layer over the instance-based <see cref="NugetDownloader"/>:
/// resolve latest → download → extract → report version. Reused by the C# pipeline.
/// </summary>
internal static class NugetHelper
{
    public static async Task<NugetPackage> DownloadAndExtractAsync(string packageId, string extractDir)
    {
        var dl = new NugetDownloader(new NullLogger());
        Console.WriteLine($"  Resolving latest {packageId} on NuGet.org...");
        var metadata = await dl.GetPackageMetadata(packageId, "latest", CancellationToken.None);
        var version = metadata.Identity.Version.ToNormalizedString();
        Console.WriteLine($"  {packageId}: {version}");

        using var stream = new MemoryStream();
        await dl.DownloadPackageToStream(metadata, stream, CancellationToken.None);
        stream.Position = 0;

        if (Directory.Exists(extractDir))
            Directory.Delete(extractDir, recursive: true);
        Directory.CreateDirectory(extractDir);
        ZipFile.ExtractToDirectory(stream, extractDir);
        Console.WriteLine($"  Extracted to {extractDir}");

        return new NugetPackage(extractDir, version);
    }
}
