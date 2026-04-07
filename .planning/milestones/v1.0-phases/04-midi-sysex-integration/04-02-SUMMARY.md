---
phase: 04-midi-sysex-integration
plan: 02
subsystem: content
tags: [zod, sysex, json-sidecar, gray-matter, tdd]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: "PatchSchema, content reader, validate-content script"
provides:
  - "Extended PatchSchema with optional source, capture_date, program_number fields"
  - "JSON sidecar discovery in listPatches"
  - "saveCapturedPatch writer for markdown + sidecar output"
  - "toSlug utility for kebab-case patch names"
affects: [04-midi-sysex-integration, 05-progress-challenges]

# Tech tracking
tech-stack:
  added: []
  patterns: [json-sidecar-discovery, captured-patch-writer, vault-first-file-writes]

key-files:
  created:
    - src/lib/content/writer.ts
    - src/lib/content/__tests__/writer.test.ts
    - src/lib/content/__tests__/reader-sysex.test.ts
  modified:
    - src/lib/content/schemas.ts
    - src/lib/content/reader.ts

key-decisions:
  - "SysEx fields are optional with passthrough() for full backward compatibility"
  - "Sidecar discovery uses fs.access try/catch to avoid throwing on missing files"
  - "Writer uses gray-matter stringify for consistent frontmatter formatting"

patterns-established:
  - "JSON sidecar pattern: {slug}.sysex.json alongside {slug}.md in same directory"
  - "File collision prevention: check fs.access before writing, throw on conflict"

requirements-completed: [MIDI-03]

# Metrics
duration: 2min
completed: 2026-03-30
---

# Phase 4 Plan 2: Content Data Layer for SysEx Patches Summary

**Extended PatchSchema with optional SysEx fields, JSON sidecar discovery in reader, and captured-patch writer with TDD coverage**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-30T07:54:15Z
- **Completed:** 2026-03-30T07:56:36Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Extended PatchSchema with 3 optional SysEx fields (source, capture_date, program_number) -- fully backward-compatible with 56 existing content files
- Added JSON sidecar discovery to listPatches -- returns parsed sysexData alongside patch markdown
- Created saveCapturedPatch writer that outputs markdown with frontmatter + .sysex.json sidecar
- 13 new tests (5 reader-sysex + 8 writer) all passing, 148 total tests green

## Task Commits

Each task was committed atomically:

1. **Task 1: Extend PatchSchema and content reader for JSON sidecars** - `1ba0519` (feat)
2. **Task 2: Content writer for captured patches** - `640bb85` (feat)

## Files Created/Modified
- `src/lib/content/schemas.ts` - Added optional source, capture_date, program_number to PatchSchema
- `src/lib/content/reader.ts` - Extended listPatches with .sysex.json sidecar discovery
- `src/lib/content/writer.ts` - New module: saveCapturedPatch and toSlug utilities
- `src/lib/content/__tests__/reader-sysex.test.ts` - 5 tests for schema compat and sidecar discovery
- `src/lib/content/__tests__/writer.test.ts` - 8 tests for writer output, frontmatter, collision

## Decisions Made
- SysEx fields are optional with passthrough() for full backward compatibility -- no changes needed to existing patches
- Sidecar discovery uses fs.access try/catch to avoid throwing on missing files
- Writer uses gray-matter stringify for consistent frontmatter formatting matching existing content

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Content data layer ready for MIDI capture pipeline (04-03, 04-04)
- saveCapturedPatch provides the write path for SysEx capture flow
- listPatches with sysexData enables patch detail views to show parameter data

## Self-Check: PASSED

All 5 created/modified files verified on disk. Both task commits (1ba0519, 640bb85) confirmed in git log.

---
*Phase: 04-midi-sysex-integration*
*Completed: 2026-03-30*
