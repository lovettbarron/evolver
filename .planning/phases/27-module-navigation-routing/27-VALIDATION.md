---
phase: 27
slug: module-navigation-routing
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-17
updated: 2026-04-17
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
| 27-01-01 | 01 | 1 | NAV-05 | grep | `grep -c 'data-instrument=' src/app/globals.css` | N/A (CSS) | ⬜ pending |
| 27-01-02 | 01 | 1 | NAV-03 | unit | `npx vitest run 2>&1 \| tail -5` | ✅ existing | ⬜ pending |
| 27-02-00 | 02 | 1 | NAV-01,NAV-04 | stub | `npx tsc --noEmit` (test stubs compile) | ✅ W0 | ⬜ pending |
| 27-02-01 | 02 | 1 | NAV-01 | unit | `npx vitest run src/components/__tests__/module-card.test.tsx src/components/__tests__/hp-outline.test.tsx` | ✅ W0 | ⬜ pending |
| 27-02-02 | 02 | 1 | NAV-04 | unit | `npx vitest run src/components/__tests__/module-category-tabs.test.tsx` | ✅ W0 | ⬜ pending |
| 27-03-01 | 03 | 2 | NAV-02 | typecheck | `npx tsc --noEmit 2>&1 \| tail -5` | N/A | ⬜ pending |
| 27-03-02 | 03 | 2 | NAV-02 | typecheck+suite | `npx tsc --noEmit && npx vitest run` | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] `src/components/__tests__/hp-outline.test.tsx` — HP outline rendering (NAV-01) — **Plan 27-02, Task 0**
- [x] `src/components/__tests__/module-card.test.tsx` — card rendering (NAV-01) — **Plan 27-02, Task 0**
- [x] `src/components/__tests__/module-category-tabs.test.tsx` — filter logic (NAV-04) — **Plan 27-02, Task 0**

*All Wave 0 stubs are created in Plan 27-02 Task 0, before implementation tasks.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 7 module OKLCH palette blocks produce correct CSS custom properties and meet WCAG AA | NAV-05 | CSS custom property values require visual inspection and contrast checking | Inspect each `[data-instrument="<slug>"]` block in globals.css; verify hue/chroma/lightness match UI-SPEC values; spot-check contrast ratios |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 15s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved (revised 2026-04-17)
