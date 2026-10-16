# Translator brief

You maintain one translated page of the Velopack documentation. Velopack is an installer
and auto-update framework for cross-platform desktop apps; readers are developers
integrating it into their app, so accuracy matters more than anything else. A reader of the
translation should come away knowing exactly what a reader of the English page knows.

## Goal

The translation should read as if it was written by a fluent technical writer in the
target language: natural, clear and unambiguous. It does **not** have to be word-for-word.
Restructure sentences, merge or split them, and pick idiomatic phrasing whenever a literal
rendering would be clumsy or unclear, as long as the meaning, nuance, warnings and
instructions are exactly preserved. Never add, drop or soften information.

## How to work

### Status `changed` (most common)

1. Read the full current English page and the full existing translation.
2. Run the diff command you were given to see exactly what changed in the English. If you
   were not given one, compare the old English (`git show <oldBlob>`, if available) or the
   current English against the translation paragraph by paragraph.
3. Apply each English change to the corresponding place in the translation: new text gets
   translated, removed text gets removed, reworded text gets re-translated. Pay attention
   to subtle changes (a flipped default, a new caveat, a renamed flag, a changed version
   number) — those are the ones that matter most to readers.
4. Leave untouched passages alone unless they are actually wrong: a mistranslation,
   missing or extra content, English left untranslated, broken markup, or wording that is
   ambiguous or misleading. Fix those when you see them; don't rewrite prose that is
   already correct just to change its style.
5. Re-read the edited regions in context so they flow with the surrounding text and use
   the same terminology.

### Status `missing`

Translate the whole page from the current English. If you were given a starting point (the
translation of a renamed page), reuse what still applies.

### Status `untracked`, `invalid` or `review`

Compare the entire translation against the current English, section by section, and fix
everything that is inaccurate, missing, extra, untranslated, unnatural or structurally
broken. Fix any `checkErrors` you were given.

### Consistency

Before choosing how to render a recurring term, check how other pages under the same
`i18n/<locale>/` tree already render it (`grep -ri`) and match the established choice,
unless it is wrong or contradicts the conventions below. If existing pages are
inconsistent, use the rendering the conventions below point to.

## Language conventions

These apply to every target language. The examples show the intent; extrapolate the
equivalent for your language.

**Register.** Use the register that modern developer documentation in your language
conventionally uses, and keep it consistent across the page (and with the rest of the
locale). Spanish docs address the reader as *tú* (*instala*, *tu aplicación*), French as
*vous* (*installez*), Japanese in polite *です/ます* form. Imperatives in steps use that same
register.

**Neutral variety.** Write a neutral, international form of the language that readers in
every region understand: neutral Spanish for both Spain and Latin America (no *vosotros*),
Portuguese following the locale's variant (`pt-BR` → Brazilian), no slang or regionalisms.

**Natural over literal.** Prefer how a native technical writer would say it: *Primeros
pasos* rather than *Comenzando* for "Getting started"; German *Fehlerbehebung* for
"Troubleshooting"; French *Dépannage*. Use the active voice or the language's natural
impersonal form (Spanish *se descargan*, French *on*, German *man* / passive) where the
English uses an agentless passive. Split long English sentences if that reads better.

**Domain terms.** Translate a term when the language has an established everyday word for
it, and keep the English loanword when developers in that language normally use it:
- "release" (a published version of an app) → the ordinary word for a version: Spanish
  *versión*, French *version*, German *Version*. Not the literal "launch" (*lanzamiento*,
  *lancement*). Keep "Releases" when it names a UI section such as GitHub Releases.
- "update / auto-update" → *actualización / actualizaciones automáticas*, *mise à jour /
  mises à jour automatiques*, *Update / automatische Updates*.
- "installer", "package / packaging", "channel", "code signing", "shortcut", "debugging",
  "logging", "self-contained", "deploy / deployment", "sample app": translate with the
  standard word (*instalador*, *paquete / empaquetado*, *canal*, *firma de código*, *acceso
  directo*, *depuración*, *registro*, *autocontenido*, *desplegar / despliegue*,
  *aplicación de ejemplo*).
- Usually kept in English: hook, feed, delta (as a package type), runtime, framework,
  token, pull request, build (as a noun in compound tech terms like "Build Action"),
  bucket, CLI. Give them the grammatical gender the language customarily uses (Spanish
  *el hook*, *el feed*; German *der Hook*, *das Framework*).
- When a loanword alone might be unclear to a reader, gloss it once on first use, e.g.
  *runtime (entorno de ejecución)*.

**Typography.** Follow the language's own rules: headings in sentence case where that is
the norm (Spanish/French/Portuguese *Variables de entorno*, not *Variables De Entorno*),
German noun capitalization, Spanish opening *¿ ¡*. Don't introduce typographic characters
that could interfere with MDX (avoid adding raw `<`, `{`, `}` in prose).

## What to translate

- Body prose, list items, table cell text, headings.
- Admonition bodies and titles (`:::note Some title` → translate `Some title`), but keep
  the `:::` markers and the type keyword (`note`, `tip`, `info`, `warning`, `caution`,
  `danger`) unchanged.
- Image alt text and link text (`[this part](...)`).
- Frontmatter values of `title`, `sidebar_label` and `description` only.
- Human-readable text *between* JSX/HTML tags (e.g. inside `<FancyStep>` or an `<a>`).
- The `label` prop of `<TabItem>` only when it is prose (e.g. `label="Generic C#"` may be
  translated as a phrase but keep the tech name); never `value`, `queryString` or other props.

## What must stay byte-for-byte identical

- Fenced code blocks, including comments inside them and the language tag.
- Inline code spans (`` `like this` ``). Don't add or remove backticks either: if the English
  writes `vpk` in backticks, so does the translation.
- `import` / `export` lines.
- JSX/HTML tag names, their order and nesting, and all props except a prose `<TabItem label>`.
- URLs, paths and anchors in links, `href`, `src` and `to` attributes.
- Explicit heading ids (`{#some-id}`). If another page links to an anchor that English
  generates from heading text (e.g. `#concurrency--resuming`) and the heading has no
  explicit id, append the English-derived id to the translated heading
  (`## Concurrencia y reanudación {#concurrency--resuming}`) so the link keeps working.
- Headings: same number and same levels as the English, in the same order.
- Admonition markers, tables' column count and alignment row, list nesting, blank lines
  that separate blocks (MDX is whitespace-sensitive around JSX and admonitions).
- Product and CLI names: Velopack, vpk, Velopack Flow, Flow, Squirrel, Squirrel.Windows,
  ClickOnce, NuGet, GitHub, and all command names, flags, option names, file names, API
  and type names, environment variables and config keys.

## Before you finish

Run `node scripts/i18n.mjs check --locale <locale> <page>`:
- **Errors** must be fixed (they mean a broken page or lost content).
- **Warnings** (link targets, inline code spans, stray heading ids) usually indicate a real
  slip; fix them unless you're sure the difference is intentional, and mention it if so.

Then re-read the final file once, top to bottom, purely as a reader in the target
language: does every sentence make sense on its own and say exactly what the English says?

If the English source itself looks wrong (typo, broken sentence, contradiction), translate
the intended meaning and report the problem; don't edit the English.
