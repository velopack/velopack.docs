# Class: VelopackAsset

An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.

## Constructors

### constructor

• **new VelopackAsset**(): [`VelopackAsset`](VelopackAsset.md)

#### Returns

[`VelopackAsset`](VelopackAsset.md)

## Properties

### fileName

• **fileName**: `string`

The filename of the update package containing this release.

#### Defined in

[Velopack.d.ts:79](https://github.com/velopack/velopack.fusion/blob/b92fa93/for-js/Velopack.d.ts#L79)

___

### notesHTML

• **notesHTML**: `string`

The release notes in HTML format, transformed from Markdown when packaging the release.

#### Defined in

[Velopack.d.ts:95](https://github.com/velopack/velopack.fusion/blob/b92fa93/for-js/Velopack.d.ts#L95)

___

### notesMarkdown

• **notesMarkdown**: `string`

The release notes in markdown format, as passed to Velopack when packaging the release.

#### Defined in

[Velopack.d.ts:91](https://github.com/velopack/velopack.fusion/blob/b92fa93/for-js/Velopack.d.ts#L91)

___

### packageId

• **packageId**: `string`

The name or Id of the package containing this release.

#### Defined in

[Velopack.d.ts:67](https://github.com/velopack/velopack.fusion/blob/b92fa93/for-js/Velopack.d.ts#L67)

___

### sha1

• **sha1**: `string`

The SHA1 checksum of the update package containing this release.

#### Defined in

[Velopack.d.ts:83](https://github.com/velopack/velopack.fusion/blob/b92fa93/for-js/Velopack.d.ts#L83)

___

### size

• **size**: `bigint`

The size in bytes of the update package containing this release.

#### Defined in

[Velopack.d.ts:87](https://github.com/velopack/velopack.fusion/blob/b92fa93/for-js/Velopack.d.ts#L87)

___

### type

• **type**: [`VelopackAssetType`](../enums/VelopackAssetType.md)

The type of asset (eg. full or delta).

#### Defined in

[Velopack.d.ts:75](https://github.com/velopack/velopack.fusion/blob/b92fa93/for-js/Velopack.d.ts#L75)

___

### version

• **version**: `string`

The version of this release.

#### Defined in

[Velopack.d.ts:71](https://github.com/velopack/velopack.fusion/blob/b92fa93/for-js/Velopack.d.ts#L71)

## Methods

### fromJson

▸ **fromJson**(`json`): [`VelopackAsset`](VelopackAsset.md)

Parses a JSON string into a VelopackAsset object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `string` |

#### Returns

[`VelopackAsset`](VelopackAsset.md)

#### Defined in

[Velopack.d.ts:99](https://github.com/velopack/velopack.fusion/blob/b92fa93/for-js/Velopack.d.ts#L99)

___

### fromNode

▸ **fromNode**(`node`): [`VelopackAsset`](VelopackAsset.md)

Parses a JSON node into a VelopackAsset object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`JsonNode`](JsonNode.md) |

#### Returns

[`VelopackAsset`](VelopackAsset.md)

#### Defined in

[Velopack.d.ts:103](https://github.com/velopack/velopack.fusion/blob/b92fa93/for-js/Velopack.d.ts#L103)
