---
phase: 7
slug: multi-instrument-ui-schema-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-31
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 0 | MULTI-01 | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "loadInstrumentConfig"` | ❌ W0 | ⬜ pending |
| 07-01-02 | 01 | 0 | MULTI-04 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "InstrumentConfigSchema"` | ❌ W0 | ⬜ pending |
| 07-01-03 | 01 | 0 | MULTI-04 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "PatchSchema"` | ✅ needs cases | ⬜ pending |
| 07-01-04 | 01 | 0 | MULTI-03 | unit | `npx vitest run src/app/__tests__/midi-capability.test.tsx` | ❌ W0 | ⬜ pending |
| 07-02-01 | 02 | 1 | MULTI-01 | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "loadInstrumentConfig"` | ❌ W0 | ⬜ pending |
| 07-02-02 | 02 | 1 | MULTI-02 | unit | `npx vitest run src/app/__tests__/home.test.tsx` | ✅ needs update | ⬜ pending |
| 07-03-01 | 03 | 2 | CASC-04 | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "loadInstrumentConfig"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/content/__tests__/reader.test.ts` — add `loadInstrumentConfig()` tests with Cascadia/Evolver fixtures
- [ ] `src/lib/content/__tests__/schemas.test.ts` — add `InstrumentConfigSchema` validation tests + PatchSchema cable_routing/knob_settings stubs
- [ ] `src/app/__tests__/midi-capability.test.tsx` — capability-gated MIDI page rendering tests
- [ ] `__fixtures__/instruments/cascadia/instrument.json` — Cascadia test fixture
- [ ] `__fixtures__/instruments/evolver/instrument.json` — Evolver test fixture

*Existing infrastructure covers framework install. Only test stubs needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Nav instrument switcher dropdown interaction | MULTI-01 | Client-side dropdown state + pathname routing | Open app, click instrument name in nav, verify dropdown shows both instruments, select Cascadia, verify nav links update |
| Landing page instrument card visual layout | MULTI-02 | Visual styling verification | Open `/`, verify cards show for both instruments with display_name, tagline, counts |
| PDF viewer opens Cascadia manual | CASC-04 | E2E browser interaction | Navigate to Cascadia overview, click reference PDF link, verify PDF viewer opens with correct document |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
