---
phase: 16
slug: search-filtering
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-06
---

# Phase 16 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest + jsdom |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run src/lib/__tests__/search.test.ts -x` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/lib/__tests__/search.test.ts -x`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 16-01-01 | 01 | 0 | NAV-03 | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "session search" -x` | ❌ W0 | ⬜ pending |
| 16-01-02 | 01 | 0 | NAV-03 | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "patch search" -x` | ❌ W0 | ⬜ pending |
| 16-01-03 | 01 | 0 | NAV-03 | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "instrument scope" -x` | ❌ W0 | ⬜ pending |
| 16-01-04 | 01 | 0 | NAV-03 | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "case insensitive" -x` | ❌ W0 | ⬜ pending |
| 16-01-05 | 01 | 0 | NAV-04 | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "type filter" -x` | ❌ W0 | ⬜ pending |
| 16-01-06 | 01 | 0 | NAV-04 | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "tag filter" -x` | ❌ W0 | ⬜ pending |
| 16-01-07 | 01 | 0 | NAV-04 | unit | `npx vitest run src/lib/__tests__/search.test.ts -t "sort" -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/__tests__/search.test.ts` — stubs for all NAV-03 and NAV-04 search/filter/sort logic
- [ ] `src/lib/search.ts` — pure function module (testable without DOM)

*Existing infrastructure (Vitest + jsdom) covers the test framework need.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Search dropdown appears on focus | NAV-03 | Visual interaction / z-index | Focus search input, verify dropdown appears overlaying page content |
| Filter pills toggle visually | NAV-04 | CSS state changes | Click type pills, verify active/inactive visual states |
| Keyboard navigation in dropdown | NAV-03 | Interaction flow | Press `/`, type query, use arrow keys, press Enter to navigate |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
