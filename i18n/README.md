# Translations (`i18n/`)

This directory holds the **AI-maintained** translations of the Velopack guide docs.
**Do not hand-edit files in here** — edit the English source under `docs/`, and let the
translation pipeline regenerate the localized content. Manual edits will be overwritten
the next time a source page changes.

## What's translated

| Content | Translated? | Where |
|---|---|---|
| Guide pages (44 `.mdx` under `docs/`, minus `docs/reference/**`) | ✅ AI pipeline | `i18n/<locale>/docusaurus-plugin-content-docs/current/` |
| Top nav + sidebar category labels | ✅ Hand-maintained | `.../docusaurus-theme-classic/navbar.json`, `.../docusaurus-plugin-content-docs/current.json` |
| Generic theme strings (search box, buttons, pagination) | ❌ Not in scope | Docusaurus's bundled locale translations apply; anything without one falls back to English |
| API reference (auto-generated, `docs/reference/**`) | ❌ No (English fallback) | — |
| Blog | ❌ No (English) | — |

The AI pipeline translates **our Markdown guides**. The top-nav and sidebar-category labels
are small and config-driven, so they're hand-maintained in two small JSON files (see
[`AGENTS.md`](../AGENTS.md) → "Localizing nav & sidebar"). Generic theme chrome (`code.json`)
is intentionally left to Docusaurus's own bundled translations — owning it would mean
overriding Docusaurus on every upgrade.

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

`translation-manifest.json` maps `locale → { relPath → sha256(English source) }`. It is how
the pipeline knows what's stale. It is committed and maintained by the script — don't edit
it by hand.
