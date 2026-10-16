---
name: translate-docs
description: Bring the AI-maintained translations of the Velopack docs (i18n/<locale>/) back in sync with the English source in docs/. Finds stale pages via the content-hash manifest, fans out one translator subagent per stale page, updates the nav/sidebar labels, validates, and re-stamps the manifest. Use when asked to update, refresh, sync or fix the translations, or after editing English docs.
argument-hint: "[locale] [page ...] [all]"
---

# Translate docs

The English docs under `docs/` are the source of truth. Each locale under `i18n/<locale>/`
is a translation that we maintain by running this skill periodically. Nothing translates
automatically in CI.

Bookkeeping is done by `scripts/i18n.mjs` (config: `scripts/i18n.config.json`). Its manifest
`i18n/translation-manifest.json` records, per locale and page, the **git blob id of the
English source the translation reflects**, so `git diff <oldBlob> <newBlob>` shows exactly
which English changes still have to be carried over. Never edit the manifest by hand.

## Arguments

`$ARGUMENTS` may contain, in any order:
- a locale id (e.g. `es`) — limit the run to that locale (default: all configured locales);
- one or more pages (`packaging/bootstrapping.mdx`, `docs/...` or `i18n/...` paths) — also
  review these even if their hashes match (e.g. to fix a translation someone reported);
- `all` — review every page of the selected locale(s), not just stale ones. This is a
  large run (one subagent per page); confirm with the user before starting it.

## Procedure

Run every command from the repository root.

### 1. Preflight

- If `node_modules/` is missing, run `npm ci` (the UI-label check needs Docusaurus).
- Run `git status --short docs/ i18n/`. Uncommitted English edits are fine (the script
  stores those blobs locally), but uncommitted changes under `i18n/` may be someone's
  in-progress work: tell the user and ask before overwriting those files.

### 2. Find what's stale

```
node scripts/i18n.mjs status --json [--locale <id>]
```

This takes about a minute (it runs `docusaurus write-translations` to get the English
nav/sidebar labels). For each locale it returns:

- `docs[]` — pages needing work, each with a `status`:
  - `changed`: the English changed since the translation was last synced. `diffCommand`
    (when `oldBlobAvailable`) shows the English diff to carry over.
  - `missing`: no translation yet — translate from scratch.
  - `untracked`: a translation exists but was never stamped — review it in full against
    the current English.
  - `invalid`: hashes match but `scripts/i18n.mjs check` found structural errors
    (`checkErrors`), e.g. a dropped heading or a mangled code block. Fix them.
  Any page may also carry `checkErrors` that the translator must resolve.
- `orphaned[]` — translations whose English page no longer exists.
- `ui[]` — nav/sidebar label files with `added` / `changed` / `removed` keys.

Add any pages named in the arguments (or every page for `all`) with status `review`.

Summarize the result for the user in a short table (locale, page, status). If nothing is
stale, say so and stop.

### 3. Orphans and renames

For each orphaned translation, check `git log --diff-filter=R --name-status -- docs/<page>`
(or the recent history) to see whether the English page was renamed. If a `missing` page is
its new name, pass the orphan path to that page's translator as a starting point (it can
reuse the existing translation instead of starting from scratch). Delete the orphaned
translation file once it's no longer needed (after its translator finishes, if it was
used as a starting point).

### 4. Fan out translators

Launch **one subagent per (locale, page)** with the Agent tool
(`subagent_type: "general-purpose"`), all in a single message so they run concurrently.
If there are more than 12, launch them in waves of 12. Use this prompt, filling in the
placeholders from the status JSON:

```
You are updating the <Language> (<locale>) translation of one page of the Velopack docs.

First read .claude/skills/translate-docs/translator-brief.md and follow it exactly.

Your page:
- Status: <status>
- English source (current): <source>
- Translation to edit: <target>
- English changes since the last sync: run `<diffCommand>`   (omit this line if not "changed" or no diff available)
- Old English text the translation was based on: `git show <oldBlob>`   (only when available)
- Structural errors to fix: <checkErrors>   (omit if none)
- Starting point from a renamed page: <orphan target>   (omit if none)

Edit only <target>. Do not run `scripts/i18n.mjs update` and do not touch any other file.
When done, run `node scripts/i18n.mjs check --locale <locale> <page>` and fix every error.
Reply with: DONE or FAILED, a 1-3 sentence summary of what you changed, and any
English-source problems or translation judgment calls the maintainer should know about.
```

While the subagents run, handle the UI labels (step 5) yourself.

### 5. Nav and sidebar labels

For each stale `ui[]` entry, edit `i18n/<locale>/<file>` (the `target`) directly, creating
it if it doesn't exist yet (new locale). The file is a JSON object of
`{ "<key>": { "message": "...", "description": "..." } }`:

- `added`: add the key with a translated `message` and the English `description` copied
  verbatim (keep the file's existing key order; append new keys next to their siblings).
- `changed`: re-translate `message` from the new English text.
- `removed`: delete the key if it's present.

Keep proper nouns and technology names as-is (Velopack, Flow, Blog, C#, C / C++,
JavaScript, Python, Rust), and follow the language conventions in `translator-brief.md`
and the terminology already used by the locale's pages and labels. Labels are short — prefer the conventional UI wording in the target
language.

### 6. Validate

When all subagents have reported:

1. Read each report. Note any FAILED pages and any flagged concerns.
2. Run `node scripts/i18n.mjs check --locale <locale>` over the whole locale. Fix (or send
   back to a subagent) any errors on pages touched in this run.
3. Spot-check: open one or two of the larger diffs (`git diff -- i18n/`) and confirm the
   changes are limited to what the English diff implies (plus genuine fixes), and that
   no English was left untranslated in edited passages.

### 7. Re-stamp the manifest

Stamp only the pages that were successfully updated and pass `check`:

```
node scripts/i18n.mjs update --locale <locale> [--ui] <page> <page> ...
```

Add `--ui` if you updated nav/sidebar labels in step 5 (it snapshots the current English
labels; it refuses if a baseline key is still missing from the locale file). Stamping also
drops manifest entries for deleted English pages. Then run
`node scripts/i18n.mjs status --locale <locale>` to confirm only intentionally skipped
pages remain.

### 8. Build check and report

Run `npx docusaurus build --locale <locale>` (several minutes; run it in the background).
`onBrokenLinks: 'throw'` applies to translated pages too, so a broken MDX tag or link
fails here. Fix any failure, then re-run `check`/`update` for the affected pages.

Finish with a short report: pages updated per locale, labels changed, anything skipped or
failed (and why), and concerns raised by the translators. Do not commit unless the user
asks; when they do, commit `i18n/` (including the manifest) together.
