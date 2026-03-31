---
phase: 08-cascadia-instrument-data
plan: 01
title: "Schema Extension + listModules Reader"
subsystem: content-infrastructure
tags: [schema, reader, modules, cascadia, zod]
dependency_graph:
  requires: [07-01]
  provides: [module-schema, listModules-reader]
  affects: [08-02, 08-03]
tech_stack:
  added: []
  patterns: [zod-enum-extension, glob-subdirectory-reader]
key_files:
  created:
    - src/lib/content/__tests__/__fixtures__/instruments/cascadia/modules/vco-a.md
    - src/lib/content/__tests__/__fixtures__/instruments/cascadia/modules/mixer.md
  modified:
    - src/lib/content/schemas.ts
    - src/lib/content/reader.ts
    - src/lib/content/__tests__/schemas.test.ts
    - src/lib/content/__tests__/reader.test.ts
decisions: []
metrics:
  duration: "3min"
  completed: "2026-03-31"
---

# Phase 8 Plan 01: Schema Extension + listModules Reader Summary

Extended InstrumentFileSchema with 'module' type and optional module-specific fields (category, control_count, jack_count, has_normals), added listModules() reader function for discovering module docs from instruments/{slug}/modules/ subdirectory.

## What Was Done

### Task 1: Extend InstrumentFileSchema and add listModules reader function
- Added 'module' to the InstrumentFileSchema type enum
- Added four optional fields: category (sound-source|shaper|modulator|utility), control_count, jack_count, has_normals
- Added listModules() exported function to reader.ts following the listSessions pattern
- Confirmed all 21 existing schema tests continue to pass

**Commit:** 4098eab

### Task 2: Add test fixtures and test cases
- Created two fixture files: vco-a.md (sound-source, 11 controls, 8 jacks) and mixer.md (utility, 5 controls, 6 jacks)
- Added 3 schema tests: valid module with fields, module without optionals, invalid category rejection
- Added 4 reader tests: discovery from modules/ subdirectory, frontmatter validation, empty directory handling, markdown content access
- Full test suite: 42/42 tests pass in schemas.test.ts + reader.test.ts

**Commit:** 3500b1b

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

- `npx vitest run` -- 314/314 tests pass (3 pre-existing PDF-related suite failures unrelated to this plan)
- `npx vitest run src/lib/content/__tests__/schemas.test.ts src/lib/content/__tests__/reader.test.ts` -- 42/42 pass
- listModules exported from reader.ts
- InstrumentFileSchema type enum includes 'module'
- Fixture files exist at expected paths

## Known Stubs

None.
