---
title: Class Runtimes.FrameworkInfo
sidebar_label: Runtimes.FrameworkInfo
description: "Represents a full .NET Framework runtime, usually included in Windows automatically through Windows Update"
---
# Class Runtimes.FrameworkInfo
Represents a full .NET Framework runtime, usually included in Windows automatically through Windows Update

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L116)
```csharp title="Declaration"
public class Runtimes.FrameworkInfo : Runtimes.RuntimeInfo
```
**Inheritance:** `System.Object` -> [Velopack.Windows.Runtimes.RuntimeInfo](../Velopack.Windows/Runtimes.RuntimeInfo)

## Properties
### DownloadUrl
Permalink to the installer for this runtime
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L119)
```csharp title="Declaration"
public string DownloadUrl { get; }
```
### ReleaseVersion
The minimum compatible release version for this runtime
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L122)
```csharp title="Declaration"
public int ReleaseVersion { get; }
```
## Methods
### GetDownloadUrl()
Retrieves the web url to the latest compatible runtime installer exe
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L134)
```csharp title="Declaration"
public override Task<string> GetDownloadUrl()
```

##### Returns

`System.Threading.Tasks.Task<System.String>`
### CheckIsSupported()
Check if this runtime is supported on the current system
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L140)
```csharp title="Declaration"
public override Task<bool> CheckIsSupported()
```

##### Returns

`System.Threading.Tasks.Task<System.Boolean>`
### CheckIsInstalled()
Check if a runtime compatible with the current instance is installed on this system
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L148)
```csharp title="Declaration"
public override Task<bool> CheckIsInstalled()
```

##### Returns

`System.Threading.Tasks.Task<System.Boolean>`
