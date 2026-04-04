---
phase: 13-cascadia-panel-visualizer
plan: 01
subsystem: ui
tags: [cascadia, panel-data, svg, typescript, metadata]

# Dependency graph
requires:
  - phase: 12-evolver-panel-visualizer
    provides: evolver-panel-data.ts pattern (ControlMeta, SECTION_BOUNDS, midiToRotation)
provides:
  - CONTROL_METADATA with 179 entries covering all 17 Cascadia modules
  - SECTION_BOUNDS with 17 proportional entries for 1800x350 viewBox
  - CascadiaControlMeta interface with jack signalType support
  - midiToRotation and midiToSliderPosition utility functions
  - getModuleForControl lookup helper
affects: [13-02, 13-03, 13-04]

# Tech tracking
tech-stack:
  added: []
  patterns: [cascadia-control-id-convention, jack-signal-type-classification]

key-files:
  created:
    - src/lib/cascadia-panel-data.ts
    - src/lib/__tests__/cascadia-panel-data.test.ts
  modified: []

key-decisions:
  - "Cascadia control ID convention: {type}-{module}-{name-kebab} (knob-, slider-, switch-, jack-, led-)"
  - "Jack signal types classified as audio/cv/gate/modulation based on module documentation context"
  - "SECTION_BOUNDS uses proportional widths based on control density within 1800x350 viewBox"
  - "Mixuverter x3 outputs represented as 2 SVG entries (out-a, out-b) to match panel layout"
  - "Buttons (MIDI/CV, Push Gate) mapped to switch type for consistent control taxonomy"

patterns-established:
  - "Cascadia ID convention: {type}-{module}-{name-kebab} for all 179 controls"
  - "Signal type classification: audio for waveform outputs, cv for 1V/oct and voltage signals, gate for triggers/gates, modulation for LFO/envelope destinations"

requirements-completed: [CPANEL-DATA]

# Metrics
duration: 8min
completed: 2026-04-04
---

# Phase 13 Plan 01: Cascadia Panel Data Summary

**Complete metadata map of 179 Cascadia controls (84 knobs/sliders/switches/LEDs + 95 jacks) across 17 modules with signal type classification and proportional section bounds**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-04T17:32:21Z
- **Completed:** 2026-04-04T17:40:14Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- CascadiaControlMeta interface supporting knob, slider, switch, jack-in, jack-out, and led types with optional signalType for jacks
- CONTROL_METADATA with 179 entries sourced from all 17 module documentation files, each entry with id, name, module, and type
- SECTION_BOUNDS with 17 entries using proportional widths distributed across 1800x350 viewBox matching physical panel layout
- midiToRotation (-135 to +135 degrees) and midiToSliderPosition (0.0 to 1.0) utility functions
- 11 comprehensive test cases validating entry counts, field completeness, type validity, signal types, module membership, section bounds, and per-module inventory counts

## Task Commits

Each task was committed atomically:

1. **Task 1: Test stubs for cascadia-panel-data** - `bfa15ec` (test) - TDD RED phase
2. **Task 2: CascadiaControlMeta interface, CONTROL_METADATA, SECTION_BOUNDS, and utilities** - `45389f9` (feat) - TDD GREEN phase

## Files Created/Modified
- `src/lib/cascadia-panel-data.ts` - 179-entry control metadata map, section bounds, and utility functions
- `src/lib/__tests__/cascadia-panel-data.test.ts` - 11 test cases for metadata completeness and correctness

## Decisions Made
- Buttons (MIDI/CV buttons, Push Gate) mapped to 'switch' type since they are physical toggle/momentary controls
- Selector knobs (VCO A/B Octave, VCF Mode) mapped to 'switch' type since they are discrete position selectors
- Jack signal types derived from documentation context: audio for waveform/signal path, cv for pitch/voltage, gate for triggers, modulation for LFO/envelope destinations
- Mixuverter triple-output represented as 2 distinct SVG entries (out-a, out-b) matching typical panel element count
- Rate trimmers on LFO X/Y/Z grouped as single knob entry since they share a single panel region

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all 179 entries are fully populated with real data from module documentation.

## Next Phase Readiness
- CONTROL_METADATA and SECTION_BOUNDS ready for SVG panel component (Plan 02)
- CascadiaControlMeta interface ready for tooltip rendering and highlight logic
- Signal type classification ready for cable rendering color coding

---
*Phase: 13-cascadia-panel-visualizer*
*Completed: 2026-04-04*
