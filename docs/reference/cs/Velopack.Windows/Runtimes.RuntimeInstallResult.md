---
title: Enum Runtimes.RuntimeInstallResult
sidebar_label: Runtimes.RuntimeInstallResult
description: "Runtime installation result code"
---
# Enum Runtimes.RuntimeInstallResult
Runtime installation result code

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L31)
```csharp title="Declaration"
public enum Runtimes.RuntimeInstallResult
```
## Fields
### InstallSuccess
The install was successful
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L34)
```csharp title="Declaration"
InstallSuccess = 0
```
### UserCancelled
The install failed because it was cancelled by the user
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L36)
```csharp title="Declaration"
UserCancelled = 1602
```
### AnotherInstallInProgress
The install failed because another install is in progress, try again later
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L38)
```csharp title="Declaration"
AnotherInstallInProgress = 1618
```
### RestartRequired
The install failed because a system restart is required before continuing
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L40)
```csharp title="Declaration"
RestartRequired = 3010
```
### SystemDoesNotMeetRequirements
The install failed because the current system does not support this runtime (outdated/unsupported)
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Windows/RuntimeInfo.cs#L42)
```csharp title="Declaration"
SystemDoesNotMeetRequirements = 5100
```
