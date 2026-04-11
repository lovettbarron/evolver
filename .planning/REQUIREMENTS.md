# Requirements: Instrument Deep Learning — v1.3 Visual Redesign

**Defined:** 2026-04-07
**Core Value:** ADHD-friendly instrument mastery through structured micro-sessions, backed by an Obsidian-powered web app that makes learning visible, shareable, and connected to actual music-making.

## v1.3 Requirements

Requirements for the visual redesign milestone. Each maps to roadmap phases.

### Design Tokens

- [x] **TOKEN-01**: User sees a warm dark color palette with 5+ surface elevation levels (bg, sunken, surface, raised, overlay)
- [ ] **TOKEN-02**: User sees a modular typography scale with distinct heading and body typefaces
- [ ] **TOKEN-03**: User sees consistent spacing applied uniformly across all pages and components
- [x] **TOKEN-04**: User sees all text/background combinations meeting WCAG AA contrast ratios (4.5:1 minimum)
- [x] **TOKEN-05**: User sees warm dark tones (olive/brown undertones) instead of cold pure grays
- [x] **TOKEN-06**: User sees subtly different accent colors for Evolver vs Cascadia instrument sections

### Layout

- [x] **LAYOUT-01**: User sees a navigation bar with visual weight, brand expression, and clear active state indicators
- [x] **LAYOUT-02**: User sees mobile-optimized layouts with appropriate content widths per page type (narrow for sessions, wider for grids)
- [x] **LAYOUT-03**: User sees a designed footer with project identity and instrument navigation links
- [x] **LAYOUT-04**: User sees visually distinct page shells for each instrument (subtle color/accent variation)

### Content

- [x] **CONTENT-01**: User sees markdown content rendered as polished prose — styled headings, tables, code blocks, callouts, and task lists that look designed
- [x] **CONTENT-02**: User sees session content with editorial layout — parameter callouts as styled inline elements, numbered steps as designed markers, section dividers

### Components

- [x] **COMP-01**: User sees unified visual language across all card types (consistent borders, padding, hover states, border-radius)
- [x] **COMP-02**: User sees intentional focus states on all interactive elements matching the design system
- [x] **COMP-03**: User sees micro-interactions on hover (scale transforms, spring transitions) and completion celebrations
- [x] **COMP-04**: User sees content sections fade in subtly as they enter the viewport on scroll

### Specialized

- [x] **SPEC-01**: User sees smooth panel visualizer zoom transitions and contextual dimming of non-relevant sections
- [x] **SPEC-02**: User sees an elevated progress page with data visualization instead of plain stat cards

## Future Requirements

### v1.4+ Candidates

- **VIS-01**: Progress page as explorable data art (module map, practice heat map)
- **VIS-02**: Page transition animations between routes
- **VIS-03**: Per-instrument custom imagery/photography in headers

## Out of Scope

| Feature | Reason |
|---------|--------|
| Light mode / theme toggle | Dark mode is brand identity; doubles design work for single-user app |
| Parallax scrolling | Conflicts with ADHD focus; causes motion sickness |
| Custom cursor / pointer effects | Breaks accessibility, adds no information |
| Glassmorphism / frosted glass | Reduces readability on dark backgrounds, ages quickly |
| Neon / retrowave aesthetics | Cliche for synth apps; Hologram's understated approach preferred |
| Skeleton loading screens | Over-engineering for local-first filesystem reads |
| SVG panel internal restyling | 289 hand-placed controls simulate hardware; high risk, zero reward |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TOKEN-01 | Phase 18 | Complete |
| TOKEN-02 | Phase 19 | Pending |
| TOKEN-03 | Phase 18 | Pending |
| TOKEN-04 | Phase 18 | Complete |
| TOKEN-05 | Phase 18 | Complete |
| TOKEN-06 | Phase 23 | Complete |
| LAYOUT-01 | Phase 20 | Complete |
| LAYOUT-02 | Phase 20 | Complete |
| LAYOUT-03 | Phase 20 | Complete |
| LAYOUT-04 | Phase 20 | Complete |
| CONTENT-01 | Phase 19 | Complete |
| CONTENT-02 | Phase 21 | Complete |
| COMP-01 | Phase 21 | Complete |
| COMP-02 | Phase 21 | Complete |
| COMP-03 | Phase 22 | Complete |
| COMP-04 | Phase 22 | Complete |
| SPEC-01 | Phase 23 | Complete |
| SPEC-02 | Phase 23 | Complete |

**Coverage:**
- v1.3 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0

---
*Requirements defined: 2026-04-07*
*Last updated: 2026-04-06 after roadmap creation*
