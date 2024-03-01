---
title: Enum ShellLink.EShellLinkResolveFlags
sidebar_label: ShellLink.EShellLinkResolveFlags
description: "Flags determining how the links with missing
targets are resolved."
---
# Enum ShellLink.EShellLinkResolveFlags
Flags determining how the links with missing
targets are resolved.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L410)
```csharp title="Declaration"
[Flags]
public enum ShellLink.EShellLinkResolveFlags : uint
```
## Fields
### SLR_ANY_MATCH
Allow any match during resolution.  Has no effect
on ME/2000 or above, use the other flags instead.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L417)
```csharp title="Declaration"
SLR_ANY_MATCH = 2
```
### SLR_INVOKE_MSI
Call the Microsoft Windows Installer.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L422)
```csharp title="Declaration"
SLR_INVOKE_MSI = 128
```
### SLR_NOLINKINFO
Disable distributed link tracking. By default, 
distributed link tracking tracks removable media 
across multiple devices based on the volume name. 
It also uses the UNC path to track remote file 
systems whose drive letter has changed. Setting 
SLR_NOLINKINFO disables both types of tracking.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L432)
```csharp title="Declaration"
SLR_NOLINKINFO = 64
```
### SLR_NO_UI
Do not display a dialog box if the link cannot be resolved. 
When SLR_NO_UI is set, a time-out value that specifies the 
maximum amount of time to be spent resolving the link can 
be specified in milliseconds. The function returns if the 
link cannot be resolved within the time-out duration. 
If the timeout is not set, the time-out duration will be 
set to the default value of 3,000 milliseconds (3 seconds).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L443)
```csharp title="Declaration"
SLR_NO_UI = 1
```
### SLR_NO_UI_WITH_MSG_PUMP
Not documented in SDK.  Assume same as SLR_NO_UI but 
intended for applications without a hWnd.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L449)
```csharp title="Declaration"
SLR_NO_UI_WITH_MSG_PUMP = 257
```
### SLR_NOUPDATE
Do not update the link information.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L454)
```csharp title="Declaration"
SLR_NOUPDATE = 8
```
### SLR_NOSEARCH
Do not execute the search heuristics.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L459)
```csharp title="Declaration"
SLR_NOSEARCH = 16
```
### SLR_NOTRACK
Do not use distributed link tracking.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L464)
```csharp title="Declaration"
SLR_NOTRACK = 32
```
### SLR_UPDATE
If the link object has changed, update its path and list 
of identifiers. If SLR_UPDATE is set, you do not need to 
call IPersistFile::IsDirty to determine whether or not 
the link object has changed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L472)
```csharp title="Declaration"
SLR_UPDATE = 4
```
