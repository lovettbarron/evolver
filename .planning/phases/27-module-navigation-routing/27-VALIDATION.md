---
phase: 27
slug: module-navigation-routing
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-17
---

# Phase 27 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (existing) |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 27-01-01 | 01 | 1 | NAV-01 | integration | `npx vitest run src/app/modules/` | ❌ W0 | ⬜ pending |
| 27-01-02 | 01 | 1 | NAV-04 | unit | `npx vitest run src/components/module-category-tabs` | ❌ W0 | ⬜ pending |
| 27-02-01 | 02 | 1 | NAV-02 | integration | `npx vitest run src/app/modules/` | ❌ W0 | ⬜ pending |
| 27-02-02 | 02 | 1 | NAV-03 | unit | `npx vitest run src/components/nav` | ❌ W0 | ⬜ pending |
| 27-03-01 | 03 | 1 | NAV-05 | manual-only | Visual inspection — CSS custom properties in globals.css | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/app/modules/__tests__/` — test directory for module routes (NAV-01, NAV-02)
- [ ] `src/components/__tests__/module-category-tabs.test.tsx` — filter logic (NAV-04)
- [ ] `src/components/__tests__/module-card.test.tsx` — card rendering (NAV-01)

*Existing infrastructure covers test framework — only test file stubs needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 7 module OKLCH palette blocks produce correct CSS custom properties and meet WCAG AA | NAV-05 | CSS custom property values require visual inspection and contrast checking | Inspect each `[data-instrument="<slug>"]` block in globals.css; verify hue/chroma/lightness match UI-SPEC values; spot-check contrast ratios |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
