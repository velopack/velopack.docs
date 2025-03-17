# Type Alias: UpdateInfo

> **UpdateInfo** = `object`

Holds information about the current version and pending updates, such as how many there are, and access to release notes.

## Properties

### IsDowngrade

> **IsDowngrade**: `boolean`

True if the update is a version downgrade or lateral move (such as when switching channels to the same version number).
In this case, only full updates are allowed, and any local packages on disk newer than the downloaded version will be
deleted.

***

### TargetFullRelease

> **TargetFullRelease**: `VelopackAsset`

The available version that we are updating to.
