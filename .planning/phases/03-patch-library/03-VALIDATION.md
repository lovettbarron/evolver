---
phase: 03
slug: patch-library
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-30
---

# Phase 03 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (if installed) or Next.js build validation |
| **Config file** | none — Wave 0 installs if needed |
| **Quick run command** | `npx next build` |
| **Full suite command** | `npx next build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx next build`
- **After every plan wave:** Run `npx next build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | PTCH-01 | build | `npx next build` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | PTCH-02 | build | `npx next build` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1 | PTCH-03 | build | `npx next build` | ❌ W0 | ⬜ pending |
| 03-01-04 | 01 | 1 | PTCH-04 | build | `npx next build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Demo patch markdown files authored in `patches/evolver/`
- [ ] Patch content schema validated against existing `PatchSchema`

*Existing infrastructure covers framework requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Card grid visual layout | PTCH-01 | Visual rendering | Browse /instruments/evolver/patches, verify card grid |
| Filter pill interaction | PTCH-02 | Client-side JS interaction | Click type pills, verify URL params update and cards filter |
| Parameter table rendering | PTCH-03 | Visual rendering | Open patch detail, verify parameter sections render |
| Session provenance link | PTCH-04 | Navigation flow | Click session link on patch, verify navigation to session |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
