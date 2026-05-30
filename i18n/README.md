# Translations (`i18n/`)

This directory holds the **AI-maintained** translations of the Velopack guide docs.
**Do not hand-edit files in here** — edit the English source under `docs/`, and let the
translation pipeline regenerate the localized content. Manual edits will be overwritten
the next time a source page changes.

## What's translated

| Content | Translated? | Where |
|---|---|---|
| Guide pages (44 `.mdx` under `docs/`, minus `docs/reference/**`) | ✅ AI pipeline | `i18n/<locale>/docusaurus-plugin-content-docs/current/` |
| Top nav + sidebar category labels | ✅ AI pipeline | `.../docusaurus-theme-classic/navbar.json`, `.../docusaurus-plugin-content-docs/current.json` |
| Generic theme strings (search box, buttons, pagination) | ❌ Not in scope | Docusaurus's bundled locale translations apply; anything without one falls back to English |
| API reference (auto-generated, `docs/reference/**`) | ❌ No (English fallback) | — |
| Blog | ❌ No (English) | — |

The AI pipeline translates **our Markdown guides** plus the **nav/sidebar labels** (two
small JSON files, re-translated only when a label changes in `docusaurus.config.ts` /
`sidebars.ts` — see [`AGENTS.md`](../AGENTS.md) → "Localizing nav & sidebar"). Generic theme
chrome (`code.json`) is intentionally left to Docusaurus's own bundled translations — owning
it would mean overriding Docusaurus on every upgrade.

Reference docs are intentionally left untranslated: there are ~569 of them, they're
regenerated daily, and Docusaurus automatically falls back to the English page when a
localized version is missing. This is a deliberate choice, not an oversight.

## How it works

1. `scripts/translate.config.json` declares the locales and the source globs.
2. `scripts/translate.mjs` (dependency-free Node 18+, uses the Anthropic API) hashes each
   English source and compares it to `i18n/translation-manifest.json`. Only pages whose
   source changed (or whose translation is missing) are re-translated, then written to
   `i18n/<locale>/docusaurus-plugin-content-docs/current/<relPath>`.
3. The GitHub Action `.github/workflows/translate.yml` runs on every push to `master` that
   touches `docs/**`, runs the script, and commits the results — then dispatches the deploy
   workflow.

See the **i18n / Translations** section of [`AGENTS.md`](../AGENTS.md) for the full runbook
and instructions for adding a new language.

## Manifest

`translation-manifest.json` is a flat map `relPath → sha256(English source)` for the guide
pages (the hash is of the **English** file, so when it changes every locale for that page is
stale), plus a `__ui` section mapping each nav/sidebar JSON file to a hash of its pruned
English baseline (so those re-translate only when a label changes). It is how the pipeline
knows what's stale — committed and maintained by the script; don't edit it by hand.
