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

    <span class="kwd">bool</span> <a href="#standardese-vpkc_update_pending_restart-vpkc_update_manager_t--vpkc_asset_t--"><span class="typ dec var fun">vpkc_update_pending_restart</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">)</span><span class="pun">;</span>

    <a href="#standardese-vpkc_update_check_t"><span class="typ dec var fun">vpkc_update_check_t</span></a> <a href="#standardese-vpkc_check_for_updates-vpkc_update_manager_t--vpkc_update_info_t--"><span class="typ dec var fun">vpkc_check_for_updates</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_update</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_download_updates-vpkc_update_manager_t--vpkc_update_info_t--vpkc_progress_callback_t-void--"><span class="typ dec var fun">vpkc_download_updates</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_update</span><span class="pun">,</span> <a href="#standardese-vpkc_progress_callback_t"><span class="typ dec var fun">vpkc_progress_callback_t</span></a> <span class="typ dec var fun">cb_progress</span><span class="pun">,</span> <span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_wait_exit_then_apply_update-vpkc_update_manager_t--vpkc_asset_t--bool-bool-char---size_t-"><span class="typ dec var fun">vpkc_wait_exit_then_apply_update</span></a><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_silent</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_restart</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_restart_args</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_restart_args</span><span class="pun">)</span><span class="pun">;</span>

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

**This option should usually be left None**. \<br/\> Overrides the default channel used to fetch updates.

The default channel will be whatever channel was specified on the command line when building this release. For example, if the current release was packaged with ‘–channel beta’, then the default channel will be ‘beta’. This allows users to automatically receive updates from the same channel they installed from. This options allows you to explicitly switch channels, for example if the user wished to switch back to the ‘stable’ channel without having to reinstall the application.

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
    <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a> <a href="#standardese-vpkc_update_info_t__TargetFullRelease"><span class="typ dec var fun">TargetFullRelease</span></a><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-vpkc_update_info_t__IsDowngrade"><span class="typ dec var fun">IsDowngrade</span></a><span class="pun">;</span>
<span class="pun">};</span>
</code></pre>

Holds information about the current version and pending updates, such as how many there are, and access to release notes.

#### Member variables

  - `TargetFullRelease` &mdash; The available version that we are updating to.

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

-----

## Function `vpkc_new_source_http_url`

<span id="standardese-vpkc_new_source_http_url-charconst--"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">vpkc_new_source_http_url</span><span class="pun">(</span><span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">psz_http_url</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Create a new HttpSource update source for a given HTTP URL.

-----

## Function `vpkc_new_source_custom_callback`

<span id="standardese-vpkc_new_source_custom_callback-vpkc_release_feed_delegate_t-vpkc_free_release_feed_t-vpkc_download_asset_delegate_t-void--"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">vpkc_new_source_custom_callback</span><span class="pun">(</span><a href="#standardese-vpkc_release_feed_delegate_t"><span class="typ dec var fun">vpkc_release_feed_delegate_t</span></a> <span class="typ dec var fun">cb_release_feed</span><span class="pun">,</span> <a href="#standardese-vpkc_free_release_feed_t"><span class="typ dec var fun">vpkc_free_release_feed_t</span></a> <span class="typ dec var fun">cb_free_release_feed</span><span class="pun">,</span> <a href="#standardese-vpkc_download_asset_delegate_t"><span class="typ dec var fun">vpkc_download_asset_delegate_t</span></a> <span class="typ dec var fun">cb_download_entry</span><span class="pun">,</span> <span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Create a new *CUSTOM* update source with user-provided callbacks to fetch release feeds and download assets.

You can report download progress using `vpkc_source_report_progress`. Note that the callbacks must be valid for the lifetime of any UpdateManager’s that use this source. You should call `vpkc_free_source` to free the source, but note that if the source is still in use by an UpdateManager, it will not be freed until the UpdateManager is freed. Therefore to avoid possible issues, it is recommended to create this type of source once for the lifetime of your application.

-----

## Function `vpkc_source_report_progress`

<span id="standardese-vpkc_source_report_progress-size_t-int16_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_source_report_progress</span><span class="pun">(</span><span class="typ dec var fun">size_t</span> <span class="typ dec var fun">progress_callback_id</span><span class="pun">,</span> <span class="typ dec var fun">int16_t</span> <span class="typ dec var fun">progress</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Sends a progress update to the callback with the specified ID. This is used by custom update sources created with `vpkc_new_source_custom_callback` to report download progress.

-----

## Function `vpkc_free_source`

<span id="standardese-vpkc_free_source-vpkc_update_source_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_source</span><span class="pun">(</span><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_source</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Frees a vpkc\_update\_source\_t instance.

-----

## Function `vpkc_new_update_manager`

<span id="standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_new_update_manager</span><span class="pun">(</span><span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">psz_url_or_path</span><span class="pun">,</span> <a href="#standardese-vpkc_update_options_t"><span class="typ dec var fun">vpkc_update_options_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_options</span><span class="pun">,</span> <a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_locator</span><span class="pun">,</span> <a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Create a new UpdateManager instance.

@param urlOrPath Location of the update server or path to the local update directory. @param options Optional extra configuration for update manager. @param locator Override the default locator configuration (usually used for testing / mocks).

-----

## Function `vpkc_new_update_manager_with_source`

<span id="standardese-vpkc_new_update_manager_with_source-vpkc_update_source_t--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_new_update_manager_with_source</span><span class="pun">(</span><a href="#standardese-vpkc_update_source_t"><span class="typ dec var fun">vpkc_update_source_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_source</span><span class="pun">,</span> <a href="#standardese-vpkc_update_options_t"><span class="typ dec var fun">vpkc_update_options_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_options</span><span class="pun">,</span> <a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_locator</span><span class="pun">,</span> <a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Create a new UpdateManager instance with a custom UpdateSource.

@param urlOrPath Location of the update server or path to the local update directory. @param options Optional extra configuration for update manager. @param locator Override the default locator configuration (usually used for testing / mocks).

-----

## Function `vpkc_get_current_version`

<span id="standardese-vpkc_get_current_version-vpkc_update_manager_t--char--size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">size_t</span> <span class="typ dec var fun">vpkc_get_current_version</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">psz_version</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_version</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Returns the currently installed version of the app.

-----

## Function `vpkc_get_app_id`

<span id="standardese-vpkc_get_app_id-vpkc_update_manager_t--char--size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">size_t</span> <span class="typ dec var fun">vpkc_get_app_id</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">psz_id</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_id</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Returns the currently installed app id.

-----

## Function `vpkc_is_portable`

<span id="standardese-vpkc_is_portable-vpkc_update_manager_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_is_portable</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Returns whether the app is in portable mode. On Windows this can be true or false.

On MacOS and Linux this will always be true.

-----

## Function `vpkc_update_pending_restart`

<span id="standardese-vpkc_update_pending_restart-vpkc_update_manager_t--vpkc_asset_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_update_pending_restart</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Returns an UpdateInfo object if there is an update downloaded which still needs to be applied.

You can pass the UpdateInfo object to waitExitThenApplyUpdate to apply the update.

-----

## Function `vpkc_check_for_updates`

<span id="standardese-vpkc_check_for_updates-vpkc_update_manager_t--vpkc_update_info_t--"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-vpkc_update_check_t"><span class="typ dec var fun">vpkc_update_check_t</span></a> <span class="typ dec var fun">vpkc_check_for_updates</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_update</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Checks for updates, returning None if there are none available. If there are updates available, this method will return an UpdateInfo object containing the latest available release, and any delta updates that can be applied if they are available.

-----

## Function `vpkc_download_updates`

<span id="standardese-vpkc_download_updates-vpkc_update_manager_t--vpkc_update_info_t--vpkc_progress_callback_t-void--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_download_updates</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_update</span><span class="pun">,</span> <a href="#standardese-vpkc_progress_callback_t"><span class="typ dec var fun">vpkc_progress_callback_t</span></a> <span class="typ dec var fun">cb_progress</span><span class="pun">,</span> <span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Downloads the specified updates to the local app packages directory. Progress is reported back to the caller via an optional callback.

This function will acquire a global update lock so may fail if there is already another update operation in progress.

  - If the update contains delta packages and the delta feature is enabled this method will attempt to unpack and prepare them.

  - If there is no delta update available, or there is an error preparing delta packages, this method will fall back to downloading the full version of the update.

-----

## Function `vpkc_wait_exit_then_apply_update`

<span id="standardese-vpkc_wait_exit_then_apply_update-vpkc_update_manager_t--vpkc_asset_t--bool-bool-char---size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">vpkc_wait_exit_then_apply_update</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">,</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_silent</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">b_restart</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_restart_args</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_restart_args</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This will launch the Velopack updater and tell it to wait for this program to exit gracefully.

You should then clean up any state and exit your app. The updater will apply updates and then optionally restart your app. The updater will only wait for 60 seconds before giving up.

-----

## Function `vpkc_free_update_manager`

<span id="standardese-vpkc_free_update_manager-vpkc_update_manager_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_update_manager</span><span class="pun">(</span><a href="#standardese-vpkc_update_manager_t"><span class="typ dec var fun">vpkc_update_manager_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_manager</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Frees a vpkc\_update\_manager\_t instance.

-----

## Function `vpkc_free_update_info`

<span id="standardese-vpkc_free_update_info-vpkc_update_info_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_update_info</span><span class="pun">(</span><a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_update_info</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Frees a vpkc\_update\_info\_t instance.

-----

## Function `vpkc_free_asset`

<span id="standardese-vpkc_free_asset-vpkc_asset_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_asset</span><span class="pun">(</span><a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_asset</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Frees a vpkc\_asset\_t instance.

-----

## Function `vpkc_app_run`

<span id="standardese-vpkc_app_run-void--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_run</span><span class="pun">(</span><span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

VelopackApp helps you to handle app activation events correctly.

This should be used as early as possible in your application startup code. (eg. the beginning of main() or wherever your entry point is)

-----

## Function `vpkc_app_set_auto_apply_on_startup`

<span id="standardese-vpkc_app_set_auto_apply_on_startup-bool-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_auto_apply_on_startup</span><span class="pun">(</span><span class="kwd">bool</span> <span class="typ dec var fun">b_auto_apply</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Set whether to automatically apply downloaded updates on startup. This is ON by default.

-----

## Function `vpkc_app_set_args`

<span id="standardese-vpkc_app_set_args-char---size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_args</span><span class="pun">(</span><span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">p_args</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_args</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Override the command line arguments used by VelopackApp. (by default this is env::args().skip(1))

-----

## Function `vpkc_app_set_locator`

<span id="standardese-vpkc_app_set_locator-vpkc_locator_config_t--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_locator</span><span class="pun">(</span><a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">*</span> <span class="typ dec var fun">p_locator</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

-----

## Function `vpkc_app_set_hook_after_install`

<span id="standardese-vpkc_app_set_hook_after_install-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_after_install</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_after_install</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

## Function `vpkc_app_set_hook_before_uninstall`

<span id="standardese-vpkc_app_set_hook_before_uninstall-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_before_uninstall</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_before_uninstall</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

## Function `vpkc_app_set_hook_before_update`

<span id="standardese-vpkc_app_set_hook_before_update-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_before_update</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_before_update</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

## Function `vpkc_app_set_hook_after_update`

<span id="standardese-vpkc_app_set_hook_after_update-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_after_update</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_after_update</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

## Function `vpkc_app_set_hook_first_run`

<span id="standardese-vpkc_app_set_hook_first_run-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_first_run</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_first_run</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This hook is triggered when the application is started for the first time after installation.

-----

## Function `vpkc_app_set_hook_restarted`

<span id="standardese-vpkc_app_set_hook_restarted-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_restarted</span><span class="pun">(</span><a href="#standardese-vpkc_hook_callback_t"><span class="typ dec var fun">vpkc_hook_callback_t</span></a> <span class="typ dec var fun">cb_restarted</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This hook is triggered when the application is restarted by Velopack after installing updates.

-----

## Function `vpkc_get_last_error`

<span id="standardese-vpkc_get_last_error-char--size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">size_t</span> <span class="typ dec var fun">vpkc_get_last_error</span><span class="pun">(</span><span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">psz_error</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">c_error</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Get the last error message that occurred in the Velopack library.

-----

## Function `vpkc_set_logger`

<span id="standardese-vpkc_set_logger-vpkc_log_callback_t-void--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_set_logger</span><span class="pun">(</span><a href="#standardese-vpkc_log_callback_t"><span class="typ dec var fun">vpkc_log_callback_t</span></a> <span class="typ dec var fun">cb_log</span><span class="pun">,</span> <span class="kwd">void</span><span class="pun">*</span> <span class="typ dec var fun">p_user_data</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Set a custom log callback. This will be called for all log messages generated by the Velopack library.

-----
