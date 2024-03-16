---
title: Interface IUpdateSource
sidebar_label: IUpdateSource
description: "Abstraction for finding and downloading updates from a package source / repository.
An implementation may copy a file from a local repository, download from a web address, 
or even use third party services and parse proprietary data to produce a package feed."
---
# Interface IUpdateSource
Abstraction for finding and downloading updates from a package source / repository.
An implementation may copy a file from a local repository, download from a web address, 
or even use third party services and parse proprietary data to produce a package feed.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/IUpdateSource.cs#L13)
```csharp title="Declaration"
public interface IUpdateSource
```
## Methods
### GetReleaseFeed(ILogger, string, Guid?, VelopackAsset?)
Retrieve the list of available remote releases from the package source. These releases
can subsequently be downloaded with `Velopack.Sources.IUpdateSource.DownloadReleaseEntry(Microsoft.Extensions.Logging.ILogger%2cVelopack.VelopackAsset%2cSystem.String%2cSystem.Action%7bSystem.Int32%7d%2cSystem.Threading.CancellationToken)`.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/IUpdateSource.cs#L31)
```csharp title="Declaration"
Task<VelopackAssetFeed> GetReleaseFeed(ILogger logger, string channel, Guid? stagingId = null, VelopackAsset? latestLocalRelease = null)
```

##### Returns

`System.Threading.Tasks.Task<Velopack.VelopackAssetFeed>`: An array of [Velopack.ReleaseEntry](../Velopack/ReleaseEntry) objects that are available for download
    and are applicable to this user.
##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `Microsoft.Extensions.Logging.ILogger` | *logger* | The logger to use for any diagnostic messages. |
| `System.String` | *channel* | Release channel to filter packages by. Can be null, which is the 
    default channel for this operating system. |
| `System.Nullable<System.Guid>` | *stagingId* | A persistent user-id, used for calculating whether a specific
    release should be available to this user or not. (eg, for the purposes of rolling out
    an update to only a small portion of users at a time). |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset) | *latestLocalRelease* | The latest / current local release. If specified,
    metadata from this package may be provided to the remote server (such as package id,
    or cpu architecture) to ensure that the correct package is downloaded for this user. |

### DownloadReleaseEntry(ILogger, VelopackAsset, string, Action&lt;int&gt;, CancellationToken)
Download the specified [Velopack.VelopackAsset](../Velopack/VelopackAsset) to the provided local file path.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/IUpdateSource.cs#L43)
```csharp title="Declaration"
Task DownloadReleaseEntry(ILogger logger, VelopackAsset releaseEntry, string localFile, Action<int> progress, CancellationToken cancelToken = default)
```

##### Returns

`System.Threading.Tasks.Task`

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `Microsoft.Extensions.Logging.ILogger` | *logger* | The logger to use for any diagnostic messages. |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset) | *releaseEntry* | The release to download. |
| `System.String` | *localFile* | The path on the local disk to store the file. If this file exists,
    it will be overwritten. |
| `System.Action<System.Int32>` | *progress* | This delegate will be executed with values from 0-100 as the
    download is being processed. |
| `System.Threading.CancellationToken` | *cancelToken* | A token to use to cancel the request. |

