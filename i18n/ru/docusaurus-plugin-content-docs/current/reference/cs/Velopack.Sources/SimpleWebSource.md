---
title: Class SimpleWebSource
sidebar_label: SimpleWebSource
description: "Retrieves updates from a static file host or other web server. 
Will perform a request for '{baseUri}/RELEASES' to locate the available packages,
and provides query parameters to specify the name of the requested package."
---
# Class SimpleWebSource
Retrieves updates from a static file host or other web server. 
Will perform a request for '{baseUri}/RELEASES' to locate the available packages,
and provides query parameters to specify the name of the requested package.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/SimpleWebSource.cs#L14)
```csharp title="Declaration"
public class SimpleWebSource : IUpdateSource
```
**Implements:**  
[Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource)

## Properties
### BaseUri
The URL of the server hosting packages to update to.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/SimpleWebSource.cs#L17)
```csharp title="Declaration"
public virtual Uri BaseUri { get; }
```
### Downloader
The [Velopack.Sources.IFileDownloader](../Velopack.Sources/IFileDownloader) to be used for performing http requests.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/SimpleWebSource.cs#L20)
```csharp title="Declaration"
public virtual IFileDownloader Downloader { get; }
```
## Methods
### GetReleaseFeed(ILogger, string, Guid?, VelopackAsset?)
Retrieve the list of available remote releases from the package source. These releases
can subsequently be downloaded with `Velopack.Sources.IUpdateSource.DownloadReleaseEntry(Microsoft.Extensions.Logging.ILogger%2cVelopack.VelopackAsset%2cSystem.String%2cSystem.Action%7bSystem.Int32%7d%2cSystem.Threading.CancellationToken)`.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/SimpleWebSource.cs#L35)
```csharp title="Declaration"
public Task<VelopackAssetFeed> GetReleaseFeed(ILogger logger, string channel, Guid? stagingId = null, VelopackAsset? latestLocalRelease = null)
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
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/SimpleWebSource.cs#L63)
```csharp title="Declaration"
public Task DownloadReleaseEntry(ILogger logger, VelopackAsset releaseEntry, string localFile, Action<int> progress, CancellationToken cancelToken)
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


## Implements

* [Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource)
