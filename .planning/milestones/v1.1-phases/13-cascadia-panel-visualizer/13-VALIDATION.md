---
phase: 13
slug: cascadia-panel-visualizer
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-04
---

# Phase 13 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 13-01-01 | 01 | 1 | SVG panel | unit | `npx vitest run` | ❌ W0 | ⬜ pending |
| 13-02-01 | 02 | 1 | control metadata | unit | `npx vitest run` | ❌ W0 | ⬜ pending |
| 13-03-01 | 03 | 2 | React component | unit | `npx vitest run` | ❌ W0 | ⬜ pending |
| 13-04-01 | 04 | 3 | session embedding | integration | `npx vitest run` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Test stubs for SVG rendering, control metadata parsing, React component, and session embedding
- [ ] Shared fixtures for Cascadia control data and mock panel state

*Existing vitest infrastructure from Phase 12 covers framework setup.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| SVG visual fidelity | Panel layout | Visual comparison required | Compare rendered SVG against Cascadia panel photo |
| Cable path rendering | Patch cable display | Visual bezier curve accuracy | Verify cable paths connect correct jacks with proper colors |
| Slider drag interaction | Slider controls | Browser interaction | Drag slider elements, verify value updates |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
