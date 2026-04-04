---
phase: 11-curriculum-modules-4-7-demo-mode
plan: 02
subsystem: content
tags: [sessions, cascadia, advanced-patching, fm, feedback, fx, curriculum]

requires:
  - phase: 10-curriculum-modules-1-3
    provides: Sessions 01-09 establishing Cascadia session format
provides:
  - 4 session files (16-19) covering Module 6 (Advanced Patching)
  - Progressive complexity from FM basics through stacked audio-rate modulation
  - Safety warnings for feedback loops
affects: [11-04-demo-bundling, verification]

tech-stack:
  added: []
  patterns: [safety-warnings, progressive-complexity]

key-files:
  created:
    - sessions/cascadia/16-advanced-fm-chains-cross-modulation.md
    - sessions/cascadia/17-advanced-self-patching-feedback.md
    - sessions/cascadia/18-advanced-fx-pedal-integration.md
    - sessions/cascadia/19-advanced-audio-rate-modulation.md
  modified: []

key-decisions:
  - "Session 17 includes prominent safety warnings for feedback experiments"
  - "Session 18 set to intermediate difficulty (FX routing is simpler than other advanced topics)"
  - "Session 19 explores the vibrato-to-FM continuum as a unifying concept"

patterns-established:
  - "Warning callouts for potentially dangerous operations (feedback)"
  - "Concept sections explaining the continuum between related synthesis techniques"

requirements-completed: [CCURR-01]

duration: 12min
completed: 2026-04-04
---

# Plan 11-02: Advanced Patching Sessions

**4 sessions covering FM chains/cross-modulation, self-patching feedback loops, FX pedal integration, and audio-rate modulation mastery.**

## Self-Check: PASSED

- [x] 4 files created in sessions/cascadia/
- [x] All use module: "Advanced Patching"
- [x] Sequential prerequisites: 15->16->17->18->19
- [x] Session 17 contains [!warning] callout for feedback safety
- [x] Session 18 has difficulty: intermediate (others are advanced)
- [x] Percentage notation throughout, no clock positions
- [x] Normalled connection [!info] callouts in all sessions
