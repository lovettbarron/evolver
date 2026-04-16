# Phase 25: Complete Octatrack Curriculum + Site Integration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-16
**Phase:** 25-complete-the-octatrack-curriculum-work-so-that-it-is-ready-to-add-to-the-evolver-site-focus-on-song-writing-and-arrangement-and-live-sessions-and-looping
**Areas discussed:** Curriculum scope, Site integration depth, Octatrack color identity, Patches + panel markers

---

## Gray Area Selection

| Option | Description | Selected |
|--------|-------------|----------|
| Curriculum scope | How many sessions, what counts as "ready for the site" | ✓ |
| Site integration depth | Full parity vs minimal listing | ✓ |
| Octatrack color identity | Accent + surface tint direction | ✓ |
| Patches + panel markers | How many patches, marker density | ✓ |

**User's choice:** All four areas.

---

## Curriculum Scope

### Q1: What counts as "complete enough" for Phase 25 curriculum?

| Option | Description | Selected |
|--------|-------------|----------|
| Focus modules only (Recommended) | Finish Modules 7-10 (~12 sessions). Matches roadmap title literally. | |
| Foundations + focus modules | Modules 1-3 + 7-10 = ~20 sessions. Gap-free path to focus areas. | |
| All 31 sessions | Full Evolver/Cascadia parity — biggest scope. | ✓ |
| Focus modules + slim spine | Modules 7-10 full, 1-6 skeleton. Complete map, focused depth. | |

**User's choice:** All 31 sessions
**Notes:** User is committing to full curriculum depth rather than the focus-only interpretation of the phase title. The "focus on songwriting/arrangement and live/looping" is treated as a weighting/bias, not an exclusion.

### Q2: Triple-write pipeline handling

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, triple-write all (Recommended) | sessions/ + src/content/ + ~/song/. Site + demo + local all work. | ✓ |
| sessions/ + src/content/ only | Skip vault — populate later when practicing. | |
| sessions/ + vault only | Skip bundled content — demo on Vercel won't show OT. | |

**User's choice:** Yes, triple-write all (Recommended)
**Notes:** Demo mode parity is explicitly wanted.

---

## Site Integration Depth

### Q1: How deep should site integration go?

| Option | Description | Selected |
|--------|-------------|----------|
| Full Cascadia parity (Recommended) | Instrument selector, instrument.json, nav, panel route, capability-gated MIDI, home card, search/progress/prereq, demo journey, color identity. | ✓ |
| Parity minus demo-mode journey | Full parity except synthetic practice journey. Ships faster. | |
| Minimal listing | Session browser only. Panel page, capability gating, demo journey deferred. | |

**User's choice:** Full Cascadia parity (Recommended)

### Q2: Capability profile

| Option | Description | Selected |
|--------|-------------|----------|
| Sampler profile (Recommended) | New flags: has_sampler, has_sequencer, has_midi_sequencer, has_sysex=false, has_patch_memory=false. Hides SysEx, uses project-state patch format. | ✓ |
| Cascadia-style (CV-only equivalent) | Reuse minimal Cascadia flags. Simpler but less accurate. | |
| Evolver-style minus SysEx | Reuse Evolver shape, flip has_sysex=false. Doesn't reflect OT reality. | |

**User's choice:** Sampler profile (Recommended)
**Notes:** New flags explicitly introduced — sets precedent for future non-synth instruments.

---

## Octatrack Color Identity

### Q1: Accent color direction

| Option | Description | Selected |
|--------|-------------|----------|
| Elektron orange (Recommended) | Warm hue 35-45, chroma 0.15-0.17. References MKI display + brand orange. Warm pole opposite Evolver blue / Cascadia steel. | ✓ |
| Amber / desaturated orange | Hue 50-60, chroma 0.10. Easier contrast, less brand-specific. | |
| Neutral warm gray | Chroma 0.04-0.05. Echoes physical chassis but weakens identity. | |
| You decide (orange direction) | Pick exact OKLCH during implementation. | |

**User's choice:** Elektron orange (Recommended)

### Q2: Surface tinting

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, matching Phase 24 (Recommended) | data-instrument='octatrack' cascade overrides for bg/surface/surface-raised. Subtle warm-tint. | ✓ |
| Accent only, shared neutral surfaces | Only accent/param overrides. Less noise but breaks pattern. | |

**User's choice:** Yes, matching Phase 24 (Recommended)

---

## Patches + Panel Markers

### Q1: Patch library size

| Option | Description | Selected |
|--------|-------------|----------|
| 3-4 focus-module demo projects (Recommended) | One project per focus module (7/8/9/10). Plus basic-project.md. Matches Cascadia's demo-patch volume. | ✓ |
| 1 basic-project patch only | Just basic-project + maybe one composition. Minimal. | |
| Full patch library (10+) | Match Evolver's 23-patch volume. Much bigger scope. | |
| Defer to follow-up phase | Ship curriculum + integration now; patches in later phase. | |

**User's choice:** 3-4 focus-module demo projects (Recommended)

### Q2: Panel marker coverage

| Option | Description | Selected |
|--------|-------------|----------|
| Focus modules only (Recommended) | Modules 7-10 get rich markers on key exercises; earlier modules get sparse markers on critical gestures (Parts, Scene A/B, Crossfader, REC1-3). | ✓ |
| Every session, every exercise | Exhaustive coverage. Max visualizer value, significant authoring effort. | |
| Minimal — one marker per session | One "hero" marker per session. Visualizer mostly decorative. | |
| You decide per session | Claude's discretion during session writing. | |

**User's choice:** Focus modules only (Recommended)

---

## Claude's Discretion

- Session topic depth within each module (within ADHD 15-30 min hard cap, single objective, tangible output)
- Exact OKLCH numbers for orange accent (iterate against WCAG AA, commit final values)
- Marker count per session in focus modules (use comprehension as gate)
- Synthetic daily-notes content for Octatrack demo journey (match Cascadia pattern)
- Patch sample choices and exact project configurations within the 4 demo projects
- Session ordering already defined in modules.md — follow it

## Deferred Ideas

- Extended patch library (10+ beyond demo-4) — backlog
- UI surfacing of has_midi_sequencer capability — future phase
- Audio recording integration for Octatrack sessions — tracked in PROJECT.md active requirements
- Retroactive milestone placement (phase sits in v1.3 Visual Redesign despite being content+integration) — handle at milestone audit
