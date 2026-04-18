---
phase: 30-plaits-beads-swells-ikarie-curricula-panels
plan: 04
subsystem: ikarie-curriculum-panel
tags: [ikarie, panel, curriculum, sessions, filter, eurorack]
dependency_graph:
  requires: [30-03]
  provides: [ikarie-panel-data, ikarie-panel-component, ikarie-curriculum, ikarie-integration]
  affects: [session-detail, quick-ref-panel, patch-detail, panel-page]
tech_stack:
  added: []
  patterns: [data-driven-panel, triple-write, tdd-red-green, cable-safe-regex]
key_files:
  created:
    - src/lib/ikarie-panel-data.ts
    - src/lib/__tests__/ikarie-panel-data.test.ts
    - src/components/ikarie-panel.tsx
    - src/components/__tests__/ikarie-panel.test.tsx
    - modules/ikarie/overview.md
    - modules/ikarie/module.json
    - sessions/ikarie/01-foundations-filter-modes-stereo.md
    - sessions/ikarie/02-dual-peak-resonance.md
    - sessions/ikarie/03-envelope-follower-modulation.md
    - sessions/ikarie/04-self-oscillation-feedback.md
    - sessions/ikarie/05-in-context-voice-chain.md
    - src/content/modules/ikarie/overview.md
    - src/content/modules/ikarie/module.json
    - src/content/sessions/ikarie/01-foundations-filter-modes-stereo.md
    - src/content/sessions/ikarie/02-dual-peak-resonance.md
    - src/content/sessions/ikarie/03-envelope-follower-modulation.md
    - src/content/sessions/ikarie/04-self-oscillation-feedback.md
    - src/content/sessions/ikarie/05-in-context-voice-chain.md
    - src/app/modules/[slug]/panel/page.tsx
    - src/app/modules/[slug]/panel/module-panel-client.tsx
  modified:
    - src/components/session-detail.tsx
    - src/components/quick-ref-panel.tsx
    - src/components/patch-detail.tsx
decisions:
  - "8HP viewBox (170x380) for Ikarie -- narrowest eurorack module in this phase"
  - "TWO_WAY_SWITCHES set distinguishes PAN/SPREAD (2-pos) from FOLLOW SPEED (3-pos)"
  - "CUTOFF knob rendered larger (r=16 vs r=10) matching physical panel prominence"
  - "Slider + data-sliders support in parseIkariePanelProps for RESONANCE fader"
metrics:
  duration: "~12 min"
  completed: "2026-04-18"
  tasks_completed: 3
  tasks_total: 3
  tests_added: 14
  files_created: 20
  files_modified: 3
---

# Phase 30 Plan 04: Ikarie Curriculum & Panel Summary

Complete Ikarie curriculum with 18-control panel data, SVG panel component, expanded overview, 5 sessions, and integration into session-detail/quick-ref/patch-detail/panel-page.

## What Was Built

### Panel Data (src/lib/ikarie-panel-data.ts)
- 18 control entries: 4 knobs, 1 slider (RESONANCE fader), 2 switches (PAN/SPREAD 2-position, FOLLOW SPEED 3-position), 7 input jacks, 4 output jacks
- IkarieControlMeta interface with id/name/module/type/signalType
- CONTROL_POSITIONS with placeholder coordinates based on manual p.7
- SECTION_BOUNDS for zoom/tint calculations
- midiToRotation and midiToSliderPosition conversion functions
- 11 tests validating completeness, types, signal types, and positions

### Panel Component (src/components/ikarie-panel.tsx)
- Data-driven SVG panel following the Swells/Maths pattern
- 8HP viewBox (170x380) -- narrowest module in this phase
- Interactive knobs with drag, slider with thumb position, 2-way and 3-way switches
- Output jacks filled white, input jacks dark per design conventions
- Cable rendering support with droop calculation
- Tooltip on hover showing control name and value
- FOLLOW-to-MOD normalling indicator text on panel
- 3 component tests passing

### Curriculum Content
- **Overview** with Architecture, Controls Reference (18 entries), Basic Patch init state, 8 Patch Tips from manual
- **Session 01**: Filter modes, stereo routing, FOLLOW-to-MOD normalling (25 min, beginner)
- **Session 02**: Dual-peak resonance, BEYOND output, formant filtering, Quad Acid (20 min, intermediate)
- **Session 03**: Envelope follower modulation, breaking normalling, external routing (25 min, intermediate)
- **Session 04**: Self-oscillation, V/OCT, pinging, 24dB chaining, ring mod (20 min, advanced)
- **Session 05**: Voice chain integration with VCO/VCF/VCA, recording output (25 min, advanced)
- All sessions include data-ikarie-panel markers at exercise steps
- All content triple-written to sessions/, src/content/sessions/, ~/song/sessions/

### Integration Updates
- **session-detail.tsx**: IKARIE_PANEL_RE regex, parseIkariePanelProps with data-sliders support, IkariePanel rendering
- **quick-ref-panel.tsx**: ikarie slug conditional for panel tab
- **patch-detail.tsx**: ikarie slug conditional for panel view
- **panel/page.tsx + module-panel-client.tsx**: ikarie panel page with 300px max-width (8HP narrow)

### module.json Fix
- Power specs corrected from +12V: 50mA/-12V: 40mA to +12V: 100mA/-12V: 95mA (matching manual)
- reference_pdfs updated from ikarie-manual.txt to ikarie-manual.pdf

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | c27ea9e | Panel data (18 controls) + tests (11) + module.json power fix |
| 2 | b14d44d | Overview + 5 sessions triple-written with panel markers |
| 3 | 881b768 | IkariePanel component + tests (3) + integration updates |

## Deviations from Plan

None -- plan executed exactly as written.

## Known Stubs

- CONTROL_POSITIONS use placeholder coordinates (x:0, y:0 pattern not used -- approximate positions provided based on manual layout description). Full hand-placement from manual PDF photo deferred to panel refinement phase.

## Self-Check: PASSED
