---
sidebar_label: Overview
sidebar_position: 0
---
# Project index

  - [`vpkc_app_run`](doc_Velopack.md#standardese-vpkc_app_run-void--) &mdash; VelopackApp helps you to handle app activation events correctly.

  - [`vpkc_app_set_args`](doc_Velopack.md#standardese-vpkc_app_set_args-char---size_t-) &mdash; Override the command line arguments used by VelopackApp. (by default this is env::args().skip(1))

  - [`vpkc_app_set_auto_apply_on_startup`](doc_Velopack.md#standardese-vpkc_app_set_auto_apply_on_startup-bool-) &mdash; Set whether to automatically apply downloaded updates on startup. This is ON by default.

  - [`vpkc_app_set_hook_after_install`](doc_Velopack.md#standardese-vpkc_app_set_hook_after_install-vpkc_hook_callback_t-) &mdash; WARNING: FastCallback hooks are run during critical stages of Velopack operations.

  - [`vpkc_app_set_hook_after_update`](doc_Velopack.md#standardese-vpkc_app_set_hook_after_update-vpkc_hook_callback_t-) &mdash; WARNING: FastCallback hooks are run during critical stages of Velopack operations.

  - [`vpkc_app_set_hook_before_uninstall`](doc_Velopack.md#standardese-vpkc_app_set_hook_before_uninstall-vpkc_hook_callback_t-) &mdash; WARNING: FastCallback hooks are run during critical stages of Velopack operations.

  - [`vpkc_app_set_hook_before_update`](doc_Velopack.md#standardese-vpkc_app_set_hook_before_update-vpkc_hook_callback_t-) &mdash; WARNING: FastCallback hooks are run during critical stages of Velopack operations.

  - [`vpkc_app_set_hook_first_run`](doc_Velopack.md#standardese-vpkc_app_set_hook_first_run-vpkc_hook_callback_t-) &mdash; This hook is triggered when the application is started for the first time after installation.

  - [`vpkc_app_set_hook_restarted`](doc_Velopack.md#standardese-vpkc_app_set_hook_restarted-vpkc_hook_callback_t-) &mdash; This hook is triggered when the application is restarted by Velopack after installing updates.

  - [`vpkc_app_set_locator`](doc_Velopack.md#standardese-vpkc_app_set_locator-vpkc_locator_config_t--) &mdash; VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

  - [`vpkc_asset_t`](doc_Velopack.md#standardese-vpkc_asset_t) &mdash; An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.

  - [`vpkc_check_for_updates`](doc_Velopack.md#standardese-vpkc_check_for_updates-vpkc_update_manager_t--vpkc_update_info_t--) &mdash; Checks for updates, returning None if there are none available. If there are updates available, this method will return an UpdateInfo object containing the latest available release, and any delta updates that can be applied if they are available.

  - [`vpkc_download_asset_delegate_t`](doc_Velopack.md#standardese-vpkc_download_asset_delegate_t) &mdash; User delegate for downloading an asset file. This function is expected to download the provided asset to the provided local file path. Througout, you can use the progress callback to write progress reports.

  - [`vpkc_download_updates`](doc_Velopack.md#standardese-vpkc_download_updates-vpkc_update_manager_t--vpkc_update_info_t--vpkc_progress_callback_t-void--) &mdash; Downloads the specified updates to the local app packages directory. Progress is reported back to the caller via an optional callback.

  - [`vpkc_free_asset`](doc_Velopack.md#standardese-vpkc_free_asset-vpkc_asset_t--) &mdash; Frees a vpkc\_asset\_t instance.

  - [`vpkc_free_release_feed_t`](doc_Velopack.md#standardese-vpkc_free_release_feed_t) &mdash; User delegate for freeing a release feed. This function should free the feed string returned by `vpkc_release_feed_delegate_t`.

  - [`vpkc_free_source`](doc_Velopack.md#standardese-vpkc_free_source-vpkc_update_source_t--) &mdash; Frees a vpkc\_update\_source\_t instance.

  - [`vpkc_free_update_info`](doc_Velopack.md#standardese-vpkc_free_update_info-vpkc_update_info_t--) &mdash; Frees a vpkc\_update\_info\_t instance.

  - [`vpkc_free_update_manager`](doc_Velopack.md#standardese-vpkc_free_update_manager-vpkc_update_manager_t--) &mdash; Frees a vpkc\_update\_manager\_t instance.

  - [`vpkc_get_app_id`](doc_Velopack.md#standardese-vpkc_get_app_id-vpkc_update_manager_t--char--size_t-) &mdash; Returns the currently installed app id.

  - [`vpkc_get_current_version`](doc_Velopack.md#standardese-vpkc_get_current_version-vpkc_update_manager_t--char--size_t-) &mdash; Returns the currently installed version of the app.

  - [`vpkc_get_last_error`](doc_Velopack.md#standardese-vpkc_get_last_error-char--size_t-) &mdash; Get the last error message that occurred in the Velopack library.

  - [`vpkc_hook_callback_t`](doc_Velopack.md#standardese-vpkc_hook_callback_t) &mdash; VelopackApp startup hook callback function.

  - [`vpkc_is_portable`](doc_Velopack.md#standardese-vpkc_is_portable-vpkc_update_manager_t--) &mdash; Returns whether the app is in portable mode. On Windows this can be true or false.

  - [`vpkc_locator_config_t`](doc_Velopack.md#standardese-vpkc_locator_config_t) &mdash; VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

  - [`vpkc_log_callback_t`](doc_Velopack.md#standardese-vpkc_log_callback_t) &mdash; Log callback function.

  - [`vpkc_new_source_custom_callback`](doc_Velopack.md#standardese-vpkc_new_source_custom_callback-vpkc_release_feed_delegate_t-vpkc_free_release_feed_t-vpkc_download_asset_delegate_t-void--) &mdash; Create a new *CUSTOM* update source with user-provided callbacks to fetch release feeds and download assets.

  - [`vpkc_new_source_file`](doc_Velopack.md#standardese-vpkc_new_source_file-charconst--) &mdash; Create a new FileSource update source for a given file path.

  - [`vpkc_new_source_http_url`](doc_Velopack.md#standardese-vpkc_new_source_http_url-charconst--) &mdash; Create a new HttpSource update source for a given HTTP URL.

  - [`vpkc_new_update_manager`](doc_Velopack.md#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---) &mdash; Create a new UpdateManager instance.

  - [`vpkc_new_update_manager_with_source`](doc_Velopack.md#standardese-vpkc_new_update_manager_with_source-vpkc_update_source_t--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---) &mdash; Create a new UpdateManager instance with a custom UpdateSource.

  - [`vpkc_progress_callback_t`](doc_Velopack.md#standardese-vpkc_progress_callback_t) &mdash; Progress callback function.

  - [`vpkc_release_feed_delegate_t`](doc_Velopack.md#standardese-vpkc_release_feed_delegate_t) &mdash; User delegate for to fetch a release feed. This function should return the raw JSON string of the release.json feed.

  - [`vpkc_set_logger`](doc_Velopack.md#standardese-vpkc_set_logger-vpkc_log_callback_t-void--) &mdash; Set a custom log callback. This will be called for all log messages generated by the Velopack library.

  - [`vpkc_source_report_progress`](doc_Velopack.md#standardese-vpkc_source_report_progress-size_t-int16_t-) &mdash; Sends a progress update to the callback with the specified ID. This is used by custom update sources created with `vpkc_new_source_custom_callback` to report download progress.

  - [`vpkc_unsafe_apply_updates`](doc_Velopack.md#standardese-vpkc_unsafe_apply_updates-vpkc_update_manager_t--vpkc_asset_t--bool-uint32_t-bool-char---size_t-) &mdash; This will launch the Velopack updater and optionally wait for a program to exit gracefully.

  - [`vpkc_update_check_t`](doc_Velopack.md#standardese-vpkc_update_check_t) &mdash; The result of a call to check for updates. This can indicate that an update is available, or that an error occurred.

  - [`vpkc_update_info_t`](doc_Velopack.md#standardese-vpkc_update_info_t) &mdash; Holds information about the current version and pending updates, such as how many there are, and access to release notes.

  - [`vpkc_update_manager_t`](doc_Velopack.md#standardese-vpkc_update_manager_t) &mdash; Opaque type for the Velopack UpdateManager. Must be freed with `vpkc_free_update_manager`.

  - [`vpkc_update_options_t`](doc_Velopack.md#standardese-vpkc_update_options_t) &mdash; Options to customise the behaviour of UpdateManager.

  - [`vpkc_update_pending_restart`](doc_Velopack.md#standardese-vpkc_update_pending_restart-vpkc_update_manager_t--vpkc_asset_t--) &mdash; Returns an UpdateInfo object if there is an update downloaded which still needs to be applied.

  - [`vpkc_update_source_t`](doc_Velopack.md#standardese-vpkc_update_source_t) &mdash; Opaque type for a Velopack UpdateSource. Must be freed with `vpkc_free_update_source`.

  - [`vpkc_wait_exit_then_apply_updates`](doc_Velopack.md#standardese-vpkc_wait_exit_then_apply_updates-vpkc_update_manager_t--vpkc_asset_t--bool-bool-char---size_t-) &mdash; This will launch the Velopack updater and tell it to wait for this program to exit gracefully.
