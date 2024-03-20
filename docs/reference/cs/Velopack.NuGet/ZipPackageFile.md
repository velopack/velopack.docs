---
title: Class ZipPackageFile
sidebar_label: ZipPackageFile
---
# Class ZipPackageFile


###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L6)
```csharp title="Declaration"
public class ZipPackageFile : IEquatable<ZipPackageFile>
```
**Implements:**  
`System.IEquatable<Velopack.NuGet.ZipPackageFile>`

## Properties
### Key

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L8)
```csharp title="Declaration"
public Uri Key { get; }
```
### EffectivePath

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L9)
```csharp title="Declaration"
public string EffectivePath { get; }
```
### TargetFramework

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L10)
```csharp title="Declaration"
public string TargetFramework { get; }
```
### Path

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L11)
```csharp title="Declaration"
public string Path { get; }
```
## Methods
### IsLibFile()

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L21)
```csharp title="Declaration"
public bool IsLibFile()
```

##### Returns

`System.Boolean`
### IsContentFile()

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L22)
```csharp title="Declaration"
public bool IsContentFile()
```

##### Returns

`System.Boolean`
### IsFileInTopDirectory(string)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L24)
```csharp title="Declaration"
public bool IsFileInTopDirectory(string directory)
```

##### Returns

`System.Boolean`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *directory* |

### ToString()
Returns a string that represents the current object.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L30)
```csharp title="Declaration"
public override string ToString()
```

##### Returns

`System.String`: A string that represents the current object.### GetHashCode()
Serves as the default hash function.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L32)
```csharp title="Declaration"
public override int GetHashCode()
```

##### Returns

`System.Int32`: A hash code for the current object.### Equals(object?)
Determines whether the specified object is equal to the current object.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L34)
```csharp title="Declaration"
public override bool Equals(object? obj)
```

##### Returns

`System.Boolean`: true if the specified object  is equal to the current object; otherwise, false.
##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.Object` | *obj* | The object to compare with the current object. |

### Equals(ZipPackageFile?)
Indicates whether the current object is equal to another object of the same type.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/NuGet/ZipPackageFile.cs#L41)
```csharp title="Declaration"
public bool Equals(ZipPackageFile? other)
```

##### Returns

`System.Boolean`: true if the current object is equal to the &lt;code class="paramref"&gt;other&lt;/code&gt; parameter; otherwise, false.
##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| [Velopack.NuGet.ZipPackageFile](../Velopack.NuGet/ZipPackageFile.md) | *other* | An object to compare with this object. |


## Implements

* `System.IEquatable<Velopack.NuGet.ZipPackageFile>`
