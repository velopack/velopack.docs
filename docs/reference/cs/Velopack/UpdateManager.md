---
title: Class UpdateManager
sidebar_label: UpdateManager
description: "Provides functionality for checking for updates, downloading updates, and applying updates to the current application."
---
# Class UpdateManager
Provides functionality for checking for updates, downloading updates, and applying updates to the current application.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.Helpers.cs#L6)
```csharp title="Declaration"
public class UpdateManager
```
## Properties
### AppId
The currently installed application Id. This would be what you set when you create your release.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L22)
```csharp title="Declaration"
public virtual string? AppId { get; }
```
### IsInstalled
True if this application is currently installed, and is able to download/check for updates.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L25)
```csharp title="Declaration"
public virtual bool IsInstalled { get; }
```
### IsUpdatePendingRestart
True if there is a local update prepared that requires a call to `Velopack.UpdateManager.ApplyUpdatesAndRestart(Velopack.VelopackAsset%2cSystem.String%5b%5d)` to be applied.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L28)
```csharp title="Declaration"
public virtual bool IsUpdatePendingRestart { get; }
```
### CurrentVersion
The currently installed app version when you created your release. Null if this is not a currently installed app.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L38)
```csharp title="Declaration"
public virtual SemanticVersion? CurrentVersion { get; }
```
### Source
The update source to use when checking for/downloading updates.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L41)
```csharp title="Declaration"
protected IUpdateSource Source { get; }
```
### Log
The logger to use for diagnostic messages.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L44)
```csharp title="Declaration"
protected ILogger Log { get; }
```
### Locator
The locator to use when searching for local file paths.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L47)
```csharp title="Declaration"
protected IVelopackLocator Locator { get; }
```
### Channel
The channel to use when searching for packages.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L50)
```csharp title="Declaration"
protected string Channel { get; }
```
### DefaultChannel
The default channel to search for packages in, if one was not provided by the user.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L53)
```csharp title="Declaration"
protected string DefaultChannel { get; }
```
### IsNonDefaultChannel
If true, an explicit channel was provided by the user, and it's different than the default channel.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L56)
```csharp title="Declaration"
protected bool IsNonDefaultChannel { get; }
```
### ShouldAllowVersionDowngrade
If true, UpdateManager should return the latest asset in the feed, even if that version is lower than the current version.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L59)
```csharp title="Declaration"
protected bool ShouldAllowVersionDowngrade { get; }
```
## Methods
### CheckForUpdates()
Checks for updates, returning null if there are none available. If there are updates available, this method will return an 
UpdateInfo object containing the latest available release, and any delta updates that can be applied if they are available.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L98)
```csharp title="Declaration"
public UpdateInfo? CheckForUpdates()
```

##### Returns

[Velopack.UpdateInfo](../Velopack/UpdateInfo): Null if no updates, otherwise [Velopack.UpdateInfo](../Velopack/UpdateInfo) containing the version of the latest update available.### CheckForUpdatesAsync()
Checks for updates, returning null if there are none available. If there are updates available, this method will return an 
UpdateInfo object containing the latest available release, and any delta updates that can be applied if they are available.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L109)
```csharp title="Declaration"
public virtual Task<UpdateInfo?> CheckForUpdatesAsync()
```

##### Returns

`System.Threading.Tasks.Task<Velopack.UpdateInfo>`: Null if no updates, otherwise [Velopack.UpdateInfo](../Velopack/UpdateInfo) containing the version of the latest update available.### CreateDeltaUpdateStrategy(VelopackAsset[], VelopackAsset?, VelopackAsset)
Given a feed of releases, and the latest local full release, and the latest remote full release, this method will return a delta
update strategy to be used by `Velopack.UpdateManager.DownloadUpdatesAsync(Velopack.UpdateInfo%2cSystem.Action%7bSystem.Int32%7d%2cSystem.Boolean%2cSystem.Threading.CancellationToken)`.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L155)
```csharp title="Declaration"
protected virtual UpdateInfo CreateDeltaUpdateStrategy(VelopackAsset[] feed, VelopackAsset? latestLocalFull, VelopackAsset latestRemoteFull)
```

##### Returns

[Velopack.UpdateInfo](../Velopack/UpdateInfo)

##### Parameters

| Type | Name |
|:--- |:--- |
| `Velopack.VelopackAsset[]` | *feed* |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset) | *latestLocalFull* |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset) | *latestRemoteFull* |

### DownloadUpdates(UpdateInfo, Action&lt;int&gt;?, bool)
Downloads the specified updates to the local app packages directory. If the update contains delta packages and ignoreDeltas=false, 
this method will attempt to unpack and prepare them. If there is no delta update available, or there is an error preparing delta 
packages, this method will fall back to downloading the full version of the update. This function will acquire a global update lock
so may fail if there is already another update operation in progress.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L183)
```csharp title="Declaration"
public void DownloadUpdates(UpdateInfo updates, Action<int>? progress = null, bool ignoreDeltas = false)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| [Velopack.UpdateInfo](../Velopack/UpdateInfo) | *updates* | The updates to download. Should be retrieved from [Velopack.UpdateManager.CheckForUpdates()](../Velopack/UpdateManager#checkforupdates). |
| `System.Action<System.Int32>` | *progress* | The progress callback. Will be called with values from 0-100. |
| `System.Boolean` | *ignoreDeltas* | Whether to attempt downloading delta's or skip to full package download. |

### DownloadUpdatesAsync(UpdateInfo, Action&lt;int&gt;?, bool, CancellationToken)
Downloads the specified updates to the local app packages directory. If the update contains delta packages and ignoreDeltas=false, 
this method will attempt to unpack and prepare them. If there is no delta update available, or there is an error preparing delta 
packages, this method will fall back to downloading the full version of the update. This function will acquire a global update lock
so may fail if there is already another update operation in progress.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L199)
```csharp title="Declaration"
public virtual Task DownloadUpdatesAsync(UpdateInfo updates, Action<int>? progress = null, bool ignoreDeltas = false, CancellationToken cancelToken = default)
```

##### Returns

`System.Threading.Tasks.Task`

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| [Velopack.UpdateInfo](../Velopack/UpdateInfo) | *updates* | The updates to download. Should be retrieved from [Velopack.UpdateManager.CheckForUpdates()](../Velopack/UpdateManager#checkforupdates). |
| `System.Action<System.Int32>` | *progress* | The progress callback. Will be called with values from 0-100. |
| `System.Boolean` | *ignoreDeltas* | Whether to attempt downloading delta's or skip to full package download. |
| `System.Threading.CancellationToken` | *cancelToken* | An optional cancellation token if you wish to stop this operation. |

### DownloadAndApplyDeltaUpdates(string, UpdateInfo, Action&lt;int&gt;, CancellationToken)
Given a folder containing the extracted base package, and a list of delta updates, downloads and applies the 
delta updates to the base package.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L328)
```csharp title="Declaration"
protected virtual Task DownloadAndApplyDeltaUpdates(string extractedBasePackage, UpdateInfo updates, Action<int> progress, CancellationToken cancelToken)
```

##### Returns

`System.Threading.Tasks.Task`

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| `System.String` | *extractedBasePackage* | A folder containing the application files to apply the delta's to. |
| [Velopack.UpdateInfo](../Velopack/UpdateInfo) | *updates* | An update object containing one or more delta's |
| `System.Action<System.Int32>` | *progress* | A callback reporting process of delta application progress (from 0-100). |
| `System.Threading.CancellationToken` | *cancelToken* | A token to use to cancel the request. |

### CleanPackagesExcept(string?)
Removes any incomplete files (.partial) and packages (.nupkg) from the packages directory that does not match
the provided asset. If assetToKeep is null, all packages will be deleted.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L379)
```csharp title="Declaration"
protected virtual void CleanPackagesExcept(string? assetToKeep)
```

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *assetToKeep* |

### VerifyPackageChecksum(VelopackAsset, string?)
Check a package checksum against the one in the release entry, and throws if the checksum does not match.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L416)
```csharp title="Declaration"
protected virtual void VerifyPackageChecksum(VelopackAsset release, string? filePathOverride = null)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset) | *release* | The entry to check |
| `System.String` | *filePathOverride* | Optional file path, if not specified the package will be loaded from %pkgdir%/release.OriginalFilename. |

### EnsureInstalled()
Throws an exception if the current application is not installed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L439)
```csharp title="Declaration"
protected virtual void EnsureInstalled()
```
### AcquireUpdateLock()
Acquires a globally unique mutex/lock for the current application, to avoid concurrent install/uninstall/update operations.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.cs#L448)
```csharp title="Declaration"
protected virtual Mutex AcquireUpdateLock()
```

##### Returns

`System.Threading.Mutex`
### ApplyUpdatesAndRestart(VelopackAsset?, string[]?)
This will exit your app immediately, apply updates, and then optionally relaunch the app using the specified 
restart arguments. If you need to save state or clean up, you should do that before calling this method. 
The user may be prompted during the update, if the update requires additional frameworks to be installed etc.
You can check if there are pending updates by checking [Velopack.UpdateManager.IsUpdatePendingRestart](../Velopack/UpdateManager#isupdatependingrestart).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.Helpers.cs#L22)
```csharp title="Declaration"
public void ApplyUpdatesAndRestart(VelopackAsset? toApply, string[]? restartArgs = null)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset) | *toApply* | The target release to apply. Can be left null to auto-apply the newest downloaded release. |
| `System.String[]` | *restartArgs* | The arguments to pass to the application when it is restarted. |

### ApplyUpdatesAndExit(VelopackAsset?)
This will exit your app immediately, apply updates, and then optionally relaunch the app using the specified 
restart arguments. If you need to save state or clean up, you should do that before calling this method. 
The user may be prompted during the update, if the update requires additional frameworks to be installed etc.
You can check if there are pending updates by checking [Velopack.UpdateManager.IsUpdatePendingRestart](../Velopack/UpdateManager#isupdatependingrestart).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.Helpers.cs#L41)
```csharp title="Declaration"
public void ApplyUpdatesAndExit(VelopackAsset? toApply)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset) | *toApply* | The target release to apply. Can be left null to auto-apply the newest downloaded release. |

### WaitExitThenApplyUpdates(VelopackAsset?, bool, bool, string[]?)
This will launch the Velopack updater and tell it to wait for this program to exit gracefully.
You should then clean up any state and exit your app. The updater will apply updates and then
optionally restart your app. The updater will only wait for 60 seconds before giving up.
You can check if there are pending updates by checking [Velopack.UpdateManager.IsUpdatePendingRestart](../Velopack/UpdateManager#isupdatependingrestart).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateManager.Helpers.cs#L57)
```csharp title="Declaration"
public void WaitExitThenApplyUpdates(VelopackAsset? toApply, bool silent = false, bool restart = true, string[]? restartArgs = null)
```

##### Parameters

| Type | Name | Description |
|:--- |:--- |:--- |
| [Velopack.VelopackAsset](../Velopack/VelopackAsset) | *toApply* | The target release to apply. Can be left null to auto-apply the newest downloaded release. |
| `System.Boolean` | *silent* | Configure whether Velopack should show a progress window / dialogs during the updates or not. |
| `System.Boolean` | *restart* | Configure whether Velopack should restart the app after the updates have been applied. |
| `System.String[]` | *restartArgs* | The arguments to pass to the application when it is restarted. |

