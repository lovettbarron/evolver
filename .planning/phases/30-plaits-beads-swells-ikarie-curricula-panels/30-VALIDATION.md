---
phase: 30
slug: plaits-beads-swells-ikarie-curricula-panels
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-18
---

# Phase 30 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual file verification + Astro build |
| **Config file** | `astro.config.mjs` |
| **Quick run command** | `ls sessions/{module}/*.md \| wc -l` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `ls sessions/{module}/*.md | wc -l` to verify session count
- **After every plan wave:** Run `npm run build` to verify content pipeline
- **Before `/gsd:verify-work`:** Full build must pass, all session files exist in all 3 locations
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 30-01-01 | 01 | 1 | CURR-02 | file-check | `ls sessions/plaits/*.md \| wc -l` | ❌ W0 | ⬜ pending |
| 30-01-02 | 01 | 1 | PANEL-02 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 30-02-01 | 02 | 2 | CURR-03 | file-check | `ls sessions/beads/*.md \| wc -l` | ❌ W0 | ⬜ pending |
| 30-02-02 | 02 | 2 | PANEL-02 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 30-03-01 | 03 | 3 | CURR-06 | file-check | `ls sessions/swells/*.md \| wc -l` | ❌ W0 | ⬜ pending |
| 30-03-02 | 03 | 3 | PANEL-04 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 30-04-01 | 04 | 4 | CURR-07 | file-check | `ls sessions/ikarie/*.md \| wc -l` | ❌ W0 | ⬜ pending |
| 30-04-02 | 04 | 4 | PANEL-08 | build | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements. Content files and panel components are verified by Astro build and file existence checks.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Panel controls match physical module | PANEL-02, PANEL-04, PANEL-08 | Visual inspection against reference photos | Compare SVG panel output with PDF manual diagrams for each module |
| Session content quality | CURR-02, CURR-03, CURR-06, CURR-07 | Subjective quality assessment | Read session content, verify 15-30 min duration, tangible output, warm-up references |
| Triple-write consistency | CURR-02 | File content must be identical across 3 locations | `diff sessions/{module}/01-*.md src/content/sessions/{module}/01-*.md` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
