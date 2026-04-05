---
phase: 08-cascadia-instrument-data
plan: 02
title: "Cascadia Instrument Documentation"
subsystem: content
tags: [cascadia, documentation, modules, signal-flow, overview, markdown]
dependency_graph:
  requires: [08-01]
  provides: [cascadia-overview, cascadia-signal-flow, cascadia-module-docs]
  affects: [08-03, 09-01, 10-01]
tech_stack:
  added: []
  patterns: [dual-location-content, mermaid-signal-flow, module-template]
key_files:
  created:
    - src/content/instruments/cascadia/signal-flow.md
    - src/content/instruments/cascadia/modules.md
    - src/content/instruments/cascadia/modules/midi-cv.md
    - src/content/instruments/cascadia/modules/vco-a.md
    - src/content/instruments/cascadia/modules/vco-b.md
    - src/content/instruments/cascadia/modules/envelope-a.md
    - src/content/instruments/cascadia/modules/envelope-b.md
    - src/content/instruments/cascadia/modules/line-in.md
    - src/content/instruments/cascadia/modules/mixer.md
    - src/content/instruments/cascadia/modules/vcf.md
    - src/content/instruments/cascadia/modules/wave-folder.md
    - src/content/instruments/cascadia/modules/vca-a.md
    - src/content/instruments/cascadia/modules/push-gate.md
    - src/content/instruments/cascadia/modules/utilities.md
    - src/content/instruments/cascadia/modules/lfo-xyz.md
    - src/content/instruments/cascadia/modules/patchbay.md
    - src/content/instruments/cascadia/modules/vca-b-lpf.md
    - src/content/instruments/cascadia/modules/fx-send-return.md
    - src/content/instruments/cascadia/modules/output-control.md
    - instruments/cascadia/signal-flow.md
    - instruments/cascadia/modules.md
    - instruments/cascadia/modules/midi-cv.md
    - instruments/cascadia/modules/vco-a.md
    - instruments/cascadia/modules/vco-b.md
    - instruments/cascadia/modules/envelope-a.md
    - instruments/cascadia/modules/envelope-b.md
    - instruments/cascadia/modules/line-in.md
    - instruments/cascadia/modules/mixer.md
    - instruments/cascadia/modules/vcf.md
    - instruments/cascadia/modules/wave-folder.md
    - instruments/cascadia/modules/vca-a.md
    - instruments/cascadia/modules/push-gate.md
    - instruments/cascadia/modules/utilities.md
    - instruments/cascadia/modules/lfo-xyz.md
    - instruments/cascadia/modules/patchbay.md
    - instruments/cascadia/modules/vca-b-lpf.md
    - instruments/cascadia/modules/fx-send-return.md
    - instruments/cascadia/modules/output-control.md
  modified:
    - src/content/instruments/cascadia/overview.md
    - instruments/cascadia/overview.md
decisions: []
metrics:
  duration: "9min"
  completed: "2026-03-31"
---

# Phase 8 Plan 02: Cascadia Instrument Documentation Summary

Authored all Cascadia instrument documentation: 6-section overview with design philosophy and quick-start, normalled signal flow with Mermaid subgraph diagram, module index listing 17 hardware modules in panel order, and 17 individual module files with complete controls/jacks/normals from manual v1.1.

## What Was Done

### Task 1: Write overview, signal-flow, and modules index

- Rewrote overview.md with 6 sections: Identity, Design Philosophy, Panel Layout, Normalling Overview, What You Can Do With It, Make a Sound
- Created signal-flow.md with Mermaid subgraph diagram showing all normalled connections (solid arrows for audio path, dashed for modulation)
- Documented all 16 normalled connections in prose "What Each Connection Does" section
- Created modules.md index listing all 17 modules in panel order, grouped by category (Sound Sources, Modulators, Shapers, Utilities)
- All files written to both instruments/cascadia/ (vault) and src/content/instruments/cascadia/ (bundled)

**Commit:** 0924741

### Task 2: Write all 17 module documentation files

- Created all 17 module files following the locked template: Purpose, What Makes It Special, Controls table, Patch Points table, LEDs, Normalled Connections
- Envelope B documents all three modes (Envelope with AD/AHR/Cycle, LFO with Free/Sync/LFV, Burst Generator) with H2 subsections per mode
- Utilities documents three sub-modules (Sample & Hold, Slew/Envelope Follower, Mixuverter) with independent Controls and Patch Points tables
- Patchbay documents six sub-modules (Multiples, Summing, Inverter, Bi-to-Uni, Exp Source, Ring Modulator) with independent Patch Points tables
- Every frontmatter validates: type: module, instrument: cascadia, category enum, control_count, jack_count, has_normals
- "What Makes It Special" sections add synthesis perspective beyond the manual (TZFM comparison to DX7, wave folder to Buchla, LPG to West Coast tradition)

**Commit:** dec7ed2

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

- `ls src/content/instruments/cascadia/modules/*.md | wc -l` = 17
- `ls instruments/cascadia/modules/*.md | wc -l` = 17
- All 17 files contain `type: module` and `instrument: cascadia` in frontmatter
- All 17 files contain Purpose, Controls, and Patch Points sections
- envelope-b.md contains "Burst" (all three modes documented)
- utilities.md contains "Sample & Hold", "Slew", and "Mixuverter"
- patchbay.md contains "Multiples" and "Ring Modulator"
- Category checks: vco-a = sound-source, vcf = shaper, envelope-a = modulator, mixer = utility
- `npx vitest run` -- 314/314 tests pass (3 pre-existing PDF suite failures unrelated)
- Schema and reader tests: 42/42 pass

## Known Stubs

None.

## Self-Check: PASSED
