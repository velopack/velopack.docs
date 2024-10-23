# Header file `Velopack.h`

``` cpp
#define VPKC_EXPORT

#define VPKC_CALL

extern "C"
{
    enum vpkc_update_check_t;

    struct vpkc_locator_config_t;

    struct vpkc_asset_t;

    struct vpkc_update_info_t;

    struct vpkc_update_options_t;

    //=== UpdateManager ===//
    bool vpkc_new_update_manager(char const* pszUrlOrString, 'hidden'* pOptions, 'hidden'* pLocator, 'hidden'** pManager);
    size_t vpkc_get_current_version('hidden'* pManager, char* pszVersion, size_t cVersion);
    size_t vpkc_get_app_id('hidden'* pManager, char* pszId, size_t cId);
    bool vpkc_is_portable('hidden'* pManager);
    bool vpkc_update_pending_restart('hidden'* pManager, 'hidden'* pAsset);
    'hidden' vpkc_check_for_updates('hidden'* pManager, 'hidden'* pUpdate);
    bool vpkc_download_updates('hidden'* pManager, 'hidden'* pUpdate, 'hidden' cbProgress);
    bool vpkc_wait_exit_then_apply_update('hidden'* pManager, 'hidden'* pAsset, bool bSilent, bool bRestart, char** pRestartArgs, size_t cRestartArgs);
    void vpkc_free_update_manager('hidden'* pManager);
    void vpkc_free_update_info('hidden'* pUpdateInfo);
    void vpkc_free_asset('hidden'* pAsset);

    //=== VelopackApp ===//
    void vpkc_app_run();
    void vpkc_app_set_auto_apply_on_startup(bool bAutoApply);
    void vpkc_app_set_args(char** pArgs, size_t cArgs);
    void vpkc_app_set_locator('hidden'* pLocator);
    void vpkc_app_set_hook_after_install('hidden' cbAfterInstall);
    void vpkc_app_set_hook_before_uninstall('hidden' cbBeforeUninstall);
    void vpkc_app_set_hook_before_update('hidden' cbBeforeUpdate);
    void vpkc_app_set_hook_after_update('hidden' cbAfterUpdate);
    void vpkc_app_set_hook_first_run('hidden' cbFirstRun);
    void vpkc_app_set_hook_restarted('hidden' cbRestarted);

    size_t vpkc_get_last_error(char* pszError, size_t cError);

    void vpkc_set_log('hidden' cbLog);
}

namespace Velopack
{
    struct VelopackLocatorConfig;

    struct VelopackAsset;

    struct UpdateInfo;

    struct UpdateOptions;

    class VelopackApp;

    class UpdateManager;
}
```

This header provides the C and C++ API for the Velopack library.

All the C constructs are prefixed by `vpkc_` and all the C++ constructs are in the `Velopack` namespace. The C++ API is a thin wrapper around the C API, providing a more idiomatic C++ interface. You should not mix and match the C and C++ APIs in the same program.

## Struct `vpkc_locator_config_t`

``` cpp
struct vpkc_locator_config_t
{
    char* RootAppDir;

    char* UpdateExePath;

    char* PackagesDir;

    char* ManifestPath;

    char* CurrentBinaryDir;

    bool IsPortable;
};
```

VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

#### Member variables

  - `RootAppDir` - The root directory of the current app.
  - `UpdateExePath` - The path to the Update.exe binary.
  - `PackagesDir` - The path to the packages’ directory.
  - `ManifestPath` - The current app manifest.
  - `CurrentBinaryDir` - The directory containing the application’s user binaries.
  - `IsPortable` - Whether the current application is portable or installed.

-----

## Struct `vpkc_asset_t`

``` cpp
struct vpkc_asset_t
{
    char* PackageId;

    char* Version;

    char* Type;

    char* FileName;

    char* SHA1;

    char* SHA256;

    uint64_t Size;

    char* NotesMarkdown;

    char* NotesHtml;
};
```

An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.

#### Member variables

  - `PackageId` - The name or Id of the package containing this release.
  - `Version` - The version of this release.
  - `Type` - The type of asset (eg. “Full” or “Delta”).
  - `FileName` - The filename of the update package containing this release.
  - `SHA1` - The SHA1 checksum of the update package containing this release.
  - `SHA256` - The SHA256 checksum of the update package containing this release.
  - `Size` - The size in bytes of the update package containing this release.
  - `NotesMarkdown` - The release notes in markdown format, as passed to Velopack when packaging the release. This may be an empty string.
  - `NotesHtml` - The release notes in HTML format, transformed from Markdown when packaging the release. This may be an empty string.

-----

## Struct `vpkc_update_info_t`

``` cpp
struct vpkc_update_info_t
{
    'hidden' TargetFullRelease;

    bool IsDowngrade;
};
```

Holds information about the current version and pending updates, such as how many there are, and access to release notes.

#### Member variables

  - `TargetFullRelease` - The available version that we are updating to.

### Variable `vpkc_update_info_t::IsDowngrade`

``` cpp
bool IsDowngrade;
```

True if the update is a version downgrade or lateral move (such as when switching channels to the same version number).

In this case, only full updates are allowed, and any local packages on disk newer than the downloaded version will be deleted.

-----

-----

## Struct `vpkc_update_options_t`

``` cpp
struct vpkc_update_options_t
{
    bool AllowVersionDowngrade;

    char* ExplicitChannel;
};
```

Options to customise the behaviour of UpdateManager.

### Variable `vpkc_update_options_t::AllowVersionDowngrade`

``` cpp
bool AllowVersionDowngrade;
```

Allows UpdateManager to update to a version that’s lower than the current version (i.e. downgrading).

This could happen if a release has bugs and was retracted from the release feed, or if you’re using ExplicitChannel to switch channels to another channel where the latest version on that channel is lower than the current version.

-----

### Variable `vpkc_update_options_t::ExplicitChannel`

``` cpp
char* ExplicitChannel;
```

**This option should usually be left None**. \<br/\> Overrides the default channel used to fetch updates.

The default channel will be whatever channel was specified on the command line when building this release. For example, if the current release was packaged with ‘–channel beta’, then the default channel will be ‘beta’. This allows users to automatically receive updates from the same channel they installed from. This options allows you to explicitly switch channels, for example if the user wished to switch back to the ‘stable’ channel without having to reinstall the application.

-----

-----

## Function `vpkc_new_update_manager`

``` cpp
(1) bool vpkc_new_update_manager(char const* pszUrlOrString, 'hidden'* pOptions, 'hidden'* pLocator, 'hidden'** pManager);

(2) size_t vpkc_get_current_version('hidden'* pManager, char* pszVersion, size_t cVersion);

(3) size_t vpkc_get_app_id('hidden'* pManager, char* pszId, size_t cId);

(4) bool vpkc_is_portable('hidden'* pManager);

(5) bool vpkc_update_pending_restart('hidden'* pManager, 'hidden'* pAsset);

(6) 'hidden' vpkc_check_for_updates('hidden'* pManager, 'hidden'* pUpdate);

(7) bool vpkc_download_updates('hidden'* pManager, 'hidden'* pUpdate, 'hidden' cbProgress);

(8) bool vpkc_wait_exit_then_apply_update('hidden'* pManager, 'hidden'* pAsset, bool bSilent, bool bRestart, char** pRestartArgs, size_t cRestartArgs);

(9) void vpkc_free_update_manager('hidden'* pManager);

(10) void vpkc_free_update_info('hidden'* pUpdateInfo);

(11) void vpkc_free_asset('hidden'* pAsset);
```

Creates a new vpkc\_update\_manager\_t. Free with vpkc\_free\_update\_manager.

-----

## Function `vpkc_app_run`

``` cpp
(1) void vpkc_app_run();

(2) void vpkc_app_set_auto_apply_on_startup(bool bAutoApply);

(3) void vpkc_app_set_args(char** pArgs, size_t cArgs);

(4) void vpkc_app_set_locator('hidden'* pLocator);

(5) void vpkc_app_set_hook_after_install('hidden' cbAfterInstall);

(6) void vpkc_app_set_hook_before_uninstall('hidden' cbBeforeUninstall);

(7) void vpkc_app_set_hook_before_update('hidden' cbBeforeUpdate);

(8) void vpkc_app_set_hook_after_update('hidden' cbAfterUpdate);

(9) void vpkc_app_set_hook_first_run('hidden' cbFirstRun);

(10) void vpkc_app_set_hook_restarted('hidden' cbRestarted);
```

Should be run at the beginning of your application to handle Velopack events.

-----

## Function `vpkc_get_last_error`

``` cpp
size_t vpkc_get_last_error(char* pszError, size_t cError);
```

Given a function has returned a failure, this function will return the last error message as a string.

-----

## Function `vpkc_set_log`

``` cpp
void vpkc_set_log('hidden' cbLog);
```

Sets the callback to be used/called with log messages from Velopack.

-----

### Struct `Velopack::VelopackLocatorConfig`

``` cpp
struct VelopackLocatorConfig
{
    std::string RootAppDir;

    std::string UpdateExePath;

    std::string PackagesDir;

    std::string ManifestPath;

    std::string CurrentBinaryDir;

    bool IsPortable;
};
```

VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

#### Member variables

  - `RootAppDir` - The root directory of the current app.
  - `UpdateExePath` - The path to the Update.exe binary.
  - `PackagesDir` - The path to the packages’ directory.
  - `ManifestPath` - The current app manifest.
  - `CurrentBinaryDir` - The directory containing the application’s user binaries.
  - `IsPortable` - Whether the current application is portable or installed.

-----

### Struct `Velopack::VelopackAsset`

``` cpp
struct VelopackAsset
{
    std::string PackageId;

    std::string Version;

    std::string Type;

    std::string FileName;

    std::string SHA1;

    std::string SHA256;

    uint64_t Size;

    std::string NotesMarkdown;

    std::string NotesHtml;
};
```

An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.

#### Member variables

  - `PackageId` - The name or Id of the package containing this release.
  - `Version` - The version of this release.
  - `Type` - The type of asset (eg. “Full” or “Delta”).
  - `FileName` - The filename of the update package containing this release.
  - `SHA1` - The SHA1 checksum of the update package containing this release.
  - `SHA256` - The SHA256 checksum of the update package containing this release.
  - `Size` - The size in bytes of the update package containing this release.
  - `NotesMarkdown` - The release notes in markdown format, as passed to Velopack when packaging the release. This may be an empty string.
  - `NotesHtml` - The release notes in HTML format, transformed from Markdown when packaging the release. This may be an empty string.

-----

### Struct `Velopack::UpdateInfo`

``` cpp
struct UpdateInfo
{
    Velopack::VelopackAsset TargetFullRelease;

    bool IsDowngrade;
};
```

Holds information about the current version and pending updates, such as how many there are, and access to release notes.

#### Member variables

  - `TargetFullRelease` - The available version that we are updating to.

### Variable `Velopack::UpdateInfo::IsDowngrade`

``` cpp
bool IsDowngrade;
```

True if the update is a version downgrade or lateral move (such as when switching channels to the same version number).

In this case, only full updates are allowed, and any local packages on disk newer than the downloaded version will be deleted.

-----

-----

### Struct `Velopack::UpdateOptions`

``` cpp
struct UpdateOptions
{
    bool AllowVersionDowngrade;

    std::optional<std::string> ExplicitChannel;
};
```

Options to customise the behaviour of UpdateManager.

### Variable `Velopack::UpdateOptions::AllowVersionDowngrade`

``` cpp
bool AllowVersionDowngrade;
```

Allows UpdateManager to update to a version that’s lower than the current version (i.e. downgrading).

This could happen if a release has bugs and was retracted from the release feed, or if you’re using ExplicitChannel to switch channels to another channel where the latest version on that channel is lower than the current version.

-----

### Variable `Velopack::UpdateOptions::ExplicitChannel`

``` cpp
std::optional<std::string> ExplicitChannel;
```

**This option should usually be left None**. \<br/\> Overrides the default channel used to fetch updates.

The default channel will be whatever channel was specified on the command line when building this release. For example, if the current release was packaged with ‘–channel beta’, then the default channel will be ‘beta’. This allows users to automatically receive updates from the same channel they installed from. This options allows you to explicitly switch channels, for example if the user wished to switch back to the ‘stable’ channel without having to reinstall the application.

-----

-----

### Class `Velopack::VelopackApp`

``` cpp
class VelopackApp
{
public:
    static Velopack::VelopackApp Build();

    Velopack::VelopackApp& SetAutoApplyOnStartup(bool bAutoApply);

    Velopack::VelopackApp& SetArgs(std::vector<std::string> const& args);

    Velopack::VelopackApp& SetLocator(Velopack::VelopackLocatorConfig const& locator);

    Velopack::VelopackApp& OnAfterInstall('hidden' cbInstall);

    Velopack::VelopackApp& OnBeforeUninstall('hidden' cbInstall);

    Velopack::VelopackApp& OnBeforeUpdate('hidden' cbInstall);

    Velopack::VelopackApp& OnAfterUpdate('hidden' cbInstall);

    Velopack::VelopackApp& OnFirstRun('hidden' cbInstall);

    Velopack::VelopackApp& OnRestarted('hidden' cbInstall);

    void Run();
};
```

VelopackApp helps you to handle app activation events correctly.

This should be used as early as possible in your application startup code. (eg. the beginning of main() or wherever your entry point is)

### Function `Velopack::VelopackApp::Build`

``` cpp
static Velopack::VelopackApp Build();
```

Build a new VelopackApp instance.

-----

### Function `Velopack::VelopackApp::SetAutoApplyOnStartup`

``` cpp
Velopack::VelopackApp& SetAutoApplyOnStartup(bool bAutoApply);
```

Set whether to automatically apply downloaded updates on startup. This is ON by default.

-----

### Function `Velopack::VelopackApp::SetArgs`

``` cpp
Velopack::VelopackApp& SetArgs(std::vector<std::string> const& args);
```

Override the command line arguments used by VelopackApp. (by default this is env::args().skip(1))

-----

### Function `Velopack::VelopackApp::SetLocator`

``` cpp
Velopack::VelopackApp& SetLocator(Velopack::VelopackLocatorConfig const& locator);
```

VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

-----

### Function `Velopack::VelopackApp::OnAfterInstall`

``` cpp
Velopack::VelopackApp& OnAfterInstall('hidden' cbInstall);
```

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

### Function `Velopack::VelopackApp::OnBeforeUninstall`

``` cpp
Velopack::VelopackApp& OnBeforeUninstall('hidden' cbInstall);
```

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

### Function `Velopack::VelopackApp::OnBeforeUpdate`

``` cpp
Velopack::VelopackApp& OnBeforeUpdate('hidden' cbInstall);
```

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

### Function `Velopack::VelopackApp::OnAfterUpdate`

``` cpp
Velopack::VelopackApp& OnAfterUpdate('hidden' cbInstall);
```

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

### Function `Velopack::VelopackApp::OnFirstRun`

``` cpp
Velopack::VelopackApp& OnFirstRun('hidden' cbInstall);
```

This hook is triggered when the application is started for the first time after installation.

-----

### Function `Velopack::VelopackApp::OnRestarted`

``` cpp
Velopack::VelopackApp& OnRestarted('hidden' cbInstall);
```

This hook is triggered when the application is restarted by Velopack after installing updates.

-----

### Function `Velopack::VelopackApp::Run`

``` cpp
void Run();
```

Runs the Velopack startup logic. This should be the first thing to run in your app.

In some circumstances it may terminate/restart the process to perform tasks.

-----

-----

### Class `Velopack::UpdateManager`

``` cpp
class UpdateManager
{
public:
    UpdateManager(std::string const& urlOrPath, Velopack::UpdateOptions const* options = nullptr, Velopack::VelopackLocatorConfig const* locator = nullptr);

    ~UpdateManager();

    bool IsPortable() noexcept;

    std::string GetCurrentVersion() noexcept;

    std::string GetAppId() noexcept;

    std::optional<VelopackAsset> UpdatePendingRestart() noexcept;

    std::optional<UpdateInfo> CheckForUpdates();

    void DownloadUpdates(Velopack::UpdateInfo const& update, 'hidden' progress = nullptr);

    void WaitExitThenApplyUpdate(Velopack::VelopackAsset const& asset, bool silent = false, bool restart = true, std::vector<std::string> restartArgs = {});

    void WaitExitThenApplyUpdate(Velopack::UpdateInfo const& asset, bool silent = false, bool restart = true, std::vector<std::string> restartArgs = {});
};
```

Provides functionality for checking for updates, downloading updates, and applying updates to the current application.

### Constructor `Velopack::UpdateManager::UpdateManager`

``` cpp
UpdateManager(std::string const& urlOrPath, Velopack::UpdateOptions const* options = nullptr, Velopack::VelopackLocatorConfig const* locator = nullptr);
```

Create a new UpdateManager instance.

@param urlOrPath Location of the update server or path to the local update directory. @param options Optional extra configuration for update manager. @param locator Override the default locator configuration (usually used for testing / mocks).

-----

### Destructor `Velopack::UpdateManager::~UpdateManager`

``` cpp
~UpdateManager();
```

Destructor for UpdateManager.

-----

### Function `Velopack::UpdateManager::IsPortable`

``` cpp
bool IsPortable() noexcept;
```

Returns whether the app is in portable mode. On Windows this can be true or false.

On MacOS and Linux this will always be true.

-----

### Function `Velopack::UpdateManager::GetCurrentVersion`

``` cpp
std::string GetCurrentVersion() noexcept;
```

Returns the currently installed version of the app.

-----

### Function `Velopack::UpdateManager::GetAppId`

``` cpp
std::string GetAppId() noexcept;
```

Returns the currently installed app id.

-----

### Function `Velopack::UpdateManager::UpdatePendingRestart`

``` cpp
std::optional<VelopackAsset> UpdatePendingRestart() noexcept;
```

Returns an UpdateInfo object if there is an update downloaded which still needs to be applied.

You can pass the UpdateInfo object to waitExitThenApplyUpdate to apply the update.

-----

### Function `Velopack::UpdateManager::CheckForUpdates`

``` cpp
std::optional<UpdateInfo> CheckForUpdates();
```

Checks for updates, returning None if there are none available. If there are updates available, this method will return an UpdateInfo object containing the latest available release, and any delta updates that can be applied if they are available.

-----

### Function `Velopack::UpdateManager::DownloadUpdates`

``` cpp
void DownloadUpdates(Velopack::UpdateInfo const& update, 'hidden' progress = nullptr);
```

Downloads the specified updates to the local app packages directory. Progress is reported back to the caller via an optional Sender.

This function will acquire a global update lock so may fail if there is already another update operation in progress.

  - If the update contains delta packages and the delta feature is enabled this method will attempt to unpack and prepare them.

  - If there is no delta update available, or there is an error preparing delta packages, this method will fall back to downloading the full version of the update.

-----

### Function `Velopack::UpdateManager::WaitExitThenApplyUpdate`

``` cpp
void WaitExitThenApplyUpdate(Velopack::VelopackAsset const& asset, bool silent = false, bool restart = true, std::vector<std::string> restartArgs = {});
```

This will launch the Velopack updater and tell it to wait for this program to exit gracefully.

You should then clean up any state and exit your app. The updater will apply updates and then optionally restart your app. The updater will only wait for 60 seconds before giving up.

-----

### Function `Velopack::UpdateManager::WaitExitThenApplyUpdate`

``` cpp
void WaitExitThenApplyUpdate(Velopack::UpdateInfo const& asset, bool silent = false, bool restart = true, std::vector<std::string> restartArgs = {});
```

This will launch the Velopack updater and tell it to wait for this program to exit gracefully.

You should then clean up any state and exit your app. The updater will apply updates and then optionally restart your app. The updater will only wait for 60 seconds before giving up.

-----

-----
