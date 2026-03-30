# Requirements: Instrument Deep Learning

**Defined:** 2026-03-29
**Core Value:** ADHD-friendly instrument mastery through structured micro-sessions, backed by an Obsidian-powered web app that makes learning visible, shareable, and connected to actual music-making.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

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

- [ ] **MIDI-01**: App can receive SysEx program dumps from the Evolver over MIDI
- [ ] **MIDI-02**: App parses SysEx data into structured parameter values matching the Evolver's program format
- [ ] **MIDI-03**: App stores extracted patches as structured data (markdown + frontmatter or JSON)
- [ ] **MIDI-04**: App can send SysEx program data back to the Evolver to restore a patch
- [ ] **MIDI-05**: User can compare two patches parameter-by-parameter (diff view)

### Progress Tracking

- [ ] **PROG-01**: User sees module completion status (additive count, no streaks)
- [ ] **PROG-02**: App scans ~/song daily notes for session log entries (tag-based)
- [ ] **PROG-03**: Dashboard shows additive metrics: sessions completed, patches created, modules done
- [ ] **PROG-04**: No streak counters, no "days since", no guilt-inducing metrics

### Challenge Mode

- [ ] **CHAL-01**: Sessions include challenge exercises ("create a patch that does X")
- [ ] **CHAL-02**: User can save challenge responses as patches linked to the challenge
- [ ] **CHAL-03**: Challenges reference audio examples or saved patches as targets to match/approximate
- [ ] **CHAL-04**: Challenge completion tracked as part of progress

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

- [ ] **DEPL-01**: App runs locally reading from ~/song vault
- [ ] **DEPL-02**: App deploys to Vercel with demo mode (curriculum visible, practice data synthetic)
- [ ] **DEPL-03**: Demo mode includes curated synthetic learner journey (realistic progress state)
- [ ] **DEPL-04**: Reference PDFs accessible in both local and demo modes

## v2 Requirements

### Additional Instruments

- **INST-10**: Intellijel Cascadia curriculum and instrument data
- **INST-11**: Framework validation: confirm methodology transfers to semi-modular

### Audio Integration

- **AUD-01**: Embedded audio examples in sessions (before/after, target sounds)
- **AUD-02**: Audio recording capture linked to patches/challenges

### Enhanced Patch Tools

- **PTCH-10**: Batch SysEx dump (all banks)
- **PTCH-11**: Patch randomization / mutation for exploration
- **PTCH-12**: Patch sharing export format

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time audio processing / synth emulation | Learning tool, not a VST |
| Mobile native app | Web-first, responsive is sufficient |
| User accounts / multi-user | Personal tool with public demo mode |
| Video tutorials | Text + audio for v1 |
| Database / ORM | Markdown + flat files is the correct architecture for this scale |
| Automated MIDI sequencing | Out of scope — this is a learning tool, not a DAW |

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
| MIDI-01 | Phase 4 | Pending |
| MIDI-02 | Phase 4 | Pending |
| MIDI-03 | Phase 4 | Pending |
| MIDI-04 | Phase 4 | Pending |
| MIDI-05 | Phase 4 | Pending |
| PROG-01 | Phase 5 | Pending |
| PROG-02 | Phase 5 | Pending |
| PROG-03 | Phase 5 | Pending |
| PROG-04 | Phase 5 | Pending |
| CHAL-01 | Phase 5 | Pending |
| CHAL-02 | Phase 5 | Pending |
| CHAL-03 | Phase 5 | Pending |
| CHAL-04 | Phase 5 | Pending |
| INST-01 | Phase 2 | Complete |
| INST-02 | Phase 2 | Complete |
| INST-03 | Phase 2 | Complete |
| INST-04 | Phase 1 | Complete |
| CURR-01 | Phase 1 | Complete |
| CURR-02 | Phase 1 | Complete |
| CURR-03 | Phase 1 | Complete |
| CURR-04 | Phase 1 | Complete |
| CURR-05 | Phase 1 | Complete |
| DEPL-01 | Phase 6 | Pending |
| DEPL-02 | Phase 6 | Pending |
| DEPL-03 | Phase 6 | Pending |
| DEPL-04 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 40 total
- Mapped to phases: 40
- Unmapped: 0

---
*Requirements defined: 2026-03-29*
*Last updated: 2026-03-29 after roadmap phase mapping*
