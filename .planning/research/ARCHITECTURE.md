# Architecture Patterns

**Domain:** Eurorack module learning integration into existing instrument mastery app
**Researched:** 2026-04-16

## Recommended Architecture

Eurorack modules are a **new top-level content type**, not nested under `instruments/`. They share infrastructure (reader, schemas, panel components, session/patch pipeline) but have their own discovery, routing, and data model. The key structural difference: instruments are monolithic (one panel, one set of sessions), while modules are small, category-tagged, and designed for cross-referencing.

### Content Layout

```
modules/                          # NEW -- top-level, parallel to instruments/
  plaits/
    module.json                   # ModuleConfigSchema (replaces instrument.json)
    overview.md                   # InstrumentFileSchema reused (type: 'overview')
    signal-flow.md
  beads/
    module.json
    overview.md
    signal-flow.md
  maths/
    module.json
    overview.md
    signal-flow.md
  just-friends/
    module.json
    overview.md
    signal-flow.md
  swells/
    module.json
    overview.md
    signal-flow.md
  ikarie/
    module.json
    overview.md
    signal-flow.md

sessions/                         # EXISTING -- modules get their own subdirectory
  evolver/                        # existing
  cascadia/                       # existing
  octatrack/                      # existing
  plaits/                         # NEW -- module sessions follow same pattern
  beads/
  maths/
  just-friends/
  swells/
  ikarie/

patches/                          # EXISTING -- same pattern
  plaits/                         # NEW
  beads/
  ...
```

### Why Top-Level `modules/` Instead of `instruments/`

1. **Semantic clarity.** The Evolver is an instrument. Plaits is a module. Mixing them under `instruments/` creates a false equivalence and confuses the nav hierarchy.
2. **Different data model.** Modules have HP width, categories (multiple), power requirements, jack/control counts typical of eurorack. Instruments have SysEx, patch memory, sequencer flags. Separate schemas keep both clean.
3. **Category browsing.** Modules need a category taxonomy layer (`/modules?category=vco`) that instruments don't. A separate top-level section makes this natural.
4. **Sessions and patches reuse existing paths.** `sessions/<slug>/` and `patches/<slug>/` already work for any slug. No changes needed to the file layout -- just the discovery/reader functions.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `modules/<slug>/module.json` | Module identity, categories, HP, manufacturer, power | Schema validation, reader |
| `src/lib/content/reader.ts` | NEW functions: `discoverModules()`, `loadModuleConfig()`, `listModulesByCategory()` | Existing content pipeline |
| `src/lib/content/schemas.ts` | NEW `ModuleConfigSchema` | reader.ts, route pages |
| `src/app/modules/page.tsx` | Module index with category filter tabs | reader, nav |
| `src/app/modules/[slug]/page.tsx` | Module overview (mirrors instrument page) | reader, panel, sessions |
| `src/app/modules/[slug]/sessions/page.tsx` | Module sessions list | Reuses `SessionListClient` |
| `src/app/modules/[slug]/patches/page.tsx` | Module patches list | Reuses patch components |
| `src/app/modules/[slug]/panel/page.tsx` | Module panel visualizer | New per-module panel components |
| `src/components/module-panel.tsx` | Generic SVG panel renderer for modules | Per-module panel data files |
| `src/lib/modules/<slug>-panel-data.ts` | Per-module control metadata (hand-placed) | Panel component |
| `src/components/nav.tsx` | Add "Modules" top-level link + module context | discoverModules(), route |
| `src/components/category-filter.tsx` | NEW: category tab/pill filter for module index | Module index page |

### Data Flow

```
Vault (~/song/) or bundled (src/content/)
    |
    +-- modules/<slug>/module.json    --> ModuleConfigSchema.parse()
    +-- modules/<slug>/*.md           --> InstrumentFileSchema.parse() (reused)
    +-- sessions/<slug>/*.md          --> SessionSchema.parse() (reused, no changes)
    +-- patches/<slug>/*.md           --> PatchSchema.parse() (reused)
    |
    v
reader.ts (new functions alongside existing ones)
    |
    v
Server Components (module pages)
    |
    v
Client Components (panels, session lists, patch library -- reused)
```

## Schema Design

### ModuleConfigSchema (NEW)

```typescript
// src/lib/content/schemas.ts -- ADD alongside InstrumentConfigSchema

export const MODULE_CATEGORIES = [
  'vco', 'vcf', 'vca', 'envelope', 'lfo', 'modulator',
  'function-generator', 'effects', 'utilities', 'sequencer',
] as const;

export type ModuleCategory = typeof MODULE_CATEGORIES[number];

export const ModuleConfigSchema = z.object({
  display_name: z.string(),
  tagline: z.string(),
  manufacturer: z.string(),
  hp: z.number().int().positive(),             // Panel width in HP (e.g., 16, 12, 18)
  categories: z.array(z.enum(MODULE_CATEGORIES)).min(1),
  primary_category: z.enum(MODULE_CATEGORIES), // Default sorting/display category
  power: z.object({
    plus_12v: z.number().int(),                // mA on +12V
    minus_12v: z.number().int(),               // mA on -12V
    plus_5v: z.number().int().optional(),      // mA on +5V (rare)
  }).optional(),
  depth_mm: z.number().int().optional(),       // Module depth in mm
  reference_pdfs: z.array(z.object({
    label: z.string(),
    file: z.string(),
  })),
  // Eurorack modules never have SysEx or patch memory
  // so those fields are intentionally absent (not false -- absent)
}).passthrough();

export type ModuleConfig = z.infer<typeof ModuleConfigSchema>;
```

### Example module.json Files

```json
// modules/maths/module.json
{
  "display_name": "Maths",
  "tagline": "Analog function generator, envelope, LFO, slew, and utilities",
  "manufacturer": "Make Noise",
  "hp": 20,
  "categories": ["function-generator", "envelope", "lfo", "utilities"],
  "primary_category": "function-generator",
  "power": { "plus_12v": 60, "minus_12v": 50 },
  "depth_mm": 24,
  "reference_pdfs": [
    { "label": "Maths Illustrated Supplement", "file": "maths-illustrated-supplement.pdf" }
  ]
}
```

```json
// modules/plaits/module.json
{
  "display_name": "Plaits",
  "tagline": "Macro oscillator with 16 synthesis models",
  "manufacturer": "Mutable Instruments",
  "hp": 12,
  "categories": ["vco"],
  "primary_category": "vco",
  "power": { "plus_12v": 50, "minus_12v": 5 },
  "depth_mm": 25,
  "reference_pdfs": [
    { "label": "Plaits Manual", "file": "plaits-manual.pdf" }
  ]
}
```

```json
// modules/just-friends/module.json
{
  "display_name": "Just Friends",
  "tagline": "6-channel function generator, oscillator bank, and envelope shaper",
  "manufacturer": "Mannequins",
  "hp": 10,
  "categories": ["modulator", "vco", "envelope"],
  "primary_category": "modulator",
  "power": { "plus_12v": 50, "minus_12v": 40 },
  "depth_mm": 26,
  "reference_pdfs": [
    { "label": "Just Friends Manual", "file": "just-friends-manual.pdf" }
  ]
}
```

### Schema Backward Compatibility

- **SessionSchema** -- No changes needed. `instrument: z.string()` already accepts any slug (including module slugs like `"plaits"`). The field name is slightly misleading but the data shape is correct, and renaming it would break all existing content.
- **PatchSchema** -- No changes needed. Same reasoning. The `cable_routing` and `knob_settings` optional fields are useful for module patches too.
- **InstrumentFileSchema** -- Reusable for module overview/signal-flow markdown (type: 'overview', type: 'signal-flow'). The `category` field on this schema (sound-source, shaper, modulator, utility) is for Cascadia sub-modules, not eurorack categories -- don't conflate them.
- **InstrumentConfigSchema** -- NOT modified. Modules use `ModuleConfigSchema` instead. No shared base type needed -- the shapes are different enough.
- **ConfigSchema** -- No changes. `vaultPath` determines content root for both instruments and modules.

## Route Structure

### Recommended Routes

```
/modules                           # Module index with category filter tabs
/modules/[slug]                    # Module overview page
/modules/[slug]/sessions           # Module sessions
/modules/[slug]/sessions/[session] # Individual session
/modules/[slug]/patches            # Module patches
/modules/[slug]/panel              # Module panel visualizer
```

### Why `/modules/` Not `/eurorack/`

- `/modules` is shorter and more direct
- If non-eurorack modules ever appear (e.g., 500-series, or Cascadia sub-modules linked independently), the route still works
- Matches the content directory name (`modules/`)
- Avoids `/eurorack/plaits` which sounds like a manufacturer directory

### Category Filtering -- NOT Category Routes

Do NOT create `/modules/vco/plaits` nested routes. Instead:

- `/modules` shows all modules with category filter tabs/pills at the top
- `/modules?category=vco` pre-selects the VCO tab (URL-persisted state)
- Multi-category modules (Maths, Just Friends) appear under every matching tab
- This avoids duplicate routes and the "which category is canonical?" problem
- Follow the same pattern as the existing patch filter bar which uses URL query params

### Navigation Changes

The `Nav` component currently builds sub-links from `pathname.match(/\/instruments\/([^/]+)/)`. Add a parallel pattern:

```typescript
// In nav.tsx
const moduleMatch = pathname.match(/\/modules\/([^/]+)/);
const currentModuleSlug = moduleMatch ? moduleMatch[1] : '';
```

Add "Modules" as a top-level nav item. When on a module page, show Sessions, Patches, Panel sub-links scoped to the module. The existing `InstrumentSwitcher` pattern can be adapted into a `ModuleSwitcher` component.

The `[data-instrument]` CSS attribute for color identity continues to work -- set `data-instrument={moduleSlug}` on module pages. No rename to `data-entity` or similar needed.

## Reader Extensions

### New Functions in reader.ts

```typescript
// Discover modules by scanning modules/ directory
export async function discoverModules(config: AppConfig): Promise<string[]> {
  const root = getContentRoot(config);
  const modulesDir = path.join(root, 'modules');
  try {
    const entries = await fs.readdir(modulesDir, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
      .map((e) => e.name)
      .sort();
  } catch {
    return []; // No modules directory yet -- graceful degradation
  }
}

// Load module config
export async function loadModuleConfig(
  slug: string,
  config: AppConfig,
): Promise<ModuleConfig> {
  const root = getContentRoot(config);
  const configPath = path.join(root, 'modules', slug, 'module.json');
  const raw = await fs.readFile(configPath, 'utf-8');
  return ModuleConfigSchema.parse(JSON.parse(raw));
}

// List all modules with their configs (for index page)
export async function listAllModules(
  config: AppConfig,
): Promise<Array<{ slug: string; config: ModuleConfig }>> {
  const slugs = await discoverModules(config);
  return Promise.all(
    slugs.map(async (slug) => ({
      slug,
      config: await loadModuleConfig(slug, config),
    })),
  );
}

// List modules filtered by category
export async function listModulesByCategory(
  category: ModuleCategory,
  config: AppConfig,
): Promise<Array<{ slug: string; config: ModuleConfig }>> {
  const all = await listAllModules(config);
  return all.filter((m) => m.config.categories.includes(category));
}

// List module overview/signal-flow files (reuses InstrumentFileSchema)
export async function listModuleFiles(
  slug: string,
  config: AppConfig,
): Promise<Array<{ data: InstrumentFile; content: string; slug: string }>> {
  const root = getContentRoot(config);
  const pattern = path.join(root, 'modules', slug, '*.md');
  const files = await glob(pattern);
  return Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const validated = InstrumentFileSchema.parse(data);
      const fileSlug = path.basename(filePath, '.md');
      return { data: validated, content, slug: fileSlug };
    }),
  );
}
```

### Session and Patch Functions -- No Changes Needed

`listSessions(slug, config)` and `listPatches(slug, config)` already work with any slug because they read from `sessions/<slug>/` and `patches/<slug>/`. Module sessions just need to exist at `sessions/plaits/`, `sessions/maths/`, etc. Zero code changes.

## Panel Component Pattern for Modules

### How Module Panels Differ From Instrument Panels

| Aspect | Instrument Panels | Module Panels |
|--------|-------------------|---------------|
| Size | 800-1200px wide, 400-600px tall | HP-proportional: `hp * 15px` wide, ~400px tall |
| Controls | 110-179 controls | 5-30 controls |
| Complexity | Multiple sections, section tints, tooltips | Single faceplate, no section divisions |
| Jacks | Cascadia: 95 jacks; Evolver/Octatrack: 0 | 4-20 jacks on front plate |
| Data file | 300-800 lines | 30-150 lines |
| Component file | 400-800 lines | 100-300 lines (generic renderer) |

### Panel Sizing Convention

Use HP as the sizing primitive. Standard eurorack HP = 5.08mm. In the SVG:

```typescript
const HP_TO_PX = 15; // Rendering scale factor
const panelWidth = hp * HP_TO_PX;
const panelHeight = 400; // Standard 3U height in px
```

This means a 20HP Maths panel renders at 300px wide, a 12HP Plaits at 180px. Compact enough to inline in sessions.

### Generic Module Panel Component

Create ONE `ModulePanel` component that renders any module from its data file. This differs from the instrument approach (one component per instrument) because module panels are simpler and structurally similar (faceplate with knobs, jacks, switches).

```typescript
// src/components/module-panel.tsx
interface ModulePanelProps {
  slug: string;
  hp: number;
  controls: Record<string, ModuleControlMeta>;
  highlights?: Array<{ controlId: string; color: 'blue' | 'amber' }>;
  className?: string;
}
```

The component handles: rendering knobs/jacks/switches at given x,y positions, highlight overlays, tooltips. The data file with coordinates is per-module and hand-authored per CLAUDE.md's "reference-first, hand-placed" principle.

### Panel Data Structure

```typescript
// src/lib/modules/panel-types.ts -- shared interface
export interface ModuleControlMeta {
  id: string;
  name: string;
  type: 'knob' | 'slider' | 'switch' | 'jack-in' | 'jack-out' | 'led' | 'button';
  x: number;  // Position within HP-scaled SVG
  y: number;
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

// src/lib/modules/plaits-panel-data.ts -- per-module (hand-placed from manual photo)
import type { ModuleControlMeta } from './panel-types';

export const PLAITS_CONTROLS: Record<string, ModuleControlMeta> = {
  'knob-plaits-harmonics': { id: 'knob-plaits-harmonics', name: 'Harmonics', type: 'knob', x: 45, y: 80 },
  'knob-plaits-timbre': { id: 'knob-plaits-timbre', name: 'Timbre', type: 'knob', x: 135, y: 80 },
  // ... hand-placed from manual photo
};
```

### File Structure for Panels

```
src/lib/modules/                    # NEW directory
  panel-types.ts                    # Shared ModuleControlMeta interface
  plaits-panel-data.ts              # Hand-placed coordinates
  beads-panel-data.ts
  maths-panel-data.ts
  just-friends-panel-data.ts
  swells-panel-data.ts
  ikarie-panel-data.ts

src/components/
  module-panel.tsx                  # Generic renderer (one component for all modules)
```

## Cross-Module Interaction in the Content Model

### Session Cross-References

Add optional `related_modules` to session frontmatter (backward-compatible via `.passthrough()`):

```yaml
---
title: "Granular textures from Plaits"
module: "sound-design"
session_number: 3
instrument: "beads"
related_modules: ["plaits"]
tags: ["cross-module", "granular", "vco"]
---
```

The `instrument` field is the primary/owning module. `related_modules` lists other modules referenced. The UI can show "Also uses: Plaits" with a link. No schema change needed -- `.passthrough()` accepts extra fields silently.

### Category-Based Suggestions

On module pages, show "Related modules in this category" using the category data from `module.json`. This is a read-time computation, not stored data:

```typescript
// On the Plaits overview page (categories: ['vco']):
const relatedVCOs = await listModulesByCategory('vco', config);
// Filter out self, display the rest
```

## Per-Module Color Identity

The existing `[data-instrument="<slug>"]` CSS cascade for OKLCH colors works for modules too:

```css
[data-instrument="plaits"]       { --instrument-hue: 45; }   /* Mutable gold */
[data-instrument="beads"]        { --instrument-hue: 280; }  /* Mutable purple */
[data-instrument="maths"]        { --instrument-hue: 200; }  /* Make Noise teal */
[data-instrument="just-friends"] { --instrument-hue: 340; }  /* Mannequins pink */
[data-instrument="swells"]       { --instrument-hue: 220; }  /* Intellijel blue */
[data-instrument="ikarie"]       { --instrument-hue: 30; }   /* Bastl orange */
```

No refactoring of the attribute name needed. The CSS cascade does not care whether the slug is an instrument or module.

## Patterns to Follow

### Pattern 1: Filesystem Discovery (Proven)

**What:** `discoverModules()` mirrors `discoverInstruments()` -- scan a directory, return slugs.
**When:** Module index page, nav component, anywhere that lists available modules.
**Why:** Already proven for instruments. No database, no config array to maintain. Add a directory with `module.json` = it appears.

### Pattern 2: Schema Per Content Type, Readers Per Content Location

**What:** `ModuleConfigSchema` validates `module.json`. `InstrumentFileSchema` validates module markdown files. Readers know where files live (path patterns).
**When:** Any new content type.
**Why:** Schemas define shape; readers define location. This separation keeps schemas reusable across content types.

### Pattern 3: Capability-Gated UI

**What:** Show/hide nav links based on what data exists (just as MIDI link only shows for sysex instruments).
**When:** Module pages -- only show "Panel" link if panel data exists for that module. Only show "Patches" if patches directory has content.
**Why:** Modules will be added incrementally. A module without a panel yet should not show a broken link.

### Pattern 4: URL Query Params for Filtering (Proven)

**What:** Use `?category=vco` on the module index, not nested routes.
**When:** Category filtering on `/modules`.
**Why:** Already proven with patch filter bar. Supports multi-category membership without route duplication. Browser back button works. Shareable URLs.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Modules as Sub-Instruments

**What:** Putting modules inside `instruments/modules/` or treating them as instruments with special flags.
**Why bad:** Forces instrument-shaped data onto module-shaped things. Category taxonomy doesn't fit instrument routing. The nav becomes confusing ("is Plaits an instrument?"). InstrumentConfigSchema would need optional eurorack fields that real instruments never use.
**Instead:** Separate top-level `modules/` directory with its own schema and routes.

### Anti-Pattern 2: Category Routes Creating Duplicate Pages

**What:** `/modules/vco/plaits` AND `/modules/effects/beads` AND `/modules/beads` -- multiple routes to the same content.
**Why bad:** SEO confusion, stale links, unclear canonical URL, maintenance burden, "which category page do I link to for Maths?"
**Instead:** Single `/modules/[slug]` route. Categories are a filter on the index page via query params.

### Anti-Pattern 3: Generic Panel Without Hand-Placed Data

**What:** Algorithmically computing control positions from a list (evenly spacing knobs in a grid).
**Why bad:** Real eurorack panels have intentional, non-uniform layouts. Algorithmic placement looks wrong and violates the reference-first principle from CLAUDE.md.
**Instead:** Generic renderer component, but per-module data files with hand-placed x,y coordinates from manual photos.

### Anti-Pattern 4: Separate Session/Patch Schemas for Modules

**What:** Creating `ModuleSessionSchema`, `ModulePatchSchema` parallel to the existing schemas.
**Why bad:** Sessions and patches are structurally identical whether they belong to an instrument or module. Duplicating schemas creates drift and doubles validation logic.
**Instead:** Reuse `SessionSchema` and `PatchSchema` as-is. The `instrument` field holds the module slug.

### Anti-Pattern 5: Shared Base Schema for Instruments and Modules

**What:** Creating `EntityConfigSchema` that both `InstrumentConfigSchema` and `ModuleConfigSchema` extend.
**Why bad:** The overlap is minimal (display_name, tagline, manufacturer, reference_pdfs). The differences are significant (sysex/patch_memory/sampler vs hp/categories/power). A shared base adds complexity for minimal deduplication.
**Instead:** Two independent schemas. Copy the 4 shared fields. Clarity over DRY.

## Integration Points: New vs Modified

### New Files (Create)

| File | Purpose |
|------|---------|
| `src/lib/content/schemas.ts` (additions) | `ModuleConfigSchema`, `MODULE_CATEGORIES`, `ModuleCategory` |
| `src/lib/content/reader.ts` (additions) | `discoverModules()`, `loadModuleConfig()`, `listAllModules()`, `listModulesByCategory()`, `listModuleFiles()` |
| `src/app/modules/page.tsx` | Module index with category tabs |
| `src/app/modules/[slug]/page.tsx` | Module overview |
| `src/app/modules/[slug]/sessions/page.tsx` | Module sessions list |
| `src/app/modules/[slug]/sessions/[session]/page.tsx` | Individual module session |
| `src/app/modules/[slug]/patches/page.tsx` | Module patches |
| `src/app/modules/[slug]/panel/page.tsx` | Module panel visualizer |
| `src/components/module-panel.tsx` | Generic module panel renderer |
| `src/components/category-filter.tsx` | Category tab/pill filter |
| `src/lib/modules/panel-types.ts` | Shared panel control interface |
| `src/lib/modules/<slug>-panel-data.ts` | Per-module panel data (6 files) |
| `modules/<slug>/module.json` | Per-module config (6 files) |
| `modules/<slug>/overview.md` | Per-module overview (6 files) |

### Modified Files

| File | Change |
|------|--------|
| `src/components/nav.tsx` | Add "Modules" link, module-context sub-links |
| `src/app/globals.css` | Add module color identity CSS rules |
| `src/app/page.tsx` | Add modules section to home page |
| `src/app/layout.tsx` | Pass modules to Nav alongside instruments |

### Unchanged Files

- All instrument panel components and data files
- `SessionSchema`, `PatchSchema`, `InstrumentConfigSchema` (schemas unchanged)
- `listSessions()`, `listPatches()` (reader functions unchanged)
- `evolver.config.json` (no new config needed)
- All existing instrument routes and content

## Suggested Build Order

### Wave 1: Data Model + Content Pipeline (Foundation)

1. Add `ModuleConfigSchema`, `MODULE_CATEGORIES` to `schemas.ts`
2. Add reader functions to `reader.ts`
3. Create first `modules/plaits/module.json` as test fixture
4. Create `modules/plaits/overview.md` with basic content
5. Verify vault triple-write works for `modules/` directory

**Tests:** Schema validation, reader discovery, category filtering.
**Exit criteria:** `discoverModules()` returns `['plaits']`, `loadModuleConfig('plaits')` parses successfully.

### Wave 2: Routes + Navigation

6. Module index page (`/modules`) with category filter
7. Module detail page (`/modules/[slug]`) mirroring instrument overview
8. Module sessions page (reusing `SessionListClient`)
9. Module patches page (reusing patch components)
10. Nav updates -- "Modules" link, module sub-links

**Tests:** Route rendering, category filter URL persistence, nav link generation.
**Exit criteria:** Can navigate to `/modules`, filter by category, click into Plaits overview.

### Wave 3: Panel System

11. `ModuleControlMeta` interface and `panel-types.ts`
12. Generic `ModulePanel` component
13. First panel data -- `plaits-panel-data.ts` (hand-placed from manual photo)
14. Panel route (`/modules/[slug]/panel`)
15. Session inline panel markers (`[data-module-panel]`)

**Tests:** Panel rendering, control highlighting, HP-based sizing.
**Exit criteria:** Plaits panel renders at correct HP width with all controls positioned.

### Wave 4: Content Authoring (Per Module, Parallelizable)

16-21. For each of the 6 modules:
    - `module.json` with categories and metadata
    - `overview.md` and `signal-flow.md`
    - Panel data file (hand-placed from manual photo)
    - 3-5 initial sessions
    - 1-2 demo patches

**Suggested order within Wave 4:**
1. Plaits (most popular, simplest panel, single category)
2. Maths (most versatile, many categories, well-documented)
3. Beads (granular -- good for cross-module sessions with Plaits)
4. Ikarie (stereo filter -- straightforward)
5. Swells (reverb -- simple module)
6. Just Friends (most complex -- dual module with Crow, 3 categories)

### Wave 5: Cross-Module Features + Polish

22. Related modules display in session pages
23. Category-based module suggestions on overview pages
24. Demo mode synthetic data for modules
25. Home page modules section
26. Color identity CSS rules for all 6 modules

## Scalability Considerations

| Concern | At 6 modules | At 20 modules | At 100 modules |
|---------|-------------|---------------|----------------|
| Discovery | `readdir` instant | `readdir` still fast | Consider build-time manifest |
| Category index | Filter in memory | Filter in memory | Pre-compute at build time |
| Panel data | 6 files, static imports | Dynamic imports by slug | Same -- each file is small |
| Nav | "Modules" link + switcher | Category sub-menu | Searchable module picker |
| Sessions | Same as instruments | Same | Consider pagination |

At the 6-module scale, no performance concerns. The filesystem discovery pattern scales to dozens of modules without issues.

## Sources

- Existing codebase: `src/lib/content/reader.ts` -- filesystem discovery and content reading patterns (HIGH confidence)
- Existing codebase: `src/lib/content/schemas.ts` -- Zod schema patterns, `.passthrough()` usage (HIGH confidence)
- Existing codebase: `src/components/evolver-panel.tsx`, `src/lib/cascadia-panel-data.ts` -- panel component architecture (HIGH confidence)
- Existing codebase: `src/app/instruments/[slug]/page.tsx` -- routing and page composition pattern (HIGH confidence)
- CLAUDE.md: reference-first panel design principles, triple-write pipeline, session conventions (HIGH confidence)
- PROJECT.md: v2.0 milestone definition, 6 target modules with categories (HIGH confidence)
