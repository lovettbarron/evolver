---
phase: 8
slug: cascadia-instrument-data
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-31
---

# Phase 8 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (via package.json) |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 08-01-01 | 01 | 1 | CASC-03 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts` | Partial | ⬜ pending |
| 08-01-02 | 01 | 1 | CASC-03 | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "listModules"` | ❌ W0 | ⬜ pending |
| 08-02-01 | 02 | 2 | CASC-01 | integration | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "listInstrumentFiles"` | Partial | ⬜ pending |
| 08-02-02 | 02 | 2 | CASC-02 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts` | Partial | ⬜ pending |
| 08-03-01 | 03 | 2 | CASC-03 | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "listModules"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/content/__tests__/__fixtures__/instruments/cascadia/modules/` — stubs for 2+ fixture module files
- [ ] `src/lib/content/__tests__/reader.test.ts` — needs `listModules` test cases
- [ ] `src/lib/content/__tests__/schemas.test.ts` — needs tests for `type: 'module'` enum and optional module fields

*Existing infrastructure covers framework and config. Wave 0 adds Cascadia-specific fixtures and test cases.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Module pages render correct content visually | CASC-03 | Visual layout verification | Browse /instruments/cascadia, click each module link, verify controls/jacks/normals display |
| Signal flow narrative is readable and accurate | CASC-02 | Content accuracy vs manual | Compare signal-flow.md content against Cascadia manual diagrams |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
