---
phase: 31
slug: just-friends-crow
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-19
---

# Phase 31 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.2.4 |
| **Config file** | vitest.config.ts |
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
| 31-W0-01 | W0 | 0 | PANEL-05 | unit | `npx vitest run src/lib/__tests__/just-friends-panel-data.test.ts -x` | ❌ W0 | ⬜ pending |
| 31-W0-02 | W0 | 0 | PANEL-05 | unit | `npx vitest run src/components/__tests__/just-friends-panel.test.tsx -x` | ❌ W0 | ⬜ pending |
| 31-W0-03 | W0 | 0 | PANEL-06 | unit | `npx vitest run src/lib/__tests__/crow-panel-data.test.ts -x` | ❌ W0 | ⬜ pending |
| 31-W0-04 | W0 | 0 | PANEL-06 | unit | `npx vitest run src/components/__tests__/crow-panel.test.tsx -x` | ❌ W0 | ⬜ pending |
| 31-xx-xx | TBD | TBD | CURR-04 | manual | Verify 11 JF session files have valid YAML frontmatter | -- | ⬜ pending |
| 31-xx-xx | TBD | TBD | CURR-05 | manual | Verify 5-6 Crow session files have valid YAML frontmatter | -- | ⬜ pending |
| 31-xx-xx | TBD | TBD | CURR-04 | manual | Check JF sessions cover Shape, Cycle, Sound modes | -- | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/__tests__/just-friends-panel-data.test.ts` — stubs for PANEL-05 data validation
- [ ] `src/components/__tests__/just-friends-panel.test.tsx` — stubs for PANEL-05 component render
- [ ] `src/lib/__tests__/crow-panel-data.test.ts` — stubs for PANEL-06 data validation
- [ ] `src/components/__tests__/crow-panel.test.tsx` — stubs for PANEL-06 component render

*Existing infrastructure (Vitest) covers framework needs.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| JF sessions cover all 3 modes | CURR-04 | Content coverage not automatable | Verify session `section` field: 3 Shape, 3 Cycle, 3 Sound sessions |
| Crow sessions build toward i2c | CURR-05 | Pedagogical progression is subjective | Verify sessions 01-03 are standalone, 04+ are combined |
| Panel controls match physical panel | PANEL-05, PANEL-06 | Visual accuracy requires human review | Compare rendered SVG against panel photo |
| i2c sessions marked as requiring both modules | CURR-05 | Frontmatter convention, not schema-enforced | Check `requires_modules` field in combined session frontmatter |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
