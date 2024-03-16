---
title: Class Shortcuts
sidebar_label: Shortcuts
description: "A helper class to create or delete windows shortcuts."
---
# Class Shortcuts
A helper class to create or delete windows shortcuts.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L50)
```csharp title="Declaration"
[Obsolete("Desktop and StartMenuRoot shortcuts are now created and removed automatically when your app is installed / uninstalled.")]
public class Shortcuts
```
## Properties
### Log
Log for diagnostic messages.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L55)
```csharp title="Declaration"
protected ILogger Log { get; }
```
### Locator
Locator to use for finding important application paths.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L58)
```csharp title="Declaration"
protected IVelopackLocator Locator { get; }
```
## Methods
### CreateShortcutForThisExe(ShortcutLocation)
Create a shortcut to the currently running executable at the specified locations. 
See `Velopack.Windows.Shortcuts.CreateShortcut(System.String%2cVelopack.Windows.ShortcutLocation%2cSystem.Boolean%2cSystem.String%2cSystem.String)` to create a shortcut to a different program
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L71)
```csharp title="Declaration"
public void CreateShortcutForThisExe(ShortcutLocation location = ShortcutLocation.Desktop | ShortcutLocation.StartMenuRoot)
```

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.Windows.ShortcutLocation](../Velopack.Windows/ShortcutLocation) | *location* |

### RemoveShortcutForThisExe(ShortcutLocation)
Removes a shortcut for the currently running executable at the specified locations
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L84)
```csharp title="Declaration"
public void RemoveShortcutForThisExe(ShortcutLocation location = ShortcutLocation.StartMenu | ShortcutLocation.Desktop | ShortcutLocation.StartMenuRoot)
```

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.Windows.ShortcutLocation](../Velopack.Windows/ShortcutLocation) | *location* |

### FindShortcuts(string, ShortcutLocation)
Searches for existing shortcuts to an executable inside the current package.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L96)
```csharp title="Declaration"
public Dictionary<ShortcutLocation, ShellLink> FindShortcuts(string relativeExeName, ShortcutLocation locations)
```

##### Returns

`System.Collections.Generic.Dictionary<Velopack.Windows.ShortcutLocation,Velopack.Windows.ShellLink>`

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.String` | *relativeExeName* | The relative path or filename of the executable (from the current app dir). |
| [Velopack.Windows.ShortcutLocation](../Velopack.Windows/ShortcutLocation) | *locations* | The locations to search. |

### CreateShortcut(string, ShortcutLocation, bool, string, string)
Creates new shortcuts to the specified executable at the specified locations.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L132)
```csharp title="Declaration"
public void CreateShortcut(string relativeExeName, ShortcutLocation locations, bool updateOnly, string programArguments, string icon = null)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.String` | *relativeExeName* | The relative path or filename of the executable (from the current app dir). |
| [Velopack.Windows.ShortcutLocation](../Velopack.Windows/ShortcutLocation) | *locations* | The locations to create shortcuts. |
| `System.Boolean` | *updateOnly* | If true, shortcuts will be updated instead of created. |
| `System.String` | *programArguments* | The arguments the application should be launched with |
| `System.String` | *icon* | Path to a specific icon to use instead of the exe icon. |

### DeleteShortcuts(string, ShortcutLocation)
Delete all the shortcuts for the specified executable in the specified locations.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L198)
```csharp title="Declaration"
public void DeleteShortcuts(string relativeExeName, ShortcutLocation locations)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.String` | *relativeExeName* | The relative path or filename of the executable (from the current app dir). |
| [Velopack.Windows.ShortcutLocation](../Velopack.Windows/ShortcutLocation) | *locations* | The locations to create shortcuts. |

### LinkPathForVersionInfo(ShortcutLocation, ZipPackage, FileVersionInfo, string)
Given an [Velopack.NuGet.ZipPackage](../Velopack.NuGet/ZipPackage) and `System.Diagnostics.FileVersionInfo` return the target shortcut path.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L228)
```csharp title="Declaration"
protected virtual string LinkPathForVersionInfo(ShortcutLocation location, ZipPackage package, FileVersionInfo versionInfo, string rootdir)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.Windows.ShortcutLocation](../Velopack.Windows/ShortcutLocation) | *location* |
| [Velopack.NuGet.ZipPackage](../Velopack.NuGet/ZipPackage) | *package* |
| `System.Diagnostics.FileVersionInfo` | *versionInfo* |
| `System.String` | *rootdir* |

### GetLinkPath(ShortcutLocation, string, string, string, bool)
Given the application info, return the shortcut target path.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L251)
```csharp title="Declaration"
protected virtual string GetLinkPath(ShortcutLocation location, string title, string applicationName, string rootdir, bool createDirectoryIfNecessary = true)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.Windows.ShortcutLocation](../Velopack.Windows/ShortcutLocation) | *location* |
| `System.String` | *title* |
| `System.String` | *applicationName* |
| `System.String` | *rootdir* |
| `System.Boolean` | *createDirectoryIfNecessary* |

