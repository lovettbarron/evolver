# Phase 29: Maths Curriculum + Panel - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-18
**Phase:** 29-maths-curriculum-panel
**Areas discussed:** Curriculum progression, Overview page content, Panel approach, Manual & references

---

## Curriculum Progression

### First Session Focus

| Option | Description | Selected |
|--------|-------------|----------|
| Rise/Fall as envelope (Recommended) | Start with Ch1 or Ch4 as a basic attack-decay envelope — most intuitive, immediate musical result | ✓ |
| Orientation + attenuverters | Tour all sections before making sound — map the terrain first | |
| Simple LFO | Start with a channel in cycle mode as an LFO — wobble a parameter | |

**User's choice:** Rise/Fall as envelope
**Notes:** None

### Channel Symmetry Handling

| Option | Description | Selected |
|--------|-------------|----------|
| Ch1 first, Ch4 later (Recommended) | Teach on Ch1 first, introduce Ch4's unique features (EOC/EOR) later — reduces cognitive load | ✓ |
| Both channels together | Use both Ch1 and Ch4 from the start — more powerful but complex | |
| Function-first, not channel-first | Organize by use case rather than channel | |

**User's choice:** Ch1 first, Ch4 later
**Notes:** None

### Audio-Rate Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Late — session 8-10 (Recommended) | Audio-rate is advanced. Build up through envelopes, LFOs, slew first | |
| Mid — session 5-6 | Introduce oscillator mode mid-curriculum as a surprise | |
| Early taste, deep dive later | Brief exposure in session 3-4, full exploration in session 9-10 | ✓ |

**User's choice:** Early taste, deep dive later
**Notes:** None

### Cross-Module Patching

| Option | Description | Selected |
|--------|-------------|----------|
| 1-2 integration sessions at end (Recommended) | Final sessions patch Maths into other modules — real-world use after mastering standalone | ✓ |
| Weave in throughout | Each session briefly patches Maths into another module | |
| None — Maths only | Keep purely Maths-focused; cross-module belongs in XMOD requirements | |

**User's choice:** 1-2 integration sessions at end
**Notes:** None

---

## Overview Page Content

### Detail Level

| Option | Description | Selected |
|--------|-------------|----------|
| Full overview (Recommended) | Architecture (4 channels, OR/SUM/INV, EOC/EOR), complete controls table, init state — matches instrument pattern | ✓ |
| Condensed overview | Brief intro + controls table only — proportional to single module | |
| Learner-focused overview | Focus on "what can Maths DO" rather than technical architecture | |

**User's choice:** Full overview
**Notes:** None

### Init State

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — define a "basic patch" (Recommended) | Specific knob positions producing a known result. Sessions start from here | ✓ |
| No init state | Each session describes its own starting positions. No single home base | |
| Multiple starting states | 2-3 init states for different use cases | |

**User's choice:** Yes — define a "basic patch"
**Notes:** None

---

## Panel Approach

### Implementation Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Data file for generic renderer (Recommended) | Create panel data file assuming Phase 28's ModulePanel will consume it. Data ready, won't render until Phase 28 | ✓ |
| Standalone component first | Build dedicated maths-panel.tsx. Refactor later in Phase 28 | |
| Skip panel, curriculum only | Focus on curriculum. Panel data alongside Phase 28 | |

**User's choice:** Data file for generic renderer
**Notes:** None

### Control ID Naming

| Option | Description | Selected |
|--------|-------------|----------|
| Channel-based IDs (Recommended) | e.g., knob-ch1-rise, knob-ch1-fall, jack-ch1-trig — matches user mental model | ✓ |
| Section-based IDs | e.g., knob-rise-ch1 — groups by function first, consistent with Cascadia pattern | |
| You decide | Claude picks based on codebase patterns | |

**User's choice:** Channel-based IDs
**Notes:** None

---

## Manual & References

### Manual Handling

| Option | Description | Selected |
|--------|-------------|----------|
| Download before curriculum work (Recommended) | Include downloading actual PDF as first task — essential for accuracy | ✓ |
| Use online resources | Work from website, YouTube, community guides instead of PDF | |
| Use existing knowledge + manual later | Start now, cross-reference manual as verification later | |

**User's choice:** Download before curriculum work
**Notes:** None

### Supplementary Resources

| Option | Description | Selected |
|--------|-------------|----------|
| Manual + community guides (Recommended) | Reference official manual plus well-known resources like Maths Illustrated Supplement | ✓ |
| Manual only | Single source of truth, no third-party dependency | |
| You decide | Claude determines which supplements are worth referencing | |

**User's choice:** Manual + community guides
**Notes:** None

---

## Claude's Discretion

- Exact session topics and titles (within progression constraints)
- Controls reference table format
- Specific "basic patch" knob positions
- Panel data file format (compatible with Phase 28)
- Which community guides to reference

## Deferred Ideas

None — discussion stayed within phase scope
