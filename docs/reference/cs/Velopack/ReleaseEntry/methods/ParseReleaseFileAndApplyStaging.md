﻿<!--  
  <auto-generated>   
    The contents of this file were generated by a tool.  
    Changes to this file may be list if the file is regenerated  
  </auto-generated>   
-->

# ReleaseEntry.ParseReleaseFileAndApplyStaging Method

**Declaring Type:** [ReleaseEntry](../index.md)  
**Namespace:** [Velopack](../../index.md)  
**Assembly:** Velopack  
**Assembly Version:** 0.0.1053+0cec039

Parse the contents of a RELEASES file into a list of [ReleaseEntry](../index.md)'s, with any staging\-ineligible releases removed.

```csharp
public static IEnumerable<ReleaseEntry> ParseReleaseFileAndApplyStaging(string fileContents, Guid? userToken);
```

## Parameters

`fileContents`  string

`userToken`  Nullable\<Guid\>

## Returns

IEnumerable\<[ReleaseEntry](../index.md)\>

___

*Documentation generated by [MdDocs](https://github.com/ap0llo/mddocs)*
