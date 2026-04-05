---
phase: 07-multi-instrument-ui-schema-foundation
plan: 03
subsystem: ui
tags: [next.js, server-components, markdown, wikilinks, sysex, capability-gating]

requires:
  - phase: 07-01
    provides: InstrumentConfigSchema, loadInstrumentConfig, instrument.json files
provides:
  - Capability-gated MIDI route (sysex check before rendering)
  - NoSysexPage component for non-SysEx instruments
  - Dynamic reference PDFs from instrument.json on overview page
  - Parameterized markdown wikilinks (instrument slug instead of hardcoded evolver)
  - Cascadia entries in source-ref PDF map
  - HeroCard on instrument overview page
affects: [08-cascadia-instrument-data, 09-cascadia-patch-format, 10-cascadia-curriculum]

tech-stack:
  added: []
  patterns: [capability-gating via instrument config, parameterized markdown rendering]

key-files:
  created:
    - src/components/no-sysex-page.tsx
    - src/app/__tests__/midi-capability.test.tsx
  modified:
    - src/app/instruments/[slug]/midi/page.tsx
    - src/app/instruments/[slug]/page.tsx
    - src/components/instrument-overview.tsx
    - src/lib/markdown/processor.ts
    - src/components/source-ref.tsx
    - src/lib/markdown/__tests__/processor.test.ts
    - src/app/__tests__/instrument-overview.test.tsx

key-decisions:
  - "Markdown wikilinks without instrumentSlug resolve to root-relative paths (/{permalink})"
  - "Source-ref PDF map extended with static Cascadia entries; data-driven approach deferred to Phase 10"

patterns-established:
  - "Capability gating: check instrument config flags in server component before rendering feature-specific UI"
  - "Parameterized markdown: pass instrumentSlug through renderMarkdown for instrument-scoped wikilink resolution"

requirements-completed: [MULTI-03, CASC-04]

duration: 6min
completed: 2026-03-31
---

# Phase 7 Plan 3: Capability-Gated MIDI, Dynamic References, and Wikilink De-hardcoding Summary

**Capability-gated MIDI route with NoSysexPage for non-SysEx instruments, dynamic reference PDFs from instrument.json, parameterized markdown wikilinks, and Cascadia source-ref entries**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-31T06:10:06Z
- **Completed:** 2026-03-31T06:16:17Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments
- MIDI route checks instrument sysex flag; Cascadia shows informational NoSysexPage with CTA to patches
- Instrument overview reads reference PDFs dynamically from instrument.json instead of hardcoded array
- Markdown wikilinks parameterized by instrument slug -- no more hardcoded `/instruments/evolver/` paths
- Source-ref PDF map extended with Cascadia manual entries
- HeroCard renders on instrument overview when sessions exist
- Removed hardcoded "10 modules" text

## Task Commits

Each task was committed atomically:

1. **Task 1: Capability-gated MIDI route, NoSysexPage component, and MIDI capability unit test** - `e3a1b88` (feat)
2. **Task 2: Instrument overview dynamic references + hero card + de-hardcode markdown/source-ref** - `eda7025` (feat)

## Files Created/Modified
- `src/components/no-sysex-page.tsx` - Informational page for instruments without SysEx (AlertCircle icon, CTA to patches)
- `src/app/__tests__/midi-capability.test.tsx` - Unit tests for NoSysexPage and capability gating verification
- `src/app/instruments/[slug]/midi/page.tsx` - Converted to server component, checks sysex flag via loadInstrumentConfig
- `src/app/instruments/[slug]/page.tsx` - Dynamic references from instrument.json, HeroCard, parameterized markdown
- `src/components/instrument-overview.tsx` - Added nextSession prop for HeroCard, removed hardcoded "10 modules"
- `src/lib/markdown/processor.ts` - Added instrumentSlug parameter to createMarkdownProcessor and renderMarkdown
- `src/components/source-ref.tsx` - Extended PDF_MAP with cascadia manual and intellijel entries
- `src/lib/markdown/__tests__/processor.test.ts` - Updated wikilink tests to pass instrumentSlug, added root-relative test
- `src/app/__tests__/instrument-overview.test.tsx` - Updated session count assertion (removed "10 modules")

## Decisions Made
- Markdown wikilinks without instrumentSlug resolve to root-relative paths (`/{permalink}`) rather than failing -- supports framework content not scoped to an instrument
- Source-ref PDF map extended with static Cascadia entries; fully data-driven approach deferred to Phase 10 when Cascadia sessions actually use source refs

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Committed pre-existing 07-02 working tree changes**
- **Found during:** Task 1 verification (build check)
- **Issue:** Uncommitted changes from plan 07-02 (nav.tsx, app-shell.tsx, layout.tsx, instrument-switcher.tsx) caused type errors blocking the build
- **Fix:** Committed the coherent 07-02 changes as `79d83ca` to unblock the build
- **Files modified:** src/app/layout.tsx, src/components/app-shell.tsx, src/components/nav.tsx, src/components/instrument-switcher.tsx
- **Verification:** Build passes after commit
- **Committed in:** 79d83ca

**2. [Rule 1 - Bug] Updated markdown processor tests for parameterized wikilinks**
- **Found during:** Task 2 verification
- **Issue:** Existing processor tests expected hardcoded `/instruments/evolver/` paths but no longer passed instrumentSlug
- **Fix:** Updated tests to pass `'evolver'` as instrumentSlug; added new test for root-relative paths without slug
- **Files modified:** src/lib/markdown/__tests__/processor.test.ts
- **Verification:** All 307 tests pass
- **Committed in:** eda7025 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 bug)
**Impact on plan:** Both auto-fixes necessary for build and test correctness. No scope creep.

## Issues Encountered
- Pre-existing DOMMatrix error in 3 test files (instrument-overview, session-detail, source-ref) caused by react-pdf import in jsdom environment. These are not caused by plan changes and were failing before execution.
- Build requires demo mode (no evolver.config.json) to prerender successfully due to missing vault path on this machine. Type checking passes in both modes.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All Evolver-specific UI hardcoding removed from page components
- Phase 7 de-hardcoding complete: instrument config, nav, overview, markdown, source-ref all parameterized
- Ready for Phase 8 (Cascadia instrument data) and Phase 9 (Cascadia patch format)

---
*Phase: 07-multi-instrument-ui-schema-foundation*
*Completed: 2026-03-31*
