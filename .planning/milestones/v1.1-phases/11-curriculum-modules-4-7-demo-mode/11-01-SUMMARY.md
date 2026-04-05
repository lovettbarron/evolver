---
phase: 11-curriculum-modules-4-7-demo-mode
plan: 01
subsystem: content
tags: [sessions, cascadia, filters, lpg, modulation, curriculum]

requires:
  - phase: 10-curriculum-modules-1-3
    provides: Sessions 01-09 establishing Cascadia session format and pedagogical patterns
provides:
  - 6 session files (10-15) covering Modules 4 (Filters & LPG) and 5 (Modulation & Utilities)
  - Concept-first structure with generalized synthesis concepts before Cascadia-specific content
  - Normalled connection callouts and percentage notation throughout
affects: [11-04-demo-bundling, verification]

tech-stack:
  added: []
  patterns: [session-concept-first, normalling-callouts, percentage-notation]

key-files:
  created:
    - sessions/cascadia/10-filter-vcf-modes-resonance.md
    - sessions/cascadia/11-filter-filter-fm-self-oscillation.md
    - sessions/cascadia/12-filter-lpg-percussion-palette.md
    - sessions/cascadia/13-modulation-lfo-deep-dive.md
    - sessions/cascadia/14-modulation-sample-hold-slew.md
    - sessions/cascadia/15-modulation-mixuverter-voltage-processing.md
  modified: []

key-decisions:
  - "Sessions 10-12 cover VCF modes, filter FM, and LPG percussion palette (Module 4)"
  - "Sessions 13-15 cover LFO deep dive, S&H/slew, and mixuverter (Module 5)"
  - "Session 12 builds on Session 9's LPG intro with expanded percussion palette"

patterns-established:
  - "Cable summary tables in all sessions with cable overrides documented"
  - "Exercises capped at 3-4 per session with audible results at every step"

requirements-completed: [CCURR-01]

duration: 15min
completed: 2026-04-04
---

# Plan 11-01: Filters & LPG and Modulation & Utilities Sessions

**6 sessions teaching intermediate synthesis techniques: multimode filtering, filter FM, LPG percussion, LFO modulation, sample & hold/slew, and voltage processing with the mixuverter.**

## Self-Check: PASSED

- [x] 6 files created in sessions/cascadia/
- [x] Sessions 10-12 use module: "Filters & LPG"
- [x] Sessions 13-15 use module: "Modulation & Utilities"
- [x] Sequential prerequisites: 9->10->11->12->13->14->15
- [x] All contain concept-first sections, warm-ups, exercises, output checklists
- [x] Percentage notation used throughout (no clock positions)
- [x] Normalled connection [!info] callouts present in all sessions
