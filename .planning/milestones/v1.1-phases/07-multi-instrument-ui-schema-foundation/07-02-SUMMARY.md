---
phase: 07-multi-instrument-ui-schema-foundation
plan: 02
subsystem: ui
tags: [next.js, react, navigation, instrument-switcher, landing-page, dynamic-routing]

# Dependency graph
requires:
  - phase: 07-01
    provides: InstrumentConfigSchema, discoverInstruments, loadInstrumentConfig, instrument.json files
provides:
  - Dynamic data-driven navigation with instrument switcher
  - Instrument selector landing page with cards
  - Capability-gated nav links (sysex conditional MIDI)
  - InstrumentCard component for instrument discovery
affects: [07-03, 08-instrument-data-migration]

# Tech tracking
tech-stack:
  added: []
  patterns: [server-side instrument discovery passed through layout to client nav, URL-based instrument context extraction]

key-files:
  created:
    - src/components/instrument-switcher.tsx
    - src/components/instrument-card.tsx
    - src/components/__tests__/nav.test.tsx
  modified:
    - src/app/layout.tsx
    - src/components/app-shell.tsx
    - src/components/nav.tsx
    - src/app/page.tsx
    - src/app/__tests__/home.test.tsx

key-decisions:
  - "Nav instrument context derived from URL pathname regex, not React state"
  - "Instrument prop shape simplified in AppShell before passing to Nav (slug/displayName/sysex only)"

patterns-established:
  - "URL-based instrument context: usePathname + regex /instruments/([^/]+) extracts current slug"
  - "Server-to-client instrument pipeline: layout.tsx discovers -> AppShell maps -> Nav renders"

requirements-completed: [MULTI-01, MULTI-02]

# Metrics
duration: 4min
completed: 2026-03-31
---

# Phase 07 Plan 02: Dynamic Nav and Instrument Selector Summary

**Data-driven navigation with instrument switcher dropdown and landing page instrument cards replacing hardcoded Evolver-only UI**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-31T06:10:05Z
- **Completed:** 2026-03-31T06:14:08Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments
- Navigation dynamically lists instruments from server-loaded configs with no hardcoded Evolver links
- Instrument switcher dropdown with keyboard navigation, accessibility attributes, and click-outside-to-close
- MIDI nav link conditionally hidden for instruments with sysex: false
- Landing page shows instrument cards with display name, tagline, session/patch counts for all discovered instruments
- 12 new unit tests (6 nav, 6 home) all passing

## Task Commits

Each task was committed atomically:

1. **Task 1: Layout + AppShell + Nav refactor with instrument switcher and nav unit test** - `79d83ca` + `6f5dff5` (feat)
2. **Task 2: Landing page instrument selector with cards and home test update** - `1208216` (feat)

## Files Created/Modified
- `src/app/layout.tsx` - Server-side instrument discovery and config loading passed to AppShell
- `src/components/app-shell.tsx` - Accepts instruments prop, maps to simplified shape for Nav
- `src/components/nav.tsx` - Dynamic sub-links based on URL slug, no hardcoded paths
- `src/components/instrument-switcher.tsx` - Accessible dropdown with keyboard nav and click-outside handling
- `src/components/instrument-card.tsx` - Card component with display name, tagline, stats, and explore CTA
- `src/app/page.tsx` - Instrument selector landing page replacing single-instrument hero
- `src/components/__tests__/nav.test.tsx` - Tests dynamic rendering, sysex gating, no hardcoded links
- `src/app/__tests__/home.test.tsx` - Tests instrument selector renders both instruments with counts

## Decisions Made
- Nav derives current instrument from URL pathname via regex rather than prop/state -- simpler data flow, works with direct navigation
- AppShell maps full InstrumentConfig to a minimal {slug, displayName, sysex} shape before passing to Nav -- keeps client component props lean and serializable

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Pre-existing build failure at static generation phase due to missing vault path on dev machine (ENOENT scandir /Users/andrew/song/instruments). TypeScript compilation and type checking pass. This is out of scope for this plan.
- Task 1 changes to layout/app-shell/nav/instrument-switcher were already committed in a prior partial execution attempt (79d83ca). The nav test was the only new file added in commit 6f5dff5.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Dynamic nav and landing page are fully functional for multi-instrument support
- Plan 03 (instrument overview page refactoring) can proceed -- InstrumentCard and switcher patterns are established
- HeroCard component preserved but no longer imported on landing page (moves to instrument overview in Plan 03)

---
*Phase: 07-multi-instrument-ui-schema-foundation*
*Completed: 2026-03-31*
