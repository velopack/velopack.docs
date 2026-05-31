#!/usr/bin/env node
// AI translation engine for the Velopack docs.
//
// Single source of truth for both the initial translation pass and ongoing
// maintenance. Reads scripts/translate.config.json, detects which English sources have
// changed since the last run (via a sha256 manifest), and (re)translates only those into
// i18n/<locale>/...
//
// Translation runs through the Claude CLI (`claude -p`) — one path everywhere. Locally it
// uses your Claude subscription (OAuth/keychain); in CI, set ANTHROPIC_API_KEY in the
// environment and the CLI picks it up automatically. No code branching, no API key needed
// for local runs.
//
// Usage:
//   node scripts/translate.mjs [--locale es] [--force] [--dry-run]
//
// Env:
//   TRANSLATE_MODEL  optional  model id/alias (default: claude-sonnet-4-6)
//   CLAUDE_BIN       optional  path to the Claude CLI (default: claude)
//   ANTHROPIC_API_KEY  optional  honored by the CLI itself when set (e.g. in CI)

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync, rmSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const MODEL = process.env.TRANSLATE_MODEL || 'claude-sonnet-4-6';
const CLAUDE_BIN = process.env.CLAUDE_BIN || 'claude';

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const DRY_RUN = args.includes('--dry-run');
const localeArgIdx = args.indexOf('--locale');
const localeFilter = localeArgIdx !== -1 ? args[localeArgIdx + 1] : null;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function log(...m) { console.log(...m); }
function readJson(p) { return JSON.parse(readFileSync(p, 'utf8')); }
function sha256(s) { return createHash('sha256').update(s, 'utf8').digest('hex'); }

function writeFileEnsured(p, content) {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content, 'utf8');
}

// Recursively walk a directory and return file paths relative to `base`.
function walk(base, dir = base, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(base, full, out);
    else out.push(relative(base, full));
  }
  return out;
}

// Minimal glob matcher supporting `**`, `*`, and literal segments.
function globToRegExp(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        // `**` — match across path separators
        re += '.*';
        i++;
        if (glob[i + 1] === '/') i++; // consume trailing slash of `**/`
      } else {
        re += '[^/]*';
      }
    } else if ('.+^${}()|[]\\'.includes(c)) {
      re += '\\' + c;
    } else {
      re += c;
    }
  }
  return new RegExp('^' + re + '$');
}

function matchesAny(relPath, globs) {
  return globs.some((g) => globToRegExp(g).test(relPath));
}

// ---------------------------------------------------------------------------
// Translation — via the Claude CLI (`claude -p`)
// ---------------------------------------------------------------------------
// One path everywhere. Locally this uses your Claude subscription (OAuth/keychain); in CI,
// set ANTHROPIC_API_KEY in the environment and the CLI picks it up automatically. We fully
// override the system prompt and disable all tools, so each call is a clean, deterministic
// text transform (no tool use, no extra context). NOTE: never pass --bare — it restricts
// auth to ANTHROPIC_API_KEY/apiKeyHelper and would break the local subscription path.
function translate(system, userText) {
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = spawnSync(
      CLAUDE_BIN,
      ['-p', '--model', MODEL, '--system-prompt', system, '--tools', '', '--output-format', 'text'],
      { input: userText, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    );
    if (res.error) {
      if (res.error.code === 'ENOENT') {
        throw Object.assign(
          new Error(`Claude CLI not found (looked for "${CLAUDE_BIN}"). Install it or set CLAUDE_BIN to its path.`),
          { fatal: true },
        );
      }
      throw res.error;
    }
    if (res.status === 0) {
      let text = (res.stdout || '').replace(/\r/g, '');
      // Defensive: strip a stray whole-file code fence if the model wrapped its output.
      const fence = text.match(/^\s*```[a-zA-Z]*\n([\s\S]*)\n```\s*$/);
      if (fence) text = fence[1];
      text = text.replace(/\s+$/, '');
      if (text) return text;
      lastErr = new Error('empty response from Claude CLI');
    } else {
      lastErr = new Error(`claude -p exited ${res.status}: ${(res.stderr || '').trim() || '(no stderr)'}`);
    }
    const backoff = 1000 * 2 ** (attempt - 1);
    log(`  ! attempt ${attempt} failed (${lastErr.message}); retrying in ${backoff}ms`);
    spawnSync('sleep', [String(backoff / 1000)]);
  }
  throw lastErr;
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------
function docsSystemPrompt(languageName) {
  return `You are a professional technical translator translating the Velopack documentation from English into ${languageName}.

Velopack is an installation and auto-update framework for cross-platform desktop applications. The docs are written in MDX (Markdown + JSX).

Translate ONLY natural-language prose into ${languageName}. Output the translated file and NOTHING else — no commentary, no code fences wrapping the whole file, no explanations.

TRANSLATE:
- Body prose, paragraphs, and list item text
- Headings (the text after #, ##, etc.)
- Table cell text (but keep the table structure and alignment markers)
- Image alt text (the text inside the square brackets of ![alt](url))
- Link display text (the text inside [these brackets](...) — but NOT the URL)
- Admonition body text (inside :::tip / :::note / :::warning blocks), but keep the ::: markers and the type keyword (tip, note, warning, info, caution, danger) in English
- In frontmatter (the --- block at the top): translate ONLY the VALUES of \`title\`, \`sidebar_label\`, and \`description\`. Leave every other key and value exactly as-is.

NEVER TRANSLATE / NEVER MODIFY (copy verbatim):
- Frontmatter keys, and any frontmatter values other than title/sidebar_label/description
- Fenced code blocks (\`\`\` ... \`\`\`) and their contents — including comments inside code
- Inline code spans (text inside backticks)
- \`import\` and \`export\` statement lines
- JSX/HTML tags, their attributes, prop names and prop values: e.g. <FancyStep step={1}>, <DocCardList items={...}>, <AppliesTo all />, <FlowLink text="Flow" />, <TabItem value="x" label="...">, <br/>, <Tabs>. (NOTE: the \`label\` prop value inside JSX may be user-facing — leave it in English to be safe; do not translate prop values.)
- URLs and paths in links and src/href attributes
- Markdown anchor ids / heading ids like {#some-anchor}
- HTML entities and self-closing tags
- Velopack product and CLI terminology, keep EXACTLY as written in English: Velopack, vpk, Squirrel, Squirrel.Windows, ClickOnce, Velopack Flow, and any command names or flags (e.g. \`pack\`, \`download\`, \`--channel\`).

Preserve all whitespace, blank lines, indentation, and the overall structure exactly. The output must remain valid MDX that renders identically except for the translated prose.`;
}

function uiSystemPrompt(languageName) {
  return `You are a professional technical translator translating UI labels for the Velopack documentation website (navbar items and sidebar category labels) from English into ${languageName}.

You will receive a JSON object. Each top-level key maps to an object with a "message" field (and maybe a "description").

Rules:
- Translate ONLY the value of each "message" field into ${languageName}.
- Do NOT translate or alter the JSON keys, and copy any "description" fields verbatim.
- Keep proper nouns and technology/language names exactly as written: Velopack, vpk, Squirrel, ClickOnce, Velopack Flow, Flow, Blog, C#, C / C++, JavaScript, Python, Rust.
- Preserve ICU placeholders exactly (e.g. {count}).
- Output ONLY valid JSON with the same keys and structure. No commentary, no code fences.`;
}

// ---------------------------------------------------------------------------
// Doc translation
// ---------------------------------------------------------------------------
function collectDocSources(cfg) {
  const sourceDir = join(ROOT, cfg.docs.sourceDir);
  const all = walk(sourceDir).map((p) => p.split('\\').join('/'));
  return all.filter(
    (rel) =>
      matchesAny(rel, cfg.docs.include) && !matchesAny(rel, cfg.docs.exclude),
  );
}

// Translate every stale guide page for a single locale. Staleness is driven entirely by
// the English source: a page is (re)translated when its source hash differs from the
// manifest (the English changed) OR the target is missing (e.g. a new locale). The manifest
// stores only English hashes — it is not mutated here; main() rewrites it after all locales
// are in sync, so the same `manifest` snapshot governs every locale in this run.
async function translateDocs(cfg, locale, languageName, manifest) {
  const sourceDir = join(ROOT, cfg.docs.sourceDir);
  const sources = collectDocSources(cfg);
  let translated = 0;
  let skipped = 0;

  for (const relPath of sources) {
    const srcPath = join(sourceDir, relPath);
    const content = readFileSync(srcPath, 'utf8');
    const hash = sha256(content);
    const targetRel = cfg.docs.targetTemplate
      .replace('{locale}', locale)
      .replace('{relPath}', relPath);
    const targetPath = join(ROOT, targetRel);

    const upToDate = !FORCE && manifest[relPath] === hash && existsSync(targetPath);
    if (upToDate) {
      skipped++;
      continue;
    }

    log(`  → ${relPath}`);
    if (DRY_RUN) {
      translated++;
      continue;
    }
    const out = await translate(docsSystemPrompt(languageName), content);
    writeFileEnsured(targetPath, out.endsWith('\n') ? out : out + '\n');
    translated++;
  }

  log(`  docs: ${translated} translated, ${skipped} up-to-date`);
  return { translated, skipped };
}

// ---------------------------------------------------------------------------
// UI label translation (navbar + sidebar categories)
// ---------------------------------------------------------------------------
// These live in JSON files produced by `docusaurus write-translations`. Unlike the doc
// pages, every key here is *our own* string (Docusaurus never translates navbar/sidebar
// labels), so the rule is simply: translate any key whose message is still the English
// default. We compare against the English baseline (i18n/en/...), so existing translations
// are never re-translated (no drift) and new/renamed labels are picked up automatically.
// Re-translation is gated on a hash of the pruned English baseline, so it only runs when a
// label actually changed in docusaurus.config.ts / sidebars.ts — not on every push.

function pruneUiKeys(json, entry) {
  const drop = entry.dropKeyPrefixes || [];
  const keep = new Set(entry.keepKeys || []);
  for (const k of Object.keys(json)) {
    if (keep.has(k)) continue;
    if (drop.some((p) => k.startsWith(p))) delete json[k];
  }
  return json;
}

async function translateUi(cfg, locale, languageName, manifest) {
  if (!Array.isArray(cfg.ui) || cfg.ui.length === 0) return;
  const defaultLocale = cfg.defaultLocale || 'en';
  const uiManifest = (manifest.__ui ||= {});
  let updated = 0;
  let skipped = 0;

  for (const entry of cfg.ui) {
    const localeRel = entry.file.replace('{locale}', locale);
    const localePath = join(ROOT, localeRel);
    if (!existsSync(localePath)) {
      log(`  (skip ${localeRel} — not found; run i18n:scaffold first)`);
      continue;
    }
    // UI diffing needs the English baseline (produced by `docusaurus write-translations
    // --locale <defaultLocale>`, which CI / `i18n:scaffold` runs first). Without it we can't
    // tell which labels are untranslated, so skip UI entirely rather than corrupt anything.
    const enPath = join(ROOT, entry.file.replace('{locale}', defaultLocale));
    if (!existsSync(enPath)) {
      log(`  (skip ${localeRel} — no English baseline; run i18n:scaffold first)`);
      continue;
    }

    // Prune keys we don't own (e.g. auto-generated reference sidebar categories) so the
    // committed file stays small and doesn't churn when the reference regenerates.
    const json = pruneUiKeys(JSON.parse(readFileSync(localePath, 'utf8')), entry);
    const enJson = pruneUiKeys(JSON.parse(readFileSync(enPath, 'utf8')), entry);
    const enHash = sha256(JSON.stringify(enJson));

    // A key needs translating when its message still equals the English baseline.
    const untranslated = Object.keys(json).filter(
      (k) =>
        json[k] &&
        typeof json[k].message === 'string' &&
        enJson[k] &&
        enJson[k].message === json[k].message,
    );

    // Gate purely on the English-baseline hash. If the English labels are unchanged since
    // the last run, there's nothing to (re)translate — any keys still equal to English are
    // intentionally so (proper nouns like Blog, Flow, C#, Python). Only a label add/rename/
    // remove in docusaurus.config.ts / sidebars.ts changes the hash and triggers work.
    if (!FORCE && uiManifest[localeRel] === enHash) {
      // Still write the pruned file so any scaffold-added keys we don't own are removed.
      if (!DRY_RUN) writeFileSync(localePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
      skipped++;
      continue;
    }

    if (untranslated.length > 0) {
      log(`  → ${localeRel} (${untranslated.length} label${untranslated.length > 1 ? 's' : ''})`);
      if (!DRY_RUN) {
        const subset = {};
        for (const k of untranslated) subset[k] = json[k];
        const out = await translate(uiSystemPrompt(languageName), JSON.stringify(subset, null, 2));
        let parsed;
        try {
          parsed = JSON.parse(out);
        } catch {
          const m = out.match(/\{[\s\S]*\}/);
          if (!m) throw new Error(`UI translation for ${localeRel} did not return valid JSON`);
          parsed = JSON.parse(m[0]);
        }
        for (const k of untranslated) {
          if (parsed[k] && typeof parsed[k].message === 'string') json[k].message = parsed[k].message;
        }
      }
      updated++;
    } else {
      skipped++;
    }

    if (!DRY_RUN) {
      writeFileSync(localePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
      uiManifest[localeRel] = enHash;
    }
  }

  log(`  ui: ${updated} updated, ${skipped} up-to-date`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const cfg = readJson(join(__dirname, 'translate.config.json'));
  const manifestPath = join(ROOT, cfg.manifest);
  const manifest = existsSync(manifestPath) ? readJson(manifestPath) : {};

  const locales = (localeFilter ? [localeFilter] : cfg.locales).filter((l) =>
    cfg.locales.includes(l),
  );
  if (locales.length === 0) {
    log('No matching locales to translate.');
    return;
  }

  log(`Claude CLI: ${CLAUDE_BIN}`);
  log(`Model: ${MODEL}`);
  log(`Locales: ${locales.join(', ')}${FORCE ? ' (force)' : ''}${DRY_RUN ? ' (dry-run)' : ''}`);

  for (const locale of locales) {
    const languageName = (cfg.localeLabels && cfg.localeLabels[locale]) || locale;
    log(`\n[${locale}] ${languageName}`);
    await translateDocs(cfg, locale, languageName, manifest);
    await translateUi(cfg, locale, languageName, manifest);
  }

  if (!DRY_RUN) {
    // Rebuild the manifest from the current English sources. The hash is of the English
    // file only — when it changes, every locale for that page is considered stale. A page's
    // hash is recorded only once *all* configured locales have it translated, so a missing
    // (e.g. newly added) locale is still picked up next run. Deleted sources drop out.
    // The `__ui` section (maintained by translateUi) is carried over unchanged.
    const sourceDir = join(ROOT, cfg.docs.sourceDir);
    const newManifest = {};
    for (const relPath of collectDocSources(cfg)) {
      const hash = sha256(readFileSync(join(sourceDir, relPath), 'utf8'));
      const allLocalesPresent = cfg.locales.every((l) =>
        existsSync(
          join(
            ROOT,
            cfg.docs.targetTemplate.replace('{locale}', l).replace('{relPath}', relPath),
          ),
        ),
      );
      if (allLocalesPresent) newManifest[relPath] = hash;
      else if (manifest[relPath] !== undefined) newManifest[relPath] = manifest[relPath];
    }
    if (manifest.__ui) newManifest.__ui = manifest.__ui;
    writeFileEnsured(manifestPath, JSON.stringify(newManifest, null, 2) + '\n');
    log(`\nManifest written to ${cfg.manifest}`);

    // Clean up transient scaffolding: the English baseline used for UI diffing, and the
    // theme/blog JSON that `write-translations` emits but we don't own (see translate.config).
    for (const junk of cfg.cleanupAfter || []) {
      const p = join(ROOT, junk);
      if (existsSync(p)) rmSync(p, { recursive: true, force: true });
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
