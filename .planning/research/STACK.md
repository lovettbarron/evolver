# Stack Research: v2.0 Eurorack Module Learning

**Domain:** Eurorack module learning system (extending existing instrument mastery app)
**Researched:** 2026-04-16
**Confidence:** HIGH

## Executive Summary

This milestone requires **zero new npm dependencies**. The existing stack (Next.js 15, React 19, Tailwind v4, Zod, Zustand 5, Motion, clsx) handles everything needed for eurorack module support. The work is schema extensions, new data files, new panel components, and new routes -- not new libraries.

The key architectural insight: eurorack modules are structurally simpler than integrated instruments (fewer controls, no signal-flow documents, no SysEx/patch-memory), but categorically more complex (multi-category taxonomy, cross-module interactions, variable HP widths). The schema needs a new `ModuleConfigSchema` alongside the existing `InstrumentConfigSchema`, and the content pipeline needs a `modules/` top-level directory parallel to `instruments/`.

## Existing Stack (Unchanged)

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | ^15.5.14 | App framework (App Router, server components) |
| React | ^19.2.4 | UI library |
| Tailwind CSS | 4.x | Styling (OKLCH design system, `@theme`) |
| Zod | ^3.23.0 | Schema validation at content boundaries |
| Zustand | ^5.0.12 | Client-side learner state with persist middleware |
| Motion | ^12.38.0 | Animation (panel interactions, transitions) |
| clsx | ^2.1.1 | Conditional class merging |
| unified/remark/rehype | 11.x | Markdown content pipeline |
| @tailwindcss/typography | ^0.5.19 | Prose rendering |

## What's New (No New Dependencies)

### 1. Schema Extensions (Zod)

**New schema: `ModuleConfigSchema`** -- parallel to `InstrumentConfigSchema` but tuned for individual eurorack modules.

```typescript
// In schemas.ts -- NEW
export const ModuleConfigSchema = z.object({
  display_name: z.string(),
  tagline: z.string(),
  manufacturer: z.string(),
  hp_width: z.number().int().min(2).max(84),     // Panel width in HP units
  depth_mm: z.number().int().optional(),           // Module depth in mm
  categories: z.array(z.enum([
    'vco', 'filter', 'effects', 'modulator',
    'function-generator', 'utility', 'sequencer',
  ])).min(1),                                       // Multi-category taxonomy
  primary_category: z.enum([                        // For default routing/display
    'vco', 'filter', 'effects', 'modulator',
    'function-generator', 'utility', 'sequencer',
  ]),
  sysex: z.literal(false),                         // Eurorack modules: always false
  patch_memory: z.literal(false),                   // Eurorack modules: always false
  companion_modules: z.array(z.string()).optional(), // e.g., crow pairs with just-friends
  reference_pdfs: z.array(z.object({
    label: z.string(),
    file: z.string(),
    url: z.string().url().optional(),               // Source URL for downloading
  })),
}).passthrough();
```

**Why a separate schema instead of extending `InstrumentConfigSchema`:** Instruments have capabilities (sysex, patch_memory, sampler, sequencer) that modules never have. Modules have HP width and multi-category taxonomy that instruments don't need. Separate schemas keep validation precise and avoid optional-field sprawl.

**Schema extension for `SessionSchema`:** Add optional `module_slug` field to distinguish eurorack module sessions from instrument sessions, since both use the same session format:

```typescript
// Extend existing SessionSchema
module_slug: z.string().optional(),  // e.g., "plaits", "maths" -- set for eurorack module sessions
```

### 2. Content Directory Structure

**New top-level `modules/` directory** parallel to `instruments/`:

```
evolver/
├── instruments/          # Existing -- complete instruments
│   ├── evolver/
│   ├── cascadia/
│   └── octatrack/
├── modules/              # NEW -- individual eurorack modules
│   ├── swells/
│   │   ├── module.json   # ModuleConfigSchema
│   │   └── overview.md   # Module description + controls
│   ├── plaits/
│   ├── beads/
│   ├── just-friends/
│   ├── crow/             # Companion to just-friends
│   ├── maths/
│   └── ikarie/
├── sessions/
│   ├── evolver/          # Existing
│   ├── cascadia/         # Existing
│   ├── octatrack/        # Existing
│   ├── swells/           # NEW -- module sessions
│   ├── plaits/
│   ├── beads/
│   ├── just-friends/
│   ├── maths/
│   └── ikarie/
└── patches/
    ├── evolver/          # Existing
    ├── cascadia/         # Existing
    └── modules/          # NEW -- module patches (shared space, tagged by module)
```

**Why `modules/` not under `instruments/`:** Modules are a conceptually different entity. An instrument is a self-contained learning journey. A module is one piece of a system. The content pipeline (`discoverInstruments`) scans `instruments/` -- a new `discoverModules` function scans `modules/` independently, returning items validated against `ModuleConfigSchema` instead of `InstrumentConfigSchema`.

### 3. Panel SVG Components (Per Module)

Each module gets its own panel data file and React component, following the established pattern:

| File | Purpose | Pattern Source |
|------|---------|----------------|
| `src/lib/{slug}-panel-data.ts` | Control metadata (IDs, names, types, positions) | `evolver-panel-data.ts` |
| `src/components/{slug}-panel.tsx` | SVG renderer with highlights, tooltips, interaction | `evolver-panel.tsx` |

**Control type interface for modules** -- extends the Cascadia pattern (most flexible):

```typescript
export interface ModuleControlMeta {
  id: string;
  name: string;
  type: 'knob' | 'slider' | 'switch' | 'jack-in' | 'jack-out' | 'led' | 'button';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}
```

No `module` field needed (unlike Cascadia which has 17 internal modules) -- a eurorack module IS the module.

**Panel dimension handling:** Eurorack panels have variable widths measured in HP (1 HP = 5.08mm = 0.2 inches). The SVG viewBox should scale proportionally:

```typescript
// Standard eurorack panel dimensions
const HP_TO_PX = 20;  // 1 HP = 20px in SVG space (convenient integer)
const PANEL_HEIGHT_PX = 256; // 3U = 128.5mm, scaled to ~256px

function panelViewBox(hpWidth: number): string {
  return `0 0 ${hpWidth * HP_TO_PX} ${PANEL_HEIGHT_PX}`;
}
```

### 4. Category Taxonomy System

Categories live in the Zod schema (see above) and in a shared constant for UI rendering:

```typescript
// src/lib/module-categories.ts
export const MODULE_CATEGORIES = {
  'vco': { label: 'Oscillators', color: 'oklch(0.75 0.15 150)' },
  'filter': { label: 'Filters', color: 'oklch(0.75 0.15 30)' },
  'effects': { label: 'Effects', color: 'oklch(0.75 0.15 270)' },
  'modulator': { label: 'Modulators', color: 'oklch(0.75 0.15 60)' },
  'function-generator': { label: 'Function Generators', color: 'oklch(0.75 0.15 200)' },
  'utility': { label: 'Utilities', color: 'oklch(0.65 0.05 80)' },
  'sequencer': { label: 'Sequencers', color: 'oklch(0.75 0.15 320)' },
} as const;
```

No external taxonomy library needed. The category set is small (7 values), closed (not user-extensible), and validated by Zod enum.

### 5. Module Manual PDFs

Manuals are stored in `references/modules/` and referenced from `module.json`:

```
references/
├── Evo_Key_Manual_1.3.pdf          # Existing
├── evolverguide.pdf                # Existing
├── cascadia_manual_v1.1.pdf        # Existing
└── modules/                        # NEW
    ├── swells-manual.pdf
    ├── plaits-quickstart.pdf
    ├── beads-quickstart.pdf
    ├── just-friends-technical-map.pdf
    ├── maths-manual.pdf
    ├── maths-illustrated-supplement.pdf
    └── ikarie-manual.pdf
```

## Module Specifications

### Panel Dimensions and Manual Sources

| Module | Manufacturer | HP Width | Depth | Manual Source URL | Confidence |
|--------|-------------|----------|-------|-------------------|------------|
| Swells | Intellijel | 20 HP | -- | [intellijel.com/downloads/manuals/swells_manual_v1.0_2026.04.09.pdf](https://intellijel.com/downloads/manuals/swells_manual_v1.0_2026.04.09.pdf) | HIGH |
| Plaits | Mutable Instruments | 12 HP | 25mm | [pichenettes.github.io/.../plaits_quickstart.pdf](https://pichenettes.github.io/mutable-instruments-documentation/modules/plaits/downloads/plaits_quickstart.pdf) | HIGH |
| Beads | Mutable Instruments | 14 HP | 25mm | [pichenettes.github.io/.../beads_quickstart.pdf](https://pichenettes.github.io/mutable-instruments-documentation/modules/beads/downloads/beads_quickstart.pdf) | HIGH |
| Just Friends | Mannequins / Whimsical Raps | 14 HP | 32mm | [github.com/whimsicalraps/Mannequins-Technical-Maps/.../just-friends.pdf](https://github.com/whimsicalraps/Mannequins-Technical-Maps/blob/main/just-friends/just-friends.pdf) | HIGH |
| Crow | Monome / Whimsical Raps | 2 HP | 41mm | [monome.org/docs/crow/](https://monome.org/docs/crow/) (web docs, no PDF) | MEDIUM |
| Maths | Make Noise | 20 HP | 24mm | [makenoisemusic.com/.../MATHSmanual2013.pdf](https://www.makenoisemusic.com/wp-content/uploads/2024/03/MATHSmanual2013.pdf) | HIGH |
| Ikarie | Casper x Bastl | 8 HP | -- | [bastl-instruments.com/files/manual-ikarie-web.pdf](https://bastl-instruments.com/files/manual-ikarie-web.pdf) | HIGH |

**Maths bonus resource:** The [Illustrated Supplement by Demonam](https://w2.mat.ucsb.edu/mat276n/resources/systems/CREATE_teachingSynth/manuals/8c_Maths2013-V1.11-printable.pdf) covers 34 patch ideas with illustrations -- excellent curriculum reference.

### Category Assignments

| Module | Categories | Primary Category |
|--------|-----------|-----------------|
| Swells | effects | effects |
| Plaits | vco | vco |
| Beads | effects | effects |
| Just Friends | modulator, vco, function-generator | modulator |
| Crow | utility | utility |
| Maths | function-generator, modulator, utility | function-generator |
| Ikarie | filter | filter |

### Approximate Control Counts (for panel data planning)

| Module | HP | Knobs | Switches | Jacks (in) | Jacks (out) | LEDs | Total |
|--------|----|-------|----------|------------|-------------|------|-------|
| Swells | 20 | ~8 | ~2 | ~4 | ~2 | ~4 | ~20 |
| Plaits | 12 | ~4 | 0 | ~4 | ~4 | ~2 | ~14 |
| Beads | 14 | ~6 | ~2 | ~4 | ~4 | ~4 | ~20 |
| Just Friends | 14 | ~7 | ~2 | ~4 | ~6 | 0 | ~19 |
| Crow | 2 | 0 | 0 | 2 | 4 | ~2 | ~8 |
| Maths | 20 | ~8 | ~4 | ~8 | ~8 | ~2 | ~30 |
| Ikarie | 8 | ~6 | ~2 | ~4 | ~4 | ~2 | ~18 |

Total: ~129 controls across 7 modules (compare: Evolver 110, Cascadia 179, Octatrack 78).

**Note:** These are estimates from web search. Exact counts must be verified against the downloaded manuals during panel-building. The synth-panel-builder skill requires reference-first hand-placement.

## What NOT to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Database (SQLite, PostgreSQL) | Content is markdown in a vault. Adding a database for 7 modules and <50 sessions is massive overengineering | Continue with filesystem content pipeline |
| CMS (Contentful, Sanity) | Same as above -- Obsidian IS the CMS | Vault reader pattern |
| SVG generation library (D3, Rough.js) | Panel SVGs are hand-placed from reference images per CLAUDE.md rules. Auto-generation produces wrong layouts | Manual SVG with data-driven rendering (existing pattern) |
| GraphQL (Apollo, URQL) | No complex relational queries needed. Modules have a flat category array, not a graph | Zod schemas + simple array filtering |
| State management library (Redux, Jotai) | Zustand 5 already handles learner state perfectly | Extend existing Zustand store |
| Component library (shadcn/ui, Radix) | 51+ existing components already styled. Adding a component library for 6 new module pages is backwards | Extend existing component set |
| react-pdf / pdf.js | Manuals are downloadable references, not rendered inline. A `<a href>` download link is sufficient | Native browser PDF viewing via link |
| Taxonomy library (taxonomy-js, etc.) | 7 categories, 7 modules. A Zod enum and a constant object is the right level of abstraction | Zod enum + MODULE_CATEGORIES constant |

## Integration Points with Existing System

### Content Reader Extensions

```typescript
// New functions needed in reader.ts (parallel to existing instrument functions)
export async function discoverModules(config: AppConfig): Promise<string[]>;
export async function loadModuleConfig(slug: string, config: AppConfig): Promise<ModuleConfig>;
export async function listModuleSessions(moduleSlug: string, config: AppConfig): Promise<...>;
export async function listModulesByCategory(category: string, config: AppConfig): Promise<...>;
```

### Zustand Store Extension

The existing learner store tracks completions keyed by `{instrument}/{sessionSlug}`. Module completions follow the same pattern: `modules/{moduleSlug}/{sessionSlug}`. No schema change needed -- just a naming convention.

### Routing

```
/instruments/[slug]/...          # Existing instrument routes (unchanged)
/modules/                        # NEW -- module browser (category grid)
/modules/[slug]/                 # NEW -- module overview + panel
/modules/[slug]/sessions/        # NEW -- module session list
/modules/[slug]/sessions/[id]/   # NEW -- individual session
```

### Demo Mode

Module demo data follows the same pattern as instrument demo data: bundled content in `src/content/modules/` with synthetic learner journeys.

### Per-Module Color Identity

Each module gets a color identity derived from its manufacturer, following the OKLCH pattern established in v1.3:

| Manufacturer | Hue Range | Rationale |
|-------------|-----------|-----------|
| Intellijel | ~200 (blue-cyan) | Matches Cascadia identity already in the system |
| Mutable Instruments | ~280 (purple) | Distinctive, MI's brand color leans purple |
| Mannequins | ~50 (gold) | Gold Clouds edition aesthetic |
| Monome | ~50 (gold) | Same ecosystem as Mannequins |
| Make Noise | ~0 (warm red) | Make Noise's bold red/black branding |
| Bastl | ~150 (teal-green) | Bastl's green brand color |

## Installation

```bash
# No new packages to install.
# The existing stack handles all v2.0 requirements.
```

## Version Compatibility

No new packages means no new compatibility concerns. The existing lockfile is stable.

## Sources

- [Intellijel Swells product page](https://intellijel.com/shop/eurorack/swells/) -- HP width, manual PDF (HIGH confidence)
- [ModularGrid: Plaits](https://modulargrid.net/e/mutable-instruments-plaits) -- HP width, depth (HIGH confidence)
- [Mutable Instruments Documentation: Plaits](https://pichenettes.github.io/mutable-instruments-documentation/modules/plaits/) -- Manual, specs (HIGH confidence)
- [ModularGrid: Beads](https://modulargrid.net/e/mutable-instruments-beads) -- HP width, depth (HIGH confidence)
- [Mutable Instruments Documentation: Beads](https://pichenettes.github.io/mutable-instruments-documentation/modules/beads/) -- Manual, specs (HIGH confidence)
- [ModularGrid: Just Friends](https://modulargrid.net/e/mannequins-just-friends) -- HP width, depth (HIGH confidence)
- [Whimsical Raps Technical Maps (GitHub)](https://github.com/whimsicalraps/Mannequins-Technical-Maps) -- Just Friends PDF documentation (HIGH confidence)
- [Monome Crow docs](https://monome.org/docs/crow/) -- Crow specs, i2c, Lua scripting (HIGH confidence)
- [ModularGrid: Crow](https://modulargrid.net/e/monome-crow) -- HP width, depth (HIGH confidence)
- [Make Noise Maths product page](https://www.makenoisemusic.com/modules/maths/) -- HP width, manual PDF (HIGH confidence)
- [Maths Illustrated Supplement](https://w2.mat.ucsb.edu/mat276n/resources/systems/CREATE_teachingSynth/manuals/8c_Maths2013-V1.11-printable.pdf) -- 34 patch ideas (HIGH confidence)
- [Bastl Ikarie product page](https://bastl-instruments.com/eurorack/modules/ikarie) -- HP width, manual link (HIGH confidence)
- Existing codebase: `src/lib/content/schemas.ts`, `src/lib/evolver-panel-data.ts`, `src/lib/cascadia-panel-data.ts`, `src/lib/content/reader.ts` -- established patterns (HIGH confidence)

---
*Stack research for: v2.0 Eurorack Module Learning*
*Researched: 2026-04-16*
