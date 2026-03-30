# Instrument Deep Learning

## What This Is

A structured instrument mastery system with an Obsidian-as-source-of-truth data layer and a Next.js frontend for session browsing, patch library, and progress tracking. Starting with the Dave Smith Mono Evolver keyboard, extensible to any electronic instrument (Intellijel Cascadia next). Designed for ADHD brains that buy great gear but never go deep enough to use it fluently in compositions.

## Core Value

An ADHD-friendly learning curriculum with 15-30 minute sessions that produces tangible output (documented patches, technique guides, audio recordings) and lets you confidently reach for the Evolver when making music — backed by a web app that makes the curriculum browsable, progress visible, and shareable with others.

## Current Milestone: v1.1 Cascadia Instrument Support

**Goal:** Add the Intellijel Cascadia as a second instrument — curriculum, patches, instrument data — validating the framework's multi-instrument extensibility.

**Target features:**
- Cascadia instrument data files (overview, architecture, signal flow, module docs)
- Cascadia-specific curriculum sessions adapted to semi-modular workflow
- Demo patches documented as markdown (no SysEx — Cascadia is CV-only)
- UI adaptations for instruments without MIDI SysEx (hide/adapt MIDI workspace)
- Baratatronix-inspired patch documentation with audio preview references
- Synthetic demo data for Cascadia learner journey

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
| Demo mode with synthetic data | Share curriculum publicly without exposing personal practice data | — Pending |
| Framework in-repo | Framework ships with curriculum, single source of truth for methodology | — Pending |

---
*Last updated: 2026-03-30 after v1.1 milestone start*
