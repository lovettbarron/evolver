# Instrument Deep Learning

## What This Is

A structured instrument mastery system with an Obsidian-as-source-of-truth data layer and a Next.js frontend for session browsing, patch library, and progress tracking. Starting with the Dave Smith Mono Evolver keyboard, extensible to any electronic instrument (Intellijel Cascadia next). Designed for ADHD brains that buy great gear but never go deep enough to use it fluently in compositions.

## Core Value

An ADHD-friendly learning curriculum with 15-30 minute sessions that produces tangible output (documented patches, technique guides, audio recordings) and lets you confidently reach for the Evolver when making music — backed by a web app that makes the curriculum browsable, progress visible, and shareable with others.

## Current State

**Shipped:** v1.2 Learner Experience & Discovery (2026-04-07)
- Two instruments fully supported: Evolver (37 sessions) and Cascadia (27 sessions)
- Interactive panel visualizers for both instruments with 289 total controls
- 36 documented patches (23 Evolver + 13 Cascadia) across all categories
- MIDI SysEx integration (Evolver only — Cascadia is CV-only)
- Demo mode with synthetic learner journeys for both instruments
- Persistent learner state: Zustand 5 store with completion tracking and vault+manual union merge
- Navigation: prerequisite badges, resume bar, module journey "you are here" marker, clickable count cards
- Search: global search bar with instant results, patch filter bar with type/tag/sort
- Content: troubleshooting guides and partial recipe transitional sessions for both instruments
- Tech stack: Next.js 15, React 19, Tailwind v4, TypeScript, Zod, ~55K LOC

**v1.3 in progress:** Visual Redesign
- Phase 18: Token foundation (OKLCH color palette, spacing scale, semantic tokens) — Complete
- Phase 19: Prose & typography (@tailwindcss/typography, editorial prose rules) — Complete
- Phase 20: Layout shell & navigation (AppShell, NarrowShell/WideShell, sticky nav, mobile menu) — Complete
- Phase 21: Cards & content components (unified .card CSS class, :focus-visible global, editorial prose styling) — Complete
- Phase 22: Motion & micro-interactions (ScrollReveal, SpringCard, completion-toggle animations) — Complete
- Phase 23: Panel & progress polish (motion.svg viewBox zoom tween, PracticeHeatmap, per-instrument accent identity) — Complete

## Current Milestone: v1.3 Visual Redesign

**Goal:** Comprehensive visual and layout redesign of the existing app — new design system, typography, color palette, layout structure, interactive element styling, and polished markdown rendering that feels native, not like raw markdown.

**Target features:**
- Design system overhaul (color palette, typography, spacing tokens)
- Layout restructuring (navigation, page shells, content flow)
- Component visual refresh (cards, tables, panels, forms)
- Interactive element styling (search, filters, panel visualizers)
- Motion and micro-interactions
- Complete markdown rendering — styled prose that looks designed, not like a markdown viewer

## Requirements

### Validated

- ✓ Content pipeline (vault reader, Zod schemas, markdown rendering) — v1.0
- ✓ Session browser (module grouping, quick-ref, source references) — v1.0
- ✓ Patch library (type filtering, parameter dumps, provenance) — v1.0
- ✓ MIDI SysEx integration (capture/send/parse/diff) — v1.0
- ✓ Progress tracking (additive metrics, daily note scanning) — v1.0
- ✓ Challenge exercises with patch responses — v1.0
- ✓ Multi-instrument routing foundation — v1.0
- ✓ Demo mode with synthetic data — v1.0
- ✓ Instrument filesystem discovery — v1.0
- ✓ Multi-instrument UI (dynamic nav, capability-gated routes, instrument selector) — v1.1
- ✓ Cascadia instrument data (17 modules, normalled signal path, architecture) — v1.1
- ✓ Cascadia patch system (cable routing + knob settings schemas, 13 demo patches) — v1.1
- ✓ 25-session Cascadia curriculum across 7 modules — v1.1
- ✓ Cascadia demo mode (synthetic journey, content bundling, both instruments) — v1.1
- ✓ Evolver panel visualizer (110 controls, drag interaction, tooltips, 4 integration contexts) — v1.1
- ✓ Cascadia panel visualizer (179 controls, cable rendering, session annotations) — v1.1
- ✓ Persistent learner state (Zustand store, completion toggle, vault+manual merge) — v1.2
- ✓ Resume bar ("continue where you left off" with last-visited tracking) — v1.2
- ✓ Prerequisite state badges (locked/available/completed with soft gating) — v1.2
- ✓ Module journey "you are here" marker — v1.2
- ✓ Clickable count cards and cumulative practice metrics — v1.2
- ✓ Global search (sessions + patches, instant results) — v1.2
- ✓ Patch filtering (type/tag multi-select, sort options, URL persistence) — v1.2
- ✓ Troubleshooting guides (symptom-based checklists per instrument) — v1.2
- ✓ Transitional partial recipe sessions (4 sessions, 2 per instrument) — v1.2

### Active

- [ ] 35-session Evolver curriculum (15-30 min each, single objective, tangible output)
- [ ] ADHD-aware session design (zero activation energy, warm-ups, hard stops, no decision fatigue)
- [ ] Reusable learning framework (instrument-agnostic module taxonomy, session template, extensible to Cascadia)
- [ ] Obsidian source of truth (sessions, patches, progress as markdown + YAML frontmatter in ~/song vault)
- [ ] Next.js frontend — session browser with progress tracking
- [ ] Next.js frontend — searchable patch library with parameter tables
- [ ] Next.js frontend — progress dashboard (modules completed, streak, patches created)
- [ ] Next.js frontend — multi-instrument selector (Evolver now, Cascadia later)
- [ ] Vault reader pattern (same as PM Toolkit — read markdown + frontmatter from ~/song vault)
- [ ] Demo mode with synthetic data for Vercel deployment (curriculum visible, practice data synthetic)
- [ ] Documented patches with full parameter dumps, shareable
- [ ] Technique guides ("how I made this sound")
- [ ] Audio recording integration (sound examples, before/after)
- [ ] Ableton Live DAW integration in final sessions
- [ ] Continuously updated README reflecting current state
- [ ] Cross-session continuity (warm-ups bridge forgetting gaps, sessions reference each other)

### Out of Scope

- Real-time audio processing or synth emulation — this is a learning tool, not a VST
- Mobile app — web-first, responsive is enough
- User accounts / multi-user — personal tool with a public demo mode
- Automated Evolver MIDI communication — patch documentation is manual (parameter dumps)
- Video tutorials — text + audio only for v1

## Context

**Owner**: Andrew — senior PM, synth enthusiast, ADHD. Builds structured systems (Haven, PM Toolkit, Etyde) using GSD workflow, Obsidian as data layer, Next.js frontends.

**Existing work**: Framework docs, ADHD design principles, Evolver instrument data (overview, signal flow, basic patch, module map), 7 of 35 sessions, Obsidian templates, and patch library structure already created in this repo.

**Reference materials**:
1. `Evo_Key_Manual_1.3.pdf` — Official DSI Evolver operation manual (parameters, MIDI, sysex)
2. `evolverguide.pdf` — "The Definitive Guide to Evolver" by Anu Kirk (pedagogical, exercise-based)
3. `cascadia_manual_v1.1.pdf` — Official Intellijel Cascadia manual (110 pages, all modules/controls/patch points)
4. [baratatronix.com](https://www.baratatronix.com/) — Cascadia patch library with audio previews (inspiration for patch documentation format)

**Patterns to follow**:
- PM Toolkit: Obsidian vault reader → Next.js App Router → server components read vault, client components handle interactivity. Zod schemas at boundaries. Demo mode with bundled content.
- Haven: JSON/markdown data, session scripts with ADHD-adapted timing, Obsidian integration, GSD planning workflow.

**Instruments**:
- Dave Smith Mono Evolver keyboard (v1.0 complete — 35/35 sessions, full SysEx integration)
- Intellijel Cascadia (v1.1 — semi-modular, CV-only, no patch memory/SysEx, 100+ patch points)

**Practice cadence**: 2-3 sessions per week → ~10 week Evolver curriculum.

**DAW**: Ableton Live for recording and composition integration.

## Constraints

- **ADHD**: Sessions must be 15-30 minutes with zero startup friction, specific parameter values (not "explore freely"), and tangible output
- **Session-based**: No calendar dates — sequence-based progression. Skipping days is expected, not failure
- **Hardware instrument**: The Evolver is physical hardware. Patches are documented manually, not synced via MIDI
- **Obsidian source of truth**: All content lives as markdown + YAML frontmatter. The web app is a visualization layer, not a CMS
- **Demo/Local split**: Full capabilities local-only. Vercel demo shows curriculum + synthetic practice data
- **Extensible**: Framework and frontend must support multiple instruments without restructuring

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Obsidian as source of truth, not a database | Matches existing workflow (PM Toolkit pattern), portable, version-controlled | — Pending |
| Next.js App Router with vault reader | Proven pattern from PM Toolkit, server components for file I/O | — Pending |
| 15-30 min session hard limit | ADHD constraint — consistency over intensity | — Pending |
| Sequence-based not calendar-based | Missed days create guilt spirals with ADHD. Sequence eliminates this | — Pending |
| Demo mode with synthetic data | Share curriculum publicly without exposing personal practice data | ✓ Good |
| Framework in-repo | Framework ships with curriculum, single source of truth for methodology | ✓ Good |
| Data-driven conditional rendering | Check cable_routing/knob_settings presence, not instrument name | ✓ Good |
| Alias table for cable label resolution | Explicit mappings more reliable than regex heuristics | ✓ Good |
| Cascadia control ID: {type}-{module}-{name-kebab} | Consistent naming across 179 controls | ✓ Good |
| Section tint opacity 0.08 cross-panel standard | Subtle enough to not obscure controls | ✓ Good |
| Cable bezier droop: min(80, 30 + dx * 0.15) | Natural droop that scales with distance | ✓ Good |
| Zustand 5 with persist middleware | Client-side state survives browser restart, simpler than Context API | ✓ Good |
| Union merge for completions (vault OR manual) | Never lose progress — if either source says complete, it is | ✓ Good |
| Soft visual gating for prerequisites | Informs learner without blocking — ADHD-friendly, no frustration gates | ✓ Good |
| TDD for search/filter pure functions | 22 tests before UI ensures correctness; pure functions easy to test | ✓ Good |

---
## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-12 after Phase 23 (Panel & Progress Polish) completed*
