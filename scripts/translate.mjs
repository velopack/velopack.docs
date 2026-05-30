#!/usr/bin/env node
// AI translation engine for the Velopack docs.
//
// Single source of truth for both the initial translation pass and ongoing
// maintenance. Dependency-free (Node 18+, built-in fetch). Reads
// scripts/translate.config.json, detects which English sources have changed
// since the last run (via a sha256 manifest), and (re)translates only those
// into i18n/<locale>/...
//
// Usage:
//   ANTHROPIC_API_KEY=sk-... node scripts/translate.mjs [--locale es] [--force] [--dry-run]
//
// Env:
//   ANTHROPIC_API_KEY  required  Anthropic API key
//   TRANSLATE_MODEL    optional  model id (default: claude-sonnet-4-6)

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const MODEL = process.env.TRANSLATE_MODEL || 'claude-sonnet-4-6';
const API_KEY = process.env.ANTHROPIC_API_KEY;
const API_URL = 'https://api.anthropic.com/v1/messages';
const API_VERSION = '2023-06-01';
const MAX_TOKENS = 16000;

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
// Anthropic API
// ---------------------------------------------------------------------------
async function callAnthropic(system, userText) {
  if (!API_KEY) throw new Error('ANTHROPIC_API_KEY is not set');
  let lastErr;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': API_VERSION,
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system,
          messages: [{ role: 'user', content: userText }],
        }),
      });
      if (res.status === 429 || res.status >= 500) {
        throw new Error(`retryable HTTP ${res.status}: ${await res.text()}`);
      }
      if (!res.ok) {
        throw Object.assign(new Error(`HTTP ${res.status}: ${await res.text()}`), { fatal: true });
      }
      const data = await res.json();
      const text = (data.content || [])
        .filter((b) => b.type === 'text')
        .map((b) => b.text)
        .join('');
      if (!text) throw new Error('empty response from API');
      return text;
    } catch (err) {
      if (err.fatal) throw err;
      lastErr = err;
      const backoff = 1000 * 2 ** (attempt - 1);
      log(`  ! attempt ${attempt} failed (${err.message}); retrying in ${backoff}ms`);
      await new Promise((r) => setTimeout(r, backoff));
    }
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
    const out = await callAnthropic(docsSystemPrompt(languageName), content);
    writeFileEnsured(targetPath, out.endsWith('\n') ? out : out + '\n');
    translated++;
  }

  log(`  docs: ${translated} translated, ${skipped} up-to-date`);
  return { translated, skipped };
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

  log(`Model: ${MODEL}`);
  log(`Locales: ${locales.join(', ')}${FORCE ? ' (force)' : ''}${DRY_RUN ? ' (dry-run)' : ''}`);

  for (const locale of locales) {
    const languageName = (cfg.localeLabels && cfg.localeLabels[locale]) || locale;
    log(`\n[${locale}] ${languageName}`);
    await translateDocs(cfg, locale, languageName, manifest);
  }

  if (!DRY_RUN) {
    // Rebuild the manifest from the current English sources. The hash is of the English
    // file only — when it changes, every locale for that page is considered stale. A page's
    // hash is recorded only once *all* configured locales have it translated, so a missing
    // (e.g. newly added) locale is still picked up next run. Deleted sources drop out.
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
    writeFileEnsured(manifestPath, JSON.stringify(newManifest, null, 2) + '\n');
    log(`\nManifest written to ${cfg.manifest}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
