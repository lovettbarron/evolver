---
phase: 30-plaits-beads-swells-ikarie-curricula-panels
plan: "03"
subsystem: swells-curriculum-panel
tags: [swells, panel, curriculum, reverb, eurorack]
dependency_graph:
  requires: [30-02]
  provides: [swells-panel-data, swells-panel-component, swells-sessions, swells-overview]
  affects: [session-detail, quick-ref-panel, patch-detail]
tech_stack:
  added: []
  patterns: [data-driven-panel, slider-component, switch-component, triple-write]
key_files:
  created:
    - src/lib/swells-panel-data.ts
    - src/lib/__tests__/swells-panel-data.test.ts
    - src/components/swells-panel.tsx
    - src/components/__tests__/swells-panel.test.tsx
    - modules/swells/overview.md
    - modules/swells/module.json
    - references/swells-manual.txt
    - sessions/swells/01-foundations-controls-routing.md
    - sessions/swells/02-plate-hall-fog-blur-shadow.md
    - sessions/swells/03-shimmer-cloud-velvet-asterion-deadspace.md
    - sessions/swells/04-modulated-resonant-buckets-ritual-gaze.md
    - sessions/swells/05-swell-generator.md
    - sessions/swells/06-freeze-reverse-performance.md
    - src/content/modules/swells/overview.md
    - src/content/sessions/swells/01-foundations-controls-routing.md
    - src/content/sessions/swells/02-plate-hall-fog-blur-shadow.md
    - src/content/sessions/swells/03-shimmer-cloud-velvet-asterion-deadspace.md
    - src/content/sessions/swells/04-modulated-resonant-buckets-ritual-gaze.md
    - src/content/sessions/swells/05-swell-generator.md
    - src/content/sessions/swells/06-freeze-reverse-performance.md
  modified:
    - src/components/session-detail.tsx
    - src/components/quick-ref-panel.tsx
    - src/components/patch-detail.tsx
decisions:
  - "Swells PDF manual not available via automated download; fallback instructions documented in references/swells-manual.txt"
  - "Panel positions use placeholder values pending manual PDF download for hand-placement"
  - "Added midiToSliderPosition utility for fader thumb positioning (unique to Swells)"
  - "SwellsPanel includes SliderComponent and SwitchComponent -- first panel with vertical faders and 3-position toggles"
  - "parseSwellsPanelProps includes data-sliders attribute parsing alongside data-knobs"
metrics:
  duration: "~10 min"
  completed: "2026-04-18"
  tasks_completed: 4
  tasks_total: 4
  files_created: 21
  files_modified: 3
  tests_added: 14
  tests_passing: 14
---

# Phase 30 Plan 03: Swells Curriculum + Panel Summary

Complete Swells module curriculum with 42-control panel data file, SVG panel component with slider and switch rendering, expanded overview, 6 sessions triple-written, and integration updates to session-detail, quick-ref-panel, and patch-detail.

## Commits

| Hash | Message |
|------|---------|
| 0f3bc42 | feat(30-03): create Swells panel data file with 42 controls and test suite |
| 1465eea | feat(30-03): create Swells overview and 6 curriculum sessions with triple-write |
| d1bdad6 | feat(30-03): create SwellsPanel component with slider/switch rendering and integration updates |

## Task Results

### Task 1: Panel Data File + Tests (TDD)

Created `src/lib/swells-panel-data.ts` with 42 control entries across 5 control types:
- 10 sliders (8 reverb parameter faders + INPUT + MIX)
- 7 knobs (DRIVE, TRIM, RISE, FALL, THRESHOLD, EF GAIN, EF HIGH CUT)
- 6 buttons (SWELL, FREEZE, BURST, REVERSE, MODEL UP, MODEL DOWN)
- 2 switches (LO-FI 3-position, EF SOURCE 3-position)
- 17 jacks (9 CV in, 5 audio I/O, 1 gate in, 1 EF in, 1 CV out)

Exports: `SwellsControlMeta`, `CONTROL_METADATA`, `CONTROL_POSITIONS`, `SECTION_BOUNDS`, `midiToRotation`, `midiToSliderPosition`.

Test suite: 11 tests covering control count, field validation, type validation, jack signal types, module consistency, section bounds, utility functions, position completeness, control type coverage, and key control IDs.

PDF manual download attempted but all automated URLs returned 404. Fallback instructions documented in `references/swells-manual.txt`.

### Task 2: Overview + 6 Sessions (Triple-Write)

**Overview** (`modules/swells/overview.md`): Architecture, Controls Reference (7 tables by section), Basic Patch init state, 9 Algorithms Reference table, Further Reading.

**6 Sessions:**
1. Foundations: Controls, Routing & Your First Reverb (25 min, beginner)
2. Traditional Spaces: Fog, Blur & Shadow (20 min, beginner)
3. Ethereal Textures: Velvet, Asterion & Deadspace (20 min, intermediate)
4. Character Effects: Buckets, Ritual & Gaze (25 min, intermediate)
5. Swell Generator Deep Dive (25 min, intermediate)
6. Freeze, Reverse & Performance (25 min, advanced)

All sessions include:
- ADHD-friendly "5 minutes only" quick tips
- Warm-up referencing previous session
- `data-swells-panel` markers with control highlights
- `instrument_type: eurorack_module` frontmatter
- Document Your Results output section

Triple-written to `sessions/swells/`, `src/content/sessions/swells/`, and `~/song/sessions/swells/`.

### Task 3: Panel Component + Integration Updates (TDD)

**SwellsPanel** (`src/components/swells-panel.tsx`):
- Data-driven rendering over CONTROL_METADATA
- SliderComponent: vertical fader with track + thumb positioned by `midiToSliderPosition`
- SwitchComponent: 3-position toggle (traffic light style, selected = orange)
- KnobComponent, ButtonComponent, JackGroupComponent matching MathsPanel patterns
- Cable rendering, zoom, section tinting, tooltips
- ViewBox: 0 0 420 380 (20HP)

**Integration updates:**
- `session-detail.tsx`: Added SWELLS_PANEL_RE regex, `parseSwellsPanelProps` (with `data-sliders` support), SwellsPanel render branch
- `quick-ref-panel.tsx`: Added `instrumentSlug === 'swells'` to panel tab conditional and SwellsPanel render
- `patch-detail.tsx`: Added SwellsPanel import and conditional render block

Component test: 3 tests (renders, viewBox, export).

### Task 4: PDF Verification Checkpoint

Auto-approved with note: `references/swells-manual.pdf` does not exist. Automated download returned 404 for all attempted URLs. Panel control positions use placeholder values. User needs to manually download from https://intellijel.com/shop/eurorack/swells/ (Manual tab) before positions can be hand-placed.

## Deviations from Plan

None -- plan executed exactly as written.

## Known Stubs

- **CONTROL_POSITIONS placeholder values**: All 42 control positions in `src/lib/swells-panel-data.ts` use approximate placeholder coordinates (`{ x: N, y: N }`). These must be hand-placed from the PDF manual diagram once available. This is intentional per the plan -- positions are always refined in a later phase after reference images are studied.

## Self-Check: PASSED
