---
phase: 17-content-pedagogy
plan: 01
subsystem: content
tags: [zod, next.js, content-pipeline, troubleshooting]

requires:
  - phase: 01-foundation
    provides: content reader pipeline (readContentFile, schemas, vault reader)
provides:
  - TroubleshootingSchema Zod schema for troubleshooting frontmatter validation
  - getTroubleshooting() reader function for loading troubleshooting content
  - /instruments/[slug]/troubleshooting route page
  - hasTroubleshooting prop on InstrumentOverview component
  - listInstrumentFiles excludes troubleshooting.md from results
affects: [17-content-pedagogy]

tech-stack:
  added: []
  patterns: [troubleshooting content type with separate schema, filtered from instrument file listing]

key-files:
  created:
    - src/app/instruments/[slug]/troubleshooting/page.tsx
    - src/lib/content/__tests__/__fixtures__/instruments/evolver/troubleshooting.md
  modified:
    - src/lib/content/schemas.ts
    - src/lib/content/reader.ts
    - src/lib/content/__tests__/reader.test.ts
    - src/components/instrument-overview.tsx
    - src/app/instruments/[slug]/page.tsx

key-decisions:
  - "TroubleshootingSchema uses z.literal('troubleshooting') to distinguish from InstrumentFileSchema types"
  - "listInstrumentFiles filters troubleshooting.md before parsing to prevent schema validation errors"
  - "getTroubleshooting returns null on any error (file missing, parse failure) for graceful degradation"

patterns-established:
  - "Content types with separate schemas: filter from general listing, provide dedicated reader function"

requirements-completed: [CONTENT-01]

duration: 12min
completed: 2026-04-06
---

# Phase 17 Plan 01: Troubleshooting Code Infrastructure Summary

**Zod schema, content reader, Next.js route, and instrument home card for troubleshooting guides**

## Performance

- **Duration:** 12 min
- **Started:** 2026-04-06T20:19:22Z
- **Completed:** 2026-04-06T20:31:22Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- TroubleshootingSchema validates frontmatter with type literal, instrument, and title fields
- getTroubleshooting() reader returns parsed content or null for missing instruments
- listInstrumentFiles filters out troubleshooting.md to prevent InstrumentFileSchema parse failures
- /instruments/[slug]/troubleshooting route renders markdown content with back-link and subtitle
- Instrument home page conditionally shows Troubleshooting Guide link via hasTroubleshooting prop

## Task Commits

Each task was committed atomically:

1. **Task 1: TroubleshootingSchema, getTroubleshooting, listInstrumentFiles fix (RED)** - `dc5f3dc` (test)
2. **Task 1: TroubleshootingSchema, getTroubleshooting, listInstrumentFiles fix (GREEN)** - `5736089` (feat)
3. **Task 2: Troubleshooting route page and instrument home card** - `0aabc60` (feat)

## Files Created/Modified
- `src/lib/content/schemas.ts` - Added TroubleshootingSchema and Troubleshooting type
- `src/lib/content/reader.ts` - Added getTroubleshooting(), filtered troubleshooting.md from listInstrumentFiles
- `src/lib/content/__tests__/reader.test.ts` - 6 new tests for schema, reader, and listing
- `src/lib/content/__tests__/__fixtures__/instruments/evolver/troubleshooting.md` - Test fixture
- `src/app/instruments/[slug]/troubleshooting/page.tsx` - Server component route page
- `src/components/instrument-overview.tsx` - Added hasTroubleshooting prop and link
- `src/app/instruments/[slug]/page.tsx` - Passes hasTroubleshooting to InstrumentOverview

## Decisions Made
- TroubleshootingSchema uses z.literal('troubleshooting') rather than adding to InstrumentFileSchema's type enum, keeping the schemas independent
- listInstrumentFiles filters troubleshooting.md pre-parse to avoid schema mismatch errors
- getTroubleshooting catches all errors and returns null for graceful degradation

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Used cascadia fixtures for listInstrumentFiles test instead of evolver**
- **Found during:** Task 1 (GREEN phase)
- **Issue:** Evolver fixtures include invalid.md (pre-existing test fixture for validation error testing) which causes listInstrumentFiles to throw ZodError unrelated to troubleshooting changes
- **Fix:** Used cascadia fixtures (which have clean instrument files) for the listInstrumentFiles test
- **Files modified:** src/lib/content/__tests__/reader.test.ts
- **Verification:** All 24 reader tests pass

---

**Total deviations:** 1 auto-fixed (1 bug workaround)
**Impact on plan:** Minor test fixture adjustment. No scope creep.

## Issues Encountered
None beyond the fixture issue documented above.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all code is fully wired with no placeholder data.

## Next Phase Readiness
- Code infrastructure complete: schema, reader, route, card all in place
- Ready for Plan 02 to create actual troubleshooting content (markdown files)
- The getTroubleshooting function will return null until content files are added

---
*Phase: 17-content-pedagogy*
*Completed: 2026-04-06*
