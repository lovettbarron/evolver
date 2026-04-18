# Phase 30: Plaits, Beads, Swells, Ikarie Curricula + Panels - Research

**Researched:** 2026-04-18
**Domain:** Eurorack module curriculum authoring + SVG panel construction
**Confidence:** HIGH

## Summary

Phase 30 creates curricula (25 sessions total) and hand-placed SVG panels for four eurorack modules: Plaits (12HP, 8 sessions), Beads (14HP, 6 sessions), Swells (20HP, 6 sessions), and Ikarie (8HP, 5 sessions). The project has a mature panel-building skill and established session format. The primary challenge is content authoring at scale -- each module needs a data file, panel component, overview page, and multiple sessions written to three locations (working tree, src/content, ~/song vault).

Plaits and Beads have complete PDF manuals in `references/` with detailed front plate diagrams. Swells and Ikarie currently have placeholder text files; their reference PDFs must be downloaded before panel work begins (D-08). The Ikarie manual PDF was located at `bastl-instruments.com/files/manual-ikarie-web.pdf` and contains complete panel diagrams. Swells requires the PDF from Intellijel's product page (browser download required).

**Primary recommendation:** Execute one module end-to-end (panel data + component + tests + overview + all sessions with triple-write) before starting the next, in order: Plaits, Beads, Swells, Ikarie. Each module becomes its own plan (30-01 through 30-04).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Plaits gets 8 sessions using mode-pair structure -- each session covers 2 related synthesis modes side-by-side (e.g., VA oscillator + waveshaper, FM + grain formant). All 16 modes covered in 8 sessions
- **D-02:** Beads gets 6 sessions: 1 foundations (controls, buffer, quality), 1 per grain mode (3 sessions: Granular, Delay, Looper), 1 attenurandomizers/modulation, 1 creative patch
- **D-03:** Swells gets 6 sessions: 1 foundations (controls, routing), 3 algorithm-group sessions (plate/hall, shimmer/cloud, modulated/resonant covering all 9 algorithms), 1 Swell Generator deep dive, 1 Freeze/Reverse + performance
- **D-04:** Ikarie gets 5 sessions: 1 foundations (filter modes, stereo routing), 1 dual-peak resonance exploration, 1 envelope follower as modulation source, 1 self-oscillation/feedback, 1 in-context patch (Ikarie in a voice chain)
- **D-05:** Foundational-first progressive complexity for all modules. Session 1 is always foundations. Final session is always a creative patch
- **D-06:** Warm-ups reference only previous sessions within the same module. Each module self-contained -- no cross-module dependencies
- **D-07:** Independent numbering per module. File paths: `sessions/plaits/01-*.md`, `sessions/beads/01-*.md`, etc.
- **D-08:** Download proper PDF manuals for Swells and Ikarie before building panels
- **D-09:** Use PDFs + product photos for all four modules. Cross-reference manual diagrams with manufacturer product photos
- **D-10:** Plaits and Beads already have PDF manuals in `references/`
- **D-11:** One module end-to-end before starting the next
- **D-12:** Module order: Plaits first, then Beads, then Swells, then Ikarie
- **D-13:** Each module becomes its own plan: 30-01 Plaits, 30-02 Beads, 30-03 Swells, 30-04 Ikarie

### Claude's Discretion
- Specific synthesis mode pairings for Plaits sessions (which 2 modes per session)
- Algorithm groupings for Swells sessions (which algorithms in which group)
- Session titles and specific exercise design within each session
- Panel SVG control placement coordinates (hand-placed from references)
- Session frontmatter tags and difficulty progression

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CURR-02 | Plaits curriculum (8-10 sessions across 16 synthesis modes in 2 banks) | 8 sessions with mode-pair structure; all 16 modes documented from manual with HARMONICS/TIMBRE/MORPH per mode |
| CURR-03 | Beads curriculum (6-8 sessions covering 3 grain modes, quality settings, attenurandomizers) | 6 sessions; Granular/Delay/Looper modes documented; attenurandomizer dual-function (CV modulation vs randomization) captured |
| CURR-06 | Swells curriculum (5-7 sessions covering 9 reverb models, Swell Generator, Freeze/Reverse) | 6 sessions; 9 algorithms identified (Fog, Blur, Shadow, Velvet, Asterion, Deadspace, Buckets, Ritual, Gaze); Swell Generator and effect processors documented |
| CURR-07 | Ikarie curriculum (5-7 sessions for filter modes, stereo/dual-peak, envelope follower) | 5 sessions; complete control inventory from manual PDF; patch tips section provides exercise inspiration |
| PANEL-02 | Hand-placed SVG panel for Intellijel Swells (20HP) | Control inventory from web research; PDF manual needed for exact layout |
| PANEL-04 | Hand-placed SVG panel for Mutable Instruments Beads (14HP) | Complete panel diagrams from manual PDF; control inventory verified |
| PANEL-08 | Hand-placed SVG panel for Casper x Bastl Ikarie (8HP) | Complete annotated panel diagram from manual PDF with numbered controls |
</phase_requirements>

## Project Constraints (from CLAUDE.md)

- Session length: 15-30 minutes, always with a single focused objective
- Every session produces something tangible (patch, technique, recording, composition)
- File naming: kebab-case throughout
- Session files: `sessions/<instrument>/XX-<module>-<topic>.md`
- Panel building: MUST read synth-panel-builder skill; every control hand-placed from physical panel reference
- Triple-write pipeline: sessions/*, src/content/sessions/*, ~/song/sessions/*
- Never build a panel without the reference image
- instrument_type: eurorack_module for all module sessions

## Standard Stack

### Core (Existing -- no new dependencies)
| Library | Purpose | Why Standard |
|---------|---------|--------------|
| React + Next.js | Panel components, module pages | Already in use |
| Zod | Schema validation (SessionSchema, ModuleConfigSchema) | Already validates all content |
| Vitest | Panel data + component tests | Test infrastructure established |
| motion/react | Panel animations | Already used by cascadia-panel.tsx |

No new packages needed. This phase is entirely content authoring + panel component creation using established patterns.

## Architecture Patterns

### Module Content Structure (per module)
```
modules/<slug>/
  module.json            # Already exists for all 4 modules
  overview.md            # Placeholder exists -- populate with architecture, controls, init state

sessions/<slug>/
  01-foundations-*.md     # Always first
  02-*.md through NN-*.md
  
src/lib/<slug>-panel-data.ts    # Control metadata + positions
src/components/<slug>-panel.tsx # React SVG panel component

src/lib/__tests__/<slug>-panel-data.test.ts
src/components/__tests__/<slug>-panel.test.tsx
```

### Pattern: Data-Driven Panel (use for all 4 modules)
All four modules have repeating control types (knobs, jacks) and benefit from the data-driven pattern (Cascadia approach). None have unique one-off visual elements that would warrant the inline JSX pattern (Evolver approach).

Key files per module:
1. `src/lib/<slug>-panel-data.ts` -- CONTROL_METADATA, CONTROL_POSITIONS, SECTION_BOUNDS
2. `src/components/<slug>-panel.tsx` -- render loop over metadata with position lookup

### Pattern: Session Frontmatter
```yaml
---
title: 'Session NN: Title'
session_number: N
duration: 20  # 15-30
prerequisite: N-1  # or null for session 1
output_type: patch  # or technique, recording, composition
difficulty: beginner  # or intermediate, advanced
tags: [tag1, tag2]
instrument: <slug>
reference: '<manual name> pp. X-Y'
section: <Section Name>
instrument_type: eurorack_module
---
```

### Pattern: Triple-Write Content Pipeline
Every session markdown file must exist in three locations:
1. `sessions/<slug>/NN-*.md` (repo source of truth)
2. `src/content/sessions/<slug>/NN-*.md` (bundled for Vercel)
3. `~/song/sessions/<slug>/NN-*.md` (Obsidian vault, app reads from here locally)

Module overviews similarly must exist in:
1. `modules/<slug>/overview.md`
2. `src/content/modules/<slug>/overview.md`
3. `~/song/modules/<slug>/overview.md`

### Pattern: Panel Integration Points
After creating a panel component, update these integration files:
- `src/components/session-detail.tsx` -- add regex + parser for new instrument panel markers
- `src/app/modules/[slug]/panel/page.tsx` -- replace "coming soon" with actual panel
- `src/components/quick-ref-panel.tsx` -- add conditional render
- `src/components/patch-detail.tsx` -- add conditional render for patch pages

### Anti-Patterns to Avoid
- **Algorithmic control placement:** Never compute positions from a grid. Hand-place every control from the manual diagram
- **Cross-module session dependencies:** Each module curriculum is self-contained per D-06
- **Forgetting triple-write:** Missing any of the 3 write locations causes content to not render in dev or prod
- **Using instrument_type: instrument:** Must be `eurorack_module` for all module sessions

## Module Control Inventories

### Plaits (12HP) -- 16 controls total
From manual pages 3-5 (front plate diagrams):

**Knobs (5):**
- FREQUENCY (large, coarse pitch)
- HARMONICS (large, model-dependent tone)
- TIMBRE (medium, model-dependent)
- MORPH (medium, model-dependent)
- FM attenuverter (small)

**Buttons (2):**
- Model selection button 1 (bank 1, 8 modes, with 8 LEDs)
- Model selection button 2 (bank 2, 8 modes, with 8 LEDs)

**Attenuverters (3):**
- TIMBRE attenuverter
- FM attenuverter
- MORPH attenuverter (also HARMONICS attenuverter labeled HARMO)

**Jacks (7):**
- MODEL CV input [1]
- TIMBRE CV input [2] -- note: labeled with arrows
- FM CV input
- MORPH CV input (HARMO)
- TRIG input [3]
- LEVEL input [4]
- V/OCT input [5]
- OUT output [6]
- AUX output [7]

**LEDs (16):** 2 columns of 8 (model selection indicators, green/red/yellow)

**Total estimated controls for panel data: ~25-28** (knobs + attenuverters + buttons + jacks + LEDs)

**16 Synthesis Modes (2 banks of 8):**
Bank 1 (pitched): Pair of classic waveforms, Waveshaping oscillator, Two-operator FM, Granular formant, Harmonic oscillator, Wavetable, Chords, Vowel/speech
Bank 2 (noise/percussion): Granular cloud, Filtered noise, Particle noise, Inharmonic string, Modal resonator, Analog bass drum, Analog snare drum, Analog hi-hat

### Beads (14HP) -- ~28 controls total
From manual pages 4-14 (multiple annotated diagrams):

**Large Knobs (4):**
- FREEZE/feedback section: DENSITY (D)
- Grain section: TIME (E), PITCH (F)
- Mix section: SIZE (G)

**Medium Knobs (4):**
- SHAPE (H)
- Feedback (J)
- Dry/Wet (K)
- Reverb (L)

**Small Knobs/Attenuverters (4):**
- 4x attenurandomizers (I) for TIME, SIZE, SHAPE, PITCH

**Buttons (3):**
- Quality selector [A]
- FREEZE [B]
- SEED [C]

**Jacks -- Inputs (7):**
- IN L [1-left]
- IN R [1-right]
- FREEZE gate input [B-bottom]
- SEED gate input [4]
- DENSITY CV [5]
- 4x CV inputs for TIME/SIZE/SHAPE/PITCH [6]

**Jacks -- Outputs (2):**
- L output [8-left]
- R output [8-right]

**LEDs (5):**
- Input level LED [2]
- 4x quality LEDs (under quality button [A])

**CV assign button (1):** [M] -- assigns CV input to feedback/dry-wet/reverb

**Total estimated: ~30 controls**

### Swells (20HP) -- ~40+ controls
From web research (PDF needed for exact inventory):

**Sliders/Faders (8):**
- PRE-DELAY, SIZE, DECAY, HI DAMP, LO DAMP, EQ, EBB, FLOW

**Knobs (~8):**
- INPUT, MIX, DRIVE, TRIM, RISE, FALL, THRESHOLD, EF GAIN

**Buttons (~6):**
- SWELL, FREEZE, BURST, REVERSE, Model select (2 buttons for 9 algorithms)

**Switches (~2):**
- LO-FI (3-position: OFF/MIN/MAX), EF source selector (IN/SC/OUT)

**CV Inputs (9+):** Attenuverters for each major parameter

**Audio I/O (5):** Stereo in (L, R), Stereo out (L, R), Side chain in

**Other outputs (1):** SWELL CV output

**TRIG input (1):** Assignable trigger

**Total estimated: ~40-45 controls** -- largest panel in this phase

**9 Reverb Algorithms:** Fog, Blur, Shadow, Velvet, Asterion, Deadspace, Buckets, Ritual, Gaze

### Ikarie (8HP) -- ~20 controls
From manual PDF (annotated panel diagram, page 7):

**Knobs (5):**
- CUTOFF (large, LP-HP sweep, labeled 3)
- STEREO (medium, panning/spread, labeled 7)
- MOD (medium, attenuverter, labeled 4)
- INPUT (medium, 0x-5x gain, labeled 1)

**Fader (1):**
- RESONANCE (vertical fader, labeled 5)

**Switch (1):**
- FOLLOW speed (3-position: SLOW/MID/FAST, labeled 6)
- PAN/SPREAD mode (2-position toggle between Stereo modes)

**Jacks -- Inputs (4):**
- L IN
- R IN (normalled from L IN)
- V/OCT
- MOD

**Jacks -- Outputs (4):**
- L OUT (MONO)
- R OUT
- BEYOND (spectral difference output)
- FOLLOW (envelope follower output)

**Other (1):**
- VCA CV input (labeled 8)

**Trimmer (1):**
- V/OCT scaling trimmer (front-panel accessible)

**Total: ~17-20 controls** -- smallest panel, very compact at 8HP

## Recommended Plaits Mode Pairings (Claude's Discretion)

Based on the manual's organization (Bank 1 = pitched, Bank 2 = noise/percussion) and pedagogical logic of pairing related synthesis techniques:

| Session | Bank 1 Mode | Bank 2 Mode | Rationale |
|---------|------------|-------------|-----------|
| 2 | Pair of classic waveforms | Filtered noise | Both use traditional waveform concepts |
| 3 | Waveshaping oscillator | Granular cloud | Both explore timbral transformation |
| 4 | Two-operator FM | Particle noise | Both involve frequency-domain complexity |
| 5 | Granular formant | Vowel/speech | Both are formant/voice-related |
| 6 | Harmonic oscillator | Inharmonic string modeling | Harmonic vs inharmonic contrast |
| 7 | Wavetable | Modal resonator | Both are lookup/model-based |
| 8 | Chords | Analog drums (bass+snare+hi-hat) | Both are complete musical elements |

Session 1 = Foundations (controls, model selection, built-in LPG, internal envelope).

## Recommended Swells Algorithm Groupings (Claude's Discretion)

| Session | Algorithms | Theme |
|---------|-----------|-------|
| 2 | Fog, Blur, Shadow | Plate/Hall -- traditional spaces |
| 3 | Velvet, Asterion, Deadspace | Shimmer/Cloud -- expansive/ethereal |
| 4 | Buckets, Ritual, Gaze | Modulated/Resonant -- character effects |

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Panel rendering | Custom SVG per module | Data-driven pattern from cascadia-panel.tsx | Proven pattern, 4 panels would be 4x work |
| Content validation | Manual frontmatter checking | SessionSchema + ModuleConfigSchema from Zod | Already validates all session content |
| Module discovery | Hardcoded module lists | discoverModules() from reader.ts | Already discovers module directories |
| Triple-write sync | Manual file copying | Shell commands or script to copy to all 3 locations | Consistency across 25 sessions |

## Common Pitfalls

### Pitfall 1: Swells/Ikarie Panel Without PDF
**What goes wrong:** Panel controls placed from memory or web descriptions produce incorrect layouts
**Why it happens:** Current references are placeholder text files, not real manuals
**How to avoid:** D-08 requires downloading PDFs first. Ikarie PDF is at bastl-instruments.com/files/manual-ikarie-web.pdf. Swells PDF requires browser download from intellijel.com
**Warning signs:** If you start panel work and can't see a front plate diagram, stop

### Pitfall 2: Forgetting the Third Write Location
**What goes wrong:** Sessions appear in git but don't render in the local dev app
**Why it happens:** App reads from ~/song (vaultPath), not from sessions/ or src/content/
**How to avoid:** Every session file write must include all 3 destinations
**Warning signs:** "Session not found" errors locally despite files existing in the repo

### Pitfall 3: Wrong instrument_type in Frontmatter
**What goes wrong:** Module sessions don't appear in module views, appear mixed with instrument sessions
**Why it happens:** Defaulting to 'instrument' instead of 'eurorack_module'
**How to avoid:** Every module session frontmatter must include `instrument_type: eurorack_module`
**Warning signs:** Sessions appearing under wrong navigation section

### Pitfall 4: Plaits LED Grid Complexity
**What goes wrong:** Plaits has 16 model-selection LEDs in 2 columns of 8 with color-coding -- easy to get wrong
**Why it happens:** The LED pattern indicates current model and bank; colors (green/red/yellow) encode model type
**How to avoid:** Study pages 3-4 of the Plaits manual carefully; map each LED position to its model
**Warning signs:** LED positions not matching the physical 4x4 grid layout shown in manual

### Pitfall 5: Beads Multi-Function Controls
**What goes wrong:** Controls that change behavior based on mode (latched vs gated vs clocked grain generation) are documented as single-function
**Why it happens:** DENSITY knob alone has 3 different behaviors depending on grain generation mode
**How to avoid:** Document each control's behavior per mode in the curriculum; curriculum sessions should cover mode transitions explicitly
**Warning signs:** Sessions that describe DENSITY without specifying which grain generation mode is active

### Pitfall 6: Session Duration Overflow
**What goes wrong:** Sessions that try to cover too much exceed 30 minutes
**Why it happens:** Plaits has 16 modes (2 per session is ambitious), Swells has 9 algorithms (3 per session)
**How to avoid:** Each paired mode gets ~10 min exploration time; focus on "what makes this mode unique" not "exhaustive parameter documentation"
**Warning signs:** More than 4 exercises per session, or exercises with >5 steps each

### Pitfall 7: Panel Integration Files Not Updated
**What goes wrong:** Panel component exists but is never rendered in the app
**Why it happens:** Forgetting to update session-detail.tsx, quick-ref-panel.tsx, panel/page.tsx, and patch-detail.tsx
**How to avoid:** Each plan must include integration tasks after component creation
**Warning signs:** Panel component file exists but "coming soon" still shows

## Code Examples

### Session Frontmatter (Module Pattern)
```yaml
---
title: 'Session 01: Controls, Model Selection & Internal Voice'
session_number: 1
duration: 25
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - model-selection
  - internal-lpg
  - controls-overview
instrument: plaits
reference: 'Plaits Manual pp. 3-5'
section: Foundations
instrument_type: eurorack_module
---
```

### Panel Data File Structure
```typescript
// src/lib/plaits-panel-data.ts
export interface PlaitsControlMeta {
  id: string;
  name: string;
  module: string;   // 'plaits' (single-module, but kept for pattern consistency)
  type: 'knob' | 'slider' | 'switch' | 'jack-in' | 'jack-out' | 'led' | 'button';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

export const CONTROL_METADATA: Record<string, PlaitsControlMeta> = {
  'knob-plaits-frequency': { id: 'knob-plaits-frequency', name: 'FREQUENCY', module: 'plaits', type: 'knob' },
  'knob-plaits-harmonics': { id: 'knob-plaits-harmonics', name: 'HARMONICS', module: 'plaits', type: 'knob' },
  // ... etc
  'jack-plaits-out': { id: 'jack-plaits-out', name: 'OUT', module: 'plaits', type: 'jack-out', signalType: 'audio' },
  'jack-plaits-aux': { id: 'jack-plaits-aux', name: 'AUX', module: 'plaits', type: 'jack-out', signalType: 'audio' },
};

export const CONTROL_POSITIONS: Record<string, { x: number; y: number }> = {
  // Hand-placed from manual diagrams -- DO NOT compute
  'knob-plaits-frequency': { x: 0, y: 0 },  // placeholder -- set from reference
  // ...
};

export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'plaits': { x: 0, y: 0, width: 0, height: 0 },  // single-module panels have one section
};

export function midiToRotation(value: number): number {
  return -135 + (value / 127) * 270;
}
```

### Panel Marker in Session Markdown
```html
<!-- Plaits: highlight frequency and timbre knobs -->
<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-timbre:100"
  data-highlights="jack-plaits-v-oct:blue,jack-plaits-out:amber"
></div>

<!-- Beads: show cable patching -->
<div data-beads-panel
  data-knobs="knob-beads-density:80,knob-beads-time:64"
  data-cables="jack-plaits-out>jack-beads-in-l:audio"
  data-highlights="button-beads-freeze:amber"
></div>
```

### Test Pattern for Panel Data
```typescript
// src/lib/__tests__/plaits-panel-data.test.ts
import { describe, test, expect } from 'vitest';
import { CONTROL_METADATA, SECTION_BOUNDS, midiToRotation } from '@/lib/plaits-panel-data';

describe('plaits-panel-data', () => {
  test('CONTROL_METADATA has expected number of entries', () => {
    expect(Object.keys(CONTROL_METADATA).length).toBeGreaterThanOrEqual(20);
  });

  test('every entry has required fields', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      expect(meta.id).toBeTruthy();
      expect(meta.name).toBeTruthy();
      expect(meta.module).toBe('plaits');
      expect(meta.type).toBeTruthy();
    }
  });

  test('every jack has signalType', () => {
    for (const [key, meta] of Object.entries(CONTROL_METADATA)) {
      if (meta.type.startsWith('jack-')) {
        expect(meta.signalType).toBeTruthy();
      }
    }
  });
});
```

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest (latest, already configured) |
| Config file | vitest.config.ts (exists) |
| Quick run command | `npx vitest run --reporter=verbose` |
| Full suite command | `npx vitest run` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PANEL-02 | Swells panel data has correct control count and types | unit | `npx vitest run src/lib/__tests__/swells-panel-data.test.ts -x` | Wave 0 |
| PANEL-04 | Beads panel data has correct control count and types | unit | `npx vitest run src/lib/__tests__/beads-panel-data.test.ts -x` | Wave 0 |
| PANEL-08 | Ikarie panel data has correct control count and types | unit | `npx vitest run src/lib/__tests__/ikarie-panel-data.test.ts -x` | Wave 0 |
| PANEL-02 | Swells panel component renders without crashing | unit | `npx vitest run src/components/__tests__/swells-panel.test.tsx -x` | Wave 0 |
| PANEL-04 | Beads panel component renders without crashing | unit | `npx vitest run src/components/__tests__/beads-panel.test.tsx -x` | Wave 0 |
| PANEL-08 | Ikarie panel component renders without crashing | unit | `npx vitest run src/components/__tests__/ikarie-panel.test.tsx -x` | Wave 0 |
| CURR-02 | Plaits sessions have valid frontmatter (8 sessions) | manual | Verify all 8 .md files parse with SessionSchema | N/A |
| CURR-03 | Beads sessions have valid frontmatter (6 sessions) | manual | Verify all 6 .md files parse with SessionSchema | N/A |
| CURR-06 | Swells sessions have valid frontmatter (6 sessions) | manual | Verify all 6 .md files parse with SessionSchema | N/A |
| CURR-07 | Ikarie sessions have valid frontmatter (5 sessions) | manual | Verify all 5 .md files parse with SessionSchema | N/A |

### Sampling Rate
- **Per task commit:** `npx vitest run src/lib/__tests__/<slug>-panel-data.test.ts`
- **Per wave merge:** `npx vitest run`
- **Phase gate:** Full suite green before /gsd:verify-work

### Wave 0 Gaps
- [ ] `src/lib/__tests__/plaits-panel-data.test.ts` -- covers PANEL-03 (already assigned to Phase 28 but panel built here)
- [ ] `src/lib/__tests__/beads-panel-data.test.ts` -- covers PANEL-04
- [ ] `src/lib/__tests__/swells-panel-data.test.ts` -- covers PANEL-02
- [ ] `src/lib/__tests__/ikarie-panel-data.test.ts` -- covers PANEL-08
- [ ] Corresponding component test files for each panel

## Open Questions

1. **Swells PDF manual availability**
   - What we know: Intellijel's website requires browser download; curl returns HTML wrapper
   - What's unclear: Exact control positions without the PDF
   - Recommendation: Plan 30-03 (Swells) should start with a manual download task; if PDF unavailable, use product photos + web documentation as fallback

2. **Plaits panel already assigned to Phase 28 (PANEL-03)?**
   - What we know: REQUIREMENTS.md assigns PANEL-03 to Phase 28, but Phase 28 hasn't been executed yet
   - What's unclear: Whether the Plaits panel should be built in Phase 28 or Phase 30
   - Recommendation: Build it in Phase 30 alongside the curriculum since D-11 says "complete curriculum + panel for each module as a self-contained plan"

3. **Generic ModulePanel renderer (PANEL-01) status**
   - What we know: PANEL-01 is assigned to Phase 28; current module panel page is "coming soon" placeholder
   - What's unclear: Whether a generic renderer exists or if each module gets its own component
   - Recommendation: Each module gets its own panel component (data file + TSX) following the established per-instrument pattern. The "generic" aspect can be a shared helper, not a single component

## Sources

### Primary (HIGH confidence)
- `references/plaits-manual.pdf` -- Complete front plate diagram, all 16 synthesis modes, control descriptions
- `references/beads-manual.pdf` -- Complete annotated diagrams for all panel sections, grain generation modes, attenurandomizer behavior
- `bastl-instruments.com/files/manual-ikarie-web.pdf` -- Complete panel diagram with numbered controls, signal flow diagram, all control descriptions
- `.claude/skills/synth-panel-builder/SKILL.md` -- Panel building methodology, data-driven vs inline pattern decision, testing patterns

### Secondary (MEDIUM confidence)
- Intellijel product page + ModularGrid for Swells control list -- names verified but exact layout needs PDF
- SYNTH ANATOMY article -- 9 algorithm names confirmed (Fog, Blur, Shadow, Velvet, Asterion, Deadspace, Buckets, Ritual, Gaze)

### Tertiary (LOW confidence)
- Swells panel exact control positions -- cannot be determined without PDF manual

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all existing patterns
- Architecture: HIGH -- 3 existing panel implementations + synth-panel-builder skill provide clear template
- Module control inventories: HIGH for Plaits/Beads/Ikarie (PDF manuals), MEDIUM for Swells (web sources only)
- Curriculum structure: HIGH -- locked decisions from CONTEXT.md are specific and well-defined
- Pitfalls: HIGH -- based on documented issues in CLAUDE.md and skill changelog

**Research date:** 2026-04-18
**Valid until:** 2026-05-18 (stable domain -- synth hardware doesn't change)
