---
title: Class OsxVelopackLocator
sidebar_label: OsxVelopackLocator
description: "The default for OSX. All application files will remain in the '.app'.
All additional files (log, etc) will be placed in a temporary directory."
---
# Class OsxVelopackLocator
The default for OSX. All application files will remain in the '.app'.
All additional files (log, etc) will be placed in a temporary directory.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/OsxVelopackLocator.cs#L14)
```csharp title="Declaration"
public class OsxVelopackLocator : VelopackLocator, IVelopackLocator
```
**Inheritance:** `System.Object` -> [Velopack.Locators.VelopackLocator](../Velopack.Locators/VelopackLocator.md)

**Implements:**  
[Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator.md)

## Properties
### AppId
The unique application Id. This is used in various app paths.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/OsxVelopackLocator.cs#L18)
```csharp title="Declaration"
public override string? AppId { get; }
```
### RootAppDir
The root directory of the application. On Windows, this folder contains all 
the application files, but that may not be the case on other operating systems.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/OsxVelopackLocator.cs#L21)
```csharp title="Declaration"
public override string? RootAppDir { get; }
```
### UpdateExePath
The path to the current Update.exe or similar on other operating systems.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/OsxVelopackLocator.cs#L24)
```csharp title="Declaration"
public override string? UpdateExePath { get; }
```
### CurrentlyInstalledVersion
The currently installed version of the application, or null if the app is not installed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/OsxVelopackLocator.cs#L27)
```csharp title="Declaration"
public override SemanticVersion? CurrentlyInstalledVersion { get; }
```
### AppContentDir
The directory in which versioned application files are stored.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/OsxVelopackLocator.cs#L30)
```csharp title="Declaration"
public override string? AppContentDir { get; }
```
### AppTempDir
The temporary directory for this application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/OsxVelopackLocator.cs#L33)
```csharp title="Declaration"
public override string? AppTempDir { get; }
```
### PackagesDir
The directory in which nupkg files are stored for this application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/OsxVelopackLocator.cs#L36)
```csharp title="Declaration"
public override string? PackagesDir { get; }
```
### Channel
The release channel this package was built for.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/OsxVelopackLocator.cs#L39)
```csharp title="Declaration"
public override string? Channel { get; }
```

## Implements

* [Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator.md)
