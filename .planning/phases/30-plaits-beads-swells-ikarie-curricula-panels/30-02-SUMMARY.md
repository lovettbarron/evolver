---
phase: 30-plaits-beads-swells-ikarie-curricula-panels
plan: "02"
subsystem: beads-curriculum-panel
tags: [beads, granular, panel, curriculum, sessions, eurorack]
dependency_graph:
  requires: [30-01]
  provides: [beads-panel-data, beads-panel-component, beads-curriculum, beads-integration]
  affects: [session-detail, quick-ref-panel, patch-detail, module-panel-page]
tech_stack:
  added: []
  patterns: [data-driven-panel, tdd-panel-data, triple-write-sessions]
key_files:
  created:
    - src/lib/beads-panel-data.ts
    - src/lib/__tests__/beads-panel-data.test.ts
    - src/components/beads-panel.tsx
    - src/components/__tests__/beads-panel.test.tsx
    - modules/beads/overview.md
    - src/content/modules/beads/overview.md
    - sessions/beads/01-foundations-controls-buffer-quality.md
    - sessions/beads/02-granular-mode.md
    - sessions/beads/03-delay-mode.md
    - sessions/beads/04-looper-mode.md
    - sessions/beads/05-attenurandomizers-modulation.md
    - sessions/beads/06-creative-patch.md
    - src/content/sessions/beads/01-foundations-controls-buffer-quality.md
    - src/content/sessions/beads/02-granular-mode.md
    - src/content/sessions/beads/03-delay-mode.md
    - src/content/sessions/beads/04-looper-mode.md
    - src/content/sessions/beads/05-attenurandomizers-modulation.md
    - src/content/sessions/beads/06-creative-patch.md
    - src/app/modules/[slug]/panel/page.tsx
    - src/app/modules/[slug]/panel/module-panel-client.tsx
  modified:
    - src/components/session-detail.tsx
    - src/components/quick-ref-panel.tsx
    - src/components/patch-detail.tsx
decisions:
  - "28 controls total (4 buttons, 8 knobs, 4 attenurandomizers, 10 jacks, 1 LED) matching physical panel"
  - "Attenurandomizers typed as knob with small radius (7px) distinct from medium (10px) and large (14px)"
  - "6 CV input jacks (DENSITY, TIME, SIZE, SHAPE, PITCH, ASSIGN) per manual verification"
metrics:
  duration_seconds: 725
  completed: "2026-04-18T13:30:28Z"
  tasks_completed: 3
  tasks_total: 3
  tests_added: 11
  files_created: 20
  files_modified: 3
---

# Phase 30 Plan 02: Beads Curriculum + Panel Summary

Complete Beads granular texture synthesizer curriculum with panel data, SVG component, overview, 6 sessions, and integration updates following the established Maths/Plaits pattern.

## One-Liner

28-control Beads panel with TDD data validation, 6-session granular curriculum covering 3 grain modes and attenurandomizer dual-function, triple-written with data-beads-panel markers.

## What Was Done

### Task 1: Beads panel data file and test suite (TDD)
- Created `BeadsControlMeta` interface with id/name/module/type/signalType fields
- 28 CONTROL_METADATA entries: 4 buttons (quality, freeze, seed, cv-assign), 4 large knobs (density, time, pitch, size), 4 medium knobs (shape, feedback, dry-wet, reverb), 4 attenurandomizer knobs (time-att, size-att, shape-att, pitch-att), 2 audio inputs, 2 gate inputs, 6 CV inputs, 2 audio outputs, 1 LED
- CONTROL_POSITIONS with placeholder coordinates for future hand-placement
- SECTION_BOUNDS placeholder for the beads section
- midiToRotation utility function (same formula as Maths/Plaits)
- 8 passing tests validating metadata completeness, types, signalTypes, module names, section bounds, rotation boundaries, and position coverage
- Commit: `39c3ab8`

### Task 2: Beads overview and 6 curriculum sessions
- Expanded overview with architecture (buffer recording, grain generation, 3 modes, 4 quality settings, special modes), controls reference (organized by functional group), and init state
- Session 01: Foundations -- controls layout, quality modes, DENSITY/TIME/SIZE interaction, FREEZE, grain generation modes
- Session 02: Granular Mode -- time-stretching via TIME, pitch-shifting via PITCH, SHAPE envelope character
- Session 03: Delay Mode -- SIZE fully CW for infinite grain, DENSITY as delay time, FEEDBACK for repeats, pitch-shifted delays
- Session 04: Looper Mode -- gated grains via SEED button, clocked mode with external clock, clock division patterns
- Session 05: Attenurandomizers -- CW from noon = CV modulation depth, CCW from noon = randomization amount, CV ASSIGN button for mixing parameters
- Session 06: Creative Patch -- wavetable synth mode (no input), freeze composition, quality as effect, multi-layered granular composition
- All 6 sessions triple-written to sessions/, src/content/, ~/song/
- All sessions include data-beads-panel markers with knob values and highlights
- All sessions follow 15-30 min ADHD-friendly format with tangible output
- Commit: `5b89cc2`

### Task 3: BeadsPanel component, tests, and integration
- BeadsPanel SVG component (200x380 viewBox for 14HP module) with 3 knob sizes: large (r=14) for DENSITY/TIME/PITCH/SIZE, medium (r=10) for SHAPE/FEEDBACK/DRY-WET/REVERB, small (r=7) for attenurandomizers
- Interactive knob drag via useKnobDrag hook, tooltips, cable rendering, zoom, section tints, highlight glow filters
- 3 passing component tests: renders without crashing, viewBox validation, export check
- session-detail.tsx: Added BEADS_PANEL_RE regex (cable-safe pattern), parseBeadsPanelProps function, BeadsPanel rendering conditional
- modules/[slug]/panel/page.tsx: Added beads entry to PANEL_CONFIG with description and maxWidth
- module-panel-client.tsx: Added beads conditional to render BeadsPanel
- quick-ref-panel.tsx: Added beads to showPanelTab condition and rendering conditional
- patch-detail.tsx: Added BeadsPanel import and beads conditional for inline panel view
- Commit: `0de0375`

## Deviations from Plan

None -- plan executed exactly as written.

## Known Stubs

- CONTROL_POSITIONS: All 28 entries have placeholder `{ x: 0, y: 0 }` coordinates. Hand-placement from reference photos is intentionally deferred per the established pattern (positions are placed after visual iteration with screenshots, not during initial data creation).
- SECTION_BOUNDS: Placeholder `{ x: 0, y: 0, width: 200, height: 380 }` covering full panel. Will be refined during hand-placement.

These stubs are intentional and match the Maths/Plaits pattern where data structure is created first with tests, then positions are hand-placed in a separate visual iteration pass.

## Verification

- `npx vitest run src/lib/__tests__/beads-panel-data.test.ts` -- 8 tests passed
- `npx vitest run src/components/__tests__/beads-panel.test.tsx` -- 3 tests passed
- 6 session files in each of 3 locations (sessions/, src/content/, ~/song/)
- All sessions contain `instrument_type: eurorack_module` and `instrument: beads`
- All sessions contain `data-beads-panel` markers
- Overview contains Architecture, Controls Reference, and Basic Patch sections
- Session 05 explains attenurandomizer dual-function (CV modulation vs randomization)
