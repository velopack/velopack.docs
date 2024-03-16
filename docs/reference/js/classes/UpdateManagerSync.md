# Class: UpdateManagerSync

This class is used to check for updates, download updates, and apply updates. It is a synchronous version of the UpdateManager class.
This class is not recommended for use in GUI applications, as it will block the main thread, so you may want to use the async
UpdateManager class instead, if it is supported for your programming language.

## Hierarchy

- **`UpdateManagerSync`**

  ↳ [`UpdateManager`](UpdateManager.md)

## Constructors

### constructor

• **new UpdateManagerSync**(): [`UpdateManagerSync`](UpdateManagerSync.md)

#### Returns

[`UpdateManagerSync`](UpdateManagerSync.md)

## Properties

### #private

• `Private` **#private**: `any`

#### Defined in

[Velopack.d.ts:130](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L130)

## Methods

### applyUpdatesAndExit

▸ **applyUpdatesAndExit**(`toApply`): `void`

This will exit your app immediately, apply updates, and then optionally relaunch the app using the specified
restart arguments. If you need to save state or clean up, you should do that before calling this method.
The user may be prompted during the update, if the update requires additional frameworks to be installed etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `toApply` | [`VelopackAsset`](VelopackAsset.md) |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:199](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L199)

___

### applyUpdatesAndRestart

▸ **applyUpdatesAndRestart**(`toApply`, `restartArgs?`): `void`

This will exit your app immediately, apply updates, and then optionally relaunch the app using the specified
restart arguments. If you need to save state or clean up, you should do that before calling this method.
The user may be prompted during the update, if the update requires additional frameworks to be installed etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `toApply` | [`VelopackAsset`](VelopackAsset.md) |
| `restartArgs?` | readonly `string`[] |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:205](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L205)

___

### checkForUpdates

▸ **checkForUpdates**(): [`UpdateInfo`](UpdateInfo.md)

This function will check for updates, and return information about the latest
available release. This function runs synchronously and may take some time to
complete, depending on the network speed and the number of updates available.

#### Returns

[`UpdateInfo`](UpdateInfo.md)

#### Defined in

[Velopack.d.ts:186](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L186)

___

### downloadUpdates

▸ **downloadUpdates**(`toDownload`): `void`

Downloads the specified updates to the local app packages directory. If the update contains delta packages and ignoreDeltas=false,
this method will attempt to unpack and prepare them. If there is no delta update available, or there is an error preparing delta
packages, this method will fall back to downloading the full version of the update. This function will acquire a global update lock
so may fail if there is already another update operation in progress.

#### Parameters

| Name | Type |
| :------ | :------ |
| `toDownload` | [`VelopackAsset`](VelopackAsset.md) |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:193](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L193)

___

### getCheckForUpdatesCommand

▸ **getCheckForUpdatesCommand**(): `string`[]

Returns the command line arguments to check for updates.

#### Returns

`string`[]

#### Defined in

[Velopack.d.ts:158](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L158)

___

### getCurrentVersion

▸ **getCurrentVersion**(): `string`

Get the currently installed version of the application.
If the application is not installed, this function will throw an exception.

#### Returns

`string`

#### Defined in

[Velopack.d.ts:180](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L180)

___

### getCurrentVersionCommand

▸ **getCurrentVersionCommand**(): `string`[]

Returns the command line arguments to get the current version of the application.

#### Returns

`string`[]

#### Defined in

[Velopack.d.ts:154](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L154)

___

### getDownloadUpdatesCommand

▸ **getDownloadUpdatesCommand**(`toDownload`): `string`[]

Returns the command line arguments to download the specified update.

#### Parameters

| Name | Type |
| :------ | :------ |
| `toDownload` | [`VelopackAsset`](VelopackAsset.md) |

#### Returns

`string`[]

#### Defined in

[Velopack.d.ts:162](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L162)

___

### getPackagesDir

▸ **getPackagesDir**(): `string`

Returns the path to the app's packages directory. This is where updates are downloaded to.

#### Returns

`string`

#### Defined in

[Velopack.d.ts:170](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L170)

___

### getUpdateApplyCommand

▸ **getUpdateApplyCommand**(`toApply`, `silent`, `restart`, `wait`, `restartArgs?`): `string`[]

Returns the command line arguments to apply the specified update.

#### Parameters

| Name | Type |
| :------ | :------ |
| `toApply` | [`VelopackAsset`](VelopackAsset.md) |
| `silent` | `boolean` |
| `restart` | `boolean` |
| `wait` | `boolean` |
| `restartArgs?` | readonly `string`[] |

#### Returns

`string`[]

#### Defined in

[Velopack.d.ts:166](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L166)

___

### isInstalled

▸ **isInstalled**(): `boolean`

Returns true if the current app is installed, false otherwise. If the app is not installed, other functions in
UpdateManager may throw exceptions, so you may want to check this before calling other functions.

#### Returns

`boolean`

#### Defined in

[Velopack.d.ts:175](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L175)

___

### setAllowDowngrade

▸ **setAllowDowngrade**(`allowDowngrade`): `void`

Allows UpdateManager to update to a version that's lower than the current version (i.e. downgrading).
This could happen if a release has bugs and was retracted from the release feed, or if you're using
ExplicitChannel to switch channels to another channel where the latest version on that
channel is lower than the current version.

#### Parameters

| Name | Type |
| :------ | :------ |
| `allowDowngrade` | `boolean` |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:141](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L141)

___

### setExplicitChannel

▸ **setExplicitChannel**(`explicitChannel`): `void`

This option should usually be left null. Overrides the default channel used to fetch updates.
The default channel will be whatever channel was specified on the command line when building this release.
For example, if the current release was packaged with '--channel beta', then the default channel will be 'beta'.
This allows users to automatically receive updates from the same channel they installed from. This options
allows you to explicitly switch channels, for example if the user wished to switch back to the 'stable' channel
without having to reinstall the application.

#### Parameters

| Name | Type |
| :------ | :------ |
| `explicitChannel` | `string` |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:150](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L150)

___

### setUrlOrPath

▸ **setUrlOrPath**(`urlOrPath`): `void`

Set the URL or local file path to the update server. This is required before calling CheckForUpdates or DownloadUpdates.

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlOrPath` | `string` |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:134](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L134)

___

### waitExitThenApplyUpdates

▸ **waitExitThenApplyUpdates**(`toApply`, `silent`, `restart`, `restartArgs?`): `void`

This will launch the Velopack updater and tell it to wait for this program to exit gracefully.
You should then clean up any state and exit your app. The updater will apply updates and then
optionally restart your app. The updater will only wait for 60 seconds before giving up.

#### Parameters

| Name | Type |
| :------ | :------ |
| `toApply` | [`VelopackAsset`](VelopackAsset.md) |
| `silent` | `boolean` |
| `restart` | `boolean` |
| `restartArgs?` | readonly `string`[] |

#### Returns

`void`

#### Defined in

[Velopack.d.ts:211](https://github.com/velopack/velopack.fusion/blob/4afc04c/for-js/Velopack.d.ts#L211)
