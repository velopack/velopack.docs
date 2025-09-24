# Header file `Velopack.h`

<span id="standardese-Velopack-h"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">enum</span> <a href="#standardese-vpkc_update_check_t"><span class="typ dec var fun">vpkc_update_check_t</span></a>
<span class="pun">:</span> <span class="typ dec var fun">int8_t</span><span class="pun">;</span>

<span class="kwd">using</span> <a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">;</span>

<span class="kwd">using</span> <a href="#standardese-vpkc_release_feed_delegate_t"><span class="typ dec var fun">vpkc_release_feed_delegate_t</span></a> <span class="pun">=</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span><span class="pun">)</span><span class="pun">;</span>

<span class="kwd">using</span> <a href="#standardese-vpkc_free_release_feed_t"><span class="typ dec var fun">vpkc_free_release_feed_t</span></a> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">)</span><span class="pun">;</span>

<span class="kwd">struct</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">;</span>

<span class="kwd">using</span> <a href="#standardese-vpkc_download_asset_delegate_t"><span class="typ dec var fun">vpkc_download_asset_delegate_t</span></a> <span class="pun">=</span> <span class="kwd">bool</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a> <span class="kwd">const</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span><span class="pun">)</span><span class="pun">;</span>

<span class="kwd">struct</span> <a href="#standardese-vpkc_update_options_t"><span class="typ dec var fun">vpkc_update_options_t</span></a><span class="pun">;</span>

<span class="kwd">struct</span> <a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">;</span>

<span class="kwd">using</span> <a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">;</span>

<span class="kwd">struct</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">;</span>

<span class="kwd">using</span> <a href="#standardese-vpkc_progress_callback_t"><span class="typ dec var fun">vpkc_progress_callback_t</span></a> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span><span class="pun">)</span><span class="pun">;</span>

<span class="kwd">using</span> <a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span><span class="pun">)</span><span class="pun">;</span>

<span class="kwd">using</span> <a href="#standardese-vpkc_log_callback_t"><span class="typ dec var fun">vpkc_log_callback_t</span></a> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span><span class="pun">)</span><span class="pun">;</span>

<span class="kwd">extern</span> <span class="str">&quot;C&quot;</span>
<span class="pun">{</span>
    <a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <a href="#standardese-vpkc_new_source_file-charconst--"><span class="typ dec var fun">vpkc_new_source_file</span></a><span class="pun">(</span><span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">psz_file_path</span><span class="pun">)</span><span class="pun">;</span>

    <a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <a href="#standardese-vpkc_new_source_http_url-charconst--"><span class="typ dec var fun">vpkc_new_source_http_url</span></a><span class="pun">(</span><span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">psz_http_url</span><span class="pun">)</span><span class="pun">;</span>

    <a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <a href="#standardese-vpkc_new_source_custom_callback-vpkc_release_feed_delegate_t-vpkc_free_release_feed_t-vpkc_download_asset_delegate_t-void--"><span class="typ dec var fun">vpkc_new_source_custom_callback</span></a><span class="pun">(</span><a href="#standardese-vpkc_release_feed_delegate_t"><span class="typ dec var fun">vpkc_release_feed_delegate_t</span></a> <span class="typ dec var fun">cb_release_feed</span><span class="pun">,</span> <a href="#standardese-vpkc_free_release_feed_t"><span class="typ dec var fun">vpkc_free_release_feed_t</span></a> <span class="typ dec var fun">cb_free_release_feed</span><span class="pun">,</span> <a href="#standardese-vpkc_download_asset_delegate_t"><span class="typ dec var fun">vpkc_download_asset_delegate_t</span></a> <span class="typ dec var fun">cb_download_entry</span><span class="pun">,</span> <span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_source_report_progress-size_t-int16_t-"><span class="typ dec var fun">vpkc_source_report_progress</span></a><span class="pun">(</span><span class="typ dec var fun">size_t</span> <span class="typ dec var fun">progress_callback_id</span><span class="pun">,</span> <span class="typ dec var fun">int16_t</span> <span class="typ dec var fun">progress</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_free_source-vpkc_update_source_t--"><span class="typ dec var fun">vpkc_free_source</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_source</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_new_update_manager</span></a><span class="pun">(</span><span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">psz_url_or_path</span><span class="pun">,</span> <a href="#standardese-vpkc_update_options_t"><span class="typ dec var fun">vpkc_update_options_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_options</span><span class="pun">,</span> <a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_locator</span><span class="pun">,</span> <a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_new_update_manager_with_source-vpkc_update_source_t--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_new_update_manager_with_source</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_source</span><span class="pun">,</span> <a href="#standardese-vpkc_update_options_t"><span class="typ dec var fun">vpkc_update_options_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_options</span><span class="pun">,</span> <a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_locator</span><span class="pun">,</span> <a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">size_t</span> <a href="#standardese-vpkc_get_current_version-vpkc_update_manager_t--char--size_t-"><span class="typ dec var fun">vpkc_get_current_version</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">psz_version</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_version</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">size_t</span> <a href="#standardese-vpkc_get_app_id-vpkc_update_manager_t--char--size_t-"><span class="typ dec var fun">vpkc_get_app_id</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">psz_id</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_id</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_is_portable-vpkc_update_manager_t--"><span class="typ dec var fun">vpkc_is_portable</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_update_pending_restart-vpkc_update_manager_t--vpkc_asset_t---"><span class="typ dec var fun">vpkc_update_pending_restart</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">)</span><span class="pun">;</span>

    <a href="#standardese-vpkc_update_check_t"><span class="typ dec var fun">vpkc_update_check_t</span></a> <a href="#standardese-vpkc_check_for_updates-vpkc_update_manager_t--vpkc_update_info_t---"><span class="typ dec var fun">vpkc_check_for_updates</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_update</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_download_updates-vpkc_update_manager_t--vpkc_update_info_t--vpkc_progress_callback_t-void--"><span class="typ dec var fun">vpkc_download_updates</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_update</span><span class="pun">,</span> <a href="#standardese-vpkc_progress_callback_t"><span class="typ dec var fun">vpkc_progress_callback_t</span></a> <span class="typ dec var fun">cb_progress</span><span class="pun">,</span> <span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_wait_exit_then_apply_updates-vpkc_update_manager_t--vpkc_asset_t--bool-bool-char---size_t-"><span class="typ dec var fun">vpkc_wait_exit_then_apply_updates</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_silent</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_restart</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_restart_args</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_restart_args</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_unsafe_apply_updates-vpkc_update_manager_t--vpkc_asset_t--bool-uint32_t-bool-char---size_t-"><span class="typ dec var fun">vpkc_unsafe_apply_updates</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_silent</span><span class="pun">,</span> <span class="typ dec var fun">uint32_t</span> <span class="typ dec var fun">dw_wait_pid</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_restart</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_restart_args</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_restart_args</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_free_update_manager-vpkc_update_manager_t--"><span class="typ dec var fun">vpkc_free_update_manager</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_free_update_info-vpkc_update_info_t--"><span class="typ dec var fun">vpkc_free_update_info</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_update_info</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_free_asset-vpkc_asset_t--"><span class="typ dec var fun">vpkc_free_asset</span></a><span class="pun">(</span><a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run-void--"><span class="typ dec var fun">vpkc_app_run</span></a><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_app_set_auto_apply_on_startup-bool-"><span class="typ dec var fun">vpkc_app_set_auto_apply_on_startup</span></a><span class="pun">(</span><span class="kwd">bool</span> <span class="typ dec var fun">b_auto_apply</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_app_set_args-char---size_t-"><span class="typ dec var fun">vpkc_app_set_args</span></a><span class="pun">(</span><span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_args</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_args</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_app_set_locator-vpkc_locator_config_t--"><span class="typ dec var fun">vpkc_app_set_locator</span></a><span class="pun">(</span><a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_locator</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_app_set_hook_after_install-vpkc_hook_callback_t-"><span class="typ dec var fun">vpkc_app_set_hook_after_install</span></a><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_after_install</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_app_set_hook_before_uninstall-vpkc_hook_callback_t-"><span class="typ dec var fun">vpkc_app_set_hook_before_uninstall</span></a><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_before_uninstall</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_app_set_hook_before_update-vpkc_hook_callback_t-"><span class="typ dec var fun">vpkc_app_set_hook_before_update</span></a><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_before_update</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_app_set_hook_after_update-vpkc_hook_callback_t-"><span class="typ dec var fun">vpkc_app_set_hook_after_update</span></a><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_after_update</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_app_set_hook_first_run-vpkc_hook_callback_t-"><span class="typ dec var fun">vpkc_app_set_hook_first_run</span></a><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_first_run</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_app_set_hook_restarted-vpkc_hook_callback_t-"><span class="typ dec var fun">vpkc_app_set_hook_restarted</span></a><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_restarted</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">size_t</span> <a href="#standardese-vpkc_get_last_error-char--size_t-"><span class="typ dec var fun">vpkc_get_last_error</span></a><span class="pun">(</span><span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">psz_error</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_error</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_set_logger-vpkc_log_callback_t-void--"><span class="typ dec var fun">vpkc_set_logger</span></a><span class="pun">(</span><a href="#standardese-vpkc_log_callback_t"><span class="typ dec var fun">vpkc_log_callback_t</span></a> <span class="typ dec var fun">cb_log</span><span class="pun">,</span> <span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>
<span class="pun">}</span>
</code></pre>

## Enumeration `vpkc_update_check_t`

<span id="standardese-vpkc_update_check_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">enum</span> <span class="typ dec var fun">vpkc_update_check_t</span>
<span class="pun">:</span> <span class="typ dec var fun">int8_t</span>
<span class="pun">{</span>
    <span class="typ dec var fun">UPDATE_ERROR</span> <span class="pun">=</span> <span class="pun">-</span><span class="lit">1</span><span class="pun">,</span>
    <span class="typ dec var fun">UPDATE_AVAILABLE</span> <span class="pun">=</span> <span class="lit">0</span><span class="pun">,</span>
    <span class="typ dec var fun">NO_UPDATE_AVAILABLE</span> <span class="pun">=</span> <span class="lit">1</span><span class="pun">,</span>
    <span class="typ dec var fun">REMOTE_IS_EMPTY</span> <span class="pun">=</span> <span class="lit">2</span>
<span class="pun">};</span>
</code></pre>

The result of a call to check for updates. This can indicate that an update is available, or that an error occurred.

-----

## Type alias `vpkc_update_source_t`

<span id="standardese-vpkc_update_source_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">using</span> <span class="typ dec var fun">vpkc_update_source_t</span> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">;</span>
</code></pre>

Opaque type for a Velopack UpdateSource. Must be freed with `vpkc_free_update_source`.

-----

## Type alias `vpkc_release_feed_delegate_t`

<span id="standardese-vpkc_release_feed_delegate_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">using</span> <span class="typ dec var fun">vpkc_release_feed_delegate_t</span> <span class="pun">=</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

User delegate for to fetch a release feed. This function should return the raw JSON string of the release.json feed.

-----

## Type alias `vpkc_free_release_feed_t`

<span id="standardese-vpkc_free_release_feed_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">using</span> <span class="typ dec var fun">vpkc_free_release_feed_t</span> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

User delegate for freeing a release feed. This function should free the feed string returned by `vpkc_release_feed_delegate_t`.

-----

## Struct `vpkc_asset_t`

<span id="standardese-vpkc_asset_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">struct</span> <span class="typ dec var fun">vpkc_asset_t</span>
<span class="pun">{</span>
    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_asset_t__PackageId"><span class="typ dec var fun">PackageId</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_asset_t__Version"><span class="typ dec var fun">Version</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_asset_t__Type"><span class="typ dec var fun">Type</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_asset_t__FileName"><span class="typ dec var fun">FileName</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_asset_t__SHA1"><span class="typ dec var fun">SHA1</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_asset_t__SHA256"><span class="typ dec var fun">SHA256</span></a><span class="pun">;</span>

    <span class="typ dec var fun">uint64_t</span> <a href="#standardese-vpkc_asset_t__Size"><span class="typ dec var fun">Size</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_asset_t__NotesMarkdown"><span class="typ dec var fun">NotesMarkdown</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_asset_t__NotesHtml"><span class="typ dec var fun">NotesHtml</span></a><span class="pun">;</span>
<span class="pun">};</span>
</code></pre>

An individual Velopack asset, could refer to an asset on-disk or in a remote package feed.

#### Member variables

  - `PackageId` &mdash; The name or Id of the package containing this release.
  - `Version` &mdash; The version of this release.
  - `Type` &mdash; The type of asset (eg. “Full” or “Delta”).
  - `FileName` &mdash; The filename of the update package containing this release.
  - `SHA1` &mdash; The SHA1 checksum of the update package containing this release.
  - `SHA256` &mdash; The SHA256 checksum of the update package containing this release.
  - `Size` &mdash; The size in bytes of the update package containing this release.
  - `NotesMarkdown` &mdash; The release notes in markdown format, as passed to Velopack when packaging the release. This may be an empty string.
  - `NotesHtml` &mdash; The release notes in HTML format, transformed from Markdown when packaging the release. This may be an empty string.

-----

## Type alias `vpkc_download_asset_delegate_t`

<span id="standardese-vpkc_download_asset_delegate_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">using</span> <span class="typ dec var fun">vpkc_download_asset_delegate_t</span> <span class="pun">=</span> <span class="kwd">bool</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a> <span class="kwd">const</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

User delegate for downloading an asset file. This function is expected to download the provided asset to the provided local file path. Througout, you can use the progress callback to write progress reports.

The function should return true if the download was successful, false otherwise. Progress

-----

## Struct `vpkc_update_options_t`

<span id="standardese-vpkc_update_options_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">struct</span> <span class="typ dec var fun">vpkc_update_options_t</span>
<span class="pun">{</span>
    <span class="kwd">bool</span> <a href="#standardese-vpkc_update_options_t__AllowVersionDowngrade"><span class="typ dec var fun">AllowVersionDowngrade</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_update_options_t__ExplicitChannel"><span class="typ dec var fun">ExplicitChannel</span></a><span class="pun">;</span>

    <span class="typ dec var fun">int32_t</span> <a href="#standardese-vpkc_update_options_t__MaximumDeltasBeforeFallback"><span class="typ dec var fun">MaximumDeltasBeforeFallback</span></a><span class="pun">;</span>
<span class="pun">};</span>
</code></pre>

Options to customise the behaviour of UpdateManager.

### Variable `vpkc_update_options_t::AllowVersionDowngrade`

<span id="standardese-vpkc_update_options_t__AllowVersionDowngrade"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">AllowVersionDowngrade</span><span class="pun">;</span>
</code></pre>

Allows UpdateManager to update to a version that’s lower than the current version (i.e. downgrading).

This could happen if a release has bugs and was retracted from the release feed, or if you’re using ExplicitChannel to switch channels to another channel where the latest version on that channel is lower than the current version.

-----

### Variable `vpkc_update_options_t::ExplicitChannel`

<span id="standardese-vpkc_update_options_t__ExplicitChannel"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">ExplicitChannel</span><span class="pun">;</span>
</code></pre>

**This option should usually be left None/NULL**.

Overrides the default channel used to fetch updates. The default channel will be whatever channel was specified on the command line when building this release. For example, if the current release was packaged with ‘–channel beta’, then the default channel will be ‘beta’. This allows users to automatically receive updates from the same channel they installed from. This options allows you to explicitly switch channels, for example if the user wished to switch back to the ‘stable’ channel without having to reinstall the application.

-----

### Variable `vpkc_update_options_t::MaximumDeltasBeforeFallback`

<span id="standardese-vpkc_update_options_t__MaximumDeltasBeforeFallback"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">int32_t</span> <span class="typ dec var fun">MaximumDeltasBeforeFallback</span><span class="pun">;</span>
</code></pre>

Sets the maximum number of deltas to consider before falling back to a full update.

The default is 10. Set to a negative number (eg. -1) to disable deltas.

-----

-----

## Struct `vpkc_locator_config_t`

<span id="standardese-vpkc_locator_config_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">struct</span> <span class="typ dec var fun">vpkc_locator_config_t</span>
<span class="pun">{</span>
    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_locator_config_t__RootAppDir"><span class="typ dec var fun">RootAppDir</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_locator_config_t__UpdateExePath"><span class="typ dec var fun">UpdateExePath</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_locator_config_t__PackagesDir"><span class="typ dec var fun">PackagesDir</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_locator_config_t__ManifestPath"><span class="typ dec var fun">ManifestPath</span></a><span class="pun">;</span>

    <span class="kwd">char</span><span class="pun">*</span> <a href="#standardese-vpkc_locator_config_t__CurrentBinaryDir"><span class="typ dec var fun">CurrentBinaryDir</span></a><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_locator_config_t__IsPortable"><span class="typ dec var fun">IsPortable</span></a><span class="pun">;</span>
<span class="pun">};</span>
</code></pre>

VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

#### Member variables

  - `RootAppDir` &mdash; The root directory of the current app.
  - `UpdateExePath` &mdash; The path to the Update.exe binary.
  - `PackagesDir` &mdash; The path to the packages’ directory.
  - `ManifestPath` &mdash; The current app manifest.
  - `CurrentBinaryDir` &mdash; The directory containing the application’s user binaries.
  - `IsPortable` &mdash; Whether the current application is portable or installed.

-----

## Type alias `vpkc_update_manager_t`

<span id="standardese-vpkc_update_manager_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">using</span> <span class="typ dec var fun">vpkc_update_manager_t</span> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">;</span>
</code></pre>

Opaque type for the Velopack UpdateManager. Must be freed with `vpkc_free_update_manager`.

-----

## Struct `vpkc_update_info_t`

<span id="standardese-vpkc_update_info_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">struct</span> <span class="typ dec var fun">vpkc_update_info_t</span>
<span class="pun">{</span>
    <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <a href="#standardese-vpkc_update_info_t__TargetFullRelease"><span class="typ dec var fun">TargetFullRelease</span></a><span class="pun">;</span>

    <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <a href="#standardese-vpkc_update_info_t__BaseRelease"><span class="typ dec var fun">BaseRelease</span></a><span class="pun">;</span>

    <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span><span class="pun">*</span> <a href="#standardese-vpkc_update_info_t__DeltasToTarget"><span class="typ dec var fun">DeltasToTarget</span></a><span class="pun">;</span>

    <span class="typ dec var fun">size_t</span> <a href="#standardese-vpkc_update_info_t__DeltasToTargetCount"><span class="typ dec var fun">DeltasToTargetCount</span></a><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_update_info_t__IsDowngrade"><span class="typ dec var fun">IsDowngrade</span></a><span class="pun">;</span>
<span class="pun">};</span>
</code></pre>

Holds information about the current version and pending updates, such as how many there are, and access to release notes.

#### Member variables

  - `TargetFullRelease` &mdash; The available version that we are updating to.
  - `BaseRelease` &mdash; The base release that this update is based on. This is only available if the update is a delta update.
  - `DeltasToTarget` &mdash; The list of delta updates that can be applied to the base version to get to the target version.
  - `DeltasToTargetCount` &mdash; The number of elements in the DeltasToTarget array.

### Variable `vpkc_update_info_t::IsDowngrade`

<span id="standardese-vpkc_update_info_t__IsDowngrade"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">IsDowngrade</span><span class="pun">;</span>
</code></pre>

True if the update is a version downgrade or lateral move (such as when switching channels to the same version number).

In this case, only full updates are allowed, and any local packages on disk newer than the downloaded version will be deleted.

-----

-----

## Type alias `vpkc_progress_callback_t`

<span id="standardese-vpkc_progress_callback_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">using</span> <span class="typ dec var fun">vpkc_progress_callback_t</span> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Progress callback function.

-----

## Type alias `vpkc_hook_callback_t`

<span id="standardese-vpkc_hook_callback_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">using</span> <span class="typ dec var fun">vpkc_hook_callback_t</span> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

VelopackApp startup hook callback function.

-----

## Type alias `vpkc_log_callback_t`

<span id="standardese-vpkc_log_callback_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">using</span> <span class="typ dec var fun">vpkc_log_callback_t</span> <span class="pun">=</span> <span class="kwd">void</span><span class="pun">(</span><span class="pun">*</span><span class="pun">)</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span><span class="pun">,</span> <span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Log callback function.

-----

## Function `vpkc_new_source_file`

<span id="standardese-vpkc_new_source_file-charconst--"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">vpkc_new_source_file</span><span class="pun">(</span><span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">psz_file_path</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Create a new FileSource update source for a given file path.

@param psz\_file\_path The path to a local directory containing updates. @returns A new vpkc\_update\_source\_t instance, or null on error.

-----

## Function `vpkc_new_source_http_url`

<span id="standardese-vpkc_new_source_http_url-charconst--"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">vpkc_new_source_http_url</span><span class="pun">(</span><span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">psz_http_url</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Create a new HttpSource update source for a given HTTP URL.

@param psz\_http\_url The URL to a remote update server. @returns A new vpkc\_update\_source\_t instance, or null on error.

-----

## Function `vpkc_new_source_custom_callback`

<span id="standardese-vpkc_new_source_custom_callback-vpkc_release_feed_delegate_t-vpkc_free_release_feed_t-vpkc_download_asset_delegate_t-void--"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">vpkc_new_source_custom_callback</span><span class="pun">(</span><a href="#standardese-vpkc_release_feed_delegate_t"><span class="typ dec var fun">vpkc_release_feed_delegate_t</span></a> <span class="typ dec var fun">cb_release_feed</span><span class="pun">,</span> <a href="#standardese-vpkc_free_release_feed_t"><span class="typ dec var fun">vpkc_free_release_feed_t</span></a> <span class="typ dec var fun">cb_free_release_feed</span><span class="pun">,</span> <a href="#standardese-vpkc_download_asset_delegate_t"><span class="typ dec var fun">vpkc_download_asset_delegate_t</span></a> <span class="typ dec var fun">cb_download_entry</span><span class="pun">,</span> <span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Create a new *CUSTOM* update source with user-provided callbacks to fetch release feeds and download assets.

You can report download progress using `vpkc_source_report_progress`. Note that the callbacks must be valid for the lifetime of any UpdateManager’s that use this source. You should call `vpkc_free_source` to free the source, but note that if the source is still in use by an UpdateManager, it will not be freed until the UpdateManager is freed. Therefore to avoid possible issues, it is recommended to create this type of source once for the lifetime of your application. @param cb\_release\_feed A callback to fetch the release feed. @param cb\_free\_release\_feed A callback to free the memory allocated by `cb_release_feed`. @param cb\_download\_entry A callback to download an asset. @param p\_user\_data Optional user data to be passed to the callbacks. @returns A new vpkc\_update\_source\_t instance, or null on error. If null, the error will be available via `vpkc_get_last_error`.

-----

## Function `vpkc_source_report_progress`

<span id="standardese-vpkc_source_report_progress-size_t-int16_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_source_report_progress</span><span class="pun">(</span><span class="typ dec var fun">size_t</span> <span class="typ dec var fun">progress_callback_id</span><span class="pun">,</span> <span class="typ dec var fun">int16_t</span> <span class="typ dec var fun">progress</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Sends a progress update to the callback with the specified ID. This is used by custom update sources created with `vpkc_new_source_custom_callback` to report download progress.

@param progress\_callback\_id The ID of the progress callback to send the update to. @param progress The progress value to send (0-100).

-----

## Function `vpkc_free_source`

<span id="standardese-vpkc_free_source-vpkc_update_source_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_source</span><span class="pun">(</span><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_source</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Frees a vpkc\_update\_source\_t instance.

@param p\_source The source to free.

-----

## Function `vpkc_new_update_manager`

<span id="standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_new_update_manager</span><span class="pun">(</span><span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">psz_url_or_path</span><span class="pun">,</span> <a href="#standardese-vpkc_update_options_t"><span class="typ dec var fun">vpkc_update_options_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_options</span><span class="pun">,</span> <a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_locator</span><span class="pun">,</span> <a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Create a new UpdateManager instance.

@param psz\_url\_or\_path Location of the http update server url or path to the local update directory. @param p\_options Optional extra configuration for update manager. @param p\_locator Optional explicit path configuration for Velopack. If null, the default locator will be used. @param p\_manager A pointer to where the new vpkc\_update\_manager\_t\* instance will be stored. @returns True if the update manager was created successfully, false otherwise. If false, the error will be available via `vpkc_get_last_error`.

-----

## Function `vpkc_new_update_manager_with_source`

<span id="standardese-vpkc_new_update_manager_with_source-vpkc_update_source_t--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_new_update_manager_with_source</span><span class="pun">(</span><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_source</span><span class="pun">,</span> <a href="#standardese-vpkc_update_options_t"><span class="typ dec var fun">vpkc_update_options_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_options</span><span class="pun">,</span> <a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_locator</span><span class="pun">,</span> <a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Create a new UpdateManager instance with a custom UpdateSource.

@param p\_source A pointer to a custom UpdateSource. @param p\_options Optional extra configuration for update manager. @param p\_locator Optional explicit path configuration for Velopack. If null, the default locator will be used. @param p\_manager A pointer to where the new vpkc\_update\_manager\_t\* instance will be stored. @returns True if the update manager was created successfully, false otherwise. If false, the error will be available via `vpkc_get_last_error`.

-----

## Function `vpkc_get_current_version`

<span id="standardese-vpkc_get_current_version-vpkc_update_manager_t--char--size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">size_t</span> <span class="typ dec var fun">vpkc_get_current_version</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">psz_version</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_version</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Returns the currently installed version of the app.

@param p\_manager The update manager instance. @param psz\_version A buffer to store the version string. @param c\_version The size of the `psz_version` buffer. @returns The number of characters written to `psz_version` (including null terminator), or the required buffer size if the buffer is too small.

-----

## Function `vpkc_get_app_id`

<span id="standardese-vpkc_get_app_id-vpkc_update_manager_t--char--size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">size_t</span> <span class="typ dec var fun">vpkc_get_app_id</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">psz_id</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_id</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Returns the currently installed app id.

@param p\_manager The update manager instance. @param psz\_id A buffer to store the app id string. @param c\_id The size of the `psz_id` buffer. @returns The number of characters written to `psz_id` (including null terminator), or the required buffer size if the buffer is too small.

-----

## Function `vpkc_is_portable`

<span id="standardese-vpkc_is_portable-vpkc_update_manager_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_is_portable</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Returns whether the app is in portable mode. On Windows this can be true or false.

On MacOS and Linux this will always be true. @param p\_manager The update manager instance. @returns True if the app is in portable mode, false otherwise.

-----

## Function `vpkc_update_pending_restart`

<span id="standardese-vpkc_update_pending_restart-vpkc_update_manager_t--vpkc_asset_t---"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_update_pending_restart</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Returns an asset if there is an update downloaded which still needs to be applied.

You can pass this asset to `vpkc_wait_exit_then_apply_updates` to apply the update. @param p\_manager The update manager instance. @param p\_asset A pointer to where the new vpkc\_asset\_t\* instance will be stored. @returns True if there is an update pending restart, false otherwise.

-----

## Function `vpkc_check_for_updates`

<span id="standardese-vpkc_check_for_updates-vpkc_update_manager_t--vpkc_update_info_t---"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-vpkc_update_check_t"><span class="typ dec var fun">vpkc_update_check_t</span></a> <span class="typ dec var fun">vpkc_check_for_updates</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_update</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Checks for updates. If there are updates available, this method will return an UpdateInfo object containing the latest available release, and any delta updates that can be applied if they are available.

@param p\_manager The update manager instance. @param p\_update A pointer to where the new vpkc\_update\_info\_t\* instance will be stored if an update is available. @returns A `vpkc_update_check_t` value indicating the result of the check. If an update is available, the value will be `HasUpdate` and `p_update` will be populated.

-----

## Function `vpkc_download_updates`

<span id="standardese-vpkc_download_updates-vpkc_update_manager_t--vpkc_update_info_t--vpkc_progress_callback_t-void--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_download_updates</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_update</span><span class="pun">,</span> <a href="#standardese-vpkc_progress_callback_t"><span class="typ dec var fun">vpkc_progress_callback_t</span></a> <span class="typ dec var fun">cb_progress</span><span class="pun">,</span> <span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Downloads the specified updates to the local app packages directory. Progress is reported back to the caller via an optional callback.

This function will acquire a global update lock so may fail if there is already another update operation in progress.

  - If the update contains delta packages and the delta feature is enabled this method will attempt to unpack and prepare them.

  - If there is no delta update available, or there is an error preparing delta packages, this method will fall back to downloading the full version of the update. @param p\_manager The update manager instance. @param p\_update The update info object from `vpkc_check_for_updates`. @param cb\_progress An optional callback to report download progress (0-100). @param p\_user\_data Optional user data to be passed to the progress callback. @returns true on success, false on failure. If false, the error will be available via `vpkc_get_last_error`.

-----

## Function `vpkc_wait_exit_then_apply_updates`

<span id="standardese-vpkc_wait_exit_then_apply_updates-vpkc_update_manager_t--vpkc_asset_t--bool-bool-char---size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_wait_exit_then_apply_updates</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_silent</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_restart</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_restart_args</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_restart_args</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This will launch the Velopack updater and tell it to wait for this program to exit gracefully.

You should then clean up any state and exit your app. The updater will apply updates and then (if specified) restart your app. The updater will only wait for 60 seconds before giving up. @param p\_manager The update manager instance. @param p\_asset The asset to apply. This can be from `vpkc_update_pending_restart` or `vpkc_update_info_get_target_asset`. @param b\_silent True to attempt to apply the update without showing any UI. @param b\_restart True to restart the app after the update is applied. @param p\_restart\_args An array of command line arguments to pass to the new process when it’s restarted. @param c\_restart\_args The number of arguments in `p_restart_args`. @returns true on success, false on failure. If false, the error will be available via `vpkc_get_last_error`.

-----

## Function `vpkc_unsafe_apply_updates`

<span id="standardese-vpkc_unsafe_apply_updates-vpkc_update_manager_t--vpkc_asset_t--bool-uint32_t-bool-char---size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_unsafe_apply_updates</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_silent</span><span class="pun">,</span> <span class="typ dec var fun">uint32_t</span> <span class="typ dec var fun">dw_wait_pid</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_restart</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_restart_args</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_restart_args</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This will launch the Velopack updater and optionally wait for a program to exit gracefully.

This method is unsafe because it does not necessarily wait for any / the correct process to exit before applying updates. The `vpkc_wait_exit_then_apply_updates` method is recommended for most use cases. If dw\_wait\_pid is 0, the updater will not wait for any process to exit before applying updates (Not Recommended). @param p\_manager The update manager instance. @param p\_asset The asset to apply. This can be from `vpkc_update_pending_restart` or `vpkc_update_info_get_target_asset`. @param b\_silent True to attempt to apply the update without showing any UI. @param dw\_wait\_pid The process ID to wait for before applying updates. If 0, the updater will not wait. @param b\_restart True to restart the app after the update is applied. @param p\_restart\_args An array of command line arguments to pass to the new process when it’s restarted. @param c\_restart\_args The number of arguments in `p_restart_args`. @returns true on success, false on failure. If false, the error will be available via `vpkc_get_last_error`.

-----

## Function `vpkc_free_update_manager`

<span id="standardese-vpkc_free_update_manager-vpkc_update_manager_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_update_manager</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Frees a vpkc\_update\_manager\_t instance.

@param p\_manager The update manager instance to free.

-----

## Function `vpkc_free_update_info`

<span id="standardese-vpkc_free_update_info-vpkc_update_info_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_update_info</span><span class="pun">(</span><a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_update_info</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Frees a vpkc\_update\_info\_t instance.

@param p\_update\_info The update info instance to free.

-----

## Function `vpkc_free_asset`

<span id="standardese-vpkc_free_asset-vpkc_asset_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_asset</span><span class="pun">(</span><a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Frees a vpkc\_asset\_t instance.

@param p\_asset The asset instance to free.

-----

## Function `vpkc_app_run`

<span id="standardese-vpkc_app_run-void--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_run</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

VelopackApp helps you to handle app activation events correctly.

This should be used as early as possible in your application startup code. (eg. the beginning of main() or wherever your entry point is). This function will not return in some cases. @param p\_user\_data Optional user data to be passed to the callbacks.

-----

## Function `vpkc_app_set_auto_apply_on_startup`

<span id="standardese-vpkc_app_set_auto_apply_on_startup-bool-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_auto_apply_on_startup</span><span class="pun">(</span><span class="kwd">bool</span> <span class="typ dec var fun">b_auto_apply</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Set whether to automatically apply downloaded updates on startup. This is ON by default.

@param b\_auto\_apply True to automatically apply updates, false otherwise.

-----

## Function `vpkc_app_set_args`

<span id="standardese-vpkc_app_set_args-char---size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_args</span><span class="pun">(</span><span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_args</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_args</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Override the command line arguments used by VelopackApp. (by default this is env::args().skip(1)) @param p\_args An array of command line arguments.

@param c\_args The number of arguments in `p_args`.

-----

## Function `vpkc_app_set_locator`

<span id="standardese-vpkc_app_set_locator-vpkc_locator_config_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_locator</span><span class="pun">(</span><a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_locator</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

@param p\_locator The locator configuration to use.

-----

## Function `vpkc_app_set_hook_after_install`

<span id="standardese-vpkc_app_set_hook_after_install-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_after_install</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_after_install</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Sets a callback to be run after the app is installed.

WARNING: FastCallback hooks are run during critical stages of Velopack operations. Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called. @param cb\_after\_install The callback to run after the app is installed. The callback takes a user data pointer and the version of the app as a string.

-----

## Function `vpkc_app_set_hook_before_uninstall`

<span id="standardese-vpkc_app_set_hook_before_uninstall-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_before_uninstall</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_before_uninstall</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Sets a callback to be run before the app is uninstalled.

WARNING: FastCallback hooks are run during critical stages of Velopack operations. Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called. @param cb\_before\_uninstall The callback to run before the app is uninstalled. The callback takes a user data pointer and the version of the app as a string.

-----

## Function `vpkc_app_set_hook_before_update`

<span id="standardese-vpkc_app_set_hook_before_update-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_before_update</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_before_update</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Sets a callback to be run before the app is updated.

WARNING: FastCallback hooks are run during critical stages of Velopack operations. Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called. @param cb\_before\_update The callback to run before the app is updated. The callback takes a user data pointer and the version of the app as a string.

-----

## Function `vpkc_app_set_hook_after_update`

<span id="standardese-vpkc_app_set_hook_after_update-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_after_update</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_after_update</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Sets a callback to be run after the app is updated.

WARNING: FastCallback hooks are run during critical stages of Velopack operations. Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called. @param cb\_after\_update The callback to run after the app is updated. The callback takes a user data pointer and the version of the app as a string.

-----

## Function `vpkc_app_set_hook_first_run`

<span id="standardese-vpkc_app_set_hook_first_run-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_first_run</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_first_run</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This hook is triggered when the application is started for the first time after installation.

@param cb\_first\_run The callback to run on first run. The callback takes a user data pointer and the version of the app as a string.

-----

## Function `vpkc_app_set_hook_restarted`

<span id="standardese-vpkc_app_set_hook_restarted-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_restarted</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_restarted</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This hook is triggered when the application is restarted by Velopack after installing updates.

@param cb\_restarted The callback to run after the app is restarted. The callback takes a user data pointer and the version of the app as a string.

-----

## Function `vpkc_get_last_error`

<span id="standardese-vpkc_get_last_error-char--size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">size_t</span> <span class="typ dec var fun">vpkc_get_last_error</span><span class="pun">(</span><span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">psz_error</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_error</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Get the last error message that occurred in the Velopack library.

@param psz\_error A buffer to store the error message. @param c\_error The size of the `psz_error` buffer. @returns The number of characters written to `psz_error` (including null terminator). If the return value is greater than `c_error`, the buffer was too small and the message was truncated.

-----

## Function `vpkc_set_logger`

<span id="standardese-vpkc_set_logger-vpkc_log_callback_t-void--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_set_logger</span><span class="pun">(</span><a href="#standardese-vpkc_log_callback_t"><span class="typ dec var fun">vpkc_log_callback_t</span></a> <span class="typ dec var fun">cb_log</span><span class="pun">,</span> <span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Set a custom log callback. This will be called for all log messages generated by the Velopack library.

@param cb\_log The callback to call with log messages. The callback takes a user data pointer, a log level, and the log message as a string. @param p\_user\_data Optional user data to be passed to the callback.

-----
