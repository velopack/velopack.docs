# AGENTS.md

This file provides guidance for AI coding agents working with the Velopack documentation repository.

## Repository Overview

This repository contains the official documentation website for [Velopack](https://github.com/velopack/velopack), an installer and auto-update framework for cross-platform desktop applications. The site is built using [Docusaurus 3](https://docusaurus.io/), a modern static site generator.

**Live Site:** https://docs.velopack.io/

## Project Structure

```
velopack.docs/
├── docs/                    # Main documentation content (MDX files)
│   ├── index.mdx           # Landing page
│   ├── getting-started/    # Quick-start guides for different languages
│   ├── integrating/        # SDK integration guides
│   ├── packaging/          # Building releases with vpk
│   ├── distributing/       # Deployment guides
│   ├── migrating/          # Migration guides from other frameworks
│   ├── reference/          # API reference (auto-generated)
│   └── troubleshooting/    # FAQ and debugging guides
├── blog/                   # Blog posts
├── src/                    # Custom React components and CSS
│   ├── components/         # Reusable React components
│   ├── css/               # Custom stylesheets
│   └── theme/             # Docusaurus theme customizations
├── static/                 # Static assets (images, logos, favicons)
├── generator/              # C# project for generating API reference docs
├── scripts/                # Build and deployment scripts
├── docusaurus.config.ts    # Main Docusaurus configuration
├── sidebars.ts            # Sidebar navigation structure
└── package.json           # Node.js dependencies and scripts
```

## Key Technologies

- **Framework:** Docusaurus 3.8.1
- **Runtime:** Node.js 18+
- **Language:** TypeScript/JavaScript (site), MDX (documentation)
- **Package Manager:** npm or yarn
- **Reference Generator:** C# (.NET) for auto-generating API documentation

## Development Workflow

### Setup and Local Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run start

# Build for production
npm run build

# Serve production build locally
npm run serve
```

### Available npm Scripts

- `npm run start` - Start Docusaurus dev server with hot reload
- `npm run build` - Build static site to `build/` directory
- `npm run serve` - Serve production build locally
- `npm run clear` - Clear Docusaurus cache
- `npm run typecheck` - Run TypeScript type checking

### VS Code Tasks

The repository includes preconfigured VS Code tasks:
- **Start Docusaurus Dev Server** - Install dependencies and start dev server
- **Install dependencies** - Run npm install

## Writing Documentation

### Content Format

Documentation is written in **MDX** (Markdown with JSX support), allowing you to:
- Use standard Markdown syntax
- Import and use React components
- Add interactive examples and demos

### File Locations

- **Tutorials/Guides:** Place in appropriate subdirectory under `docs/`
- **Blog Posts:** Add to `blog/` with YYYY-MM-DD format or subdirectories
- **API Reference:** Auto-generated; don't edit directly (see Reference Generation below)

### MDX Frontmatter

Add metadata to docs using frontmatter:

```mdx
---
title: Page Title
sidebar_label: Short Label
sidebar_position: 1
disable_comments: true
---
```

### Custom Components

The site includes custom React components in `src/components/`. Notable examples:
- `<FancyStep>` - Styled step-by-step instructions
- Standard Docusaurus components like `<DocCardList>`

## Reference Documentation Generation

API reference documentation is **auto-generated** from source code in the main Velopack repository.

### Generator Project

- **Location:** `generator/` directory
- **Language:** C# (.NET)
- **Purpose:** Extracts API documentation and generates MDX files

### Generated References

The following reference docs are auto-generated:
- **C# API Reference:** `docs/reference/cs/`
- **CLI Reference:** `docs/reference/cli/`
- **C++ Reference:** `docs/reference/cpp/`
- **JavaScript Reference:** `docs/reference/js/`
- **Python API Reference:** `docs/reference/py/`

**⚠️ Important:** Do not manually edit files in these directories. They will be overwritten on the next generation run.

### Running the Generator

```bash
cd generator
dotnet run
```

This updates all auto-generated reference documentation.

## Configuration Files

### docusaurus.config.ts

Main configuration including:
- Site metadata (title, tagline, URL)
- Theme configuration (navbar, footer, color modes)
- Plugins (search, redirects, analytics)
- Deployment settings

### sidebars.ts

Defines the documentation sidebar navigation structure. Docusaurus supports:
- Auto-generated sidebars from directory structure
- Manual sidebar configuration
- Category grouping and custom ordering

## Common Tasks for AI Agents

### Adding New Documentation

1. Create MDX file in appropriate `docs/` subdirectory
2. Add frontmatter with title and metadata
3. Update `sidebars.ts` if manual ordering is needed
4. Test locally with `npm run start`

### Updating Existing Documentation

1. Locate the MDX file in `docs/` directory
2. Edit content (preserve frontmatter)
3. Verify links and references are valid
4. Check for broken Markdown links (enforced by `onBrokenMarkdownLinks: 'throw'`)

### Adding Blog Posts

1. Create directory in `blog/` with format: `YYYY-MM-DD-slug/`
2. Add `index.md` or `index.mdx` with frontmatter
3. Include author information in `blog/authors.yml`

### Modifying Site Configuration

1. Edit `docusaurus.config.ts` for site-wide settings
2. Edit `sidebars.ts` for navigation structure
3. Rebuild site to see changes

### Working with Components

1. Custom components go in `src/components/`
2. Import in MDX files: `import Component from '@site/src/components/Component'`
3. Theme overrides go in `src/theme/`

## Language Support

Velopack supports multiple programming languages. When adding documentation:

| Language   | Status | Quick-Start Path | Reference Path |
|-----------|--------|------------------|---------------|
| C#        | ✅ Ready | `docs/getting-started/csharp.mdx` | `docs/reference/cs/` |
| Rust      | ✅ Ready | `docs/getting-started/rust.mdx` | - |
| JavaScript| ✅ Ready | `docs/getting-started/javascript.mdx` | `docs/reference/js/` |
| C++       | ✅ Ready | `docs/getting-started/cpp.mdx` | `docs/reference/cpp/` |
| Python    | ✅ Ready | `docs/getting-started/python.mdx` | `docs/reference/py/` |

## i18n / Translations

The docs are translated into other languages (Spanish first) and the translations are
**written and maintained by AI**, not by hand. The pipeline keeps them in sync as the
English docs evolve.

### Golden rule

**Never hand-edit anything under `i18n/`.** Edit the English source in `docs/` (or the
site UI), and let the pipeline regenerate the localized content. Manual edits to
`i18n/` will be overwritten the next time the corresponding English source changes.

### What is and isn't translated

- ✅ The 44 guide pages under `docs/` (everything except `docs/reference/**`) — fully
  AI-translated by the pipeline below.
- ✅ Top nav + sidebar category labels — also **AI-maintained by the pipeline** (see
  "Localizing nav & sidebar"). They re-translate automatically when you change a label in
  `docusaurus.config.ts` / `sidebars.ts`.
- ❌ Generic theme strings — search box, buttons, pagination, etc. (`code.json`) — **not in
  scope**. Docusaurus ships its own bundled translations for most of them; anything it
  doesn't cover falls back to English. We deliberately don't own these (owning them means
  maintaining strings that aren't ours and overriding Docusaurus on every upgrade).
- ❌ The auto-generated API reference (`docs/reference/**`) — ~569 files, regenerated
  daily. Docusaurus automatically falls back to the English page when a localized doc
  is missing, so these stay English **by design**.
- ❌ The blog — stays English.

### How the pipeline works

- **`scripts/translate.config.json`** — declares `locales`, the docs source globs
  (`docs/**` minus `reference/**`), the `ui` JSON files (nav/sidebar) with their
  prune/keep rules, and `cleanupAfter` (transient files to delete post-run).
- **`scripts/translate.mjs`** — dependency-free Node 18+ script (built-in `fetch`, no
  new npm packages). It hashes each English source and compares against
  `i18n/translation-manifest.json`; only changed/missing pages are re-translated via the
  Anthropic Messages API and written to
  `i18n/<locale>/docusaurus-plugin-content-docs/current/<relPath>`.
  - Env: `ANTHROPIC_API_KEY` (required), `TRANSLATE_MODEL` (optional, default
    `claude-sonnet-4-6`).
  - Flags: `--locale <id>`, `--force` (ignore the manifest), `--dry-run`.
- **`.github/workflows/translate.yml`** — on push to `master` touching `docs/**`,
  `sidebars.ts`, `docusaurus.config.ts`, or the translate script/config (or manual
  dispatch): `npm ci` → `npm run i18n:scaffold` → `npm run translate` → commit any
  `i18n/**` changes as `github-actions[bot]` → dispatch `deploy.yml`. The commit only
  touches `i18n/**`, which is **not** in the workflow's trigger paths, so it never
  re-triggers itself (mirrors the `generate.yml` pattern).
  - Requires the **`ANTHROPIC_API_KEY`** repo secret (set in GitHub repo settings).

### npm scripts

- `npm run translate` — run the translation engine locally (needs `ANTHROPIC_API_KEY`).
- `npm run i18n:scaffold` — `docusaurus write-translations` for the locale **and** `en`,
  producing the English baseline the UI step diffs against. Run this before `translate`
  if you want nav/sidebar labels (re)translated locally; the markdown pipeline doesn't
  need it.

### Reference sidebar & non-default-locale builds

Building a non-default locale (e.g. `es`) makes Docusaurus generate sidebar translation
keys, and it **throws on duplicate keys**. The auto-generated C# reference repeats category
labels (`Methods`, `Properties`, etc.) across every type, so each `_category_.yml` must
carry a unique `key:`. This is emitted by the generator (`generator/CSharpReference.cs`)
and present in the committed tree — don't remove it, or `npm run build` will fail for `es`.

### Images in docs

Reference images with **absolute** site paths (`/images/foo.png`, served from
`static/images/`) so they resolve from both `docs/` and the relocated `i18n/` copies. Avoid
relative (`../../../static/...`) or co-located (`foo.png`) image paths — they break in the
translated build. Likewise, if a heading is the target of an in-page `#anchor` link, give it
an explicit stable id (`## Heading {#stable-id}`) so the link survives translation of the
heading text.

### Localizing nav & sidebar

The top-nav and sidebar-category labels are translated by the **same pipeline** as the
guides, via a small `ui` section in `scripts/translate.config.json`. Two files per locale:

- `i18n/<locale>/docusaurus-theme-classic/navbar.json` — top-nav item labels (Guides,
  Reference, Blog) + logo alt text.
- `i18n/<locale>/docusaurus-plugin-content-docs/current.json` — sidebar category labels
  (Getting Started, Integrating, …). `dropKeyPrefixes` strips the auto-generated reference
  sub-categories (Methods, Properties, per-class — they stay English and would churn daily),
  the Sample-Apps links (tech-stack names), and `version.label`; `keepKeys` retains the
  single stable top-level `Reference` label.

How it stays in sync (in `translate.mjs` → `translateUi`):
- CI runs `npm run i18n:scaffold` first (`write-translations` for the locale **and** for
  `en`), producing the English baseline.
- A key is (re)translated only when its message still equals the English baseline, so
  existing translations never drift and new/renamed labels are picked up automatically.
- Re-translation is gated on a hash of the **pruned English baseline** (stored in the
  manifest's `__ui` section), so it only fires when a label actually changes in
  `docusaurus.config.ts` / `sidebars.ts` — hence those two files are in `translate.yml`'s
  trigger paths. Proper nouns (Blog, Flow, C#, Python…) correctly stay as-is.
- `cleanupAfter` deletes the transient `i18n/en` baseline and the scaffold byproducts we
  don't own (`code.json`, blog options) so they're never committed.

Per-page sidebar entries (C#, FAQ, …) localize automatically via each doc's translated
`sidebar_label` frontmatter — no JSON needed.

**`code.json` is intentionally NOT committed.** It's generic theme chrome (search box,
buttons, pagination) that Docusaurus already translates via its bundled locale data;
owning it would mean overriding Docusaurus on every upgrade. Anything it doesn't cover
falls back to English.

### Adding a new language

1. Add the locale to `docusaurus.config.ts`: `i18n.locales`, `i18n.localeConfigs`
   (label + `htmlLang`), and the search theme's `language: [...]` array.
2. Add the locale to `scripts/translate.config.json` (`locales` and `localeLabels`).
3. Run `npm run i18n:scaffold && npm run translate` (or just push to `master` and let CI
   do it). This translates the guide pages **and** the nav/sidebar labels for the new
   locale.
4. Verify with `npm run build` (builds all locales, `onBrokenLinks: 'throw'` applies to
   every locale).

### Translation rules (enforced by the script's prompt)

Translate prose, headings, table cell text, alt text, and link *text* only. Never touch:
frontmatter keys (only `title`/`sidebar_label`/`description` values are translated), code
fences & inline code, JSX tags/attributes/props, `import` lines, URLs/paths, HTML tags,
anchor ids, or Velopack product/CLI terms (`vpk`, `Velopack`, `Squirrel`, `ClickOnce`,
command names).

See [`i18n/README.md`](i18n/README.md) for a shorter summary.

## Important Conventions

### Linking

- **Internal docs:** Use relative paths: `[text](./page.mdx)` or `[text](../category/page.mdx)`
- **External:** Use full URLs: `[text](https://example.com)`
- **Broken links:** Will cause build to fail (enforced by config)

### Code Blocks

Use language-specific syntax highlighting:

````mdx
```csharp
// C# code example
```

```bash
# Shell commands
```
````

### Redirects

Old URLs are redirected in `docusaurus.config.ts`:

```typescript
redirects: [
  { from: '/old-path', to: '/new-path' },
]
```

Add new redirects when moving/renaming pages.

## Testing and Validation

### Before Committing

1. **Build succeeds:** `npm run build` (catches broken links, invalid config)
2. **TypeScript checks:** `npm run typecheck`
3. **Visual review:** Test on dev server (`npm run start`)
4. **Search works:** Verify search index includes new content

### Build Enforcement

The configuration includes strict checks:
- `onBrokenLinks: 'throw'` - Broken internal links fail the build
- `onBrokenMarkdownLinks: 'throw'` - Invalid Markdown links fail the build

## Deployment

The site is deployed automatically via CI/CD. Deployment configuration is in `docusaurus.config.ts`:

```typescript
url: 'https://docs.velopack.io/',
baseUrl: '/',
organizationName: 'velopack',
projectName: 'velopack.docs',
```

## Search

Search is powered by `@easyops-cn/docusaurus-search-local`:
- Automatically indexes all documentation
- Blog posts are excluded from indexing
- Reference documentation is excluded via regex pattern
- Search index is built during `npm run build`

## Contributing Guidelines

1. **Documentation edits** have "Edit this page" links pointing to GitHub
2. **Reference pages** cannot be edited (auto-generated)
3. Follow existing structure and conventions
4. Test locally before committing
5. Ensure builds pass without errors

## Resources

- **Docusaurus Docs:** https://docusaurus.io/docs
- **Velopack Main Repo:** https://github.com/velopack/velopack
- **Discord Community:** https://discord.gg/CjrCrNzd3F
- **Live Documentation:** https://docs.velopack.io/

## Notes for AI Agents

1. **Do not edit auto-generated reference docs** - They're regenerated from source code
2. **Respect the MDX format** - Maintain frontmatter and JSX syntax
3. **Test builds locally** - Strict link checking will fail CI if broken
4. **Follow existing patterns** - Match the style and structure of existing docs
5. **Update sidebars.ts** - If adding new sections or changing navigation
6. **Use TypeScript** - Configuration files use TypeScript for type safety
7. **Check package.json** - For correct commands and dependencies
8. **Preserve React components** - Don't convert JSX to plain Markdown if components are used

## Troubleshooting

### Common Issues

- **Build fails on broken links:** Check `npm run build` output for specific broken links
- **Search not working:** Rebuild with `npm run build` to regenerate search index
- **Dev server issues:** Clear cache with `npm run clear` and restart
- **Missing dependencies:** Run `npm install` to ensure all packages are installed
- **TypeScript errors:** Run `npm run typecheck` to see type issues

### Getting Help

- Check existing documentation structure for examples
- Review Docusaurus documentation for framework-specific questions
- Join Velopack Discord for project-specific questions
