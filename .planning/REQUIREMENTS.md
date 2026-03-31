# Requirements: Instrument Deep Learning

**Defined:** 2026-03-29
**Updated:** 2026-03-30 (v1.1 roadmap created)
**Core Value:** ADHD-friendly instrument mastery through structured micro-sessions, backed by an Obsidian-powered web app that makes learning visible, shareable, and connected to actual music-making.

## v1.0 Requirements (Complete)

### Content Pipeline

- [x] **PIPE-01**: App reads markdown + YAML frontmatter from a configured Obsidian vault path
- [x] **PIPE-02**: App falls back to bundled demo content when no vault path is configured (Vercel deploy)
- [x] **PIPE-03**: All frontmatter is validated with Zod schemas at parse time
- [x] **PIPE-04**: Markdown renders with formatted parameter tables, callouts, and code blocks
- [x] **PIPE-05**: Reference PDFs are accessible locally and served via the demo app

### Session Browser

- [x] **SESS-01**: User can browse sessions grouped by learning module
- [x] **SESS-02**: User can read a session with formatted exercises, parameter tables, and checklists
- [x] **SESS-03**: User sees a "next session" action-first view showing exactly what to do next
- [x] **SESS-04**: User can access quick-reference cards (basic patch, signal flow) without opening a full session
- [x] **SESS-05**: Sessions display source references and citations from reference materials

### Patch Library

- [x] **PTCH-01**: User can browse documented patches with parameter tables
- [x] **PTCH-02**: User can filter patches by type (bass, lead, pad, drum, texture, sequence)
- [x] **PTCH-03**: User can navigate from a patch to the session that created it
- [x] **PTCH-04**: Patch detail view shows full parameter dump, playing tips, and technique notes

### MIDI SysEx Integration

- [x] **MIDI-01**: App can receive SysEx program dumps from the Evolver over MIDI
- [x] **MIDI-02**: App parses SysEx data into structured parameter values matching the Evolver's program format
- [x] **MIDI-03**: App stores extracted patches as structured data (markdown + frontmatter or JSON)
- [x] **MIDI-04**: App can send SysEx program data back to the Evolver to restore a patch
- [x] **MIDI-05**: User can compare two patches parameter-by-parameter (diff view)

### Progress Tracking

- [x] **PROG-01**: User sees module completion status (additive count, no streaks)
- [x] **PROG-02**: App scans ~/song daily notes for session log entries (tag-based)
- [x] **PROG-03**: Dashboard shows additive metrics: sessions completed, patches created, modules done
- [x] **PROG-04**: No streak counters, no "days since", no guilt-inducing metrics

### Challenge Mode

- [x] **CHAL-01**: Sessions include challenge exercises ("create a patch that does X")
- [x] **CHAL-02**: User can save challenge responses as patches linked to the challenge
- [x] **CHAL-03**: Challenges reference audio examples or saved patches as targets to match/approximate
- [x] **CHAL-04**: Challenge completion tracked as part of progress

### Multi-Instrument

- [x] **INST-01**: URL routing is instrument-scoped: /instruments/[slug]/sessions/[id]
- [x] **INST-02**: Each instrument has an overview page (architecture, signal flow, basic patch)
- [x] **INST-03**: Framework documentation (learning methodology, ADHD design) is visible in the app
- [x] **INST-04**: Instrument data is discovered from filesystem (adding Cascadia = adding a directory)

### Curriculum Content

- [x] **CURR-01**: 35 Evolver sessions written across 10 modules (15-30 min each)
- [x] **CURR-02**: Each session has: objective, warm-up, setup, exercises with specific values, output checklist
- [x] **CURR-03**: ADHD design enforced: 5-min minimum, zero startup friction, specific parameter values
- [x] **CURR-04**: Evolver basic patch documented with full parameter dump
- [x] **CURR-05**: Evolver signal flow, architecture, and module dependency map documented

### Deployment

- [x] **DEPL-01**: App runs locally reading from ~/song vault
- [ ] **DEPL-02**: App deploys to Vercel with demo mode (curriculum visible, practice data synthetic)
- [x] **DEPL-03**: Demo mode includes curated synthetic learner journey (realistic progress state)
- [x] **DEPL-04**: Reference PDFs accessible in both local and demo modes

## v1.1 Requirements

Requirements for Cascadia instrument support. Each maps to roadmap phases 7-11.

### Cascadia Instrument Data

- [ ] **CASC-01**: Cascadia instrument overview page with architecture description, signal flow, and module layout
- [ ] **CASC-02**: Cascadia normalled signal path documented (what you hear with zero cables patched)
- [x] **CASC-03**: Each Cascadia module documented with controls, jacks, normals, and LED behavior
- [x] **CASC-04**: Cascadia reference PDF (manual v1.1) accessible via PDF viewer

### Multi-Instrument UI

- [x] **MULTI-01**: Navigation dynamically lists all discovered instruments (no hardcoded Evolver links)
- [x] **MULTI-02**: Instrument selector visible on landing page for choosing between Evolver and Cascadia
- [x] **MULTI-03**: MIDI/SysEx workspace hidden for instruments without SysEx capability (capability flag in instrument config)
- [x] **MULTI-04**: Patch detail view adapts to instrument type: parameter tables for Evolver, cable routing + knob positions for Cascadia

### Cascadia Patch Documentation

- [ ] **CPATCH-01**: Patch frontmatter supports cable routing as structured connections array (source, destination, purpose)
- [ ] **CPATCH-02**: Patch frontmatter supports knob/slider positions as settings map (module, control, value as clock position or percentage)
- [ ] **CPATCH-03**: Patch detail page renders cable connections as a readable list or Mermaid diagram
- [ ] **CPATCH-04**: Patch detail page renders knob/slider settings grouped by module
- [ ] **CPATCH-05**: Patches include embedded audio previews (Baratatronix-style with playable audio files)
- [ ] **CPATCH-06**: 12-16 demo patches covering bass, lead, pad, drum, texture, and FX categories

### Cascadia Curriculum

- [ ] **CCURR-01**: 25 Cascadia sessions across 7 modules (15-30 min each, ADHD-paced)
- [ ] **CCURR-02**: Each session teaches a generalized synthesis concept (e.g., "what is a wave folder", "how sample & hold works") using Cascadia as the hands-on vehicle
- [ ] **CCURR-03**: Each session highlights what is unique to Cascadia's implementation of the concept (e.g., Envelope B triple-mode, specific normalling choices, mixuverter design)
- [ ] **CCURR-04**: Sessions document which normalled connections are active and what patching a cable overrides
- [ ] **CCURR-05**: Module 1 (Foundations) follows the manual's "Make a Sound" progression: basic sound -> PWM -> sub -> filter envelope -> wave folding -> FM -> FX pedal
- [ ] **CCURR-06**: Recipe sessions produce named patches with full cable routing and knob settings documented

### Cascadia Demo Mode

- [ ] **CDEMO-01**: Cascadia content bundled in src/content/ for Vercel demo mode
- [ ] **CDEMO-02**: Synthetic Cascadia learner journey showing ~50% progress (separate from Evolver journey)
- [ ] **CDEMO-03**: Landing page and instrument selector show both instruments in demo mode

## v2 Requirements

### Audio Integration

- **AUD-01**: Embedded audio examples in sessions (before/after, target sounds)
- **AUD-02**: Audio recording capture linked to patches/challenges

### Enhanced Patch Tools

- **PTCH-10**: Batch SysEx dump (all banks) -- Evolver only
- **PTCH-11**: Patch randomization / mutation for exploration
- **PTCH-12**: Patch sharing export format

### Visual Patch Sheets

- **VIS-01**: SVG-based Cascadia panel diagram with labeled patch points
- **VIS-02**: Interactive patch cable visualizer showing connections on panel diagram

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time audio processing / synth emulation | Learning tool, not a VST |
| Mobile native app | Web-first, responsive is sufficient |
| User accounts / multi-user | Personal tool with public demo mode |
| Video tutorials | Text + audio for v1 |
| Database / ORM | Markdown + flat files is the correct architecture |
| Automated MIDI sequencing | Learning tool, not a DAW |
| MIDI SysEx for Cascadia | Cascadia has no patch memory or SysEx -- CV-only instrument |
| Interactive patch cable visualizer | Deferred to v2 (VIS-01/02) -- structured YAML + Mermaid is sufficient for v1.1 |
| Abstracting MIDI library for multi-instrument | Evolver MIDI code works, Cascadia doesn't need it -- don't refactor |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PIPE-01 | Phase 1 | Complete |
| PIPE-02 | Phase 1 | Complete |
| PIPE-03 | Phase 1 | Complete |
| PIPE-04 | Phase 1 | Complete |
| PIPE-05 | Phase 1 | Complete |
| SESS-01 | Phase 2 | Complete |
| SESS-02 | Phase 2 | Complete |
| SESS-03 | Phase 2 | Complete |
| SESS-04 | Phase 2 | Complete |
| SESS-05 | Phase 2 | Complete |
| PTCH-01 | Phase 3 | Complete |
| PTCH-02 | Phase 3 | Complete |
| PTCH-03 | Phase 3 | Complete |
| PTCH-04 | Phase 3 | Complete |
| MIDI-01 | Phase 4 | Complete |
| MIDI-02 | Phase 4 | Complete |
| MIDI-03 | Phase 4 | Complete |
| MIDI-04 | Phase 4 | Complete |
| MIDI-05 | Phase 4 | Complete |
| PROG-01 | Phase 5 | Complete |
| PROG-02 | Phase 5 | Complete |
| PROG-03 | Phase 5 | Complete |
| PROG-04 | Phase 5 | Complete |
| CHAL-01 | Phase 5 | Complete |
| CHAL-02 | Phase 5 | Complete |
| CHAL-03 | Phase 5 | Complete |
| CHAL-04 | Phase 5 | Complete |
| INST-01 | Phase 2 | Complete |
| INST-02 | Phase 2 | Complete |
| INST-03 | Phase 2 | Complete |
| INST-04 | Phase 1 | Complete |
| CURR-01 | Phase 1 | Complete |
| CURR-02 | Phase 1 | Complete |
| CURR-03 | Phase 1 | Complete |
| CURR-04 | Phase 1 | Complete |
| CURR-05 | Phase 1 | Complete |
| DEPL-01 | Phase 6 | Complete |
| DEPL-02 | Phase 6 | Pending |
| DEPL-03 | Phase 6 | Complete |
| DEPL-04 | Phase 6 | Complete |
| CASC-01 | Phase 8 | Pending |
| CASC-02 | Phase 8 | Pending |
| CASC-03 | Phase 8 | Complete |
| CASC-04 | Phase 7 | Complete |
| MULTI-01 | Phase 7 | Complete |
| MULTI-02 | Phase 7 | Complete |
| MULTI-03 | Phase 7 | Complete |
| MULTI-04 | Phase 7 | Complete |
| CPATCH-01 | Phase 9 | Pending |
| CPATCH-02 | Phase 9 | Pending |
| CPATCH-03 | Phase 9 | Pending |
| CPATCH-04 | Phase 9 | Pending |
| CPATCH-05 | Phase 9 | Pending |
| CPATCH-06 | Phase 9 | Pending |
| CCURR-01 | Phase 10 | Pending |
| CCURR-02 | Phase 10 | Pending |
| CCURR-03 | Phase 10 | Pending |
| CCURR-04 | Phase 10 | Pending |
| CCURR-05 | Phase 10 | Pending |
| CCURR-06 | Phase 11 | Pending |
| CDEMO-01 | Phase 11 | Pending |
| CDEMO-02 | Phase 11 | Pending |
| CDEMO-03 | Phase 11 | Pending |

**Coverage:**
- v1.0 requirements: 40 total (39 complete, 1 pending)
- v1.1 requirements: 19 total (all mapped to phases 7-11)
- Mapped to phases: 59 (40 v1.0 + 19 v1.1)
- Unmapped: 0

---
*Requirements defined: 2026-03-29*
*Last updated: 2026-03-30 after v1.1 roadmap creation*
