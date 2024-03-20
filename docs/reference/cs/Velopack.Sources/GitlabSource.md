---
title: Class GitlabSource
sidebar_label: GitlabSource
description: "Retrieves available releases from a GitLab repository. This class only
downloads assets from the very latest GitLab release."
---
# Class GitlabSource
Retrieves available releases from a GitLab repository. This class only
downloads assets from the very latest GitLab release.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L95)
```csharp title="Declaration"
public class GitlabSource : GitBase<GitlabRelease>, IUpdateSource
```
**Inheritance:** `System.Object` -> [Velopack.Sources.GitBase&lt;T&gt;](../Velopack.Sources/GitBase`T`.md)

**Implements:**  
[Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource.md)

## Methods
### GetAssetUrlFromName(GitlabRelease, string)
Given a [Velopack.Sources.GitlabRelease](../Velopack.Sources/GitlabRelease.md) and an asset filename (eg. 'RELEASES') this 
function will return either [Velopack.Sources.GitlabReleaseLink.DirectAssetUrl](../Velopack.Sources/GitlabReleaseLink.md#directasseturl) or
[Velopack.Sources.GitlabReleaseLink.Url](../Velopack.Sources/GitlabReleaseLink.md#url), depending whether an access token is available
or not. Throws if the specified release has no matching assets.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L123)
```csharp title="Declaration"
protected override string GetAssetUrlFromName(GitlabRelease release, string assetName)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.Sources.GitlabRelease](../Velopack.Sources/GitlabRelease.md) | *release* |
| `System.String` | *assetName* |

### GetReleases(bool)
Retrieves a list of [Velopack.Sources.GitlabRelease](../Velopack.Sources/GitlabRelease.md) from the current repository.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L147)
```csharp title="Declaration"
protected override Task<GitlabRelease[]> GetReleases(bool includePrereleases)
```

##### Returns

`System.Threading.Tasks.Task<Velopack.Sources.GitlabRelease[]>`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Boolean` | *includePrereleases* |


## Implements

* [Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource.md)
