---
phase: 11
slug: curriculum-modules-4-7-demo-mode
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-03
---

# Phase 11 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run && npm run build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 11-01-01 | 01 | 1 | CCURR-01 | content | `ls sessions/cascadia/10-*.md` | ❌ W0 | ⬜ pending |
| 11-01-02 | 01 | 1 | CCURR-01 | content | `ls sessions/cascadia/12-*.md` | ❌ W0 | ⬜ pending |
| 11-02-01 | 02 | 1 | CCURR-01 | content | `ls sessions/cascadia/13-*.md` | ❌ W0 | ⬜ pending |
| 11-03-01 | 03 | 2 | CCURR-01 | content | `ls sessions/cascadia/16-*.md` | ❌ W0 | ⬜ pending |
| 11-04-01 | 04 | 2 | CCURR-01, CCURR-06 | content | `ls sessions/cascadia/20-*.md` | ❌ W0 | ⬜ pending |
| 11-05-01 | 05 | 3 | CDEMO-01 | integration | `ls src/content/sessions/cascadia/*.md \| wc -l` | ❌ W0 | ⬜ pending |
| 11-05-02 | 05 | 3 | CDEMO-02 | unit | `npx vitest run` | ✅ | ⬜ pending |
| 11-05-03 | 05 | 3 | CDEMO-03 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Content validation: verify session files match expected frontmatter schema
- [ ] Patch validation: verify recipe patches have cable_routing and knob_settings

*Existing infrastructure covers code-level requirements (vitest + build).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Session pedagogical quality | CCURR-01 | Content review | Read sessions for ADHD-friendly structure, correct knob names |
| Patch accuracy | CCURR-06 | Domain expertise | Verify cable routing matches Cascadia signal flow |
| Visual landing page | CDEMO-03 | Visual check | Open localhost:3000, verify both instruments shown with counts |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
