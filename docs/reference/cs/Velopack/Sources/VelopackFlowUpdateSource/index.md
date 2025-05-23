---
title: VelopackFlowUpdateSource
sidebar_position: 2
sidebar_label: VelopackFlowUpdateSource
---
<!--  
  <auto-generated>   
    The contents of this file were generated by a tool.  
    Changes to this file may be list if the file is regenerated  
  </auto-generated>   
-->

# VelopackFlowUpdateSource Class

**Namespace:** [Velopack.Sources](../index.md)  
**Assembly:** Velopack  
**Assembly Version:** 0.0.1053+0cec039

Retrieves updates from the hosted Velopack service.

```csharp
public sealed class VelopackFlowUpdateSource : IUpdateSource
```

**Inheritance:** object → VelopackFlowUpdateSource

**Implements:** [IUpdateSource](../IUpdateSource/index.md)

## Constructors

| Name                                                                       | Description |
| -------------------------------------------------------------------------- | ----------- |
| [VelopackFlowUpdateSource(string, IFileDownloader)](constructors/index.md) |             |

## Properties

| Name                                   | Description                                                                                   |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| [BaseUri](properties/BaseUri.md)       |  The URL of the server hosting packages to update to.                                         |
| [Downloader](properties/Downloader.md) |  The [IFileDownloader](../IFileDownloader/index.md) to be used for performing http requests.  |

## Methods

| Name                                                                                                                      | Description |
| ------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [DownloadReleaseEntry(ILogger, VelopackAsset, string, Action\<int\>, CancellationToken)](methods/DownloadReleaseEntry.md) |             |
| [GetReleaseFeed(ILogger, string, Guid?, VelopackAsset)](methods/GetReleaseFeed.md)                                        |             |

___

*Documentation generated by [MdDocs](https://github.com/ap0llo/mddocs)*
