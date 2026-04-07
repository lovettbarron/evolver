---
phase: 1
slug: content-pipeline-curriculum
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-29
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest (latest) |
| **Config file** | `vitest.config.ts` — needs creation (Wave 0) |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx vitest run --reporter=verbose`
- **After every plan wave:** Run `npx vitest run`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 0 | PIPE-01 | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "vault"` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 0 | PIPE-02 | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "bundled"` | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 0 | PIPE-03 | unit | `npx vitest run src/lib/content/__tests__/schemas.test.ts` | ❌ W0 | ⬜ pending |
| 01-01-04 | 01 | 0 | PIPE-04 | unit | `npx vitest run src/lib/markdown/__tests__/processor.test.ts` | ❌ W0 | ⬜ pending |
| 01-01-05 | 01 | 0 | PIPE-05 | smoke | `npx vitest run src/lib/content/__tests__/pdf-access.test.ts` | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | CURR-01 | integration | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -t "session count"` | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 1 | CURR-02 | integration | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -t "session structure"` | ❌ W0 | ⬜ pending |
| 01-02-03 | 02 | 1 | CURR-03 | integration | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -t "adhd"` | ❌ W0 | ⬜ pending |
| 01-02-04 | 02 | 1 | CURR-04 | integration | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -t "basic-patch"` | ❌ W0 | ⬜ pending |
| 01-02-05 | 02 | 1 | CURR-05 | integration | `npx vitest run src/lib/content/__tests__/curriculum.test.ts -t "instrument-docs"` | ❌ W0 | ⬜ pending |
| 01-01-06 | 01 | 0 | INST-04 | unit | `npx vitest run src/lib/content/__tests__/reader.test.ts -t "discover"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `package.json` — project has no package.json yet (greenfield)
- [ ] `tsconfig.json` — TypeScript configuration needed
- [ ] `vitest.config.ts` — test framework configuration
- [ ] `npm install -D vitest` — framework install
- [ ] `src/lib/content/__tests__/reader.test.ts` — content reader tests (vault, bundled, discover)
- [ ] `src/lib/content/__tests__/schemas.test.ts` — schema validation tests
- [ ] `src/lib/markdown/__tests__/processor.test.ts` — markdown rendering tests
- [ ] `src/lib/content/__tests__/curriculum.test.ts` — curriculum completeness tests
- [ ] `src/lib/content/__tests__/pdf-access.test.ts` — PDF serving smoke tests
- [ ] Test fixtures: sample markdown files with valid/invalid frontmatter

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Mermaid diagrams render visually | PIPE-04 | Client-side rendering requires browser | Open a session with a Mermaid diagram in dev server, verify SVG renders |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
