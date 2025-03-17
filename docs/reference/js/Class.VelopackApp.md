# Class: VelopackApp

VelopackApp helps you to handle app activation events correctly.
This should be used as early as possible in your application startup code.
(eg. the beginning of main() or wherever your entry point is)

## Constructors

### new VelopackApp()

> **new VelopackApp**(): `VelopackApp`

#### Returns

`VelopackApp`

## Methods

### onAfterInstallFastCallback()

> **onAfterInstallFastCallback**(`callback`): `VelopackApp`

WARNING: FastCallback hooks are run during critical stages of Velopack operations.
Your code will be run and then the process will exit.
If your code has not completed within 30 seconds, it will be terminated.
Only supported on windows; On other operating systems, this will never be called.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | `VelopackHook` |

#### Returns

`VelopackApp`

***

### onAfterUpdateFastCallback()

> **onAfterUpdateFastCallback**(`callback`): `VelopackApp`

WARNING: FastCallback hooks are run during critical stages of Velopack operations.
Your code will be run and then the process will exit.
If your code has not completed within 15 seconds, it will be terminated.
Only supported on windows; On other operating systems, this will never be called.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | `VelopackHook` |

#### Returns

`VelopackApp`

***

### onBeforeUninstallFastCallback()

> **onBeforeUninstallFastCallback**(`callback`): `VelopackApp`

WARNING: FastCallback hooks are run during critical stages of Velopack operations.
Your code will be run and then the process will exit.
If your code has not completed within 30 seconds, it will be terminated.
Only supported on windows; On other operating systems, this will never be called.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | `VelopackHook` |

#### Returns

`VelopackApp`

***

### onBeforeUpdateFastCallback()

> **onBeforeUpdateFastCallback**(`callback`): `VelopackApp`

WARNING: FastCallback hooks are run during critical stages of Velopack operations.
Your code will be run and then the process will exit.
If your code has not completed within 15 seconds, it will be terminated.
Only supported on windows; On other operating systems, this will never be called.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | `VelopackHook` |

#### Returns

`VelopackApp`

***

### onFirstRun()

> **onFirstRun**(`callback`): `VelopackApp`

This hook is triggered when the application is started for the first time after installation.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | `VelopackHook` |

#### Returns

`VelopackApp`

***

### onRestarted()

> **onRestarted**(`callback`): `VelopackApp`

This hook is triggered when the application is restarted by Velopack after installing updates.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callback` | `VelopackHook` |

#### Returns

`VelopackApp`

***

### run()

> **run**(): `void`

Runs the Velopack startup logic. This should be the first thing to run in your app.
In some circumstances it may terminate/restart the process to perform tasks.

#### Returns

`void`

***

### setArgs()

> **setArgs**(`args`): `VelopackApp`

Override the command line arguments used by VelopackApp. (by default this is env::args().skip(1))

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `args` | `string`[] |

#### Returns

`VelopackApp`

***

### setAutoApplyOnStartup()

> **setAutoApplyOnStartup**(`autoApply`): `VelopackApp`

Set whether to automatically apply downloaded updates on startup. This is ON by default.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `autoApply` | `boolean` |

#### Returns

`VelopackApp`

***

### setLocator()

> **setLocator**(`locator`): `VelopackApp`

VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `locator` | [`VelopackLocatorConfig`](TypeAlias.VelopackLocatorConfig.md) |

#### Returns

`VelopackApp`

***

### build()

> `static` **build**(): `VelopackApp`

Build a new VelopackApp instance.

#### Returns

`VelopackApp`
