# Roadmap: Instrument Deep Learning

## Overview

This roadmap delivers an ADHD-friendly instrument learning platform: from a data pipeline that reads Obsidian vault content through curriculum views and patch tools, to a deployed demo on Vercel. The work moves from invisible foundation (content pipeline + curriculum writing) through vertical feature slices (sessions, patches, MIDI, progress) to deployment. Existing work -- 7 sessions, framework docs, instrument data, Obsidian templates -- accelerates Phase 1 significantly.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Content Pipeline + Curriculum** - Data layer (vault reader, Zod schemas, markdown rendering) and complete 35-session Evolver curriculum (completed 2026-03-29)
- [ ] **Phase 2: Session Browser** - Browse sessions by module, read full session content, instrument-scoped routing
- [ ] **Phase 3: Patch Library** - Browse, filter, and inspect documented patches with parameter tables
- [ ] **Phase 4: MIDI SysEx Integration** - Receive, parse, store, and send SysEx patch dumps; patch diff view
- [ ] **Phase 5: Progress + Challenges** - Additive progress dashboard and challenge exercises with patch responses
- [ ] **Phase 6: Deployment** - Local vault mode, Vercel demo mode with synthetic data, reference PDF serving

## Phase Details

### Phase 1: Content Pipeline + Curriculum
**Goal**: The data layer can read, validate, and render all content types from an Obsidian vault (or bundled fallback), and the full 35-session Evolver curriculum exists as markdown files
**Depends on**: Nothing (first phase)
**Requirements**: PIPE-01, PIPE-02, PIPE-03, PIPE-04, PIPE-05, CURR-01, CURR-02, CURR-03, CURR-04, CURR-05, INST-04
**Success Criteria** (what must be TRUE):
  1. Running `npm run validate-content` against the vault passes Zod validation for all session, patch, and instrument frontmatter files
  2. The content reader returns identical data shapes whether reading from the local vault path or bundled demo content
  3. Markdown files with parameter tables, callouts, wikilinks, and code blocks render correctly as HTML
  4. All 35 Evolver sessions exist as markdown files with objective, warm-up, setup, exercises with specific values, and output checklist
  5. Evolver basic patch and signal flow/architecture documentation exist with full parameter dumps
**Plans**: 6 plans

Plans:
- [ ] 01-01-PLAN.md -- Project scaffolding, Zod schemas, content reader, validate-content script
- [ ] 01-02-PLAN.md -- Markdown rendering pipeline with Obsidian-flavored features
- [ ] 01-03-PLAN.md -- Instrument docs frontmatter + module map review
- [ ] 01-04-PLAN.md -- Curriculum sessions 01-18 (Modules 1-5)
- [ ] 01-05-PLAN.md -- Curriculum sessions 19-35 (Modules 6-10)
- [ ] 01-06-PLAN.md -- Bundle content to src/content/, reference PDFs, curriculum integration tests

### Phase 2: Session Browser
**Goal**: Users can browse, read, and navigate the Evolver curriculum through instrument-scoped routes with an action-first "what to do next" experience
**Depends on**: Phase 1
**Requirements**: SESS-01, SESS-02, SESS-03, SESS-04, SESS-05, INST-01, INST-02, INST-03
**Success Criteria** (what must be TRUE):
  1. User can see sessions organized by learning module on the instrument's session list page
  2. User can open any session and read formatted exercises, parameter tables, checklists, and source references
  3. Opening the app shows a "next session" action-first view -- the user knows exactly what to do within 5 seconds
  4. User can access quick-reference cards (basic patch, signal flow) without leaving the session context
  5. Each instrument has an overview page showing architecture, signal flow, and basic patch; framework methodology docs are visible in the app
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Patch Library
**Goal**: Users can browse, filter, and inspect their documented patches with full parameter detail and session provenance
**Depends on**: Phase 2
**Requirements**: PTCH-01, PTCH-02, PTCH-03, PTCH-04
**Success Criteria** (what must be TRUE):
  1. User can browse all documented patches in a list view with names and types visible
  2. User can filter patches by type (bass, lead, pad, drum, texture, sequence)
  3. User can open a patch and see full parameter dump, playing tips, and technique notes
  4. User can navigate from any patch to the session that created it
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: MIDI SysEx Integration
**Goal**: Users can capture patches from the Evolver over MIDI, store them as structured data, send patches back, and compare patches side-by-side
**Depends on**: Phase 3
**Requirements**: MIDI-01, MIDI-02, MIDI-03, MIDI-04, MIDI-05
**Success Criteria** (what must be TRUE):
  1. User can connect the Evolver via MIDI and receive a SysEx program dump in the browser
  2. The app parses raw SysEx bytes into named parameter values matching the Evolver program format
  3. Captured patches are stored as structured data (markdown + frontmatter or JSON) that the content reader can load
  4. User can send a stored patch back to the Evolver to restore it on the hardware
  5. User can view two patches side-by-side with parameter differences highlighted
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: Progress + Challenges
**Goal**: Users see guilt-free additive progress metrics and can complete challenge exercises that produce documented patches
**Depends on**: Phase 3
**Requirements**: PROG-01, PROG-02, PROG-03, PROG-04, CHAL-01, CHAL-02, CHAL-03, CHAL-04
**Success Criteria** (what must be TRUE):
  1. Dashboard shows additive counts only: sessions completed, patches created, modules done -- no streaks, no percentages, no time-based metrics
  2. App scans daily notes for session log entries and derives completion state without manual tracking
  3. Sessions include challenge exercises ("create a patch that does X") with audio/patch targets to match
  4. User can save challenge responses as patches linked to the originating challenge
  5. Challenge completion is reflected in progress counts
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD

### Phase 6: Deployment
**Goal**: The app runs locally against the real vault and deploys to Vercel with a compelling demo showing curriculum content and a realistic synthetic learner journey
**Depends on**: Phase 5
**Requirements**: DEPL-01, DEPL-02, DEPL-03, DEPL-04
**Success Criteria** (what must be TRUE):
  1. Running the app locally with a configured vault path shows real sessions, patches, and progress from the user's Obsidian vault
  2. The Vercel deployment shows the full curriculum with synthetic practice data (realistic 60% progress, 12+ patches, modules 1-5 complete)
  3. Reference PDFs are accessible in both local and demo modes
  4. A clean `git clone && npm install && npm run dev` with no vault path configured starts in demo mode with all features visible
**Plans**: TBD

Plans:
- [ ] 06-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Content Pipeline + Curriculum | 6/6 | Complete   | 2026-03-29 |
| 2. Session Browser | 0/TBD | Not started | - |
| 3. Patch Library | 0/TBD | Not started | - |
| 4. MIDI SysEx Integration | 0/TBD | Not started | - |
| 5. Progress + Challenges | 0/TBD | Not started | - |
| 6. Deployment | 0/TBD | Not started | - |
