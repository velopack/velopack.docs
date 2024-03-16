---
title: Namespace Velopack
sidebar_label: Velopack
---
# Namespace Velopack
## Classes
### [ReleaseEntry](../Velopack/ReleaseEntry)
Represents a Velopack release, as described in a RELEASES file - usually also with an 
accompanying package containing the files needed to apply the release.
### [ReleaseEntryName](../Velopack/ReleaseEntryName)
Represents the information that can be parsed from a release entry filename.
### [RID](../Velopack/RID)

### [RuntimeVersion](../Velopack/RuntimeVersion)
A Version class that also supports a single integer (major only)
### [UpdateExe](../Velopack/UpdateExe)
A static helper class to assist in running Update.exe CLI commands. You probably should not invoke this directly, 
instead you should use the relevant methods on [Velopack.UpdateManager](../Velopack/UpdateManager). For example: 
[Velopack.UpdateManager.ApplyUpdatesAndExit(Velopack.VelopackAsset?)](../Velopack/UpdateManager#applyupdatesandexitvelopackasset), or `Velopack.UpdateManager.ApplyUpdatesAndRestart(Velopack.VelopackAsset%2cSystem.String%5b%5d)`.
### [UpdateInfo](../Velopack/UpdateInfo)
Holds information about the current version and pending updates, such as how many there are, and access to release notes.
### [UpdateManager](../Velopack/UpdateManager)
Provides functionality for checking for updates, downloading updates, and applying updates to the current application.
### [UpdateOptions](../Velopack/UpdateOptions)
Options to customise the behaviour of [Velopack.UpdateManager](../Velopack/UpdateManager).
### [VelopackApp](../Velopack/VelopackApp)
VelopackApp helps you to handle app activation events correctly.
This should be used as early as possible in your application startup code.
(eg. the beginning of Main() in Program.cs)
### [VelopackAsset](../Velopack/VelopackAsset)
An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.
### [VelopackAssetFeed](../Velopack/VelopackAssetFeed)
A feed of Velopack assets, usually returned from an [Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource).
### [VelopackRuntimeInfo](../Velopack/VelopackRuntimeInfo)
Convenience class which provides runtime information about the current executing process, 
in a way that is safe in older and newer versions of the framework.
## Enums
### [ReleaseNotesFormat](../Velopack/ReleaseNotesFormat)
Describes the requested release notes text format.
### [RidDisplayType](../Velopack/RidDisplayType)

### [RuntimeCpu](../Velopack/RuntimeCpu)
The Runtime CPU Architecture
### [RuntimeOs](../Velopack/RuntimeOs)
The Runtime OS
### [VelopackAssetType](../Velopack/VelopackAssetType)
Represents a Velopack Asset Type.
## Delegates
### [VelopackHook](../Velopack/VelopackHook)
A delegate type for handling Velopack startup events
