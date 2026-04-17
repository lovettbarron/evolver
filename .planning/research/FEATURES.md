# Feature Landscape: Eurorack Module Learning

**Domain:** Individual eurorack module learning within an existing instrument mastery app
**Researched:** 2026-04-16
**Confidence:** HIGH (existing framework patterns well-established, module specs verified via manufacturer docs)

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Per-module session curricula (5-12 sessions each) | Core value proposition -- structured learning for each module | High | 6 modules x ~8 sessions avg = ~48 sessions total |
| Module front plate SVG panels | Every instrument already has one; modules without panels feel second-class | High | 6 panels, varying HP widths (10-18 HP), reference-first hand-placement |
| Category-based navigation | Eurorack users think in categories (VCO, filter, effects) not alphabetical lists | Medium | Top-level "Modules" section with category filter/tabs |
| Multi-category membership | Maths IS a function generator AND envelope AND LFO AND utility; Just Friends IS modulator AND VCO AND envelope generator | Medium | Data model must support arrays of categories, not single enum |
| Module overview pages | Each module needs architecture, signal flow, controls reference | Medium | Follows existing `instruments/<name>/overview.md` pattern |
| "Basic patch" equivalent per module | Framework requires a known starting state; for modules this is "default/init state" or "simplest useful patch" | Low | Most modules have a self-patch or normalled default |
| Session frontmatter with module identity | Sessions need to know which module they belong to, separate from instrument curricula | Low | Extend `SessionSchema` or create parallel schema |
| Demo mode for modules | Existing instruments have demo mode; modules need it too | Medium | Synthetic learner journeys for 6 modules |
| Progress tracking per module | Completion toggle, practice metrics must work for modules | Low | Extend existing Zustand store -- same pattern, new keys |
| Prerequisite badges within module curricula | Sessions within a module need ordered progression | Low | Same soft-gating pattern already built |

## Differentiators

Features that set the product apart. Not expected, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Cross-module interaction patterns | "Connect Plaits output to Ikarie input" -- guided patching between modules the user actually owns | High | Category-aware suggestions: "Your VCO into your Filter" |
| Category-based "what can I do?" view | Browse by function (all your modulators, all your sound sources) rather than by module | Medium | Leverages multi-category tagging; groups modules by role |
| Module comparison within category | "Both Plaits and Just Friends can be VCOs -- here's how they differ" | Medium | Only relevant for multi-category modules |
| Rack context awareness | Understanding which modules the user has and suggesting patching combinations | High | Would need a "my rack" configuration; defer to later |
| HP-width-aware panel rendering | Panels render at correct relative sizes (Plaits 12HP vs Maths 20HP vs Ikarie 12HP) | Low | Adds realism; straightforward with SVG viewBox |
| Eurorack fundamentals sessions | 2-3 sessions covering signal levels, CV vs audio vs gate, power, HP | Medium | Useful for users new to eurorack; shared across all modules |
| Session cross-references between modules | "In Maths session 3, you created an envelope -- now use it to open Ikarie's filter" | Low | Markdown links; no new infrastructure needed |
| Patch recipe sessions combining modules | "Granular pad: Plaits -> Beads -> Swells" with step-by-step | Medium | Integration sessions similar to existing "Sound Design Recipes" module |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Full rack planner / ModularGrid clone | Scope explosion; ModularGrid already exists and is excellent | Link to ModularGrid; focus on learning, not planning |
| Audio-rate patch simulation | Not a VST; physical hardware learning tool | Use audio recording references instead |
| Universal module database | Can't support every module; 6 curated modules is the scope | Framework should be extensible so users can add their own modules |
| Automated CV/signal routing visualization | Too complex; patching is physical | Text-based cable routing (existing pattern) + panel highlights |
| Module purchase recommendations | Outside learning scope; becomes a gear blog | Stay focused on "learn what you own" |
| Video tutorials embedded in sessions | Text + audio only per project constraints (Out of Scope in PROJECT.md) | Keep text-based with audio snippets |
| Calendar-based module practice scheduling | Violates ADHD design principle -- sequence-based only | Use existing sequence-based progression |
| Shared module curricula between instruments | Cascadia already teaches its VCO/Filter/etc as part of its curriculum; don't merge | Module learning is standalone; Cascadia sessions stay in Cascadia |

## Category Taxonomy Design

### Recommended Categories

Based on eurorack community conventions and the 6 target modules:

| Category | Description | Target Modules | Color Identity |
|----------|-------------|----------------|----------------|
| VCO / Sound Source | Generates audio signals | Plaits, Just Friends (sound mode) | Needs assignment |
| Filter | Shapes frequency content | Ikarie | Needs assignment |
| Effects | Processes audio (reverb, granular, delay) | Swells, Beads | Needs assignment |
| Modulator | Generates control signals (envelopes, LFOs, functions) | Just Friends (shape/cycle mode), Maths | Needs assignment |
| Function Generator | Special case of modulator -- voltage-controlled slope/function | Maths | Could merge with Modulator |

### Multi-Category Mapping

| Module | Primary Category | Additional Categories | Notes |
|--------|-----------------|----------------------|-------|
| Plaits | VCO / Sound Source | -- | Pure sound source, 16 synthesis modes |
| Ikarie | Filter | -- | Stereo/dual peak filter with envelope follower |
| Swells | Effects | -- | Multi-model stereo reverb |
| Beads | Effects | -- | Granular processor / texture synthesizer |
| Just Friends | Modulator | VCO, Envelope Generator | Mode-dependent: Shape mode = envelopes, Cycle mode = LFOs, Sound mode = 6-voice polyphonic oscillator |
| Maths | Function Generator | Envelope, LFO, Slew Limiter, Utilities | The "Swiss army knife" -- 34+ documented uses |

### Category vs. Module Taxonomy Decision

**Recommendation: Flatten Function Generator into Modulator.**

Rationale: Function Generator is a eurorack-specific term that means "flexible modulator." Having both Modulator and Function Generator as separate categories when you only have 6 modules creates confusion. Maths IS a modulator -- it just happens to be the most flexible one.

**Final taxonomy: 4 categories**
1. **Sound Source** (VCO, oscillator, noise)
2. **Filter** (frequency shaping)
3. **Effects** (audio processing)
4. **Modulator** (envelopes, LFOs, function generators, utilities)

This maps cleanly to the eurorack signal flow: Source -> Filter -> Effects, with Modulators acting on any stage.

## Session Structure for Individual Modules

### Key Difference from Instrument Curricula

Instruments (Evolver, Cascadia, Octatrack) have 27-37 sessions across 7-10 modules because they are complete instruments with many subsystems. Individual eurorack modules are single-function (or multi-function) units. Their curricula should be shorter and tighter.

### Recommended Session Counts per Module

| Module | Recommended Sessions | Rationale |
|--------|---------------------|-----------|
| Plaits | 8-10 | 16 synthesis modes in 2 banks; each bank gets 2-3 sessions plus integration |
| Maths | 10-12 | Most complex module; needs envelope, LFO, slew, audio-rate, and utility sessions |
| Beads | 6-8 | 3 grain modes, 4 quality settings, attenurandomizers; moderate depth |
| Just Friends | 8-10 | 3 main modes (Shape/Cycle/Sound) plus Crow/Just Type integration |
| Swells | 5-7 | 9 reverb models (group by character), Swell Generator, Freeze/Reverse/Burst |
| Ikarie | 5-7 | Filter modes, stereo vs dual-peak, envelope follower, Beyond output |

**Total: ~42-54 sessions across 6 modules**

At 2-3 sessions per week, each module takes 2-5 weeks. The full set takes 14-18 weeks but modules are independent -- users learn whichever modules they own.

### Module Session Structure (Adapted from Framework)

Each module curriculum follows a compressed version of the 10-module taxonomy:

| Phase | Sessions | Focus |
|-------|----------|-------|
| 1. Orientation | 1 | Panel layout, what it does, first sound/signal |
| 2. Core Functions | 2-4 | Primary mode/function, basic parameters |
| 3. Advanced Functions | 2-4 | Secondary modes, CV modulation, hidden features |
| 4. Integration | 1-2 | Using with other modules, recipe patches, composition |

### Session Frontmatter Extension

```yaml
---
title: "Session 03: Granular Clouds"
module: "Core Functions"          # Learning module within this eurorack module
session_number: 3
duration: 20
prerequisite: 2
output_type: technique
difficulty: beginner
tags: [granular, grain-density, time-position]
instrument: beads                 # The eurorack module slug
instrument_type: eurorack_module  # NEW: distinguishes from full instruments
categories: [effects]             # NEW: category membership
reference: "Beads Manual pp. 4-6"
---
```

**Key addition:** `instrument_type` field to distinguish eurorack modules from full instruments in queries, routing, and UI. The `categories` array enables multi-category filtering.

## Feature Dependencies

```
Category Taxonomy Design
  --> Module Overview Pages (need categories for navigation)
  --> Category-Based Navigation (needs taxonomy finalized)
  --> Multi-Category Module Display (Just Friends, Maths)

Module Front Plate SVG Panels
  --> Session Panel Annotations (data-*-panel markers in session content)
  --> Module Overview Panel Display

Per-Module Session Curricula
  --> Module Overview Pages (sessions listed per module)
  --> Progress Tracking Extension (completion per module)
  --> Demo Mode Extension (synthetic data per module)
  --> Prerequisite Badges (within-module ordering)

Eurorack Fundamentals Sessions (optional)
  --> Cross-Module Interaction Patterns (need shared vocabulary)
  --> Patch Recipe Sessions (need fundamentals established)
```

## MVP Recommendation

**Phase 1 -- Data Model + First Module (Maths):**
1. Category taxonomy in data model (4 categories, multi-membership)
2. `instrument_type: eurorack_module` schema extension
3. Module overview page template
4. Maths curriculum (10-12 sessions) -- most complex, proves the framework
5. Maths front plate SVG panel

**Phase 2 -- Remaining Modules + Navigation:**
6. Plaits curriculum + panel (8-10 sessions)
7. Beads curriculum + panel (6-8 sessions)
8. Category-based navigation UI
9. Module landing page with category filter

**Phase 3 -- Final Modules + Integration:**
10. Just Friends + Crow curriculum + panel (8-10 sessions)
11. Swells curriculum + panel (5-7 sessions)
12. Ikarie curriculum + panel (5-7 sessions)
13. Cross-module interaction patterns
14. Demo mode for all 6 modules

**Defer:**
- Rack context awareness: requires "my rack" configuration UI; not needed for learning
- Module comparison within category: nice-to-have after all modules exist
- Eurorack fundamentals sessions: can be added after module curricula prove the pattern

**Rationale for Maths first:** It is the most complex module with the widest category spread (function generator, envelope, LFO, utilities). If the framework handles Maths well, every other module is simpler. It also has the richest existing pedagogical material (illustrated supplement, 34+ patch ideas, extensive community guides).

## Session Count Summary

| Scope | Sessions | Duration (weeks at 3/wk) |
|-------|----------|-------------------------|
| Maths alone | 10-12 | 3-4 weeks |
| All 6 modules | 42-54 | 14-18 weeks |
| Existing instruments | 95 (37+27+31) | Already complete |
| **Total platform** | **137-149** | -- |

## Sources

- [Learning Modular](https://learningmodular.com/) -- structured eurorack course platform
- [Noise Engineering: Starting Out In Modular](https://noiseengineering.us/blogs/loquelic-literitas-the-blog/starting-out-in-modular/) -- module category fundamentals
- [Make Noise Maths Manual + Illustrated Supplement](https://www.makenoisemusic.com/modules/maths/) -- 34+ patch ideas
- [Mutable Instruments Plaits Documentation](https://pichenettes.github.io/mutable-instruments-documentation/modules/plaits/) -- 16 synthesis modes reference
- [Mutable Instruments Beads Documentation](https://pichenettes.github.io/mutable-instruments-documentation/modules/beads/) -- granular modes reference
- [Whimsical Raps Just Friends](https://www.whimsicalraps.com/products/just-friends) -- manifold generator reference
- [Whimsical Raps Just Friends Technical Maps](https://github.com/whimsicalraps/Mannequins-Technical-Maps/blob/main/just-friends/just-friends.md) -- 20+ page patch guide
- [Intellijel Swells](https://intellijel.com/shop/eurorack/swells/) -- 9 reverb models, Swell Generator
- [Bastl Instruments Ikarie](https://bastl-instruments.com/eurorack/modules/ikarie) -- stereo/dual peak filter
- [Synthtopia: 22 Ways to Use Make Noise Maths](https://www.synthtopia.com/content/2018/06/15/22-ways-to-use-a-make-noise-maths-eurorack-module/)
- [CDM: Dozens of Recipes on Plaits](https://cdm.link/2023/03/learn-mutable-instruments-plaits/)
- [ModularGrid module tags](https://modulargrid.net/e/tags/view/39) -- community category conventions
