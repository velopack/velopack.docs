---
title: Class ReleaseEntry
sidebar_label: ReleaseEntry
description: "Represents a Velopack release, as described in a RELEASES file - usually also with an 
accompanying package containing the files needed to apply the release."
---
# Class ReleaseEntry
Represents a Velopack release, as described in a RELEASES file - usually also with an 
accompanying package containing the files needed to apply the release.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L96)
```csharp title="Declaration"
[DataContract]
[Obsolete("This release format has been replaced by VelopackRelease")]
public class ReleaseEntry
```
## Properties
### Identity
The release identity - including id, version and so forth.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L101)
```csharp title="Declaration"
[IgnoreDataMember]
public ReleaseEntryName Identity { get; protected set; }
```
### PackageId
The name or Id of the package containing this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L104)
```csharp title="Declaration"
[DataMember]
public string PackageId { get; }
```
### Version
The version of this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L107)
```csharp title="Declaration"
[DataMember]
public SemanticVersion Version { get; }
```
### IsDelta
Whether this package represents a full update, or a delta update.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L110)
```csharp title="Declaration"
[DataMember]
public bool IsDelta { get; }
```
### SHA1
The SHA1 checksum of the update package containing this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L113)
```csharp title="Declaration"
[DataMember]
public string SHA1 { get; protected set; }
```
### BaseUrl
If the release corresponds to a remote http location, this will be the base url.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L116)
```csharp title="Declaration"
[DataMember]
public string BaseUrl { get; protected set; }
```
### Query
The http url query (if applicable).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L119)
```csharp title="Declaration"
[DataMember]
public string Query { get; protected set; }
```
### Filesize
The size in bytes of the update package containing this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L122)
```csharp title="Declaration"
[DataMember]
public long Filesize { get; protected set; }
```
### StagingPercentage
The percentage of users this package has been released to. This release
may or may not be applied if the current user is not in the staging group.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L128)
```csharp title="Declaration"
[DataMember]
public float? StagingPercentage { get; protected set; }
```
### OriginalFilename
The filename of the update package containing this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L131)
```csharp title="Declaration"
[DataMember]
public string OriginalFilename { get; protected set; }
```
### EntryAsString
The unparsed text used to construct this release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L134)
```csharp title="Declaration"
[IgnoreDataMember]
public string EntryAsString { get; }
```
## Methods
### FromVelopackAsset(VelopackAsset)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L189)
```csharp title="Declaration"
public static ReleaseEntry FromVelopackAsset(VelopackAsset asset)
```

##### Returns

[Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset.md) | *asset* |

### ParseReleaseEntry(string)
Parses an string entry from a RELEASES file and returns a [Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L197)
```csharp title="Declaration"
public static ReleaseEntry ParseReleaseEntry(string entry)
```

##### Returns

[Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *entry* |

### IsStagingMatch(Guid?)
Checks if the current user is eligible for the current staging percentage.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L261)
```csharp title="Declaration"
public bool IsStagingMatch(Guid? userId)
```

##### Returns

`System.Boolean`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Nullable<System.Guid>` | *userId* |

### ParseReleaseFile(string)
Parse the contents of a RELEASES file into a list of [Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md)'s.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L278)
```csharp title="Declaration"
public static IEnumerable<ReleaseEntry> ParseReleaseFile(string fileContents)
```

##### Returns

`System.Collections.Generic.IEnumerable<Velopack.ReleaseEntry>`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *fileContents* |

### ParseReleaseFileAndApplyStaging(string, Guid?)
Parse the contents of a RELEASES file into a list of [Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md)'s,
with any staging-ineligible releases removed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L299)
```csharp title="Declaration"
public static IEnumerable<ReleaseEntry> ParseReleaseFileAndApplyStaging(string fileContents, Guid? userToken)
```

##### Returns

`System.Collections.Generic.IEnumerable<Velopack.ReleaseEntry>`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *fileContents* |
| `System.Nullable<System.Guid>` | *userToken* |

### WriteReleaseFile(IEnumerable&lt;ReleaseEntry&gt;, Stream)
Write a list of [Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md)'s to a stream
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L319)
```csharp title="Declaration"
public static void WriteReleaseFile(IEnumerable<ReleaseEntry> releaseEntries, Stream stream)
```

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Collections.Generic.IEnumerable<Velopack.ReleaseEntry>` | *releaseEntries* |
| `System.IO.Stream` | *stream* |

### WriteReleaseFile(IEnumerable&lt;ReleaseEntry&gt;, string)
Write a list of [Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md)'s to a local file
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L335)
```csharp title="Declaration"
public static void WriteReleaseFile(IEnumerable<ReleaseEntry> releaseEntries, string path)
```

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Collections.Generic.IEnumerable<Velopack.ReleaseEntry>` | *releaseEntries* |
| `System.String` | *path* |

### GenerateFromFile(Stream, string, string)
Generates a [Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md) from a local update package file (such as a nupkg).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L348)
```csharp title="Declaration"
public static ReleaseEntry GenerateFromFile(Stream file, string filename, string baseUrl = null)
```

##### Returns

[Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.IO.Stream` | *file* |
| `System.String` | *filename* |
| `System.String` | *baseUrl* |

### GenerateFromFile(string, string)
Generates a [Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md) from a local update package file (such as a nupkg).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L360)
```csharp title="Declaration"
public static ReleaseEntry GenerateFromFile(string path, string baseUrl = null)
```

##### Returns

[Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *path* |
| `System.String` | *baseUrl* |

### BuildReleasesFile(string, bool)
Generates a list of [Velopack.ReleaseEntry](../Velopack/ReleaseEntry.md)'s from a local directory containing
package files. Also writes/updates a RELEASES file in the specified directory
to match the packages the are currently present.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L373)
```csharp title="Declaration"
public static List<ReleaseEntry> BuildReleasesFile(string releasePackagesDir, bool writeToDisk = true)
```

##### Returns

`System.Collections.Generic.List<Velopack.ReleaseEntry>`: The list of packages in the directory
##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *releasePackagesDir* |
| `System.Boolean` | *writeToDisk* |

### ToString()
Returns a string that represents the current object.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L411)
```csharp title="Declaration"
public override string ToString()
```

##### Returns

`System.String`: A string that represents the current object.### GetHashCode()
Serves as the default hash function.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/ReleaseEntry.cs#L414)
```csharp title="Declaration"
public override int GetHashCode()
```

##### Returns

`System.Int32`: A hash code for the current object.