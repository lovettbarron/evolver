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
| 14-01-01 | 01 | 1 | LSTATE-01 | unit | `npx vitest run src/lib/__tests__/learner-store.test.ts` | ❌ W0 | ⬜ pending |
| 14-01-02 | 01 | 1 | LSTATE-02 | unit | `npx vitest run src/lib/__tests__/learner-store.test.ts` | ❌ W0 | ⬜ pending |
| 14-01-03 | 01 | 1 | LSTATE-03 | unit | `npx vitest run src/lib/__tests__/learner-store.test.ts` | ❌ W0 | ⬜ pending |
| 14-02-01 | 02 | 2 | LSTATE-04 | unit | `npx vitest run src/components/__tests__/resume-bar.test.tsx` | ❌ W0 | ⬜ pending |
| 14-02-02 | 02 | 2 | NAV-01 | unit | `npx vitest run src/components/__tests__/session-completion.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/__tests__/learner-store.test.ts` — Zustand store unit tests for completions, last-visited, merge logic
- [ ] `src/components/__tests__/resume-bar.test.tsx` — Resume bar component rendering tests
- [ ] `src/components/__tests__/session-completion.test.tsx` — Completion toggle component tests

*If none: "Existing infrastructure covers all phase requirements."*

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
