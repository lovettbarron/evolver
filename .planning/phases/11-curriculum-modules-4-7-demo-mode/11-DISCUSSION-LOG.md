# Phase 11: Curriculum Modules 4-7 + Demo Mode - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-03
**Phase:** 11-curriculum-modules-4-7-demo-mode
**Areas discussed:** Module 4-7 boundaries, Synthetic journey, Content bundling, Landing page

---

## Module 4-7 Boundaries

### Session split

| Option | Description | Selected |
|--------|-------------|----------|
| 4-4-4-4 even split | Clean, predictable pacing. Enough depth per topic. | |
| 3-3-4-6 weighted toward end | Lighter early modules, heavier advanced patching and sound design. Mirrors increasing complexity. | ✓ |
| 4-3-5-4 weighted to advanced | Extra session for Advanced Patching/FX. Modulation slightly lighter. | |

**User's choice:** 3-3-4-6 weighted toward end
**Notes:** None

### Module 4 scope

| Option | Description | Selected |
|--------|-------------|----------|
| Filter + LPG focus | VCF modes, resonance, filter FM, plus low-pass gate (west coast percussion). LPG is Cascadia's signature. | ✓ |
| Filter only | Stick to VCF: filter types, cutoff/resonance, filter envelope, filter FM. | |
| Filter + mixer/routing | VCF plus VCA-B/mixer signal routing. | |

**User's choice:** Filter + LPG focus
**Notes:** None

### Module 7 arc (6 sessions)

| Option | Description | Selected |
|--------|-------------|----------|
| Recipe-driven | Each session builds a complete patch from scratch. Heavy on named patch output. | ✓ |
| Technique-then-recipe | 3 technique sessions then 3 recipe sessions. | |
| Genre-based | Sessions organized by musical context. | |

**User's choice:** Recipe-driven
**Notes:** None

### Module 6 boundary

| Option | Description | Selected |
|--------|-------------|----------|
| Multi-voice + FX loop | Both oscillators independently, complex routing, external FX send/return, feedback. | |
| Complex modulation + FX | Cross-modulation, self-patching feedback loops, FX pedal integration, audio-rate modulation. | ✓ |
| You decide | Claude has discretion. | |

**User's choice:** Complex modulation + FX
**Notes:** None

---

## Synthetic Journey

### Pacing shape

| Option | Description | Selected |
|--------|-------------|----------|
| Same shape, offset | Same ADHD pattern but starting later and slower. Shows someone who added Cascadia after Evolver. | ✓ |
| Different personality | More consistent, slower pacing. Different ADHD profile. | |
| Interleaved with Evolver | Cascadia sessions in Evolver's gaps. One person juggling two instruments. | |

**User's choice:** Same shape, offset
**Notes:** None

### Stop point

| Option | Description | Selected |
|--------|-------------|----------|
| End of Module 5 | 12 sessions complete (Modules 1-5). Clean module boundary. | ✓ |
| Mid Module 5 | ~10-11 sessions. More realistic mid-module stop. | |
| You decide | Claude picks. | |

**User's choice:** End of Module 5
**Notes:** None

---

## Content Bundling

### Bundling approach

| Option | Description | Selected |
|--------|-------------|----------|
| Copy into src/content/ | Same pattern as Evolver. Simple, proven, consistent. | ✓ |
| Symlink sessions/cascadia/ | No duplication but platform fragility. | |
| Change reader to check both paths | More elegant but changes working code. | |

**User's choice:** Copy into src/content/
**Notes:** None

### Scope of bundled sessions

| Option | Description | Selected |
|--------|-------------|----------|
| All 25 sessions | Full curriculum is public. Only progress data is synthetic. | ✓ |
| Only completed sessions | Only ~12 sessions the journey covers. | |

**User's choice:** All 25 sessions
**Notes:** None

### Patches

| Option | Description | Selected |
|--------|-------------|----------|
| Already there, just add curriculum patches | Demo patches exist. New curriculum patches added alongside. | ✓ |
| You decide | Claude handles details. | |

**User's choice:** Already there, just add curriculum patches
**Notes:** None

---

## Landing Page

### Auto-discovery behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Should just work | Verify and fix edge cases. | |
| Add session/patch counts to cards | Show stats on instrument cards. | |
| Both — verify + add counts | Verify auto-discovery AND add counts. | ✓ |

**User's choice:** Both — verify + add counts
**Notes:** None

### Journey code location

| Option | Description | Selected |
|--------|-------------|----------|
| Same file, separate export | Add Cascadia exports alongside Evolver in synthetic-daily-notes.ts. | ✓ |
| Separate file | New file for Cascadia synthetic data. | |
| You decide | Claude picks. | |

**User's choice:** Same file, separate export
**Notes:** None

---

## Claude's Discretion

- Exact session topics and exercise design within 3-3-4-6 module boundaries
- Which sessions produce named patches
- Exercise sequencing for ADHD flow
- Session numbering and slug format
- Specific LPG techniques for Module 4
- Synthetic journey week-by-week detail
- InstrumentCard count display design

## Deferred Ideas

None — discussion stayed within phase scope.
