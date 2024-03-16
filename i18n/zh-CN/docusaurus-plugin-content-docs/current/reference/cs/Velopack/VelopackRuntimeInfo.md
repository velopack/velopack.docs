---
title: Class VelopackRuntimeInfo
sidebar_label: VelopackRuntimeInfo
description: "Convenience class which provides runtime information about the current executing process, 
in a way that is safe in older and newer versions of the framework."
---
# Class VelopackRuntimeInfo
Convenience class which provides runtime information about the current executing process, 
in a way that is safe in older and newer versions of the framework.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L79)
```csharp title="Declaration"
public static class VelopackRuntimeInfo
```
## Properties
### VelopackDisplayVersion
The current compiled Velopack display version.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L82)
```csharp title="Declaration"
public static string VelopackDisplayVersion { get; }
```
### VelopackNugetVersion
The current compiled Velopack NuGetVersion.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L85)
```csharp title="Declaration"
public static NuGetVersion VelopackNugetVersion { get; }
```
### VelopackProductVersion
The current compiled Velopack ProductVersion.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L88)
```csharp title="Declaration"
public static NuGetVersion VelopackProductVersion { get; }
```
### EntryExePath
The path on disk of the entry assembly.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L91)
```csharp title="Declaration"
public static string EntryExePath { get; }
```
### SystemArch
The current machine architecture, ignoring the current process / pe architecture.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L94)
```csharp title="Declaration"
public static RuntimeCpu SystemArch { get; }
```
### SystemOs
The name of the current OS - eg. 'windows', 'linux', or 'osx'.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L97)
```csharp title="Declaration"
public static RuntimeOs SystemOs { get; }
```
### SystemRid
The current system RID.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L100)
```csharp title="Declaration"
public static string SystemRid { get; }
```
### IsWindows
True if executing on a Windows platform.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L103)
```csharp title="Declaration"
public static bool IsWindows { get; }
```
### IsLinux
True if executing on a Linux platform.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L107)
```csharp title="Declaration"
public static bool IsLinux { get; }
```
### IsOSX
True if executing on a MacOS / OSX platform.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L111)
```csharp title="Declaration"
public static bool IsOSX { get; }
```
## Methods
### GetOsShortName(RuntimeOs)
Returns the shortened OS name as a string, suitable for creating an RID.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L185)
```csharp title="Declaration"
public static string GetOsShortName(this RuntimeOs os)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.RuntimeOs](../Velopack/RuntimeOs) | *os* |

### GetOsLongName(RuntimeOs)
Returns the long OS name, suitable for showing to a human.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackRuntimeInfo.cs#L198)
```csharp title="Declaration"
public static string GetOsLongName(this RuntimeOs os)
```

##### Returns

`System.String`

##### Parameters

| Type | Name |
|:--- |:--- |
| [Velopack.RuntimeOs](../Velopack/RuntimeOs) | *os* |

