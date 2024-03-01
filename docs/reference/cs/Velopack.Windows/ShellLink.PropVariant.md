---
title: Struct ShellLink.PropVariant
sidebar_label: ShellLink.PropVariant
---
# Struct ShellLink.PropVariant


###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L62)
```csharp title="Declaration"
public struct ShellLink.PropVariant
```
## Fields
### variantType

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L65)
```csharp title="Declaration"
public short variantType
```
### Reserved1

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L66)
```csharp title="Declaration"
public short Reserved1
```
### Reserved2

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L66)
```csharp title="Declaration"
public short Reserved2
```
### Reserved3

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L66)
```csharp title="Declaration"
public short Reserved3
```
### pointerValue

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L67)
```csharp title="Declaration"
public IntPtr pointerValue
```
## Methods
### FromString(string)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L69)
```csharp title="Declaration"
public static ShellLink.PropVariant FromString(string str)
```

##### Returns

[Velopack.Windows.ShellLink.PropVariant](../Velopack.Windows/ShellLink.PropVariant)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *str* |

### FromGuid(Guid)

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L79)
```csharp title="Declaration"
public static ShellLink.PropVariant FromGuid(Guid guid)
```

##### Returns

[Velopack.Windows.ShellLink.PropVariant](../Velopack.Windows/ShellLink.PropVariant)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Guid` | *guid* |

### Clear()
Called to clear the PropVariant's referenced and local memory.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L103)
```csharp title="Declaration"
public void Clear()
```
