---
phase: 02-session-browser
plan: 01
subsystem: ui
tags: [nextjs, tailwind-v4, react, design-system, vitest, jsdom]

requires:
  - phase: 01-content-pipeline
    provides: Content reader API (listSessions, schemas, types), markdown processor, bundled content
provides:
  - Next.js 15 app with App Router, Tailwind v4 design system tokens
  - App shell (Nav + footer) wrapping all pages
  - groupByModule and getAdjacentSessions session helpers
  - SessionWithMeta and ModuleGroup type exports
  - Vitest configured for component testing (jsdom + React plugin)
  - Wave 0 test stubs for all downstream plans
affects: [02-02, 02-03, all-future-ui-plans]

tech-stack:
  added: [next@15, react@19, react-dom@19, tailwindcss@4, "@tailwindcss/postcss", postcss, lucide-react, clsx, "@testing-library/react", "@testing-library/jest-dom", "@vitejs/plugin-react@4", jsdom]
  patterns: [css-first-tailwind-v4-theme, server-component-default, client-component-for-interactivity, app-router-layout]

key-files:
  created: [src/app/globals.css, src/app/layout.tsx, src/app/page.tsx, src/components/app-shell.tsx, src/components/nav.tsx, src/lib/sessions.ts, src/lib/__tests__/sessions.test.ts, postcss.config.mjs, next.config.ts]
  modified: [package.json, tsconfig.json, vitest.config.ts]

key-decisions:
  - "@vitejs/plugin-react pinned to v4 (v6 requires vite 8, incompatible with vitest 3 which uses vite 7)"
  - "jsdom added as explicit dev dependency for vitest environment"
  - "vitest alias uses path.resolve(__dirname) for reliable module resolution"
  - "tsconfig switched from NodeNext to bundler moduleResolution for Next.js compatibility"

patterns-established:
  - "Tailwind v4 CSS-first @theme config with design tokens (bg, surface, text, muted, accent, param)"
  - "Server components by default, 'use client' only for interactive elements"
  - "App shell pattern: Nav (client) + main + footer (server)"
  - "Wave 0 test stubs: describe block with test.todo for future plans"

requirements-completed: [INST-01, SESS-01]

duration: 4min
completed: 2026-03-29
---

# Phase 02 Plan 01: Next.js Scaffold Summary

**Next.js 15 app with Tailwind v4 dark editorial design system, app shell (nav + footer), session grouping/adjacency helpers with 8 passing tests**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-29T21:07:03Z
- **Completed:** 2026-03-29T21:11:34Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Next.js 15 app scaffolded with Tailwind v4 CSS-first design system matching UI-SPEC tokens exactly
- App shell with client Nav (Home/Evolver/Sessions links with active state) and server footer with "About this method" link
- groupByModule and getAdjacentSessions helpers implemented with full TDD (8 tests passing)
- Vitest configured for component testing with jsdom + React plugin; 7 Wave 0 test stubs created for downstream plans

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Next.js + Tailwind v4, configure build tooling, create design system and app shell** - `a472398` (feat)
2. **Task 2 RED: Failing tests for session helpers** - `8a631b4` (test)
3. **Task 2 GREEN: Implement session helpers + Wave 0 stubs** - `67b7b40` (feat)

## Files Created/Modified
- `src/app/globals.css` - Tailwind v4 @theme tokens matching UI-SPEC (bg, surface, text, muted, accent, param) + prose styles
- `src/app/layout.tsx` - Root layout with Inter + JetBrains Mono fonts, AppShell wrapper
- `src/app/page.tsx` - Placeholder home page
- `src/components/app-shell.tsx` - Server component: Nav + main + footer layout
- `src/components/nav.tsx` - Client component: pathname-based active nav with touch-friendly 48px targets
- `src/lib/sessions.ts` - groupByModule and getAdjacentSessions pure helpers (no I/O)
- `src/lib/__tests__/sessions.test.ts` - 8 test cases for session helpers
- `postcss.config.mjs` - @tailwindcss/postcss plugin
- `next.config.ts` - Minimal Next.js config
- `vitest.config.ts` - Updated with React plugin, jsdom, absolute path alias
- `package.json` - Added dev/build/start scripts, Next.js + Tailwind + testing deps
- `tsconfig.json` - Switched to bundler resolution for Next.js compatibility

## Decisions Made
- Pinned @vitejs/plugin-react to v4 because v6 requires vite 8 (vitest 3 ships vite 7)
- Added jsdom as explicit dev dependency (vitest jsdom environment requires it)
- Used path.resolve(__dirname) in vitest alias for reliable module resolution
- Switched tsconfig from NodeNext to bundler moduleResolution (Next.js requirement)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] @vitejs/plugin-react version incompatibility**
- **Found during:** Task 2 (TDD RED phase)
- **Issue:** @vitejs/plugin-react@6 requires vite 8, but vitest 3 bundles vite 7, causing ERR_PACKAGE_PATH_NOT_EXPORTED
- **Fix:** Downgraded to @vitejs/plugin-react@4 which is compatible with vite 7
- **Files modified:** package.json, package-lock.json
- **Verification:** vitest runs successfully with React transform
- **Committed in:** 8a631b4

**2. [Rule 3 - Blocking] Missing jsdom dependency**
- **Found during:** Task 2 (TDD GREEN phase)
- **Issue:** vitest jsdom environment requires jsdom package, not included by default
- **Fix:** npm install -D jsdom
- **Files modified:** package.json, package-lock.json
- **Verification:** vitest runs with jsdom environment
- **Committed in:** 67b7b40

**3. [Rule 3 - Blocking] Vitest alias resolution failure**
- **Found during:** Task 2 (TDD GREEN phase)
- **Issue:** Relative path alias '@': './src' did not resolve in vitest
- **Fix:** Changed to path.resolve(__dirname, './src') for absolute resolution
- **Files modified:** vitest.config.ts
- **Verification:** All imports via @/ resolve correctly
- **Committed in:** 67b7b40

---

**Total deviations:** 3 auto-fixed (3 blocking)
**Impact on plan:** All fixes necessary for test infrastructure to function. No scope creep.

## Issues Encountered
- npm peer dependency conflict installing @vitejs/plugin-react alongside React 19 -- resolved with --legacy-peer-deps flag

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Next.js app builds and serves with design system ready
- Session helpers (groupByModule, getAdjacentSessions) available for session list and detail pages
- Test infrastructure ready for component tests in Plans 02 and 03
- Wave 0 test stubs in place for all downstream components

---
*Phase: 02-session-browser*
*Completed: 2026-03-29*
