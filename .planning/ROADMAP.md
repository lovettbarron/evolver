# Roadmap: Instrument Deep Learning

## Milestones

- ✅ **v1.0 Evolver Learning Platform** — Phases 1-6 (shipped 2026-03-30)
- ✅ **v1.1 Cascadia Instrument Support** — Phases 7-13.1 (shipped 2026-04-05)
- ✅ **v1.2 Learner Experience & Discovery** — Phases 14-17 (shipped 2026-04-07)
- 🚧 **v1.3 Visual Redesign** — Phases 18-23 (in progress)

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
- [ ] **Phase 22: Interactive Elements & Motion** - Micro-interactions, scroll reveals, spring transitions via motion package
- [ ] **Phase 23: Panel & Progress Polish** - Panel visualizer container polish, progress data visualization, instrument accent colors

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
**Plans**: 2 plans
Plans:
- [ ] 22-01-PLAN.md — Motion foundation: install motion, SpringCard wrapper, MotionProvider, card spring hover wiring
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
**Plans**: 3 plans
Plans:
- [ ] 18-01-PLAN.md — OKLCH token swap + contrast validation + grain texture
- [ ] 18-02-PLAN.md — Spacing migration (all 29 components to token references)
- [ ] 18-03-PLAN.md — /dev/tokens verification page + visual checkpoint
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 18 → 19 → 20 → 21 → 22 → 23

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
| 22. Interactive Elements & Motion | v1.3 | 0/2 | Not started | - |
| 23. Panel & Progress Polish | v1.3 | 0/0 | Not started | - |
