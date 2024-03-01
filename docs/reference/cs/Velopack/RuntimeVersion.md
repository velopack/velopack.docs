---
title: Class RuntimeVersion
sidebar_label: RuntimeVersion
description: "A Version class that also supports a single integer (major only)"
---
# Class RuntimeVersion
A Version class that also supports a single integer (major only)

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L14)
```csharp title="Declaration"
public sealed class RuntimeVersion : IComparable, IComparable<RuntimeVersion>, IEquatable<RuntimeVersion>
```
**Implements:**  
`System.IComparable`, `System.IComparable<Velopack.RuntimeVersion>`, `System.IEquatable<Velopack.RuntimeVersion>`

## Properties
### Major

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L16)
```csharp title="Declaration"
public int Major { get; }
```
## Methods
### CompareTo(object)
Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L48)
```csharp title="Declaration"
public int CompareTo(object obj)
```

##### Returns

`System.Int32`: A value that indicates the relative order of the objects being compared. The return value has these meanings: Value Meaning Less than zero This instance precedes &lt;code class="paramref"&gt;obj&lt;/code&gt; in the sort order. Zero This instance occurs in the same position in the sort order as &lt;code class="paramref"&gt;obj&lt;/code&gt;. Greater than zero This instance follows &lt;code class="paramref"&gt;obj&lt;/code&gt; in the sort order.
##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.Object` | *obj* | An object to compare with this instance. |


##### Exceptions

`System.ArgumentException`  
&lt;code class="paramref"&gt;obj&lt;/code&gt; is not the same type as this instance.
### CompareTo(RuntimeVersion)
Compares the current instance with another object of the same type and returns an integer that indicates whether the current instance precedes, follows, or occurs in the same position in the sort order as the other object.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L61)
```csharp title="Declaration"
public int CompareTo(RuntimeVersion other)
```

##### Returns

`System.Int32`: A value that indicates the relative order of the objects being compared. The return value has these meanings: Value Meaning Less than zero This instance precedes &lt;code class="paramref"&gt;other&lt;/code&gt; in the sort order.  Zero This instance occurs in the same position in the sort order as &lt;code class="paramref"&gt;other&lt;/code&gt;. Greater than zero This instance follows &lt;code class="paramref"&gt;other&lt;/code&gt; in the sort order.
##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| [Velopack.RuntimeVersion](../Velopack/RuntimeVersion) | *other* | An object to compare with this instance. |

### Equals(RuntimeVersion)
Indicates whether the current object is equal to another object of the same type.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L84)
```csharp title="Declaration"
public bool Equals(RuntimeVersion other)
```

##### Returns

`System.Boolean`: true if the current object is equal to the &lt;code class="paramref"&gt;other&lt;/code&gt; parameter; otherwise, false.
##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| [Velopack.RuntimeVersion](../Velopack/RuntimeVersion) | *other* | An object to compare with this object. |

### Equals(object)
Determines whether the specified object is equal to the current object.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L91)
```csharp title="Declaration"
public override bool Equals(object obj)
```

##### Returns

`System.Boolean`: true if the specified object  is equal to the current object; otherwise, false.
##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.Object` | *obj* | The object to compare with the current object. |

### GetHashCode()
Serves as the default hash function.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L96)
```csharp title="Declaration"
public override int GetHashCode()
```

##### Returns

`System.Int32`: A hash code for the current object.### ToString()
Returns a string that represents the current object.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/RID.cs#L101)
```csharp title="Declaration"
public override string ToString()
```

##### Returns

`System.String`: A string that represents the current object.
## Implements

* `System.IComparable`
* `System.IComparable<Velopack.RuntimeVersion>`
* `System.IEquatable<Velopack.RuntimeVersion>`
