---
phase: 23
slug: panel-progress-polish
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-11
---

# Phase 23 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 3.0.0 + @testing-library/react 16.3.2 |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npx vitest run --reporter=verbose` |
| **Full suite command** | `npx vitest run` |
| **Estimated runtime** | ~8 seconds |

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
| 23-00-01 | 00 | 0 | SPEC-02 | unit | `npx vitest run src/components/__tests__/practice-heatmap.test.tsx -x` | ❌ W0 | ⬜ pending |
| 23-00-02 | 00 | 0 | SPEC-02 | unit | `npx vitest run src/lib/__tests__/practice-metrics.test.ts -x` | ❌ W0 | ⬜ pending |
| 23-00-03 | 00 | 0 | TOKEN-06 | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | ✅ extend | ⬜ pending |
| 23-01-01 | 01 | 1 | SPEC-01 | unit | `npx vitest run src/components/__tests__/evolver-panel.test.tsx -x` | ✅ update | ⬜ pending |
| 23-01-02 | 01 | 1 | SPEC-01 | unit | `npx vitest run src/components/__tests__/cascadia-panel.test.tsx -x` | ✅ update | ⬜ pending |
| 23-02-01 | 02 | 1 | SPEC-02 | unit | `npx vitest run src/components/__tests__/practice-heatmap.test.tsx -x` | ❌ W0 | ⬜ pending |
| 23-02-02 | 02 | 1 | SPEC-02 | unit | `npx vitest run src/lib/__tests__/practice-metrics.test.ts -x` | ❌ W0 | ⬜ pending |
| 23-03-01 | 03 | 2 | TOKEN-06 | unit | `npx vitest run src/app/__tests__/tokens.test.ts -x` | ✅ extend | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/components/__tests__/practice-heatmap.test.tsx` — stubs for SPEC-02 (heatmap rendering, empty state, date range, intensity levels)
- [ ] `src/lib/__tests__/practice-metrics.test.ts` — add `getHeatmapData` test stubs (week alignment, date counting, 12-week range)
- [ ] `src/app/__tests__/tokens.test.ts` — extend: verify no hardcoded lime in shadows/keyframes (`pulse-glow`, `--shadow-card-hover`)
- [ ] Update panel test files to verify `motion.svg` usage (mock motion, verify viewBox prop animation)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ADHD 5-second test | All reqs | Subjective visual hierarchy judgment | Visit each route, verify single focal point, no competing animations, count clicks to key destinations |
| Zoom tween "feels smooth" | SPEC-01 | Perceptual quality judgment | Navigate to session with zoomSections, verify camera-glide feel (not a cut) |
| Heatmap motivational impact | SPEC-02 | Subjective design quality | View progress page with practice data, verify colored cells create visual streak motivation |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
