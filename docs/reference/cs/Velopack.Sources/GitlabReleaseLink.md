---
title: Class GitlabReleaseLink
sidebar_label: GitlabReleaseLink
description: "Describes a container for the links of assets attached to a release."
---
# Class GitlabReleaseLink
Describes a container for the links of assets attached to a release.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L61)
```csharp title="Declaration"
public class GitlabReleaseLink
```
## Properties
### Name
Name of the asset (file) linked.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L66)
```csharp title="Declaration"
public string? Name { get; set; }
```
### Url
The url for the asset. This make use of the Gitlab API.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L72)
```csharp title="Declaration"
public string? Url { get; set; }
```
### DirectAssetUrl
A direct url to the asset, via a traditional URl. 
As a posed to using the API.
This links directly to the raw asset (file).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L80)
```csharp title="Declaration"
public string? DirectAssetUrl { get; set; }
```
### Type
The category type that the asset is listed under.
Options: 'Package', 'Image', 'Runbook', 'Other'
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitlabSource.cs#L87)
```csharp title="Declaration"
public string? Type { get; set; }
```
