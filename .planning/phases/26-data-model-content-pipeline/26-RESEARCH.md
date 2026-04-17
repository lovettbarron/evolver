# Phase 26: Data Model + Content Pipeline - Research

**Researched:** 2026-04-17
**Domain:** Zod schemas, content readers, frontmatter migration, file system content pipeline
**Confidence:** HIGH

## Summary

This phase adds eurorack module support to the existing content pipeline: a new `ModuleConfigSchema`, a `discoverModules()` reader, renaming `module` to `section` in 95 session files plus all code references, adding `instrument_type` for filtering, creating the triple-write directory structure for modules, and downloading 7 reference PDFs.

The codebase has well-established patterns for all of these operations. `InstrumentConfigSchema` + `discoverInstruments()` + `loadInstrumentConfig()` provide a direct template for the module equivalents. The `module` to `section` rename is the riskiest task -- it touches 95 markdown files across 3 locations (working tree, `src/content/`, `~/song/`), 2 test fixture files, the `SessionSchema` definition, and approximately 15 TypeScript source files that reference `session.data.module` or the `ModuleGroup` interface.

**Primary recommendation:** Execute the rename first (it is the highest-risk, highest-blast-radius change), then layer on ModuleConfigSchema and discoverModules() which are additive and low-risk.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01: ModuleConfigSchema includes essential fields + power specs: `display_name`, `tagline`, `manufacturer`, `hp_width`, `categories[]`, `reference_pdfs[]`, plus `power_specs` object (+12V/-12V mA draw)
- D-02: ModuleConfigSchema is independent of InstrumentConfigSchema -- share rendering components, not schemas
- D-03: No `init_state` field in module.json -- init state is curriculum content
- D-04: Module directories live at top-level `modules/<slug>/` parallel to `instruments/<slug>/`
- D-05: Each module directory contains `module.json` (config) and `overview.md` (architecture, controls reference)
- D-06: Triple-write pipeline mirrors all three locations: working tree `modules/<slug>/`, `src/content/modules/<slug>/`, and `~/song/modules/<slug>/`
- D-07: Categories are a fixed Zod enum
- D-08: Initial enum values: `vco`, `filter`, `effects`, `modulator`, `function-generator`, `envelope-generator`
- D-09: Module category assignments (Maths, Plaits, Beads, Swells, Ikarie, Just Friends, Crow)
- D-10: Module sessions live at `sessions/<module-slug>/`
- D-11: `instrument_type` field added to SessionSchema: `'instrument'` (default) or `'eurorack_module'`
- D-12: The `module` to `section` rename AND `instrument_type: instrument` addition happen in a single batch migration

### Claude's Discretion
- Exact field names and Zod schema structure for power_specs
- Migration script approach for the 95-session rename + type addition
- `discoverModules()` implementation details

### Deferred Ideas (OUT OF SCOPE)
None
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DATA-01 | ModuleConfigSchema validates HP width, manufacturer, power specs, and multi-category array | Existing InstrumentConfigSchema pattern in schemas.ts; Zod z.enum() for categories, z.object for power_specs |
| DATA-02 | Module content directories discovered by reader functions parallel to instruments | discoverInstruments() in reader.ts is the direct template -- scan `modules/` instead of `instruments/` |
| DATA-03 | SessionSchema `module` field renamed to `section` across all 95 sessions and schema | Rename touches: schemas.ts (line 5), 95 session .md files x3 locations, 2 fixture .md files, ~15 .ts/.tsx source files, ~5 test files |
| DATA-04 | Module sessions use `instrument_type: eurorack_module` to distinguish from instrument sessions | Add optional field to SessionSchema with `.default('instrument')`, add to listSessions() as optional filter |
| DATA-05 | Triple-write pipeline supports module content | Follow existing pattern: getContentRoot() resolves base, create `modules/` directory at each location |
| DATA-06 | Module manuals downloaded to `references/` for all 7 modules | Manufacturer docs available online; manual file naming follows existing kebab-case convention |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zod | 3.25.76 | Schema validation | Already used throughout; ModuleConfigSchema follows same pattern |
| gray-matter | (existing) | Frontmatter extraction | Already used in reader.ts and writer.ts |
| glob | (existing) | File discovery | Already used in discoverInstruments() and listSessions() |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| vitest | 3.x | Test framework | All schema and reader tests |
| @testing-library/react | 16.x | Component tests | Only if testing components that consume module data |

No new dependencies are needed. Everything uses the existing stack.

**Installation:** None required.

## Architecture Patterns

### New File Locations
```
modules/                         # NEW: top-level, parallel to instruments/
├── maths/
│   ├── module.json              # ModuleConfigSchema
│   └── overview.md              # Architecture, controls reference
├── plaits/
│   ├── module.json
│   └── overview.md
├── beads/
├── just-friends/
├── crow/
├── swells/
└── ikarie/

src/content/modules/             # NEW: bundled mirror
└── (same structure)

~/song/modules/                  # NEW: vault mirror
└── (same structure)

sessions/maths/                  # NEW: module sessions (Phase 29+, not this phase)
sessions/plaits/                 # (directory structure only, no sessions yet)
```

### Pattern 1: ModuleConfigSchema (parallels InstrumentConfigSchema)
**What:** Independent Zod schema for eurorack module hardware metadata
**When to use:** Validating module.json files

```typescript
// Follows existing pattern from InstrumentConfigSchema
const ModuleCategoryEnum = z.enum([
  'vco', 'filter', 'effects', 'modulator',
  'function-generator', 'envelope-generator',
]);

export const ModuleConfigSchema = z.object({
  display_name: z.string(),
  tagline: z.string(),
  manufacturer: z.string(),
  hp_width: z.number().int().positive(),
  categories: z.array(ModuleCategoryEnum).min(1),
  power_specs: z.object({
    plus_12v_ma: z.number().int().nonnegative(),
    minus_12v_ma: z.number().int().nonnegative(),
  }),
  reference_pdfs: z.array(z.object({
    label: z.string(),
    file: z.string(),
  })),
}).passthrough();
```

### Pattern 2: discoverModules() (parallels discoverInstruments())
**What:** Scans `modules/` directory for subdirectories
**When to use:** Building module list pages, route generation

```typescript
// Direct parallel to discoverInstruments()
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
    return []; // modules/ directory may not exist yet
  }
}
```

### Pattern 3: Session Frontmatter Migration
**What:** Rename `module:` to `section:` and add `instrument_type: instrument` in all 95 existing session files
**When to use:** One-time batch migration

The migration must update files in 3 locations simultaneously:
1. `sessions/` (working tree -- 95 files)
2. `src/content/sessions/` (bundled content -- 95 files)
3. `~/song/sessions/` (vault -- 95 files)

Plus 2 test fixture files:
4. `src/lib/content/__tests__/__fixtures__/sessions/evolver/01-foundations-navigation.md`
5. `src/lib/content/__tests__/__fixtures__/sessions/evolver/02-foundations-factory-tour.md`

**Approach:** Use gray-matter to parse, rename the key in the data object, add `instrument_type: 'instrument'`, then gray-matter.stringify() back. This preserves all other frontmatter and content.

### Pattern 4: Code Rename (module to section)
**What:** Update all TypeScript references from `.module` to `.section`
**Files affected (exhaustive from codebase grep):**

| File | What Changes |
|------|-------------|
| `src/lib/content/schemas.ts:5` | `module: z.string()` -> `section: z.string()` |
| `src/lib/sessions.ts` | `ModuleGroup.module` -> `SectionGroup.section`, `groupByModule` -> `groupBySection` (or keep name, update field access) |
| `src/lib/search.ts` | `SearchableSession.module`, `toSearchableSession()` |
| `src/lib/learner-utils.ts` | `SessionRef.data.module`, `NextSessionResult.module` |
| `src/lib/prerequisite.ts` | `getCurrentModule()` -> `getCurrentSection()`, `group.module` |
| `src/lib/progress.ts` | `moduleCompletionMap`, `modulesDone`, `totalModules` references |
| `src/app/instruments/[slug]/page.tsx:54` | `module: s.data.module` |
| `src/app/instruments/[slug]/progress/page.tsx` | `ModuleJourney`, `modulesDone`, `currentModule` |
| `src/app/instruments/[slug]/sessions/page.tsx` | `groupByModule` import/call |
| `src/components/session-list.tsx` | `ModuleGroup`, `ModuleHeader`, `group.module` |
| `src/components/session-list-client.tsx` | Same as above |
| `src/components/module-journey.tsx` | `m.module` |
| `src/components/module-header.tsx` | Prop name |
| `src/components/module-index.tsx` | Various module references |
| `src/components/search-dropdown.tsx:72` | `s.module` |

**Critical distinction:** The "module" concept in the UI (ModuleJourney, ModuleHeader, groupByModule) refers to *curriculum sections* (Foundations, Oscillators, etc.), NOT hardware modules. The rename of the *data field* from `module` to `section` must cascade through these interfaces and variable names. However, component *file names* like `module-journey.tsx` and UI labels like "Modules Done" can remain -- they describe the UI concept, not the data field. The CONTEXT.md decision is specifically about the *frontmatter field* rename to resolve the naming collision with eurorack hardware modules.

**Recommendation on naming scope:** Rename the data field and its direct accessors (`session.data.module` -> `session.data.section`, `ModuleGroup.module` -> `ModuleGroup.section`), but do NOT rename component files or UI-facing labels in this phase. That avoids a massive file rename and keeps the change focused on the data layer. The planner should make this explicit.

### Anti-Patterns to Avoid
- **Partial rename:** Renaming the schema field but missing a `.module` reference in a component causes runtime errors. The grep list above is exhaustive -- every reference must be updated.
- **Renaming UI concepts:** Don't rename `ModuleJourney` component to `SectionJourney` -- the UI concept of "module" (a learning grouping) is valid. Only the data field name changes.
- **Forgetting fixture files:** The 2 test fixture `.md` files in `__fixtures__/sessions/evolver/` also have `module:` frontmatter that must be renamed.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frontmatter parsing | Regex-based YAML editing | gray-matter parse + stringify | Preserves formatting, handles edge cases |
| Schema validation | Runtime type checks | Zod schemas with .passthrough() | Established project pattern, type inference |
| File discovery | Manual path construction | glob + fs.readdir pattern | Established project pattern |
| Batch file migration | Manual find-and-replace | Node script using gray-matter | Consistent across 3 locations, testable |

## Runtime State Inventory

This phase involves a rename (`module` -> `section` in session frontmatter) so runtime state must be audited.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | Obsidian vault `~/song/sessions/` -- 95 .md files with `module:` frontmatter | File migration (same as working tree) |
| Live service config | None -- no external services store the `module` field name | None |
| OS-registered state | None -- no OS-level registrations reference session field names | None |
| Secrets/env vars | None -- `module` is a content field, not a secret or env var | None |
| Build artifacts | None -- Next.js build output doesn't persist frontmatter field names; rebuilding regenerates everything | None |

**Key finding:** The vault at `~/song/` is the only runtime state that needs updating alongside the code. The `src/content/` mirror is git-tracked and updated in the same migration. No databases, services, or OS registrations store the `module` field name.

## Common Pitfalls

### Pitfall 1: Incomplete Triple-Write Migration
**What goes wrong:** Renaming `module` to `section` in `sessions/` but forgetting `src/content/sessions/` or `~/song/sessions/`
**Why it happens:** Three locations is easy to forget, especially the vault
**How to avoid:** Migration script must accept a list of roots and process all three. Verify counts match (37+27+31 = 95 per location).
**Warning signs:** Tests pass (they use fixtures) but app crashes at runtime reading vault content

### Pitfall 2: Test Fixture Drift
**What goes wrong:** Updating schemas but not the 2 fixture `.md` files causes test failures
**Why it happens:** Fixtures are in a nested `__fixtures__` directory easy to miss
**How to avoid:** Migration script must also process `src/lib/content/__tests__/__fixtures__/sessions/`
**Warning signs:** `vitest run` fails immediately on schema validation tests

### Pitfall 3: Type Interface Cascade
**What goes wrong:** Renaming `SessionSchema.module` to `.section` but missing a TypeScript interface or function that accesses `.module`
**Why it happens:** TypeScript will catch direct `.module` accesses but `passthrough()` means some usages may use untyped access
**How to avoid:** After schema rename, run `npx tsc --noEmit` -- TypeScript errors will flag every broken reference. The grep list in Architecture Patterns above is the exhaustive inventory.
**Warning signs:** TypeScript compilation errors (good -- they show you what to fix)

### Pitfall 4: ModuleConfigSchema Field Confusion
**What goes wrong:** Using `sysex: false, patch_memory: false` from InstrumentConfigSchema in ModuleConfigSchema
**Why it happens:** Copy-paste from InstrumentConfigSchema
**How to avoid:** ModuleConfigSchema is independent (D-02). It has `hp_width`, `categories[]`, `power_specs` instead of `sysex`, `patch_memory`
**Warning signs:** Schema has irrelevant fields for eurorack modules

### Pitfall 5: Empty modules/ Directory in Content Root
**What goes wrong:** `discoverModules()` throws ENOENT because `modules/` directory doesn't exist in vault or bundled content
**Why it happens:** Unlike `instruments/` which always exists, `modules/` is new
**How to avoid:** `discoverModules()` must catch ENOENT and return `[]` (shown in Pattern 2 above). Same graceful fallback as `listModules()` uses for instruments without a `modules/` subdirectory.
**Warning signs:** App crashes on startup when vault has no `modules/` directory

## Code Examples

### module.json Example (Maths)
```json
{
  "display_name": "Maths",
  "tagline": "Analog computer for control voltage",
  "manufacturer": "Make Noise",
  "hp_width": 20,
  "categories": ["function-generator", "envelope-generator", "modulator"],
  "power_specs": {
    "plus_12v_ma": 60,
    "minus_12v_ma": 50
  },
  "reference_pdfs": [
    { "label": "Maths Manual (2020 Rev)", "file": "maths-manual-2020.pdf" }
  ]
}
```

### Session Frontmatter Before/After
```yaml
# BEFORE (current)
---
title: "Session 01: Navigation & The Basic Patch"
module: "Foundations"
session_number: 1
duration: 20
prerequisite: null
output_type: patch
difficulty: beginner
tags: [navigation, basic-patch, foundations]
instrument: evolver
---

# AFTER (migrated)
---
title: "Session 01: Navigation & The Basic Patch"
section: "Foundations"
session_number: 1
duration: 20
prerequisite: null
output_type: patch
difficulty: beginner
tags: [navigation, basic-patch, foundations]
instrument: evolver
instrument_type: instrument
---
```

### loadModuleConfig() Pattern
```typescript
export async function loadModuleConfig(
  slug: string,
  config: AppConfig,
): Promise<ModuleConfig> {
  const root = getContentRoot(config);
  const configPath = path.join(root, 'modules', slug, 'module.json');
  const raw = await fs.readFile(configPath, 'utf-8');
  return ModuleConfigSchema.parse(JSON.parse(raw));
}
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | vitest 3.x |
| Config file | `vitest.config.ts` (jsdom environment, forks pool) |
| Quick run command | `npx vitest run src/lib/content/__tests__/` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DATA-01 | ModuleConfigSchema validates module.json | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "ModuleConfigSchema"` | Needs new tests in existing file |
| DATA-02 | discoverModules() finds module directories | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "discoverModules"` | Needs new tests in existing file |
| DATA-03 | SessionSchema uses `section` not `module` | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "SessionSchema"` | Existing tests need updating |
| DATA-04 | `instrument_type` field works in SessionSchema | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "instrument_type"` | Needs new tests |
| DATA-05 | Module content readable from content root | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "loadModuleConfig"` | Needs new tests + fixtures |
| DATA-06 | Reference PDFs exist | smoke | `ls references/maths-*.pdf references/plaits-*.pdf ...` | Manual verification |

### Sampling Rate
- **Per task commit:** `npx vitest run src/lib/content/__tests__/`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] Add `modules/` directory with at least one `module.json` to `__fixtures__/` for reader tests
- [ ] Update existing SessionSchema tests to use `section` instead of `module`
- [ ] Add ModuleConfigSchema validation tests (valid, invalid, multi-category, power_specs)
- [ ] Add discoverModules() + loadModuleConfig() tests with fixtures
- [ ] Add instrument_type field tests (default value, eurorack_module value)

## Environment Availability

Step 2.6: SKIPPED (no external dependencies identified). This phase is purely code/config/content changes using existing Node.js toolchain.

## Open Questions

1. **Reference PDF acquisition for DATA-06**
   - What we know: 7 module manuals needed (Swells, Plaits, Beads, Just Friends, Crow, Maths, Ikarie)
   - What's unclear: Exact download URLs for each manufacturer's manual. Some manufacturers (Mutable Instruments, especially) have discontinued and docs may be on community archives.
   - Recommendation: Planner should create a task that lists known URLs. For Mutable Instruments (Plaits, Beads), docs are at `https://pichenettes.github.io/mutable-instruments-documentation/`. Manual file naming should follow kebab-case: `plaits-manual.pdf`, `maths-manual.pdf`, etc.

2. **Scope of `module` to `section` rename in UI labels**
   - What we know: D-12 says rename the frontmatter field. CONTEXT.md says the rename resolves naming collision with eurorack hardware.
   - What's unclear: Should UI labels like "Modules Done" on the progress page also change to "Sections Done"?
   - Recommendation: Keep UI labels unchanged in this phase. The UI concept of "learning modules" is valid; only the data field name needs deconfliction. Phase 27 (Navigation) can revisit UI labels if needed.

## Sources

### Primary (HIGH confidence)
- `src/lib/content/schemas.ts` -- Current SessionSchema, InstrumentConfigSchema (read directly)
- `src/lib/content/reader.ts` -- discoverInstruments(), loadInstrumentConfig(), listSessions() patterns (read directly)
- `src/lib/content/__tests__/schemas.test.ts` -- Existing test patterns (read directly)
- `src/lib/content/__tests__/reader.test.ts` -- Existing fixture-based reader tests (read directly)
- `src/lib/sessions.ts` -- ModuleGroup interface, groupByModule() (read directly)
- `src/lib/progress.ts` -- moduleCompletionMap, modulesDone (read directly)
- `src/lib/search.ts` -- SearchableSession.module (read directly)
- `src/lib/learner-utils.ts` -- SessionRef.data.module (read directly)

### Secondary (MEDIUM confidence)
- Mutable Instruments documentation archive: `https://pichenettes.github.io/mutable-instruments-documentation/` (known community resource for discontinued MI modules)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all patterns established in codebase
- Architecture: HIGH -- direct parallel to existing instrument patterns, every affected file identified by grep
- Pitfalls: HIGH -- exhaustive code grep identified all `module` references; triple-write pattern well-understood from existing codebase

**Research date:** 2026-04-17
**Valid until:** 2026-05-17 (stable -- codebase patterns unlikely to change)
