---
phase: 18
slug: token-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-07
---

# Phase 18 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.0.0 |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 18-01-01 | 01 | 0 | TOKEN-01, TOKEN-05 | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | ❌ W0 | ⬜ pending |
| 18-01-02 | 01 | 0 | TOKEN-03 | unit (grep) | `npx vitest run src/app/__tests__/spacing-migration.test.ts -x` | ❌ W0 | ⬜ pending |
| 18-01-03 | 01 | 0 | TOKEN-04 | unit | `npx vitest run scripts/__tests__/validate-contrast.test.ts -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/app/__tests__/tokens.test.ts` — test that token CSS variables are defined with OKLCH values and correct hue angle; covers TOKEN-01, TOKEN-05
- [ ] `src/app/__tests__/spacing-migration.test.ts` — grep-based test ensuring no `p-[0-9]` / `gap-[0-9]` etc. remain in component files (excluding panels); covers TOKEN-03
- [ ] `scripts/__tests__/validate-contrast.test.ts` — test that contrast validation script correctly computes ratios and all pairings pass AA; covers TOKEN-04
- [ ] `scripts/validate-contrast.mjs` — the contrast validation script itself

*All Wave 0 items must be created before any implementation tasks begin.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Warm olive tone is visually distinct from cold gray | TOKEN-05 | Perceptual warmth requires human eye | Compare screenshots before/after — surfaces should feel warm/organic, not neutral |
| Grain texture is subtle, not noisy | TOKEN-01 | Perceptual quality at 0.02-0.05 opacity | View in browser at 100% zoom — texture should be barely perceptible |
| Spacing rhythm feels consistent across pages | TOKEN-03 | Gestalt rhythm is subjective | Navigate all main views — padding/margins should feel uniform |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
