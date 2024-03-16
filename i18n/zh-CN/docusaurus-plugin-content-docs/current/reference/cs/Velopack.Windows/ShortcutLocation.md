---
title: Enum ShortcutLocation
sidebar_label: ShortcutLocation
description: "Specifies several common places where shortcuts can be installed on a user's system"
---
# Enum ShortcutLocation
Specifies several common places where shortcuts can be installed on a user's system

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L18)
```csharp title="Declaration"
[Flags]
public enum ShortcutLocation
```
## Fields
### StartMenu
A shortcut in ProgramFiles within a publisher sub-directory
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L24)
```csharp title="Declaration"
StartMenu = 1
```
### Desktop
A shortcut on the current user desktop
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L29)
```csharp title="Declaration"
Desktop = 2
```
### Startup
A shortcut in Startup/Run folder will cause the app to be automatially started on user login.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L34)
```csharp title="Declaration"
Startup = 4
```
### AppRoot
A shortcut in the application folder, useful for portable applications.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L39)
```csharp title="Declaration"
AppRoot = 8
```
### StartMenuRoot
A shortcut in ProgramFiles root folder (not in a company/publisher sub-directory). This is commonplace as of more recent versions of windows.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Shortcuts.cs#L44)
```csharp title="Declaration"
StartMenuRoot = 16
```
