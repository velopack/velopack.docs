---
title: Class Runtimes.VCRedist00
sidebar_label: Runtimes.VCRedist00
description: "Represents a VC++ redistributable package which is referenced by a permalink"
---
# Class Runtimes.VCRedist00
Represents a VC++ redistributable package which is referenced by a permalink

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L563)
```csharp title="Declaration"
public class Runtimes.VCRedist00 : Runtimes.VCRedistInfo
```
**Inheritance:** `System.Object` -> [Velopack.Windows.Runtimes.RuntimeInfo](../Velopack.Windows/Runtimes.RuntimeInfo) -> [Velopack.Windows.Runtimes.VCRedistInfo](../Velopack.Windows/Runtimes.VCRedistInfo)

## Properties
### DownloadUrl
Permalink to the installer for this runtime
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L566)
```csharp title="Declaration"
public string DownloadUrl { get; }
```
## Methods
### GetDownloadUrl()
Retrieves the web url to the latest compatible runtime installer exe
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L576)
```csharp title="Declaration"
public override Task<string> GetDownloadUrl()
```

##### Returns

`System.Threading.Tasks.Task<System.String>`
