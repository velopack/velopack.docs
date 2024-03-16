---
title: Class Runtimes
sidebar_label: Runtimes
description: "Contains static properties to access common supported runtimes, and a function to search for a runtime by name"
---
# Class Runtimes
Contains static properties to access common supported runtimes, and a function to search for a runtime by name

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L10)
```csharp title="Declaration"
[Obsolete("These classes are no longer used by Velopack, and does not represent the current supported runtimes. https://github.com/velopack/velopack/blob/master/docs/bootstrapping.md")]
public static class Runtimes
```
## Fields
### NETFRAMEWORK45
Runtime for .NET Framework 4.5
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L15)
```csharp title="Declaration"
[Obsolete("EOL")]
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK45
```
### NETFRAMEWORK451
Runtime for .NET Framework 4.5.1
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L18)
```csharp title="Declaration"
[Obsolete("EOL")]
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK451
```
### NETFRAMEWORK452
Runtime for .NET Framework 4.5.2
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L21)
```csharp title="Declaration"
[Obsolete("EOL")]
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK452
```
### NETFRAMEWORK46
Runtime for .NET Framework 4.6
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L24)
```csharp title="Declaration"
[Obsolete("EOL")]
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK46
```
### NETFRAMEWORK461
Runtime for .NET Framework 4.6.1
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L27)
```csharp title="Declaration"
[Obsolete("EOL")]
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK461
```
### NETFRAMEWORK462
Runtime for .NET Framework 4.6.2
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L29)
```csharp title="Declaration"
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK462
```
### NETFRAMEWORK47
Runtime for .NET Framework 4.7
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L31)
```csharp title="Declaration"
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK47
```
### NETFRAMEWORK471
Runtime for .NET Framework 4.7.1
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L33)
```csharp title="Declaration"
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK471
```
### NETFRAMEWORK472
Runtime for .NET Framework 4.7.2
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L35)
```csharp title="Declaration"
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK472
```
### NETFRAMEWORK48
Runtime for .NET Framework 4.8
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L37)
```csharp title="Declaration"
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK48
```
### NETFRAMEWORK481
Runtime for .NET Framework 4.8.1
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L39)
```csharp title="Declaration"
public static readonly Runtimes.FrameworkInfo NETFRAMEWORK481
```
### DOTNETCORE31_X86
Runtime for .NET Core 3.1 Desktop Runtime (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L44)
```csharp title="Declaration"
[Obsolete("EOL")]
public static readonly Runtimes.DotnetInfo DOTNETCORE31_X86
```
### DOTNETCORE31_X64
Runtime for .NET Core 3.1 Desktop Runtime (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L47)
```csharp title="Declaration"
[Obsolete("EOL")]
public static readonly Runtimes.DotnetInfo DOTNETCORE31_X64
```
### DOTNET5_X86
Runtime for .NET 5.0 Desktop Runtime (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L50)
```csharp title="Declaration"
[Obsolete("EOL")]
public static readonly Runtimes.DotnetInfo DOTNET5_X86
```
### DOTNET5_X64
Runtime for .NET 5.0 Desktop Runtime (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L53)
```csharp title="Declaration"
[Obsolete("EOL")]
public static readonly Runtimes.DotnetInfo DOTNET5_X64
```
### DOTNET6_X86
Runtime for .NET 6.0 Desktop Runtime (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L55)
```csharp title="Declaration"
public static readonly Runtimes.DotnetInfo DOTNET6_X86
```
### DOTNET6_X64
Runtime for .NET 6.0 Desktop Runtime (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L57)
```csharp title="Declaration"
public static readonly Runtimes.DotnetInfo DOTNET6_X64
```
### DOTNET6_ARM64
Runtime for .NET 6.0 Desktop Runtime (arm64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L59)
```csharp title="Declaration"
public static readonly Runtimes.DotnetInfo DOTNET6_ARM64
```
### DOTNET7_X86
Runtime for .NET 7.0 Desktop Runtime (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L61)
```csharp title="Declaration"
public static readonly Runtimes.DotnetInfo DOTNET7_X86
```
### DOTNET7_X64
Runtime for .NET 7.0 Desktop Runtime (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L63)
```csharp title="Declaration"
public static readonly Runtimes.DotnetInfo DOTNET7_X64
```
### DOTNET7_ARM64
Runtime for .NET 7.0 Desktop Runtime (arm64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L65)
```csharp title="Declaration"
public static readonly Runtimes.DotnetInfo DOTNET7_ARM64
```
### DOTNET8_X86
Runtime for .NET 8.0 Desktop Runtime (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L67)
```csharp title="Declaration"
public static readonly Runtimes.DotnetInfo DOTNET8_X86
```
### DOTNET8_X64
Runtime for .NET 8.0 Desktop Runtime (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L69)
```csharp title="Declaration"
public static readonly Runtimes.DotnetInfo DOTNET8_X64
```
### DOTNET8_ARM64
Runtime for .NET 8.0 Desktop Runtime (arm64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L71)
```csharp title="Declaration"
public static readonly Runtimes.DotnetInfo DOTNET8_ARM64
```
### VCREDIST100_X86
Runtime for Visual C++ 2010 Redistributable (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L75)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist00 VCREDIST100_X86
```
### VCREDIST100_X64
Runtime for Visual C++ 2010 Redistributable (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L78)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist00 VCREDIST100_X64
```
### VCREDIST110_X86
Runtime for Visual C++ 2012 Redistributable (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L81)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist00 VCREDIST110_X86
```
### VCREDIST110_X64
Runtime for Visual C++ 2012 Redistributable (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L84)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist00 VCREDIST110_X64
```
### VCREDIST120_X86
Runtime for Visual C++ 2013 Redistributable (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L87)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist00 VCREDIST120_X86
```
### VCREDIST120_X64
Runtime for Visual C++ 2013 Redistributable (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L90)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist00 VCREDIST120_X64
```
### VCREDIST140_X86
Runtime for Visual C++ 2015 Redistributable (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L93)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist14 VCREDIST140_X86
```
### VCREDIST140_X64
Runtime for Visual C++ 2015 Redistributable (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L95)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist14 VCREDIST140_X64
```
### VCREDIST141_X86
Runtime for Visual C++ 2017 Redistributable (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L97)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist14 VCREDIST141_X86
```
### VCREDIST141_X64
Runtime for Visual C++ 2017 Redistributable (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L99)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist14 VCREDIST141_X64
```
### VCREDIST142_X86
Runtime for Visual C++ 2019 Redistributable (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L101)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist14 VCREDIST142_X86
```
### VCREDIST142_X64
Runtime for Visual C++ 2019 Redistributable (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L103)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist14 VCREDIST142_X64
```
### VCREDIST143_X86
Runtime for Visual C++ 2022 Redistributable (x86)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L105)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist14 VCREDIST143_X86
```
### VCREDIST143_X64
Runtime for Visual C++ 2022 Redistributable (x64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L107)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist14 VCREDIST143_X64
```
### VCREDIST143_ARM64
Runtime for Visual C++ 2022 Redistributable (arm64)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L109)
```csharp title="Declaration"
public static readonly Runtimes.VCRedist14 VCREDIST143_ARM64
```
### All
An array of all the currently supported runtimes
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L112)
```csharp title="Declaration"
public static readonly Runtimes.RuntimeInfo[] All
```
## Methods
### GetRuntimeByName(string)
Search for a runtime by name. If a platform architecture is not specified, the default is x64.
Returns null if no match is found.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/Runtimes.cs#L127)
```csharp title="Declaration"
public static Runtimes.RuntimeInfo GetRuntimeByName(string name)
```

##### Returns

[Velopack.Windows.Runtimes.RuntimeInfo](../Velopack.Windows/Runtimes.RuntimeInfo)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *name* |

