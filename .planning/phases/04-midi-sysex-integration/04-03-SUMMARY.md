---
phase: 04-midi-sysex-integration
plan: 03
subsystem: midi, ui
tags: [web-midi, sysex, react, next.js, tailwind]

# Dependency graph
requires:
  - phase: 04-01
    provides: SysEx parser/encoder, types, parameter map, sysex constants
  - phase: 04-02
    provides: Content writer (saveCapturedPatch), reader (listPatches with sysex sidecar)
provides:
  - MIDI connection manager with Web MIDI API wrapping (requestMidiAccess, findEvolverPorts, requestEditBuffer, sendEditBuffer)
  - Complete MIDI workspace page at /instruments/evolver/midi
  - Connection section with auto-detect and manual device selection
  - Capture section with one-click SysEx dump and listen mode
  - Send section with patch selector and confirmation dialog
  - API routes for patch save and list
  - Nav link for MIDI workspace
affects: [04-04]

# Tech tracking
tech-stack:
  added: [Web MIDI API]
  patterns: [client-side MIDI connection management, SysEx buffering with timeout, confirmation dialog pattern]

key-files:
  created:
    - src/lib/midi/connection.ts
    - src/lib/midi/__tests__/connection.test.ts
    - src/components/midi-page.tsx
    - src/components/midi-connection.tsx
    - src/components/capture-panel.tsx
    - src/components/patch-save-form.tsx
    - src/components/send-panel.tsx
    - src/components/confirm-dialog.tsx
    - src/components/status-indicator.tsx
    - src/app/instruments/[slug]/midi/page.tsx
    - src/app/api/patches/save/route.ts
    - src/app/api/patches/list/route.ts
  modified:
    - src/components/nav.tsx
    - src/lib/content/writer.ts

key-decisions:
  - "Connection manager uses event-driven SysEx buffering with 3s timeout for edit buffer requests"
  - "Auto-detect prefers ports with 'evolver' in name, falls back to first available"
  - "Capture and Listen are separate modes: Capture sends request, Listen passively receives"
  - "Send flow uses confirmation dialog to prevent accidental edit buffer overwrites"
  - "API routes wrap content reader/writer for client-side fetch from MIDI page"

patterns-established:
  - "MIDI connection lifting: child components receive input/output via props, connection state managed in parent"
  - "Confirmation dialog pattern: reusable modal with focus trap, escape dismiss, backdrop click"
  - "Client-only page pattern: 'use client' workspace page with server API routes for data persistence"

requirements-completed: [MIDI-01, MIDI-04]

# Metrics
duration: 15min
completed: 2026-03-30
---

# Phase 4 Plan 03: MIDI Workspace Summary

**Web MIDI connection manager with auto-detect and full MIDI workspace page featuring capture, save, and send-to-device flows**

## Performance

- **Duration:** ~15 min (across multiple sessions including human verification)
- **Started:** 2026-03-30
- **Completed:** 2026-03-30
- **Tasks:** 3 (2 auto + 1 human-verify checkpoint)
- **Files modified:** 14

## Accomplishments
- MIDI connection manager wraps Web MIDI API with auto-detection, SysEx buffering, and 3s timeout
- Complete MIDI workspace page with Connection, Capture, and Send sections following UI-SPEC design contract
- 6 unit tests for connection manager covering support detection, port finding, SysEx request/receive, timeout, and send
- API routes for saving captured patches and listing patches with SysEx data
- Human-verified: layout, styling, connection states, and responsive behavior all correct

## Task Commits

Each task was committed atomically:

1. **Task 1: MIDI connection manager** - `91c2624` (feat) - TDD with 6 passing tests
2. **Task 2: MIDI workspace page** - `291f9d2` (feat) - 11 UI components + 2 API routes + nav link
3. **Task 3: Visual verification** - checkpoint approved, no code changes

## Files Created/Modified
- `src/lib/midi/connection.ts` - MIDI connection manager (requestMidiAccess, findEvolverPorts, requestEditBuffer, sendEditBuffer)
- `src/lib/midi/__tests__/connection.test.ts` - 6 tests with mocked Web MIDI API
- `src/components/midi-page.tsx` - Top-level MIDI workspace ('use client')
- `src/components/midi-connection.tsx` - Auto-detect connection with device selector
- `src/components/capture-panel.tsx` - Capture button + listen mode toggle
- `src/components/patch-save-form.tsx` - Name/type/tags form with parameter preview
- `src/components/send-panel.tsx` - Patch selector + send with confirmation
- `src/components/confirm-dialog.tsx` - Reusable modal with focus trap and a11y
- `src/components/status-indicator.tsx` - Connection status dot with aria-live
- `src/app/instruments/[slug]/midi/page.tsx` - Route page with StickyHeader
- `src/app/api/patches/save/route.ts` - POST endpoint for saving captured patches
- `src/app/api/patches/list/route.ts` - GET endpoint for listing patches with SysEx data
- `src/components/nav.tsx` - Added MIDI link to navigation
- `src/lib/content/writer.ts` - Minor fix for writer compatibility

## Decisions Made
- Connection manager uses event-driven SysEx buffering with 3s timeout for edit buffer requests
- Auto-detect prefers ports with "evolver" in name, falls back to first available
- Capture and Listen are separate modes: Capture sends request, Listen passively receives
- Send flow uses confirmation dialog to prevent accidental edit buffer overwrites
- API routes wrap content reader/writer for client-side fetch from MIDI page

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Dev server port was 3001 instead of default 3000 during human verification -- user adjusted URL accordingly, no code change needed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- MIDI connection and workspace UI complete
- Plan 04 (patch library integration) can proceed -- all MIDI capture/send infrastructure in place
- Requires physical Evolver connected via USB-MIDI for end-to-end testing

---
*Phase: 04-midi-sysex-integration*
*Completed: 2026-03-30*

## Self-Check: PASSED

- FOUND: src/lib/midi/connection.ts
- FOUND: src/components/midi-page.tsx
- FOUND: src/app/instruments/[slug]/midi/page.tsx
- FOUND: commit 91c2624 (Task 1)
- FOUND: commit 291f9d2 (Task 2)
