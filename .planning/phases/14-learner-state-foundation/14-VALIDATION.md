---
phase: 14
slug: learner-state-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-05
---

# Phase 14 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run --reporter=verbose` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 14-01-01 | 01 | 1 | LSTATE-04 | unit | `npx vitest run src/stores/learner-store.test.ts` | W0 | pending |
| 14-01-02 | 01 | 1 | LSTATE-03 | unit | `npx vitest run src/lib/learner-utils.test.ts` | W0 | pending |
| 14-02-01 | 02 | 2 | LSTATE-01 | unit+tsc | `npx vitest run src/components/completion-toggle.test.tsx && npx tsc --noEmit` | W0 | pending |
| 14-03-01 | 03 | 2 | NAV-01 | unit+tsc | `npx vitest run src/components/resume-bar.test.tsx && npx tsc --noEmit` | W0 | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

- [ ] `src/stores/learner-store.test.ts` — Zustand store unit tests for completions, last-visited (created by Plan 14-01 Task 1)
- [ ] `src/lib/learner-utils.test.ts` — Merge and next-session computation tests (created by Plan 14-01 Task 2)
- [ ] `src/components/completion-toggle.test.tsx` — Completion toggle component tests (created by Plan 14-02 Task 2)
- [ ] `src/components/resume-bar.test.tsx` — Resume bar component rendering tests (created by Plan 14-03 Task 2)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| localStorage persists across browser restart | LSTATE-01 | Requires real browser session lifecycle | 1. Toggle session complete 2. Close browser 3. Reopen — verify completion persists |
| Resume bar shows correct next session | NAV-01 | Requires visual verification of recommendation logic | 1. Complete sessions 1-3 2. Verify resume bar recommends session 4 |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
