---
phase: 2
slug: session-browser
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-29
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 3.x (already configured) |
| **Config file** | `vitest.config.ts` (exists, globals enabled) |
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
| 02-01-01 | 01 | 0 | SESS-01 | unit | `npx vitest run src/lib/__tests__/sessions.test.ts -t "groupByModule"` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 0 | SESS-02 | integration | `npx vitest run src/components/__tests__/session-detail.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 0 | SESS-03 | integration | `npx vitest run src/app/__tests__/home.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-04 | 01 | 0 | SESS-04 | integration | `npx vitest run src/components/__tests__/quick-ref-panel.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-05 | 01 | 0 | SESS-05 | unit | `npx vitest run src/components/__tests__/source-ref.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-06 | 01 | 0 | INST-01 | smoke | `npx vitest run src/app/__tests__/routing.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-07 | 01 | 0 | INST-02 | integration | `npx vitest run src/app/__tests__/instrument-overview.test.tsx` | ❌ W0 | ⬜ pending |
| 02-01-08 | 01 | 0 | INST-03 | integration | `npx vitest run src/app/__tests__/about.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` update — add jsdom environment for component tests, add `@vitejs/plugin-react` for JSX
- [ ] `@testing-library/react` + `@testing-library/jest-dom` — dependencies for component testing
- [ ] `src/lib/__tests__/sessions.test.ts` — stubs for SESS-01 (groupByModule, getAdjacentSessions helpers)
- [ ] Component test files for SESS-02 through INST-03 (listed in map above)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dark editorial aesthetic looks correct | UI-SPEC | Visual design is subjective | Open app in browser, verify near-black background, typography hierarchy, accent color usage |
| Slide-out panel animation is smooth | SESS-04 | Animation quality is perceptual | Open quick-ref panel on desktop and mobile, verify 200ms ease-out |
| "Next session" hero is immediately clear | SESS-03 | 5-second comprehension is subjective | Open landing page, time yourself — is the action obvious within 5 seconds? |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
