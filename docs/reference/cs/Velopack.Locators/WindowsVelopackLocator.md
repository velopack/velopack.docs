---
title: Class WindowsVelopackLocator
sidebar_label: WindowsVelopackLocator
description: "An implementation for Windows which uses the default paths."
---
# Class WindowsVelopackLocator
An implementation for Windows which uses the default paths.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/WindowsVelopackLocator.cs#L13)
```csharp title="Declaration"
public class WindowsVelopackLocator : VelopackLocator, IVelopackLocator
```
**Inheritance:** `System.Object` -> [Velopack.Locators.VelopackLocator](../Velopack.Locators/VelopackLocator.md)

**Implements:**  
[Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator.md)

## Properties
### AppId
The unique application Id. This is used in various app paths.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/WindowsVelopackLocator.cs#L17)
```csharp title="Declaration"
public override string? AppId { get; }
```
### RootAppDir
The root directory of the application. On Windows, this folder contains all 
the application files, but that may not be the case on other operating systems.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/WindowsVelopackLocator.cs#L20)
```csharp title="Declaration"
public override string? RootAppDir { get; }
```
### UpdateExePath
The path to the current Update.exe or similar on other operating systems.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/WindowsVelopackLocator.cs#L23)
```csharp title="Declaration"
public override string? UpdateExePath { get; }
```
### AppContentDir
The directory in which versioned application files are stored.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/WindowsVelopackLocator.cs#L26)
```csharp title="Declaration"
public override string? AppContentDir { get; }
```
### CurrentlyInstalledVersion
The currently installed version of the application, or null if the app is not installed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/WindowsVelopackLocator.cs#L29)
```csharp title="Declaration"
public override SemanticVersion? CurrentlyInstalledVersion { get; }
```
### PackagesDir
The directory in which nupkg files are stored for this application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/WindowsVelopackLocator.cs#L32)
```csharp title="Declaration"
public override string? PackagesDir { get; }
```
### Channel
The release channel this package was built for.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/WindowsVelopackLocator.cs#L35)
```csharp title="Declaration"
public override string? Channel { get; }
```

## Implements

* [Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator.md)
