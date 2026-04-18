---
phase: 30
slug: plaits-beads-swells-ikarie-curricula-panels
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-18
---

# Phase 30 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run src/lib/__tests__/{module}-panel-data.test.ts` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run relevant Vitest test for the task
- **After every plan wave:** Run `npx vitest run` to verify all panel data and component tests
- **Before `/gsd:verify-work`:** Full Vitest suite must pass, all session files exist in all 3 locations
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| 30-01-T1 | 01 | 1 | CURR-02, PANEL-03 | unit | `npx vitest run src/lib/__tests__/plaits-panel-data.test.ts` | ⬜ pending |
| 30-01-T2 | 01 | 1 | CURR-02 | file-check | `ls sessions/plaits/*.md \| wc -l` (expect 8) | ⬜ pending |
| 30-01-T3 | 01 | 1 | PANEL-03 | unit | `npx vitest run src/components/__tests__/plaits-panel.test.tsx` | ⬜ pending |
| 30-02-T1 | 02 | 2 | CURR-03, PANEL-04 | unit | `npx vitest run src/lib/__tests__/beads-panel-data.test.ts` | ⬜ pending |
| 30-02-T2 | 02 | 2 | CURR-03 | file-check | `ls sessions/beads/*.md \| wc -l` (expect 6) | ⬜ pending |
| 30-02-T3 | 02 | 2 | PANEL-04 | unit | `npx vitest run src/components/__tests__/beads-panel.test.tsx` | ⬜ pending |
| 30-03-T1 | 03 | 3 | CURR-06, PANEL-02 | unit | `npx vitest run src/lib/__tests__/swells-panel-data.test.ts` | ⬜ pending |
| 30-03-T2 | 03 | 3 | CURR-06 | file-check | `ls sessions/swells/*.md \| wc -l` (expect 6) | ⬜ pending |
| 30-03-T3 | 03 | 3 | PANEL-02 | unit | `npx vitest run src/components/__tests__/swells-panel.test.tsx` | ⬜ pending |
| 30-04-T1 | 04 | 4 | CURR-07, PANEL-08 | unit | `npx vitest run src/lib/__tests__/ikarie-panel-data.test.ts` | ⬜ pending |
| 30-04-T2 | 04 | 4 | CURR-07 | file-check | `ls sessions/ikarie/*.md \| wc -l` (expect 5) | ⬜ pending |
| 30-04-T3 | 04 | 4 | PANEL-08 | unit | `npx vitest run src/components/__tests__/ikarie-panel.test.tsx` | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements. Vitest is already configured. Content files and panel components are verified by Vitest unit tests and file existence checks.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Panel controls match physical module | PANEL-02, PANEL-03, PANEL-04, PANEL-08 | Visual inspection against reference photos | Compare SVG panel output with PDF manual diagrams for each module |
| Session content quality | CURR-02, CURR-03, CURR-06, CURR-07 | Subjective quality assessment | Read session content, verify 15-30 min duration, tangible output, warm-up references |
| Triple-write consistency | CURR-02 | File content must be identical across 3 locations | `diff sessions/{module}/01-*.md src/content/sessions/{module}/01-*.md` |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
