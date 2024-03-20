---
title: Class UpdateOptions
sidebar_label: UpdateOptions
description: "Options to customise the behaviour of [Velopack.UpdateManager](../Velopack/UpdateManager.md)."
---
# Class UpdateOptions
Options to customise the behaviour of [Velopack.UpdateManager](../Velopack/UpdateManager.md).

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateOptions.cs#L6)
```csharp title="Declaration"
public class UpdateOptions
```
## Properties
### AllowVersionDowngrade
Allows UpdateManager to update to a version that's lower than the current version (i.e. downgrading).
This could happen if a release has bugs and was retracted from the release feed, or if you're using 
[Velopack.UpdateOptions.ExplicitChannel](../Velopack/UpdateOptions.md#explicitchannel) to switch channels to another channel where the latest version on that 
channel is lower than the current version.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateOptions.cs#L14)
```csharp title="Declaration"
public bool AllowVersionDowngrade { get; set; }
```
### ExplicitChannel
&lt;b&gt;This option should usually be left null&lt;/b&gt;. Overrides the default channel used to fetch updates. 
The default channel will be whatever channel was specified on the command line when building this release. 
For example, if the current release was packaged with '--channel beta', then the default channel will be 'beta'.
This allows users to automatically receive updates from the same channel they installed from. This options
allows you to explicitly switch channels, for example if the user wished to switch back to the 'stable' channel
without having to reinstall the application.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/UpdateOptions.cs#L24)
```csharp title="Declaration"
public string? ExplicitChannel { get; set; }
```
