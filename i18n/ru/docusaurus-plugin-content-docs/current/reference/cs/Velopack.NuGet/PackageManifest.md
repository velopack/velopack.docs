---
title: Class PackageManifest
sidebar_label: PackageManifest
---
# Class PackageManifest


###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L11)
```csharp title="Declaration"
public class PackageManifest
```
**Derived:**  
[Velopack.NuGet.ZipPackage](../Velopack.NuGet/ZipPackage)

## Properties
### ProductName

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L13)
```csharp title="Declaration"
public string? ProductName { get; }
```
### ProductDescription

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L14)
```csharp title="Declaration"
public string? ProductDescription { get; }
```
### ProductCompany

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L15)
```csharp title="Declaration"
public string? ProductCompany { get; }
```
### ProductCopyright

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L16)
```csharp title="Declaration"
public string? ProductCopyright { get; }
```
### Id

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L17)
```csharp title="Declaration"
public string? Id { get; }
```
### Version

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L18)
```csharp title="Declaration"
public SemanticVersion? Version { get; }
```
### ProjectUrl

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L19)
```csharp title="Declaration"
public Uri? ProjectUrl { get; }
```
### ReleaseNotes

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L20)
```csharp title="Declaration"
public string? ReleaseNotes { get; }
```
### ReleaseNotesHtml

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L21)
```csharp title="Declaration"
public string? ReleaseNotesHtml { get; }
```
### IconUrl

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L22)
```csharp title="Declaration"
public Uri? IconUrl { get; }
```
### Language

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L23)
```csharp title="Declaration"
public string? Language { get; }
```
### Channel

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L24)
```csharp title="Declaration"
public string? Channel { get; }
```
### Description

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L25)
```csharp title="Declaration"
public string? Description { get; }
```
### Owners

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L26)
```csharp title="Declaration"
public string? Owners { get; }
```
### Title

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L27)
```csharp title="Declaration"
public string? Title { get; }
```
### Summary

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L28)
```csharp title="Declaration"
public string? Summary { get; }
```
### Copyright

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L29)
```csharp title="Declaration"
public string? Copyright { get; }
```
### Authors

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L30)
```csharp title="Declaration"
public IEnumerable<string> Authors { get; }
```
### RuntimeDependencies

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L31)
```csharp title="Declaration"
public IEnumerable<string> RuntimeDependencies { get; }
```
## Methods
### ParseFromFile(string)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L37)
```csharp title="Declaration"
public static PackageManifest ParseFromFile(string filePath)
```

##### Returns

[Velopack.NuGet.PackageManifest](../Velopack.NuGet/PackageManifest)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *filePath* |

### TryParseFromFile(string, out PackageManifest)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L46)
```csharp title="Declaration"
public static bool TryParseFromFile(string filePath, out PackageManifest manifest)
```

##### Returns

`System.Boolean`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *filePath* |
| [Velopack.NuGet.PackageManifest](../Velopack.NuGet/PackageManifest) | *manifest* |

### ReadManifest(Stream)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L57)
```csharp title="Declaration"
protected void ReadManifest(Stream manifestStream)
```

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.IO.Stream` | *manifestStream* |

### IsPackageFile(string)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/PackageManifest.cs#L143)
```csharp title="Declaration"
protected bool IsPackageFile(string partPath)
```

##### Returns

`System.Boolean`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *partPath* |

