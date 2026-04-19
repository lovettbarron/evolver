---
phase: 31-just-friends-crow
plan: 02
subsystem: curriculum, panel
tags: [crow, monome, eurorack, panel-svg, lua, druid, asl, scripting, i2c]

requires:
  - phase: 31-just-friends-crow (plan 01)
    provides: Just Friends panel, sessions, and integration wiring patterns
provides:
  - Crow panel data (7 controls) and component (60x380 viewBox, 2HP)
  - Crow reference documentation (scripting API, ASL, input modes, i2c)
  - 3 standalone Crow sessions (Druid REPL, I/O scripts, ASL slopes)
  - Crow overview page with architecture, I/O reference, Druid setup
  - Full integration wiring (session-detail, panel page, module-panel-client, quick-ref)
affects: [31-03 i2c combined sessions]

tech-stack:
  added: []
  patterns: [2HP panel viewBox (60x380), simplified panel with no knobs/switches]

key-files:
  created:
    - references/crow-reference.md
    - src/lib/crow-panel-data.ts
    - src/lib/__tests__/crow-panel-data.test.ts
    - src/components/crow-panel.tsx
    - src/components/__tests__/crow-panel.test.tsx
    - sessions/crow/01-what-is-crow-usb-druid-repl.md
    - sessions/crow/02-input-output-scripts-read-respond.md
    - sessions/crow/03-asl-slopes-envelopes-lfos.md
    - src/content/sessions/crow/01-what-is-crow-usb-druid-repl.md
    - src/content/sessions/crow/02-input-output-scripts-read-respond.md
    - src/content/sessions/crow/03-asl-slopes-envelopes-lfos.md
    - src/content/modules/crow/overview.md
  modified:
    - modules/crow/overview.md
    - src/components/session-detail.tsx
    - src/app/modules/[slug]/panel/page.tsx
    - src/app/modules/[slug]/panel/module-panel-client.tsx
    - src/components/quick-ref-panel.tsx

key-decisions:
  - "Crow panel uses dark background (#1a1a1a) matching the physical black panel, unlike JF's light aluminum"
  - "Crow parseCrowPanelProps omits knob parsing entirely since Crow has no knobs -- simplified vs other parsers"
  - "Crow reference docs written from available documentation rather than scraping (monome.org blocks automated access)"

patterns-established:
  - "2HP panel pattern: 60x380 viewBox, single vertical column, no knobs or switches"
  - "Simplified panel parser: Crow omits knob/slider parsing when the instrument has none"

requirements-completed: [CURR-05, PANEL-06]

duration: 9min
completed: 2026-04-19
---

# Phase 31 Plan 02: Crow Standalone Module Summary

**2HP Crow panel (7 controls, smallest in project) with 3 standalone scripting sessions covering Druid REPL, I/O scripts, and ASL slopes/envelopes/LFOs**

## Performance

- **Duration:** 9 min
- **Started:** 2026-04-19T04:13:30Z
- **Completed:** 2026-04-19T04:22:44Z
- **Tasks:** 2
- **Files modified:** 21

## Accomplishments

- Crow reference documentation covering scripting API, ASL syntax, input modes, sequins, metro, and i2c Just Type protocol
- Interactive 2HP panel SVG (60x380 viewBox) with 2 input jacks, 4 output jacks, USB-C LED indicator, dark panel background
- 3 standalone sessions building scripting skills from beginner to intermediate: Druid REPL basics, input-to-output CV processing, and ASL envelopes/LFOs/sequences
- Overview page with architecture description, I/O reference table, Druid setup instructions, scripting quick reference, and i2c overview
- Full integration wiring: session-detail regex + parser, standalone panel page, module-panel-client conditional, quick-ref panel tab
- 15 tests passing (10 data + 5 component)

## Task Commits

1. **Task 1: Panel data + component + tests + integration wiring** - `20270c9` (feat)
2. **Task 2: Overview + 3 standalone sessions with triple-write** - `63f625c` (feat)

## Files Created/Modified

- `references/crow-reference.md` - Comprehensive Crow scripting reference (ASL, input modes, i2c)
- `src/lib/crow-panel-data.ts` - 7 control entries with positions for 60x380 viewBox
- `src/components/crow-panel.tsx` - React SVG panel component (dark panel, USB-C indicator)
- `src/lib/__tests__/crow-panel-data.test.ts` - 10 tests for panel data integrity
- `src/components/__tests__/crow-panel.test.tsx` - 5 tests for component rendering
- `src/components/session-detail.tsx` - CROW_PANEL_RE regex, parseCrowPanelProps, CrowPanel render branch
- `src/app/modules/[slug]/panel/page.tsx` - crow PANEL_CONFIG entry
- `src/app/modules/[slug]/panel/module-panel-client.tsx` - crow conditional render
- `src/components/quick-ref-panel.tsx` - crow panel tab
- `modules/crow/overview.md` - Architecture, I/O reference, Druid setup, scripting reference, i2c overview
- `sessions/crow/01-what-is-crow-usb-druid-repl.md` - Session 01: USB setup and Druid REPL
- `sessions/crow/02-input-output-scripts-read-respond.md` - Session 02: CV processing scripts
- `sessions/crow/03-asl-slopes-envelopes-lfos.md` - Session 03: ASL envelopes, LFOs, sequins

## Decisions Made

- Crow panel uses dark background (#1a1a1a) to match the physical black panel, unlike JF's light aluminum finish
- parseCrowPanelProps is simplified: no knob or slider parsing since Crow has none, only highlights and cables
- Reference docs compiled from available documentation rather than web scraping (monome.org blocks curl)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] ModularGrid photo download failed**
- **Found during:** Task 1 (panel data creation)
- **Issue:** ModularGrid blocks direct image downloads (returns HTML error page instead of JPEG)
- **Fix:** Proceeded without ModularGrid photo. Crow's layout is trivially simple (single vertical column of 7 elements) and well-documented. Panel positions hand-placed from documented specifications
- **Files modified:** None (no photo file created)
- **Verification:** All 15 tests pass, panel renders correctly at 2HP

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Minimal. Crow's 2HP panel has the simplest possible layout (single column of jacks). The photo would have confirmed what the documentation already describes.

## Issues Encountered

None beyond the ModularGrid download failure documented above.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None - all data sources are wired, all sessions have complete content.

## Next Phase Readiness

- Crow standalone module is complete: panel, sessions, overview, integration
- Plan 03 (i2c combined sessions) can now build on both JF (Plan 01) and Crow (this plan)
- Combined sessions will use both `data-just-friends-panel` and `data-crow-panel` markers

## Self-Check: PASSED

All 13 created files verified present. Both task commits (20270c9, 63f625c) confirmed in git log. 15 tests passing.

---
*Phase: 31-just-friends-crow*
*Completed: 2026-04-19*
