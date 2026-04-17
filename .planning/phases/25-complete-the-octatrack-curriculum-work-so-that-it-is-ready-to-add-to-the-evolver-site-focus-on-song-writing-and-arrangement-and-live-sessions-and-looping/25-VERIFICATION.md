---
phase: 25-complete-the-octatrack-curriculum-work-so-that-it-is-ready-to-add-to-the-evolver-site-focus-on-song-writing-and-arrangement-and-live-sessions-and-looping
verified: 2026-04-17T10:00:00Z
status: gaps_found
score: 6/8 success criteria verified
re_verification: false
gaps:
  - truth: "Full test suite green + validate-content green + validate-contrast green + check-triple-write green + npm run build green (Success Criterion 7)"
    status: partial
    reason: "Two blockers: (1) validate-contrast.test.ts still asserts PAIRINGS length === 8, but Phase 25 Wave 0 expanded PAIRINGS to 28 without updating the test. (2) npm run build fails due to SignalType mismatch in cascadia-cable-lookup.ts ('gate' not assignable to CascadiaPanel's accepted union). The build failure is pre-Phase-25 (last touched by commit 12c3c27, before phase-25 plan at 824a6af). The test failure was introduced by Phase 25 (84490df expanded PAIRINGS but left the test assertion at 8)."
    artifacts:
      - path: "scripts/__tests__/validate-contrast.test.ts"
        issue: "Test asserts PAIRINGS.toHaveLength(8) but PAIRINGS is now 28 (expanded in commit 84490df, Phase 25 Wave 0). Test was not updated."
      - path: "src/lib/cascadia-cable-lookup.ts"
        issue: "SignalType includes 'gate' (line 14) but CascadiaPanel's CablePath only accepts 'audio' | 'cv' | 'modulation' | 'default'. Build fails at patch-detail.tsx:128. Pre-existing (pre-Phase-25) issue."
    missing:
      - "Update scripts/__tests__/validate-contrast.test.ts: change toHaveLength(8) to toHaveLength(28) to match the Phase 25 expansion"
      - "Fix the pre-existing build failure: align SignalType in cascadia-cable-lookup.ts with CablePath's accepted union (remove 'gate' or add it to CablePath props), or exclude it from the SignalType return in getCascadiaCableSignalType"
human_verification:
  - test: "Home page shows 3 instrument cards (Evolver, Cascadia, Octatrack)"
    expected: "All three instrument cards render with correct taglines and session/patch counts"
    why_human: "Visual layout — automated reader test only confirms octatrack is discovered, not rendered on the homepage"
  - test: "Instrument selector includes Octatrack; click navigates to /instruments/octatrack"
    expected: "Dropdown shows Octatrack MKII; click navigates correctly"
    why_human: "Dropdown interaction and visual confirmation"
  - test: "Octatrack routes show Elektron orange surface tint and accent"
    expected: "Subtle warm orange tint on backgrounds; accent visibly Elektron orange; no lime remnants"
    why_human: "Color perception and visual quality — cannot assert via automated test"
  - test: "Panel zoom activates on scroll in Module 7-10 sessions with markers"
    expected: "Scroll past data-octatrack-panel div triggers panel zoom; Scene A/B buttons highlighted"
    why_human: "Scroll interaction and panel highlight behavior"
  - test: "WCAG AA accent readability on all octatrack surfaces"
    expected: "Orange accent text readable at 4.5:1 against bg, surface, surface-raised, overlay"
    why_human: "Visual contrast perception check, though automated validator also confirms this"
---

# Phase 25: Octatrack Curriculum + Site Integration — Verification Report

**Phase Goal:** Take the Octatrack MKII from "metadata + 6 of 31 sessions + panel SVG" to full Cascadia-parity on the evolver site — complete 31-session curriculum, triple-write pipeline, full site integration (instrument selector, nav, capability-gated routes, demo mode), new sampler capability profile, Elektron-orange color identity with surface tinting, and 5 demo project-state patches.

**Verified:** 2026-04-17T10:00:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths (from ROADMAP.md Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 31 Octatrack sessions exist in all three content locations with valid frontmatter (duration ≤ 30 min ADHD cap) | VERIFIED | `ls sessions/octatrack/*.md \| wc -l` = 31; `ls src/content/sessions/octatrack/*.md \| wc -l` = 31; `ls ~/song/sessions/octatrack/*.md \| wc -l` = 31; `check-triple-write.sh octatrack` exits 0; `validate-content` 0 octatrack failures; every session 20-25 min |
| 2 | Octatrack appears as first-class instrument on home, nav, selector, session browser, patches, panel route, global search | VERIFIED | `instrument.json` bundled; reader test confirms `discoverInstruments` returns octatrack; nav test confirms MIDI link absent; app-shell test confirms `data-instrument="octatrack"` set; panel route resolves octatrack (standalone-panel-client.test.tsx 4/4); patch-detail-octatrack 3/3 |
| 3 | Capability gates correct: MIDI/SysEx page hidden for Octatrack, patch pages render project-state format (no cable routing, no knob settings) | VERIFIED | `midi-capability.test.tsx` passes (loads real bundled config, asserts NoSysexPage renders); `patch-detail-octatrack.test.tsx` 3/3 (no cable_routing, no knob_settings, OctatrackPanel below body); `grep cable_routing patches/octatrack/*.md` returns empty |
| 4 | Color identity visible: Elektron orange accent + subtle warm surface tint on octatrack routes, WCAG AA readable | VERIFIED | `[data-instrument="octatrack"]` cascade block confirmed in globals.css (9 overrides: accent=oklch(0.72 0.16 40), surface hue 40 chroma 0.03); `validate-contrast.mjs` all 28 pairings PASS (tightest octatrack: 6.29:1); tokens.test.ts 8/8 octatrack tests pass (hue [35-45], chroma ≤ 0.04) |
| 5 | 5 demo patches render from patches index (basic-project + 4 focus-module demos) | VERIFIED | `ls src/content/patches/octatrack/*.md` = 6 files (README + 5 patches: basic-project, scene-morphing-performance, parts-song-sections, live-loop-layers, full-arrangement); no cable_routing/knob_settings in any patch; triple-write passes |
| 6 | Demo mode shows realistic Octatrack synthetic journey (~23/31 complete, partway through Module 8) | VERIFIED | `SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS` = sessions 1-23 (23 entries); `SYNTHETIC_OCTATRACK_JOURNEY_WEEKS` 7 weeks starting 2026-03-10; progress.ts and practice-metrics.ts both dispatch octatrack journey; `practice-metrics.test.ts` 19/19 pass |
| 7 | Full test suite green + validate-content green + validate-contrast green + check-triple-write green + npm run build green | FAILED | Test suite: 763 passed, **18 failed** (but 17 are pre-existing; 1 is Phase-25-introduced: `validate-contrast.test.ts` asserts PAIRINGS.length === 8 but PAIRINGS is now 28). `validate-content`: 2 failures (pre-existing evolver/cascadia troubleshooting.md). `validate-contrast.mjs`: all 28 PASS. `check-triple-write.sh`: all PASS. `npm run build`: **FAILS** (pre-existing SignalType mismatch in cascadia-cable-lookup.ts). |
| 8 | D-22 guard: octatrack-panel.tsx and octatrack-panel-data.ts unchanged throughout the phase | VERIFIED | `git log --oneline 824a6af..HEAD -- src/components/octatrack-panel.tsx src/lib/octatrack-panel-data.ts` = empty. Last commit touching those files is fc3b1d8 (pre-phase-25). |

**Score:** 6/8 success criteria verified (2 gaps — see below)

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `instruments/octatrack/instrument.json` | Capability flags (sampler/sequencer/midi_sequencer:true, sysex/patch_memory:false) | VERIFIED | File exists; flags confirmed correct; matches Wave 0 fixture byte-for-byte |
| `src/content/instruments/octatrack/instrument.json` | Bundled copy | VERIFIED | Exists; byte-identical to canonical |
| `src/content/sessions/octatrack/` (31 files) | Full curriculum | VERIFIED | 31 files present and schema-valid |
| `sessions/octatrack/` (31 files) | Working tree | VERIFIED | 31 files present |
| `~/song/sessions/octatrack/` (31 files) | Vault copy | VERIFIED | 31 files present |
| `src/content/patches/octatrack/` (5+README) | Demo patches | VERIFIED | 6 files (5 patches + README) |
| `src/app/globals.css` `[data-instrument="octatrack"]` | 9-override cascade block | VERIFIED | Block present with correct OKLCH orange values at hue 40 |
| `src/lib/content/schemas.ts` `InstrumentConfigSchema` | sampler/sequencer/midi_sequencer optional fields | VERIFIED | Fields present at line 79-81 |
| `src/lib/synthetic-daily-notes.ts` | Octatrack journey (23/31, 7 weeks) | VERIFIED | `SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS` (23 entries) + `SYNTHETIC_OCTATRACK_JOURNEY_WEEKS` (7 weeks from 2026-03-10) |
| `src/lib/progress.ts` | Octatrack dispatcher | VERIFIED | Returns `SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS` when instrument === 'octatrack' |
| `src/lib/practice-metrics.ts` | Octatrack metrics dispatcher | VERIFIED | Returns octatrack journey weeks and reference start 2026-03-10 |
| `src/app/instruments/[slug]/panel/standalone-panel-client.tsx` | Octatrack branch | VERIFIED | `if (instrumentSlug === 'octatrack') return <OctatrackPanel />` present |
| `src/app/instruments/[slug]/panel/page.tsx` | Octatrack panel config | VERIFIED | `octatrack` entry in PANEL_CONFIG with correct title/description/maxWidth |
| `scripts/check-triple-write.sh` | Triple-write verifier | VERIFIED | Executable; exits 0 for octatrack |
| `scripts/validate-contrast.mjs` | Updated TOKEN_MAP (28 pairings) | VERIFIED | 28 pairings, all PASS |
| `scripts/__tests__/validate-contrast.test.ts` | Updated length assertion | STUB/STALE | Still asserts `toHaveLength(8)` but PAIRINGS = 28 — introduced by Phase 25 |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `instrument.json` (sampler:true) | `InstrumentConfigSchema` parse | schemas.ts optional fields | WIRED | schema test 37/37 pass including rejection test |
| `instrument.json` (sysex:false) | NoSysexPage render | midi-capability route | WIRED | midi-capability.test.tsx loads real bundled config; NoSysexPage renders |
| `/instruments/octatrack/panel` slug | `OctatrackPanel` component | standalone-panel-client.tsx | WIRED | Panel route test 4/4; confirmed in source |
| `data-instrument="octatrack"` CSS attribute | Orange cascade | globals.css cascade block | WIRED | AppShell test confirms attribute set; cascade block confirmed in globals.css |
| `sessions/octatrack/*.md` | `src/content/sessions/octatrack/` | check-triple-write.sh | WIRED | Exits 0, all pairs match |
| `patches/octatrack/*.md` | `src/content/patches/octatrack/` | check-triple-write.sh | WIRED | Exits 0, all pairs match |
| `SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS` | progress dispatcher | progress.ts instrument === 'octatrack' branch | WIRED | Code confirmed; practice-metrics.test.ts 19/19 |
| `octatrack-panel-data.ts CONTROL_METADATA` | session panel markers | octatrack-marker-ids.test.ts | WIRED | 33/33 marker IDs pass; no invalid control IDs in any of 31 sessions |

---

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `synthetic-daily-notes.ts` | `SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS` | Static Set literal (23 session numbers) | Yes — realistic 23/31 journey | FLOWING |
| `progress.ts` | returned Set | `SYNTHETIC_OCTATRACK_COMPLETED_SESSIONS` via instrument branch | Yes — octatrack-specific journey dispatched | FLOWING |
| `practice-metrics.ts` | journey weeks | `SYNTHETIC_OCTATRACK_JOURNEY_WEEKS` via instrument branch | Yes — 7-week pacing from 2026-03-10 | FLOWING |
| `patch-detail.tsx` | OctatrackPanel below body | patch_memory:false flag gates cable_routing/knob_settings | Yes — markdown body + OctatrackPanel (no parameter dump) | FLOWING |
| `globals.css [data-instrument="octatrack"]` | CSS token overrides | AppShell sets `data-instrument` from pathname | Yes — 9 token overrides active on octatrack routes | FLOWING |

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| 31 sessions in all 3 locations | `check-triple-write.sh octatrack` | All 6 pairs PASS, exit 0 | PASS |
| All WCAG pairings pass | `node scripts/validate-contrast.mjs` | All 28 pairings PASS | PASS |
| Octatrack instrument.json parses via schema | `node -e "JSON.parse(readFileSync(...))"` | Correct flags confirmed | PASS |
| Marker IDs valid | `npm test -- --run octatrack-marker-ids.test.ts` | 33/33 tests pass | PASS |
| Patch-detail project-state rendering | `npm test -- --run patch-detail-octatrack.test.tsx` | 3/3 tests pass | PASS |
| validate-content (octatrack content) | `npm run validate-content` | 0 octatrack failures; only 2 pre-existing non-octatrack failures | PASS |
| npm run build | `npm run build` | FAILS — pre-existing TypeScript error: SignalType 'gate' not assignable in cascadia-cable-lookup.ts/patch-detail.tsx | FAIL (pre-existing) |
| validate-contrast test suite | `npm test -- --run validate-contrast.test.ts` | 1 failure: `has exactly 8 critical pairings` asserts 8 but PAIRINGS = 28 | FAIL (Phase-25-introduced) |

---

### Requirements Coverage (D-01 through D-22)

| Decision | Description | Status | Evidence |
|----------|-------------|--------|----------|
| D-01 | Author 25 missing sessions (02-08, 10-24, 26-27, 30) to reach 31 total | SATISFIED | 31 sessions confirmed in all 3 locations |
| D-02 | Authoring weight biased to Modules 7-10 (dense markers); Modules 1-6 lighter | SATISFIED | 25-03b: 2+ markers/session for M7-10; 25-03a: avg 0.94 markers/session for M1-6 |
| D-03 | Every session triple-writes to sessions/, src/content/, ~/song/ | SATISFIED | check-triple-write.sh exits 0; all 3 locations: 31 sessions |
| D-04 | Session format per spec: YAML frontmatter, 15-30 min cap, 5-section template | SATISFIED | validate-content 0 octatrack failures; all sessions 20-25 min; frontmatter confirmed on spot-check |
| D-05 | Full Cascadia-parity integration (selector, home, nav, session browser, progress, search, demo mode) | SATISFIED | reader test discoverInstruments; nav test; app-shell test; demo mode journey dispatched (23/31) |
| D-06 | Panel route resolves octatrack → OctatrackPanel | SATISFIED | standalone-panel-client.tsx branch confirmed; page.tsx PANEL_CONFIG entry confirmed; 4 regression tests pass |
| D-07 | instruments/octatrack/instrument.json created | SATISFIED | File exists with correct flags at canonical, bundle, and vault |
| D-08 | New capability flags: sampler=true, sequencer=true, midi_sequencer=true, sysex=false, patch_memory=false | SATISFIED | schemas.ts extended; instrument.json confirmed; schema tests 37/37 |
| D-09 | sysex=false hides MIDI SysEx page; patch_memory=false causes project-state rendering | SATISFIED | midi-capability test (real config, NoSysexPage renders); patch-detail test (no cable_routing, OctatrackPanel below body) |
| D-10 | midi_sequencer=true flag exists (informational only, no UI required) | SATISFIED | Flag present in schemas.ts and instrument.json |
| D-11 | Capability gating via flag presence, not instrument-name switching | SATISFIED | All capability checks use flag values (sysex, patch_memory); no instrument-name string checks introduced |
| D-12 | Elektron orange accent: warm hue 35-45, chroma ~0.15-0.17, WCAG AA | SATISFIED | oklch(0.72 0.16 40) confirmed; tokens.test.ts hue [35-45], chroma [0.10-0.17]; all pairings pass |
| D-13 | Lighter param derivative visibly lighter, WCAG AA | SATISFIED | oklch(0.80 0.12 42); 9.37:1 on surface-raised; tokens.test.ts lightness ordering passes |
| D-14 | [data-instrument="octatrack"] cascade overrides for bg/surface/surface-raised/overlay | SATISFIED | 9-override cascade block in globals.css; app-shell test confirms attribute set; surface chroma 0.03 at hue 40 |
| D-15 | Color work follows Phase 24 three-layer token architecture | SATISFIED | No architecture changes; additive primitives only |
| D-16 | 3-4 demo project patches (scene-morphing, parts, live-looping, full-arrangement) | SATISFIED | 4 focus-module patches confirmed (scene-morphing-performance, parts-song-sections, live-loop-layers, full-arrangement) |
| D-17 | Patch format: project-state (sample list, track config, pattern map, scene notes, tips); no parameter-dump | SATISFIED | grep finds no cable_routing/knob_settings in any octatrack patch; body format confirmed |
| D-18 | basic-project.md reference state included | SATISFIED | patches/octatrack/basic-project.md exists and bundled |
| D-19 | Patches bundled into src/content/patches/octatrack/ | SATISFIED | 6 files (5+README) confirmed in bundle |
| D-20 | Marker coverage biased to Modules 7-10; earlier modules sparse (critical gestures only) | SATISFIED | M7-10: 2 markers/session; M1-6: avg 0.94/session; marker-ids test 33/33 |
| D-21 | Marker syntax: `<div data-octatrack-panel="control-ids">` matching CONTROL_METADATA keys | SATISFIED | Confirmed in session 19 source; marker-ids validator 33/33 |
| D-22 | Panel SVG (octatrack-panel.tsx, octatrack-panel-data.ts) frozen throughout | SATISFIED | `git log --oneline 824a6af..HEAD -- src/components/octatrack-panel.tsx src/lib/octatrack-panel-data.ts` = empty |

---

### Anti-Patterns Found

| File | Issue | Severity | Impact |
|------|-------|----------|--------|
| `scripts/__tests__/validate-contrast.test.ts:13` | `toHaveLength(8)` asserts old PAIRINGS count; Phase 25 expanded to 28 | Blocker | Breaks "test suite green" requirement (Success Criterion 7); easy 1-line fix |
| `src/lib/cascadia-cable-lookup.ts:14` | `SignalType` includes `'gate'` which is not accepted by `CascadiaPanel`'s `CablePath` | Blocker (pre-existing) | Breaks `npm run build` (Success Criterion 7); pre-dates Phase 25 |

No stub content found in octatrack sessions or patches. All 31 sessions have substantive exercises, output checklists, and key takeaways. All 5 patches have complete project-state documentation.

---

### Human Verification Required

#### 1. Three Instrument Cards on Home Page

**Test:** Navigate to `/` in the running dev server
**Expected:** Evolver, Cascadia, and Octatrack MKII cards all render with correct taglines and accurate session/patch counts (31 sessions, 5 patches)
**Why human:** Visual layout requires browser rendering; automated tests confirm discovery but not home page card rendering

#### 2. Instrument Selector Includes Octatrack

**Test:** Open the instrument selector dropdown in the navigation bar
**Expected:** Octatrack MKII appears; clicking navigates to `/instruments/octatrack`; current instrument highlighted
**Why human:** Dropdown interaction and visual confirmation of navigation

#### 3. Session Browser Shows 31 Sessions with Prerequisite Chain

**Test:** Navigate to `/instruments/octatrack/sessions`
**Expected:** 31 session rows with correct titles; prerequisite indicators visible; no missing sessions
**Why human:** Visual list rendering and prerequisite chain display

#### 4. Panel Zoom on Module 7-10 Sessions

**Test:** Open Session 19 or 21 in the browser; scroll past the `data-octatrack-panel` divs
**Expected:** OctatrackPanel zooms to show Scene A/B buttons highlighted; crossfader region highlighted
**Why human:** Scroll-triggered zoom interaction cannot be verified programmatically

#### 5. Elektron Orange Visual Identity

**Test:** Navigate to any `/instruments/octatrack` route
**Expected:** Subtle warm orange tint on page background and card surfaces; accent text (headings, links) visibly Elektron orange; no lime or teal remnants
**Why human:** Color perception and visual quality check

#### 6. Octatrack Patch Renders Project-State Format

**Test:** Open any Octatrack patch detail page
**Expected:** Tables (Sample Slots, Track Config, Pattern Map, Scene Notes) in markdown body; OctatrackPanel visible below; no "Cable Routing" or "Knob Settings" sections
**Why human:** Visual format check; automated test covers the DOM structure but not the visual rendering quality

#### 7. Synthetic Demo Journey Pacing

**Test:** Navigate to `/instruments/octatrack/progress` (or demo mode)
**Expected:** ~23/31 sessions shown complete; heatmap shows 7-week pacing starting ~2026-03-10; realistic ADHD-paced gaps visible
**Why human:** Visual timeline and pacing quality; automated tests confirm the data structure but not the rendered progress visualization

---

## Gaps Summary

### Gap 1 (Phase-25-introduced): validate-contrast.test.ts stale length assertion

**File:** `scripts/__tests__/validate-contrast.test.ts` line 13
**Issue:** Phase 25 Wave 0 (commit `84490df`) expanded `PAIRINGS` from 8 to 28 in `validate-contrast.mjs` but the companion test that asserts `PAIRINGS.toHaveLength(8)` was not updated. The test has been failing since Wave 0.
**Impact:** Directly blocks Success Criterion 7 ("full test suite green"). Easy 1-line fix: change `toHaveLength(8)` to `toHaveLength(28)`.

### Gap 2 (Pre-existing): npm run build fails due to SignalType mismatch

**Files:** `src/lib/cascadia-cable-lookup.ts` (line 14), `src/components/patch-detail.tsx` (line 128)
**Issue:** `SignalType` in cascadia-cable-lookup includes `'gate'` but `CascadiaPanel`'s `CablePath` component only accepts `'audio' | 'cv' | 'modulation' | 'default'`. This causes a TypeScript type error during build.
**Pre-existing evidence:** Last commit touching these files is `12c3c27` (`feat(260416-9hx): wire octatrack panel into app plumbing`), which predates the Phase 25 planning commit `824a6af`. Phase 25 introduced no changes to these files.
**Impact:** `npm run build` fails, blocking the VALIDATION.md requirement "npm run build green." However, Phase 25 did not introduce this failure — it existed before the phase began. All octatrack-specific build paths (panel route, instrument pages, patch detail) work correctly; only the Cascadia cable routing type mismatch blocks the full production build.

### Assessment

The core Phase 25 deliverables — 31-session curriculum, triple-write pipeline, capability flags, orange color identity, 5 patches, demo mode — are all fully implemented and working. Gap 1 (stale test assertion of length 8) is a genuine Phase 25 omission that must be fixed before the phase can be considered complete. Gap 2 (build failure) is pre-existing and outside Phase 25 scope, but it appears in the validation sign-off criteria and should be noted for resolution.

---

_Verified: 2026-04-17T10:00:00Z_
_Verifier: Claude (gsd-verifier)_
