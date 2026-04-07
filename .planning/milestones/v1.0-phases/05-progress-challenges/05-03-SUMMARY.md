---
phase: 05-progress-challenges
plan: 03
subsystem: content
tags: [rehype-callouts, challenge, markdown, css, sessions, patches]

# Dependency graph
requires:
  - phase: 05-01
    provides: "PatchSchema with challenge_id field, ProgressData types"
provides:
  - "Challenge callout rendering in markdown processor"
  - "Challenge CSS styling (accent border + title)"
  - "Challenge callouts in sessions 27-30 with wikilinks to demo patches"
  - "challenge_id fields in 6 demo patches"
affects: [05-02, progress-display]

# Tech tracking
tech-stack:
  added: []
  patterns: ["rehype-callouts custom type configuration with SVG indicator"]

key-files:
  created:
    - src/lib/markdown/processor.test.ts
  modified:
    - src/lib/markdown/processor.ts
    - src/app/globals.css
    - src/content/sessions/evolver/27-recipes-bass.md
    - src/content/sessions/evolver/28-recipes-leads.md
    - src/content/sessions/evolver/29-recipes-pads.md
    - src/content/sessions/evolver/30-recipes-drums.md
    - src/content/patches/evolver/acid-bass.md
    - src/content/patches/evolver/fm-bass.md
    - src/content/patches/evolver/sub-bass.md
    - src/content/patches/evolver/fm-lead.md
    - src/content/patches/evolver/pwm-pad.md
    - src/content/patches/evolver/analog-kick.md

key-decisions:
  - "Lucide Target SVG inlined as challenge callout indicator icon"
  - "Challenge callout CSS uses accent color for both border and title text"

patterns-established:
  - "rehype-callouts custom type: pass callouts config object with title + SVG indicator"

requirements-completed: [CHAL-01, CHAL-02, CHAL-03, CHAL-04]

# Metrics
duration: 2min
completed: 2026-03-30
---

# Phase 5 Plan 3: Challenge Callouts and Content Summary

**rehype-callouts configured with [!challenge] type, CSS styling, unit test, challenge callouts in sessions 27-30 with wikilinks to 6 demo patches**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-30T13:45:53Z
- **Completed:** 2026-03-30T13:47:57Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments
- Configured rehype-callouts with custom challenge type using Lucide Target SVG icon
- Added CSS differentiation for challenge callouts (accent-colored border and title)
- Created unit test confirming data-callout="challenge" renders correctly in HTML output
- Added challenge callouts to sessions 27-30 with wikilinks to existing demo patches
- Added challenge_id to 6 demo patches for progress tracking

## Task Commits

Each task was committed atomically:

1. **Task 1: Configure rehype-callouts for challenge type, add CSS, and add processor unit test** - `095062b` (feat)
2. **Task 2: Add challenge callouts to sessions 27-30 and challenge_id to demo patches** - `572d74f` (feat)

## Files Created/Modified
- `src/lib/markdown/processor.ts` - Added challenge callout config to rehype-callouts
- `src/lib/markdown/processor.test.ts` - Unit test for challenge callout rendering
- `src/app/globals.css` - CSS for challenge callout styling
- `src/content/sessions/evolver/27-recipes-bass.md` - Added 2 challenge callouts (acid-bass, sub-bass)
- `src/content/sessions/evolver/28-recipes-leads.md` - Added 1 challenge callout (fm-lead)
- `src/content/sessions/evolver/29-recipes-pads.md` - Added 1 challenge callout (pwm-pad)
- `src/content/sessions/evolver/30-recipes-drums.md` - Added 1 challenge callout (analog-kick)
- `src/content/patches/evolver/acid-bass.md` - Added challenge_id: "27-1"
- `src/content/patches/evolver/sub-bass.md` - Added challenge_id: "27-2"
- `src/content/patches/evolver/fm-bass.md` - Added challenge_id: "27-3"
- `src/content/patches/evolver/fm-lead.md` - Added challenge_id: "28-1"
- `src/content/patches/evolver/pwm-pad.md` - Added challenge_id: "29-1"
- `src/content/patches/evolver/analog-kick.md` - Added challenge_id: "30-1"

## Decisions Made
- Lucide Target SVG inlined as challenge callout indicator icon (no external dependency)
- Challenge callout CSS uses accent color for both border and title text, matching the design system

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Challenge callout infrastructure complete for rendering in the browser
- Demo patches have challenge_id for progress counting in Plan 02
- All wikilinks resolve to existing patch files

---
*Phase: 05-progress-challenges*
*Completed: 2026-03-30*
