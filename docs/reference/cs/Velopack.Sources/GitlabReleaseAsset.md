---
title: Class GitlabReleaseAsset
sidebar_label: GitlabReleaseAsset
description: "Describes a container for the assets attached to a release."
---
# Class GitlabReleaseAsset
Describes a container for the assets attached to a release.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L43)
```csharp title="Declaration"
public class GitlabReleaseAsset
```
## Properties
### Count
The amount of assets linked to the release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L48)
```csharp title="Declaration"
public int Count { get; set; }
```
### Links
A list of asset (file) links.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L54)
```csharp title="Declaration"
public GitlabReleaseLink[] Links { get; set; }
```
