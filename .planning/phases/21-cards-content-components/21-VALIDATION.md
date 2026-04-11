---
phase: 21
slug: cards-content-components
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 21 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest (existing) + browser visual inspection |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 21-01-01 | 01 | 1 | COMP-01 | visual + CSS audit | `grep -c '.card' src/app/globals.css` | ❌ W0 | ⬜ pending |
| 21-01-02 | 01 | 1 | COMP-01 | class presence | `grep -r 'className.*card' src/components/` | ❌ W0 | ⬜ pending |
| 21-02-01 | 02 | 1 | COMP-02 | CSS audit | `grep ':focus-visible' src/app/globals.css` | ❌ W0 | ⬜ pending |
| 21-03-01 | 03 | 2 | CONTENT-02 | CSS audit | `grep '::marker' src/app/globals.css` | ❌ W0 | ⬜ pending |
| 21-03-02 | 03 | 2 | CONTENT-02 | CSS audit | `grep 'param.*pill\|inline.*code\|prose.*code' src/app/globals.css` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

*Existing infrastructure covers all phase requirements. This is a pure CSS phase — verification is grep-based CSS auditing and visual inspection.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hover states show consistent lift/glow | COMP-01 | CSS hover requires browser | Hover each card type, verify consistent shadow/border change |
| Focus rings visible on keyboard nav | COMP-02 | Requires keyboard interaction | Tab through all interactive elements, verify orange focus ring |
| Parameter pills render inline in session content | CONTENT-02 | Visual rendering check | Open a session page, verify `<code>` elements show as warm-tinted pills |
| Numbered steps show designed markers | CONTENT-02 | Visual rendering check | Open a session page, verify `<ol>` items have styled `::marker` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
