---
phase: 22
slug: interactive-elements-motion
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-11
---

# Phase 22 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 3.0.0 + @testing-library/react 16.3.2 |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run && npm run build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` + relevant vitest files
- **After every plan wave:** Run `npx vitest run && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 22-00-01 | 00 | 0 | COMP-03, COMP-04 | unit stubs | `ls src/components/__tests__/{spring-card,completion-celebration,scroll-reveal,stagger-group,reduced-motion}.test.tsx` | Wave 0 creates | ⬜ pending |
| 22-01-01 | 01 | 1 | COMP-03 | unit + build | `npx vitest run src/components/__tests__/spring-card.test.tsx src/components/__tests__/reduced-motion.test.tsx && npm run build` | ✅ (from Wave 0) | ⬜ pending |
| 22-01-02 | 01 | 1 | COMP-03 | unit + build | `npx vitest run src/components/__tests__/spring-card.test.tsx src/components/__tests__/reduced-motion.test.tsx && npm run build` | ✅ (from Wave 0) | ⬜ pending |
| 22-02-01 | 02 | 2 | COMP-04 | unit + build | `npx vitest run src/components/__tests__/scroll-reveal.test.tsx src/components/__tests__/stagger-group.test.tsx src/components/__tests__/reduced-motion.test.tsx && npm run build` | ✅ (from Wave 0) | ⬜ pending |
| 22-02-02 | 02 | 2 | COMP-03 | unit + build | `npx vitest run src/components/__tests__/completion-celebration.test.tsx src/components/__tests__/reduced-motion.test.tsx && npm run build` | ✅ (from Wave 0) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] Plan 22-00-PLAN.md creates 5 test stub files:
  - `src/components/__tests__/spring-card.test.tsx` — COMP-03a
  - `src/components/__tests__/completion-celebration.test.tsx` — COMP-03b, COMP-03c
  - `src/components/__tests__/scroll-reveal.test.tsx` — COMP-04a
  - `src/components/__tests__/stagger-group.test.tsx` — COMP-04b
  - `src/components/__tests__/reduced-motion.test.tsx` — D-09
- [ ] `motion@^12.38.0` — installed by plan 22-01 Task 1
- [ ] Verify `npm run build` passes before any changes

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Spring hover on cards | COMP-03 | Visual spring physics require human eye | Hover over each card type, verify smooth spring lift + shadow |
| Scroll reveal fade-up | COMP-04 | Scroll behavior is visual/temporal | Scroll down page, verify content fades in smoothly |
| Completion celebration | COMP-03 | Animation timing is subjective | Toggle session complete, verify check spring + color pulse |
| prefers-reduced-motion | COMP-03, COMP-04 | OS setting + visual check | Enable reduced motion in OS, verify zero animation |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify with vitest unit commands
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (22-00-PLAN.md creates stubs)
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved
