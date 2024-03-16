---
title: Class ChecksumFailedException
sidebar_label: ChecksumFailedException
description: "Represents an error that occurs when a package does not match it's expected SHA checksum"
---
# Class ChecksumFailedException
Represents an error that occurs when a package does not match it's expected SHA checksum

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Compression/ChecksumFailedException.cs#L9)
```csharp title="Declaration"
public class ChecksumFailedException : Exception, ISerializable, _Exception
```
**Inheritance:** `System.Object` -> `System.Exception`

**Implements:**  
`System.Runtime.Serialization.ISerializable`, `System.Runtime.InteropServices._Exception`

## Properties
### FilePath
The filename of the package which failed validation
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Compression/ChecksumFailedException.cs#L15)
```csharp title="Declaration"
public string FilePath { get; }
```

## Implements

* `System.Runtime.Serialization.ISerializable`
* `System.Runtime.InteropServices._Exception`
