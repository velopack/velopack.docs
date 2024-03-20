---
title: Class VelopackApp
sidebar_label: VelopackApp
description: "VelopackApp helps you to handle app activation events correctly.
This should be used as early as possible in your application startup code.
(eg. the beginning of Main() in Program.cs)"
---
# Class VelopackApp
VelopackApp helps you to handle app activation events correctly.
This should be used as early as possible in your application startup code.
(eg. the beginning of Main() in Program.cs)

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L23)
```csharp title="Declaration"
public sealed class VelopackApp
```
## Methods
### Build()
Creates and returns a new Velopack application builder.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L45)
```csharp title="Declaration"
public static VelopackApp Build()
```

##### Returns

[Velopack.VelopackApp](../Velopack/VelopackApp.md)
### SetArgs(string[])
Override the command line arguments used to determine the Velopack hook to run.
If this is not set, the command line arguments passed to the application will be used.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L51)
```csharp title="Declaration"
public VelopackApp SetArgs(string[] args)
```

##### Returns

[Velopack.VelopackApp](../Velopack/VelopackApp.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String[]` | *args* |

### SetAutoApplyOnStartup(bool)
Set whether to automatically apply downloaded updates on startup. This is ON by default.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L60)
```csharp title="Declaration"
public VelopackApp SetAutoApplyOnStartup(bool autoApply)
```

##### Returns

[Velopack.VelopackApp](../Velopack/VelopackApp.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Boolean` | *autoApply* |

### SetLocator(IVelopackLocator)
Override the default [Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator.md) used to search for application paths.
This will be cached and potentially re-used throughout the lifetime of the application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L70)
```csharp title="Declaration"
public VelopackApp SetLocator(IVelopackLocator locator)
```

##### Returns

[Velopack.VelopackApp](../Velopack/VelopackApp.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.Locators.IVelopackLocator](../Velopack.Locators/IVelopackLocator.md) | *locator* |

### WithFirstRun(VelopackHook)
This hook is triggered when the application is started for the first time after installation.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L79)
```csharp title="Declaration"
public VelopackApp WithFirstRun(VelopackHook hook)
```

##### Returns

[Velopack.VelopackApp](../Velopack/VelopackApp.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.VelopackHook](../Velopack/VelopackHook.md) | *hook* |

### WithRestarted(VelopackHook)
This hook is triggered when the application is restarted by Velopack after installing updates.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L88)
```csharp title="Declaration"
public VelopackApp WithRestarted(VelopackHook hook)
```

##### Returns

[Velopack.VelopackApp](../Velopack/VelopackApp.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.VelopackHook](../Velopack/VelopackHook.md) | *hook* |

### WithAfterInstallFastCallback(VelopackHook)
WARNING: FastCallback hooks are run during critical stages of Velopack operations.
Your code will be run and then `System.Environment.Exit(System.Int32)` will be called.
If your code has not completed within 30 seconds, it will be terminated.
Only supported on windows; On other operating systems, this will never be called.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L100)
```csharp title="Declaration"
public VelopackApp WithAfterInstallFastCallback(VelopackHook hook)
```

##### Returns

[Velopack.VelopackApp](../Velopack/VelopackApp.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.VelopackHook](../Velopack/VelopackHook.md) | *hook* |

### WithAfterUpdateFastCallback(VelopackHook)
WARNING: FastCallback hooks are run during critical stages of Velopack operations.
Your code will be run and then `System.Environment.Exit(System.Int32)` will be called.
If your code has not completed within 15 seconds, it will be terminated.
Only supported on windows; On other operating systems, this will never be called.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L113)
```csharp title="Declaration"
public VelopackApp WithAfterUpdateFastCallback(VelopackHook hook)
```

##### Returns

[Velopack.VelopackApp](../Velopack/VelopackApp.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.VelopackHook](../Velopack/VelopackHook.md) | *hook* |

### WithBeforeUpdateFastCallback(VelopackHook)
WARNING: FastCallback hooks are run during critical stages of Velopack operations.
Your code will be run and then `System.Environment.Exit(System.Int32)` will be called.
If your code has not completed within 15 seconds, it will be terminated.
Only supported on windows; On other operating systems, this will never be called.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L126)
```csharp title="Declaration"
public VelopackApp WithBeforeUpdateFastCallback(VelopackHook hook)
```

##### Returns

[Velopack.VelopackApp](../Velopack/VelopackApp.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.VelopackHook](../Velopack/VelopackHook.md) | *hook* |

### WithBeforeUninstallFastCallback(VelopackHook)
WARNING: FastCallback hooks are run during critical stages of Velopack operations.
Your code will be run and then `System.Environment.Exit(System.Int32)` will be called.
If your code has not completed within 30 seconds, it will be terminated.
Only supported on windows; On other operating systems, this will never be called.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L139)
```csharp title="Declaration"
public VelopackApp WithBeforeUninstallFastCallback(VelopackHook hook)
```

##### Returns

[Velopack.VelopackApp](../Velopack/VelopackApp.md)

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.VelopackHook](../Velopack/VelopackHook.md) | *hook* |

### Run(ILogger?)
Runs the Velopack application startup code and triggers any configured hooks.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackApp.cs#L151)
```csharp title="Declaration"
public void Run(ILogger? logger = null)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `Microsoft.Extensions.Logging.ILogger` | *logger* | A logging interface for diagnostic messages. This will be
    cached and potentially re-used throughout the lifetime of the application. |

