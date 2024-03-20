---
title: Class Runtimes.VCRedistInfo
sidebar_label: Runtimes.VCRedistInfo
description: "The base class for a VC++ redistributable package."
---
# Class Runtimes.VCRedistInfo
The base class for a VC++ redistributable package.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L435)
```csharp title="Declaration"
public abstract class Runtimes.VCRedistInfo : Runtimes.RuntimeInfo
```
**Inheritance:** `System.Object` -> [Velopack.Windows.Runtimes.RuntimeInfo](../Velopack.Windows/Runtimes.RuntimeInfo.md)

**Derived:**  
[Velopack.Windows.Runtimes.VCRedist00](../Velopack.Windows/Runtimes.VCRedist00.md), [Velopack.Windows.Runtimes.VCRedist14](../Velopack.Windows/Runtimes.VCRedist14.md)

## Properties
### MinVersion
The minimum compatible version that must be installed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L438)
```csharp title="Declaration"
public NuGetVersion MinVersion { get; }
```
### CpuArchitecture
The CPU architecture of the runtime.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L441)
```csharp title="Declaration"
public RuntimeCpu CpuArchitecture { get; }
```
## Methods
### CheckIsInstalled()
Check if a runtime compatible with the current instance is installed on this system
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L451)
```csharp title="Declaration"
public override Task<bool> CheckIsInstalled()
```

##### Returns

`System.Threading.Tasks.Task<System.Boolean>`
### CheckIsSupported()
Check if this runtime is supported on the current system
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L461)
```csharp title="Declaration"
public override Task<bool> CheckIsSupported()
```

##### Returns

`System.Threading.Tasks.Task<System.Boolean>`
