---
title: Class VelopackAssetFeed
sidebar_label: VelopackAssetFeed
description: "A feed of Velopack assets, usually returned from an [Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource)."
---
# Class VelopackAssetFeed
A feed of Velopack assets, usually returned from an [Velopack.Sources.IUpdateSource](../Velopack.Sources/IUpdateSource).

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L24)
```csharp title="Declaration"
public record VelopackAssetFeed : IEquatable<VelopackAssetFeed>
```
**Implements:**  
`System.IEquatable<Velopack.VelopackAssetFeed>`

## Properties
### Assets
A list of assets available in this feed.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L29)
```csharp title="Declaration"
public VelopackAsset[] Assets { get; init; }
```
## Methods
### FromJson(string)
Parse a json string into a [Velopack.VelopackAssetFeed](../Velopack/VelopackAssetFeed).
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/VelopackAsset.cs#L34)
```csharp title="Declaration"
public static VelopackAssetFeed FromJson(string json)
```

##### Returns

[Velopack.VelopackAssetFeed](../Velopack/VelopackAssetFeed)

##### Parameters

| Type | Name |
|:--- |:--- |
| `System.String` | *json* |


## Implements

* `System.IEquatable<Velopack.VelopackAssetFeed>`
