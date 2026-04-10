---
phase: 20-layout-shell-navigation
plan: 03
subsystem: ui
tags: [nav, mobile, hamburger, accessibility, a11y, data-attribute, page-shell, responsive]

dependency_graph:
  requires:
    - phase: 20-01
      provides: "Restyled nav bar with active indicators, per-instrument CSS accent override"
    - phase: 20-02
      provides: "Footer component, NarrowShell/WideShell page containers"
  provides:
    - "Mobile hamburger menu with full accessibility (focus trap, Escape, aria)"
    - "data-instrument attribute on AppShell for per-instrument accent color"
    - "NarrowShell/WideShell adoption in key page routes"
  affects: [phase-21, phase-22, all instrument pages]

tech_stack:
  added: []
  patterns:
    - "Mobile menu with click-outside + Escape + route-change close"
    - "data-instrument attribute for CSS-only per-instrument theming"
    - "NarrowShell (720px) for reading pages, WideShell (1200px) for grid pages"

key-files:
  created:
    - src/components/__tests__/app-shell.test.tsx
  modified:
    - src/components/nav.tsx
    - src/components/app-shell.tsx
    - src/app/globals.css
    - src/components/__tests__/nav.test.tsx
    - src/app/about/page.tsx
    - src/app/instruments/[slug]/patches/page.tsx
    - src/app/instruments/[slug]/modules/page.tsx
    - src/components/session-detail.tsx
    - src/components/module-index.tsx

key-decisions:
  - "AppShell converted to client component for usePathname access (data-instrument)"
  - "Mobile menu uses slideDown keyframe with motion-safe prefix for reduced-motion"
  - "Hamburger button has 44x44px touch target per accessibility guidelines"

patterns-established:
  - "Mobile menu pattern: useState + click-outside + Escape + route-change close"
  - "Per-instrument theming: data-instrument attribute + CSS custom property override"
  - "Content width strategy: NarrowShell for reading, WideShell for browsing"

requirements-completed: [LAYOUT-02, LAYOUT-04]

duration: ~15min
completed: 2026-04-10
---

# Phase 20 Plan 03: Mobile Hamburger Menu, Data-Instrument Wiring, and Shell Adoption Summary

**Accessible mobile hamburger nav with focus trap/Escape/aria, per-instrument accent colors via data-attribute, and NarrowShell/WideShell adoption across key routes**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-04-10T20:45:00Z
- **Completed:** 2026-04-10T21:00:00Z
- **Tasks:** 4 (3 auto + 1 visual checkpoint)
- **Files modified:** 10

## Accomplishments
- Mobile hamburger menu with full accessibility: Escape close, click-outside dismiss, aria-expanded, focus return to toggle, prefers-reduced-motion support
- AppShell now sets data-instrument attribute from URL pathname, enabling CSS-only per-instrument accent colors (Cascadia gets warm teal)
- Five key page routes adopted NarrowShell/WideShell for differentiated content widths: session detail and about at 720px, patches/modules at 1200px
- Visual checkpoint passed: all 12 verification items approved by user

## Task Commits

Each task was committed atomically:

1. **Task 1: Add mobile hamburger menu to nav.tsx with accessibility** - `244610d` (feat)
2. **Task 2: Wire data-instrument attribute on AppShell** - `807ec79` (feat)
3. **Task 3: Adopt NarrowShell/WideShell in key page routes** - `3b9766a` (feat)
4. **Task 4: Visual verification checkpoint** - approved by user (no code commit)

## Files Created/Modified
- `src/components/nav.tsx` - Added mobile hamburger menu with Menu/X icons, click-outside/Escape handlers, aria attributes
- `src/components/app-shell.tsx` - Added 'use client', usePathname, data-instrument attribute on outer div
- `src/app/globals.css` - Added @keyframes slideDown for mobile menu animation
- `src/components/__tests__/nav.test.tsx` - Added tests for hamburger toggle, aria-expanded, mobile menu links
- `src/components/__tests__/app-shell.test.tsx` - New test file for data-instrument attribute behavior
- `src/app/about/page.tsx` - Replaced inline max-w wrapper with NarrowShell
- `src/app/instruments/[slug]/patches/page.tsx` - Replaced inline max-w wrapper with WideShell
- `src/app/instruments/[slug]/modules/page.tsx` - Replaced inline max-w wrapper with WideShell (empty state)
- `src/components/session-detail.tsx` - Replaced inline max-w wrapper with NarrowShell
- `src/components/module-index.tsx` - Replaced inline max-w wrapper with WideShell

## Decisions Made
- AppShell converted to client component ('use client') — simplest approach for usePathname access per RESEARCH Pitfall 3
- Mobile menu uses slideDown keyframe with motion-safe: prefix to respect prefers-reduced-motion
- Hamburger button sized at 44x44px for accessible touch targets
- Content width upgrade from 960px to 1200px for grid pages (intentional per D-06)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Known Stubs
None - all functionality is fully wired.

## Next Phase Readiness
- Phase 20 (Layout Shell & Navigation) is now complete
- All layout infrastructure ready for Phase 21 (Cards & Content Components)
- Per-instrument accent theming available for future phases to extend
- NarrowShell/WideShell pattern established for any new pages

## Self-Check: PASSED

- FOUND: 20-03-SUMMARY.md
- FOUND: commit 244610d (Task 1)
- FOUND: commit 807ec79 (Task 2)
- FOUND: commit 3b9766a (Task 3)

---
*Phase: 20-layout-shell-navigation*
*Completed: 2026-04-10*
