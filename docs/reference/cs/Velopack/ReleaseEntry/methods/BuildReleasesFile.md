﻿<!--  
  <auto-generated>   
    The contents of this file were generated by a tool.  
    Changes to this file may be list if the file is regenerated  
  </auto-generated>   
-->

# ReleaseEntry.BuildReleasesFile Method

**Declaring Type:** [ReleaseEntry](../index.md)  
**Namespace:** [Velopack](../../index.md)  
**Assembly:** Velopack  
**Assembly Version:** 0.0.1053+0cec039

Generates a list of [ReleaseEntry](../index.md)'s from a local directory containing package files. Also writes\/updates a RELEASES file in the specified directory to match the packages the are currently present.

```csharp
public static List<ReleaseEntry> BuildReleasesFile(string releasePackagesDir, bool writeToDisk = true);
```

## Parameters

`releasePackagesDir`  string

`writeToDisk`  bool

## Returns

List\<[ReleaseEntry](../index.md)\>

The list of packages in the directory

___

*Documentation generated by [MdDocs](https://github.com/ap0llo/mddocs)*
