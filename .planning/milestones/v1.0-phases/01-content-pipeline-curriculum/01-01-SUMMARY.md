---
phase: 01-content-pipeline-curriculum
plan: 01
subsystem: content
tags: [zod, gray-matter, vitest, typescript, content-pipeline, validation]

# Dependency graph
requires: []
provides:
  - Zod schemas for Session, Patch, InstrumentFile content types
  - Dual-source content reader (vault path vs bundled src/content/)
  - Config system with demo-mode fallback
  - Instrument discovery from filesystem directories
  - validate-content CLI script
affects: [01-02, 01-03, 01-04, 01-05, 01-06, 02-01]

# Tech tracking
tech-stack:
  added: [zod, gray-matter, glob, vitest, tsx, typescript, unified, remark-parse, remark-gfm, remark-rehype, remark-frontmatter, remark-wiki-link, rehype-stringify, rehype-raw, rehype-callouts, rehype-highlight, rehype-slug, rehype-autolink-headings, mermaid]
  patterns: [dual-source-content-reader, zod-passthrough-schemas, tdd-red-green]

key-files:
  created:
    - package.json
    - tsconfig.json
    - vitest.config.ts
    - evolver.config.json
    - src/lib/config.ts
    - src/lib/content/schemas.ts
    - src/lib/content/types.ts
    - src/lib/content/reader.ts
    - scripts/validate-content.ts
    - src/lib/content/__tests__/schemas.test.ts
    - src/lib/content/__tests__/reader.test.ts
  modified: []

key-decisions:
  - "Zod v3 (not v4) used as v4 is beta; passthrough() on all schemas for Obsidian metadata tolerance"
  - "ConfigSchema co-located in schemas.ts to avoid circular imports between config.ts and schemas.ts"
  - "glob used for file discovery in reader and validate-content script"

patterns-established:
  - "Dual-source content reader: getContentRoot(config) returns vault path or bundled path"
  - "Schema validation at parse time: gray-matter extracts, Zod validates, typed result returned"
  - "Test fixtures in __fixtures__/ directories mirroring vault structure"

requirements-completed: [PIPE-01, PIPE-02, PIPE-03, INST-04]

# Metrics
duration: 3min
completed: 2026-03-29
---

# Phase 1 Plan 01: Project Scaffolding + Content Pipeline Core Summary

**Zod-validated content reader with dual-source vault/bundled switching, instrument discovery, and validate-content CLI script**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-29T11:57:58Z
- **Completed:** 2026-03-29T12:01:12Z
- **Tasks:** 3
- **Files modified:** 17

## Accomplishments
- Project scaffolded with TypeScript, Vitest, and full dependency set for remark/rehype content pipeline
- Three Zod schemas (Session, Patch, InstrumentFile) with passthrough for Obsidian metadata tolerance
- Content reader that switches between vault path and bundled content with identical typed output
- Instrument discovery from filesystem directories, session/patch listing with sorting
- validate-content CLI script that reports schema validation errors with file paths
- 22 passing tests covering all schemas, reader functions, and edge cases

## Task Commits

Each task was committed atomically:

1. **Task 1: Project scaffolding + Zod schemas + types** - `5abb29e` (feat)
2. **Task 2: Dual-source content reader + instrument discovery** - `481cc66` (feat)
3. **Task 3: Create validate-content script** - `b453aab` (feat)

## Files Created/Modified
- `package.json` - Project dependencies and scripts (gray-matter, zod, vitest, unified ecosystem)
- `tsconfig.json` - TypeScript strict mode, NodeNext module resolution
- `vitest.config.ts` - Test runner configuration with path aliases
- `evolver.config.json` - Config file for vault path (demo mode when absent)
- `src/lib/config.ts` - loadConfig() with demo-mode fallback
- `src/lib/content/schemas.ts` - SessionSchema, PatchSchema, InstrumentFileSchema, ConfigSchema
- `src/lib/content/types.ts` - Re-exported inferred types
- `src/lib/content/reader.ts` - readContentFile, discoverInstruments, listSessions, listPatches, listInstrumentFiles
- `scripts/validate-content.ts` - Content validation CLI with safeParse error reporting
- `src/lib/content/__tests__/schemas.test.ts` - 12 schema validation tests
- `src/lib/content/__tests__/reader.test.ts` - 10 reader function tests
- `src/lib/content/__tests__/__fixtures__/` - Test fixture markdown files

## Decisions Made
- Used Zod v3 (stable) rather than v4 (beta) -- passthrough() works as needed
- Co-located ConfigSchema in schemas.ts to avoid circular dependency between config.ts and content modules
- Used glob package for file discovery (consistent between reader.ts and validate-content.ts)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Content reader and schemas are ready for Plan 01-02 (markdown rendering pipeline)
- Plan 01-03 can add frontmatter to existing instrument files and validate with these schemas
- Plans 01-04 and 01-05 (curriculum writing) will use SessionSchema for validation
- Plan 01-06 can bundle content to src/content/ and run validate-content against it

## Self-Check: PASSED

All 11 created files verified present. All 3 task commits verified in git log.

---
*Phase: 01-content-pipeline-curriculum*
*Completed: 2026-03-29*
