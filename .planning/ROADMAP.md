# Roadmap: Instrument Deep Learning

## Milestones

- ✅ **v1.0 Evolver Learning Platform** — Phases 1-6 (shipped 2026-03-30)
- ✅ **v1.1 Cascadia Instrument Support** — Phases 7-13.1 (shipped 2026-04-05)
- ✅ **v1.2 Learner Experience & Discovery** — Phases 14-17 (shipped 2026-04-07)
- ✅ **v1.3 Visual Redesign** — Phases 18-25 (shipped 2026-04-17)
- 🚧 **v2.0 Eurorack Module Learning** — Phases 26-32 (in progress)

## Phases

<details>
<summary>✅ v1.0 Evolver Learning Platform (Phases 1-6) — SHIPPED 2026-03-30</summary>

- [x] Phase 1: Content Pipeline + Curriculum (6/6 plans) — completed 2026-03-29
- [x] Phase 2: Session Browser (5/5 plans) — completed 2026-03-30
- [x] Phase 3: Patch Library (2/2 plans) — completed 2026-03-30
- [x] Phase 4: MIDI SysEx Integration (4/4 plans) — completed 2026-03-30
- [x] Phase 5: Progress + Challenges (3/3 plans) — completed 2026-03-30
- [x] Phase 6: Deployment (3/3 plans) — completed 2026-03-30

Full details: [milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md)

</details>

<details>
<summary>✅ v1.1 Cascadia Instrument Support (Phases 7-13.1) — SHIPPED 2026-04-05</summary>

- [x] Phase 7: Multi-Instrument UI + Schema Foundation (3/3 plans) — completed 2026-03-31
- [x] Phase 8: Cascadia Instrument Data (3/3 plans) — completed 2026-04-01
- [x] Phase 9: Patch Documentation + Demo Patches (3/3 plans) — completed 2026-04-01
- [x] Phase 10: Curriculum Modules 1-3 (3/3 plans) — completed 2026-04-01
- [x] Phase 11: Curriculum Modules 4-7 + Demo Mode (4/4 plans) — completed 2026-04-04
- [x] Phase 12: Evolver Panel Visualizer Component (3/3 plans) — completed 2026-04-04
- [x] Phase 13: Cascadia Panel Visualizer (4/4 plans) — completed 2026-04-04
- [x] Phase 13.1: Panel Visualizer Gap Closure (2/2 plans) — completed 2026-04-05

Full details: [milestones/v1.1-ROADMAP.md](milestones/v1.1-ROADMAP.md)

</details>

<details>
<summary>✅ v1.2 Learner Experience & Discovery (Phases 14-17) — SHIPPED 2026-04-07</summary>

- [x] Phase 14: Learner State Foundation (3/3 plans) — completed 2026-04-06
- [x] Phase 15: Navigation & Progress Enhancements (3/3 plans) — completed 2026-04-06
- [x] Phase 16: Search & Filtering (3/3 plans) — completed 2026-04-06
- [x] Phase 17: Content & Pedagogy (3/3 plans) — completed 2026-04-07

Full details: [milestones/v1.2-ROADMAP.md](milestones/v1.2-ROADMAP.md)

</details>

<details>
<summary>✅ v1.3 Visual Redesign (Phases 18-25) — SHIPPED 2026-04-17</summary>

- [x] Phase 18: Token Foundation (3/3 plans) — completed 2026-04-07
- [x] Phase 19: Prose & Typography (2/2 plans) — completed 2026-04-08
- [x] Phase 20: Layout Shell & Navigation (3/3 plans) — completed 2026-04-10
- [x] Phase 21: Cards & Content Components (2/2 plans) — completed 2026-04-11
- [x] Phase 22: Interactive Elements & Motion (3/3 plans) — completed 2026-04-11
- [x] Phase 23: Panel & Progress Polish (4/4 plans) — completed 2026-04-12
- [x] Phase 24: Instrument Color Identity (1/1 plans) — completed 2026-04-13
- [x] Phase 25: Octatrack Curriculum + Site Integration (7/7 plans) — completed 2026-04-17

Full details: [milestones/v1.3-ROADMAP.md](milestones/v1.3-ROADMAP.md)

</details>

### 🚧 v2.0 Eurorack Module Learning (In Progress)

**Milestone Goal:** Extend the instrument mastery system to teach individual eurorack modules — each with its own front plate SVG, sessions, patches, and category-based organization — starting with 7 modules across 5 functional categories.

- [ ] **Phase 26: Data Model + Content Pipeline** - ModuleConfigSchema, reader functions, module-to-section rename, triple-write pipeline, reference manuals
- [ ] **Phase 27: Module Navigation + Routing** - /modules routes, category filtering, module selector, per-module color identity
- [ ] **Phase 28: Panel System + First Panel** - Generic ModulePanel renderer, HP-aware sizing, session annotations, Plaits panel proof
- [ ] **Phase 29: Maths Curriculum + Panel** - Hardest module first: 10-12 sessions, overview page, Maths panel, ADHD format validation
- [ ] **Phase 30: Plaits, Beads, Swells, Ikarie Curricula + Panels** - Four module curricula and panels following proven pattern
- [ ] **Phase 31: Just Friends + Crow** - Two separate modules with i2c integration, standalone + combined sessions
- [ ] **Phase 32: Progress, Demo + Cross-Module Polish** - Per-module progress tracking, demo mode, cross-module references and category suggestions

## Phase Details

### Phase 26: Data Model + Content Pipeline
**Goal**: Module content can be authored, validated, and read by the app — the `module` naming collision is resolved and all reference manuals are available
**Depends on**: Phase 25 (v1.3 complete)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06
**Success Criteria** (what must be TRUE):
  1. A `modules/plaits/module.json` file passes ModuleConfigSchema validation with HP width, manufacturer, power specs, and a multi-category array (e.g., `["vco"]`)
  2. The `discoverModules()` reader function finds module directories under `modules/` and returns their configs — parallel to `discoverInstruments()`
  3. All 95 existing sessions use `section` (not `module`) in their frontmatter and the SessionSchema definition reflects this rename
  4. Module sessions with `instrument_type: eurorack_module` are distinguishable from instrument sessions in reader queries
  5. Reference PDFs for all 7 modules (Swells, Plaits, Beads, Just Friends, Crow, Maths, Ikarie) exist in `references/`
**Plans:** 1/3 plans executed
Plans:
- [x] 26-01-PLAN.md — Rename module->section in 95 sessions + add instrument_type to SessionSchema
- [ ] 26-02-PLAN.md — ModuleConfigSchema, reader functions, 7 module directories with triple-write
- [ ] 26-03-PLAN.md — Download 7 module reference manuals

### Phase 27: Module Navigation + Routing
**Goal**: Users can browse eurorack modules by category and navigate to individual module pages with per-module visual identity
**Depends on**: Phase 26
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05
**Success Criteria** (what must be TRUE):
  1. User can visit `/modules` and see all modules listed, with category filter tabs that show only matching modules (e.g., `?category=vco` shows Plaits and Just Friends)
  2. User can navigate to `/modules/plaits/` and see overview, sessions, and patches pages for that module
  3. User sees a "Modules" entry in the main navigation alongside the existing instrument selector
  4. Multi-category modules (e.g., Maths as function generator + envelope + LFO) appear under every category they belong to in filtered views
  5. Each module page uses its own color identity via the `[data-instrument]` CSS cascade — 7 distinct palettes
**Plans:** 2/3 plans executed
Plans:
- [x] 27-01-PLAN.md — Color palettes (7 modules), app-shell slug detection, Modules nav link
- [x] 27-02-PLAN.md — /modules listing page with category tabs, ModuleCard, HpOutline
- [ ] 27-03-PLAN.md — Per-module routes /modules/[slug]/ with layout, sub-nav, 4 sub-pages
**UI hint**: yes

### Phase 28: Panel System + First Panel
**Goal**: A generic panel renderer displays any module's front plate SVG from data files, and the first panel (Plaits) proves the pattern works end-to-end including session annotations
**Depends on**: Phase 27
**Requirements**: PANEL-01, PANEL-03, PANEL-09, PANEL-10
**Success Criteria** (what must be TRUE):
  1. A single `ModulePanel` component renders any module's panel from a per-module data file — no per-module React components needed
  2. The Plaits panel (12HP) displays with correct control placement matching the physical module photo — hand-placed, not algorithmic
  3. Panels render at correct relative widths based on HP (12HP Plaits visibly narrower than a 20HP module) using HP-to-px scaling
  4. Session content can embed panel annotations via `data-module-panel` markers that highlight relevant controls — same interaction pattern as Evolver/Cascadia panels
**Plans:** 3 plans
Plans:
- [ ] 26-01-PLAN.md — Rename module->section in 95 sessions + add instrument_type to SessionSchema
- [ ] 26-02-PLAN.md — ModuleConfigSchema, reader functions, 7 module directories with triple-write
- [ ] 26-03-PLAN.md — Download 7 module reference manuals
**UI hint**: yes

### Phase 29: Maths Curriculum + Panel
**Goal**: Users can learn Make Noise Maths through a complete curriculum — the most complex module proves the framework handles the hardest case
**Depends on**: Phase 28
**Requirements**: CURR-01, CURR-08, CURR-09, PANEL-07
**Success Criteria** (what must be TRUE):
  1. User can browse 10-12 Maths sessions covering envelope generation, LFO, slew limiting, audio-rate oscillation, and utility uses — each 15-30 minutes with a tangible output
  2. The Maths overview page shows module architecture, controls reference, and recommended init state — matching the pattern established for instruments
  3. The Maths panel SVG (20HP, ~30 controls) renders with hand-placed controls matching the physical module
  4. All Maths sessions follow ADHD-friendly format: zero activation energy start, warm-up referencing previous session, hard stop, and documented output
**Plans:** 3 plans
Plans:
- [ ] 26-01-PLAN.md — Rename module->section in 95 sessions + add instrument_type to SessionSchema
- [ ] 26-02-PLAN.md — ModuleConfigSchema, reader functions, 7 module directories with triple-write
- [ ] 26-03-PLAN.md — Download 7 module reference manuals
**UI hint**: yes

### Phase 30: Plaits, Beads, Swells, Ikarie Curricula + Panels
**Goal**: Four additional modules have complete curricula and panels, following the pattern proven by Maths
**Depends on**: Phase 29
**Requirements**: CURR-02, CURR-03, CURR-06, CURR-07, PANEL-02, PANEL-04, PANEL-08
**Success Criteria** (what must be TRUE):
  1. User can browse Plaits curriculum (8-10 sessions across 16 synthesis modes), Beads curriculum (6-8 sessions covering 3 grain modes), Swells curriculum (5-7 sessions covering 9 reverb models), and Ikarie curriculum (5-7 sessions for filter modes and envelope follower)
  2. Each module has a hand-placed panel SVG at correct HP width (Plaits 12HP, Beads 14HP, Swells 20HP, Ikarie 8HP) with controls matching the physical module
  3. All sessions across all four modules follow the 15-30 min ADHD format with tangible output
  4. Each module has an overview page with architecture, controls reference, and init state
**Plans:** 3 plans
Plans:
- [ ] 26-01-PLAN.md — Rename module->section in 95 sessions + add instrument_type to SessionSchema
- [ ] 26-02-PLAN.md — ModuleConfigSchema, reader functions, 7 module directories with triple-write
- [ ] 26-03-PLAN.md — Download 7 module reference manuals
**UI hint**: yes

### Phase 31: Just Friends + Crow
**Goal**: Users can learn Mannequins Just Friends and Monome Crow as separate modules with optional combined sessions showing i2c integration
**Depends on**: Phase 30
**Requirements**: CURR-04, CURR-05, PANEL-05, PANEL-06
**Success Criteria** (what must be TRUE):
  1. User can browse Just Friends curriculum (8-10 sessions covering Shape, Cycle, and Sound modes) as a standalone module
  2. User can browse Crow curriculum (4-6 sessions covering scripting, i2c, and standalone I/O) as a standalone module
  3. Both modules have separate panel SVGs (Just Friends 14HP, Crow 2HP), separate `module.json` configs, and separate overview pages
  4. Combined JF+Crow sessions exist as optional extensions demonstrating i2c integration — clearly marked as requiring both modules
**Plans:** 3 plans
Plans:
- [ ] 26-01-PLAN.md — Rename module->section in 95 sessions + add instrument_type to SessionSchema
- [ ] 26-02-PLAN.md — ModuleConfigSchema, reader functions, 7 module directories with triple-write
- [ ] 26-03-PLAN.md — Download 7 module reference manuals
**UI hint**: yes

### Phase 32: Progress, Demo + Cross-Module Polish
**Goal**: Module learning progress is tracked and visible, demo mode showcases the system, and modules reference each other by category
**Depends on**: Phase 31
**Requirements**: PROG-01, PROG-02, PROG-03, XMOD-01, XMOD-02
**Success Criteria** (what must be TRUE):
  1. User can toggle session completion per module and see cumulative practice metrics in the Zustand store — same interaction pattern as instruments
  2. Prerequisite badges within module curricula show locked/available/completed states with soft visual gating
  3. Demo mode includes synthetic learner journeys for Maths and Plaits — visitors see realistic progress without local vault data
  4. Session pages show cross-references to related sessions in other modules (e.g., "Maths envelope into Ikarie filter")
  5. Module overview pages show category-based suggestions ("Other modules you own in this category: ...")
**Plans:** 3 plans
Plans:
- [ ] 26-01-PLAN.md — Rename module->section in 95 sessions + add instrument_type to SessionSchema
- [ ] 26-02-PLAN.md — ModuleConfigSchema, reader functions, 7 module directories with triple-write
- [ ] 26-03-PLAN.md — Download 7 module reference manuals
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 26 → 27 → 28 → 29 → 30 → 31 → 32

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Content Pipeline + Curriculum | v1.0 | 6/6 | Complete | 2026-03-29 |
| 2. Session Browser | v1.0 | 5/5 | Complete | 2026-03-30 |
| 3. Patch Library | v1.0 | 2/2 | Complete | 2026-03-30 |
| 4. MIDI SysEx Integration | v1.0 | 4/4 | Complete | 2026-03-30 |
| 5. Progress + Challenges | v1.0 | 3/3 | Complete | 2026-03-30 |
| 6. Deployment | v1.0 | 3/3 | Complete | 2026-03-30 |
| 7. Multi-Instrument UI + Schema | v1.1 | 3/3 | Complete | 2026-03-31 |
| 8. Cascadia Instrument Data | v1.1 | 3/3 | Complete | 2026-04-01 |
| 9. Patch Documentation + Demo Patches | v1.1 | 3/3 | Complete | 2026-04-01 |
| 10. Curriculum Modules 1-3 | v1.1 | 3/3 | Complete | 2026-04-01 |
| 11. Curriculum Modules 4-7 + Demo Mode | v1.1 | 4/4 | Complete | 2026-04-04 |
| 12. Evolver Panel Visualizer | v1.1 | 3/3 | Complete | 2026-04-04 |
| 13. Cascadia Panel Visualizer | v1.1 | 4/4 | Complete | 2026-04-04 |
| 13.1 Panel Visualizer Gap Closure | v1.1 | 2/2 | Complete | 2026-04-05 |
| 14. Learner State Foundation | v1.2 | 3/3 | Complete | 2026-04-06 |
| 15. Navigation & Progress Enhancements | v1.2 | 3/3 | Complete | 2026-04-06 |
| 16. Search & Filtering | v1.2 | 3/3 | Complete | 2026-04-06 |
| 17. Content & Pedagogy | v1.2 | 3/3 | Complete | 2026-04-07 |
| 18. Token Foundation | v1.3 | 3/3 | Complete | 2026-04-07 |
| 19. Prose & Typography | v1.3 | 2/2 | Complete | 2026-04-08 |
| 20. Layout Shell & Navigation | v1.3 | 3/3 | Complete | 2026-04-10 |
| 21. Cards & Content Components | v1.3 | 2/2 | Complete | 2026-04-11 |
| 22. Interactive Elements & Motion | v1.3 | 3/3 | Complete | 2026-04-11 |
| 23. Panel & Progress Polish | v1.3 | 4/4 | Complete | 2026-04-12 |
| 24. Instrument Color Identity | v1.3 | 1/1 | Complete | 2026-04-13 |
| 25. Octatrack Curriculum + Site Integration | v1.3 | 7/7 | Complete | 2026-04-17 |
| 26. Data Model + Content Pipeline | v2.0 | 1/3 | In Progress|  |
| 27. Module Navigation + Routing | v2.0 | 2/3 | In Progress|  |
| 28. Panel System + First Panel | v2.0 | 0/? | Not started | - |
| 29. Maths Curriculum + Panel | v2.0 | 0/? | Not started | - |
| 30. Plaits, Beads, Swells, Ikarie + Panels | v2.0 | 0/? | Not started | - |
| 31. Just Friends + Crow | v2.0 | 0/? | Not started | - |
| 32. Progress, Demo + Cross-Module Polish | v2.0 | 0/? | Not started | - |
