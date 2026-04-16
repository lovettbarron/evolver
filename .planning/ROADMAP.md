# Roadmap: Instrument Deep Learning

## Milestones

- ✅ **v1.0 Evolver Learning Platform** — Phases 1-6 (shipped 2026-03-30)
- ✅ **v1.1 Cascadia Instrument Support** — Phases 7-13.1 (shipped 2026-04-05)
- ✅ **v1.2 Learner Experience & Discovery** — Phases 14-17 (shipped 2026-04-07)
- 🚧 **v1.3 Visual Redesign** — Phases 18-24 (in progress)

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

<details>
<summary>✅ v1.2 Learner Experience & Discovery (Phases 14-17) — SHIPPED 2026-04-07</summary>

- [x] Phase 14: Learner State Foundation (3/3 plans) — completed 2026-04-06
- [x] Phase 15: Navigation & Progress Enhancements (3/3 plans) — completed 2026-04-06
- [x] Phase 16: Search & Filtering (3/3 plans) — completed 2026-04-06
- [x] Phase 17: Content & Pedagogy (3/3 plans) — completed 2026-04-07

Full details: [milestones/v1.2-ROADMAP.md](milestones/v1.2-ROADMAP.md)

</details>

### 🚧 v1.3 Visual Redesign (In Progress)

**Milestone Goal:** Comprehensive visual and layout redesign — new design system, typography, color palette, layout structure, interactive element styling, and polished markdown rendering that feels native, not like raw markdown.

- [x] **Phase 18: Token Foundation** - OKLCH color palette, spacing scale, contrast validation, warm dark surface elevations (completed 2026-04-07)
- [x] **Phase 19: Prose & Typography** - Modular type scale, polished markdown rendering via @tailwindcss/typography with domain overrides (completed 2026-04-08)
- [x] **Phase 20: Layout Shell & Navigation** - Navigation bar redesign, responsive page shells, footer, instrument-aware layout variation (completed 2026-04-10)
- [x] **Phase 21: Cards & Content Components** - Unified card visual language, focus states, editorial session layout with designed markers (completed 2026-04-11)
- [x] **Phase 22: Interactive Elements & Motion** - Micro-interactions, scroll reveals, spring transitions via motion package (completed 2026-04-11)
- [x] **Phase 23: Panel & Progress Polish** - Panel visualizer container polish, progress data visualization, instrument accent colors (completed 2026-04-12)
- [x] **Phase 24: Instrument Color Identity** - Per-instrument color palettes (Evolver blue, Cascadia gray), Intellijel aluminum neutral base (completed 2026-04-13)

## Phase Details

### Phase 18: Token Foundation
**Goal**: Every page renders with a warm dark palette, consistent spacing, and verified accessible contrast — the visual foundation all subsequent phases inherit
**Depends on**: Phase 17 (v1.2 complete)
**Requirements**: TOKEN-01, TOKEN-03, TOKEN-04, TOKEN-05
**Success Criteria** (what must be TRUE):
  1. User sees 5+ distinct surface elevation levels (bg, sunken, surface, raised, overlay) with warm olive/brown undertones instead of cold grays
  2. User sees consistent spacing rhythm across all existing pages — no page has mismatched padding or margin patterns
  3. All text/background combinations pass WCAG AA contrast (4.5:1 minimum) as verified by automated tooling
  4. Existing app functionality is visually unchanged in structure — only color temperature, surface depth, and spacing are different
**Plans**: 3 plans
Plans:
- [x] 18-01-PLAN.md — OKLCH token swap + contrast validation + grain texture
- [x] 18-02-PLAN.md — Spacing migration (all 29 components to token references)
- [x] 18-03-PLAN.md — /dev/tokens verification page + visual checkpoint

### Phase 19: Prose & Typography
**Goal**: Session and patch content reads as polished editorial prose with clear typographic hierarchy — not a markdown viewer
**Depends on**: Phase 18
**Requirements**: TOKEN-02, CONTENT-01
**Success Criteria** (what must be TRUE):
  1. User sees distinct heading and body typefaces with a modular scale that creates clear visual hierarchy across h1-h4, body, and caption text
  2. User sees markdown tables, code blocks, callouts, and task lists rendered with designed styling (borders, backgrounds, spacing) that matches the warm dark palette
  3. User sees consistent prose rendering across all 60+ session files and 36+ patch documents — no unstyled or broken markdown elements
  4. Domain-specific prose elements (`.param-table`, `.callout`, `.quick-ref-prose`) retain their specialized styling within the new typography system
**Plans**: 2 plans
Plans:
- [x] 19-01-PLAN.md — Font setup + typography plugin + type scale + prose color overrides
- [x] 19-02-PLAN.md — Domain element editorial restyling + visual checkpoint
**UI hint**: yes

### Phase 20: Layout Shell & Navigation
**Goal**: The app has a visually weighted navigation bar, responsive page containers, a designed footer, and subtle per-instrument layout variation
**Depends on**: Phase 19
**Requirements**: LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04
**Success Criteria** (what must be TRUE):
  1. User sees a navigation bar with brand expression, visual weight beyond a minimal strip, and clear active state indicators for the current page
  2. User sees mobile-optimized layouts where session pages use narrow content widths and grid pages (patches, modules) use wider widths appropriate to their content type
  3. User sees a footer with project identity and instrument navigation links — not an empty bottom edge
  4. User sees visually distinct page shells when browsing Evolver vs Cascadia content — subtle accent/color variation signals which instrument context they are in
**Plans**: 3 plans
Plans:
- [x] 20-01-PLAN.md — Nav restyle with tokens, brand wordmark, active indicators
- [x] 20-02-PLAN.md — Footer extraction and page shell components
- [x] 20-03-PLAN.md — Mobile hamburger menu and data-instrument wiring
**UI hint**: yes

### Phase 21: Cards & Content Components
**Goal**: All card types share a unified visual language and session content uses editorial layout with designed inline elements
**Depends on**: Phase 20
**Requirements**: COMP-01, COMP-02, CONTENT-02
**Success Criteria** (what must be TRUE):
  1. User sees consistent borders, padding, hover states, and border-radius across all card types (hero, patch, module, instrument, count, session-row)
  2. User sees intentional focus states (keyboard navigation outlines, focus rings) on all interactive elements that match the warm dark design system
  3. User sees session content with parameter callouts as styled inline elements, numbered steps as designed markers, and section dividers — not raw markdown structure
**Plans**: 2 plans
Plans:
- [x] 21-01-PLAN.md — CSS foundation: .card base class, :focus-visible global, editorial prose rules
- [x] 21-02-PLAN.md — Component className migration + visual checkpoint
**UI hint**: yes

### Phase 22: Interactive Elements & Motion
**Goal**: Interactive elements respond with spring-physics micro-interactions and content reveals itself subtly on scroll
**Depends on**: Phase 21
**Requirements**: COMP-03, COMP-04
**Success Criteria** (what must be TRUE):
  1. User sees hover interactions on cards and buttons with scale transforms and spring transitions — not instant CSS jumps
  2. User sees completion celebrations (subtle animation feedback) when toggling session completion
  3. User sees content sections fade in subtly as they scroll into the viewport — no jarring pop-in or lateral movement
  4. User with `prefers-reduced-motion` enabled sees no animations — all motion respects the accessibility preference
**Plans**: 3 plans
Plans:
- [x] 22-00-PLAN.md — Wave 0: vitest test stubs for all motion components (Nyquist compliance)
- [x] 22-01-PLAN.md — Motion foundation: install motion, SpringCard wrapper, MotionProvider, card spring hover wiring
- [ ] 22-02-PLAN.md — ScrollReveal + StaggerGroup wrappers, grid/list/section reveal, completion celebration
**UI hint**: yes

### Phase 23: Panel & Progress Polish
**Goal**: Panel visualizers have polished zoom transitions, progress data is visualized not just listed, and each instrument has its own accent color identity
**Depends on**: Phase 22
**Requirements**: SPEC-01, SPEC-02, TOKEN-06
**Success Criteria** (what must be TRUE):
  1. User sees smooth zoom transitions on panel visualizers with contextual dimming of non-relevant sections — panel SVG internals remain untouched
  2. User sees the progress page with data visualization elements (charts, visual metrics) instead of plain stat cards
  3. User sees subtly different accent colors for Evolver vs Cascadia sections throughout the app (nav highlights, card accents, progress indicators)
  4. All pages pass an ADHD 5-second test: single clear visual hierarchy, no competing animated elements, same or fewer clicks to any destination as before the redesign
**Plans**: 4 plans
Plans:
- [x] 23-00-PLAN.md — Wave 0: test stubs for heatmap, panel viewBox, and accent audit (Nyquist)
- [x] 23-01-PLAN.md — Panel viewBox tween via motion.svg + accent color audit fixes
- [x] 23-02-PLAN.md — PracticeHeatmap component + progress page wiring
- [x] 23-03-PLAN.md — Full verification + visual checkpoint (ADHD 5-second test)
**UI hint**: yes

### Phase 24: Instrument Color Identity

**Goal**: Each instrument has its own color palette derived from its brand identity (Evolver blue, Cascadia gray), with an Intellijel eurorack aluminum neutral base replacing the current lime-centric palette
**Depends on:** Phase 23
**Requirements**: COLOR-01, COLOR-02, COLOR-03, COLOR-04, COLOR-05, COLOR-06
**Success Criteria** (what must be TRUE):
  1. User sees a neutral aluminum accent on the home page and non-instrument routes instead of lime green
  2. User sees blue accent colors on Evolver pages reflecting the DSI blue Lexan panel identity
  3. User sees cool gray accent colors on Cascadia pages reflecting the Intellijel aluminum panel identity
  4. User sees per-instrument inline code/parameter colors that are visibly lighter than their accent counterparts
  5. All accent and param text passes WCAG AA 4.5:1 contrast against all surface backgrounds
  6. No lime or teal green remnants visible anywhere in the app
**Plans:** 1/1 plans complete
Plans:
- [x] 24-01-PLAN.md — Per-instrument color primitives, semantic defaults, cascade overrides, test updates, visual checkpoint
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 18 → 19 → 20 → 21 → 22 → 23 → 24 → 25

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
| 14. Learner State Foundation | v1.2 | 3/3 | Complete | 2026-04-06 |
| 15. Navigation & Progress Enhancements | v1.2 | 3/3 | Complete | 2026-04-06 |
| 16. Search & Filtering | v1.2 | 3/3 | Complete | 2026-04-06 |
| 17. Content & Pedagogy | v1.2 | 3/3 | Complete | 2026-04-07 |
| 18. Token Foundation | v1.3 | 3/3 | Complete    | 2026-04-07 |
| 19. Prose & Typography | v1.3 | 2/2 | Complete    | 2026-04-08 |
| 20. Layout Shell & Navigation | v1.3 | 3/3 | Complete    | 2026-04-10 |
| 21. Cards & Content Components | v1.3 | 2/2 | Complete    | 2026-04-11 |
| 22. Interactive Elements & Motion | v1.3 | 1/3 | Complete    | 2026-04-11 |
| 23. Panel & Progress Polish | v1.3 | 4/4 | Complete    | 2026-04-12 |
| 24. Instrument Color Identity | v1.3 | 1/1 | Complete    | 2026-04-13 |
| 25. Octatrack Curriculum + Site Integration | v1.3 | 2/7 | In Progress|  |

### Phase 25: Complete the Octatrack curriculum work so that it is ready to add to the evolver site. Focus on song writing and arrangement, and live sessions and looping.

**Goal:** Take the Octatrack MKII from "metadata + 6 of 31 sessions + panel SVG" to full Cascadia-parity on the evolver site — complete 31-session curriculum, triple-write pipeline, full site integration (instrument selector, nav, capability-gated routes, demo mode), new sampler capability profile, Elektron-orange color identity with surface tinting, and 5 demo project-state patches.
**Requirements**: Decisions D-01 through D-22 from 25-CONTEXT.md (no REQ-IDs — CONTEXT decisions are the authoritative requirements)
**Depends on:** Phase 24
**Success Criteria** (what must be TRUE):
  1. All 31 Octatrack sessions exist in all three content locations with valid frontmatter (duration ≤ 30 min ADHD cap)
  2. Octatrack appears as a first-class instrument on home, nav, selector, session browser, patches, panel route, global search
  3. Capability gates correct: MIDI/SysEx page hidden for Octatrack, patch pages render project-state format (no cable routing, no knob settings)
  4. Color identity visible: Elektron orange accent + subtle warm surface tint on octatrack routes, WCAG AA readable
  5. 5 demo patches render from the patches index (basic-project + 4 focus-module demos)
  6. Demo mode shows a realistic Octatrack synthetic journey (~23/31 complete, partway through Module 8)
  7. Full test suite green + validate-content green + validate-contrast green + check-triple-write green + npm run build green
  8. D-22 guard: `src/components/octatrack-panel.tsx` and `src/lib/octatrack-panel-data.ts` unchanged throughout the phase
**Plans:** 2/7 plans executed

Plans:
- [x] 25-00-PLAN.md — Wave 0: test fixtures + test stubs + validate-contrast TOKEN_MAP refresh + check-triple-write.sh
- [x] 25-01-PLAN.md — Wave 1: Schema extension (sampler/sequencer/midi_sequencer optional flags) + globals.css orange primitives + [data-instrument="octatrack"] cascade + panel-route regression test
- [ ] 25-02-PLAN.md — Wave 2: Bootstrap 9 content directories + write instruments/octatrack/instrument.json + triple-write existing content + flip Wave 0 todos to real tests
- [ ] 25-03a-PLAN.md — Wave 3 (parallel): Author 16 Module 1-6 sessions with sparse markers + triple-write
- [ ] 25-03b-PLAN.md — Wave 3 (parallel): Author 9 focus-module sessions (19-24, 26, 27, 30) with dense panel markers + triple-write
- [ ] 25-04-PLAN.md — Wave 4: Author 5 demo patches (basic-project + 4 focus-module demos) in project-state format + triple-write
- [ ] 25-05-PLAN.md — Wave 5: Extend synthetic-daily-notes.ts with Octatrack journey + wire dispatchers + manual UAT checkpoint
