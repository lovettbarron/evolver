---
phase: 25
slug: complete-the-octatrack-curriculum-work-so-that-it-is-ready-to-add-to-the-evolver-site-focus-on-song-writing-and-arrangement-and-live-sessions-and-looping
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-16
---

# Phase 25 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> Derived from 25-RESEARCH.md §Validation Architecture.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest ^3.0.0 + @testing-library/react ^16.3.2 + jsdom ^29.0.1 |
| **Config file** | Implicit (vitest CLI) + co-located `__tests__/` directories |
| **Quick run command** | `npm test -- <test-path>` or `npm test -- -t "<pattern>"` |
| **Full suite command** | `npm test` |
| **Estimated runtime** | ~30-45 seconds (full suite) |

**Supporting scripts:**

| Script | Command | Purpose |
|--------|---------|---------|
| Schema validation | `npm run validate-content` | Walks `src/content/` and validates every markdown file's frontmatter against Zod schemas |
| Contrast validation | `node scripts/validate-contrast.mjs` | WCAG AA contrast check for token pairs (TOKEN_MAP must be updated in Wave 0 before use) |
| Content bundle | `npm run bundle-content` (auto-runs as prebuild) | Copies `{instruments,sessions,patches,references}/` → `src/content/` |
| Triple-write check | `scripts/check-triple-write.sh` (NEW — Wave 0) | Diffs `sessions/octatrack/` vs `src/content/sessions/octatrack/` vs `~/song/sessions/octatrack/` |

---

## Sampling Rate

- **After every session commit (content authoring):** Run `npm run validate-content` — fast (<5s) schema check on the touched file
- **After every plan wave:** Run `npm test` (full suite) — catches schema, nav, panel, token regressions
- **Before `/gsd:verify-work`:**
  1. `npm test` green
  2. `npm run validate-content` green (all 3 content locations)
  3. `node scripts/validate-contrast.mjs` green (Octatrack pairings pass 4.5:1)
  4. `npm run build` green (bundle step succeeds)
  5. `scripts/check-triple-write.sh` — empty diff
  6. Manual UAT (see below)
- **Max feedback latency:** 45 seconds (full suite)

---

## Per-Task Verification Map

*Populated during planning — each plan task's `<automated>` block maps here. Below is the phase-level requirement → test map from RESEARCH.md §Validation Architecture.*

| Decision | Behavior | Test Type | Automated Command | File Exists | Status |
|----------|----------|-----------|-------------------|-------------|--------|
| D-01 | 25 new sessions validate against SessionSchema | unit (schema) | `npm run validate-content` | ✅ | ⬜ pending |
| D-03 | Triple-write — all three locations match | integration | `scripts/check-triple-write.sh` | ❌ W0 | ⬜ pending |
| D-04 | Duration ≤ 30 min enforced | unit (schema) | `npm run validate-content` | ✅ | ⬜ pending |
| D-05 | Octatrack auto-discovered | unit | `vitest run src/lib/content/__tests__/reader.test.ts -t "discoverInstruments"` | ✅ | ⬜ pending |
| D-06 | Panel route resolves octatrack | unit | `vitest run src/app/instruments/.../panel/__tests__` | ❌ W0 | ⬜ pending |
| D-07 | instrument.json validates | unit (schema) | `vitest run src/lib/content/__tests__/schemas.test.ts -t "InstrumentConfigSchema"` | ✅ | ⬜ pending |
| D-08 | Capability flags = expected values | unit | `vitest run src/lib/content/__tests__/instrument-json-octatrack.test.ts` | ❌ W0 | ⬜ pending |
| D-09 | `sysex=false` hides MIDI page | unit | `vitest run src/app/__tests__/midi-capability.test.tsx` | ✅ (extend) | ⬜ pending |
| D-09 | `patch_memory=false` renders project-state | manual + unit | `vitest run src/components/__tests__/patch-detail.test.tsx` | ❌ W0 | ⬜ pending |
| D-11 | No instrument-name string checks | code review | `grep -n "instrumentSlug ===" src/**/*.tsx` audit | ✅ | ⬜ pending |
| D-12, D-13 | Orange accent + param pass WCAG AA 4.5:1 | unit (contrast) | `vitest run src/app/__tests__/tokens.test.ts -t "Octatrack"` + `node scripts/validate-contrast.mjs` | ❌ W0 | ⬜ pending |
| D-14 | `[data-instrument="octatrack"]` cascade block | unit | `vitest run src/app/__tests__/tokens.test.ts -t 'data-instrument="octatrack"'` | ❌ W0 | ⬜ pending |
| D-16, D-17, D-18 | 4 demo patches + basic-project validate | unit (schema) | `npm run validate-content` | ✅ | ⬜ pending |
| D-20, D-21 | Panel markers — all control-IDs exist | unit | `vitest run src/lib/__tests__/octatrack-marker-ids.test.ts` | ❌ W0 | ⬜ pending |
| D-22 | Panel files not modified | code review | `git diff --stat HEAD~N src/components/octatrack-panel.tsx src/lib/octatrack-panel-data.ts` | — (manual) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Tests / scripts / fixtures that MUST exist before implementation starts in Wave 1:

- [ ] `src/lib/content/__tests__/__fixtures__/instruments/octatrack/instrument.json` — test fixture for capability schema
- [ ] `src/lib/content/__tests__/__fixtures__/instruments/octatrack/overview.md` — test fixture for instrument file schema
- [ ] Extend `src/lib/content/__tests__/schemas.test.ts` — add octatrack instrument config cases (sampler/sequencer/midi_sequencer flags, patch_memory=false, sysex=false)
- [ ] Extend `src/lib/content/__tests__/reader.test.ts` — `discoverInstruments()` returns `['cascadia', 'evolver', 'octatrack']` with octatrack fixture
- [ ] Extend `src/app/__tests__/tokens.test.ts` — `[data-instrument="octatrack"]` cascade block exists; orange primitives present; surface tokens use hue 35-45; WCAG AA lightness check
- [ ] Extend `src/app/__tests__/midi-capability.test.tsx` — octatrack shows NoSysexPage
- [ ] Extend `src/components/__tests__/nav.test.tsx` — nav uses `sysex:false` for octatrack to hide MIDI link
- [ ] Extend `src/components/__tests__/app-shell.test.tsx` — `data-instrument="octatrack"` set on octatrack routes
- [ ] NEW `src/lib/__tests__/octatrack-marker-ids.test.ts` — every `data-highlights=` / `data-knobs=` / `data-sections=` ID in octatrack sessions exists in `CONTROL_METADATA` or `SECTION_BOUNDS`
- [ ] NEW `src/components/__tests__/patch-detail-octatrack.test.tsx` — Octatrack patch renders markdown body (project-state format) + OctatrackPanel; no cable routing
- [ ] Update `scripts/validate-contrast.mjs` — TOKEN_MAP must reflect Phase 24 palette (blue/steel/neutral) + Phase 25 orange; remove lime references
- [ ] NEW `scripts/check-triple-write.sh` (or npm script) — diff the three octatrack content locations for sessions, patches, and instruments

---

## Manual-Only Verifications

| Behavior | Decision | Why Manual | Test Instructions |
|----------|----------|------------|-------------------|
| Home page shows 3 instrument cards | D-05 | Visual layout | Navigate to `/`; confirm Evolver, Cascadia, Octatrack cards render with correct taglines and session/patch counts |
| Instrument selector includes Octatrack | D-05 | Visual dropdown behavior | Open selector in nav; confirm Octatrack appears; click → navigates to `/instruments/octatrack` |
| Octatrack overview/signal-flow/modules render | D-05 | Markdown layout | Navigate to `/instruments/octatrack`; confirm overview, signal flow, basic project, modules pages all load |
| Session browser shows 31 sessions with prerequisite chain | D-01 | Visual list | `/instruments/octatrack/sessions`; scroll; confirm 31 items; prerequisite links visible |
| Panel zoom activates on scroll in marked sessions | D-20, D-21 | Scroll interaction | Open any Module 7-10 session with markers; scroll; confirm panel zoom, highlights, and knob value overrides render |
| Patch library shows 5 patches | D-16, D-18 | Visual list | `/instruments/octatrack/patches`; confirm 4 demo + basic-project (5 total) |
| Octatrack patch renders project-state format | D-09, D-17 | Visual format check | Open any Octatrack patch; confirm tables (sample list, track config, pattern map, scene notes) render in body; OctatrackPanel below; no cable routing or parameter-dump section |
| MIDI/SysEx page hidden for Octatrack | D-09 | Route behavior | Navigate to `/instruments/octatrack/midi`; confirm NoSysexPage renders (not SysEx MIDI page) |
| Synthetic demo journey shows realistic pacing | D-05 | Visual timeline | `/instruments/octatrack/progress`; confirm ~23/31 sessions complete; heatmap realistic |
| Global search finds Octatrack sessions | D-05 | Search result relevance | Search "scene"; confirm Octatrack Session 19 appears |
| Elektron orange visible on octatrack routes | D-12, D-14 | Visual color identity | Navigate to any `/instruments/octatrack` route; confirm subtle warm orange surface tint; accent visibly Elektron orange |
| WCAG AA accent readability | D-12, D-13 | Contrast visual check | Check orange accent text on `--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-overlay` |
| ADHD 5-second test | PROJECT.md | Cognitive UX check | Open any Octatrack session on mobile; single clear visual hierarchy; panel marker immediately communicates where to look |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 45s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
