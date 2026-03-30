---
phase: 5
slug: progress-challenges
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-30
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x with jsdom environment |
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
| 05-01-01 | 01 | 1 | PROG-01 | unit | `npx vitest run src/lib/progress.test.ts -t "module completion"` | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | PROG-02 | unit | `npx vitest run src/lib/progress.test.ts -t "scanDailyNotes"` | ❌ W0 | ⬜ pending |
| 05-01-03 | 01 | 1 | PROG-03 | unit | `npx vitest run src/lib/progress.test.ts -t "computeProgress"` | ❌ W0 | ⬜ pending |
| 05-01-04 | 01 | 1 | PROG-04 | manual-only | Code review: verify ProgressData has no streak/date fields | N/A | ⬜ pending |
| 05-02-01 | 02 | 2 | CHAL-01 | unit | `npx vitest run src/lib/markdown/processor.test.ts -t "challenge callout"` | ❌ W0 | ⬜ pending |
| 05-02-02 | 02 | 2 | CHAL-02 | unit | `npx vitest run src/lib/content/schemas.test.ts -t "challenge_id"` | ❌ W0 | ⬜ pending |
| 05-02-03 | 02 | 2 | CHAL-03 | unit | `npx vitest run src/lib/markdown/processor.test.ts -t "challenge wikilink"` | ❌ W0 | ⬜ pending |
| 05-02-04 | 02 | 2 | CHAL-04 | unit | `npx vitest run src/lib/progress.test.ts -t "challengesCompleted"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/progress.test.ts` — stubs for PROG-01, PROG-02, PROG-03, CHAL-04
- [ ] `src/lib/content/schemas.test.ts` — stubs for CHAL-02 (PatchSchema challenge_id)
- [ ] `src/lib/markdown/processor.test.ts` — stubs for CHAL-01, CHAL-03 (challenge callout rendering)
- [ ] Test fixtures: mock daily note files with various tag formats, mock session/patch data

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| No temporal metrics in ProgressData type | PROG-04 | Type-level enforcement — no runtime check | Code review: verify ProgressData interface has no streak, percentage, or date-based fields |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
