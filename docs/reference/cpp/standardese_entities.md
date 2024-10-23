---
sidebar_label: Overview
sidebar_position: 0
---
# Project index

  - [`VPKC_CALL`](doc_Velopack.md#standardese-Velopack-h)

  - [`VPKC_EXPORT`](doc_Velopack.md#standardese-Velopack-h)

  - ## Namespace `Velopack`
    
      - [`UpdateInfo`](doc_Velopack.md#standardese-Velopack__UpdateInfo) - Holds information about the current version and pending updates, such as how many there are, and access to release notes.
    
      - [`UpdateManager`](doc_Velopack.md#standardese-Velopack__UpdateManager) - Provides functionality for checking for updates, downloading updates, and applying updates to the current application.
    
      - [`UpdateOptions`](doc_Velopack.md#standardese-Velopack__UpdateOptions) - Options to customise the behaviour of UpdateManager.
    
      - [`VelopackApp`](doc_Velopack.md#standardese-Velopack__VelopackApp) - VelopackApp helps you to handle app activation events correctly.
    
      - [`VelopackAsset`](doc_Velopack.md#standardese-Velopack__VelopackAsset) - An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.
    
      - [`VelopackLocatorConfig`](doc_Velopack.md#standardese-Velopack__VelopackLocatorConfig) - VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

  - [`vpkc_app_run`](doc_Velopack.md#standardese-vpkc_app_run--) - Should be run at the beginning of your application to handle Velopack events.

  - [`vpkc_app_set_args`](doc_Velopack.md#standardese-vpkc_app_run--)

  - [`vpkc_app_set_auto_apply_on_startup`](doc_Velopack.md#standardese-vpkc_app_run--)

  - [`vpkc_app_set_hook_after_install`](doc_Velopack.md#standardese-vpkc_app_run--)

  - [`vpkc_app_set_hook_after_update`](doc_Velopack.md#standardese-vpkc_app_run--)

  - [`vpkc_app_set_hook_before_uninstall`](doc_Velopack.md#standardese-vpkc_app_run--)

  - [`vpkc_app_set_hook_before_update`](doc_Velopack.md#standardese-vpkc_app_run--)

  - [`vpkc_app_set_hook_first_run`](doc_Velopack.md#standardese-vpkc_app_run--)

  - [`vpkc_app_set_hook_restarted`](doc_Velopack.md#standardese-vpkc_app_run--)

  - [`vpkc_app_set_locator`](doc_Velopack.md#standardese-vpkc_app_run--)

  - [`vpkc_asset_t`](doc_Velopack.md#standardese-vpkc_asset_t) - An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.

  - [`vpkc_check_for_updates`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---)

  - [`vpkc_download_updates`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---)

  - [`vpkc_free_asset`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---)

  - [`vpkc_free_update_info`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---)

  - [`vpkc_free_update_manager`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---)

  - [`vpkc_get_app_id`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---)

  - [`vpkc_get_current_version`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---)

  - [`vpkc_get_last_error`](doc_Velopack.md#standardese-vpkc_get_last_error-char--size_t-) - Given a function has returned a failure, this function will return the last error message as a string.

  - [`vpkc_is_portable`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---)

  - [`vpkc_locator_config_t`](doc_Velopack.md#standardese-vpkc_locator_config_t) - VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

  - [`vpkc_new_update_manager`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---) - Creates a new vpkc\_update\_manager\_t. Free with vpkc\_free\_update\_manager.

  - [`vpkc_set_log`](doc_Velopack.md#standardese-vpkc_set_log-vpkc_log_callback_t-) - Sets the callback to be used/called with log messages from Velopack.

  - [`vpkc_update_check_t`](doc_Velopack.md#standardese-Velopack-h)

  - [`vpkc_update_info_t`](doc_Velopack.md#standardese-vpkc_update_info_t) - Holds information about the current version and pending updates, such as how many there are, and access to release notes.

  - [`vpkc_update_options_t`](doc_Velopack.md#standardese-vpkc_update_options_t) - Options to customise the behaviour of UpdateManager.

  - [`vpkc_update_pending_restart`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---)

  - [`vpkc_wait_exit_then_apply_update`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---)
