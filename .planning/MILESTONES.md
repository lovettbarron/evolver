# Milestones: Instrument Deep Learning

## v1.2 Learner Experience & Discovery (Shipped: 2026-04-07)

**Phases completed:** 4 phases (14-17), 12 plans, 24 tasks
**Timeline:** 2 days (2026-04-05 → 2026-04-07), 90 commits, 112 files changed (+12,329 / -550)

**What shipped:**

- Persistent learner state: Zustand 5 store with persist middleware for per-instrument completion tracking, vault+manual union merge, and "continue where you left off" resume bar
- Navigation enhancements: prerequisite state badges (locked/available/completed), clickable count cards, module journey "you are here" pulsing dot marker, cumulative practice metrics
- Search & filtering: TDD pure-function search engine, global search bar with instant results, patch filter bar with multi-select type/tag pills and sort options
- Content & pedagogy: troubleshooting guides for both instruments (symptom-based checklists with specific parameter values), 4 transitional partial recipe sessions

**Key decisions:**

- Zustand 5 with persist middleware over Context API for client-side state
- Union merge semantics: vault OR manual = complete (never loses progress)
- Soft visual gating for prerequisites (informs, doesn't block)
- TDD approach for search/filter pure functions (22 unit tests before UI)

---

## v1.1 Cascadia Instrument Support (Shipped: 2026-04-05)

**Phases completed:** 8 phases (7-13.1), 25 plans, 34 tasks
**Timeline:** 6 days (2026-03-31 → 2026-04-05), 194 commits, 388 files changed (+43,509 / -1,487)

**What shipped:**

- Multi-instrument framework: dynamic navigation, capability-gated routes, extensible Zod schemas — no hardcoded Evolver assumptions remain
- Cascadia instrument data: 17 modules documented with controls, jacks, normalled connections, and architecture overview
- Cascadia patch system: cable routing + knob settings schemas, UI components (list, Mermaid diagram, settings table), 13 demo patches across 6 categories
- 25-session Cascadia curriculum across 7 modules — from "Make a Sound" foundations through advanced sound design recipes with 6 named recipe patches
- Interactive panel visualizers: Evolver (110 controls) and Cascadia (179 controls) as inline JSX SVG with drag interaction, tooltips, cable bezier rendering, glow highlights, and curriculum annotation overlays
- Demo mode: synthetic Cascadia learner journey (~50% progress), instrument-aware progress page, both instruments in Vercel demo

**Key decisions:**

- Data-driven conditional rendering: check cable_routing/knob_settings presence, not instrument name
- Cascadia control ID convention: {type}-{module}-{name-kebab} for all 179 controls
- Alias table approach for cable label resolution (explicit mappings over regex heuristics)
- Section tint opacity 0.08 as cross-panel standard
- Cable bezier droop scales with distance: min(80, 30 + dx * 0.15)

---

## Completed Milestones

### v1.0 — Evolver Learning Platform

**Completed:** 2026-03-30
**Phases:** 1-6 (23 plans)
**Requirements:** 40/40 complete (DEPL-02 deployment deferred to user)

**What shipped:**

- Content pipeline: Obsidian vault reader, Zod schemas, markdown rendering with parameter tables/callouts/mermaid
- 35-session Evolver curriculum across 10 modules (Foundations through Capstone Composition)
- Session browser with module grouping, quick-ref cards, source references, action-first landing
- Patch library with type filtering, parameter dumps, session provenance
- MIDI SysEx integration: capture/send/parse/diff patches over Web MIDI
- Progress dashboard: additive metrics, daily note scanning, challenge tracking
- Demo mode: synthetic 21-session ADHD-paced learner journey, PDF viewer, Vercel config
- Multi-instrument routing foundation (instrument-scoped URLs, filesystem discovery)

**Key decisions:**

- Obsidian as source of truth (not database)
- Vault reader pattern (same as PM Toolkit)
- Sequence-based progression (no calendar/streak guilt)
- JSON sidecar pattern for SysEx data
- Pure function SysEx parsing (no hardware dependency for tests)

**Last phase:** Phase 6
