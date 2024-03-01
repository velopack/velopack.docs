---
title: Class VelopackLocator
sidebar_label: VelopackLocator
description: "A base class describing where Velopack can find key folders and files."
---
# Class VelopackLocator
A base class describing where Velopack can find key folders and files.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L15)
```csharp title="Declaration"
public abstract class VelopackLocator : IVelopackLocator
```
**Derived:**  
[Velopack.Locators.LinuxVelopackLocator](../Velopack.Locators/LinuxVelopackLocator), [Velopack.Locators.OsxVelopackLocator](../Velopack.Locators/OsxVelopackLocator), [Velopack.Locators.TestVelopackLocator](../Velopack.Locators/TestVelopackLocator), [Velopack.Locators.WindowsVelopackLocator](../Velopack.Locators/WindowsVelopackLocator)

**Implements:**  
[Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator)

## Properties
### AppId
The unique application Id. This is used in various app paths.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L42)
```csharp title="Declaration"
public abstract string? AppId { get; }
```
### RootAppDir
The root directory of the application. On Windows, this folder contains all 
the application files, but that may not be the case on other operating systems.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L45)
```csharp title="Declaration"
public abstract string? RootAppDir { get; }
```
### PackagesDir
The directory in which nupkg files are stored for this application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L48)
```csharp title="Declaration"
public abstract string? PackagesDir { get; }
```
### AppTempDir
The temporary directory for this application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L51)
```csharp title="Declaration"
public virtual string? AppTempDir { get; }
```
### UpdateExePath
The path to the current Update.exe or similar on other operating systems.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L54)
```csharp title="Declaration"
public abstract string? UpdateExePath { get; }
```
### AppContentDir
The directory in which versioned application files are stored.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L57)
```csharp title="Declaration"
public abstract string? AppContentDir { get; }
```
### Channel
The release channel this package was built for.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L60)
```csharp title="Declaration"
public abstract string? Channel { get; }
```
### ThisExeRelativePath
The path from [Velopack.Locators.IVelopackLocator.AppContentDir](../Velopack.Locators/IVelopackLocator#appcontentdir) to this executable.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L63)
```csharp title="Declaration"
public virtual string? ThisExeRelativePath { get; }
```
### CurrentlyInstalledVersion
The currently installed version of the application, or null if the app is not installed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L76)
```csharp title="Declaration"
public abstract SemanticVersion? CurrentlyInstalledVersion { get; }
```
### Log
The log interface to use for diagnostic messages.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L79)
```csharp title="Declaration"
protected ILogger Log { get; }
```
## Methods
### GetDefault(ILogger?)
Auto-detect the platform from the current operating system.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L22)
```csharp title="Declaration"
public static VelopackLocator GetDefault(ILogger? logger)
```

##### Returns

[Velopack.Locators.VelopackLocator](../Velopack.Locators/VelopackLocator)

##### Parameters

| Type | Name |
|:--- |:--- |
| `Microsoft.Extensions.Logging.ILogger` | *logger* |

### GetLocalPackages()
Finds .nupkg files in the PackagesDir and returns a list of ReleaseEntryName objects.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L88)
```csharp title="Declaration"
public virtual List<VelopackAsset> GetLocalPackages()
```

##### Returns

`System.Collections.Generic.List<Velopack.VelopackAsset>`
### GetLatestLocalFullPackage()
Finds latest .nupkg file in the PackagesDir or null if not found.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L115)
```csharp title="Declaration"
public virtual VelopackAsset? GetLatestLocalFullPackage()
```

##### Returns

[Velopack.VelopackAsset](../Velopack/VelopackAsset)
### CreateSubDirIfDoesNotExist(string?, string?)
Given a base dir and a directory name, will create a new sub directory of that name.
Will return null if baseDir is null, or if baseDir does not exist.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L127)
```csharp title="Declaration"
protected static string? CreateSubDirIfDoesNotExist(string? baseDir, string? newDir)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *baseDir* |
| `System.String` | *newDir* |

### GetOrCreateStagedUserId()
Unique identifier for this user which is used to calculate whether this user is eligible for 
staged roll outs.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/VelopackLocator.cs#L138)
```csharp title="Declaration"
public Guid? GetOrCreateStagedUserId()
```

##### Returns

`System.Nullable<System.Guid>`

## Implements

* [Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator)
