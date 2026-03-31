# Phase 7: Multi-Instrument UI + Schema Foundation - Research

**Researched:** 2026-03-31
**Domain:** Next.js dynamic UI, Zod schema extension, filesystem-driven instrument discovery
**Confidence:** HIGH

## Summary

Phase 7 de-hardcodes the UI chrome so both Evolver and Cascadia appear dynamically. The codebase already has strong foundations: `discoverInstruments()` scans instrument directories, all instrument pages use `[slug]` dynamic routing, and schemas use `.passthrough()`. The work is primarily: (1) creating `instrument.json` config files with capability flags, (2) refactoring Nav from hardcoded links to data-driven, (3) replacing the landing page hero with an instrument selector, (4) adding capability-gated MIDI page, and (5) extending PatchSchema with stub fields.

The codebase has ~20 hardcoded "evolver" references across 9 files. Most are straightforward to replace with dynamic instrument data. The MIDI connection code (`src/lib/midi/`) is intentionally Evolver-specific and should NOT be touched.

**Primary recommendation:** Work bottom-up -- instrument.json schema and reader first, then Nav refactor, then landing page, then capability-gated pages, then PatchSchema stubs. Each layer depends on the one below.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Separate `instrument.json` file per instrument directory (not frontmatter, not a new schema type)
- Fields: `display_name` (string), `tagline` (string), `manufacturer` (string), `sysex` (bool), `patch_memory` (bool), `reference_pdfs` (array of {label, file})
- Reader function reads instrument.json from each discovered instrument directory
- Zod schema validates instrument.json at parse time (consistent with existing schema-at-boundary pattern)
- Instrument switcher in nav: current instrument name acts as dropdown switcher
- Sub-links (Sessions, Patches, MIDI, Progress) scope to selected instrument
- Brand text stays as "evolver" (project name, not instrument name)
- Nav links conditionally hidden based on capability flags (e.g., no MIDI link for instruments with `sysex: false`)
- Switching instruments navigates to that instrument's overview page (`/instruments/{slug}`), not equivalent sub-page
- Demo badge preserved (Phase 6 decision)
- Instrument cards replace the current single-instrument hero on landing page
- One card per discovered instrument: display_name, tagline, session count, patch count
- Clicking a card navigates to `/instruments/{slug}` (instrument overview)
- Next session hero card moves to the instrument overview page (not landing)
- Landing page is the instrument selector; instrument overview is the "what to do next" page
- No-SysEx MIDI page: generic capability-driven page, not Cascadia-specific
- Reads instrument.json to determine what to show and why
- Includes CTA linking to the instrument's patch library
- Phase 7 adds stub fields: `cable_routing: z.unknown().optional()` and `knob_settings: z.unknown().optional()`
- Phase 9 refines stubs into full Zod shapes
- MIDI connection code in src/lib/midi/ is explicitly Evolver-only and should NOT be abstracted

### Claude's Discretion
- Exact instrument switcher dropdown component design (consistent with Ghostly/Domus dark editorial aesthetic)
- How to handle the ~20 hardcoded "evolver" references in source-refs, markdown processor, config defaults
- Instrument card layout details (spacing, typography, hover states)
- Whether to create a new `loadInstrumentConfig()` function or extend existing `discoverInstruments()`

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| MULTI-01 | Navigation dynamically lists all discovered instruments (no hardcoded Evolver links) | Nav refactor: replace hardcoded `navLinks` array with data-driven list from `discoverInstruments()` + `loadInstrumentConfig()`. See Architecture Pattern 1 and Hardcoded References inventory. |
| MULTI-02 | Instrument selector visible on landing page for choosing between Evolver and Cascadia | Landing page refactor: replace HeroCard with instrument cards. Server component calls `discoverInstruments()` + `loadInstrumentConfig()` for each. See Architecture Pattern 2. |
| MULTI-03 | MIDI/SysEx workspace hidden for instruments without SysEx capability (capability flag in instrument config) | Capability-gated MIDI page: read `sysex` flag from instrument.json, render informational page when false. See Architecture Pattern 3. |
| MULTI-04 | Patch detail view adapts to instrument type: parameter tables for Evolver, cable routing + knob positions for Cascadia | PatchSchema stub fields (`cable_routing`, `knob_settings`) as `z.unknown().optional()`. Full rendering deferred to Phase 9. Stubs prove schema compatibility. |
| CASC-04 | Cascadia reference PDF (manual v1.1) accessible via PDF viewer | Wire `reference_pdfs` from Cascadia's instrument.json to the InstrumentOverview component. PDF already exists at `src/content/references/cascadia_manual_v1.1.pdf`. API route already serves any PDF from references/. |
</phase_requirements>

## Standard Stack

### Core (already in project)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x | App framework, server components, dynamic routing | Already in use, `[slug]` routes exist |
| Zod | 3.x | Schema validation at parse boundaries | Already in use for all schemas |
| Tailwind CSS | 4.x | Styling | Already in use, dark editorial aesthetic |
| clsx | 2.x | Conditional class composition | Already in use |
| lucide-react | 1.x | Icons | Already in use |
| react-pdf | 10.x | PDF viewer | Already in use for reference PDFs |

### No New Dependencies Required

This phase requires zero new npm packages. All work uses existing libraries. The instrument.json reading uses Node `fs/promises` (already imported in reader.ts). The dropdown UI uses standard HTML/Tailwind. The capability flags are plain booleans in a Zod schema.

## Architecture Patterns

### Recommended File Changes
```
src/
├── lib/
│   └── content/
│       ├── schemas.ts          # Add InstrumentConfigSchema, extend PatchSchema
│       └── reader.ts           # Add loadInstrumentConfig()
├── components/
│   ├── nav.tsx                 # Refactor: data-driven nav with instrument switcher
│   ├── app-shell.tsx           # Pass instrument data to Nav
│   ├── instrument-overview.tsx # Read references from instrument.json instead of hardcoded
│   ├── source-ref.tsx          # De-hardcode PDF_MAP (use instrument.json)
│   └── instrument-card.tsx     # NEW: landing page instrument card
├── app/
│   ├── page.tsx                # Replace hero with instrument selector
│   ├── instruments/[slug]/
│   │   ├── page.tsx            # Add hero card, read reference_pdfs from instrument.json
│   │   └── midi/page.tsx       # Add capability check
│   └── layout.tsx              # Pass instrument list for nav
└── content/
    └── instruments/
        ├── evolver/
        │   └── instrument.json # NEW: Evolver capability config
        └── cascadia/
            └── instrument.json # NEW: Cascadia capability config
```

### Pattern 1: InstrumentConfigSchema + Reader

**What:** New Zod schema for instrument.json, new reader function.
**When to use:** Anywhere instrument metadata is needed (nav, landing, overview, MIDI page).

```typescript
// src/lib/content/schemas.ts
export const InstrumentConfigSchema = z.object({
  display_name: z.string(),
  tagline: z.string(),
  manufacturer: z.string(),
  sysex: z.boolean(),
  patch_memory: z.boolean(),
  reference_pdfs: z.array(z.object({
    label: z.string(),
    file: z.string(),
  })),
});

export type InstrumentConfig = z.infer<typeof InstrumentConfigSchema>;
```

```typescript
// src/lib/content/reader.ts
export async function loadInstrumentConfig(
  slug: string,
  config: AppConfig,
): Promise<InstrumentConfig> {
  const root = getContentRoot(config);
  const configPath = path.join(root, 'instruments', slug, 'instrument.json');
  const raw = await fs.readFile(configPath, 'utf-8');
  return InstrumentConfigSchema.parse(JSON.parse(raw));
}
```

**Recommendation:** Create a new `loadInstrumentConfig()` rather than extending `discoverInstruments()`. Reason: `discoverInstruments()` is a lightweight directory scan. Loading JSON + Zod parsing is a different concern. Keep them separate but composable.

### Pattern 2: Landing Page Instrument Cards

**What:** Server component that discovers instruments, loads configs, counts sessions/patches, renders cards.
**Key insight:** The landing page (`src/app/page.tsx`) is already a server component. It can call `discoverInstruments()` + `loadInstrumentConfig()` + `listSessions()` + `listPatches()` directly.

```typescript
// src/app/page.tsx (simplified structure)
export default async function Home() {
  const config = await loadConfig();
  const slugs = await discoverInstruments(config);
  const instruments = await Promise.all(
    slugs.map(async (slug) => {
      const instrumentConfig = await loadInstrumentConfig(slug, config);
      const sessions = await listSessions(slug, config);
      const patches = await listPatches(slug, config);
      return { slug, config: instrumentConfig, sessionCount: sessions.length, patchCount: patches.length };
    })
  );
  return <InstrumentSelector instruments={instruments} />;
}
```

### Pattern 3: Capability-Gated MIDI Page

**What:** The MIDI route checks the `sysex` capability flag and shows either the full MidiPage or an informational fallback.
**Key challenge:** The MIDI route (`src/app/instruments/[slug]/midi/page.tsx`) is currently a `'use client'` component. To read instrument.json server-side, either:
- (a) Convert to server component that conditionally renders MidiPage or NoSysexPage, OR
- (b) Create a server component wrapper that passes the capability flag as a prop

**Recommendation:** Option (a) -- make the MIDI route page a server component. It only needs to check one boolean flag, then render the appropriate client component. This follows the existing pattern where `instruments/[slug]/page.tsx` is already a server component.

```typescript
// src/app/instruments/[slug]/midi/page.tsx
import { loadInstrumentConfig } from '@/lib/content/reader';
import { loadConfig } from '@/lib/config';
import { MidiPage } from '@/components/midi-page';
import { NoSysexPage } from '@/components/no-sysex-page';

export default async function MidiRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = await loadConfig();
  const instrumentConfig = await loadInstrumentConfig(slug, config);

  if (!instrumentConfig.sysex) {
    return <NoSysexPage slug={slug} instrumentConfig={instrumentConfig} />;
  }

  return (
    <div>
      {/* existing header + MidiPage */}
      <MidiPage instrumentSlug={slug} />
    </div>
  );
}
```

### Pattern 4: Nav Refactor Strategy

**What:** Replace hardcoded `navLinks` array with data-driven navigation.
**Key challenge:** `nav.tsx` is a `'use client'` component (uses `usePathname()`). It cannot call filesystem functions directly. Instrument data must be passed as props from a server component.

**Data flow:**
1. `layout.tsx` (server component) calls `discoverInstruments()` + `loadInstrumentConfig()` for each
2. Passes instrument list to `AppShell` (already receives `isDemoMode`)
3. `AppShell` passes to `Nav`
4. `Nav` renders instrument switcher dropdown + scoped sub-links

**Instrument switcher behavior:**
- Shows current instrument name (derived from URL pathname)
- Dropdown lists all instruments
- Selecting an instrument navigates to `/instruments/{slug}`
- Sub-links (Sessions, Patches, MIDI, Progress) update href prefix based on current instrument
- MIDI link hidden when current instrument has `sysex: false`

### Pattern 5: instrument.json Data Files

**Evolver:**
```json
{
  "display_name": "Mono Evolver",
  "tagline": "Analog/digital hybrid synthesizer mastery",
  "manufacturer": "Dave Smith Instruments",
  "sysex": true,
  "patch_memory": true,
  "reference_pdfs": [
    { "label": "DSI Evolver Manual (v1.3)", "file": "Evo_Key_Manual_1.3.pdf" },
    { "label": "The Definitive Guide to Evolver -- Anu Kirk", "file": "evolverguide.pdf" }
  ]
}
```

**Cascadia:**
```json
{
  "display_name": "Cascadia",
  "tagline": "West coast modular synthesis exploration",
  "manufacturer": "Intellijel",
  "sysex": false,
  "patch_memory": false,
  "reference_pdfs": [
    { "label": "Cascadia Manual (v1.1)", "file": "cascadia_manual_v1.1.pdf" }
  ]
}
```

### Anti-Patterns to Avoid
- **Hardcoding instrument names in conditionals:** Do NOT write `if (slug === 'cascadia')`. Use capability flags from instrument.json. The no-SysEx page must work for ANY future instrument without SysEx.
- **Abstracting MIDI code:** The midi/ directory is Evolver-specific. Do NOT refactor it for multi-instrument support. Cascadia has no SysEx.
- **Making Nav a server component:** Nav uses `usePathname()` for active link detection. It must remain a client component. Pass data as props from the server layer.
- **Loading instrument.json on every page render:** Load once in layout.tsx and pass down. Do not re-read in every route component.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Dropdown UI | Custom dropdown from scratch | Standard HTML `<details>/<summary>` or a simple state-toggle div with Tailwind | Accessibility, keyboard nav |
| Schema validation | Manual JSON.parse + type assertions | Zod InstrumentConfigSchema.parse() | Consistent with all other schemas in project |
| Capability flags | Enum-based feature matrix | Boolean flags in instrument.json | Simple, extensible, no abstraction needed for 2 instruments |
| PDF path resolution | Separate PDF registry | `reference_pdfs` array in instrument.json + existing API route | API route already serves any PDF from references/ directory |

**Key insight:** The existing codebase already has all the infrastructure. This phase is about wiring existing pieces together dynamically instead of statically.

## Common Pitfalls

### Pitfall 1: Nav Client/Server Boundary
**What goes wrong:** Trying to call `loadInstrumentConfig()` inside `nav.tsx` (a client component) will fail at build time because it uses Node fs.
**Why it happens:** Easy to forget the client/server boundary when refactoring.
**How to avoid:** Load all instrument data in `layout.tsx` (server component), pass as serializable props through `AppShell` to `Nav`.
**Warning signs:** Import of `fs` or `path` in a `'use client'` file.

### Pitfall 2: Cascadia Directory Missing in Dev
**What goes wrong:** `discoverInstruments()` only finds `evolver` if no `cascadia/` directory exists in the content root.
**Why it happens:** The Cascadia instrument directory with at minimum `instrument.json` must be created as part of this phase.
**How to avoid:** Create `src/content/instruments/cascadia/instrument.json` early (wave 1). Also create a minimal `overview.md` so the instrument overview page doesn't 404.
**Warning signs:** Landing page only shows one instrument card.

### Pitfall 3: Wikilink Permalink Template
**What goes wrong:** The markdown processor has a hardcoded Evolver permalink template: `hrefTemplate: (permalink: string) => '/instruments/evolver/${permalink}'`.
**Why it happens:** This was correct when only Evolver existed.
**How to avoid:** Pass the instrument slug to `createMarkdownProcessor()` or `renderMarkdown()`. The processor is called from various pages that already know the slug.
**Warning signs:** Wikilinks in Cascadia content pointing to `/instruments/evolver/...` instead of `/instruments/cascadia/...`.

### Pitfall 4: Source-Ref PDF_MAP
**What goes wrong:** `source-ref.tsx` has a hardcoded `PDF_MAP` that only maps Evolver PDFs. Cascadia source references won't resolve.
**Why it happens:** The mapping was built for one instrument.
**How to avoid:** Two options: (a) make PDF_MAP data-driven from instrument.json, or (b) since source-ref is a client component, pass a PDF map as a prop. Option (b) is simpler -- the pages that render markdown already know the instrument slug and can load the config server-side.
**Warning signs:** Source references in Cascadia content showing as plain text instead of clickable PDF links.

### Pitfall 5: ConfigSchema Default Instrument
**What goes wrong:** `ConfigSchema` defaults `instrument` to `'evolver'`. With multi-instrument support, this field becomes less meaningful.
**Why it happens:** It was the right default for single-instrument mode.
**How to avoid:** Keep the default for backward compatibility but don't rely on it for nav/landing. The landing page should always show all instruments regardless of config.instrument.

### Pitfall 6: InstrumentOverview Hardcoded Session Count Text
**What goes wrong:** `instrument-overview.tsx` line 85 says `{sessionCount} sessions across 10 modules` -- the "10 modules" is hardcoded for Evolver.
**Why it happens:** Written when only Evolver existed.
**How to avoid:** Either compute module count dynamically or make it generic (just show session count).

## Code Examples

### instrument.json Zod Schema
```typescript
// Addition to src/lib/content/schemas.ts
export const InstrumentConfigSchema = z.object({
  display_name: z.string(),
  tagline: z.string(),
  manufacturer: z.string(),
  sysex: z.boolean(),
  patch_memory: z.boolean(),
  reference_pdfs: z.array(z.object({
    label: z.string(),
    file: z.string(),
  })),
}).passthrough(); // Allow future fields without breaking

export type InstrumentConfig = z.infer<typeof InstrumentConfigSchema>;
```

### PatchSchema Stub Extension
```typescript
// Modification to PatchSchema in src/lib/content/schemas.ts
export const PatchSchema = z.object({
  name: z.string(),
  type: z.enum(['bass', 'lead', 'pad', 'drum', 'texture', 'sequence']),
  session_origin: z.union([z.number(), z.null()]),
  description: z.string(),
  tags: z.array(z.string()),
  instrument: z.string(),
  created: z.string(),
  source: z.enum(['manual', 'sysex']).optional(),
  capture_date: z.string().optional(),
  program_number: z.number().int().min(0).max(127).optional(),
  challenge_id: z.string().optional(),
  // Phase 7: stub fields for CV-based instruments (refined in Phase 9)
  cable_routing: z.unknown().optional(),
  knob_settings: z.unknown().optional(),
}).passthrough();
```

### Nav Data Flow
```typescript
// layout.tsx additions
import { discoverInstruments } from '@/lib/content/reader';
import { loadInstrumentConfig } from '@/lib/content/reader';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await loadConfig();
  const isDemoMode = !config.vaultPath;
  const slugs = await discoverInstruments(config);
  const instruments = await Promise.all(
    slugs.map(async (slug) => ({
      slug,
      config: await loadInstrumentConfig(slug, config),
    }))
  );

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <AppShell isDemoMode={isDemoMode} instruments={instruments}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
```

### Instrument Card Component (new)
```typescript
// src/components/instrument-card.tsx
interface InstrumentCardProps {
  slug: string;
  displayName: string;
  tagline: string;
  sessionCount: number;
  patchCount: number;
}

// "Mission briefing" aesthetic consistent with HeroCard
export function InstrumentCard({ slug, displayName, tagline, sessionCount, patchCount }: InstrumentCardProps) {
  return (
    <Link href={`/instruments/${slug}`} className="bg-surface p-2xl rounded-lg hover:border-accent border border-surface transition-colors block">
      <h2 className="text-2xl font-bold mb-sm">{displayName}</h2>
      <p className="text-muted text-sm mb-md">{tagline}</p>
      <div className="flex gap-md text-xs text-muted">
        <span>{sessionCount} sessions</span>
        <span>{patchCount} patches</span>
      </div>
    </Link>
  );
}
```

## Hardcoded References Inventory

Complete inventory of hardcoded "evolver" references that need attention:

| File | Count | What | Action |
|------|-------|------|--------|
| `src/components/nav.tsx` | 6 | navLinks array with `/instruments/evolver/*` | Replace with dynamic links from instrument data |
| `src/app/page.tsx` | 2 | `config.instrument \|\| 'evolver'`, hero card | Replace with instrument selector |
| `src/app/instruments/[slug]/page.tsx` | 1 | Hardcoded `references` array for Evolver PDFs | Read from instrument.json `reference_pdfs` |
| `src/components/midi-page.tsx` | 1 | `import basicPatchJson from '@/content/instruments/evolver/basic-patch.sysex.json'` | OK to leave -- MidiPage only renders for instruments with sysex=true, which is only Evolver |
| `src/components/source-ref.tsx` | 2 | `PDF_MAP` with Evolver-only PDF mappings | Make data-driven from instrument.json |
| `src/lib/markdown/processor.ts` | 1 | `hrefTemplate` hardcoded to `/instruments/evolver/` | Parameterize with instrument slug |
| `src/lib/content/schemas.ts` | 1 | `ConfigSchema` defaults instrument to `'evolver'` | Keep default, don't rely on it for multi-instrument |
| `src/lib/config.ts` | 1 | `evolver.config.json` filename | Keep -- this is the PROJECT config, not instrument-specific |
| `src/lib/midi/connection.ts` | 2 | Device name detection for Evolver | Leave as-is (Evolver-specific MIDI, out of scope) |
| `src/components/instrument-overview.tsx` | 1 | "10 modules" hardcoded text | Make dynamic or generic |
| `src/components/app-shell.tsx` | 1 | Footer "Evolver Deep Learning" | Keep -- project name, not instrument name |

**Summary:** ~13 references need changes. ~7 are intentional (project name, config filename, Evolver-specific MIDI) and should stay.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hardcoded nav links | Data-driven from filesystem discovery | Phase 7 | Adding new instrument = adding a directory |
| Single-instrument landing | Instrument selector | Phase 7 | Users choose their instrument |
| All instruments show MIDI page | Capability-gated pages | Phase 7 | No-SysEx instruments get appropriate UI |
| Fixed PDF references per instrument | instrument.json reference_pdfs array | Phase 7 | PDFs configured per instrument |

## Open Questions

1. **Source-ref PDF resolution for Cascadia**
   - What we know: `source-ref.tsx` has a hardcoded `PDF_MAP`. Cascadia sessions (Phase 10) will have source references to the Cascadia manual.
   - What's unclear: Best approach for making PDF_MAP instrument-aware in a client component.
   - Recommendation: For Phase 7, extend `PDF_MAP` to include Cascadia entries (e.g., `'cascadia manual': '/api/references/cascadia_manual_v1.1.pdf'`). This is simple and works. A fully data-driven approach can wait until Phase 10 when Cascadia sessions actually use source refs.

2. **Markdown processor wikilink template**
   - What we know: `renderMarkdown()` is called from server components that know the instrument slug. The processor needs the slug for wikilink href templates.
   - What's unclear: Whether to add slug as a parameter to `renderMarkdown()` or to `createMarkdownProcessor()`.
   - Recommendation: Add instrument slug as optional second parameter to `renderMarkdown()`. Default to undefined which falls back to no instrument-scoped links (safe for framework content). This is the minimal change.

3. **Cascadia overview.md minimal content**
   - What we know: The instrument overview page calls `listInstrumentFiles()` and expects an `overview` type file. Without one, the page 404s.
   - What's unclear: How much Cascadia content to create in Phase 7 vs Phase 8.
   - Recommendation: Create a minimal `overview.md` with basic frontmatter and a one-paragraph description. Phase 8 fills it out fully. This unblocks the instrument overview page without front-loading content work.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest (via package.json) |
| Config file | `vitest.config.ts` |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MULTI-01 | Nav renders dynamic instrument links from discoverInstruments() | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "loadInstrumentConfig"` | No -- Wave 0 |
| MULTI-02 | Landing page shows instrument cards for all discovered instruments | unit | `npx vitest run src/app/__tests__/home.test.tsx` | Yes -- needs update |
| MULTI-03 | MIDI page shows no-sysex fallback when instrument.sysex=false | unit | `npx vitest run src/app/__tests__/midi-capability.test.tsx` | No -- Wave 0 |
| MULTI-04 | PatchSchema accepts cable_routing and knob_settings without breaking existing patches | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "PatchSchema"` | Yes -- needs new cases |
| CASC-04 | Cascadia reference PDF accessible via instrument.json config | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "loadInstrumentConfig"` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `npx vitest run --reporter=verbose`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `src/lib/content/__tests__/reader.test.ts` -- add `loadInstrumentConfig()` tests + Cascadia fixture (`__fixtures__/instruments/cascadia/instrument.json`)
- [ ] `src/lib/content/__tests__/schemas.test.ts` -- add `InstrumentConfigSchema` tests + PatchSchema cable_routing/knob_settings tests
- [ ] `src/app/__tests__/home.test.tsx` -- update for instrument selector (currently tests single-instrument hero)
- [ ] `__fixtures__/instruments/cascadia/instrument.json` -- test fixture for Cascadia instrument config
- [ ] `__fixtures__/instruments/evolver/instrument.json` -- test fixture for Evolver instrument config

## Sources

### Primary (HIGH confidence)
- Direct code inspection of all files listed in CONTEXT.md canonical references
- Existing test files at `src/lib/content/__tests__/`, `src/app/__tests__/`
- `src/content/instruments/evolver/` -- actual instrument directory structure
- `src/content/references/cascadia_manual_v1.1.pdf` -- confirmed exists
- `vitest.config.ts` -- test framework configuration

### Secondary (MEDIUM confidence)
- Hardcoded reference count (~20) from CONTEXT.md, verified by direct file inspection (actual count: ~20 across 11 files, ~13 need changes)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all existing libraries
- Architecture: HIGH -- patterns derived from direct code inspection, follows existing conventions
- Pitfalls: HIGH -- identified from actual code review, not hypothetical

**Research date:** 2026-03-31
**Valid until:** Stable -- no external dependencies or fast-moving libraries involved
