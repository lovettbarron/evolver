---
phase: 9
slug: patch-documentation-demo-patches
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-31
---

# Phase 9 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run --reporter=verbose` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 09-01-01 | 01 | 1 | CPATCH-01 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts` | ✅ | ⬜ pending |
| 09-01-02 | 01 | 1 | CPATCH-02 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts` | ✅ | ⬜ pending |
| 09-02-01 | 02 | 2 | CPATCH-03 | manual | N/A — visual rendering | ❌ | ⬜ pending |
| 09-02-02 | 02 | 2 | CPATCH-04 | manual | N/A — visual rendering | ❌ | ⬜ pending |
| 09-03-01 | 03 | 2 | CPATCH-05 | unit | `grep -r 'audio_preview' src/content/patches/cascadia/` | ❌ | ⬜ pending |
| 09-03-02 | 03 | 2 | CPATCH-06 | unit | `ls src/content/patches/cascadia/*.md \| wc -l` | ❌ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. Vitest and schema tests already exist.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Cable routing renders as list | CPATCH-03 | Visual rendering | Visit /instruments/cascadia/patches/{id}, verify cable rows display |
| Knob settings render grouped | CPATCH-04 | Visual rendering | Visit /instruments/cascadia/patches/{id}, verify module-grouped tables |
| Mermaid diagram toggles | CPATCH-03 | Interactive behavior | Click "Show Diagram", verify Mermaid flowchart appears |
| Audio placeholder shows | CPATCH-05 | Visual rendering | Visit patch with audio_preview field, verify placeholder text |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
