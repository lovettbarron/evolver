---
phase: 17-content-pedagogy
plan: 02
subsystem: content
tags: [troubleshooting, markdown, evolver, cascadia]

requires:
  - phase: 17-content-pedagogy (plan 01)
    provides: TroubleshootingSchema, content reader, route page, instrument home card
provides:
  - Evolver troubleshooting guide with 4 symptom sections and 20 checklist items
  - Cascadia troubleshooting guide with 4 symptom sections and 20 checklist items
affects: []

tech-stack:
  added: []
  patterns: [symptom-based H2 sections with checkbox checklist items containing specific parameter values]

key-files:
  created:
    - src/content/instruments/evolver/troubleshooting.md
    - src/content/instruments/cascadia/troubleshooting.md
  modified: []

key-decisions:
  - "5 items per section (upper bound of 3-5 spec) for thorough coverage"
  - "Evolver guide references parameter names from manual; Cascadia guide emphasizes normalled connections and patch point behavior"

patterns-established:
  - "Troubleshooting guide format: frontmatter with type/instrument/title, 4 H2 symptom sections, 3-5 checkbox items per section with specific values"

requirements-completed: [CONTENT-01]

duration: 5min
completed: 2026-04-07
---

# Phase 17, Plan 02: Troubleshooting Guide Content Summary

**Evolver and Cascadia troubleshooting guides with 4 symptom-based sections each containing 5 checkbox items with specific parameter names and values**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-07T06:30:00Z
- **Completed:** 2026-04-07T06:35:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Evolver guide covers No Audio Output, Filter Sounds Wrong, Modulation Not Working, and MIDI/SysEx Issues with Evolver-specific parameter names and values
- Cascadia guide covers No Audio Output, No Output from Patch Point, Unexpected Sound Behavior, and Modulation Routing Issues tailored to semi-modular architecture
- Both files validate against TroubleshootingSchema (type, instrument, title frontmatter)
- Both pass automated verification: 4 sections, 20 checkboxes each, correct frontmatter

## Task Commits

Each task was committed atomically:

1. **Task 1: Evolver troubleshooting guide** - `23a0b80` (content)
2. **Task 2: Cascadia troubleshooting guide** - `ea325d5` (content)

## Files Created/Modified
- `src/content/instruments/evolver/troubleshooting.md` - 4-section troubleshooting checklist for Evolver (analog/digital hybrid focus)
- `src/content/instruments/cascadia/troubleshooting.md` - 4-section troubleshooting checklist for Cascadia (semi-modular/normalling focus)

## Decisions Made
- Used 5 items per section consistently for thorough coverage across all symptom categories
- Cascadia sections emphasize normalled connections and patch point behavior (cables breaking normalled paths) per its semi-modular architecture
- Evolver sections reference specific parameter numbers and modes (2-pole/4-pole, Key Sync, Local Control) per the DSI architecture

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Both troubleshooting guides are live and parseable by the content reader built in plan 01
- Phase 17 content is now complete (troubleshooting + partial recipes)

---
*Phase: 17-content-pedagogy*
*Completed: 2026-04-07*
