---
title: Class GitBase<T>
sidebar_label: GitBase<T>
description: "Base class to provide some shared implementation between sources which download releases from a Git repository."
---
# Class GitBase&lt;T&gt;
Base class to provide some shared implementation between sources which download releases from a Git repository.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L13)
```csharp title="Declaration"
public abstract class GitBase<T> : IUpdateSource
```
**Derived:**  
[Velopack.Sources.GithubSource](../Velopack.Sources/GithubSource.md), [Velopack.Sources.GitlabSource](../Velopack.Sources/GitlabSource.md)

**Implements:**  
[Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource.md)

## Properties
### RepoUri
The URL of the repository to download releases from.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L18)
```csharp title="Declaration"
public virtual Uri RepoUri { get; }
```
### Prerelease
If true, the latest upcoming/prerelease release will be downloaded. If false, the latest 
stable release will be downloaded.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L24)
```csharp title="Declaration"
public virtual bool Prerelease { get; }
```
### Downloader
The file downloader used to perform HTTP requests.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L29)
```csharp title="Declaration"
public virtual IFileDownloader Downloader { get; }
```
### AccessToken
The GitLab access token to use with the request to download releases.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L34)
```csharp title="Declaration"
protected virtual string? AccessToken { get; }
```
### Authorization
The Bearer token used in the request.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L39)
```csharp title="Declaration"
protected virtual string? Authorization { get; }
```
## Methods
### DownloadReleaseEntry(ILogger, VelopackAsset, string, Action&lt;int&gt;, CancellationToken)
Download the specified [Velopack.VelopackAsset](../Velopack/VelopackAsset.md) to the provided local file path.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L51)
```csharp title="Declaration"
public virtual Task DownloadReleaseEntry(ILogger logger, VelopackAsset releaseEntry, string localFile, Action<int> progress, CancellationToken cancelToken)
```

##### Returns

`System.Threading.Tasks.Task`

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `Microsoft.Extensions.Logging.ILogger` | *logger* | The logger to use for any diagnostic messages. |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset.md) | *releaseEntry* | The release to download. |
| `System.String` | *localFile* | The path on the local disk to store the file. If this file exists,
    it will be overwritten. |
| `System.Action<System.Int32>` | *progress* | This delegate will be executed with values from 0-100 as the
    download is being processed. |
| `System.Threading.CancellationToken` | *cancelToken* | A token to use to cancel the request. |

### GetReleaseFeed(ILogger, string, Guid?, VelopackAsset?)
Retrieve the list of available remote releases from the package source. These releases
can subsequently be downloaded with `Velopack.Sources.IUpdateSource.DownloadReleaseEntry(Microsoft.Extensions.Logging.ILogger%2cVelopack.VelopackAsset%2cSystem.String%2cSystem.Action%7bSystem.Int32%7d%2cSystem.Threading.CancellationToken)`.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L64)
```csharp title="Declaration"
public virtual Task<VelopackAssetFeed> GetReleaseFeed(ILogger logger, string channel, Guid? stagingId = null, VelopackAsset? latestLocalRelease = null)
```

##### Returns

`System.Threading.Tasks.Task<Velopack.VelopackAssetFeed>`: An array of [Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md) objects that are available for download
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
| [Velopack.VelopackAsset](../Velopack/VelopackAsset.md) | *latestLocalRelease* | The latest / current local release. If specified,
    metadata from this package may be provided to the remote server (such as package id,
    or cpu architecture) to ensure that the correct package is downloaded for this user. |

### GetReleases(bool)
Retrieves a list of [Velopack.Sources.GithubRelease](../Velopack.Sources/GithubRelease.md) from the current repository.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L101)
```csharp title="Declaration"
protected abstract Task<T[]> GetReleases(bool includePrereleases)
```

##### Returns

`System.Threading.Tasks.Task<<T>[]>`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Boolean` | *includePrereleases* |

### GetAssetUrlFromName(T, string)
Given a [Velopack.Sources.GithubRelease](../Velopack.Sources/GithubRelease.md) and an asset filename (eg. 'RELEASES') this 
function will return either [Velopack.Sources.GithubReleaseAsset.BrowserDownloadUrl](../Velopack.Sources/GithubReleaseAsset.md#browserdownloadurl) or
[Velopack.Sources.GithubReleaseAsset.Url](../Velopack.Sources/GithubReleaseAsset.md#url), depending whether an access token is available
or not. Throws if the specified release has no matching assets.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L109)
```csharp title="Declaration"
protected abstract string GetAssetUrlFromName(T release, string assetName)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| `<T>` | *release* |
| `System.String` | *assetName* |


## Implements

* [Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource.md)
