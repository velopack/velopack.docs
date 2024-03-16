---
title: Class GithubRelease
sidebar_label: GithubRelease
description: "Describes a GitHub release, including attached assets."
---
# Class GithubRelease
Describes a GitHub release, including attached assets.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L11)
```csharp title="Declaration"
public class GithubRelease
```
## Properties
### Name
The name of this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L14)
```csharp title="Declaration"
public string? Name { get; set; }
```
### Prerelease
True if this release is a prerelease.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L18)
```csharp title="Declaration"
public bool Prerelease { get; set; }
```
### PublishedAt
The date which this release was published publicly.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L22)
```csharp title="Declaration"
public DateTime? PublishedAt { get; set; }
```
### Assets
A list of assets (files) uploaded to this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L26)
```csharp title="Declaration"
public GithubReleaseAsset[] Assets { get; set; }
```
