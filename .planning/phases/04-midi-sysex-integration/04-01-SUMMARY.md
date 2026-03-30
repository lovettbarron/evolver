---
phase: 04-midi-sysex-integration
plan: 01
subsystem: midi
tags: [sysex, midi, parser, encoder, evolver, parameter-map]

# Dependency graph
requires:
  - phase: 01-content-foundation
    provides: content schemas, Zod patterns
provides:
  - Complete 128-parameter map for Evolver program dumps
  - 64 sequencer step parameter definitions
  - SysEx pack/unpack pure functions (MS bit format)
  - ParsedPatch/SysexJson type system
  - Basic patch JSON sidecar as diff baseline
  - SysEx message constants and builders
affects: [04-02, 04-03, 04-04, 04-05]

# Tech tracking
tech-stack:
  added: []
  patterns: [pure-function-sysex-parsing, parameter-map-as-static-data, json-sidecar-convention]

key-files:
  created:
    - src/lib/midi/types.ts
    - src/lib/midi/parameters.ts
    - src/lib/midi/parser.ts
    - src/lib/midi/encoder.ts
    - src/lib/midi/sysex.ts
    - src/lib/midi/__tests__/parameters.test.ts
    - src/lib/midi/__tests__/parser.test.ts
    - src/lib/midi/__tests__/encoder.test.ts
    - src/content/instruments/evolver/basic-patch.sysex.json
  modified: []

key-decisions:
  - "All 128 program parameters sourced from DSI Manual pp.48-52 parameter number table"
  - "Filter envelope amount uses raw 0-198 range (maps to -99 to +99 in display)"
  - "Key Off/Transpose basic patch value = 13 (maps to -24 semitones per Anu Kirk)"
  - "Sequencer parameters generated programmatically (4 tracks x 16 steps, uniform 0-127 range)"

patterns-established:
  - "Pure function SysEx parsing: no side effects, fully unit-testable without hardware"
  - "Parameter map as static data array with Map-based key lookup for O(1) access"
  - "JSON sidecar convention: {slug}.sysex.json alongside .md files"
  - "TDD roundtrip testing: raw->parse->encode->raw identity verification"

requirements-completed: [MIDI-02]

# Metrics
duration: 6min
completed: 2026-03-30
---

# Phase 4 Plan 01: SysEx Data Layer Summary

**Complete Evolver parameter map (128 program + 64 sequencer), MS bit pack/unpack codec, and basic-patch JSON sidecar with 27 passing tests**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-30T07:54:10Z
- **Completed:** 2026-03-30T08:00:08Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- Built complete 128-parameter map from DSI manual with correct indices, keys, names, sections, and ranges
- Implemented lossless MS bit pack/unpack codec verified by roundtrip tests
- Created basic-patch JSON sidecar with all 128 parameter values as diff baseline
- 27 tests pass covering parameter validation, parser correctness, encoder roundtrip, and edge cases

## Task Commits

Each task was committed atomically:

1. **Task 1: Types, parameter map, SysEx constants, and parameter validation tests** - `f120559` (feat)
2. **Task 2: Parser and encoder with roundtrip tests** - `b5e0223` (feat)

## Files Created/Modified
- `src/lib/midi/types.ts` - ParameterDef, ParsedPatch, SysexJson types and PARAMETER_SECTIONS
- `src/lib/midi/parameters.ts` - Complete 128-parameter map + 64 sequencer steps + getParameterByKey
- `src/lib/midi/sysex.ts` - SysEx protocol constants, buildEditBufferDump, validateSysexMessage
- `src/lib/midi/parser.ts` - unpackMsBit and parseProgram pure functions
- `src/lib/midi/encoder.ts` - packMsBit and encodeProgram pure functions
- `src/lib/midi/__tests__/parameters.test.ts` - 13 tests validating parameter map integrity
- `src/lib/midi/__tests__/parser.test.ts` - 8 tests for unpacking and parsing
- `src/lib/midi/__tests__/encoder.test.ts` - 6 tests for packing and encoding with roundtrip
- `src/content/instruments/evolver/basic-patch.sysex.json` - Basic patch as structured JSON sidecar

## Decisions Made
- All 128 program parameters sourced from DSI Manual pp.48-52 parameter number table
- Filter envelope amount uses raw 0-198 range (maps to -99 to +99 in display layer)
- Key Off/Transpose basic patch value = 13 (maps to -24 semitones per Anu Kirk guide)
- Sequencer parameters generated programmatically since all 64 follow uniform pattern

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed encoder roundtrip test to use correct data flow direction**
- **Found during:** Task 2
- **Issue:** Original test created arbitrary packed data and expected packMsBit(unpackMsBit(x)) === x, but arbitrary packed bytes don't form valid roundtrip input because MS bit bytes must match their data bytes
- **Fix:** Changed test to start from raw bytes: unpackMsBit(packMsBit(raw)) === raw
- **Files modified:** src/lib/midi/__tests__/encoder.test.ts
- **Verification:** All 6 encoder tests pass
- **Committed in:** b5e0223

---

**Total deviations:** 1 auto-fixed (1 bug fix in test)
**Impact on plan:** Minimal -- test direction corrected, same coverage achieved.

## Issues Encountered
None beyond the test direction fix noted above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- SysEx data layer complete -- types, parameter map, codec, and constants ready for consumption
- Parser/encoder are pure functions ready for MIDI connection layer (Plan 02)
- Basic patch JSON sidecar ready as default Patch A in diff view (Plan 05)
- All 27 tests green, providing regression safety for future plans

---
*Phase: 04-midi-sysex-integration*
*Completed: 2026-03-30*
