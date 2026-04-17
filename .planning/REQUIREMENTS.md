# Requirements: Instrument Deep Learning — v2.0 Eurorack Module Learning

**Defined:** 2026-04-17
**Core Value:** ADHD-friendly instrument mastery through structured micro-sessions, backed by an Obsidian-powered web app that makes learning visible, shareable, and connected to actual music-making.

## v2.0 Requirements

Requirements for the eurorack module learning milestone. Each maps to roadmap phases.

### Data Model

- [ ] **DATA-01**: ModuleConfigSchema validates HP width, manufacturer, power specs, and multi-category array
- [ ] **DATA-02**: Module content directories (`modules/<slug>/`) discovered by reader functions parallel to instruments
- [ ] **DATA-03**: SessionSchema `module` field renamed to `section` across all 95 existing sessions and schema definitions
- [ ] **DATA-04**: Module sessions use `instrument_type: eurorack_module` to distinguish from instrument sessions in queries and routing
- [ ] **DATA-05**: Triple-write pipeline supports module content (working tree, `src/content/modules/`, `~/song/modules/`)
- [ ] **DATA-06**: Module manuals downloaded to `references/` for all 7 modules (Swells, Plaits, Beads, Just Friends, Crow, Maths, Ikarie)

### Navigation

- [ ] **NAV-01**: Top-level "Modules" section at `/modules` lists all eurorack modules with category filter (`?category=vco`)
- [ ] **NAV-02**: Per-module routes at `/modules/[slug]/` with overview, sessions, and patches pages
- [ ] **NAV-03**: Module selector in main nav alongside instrument selector
- [ ] **NAV-04**: Multi-category modules appear under each category they belong to in filtered views
- [ ] **NAV-05**: Per-module color identity via `[data-instrument]` CSS cascade (7 distinct palettes)

### Panels

- [ ] **PANEL-01**: Generic `ModulePanel` component renders any module from per-module data files
- [ ] **PANEL-02**: Hand-placed SVG panel for Intellijel Swells (20HP, reverb)
- [ ] **PANEL-03**: Hand-placed SVG panel for Mutable Instruments Plaits (12HP, VCO)
- [ ] **PANEL-04**: Hand-placed SVG panel for Mutable Instruments Beads (14HP, granular)
- [ ] **PANEL-05**: Hand-placed SVG panel for Mannequins Just Friends (14HP, modulator/VCO/EG)
- [ ] **PANEL-06**: Hand-placed SVG panel for Monome Crow (2HP, scriptable I/O)
- [ ] **PANEL-07**: Hand-placed SVG panel for Make Noise Maths (20HP, function generator)
- [ ] **PANEL-08**: Hand-placed SVG panel for Casper x Bastl Ikarie (8HP, stereo filter)
- [ ] **PANEL-09**: HP-width-aware rendering (panels display at correct relative sizes)
- [ ] **PANEL-10**: Session annotation markers work on module panels (same `data-*-panel` pattern)

### Curricula

- [ ] **CURR-01**: Maths curriculum (10-12 sessions covering envelope, LFO, slew, audio-rate, utilities)
- [ ] **CURR-02**: Plaits curriculum (8-10 sessions across 16 synthesis modes in 2 banks)
- [ ] **CURR-03**: Beads curriculum (6-8 sessions covering 3 grain modes, quality settings, attenurandomizers)
- [ ] **CURR-04**: Just Friends curriculum (8-10 sessions for Shape/Cycle/Sound modes)
- [ ] **CURR-05**: Crow curriculum (4-6 sessions for scripting, i2c, standalone I/O)
- [ ] **CURR-06**: Swells curriculum (5-7 sessions covering 9 reverb models, Swell Generator, Freeze/Reverse)
- [ ] **CURR-07**: Ikarie curriculum (5-7 sessions for filter modes, stereo/dual-peak, envelope follower)
- [ ] **CURR-08**: Module overview pages per module (architecture, controls reference, init state)
- [ ] **CURR-09**: All sessions follow 15-30 min ADHD-friendly format with tangible output

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
| — | — | — | Pending roadmap creation |
