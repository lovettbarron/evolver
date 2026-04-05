# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.1 — Cascadia Instrument Support

**Shipped:** 2026-04-05
**Phases:** 8 (including 1 gap-closure decimal phase) | **Plans:** 25 | **Commits:** 194

### What Was Built
- Multi-instrument framework replacing all hardcoded Evolver assumptions with data-driven discovery
- Complete Cascadia instrument support: 17 modules documented, 25-session curriculum, 13 demo patches
- Interactive panel visualizers for both Evolver (110 controls) and Cascadia (179 controls) with cable rendering, tooltips, and curriculum annotations
- Demo mode extended with Cascadia synthetic learner journey and instrument-aware progress

### What Worked
- **Phase ordering was right**: Schema first (7) → instrument data (8) → patch format (9) → curriculum (10-11) → visualizers (12-13) — each phase had stable foundations to build on
- **Curriculum split validation**: Building Modules 1-3 first (Phase 10) and validating session format before committing to all 25 sessions (Phase 11) caught format issues early
- **Milestone audit before completion**: Running `/gsd:audit-milestone` surfaced real integration bugs (cable ID mismatch, opacity inconsistency) that Phase 13.1 fixed cleanly
- **Data-driven conditional rendering**: Checking `cable_routing`/`knob_settings` presence instead of instrument name means future instruments work automatically

### What Was Inefficient
- **Progress table in ROADMAP.md drifted**: Phase 7-9 showed "Planning" and "0/3" even though all plans were complete — manual status tracking fell behind
- **Phase 12 plan 03 (12-03) was underscoped**: Page integrations for the Evolver panel turned out to need inline markdown markers across 35 sessions, spawning a quick task
- **Audit file was stale by completion**: The audit was run before Phase 13.1, so its `gaps_found` status no longer reflected reality — could use a re-audit step or audit staleness detection

### Patterns Established
- **Alias table for cross-reference resolution**: Explicit label→ID mappings beat regex heuristics for cable/control name resolution
- **Decimal phase numbering (13.1)**: Clean way to insert gap-closure work without disrupting the roadmap
- **Section tint opacity 0.08**: Cross-panel visual standard for curriculum annotation overlays
- **Control ID convention {type}-{module}-{name-kebab}**: Scalable naming for any future instrument panels

### Key Lessons
1. **Run the milestone audit early, not just at the end** — catching the cable ID mismatch earlier would have saved a gap-closure phase
2. **Panel visualizers are high-value but high-effort** — Phases 12-13 took the most time per plan (5-8min vs 2-4min average) due to hand-placement and visual verification
3. **Content phases (curriculum, patches) execute fastest** — clear specs + templated formats = minimal rework
4. **Cross-phase integration testing matters** — the cable rendering bug was invisible within Phase 13 but broke the patch detail E2E flow

### Cost Observations
- Model mix: predominantly Opus for execution, Sonnet for research/planning agents
- Sessions: ~15 across 6 days
- Notable: Content-heavy phases (10, 11) were the most cost-efficient — high output, low rework

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Commits | Phases | Plans | Key Change |
|-----------|---------|--------|-------|------------|
| v1.0 | ~137 | 6 | 23 | Established GSD workflow, vault reader pattern |
| v1.1 | 194 | 8 | 25 | Added milestone audit, decimal phases, panel visualizers |

### Top Lessons (Verified Across Milestones)

1. Phase ordering based on data dependencies prevents rework (validated in both v1.0 and v1.1)
2. Validate format/schema before committing to bulk content (v1.0: curriculum after pipeline, v1.1: patch schema before patches)
