# Phase 25 — Deferred Items (out-of-scope discoveries)

Items found during phase execution that are NOT caused by Phase 25 changes.
These are tracked here per the executor scope-boundary rule. Resolution
happens in a future cleanup pass, not as part of this phase.

---

## Pre-existing test failures (baseline at HEAD~5 of phase 25 — same set)

**Discovered:** 2026-04-16 (during plan 25-00 verification, re-confirmed during plan 25-01)
**Status:** Out of scope for phase 25 (does not touch any of these files)

`npm test -- --run` reports 18 failed tests across 6 files:

- `src/components/__tests__/session-detail.test.tsx`
- `src/components/__tests__/card-unification.test.tsx`
- `src/components/__tests__/instrument-overview.test.tsx` (or similar)
- `src/lib/markdown/__tests__/processor.test.ts` — `aria-hidden="true"` on heading anchors no longer added
- `src/components/__tests__/curriculum.test.tsx` (partial-recipe sessions)
- One additional file in the failure set

These failures pre-date phase 25 by at least 5 commits (verified by checking out
`HEAD~5 -- src/` during plan 25-00 and re-running vitest — same 18 failures).
Phase 25 work has not introduced any new failures, and the test counts confirm
this: plan 25-00 baseline 715 passed, plan 25-01 final 727 passed (+12, exactly
the new octatrack/cascade/panel-route tests that this phase added).

---

## Pre-existing validate-content failures (2 troubleshooting docs)

**Discovered:** 2026-04-16 during plan 25-01 Wave 1 exit gate
**Status:** Out of scope for phase 25 (these files predate phase 25 by many commits)

`npm run validate-content` reports 2 failures (131 files validated, 2 fail):

```
FAIL [InstrumentFileSchema]: instruments/evolver/troubleshooting.md
  type: Invalid enum value. Expected 'overview' | 'signal-flow' | 'basic-patch' | 'modules' | 'module', received 'troubleshooting'
  manufacturer: Required

FAIL [InstrumentFileSchema]: instruments/cascadia/troubleshooting.md
  type: Invalid enum value. Expected 'overview' | 'signal-flow' | 'basic-patch' | 'modules' | 'module', received 'troubleshooting'
  manufacturer: Required
```

**Cause:** The InstrumentFileSchema's `type` enum does not include `'troubleshooting'`,
but the troubleshooting docs (added during v1.2 Phase work) use `type: troubleshooting`.
Both files also lack a top-level `manufacturer` frontmatter field.

**Verification:** Confirmed pre-existing by checking out `HEAD~4 -- .` and re-running
`npm run validate-content` — same 2 failures. Phase 25 plan 25-01 did NOT modify
either file.

**Resolution path (future cleanup):**
1. Add `'troubleshooting'` to the `type` enum in `InstrumentFileSchema` in
   `src/lib/content/schemas.ts`
2. Add `manufacturer` field (or make it optional for troubleshooting docs)
3. Re-run validate-content to confirm 0 failures

NOT a phase 25 concern: phase 25 schema work intentionally only added
optional capability flags to `InstrumentConfigSchema` (a different schema),
not the `InstrumentFileSchema` enum.
