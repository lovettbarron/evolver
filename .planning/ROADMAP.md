# Roadmap: Instrument Deep Learning

## Milestones

- ✅ **v1.0 Evolver Learning Platform** — Phases 1-6 (shipped 2026-03-30)
- ✅ **v1.1 Cascadia Instrument Support** — Phases 7-13.1 (shipped 2026-04-05)
- 📋 **v1.2 Learner Experience & Discovery** — Phases 14-17 (planned)

## Phases

<details>
<summary>✅ v1.0 Evolver Learning Platform (Phases 1-6) — SHIPPED 2026-03-30</summary>

- [x] Phase 1: Content Pipeline + Curriculum (6/6 plans) — completed 2026-03-29
- [x] Phase 2: Session Browser (5/5 plans) — completed 2026-03-30
- [x] Phase 3: Patch Library (2/2 plans) — completed 2026-03-30
- [x] Phase 4: MIDI SysEx Integration (4/4 plans) — completed 2026-03-30
- [x] Phase 5: Progress + Challenges (3/3 plans) — completed 2026-03-30
- [x] Phase 6: Deployment (3/3 plans) — completed 2026-03-30

Full details: [milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md)

</details>

<details>
<summary>✅ v1.1 Cascadia Instrument Support (Phases 7-13.1) — SHIPPED 2026-04-05</summary>

- [x] Phase 7: Multi-Instrument UI + Schema Foundation (3/3 plans) — completed 2026-03-31
- [x] Phase 8: Cascadia Instrument Data (3/3 plans) — completed 2026-04-01
- [x] Phase 9: Patch Documentation + Demo Patches (3/3 plans) — completed 2026-04-01
- [x] Phase 10: Curriculum Modules 1-3 (3/3 plans) — completed 2026-04-01
- [x] Phase 11: Curriculum Modules 4-7 + Demo Mode (4/4 plans) — completed 2026-04-04
- [x] Phase 12: Evolver Panel Visualizer Component (3/3 plans) — completed 2026-04-04
- [x] Phase 13: Cascadia Panel Visualizer (4/4 plans) — completed 2026-04-04
- [x] Phase 13.1: Panel Visualizer Gap Closure (2/2 plans) — completed 2026-04-05

Full details: [milestones/v1.1-ROADMAP.md](milestones/v1.1-ROADMAP.md)

</details>

### v1.2 Learner Experience & Discovery (Planned)

**Milestone Goal:** Remove key UX friction points — making the app genuinely usable for day-to-day practice rather than just browsable as a demo. Persistent session state, search, prerequisite visualization, and progress enhancements.

- [x] **Phase 14: Learner State Foundation** — Zustand store with persist middleware, completion toggle, last-visited tracking, vault+manual merge, resume bar (completed 2026-04-06)
- [x] **Phase 15: Navigation & Progress Enhancements** — Prerequisite state badges, clickable count cards, module journey "you are here" marker, cumulative practice metrics (completed 2026-04-06)
- [x] **Phase 16: Search & Filtering** — Full-text search across sessions and patches, tag/type filtering with sort options (completed 2026-04-06)
- [x] **Phase 17: Content & Pedagogy** — Troubleshooting guides and transitional "partial recipe" sessions (completed 2026-04-07)

### Phase 14: Learner State Foundation
**Goal**: Users have persistent learning state that survives browser restarts — they can mark sessions complete, and the app remembers where they left off
**Depends on**: Phase 13
**Requirements**: LSTATE-01, LSTATE-02, LSTATE-03, LSTATE-04, NAV-01
**Success Criteria** (what must be TRUE):
  1. User can toggle a session as complete from the session detail page, and the completion persists after closing and reopening the browser
  2. User's last-visited session is automatically tracked and persisted across browser sessions without manual action
  3. Completion data from vault scanning (server) and manual toggles (client localStorage) are merged using union semantics — if either source says complete, it is complete
  4. A "continue where you left off" resume bar appears showing the user's next recommended session based on last-visited and completion state
  5. Zustand store with persist middleware provides the single client-side state layer consumed by all learner-facing components
**Plans:** 3/3 plans complete
Plans:
- [x] 14-01-PLAN.md — Zustand store, hydration hook, and learner utility functions with tests
- [x] 14-02-PLAN.md — Completion toggle sticky bar on session detail page with last-visited tracking
- [x] 14-03-PLAN.md — Resume bar on instrument home page with vault+manual merge
**UI hint**: yes

### Phase 15: Navigation & Progress Enhancements
**Goal**: Users can see their position in the curriculum at a glance — which sessions are available, where they are in the module journey, and what their cumulative practice looks like
**Depends on**: Phase 14
**Requirements**: NAV-02, PROG-10, PROG-11, PROG-12
**Success Criteria** (what must be TRUE):
  1. Session list shows prerequisite state for each session (locked, available, or completed) with soft visual gating that informs but does not block navigation
  2. Count cards on the progress page are clickable, navigating to the relevant content list (sessions, patches, modules)
  3. Module journey visualization shows a "you are here" marker at the learner's current position in the module sequence
  4. Progress page displays cumulative practice metrics (sessions this month, total active weeks) that are additive-only and never guilt-inducing
**Plans**: 3 plans

Plans:
- [x] 15-01-PLAN.md -- Prerequisite state badges: checkmark/circle/lock icons in session list, PrerequisiteBanner on locked session detail pages
- [ ] 15-02-PLAN.md -- Clickable count cards and module journey "you are here" marker
- [x] 15-03-PLAN.md -- Module journey "you are here" pulsing dot marker
**UI hint**: yes

### Phase 16: Search & Filtering
**Goal**: Users can quickly find any session or patch by searching across titles, descriptions, and tags, and can refine patch browsing with filters and sort options
**Depends on**: Phase 13 (no dependency on Phase 14 — can parallelize with Phase 15)
**Requirements**: NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. User can type a search query and see matching sessions and patches from across the entire curriculum, searched by title, description, and tags
  2. User can filter patches by type (bass, lead, pad, drum, texture, FX) and by tags, with filters combinable
  3. User can sort patch results by date, name, or type
**Plans:** 3/3 plans complete

Plans:
- [x] 16-01-PLAN.md — TDD: search, filter, and sort pure functions with unit tests
- [ ] 16-02-PLAN.md — Global search bar with dropdown overlay in nav
- [x] 16-03-PLAN.md — Patch filter bar with multi-select type/tag pills and sort dropdown
**UI hint**: yes

### Phase 17: Content & Pedagogy
**Goal**: Users have troubleshooting support when stuck and transitional sessions that scaffold the move from guided to freeform practice
**Depends on**: Phase 13 (pure content, no code dependencies on Phases 14-16)
**Requirements**: CONTENT-01, CONTENT-02
**Success Criteria** (what must be TRUE):
  1. Each instrument has a troubleshooting guide accessible from the instrument pages, addressing common issues like "I hear nothing", "filter sounds wrong", or "no output from patch point"
  2. At least one transitional "partial recipe" session exists per instrument that gives incomplete instructions, requiring the learner to fill gaps using knowledge from prior sessions
**Plans**: 1/3 plans complete

Plans:
- [x] 17-01-PLAN.md -- Troubleshooting guides for both instruments
- [x] 17-02-PLAN.md -- Session design patterns and ADHD-aware scaffolding
- [x] 17-03-PLAN.md -- Partial recipe sessions (2 per instrument)

## Progress

**Execution Order:**
Phases 14 first (foundation). Then 15+16 can parallelize. Phase 17 is independent content work.

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Content Pipeline + Curriculum | v1.0 | 6/6 | Complete | 2026-03-29 |
| 2. Session Browser | v1.0 | 5/5 | Complete | 2026-03-30 |
| 3. Patch Library | v1.0 | 2/2 | Complete | 2026-03-30 |
| 4. MIDI SysEx Integration | v1.0 | 4/4 | Complete | 2026-03-30 |
| 5. Progress + Challenges | v1.0 | 3/3 | Complete | 2026-03-30 |
| 6. Deployment | v1.0 | 3/3 | Complete | 2026-03-30 |
| 7. Multi-Instrument UI + Schema | v1.1 | 3/3 | Complete | 2026-03-31 |
| 8. Cascadia Instrument Data | v1.1 | 3/3 | Complete | 2026-04-01 |
| 9. Patch Documentation + Demo Patches | v1.1 | 3/3 | Complete | 2026-04-01 |
| 10. Curriculum Modules 1-3 | v1.1 | 3/3 | Complete | 2026-04-01 |
| 11. Curriculum Modules 4-7 + Demo Mode | v1.1 | 4/4 | Complete | 2026-04-04 |
| 12. Evolver Panel Visualizer | v1.1 | 3/3 | Complete | 2026-04-04 |
| 13. Cascadia Panel Visualizer | v1.1 | 4/4 | Complete | 2026-04-04 |
| 13.1 Panel Visualizer Gap Closure | v1.1 | 2/2 | Complete | 2026-04-05 |
| 14. Learner State Foundation | v1.2 | 2/3 | Complete    | 2026-04-06 |
| 15. Navigation & Progress Enhancements | v1.2 | 2/3 | Complete    | 2026-04-06 |
| 16. Search & Filtering | v1.2 | 2/3 | Complete    | 2026-04-06 |
| 17. Content & Pedagogy | v1.2 | 3/3 | Complete   | 2026-04-07 |
