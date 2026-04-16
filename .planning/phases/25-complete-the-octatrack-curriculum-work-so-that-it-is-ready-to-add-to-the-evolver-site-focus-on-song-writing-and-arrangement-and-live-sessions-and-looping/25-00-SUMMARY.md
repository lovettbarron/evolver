---
phase: 25-complete-the-octatrack-curriculum-work-so-that-it-is-ready-to-add-to-the-evolver-site-focus-on-song-writing-and-arrangement-and-live-sessions-and-looping
plan: 00
subsystem: testing
tags: [vitest, wcag, oklch, octatrack, fixtures, contrast, triple-write]

requires:
  - phase: 24-instrument-color-identity
    provides: Phase 24 OKLCH palette (olive neutrals + Evolver blue + Cascadia steel)
  - phase: 18-token-foundation
    provides: validate-contrast.mjs script + culori dependency
provides:
  - Octatrack capability fixture (sampler/sequencer/midi_sequencer flags)
  - Octatrack overview fixture (InstrumentFileSchema-valid)
  - 10 it.todo / test.todo stubs targeting Wave 1 + Wave 2 implementation
  - octatrack-marker-ids validator (sessions/octatrack/*.md vs CONTROL_METADATA + SECTION_BOUNDS)
  - patch-detail-octatrack project-state rendering stubs
  - validate-contrast.mjs TOKEN_MAP refresh (Phase 24 palette + Phase 25 orange)
  - check-triple-write.sh phase gate command + npm run check-triple-write
affects: [25-01-token-cascade, 25-02-bundling, 25-03a-sessions, 25-03b-sessions, 25-04-patches, 25-05-integration]

tech-stack:
  added: []
  patterns:
    - "Wave-0 stub-first testing — it.todo signals to later waves what behavior they own"
    - "Triple-write verifier as single bash phase gate (working tree vs bundle vs vault)"
    - "Contrast validator TOKEN_MAP mirrors @theme primitives + cascade overrides"

key-files:
  created:
    - src/lib/content/__tests__/__fixtures__/instruments/octatrack/instrument.json
    - src/lib/content/__tests__/__fixtures__/instruments/octatrack/overview.md
    - src/lib/__tests__/octatrack-marker-ids.test.ts
    - src/components/__tests__/patch-detail-octatrack.test.tsx
    - scripts/check-triple-write.sh
  modified:
    - src/lib/content/__tests__/schemas.test.ts
    - src/lib/content/__tests__/reader.test.ts
    - src/app/__tests__/midi-capability.test.tsx
    - src/components/__tests__/nav.test.tsx
    - src/components/__tests__/app-shell.test.tsx
    - scripts/validate-contrast.mjs
    - package.json

key-decisions:
  - "Octatrack starter OKLCH (accent 0.72/0.16/40, param 0.80/0.12/42) already passes all 10 octatrack pairings at WCAG AA — plan 25-01 has headroom to tune saturation rather than recover from failure"
  - "Octatrack fixture has reference_pdfs:[] — no Octatrack manual lives in repo, fixture must reflect reality"
  - "patch-detail-octatrack.test.tsx is fully .todo (not partial-real) because Wave 0 has no bundled octatrack instrument or PatchDetail octatrack branch to render against"
  - "marker-ids validator imports CONTROL_METADATA + SECTION_BOUNDS via @/ alias to match the existing octatrack-panel-data.test.ts convention"
  - "Added a non-empty assertion on CONTROL_METADATA + SECTION_BOUNDS so a failed import never passes vacuously across the per-file marker tests"

patterns-established:
  - "It.todo as Wave-1 contract: the test name is the spec, the next wave removes .todo and adds assertions"
  - "Validator imports authoritative source (CONTROL_METADATA, SECTION_BOUNDS) — no fixture duplication"
  - "Contrast TOKEN_MAP keeps base + per-cascade prefixed entries to mirror cascade block structure"

requirements-completed: [D-04, D-08, D-09, D-12, D-13, D-14, D-20, D-21, D-22]

duration: 9min
completed: 2026-04-16
---

# Phase 25 Plan 00: Test Fixtures, Stubs, and Tooling Foundation Summary

**Wave 0 foundation: Octatrack capability fixtures, 10 it.todo stubs across 6 test files, refreshed WCAG validator with Phase 24 palette + 10 octatrack pairings (all PASS at starter OKLCH), and a triple-write verifier script wired as `npm run check-triple-write`.**

## Performance

- **Duration:** ~9 min
- **Started:** 2026-04-16T21:43:00Z
- **Completed:** 2026-04-16T21:51:35Z
- **Tasks:** 5
- **Files modified:** 12 (5 created + 7 modified)

## Accomplishments

- Octatrack capability fixture (`sampler/sequencer/midi_sequencer:true`, `sysex/patch_memory:false`, `reference_pdfs:[]`) and matching overview.md fixture — Wave 1 has stable schema-test reference data
- 7 `it.todo` / `test.todo` stubs across schemas/reader/midi-capability/nav/app-shell tests — every Wave 1 + Wave 2 contract is now a named test target
- Octatrack marker-ID validator that walks all 6 existing sessions and asserts every panel-marker control/section ID lives in `CONTROL_METADATA` / `SECTION_BOUNDS` (passes trivially today; activates once Wave 3 adds markers)
- patch-detail-octatrack project-state stubs (3 todos: no cable_routing, no knob_settings, OctatrackPanel below body)
- `scripts/validate-contrast.mjs` refreshed: removed stale lime tokens, added 18 new entries (10 octatrack + Evolver blue + Cascadia steel + neutral aluminum), 28 pairings — all PASS at starter values (lowest 4.53:1, highest 16.56:1)
- `scripts/check-triple-write.sh` (executable, bash, `set -u`) compares working tree vs `src/content/` bundle vs `~/song` vault for sessions/patches/instruments via `diff -r`; reports per-pair PASS/FAIL/SKIP and exits non-zero on divergence
- `npm run check-triple-write` registered in package.json — single-command phase gate for every later wave

## Task Commits

Each task was committed atomically:

1. **Task 0.1: Octatrack test fixtures** — `8e9d6c9` (test)
2. **Task 0.2: 7 it.todo stubs across 5 test files** — `e62f5e2` (test)
3. **Task 0.3: marker-ids validator + patch-detail stubs** — `ddd1593` (test)
4. **Task 0.4: validate-contrast.mjs refresh** — `84490df` (chore)
5. **Task 0.5: check-triple-write.sh + npm script** — `9ee336d` (chore)

## Files Created/Modified

### Created
- `src/lib/content/__tests__/__fixtures__/instruments/octatrack/instrument.json` — Octatrack capability fixture for schema tests
- `src/lib/content/__tests__/__fixtures__/instruments/octatrack/overview.md` — Octatrack overview fixture for InstrumentFileSchema tests
- `src/lib/__tests__/octatrack-marker-ids.test.ts` — Validator that catches typos in `data-octatrack-panel` markers as Wave 3 lands
- `src/components/__tests__/patch-detail-octatrack.test.tsx` — Project-state rendering stubs (3 todos for Wave 2)
- `scripts/check-triple-write.sh` — Triple-write phase gate (bash, executable)

### Modified
- `src/lib/content/__tests__/schemas.test.ts` — +3 it.todo for Octatrack config + backward-compat sampler flag
- `src/lib/content/__tests__/reader.test.ts` — +1 it.todo for `discoverInstruments` returning octatrack
- `src/app/__tests__/midi-capability.test.tsx` — +1 test.todo for NoSysexPage octatrack rendering
- `src/components/__tests__/nav.test.tsx` — +1 test.todo for hiding MIDI link on octatrack
- `src/components/__tests__/app-shell.test.tsx` — +1 test.todo for `data-instrument="octatrack"`
- `scripts/validate-contrast.mjs` — TOKEN_MAP rewritten (26 entries vs prior 9), PAIRINGS expanded to 28, gamut check now iterates every `*-accent`/`*-param`
- `package.json` — `check-triple-write` script entry

## Decisions Made

- **Octatrack starter palette already passes WCAG AA on every pairing.** All 10 octatrack-prefixed pairings pass (`octatrack-accent on octatrack-overlay` is the tightest at 6.29:1). Plan 25-01 inherits headroom — it can tune chroma toward Elektron's hot orange feel (≈0.18-0.22) without dropping under 4.5:1.
- **`patch-detail-octatrack.test.tsx` is all-`it.todo` (no real assertions).** Without a Wave-2 bundled octatrack instrument.json, calling `<PatchDetail patch={...} instrumentSlug="octatrack" />` would either error in `<OctatrackPanel />` or render an empty branch. Defaulting to .todo keeps the suite green and signals the contract.
- **Marker-ID validator uses `@/` alias for `CONTROL_METADATA` / `SECTION_BOUNDS` import.** Matches existing `src/lib/__tests__/octatrack-panel-data.test.ts`. No relative `../octatrack-panel-data.js` path.
- **Added a non-empty guard on the imports.** If an alias misconfig ever made the import resolve to `undefined`, the per-file marker tests would pass vacuously (every `id in undefined` is false but the loop never runs) — the explicit `Object.keys(...).length > 0` assertion catches that.

## Deviations from Plan

None — plan executed exactly as written.

The only judgment call was Task 0.3's "real vs. todo" decision for `patch-detail-octatrack.test.tsx`; I chose all-`.todo` exactly as the plan's Action block prescribed ("If in doubt, default to `it.todo` — this is Wave 0, real assertions land in Wave 2").

## Issues Encountered

- **Pre-existing test failures (18) are unrelated to Wave 0.** Verified by checking out `HEAD~5` for `src/` and re-running vitest: same 18 failures (`session-detail`, `instrument-overview`, `card-unification`, `processor` heading anchors, `curriculum` partial-recipe sessions). My 5 commits did not introduce any new failure. None of these files were modified in this plan; documenting here so Wave 1 doesn't try to re-fix them.
- **One file ("patch-detail-octatrack.test.tsx") shows as "1 skipped" in vitest summary.** This is vitest's normal behavior for a file containing only `.todo` tests — the file is reported as skipped, the 3 individual tests are still counted as todos. Verified by running the file in isolation (`vitest run src/components/__tests__/patch-detail-octatrack.test.tsx` → "Tests 3 todo (3)").

## Verification Results

| Check | Command | Result |
|---|---|---|
| Octatrack fixture loads + flags correct | `node -e "..."` (Task 0.1 verify) | `fixture OK` exit 0 |
| Edited test files all green | `npm test -- --run <5 files>` | `85 passed | 7 todo` exit 0 |
| Marker-ids + patch-detail stubs | `npm test -- --run <2 files>` | `8 passed | 3 todo` exit 0 |
| Contrast validator | `node scripts/validate-contrast.mjs` | All 28 pairings PASS, exit 0 |
| Triple-write check (Wave 0 expected fail) | `bash scripts/check-triple-write.sh octatrack` | 6 FAIL (missing bundle + vault dirs), exit 1 — **expected** |
| package.json valid JSON | `node -e "JSON.parse(...)"` | exit 0 |
| Full vitest suite | `npm test -- --run` | `711 passed | 18 failed | 16 todo` — same 18 failures as `HEAD~5` baseline |

## Octatrack Starter Palette — pass margins for plan 25-01

Plan 25-01 Task 1.3 was scoped to "iterate OKLCH chroma/lightness until all pass". Starter values already pass — the iteration target shifts to "tune toward Elektron's panel hue without dropping below 4.5:1". Margins:

| Pairing | Ratio | Margin over 4.5:1 |
|---|---|---|
| octatrack-accent on octatrack-bg | 7.72:1 | +3.22 |
| octatrack-accent on octatrack-sunken | 7.83:1 | +3.33 |
| octatrack-accent on octatrack-surface | 7.40:1 | +2.90 |
| octatrack-accent on octatrack-surface-raised | 6.91:1 | +2.41 |
| octatrack-accent on octatrack-overlay | 6.29:1 | +1.79 (tightest accent) |
| octatrack-param on octatrack-surface | 10.03:1 | +5.53 |
| octatrack-param on octatrack-surface-raised | 9.37:1 | +4.87 |
| text on octatrack-bg | 16.56:1 | +12.06 |
| text on octatrack-surface | 15.86:1 | +11.36 |
| muted on octatrack-surface | 4.55:1 | +0.05 (tightest overall — protect this) |

Plan 25-01 should treat `muted on octatrack-surface` as the constraining pairing when raising muted chroma.

## Triple-write Wave 0 state

Expected failure (Wave 2 will resolve):

```
Sessions:
  [work->bundle] sessions/octatrack vs src/content/sessions/octatrack — FAIL (bundle missing)
  [work->vault]  sessions/octatrack vs ~/song/sessions/octatrack — FAIL (vault missing)
Patches:
  [work->bundle] patches/octatrack vs src/content/patches/octatrack — FAIL (bundle missing)
  [work->vault]  patches/octatrack vs ~/song/patches/octatrack — FAIL (vault missing)
Instruments:
  [work->bundle] instruments/octatrack vs src/content/instruments/octatrack — FAIL (bundle missing)
  [work->vault]  instruments/octatrack vs ~/song/instruments/octatrack — FAIL (vault missing)
```

Plan 25-02 must (a) populate `src/content/{sessions,patches,instruments}/octatrack/`, (b) populate `~/song/{sessions,patches,instruments}/octatrack/`, then this script flips to all PASS.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Plan 25-01 (Wave 1, token cascade)** can begin immediately:
  - Schema todos in `schemas.test.ts` are ready to flip from `it.todo` to real `it(...)` once `InstrumentConfigSchema` gains optional `sampler/sequencer/midi_sequencer` fields
  - Contrast validator already running green; iteration target is hue-honesty, not pass-rate recovery
  - Octatrack starter OKLCH values are good enough to land as the initial cascade block in `globals.css`
- **Plan 25-02 (Wave 2, bundling + capability gating)** can begin in parallel:
  - Bundle script + vault sync will flip 6 of the 7 Wave 0 todos from `.todo` to real assertions
  - Triple-write script becomes the gate — script must exit 0 before plan 25-02 SUMMARY is written
- **No blockers.** Pre-existing 18 unrelated test failures are documented here so Wave 1+ doesn't get derailed.

## Self-Check: PASSED

Verified files exist:

- `src/lib/content/__tests__/__fixtures__/instruments/octatrack/instrument.json` — FOUND
- `src/lib/content/__tests__/__fixtures__/instruments/octatrack/overview.md` — FOUND
- `src/lib/__tests__/octatrack-marker-ids.test.ts` — FOUND
- `src/components/__tests__/patch-detail-octatrack.test.tsx` — FOUND
- `scripts/check-triple-write.sh` (executable) — FOUND
- `scripts/validate-contrast.mjs` (modified) — FOUND

Verified commits exist:

- `8e9d6c9` Task 0.1 — FOUND
- `e62f5e2` Task 0.2 — FOUND
- `ddd1593` Task 0.3 — FOUND
- `84490df` Task 0.4 — FOUND
- `9ee336d` Task 0.5 — FOUND

---
*Phase: 25-complete-the-octatrack-curriculum-work-so-that-it-is-ready-to-add-to-the-evolver-site-focus-on-song-writing-and-arrangement-and-live-sessions-and-looping*
*Plan: 25-00*
*Completed: 2026-04-16*
