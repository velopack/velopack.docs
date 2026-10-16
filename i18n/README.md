# Translations (`i18n/`)

This directory holds the **AI-maintained** translations of the Velopack guide docs.
Edit the English source under `docs/`; the translations are brought up to date by running
the `translate-docs` Claude skill (`/translate-docs` in Claude Code) from time to time.
Nothing translates automatically in CI.

## What's translated

| Content | Translated? | Where |
|---|---|---|
| Guide pages (`docs/`, minus `docs/reference/**`) | ✅ `translate-docs` skill | `i18n/<locale>/docusaurus-plugin-content-docs/current/` |
| Top nav + sidebar category labels | ✅ `translate-docs` skill | `.../docusaurus-theme-classic/navbar.json`, `.../docusaurus-plugin-content-docs/current.json` |
| Generic theme strings (search box, buttons, pagination) | ❌ Not in scope | Docusaurus's bundled locale translations apply; anything without one falls back to English |
| API reference (auto-generated, `docs/reference/**`) | ❌ No (English fallback) | — |
| Blog | ❌ No (English) | — |

Reference docs are intentionally left untranslated: there are ~569 of them, they're
regenerated daily, and Docusaurus automatically falls back to the English page when a
localized version is missing.

## Knowing what's stale

```
npm run i18n:status            # which translations are behind, and the English diff for each
npm run i18n:check             # structural sanity check of translations vs. English
npm run i18n:update -- <page>  # mark a page's translation as in sync (the skill does this)
```

`translation-manifest.json` records, per locale and page, the **git blob id** of the English
source the translation reflects (so `git diff <old> <new>` shows exactly what changed since),
plus a snapshot of the English nav/sidebar labels. It's maintained by `scripts/i18n.mjs`;
don't edit it by hand.

See the **i18n / Translations** section of [`AGENTS.md`](../AGENTS.md) for the full runbook
and instructions for adding a new language.
