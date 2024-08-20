﻿<!--  
  <auto-generated>   
    The contents of this file were generated by a tool.  
    Changes to this file may be list if the file is regenerated  
  </auto-generated>   
-->

# UpdateExe.Apply Method

**Declaring Type:** [UpdateExe](../index.md)  
**Namespace:** [Velopack](../../index.md)  
**Assembly:** Velopack  
**Assembly Version:** 0.0.556+83dfef5

Runs Update.exe in the current working directory to apply updates, optionally restarting the application.

```csharp
public static void Apply(IVelopackLocator locator, VelopackAsset toApply, bool silent, bool restart, string[] restartArgs = null, ILogger logger = null);
```

## Parameters

`locator`  [IVelopackLocator](../../Locators/IVelopackLocator/index.md)

The locator to use to find the path to Update.exe and the packages directory.

`toApply`  [VelopackAsset](../../VelopackAsset/index.md)

The update package you wish to apply, can be left null.

`silent`  bool

If true, no dialogs will be shown during the update process. This could result              in an update failing to install, such as when we need to ask the user for permission to install              a new framework dependency.

`restart`  bool

If true, restarts the application after updates are applied (or if they failed)

`restartArgs`  string\[\]

The arguments to pass to the application when it is restarted.

`logger`  ILogger

The logger to use for diagnostic messages

## Exceptions

Exception

Thrown if Update.exe does not initialize properly.

___

*Documentation generated by [MdDocs](https://github.com/ap0llo/mddocs)*