---
title: Runtimes
sidebar_position: 2
sidebar_label: 🟦 Runtimes
---
<!--  
  <auto-generated>   
    The contents of this file were generated by a tool.  
    Changes to this file may be list if the file is regenerated  
  </auto-generated>   
-->

# Runtimes Class

⚠️ **Warning:** These classes are no longer used by Velopack, and does not represent the current supported runtimes. https:\/\/github.com\/velopack\/velopack\/blob\/master\/docs\/bootstrapping.md

**Namespace:** [Velopack.Windows](../index.md)  
**Assembly:** Velopack  
**Assembly Version:** 0.0.556+83dfef5

Contains static properties to access common supported runtimes, and a function to search for a runtime by name

```csharp
[Obsolete("These classes are no longer used by Velopack, and does not represent the current supported runtimes. https://github.com/velopack/velopack/blob/master/docs/bootstrapping.md")]
public static class Runtimes
```

**Inheritance:** object → Runtimes

**Attributes:** ObsoleteAttribute

## Fields

| Name                                              | Description                                           |
| ------------------------------------------------- | ----------------------------------------------------- |
| [All](fields/All.md)                              |  An array of all the currently supported runtimes     |
| [DOTNET5\_X64](fields/DOTNET5_X64.md)             |  Runtime for .NET 5.0 Desktop Runtime (x64)           |
| [DOTNET5\_X86](fields/DOTNET5_X86.md)             |  Runtime for .NET 5.0 Desktop Runtime (x86)           |
| [DOTNET6\_ARM64](fields/DOTNET6_ARM64.md)         |  Runtime for .NET 6.0 Desktop Runtime (arm64)         |
| [DOTNET6\_X64](fields/DOTNET6_X64.md)             |  Runtime for .NET 6.0 Desktop Runtime (x64)           |
| [DOTNET6\_X86](fields/DOTNET6_X86.md)             |  Runtime for .NET 6.0 Desktop Runtime (x86)           |
| [DOTNET7\_ARM64](fields/DOTNET7_ARM64.md)         |  Runtime for .NET 7.0 Desktop Runtime (arm64)         |
| [DOTNET7\_X64](fields/DOTNET7_X64.md)             |  Runtime for .NET 7.0 Desktop Runtime (x64)           |
| [DOTNET7\_X86](fields/DOTNET7_X86.md)             |  Runtime for .NET 7.0 Desktop Runtime (x86)           |
| [DOTNET8\_ARM64](fields/DOTNET8_ARM64.md)         |  Runtime for .NET 8.0 Desktop Runtime (arm64)         |
| [DOTNET8\_X64](fields/DOTNET8_X64.md)             |  Runtime for .NET 8.0 Desktop Runtime (x64)           |
| [DOTNET8\_X86](fields/DOTNET8_X86.md)             |  Runtime for .NET 8.0 Desktop Runtime (x86)           |
| [DOTNETCORE31\_X64](fields/DOTNETCORE31_X64.md)   |  Runtime for .NET Core 3.1 Desktop Runtime (x64)      |
| [DOTNETCORE31\_X86](fields/DOTNETCORE31_X86.md)   |  Runtime for .NET Core 3.1 Desktop Runtime (x86)      |
| [NETFRAMEWORK45](fields/NETFRAMEWORK45.md)        |  Runtime for .NET Framework 4.5                       |
| [NETFRAMEWORK451](fields/NETFRAMEWORK451.md)      |  Runtime for .NET Framework 4.5.1                     |
| [NETFRAMEWORK452](fields/NETFRAMEWORK452.md)      |  Runtime for .NET Framework 4.5.2                     |
| [NETFRAMEWORK46](fields/NETFRAMEWORK46.md)        |  Runtime for .NET Framework 4.6                       |
| [NETFRAMEWORK461](fields/NETFRAMEWORK461.md)      |  Runtime for .NET Framework 4.6.1                     |
| [NETFRAMEWORK462](fields/NETFRAMEWORK462.md)      |  Runtime for .NET Framework 4.6.2                     |
| [NETFRAMEWORK47](fields/NETFRAMEWORK47.md)        |  Runtime for .NET Framework 4.7                       |
| [NETFRAMEWORK471](fields/NETFRAMEWORK471.md)      |  Runtime for .NET Framework 4.7.1                     |
| [NETFRAMEWORK472](fields/NETFRAMEWORK472.md)      |  Runtime for .NET Framework 4.7.2                     |
| [NETFRAMEWORK48](fields/NETFRAMEWORK48.md)        |  Runtime for .NET Framework 4.8                       |
| [NETFRAMEWORK481](fields/NETFRAMEWORK481.md)      |  Runtime for .NET Framework 4.8.1                     |
| [VCREDIST100\_X64](fields/VCREDIST100_X64.md)     |  Runtime for Visual C++ 2010 Redistributable (x64)    |
| [VCREDIST100\_X86](fields/VCREDIST100_X86.md)     |  Runtime for Visual C++ 2010 Redistributable (x86)    |
| [VCREDIST110\_X64](fields/VCREDIST110_X64.md)     |  Runtime for Visual C++ 2012 Redistributable (x64)    |
| [VCREDIST110\_X86](fields/VCREDIST110_X86.md)     |  Runtime for Visual C++ 2012 Redistributable (x86)    |
| [VCREDIST120\_X64](fields/VCREDIST120_X64.md)     |  Runtime for Visual C++ 2013 Redistributable (x64)    |
| [VCREDIST120\_X86](fields/VCREDIST120_X86.md)     |  Runtime for Visual C++ 2013 Redistributable (x86)    |
| [VCREDIST140\_X64](fields/VCREDIST140_X64.md)     |  Runtime for Visual C++ 2015 Redistributable (x64)    |
| [VCREDIST140\_X86](fields/VCREDIST140_X86.md)     |  Runtime for Visual C++ 2015 Redistributable (x86)    |
| [VCREDIST141\_X64](fields/VCREDIST141_X64.md)     |  Runtime for Visual C++ 2017 Redistributable (x64)    |
| [VCREDIST141\_X86](fields/VCREDIST141_X86.md)     |  Runtime for Visual C++ 2017 Redistributable (x86)    |
| [VCREDIST142\_X64](fields/VCREDIST142_X64.md)     |  Runtime for Visual C++ 2019 Redistributable (x64)    |
| [VCREDIST142\_X86](fields/VCREDIST142_X86.md)     |  Runtime for Visual C++ 2019 Redistributable (x86)    |
| [VCREDIST143\_ARM64](fields/VCREDIST143_ARM64.md) |  Runtime for Visual C++ 2022 Redistributable (arm64)  |
| [VCREDIST143\_X64](fields/VCREDIST143_X64.md)     |  Runtime for Visual C++ 2022 Redistributable (x64)    |
| [VCREDIST143\_X86](fields/VCREDIST143_X86.md)     |  Runtime for Visual C++ 2022 Redistributable (x86)    |

## Methods

| Name                                                    | Description                                                                                                                        |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [GetRuntimeByName(string)](methods/GetRuntimeByName.md) | Search for a runtime by name. If a platform architecture is not specified, the default is x64. Returns null if no match is found.  |

## Nested Types

| Name                                                           | Description                                                                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| [Runtimes.DotnetInfo](DotnetInfo/index.md)                     |  Represents a modern DOTNET runtime where versions are deployed independenly of the operating system         |
| [Runtimes.DotnetRuntimeType](DotnetRuntimeType/index.md)       |  Dotnet Runtime SKU                                                                                          |
| [Runtimes.FrameworkInfo](FrameworkInfo/index.md)               |  Represents a full .NET Framework runtime, usually included in Windows automatically through Windows Update  |
| [Runtimes.RuntimeInfo](RuntimeInfo/index.md)                   |  Base type containing information about a runtime in relation to the current operating system                |
| [Runtimes.RuntimeInstallResult](RuntimeInstallResult/index.md) |  Runtime installation result code                                                                            |
| [Runtimes.VCRedist00](VCRedist00/index.md)                     |  Represents a VC++ redistributable package which is referenced by a permalink                                |
| [Runtimes.VCRedist14](VCRedist14/index.md)                     |  Represents a VC++ 2015\-2022 redistributable package.                                                       |
| [Runtimes.VCRedistInfo](VCRedistInfo/index.md)                 |  The base class for a VC++ redistributable package.                                                          |

___

*Documentation generated by [MdDocs](https://github.com/ap0llo/mddocs)*