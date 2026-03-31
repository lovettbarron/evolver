---
phase: 07-multi-instrument-ui-schema-foundation
plan: 01
subsystem: content
tags: [zod, schema, multi-instrument, cascadia, json]

requires:
  - phase: 06
    provides: content reader and schema infrastructure
provides:
  - InstrumentConfigSchema and InstrumentConfig type for validating instrument.json
  - loadInstrumentConfig() reader function
  - PatchSchema cable_routing and knob_settings stub fields for CV instruments
  - Evolver instrument.json with sysex/patch_memory capabilities
  - Cascadia instrument.json with sysex false capabilities
  - Cascadia overview.md stub
affects: [07-02, 07-03, 08, 09]

tech-stack:
  added: []
  patterns: [instrument.json capability files, loadInstrumentConfig reader pattern]

key-files:
  created:
    - src/content/instruments/evolver/instrument.json
    - src/content/instruments/cascadia/instrument.json
    - src/content/instruments/cascadia/overview.md
    - src/lib/content/__tests__/__fixtures__/instruments/evolver/instrument.json
    - src/lib/content/__tests__/__fixtures__/instruments/cascadia/instrument.json
    - src/lib/content/__tests__/__fixtures__/instruments/cascadia/overview.md
  modified:
    - src/lib/content/schemas.ts
    - src/lib/content/reader.ts
    - src/lib/content/__tests__/schemas.test.ts
    - src/lib/content/__tests__/reader.test.ts

key-decisions:
  - "InstrumentConfigSchema uses .passthrough() for future-proofing unknown fields"
  - "PatchSchema stub fields use z.unknown().optional() for maximum flexibility until Phase 9 refinement"

patterns-established:
  - "instrument.json: per-instrument capability config validated by InstrumentConfigSchema"
  - "loadInstrumentConfig(slug, config): standard pattern for reading instrument metadata"

requirements-completed: [MULTI-04, CASC-04]

duration: 3min
completed: 2026-03-31
---

# Phase 7 Plan 01: Instrument Config Schema and Data Foundation Summary

**InstrumentConfigSchema with Zod validation, loadInstrumentConfig reader, Evolver/Cascadia instrument.json capability files, and PatchSchema CV stub fields**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-31T06:04:58Z
- **Completed:** 2026-03-31T06:07:41Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- InstrumentConfigSchema validates instrument.json shape (display_name, tagline, manufacturer, sysex, patch_memory, reference_pdfs) with passthrough for future fields
- loadInstrumentConfig() reads and validates instrument.json for any instrument slug via content reader pattern
- PatchSchema accepts optional cable_routing and knob_settings stub fields without breaking existing Evolver patches
- Cascadia instrument directory created with valid instrument.json and overview.md stub
- Full TDD: 9 new schema tests + 4 new reader tests, all 295 existing tests still pass

## Task Commits

Each task was committed atomically:

1. **Task 1: InstrumentConfigSchema, PatchSchema stubs, and tests**
   - `b6ef485` (test: failing tests for InstrumentConfigSchema and PatchSchema stubs)
   - `2b110ef` (feat: InstrumentConfigSchema and PatchSchema CV stub fields)
2. **Task 2: loadInstrumentConfig reader, instrument.json files, Cascadia overview.md, and tests**
   - `710acac` (test: failing tests for loadInstrumentConfig and multi-instrument discovery)
   - `392ad19` (feat: loadInstrumentConfig, instrument.json files, and Cascadia overview)

## Files Created/Modified
- `src/lib/content/schemas.ts` - Added InstrumentConfigSchema, InstrumentConfig type, PatchSchema cable_routing/knob_settings stubs
- `src/lib/content/reader.ts` - Added loadInstrumentConfig() function
- `src/content/instruments/evolver/instrument.json` - Evolver capability config (sysex: true, patch_memory: true, 2 PDFs)
- `src/content/instruments/cascadia/instrument.json` - Cascadia capability config (sysex: false, patch_memory: false, 1 PDF)
- `src/content/instruments/cascadia/overview.md` - Minimal Cascadia overview for Phase 8
- `src/lib/content/__tests__/schemas.test.ts` - 9 new tests (5 InstrumentConfigSchema + 4 PatchSchema stubs)
- `src/lib/content/__tests__/reader.test.ts` - 4 new tests (3 loadInstrumentConfig + 1 discoverInstruments)
- `src/lib/content/__tests__/__fixtures__/instruments/*/instrument.json` - Test fixtures for both instruments
- `src/lib/content/__tests__/__fixtures__/instruments/cascadia/overview.md` - Test fixture

## Decisions Made
- InstrumentConfigSchema uses .passthrough() to allow unknown fields for future extensibility
- PatchSchema stub fields use z.unknown().optional() -- maximum flexibility until Phase 9 refines the cable_routing and knob_settings shape for Cascadia

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- InstrumentConfigSchema and loadInstrumentConfig() are ready for downstream plans (07-02 nav de-hardcoding, 07-03 landing page)
- discoverInstruments() now returns both 'cascadia' and 'evolver'
- Cascadia overview.md exists so instrument page will not 404 once routing is updated

## Self-Check: PASSED

All 11 files verified present. All 4 commit hashes verified in git log.

---
*Phase: 07-multi-instrument-ui-schema-foundation*
*Completed: 2026-03-31*
