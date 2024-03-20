---
title: Class GithubSource
sidebar_label: GithubSource
description: "Retrieves available releases from a GitHub repository."
---
# Class GithubSource
Retrieves available releases from a GitHub repository.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L61)
```csharp title="Declaration"
public class GithubSource : GitBase<GithubRelease>, IUpdateSource
```
**Inheritance:** `System.Object` -> [Velopack.Sources.GitBase&lt;T&gt;](../Velopack.Sources/GitBase`T`.md)

**Implements:**  
[Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource.md)

## Methods
### GetReleases(bool)
Retrieves a list of [Velopack.Sources.GithubRelease](../Velopack.Sources/GithubRelease.md) from the current repository.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L86)
```csharp title="Declaration"
protected override Task<GithubRelease[]> GetReleases(bool includePrereleases)
```

##### Returns

`System.Threading.Tasks.Task<Velopack.Sources.GithubRelease[]>`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Boolean` | *includePrereleases* |

### GetAssetUrlFromName(GithubRelease, string)
Given a [Velopack.Sources.GithubRelease](../Velopack.Sources/GithubRelease.md) and an asset filename (eg. 'RELEASES') this 
function will return either [Velopack.Sources.GithubReleaseAsset.BrowserDownloadUrl](../Velopack.Sources/GithubReleaseAsset.md#browserdownloadurl) or
[Velopack.Sources.GithubReleaseAsset.Url](../Velopack.Sources/GithubReleaseAsset.md#url), depending whether an access token is available
or not. Throws if the specified release has no matching assets.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L101)
```csharp title="Declaration"
protected override string GetAssetUrlFromName(GithubRelease release, string assetName)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.Sources.GithubRelease](../Velopack.Sources/GithubRelease.md) | *release* |
| `System.String` | *assetName* |

### GetApiBaseUrl(Uri)
Given a repository URL (e.g. https://github.com/myuser/myrepo) this function
returns the API base for performing requests. (eg. "https://api.github.com/" 
or http://internal.github.server.local/api/v3)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L135)
```csharp title="Declaration"
protected virtual Uri GetApiBaseUrl(Uri repoUrl)
```

##### Returns

`System.Uri`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Uri` | *repoUrl* |


## Implements

* [Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource.md)
