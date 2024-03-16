---
title: Class GitlabRelease
sidebar_label: GitlabRelease
description: "Describes a Gitlab release, plus any assets that are attached."
---
# Class GitlabRelease
Describes a Gitlab release, plus any assets that are attached.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L13)
```csharp title="Declaration"
public class GitlabRelease
```
## Properties
### Name
The name of the release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L18)
```csharp title="Declaration"
public string? Name { get; set; }
```
### UpcomingRelease
True if this is intended for an upcoming release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L24)
```csharp title="Declaration"
public bool UpcomingRelease { get; set; }
```
### ReleasedAt
The date which this release was published publicly.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L30)
```csharp title="Declaration"
public DateTime? ReleasedAt { get; set; }
```
### Assets
A container for the assets (files) uploaded to this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L36)
```csharp title="Declaration"
public GitlabReleaseAsset? Assets { get; set; }
```
