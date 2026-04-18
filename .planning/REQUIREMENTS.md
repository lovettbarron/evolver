# Requirements: Instrument Deep Learning — v2.0 Eurorack Module Learning

**Defined:** 2026-04-17
**Core Value:** ADHD-friendly instrument mastery through structured micro-sessions, backed by an Obsidian-powered web app that makes learning visible, shareable, and connected to actual music-making.

## v2.0 Requirements

Requirements for the eurorack module learning milestone. Each maps to roadmap phases.

### Data Model

- [x] **DATA-01**: ModuleConfigSchema validates HP width, manufacturer, power specs, and multi-category array
- [x] **DATA-02**: Module content directories (`modules/<slug>/`) discovered by reader functions parallel to instruments
- [x] **DATA-03**: SessionSchema `module` field renamed to `section` across all 95 existing sessions and schema definitions
- [x] **DATA-04**: Module sessions use `instrument_type: eurorack_module` to distinguish from instrument sessions in queries and routing
- [x] **DATA-05**: Triple-write pipeline supports module content (working tree, `src/content/modules/`, `~/song/modules/`)
- [x] **DATA-06**: Module manuals downloaded to `references/` for all 7 modules (Swells, Plaits, Beads, Just Friends, Crow, Maths, Ikarie)

### Navigation

- [x] **NAV-01**: Top-level "Modules" section at `/modules` lists all eurorack modules with category filter (`?category=vco`)
- [x] **NAV-02**: Per-module routes at `/modules/[slug]/` with overview, sessions, and patches pages
- [x] **NAV-03**: Module selector in main nav alongside instrument selector
- [x] **NAV-04**: Multi-category modules appear under each category they belong to in filtered views
- [x] **NAV-05**: Per-module color identity via `[data-instrument]` CSS cascade (7 distinct palettes)

### Panels

- [ ] **PANEL-01**: Generic `ModulePanel` component renders any module from per-module data files
- [ ] **PANEL-02**: Hand-placed SVG panel for Intellijel Swells (20HP, reverb)
- [x] **PANEL-03**: Hand-placed SVG panel for Mutable Instruments Plaits (12HP, VCO)
- [ ] **PANEL-04**: Hand-placed SVG panel for Mutable Instruments Beads (14HP, granular)
- [ ] **PANEL-05**: Hand-placed SVG panel for Mannequins Just Friends (14HP, modulator/VCO/EG)
- [ ] **PANEL-06**: Hand-placed SVG panel for Monome Crow (2HP, scriptable I/O)
- [x] **PANEL-07**: Hand-placed SVG panel for Make Noise Maths (20HP, function generator)
- [ ] **PANEL-08**: Hand-placed SVG panel for Casper x Bastl Ikarie (8HP, stereo filter)
- [ ] **PANEL-09**: HP-width-aware rendering (panels display at correct relative sizes)
- [ ] **PANEL-10**: Session annotation markers work on module panels (same `data-*-panel` pattern)

### Curricula

- [x] **CURR-01**: Maths curriculum (10-12 sessions covering envelope, LFO, slew, audio-rate, utilities)
- [x] **CURR-02**: Plaits curriculum (8-10 sessions across 16 synthesis modes in 2 banks)
- [ ] **CURR-03**: Beads curriculum (6-8 sessions covering 3 grain modes, quality settings, attenurandomizers)
- [ ] **CURR-04**: Just Friends curriculum (8-10 sessions for Shape/Cycle/Sound modes)
- [ ] **CURR-05**: Crow curriculum (4-6 sessions for scripting, i2c, standalone I/O)
- [ ] **CURR-06**: Swells curriculum (5-7 sessions covering 9 reverb models, Swell Generator, Freeze/Reverse)
- [ ] **CURR-07**: Ikarie curriculum (5-7 sessions for filter modes, stereo/dual-peak, envelope follower)
- [x] **CURR-08**: Module overview pages per module (architecture, controls reference, init state)
- [x] **CURR-09**: All sessions follow 15-30 min ADHD-friendly format with tangible output

### Progress & Demo

- [ ] **PROG-01**: Progress tracking per module in Zustand store (completion toggle, practice metrics)
- [ ] **PROG-02**: Prerequisite badges within module curricula (same soft-gating pattern)
- [ ] **PROG-03**: Demo mode with synthetic learner journeys for at least 2 modules (Maths + Plaits)

### Cross-Module

- [ ] **XMOD-01**: Session cross-references between modules (e.g., "Maths envelope → Ikarie filter")
- [ ] **XMOD-02**: Category-based suggestions on module pages ("Other Sound Sources you own: Plaits, Just Friends")

## Future Requirements

- Rack context awareness (user configures "my rack" for personalized patching suggestions)
- Eurorack fundamentals sessions (signal levels, CV vs audio vs gate, power, HP)
- Patch recipe sessions combining multiple modules
- Module comparison within category
- Full rack planner / ModularGrid integration

## Out of Scope

- ModularGrid clone or universal module database — focus on curated learning for owned modules
- Audio-rate patch simulation — this is a learning tool, not a VST
- Video tutorials — text + audio only per project constraints
- Calendar-based practice scheduling — violates ADHD design principle
- Automated CV/signal routing visualization — too complex, physical patching is manual
- Module purchase recommendations — stay focused on "learn what you own"

## Traceability

| REQ-ID | Phase | Plan | Status |
|--------|-------|------|--------|
| DATA-01 | Phase 26 | 26-02 | Complete |
| DATA-02 | Phase 26 | 26-02 | Complete |
| DATA-03 | Phase 26 | 26-01 | Complete |
| DATA-04 | Phase 26 | 26-01 | Complete |
| DATA-05 | Phase 26 | 26-02 | Complete |
| DATA-06 | Phase 26 | 26-03 | Complete (2 PDFs + 5 placeholders) |
| NAV-01 | Phase 27 | — | Pending |
| NAV-02 | Phase 27 | — | Pending |
| NAV-03 | Phase 27 | — | Pending |
| NAV-04 | Phase 27 | — | Pending |
| NAV-05 | Phase 27 | — | Pending |
| PANEL-01 | Phase 28 | — | Pending |
| PANEL-02 | Phase 30 | — | Pending |
| PANEL-03 | Phase 28 | — | Pending |
| PANEL-04 | Phase 30 | — | Pending |
| PANEL-05 | Phase 31 | — | Pending |
| PANEL-06 | Phase 31 | — | Pending |
| PANEL-07 | Phase 29 | — | Pending |
| PANEL-08 | Phase 30 | — | Pending |
| PANEL-09 | Phase 28 | — | Pending |
| PANEL-10 | Phase 28 | — | Pending |
| CURR-01 | Phase 29 | — | Pending |
| CURR-02 | Phase 30 | — | Pending |
| CURR-03 | Phase 30 | — | Pending |
| CURR-04 | Phase 31 | — | Pending |
| CURR-05 | Phase 31 | — | Pending |
| CURR-06 | Phase 30 | — | Pending |
| CURR-07 | Phase 30 | — | Pending |
| CURR-08 | Phase 29 | — | Pending |
| CURR-09 | Phase 29 | — | Pending |
| PROG-01 | Phase 32 | — | Pending |
| PROG-02 | Phase 32 | — | Pending |
| PROG-03 | Phase 32 | — | Pending |
| XMOD-01 | Phase 32 | — | Pending |
| XMOD-02 | Phase 32 | — | Pending |
