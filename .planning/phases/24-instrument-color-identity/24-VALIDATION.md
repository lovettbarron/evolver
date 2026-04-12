---
phase: 24
slug: instrument-color-identity
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-12
---

# Phase 24 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 3.0.0 + @testing-library/react 16.3.2 |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run src/app/__tests__/tokens.test.ts --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/app/__tests__/tokens.test.ts --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 24-01-01 | 01 | 1 | COLOR-01 | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | ✅ (needs update) | ⬜ pending |
| 24-01-02 | 01 | 1 | COLOR-02 | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | ❌ W0 | ⬜ pending |
| 24-01-03 | 01 | 1 | COLOR-03 | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | ✅ (needs update) | ⬜ pending |
| 24-01-04 | 01 | 1 | COLOR-04 | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | ❌ W0 | ⬜ pending |
| 24-01-05 | 01 | 1 | COLOR-05 | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | ❌ W0 | ⬜ pending |
| 24-01-06 | 01 | 1 | COLOR-06 | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | ✅ (partial) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Update `src/app/__tests__/tokens.test.ts` — remove lime-specific assertions, add per-instrument cascade tests
- [ ] Add WCAG contrast estimation tests for all accent/bg combinations
- [ ] Add per-instrument `--color-param` override assertions
- [ ] No new test files needed — all validation fits in existing token test file

*Existing infrastructure covers framework setup; only test content updates needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Evolver blue looks visually appropriate | COLOR-02 | Aesthetic judgment — OKLCH values may pass WCAG but look wrong against olive bg | Open Evolver session page, compare blue accent against physical panel photo |
| Cascadia gray has sufficient visual weight | COLOR-03 | Gray accents risk looking disabled/muted | Open Cascadia session page, verify buttons and links draw attention |
| Home page neutral feels hardware-appropriate | COLOR-01 | Brand identity judgment | Open home page, verify accent feels "aluminum/eurorack" not "washed out" |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
