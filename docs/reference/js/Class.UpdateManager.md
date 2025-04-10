# Class: UpdateManager

Provides functionality for checking for updates, downloading updates, and applying updates to the current application.

## Constructors

### Constructor

> **new UpdateManager**(`urlOrPath`, `options?`, `locator?`): `UpdateManager`

Create a new UpdateManager instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `urlOrPath` | `string` | Location of the update server or path to the local update directory. |
| `options?` | [`UpdateOptions`](TypeAlias.UpdateOptions.md) | Optional extra configuration for update manager. |
| `locator?` | [`VelopackLocatorConfig`](TypeAlias.VelopackLocatorConfig.md) | Override the default locator configuration (usually used for testing / mocks). |

#### Returns

`UpdateManager`

## Methods

### checkForUpdatesAsync()

> **checkForUpdatesAsync**(): `Promise`\<[`UpdateInfo`](TypeAlias.UpdateInfo.md)\>

Checks for updates, returning None if there are none available. If there are updates available, this method will return an
UpdateInfo object containing the latest available release, and any delta updates that can be applied if they are available.

#### Returns

`Promise`\<[`UpdateInfo`](TypeAlias.UpdateInfo.md)\>

***

### downloadUpdateAsync()

> **downloadUpdateAsync**(`update`, `progress?`): `Promise`\<`void`\>

Downloads the specified updates to the local app packages directory. Progress is reported back to the caller via an optional Sender.
This function will acquire a global update lock so may fail if there is already another update operation in progress.
- If the update contains delta packages and the delta feature is enabled
  this method will attempt to unpack and prepare them.
- If there is no delta update available, or there is an error preparing delta
  packages, this method will fall back to downloading the full version of the update.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `update` | [`UpdateInfo`](TypeAlias.UpdateInfo.md) |
| `progress?` | (`perc`) => `void` |

#### Returns

`Promise`\<`void`\>

***

### getAppId()

> **getAppId**(): `string`

Returns the currently installed app id.

#### Returns

`string`

***

### getCurrentVersion()

> **getCurrentVersion**(): `string`

Returns the currently installed version of the app.

#### Returns

`string`

***

### getUpdatePendingRestart()

> **getUpdatePendingRestart**(): [`UpdateInfo`](TypeAlias.UpdateInfo.md)

Returns an UpdateInfo object if there is an update downloaded which still needs to be applied.
You can pass the UpdateInfo object to waitExitThenApplyUpdate to apply the update.

#### Returns

[`UpdateInfo`](TypeAlias.UpdateInfo.md)

***

### isPortable()

> **isPortable**(): `boolean`

Returns whether the app is in portable mode. On Windows this can be true or false.
On MacOS and Linux this will always be true.

#### Returns

`boolean`

***

### waitExitThenApplyUpdate()

> **waitExitThenApplyUpdate**(`update`, `silent?`, `restart?`, `restartArgs?`): `void`

This will launch the Velopack updater and tell it to wait for this program to exit gracefully.
You should then clean up any state and exit your app. The updater will apply updates and then
optionally restart your app. The updater will only wait for 60 seconds before giving up.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `update` | [`UpdateInfo`](TypeAlias.UpdateInfo.md) |
| `silent?` | `boolean` |
| `restart?` | `boolean` |
| `restartArgs?` | `string`[] |

#### Returns

`void`
