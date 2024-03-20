---
title: Namespace Velopack
sidebar_label: Velopack
---
# Namespace Velopack
## Classes
### [ReleaseEntry](../Velopack/ReleaseEntry.md)
Represents a Velopack release, as described in a RELEASES file - usually also with an 
accompanying package containing the files needed to apply the release.
### [ReleaseEntryName](../Velopack/ReleaseEntryName.md)
Represents the information that can be parsed from a release entry filename.
### [RID](../Velopack/RID.md)

### [RuntimeVersion](../Velopack/RuntimeVersion.md)
A Version class that also supports a single integer (major only)
### [UpdateExe](../Velopack/UpdateExe.md)
A static helper class to assist in running Update.exe CLI commands. You probably should not invoke this directly, 
instead you should use the relevant methods on [Velopack.UpdateManager](../Velopack/UpdateManager.md). For example: 
[Velopack.UpdateManager.ApplyUpdatesAndExit(Velopack.VelopackAsset?)](../Velopack/UpdateManager.md#applyupdatesandexitvelopackasset), or `Velopack.UpdateManager.ApplyUpdatesAndRestart(Velopack.VelopackAsset%2cSystem.String%5b%5d)`.
### [UpdateInfo](../Velopack/UpdateInfo.md)
Holds information about the current version and pending updates, such as how many there are, and access to release notes.
### [UpdateManager](../Velopack/UpdateManager.md)
Provides functionality for checking for updates, downloading updates, and applying updates to the current application.
### [UpdateOptions](../Velopack/UpdateOptions.md)
Options to customise the behaviour of [Velopack.UpdateManager](../Velopack/UpdateManager.md).
### [VelopackApp](../Velopack/VelopackApp.md)
VelopackApp helps you to handle app activation events correctly.
This should be used as early as possible in your application startup code.
(eg. the beginning of Main() in Program.cs)
### [VelopackAsset](../Velopack/VelopackAsset.md)
An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.
### [VelopackAssetFeed](../Velopack/VelopackAssetFeed.md)
A feed of Velopack assets, usually returned from an [Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource.md).
### [VelopackRuntimeInfo](../Velopack/VelopackRuntimeInfo.md)
Convenience class which provides runtime information about the current executing process, 
in a way that is safe in older and newer versions of the framework.
## Enums
### [ReleaseNotesFormat](../Velopack/ReleaseNotesFormat.md)
Describes the requested release notes text format.
### [RidDisplayType](../Velopack/RidDisplayType.md)

### [RuntimeCpu](../Velopack/RuntimeCpu.md)
The Runtime CPU Architecture
### [RuntimeOs](../Velopack/RuntimeOs.md)
The Runtime OS
### [VelopackAssetType](../Velopack/VelopackAssetType.md)
Represents a Velopack Asset Type.
## Delegates
### [VelopackHook](../Velopack/VelopackHook.md)
A delegate type for handling Velopack startup events
