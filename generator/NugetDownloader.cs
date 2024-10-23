using NuGet.Configuration;
using NuGet.Packaging.Core;
using NuGet.Protocol.Core.Types;
using NuGet.Versioning;
using NugetLevel = NuGet.Common.LogLevel;
using NugetLogger = NuGet.Common.ILogger;
using NugetMessage = NuGet.Common.ILogMessage;

namespace DocGenerator;

public class NugetDownloader
{
    private readonly NugetLogger _logger;
    private readonly PackageSource _packageSource;
    private readonly SourceRepository _sourceRepository;
    private readonly SourceCacheContext _sourceCacheContext;

    public NugetDownloader(NugetLogger logger)
    {
        _logger = logger;
        _packageSource = new PackageSource("https://api.nuget.org/v3/index.json", "NuGet.org");
        _sourceRepository = new SourceRepository(_packageSource, Repository.Provider.GetCoreV3());
        _sourceCacheContext = new SourceCacheContext();
    }

    public async Task<IPackageSearchMetadata> GetPackageMetadata(string packageName, string version, CancellationToken cancellationToken)
    {
        PackageMetadataResource packageMetadataResource = _sourceRepository.GetResource<PackageMetadataResource>();
        FindPackageByIdResource packageByIdResource = _sourceRepository.GetResource<FindPackageByIdResource>();
        IPackageSearchMetadata package = null!;

        var prerelease = version?.Equals("pre", StringComparison.InvariantCultureIgnoreCase) == true;
        if (version is null || version.Equals("latest", StringComparison.InvariantCultureIgnoreCase) || prerelease) {
            // get latest (or prerelease) version
            IEnumerable<IPackageSearchMetadata> metadata = await packageMetadataResource
                .GetMetadataAsync(packageName, true, true, _sourceCacheContext, _logger, cancellationToken)
                .ConfigureAwait(false);
            package = metadata
                .Where(x => x.IsListed)
                .Where(x => prerelease || !x.Identity.Version.IsPrerelease)
                .OrderByDescending(x => x.Identity.Version)
                .First();
        } else {
            // resolve version ranges and wildcards
            var versions = await packageByIdResource.GetAllVersionsAsync(packageName, _sourceCacheContext, _logger, cancellationToken)
                .ConfigureAwait(false);
            var resolved = versions.FindBestMatch(VersionRange.Parse(version), version => version);

            // get exact version
            var packageIdentity = new PackageIdentity(packageName, resolved);
            package = await packageMetadataResource
                .GetMetadataAsync(packageIdentity, _sourceCacheContext, _logger, cancellationToken)
                .ConfigureAwait(false);
        }

        if (package is null) {
            throw new Exception($"Unable to locate {packageName} {version} on NuGet.org");
        }

        return package;
    }

    public async Task DownloadPackageToStream(IPackageSearchMetadata package, Stream targetStream, CancellationToken cancellationToken)
    {
        FindPackageByIdResource packageByIdResource = _sourceRepository.GetResource<FindPackageByIdResource>();
        await packageByIdResource
            .CopyNupkgToStreamAsync(package.Identity.Id, package.Identity.Version, targetStream, _sourceCacheContext, _logger, cancellationToken)
            .ConfigureAwait(false);
    }
}

class NullNugetLogger : NugetLogger
{
    void NugetLogger.LogDebug(string data)
    {
    }

    void NugetLogger.LogVerbose(string data)
    {
    }

    void NugetLogger.LogInformation(string data)
    {
    }

    void NugetLogger.LogMinimal(string data)
    {
    }

    void NugetLogger.LogWarning(string data)
    {
    }

    void NugetLogger.LogError(string data)
    {
    }

    void NugetLogger.LogInformationSummary(string data)
    {
    }

    void NugetLogger.Log(NugetLevel level, string data)
    {
    }

    Task NugetLogger.LogAsync(NugetLevel level, string data)
    {
        return Task.CompletedTask;
    }

    void NugetLogger.Log(NugetMessage message)
    {
    }

    Task NugetLogger.LogAsync(NugetMessage message)
    {
        return Task.CompletedTask;
    }
}