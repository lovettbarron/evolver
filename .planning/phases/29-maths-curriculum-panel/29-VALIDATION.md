---
phase: 29
slug: maths-curriculum-panel
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-18
---

# Phase 29 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
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
| 29-01-01 | 01 | 1 | PANEL-07 | unit | `npx vitest run src/lib/__tests__/maths-panel-data.test.ts` | ❌ W0 (created by task) | ⬜ pending |
| 29-01-02 | 01 | 1 | PANEL-07 | shell | `file references/maths-manual.pdf \| grep -q "PDF"` | N/A | ⬜ pending |
| 29-02-01 | 02 | 1 | CURR-08 | shell | `grep -q "## Architecture" modules/maths/overview.md` | N/A | ⬜ pending |
| 29-02-02 | 02 | 1 | CURR-01, CURR-09 | shell | `ls sessions/maths/*.md \| wc -l \| grep -q "6"` | N/A | ⬜ pending |
| 29-03-01 | 03 | 2 | CURR-01, CURR-09 | shell | `for n in 07 08 09; do diff ... done` | N/A | ⬜ pending |
| 29-03-02 | 03 | 2 | CURR-01, CURR-09 | shell | `ls sessions/maths/*.md \| wc -l \| grep -q "12"` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/__tests__/maths-panel-data.test.ts` — panel data validation (45 controls, section bounds, control types). Created by Plan 29-01 Task 1 via TDD.

*Session validation uses shell verify commands (grep, diff, wc -l) rather than a formal test suite — appropriate for markdown content files.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Panel SVG control positions match physical module | PANEL-07 | Visual alignment requires human judgment | Compare rendered panel against Maths panel photo |
| Session flow and warm-up continuity | CURR-09 | Pedagogical quality is subjective | Read sessions 1-3 in sequence, verify warm-up references previous session |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-18
