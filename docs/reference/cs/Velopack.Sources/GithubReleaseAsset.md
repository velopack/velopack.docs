---
title: Class GithubReleaseAsset
sidebar_label: GithubReleaseAsset
description: "Describes a asset (file) uploaded to a GitHub release."
---
# Class GithubReleaseAsset
Describes a asset (file) uploaded to a GitHub release.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L31)
```csharp title="Declaration"
public class GithubReleaseAsset
```
## Properties
### Url
The asset URL for this release asset. Requests to this URL will use API
quota and return JSON unless the 'Accept' header is "application/octet-stream".
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L37)
```csharp title="Declaration"
public string? Url { get; set; }
```
### BrowserDownloadUrl
The browser URL for this release asset. This does not use API quota,
however this URL only works for public repositories. If downloading
assets from a private repository, the [Velopack.Sources.GithubReleaseAsset.Url](../Velopack.Sources/GithubReleaseAsset.md#url) property must
be used with an appropriate access token.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L46)
```csharp title="Declaration"
public string? BrowserDownloadUrl { get; set; }
```
### Name
The name of this release asset.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L50)
```csharp title="Declaration"
public string? Name { get; set; }
```
### ContentType
The mime type of this release asset (as detected by GitHub).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GithubSource.cs#L54)
```csharp title="Declaration"
public string? ContentType { get; set; }
```
