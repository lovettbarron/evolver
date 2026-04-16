# Deferred Items — 260416-9hx

Pre-existing TypeScript errors observed during `npx tsc --noEmit` that are
OUT OF SCOPE for this plan (not caused by any Octatrack changes). Tracked
here per the executor's scope-boundary rule.

## Pre-existing `tsc` errors (unchanged by this plan)

- `src/app/__tests__/instrument-overview.test.tsx` — `vi` not imported
- `src/app/__tests__/routing.test.tsx` — `vi` not imported
- `src/components/__tests__/cascadia-panel.test.tsx` — `it.todo` used without `it` in scope
- `src/components/__tests__/evolver-panel.test.tsx` — `it.todo` used without `it` in scope
- `src/components/patch-detail.tsx:127` — `SignalType` includes `'gate'` but `CascadiaPanel.cables.signalType` excludes it
- `src/components/session-row.tsx:80` — `JSX` namespace missing (React 19 typing)
- `src/lib/__tests__/sessions.test.ts:8,9` — duplicate object keys in fixture
- `src/lib/content/__tests__/schemas.test.ts:194,221,280` — optional-property access without guard
- `src/lib/midi/__tests__/connection.test.ts:30,32,40` — unsafe `Navigator` cast

None of these reference the Octatrack panel code.

## Pre-existing vitest failures (verified on main BEFORE plan)

- `src/components/__tests__/session-detail.test.tsx` — 4 tests fail with
  `ReferenceError: IntersectionObserver is not defined` thrown from
  framer-motion's viewport observer. These tests fail on `main` prior to
  any Octatrack changes (verified by `git stash` + re-running). The
  failures are caused by the Cascadia/Evolver motion.svg now using
  `whileInView` (introduced in v1.3 Phase 22 per STATE.md) — the test
  environment needs an IntersectionObserver polyfill in vitest setup.
- Not caused by Task 3 integration edits. Octatrack paths are covered
  by `src/components/__tests__/octatrack-panel.test.tsx` (13/13 pass).
