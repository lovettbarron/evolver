---
phase: 32-progress-demo-cross-module-polish
plan: 02
subsystem: ui
tags: [next.js, react, routing, modules, progress-tracking]

requires:
  - phase: 31-just-friends-crow-integration
    provides: Module content pipeline (listSessions, loadModuleConfig, module.json configs)
provides:
  - Functional module overview page with progress bar and session list
  - Functional module session list page with prerequisite badges
  - Module session detail page with completion toggle and prerequisite banner
  - routePrefix prop on SessionListClient, PrevNextNav, PrerequisiteBanner, SessionDetail
affects: [32-03-PLAN, cross-module-references, module-navigation]

tech-stack:
  added: []
  patterns: [routePrefix prop for instrument/module route disambiguation]

key-files:
  created:
    - src/app/modules/[slug]/sessions/[session]/page.tsx
  modified:
    - src/app/modules/[slug]/page.tsx
    - src/app/modules/[slug]/sessions/page.tsx
    - src/components/session-list-client.tsx
    - src/components/prev-next-nav.tsx
    - src/components/prerequisite-banner.tsx
    - src/components/session-detail.tsx

key-decisions:
  - "Added routePrefix prop to shared components instead of duplicating them for module routes"

patterns-established:
  - "routePrefix='modules' passed from module pages to shared session components for correct URL generation"

requirements-completed: [PROG-01, PROG-02]

duration: 4min
completed: 2026-04-19
---

# Phase 32 Plan 02: Module Page Wiring Summary

**Functional module pages with real data: overview with progress bar, session list with prerequisite badges, and session detail with completion toggle**

## Performance

- **Duration:** 4 min
- **Started:** 2026-04-19T20:27:53Z
- **Completed:** 2026-04-19T20:32:01Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Module overview page shows session list with progress bar and completion count from vault or synthetic data
- Module sessions page renders full session list with prerequisite badges via SessionListClient
- Individual module session detail pages render content with completion toggle, prerequisite banner, and prev/next navigation
- Added routePrefix prop to 4 shared components (SessionListClient, PrevNextNav, PrerequisiteBanner, SessionDetail) so module pages generate /modules/ URLs instead of /instruments/

## Task Commits

Each task was committed atomically:

1. **Task 1: Wire module session list + overview pages** - `5bf53da` (feat)
2. **Task 2: Create module session detail page route** - `52d3674` (feat)

## Files Created/Modified
- `src/app/modules/[slug]/page.tsx` - Module overview with progress bar, session list, and reference PDFs
- `src/app/modules/[slug]/sessions/page.tsx` - Module session list with SessionListClient and routePrefix
- `src/app/modules/[slug]/sessions/[session]/page.tsx` - Module session detail with prerequisite banner and completion toggle
- `src/components/session-list-client.tsx` - Added routePrefix prop (default: 'instruments')
- `src/components/prev-next-nav.tsx` - Added routePrefix prop for prev/next links
- `src/components/prerequisite-banner.tsx` - Added routePrefix prop for prerequisite link
- `src/components/session-detail.tsx` - Added routePrefix prop, passes through to StickyHeader and PrevNextNav

## Decisions Made
- Added `routePrefix` prop (defaulting to `'instruments'`) to shared components rather than duplicating them for modules. This keeps backward compatibility with existing instrument pages while allowing module pages to pass `'modules'` for correct URL routing.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added routePrefix to PrevNextNav, PrerequisiteBanner, and SessionDetail**
- **Found during:** Task 1 (reading existing components)
- **Issue:** SessionListClient, PrevNextNav, PrerequisiteBanner, and SessionDetail all hardcoded `/instruments/` in their href generation. Module pages would generate broken links pointing to `/instruments/just-friends/sessions/...` instead of `/modules/just-friends/sessions/...`
- **Fix:** Added `routePrefix` prop (default: `'instruments'`) to all four components, used `/${routePrefix}/` in href templates
- **Files modified:** session-list-client.tsx, prev-next-nav.tsx, prerequisite-banner.tsx, session-detail.tsx
- **Verification:** Build passes, all existing tests pass (20/20)
- **Committed in:** 5bf53da (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 missing critical)
**Impact on plan:** Essential for correct routing. Without this fix, all module session links would 404. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all pages wire to real data sources.

## Next Phase Readiness
- All module pages functional, ready for cross-module references (Plan 03)
- routePrefix pattern established for any future route-aware shared components

## Self-Check: PASSED

All created files verified on disk. Both task commits (5bf53da, 52d3674) confirmed in git log.

---
*Phase: 32-progress-demo-cross-module-polish*
*Completed: 2026-04-19*
