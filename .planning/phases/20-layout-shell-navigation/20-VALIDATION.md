---
phase: 20
slug: layout-shell-navigation
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-10
---

# Phase 20 — Validation Strategy

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

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| 20-01-01 | 01 | 1 | LAYOUT-01 | grep | `grep -n "nav-height\|content-wide.*1200\|accent-cascadia\|scroll-padding-top.*60\|data-instrument.*cascadia" src/app/globals.css` | pending |
| 20-01-02 | 01 | 1 | LAYOUT-01 | unit | `npx vitest run src/components/__tests__/nav.test.tsx -x` | pending |
| 20-02-01 | 02 | 1 | LAYOUT-02, LAYOUT-03 | unit | `npx vitest run src/components/__tests__/page-shell.test.tsx src/components/__tests__/footer.test.tsx -x` | pending |
| 20-02-02 | 02 | 1 | LAYOUT-03 | grep | `grep -n "import.*Footer.*from\|<Footer\|footerInstruments" src/components/app-shell.tsx` | pending |
| 20-03-01 | 03 | 2 | LAYOUT-02 | unit | `npx vitest run src/components/__tests__/nav.test.tsx -x` | pending |
| 20-03-02 | 03 | 2 | LAYOUT-04 | unit | `npx vitest run src/components/__tests__/app-shell.test.tsx -x` | pending |
| 20-03-03 | 03 | 2 | LAYOUT-02 | grep+build | `grep -rn "import.*NarrowShell\|import.*WideShell" src/app/about/page.tsx src/app/instruments/\[slug\]/patches/page.tsx src/components/session-detail.tsx src/components/module-index.tsx && npx next build` | pending |
| 20-03-04 | 03 | 2 | ALL | visual | `npx vitest run && npx next build` + human checkpoint | pending |

*Status: pending / green / red / flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. Component render tests are created inline with their tasks (nav.test.tsx, footer.test.tsx, page-shell.test.tsx, app-shell.test.tsx).

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Nav bar has visual weight and brand expression | LAYOUT-01 | Subjective visual design quality | Open app, verify nav is not a minimal strip, has clear active states |
| Session pages use narrow width, grid pages use wider | LAYOUT-02 | Responsive layout verification | Compare session detail (720px) to patches page (1200px) — visible width difference |
| Footer shows project identity and instrument links | LAYOUT-03 | Visual presence check | Scroll to bottom, verify footer content |
| Evolver vs Cascadia pages have distinct accent colors | LAYOUT-04 | Visual differentiation check | Navigate between /evolver and /cascadia routes, verify color variation |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 10s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending execution
