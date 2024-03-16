# Class: JsonNode

## Constructors

### constructor

• **new JsonNode**(): [`JsonNode`](JsonNode.md)

#### Returns

[`JsonNode`](JsonNode.md)

## Properties

### #private

• `Private` **#private**: `any`

#### Defined in

[Velopack.d.ts:10](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L10)

## Methods

### addArrayChild

▸ **addArrayChild**(`child`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`JsonNode`](JsonNode.md) |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:49](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L49)

___

### addObjectChild

▸ **addObjectChild**(`key`, `child`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `child` | [`JsonNode`](JsonNode.md) |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:51](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L51)

___

### asArray

▸ **asArray**(): readonly [`JsonNode`](JsonNode.md)[]

Reinterpret a JSON value as an array. Throws exception if the value type was not an array.

#### Returns

readonly [`JsonNode`](JsonNode.md)[]

#### Defined in

[Velopack.d.ts:33](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L33)

___

### asBool

▸ **asBool**(): `boolean`

Reinterpret a JSON value as a boolean. Throws exception if the value type was not a boolean.

#### Returns

`boolean`

#### Defined in

[Velopack.d.ts:41](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L41)

___

### asNumber

▸ **asNumber**(): `number`

Reinterpret a JSON value as a number. Throws exception if the value type was not a double.

#### Returns

`number`

#### Defined in

[Velopack.d.ts:37](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L37)

___

### asObject

▸ **asObject**(): `Readonly`\<`Record`\<`string`, [`JsonNode`](JsonNode.md)\>\>

Reinterpret a JSON value as an object. Throws exception if the value type was not an object.

#### Returns

`Readonly`\<`Record`\<`string`, [`JsonNode`](JsonNode.md)\>\>

#### Defined in

[Velopack.d.ts:29](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L29)

___

### asString

▸ **asString**(): `string`

Reinterpret a JSON value as a string. Throws exception if the value type was not a string.

#### Returns

`string`

#### Defined in

[Velopack.d.ts:45](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L45)

___

### getKind

▸ **getKind**(): [`JsonNodeType`](../enums/JsonNodeType.md)

Get the type of this node, such as string, object, array, etc.
You should use this function and then call the corresponding
AsObject, AsArray, AsString, etc. functions to get the actual
parsed json information.

#### Returns

[`JsonNodeType`](../enums/JsonNodeType.md)

#### Defined in

[Velopack.d.ts:17](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L17)

___

### initArray

▸ **initArray**(): `void`

#### Returns

`void`

#### Defined in

[Velopack.d.ts:48](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L48)

___

### initBool

▸ **initBool**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `boolean` |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:47](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L47)

___

### initNumber

▸ **initNumber**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:52](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L52)

___

### initObject

▸ **initObject**(): `void`

#### Returns

`void`

#### Defined in

[Velopack.d.ts:50](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L50)

___

### initString

▸ **initString**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:53](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L53)

___

### isEmpty

▸ **isEmpty**(): `boolean`

Check if the JSON value is empty - eg. an empty string, array, or object.

#### Returns

`boolean`

#### Defined in

[Velopack.d.ts:25](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L25)

___

### isNull

▸ **isNull**(): `boolean`

Check if the JSON value is null.

#### Returns

`boolean`

#### Defined in

[Velopack.d.ts:21](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L21)

___

### parse

▸ **parse**(`text`): [`JsonNode`](JsonNode.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

[`JsonNode`](JsonNode.md)

#### Defined in

[Velopack.d.ts:46](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L46)
