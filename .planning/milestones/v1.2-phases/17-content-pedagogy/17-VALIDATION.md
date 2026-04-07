---
phase: 17
slug: content-pedagogy
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-06
---

# Phase 17 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run --reporter=verbose` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run --reporter=verbose`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 17-01-01 | 01 | 1 | CONTENT-01 | unit | `npx vitest run src/lib/content/__tests__/troubleshooting.test.ts` | ❌ W0 | ⬜ pending |
| 17-01-02 | 01 | 1 | CONTENT-01 | integration | `npx vitest run src/app/instruments/[slug]/troubleshooting/__tests__` | ❌ W0 | ⬜ pending |
| 17-02-01 | 02 | 2 | CONTENT-02 | unit | `npx vitest run src/lib/content/__tests__/sessions.test.ts` | ✅ | ⬜ pending |
| 17-02-02 | 02 | 2 | CONTENT-02 | manual | Visual check of session list | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/lib/content/__tests__/troubleshooting.test.ts` — stubs for CONTENT-01 (schema validation, reader function)
- [ ] Verify existing test infrastructure covers session schema validation for CONTENT-02

*Existing vitest infrastructure covers session-related requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Troubleshooting card visible on instrument home | CONTENT-01 | Visual layout | Navigate to /instruments/evolver, verify troubleshooting card appears in grid |
| Troubleshooting page renders checklist items | CONTENT-01 | Visual rendering | Navigate to /instruments/evolver/troubleshooting, verify symptom sections render |
| Partial recipe sessions show in session list | CONTENT-02 | Visual integration | Navigate to /instruments/evolver/sessions, verify sessions 36-37 appear |
| Gap blanks render correctly in session detail | CONTENT-02 | Visual rendering | Navigate to session 36, verify underscores and hint text display |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
