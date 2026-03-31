# Roadmap: Instrument Deep Learning

## Milestones

- ✅ **v1.0 Evolver Learning Platform** - Phases 1-6 (shipped 2026-03-30)
- 🚧 **v1.1 Cascadia Instrument Support** - Phases 7-11 (in progress)

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
- [ ] **Phase 10: Curriculum Modules 1-3** - Sessions 1-9 covering Foundations, Oscillators, and Envelopes/Amplitude with ADHD-paced design
- [ ] **Phase 11: Curriculum Modules 4-7 + Demo Mode** - Sessions 10-25 completing the full curriculum, recipe patches, and Cascadia demo mode with synthetic learner data

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
  5. At least 12 demo patches exist covering bass, lead, pad, drum, texture, and FX categories with embedded audio preview references
**Plans**: 3 plans

Plans:
- [ ] 09-01-PLAN.md -- Schema refinement: typed cable_routing, knob_settings, audio_preview, fx enum
- [ ] 09-02-PLAN.md -- UI components: CableRoutingList, CableRoutingDiagram, KnobSettingsTable, AudioPreviewPlaceholder, PatchDetail wiring
- [ ] 09-03-PLAN.md -- Demo content: 13 Cascadia demo patches across bass, lead, pad, drum, texture, FX categories

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
**Plans**: TBD

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
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 7 -> 8 -> 9 -> 10 -> 11

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
| 10. Curriculum Modules 1-3 | v1.1 | 0/? | Not started | - |
| 11. Curriculum Modules 4-7 + Demo Mode | v1.1 | 0/? | Not started | - |

### Phase 12: Evolver Panel Visualizer Component

**Goal:** [To be planned]
**Requirements**: TBD
**Depends on:** Phase 11
**Plans:** 0 plans

Plans:
- [ ] TBD (run /gsd:plan-phase 12 to break down)
