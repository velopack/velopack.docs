---
title: ReleaseEntryName
sidebar_position: 2
sidebar_label: ReleaseEntryName
---
<!--  
  <auto-generated>   
    The contents of this file were generated by a tool.  
    Changes to this file may be list if the file is regenerated  
  </auto-generated>   
-->

# ReleaseEntryName Class

⚠️ **Warning:** This release format has been replaced by VelopackRelease

**Namespace:** [Velopack](../index.md)  
**Assembly:** Velopack  
**Assembly Version:** 0.0.1053+0cec039

Represents the information that can be parsed from a release entry filename.

```csharp
[Obsolete("This release format has been replaced by VelopackRelease")]
public sealed class ReleaseEntryName : IEquatable<ReleaseEntryName>
```

**Inheritance:** object → ReleaseEntryName

**Attributes:** ObsoleteAttribute

**Implements:** IEquatable\<ReleaseEntryName\>

## Constructors

| Name                                                                     | Description                                                                                               |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| [ReleaseEntryName(string, SemanticVersion, bool)](constructors/index.md) | Create a new ReleaseEntryName from the given package name, version, delta status, and runtime identifier. |

## Properties

| Name                                 | Description                                                          |
| ------------------------------------ | -------------------------------------------------------------------- |
| [IsDelta](properties/IsDelta.md)     |  Whether this is a delta (patch) package, or a full update package.  |
| [PackageId](properties/PackageId.md) |  The package Id.                                                     |
| [Version](properties/Version.md)     |  The package version.                                                |

## Methods

| Name                                                                 | Description                                                                                                                                                                                                                |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [\<Clone\>$()](methods/%253CClone%253E$.md)                          |                                                                                                                                                                                                                            |
| [Equals(ReleaseEntryName)](methods/Equals.md#equalsreleaseentryname) |                                                                                                                                                                                                                            |
| [Equals(object)](methods/Equals.md#equalsobject)                     |                                                                                                                                                                                                                            |
| [FromEntryFileName(string)](methods/FromEntryFileName.md)            | Takes a filename such as 'My\-Cool3\-App\-1.0.1\-build.23\-full.nupkg' and separates it into  it's name and version (eg. 'My\-Cool3\-App', and '1.0.1\-build.23'). Returns null values if  the filename can not be parsed. |
| [GetHashCode()](methods/GetHashCode.md)                              |                                                                                                                                                                                                                            |
| [ToFileName()](methods/ToFileName.md)                                | Generate the file name which would represent this ReleaseEntryName.                                                                                                                                                        |
| [ToString()](methods/ToString.md)                                    |                                                                                                                                                                                                                            |

## Operators

| Name                                                                      | Description |
| ------------------------------------------------------------------------- | ----------- |
| [Equality(ReleaseEntryName, ReleaseEntryName)](operators/Equality.md)     |             |
| [Inequality(ReleaseEntryName, ReleaseEntryName)](operators/Inequality.md) |             |

___

*Documentation generated by [MdDocs](https://github.com/ap0llo/mddocs)*
