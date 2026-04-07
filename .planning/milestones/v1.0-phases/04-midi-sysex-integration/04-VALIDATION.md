---
phase: 4
slug: midi-sysex-integration
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-30
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 3.x |
| **Config file** | none — uses package.json scripts (`vitest run`) |
| **Quick run command** | `npm test` |
| **Full suite command** | `npm test` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test`
- **After every plan wave:** Run `npm test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 0 | MIDI-02 | unit | `npx vitest run src/lib/midi/__tests__/parser.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 0 | MIDI-02 | unit | `npx vitest run src/lib/midi/__tests__/encoder.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 0 | MIDI-01/MIDI-04 | unit | `npx vitest run src/lib/midi/__tests__/connection.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-04 | 01 | 0 | MIDI-05 | unit | `npx vitest run src/lib/midi/__tests__/diff.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-05 | 01 | 0 | MIDI-03 | unit | `npx vitest run src/lib/content/__tests__/writer.test.ts` | ❌ W0 | ⬜ pending |
| 04-01-06 | 01 | 0 | MIDI-03 | unit | `npx vitest run src/lib/content/__tests__/reader-sysex.test.ts` | ❌ W0 | ⬜ pending |
| 04-xx-xx | xx | 1+ | MIDI-01 | unit (mock) | `npx vitest run src/lib/midi/__tests__/connection.test.ts -t "request edit buffer"` | ❌ W0 | ⬜ pending |
| 04-xx-xx | xx | 1+ | MIDI-04 | unit (mock) | `npx vitest run src/lib/midi/__tests__/connection.test.ts -t "send edit buffer"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/midi/__tests__/parser.test.ts` — covers MIDI-02: pack/unpack roundtrip with known data
- [ ] `src/lib/midi/__tests__/encoder.test.ts` — covers MIDI-02/MIDI-04: encode parameters to packed bytes
- [ ] `src/lib/midi/__tests__/connection.test.ts` — covers MIDI-01/MIDI-04: mock Web MIDI API for request/send
- [ ] `src/lib/midi/__tests__/diff.test.ts` — covers MIDI-05: parameter comparison logic
- [ ] `src/lib/content/__tests__/writer.test.ts` — covers MIDI-03: file write with frontmatter + JSON sidecar
- [ ] `src/lib/content/__tests__/reader-sysex.test.ts` — covers MIDI-03: sidecar discovery

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Physical MIDI device connection | MIDI-01 | Requires USB-MIDI hardware | Connect Evolver via USB-MIDI adapter, open /instruments/evolver/midi, verify device appears in dropdown |
| Actual SysEx capture from Evolver | MIDI-01 | Requires hardware | Press "Capture Current Patch", verify parameters match Evolver display |
| Actual SysEx send to Evolver | MIDI-04 | Requires hardware | Send stored patch, verify Evolver loads it (check display/sound) |
| Browser permission prompt flow | MIDI-01 | Browser-specific UX | Open MIDI page in Chrome, verify permission prompt appears, grant access |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
