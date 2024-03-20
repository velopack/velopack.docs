---
title: Class RID
sidebar_label: RID
---
# Class RID


###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L147)
```csharp title="Declaration"
public class RID : IEquatable<RID>
```
**Implements:**  
`System.IEquatable<Velopack.RID>`

## Properties
### BaseRID

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L153)
```csharp title="Declaration"
public RuntimeOs BaseRID { get; set; }
```
### Version

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L155)
```csharp title="Declaration"
public RuntimeVersion Version { get; set; }
```
### Architecture

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L156)
```csharp title="Declaration"
public RuntimeCpu Architecture { get; set; }
```
### Qualifier

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L157)
```csharp title="Declaration"
public string Qualifier { get; set; }
```
### HasVersion

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L313)
```csharp title="Declaration"
public bool HasVersion { get; }
```
### HasArchitecture

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L315)
```csharp title="Declaration"
public bool HasArchitecture { get; }
```
### HasQualifier

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L317)
```csharp title="Declaration"
public bool HasQualifier { get; }
```
### IsValid

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L319)
```csharp title="Declaration"
public bool IsValid { get; }
```
## Methods
### ToString()
Returns a string that represents the current object.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L159)
```csharp title="Declaration"
public override string ToString()
```

##### Returns

`System.String`: A string that represents the current object.### ToDisplay(RidDisplayType)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L161)
```csharp title="Declaration"
public string ToDisplay(RidDisplayType type)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.RidDisplayType](../Velopack/RidDisplayType.md) | *type* |

### Parse(string)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L200)
```csharp title="Declaration"
public static RID Parse(string runtimeIdentifier)
```

##### Returns

[Velopack.RID](../Velopack/RID.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *runtimeIdentifier* |

### Equals(object)
Determines whether the specified object is equal to the current object.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L321)
```csharp title="Declaration"
public override bool Equals(object obj)
```

##### Returns

`System.Boolean`: true if the specified object  is equal to the current object; otherwise, false.
##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.Object` | *obj* | The object to compare with the current object. |

### Equals(RID)
Indicates whether the current object is equal to another object of the same type.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L326)
```csharp title="Declaration"
public bool Equals(RID obj)
```

##### Returns

`System.Boolean`: true if the current object is equal to the &lt;code class="paramref"&gt;other&lt;/code&gt; parameter; otherwise, false.
##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.RID](../Velopack/RID.md) | *obj* |

### GetHashCode()
Serves as the default hash function.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L349)
```csharp title="Declaration"
public override int GetHashCode()
```

##### Returns

`System.Int32`: A hash code for the current object.
## Implements

* `System.IEquatable<Velopack.RID>`
