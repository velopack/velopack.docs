# Header file `Velopack.h`

<span id="standardese-Velopack-h"></span>

<pre><code class="standardese-language-cpp"><span class="kwd">enum</span> <span class="typ dec var fun">vpkc_update_check_t</span>
<span class="pun">:</span> <span class="typ dec var fun">int16_t</span><span class="pun">;</span>

<span class="kwd">struct</span> <a href="#standardese-vpkc_update_options_t"><span class="typ dec var fun">vpkc_update_options_t</span></a><span class="pun">;</span>

<span class="kwd">struct</span> <a href="#standardese-vpkc_locator_config_t"><span class="typ dec var fun">vpkc_locator_config_t</span></a><span class="pun">;</span>

<span class="kwd">struct</span> <a href="#standardese-vpkc_asset_t"><span class="typ dec var fun">vpkc_asset_t</span></a><span class="pun">;</span>

<span class="kwd">struct</span> <a href="#standardese-vpkc_update_info_t"><span class="typ dec var fun">vpkc_update_info_t</span></a><span class="pun">;</span>

<span class="kwd">extern</span> <span class="str">&quot;C&quot;</span>
<span class="pun">{</span>
<span class="pun">}</span>
</code></pre>

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
