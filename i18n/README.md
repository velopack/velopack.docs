# Translations (`i18n/`)

This directory holds the **AI-maintained** translations of the Velopack guide docs.
**Do not hand-edit files in here** — edit the English source under `docs/`, and let the
translation pipeline regenerate the localized content. Manual edits will be overwritten
the next time a source page changes.

## What's translated

| Content | Translated? | Where |
|---|---|---|
| Guide pages (44 `.mdx` under `docs/`, minus `docs/reference/**`) | ✅ Yes | `i18n/<locale>/docusaurus-plugin-content-docs/current/` |
| Theme / UI strings (navbar, search box, sidebar/category labels, buttons) | ❌ Not in scope | Docusaurus's own bundled locale translations apply; anything without one falls back to English |
| API reference (auto-generated, `docs/reference/**`) | ❌ No (English fallback) | — |
| Blog | ❌ No (English) | — |

We translate **only our own Markdown content**. Theme/UI strings are intentionally out of
scope: Docusaurus already ships translations for most of them, and owning the rest would
mean maintaining strings that aren't ours (and overriding Docusaurus on every upgrade). If
specific UI strings need translating later, that can be added to the pipeline as a follow-up.

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
