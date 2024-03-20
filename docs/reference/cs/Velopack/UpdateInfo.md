---
title: Class UpdateInfo
sidebar_label: UpdateInfo
description: "Holds information about the current version and pending updates, such as how many there are, and access to release notes."
---
# Class UpdateInfo
Holds information about the current version and pending updates, such as how many there are, and access to release notes.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateInfo.cs#L6)
```csharp title="Declaration"
public class UpdateInfo
```
## Properties
### TargetFullRelease
The available version that we are updating to.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateInfo.cs#L11)
```csharp title="Declaration"
public VelopackAsset TargetFullRelease { get; }
```
### IsDowngrade
True if the update is a version downgrade or lateral move (such as when switching channels to the same version number).
In this case, only full updates are allowed, and any local packages on disk newer than the downloaded version will be
deleted.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateInfo.cs#L18)
```csharp title="Declaration"
public bool IsDowngrade { get; }
```
### BaseRelease
The base release that we are to apply delta updates from. If null, we can try doing a delta update from
the currently installed version.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateInfo.cs#L24)
```csharp title="Declaration"
public VelopackAsset? BaseRelease { get; }
```
### DeltasToTarget
The list of delta versions between the current version and [Velopack.UpdateInfo.TargetFullRelease](../Velopack/UpdateInfo.md#targetfullrelease).
These will be applied in order.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateInfo.cs#L30)
```csharp title="Declaration"
public VelopackAsset[] DeltasToTarget { get; }
```
