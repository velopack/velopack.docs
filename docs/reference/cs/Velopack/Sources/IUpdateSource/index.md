---
title: IUpdateSource Interface
sidebar_position: 10
sidebar_label: IUpdateSource Interface
---
<!--  
  <auto-generated>   
    The contents of this file were generated by a tool.  
    Changes to this file may be list if the file is regenerated  
  </auto-generated>   
-->

# IUpdateSource Interface

**Namespace:** [Velopack.Sources](../index.md)  
**Assembly:** Velopack  
**Assembly Version:** 0.0.1053+0cec039

Abstraction for finding and downloading updates from a package source \/ repository. An implementation may copy a file from a local repository, download from a web address,  or even use third party services and parse proprietary data to produce a package feed.

```csharp
public interface IUpdateSource
```

## Methods

| Name                                                                                                                      | Description                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [DownloadReleaseEntry(ILogger, VelopackAsset, string, Action\<int\>, CancellationToken)](methods/DownloadReleaseEntry.md) | Download the specified [VelopackAsset](../../VelopackAsset/index.md) to the provided local file path.                                                                                                                                                 |
| [GetReleaseFeed(ILogger, string, Guid?, VelopackAsset)](methods/GetReleaseFeed.md)                                        | Retrieve the list of available remote releases from the package source. These releases can subsequently be downloaded with [DownloadReleaseEntry(ILogger, VelopackAsset, string, Action\<int\>, CancellationToken)](methods/DownloadReleaseEntry.md). |

___

*Documentation generated by [MdDocs](https://github.com/ap0llo/mddocs)*
