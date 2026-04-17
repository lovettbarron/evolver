---
phase: 26
slug: data-model-content-pipeline
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-17
---

# Phase 26 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 3.x |
| **Config file** | `vitest.config.ts` (jsdom environment, forks pool) |
| **Quick run command** | `npx vitest run src/lib/content/__tests__/` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/lib/content/__tests__/`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 26-01-01 | 01 | 1 | DATA-03 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "SessionSchema"` | ✅ (needs update) | ⬜ pending |
| 26-01-02 | 01 | 1 | DATA-04 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "instrument_type"` | ❌ W0 | ⬜ pending |
| 26-02-01 | 02 | 1 | DATA-01 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -t "ModuleConfigSchema"` | ❌ W0 | ⬜ pending |
| 26-02-02 | 02 | 1 | DATA-02 | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "discoverModules"` | ❌ W0 | ⬜ pending |
| 26-02-03 | 02 | 1 | DATA-05 | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "loadModuleConfig"` | ❌ W0 | ⬜ pending |
| 26-03-01 | 03 | 2 | DATA-06 | smoke | `ls references/maths-*.pdf references/plaits-*.pdf references/beads-*.pdf references/just-friends-*.pdf references/crow-*.pdf references/swells-*.pdf references/ikarie-*.pdf` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Add `modules/` directory with at least one `module.json` to `__fixtures__/` for reader tests
- [ ] Update existing SessionSchema tests to use `section` instead of `module`
- [ ] Add ModuleConfigSchema validation tests (valid, invalid, multi-category, power_specs)
- [ ] Add discoverModules() + loadModuleConfig() tests with fixtures
- [ ] Add instrument_type field tests (default value, eurorack_module value)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Reference PDFs exist | DATA-06 | File download, not code | `ls references/{maths,plaits,beads,just-friends,crow,swells,ikarie}-*.pdf` — all 7 must exist |
| Triple-write sync | DATA-05 | Requires vault path | Verify `modules/` dirs exist in working tree, `src/content/modules/`, and `~/song/modules/` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
