---
phase: 15
slug: navigation-progress-enhancements
status: final
nyquist_compliant: true
wave_0_complete: false
created: 2026-04-05
---

# Phase 15 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x with jsdom |
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
| 15-01-01 | 01 | 1 | NAV-02 | unit | `npx vitest run src/lib/__tests__/prerequisite.test.ts -x` | W0 | pending |
| 15-01-02 | 01 | 1 | NAV-02 | unit | `npx vitest run src/components/__tests__/session-row.test.tsx -x` | W0 | pending |
| 15-01-03 | 01 | 1 | NAV-02 | unit | `npx vitest run src/components/__tests__/prerequisite-banner.test.tsx -x` | W0 | pending |
| 15-02-01 | 02 | 1 | PROG-10 | unit | `npx vitest run src/components/__tests__/count-card.test.tsx -x` | W0 | pending |
| 15-02-02 | 02 | 1 | PROG-12 | unit | `npx vitest run src/lib/__tests__/practice-metrics.test.ts -x` | W0 | pending |
| 15-02-03 | 02 | 1 | PROG-12 | unit | `npx vitest run src/components/__tests__/cumulative-metrics.test.tsx -x` | W0 | pending |
| 15-03-01 | 03 | 2 | PROG-11 | unit | `npx vitest run src/components/__tests__/module-journey.test.tsx -x` | W0 | pending |
| 15-03-02 | 03 | 2 | PROG-11 | build | `npx vitest run --reporter=verbose && npx next build 2>&1 \| tail -5` | n/a | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/__tests__/prerequisite.test.ts` -- covers NAV-02, PROG-11 (getSessionState, getCurrentModule)
- [ ] `src/components/__tests__/session-row.test.tsx` -- covers NAV-02 (badge rendering)
- [ ] `src/components/__tests__/prerequisite-banner.test.tsx` -- covers NAV-02 (banner content, dismiss)
- [ ] `src/components/__tests__/count-card.test.tsx` -- covers PROG-10 (Link wrapping)
- [ ] `src/lib/__tests__/practice-metrics.test.ts` -- covers PROG-12 (date computations)
- [ ] `src/components/__tests__/cumulative-metrics.test.tsx` -- covers PROG-12 (render)
- [ ] `src/components/__tests__/module-journey.test.tsx` -- covers PROG-11 (pulse class)

*Existing test infrastructure (vitest.config.ts, test utils) covers framework needs.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Pulsing dot animation | PROG-11 | CSS animation visual | Inspect ModuleJourney, verify pulsing dot on current module |
| Count card hover lift | PROG-10 | CSS transition visual | Hover each count card, verify shadow + translateY |
| Prerequisite banner dismiss | NAV-02 | User interaction flow | Navigate to locked session, verify banner, click X to dismiss |
| prefers-reduced-motion | PROG-11 | Accessibility | Enable reduced motion in OS, verify no pulsing animation |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved
