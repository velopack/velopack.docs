#!/usr/bin/env node
// Translation bookkeeping for the Velopack docs.
//
// This script does NOT translate anything. Translations are produced by the
// `translate-docs` Claude skill (.claude/skills/translate-docs), which you run locally
// whenever you want to bring the translations up to date. This script only answers
// "which translations are stale, and what changed?" and records when they're back in sync.
//
// The manifest (i18n/translation-manifest.json) records, per locale and per page, the git
// blob id of the English source the translation currently reflects. Because it's a git blob
// id (not a plain sha256), the exact English text the translation was made from can be
// recovered with `git show <blob>` and diffed against the current source with
// `git diff <old> <new>`. It's also line-ending agnostic (git normalizes CRLF on Windows).
// For nav/sidebar labels the manifest stores the English label text itself (tiny), so
// added/changed/removed labels can be reported precisely.
//
// Usage:
//   node scripts/i18n.mjs status [--locale es] [--json] [--no-ui]
//       Report stale translations. UI labels need a Docusaurus `write-translations` run to
//       produce the English baseline (~1 min); pass --no-ui to skip it.
//
//   node scripts/i18n.mjs check [--locale es] [page ...]
//       Structural sanity check of translated pages against their English source (code
//       blocks, imports, JSX tags, heading ids, admonitions, links, ...). Exits 1 on errors.
//
//   node scripts/i18n.mjs update [--locale es] [--ui | --no-ui] [page ...]
//       Mark translations as in sync with the current English source. With no pages, every
//       page that has a translation is stamped and the UI labels are snapshotted too (unless
//       --no-ui). With pages, only those are stamped (add --ui to snapshot UI labels too).
//
// A "page" can be given as `packaging/bootstrapping.mdx`, `docs/packaging/bootstrapping.mdx`
// or the translated path under i18n/.

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const cfg = JSON.parse(readFileSync(join(__dirname, 'i18n.config.json'), 'utf8'));
const MANIFEST_PATH = join(ROOT, cfg.manifest);

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
const command = argv[0];
const flags = new Set();
const positional = [];
let localeFilter = null;
for (let i = 1; i < argv.length; i++) {
  if (argv[i] === '--locale') localeFilter = argv[++i];
  else if (argv[i].startsWith('--')) flags.add(argv[i]);
  else positional.push(argv[i]);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const toPosix = (p) => p.split('\\').join('/');
const log = (...m) => console.log(...m);

function fail(msg) {
  console.error(`error: ${msg}`);
  process.exit(2);
}

function git(args, input) {
  const res = spawnSync('git', args, { cwd: ROOT, input, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  if (res.error) throw res.error;
  return res;
}

function walk(base, dir = base, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(base, full, out);
    else out.push(toPosix(relative(base, full)));
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
        re += '.*';
        i++;
        if (glob[i + 1] === '/') i++;
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

const matchesAny = (rel, globs) => globs.some((g) => globToRegExp(g).test(rel));

const sourcePath = (rel) => toPosix(join(cfg.docs.sourceDir, rel));
const targetPath = (locale, rel) => cfg.docs.targetTemplate.replace('{locale}', locale).replace('{relPath}', rel);

function collectSources() {
  return walk(join(ROOT, cfg.docs.sourceDir))
    .filter((rel) => matchesAny(rel, cfg.docs.include) && !matchesAny(rel, cfg.docs.exclude))
    .sort();
}

function collectTargets(locale) {
  const dir = join(ROOT, targetPath(locale, ''));
  if (!existsSync(dir)) return [];
  return walk(dir).filter((rel) => matchesAny(rel, cfg.docs.include)).sort();
}

// git blob ids for a list of repo-relative paths, in one git call. With `write`, the blobs
// are also stored in the local object database so `git show <blob>` works later even if the
// English edit was never committed in exactly that state.
function blobIds(paths, write = false) {
  if (paths.length === 0) return [];
  const res = git(['hash-object', ...(write ? ['-w'] : []), '--stdin-paths'], paths.join('\n') + '\n');
  if (res.status !== 0) fail(`git hash-object failed: ${res.stderr}`);
  return res.stdout.trim().split(/\r?\n/);
}

const blobExists = (blob) => git(['cat-file', '-e', blob]).status === 0;

function readManifest() {
  return existsSync(MANIFEST_PATH) ? JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) : {};
}

function writeManifest(manifest) {
  // Stable key order so diffs stay readable.
  const sorted = {};
  for (const locale of Object.keys(manifest).sort()) {
    const m = manifest[locale];
    sorted[locale] = { docs: sortKeys(m.docs || {}), ui: {} };
    for (const file of Object.keys(m.ui || {}).sort()) sorted[locale].ui[file] = sortKeys(m.ui[file]);
  }
  mkdirSync(dirname(MANIFEST_PATH), { recursive: true });
  writeFileSync(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + '\n', 'utf8');
}

function sortKeys(obj) {
  const out = {};
  for (const k of Object.keys(obj).sort()) out[k] = obj[k];
  return out;
}

function selectedLocales() {
  if (localeFilter && !cfg.locales.includes(localeFilter)) {
    fail(`unknown locale "${localeFilter}" (configured: ${cfg.locales.join(', ')})`);
  }
  return localeFilter ? [localeFilter] : cfg.locales;
}

const languageName = (locale) => (cfg.localeLabels && cfg.localeLabels[locale]) || locale;

// Normalize a user-supplied page argument to a docs-relative path.
function normalizePage(arg) {
  let p = toPosix(arg).replace(/^\.\//, '');
  const srcPrefix = toPosix(cfg.docs.sourceDir) + '/';
  if (p.startsWith(srcPrefix)) return p.slice(srcPrefix.length);
  for (const locale of cfg.locales) {
    const tgtPrefix = targetPath(locale, '');
    if (p.startsWith(tgtPrefix)) return p.slice(tgtPrefix.length);
  }
  return p;
}

// ---------------------------------------------------------------------------
// UI labels (navbar + sidebar categories)
// ---------------------------------------------------------------------------
// The English labels only exist after Docusaurus has loaded the whole site, so we run
// `docusaurus write-translations --locale <default>` to produce them under i18n/<default>/,
// read what we need, and delete that transient directory again.

function pruneUiKeys(json, entry) {
  const drop = entry.dropKeyPrefixes || [];
  const keep = new Set(entry.keepKeys || []);
  const out = {};
  for (const [k, v] of Object.entries(json)) {
    if (keep.has(k) || !drop.some((p) => k.startsWith(p))) out[k] = v;
  }
  return out;
}

function loadUiBaseline() {
  const defaultLocale = cfg.defaultLocale || 'en';
  const baseDir = join(ROOT, 'i18n', defaultLocale);
  const existed = existsSync(baseDir);
  const bin = join(ROOT, 'node_modules', '@docusaurus', 'core', 'bin', 'docusaurus.mjs');
  if (!existsSync(bin)) fail('Docusaurus is not installed; run `npm ci` first (or pass --no-ui).');

  console.error(`Generating English UI label baseline (docusaurus write-translations --locale ${defaultLocale})...`);
  const res = spawnSync(process.execPath, [bin, 'write-translations', '--locale', defaultLocale], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  try {
    if (res.status !== 0) fail(`docusaurus write-translations failed:\n${res.stdout}\n${res.stderr}`);
    const baseline = {};
    for (const entry of cfg.ui) {
      const p = join(baseDir, entry.file);
      baseline[entry.file] = existsSync(p) ? pruneUiKeys(JSON.parse(readFileSync(p, 'utf8')), entry) : {};
    }
    return baseline;
  } finally {
    if (!existed) rmSync(baseDir, { recursive: true, force: true });
  }
}

function uiStatus(locale, manifest, baseline) {
  const snapshot = manifest[locale]?.ui || {};
  const results = [];
  for (const entry of cfg.ui) {
    const en = baseline[entry.file];
    const snap = snapshot[entry.file] || {};
    const target = toPosix(join('i18n', locale, entry.file));
    const localeJson = existsSync(join(ROOT, target))
      ? pruneUiKeys(JSON.parse(readFileSync(join(ROOT, target), 'utf8')), entry)
      : {};

    const added = [];
    const changed = [];
    for (const [key, { message, description }] of Object.entries(en)) {
      if (!(key in snap) || !(key in localeJson)) {
        added.push({ key, message, description, current: localeJson[key]?.message ?? null });
      } else if (snap[key] !== message) {
        changed.push({ key, oldMessage: snap[key], message, description, current: localeJson[key].message });
      }
    }
    const removed = [...new Set([...Object.keys(snap), ...Object.keys(localeJson)])].filter((k) => !(k in en));

    results.push({ file: entry.file, target, added, changed, removed, upToDate: !added.length && !changed.length && !removed.length });
  }
  return results;
}

// ---------------------------------------------------------------------------
// status
// ---------------------------------------------------------------------------
function cmdStatus() {
  const manifest = readManifest();
  const sources = collectSources();
  // Write the blobs so the printed `git diff <old> <new>` also works for uncommitted English edits.
  const blobs = blobIds(sources.map(sourcePath), true);
  const baseline = flags.has('--no-ui') ? null : loadUiBaseline();

  const report = { locales: [] };
  for (const locale of selectedLocales()) {
    const tracked = manifest[locale]?.docs || {};
    const docs = [];
    sources.forEach((rel, i) => {
      const target = targetPath(locale, rel);
      const newBlob = blobs[i];
      const oldBlob = tracked[rel] || null;
      let status = null;
      if (!existsSync(join(ROOT, target))) status = 'missing';
      else if (!oldBlob) status = 'untracked';
      else if (oldBlob !== newBlob) status = 'changed';
      let checkErrors = [];
      if (status !== 'missing') checkErrors = checkPage(locale, rel).filter((i) => i.level === 'error').map((i) => i.msg);
      if (!status && checkErrors.length) status = 'invalid';
      if (!status) return;
      const item = { page: rel, status, source: sourcePath(rel), target, newBlob };
      if (checkErrors.length) item.checkErrors = checkErrors;
      if (status === 'changed') {
        item.oldBlob = oldBlob;
        item.oldBlobAvailable = blobExists(oldBlob);
        if (item.oldBlobAvailable) item.diffCommand = `git diff ${oldBlob} ${newBlob}`;
      }
      docs.push(item);
    });

    const sourceSet = new Set(sources);
    const orphaned = collectTargets(locale)
      .filter((rel) => !sourceSet.has(rel))
      .map((rel) => ({ page: rel, target: targetPath(locale, rel) }));

    const ui = baseline ? uiStatus(locale, manifest, baseline) : null;
    report.locales.push({ locale, language: languageName(locale), docs, orphaned, ui });
  }

  if (flags.has('--json')) {
    log(JSON.stringify(report, null, 2));
    return;
  }

  for (const l of report.locales) {
    const uiStale = l.ui ? l.ui.filter((u) => !u.upToDate) : [];
    log(`[${l.locale}] ${l.language}: ${l.docs.length} page(s) stale, ${l.orphaned.length} orphaned, ` +
      (l.ui ? `${uiStale.length} UI file(s) stale` : 'UI not checked'));
    for (const d of l.docs) {
      log(`  ${d.status.padEnd(9)} ${d.page}`);
      if (d.status === 'changed') log(`            ${d.diffCommand || `(old English blob ${d.oldBlob} not in this clone; compare full text)`}`);
      if (d.status === 'invalid') for (const e of d.checkErrors) log(`            ${e.split('\n')[0]}`);
    }
    for (const o of l.orphaned) log(`  orphaned  ${o.target}  (no English source)`);
    for (const u of uiStale) {
      log(`  ui        ${u.target}`);
      for (const a of u.added) log(`            + ${a.key}: ${JSON.stringify(a.message)}`);
      for (const c of u.changed) log(`            ~ ${c.key}: ${JSON.stringify(c.oldMessage)} -> ${JSON.stringify(c.message)}`);
      for (const r of u.removed) log(`            - ${r}`);
    }
  }
}

// ---------------------------------------------------------------------------
// check — structural parity between an English page and its translation
// ---------------------------------------------------------------------------
// Translations are free to restructure sentences, so this only compares things that must
// survive translation untouched. Errors are things that would break the page or change its
// meaning (code, imports, components, anchors); warnings are worth a look but can be fine.

const FENCE_RE = /^([ \t]*)(`{3,}|~{3,})(.*)$/;
const TRANSLATABLE_FRONTMATTER = new Set(['title', 'sidebar_label', 'description']);

function analyze(text) {
  text = text.replace(/\r\n/g, '\n');
  const out = {
    frontmatter: {}, codeBlocks: [], imports: [], tags: [], headings: [], headingIds: [], headingSlugs: [],
    admonitions: [], links: [], inlineCode: [],
  };

  let body = text;
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (fm) {
    for (const line of fm[1].split('\n')) {
      const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
      if (m) out.frontmatter[m[1]] = m[2].trim();
    }
    body = text.slice(fm[0].length);
  }

  const prose = [];
  let fence = null;
  for (const line of body.split('\n')) {
    const fm2 = line.match(FENCE_RE);
    if (fence) {
      if (fm2 && fm2[2][0] === fence.ch && fm2[2].length >= fence.len && !fm2[3].trim()) {
        out.codeBlocks.push(fence.lines.join('\n'));
        fence = null;
      } else {
        fence.lines.push(line.replace(/\s+$/, ''));
      }
      continue;
    }
    if (fm2) {
      fence = { ch: fm2[2][0], len: fm2[2].length, lines: [`${fm2[2]}${fm2[3].trim()}`] };
      continue;
    }
    prose.push(line);
  }
  if (fence) out.codeBlocks.push(fence.lines.join('\n') + '\n<unterminated>');

  for (const line of prose) {
    const t = line.trim();
    if (/^(import|export)\s/.test(t)) out.imports.push(t);
    const h = t.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      out.headings.push(h[1].length);
      out.headingSlugs.push(slugify(h[2].replace(/\{#[\w-]+\}\s*$/, '')));
    }
    for (const m of t.matchAll(/\{#([\w-]+)\}/g)) out.headingIds.push(m[1]);
    const ad = t.match(/^(:{3,})(\w*)/);
    if (ad) out.admonitions.push(ad[1] + ad[2]);
  }

  const proseText = prose.join('\n');
  for (const m of proseText.matchAll(/`([^`\n]+)`/g)) out.inlineCode.push(m[1]);
  const noInline = proseText.replace(/`[^`\n]+`/g, '');
  for (const m of noInline.matchAll(/<\/?([A-Za-z][\w.]*)(?=[\s/>])/g)) out.tags.push(m[0].startsWith('</') ? '/' + m[1] : m[1]);
  for (const m of noInline.matchAll(/\]\(\s*<?([^)\s>]+)/g)) out.links.push(m[1]);
  for (const m of noInline.matchAll(/\b(?:href|src|to)=["']([^"']+)["']/g)) out.links.push(m[1]);
  return out;
}

// Approximation of the github-slugger ids Docusaurus generates for headings.
const slugify = (s) => s.trim().toLowerCase().replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, '').replace(/ /g, '-');

function compareSeq(name, a, b, issues, level) {
  if (a.length !== b.length || a.some((x, i) => x !== b[i])) {
    const i = a.findIndex((x, j) => x !== b[j]);
    const at = i === -1 ? Math.min(a.length, b.length) : i;
    issues.push({
      level,
      msg: `${name} differ (en ${a.length}, translation ${b.length}); first difference at #${at + 1}:\n` +
        `      en: ${JSON.stringify(a[at] ?? null)}\n      tr: ${JSON.stringify(b[at] ?? null)}`,
    });
  }
}

function compareMultiset(name, a, b, issues, level) {
  const count = (arr) => arr.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map());
  const ca = count(a);
  const cb = count(b);
  const missing = [...ca].filter(([k, n]) => (cb.get(k) || 0) < n).map(([k]) => k);
  const extra = [...cb].filter(([k, n]) => (ca.get(k) || 0) < n).map(([k]) => k);
  if (missing.length || extra.length) {
    issues.push({
      level,
      msg: `${name} differ` +
        (missing.length ? `\n      only in en: ${missing.map((x) => JSON.stringify(x)).join(', ')}` : '') +
        (extra.length ? `\n      only in translation: ${extra.map((x) => JSON.stringify(x)).join(', ')}` : ''),
    });
  }
}

function checkPage(locale, rel) {
  const target = join(ROOT, targetPath(locale, rel));
  if (!existsSync(target)) return [{ level: 'error', msg: 'translation file is missing' }];
  const en = analyze(readFileSync(join(ROOT, sourcePath(rel)), 'utf8'));
  const tr = analyze(readFileSync(target, 'utf8'));
  const issues = [];

  compareSeq('frontmatter keys', Object.keys(en.frontmatter), Object.keys(tr.frontmatter), issues, 'error');
  for (const [k, v] of Object.entries(en.frontmatter)) {
    if (!TRANSLATABLE_FRONTMATTER.has(k) && k in tr.frontmatter && tr.frontmatter[k] !== v) {
      issues.push({ level: 'error', msg: `frontmatter "${k}" must not change: en ${JSON.stringify(v)}, translation ${JSON.stringify(tr.frontmatter[k])}` });
    }
  }
  compareSeq('fenced code blocks', en.codeBlocks, tr.codeBlocks, issues, 'error');
  compareSeq('import/export lines', en.imports, tr.imports, issues, 'error');
  compareSeq('JSX/HTML tags', en.tags, tr.tags, issues, 'error');
  // Every explicit English id must survive. A translation may additionally pin a heading to
  // the id English auto-generates (so `#anchor` links keep working); anything else is suspect.
  compareSeq('explicit heading ids', en.headingIds, tr.headingIds.filter((id) => en.headingIds.includes(id)), issues, 'error');
  const strayIds = tr.headingIds.filter((id) => !en.headingIds.includes(id) && !en.headingSlugs.includes(id));
  if (strayIds.length) issues.push({ level: 'warning', msg: `heading ids not present in en: ${strayIds.join(', ')}` });
  compareSeq('admonition markers', en.admonitions, tr.admonitions, issues, 'error');
  compareSeq('heading levels', en.headings, tr.headings, issues, 'error');
  compareMultiset('link targets', en.links, tr.links, issues, 'warning');
  compareMultiset('inline code spans', en.inlineCode, tr.inlineCode, issues, 'warning');
  return issues;
}

function cmdCheck() {
  let errors = 0;
  let warnings = 0;
  for (const locale of selectedLocales()) {
    const pages = positional.length ? positional.map(normalizePage) : collectTargets(locale).filter((r) => existsSync(join(ROOT, sourcePath(r))));
    for (const rel of pages) {
      if (!existsSync(join(ROOT, sourcePath(rel)))) {
        log(`[${locale}] ${rel}\n  error: no English source at ${sourcePath(rel)}`);
        errors++;
        continue;
      }
      const issues = checkPage(locale, rel);
      if (!issues.length) continue;
      log(`[${locale}] ${targetPath(locale, rel)}`);
      for (const i of issues) {
        log(`  ${i.level}: ${i.msg}`);
        if (i.level === 'error') errors++;
        else warnings++;
      }
    }
  }
  log(`\n${errors} error(s), ${warnings} warning(s)`);
  if (errors) process.exit(1);
}

// ---------------------------------------------------------------------------
// update — record translations as in sync with the current English source
// ---------------------------------------------------------------------------
function cmdUpdate() {
  const manifest = readManifest();
  const sources = collectSources();
  const sourceSet = new Set(sources);
  const explicit = positional.map(normalizePage);
  for (const rel of explicit) if (!sourceSet.has(rel)) fail(`not a translatable English page: ${rel}`);

  const doUi = flags.has('--ui') || (!explicit.length && !flags.has('--no-ui'));
  const baseline = doUi ? loadUiBaseline() : null;

  for (const locale of selectedLocales()) {
    const m = (manifest[locale] ||= { docs: {}, ui: {} });
    m.docs ||= {};
    m.ui ||= {};

    // Drop entries for English pages that no longer exist.
    for (const rel of Object.keys(m.docs)) if (!sourceSet.has(rel)) delete m.docs[rel];

    const pages = (explicit.length ? explicit : sources).filter((rel) => {
      const ok = existsSync(join(ROOT, targetPath(locale, rel)));
      if (!ok && explicit.length) console.error(`[${locale}] skip ${rel}: no translation at ${targetPath(locale, rel)}`);
      return ok;
    });
    const blobs = blobIds(pages.map(sourcePath), true);
    let changed = 0;
    pages.forEach((rel, i) => {
      if (m.docs[rel] !== blobs[i]) changed++;
      m.docs[rel] = blobs[i];
    });
    log(`[${locale}] stamped ${pages.length} page(s) (${changed} changed)`);
    const broken = pages.filter((rel) => checkPage(locale, rel).some((i) => i.level === 'error'));
    if (broken.length) {
      console.error(`[${locale}] warning: these stamped pages fail \`check\` and will keep showing as invalid:\n  ${broken.join('\n  ')}`);
    }

    if (baseline) {
      for (const entry of cfg.ui) {
        const target = join(ROOT, 'i18n', locale, entry.file);
        const localeJson = existsSync(target) ? JSON.parse(readFileSync(target, 'utf8')) : {};
        const en = baseline[entry.file];
        const missing = Object.keys(en).filter((k) => !(k in localeJson));
        if (missing.length) {
          console.error(`[${locale}] not snapshotting ${entry.file}: missing keys ${missing.join(', ')}`);
          continue;
        }
        m.ui[entry.file] = Object.fromEntries(Object.entries(en).map(([k, v]) => [k, v.message]));
        log(`[${locale}] snapshotted UI labels for ${entry.file}`);
      }
    }
  }
  writeManifest(manifest);
  log(`Manifest written to ${cfg.manifest}`);
}

// ---------------------------------------------------------------------------
switch (command) {
  case 'status': cmdStatus(); break;
  case 'check': cmdCheck(); break;
  case 'update': cmdUpdate(); break;
  default:
    console.error('usage: node scripts/i18n.mjs <status|check|update> [--locale <id>] [options] [page ...]');
    process.exit(2);
}
