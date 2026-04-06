---
phase: 14-learner-state-foundation
plan: 03
subsystem: resume-bar
tags: [react, zustand, client-component, resume-bar, learner-state]

requires:
  - phase: 14-learner-state-foundation
    plan: 01
    provides: Zustand store, useHydrated hook, mergeCompletions, computeNextSession
provides:
  - ResumeBar client component with three state variants
  - Server-side vault completion fetching and serialization
  - Integrated resume bar on instrument home page
affects: [instrument-overview, instrument-page]

tech-stack:
  added: []
  patterns: [server-to-client Set serialization via array, conditional rendering with hydration guard]

key-files:
  created:
    - src/components/resume-bar.tsx
    - src/components/resume-bar.test.tsx
  modified:
    - src/app/instruments/[slug]/page.tsx
    - src/components/instrument-overview.tsx

key-decisions:
  - "ResumeBar replaces HeroCard on instrument overview — smarter session recommendation based on actual progress"
  - "Vault completions serialized as number[] across server/client boundary since Sets are not serializable"
  - "Demo mode handled through data flow, not component branching — synthetic vault data flows through same merge path"

duration: 4min
completed: 2026-04-05
---

# Phase 14 Plan 03: Resume Bar Summary

**ResumeBar component showing next recommended session based on merged vault+manual completions, with three state variants (continue, ready-to-start, all-complete) and 6 unit tests**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-06T08:39:21Z
- **Completed:** 2026-04-06T08:43:00Z
- **Tasks:** 3/4 (Task 4 is human-verify checkpoint)
- **Files modified:** 4

## Accomplishments
- ResumeBar client component with three rendering variants based on learner state
- Unit tests covering all variants, link targets, and hydration guard (6 tests passing)
- Server page fetches vault completions and serializes for client consumption
- InstrumentOverview updated to render ResumeBar instead of HeroCard
- Demo mode uses synthetic journey data through the same data flow

## Task Commits

Each task was committed atomically:

1. **Task 1: Create ResumeBar component** - `223106b` (feat)
2. **Task 2: Create ResumeBar unit tests** - `4071cca` (test)
3. **Task 3: Wire ResumeBar into instrument home page** - `c06f3a2` (feat)

## Files Created/Modified
- `src/components/resume-bar.tsx` - ResumeBar client component with three state variants
- `src/components/resume-bar.test.tsx` - 6 unit tests for all rendering variants and hydration guard
- `src/app/instruments/[slug]/page.tsx` - Server page fetching vault completions for resume bar
- `src/components/instrument-overview.tsx` - Replaced HeroCard with ResumeBar integration

## Decisions Made
- ResumeBar replaces HeroCard — provides smarter session recommendation based on actual progress state
- Vault completions serialized as number[] for server-to-client prop passing (Sets not serializable)
- Demo mode uses same data path with synthetic completions — no special branching in the component

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all functions are fully implemented with no placeholder data.

## Pending
- Task 4: Human verification of resume bar and completion toggle interaction

---
*Phase: 14-learner-state-foundation*
*Completed: 2026-04-05*
