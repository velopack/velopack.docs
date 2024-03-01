---
title: Class Runtimes.RuntimeInfo
sidebar_label: Runtimes.RuntimeInfo
description: "Base type containing information about a runtime in relation to the current operating system"
---
# Class Runtimes.RuntimeInfo
Base type containing information about a runtime in relation to the current operating system

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L46)
```csharp title="Declaration"
public abstract class Runtimes.RuntimeInfo
```
**Derived:**  
[Velopack.Windows.Runtimes.DotnetInfo](../Velopack.Windows/Runtimes.DotnetInfo), [Velopack.Windows.Runtimes.FrameworkInfo](../Velopack.Windows/Runtimes.FrameworkInfo), [Velopack.Windows.Runtimes.VCRedistInfo](../Velopack.Windows/Runtimes.VCRedistInfo)

## Properties
### Id
The unique Id of this runtime. Can be used to retrieve a runtime instance with [Velopack.Windows.Runtimes.GetRuntimeByName(string)](../Velopack.Windows/Runtimes#getruntimebynamestring)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L49)
```csharp title="Declaration"
public virtual string Id { get; }
```
### DisplayName
The human-friendly name of this runtime - for displaying to users
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L52)
```csharp title="Declaration"
public virtual string DisplayName { get; }
```
## Methods
### GetDownloadUrl()
Retrieves the web url to the latest compatible runtime installer exe
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L65)
```csharp title="Declaration"
public abstract Task<string> GetDownloadUrl()
```

##### Returns

`System.Threading.Tasks.Task<System.String>`
### CheckIsInstalled()
Check if a runtime compatible with the current instance is installed on this system
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L68)
```csharp title="Declaration"
public abstract Task<bool> CheckIsInstalled()
```

##### Returns

`System.Threading.Tasks.Task<System.Boolean>`
### CheckIsSupported()
Check if this runtime is supported on the current system
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L72)
```csharp title="Declaration"
public abstract Task<bool> CheckIsSupported()
```

##### Returns

`System.Threading.Tasks.Task<System.Boolean>`
### DownloadToFile(string, Action&lt;int&gt;, IFileDownloader, ILogger)
Download the latest installer for this runtime to the specified file
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L76)
```csharp title="Declaration"
public virtual Task DownloadToFile(string localPath, Action<int> progress = null, IFileDownloader downloader = null, ILogger log = null)
```

##### Returns

`System.Threading.Tasks.Task`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *localPath* |
| `System.Action<System.Int32>` | *progress* |
| [Velopack.Sources.IFileDownloader](../Velopack.Sources/IFileDownloader) | *downloader* |
| `Microsoft.Extensions.Logging.ILogger` | *log* |

### InvokeInstaller(string, bool, ILogger)
Execute a runtime installer at a local file path. Typically used after `Velopack.Windows.Runtimes.RuntimeInfo.DownloadToFile(System.String%2cSystem.Action%7bSystem.Int32%7d%2cVelopack.Sources.IFileDownloader%2cMicrosoft.Extensions.Logging.ILogger)`
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L85)
```csharp title="Declaration"
public virtual Task<Runtimes.RuntimeInstallResult> InvokeInstaller(string pathToInstaller, bool isQuiet, ILogger log = null)
```

##### Returns

`System.Threading.Tasks.Task<Velopack.Windows.Runtimes.RuntimeInstallResult>`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *pathToInstaller* |
| `System.Boolean` | *isQuiet* |
| `Microsoft.Extensions.Logging.ILogger` | *log* |

### ToString()
The unique string representation of this runtime
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L109)
```csharp title="Declaration"
public override string ToString()
```

##### Returns

`System.String`
### GetHashCode()
The unique hash code of this runtime
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L112)
```csharp title="Declaration"
public override int GetHashCode()
```

##### Returns

`System.Int32`
