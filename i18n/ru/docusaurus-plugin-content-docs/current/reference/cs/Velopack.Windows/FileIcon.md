---
title: Class FileIcon
sidebar_label: FileIcon
description: "Enables extraction of icons for any file type from
the Shell."
---
# Class FileIcon
Enables extraction of icons for any file type from
the Shell.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L938)
```csharp title="Declaration"
public class FileIcon
```
## Properties
### Flags
Gets/sets the flags used to extract the icon
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L1022)
```csharp title="Declaration"
public FileIcon.SHGetFileInfoConstants Flags { get; set; }
```
### FileName
Gets/sets the filename to get the icon for
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L1030)
```csharp title="Declaration"
public string FileName { get; set; }
```
### ShellIcon
Gets the icon for the chosen file
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L1038)
```csharp title="Declaration"
public IntPtr ShellIcon { get; }
```
### DisplayName
Gets the display name for the selected file
if the SHGFI_DISPLAYNAME flag was set.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L1046)
```csharp title="Declaration"
public string DisplayName { get; }
```
### TypeName
Gets the type name for the selected file
if the SHGFI_TYPENAME flag was set.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/ShellLink.cs#L1054)
```csharp title="Declaration"
public string TypeName { get; }
```
