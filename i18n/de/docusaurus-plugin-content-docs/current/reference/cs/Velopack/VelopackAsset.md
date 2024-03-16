---
title: Class VelopackAsset
sidebar_label: VelopackAsset
description: "An individual Velopack asset, could refer to an asset on-disk or in a remote package feed."
---
# Class VelopackAsset
An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L43)
```csharp title="Declaration"
public record VelopackAsset : IEquatable<VelopackAsset>
```
**Derived:**  
[Velopack.Sources.GitBase&lt;T&gt;.GitBaseAsset](../Velopack.Sources/GitBase`T`.GitBaseAsset)

**Implements:**  
`System.IEquatable<Velopack.VelopackAsset>`

## Properties
### PackageId
The name or Id of the package containing this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L46)
```csharp title="Declaration"
public string PackageId { get; init; }
```
### Version
The version of this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L49)
```csharp title="Declaration"
public SemanticVersion Version { get; init; }
```
### Type
The type of asset (eg. full or delta).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L52)
```csharp title="Declaration"
public VelopackAssetType Type { get; init; }
```
### FileName
The filename of the update package containing this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L55)
```csharp title="Declaration"
public string FileName { get; init; }
```
### SHA1
The SHA1 checksum of the update package containing this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L58)
```csharp title="Declaration"
public string SHA1 { get; init; }
```
### Size
The size in bytes of the update package containing this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L61)
```csharp title="Declaration"
public long Size { get; init; }
```
### NotesMarkdown
The release notes in markdown format, as passed to Velopack when packaging the release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L64)
```csharp title="Declaration"
public string NotesMarkdown { get; init; }
```
### NotesHTML
The release notes in HTML format, transformed from Markdown when packaging the release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L67)
```csharp title="Declaration"
public string NotesHTML { get; init; }
```
## Methods
### FromZipPackage(ZipPackage)
Convert a [Velopack.NuGet.ZipPackage](../Velopack.NuGet/ZipPackage) to a [Velopack.VelopackAsset](../Velopack/VelopackAsset).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L72)
```csharp title="Declaration"
public static VelopackAsset FromZipPackage(ZipPackage zip)
```

##### Returns

[Velopack.VelopackAsset](../Velopack/VelopackAsset)

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.NuGet.ZipPackage](../Velopack.NuGet/ZipPackage) | *zip* |

### FromNupkg(string)
Load a [Velopack.VelopackAsset](../Velopack/VelopackAsset) from a .nupkg file on disk.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L90)
```csharp title="Declaration"
public static VelopackAsset FromNupkg(string filePath)
```

##### Returns

[Velopack.VelopackAsset](../Velopack/VelopackAsset)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *filePath* |


## Implements

* `System.IEquatable<Velopack.VelopackAsset>`
