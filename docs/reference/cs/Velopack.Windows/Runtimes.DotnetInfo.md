---
title: Class Runtimes.DotnetInfo
sidebar_label: Runtimes.DotnetInfo
description: "Represents a modern DOTNET runtime where versions are deployed independenly of the operating system"
---
# Class Runtimes.DotnetInfo
Represents a modern DOTNET runtime where versions are deployed independenly of the operating system

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L163)
```csharp title="Declaration"
public class Runtimes.DotnetInfo : Runtimes.RuntimeInfo
```
**Inheritance:** `System.Object` -> [Velopack.Windows.Runtimes.RuntimeInfo](../Velopack.Windows/Runtimes.RuntimeInfo.md)

## Properties
### Id
The unique Id of this runtime. Can be used to retrieve a runtime instance with [Velopack.Windows.Runtimes.GetRuntimeByName(string)](../Velopack.Windows/Runtimes.md#getruntimebynamestring)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L166)
```csharp title="Declaration"
public override string Id { get; }
```
### DisplayName
The human-friendly name of this runtime - for displaying to users
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L170)
```csharp title="Declaration"
public override string DisplayName { get; }
```
### MinVersion
The minimum compatible version that must be installed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L174)
```csharp title="Declaration"
public NuGetVersion MinVersion { get; }
```
### CpuArchitecture
The CPU architecture of the runtime. This must match the RID of the app being deployed.
   For example, if the app was deployed with 'win-x64', this must be X64 also.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L178)
```csharp title="Declaration"
public RuntimeCpu CpuArchitecture { get; }
```
### RuntimeType
The type of runtime required, eg. Windows Desktop, AspNetCore, Sdk.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L181)
```csharp title="Declaration"
public Runtimes.DotnetRuntimeType RuntimeType { get; }
```
## Methods
### CheckIsInstalled()
Check if a runtime compatible with the current instance is installed on this system
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L206)
```csharp title="Declaration"
public override Task<bool> CheckIsInstalled()
```

##### Returns

`System.Threading.Tasks.Task<System.Boolean>`
### CheckIsSupported()
Check if this runtime is supported on the current system
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L223)
```csharp title="Declaration"
public override Task<bool> CheckIsSupported()
```

##### Returns

`System.Threading.Tasks.Task<System.Boolean>`
### GetDownloadUrl()
Retrieves the web url to the latest compatible runtime installer exe
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L288)
```csharp title="Declaration"
public override Task<string> GetDownloadUrl()
```

##### Returns

`System.Threading.Tasks.Task<System.String>`
### Parse(string)
Parses a string such as 'net6' or net5.0.14-x86 into a DotnetInfo class capable of checking
the current system for installed status, or downloading / installing.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L309)
```csharp title="Declaration"
public static Runtimes.DotnetInfo Parse(string input)
```

##### Returns

[Velopack.Windows.Runtimes.DotnetInfo](../Velopack.Windows/Runtimes.DotnetInfo.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *input* |

### TryParse(string, out DotnetInfo)
Parses a string such as 'net6' or net5.0.14-x86 into a DotnetInfo class capable of checking
the current system for installed status, or downloading / installing.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L340)
```csharp title="Declaration"
public static bool TryParse(string input, out Runtimes.DotnetInfo info)
```

##### Returns

`System.Boolean`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *input* |
| [Velopack.Windows.Runtimes.DotnetInfo](../Velopack.Windows/Runtimes.DotnetInfo.md) | *info* |

### ParseVersion(string)
Safely converts a version string into a version structure, and provides some validation for invalid/unsupported versions.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L354)
```csharp title="Declaration"
protected static Version ParseVersion(string input)
```

##### Returns

`System.Version`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *input* |

### TrimVersion(NuGetVersion)
Converts a version structure into the shortest string possible, by trimming trailing zeros.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L375)
```csharp title="Declaration"
protected static string TrimVersion(NuGetVersion ver)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| `NuGet.Versioning.NuGetVersion` | *ver* |

### GetLatestDotNetVersion(DotnetRuntimeType, string, IFileDownloader)
Get latest available version of dotnet. Channel can be 'LTS', 'current', or a two part version 
(eg. '6.0') to get the latest minor release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L394)
```csharp title="Declaration"
public static Task<string> GetLatestDotNetVersion(Runtimes.DotnetRuntimeType runtimeType, string channel, IFileDownloader downloader = null)
```

##### Returns

`System.Threading.Tasks.Task<System.String>`

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.Windows.Runtimes.DotnetRuntimeType](../Velopack.Windows/Runtimes.DotnetRuntimeType.md) | *runtimeType* |
| `System.String` | *channel* |
| [Velopack.Sources.IFileDownloader](../Velopack.Sources/IFileDownloader.md) | *downloader* |

### GetDotNetDownloadUrl(DotnetRuntimeType, string, string)
Get download url for a specific version of dotnet. Version must be an absolute version, such as one
returned by `Velopack.Windows.Runtimes.DotnetInfo.GetLatestDotNetVersion(Velopack.Windows.Runtimes.DotnetRuntimeType%2cSystem.String%2cVelopack.Sources.IFileDownloader)`. cpuarch should be either
'x86', 'x64', or 'arm64'.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L419)
```csharp title="Declaration"
public static string GetDotNetDownloadUrl(Runtimes.DotnetRuntimeType runtimeType, string version, string cpuarch)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.Windows.Runtimes.DotnetRuntimeType](../Velopack.Windows/Runtimes.DotnetRuntimeType.md) | *runtimeType* |
| `System.String` | *version* |
| `System.String` | *cpuarch* |

