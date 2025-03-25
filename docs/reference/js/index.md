---
sidebar_label: Overview
sidebar_position: 0
---
# velopack

## Classes

| Class | Description |
| ------ | ------ |
| [UpdateManager](Class.UpdateManager.md) | Provides functionality for checking for updates, downloading updates, and applying updates to the current application. |
| [VelopackApp](Class.VelopackApp.md) | VelopackApp helps you to handle app activation events correctly. This should be used as early as possible in your application startup code. (eg. the beginning of main() or wherever your entry point is) |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [UpdateInfo](TypeAlias.UpdateInfo.md) | Holds information about the current version and pending updates, such as how many there are, and access to release notes. |
| [UpdateOptions](TypeAlias.UpdateOptions.md) | Options to customise the behaviour of UpdateManager. |
| [VelopackLocatorConfig](TypeAlias.VelopackLocatorConfig.md) | VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth). |
