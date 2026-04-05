# Roadmap: Instrument Deep Learning

## Milestones

- ✅ **v1.0 Evolver Learning Platform** - Phases 1-6 (shipped 2026-03-30)
- 🚧 **v1.1 Cascadia Instrument Support** - Phases 7-13.1 (in progress)
- 📋 **v1.2 Learner Experience & Discovery** - Phases 14-17 (planned)

## Phases

<details>
<summary>v1.0 Evolver Learning Platform (Phases 1-6) - SHIPPED 2026-03-30</summary>

- [x] **Phase 1: Content Pipeline + Curriculum** - Data layer (vault reader, Zod schemas, markdown rendering) and complete 35-session Evolver curriculum (completed 2026-03-29)
- [x] **Phase 2: Session Browser** - Browse sessions by module, read full session content, instrument-scoped routing (completed 2026-03-30)
- [x] **Phase 3: Patch Library** - Browse, filter, and inspect documented patches with parameter tables (completed 2026-03-30)
- [x] **Phase 4: MIDI SysEx Integration** - Receive, parse, store, and send SysEx patch dumps; patch diff view (completed 2026-03-30)
- [x] **Phase 5: Progress + Challenges** - Additive progress dashboard and challenge exercises with patch responses (completed 2026-03-30)
- [x] **Phase 6: Deployment** - Local vault mode, Vercel demo mode with synthetic data, reference PDF serving (completed 2026-03-30)

### Phase 1: Content Pipeline + Curriculum
**Goal**: The data layer can read, validate, and render all content types from an Obsidian vault (or bundled fallback), and the full 35-session Evolver curriculum exists as markdown files
**Depends on**: Nothing (first phase)
**Requirements**: PIPE-01, PIPE-02, PIPE-03, PIPE-04, PIPE-05, CURR-01, CURR-02, CURR-03, CURR-04, CURR-05, INST-04
**Plans**: 6 plans (complete)

Plans:
- [x] 01-01: Project scaffolding, Zod schemas, content reader, validate-content script
- [x] 01-02: Markdown rendering pipeline with Obsidian-flavored features
- [x] 01-03: Instrument docs frontmatter + module map review
- [x] 01-04: Curriculum sessions 01-18 (Modules 1-5)
- [x] 01-05: Curriculum sessions 19-35 (Modules 6-10)
- [x] 01-06: Bundle content to src/content/, reference PDFs, curriculum integration tests

### Phase 2: Session Browser
**Goal**: Users can browse, read, and navigate the Evolver curriculum through instrument-scoped routes with an action-first experience
**Depends on**: Phase 1
**Requirements**: SESS-01, SESS-02, SESS-03, SESS-04, SESS-05, INST-01, INST-02, INST-03
**Plans**: 5 plans (complete)

Plans:
- [x] 02-01: Next.js scaffolding, Tailwind v4 design system, app shell, session helpers
- [x] 02-02: Session list page and session detail page
- [x] 02-03: Landing hero card, instrument overview page, framework about page
- [x] 02-04: Gap closure: fix Mermaid data attribute mismatch
- [x] 02-05: Gap closure: wire source references into session detail page

### Phase 3: Patch Library
**Goal**: Users can browse, filter, and inspect their documented patches with full parameter detail and session provenance
**Depends on**: Phase 2
**Requirements**: PTCH-01, PTCH-02, PTCH-03, PTCH-04
**Plans**: 2 plans (complete)

Plans:
- [x] 03-01: Demo patch content files (16 patches) and patch helper utility module
- [x] 03-02: Patch list page (card grid, filter pills) and patch detail page

### Phase 4: MIDI SysEx Integration
**Goal**: Users can capture patches from the Evolver over MIDI, store them, send patches back, and compare side-by-side
**Depends on**: Phase 3
**Requirements**: MIDI-01, MIDI-02, MIDI-03, MIDI-04, MIDI-05
**Plans**: 4 plans (complete)

Plans:
- [x] 04-01: SysEx parser/encoder, parameter map, types, basic-patch JSON sidecar
- [x] 04-02: PatchSchema extension, content reader sidecar discovery, content writer
- [x] 04-03: MIDI connection manager, MIDI workspace page, nav link
- [x] 04-04: Diff engine, diff picker/view UI, Compare Patches section

### Phase 5: Progress + Challenges
**Goal**: Users see guilt-free additive progress metrics and can complete challenge exercises that produce documented patches
**Depends on**: Phase 3
**Requirements**: PROG-01, PROG-02, PROG-03, PROG-04, CHAL-01, CHAL-02, CHAL-03, CHAL-04
**Plans**: 3 plans (complete)

Plans:
- [x] 05-01: Data layer: PatchSchema challenge_id, daily note scanner, progress computation
- [x] 05-02: Progress dashboard UI: CountCard, ModuleJourney, EmptyProgressState
- [x] 05-03: Challenge content: rehype-callouts config, challenge callouts in sessions

### Phase 6: Deployment
**Goal**: The app runs locally against the real vault and deploys to Vercel with a compelling demo
**Depends on**: Phase 5
**Requirements**: DEPL-01, DEPL-02, DEPL-03, DEPL-04
**Plans**: 3 plans (complete)

Plans:
- [x] 06-01: PDF viewer with deep page linking
- [x] 06-02: Synthetic learner journey data, demo badge in nav
- [x] 06-03: Vercel deployment config

</details>

### v1.1 Cascadia Instrument Support (In Progress)

**Milestone Goal:** Add the Intellijel Cascadia as a second instrument -- curriculum, patches, instrument data -- validating the framework's multi-instrument extensibility.

- [ ] **Phase 7: Multi-Instrument UI + Schema Foundation** - De-hardcode nav, add capability flags, extend patch schema for CV instruments, wire Cascadia reference PDF
- [ ] **Phase 8: Cascadia Instrument Data** - Overview page, normalled signal path, module documentation for all Cascadia modules
- [ ] **Phase 9: Patch Documentation + Demo Patches** - Cable routing schema, knob settings, audio previews, Mermaid rendering, 12-16 documented demo patches
- [x] **Phase 10: Curriculum Modules 1-3** - Sessions 1-9 covering Foundations, Oscillators, and Envelopes/Amplitude with ADHD-paced design (completed 2026-04-01)
- [x] **Phase 11: Curriculum Modules 4-7 + Demo Mode** - Sessions 10-25 completing the full curriculum, recipe patches, and Cascadia demo mode with synthetic learner data (completed 2026-04-04)

## Phase Details

### Phase 7: Multi-Instrument UI + Schema Foundation
**Goal**: The app dynamically supports multiple instruments in navigation, routing, and data schemas -- no hardcoded Evolver assumptions remain in UI chrome
**Depends on**: Phase 6
**Requirements**: MULTI-01, MULTI-02, MULTI-03, MULTI-04, CASC-04
**Success Criteria** (what must be TRUE):
  1. Navigation sidebar lists both Evolver and Cascadia as discovered instruments without any hardcoded instrument names
  2. Landing page shows an instrument selector where the user chooses between Evolver and Cascadia
  3. Visiting /instruments/cascadia/midi shows an informational page (not the SysEx workspace) because Cascadia has no MIDI SysEx capability
  4. Cascadia reference PDF (manual v1.1) is accessible via the PDF viewer from the Cascadia instrument pages
  5. PatchSchema accepts optional cable routing and knob settings fields without breaking existing Evolver patches
**Plans**: 3 plans

Plans:
- [ ] 07-01-PLAN.md -- Data layer: InstrumentConfigSchema, instrument.json files, loadInstrumentConfig(), PatchSchema stubs
- [ ] 07-02-PLAN.md -- Nav + Landing: dynamic nav with instrument switcher, landing page instrument selector cards
- [ ] 07-03-PLAN.md -- Pages: capability-gated MIDI route, dynamic instrument overview, markdown/source-ref de-hardcoding

### Phase 8: Cascadia Instrument Data
**Goal**: Users can browse the Cascadia instrument pages and understand its architecture, default signal path, and every module's controls and patch points
**Depends on**: Phase 7
**Requirements**: CASC-01, CASC-02, CASC-03
**Success Criteria** (what must be TRUE):
  1. Cascadia overview page shows the instrument's architecture description, signal flow, and module layout
  2. User can read the normalled signal path documentation explaining what the Cascadia produces with zero cables patched
  3. Each Cascadia module page documents all controls, jacks, normalled connections, and LED behavior
**Plans**: TBD

### Phase 9: Patch Documentation + Demo Patches
**Goal**: Users can browse Cascadia patches documented with cable routing and knob positions, hear audio previews, and see connection diagrams
**Depends on**: Phase 8
**Requirements**: CPATCH-01, CPATCH-02, CPATCH-03, CPATCH-04, CPATCH-05, CPATCH-06
**Success Criteria** (what must be TRUE):
  1. Cascadia patch frontmatter includes structured cable connections (source, destination, purpose) validated by Zod
  2. Cascadia patch frontmatter includes knob/slider positions as settings grouped by module
  3. Patch detail page renders cable connections as a readable list or Mermaid signal flow diagram
  4. Patch detail page renders knob/slider settings grouped by module with values as clock positions or percentages
  5. At least 12 demo patches exist covering bass, lead, pad, drum, texture, and FX categories with audio preview filename references and placeholder UI
**Plans**: 3 plans

Plans:
- [x] 09-01-PLAN.md -- Schema refinement: typed cable_routing, knob_settings, audio_preview, fx enum
- [x] 09-02-PLAN.md -- UI components: CableRoutingList, CableRoutingDiagram, KnobSettingsTable, AudioPreviewPlaceholder, PatchDetail wiring
- [x] 09-03-PLAN.md -- Demo content: 13 Cascadia demo patches across bass, lead, pad, drum, texture, FX categories

### Phase 10: Curriculum Modules 1-3
**Goal**: Users can work through the first 9 Cascadia sessions covering setup, oscillators, and envelopes -- enough to validate the session format for semi-modular instruments
**Depends on**: Phase 9
**Requirements**: CCURR-01, CCURR-02, CCURR-03, CCURR-04, CCURR-05
**Success Criteria** (what must be TRUE):
  1. Sessions 1-9 exist as markdown files following Module 1 (Foundations) "Make a Sound" progression through PWM, sub, filter envelope, wave folding, FM, and FX
  2. Each session teaches a generalized synthesis concept using the Cascadia as the hands-on vehicle
  3. Each session highlights what is unique to Cascadia's implementation (Envelope B triple-mode, normalling choices, mixuverter design)
  4. Sessions document which normalled connections are active and what patching a cable overrides
  5. Module 1 follows the Cascadia manual's "Make a Sound" walkthrough (pp. 11-16) with ADHD-optimized pacing
**Plans**: 3 plans

Plans:
- [x] 10-01-PLAN.md -- Foundations module: Sessions 1-3 (orientation, PWM/sub, filter/wavefold/FM/FX) + foundations-filter-sweep patch
- [x] 10-02-PLAN.md -- Oscillators module: Sessions 4-6 (VCO A shapes, VCO B FM/sync, wave folder) + fm-bell patch
- [x] 10-03-PLAN.md -- Envelopes & Amplitude module: Sessions 7-9 (Envelope A/VCA A, Envelope B triple-mode, VCA B/LPG/mixer) + shaped-dynamics and lpg-bongo patches

### Phase 11: Curriculum Modules 4-7 + Demo Mode
**Goal**: The complete 25-session Cascadia curriculum is published and the Vercel demo shows both instruments with realistic learner progress
**Depends on**: Phase 10
**Requirements**: CCURR-01, CCURR-06, CDEMO-01, CDEMO-02, CDEMO-03
**Success Criteria** (what must be TRUE):
  1. Sessions 10-25 exist covering Filter/WaveFolder, Modulation/Utilities, Advanced Patching/FX, and Sound Design modules
  2. Recipe sessions produce named patches with full cable routing and knob settings documented in patch library format
  3. All Cascadia content is bundled in src/content/ for Vercel demo mode
  4. Synthetic Cascadia learner journey shows approximately 50% progress independent of Evolver journey
  5. Landing page and instrument selector show both instruments with content in demo mode
**Plans**: 4 plans

Plans:
- [x] 11-01-PLAN.md -- Modules 4-5: Sessions 10-15 (Filters & LPG, Modulation & Utilities)
- [x] 11-02-PLAN.md -- Module 6: Sessions 16-19 (Advanced Patching: FM chains, feedback, FX, audio-rate modulation)
- [x] 11-03-PLAN.md -- Module 7: Sessions 20-25 (Sound Design recipes) + 6 named recipe patches
- [x] 11-04-PLAN.md -- Demo mode: synthetic Cascadia journey, instrument-aware progress, content bundling

### Phase 12: Evolver Panel Visualizer Component
**Goal**: Interactive React component rendering the Evolver panel as inline JSX SVG with draggable knobs, curriculum annotation overlays, tooltips, and integration into session detail, patch detail, quick-ref panel, and standalone route
**Depends on**: Phase 11
**Requirements**: EPANEL-01, EPANEL-02, EPANEL-03, EPANEL-04, EPANEL-05, EPANEL-06
**Plans**: 3 plans

Plans:
- [x] 12-01-PLAN.md -- Core EvolverPanel component: metadata map, inline JSX SVG, knob drag interaction, test stubs
- [x] 12-02-PLAN.md -- Tooltip overlay system: PanelTooltip component, hover state wiring
- [ ] 12-03-PLAN.md -- Page integrations: session sidebar, patch inline, quick-ref tab, standalone route, human verification

### Phase 13: Cascadia Panel Visualizer

**Goal:** Create an interactive Cascadia panel SVG, control metadata map, React component, and embed inline panel diagrams across all 25 Cascadia sessions -- mirroring the Evolver panel approach from Phase 12.
**Requirements**: TBD
**Depends on:** Phase 12
**Plans:** 4/4 plans complete

Plans:
- [x] TBD (run /gsd:plan-phase 13 to break down) (completed 2026-04-04)

### Phase 13.1: Panel Visualizer Gap Closure
**Goal**: Close all v1.1 audit gaps — fix broken Cascadia cable rendering, complete Evolver panel section tints, remove orphaned code, and align requirement text with delivered implementation
**Depends on**: Phase 13
**Requirements**: EPANEL-03, EPANEL-06, MULTI-04
**Gap Closure**: Closes gaps from v1.1 milestone audit
**Success Criteria** (what must be TRUE):
  1. Cascadia patch Panel View renders cable bezier paths correctly (cable IDs resolve to CONTROL_METADATA keys)
  2. envelope3 section has a SECTION_BOUNDS entry and section tint renders for all 9 Evolver panel sections
  3. Section tint opacity test passes (implementation and test values match)
  4. SessionPanelSidebar orphaned component removed
  5. EPANEL-06 requirement text updated to reflect inline embedding (not collapsible sidebar)
  6. Standalone panel route passes instrumentSlug to StickyHeader
  7. Cascadia cable signalType resolves from cable_routing data instead of hardcoded 'default'
**Plans**: 2 plans

Plans:
- [ ] 13.1-01-PLAN.md -- Cascadia cable ID resolution and signalType lookup for patch detail Panel View
- [x] 13.1-02-PLAN.md -- Evolver section tint opacity fix, standalone route StickyHeader prop, requirement status updates

---

### v1.2 Learner Experience & Discovery (Planned)

**Milestone Goal:** Remove key UX friction points -- making the app genuinely usable for day-to-day practice rather than just browsable as a demo. Persistent session state, search, prerequisite visualization, and progress enhancements.

- [ ] **Phase 14: Learner State Foundation** - Zustand store with persist middleware, completion toggle, last-visited tracking, vault+manual merge, resume bar
- [ ] **Phase 15: Navigation & Progress Enhancements** - Prerequisite state badges, clickable count cards, module journey "you are here" marker, cumulative practice metrics
- [ ] **Phase 16: Search & Filtering** - Full-text search across sessions and patches, tag/type filtering with sort options
- [ ] **Phase 17: Content & Pedagogy** - Troubleshooting guides and transitional "partial recipe" sessions

### Phase 14: Learner State Foundation
**Goal**: Users have persistent learning state that survives browser restarts -- they can mark sessions complete, and the app remembers where they left off
**Depends on**: Phase 13
**Requirements**: LSTATE-01, LSTATE-02, LSTATE-03, LSTATE-04, NAV-01
**Success Criteria** (what must be TRUE):
  1. User can toggle a session as complete from the session detail page, and the completion persists after closing and reopening the browser
  2. User's last-visited session is automatically tracked and persisted across browser sessions without manual action
  3. Completion data from vault scanning (server) and manual toggles (client localStorage) are merged using union semantics -- if either source says complete, it is complete
  4. A "continue where you left off" resume bar appears showing the user's next recommended session based on last-visited and completion state
  5. Zustand store with persist middleware provides the single client-side state layer consumed by all learner-facing components
**Plans**: TBD
**UI hint**: yes

### Phase 15: Navigation & Progress Enhancements
**Goal**: Users can see their position in the curriculum at a glance -- which sessions are available, where they are in the module journey, and what their cumulative practice looks like
**Depends on**: Phase 14
**Requirements**: NAV-02, PROG-10, PROG-11, PROG-12
**Success Criteria** (what must be TRUE):
  1. Session list shows prerequisite state for each session (locked, available, or completed) with soft visual gating that informs but does not block navigation
  2. Count cards on the progress page are clickable, navigating to the relevant content list (sessions, patches, modules)
  3. Module journey visualization shows a "you are here" marker at the learner's current position in the module sequence
  4. Progress page displays cumulative practice metrics (sessions this month, total active weeks) that are additive-only and never guilt-inducing
**Plans**: TBD
**UI hint**: yes

### Phase 16: Search & Filtering
**Goal**: Users can quickly find any session or patch by searching across titles, descriptions, and tags, and can refine patch browsing with filters and sort options
**Depends on**: Phase 13 (no dependency on Phase 14 -- can parallelize with Phases 15)
**Requirements**: NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. User can type a search query and see matching sessions and patches from across the entire curriculum, searched by title, description, and tags
  2. User can filter patches by type (bass, lead, pad, drum, texture, FX) and by tags, with filters combinable
  3. User can sort patch results by date, name, or type
**Plans**: TBD
**UI hint**: yes

### Phase 17: Content & Pedagogy
**Goal**: Users have troubleshooting support when stuck and transitional sessions that scaffold the move from guided to freeform practice
**Depends on**: Phase 13 (pure content, no code dependencies on Phases 14-16)
**Requirements**: CONTENT-01, CONTENT-02
**Success Criteria** (what must be TRUE):
  1. Each instrument has a troubleshooting guide accessible from the instrument pages, addressing common issues like "I hear nothing", "filter sounds wrong", or "no output from patch point"
  2. At least one transitional "partial recipe" session exists per instrument that gives incomplete instructions, requiring the learner to fill gaps using knowledge from prior sessions
**Plans**: TBD

## Progress

**Execution Order:**
Phases 14 first (foundation). Then 15+16 can parallelize. Phase 17 is independent content work.

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Content Pipeline + Curriculum | v1.0 | 6/6 | Complete | 2026-03-29 |
| 2. Session Browser | v1.0 | 5/5 | Complete | 2026-03-30 |
| 3. Patch Library | v1.0 | 2/2 | Complete | 2026-03-30 |
| 4. MIDI SysEx Integration | v1.0 | 4/4 | Complete | 2026-03-30 |
| 5. Progress + Challenges | v1.0 | 3/3 | Complete | 2026-03-30 |
| 6. Deployment | v1.0 | 3/3 | Complete | 2026-03-30 |
| 7. Multi-Instrument UI + Schema Foundation | v1.1 | 0/3 | Planning | - |
| 8. Cascadia Instrument Data | v1.1 | 2/3 | In Progress|  |
| 9. Patch Documentation + Demo Patches | v1.1 | 0/3 | Planning | - |
| 10. Curriculum Modules 1-3 | v1.1 | 3/3 | Complete    | 2026-04-01 |
| 11. Curriculum Modules 4-7 + Demo Mode | v1.1 | 4/4 | Complete    | 2026-04-04 |
| 12. Evolver Panel Visualizer Component | v1.1 | 2/3 | In progress | - |
| 13. Cascadia Panel Visualizer | v1.1 | 3/4 | Complete    | 2026-04-04 |
| 13.1 Panel Visualizer Gap Closure | v1.1 | 1/2 | In Progress|  |
| 14. Learner State Foundation | v1.2 | 0/0 | Not started | - |
| 15. Navigation & Progress Enhancements | v1.2 | 0/0 | Not started | - |
| 16. Search & Filtering | v1.2 | 0/0 | Not started | - |
| 17. Content & Pedagogy | v1.2 | 0/0 | Not started | - |
