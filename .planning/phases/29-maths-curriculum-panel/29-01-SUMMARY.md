---
phase: 29-maths-curriculum-panel
plan: 01
subsystem: panel
tags: [maths, panel-data, make-noise, eurorack, typescript]

requires:
  - phase: 26-data-model-content-pipeline
    provides: ModuleConfigSchema, module directory structure
provides:
  - Maths panel data file with 45 control entries across 5 channel groups
  - MathsControlMeta interface with button type for push-button controls
  - Channel-based ID convention (knob-ch1-rise, jack-ch4-eoc-out, etc.)
  - Placeholder positions ready for Phase 28 hand-placement
affects: [29-02, 29-03, 28-panel-system]

tech-stack:
  added: []
  patterns: [channel-based control IDs for eurorack modules, button type for push-button controls]

key-files:
  created:
    - src/lib/maths-panel-data.ts
    - src/lib/__tests__/maths-panel-data.test.ts
  modified:
    - references/maths-manual.txt

key-decisions:
  - "Used button type (not switch) for Maths Cycle controls -- physical panel has push buttons with LEDs"
  - "Kept ch2 and ch3 as separate module groups (not combined ch2-3) -- matches physical panel layout"
  - "Placeholder positions at {x:0, y:0} and section bounds at 100x100 -- hand-placement deferred to Phase 28"

patterns-established:
  - "Channel-based IDs for function generators: {type}-{channel}-{name-kebab} for per-channel controls, {type}-{bus-name} for bus outputs"
  - "Button control type in panel metadata for push-button controls (distinct from toggle switches)"

requirements-completed: [PANEL-07]

duration: 3min
completed: 2026-04-18
---

# Phase 29 Plan 01: Maths Panel Data + Manual Summary

**Complete Maths panel data file with 45 verified controls across 5 channel groups, channel-based IDs, and button type for Cycle push-buttons**

## Performance

- **Duration:** 3 min
- **Started:** 2026-04-18T07:22:39Z
- **Completed:** 2026-04-18T07:25:10Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created Maths panel data file with all 45 control entries matching the verified inventory (10 knobs, 2 buttons, 16 input jacks, 11 output jacks, 8 LEDs)
- 9-test validation suite covering control counts, per-module counts, valid types, signalType on jacks, section bounds, and midiToRotation
- Documented Maths manual download instructions (automated download not possible -- Make Noise site requires browser)

## Task Commits

Each task was committed atomically:

1. **Task 1 RED: Failing tests** - `2b7d90e` (test)
2. **Task 1 GREEN: Panel data file** - `5185100` (feat)
3. **Task 2: Manual download instructions** - `e1927bb` (chore)

## Files Created/Modified
- `src/lib/maths-panel-data.ts` - Panel control metadata (45 entries), placeholder positions, section bounds, midiToRotation
- `src/lib/__tests__/maths-panel-data.test.ts` - 9-test validation suite for panel data completeness
- `references/maths-manual.txt` - Updated with download instructions (PDF requires manual browser download)

## Decisions Made
- Used `button` type for Maths Cycle controls (physical panel has push buttons, not toggle switches)
- Kept ch2 and ch3 as separate groups rather than combined `ch2-3` -- matches physical panel where they occupy distinct vertical spaces
- Placeholder positions use `{x: 0, y: 0}` and section bounds use 100x100 -- real values to be hand-placed from manual reference image when Phase 28 panel renderer is ready

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Maths manual PDF could not be downloaded automatically. All attempted URLs (UCSB mirror, Make Noise direct patterns) returned HTML instead of PDF. This was anticipated by the plan as a known possibility. Fallback path documented in `references/maths-manual.txt`.

## User Setup Required

**Manual PDF download needed.** Visit https://www.makenoisemusic.com/modules/maths, download the MATHS manual 2020 PDF, and save as `references/maths-manual.pdf`. This is needed for accurate panel position hand-placement in a later task.

## Next Phase Readiness
- Panel data file ready for Phase 28 generic ModulePanel renderer to consume
- Control inventory verified and tested -- no re-work needed
- Maths manual PDF still needed for position hand-placement (user action required)
- Plans 02 and 03 (curriculum sessions, overview page) can proceed independently

---
*Phase: 29-maths-curriculum-panel*
*Completed: 2026-04-18*
