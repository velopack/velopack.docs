---
title: Class GitBase<T>.GitBaseAsset
sidebar_label: GitBase<T>.GitBaseAsset
description: "Provides a wrapper around [Velopack.ReleaseEntry](../Velopack/ReleaseEntry) which also contains a Git Release."
---
# Class GitBase&lt;T&gt;.GitBaseAsset
Provides a wrapper around [Velopack.ReleaseEntry](../Velopack/ReleaseEntry) which also contains a Git Release.

###### **Assembly**: Velopack.dll
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L114)
```csharp title="Declaration"
protected record GitBase<T>.GitBaseAsset : VelopackAsset, IEquatable<VelopackAsset>, IEquatable<GitBase<T>.GitBaseAsset>
```
**Inheritance:** `System.Object` -> [Velopack.VelopackAsset](../Velopack/VelopackAsset)

**Implements:**  
`System.IEquatable<Velopack.VelopackAsset>`, `System.IEquatable<Velopack.Sources.GitBase`1.GitBaseAsset>`

## Properties
### Release
The Github release which contains this release package.
###### [View Source](https://github.com/velopack/velopack.git/blob/master/src/Velopack/Sources/GitBase.cs#L117)
```csharp title="Declaration"
public T Release { get; init; }
```

## Implements

* `System.IEquatable<Velopack.VelopackAsset>`
* `System.IEquatable<Velopack.Sources.GitBase`1.GitBaseAsset>`
