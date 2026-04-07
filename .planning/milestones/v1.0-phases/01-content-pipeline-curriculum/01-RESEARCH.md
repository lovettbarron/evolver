# Phase 1: Content Pipeline + Curriculum - Research

**Researched:** 2026-03-29
**Domain:** Markdown content pipeline (parsing, validation, rendering) + curriculum authoring
**Confidence:** HIGH

## Summary

This phase builds the invisible data foundation: a content reader that parses Obsidian-flavored markdown with YAML frontmatter, validates it with Zod schemas, and renders it to HTML with full Obsidian feature support (callouts, wikilinks, parameter tables, Mermaid diagrams). It also delivers the complete 35-session Evolver curriculum written from the two reference PDFs.

The technical stack is mature and well-documented. The remark/rehype ecosystem is the standard for markdown processing in the Node/Next.js world. gray-matter handles frontmatter extraction, Zod handles validation. The main complexity is in Obsidian-flavored markdown features (callouts, wikilinks, embeds) which require specific plugins. The curriculum authoring is the highest-effort work -- 35 sessions written from scratch with adversarial review against ADHD design principles.

**Primary recommendation:** Use gray-matter + Zod for frontmatter parsing/validation, unified/remark/rehype pipeline for markdown-to-HTML rendering, with specialized plugins for each Obsidian feature. Client-side Mermaid rendering via a React component wrapper.

<user_constraints>

## User Constraints (from CONTEXT.md)

### Locked Decisions
- Rich YAML frontmatter on all content types -- sessions, patches, and instrument files
- Session frontmatter: title, module, session number, duration, prerequisite, output type (patch/technique/recording), difficulty, tags, instrument
- Patch frontmatter: name, type (bass/lead/pad/drum/texture/sequence), session origin, description, tags, instrument, created date
- Instrument file frontmatter: type (overview/signal-flow/basic-patch/modules), instrument slug, title, manufacturer
- Instrument discovery from filesystem (`instruments/<name>/`) with frontmatter validation on each file
- Zod validation: strict on required fields, permissive on extras (passthrough). Required fields must be present and correctly typed. Unknown/extra fields allowed but stripped
- All 35 sessions written from scratch by Claude, using Anu Kirk guide + official DSI manual as source material
- Existing 7 sessions are fully rewritten -- they were generated as placeholders
- Module map to be revisited before writing -- the 10-module structure and session allocations should be reviewed against reference materials. Target ~35 sessions but quality over hitting exact count
- Sessions cite specific reference material sections (e.g., "See Anu Kirk p.42")
- All Obsidian-flavored markdown features supported: parameter tables, callouts/admonitions, wikilinks, code blocks with syntax highlighting, Mermaid diagrams
- Full Obsidian compatibility -- tags (#tag rendered as filterable labels), embeds (![[file]] for inline content)
- Styled inline parameters -- parameter names get visual treatment (bold/monospace/colored) for ADHD scanning
- Bundled copy of full curriculum in the repo -- sessions, patches, instrument docs
- Curriculum content is public and shareable
- Demo mode reads from bundle; local mode reads from vault. Content reader returns identical data shapes
- Vault path configured via config file in project root (not env var)
- Adversarial agent review for sessions: verify coverage, correctness, ADHD compliance

### Claude's Discretion
- Exact Zod schema field names and types (within the decisions above)
- Content reader architecture and file I/O patterns
- Markdown rendering library choice (remark/rehype ecosystem, etc.)
- Mermaid rendering approach (client-side vs build-time)
- Config file format (JSON, YAML, or .ts)
- `npm run validate-content` script implementation

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PIPE-01 | App reads markdown + YAML frontmatter from a configured Obsidian vault path | gray-matter for parsing, config file pattern for vault path, fs-based content reader |
| PIPE-02 | App falls back to bundled demo content when no vault path is configured | Dual-source content reader pattern with identical return types |
| PIPE-03 | All frontmatter is validated with Zod schemas at parse time | Zod schemas with .passthrough() for permissive extras |
| PIPE-04 | Markdown renders with formatted parameter tables, callouts, and code blocks | remark/rehype pipeline with GFM tables, rehype-callouts, rehype-highlight |
| PIPE-05 | Reference PDFs are accessible locally and served via the demo app | Static file serving from `references/` directory via Next.js public or API route |
| CURR-01 | 35 Evolver sessions written across 10 modules (15-30 min each) | Module map exists in `instruments/evolver/modules.md`, needs review against references |
| CURR-02 | Each session has: objective, warm-up, setup, exercises with specific values, output checklist | Session template defined in `framework/README.md`, ADHD constraints in `framework/adhd-design.md` |
| CURR-03 | ADHD design enforced: 5-min minimum, zero startup friction, specific parameter values | ADHD design principles document provides 8 principles + 6 validation questions |
| CURR-04 | Evolver basic patch documented with full parameter dump | `instruments/evolver/basic-patch.md` exists, needs frontmatter added |
| CURR-05 | Evolver signal flow, architecture, and module dependency map documented | `instruments/evolver/signal-flow.md`, `overview.md`, `modules.md` exist, need frontmatter |
| INST-04 | Instrument data is discovered from filesystem (adding Cascadia = adding a directory) | fs.readdir on `instruments/` directory, validate each subdirectory's files |

</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gray-matter | 4.0.3 | YAML frontmatter extraction from markdown files | Battle-tested, used by Gatsby, Astro, Nextra, TinaCMS. Returns `{ data, content }` cleanly |
| zod | 4.3.6 | Runtime schema validation with TypeScript type inference | Industry standard for TypeScript validation. `.passthrough()` supports the "strict on required, permissive on extras" decision |
| unified | 11.0.5 | Markdown processing pipeline orchestrator | The ecosystem standard -- remark (parse) and rehype (transform) are built on unified |
| remark-parse | 11.0.0 | Markdown to AST (mdast) | Standard remark parser |
| remark-gfm | 4.0.1 | GitHub-flavored markdown (tables, strikethrough, task lists) | Required for parameter tables which are core to every session and patch file |
| remark-rehype | 11.1.2 | Bridge from remark (markdown AST) to rehype (HTML AST) | Standard bridge, required for any remark-to-HTML pipeline |
| rehype-stringify | 10.0.1 | HTML AST to HTML string | Standard rehype output |
| rehype-raw | 7.0.0 | Pass raw HTML through from markdown | Needed for HTML entities in markdown content |
| rehype-callouts | 2.1.2 | Obsidian-style callout/admonition rendering (`> [!tip]`) | Actively maintained, supports collapsible and nestable callouts, Obsidian syntax |
| rehype-highlight | 7.0.2 | Syntax highlighting for code blocks | Standard for code block highlighting, supports ASCII art in code fences |
| rehype-slug | 6.0.0 | Add `id` attributes to headings | Enables deep linking to session sections |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| remark-wiki-link | 2.0.1 | Parse `[[wikilinks]]` to HTML links | Required for Obsidian wikilink syntax resolution to app routes |
| remark-frontmatter | 5.0.0 | Strip frontmatter from markdown AST before rendering | Prevents YAML block from appearing in rendered HTML |
| mermaid | 11.13.0 | Client-side diagram rendering | Required for signal flow diagrams in sessions. Use client-side `<Mermaid>` component, NOT rehype-mermaid (avoids Playwright dependency) |
| rehype-autolink-headings | 7.1.0 | Add anchor links to headings | Nice-to-have for navigating long session content |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| gray-matter + zod | zod-matter (0.1.3) | zod-matter wraps both but is tiny (0.1.3), low adoption. gray-matter + zod separately is more flexible and better documented |
| rehype-callouts | @r4ai/remark-callout (0.6.2) | remark-level vs rehype-level. rehype-callouts is more actively maintained (2.1.2) and supports nested + collapsible callouts |
| rehype-mermaid (server) | mermaid (client component) | rehype-mermaid requires Playwright for server-side rendering -- heavy dependency. Client-side Mermaid via a React `'use client'` component is simpler and standard for Next.js App Router |
| remark-wiki-link | @portaljs/remark-wiki-link (1.2.0) | PortalJS version has more features but is part of a larger ecosystem. remark-wiki-link (2.0.1) is standalone and sufficient |
| remark-obsidian (1.11.1) | Individual plugins | remark-obsidian bundles callouts + wikilinks + embeds but less control over each feature. Prefer individual plugins for debuggability |

**Installation:**
```bash
npm install gray-matter zod unified remark-parse remark-gfm remark-rehype remark-frontmatter remark-wiki-link rehype-stringify rehype-raw rehype-callouts rehype-highlight rehype-slug rehype-autolink-headings mermaid
```

## Architecture Patterns

### Recommended Project Structure
```
src/
  lib/
    content/
      reader.ts          # ContentReader class -- dual-source (vault / bundled)
      schemas.ts          # All Zod schemas (session, patch, instrument)
      types.ts            # Inferred TypeScript types from Zod schemas
      validate.ts         # Validation entry point for npm run validate-content
    markdown/
      processor.ts        # unified pipeline configuration
      plugins/
        wikilink-resolver.ts  # Custom URL resolver for [[wikilinks]]
        inline-params.ts      # Custom plugin for styled parameter rendering
    config.ts             # Config file reader (vault path, mode)
  components/
    markdown/
      MermaidDiagram.tsx   # 'use client' component for Mermaid rendering
      MarkdownRenderer.tsx # Server component that renders processed HTML
  content/                 # Bundled demo content (copied from vault)
    sessions/
      evolver/
    instruments/
      evolver/
    patches/
      evolver/
```

### Pattern 1: Dual-Source Content Reader
**What:** A content reader that abstracts the file source -- reads from either a configured Obsidian vault path or the bundled content directory. Returns identical typed data regardless of source.
**When to use:** Every content access point in the app.
**Example:**
```typescript
// Source: standard pattern for vault-reader Next.js apps
import { z } from 'zod';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';

// Config determines source
interface ContentConfig {
  vaultPath?: string; // undefined = use bundled content
}

function getContentRoot(config: ContentConfig): string {
  return config.vaultPath ?? path.join(process.cwd(), 'src/content');
}

// Generic read + validate pattern
async function readContentFile<T extends z.ZodType>(
  filePath: string,
  schema: T,
  config: ContentConfig
): Promise<{ data: z.infer<T>; content: string }> {
  const root = getContentRoot(config);
  const fullPath = path.join(root, filePath);
  const raw = await fs.readFile(fullPath, 'utf-8');
  const { data, content } = matter(raw);
  const validated = schema.parse(data);
  return { data: validated, content };
}
```

### Pattern 2: Zod Schema with Passthrough
**What:** Schemas that enforce required fields but allow unknown extras -- tolerating Obsidian-added metadata while catching real errors.
**When to use:** All frontmatter validation.
**Example:**
```typescript
import { z } from 'zod';

const SessionSchema = z.object({
  title: z.string(),
  module: z.string(),
  session_number: z.number().int().positive(),
  duration: z.number().int().min(5).max(30),
  prerequisite: z.union([z.number(), z.null()]),
  output_type: z.enum(['patch', 'technique', 'recording', 'composition']),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  tags: z.array(z.string()),
  instrument: z.string(),
}).passthrough(); // Allow unknown fields from Obsidian

const PatchSchema = z.object({
  name: z.string(),
  type: z.enum(['bass', 'lead', 'pad', 'drum', 'texture', 'sequence']),
  session_origin: z.union([z.number(), z.null()]),
  description: z.string(),
  tags: z.array(z.string()),
  instrument: z.string(),
  created: z.string(), // ISO date string
}).passthrough();

const InstrumentFileSchema = z.object({
  type: z.enum(['overview', 'signal-flow', 'basic-patch', 'modules']),
  instrument: z.string(), // slug e.g. "evolver"
  title: z.string(),
  manufacturer: z.string(),
}).passthrough();

// Export inferred types
type Session = z.infer<typeof SessionSchema>;
type Patch = z.infer<typeof PatchSchema>;
type InstrumentFile = z.infer<typeof InstrumentFileSchema>;
```

### Pattern 3: Unified Markdown Pipeline
**What:** A configured remark/rehype pipeline that handles all Obsidian-flavored markdown features.
**When to use:** Rendering any markdown content to HTML.
**Example:**
```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkWikiLink from 'remark-wiki-link';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeCallouts from 'rehype-callouts';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeStringify from 'rehype-stringify';

function createMarkdownProcessor(wikilinkPermalinks: string[]) {
  return unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkGfm)
    .use(remarkWikiLink, {
      permalinks: wikilinkPermalinks,
      hrefTemplate: (permalink: string) => `/instruments/${permalink}`,
      aliasDivider: '|',
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeCallouts)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify);
}

async function renderMarkdown(content: string, permalinks: string[]): Promise<string> {
  const processor = createMarkdownProcessor(permalinks);
  const result = await processor.process(content);
  return String(result);
}
```

### Pattern 4: Client-Side Mermaid Component
**What:** A React client component that renders Mermaid diagrams at runtime, avoiding server-side Playwright dependency.
**When to use:** Any markdown content containing ` ```mermaid ` code blocks.
**Example:**
```typescript
// 'use client'
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({ startOnLoad: false, theme: 'default' });

export function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.render(`mermaid-${Date.now()}`, chart).then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg;
      });
    }
  }, [chart]);

  return <div ref={ref} className="mermaid-diagram" />;
}
```

The markdown processor should detect ` ```mermaid ` code blocks and replace them with a placeholder data attribute that the MarkdownRenderer component swaps for the `<MermaidDiagram>` client component.

### Pattern 5: Instrument Discovery from Filesystem
**What:** Scan `instruments/` directory for subdirectories, treat each as an instrument, validate its files.
**When to use:** Building the instrument list, INST-04 requirement.
**Example:**
```typescript
async function discoverInstruments(contentRoot: string): Promise<string[]> {
  const instrumentsDir = path.join(contentRoot, 'instruments');
  const entries = await fs.readdir(instrumentsDir, { withFileTypes: true });
  return entries
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .map(e => e.name);
}
```

### Anti-Patterns to Avoid
- **Mixing rendering concerns into the content reader:** Keep reading/validation separate from markdown-to-HTML processing. The content reader returns raw validated data; a separate rendering step handles HTML
- **Parsing frontmatter twice:** gray-matter extracts frontmatter once; don't also parse it in the remark pipeline. Use remark-frontmatter only to strip the YAML block from rendered output
- **Server-side Mermaid:** rehype-mermaid requires Playwright (headless browser). This adds ~200MB to dependencies and fails in many CI/serverless environments. Use client-side rendering
- **Tight coupling to vault structure:** The content reader should use path abstractions, not hardcoded paths. The vault structure IS the API contract -- `sessions/<instrument>/`, `instruments/<instrument>/`, `patches/<instrument>/`

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| YAML frontmatter parsing | Custom regex/split parser | gray-matter | Handles edge cases (multiline values, nested objects, YAML spec compliance) |
| Schema validation | Custom type guards | Zod | Type inference, clear error messages, `.passthrough()` for permissive mode |
| Markdown to HTML | Custom regex-based renderer | unified/remark/rehype | AST-based processing handles all edge cases. Regex markdown parsers break on nested structures |
| GFM tables | Custom table parser | remark-gfm | GFM table spec has alignment, escaping, edge cases |
| Callout rendering | Custom blockquote transformer | rehype-callouts | Handles `[!type]`, collapsible (`-`/`+`), nesting, title parsing |
| Syntax highlighting | Custom highlighter | rehype-highlight | Covers 190+ languages, integrates with hljs themes |
| Diagram rendering | Custom SVG generation | mermaid | Complex graph layout algorithms, maintained by a large community |

**Key insight:** The markdown rendering pipeline has the most subtle edge cases. Every "I'll just parse it with regex" attempt fails on nested blockquotes, tables with pipes in cells, or code blocks containing markdown syntax. Use the AST-based approach.

## Common Pitfalls

### Pitfall 1: Frontmatter YAML Parsing Strictness
**What goes wrong:** YAML is surprisingly flexible. Unquoted strings that look like dates, numbers, or booleans get auto-converted (`yes` becomes `true`, `2024-01-01` becomes a Date object).
**Why it happens:** gray-matter uses js-yaml which follows YAML 1.1 by default.
**How to avoid:** Zod validation catches type mismatches. Also use explicit quoting in frontmatter for values that might be ambiguous: `title: "Session 01: Foundations"` (colon needs quoting).
**Warning signs:** Tests pass with simple data but fail on real content with dates, colons, or boolean-like values.

### Pitfall 2: remark-wiki-link Needs Permalink Resolution
**What goes wrong:** `[[basic-patch]]` renders as a broken link because the plugin doesn't know how to resolve it to a URL.
**Why it happens:** remark-wiki-link requires you to provide either a list of valid permalinks or a custom URL resolver. Without it, links render but point nowhere.
**How to avoid:** Build a permalink map from discovered content at startup. Pass it to the plugin configuration.
**Warning signs:** Wikilinks render as `<a>` tags but href values are wrong or missing.

### Pitfall 3: allowDangerousHtml in remark-rehype
**What goes wrong:** Raw HTML in markdown (like `<details>`, inline `<span>` for styling) gets stripped.
**Why it happens:** remark-rehype drops raw HTML by default for safety. You need `allowDangerousHtml: true` plus rehype-raw to pass it through.
**How to avoid:** Always include both: `.use(remarkRehype, { allowDangerousHtml: true })` and `.use(rehypeRaw)`.
**Warning signs:** HTML tags in markdown disappear in output.

### Pitfall 4: Plugin Order Matters in rehype Pipeline
**What goes wrong:** Mermaid code blocks get syntax-highlighted before the Mermaid component can detect them. Or callouts don't render because they're processed after sanitization.
**Why it happens:** unified processes plugins in order. Each plugin transforms the AST for the next one.
**How to avoid:** Order: remarkParse -> remarkFrontmatter -> remarkGfm -> remarkWikiLink -> remarkRehype -> rehypeRaw -> rehypeCallouts -> rehypeHighlight -> rehypeSlug -> rehypeAutolinkHeadings -> rehypeStringify. Mermaid detection should happen BEFORE rehype-highlight.
**Warning signs:** Some features work in isolation but not together.

### Pitfall 5: Obsidian Embed Syntax (![[file]])
**What goes wrong:** Embeds (`![[basic-patch]]`) are not handled by remark-wiki-link and render as literal text.
**Why it happens:** remark-wiki-link handles `[[links]]` but not `![[embeds]]` -- the `!` prefix is Obsidian-specific embed syntax.
**How to avoid:** Either use a custom remark plugin to handle `![[...]]` syntax, or use remark-obsidian which handles both. Alternatively, a custom rehype plugin can post-process embed markers into content includes.
**Warning signs:** `![[file]]` appears as literal text in rendered output.

### Pitfall 6: Bundled Content Must Mirror Vault Structure Exactly
**What goes wrong:** Content reader works with the vault but breaks with bundled content (or vice versa) because paths differ.
**Why it happens:** Bundled content is copied into `src/content/` but may have a different directory depth or naming.
**How to avoid:** Bundled content directory structure MUST be identical to the vault structure: `instruments/evolver/`, `sessions/evolver/`, `patches/evolver/`. The content reader only swaps the root path.
**Warning signs:** One source works, the other doesn't. Path-related errors.

## Code Examples

### Config File Pattern (Recommended: JSON)
```typescript
// evolver.config.json at project root
{
  "vaultPath": "/Users/andrew/song",
  "instrument": "evolver"
}

// src/lib/config.ts
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

const ConfigSchema = z.object({
  vaultPath: z.string().optional(), // undefined = demo mode
  instrument: z.string().default('evolver'),
});

export type AppConfig = z.infer<typeof ConfigSchema>;

export async function loadConfig(): Promise<AppConfig> {
  const configPath = path.join(process.cwd(), 'evolver.config.json');
  try {
    const raw = await fs.readFile(configPath, 'utf-8');
    return ConfigSchema.parse(JSON.parse(raw));
  } catch {
    return ConfigSchema.parse({}); // defaults = demo mode
  }
}
```

### validate-content Script
```typescript
// scripts/validate-content.ts
import { discoverInstruments } from '../src/lib/content/reader';
import { SessionSchema, PatchSchema, InstrumentFileSchema } from '../src/lib/content/schemas';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

async function validate() {
  const root = process.argv[2] || path.join(process.cwd(), 'src/content');
  let errors = 0;

  // Validate sessions
  const sessions = await glob('sessions/**/*.md', { cwd: root });
  for (const file of sessions) {
    const raw = await fs.readFile(path.join(root, file), 'utf-8');
    const { data } = matter(raw);
    const result = SessionSchema.safeParse(data);
    if (!result.success) {
      console.error(`FAIL: ${file}`);
      console.error(result.error.format());
      errors++;
    }
  }

  // Validate instrument files
  const instrumentFiles = await glob('instruments/**/*.md', { cwd: root });
  for (const file of instrumentFiles) {
    const raw = await fs.readFile(path.join(root, file), 'utf-8');
    const { data } = matter(raw);
    const result = InstrumentFileSchema.safeParse(data);
    if (!result.success) {
      console.error(`FAIL: ${file}`);
      console.error(result.error.format());
      errors++;
    }
  }

  // Validate patches
  const patchFiles = await glob('patches/**/*.md', { cwd: root });
  for (const file of patchFiles) {
    if (file.endsWith('README.md')) continue;
    const raw = await fs.readFile(path.join(root, file), 'utf-8');
    const { data } = matter(raw);
    const result = PatchSchema.safeParse(data);
    if (!result.success) {
      console.error(`FAIL: ${file}`);
      console.error(result.error.format());
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\n${errors} file(s) failed validation`);
    process.exit(1);
  } else {
    console.log('All content files validated successfully');
  }
}

validate();
```

### Session Frontmatter Example (What Files Should Look Like)
```markdown
---
title: "Navigation & The Basic Patch"
module: "Foundations"
session_number: 1
duration: 20
prerequisite: null
output_type: patch
difficulty: beginner
tags: [navigation, basic-patch, foundations]
instrument: evolver
reference: "Anu Kirk p.10-15, DSI Manual p.8-12"
---

# Session 01: Navigation & The Basic Patch
...
```

### Instrument File Frontmatter Example
```markdown
---
type: signal-flow
instrument: evolver
title: "Evolver Signal Flow"
manufacturer: "Dave Smith Instruments"
---

# Evolver Signal Flow
...
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| MDX for content | Plain markdown + remark/rehype | 2024+ | MDX adds bundle complexity. For content-only sites (no React in markdown), plain markdown is simpler and more portable (Obsidian compatibility) |
| next-mdx-remote | unified pipeline directly | 2024+ | Direct unified usage gives more control over plugin ordering and custom transforms |
| Server-side Mermaid (Playwright) | Client-side Mermaid | 2024+ | Avoids heavy Playwright dependency. Client-side rendering is fast enough for diagram counts in this project |
| Custom callout regex | rehype-callouts plugin | 2025 | Mature plugin now handles full Obsidian callout syntax including collapsible and nested |

**Deprecated/outdated:**
- remark-obsidian-callout: No longer maintained, author recommends rehype-callouts
- @flowershow/remark-callouts: Less actively maintained than rehype-callouts

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest (latest) -- no project test infrastructure exists yet |
| Config file | `vitest.config.ts` -- needs creation (Wave 0) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PIPE-01 | Content reader reads markdown + frontmatter from vault path | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "vault"` | No -- Wave 0 |
| PIPE-02 | Content reader falls back to bundled content when no vault configured | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "bundled"` | No -- Wave 0 |
| PIPE-03 | Zod schemas validate frontmatter at parse time, reject invalid | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts` | No -- Wave 0 |
| PIPE-04 | Markdown renders with tables, callouts, code blocks | unit | `npx vitest run src/lib/markdown/__tests__/processor.test.ts` | No -- Wave 0 |
| PIPE-05 | Reference PDFs are accessible | smoke | `npx vitest run src/lib/content/__tests__/pdf-access.test.ts` | No -- Wave 0 |
| CURR-01 | All 35 sessions exist and have valid frontmatter | integration | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -t "session count"` | No -- Wave 0 |
| CURR-02 | Sessions have required sections (objective, warm-up, setup, exercises, output) | integration | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -t "session structure"` | No -- Wave 0 |
| CURR-03 | Sessions are 5-30 min, have specific parameter values | integration | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -t "adhd"` | No -- Wave 0 |
| CURR-04 | Basic patch exists with full parameter dump | integration | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -t "basic-patch"` | No -- Wave 0 |
| CURR-05 | Signal flow, architecture, module map documented | integration | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -t "instrument-docs"` | No -- Wave 0 |
| INST-04 | Instrument discovery from filesystem | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "discover"` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `vitest.config.ts` -- project has no test infrastructure
- [ ] `package.json` -- project has no package.json yet (greenfield)
- [ ] `tsconfig.json` -- TypeScript configuration needed
- [ ] `src/lib/content/__tests__/reader.test.ts` -- content reader tests
- [ ] `src/lib/content/__tests__/schemas.test.ts` -- schema validation tests
- [ ] `src/lib/markdown/__tests__/processor.test.ts` -- markdown rendering tests
- [ ] `src/lib/content/__tests__/curriculum.test.ts` -- curriculum completeness tests
- [ ] Test fixtures: sample markdown files with valid/invalid frontmatter
- [ ] Framework install: `npm install -D vitest`

## Open Questions

1. **Obsidian embed handling (![[file]])**
   - What we know: remark-wiki-link handles `[[links]]` but not `![[embeds]]`
   - What's unclear: Whether remark-obsidian (1.11.1) handles embeds well enough, or if a custom plugin is needed
   - Recommendation: Start with remark-wiki-link for links. Add embed support as a custom plugin if needed -- embeds may not be heavily used in session content

2. **Obsidian tag rendering (#tag)**
   - What we know: Obsidian renders `#tag` inline as clickable tags. Standard markdown treats `#` as heading
   - What's unclear: No standard remark plugin for Obsidian-style inline tags
   - Recommendation: Custom rehype plugin that detects `#word` patterns (not at line start) and wraps them in `<span class="tag">`. Low complexity, can be built in-phase

3. **Reference PDF serving (PIPE-05)**
   - What we know: PDFs live in `references/` directory. Need to be accessible in both local and demo mode
   - What's unclear: Whether to use Next.js `public/` directory (requires copying), API route (streams file), or static export
   - Recommendation: Symlink or copy `references/` into `public/references/` during build. Simplest approach, works on Vercel

4. **Curriculum session count flexibility**
   - What we know: User said "target ~35 sessions but quality over hitting exact count." Module map currently shows exactly 35
   - What's unclear: Whether review of reference materials will change the count
   - Recommendation: Plan for module map review as an early task. Accept 30-40 sessions as the range. Tests should validate "at least 30" not "exactly 35"

## Sources

### Primary (HIGH confidence)
- npm registry -- verified all package versions via `npm view [package] version` on 2026-03-29
- Existing project files -- `instruments/evolver/`, `sessions/evolver/`, `framework/`, `obsidian/`
- CONTEXT.md -- user decisions and constraints
- REQUIREMENTS.md -- phase requirement definitions

### Secondary (MEDIUM confidence)
- [rehype-callouts GitHub](https://github.com/lin-stephanie/rehype-callouts) -- Obsidian callout syntax support verified
- [remark-wiki-link GitHub](https://github.com/flowershow/remark-wiki-link) -- wikilink configuration options
- [rehype-mermaid GitHub](https://github.com/remcohaszing/rehype-mermaid) -- confirmed Playwright requirement for server-side rendering, supporting client-side recommendation
- [gray-matter GitHub](https://github.com/jonschlinkert/gray-matter) -- frontmatter parsing capabilities
- [zod-matter GitHub](https://github.com/HiDeoo/zod-matter) -- evaluated and rejected (too small, low adoption)

### Tertiary (LOW confidence)
- Mermaid + Next.js App Router integration pattern -- based on multiple community sources and Nextra docs, not a single authoritative source. Pattern is sound but specific implementation details may need adjustment

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries verified on npm, widely used, well-documented
- Architecture: HIGH -- patterns follow established vault-reader approach (PM Toolkit pattern from PROJECT.md)
- Pitfalls: HIGH -- based on direct experience with remark/rehype ecosystem quirks
- Curriculum structure: HIGH -- existing module map, session template, and ADHD design principles are well-defined in project files

**Research date:** 2026-03-29
**Valid until:** 2026-04-28 (30 days -- stable ecosystem, no major releases expected)
