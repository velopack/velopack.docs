---
title: Class ZipPackage
sidebar_label: ZipPackage
---
# Class ZipPackage


###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackage.cs#L10)
```csharp title="Declaration"
public class ZipPackage : PackageManifest
```
**Inheritance:** `System.Object` -> [Velopack.NuGet.PackageManifest](../Velopack.NuGet/PackageManifest)

## Properties
### Files

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackage.cs#L12)
```csharp title="Declaration"
public IEnumerable<ZipPackageFile> Files { get; }
```
### UpdateExeBytes

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackage.cs#L14)
```csharp title="Declaration"
public byte[]? UpdateExeBytes { get; }
```
### LoadedFromPath

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackage.cs#L16)
```csharp title="Declaration"
public string LoadedFromPath { get; }
```
## Methods
### ReadFile(ZipArchive, Func&lt;ZipArchiveEntry, bool&gt;)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackage.cs#L33)
```csharp title="Declaration"
protected byte[]? ReadFile(ZipArchive archive, Func<ZipArchiveEntry, bool> predicate)
```

##### Returns

`System.Byte[]`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.IO.Compression.ZipArchive` | *archive* |
| `System.Func<System.IO.Compression.ZipArchiveEntry,System.Boolean>` | *predicate* |

