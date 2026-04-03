---
phase: 12
slug: evolver-panel-visualizer-component
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-03
---

# Phase 12 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 3.0.0 + @testing-library/react 16.3.2 |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run src/components/__tests__/evolver-panel.test.tsx` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run src/components/__tests__/evolver-panel.test.tsx`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 12-01-01 | 01 | 1 | D-01 | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "renders"` | ❌ W0 | ⬜ pending |
| 12-01-02 | 01 | 1 | D-02 | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "rotation"` | ❌ W0 | ⬜ pending |
| 12-01-03 | 01 | 1 | D-04 | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "glow"` | ❌ W0 | ⬜ pending |
| 12-01-04 | 01 | 1 | D-05 | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "tooltip"` | ❌ W0 | ⬜ pending |
| 12-01-05 | 01 | 1 | D-06 | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "section"` | ❌ W0 | ⬜ pending |
| 12-01-06 | 01 | 1 | D-10 | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "drag"` | ❌ W0 | ⬜ pending |
| 12-01-07 | 01 | 1 | D-12 | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -t "nrpn"` | ❌ W0 | ⬜ pending |
| 12-META | 01 | 1 | META | unit | `npx vitest run src/lib/__tests__/evolver-panel-data.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/__tests__/evolver-panel.test.tsx` — stubs for D-01, D-02, D-04, D-05, D-06, D-10, D-12
- [ ] `src/lib/__tests__/evolver-panel-data.test.ts` — metadata completeness checks

*Existing infrastructure covers test framework (vitest + testing-library already installed).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Knob drag feels responsive | D-10 | Subjective UX quality | Drag 3+ knobs in standalone route, verify smooth rotation with no visible lag |
| Tooltip positioning correct | D-05, D-12 | Visual positioning depends on viewport | Hover controls in all 4 integration contexts, verify tooltip centered above control |
| Collapsible sidebar animation | D-08 | Visual transition quality | Toggle sidebar 5+ times, verify smooth 200ms width transition |
| Glow ring visual appearance | D-04 | SVG filter rendering is browser-dependent | Check glow rings in Chrome and Safari, verify blur is visible and not clipped |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
