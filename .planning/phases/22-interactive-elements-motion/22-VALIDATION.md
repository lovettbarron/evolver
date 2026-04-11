---
phase: 22
slug: interactive-elements-motion
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 22 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (if installed) or manual browser verification |
| **Config file** | none — Wave 0 installs if needed |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 22-01-01 | 01 | 1 | COMP-03 | build | `npm run build` | ✅ | ⬜ pending |
| 22-01-02 | 01 | 1 | COMP-03 | manual | browser hover test | N/A | ⬜ pending |
| 22-02-01 | 02 | 1 | COMP-04 | build | `npm run build` | ✅ | ⬜ pending |
| 22-02-02 | 02 | 1 | COMP-04 | manual | browser scroll test | N/A | ⬜ pending |
| 22-03-01 | 03 | 2 | COMP-03 | build | `npm run build` | ✅ | ⬜ pending |
| 22-03-02 | 03 | 2 | COMP-03 | manual | browser completion toggle | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `motion@^12.38.0` — install motion package (not yet in project)
- [ ] Verify `npm run build` passes before any changes

*Existing build infrastructure covers automated verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Spring hover on cards | COMP-03 | Visual spring physics require human eye | Hover over each card type, verify smooth spring lift + shadow |
| Scroll reveal fade-up | COMP-04 | Scroll behavior is visual/temporal | Scroll down page, verify content fades in smoothly |
| Completion celebration | COMP-03 | Animation timing is subjective | Toggle session complete, verify check spring + color pulse |
| prefers-reduced-motion | COMP-03, COMP-04 | OS setting + visual check | Enable reduced motion in OS, verify zero animation |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
