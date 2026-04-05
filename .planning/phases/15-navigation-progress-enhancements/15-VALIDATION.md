---
phase: 15
slug: navigation-progress-enhancements
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-05
---

# Phase 15 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | jest 29.x |
| **Config file** | jest.config.ts |
| **Quick run command** | `npx jest --testPathPattern='src/' --bail` |
| **Full suite command** | `npx jest` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx jest --testPathPattern='src/' --bail`
- **After every plan wave:** Run `npx jest`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 15-01-01 | 01 | 1 | NAV-02 | unit | `npx jest --testPathPattern='session-state'` | ❌ W0 | ⬜ pending |
| 15-01-02 | 01 | 1 | NAV-02 | unit | `npx jest --testPathPattern='session-row'` | ❌ W0 | ⬜ pending |
| 15-02-01 | 02 | 1 | PROG-10 | unit | `npx jest --testPathPattern='count-card'` | ❌ W0 | ⬜ pending |
| 15-02-02 | 02 | 1 | PROG-11 | unit | `npx jest --testPathPattern='module-journey'` | ❌ W0 | ⬜ pending |
| 15-03-01 | 03 | 2 | PROG-12 | unit | `npx jest --testPathPattern='practice-metrics'` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Test stubs for prerequisite state derivation (getSessionState, getCurrentModule)
- [ ] Test stubs for cumulative metrics computation (sessionsThisMonth, activeWeeks)
- [ ] Test stubs for count card navigation targets

*Existing test infrastructure (jest.config.ts, test utils) covers framework needs.*

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

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
