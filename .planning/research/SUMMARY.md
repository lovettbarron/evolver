# Project Research Summary

**Project:** v2.0 Eurorack Module Learning
**Domain:** Extending an existing instrument mastery app with individual eurorack module curricula
**Researched:** 2026-04-16
**Confidence:** HIGH

## Executive Summary

This milestone extends the existing Evolver learning app (Next.js 15, React 19, Tailwind v4, Zod, Zustand) to support six individual eurorack modules: Plaits, Beads, Maths, Just Friends, Swells, and Ikarie. The core insight from all four research threads is that eurorack modules are a **new content type** — not instruments with missing fields, and not sub-sections of existing instruments. They require a new `ModuleConfigSchema`, a new `modules/` top-level directory, new reader functions, and new routes under `/modules/[slug]`. Critically, zero new npm dependencies are needed; the existing stack handles everything.

The recommended approach is an additive, parallel-track architecture. New content infrastructure (schema, reader functions, routes) runs alongside the existing instrument infrastructure without modifying it. Session and patch schemas are reused as-is since they already accept any slug. Panel SVGs follow the proven reference-first, hand-placed approach from the synth-panel-builder skill, but with a single generic `ModulePanel` renderer rather than per-module components. The content pipeline must mirror the existing triple-write pattern: repo, `src/content/`, and `~/song/` vault must stay in sync.

The primary risks are naming collision (`module` means curriculum section in existing code AND eurorack hardware), scope creep into cross-module patching, and documentation quality variability across the six manufacturers. All three are avoidable with clear boundaries set at the start: use `unit` or `eurorack_module` in internal code, enforce a hard v2.0 scope limit of modules-in-isolation, and download all reference PDFs before writing any session content. The suggested phase order — data model first, then routing, then panels, then content per module — keeps dependencies clean and delivers something navigable before the long tail of curriculum writing.

## Key Findings

### Recommended Stack

The existing stack requires zero changes. `ModuleConfigSchema` (Zod) is a new schema added alongside `InstrumentConfigSchema` — not an extension of it. The two schemas share four fields (`display_name`, `tagline`, `manufacturer`, `reference_pdfs`) but diverge significantly: instruments have `sysex`/`patch_memory`/`sampler` flags; modules have `hp`, `categories` (array), and `power`. A shared base schema would add complexity for minimal deduplication — keep them independent.

**Core technologies:**
- Next.js 15 (App Router): all new module routes follow existing instrument route patterns — no changes to framework usage
- Zod 3.x: new `ModuleConfigSchema` and `MODULE_CATEGORIES` constant; `SessionSchema` and `PatchSchema` unchanged
- Zustand 5: module completions keyed as `modules/{slug}/{sessionSlug}` — same pattern, no schema change
- Tailwind v4 (OKLCH): per-module color identity via `[data-instrument="plaits"]` CSS rules in `globals.css` — existing mechanism works without renaming the attribute

**What not to add:** No database, no CMS, no SVG generation library, no taxonomy library, no component library, no react-pdf. The content is markdown, the SVGs are hand-placed, and the taxonomy is seven Zod enum values.

### Expected Features

**Must have (table stakes):**
- Per-module session curricula (5-12 sessions each, ~42-54 total across 6 modules) — core value proposition
- Module front plate SVG panels for each module — instruments already have them; modules without feel second-class
- Category-based navigation at `/modules` with filter tabs — eurorack users think in categories, not names
- Multi-category membership in the data model — Maths is function generator AND envelope AND LFO AND utility; Just Friends is modulator AND VCO AND envelope
- Module overview pages (architecture, signal flow, controls reference) — mirrors existing `instruments/<name>/overview.md` pattern
- Progress tracking per module — extend Zustand store with the same key pattern
- Session frontmatter with `instrument_type: eurorack_module` field — distinguishes module sessions from instrument sessions in routing and queries

**Should have (competitive):**
- Cross-module session cross-references (markdown links from one module session to another) — low complexity, high value
- HP-width-aware panel rendering (Plaits 12HP vs Maths 20HP renders at correct relative scale) — adds realism, straightforward with SVG viewBox
- Eurorack fundamentals sessions (2-3 sessions: signal levels, CV vs audio vs gate, power, HP) — shared context for all module curricula
- Patch recipe sessions combining two or more modules — integration sessions modeled on existing "Sound Design Recipes" pattern

**Defer (v3+):**
- Rack context awareness ("my rack" configuration UI suggesting patching combinations)
- Full cross-module patching curriculum (module isolation is a hard v2.0 boundary)
- Module comparison within category ("Plaits vs Just Friends as VCOs")
- Demo mode for all six modules (start with two showcase modules: Plaits and Maths)

### Architecture Approach

The architecture is a parallel track alongside the existing instrument infrastructure. New modules live in a top-level `modules/` directory (not under `instruments/`), are discovered by a new `discoverModules()` function in `reader.ts`, and are served from new routes at `/modules/[slug]/...`. Sessions and patches reuse their existing schemas and reader functions unchanged — `listSessions('plaits', config)` already works because the function reads from `sessions/<slug>/` with any slug. The sole navigation change adds a "Modules" top-level link and module-context sub-links following the existing `InstrumentSwitcher` pattern.

**Major components:**
1. `ModuleConfigSchema` + `MODULE_CATEGORIES` in `schemas.ts` — new content type definition; independent of `InstrumentConfigSchema`
2. `discoverModules()`, `loadModuleConfig()`, `listAllModules()`, `listModulesByCategory()`, `listModuleFiles()` in `reader.ts` — parallel to existing instrument reader functions
3. `/modules` index page with `?category=vco` query param filtering — URL-persisted state, multi-category modules appear under all matching tabs
4. `ModulePanel` generic component + per-module panel data files — one shared renderer, hand-placed coordinate data per module; replaces the per-component approach used for instruments
5. `src/lib/modules/panel-types.ts` + `src/lib/modules/{slug}-panel-data.ts` — shared interface plus six hand-authored data files
6. Nav updates: "Modules" link, module sub-links scoped to current slug, module color identity CSS rules

### Critical Pitfalls

1. **"Module" naming collision** — `SessionSchema.module` means curriculum section; `modules/` directory means eurorack hardware unit. Use `unit` or `eurorack_module` in internal code. In user-facing copy, "module" is fine for hardware, "section" or "topic" for curriculum grouping. Decide on day one.

2. **Schema explosion via shoehorning** — Adding `sysex: false` etc. to modules, or creating duplicate schemas for sessions/patches, both cause maintenance problems. Rule: `ModuleConfigSchema` is a new independent schema. `SessionSchema` and `PatchSchema` are reused unchanged. Share rendering *components*, not schemas.

3. **Triple-write path drift** — Repo, `src/content/`, and `~/song/` vault must have identical directory structures for modules. Document exact paths before writing any content. A `diff` check between `modules/` and `src/content/modules/` in CI prevents silent content failures.

4. **Scope creep into cross-module patching** — Once Plaits sessions exist, "now patch Plaits into Ikarie" is the natural next question. It is a different curriculum domain. Hard boundary: any session mentioning two module names by function is out of v2.0 scope.

5. **Just Friends + Crow conflation** — They are two separate modules from two separate manufacturers. Each gets its own `module.json`, panel SVG, and core sessions. Combined JF+Crow sessions are optional extensions and the first prototype of v3.0 cross-module content.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Data Model + Content Pipeline Foundation
**Rationale:** Everything else depends on the schema and reader. Doing this first with a single test module (Plaits) validates the architecture before committing to six full curricula. The naming collision pitfall must be resolved here.
**Delivers:** `ModuleConfigSchema`, `MODULE_CATEGORIES`, reader functions, `modules/plaits/module.json`, vault triple-write verified for `modules/` directory
**Addresses:** Table-stakes data model features (multi-category membership, `instrument_type` field, module identity in sessions)
**Avoids:** Pitfall 1 (naming collision), Pitfall 2 (schema explosion), Pitfall 3 (triple-write drift)

### Phase 2: Routing + Navigation
**Rationale:** Once data reads correctly, the routing layer delivers visible progress. Reusing `SessionListClient` and patch components keeps this phase thin. Category filter via query params (not nested routes) avoids duplicate-navigation pitfall.
**Delivers:** `/modules` index with category tabs, `/modules/[slug]` overview, sessions list, patches list, nav "Modules" link + sub-links, module color identity CSS
**Uses:** Existing `SessionListClient`, patch components, `InstrumentSwitcher` pattern adapted for modules
**Implements:** Architecture components 2 and 3; nav update

### Phase 3: Panel System
**Rationale:** Panel SVGs are table stakes (instruments all have them) and the most labor-intensive work per module. Building the generic `ModulePanel` component first, then populating data files one module at a time, avoids per-component bloat and enables incremental progress. Start with Plaits (simplest, 12HP, clean Mutable aesthetic) to prove the generic renderer.
**Delivers:** `panel-types.ts`, generic `ModulePanel` component, `plaits-panel-data.ts` (first hand-placed panel), panel route at `/modules/[slug]/panel`, session inline panel markers via `data-module-panel` attribute
**Uses:** HP-to-px scaling convention (1HP = 15px, 400px tall), reference-first hand-placement from manual photos
**Avoids:** Panel complexity pitfall (per-module approach), component bloat pitfall

### Phase 4: Maths Curriculum + Panel
**Rationale:** Maths is the most complex module with the widest category spread. Writing its curriculum first proves the framework handles the hardest case. If it works for Maths, every other module is simpler. It also has the richest reference material (Illustrated Supplement, 34+ patch ideas, extensive community guides).
**Delivers:** `modules/maths/module.json`, `overview.md`, `signal-flow.md`, `maths-panel-data.ts` (20HP, ~30 controls), 6-8 sessions covering function generator, envelope, LFO, slew, and utilities uses
**Avoids:** Scope creep pitfall, session count pitfall (6-8 is appropriate for Maths)

### Phase 5: Remaining Module Curricula + Panels (Plaits, Beads, Swells, Ikarie)
**Rationale:** These four modules are simpler than Maths and well-documented. Suggested order: Plaits (12HP, clean, single category), Beads (14HP, granular, good cross-reference with Plaits), Swells (20HP, Intellijel — same manufacturer as Cascadia), Ikarie (8HP, filter, medium doc quality).
**Delivers:** Four complete module curricula (3-6 sessions each), four panel data files, overview and signal-flow docs for each
**Avoids:** Documentation quality pitfall (download all PDFs before writing sessions), session count pitfall (min 3 sessions, no padding)

### Phase 6: Just Friends + Crow
**Rationale:** Most complex combination in the milestone. Two separate modules from two manufacturers with i2c integration. Handled last because it depends on the pattern established by earlier modules, and the combined JF+Crow sessions prototype the v3.0 cross-module curriculum.
**Delivers:** Separate `just-friends` and `crow` module configs and panels; 3-4 standalone JF sessions; 2-3 standalone Crow sessions; 2-3 combined JF+Crow sessions as optional extensions
**Avoids:** Two-module conflation pitfall

### Phase 7: Polish + Demo Mode
**Rationale:** Cross-module session cross-references, category-based suggestions on overview pages, and demo mode for two showcase modules (Plaits + Maths) complete the v2.0 milestone.
**Delivers:** `related_modules` frontmatter on sessions, "Also in category" UI on module overview pages, demo synthetic journeys for Plaits and Maths, home page modules section
**Avoids:** Demo mode bloat pitfall (only 2 modules in demo, not all 6-7)

### Phase Ordering Rationale

- Data model must precede routing, which must precede content authoring — content paths and session frontmatter fields depend on agreed-upon schema and directory conventions
- Maths before the other five modules — proves the framework handles the hardest case before committing to five more
- Panel system built once as generic renderer then populated incrementally — decouples panel creation from curriculum writing
- Just Friends + Crow last — their two-module complexity and i2c integration should not block the other four modules
- Demo mode deferred to end — synthetic journeys should model real content, not precede it

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 6 (Just Friends + Crow):** The i2c/ii protocol between Crow and Just Friends, Lua scripting for Crow standalone sessions, and Mannequins Technical Maps terse documentation all require close study. The llllllll.co community thread is a critical secondary source.
- **Phase 5 (Ikarie):** Bastl documentation is thinner than other manufacturers; sessions may require more "discover by experiment" exercises. ModWiggler community thread should be reviewed during planning.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Data Model):** Patterns are thoroughly established in the existing codebase. Parallel schema and reader functions follow a proven template.
- **Phase 2 (Routing):** Next.js App Router patterns are identical to existing instrument routes. Category filter via query params matches the existing patch filter bar.
- **Phase 3 (Panel System):** The synth-panel-builder skill documents the exact approach. Generic renderer + per-module data files is a direct application of the Cascadia data-driven pattern.
- **Phase 4 (Maths):** Maths has the best documentation of any target module. The Illustrated Supplement alone provides 34 patch ideas to draw from.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Zero new dependencies; all patterns proven in existing codebase |
| Features | HIGH | Clear table stakes from existing instrument pattern; differentiators well-reasoned from domain knowledge |
| Architecture | HIGH | Direct extension of established patterns; component boundaries clear; anti-patterns explicitly identified |
| Pitfalls | HIGH | Most pitfalls identified via codebase analysis of actual existing code (SessionSchema.module, triple-write pipeline, panel component count) — not speculation |

**Overall confidence:** HIGH

### Gaps to Address

- **Exact control counts per module:** Estimated from web sources. Must be verified against downloaded manual photos before building each panel data file. The synth-panel-builder skill requires this.
- **Crow standalone curriculum scope:** Crow's value is primarily as a Just Friends companion via i2c. Whether 2-3 standalone Crow sessions deliver enough learning value to justify the module independently is unclear. May reduce to "Crow orientation" integrated into the JF+Crow phase rather than standalone sessions.
- **Session counts for Swells and Ikarie:** PITFALLS research suggests 3-4 sessions; FEATURES suggests 5-7. Download the manuals and outline the curriculum before committing to a count.
- **Demo mode timing:** Demo content should follow real content, not precede it. Defer Phase 7 demo work until Phase 5 curriculum is complete enough to model realistic learner journeys.

## Sources

### Primary (HIGH confidence)
- Existing codebase: `src/lib/content/schemas.ts`, `src/lib/content/reader.ts`, `src/components/evolver-panel.tsx`, `src/lib/cascadia-panel-data.ts`, `src/app/instruments/[slug]/page.tsx` — established patterns
- CLAUDE.md: triple-write pipeline, reference-first panel design, session conventions
- [Mutable Instruments Documentation Archive](https://pichenettes.github.io/mutable-instruments-documentation/) — Plaits and Beads (CC-BY-SA 3.0)
- [Make Noise Maths Manual + Illustrated Supplement](https://www.makenoisemusic.com/modules/maths/) — 34+ patch ideas
- [Intellijel Swells Manual](https://intellijel.com/downloads/manuals/swells_manual_v1.0_2026.04.09.pdf) — official Swells documentation
- [ModularGrid](https://modulargrid.net) — HP widths, depth specs for all modules

### Secondary (MEDIUM confidence)
- [Whimsical Raps Just Friends Technical Maps](https://github.com/whimsicalraps/Mannequins-Technical-Maps) — terse but comprehensive JF documentation
- [Monome Crow Documentation](https://monome.org/docs/crow/) — web docs, no PDF
- [Bastl Instruments Ikarie Manual](https://bastl-instruments.com/files/manual-ikarie-web.pdf) — less detailed than other manufacturers
- [Learning Modular](https://learningmodular.com/) — structured eurorack course platform; category taxonomy conventions

### Tertiary (LOW confidence)
- Approximate control counts per module (from web sources, not manual photos) — verify before panel building
- Session count estimates for Swells and Ikarie — verify after downloading manuals

---
*Research completed: 2026-04-16*
*Ready for roadmap: yes*
