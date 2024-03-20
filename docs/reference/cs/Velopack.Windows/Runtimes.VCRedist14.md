---
title: Class Runtimes.VCRedist14
sidebar_label: Runtimes.VCRedist14
description: "Represents a VC++ 2015-2022 redistributable package."
---
# Class Runtimes.VCRedist14
Represents a VC++ 2015-2022 redistributable package.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L539)
```csharp title="Declaration"
public class Runtimes.VCRedist14 : Runtimes.VCRedistInfo
```
**Inheritance:** `System.Object` -> [Velopack.Windows.Runtimes.RuntimeInfo](../Velopack.Windows/Runtimes.RuntimeInfo.md) -> [Velopack.Windows.Runtimes.VCRedistInfo](../Velopack.Windows/Runtimes.VCRedistInfo.md)

## Methods
### GetDownloadUrl()
Retrieves the web url to the latest compatible runtime installer exe
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L548)
```csharp title="Declaration"
public override Task<string> GetDownloadUrl()
```

##### Returns

`System.Threading.Tasks.Task<System.String>`
