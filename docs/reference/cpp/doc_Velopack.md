# Header file `Velopack.h`

<span id="standardese-Velopack-h"></span>

<pre><code class="standardese-language-cpp"><span class="pre">#define</span> <span class="typ dec var fun">VPKC_EXPORT</span>

<span class="pre">#define</span> <span class="typ dec var fun">VPKC_CALL</span>

<span class="kwd">extern</span> <span class="str">&quot;C&quot;</span>
<span class="pun">{</span>
    <span class="kwd">enum</span> <span class="typ dec var fun">vpkc_update_check_t</span><span class="pun">;</span>

    <span class="kwd">struct</span> <a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">;</span>

    <span class="kwd">struct</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">;</span>

    <span class="kwd">struct</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">;</span>

    <span class="kwd">struct</span> <a href="#standardese-vpkc_update_options_t"><span class="typ dec var fun">vpkc_update_options_t</span></a><span class="pun">;</span>

    &#x2F;&#x2F;=== UpdateManager ===&#x2F;&#x2F;
    <span class="kwd">bool</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_new_update_manager</span></a><span class="pun">(</span><span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">pszUrlOrString</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pOptions</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pLocator</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">)</span><span class="pun">;</span>
    <span class="typ dec var fun">size_t</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_get_current_version</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">pszVersion</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">cVersion</span><span class="pun">)</span><span class="pun">;</span>
    <span class="typ dec var fun">size_t</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_get_app_id</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">pszId</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">cId</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">bool</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_is_portable</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">bool</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_update_pending_restart</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pAsset</span><span class="pun">)</span><span class="pun">;</span>
    <span class="typ dec var fun">&#x27;hidden&#x27;</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_check_for_updates</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pUpdate</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">bool</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_download_updates</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pUpdate</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbProgress</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">bool</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_wait_exit_then_apply_update</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pAsset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">bSilent</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">bRestart</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">pRestartArgs</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">cRestartArgs</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_free_update_manager</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_free_update_info</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pUpdateInfo</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"><span class="typ dec var fun">vpkc_free_asset</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pAsset</span><span class="pun">)</span><span class="pun">;</span>

    &#x2F;&#x2F;=== VelopackApp ===&#x2F;&#x2F;
    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run--"><span class="typ dec var fun">vpkc_app_run</span></a><span class="pun">(</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run--"><span class="typ dec var fun">vpkc_app_set_auto_apply_on_startup</span></a><span class="pun">(</span><span class="kwd">bool</span> <span class="typ dec var fun">bAutoApply</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run--"><span class="typ dec var fun">vpkc_app_set_args</span></a><span class="pun">(</span><span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">pArgs</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">cArgs</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run--"><span class="typ dec var fun">vpkc_app_set_locator</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pLocator</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run--"><span class="typ dec var fun">vpkc_app_set_hook_after_install</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbAfterInstall</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run--"><span class="typ dec var fun">vpkc_app_set_hook_before_uninstall</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbBeforeUninstall</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run--"><span class="typ dec var fun">vpkc_app_set_hook_before_update</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbBeforeUpdate</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run--"><span class="typ dec var fun">vpkc_app_set_hook_after_update</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbAfterUpdate</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run--"><span class="typ dec var fun">vpkc_app_set_hook_first_run</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbFirstRun</span><span class="pun">)</span><span class="pun">;</span>
    <span class="kwd">void</span> <a href="#standardese-vpkc_app_run--"><span class="typ dec var fun">vpkc_app_set_hook_restarted</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbRestarted</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">size_t</span> <a href="#standardese-vpkc_get_last_error-char--size_t-"><span class="typ dec var fun">vpkc_get_last_error</span></a><span class="pun">(</span><span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">pszError</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">cError</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-vpkc_set_log-vpkc_log_callback_t-"><span class="typ dec var fun">vpkc_set_log</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbLog</span><span class="pun">)</span><span class="pun">;</span>
<span class="pun">}</span>

<span class="kwd">namespace</span> <span class="typ dec var fun">Velopack</span>
<span class="pun">{</span>
    <span class="kwd">struct</span> <a href="#standardese-Velopack__VelopackLocatorConfig"><span class="typ dec var fun">VelopackLocatorConfig</span></a><span class="pun">;</span>

    <span class="kwd">struct</span> <a href="#standardese-Velopack__VelopackAsset"><span class="typ dec var fun">VelopackAsset</span></a><span class="pun">;</span>

    <span class="kwd">struct</span> <a href="#standardese-Velopack__UpdateInfo"><span class="typ dec var fun">UpdateInfo</span></a><span class="pun">;</span>

    <span class="kwd">struct</span> <a href="#standardese-Velopack__UpdateOptions"><span class="typ dec var fun">UpdateOptions</span></a><span class="pun">;</span>

    <span class="kwd">class</span> <a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">VelopackApp</span></a><span class="pun">;</span>

    <span class="kwd">class</span> <a href="#standardese-Velopack__UpdateManager"><span class="typ dec var fun">UpdateManager</span></a><span class="pun">;</span>
<span class="pun">}</span>
</code></pre>

This header provides the C and C++ API for the Velopack library.

All the C constructs are prefixed by `vpkc_` and all the C++ constructs are in the `Velopack` namespace. The C++ API is a thin wrapper around the C API, providing a more idiomatic C++ interface. You should not mix and match the C and C++ APIs in the same program.

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

## Struct `vpkc_update_info_t`

<span id="standardese-vpkc_update_info_t"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">struct</span> <span class="typ dec var fun">vpkc_update_info_t</span>
<span class="pun">{</span>
    <span class="typ dec var fun">&#x27;hidden&#x27;</span> <a href="#standardese-vpkc_update_info_t__TargetFullRelease"><span class="typ dec var fun">TargetFullRelease</span></a><span class="pun">;</span>

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

## Function `vpkc_new_update_manager`

<span id="standardese-vpkc_new_update_manager-charconst--vpkc_update_options_t--vpkc_locator_config_t--vpkc_update_manager_t---"></span>

<pre><code class="standardese-language-cpp">(1) <span class="kwd">bool</span> <span class="typ dec var fun">vpkc_new_update_manager</span><span class="pun">(</span><span class="kwd">char</span> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">pszUrlOrString</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pOptions</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pLocator</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">)</span><span class="pun">;</span>

(2) <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">vpkc_get_current_version</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">pszVersion</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">cVersion</span><span class="pun">)</span><span class="pun">;</span>

(3) <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">vpkc_get_app_id</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">pszId</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">cId</span><span class="pun">)</span><span class="pun">;</span>

(4) <span class="kwd">bool</span> <span class="typ dec var fun">vpkc_is_portable</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">)</span><span class="pun">;</span>

(5) <span class="kwd">bool</span> <span class="typ dec var fun">vpkc_update_pending_restart</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pAsset</span><span class="pun">)</span><span class="pun">;</span>

(6) <span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">vpkc_check_for_updates</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pUpdate</span><span class="pun">)</span><span class="pun">;</span>

(7) <span class="kwd">bool</span> <span class="typ dec var fun">vpkc_download_updates</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pUpdate</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbProgress</span><span class="pun">)</span><span class="pun">;</span>

(8) <span class="kwd">bool</span> <span class="typ dec var fun">vpkc_wait_exit_then_apply_update</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pAsset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">bSilent</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">bRestart</span><span class="pun">,</span> <span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">pRestartArgs</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">cRestartArgs</span><span class="pun">)</span><span class="pun">;</span>

(9) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_update_manager</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pManager</span><span class="pun">)</span><span class="pun">;</span>

(10) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_update_info</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pUpdateInfo</span><span class="pun">)</span><span class="pun">;</span>

(11) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_free_asset</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pAsset</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Creates a new vpkc\_update\_manager\_t. Free with vpkc\_free\_update\_manager.

-----

## Function `vpkc_app_run`

<span id="standardese-vpkc_app_run--"></span>

<pre><code class="standardese-language-cpp">(1) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_run</span><span class="pun">(</span><span class="pun">)</span><span class="pun">;</span>

(2) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_auto_apply_on_startup</span><span class="pun">(</span><span class="kwd">bool</span> <span class="typ dec var fun">bAutoApply</span><span class="pun">)</span><span class="pun">;</span>

(3) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_args</span><span class="pun">(</span><span class="kwd">char</span><span class="pun">*</span><span class="pun">*</span> <span class="typ dec var fun">pArgs</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">cArgs</span><span class="pun">)</span><span class="pun">;</span>

(4) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_locator</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span><span class="pun">*</span> <span class="typ dec var fun">pLocator</span><span class="pun">)</span><span class="pun">;</span>

(5) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_after_install</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbAfterInstall</span><span class="pun">)</span><span class="pun">;</span>

(6) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_before_uninstall</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbBeforeUninstall</span><span class="pun">)</span><span class="pun">;</span>

(7) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_before_update</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbBeforeUpdate</span><span class="pun">)</span><span class="pun">;</span>

(8) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_after_update</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbAfterUpdate</span><span class="pun">)</span><span class="pun">;</span>

(9) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_first_run</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbFirstRun</span><span class="pun">)</span><span class="pun">;</span>

(10) <span class="kwd">void</span> <span class="typ dec var fun">vpkc_app_set_hook_restarted</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbRestarted</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Should be run at the beginning of your application to handle Velopack events.

-----

## Function `vpkc_get_last_error`

<span id="standardese-vpkc_get_last_error-char--size_t-"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">size_t</span> <span class="typ dec var fun">vpkc_get_last_error</span><span class="pun">(</span><span class="kwd">char</span><span class="pun">*</span> <span class="typ dec var fun">pszError</span><span class="pun">,</span> <span class="typ dec var fun">size_t</span> <span class="typ dec var fun">cError</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Given a function has returned a failure, this function will return the last error message as a string.

-----

## Function `vpkc_set_log`

<span id="standardese-vpkc_set_log-vpkc_log_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">vpkc_set_log</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbLog</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Sets the callback to be used/called with log messages from Velopack.

-----

<span id="standardese-Velopack"></span>

### Struct `Velopack::VelopackLocatorConfig`

<span id="standardese-Velopack__VelopackLocatorConfig"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">struct</span> <span class="typ dec var fun">VelopackLocatorConfig</span>
<span class="pun">{</span>
    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackLocatorConfig__RootAppDir"><span class="typ dec var fun">RootAppDir</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackLocatorConfig__UpdateExePath"><span class="typ dec var fun">UpdateExePath</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackLocatorConfig__PackagesDir"><span class="typ dec var fun">PackagesDir</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackLocatorConfig__ManifestPath"><span class="typ dec var fun">ManifestPath</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackLocatorConfig__CurrentBinaryDir"><span class="typ dec var fun">CurrentBinaryDir</span></a><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-Velopack__VelopackLocatorConfig__IsPortable"><span class="typ dec var fun">IsPortable</span></a><span class="pun">;</span>
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

### Struct `Velopack::VelopackAsset`

<span id="standardese-Velopack__VelopackAsset"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">struct</span> <span class="typ dec var fun">VelopackAsset</span>
<span class="pun">{</span>
    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackAsset__PackageId"><span class="typ dec var fun">PackageId</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackAsset__Version"><span class="typ dec var fun">Version</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackAsset__Type"><span class="typ dec var fun">Type</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackAsset__FileName"><span class="typ dec var fun">FileName</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackAsset__SHA1"><span class="typ dec var fun">SHA1</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackAsset__SHA256"><span class="typ dec var fun">SHA256</span></a><span class="pun">;</span>

    <span class="typ dec var fun">uint64_t</span> <a href="#standardese-Velopack__VelopackAsset__Size"><span class="typ dec var fun">Size</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackAsset__NotesMarkdown"><span class="typ dec var fun">NotesMarkdown</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__VelopackAsset__NotesHtml"><span class="typ dec var fun">NotesHtml</span></a><span class="pun">;</span>
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

### Struct `Velopack::UpdateInfo`

<span id="standardese-Velopack__UpdateInfo"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">struct</span> <span class="typ dec var fun">UpdateInfo</span>
<span class="pun">{</span>
    <a href="#standardese-Velopack__VelopackAsset"><span class="typ dec var fun">Velopack::VelopackAsset</span></a> <a href="#standardese-Velopack__UpdateInfo__TargetFullRelease"><span class="typ dec var fun">TargetFullRelease</span></a><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-Velopack__UpdateInfo__IsDowngrade"><span class="typ dec var fun">IsDowngrade</span></a><span class="pun">;</span>
<span class="pun">};</span>
</code></pre>

Holds information about the current version and pending updates, such as how many there are, and access to release notes.

#### Member variables

  - `TargetFullRelease` &mdash; The available version that we are updating to.

### Variable `Velopack::UpdateInfo::IsDowngrade`

<span id="standardese-Velopack__UpdateInfo__IsDowngrade"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">IsDowngrade</span><span class="pun">;</span>
</code></pre>

True if the update is a version downgrade or lateral move (such as when switching channels to the same version number).

In this case, only full updates are allowed, and any local packages on disk newer than the downloaded version will be deleted.

-----

-----

### Struct `Velopack::UpdateOptions`

<span id="standardese-Velopack__UpdateOptions"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">struct</span> <span class="typ dec var fun">UpdateOptions</span>
<span class="pun">{</span>
    <span class="kwd">bool</span> <a href="#standardese-Velopack__UpdateOptions__AllowVersionDowngrade"><span class="typ dec var fun">AllowVersionDowngrade</span></a><span class="pun">;</span>

    <span class="typ dec var fun">std::optional</span><span class="pun">&lt;</span>std::string<span class="pun">&gt;</span> <a href="#standardese-Velopack__UpdateOptions__ExplicitChannel"><span class="typ dec var fun">ExplicitChannel</span></a><span class="pun">;</span>
<span class="pun">};</span>
</code></pre>

Options to customise the behaviour of UpdateManager.

### Variable `Velopack::UpdateOptions::AllowVersionDowngrade`

<span id="standardese-Velopack__UpdateOptions__AllowVersionDowngrade"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">AllowVersionDowngrade</span><span class="pun">;</span>
</code></pre>

Allows UpdateManager to update to a version that’s lower than the current version (i.e. downgrading).

This could happen if a release has bugs and was retracted from the release feed, or if you’re using ExplicitChannel to switch channels to another channel where the latest version on that channel is lower than the current version.

-----

### Variable `Velopack::UpdateOptions::ExplicitChannel`

<span id="standardese-Velopack__UpdateOptions__ExplicitChannel"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">std::optional</span><span class="pun">&lt;</span>std::string<span class="pun">&gt;</span> <span class="typ dec var fun">ExplicitChannel</span><span class="pun">;</span>
</code></pre>

**This option should usually be left None**. \<br/\> Overrides the default channel used to fetch updates.

The default channel will be whatever channel was specified on the command line when building this release. For example, if the current release was packaged with ‘–channel beta’, then the default channel will be ‘beta’. This allows users to automatically receive updates from the same channel they installed from. This options allows you to explicitly switch channels, for example if the user wished to switch back to the ‘stable’ channel without having to reinstall the application.

-----

-----

### Class `Velopack::VelopackApp`

<span id="standardese-Velopack__VelopackApp"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">class</span> <span class="typ dec var fun">VelopackApp</span>
<span class="pun">{</span>
<span class="kwd">public</span><span class="pun">:</span>
    <span class="kwd">static</span> <span class="typ dec var fun">Velopack::VelopackApp</span> <a href="#standardese-Velopack__VelopackApp__Build--"><span class="typ dec var fun">Build</span></a><span class="pun">(</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">Velopack::VelopackApp</span><span class="pun">&amp;</span> <a href="#standardese-Velopack__VelopackApp__SetAutoApplyOnStartup-bool-"><span class="typ dec var fun">SetAutoApplyOnStartup</span></a><span class="pun">(</span><span class="kwd">bool</span> <span class="typ dec var fun">bAutoApply</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">Velopack::VelopackApp</span><span class="pun">&amp;</span> <a href="#standardese-Velopack__VelopackApp__SetArgs-std__vector-std__string-const--"><span class="typ dec var fun">SetArgs</span></a><span class="pun">(</span><span class="typ dec var fun">std::vector</span><span class="pun">&lt;</span>std::string<span class="pun">&gt;</span> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">args</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">Velopack::VelopackApp</span><span class="pun">&amp;</span> <a href="#standardese-Velopack__VelopackApp__SetLocator-Velopack__VelopackLocatorConfigconst--"><span class="typ dec var fun">SetLocator</span></a><span class="pun">(</span><a href="#standardese-Velopack__VelopackLocatorConfig"><span class="typ dec var fun">Velopack::VelopackLocatorConfig</span></a> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">locator</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">Velopack::VelopackApp</span><span class="pun">&amp;</span> <a href="#standardese-Velopack__VelopackApp__OnAfterInstall-vpkc_hook_callback_t-"><span class="typ dec var fun">OnAfterInstall</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">Velopack::VelopackApp</span><span class="pun">&amp;</span> <a href="#standardese-Velopack__VelopackApp__OnBeforeUninstall-vpkc_hook_callback_t-"><span class="typ dec var fun">OnBeforeUninstall</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">Velopack::VelopackApp</span><span class="pun">&amp;</span> <a href="#standardese-Velopack__VelopackApp__OnBeforeUpdate-vpkc_hook_callback_t-"><span class="typ dec var fun">OnBeforeUpdate</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">Velopack::VelopackApp</span><span class="pun">&amp;</span> <a href="#standardese-Velopack__VelopackApp__OnAfterUpdate-vpkc_hook_callback_t-"><span class="typ dec var fun">OnAfterUpdate</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">Velopack::VelopackApp</span><span class="pun">&amp;</span> <a href="#standardese-Velopack__VelopackApp__OnFirstRun-vpkc_hook_callback_t-"><span class="typ dec var fun">OnFirstRun</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>

    <span class="typ dec var fun">Velopack::VelopackApp</span><span class="pun">&amp;</span> <a href="#standardese-Velopack__VelopackApp__OnRestarted-vpkc_hook_callback_t-"><span class="typ dec var fun">OnRestarted</span></a><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-Velopack__VelopackApp__Run--"><span class="typ dec var fun">Run</span></a><span class="pun">(</span><span class="pun">)</span><span class="pun">;</span>
<span class="pun">};</span>
</code></pre>

VelopackApp helps you to handle app activation events correctly.

This should be used as early as possible in your application startup code. (eg. the beginning of main() or wherever your entry point is)

### Function `Velopack::VelopackApp::Build`

<span id="standardese-Velopack__VelopackApp__Build--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">static</span> <a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">Velopack::VelopackApp</span></a> <span class="typ dec var fun">Build</span><span class="pun">(</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Build a new VelopackApp instance.

-----

### Function `Velopack::VelopackApp::SetAutoApplyOnStartup`

<span id="standardese-Velopack__VelopackApp__SetAutoApplyOnStartup-bool-"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">Velopack::VelopackApp</span></a><span class="pun">&amp;</span> <span class="typ dec var fun">SetAutoApplyOnStartup</span><span class="pun">(</span><span class="kwd">bool</span> <span class="typ dec var fun">bAutoApply</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Set whether to automatically apply downloaded updates on startup. This is ON by default.

-----

### Function `Velopack::VelopackApp::SetArgs`

<span id="standardese-Velopack__VelopackApp__SetArgs-std__vector-std__string-const--"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">Velopack::VelopackApp</span></a><span class="pun">&amp;</span> <span class="typ dec var fun">SetArgs</span><span class="pun">(</span><span class="typ dec var fun">std::vector</span><span class="pun">&lt;</span>std::string<span class="pun">&gt;</span> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">args</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Override the command line arguments used by VelopackApp. (by default this is env::args().skip(1))

-----

### Function `Velopack::VelopackApp::SetLocator`

<span id="standardese-Velopack__VelopackApp__SetLocator-Velopack__VelopackLocatorConfigconst--"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">Velopack::VelopackApp</span></a><span class="pun">&amp;</span> <span class="typ dec var fun">SetLocator</span><span class="pun">(</span><a href="#standardese-Velopack__VelopackLocatorConfig"><span class="typ dec var fun">Velopack::VelopackLocatorConfig</span></a> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">locator</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

VelopackLocator provides some utility functions for locating the current app important paths (eg. path to packages, update binary, and so forth).

-----

### Function `Velopack::VelopackApp::OnAfterInstall`

<span id="standardese-Velopack__VelopackApp__OnAfterInstall-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">Velopack::VelopackApp</span></a><span class="pun">&amp;</span> <span class="typ dec var fun">OnAfterInstall</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

### Function `Velopack::VelopackApp::OnBeforeUninstall`

<span id="standardese-Velopack__VelopackApp__OnBeforeUninstall-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">Velopack::VelopackApp</span></a><span class="pun">&amp;</span> <span class="typ dec var fun">OnBeforeUninstall</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

### Function `Velopack::VelopackApp::OnBeforeUpdate`

<span id="standardese-Velopack__VelopackApp__OnBeforeUpdate-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">Velopack::VelopackApp</span></a><span class="pun">&amp;</span> <span class="typ dec var fun">OnBeforeUpdate</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

### Function `Velopack::VelopackApp::OnAfterUpdate`

<span id="standardese-Velopack__VelopackApp__OnAfterUpdate-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">Velopack::VelopackApp</span></a><span class="pun">&amp;</span> <span class="typ dec var fun">OnAfterUpdate</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

WARNING: FastCallback hooks are run during critical stages of Velopack operations.

Your code will be run and then the process will exit. If your code has not completed within 30 seconds, it will be terminated. Only supported on windows; On other operating systems, this will never be called.

-----

### Function `Velopack::VelopackApp::OnFirstRun`

<span id="standardese-Velopack__VelopackApp__OnFirstRun-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">Velopack::VelopackApp</span></a><span class="pun">&amp;</span> <span class="typ dec var fun">OnFirstRun</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This hook is triggered when the application is started for the first time after installation.

-----

### Function `Velopack::VelopackApp::OnRestarted`

<span id="standardese-Velopack__VelopackApp__OnRestarted-vpkc_hook_callback_t-"></span>

<pre><code class="standardese-language-cpp"><a href="#standardese-Velopack__VelopackApp"><span class="typ dec var fun">Velopack::VelopackApp</span></a><span class="pun">&amp;</span> <span class="typ dec var fun">OnRestarted</span><span class="pun">(</span><span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">cbInstall</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This hook is triggered when the application is restarted by Velopack after installing updates.

-----

### Function `Velopack::VelopackApp::Run`

<span id="standardese-Velopack__VelopackApp__Run--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">Run</span><span class="pun">(</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Runs the Velopack startup logic. This should be the first thing to run in your app.

In some circumstances it may terminate/restart the process to perform tasks.

-----

-----

### Class `Velopack::UpdateManager`

<span id="standardese-Velopack__UpdateManager"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">class</span> <span class="typ dec var fun">UpdateManager</span>
<span class="pun">{</span>
<span class="kwd">public</span><span class="pun">:</span>
    <a href="#standardese-Velopack__UpdateManager__UpdateManager-std__stringconst--Velopack__UpdateOptionsconst--Velopack__VelopackLocatorConfigconst--"><span class="typ dec var fun">UpdateManager</span></a><span class="pun">(</span><span class="typ dec var fun">std::string</span> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">urlOrPath</span><span class="pun">,</span> <a href="#standardese-Velopack__UpdateOptions"><span class="typ dec var fun">Velopack::UpdateOptions</span></a> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">options</span> <span class="pun">=</span> <span class="typ dec var fun">nullptr</span><span class="pun">,</span> <a href="#standardese-Velopack__VelopackLocatorConfig"><span class="typ dec var fun">Velopack::VelopackLocatorConfig</span></a> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">locator</span> <span class="pun">=</span> <span class="typ dec var fun">nullptr</span><span class="pun">)</span><span class="pun">;</span>

    <a href="#standardese-Velopack__UpdateManager__-UpdateManager--"><span class="typ dec var fun">~UpdateManager</span></a><span class="pun">(</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">bool</span> <a href="#standardese-Velopack__UpdateManager__IsPortable--"><span class="typ dec var fun">IsPortable</span></a><span class="pun">(</span><span class="pun">)</span> <span class="kwd">noexcept</span><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__UpdateManager__GetCurrentVersion--"><span class="typ dec var fun">GetCurrentVersion</span></a><span class="pun">(</span><span class="pun">)</span> <span class="kwd">noexcept</span><span class="pun">;</span>

    <span class="typ dec var fun">std::string</span> <a href="#standardese-Velopack__UpdateManager__GetAppId--"><span class="typ dec var fun">GetAppId</span></a><span class="pun">(</span><span class="pun">)</span> <span class="kwd">noexcept</span><span class="pun">;</span>

    <span class="typ dec var fun">std::optional</span><span class="pun">&lt;</span>VelopackAsset<span class="pun">&gt;</span> <a href="#standardese-Velopack__UpdateManager__UpdatePendingRestart--"><span class="typ dec var fun">UpdatePendingRestart</span></a><span class="pun">(</span><span class="pun">)</span> <span class="kwd">noexcept</span><span class="pun">;</span>

    <span class="typ dec var fun">std::optional</span><span class="pun">&lt;</span>UpdateInfo<span class="pun">&gt;</span> <a href="#standardese-Velopack__UpdateManager__CheckForUpdates--"><span class="typ dec var fun">CheckForUpdates</span></a><span class="pun">(</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-Velopack__UpdateManager__DownloadUpdates-Velopack__UpdateInfoconst--vpkc_progress_callback_t-"><span class="typ dec var fun">DownloadUpdates</span></a><span class="pun">(</span><a href="#standardese-Velopack__UpdateInfo"><span class="typ dec var fun">Velopack::UpdateInfo</span></a> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">update</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">progress</span> <span class="pun">=</span> <span class="typ dec var fun">nullptr</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-Velopack__UpdateManager__WaitExitThenApplyUpdate-Velopack__VelopackAssetconst--bool-bool-std__vector-std__string--"><span class="typ dec var fun">WaitExitThenApplyUpdate</span></a><span class="pun">(</span><a href="#standardese-Velopack__VelopackAsset"><span class="typ dec var fun">Velopack::VelopackAsset</span></a> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">asset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">silent</span> <span class="pun">=</span> <span class="typ dec var fun">false</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">restart</span> <span class="pun">=</span> <span class="typ dec var fun">true</span><span class="pun">,</span> <span class="typ dec var fun">std::vector</span><span class="pun">&lt;</span>std::string<span class="pun">&gt;</span> <span class="typ dec var fun">restartArgs</span> <span class="pun">=</span> <span class="pun">{</span><span class="pun">}</span><span class="pun">)</span><span class="pun">;</span>

    <span class="kwd">void</span> <a href="#standardese-Velopack__UpdateManager__WaitExitThenApplyUpdate-Velopack__UpdateInfoconst--bool-bool-std__vector-std__string--"><span class="typ dec var fun">WaitExitThenApplyUpdate</span></a><span class="pun">(</span><a href="#standardese-Velopack__UpdateInfo"><span class="typ dec var fun">Velopack::UpdateInfo</span></a> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">asset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">silent</span> <span class="pun">=</span> <span class="typ dec var fun">false</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">restart</span> <span class="pun">=</span> <span class="typ dec var fun">true</span><span class="pun">,</span> <span class="typ dec var fun">std::vector</span><span class="pun">&lt;</span>std::string<span class="pun">&gt;</span> <span class="typ dec var fun">restartArgs</span> <span class="pun">=</span> <span class="pun">{</span><span class="pun">}</span><span class="pun">)</span><span class="pun">;</span>
<span class="pun">};</span>
</code></pre>

Provides functionality for checking for updates, downloading updates, and applying updates to the current application.

### Constructor `Velopack::UpdateManager::UpdateManager`

<span id="standardese-Velopack__UpdateManager__UpdateManager-std__stringconst--Velopack__UpdateOptionsconst--Velopack__VelopackLocatorConfigconst--"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">UpdateManager</span><span class="pun">(</span><span class="typ dec var fun">std::string</span> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">urlOrPath</span><span class="pun">,</span> <a href="#standardese-Velopack__UpdateOptions"><span class="typ dec var fun">Velopack::UpdateOptions</span></a> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">options</span> <span class="pun">=</span> <span class="typ dec var fun">nullptr</span><span class="pun">,</span> <a href="#standardese-Velopack__VelopackLocatorConfig"><span class="typ dec var fun">Velopack::VelopackLocatorConfig</span></a> <span class="kwd">const</span><span class="pun">*</span> <span class="typ dec var fun">locator</span> <span class="pun">=</span> <span class="typ dec var fun">nullptr</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Create a new UpdateManager instance.

@param urlOrPath Location of the update server or path to the local update directory. @param options Optional extra configuration for update manager. @param locator Override the default locator configuration (usually used for testing / mocks).

-----

### Destructor `Velopack::UpdateManager::~UpdateManager`

<span id="standardese-Velopack__UpdateManager__-UpdateManager--"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">~UpdateManager</span><span class="pun">(</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Destructor for UpdateManager.

-----

### Function `Velopack::UpdateManager::IsPortable`

<span id="standardese-Velopack__UpdateManager__IsPortable--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">bool</span> <span class="typ dec var fun">IsPortable</span><span class="pun">(</span><span class="pun">)</span> <span class="kwd">noexcept</span><span class="pun">;</span>
</code></pre>

Returns whether the app is in portable mode. On Windows this can be true or false.

On MacOS and Linux this will always be true.

-----

### Function `Velopack::UpdateManager::GetCurrentVersion`

<span id="standardese-Velopack__UpdateManager__GetCurrentVersion--"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">std::string</span> <span class="typ dec var fun">GetCurrentVersion</span><span class="pun">(</span><span class="pun">)</span> <span class="kwd">noexcept</span><span class="pun">;</span>
</code></pre>

Returns the currently installed version of the app.

-----

### Function `Velopack::UpdateManager::GetAppId`

<span id="standardese-Velopack__UpdateManager__GetAppId--"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">std::string</span> <span class="typ dec var fun">GetAppId</span><span class="pun">(</span><span class="pun">)</span> <span class="kwd">noexcept</span><span class="pun">;</span>
</code></pre>

Returns the currently installed app id.

-----

### Function `Velopack::UpdateManager::UpdatePendingRestart`

<span id="standardese-Velopack__UpdateManager__UpdatePendingRestart--"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">std::optional</span><span class="pun">&lt;</span>VelopackAsset<span class="pun">&gt;</span> <span class="typ dec var fun">UpdatePendingRestart</span><span class="pun">(</span><span class="pun">)</span> <span class="kwd">noexcept</span><span class="pun">;</span>
</code></pre>

Returns an UpdateInfo object if there is an update downloaded which still needs to be applied.

You can pass the UpdateInfo object to waitExitThenApplyUpdate to apply the update.

-----

### Function `Velopack::UpdateManager::CheckForUpdates`

<span id="standardese-Velopack__UpdateManager__CheckForUpdates--"></span>

<pre><code class="standardese-language-cpp"><span class="typ dec var fun">std::optional</span><span class="pun">&lt;</span>UpdateInfo<span class="pun">&gt;</span> <span class="typ dec var fun">CheckForUpdates</span><span class="pun">(</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Checks for updates, returning None if there are none available. If there are updates available, this method will return an UpdateInfo object containing the latest available release, and any delta updates that can be applied if they are available.

-----

### Function `Velopack::UpdateManager::DownloadUpdates`

<span id="standardese-Velopack__UpdateManager__DownloadUpdates-Velopack__UpdateInfoconst--vpkc_progress_callback_t-"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">DownloadUpdates</span><span class="pun">(</span><a href="#standardese-Velopack__UpdateInfo"><span class="typ dec var fun">Velopack::UpdateInfo</span></a> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">update</span><span class="pun">,</span> <span class="typ dec var fun">&#x27;hidden&#x27;</span> <span class="typ dec var fun">progress</span> <span class="pun">=</span> <span class="typ dec var fun">nullptr</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

Downloads the specified updates to the local app packages directory. Progress is reported back to the caller via an optional Sender.

This function will acquire a global update lock so may fail if there is already another update operation in progress.

  - If the update contains delta packages and the delta feature is enabled this method will attempt to unpack and prepare them.

  - If there is no delta update available, or there is an error preparing delta packages, this method will fall back to downloading the full version of the update.

-----

### Function `Velopack::UpdateManager::WaitExitThenApplyUpdate`

<span id="standardese-Velopack__UpdateManager__WaitExitThenApplyUpdate-Velopack__VelopackAssetconst--bool-bool-std__vector-std__string--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">WaitExitThenApplyUpdate</span><span class="pun">(</span><a href="#standardese-Velopack__VelopackAsset"><span class="typ dec var fun">Velopack::VelopackAsset</span></a> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">asset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">silent</span> <span class="pun">=</span> <span class="typ dec var fun">false</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">restart</span> <span class="pun">=</span> <span class="typ dec var fun">true</span><span class="pun">,</span> <span class="typ dec var fun">std::vector</span><span class="pun">&lt;</span>std::string<span class="pun">&gt;</span> <span class="typ dec var fun">restartArgs</span> <span class="pun">=</span> <span class="pun">{</span><span class="pun">}</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This will launch the Velopack updater and tell it to wait for this program to exit gracefully.

You should then clean up any state and exit your app. The updater will apply updates and then optionally restart your app. The updater will only wait for 60 seconds before giving up.

-----

### Function `Velopack::UpdateManager::WaitExitThenApplyUpdate`

<span id="standardese-Velopack__UpdateManager__WaitExitThenApplyUpdate-Velopack__UpdateInfoconst--bool-bool-std__vector-std__string--"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">void</span> <span class="typ dec var fun">WaitExitThenApplyUpdate</span><span class="pun">(</span><a href="#standardese-Velopack__UpdateInfo"><span class="typ dec var fun">Velopack::UpdateInfo</span></a> <span class="kwd">const</span><span class="pun">&amp;</span> <span class="typ dec var fun">asset</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">silent</span> <span class="pun">=</span> <span class="typ dec var fun">false</span><span class="pun">,</span> <span class="kwd">bool</span> <span class="typ dec var fun">restart</span> <span class="pun">=</span> <span class="typ dec var fun">true</span><span class="pun">,</span> <span class="typ dec var fun">std::vector</span><span class="pun">&lt;</span>std::string<span class="pun">&gt;</span> <span class="typ dec var fun">restartArgs</span> <span class="pun">=</span> <span class="pun">{</span><span class="pun">}</span><span class="pun">)</span><span class="pun">;</span>
</code></pre>

This will launch the Velopack updater and tell it to wait for this program to exit gracefully.

You should then clean up any state and exit your app. The updater will apply updates and then optionally restart your app. The updater will only wait for 60 seconds before giving up.

-----

-----
