---
phase: 32
slug: progress-demo-cross-module-polish
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-19
---

# Phase 32 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest (installed, configured) |
| **Config file** | `vitest.config.ts` |
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
| 32-01-01 | 01 | 0 | XMOD-01 | unit | `npx vitest run src/lib/__tests__/cross-references.test.ts -x` | ❌ W0 | ⬜ pending |
| 32-01-02 | 01 | 0 | XMOD-02 | unit | `npx vitest run src/lib/__tests__/category-suggestions.test.ts -x` | ❌ W0 | ⬜ pending |
| 32-01-03 | 01 | 0 | XMOD-01 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts -x` | ✅ extend | ⬜ pending |
| 32-01-04 | 01 | 0 | PROG-01 | unit | `npx vitest run src/stores/learner-store.test.ts -x` | ✅ extend | ⬜ pending |
| 32-01-05 | 01 | 0 | PROG-03 | unit | `npx vitest run src/lib/progress.test.ts -x` | ✅ extend | ⬜ pending |
| 32-02-xx | 02 | 1 | PROG-01 | unit | `npx vitest run src/stores/learner-store.test.ts -x` | ✅ | ⬜ pending |
| 32-02-xx | 02 | 1 | PROG-02 | unit | `npx vitest run src/lib/__tests__/prerequisite.test.ts -x` | ✅ | ⬜ pending |
| 32-03-xx | 03 | 1 | XMOD-01 | unit | `npx vitest run src/lib/__tests__/cross-references.test.ts -x` | ❌ W0 | ⬜ pending |
| 32-04-xx | 04 | 2 | PROG-03 | unit | `npx vitest run src/lib/progress.test.ts -x` | ✅ extend | ⬜ pending |
| 32-05-xx | 05 | 2 | XMOD-02 | unit | `npx vitest run src/lib/__tests__/category-suggestions.test.ts -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/__tests__/cross-references.test.ts` — stubs for XMOD-01 bidirectional resolution
- [ ] `src/lib/__tests__/category-suggestions.test.ts` — stubs for XMOD-02 grouping logic
- [ ] Extend `src/lib/content/__tests__/schemas.test.ts` — SessionSchema with `cross_references`
- [ ] Extend `src/stores/learner-store.test.ts` — module slug keying
- [ ] Extend `src/lib/progress.test.ts` — `getSyntheticCompletedSessions('maths')` and `('plaits')` branches

*Existing infrastructure covers framework installation.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Completion toggle UI updates in browser | PROG-01 | Visual + interaction | Click toggle on module session page, verify state persists on reload |
| Prerequisite badge visual states | PROG-02 | CSS rendering | View module session list with locked/available/completed sessions |
| Cross-reference card layout | XMOD-01 | Visual layout | Navigate to session with cross-refs, verify card renders at bottom |
| Category suggestions layout | XMOD-02 | Visual layout | View module overview, verify category groups appear |
| Demo mode synthetic journey | PROG-03 | Visual + data flow | Enable demo mode, verify Maths/Plaits show realistic progress |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
