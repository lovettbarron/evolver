---
phase: 29
slug: maths-curriculum-panel
status: draft
nyquist_compliant: false
wave_0_complete: false
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
| 29-01-01 | 01 | 1 | PANEL-07 | unit | `npx vitest run src/components/__tests__/maths-panel.test.tsx` | ❌ W0 | ⬜ pending |
| 29-02-01 | 02 | 1 | CURR-01, CURR-08 | unit | `npx vitest run src/content/__tests__/maths-sessions.test.ts` | ❌ W0 | ⬜ pending |
| 29-03-01 | 03 | 2 | CURR-09 | manual | visual inspection | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/__tests__/maths-panel.test.tsx` — panel control rendering, control count, section bounds
- [ ] `src/content/__tests__/maths-sessions.test.ts` — session schema validation, frontmatter checks

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Panel SVG control positions match physical module | PANEL-07 | Visual alignment requires human judgment | Compare rendered panel against Maths panel photo |
| Session flow and warm-up continuity | CURR-09 | Pedagogical quality is subjective | Read sessions 1-3 in sequence, verify warm-up references previous session |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
