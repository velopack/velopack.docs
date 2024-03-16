---
title: Class ShellLink
sidebar_label: ShellLink
description: "Summary description for ShellLink."
---
# Class ShellLink
Summary description for ShellLink.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L17)
```csharp title="Declaration"
public class ShellLink : IDisposable
```
**Implements:**  
`System.IDisposable`

## Properties
### ShortCutFile

###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L532)
```csharp title="Declaration"
public string ShortCutFile { get; set; }
```
### IconPath
Gets the path to the file containing the icon for this shortcut.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L594)
```csharp title="Declaration"
public string IconPath { get; set; }
```
### IconIndex
Gets the index of this icon within the icon path's resources
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L628)
```csharp title="Declaration"
public int IconIndex { get; set; }
```
### Target
Gets/sets the fully qualified path to the link's target
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L662)
```csharp title="Declaration"
public string Target { get; set; }
```
### WorkingDirectory
Gets/sets the Working Directory for the Link
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L688)
```csharp title="Declaration"
public string WorkingDirectory { get; set; }
```
### Description
Gets/sets the description of the link
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L710)
```csharp title="Declaration"
public string Description { get; set; }
```
### Arguments
Gets/sets any command line arguments associated with the link
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L732)
```csharp title="Declaration"
public string Arguments { get; set; }
```
### DisplayMode
Gets/sets the initial display mode when the shortcut is
run
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L755)
```csharp title="Declaration"
public ShellLink.LinkDisplayMode DisplayMode { get; set; }
```
### HotKey
Gets/sets the HotKey to start the shortcut (if any)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L777)
```csharp title="Declaration"
public short HotKey { get; set; }
```
## Methods
### ~ShellLink()
Call dispose just in case it hasn't happened yet
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L512)
```csharp title="Declaration"
protected ~ShellLink()
```
### Dispose()
Dispose the object, releasing the COM ShellLink object
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L520)
```csharp title="Declaration"
public void Dispose()
```
### GetIcon(bool)
This pointer must be destroyed with DistroyIcon when you are done with it.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L541)
```csharp title="Declaration"
public IntPtr GetIcon(bool large)
```

##### Returns

`System.IntPtr`

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.Boolean` | *large* | Whether to return the small or large icon |

### SetAppUserModelId(string)
Sets the appUserModelId
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L799)
```csharp title="Declaration"
public void SetAppUserModelId(string appId)
```

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *appId* |

### SetToastActivatorCLSID(string)
Sets the ToastActivatorCLSID
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L810)
```csharp title="Declaration"
public void SetToastActivatorCLSID(string clsid)
```

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *clsid* |

### SetToastActivatorCLSID(Guid)
Sets the ToastActivatorCLSID
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L819)
```csharp title="Declaration"
public void SetToastActivatorCLSID(Guid clsid)
```

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.Guid` | *clsid* |

### Save()
Saves the shortcut to ShortCutFile.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L840)
```csharp title="Declaration"
public void Save()
```
### Save(string)
Saves the shortcut to the specified file
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L849)
```csharp title="Declaration"
public void Save(string linkFile)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.String` | *linkFile* | The shortcut file (.lnk) |

### Open(string)
Loads a shortcut from the specified file
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L867)
```csharp title="Declaration"
public void Open(string linkFile)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.String` | *linkFile* | The shortcut file (.lnk) to load |

### Open(string, IntPtr, EShellLinkResolveFlags)
Loads a shortcut from the specified file, and allows flags controlling
the UI behaviour if the shortcut's target isn't found to be set.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L885)
```csharp title="Declaration"
public void Open(string linkFile, IntPtr hWnd, ShellLink.EShellLinkResolveFlags resolveFlags)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.String` | *linkFile* | The shortcut file (.lnk) to load |
| `System.IntPtr` | *hWnd* | The window handle of the application's UI, if any |
| [Velopack.Windows.ShellLink.EShellLinkResolveFlags](../Velopack.Windows/ShellLink.EShellLinkResolveFlags) | *resolveFlags* | Flags controlling resolution behaviour |

### Open(string, IntPtr, EShellLinkResolveFlags, ushort)
Loads a shortcut from the specified file, and allows flags controlling
the UI behaviour if the shortcut's target isn't found to be set.  If
no SLR_NO_UI is specified, you can also specify a timeout.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L906)
```csharp title="Declaration"
public void Open(string linkFile, IntPtr hWnd, ShellLink.EShellLinkResolveFlags resolveFlags, ushort timeOut)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.String` | *linkFile* | The shortcut file (.lnk) to load |
| `System.IntPtr` | *hWnd* | The window handle of the application's UI, if any |
| [Velopack.Windows.ShellLink.EShellLinkResolveFlags](../Velopack.Windows/ShellLink.EShellLinkResolveFlags) | *resolveFlags* | Flags controlling resolution behaviour |
| `System.UInt16` | *timeOut* | Timeout if SLR_NO_UI is specified, in ms. |


## Implements

* `System.IDisposable`
