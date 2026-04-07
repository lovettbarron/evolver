---
phase: 02-session-browser
plan: 03
subsystem: ui
tags: [next.js, react, tailwind, hero-card, instrument-overview, about-page]

# Dependency graph
requires:
  - phase: 02-session-browser (plan 01)
    provides: Next.js scaffold, content reader, session helpers, AppShell with footer
provides:
  - Landing page with next-session hero card and browse link
  - Instrument overview page at /instruments/[slug] with signal flow and curriculum CTA
  - Framework about page at /about with rendered markdown docs
affects: [02-session-browser remaining polish, phase 05 progress tracking for hero card]

# Tech tracking
tech-stack:
  added: ["@testing-library/dom (dev)"]
  patterns: [hero-card mission-brief pattern, async params pattern for Next.js 15, framework fallback file reading]

key-files:
  created:
    - src/components/hero-card.tsx
    - src/components/instrument-overview.tsx
    - src/app/instruments/[slug]/page.tsx
    - src/app/about/page.tsx
  modified:
    - src/app/page.tsx
    - src/app/__tests__/home.test.tsx
    - src/app/__tests__/instrument-overview.test.tsx
    - src/app/__tests__/about.test.tsx
    - src/lib/content/reader.ts
    - src/lib/config.ts
    - src/components/session-detail.tsx

key-decisions:
  - "Objective extracted from first non-heading content line (session schema has no explicit objective field)"
  - "About page reads framework/ from project root as fallback when src/content/framework/ not bundled"
  - "session-detail.tsx marked 'use client' to fix Next.js 15 dynamic import with ssr:false in server component"

patterns-established:
  - "Hero card mission-brief: module name, title, objective, duration, accent CTA"
  - "Instrument overview: prose-rendered markdown with signal flow section and curriculum entry CTA"
  - "Framework about page: dual-source fallback (bundled then root) for framework docs"

requirements-completed: [SESS-03, INST-02, INST-03]

# Metrics
duration: 4min
completed: 2026-03-29
---

# Phase 02 Plan 03: Landing, Instrument Overview, and About Pages Summary

**Landing page with ADHD-optimized hero card defaulting to Session 1, instrument overview at /instruments/[slug] with signal flow and Start Curriculum CTA, and About This Method page rendering framework docs**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-29T21:13:48Z
- **Completed:** 2026-03-29T21:18:02Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments
- Landing page hero card shows module name, session title, extracted objective, duration, and prominent "Start Session" CTA
- Instrument overview page renders architecture, signal flow, basic patch reference link, and "Start Curriculum" button
- About page renders both framework README and ADHD design principles from markdown
- 18 new component tests (6 HeroCard, 8 InstrumentOverview, 4 About) all passing

## Task Commits

Each task was committed atomically:

1. **Task 1: Landing page with next-session hero card** - `c4b6c36` (feat)
2. **Task 2: Instrument overview page and framework about page** - `5c4d2fe` (feat)

## Files Created/Modified
- `src/components/hero-card.tsx` - Client component: mission-brief card with accent CTA
- `src/components/instrument-overview.tsx` - Server component: instrument detail with signal flow and curriculum CTA
- `src/app/page.tsx` - Landing page with session-aware hero card and empty state
- `src/app/instruments/[slug]/page.tsx` - Instrument overview route with async params
- `src/app/about/page.tsx` - Framework methodology page with fallback file reading
- `src/app/__tests__/home.test.tsx` - 6 HeroCard component tests
- `src/app/__tests__/instrument-overview.test.tsx` - 8 InstrumentOverview tests
- `src/app/__tests__/about.test.tsx` - 4 About page layout tests
- `src/lib/content/reader.ts` - Fixed .js import extensions for bundler compatibility
- `src/lib/config.ts` - Fixed .js import extensions for bundler compatibility
- `src/components/session-detail.tsx` - Added 'use client' for dynamic import compatibility

## Decisions Made
- Objective extracted from first non-heading content line since Session schema has no explicit objective field; truncated to 120 chars
- About page uses dual-source fallback: tries src/content/framework/ first, then framework/ at project root
- session-detail.tsx required 'use client' directive to fix Next.js 15 restriction on dynamic() with ssr:false in server components

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed @testing-library/dom**
- **Found during:** Task 1 (Home page tests)
- **Issue:** @testing-library/react requires @testing-library/dom peer dependency, not installed
- **Fix:** `npm install --save-dev @testing-library/dom`
- **Files modified:** package.json, package-lock.json
- **Verification:** Tests run successfully
- **Committed in:** c4b6c36

**2. [Rule 1 - Bug] Fixed .js import extensions in reader.ts and config.ts**
- **Found during:** Task 1 (Build verification)
- **Issue:** Next.js bundler moduleResolution does not resolve .js extensions for .ts files
- **Fix:** Removed .js extensions from imports in reader.ts and config.ts
- **Files modified:** src/lib/content/reader.ts, src/lib/config.ts
- **Verification:** npm run build succeeds
- **Committed in:** c4b6c36

**3. [Rule 3 - Blocking] Fixed session-detail.tsx server component dynamic import**
- **Found during:** Task 2 (Build verification)
- **Issue:** session-detail.tsx used dynamic() with ssr:false in a server component, which Next.js 15 disallows
- **Fix:** Added 'use client' directive to session-detail.tsx
- **Files modified:** src/components/session-detail.tsx
- **Verification:** npm run build compiles successfully
- **Committed in:** 5c4d2fe

---

**Total deviations:** 3 auto-fixed (1 bug, 2 blocking)
**Impact on plan:** All auto-fixes necessary for build correctness. No scope creep.

## Issues Encountered
None beyond the auto-fixed deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All three key pages (landing, instrument overview, about) are complete
- Hero card defaults to Session 1 -- Phase 5 will add real progress tracking
- 224 total tests passing across 12 test files
- Build compiles successfully

---
*Phase: 02-session-browser*
*Completed: 2026-03-29*
