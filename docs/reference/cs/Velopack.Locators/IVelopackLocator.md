---
title: Interface IVelopackLocator
sidebar_label: IVelopackLocator
description: "An interface describing where Velopack can find key folders and files."
---
# Interface IVelopackLocator
An interface describing where Velopack can find key folders and files.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L10)
```csharp title="Declaration"
public interface IVelopackLocator
```
## Properties
### AppId
The unique application Id. This is used in various app paths.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L13)
```csharp title="Declaration"
string? AppId { get; }
```
### RootAppDir
The root directory of the application. On Windows, this folder contains all 
the application files, but that may not be the case on other operating systems.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L19)
```csharp title="Declaration"
string? RootAppDir { get; }
```
### PackagesDir
The directory in which nupkg files are stored for this application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L22)
```csharp title="Declaration"
string? PackagesDir { get; }
```
### AppContentDir
The directory in which versioned application files are stored.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L25)
```csharp title="Declaration"
string? AppContentDir { get; }
```
### AppTempDir
The temporary directory for this application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L28)
```csharp title="Declaration"
string? AppTempDir { get; }
```
### UpdateExePath
The path to the current Update.exe or similar on other operating systems.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L31)
```csharp title="Declaration"
string? UpdateExePath { get; }
```
### CurrentlyInstalledVersion
The currently installed version of the application, or null if the app is not installed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L34)
```csharp title="Declaration"
SemanticVersion? CurrentlyInstalledVersion { get; }
```
### ThisExeRelativePath
The path from [Velopack.Locators.IVelopackLocator.AppContentDir](../Velopack.Locators/IVelopackLocator.md#appcontentdir) to this executable.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L37)
```csharp title="Declaration"
string? ThisExeRelativePath { get; }
```
### Channel
The release channel this package was built for.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L40)
```csharp title="Declaration"
string? Channel { get; }
```
## Methods
### GetLocalPackages()
Finds .nupkg files in the PackagesDir and returns a list of ReleaseEntryName objects.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L45)
```csharp title="Declaration"
List<VelopackAsset> GetLocalPackages()
```

##### Returns

`System.Collections.Generic.List<Velopack.VelopackAsset>`
### GetLatestLocalFullPackage()
Finds latest .nupkg file in the PackagesDir or null if not found.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L50)
```csharp title="Declaration"
VelopackAsset? GetLatestLocalFullPackage()
```

##### Returns

[Velopack.VelopackAsset](../Velopack/VelopackAsset.md)
### GetOrCreateStagedUserId()
Unique identifier for this user which is used to calculate whether this user is eligible for 
staged roll outs.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/IVelopackLocator.cs#L56)
```csharp title="Declaration"
Guid? GetOrCreateStagedUserId()
```

##### Returns

`System.Nullable<System.Guid>`
