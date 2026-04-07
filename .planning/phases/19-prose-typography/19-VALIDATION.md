---
phase: 19
slug: prose-typography
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-07
---

# Phase 19 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run test` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build` (validates CSS imports, font loading, no build errors)
- **After every plan wave:** Run `npm run test` (full suite)
- **Before `/gsd:verify-work`:** Full suite must be green + visual inspection of 3+ session pages, 2+ patch pages, quick-ref panel
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 19-01-01 | 01 | 1 | TOKEN-02 | visual / manual | Manual browser inspection | N/A -- CSS-only | ⬜ pending |
| 19-01-02 | 01 | 1 | CONTENT-01 | smoke | `npm run build` | N/A -- CSS-only | ⬜ pending |
| 19-01-03 | 01 | 1 | CONTENT-01 | regression | `npm run test -- --run src/components/__tests__/quick-ref-panel.test.tsx` | ✅ | ⬜ pending |
| 19-01-04 | 01 | 1 | CONTENT-01 | unit | `npm run test -- --run src/components/__tests__/session-detail.test.tsx` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No new test files needed.

- Existing component tests verify `.prose` class application on content containers
- Build validation catches CSS import and font loading errors
- Visual inspection required for typography and domain element styling

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Modular type scale with distinct typefaces | TOKEN-02 | CSS visual property -- no DOM assertion captures perceived hierarchy | Open 3+ session pages, verify h1/h2 in Space Grotesk, h3/h4 in Inter bold, body in Inter regular |
| Callout type differentiation | CONTENT-01 | Color per callout type is visual | Find sessions with challenge/tip/warning callouts, verify distinct border colors |
| Param table inline accent border | CONTENT-01 | Layout treatment is visual | Open sessions with param tables, verify accent left border and inline flow |
| Consistent prose across 60+ sessions | CONTENT-01 | Requires sampling multiple content files | Browse 5+ sessions across different modules, verify no unstyled elements |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
