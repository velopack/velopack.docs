---
title: Class ReleaseEntryName
sidebar_label: ReleaseEntryName
description: "Represents the information that can be parsed from a release entry filename."
---
# Class ReleaseEntryName
Represents the information that can be parsed from a release entry filename.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L32)
```csharp title="Declaration"
[Obsolete("This release format has been replaced by VelopackRelease")]
public sealed record ReleaseEntryName : IEquatable<ReleaseEntryName>
```
**Implements:**  
`System.IEquatable<Velopack.ReleaseEntryName>`

## Properties
### PackageId
The package Id.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L36)
```csharp title="Declaration"
public string PackageId { get; }
```
### Version
The package version.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L39)
```csharp title="Declaration"
public SemanticVersion Version { get; }
```
### IsDelta
Whether this is a delta (patch) package, or a full update package.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L42)
```csharp title="Declaration"
public bool IsDelta { get; }
```
## Methods
### FromEntryFileName(string)
Takes a filename such as 'My-Cool3-App-1.0.1-build.23-full.nupkg' and separates it into 
it's name and version (eg. 'My-Cool3-App', and '1.0.1-build.23'). Returns null values if 
the filename can not be parsed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L62)
```csharp title="Declaration"
public static ReleaseEntryName FromEntryFileName(string fileName)
```

##### Returns

[Velopack.ReleaseEntryName](../Velopack/ReleaseEntryName.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *fileName* |

### ToFileName()
Generate the file name which would represent this ReleaseEntryName.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L88)
```csharp title="Declaration"
public string ToFileName()
```

##### Returns

`System.String`

## Implements

* `System.IEquatable<Velopack.ReleaseEntryName>`
