---
title: Class TestVelopackLocator
sidebar_label: TestVelopackLocator
description: "Provides a mock / test implementation of [Velopack.Locators.VelopackLocator](../Velopack.Locators/VelopackLocator.md). This can be used to verify that
your application is able to find and prepare updates from your chosen update source without actually
having an installed application. This could be used in a CI/CD pipeline, or unit tests etc."
---
# Class TestVelopackLocator
Provides a mock / test implementation of [Velopack.Locators.VelopackLocator](../Velopack.Locators/VelopackLocator.md). This can be used to verify that
your application is able to find and prepare updates from your chosen update source without actually
having an installed application. This could be used in a CI/CD pipeline, or unit tests etc.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/TestVelopackLocator.cs#L13)
```csharp title="Declaration"
public class TestVelopackLocator : VelopackLocator, IVelopackLocator
```
**Inheritance:** `System.Object` -> [Velopack.Locators.VelopackLocator](../Velopack.Locators/VelopackLocator.md)

**Implements:**  
[Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator.md)

## Properties
### AppId
The unique application Id. This is used in various app paths.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/TestVelopackLocator.cs#L17)
```csharp title="Declaration"
public override string? AppId { get; }
```
### RootAppDir
The root directory of the application. On Windows, this folder contains all 
the application files, but that may not be the case on other operating systems.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/TestVelopackLocator.cs#L27)
```csharp title="Declaration"
public override string? RootAppDir { get; }
```
### PackagesDir
The directory in which nupkg files are stored for this application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/TestVelopackLocator.cs#L37)
```csharp title="Declaration"
public override string? PackagesDir { get; }
```
### UpdateExePath
The path to the current Update.exe or similar on other operating systems.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/TestVelopackLocator.cs#L47)
```csharp title="Declaration"
public override string? UpdateExePath { get; }
```
### CurrentlyInstalledVersion
The currently installed version of the application, or null if the app is not installed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/TestVelopackLocator.cs#L57)
```csharp title="Declaration"
public override SemanticVersion? CurrentlyInstalledVersion { get; }
```
### AppContentDir
The directory in which versioned application files are stored.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/TestVelopackLocator.cs#L67)
```csharp title="Declaration"
public override string? AppContentDir { get; }
```
### Channel
The release channel this package was built for.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/TestVelopackLocator.cs#L77)
```csharp title="Declaration"
public override string? Channel { get; }
```
## Methods
### GetLatestLocalFullPackage()
Finds latest .nupkg file in the PackagesDir or null if not found.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Locators/TestVelopackLocator.cs#L84)
```csharp title="Declaration"
public override VelopackAsset? GetLatestLocalFullPackage()
```

##### Returns

[Velopack.VelopackAsset](../Velopack/VelopackAsset.md)

## Implements

* [Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator.md)
