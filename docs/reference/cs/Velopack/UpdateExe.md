---
title: Class UpdateExe
sidebar_label: UpdateExe
description: "A static helper class to assist in running Update.exe CLI commands. You probably should not invoke this directly, 
instead you should use the relevant methods on [Velopack.UpdateManager](../Velopack/UpdateManager). For example: 
[Velopack.UpdateManager.ApplyUpdatesAndExit(Velopack.VelopackAsset?)](../Velopack/UpdateManager#applyupdatesandexitvelopackasset), or `Velopack.UpdateManager.ApplyUpdatesAndRestart(Velopack.VelopackAsset%2cSystem.String%5b%5d)`."
---
# Class UpdateExe
A static helper class to assist in running Update.exe CLI commands. You probably should not invoke this directly, 
instead you should use the relevant methods on [Velopack.UpdateManager](../Velopack/UpdateManager). For example: 
[Velopack.UpdateManager.ApplyUpdatesAndExit(Velopack.VelopackAsset?)](../Velopack/UpdateManager#applyupdatesandexitvelopackasset), or `Velopack.UpdateManager.ApplyUpdatesAndRestart(Velopack.VelopackAsset%2cSystem.String%5b%5d)`.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateExe.cs#L18)
```csharp title="Declaration"
public static class UpdateExe
```
## Methods
### Apply(IVelopackLocator?, VelopackAsset?, bool, bool, string[]?, ILogger?)
Runs Update.exe in the current working directory to apply updates, optionally restarting the application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateExe.cs#L36)
```csharp title="Declaration"
public static void Apply(IVelopackLocator? locator, VelopackAsset? toApply, bool silent, bool restart, string[]? restartArgs = null, ILogger? logger = null)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| [Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator) | *locator* | The locator to use to find the path to Update.exe and the packages directory. |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset) | *toApply* | The update package you wish to apply, can be left null. |
| `System.Boolean` | *silent* | If true, no dialogs will be shown during the update process. This could result 
    in an update failing to install, such as when we need to ask the user for permission to install 
    a new framework dependency. |
| `System.Boolean` | *restart* | If true, restarts the application after updates are applied (or if they failed) |
| `System.String[]` | *restartArgs* | The arguments to pass to the application when it is restarted. |
| `Microsoft.Extensions.Logging.ILogger` | *logger* | The logger to use for diagnostic messages |


##### Exceptions

`System.Exception`  
Thrown if Update.exe does not initialize properly.
