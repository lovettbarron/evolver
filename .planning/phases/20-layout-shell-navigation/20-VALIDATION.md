---
phase: 20
slug: layout-shell-navigation
status: draft
nyquist_compliant: false
wave_0_complete: false
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

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 20-01-01 | 01 | 1 | LAYOUT-01 | visual/manual | Browser check | N/A | ⬜ pending |
| 20-01-02 | 01 | 1 | LAYOUT-01 | visual/manual | Browser check | N/A | ⬜ pending |
| 20-02-01 | 02 | 1 | LAYOUT-02 | visual/manual | Browser check | N/A | ⬜ pending |
| 20-02-02 | 02 | 1 | LAYOUT-03 | visual/manual | Browser check | N/A | ⬜ pending |
| 20-03-01 | 03 | 2 | LAYOUT-04 | unit | `npx vitest run` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Existing infrastructure covers most phase requirements — layout/navigation is primarily visual
- [ ] Component render tests may be added for instrument context detection

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Nav bar has visual weight and brand expression | LAYOUT-01 | Subjective visual design quality | Open app, verify nav is not a minimal strip, has clear active states |
| Session pages use narrow width, grid pages use wider | LAYOUT-02 | Responsive layout verification | Resize browser, check session vs patches page widths |
| Footer shows project identity and instrument links | LAYOUT-03 | Visual presence check | Scroll to bottom, verify footer content |
| Evolver vs Cascadia pages have distinct accent colors | LAYOUT-04 | Visual differentiation check | Navigate between /evolver and /cascadia routes, verify color variation |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
