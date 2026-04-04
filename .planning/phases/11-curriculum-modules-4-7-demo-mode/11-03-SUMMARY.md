---
phase: 11-curriculum-modules-4-7-demo-mode
plan: 03
subsystem: content
tags: [sessions, patches, cascadia, sound-design, recipe, curriculum]

requires:
  - phase: 10-curriculum-modules-1-3
    provides: Sessions 01-09, existing patch format (lpg-bongo, fm-bell)
provides:
  - 6 session files (20-25) covering Module 7 (Sound Design)
  - 6 recipe patches with full cable routing and knob settings
  - Curriculum capstone (Session 25) with congratulatory completion message
affects: [11-04-demo-bundling, verification]

tech-stack:
  added: []
  patterns: [recipe-session-format, patch-clock-notation]

key-files:
  created:
    - sessions/cascadia/20-sound-design-bass.md
    - sessions/cascadia/21-sound-design-lead.md
    - sessions/cascadia/22-sound-design-pad.md
    - sessions/cascadia/23-sound-design-percussion.md
    - sessions/cascadia/24-sound-design-texture.md
    - sessions/cascadia/25-sound-design-ambient.md
    - patches/cascadia/deep-sub-bass-recipe.md
    - patches/cascadia/searing-lead-recipe.md
    - patches/cascadia/evolving-pad-recipe.md
    - patches/cascadia/complex-percussion-recipe.md
    - patches/cascadia/granular-texture-recipe.md
    - patches/cascadia/ambient-drift-recipe.md
  modified: []

key-decisions:
  - "Patch types match PatchSchema enum: bass, lead, pad, drum, texture, pad (not 'percussion' or 'ambient')"
  - "Sessions use percentage notation; patches use clock position notation per convention"
  - "Session 25 ambient patch uses type: pad (closest PatchSchema match)"
  - "Session 23 percussion uses type: drum (schema enum value)"

patterns-established:
  - "Recipe session format: Building the Patch section with cable table + module-by-module knob settings"
  - "Playing Tips and Variations sections for recipe sessions"
  - "Cross-referencing between sessions and patches via session_origin and Created In links"

requirements-completed: [CCURR-01, CCURR-06]

duration: 25min
completed: 2026-04-04
---

# Plan 11-03: Sound Design Sessions and Recipe Patches

**6 recipe sessions (bass, lead, pad, percussion, texture, ambient) each building a complete patch from scratch, plus 6 documented patches with full cable routing and clock-position knob settings.**

## Self-Check: PASSED

- [x] 6 session files created in sessions/cascadia/ (20-25)
- [x] 6 patch files created in patches/cascadia/ (*-recipe.md)
- [x] All sessions use module: "Sound Design" and output_type: patch
- [x] All patches have cable_routing and knob_settings
- [x] Patch types: bass(1), lead(1), pad(2), drum(1), texture(1) — all valid PatchSchema enum
- [x] No "percussion" or "ambient" type values used
- [x] Sessions use percentages, patches use clock positions
- [x] Session 25 includes curriculum completion congratulations
- [x] All patches contain session_origin, How to Play, What Makes It Work, Created In
