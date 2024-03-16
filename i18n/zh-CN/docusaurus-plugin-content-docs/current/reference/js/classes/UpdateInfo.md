# Class: UpdateInfo

Holds information about the current version and pending updates, such as how many there are, and access to release notes.

## Constructors

### constructor

• **new UpdateInfo**(): [`UpdateInfo`](UpdateInfo.md)

#### Returns

[`UpdateInfo`](UpdateInfo.md)

## Properties

### isDowngrade

• **isDowngrade**: `boolean`

True if the update is a version downgrade or lateral move (such as when switching channels to the same version number).
In this case, only full updates are allowed, and any local packages on disk newer than the downloaded version will be
deleted.

#### Defined in

[Velopack.d.ts:118](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L118)

___

### targetFullRelease

• **targetFullRelease**: [`VelopackAsset`](VelopackAsset.md)

The available version that we are updating to.

#### Defined in

[Velopack.d.ts:112](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L112)

## Methods

### fromJson

▸ **fromJson**(`json`): [`UpdateInfo`](UpdateInfo.md)

Parses a JSON string into an UpdateInfo object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `string` |

#### Returns

[`UpdateInfo`](UpdateInfo.md)

#### Defined in

[Velopack.d.ts:122](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L122)
