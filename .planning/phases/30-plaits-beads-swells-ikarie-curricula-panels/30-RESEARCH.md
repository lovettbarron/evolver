# Phase 30: Plaits, Beads, Swells, Ikarie Curricula + Panels - Research

**Researched:** 2026-04-18
**Domain:** Eurorack module curriculum authoring + SVG panel construction
**Confidence:** HIGH

## Summary

Phase 30 creates curricula (25 sessions total) and hand-placed SVG panels for four eurorack modules: Plaits (12HP, 8 sessions), Beads (14HP, 6 sessions), Swells (20HP, 6 sessions), and Ikarie (8HP, 5 sessions). The project has a mature panel-building skill and established session format from Phase 29 (Maths). The primary challenge is content authoring at scale -- each module needs a data file, panel component, overview page, and multiple sessions written to three locations (working tree, src/content, ~/song vault).

Plaits and Beads have complete PDF manuals in `references/` with detailed front plate diagrams -- control inventories have been fully verified from these PDFs. The Ikarie manual PDF has been downloaded from bastl-instruments.com and saved to `references/ikarie-manual.pdf` -- it contains a complete annotated panel diagram with numbered controls and detailed patch tips. Swells currently has a placeholder text file; the Intellijel website requires browser download for the PDF manual (all direct URL attempts returned 404). Swells control names are verified from ModularGrid and SYNTH ANATOMY, but exact panel positions require the PDF.

**Primary recommendation:** Execute one module end-to-end (panel data + component + tests + overview + all sessions with triple-write) before starting the next, in order: Plaits, Beads, Swells, Ikarie. Each module becomes its own plan (30-01 through 30-04). The first task in plan 30-03 (Swells) must be a manual PDF download step.

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
| CURR-07 | Ikarie curriculum (5-7 sessions for filter modes, stereo/dual-peak, envelope follower) | 5 sessions; complete control inventory from manual PDF; 8 patch tips provide exercise framework |
| PANEL-02 | Hand-placed SVG panel for Intellijel Swells (20HP) | Control inventory from web research; PDF manual needed for exact layout (D-08) |
| PANEL-04 | Hand-placed SVG panel for Mutable Instruments Beads (14HP) | Complete panel diagrams from manual PDF; control inventory fully verified |
| PANEL-08 | Hand-placed SVG panel for Casper x Bastl Ikarie (8HP) | Complete annotated panel diagram from manual PDF with numbered controls; PDF now in references/ |
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
  overview.md            # Populate with architecture, controls, init state

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

## Verified Module Control Inventories

### Plaits (12HP) -- Verified from Manual PDF pp. 3-5

**Controls (A-F from manual):**

A. **Model selection buttons** (2) + **LEDs** (16 in 2 columns of 8). Each button cycles through a bank of 8 models. LEDs indicate current model with color coding (green/red/yellow for synthesis type).

B. **FREQUENCY** -- Large coarse frequency knob. 8-octave range by default, narrowable to 14 semitones via hidden setting.

C. **HARMONICS** -- Large model-dependent tone control. Sweeps spectral content from dark/sparse to bright/dense.

D. **TIMBRE** -- Medium knob, model-dependent. With LED indicator for internal LPG.

E. **MORPH** -- Medium knob, model-dependent. With LED indicator for internal decay envelope.

F. **Attenuverters** (3 small knobs) -- For TIMBRE, FM, and MORPH CV inputs. When CV input is left unpatched and trigger is patched, attenuverter adjusts internal decaying envelope modulation amount.

**Jacks (1-7 from manual):**
1. MODEL CV input
2. CV inputs for TIMBRE, FM, MORPH, HARMONICS (4 jacks with shared attenuverter row F)
3. TRIG input (triggers internal envelope, excites percussive models, strikes internal LPG)
4. LEVEL input (opens internal LPG, accent control)
5. V/OCT input
6. OUT (main output)
7. AUX (variant/sidekick/by-product output)

**Total panel controls: ~28** (2 buttons + 5 knobs + 3 attenuverters + 7 CV/audio jacks + 2 audio outputs + 16 LEDs -- but LEDs are decorative array, not individual interactive controls)

**Functional control count for panel data: ~19** (2 buttons, 5 knobs, 3 attenuverters, 7 input jacks, 2 output jacks) + LED array rendered as decorative element

**16 Synthesis Modes (verified from manual pp. 7-11):**

Bank 1 (pitched, internal LPG disabled for these):
1. Pair of classic waveforms (VA synthesis)
2. Waveshaping oscillator
3. Two-operator FM
4. Granular formant oscillator
5. Harmonic oscillator
6. Wavetable oscillator
7. Chords (4-note)
8. Vowel and speech synthesis

Bank 2 (noise/percussion, use own decay envelope):
1. Granular cloud
2. Filtered noise
3. Particle noise
4. Inharmonic string modeling
5. Modal resonator (mini-Rings)
6. Analog bass drum model
7. Analog snare drum model
8. Analog hi-hat model

### Beads (14HP) -- Verified from Manual PDF pp. 4-14

**Controls by section:**

Recording quality & input (top area):
- A. Quality selector button (cycles 4 quality modes: bright digital 48kHz/16-bit, cold digital 32kHz/12-bit, sunny tape 24kHz/12-bit, scorched cassette 24kHz/8-bit)
- 1. Audio inputs: IN L, IN R (stereo pair, mono if only L patched)
- 2. Input level LED (blinks during auto-gain)

Grain generation (upper-middle):
- B. FREEZE button (latching, disables recording) + corresponding gate input jack
- C. SEED button (grain trigger, also enables latched mode when held 4s) + corresponding gate input (4)
- D. DENSITY knob (large) -- behavior changes per grain generation mode: rate in latched, probability divider in clocked, repetition rate in gated
- 5. DENSITY CV input

Grain playback (middle):
- E. TIME knob (large) -- buffer position, from most recent (CCW) to oldest (CW)
- F. PITCH knob (large) -- transposition, -24 to +24 semitones
- G. SIZE knob (large) -- grain duration, 30ms to 4s (fully CW = infinite = delay mode)
- H. SHAPE knob (medium) -- grain amplitude envelope, clicky to rectangular to slow-attack
- I. Attenurandomizers (4 small knobs) -- for TIME, SIZE, SHAPE, PITCH. CW from noon = CV modulation amount, CCW from noon = randomization amount
- 6. CV inputs (4) -- for TIME, SIZE, SHAPE, PITCH parameters

Mixing & output (lower):
- J. Feedback knob (medium) -- feeds output back to input with quality-dependent saturation
- K. Dry/Wet knob (medium) -- crossfade balance
- L. Reverb knob (medium) -- built-in reverb amount
- M. CV assign button -- assigns CV input [7] to J, K, or L
- 7. Assignable CV input (for feedback/dry-wet/reverb)
- 8. Audio outputs: L, R (stereo pair)

**Total functional controls for panel data: ~27** (4 buttons, 4 large knobs, 3 medium knobs, 4 small attenurandomizers, 2 audio input jacks, 2 audio output jacks, 2 gate input jacks, 5 CV input jacks, 1 LED)

**Three Grain Modes:**
- Latched (default): grains generated continuously at rate set by DENSITY
- Clocked: external clock via SEED input, DENSITY as probability/division
- Gated: grains only when SEED button held or gate high

**Special modes:**
- Delay mode: SIZE fully CW, one infinite grain acts as delay/slicer
- Wavetable synth: no audio input for 10s, granularizes internal Plaits waveforms

### Swells (20HP) -- From Web Sources (PDF needed for positions)

**Faders (8):** PRE-DELAY, SIZE, DECAY, HI DAMP, LO DAMP, EQ, EBB (model-specific), FLOW (model-specific)

**Level controls (2 faders):** INPUT, MIX

**Knobs (~6):** DRIVE, TRIM, RISE, FALL, THRESHOLD, EF GAIN, EF HIGH CUT

**Buttons (~6):** SWELL, FREEZE, BURST, REVERSE, Model select (2 buttons for cycling through 9 algorithms)

**Switches (2):** LO-FI (3-position: OFF/MIN/MAX), EF source selector (3-position: IN/SC/OUT)

**CV inputs (~9):** Attenuverters for major parameters

**Audio I/O (5 jacks):** Stereo in (L, R), Stereo out (L, R), Side chain in

**Other jacks (2):** SWELL CV output, TRIG input (assignable)

**Total estimated: ~40-45 controls** -- largest panel in this phase

**9 Reverb Algorithms:** Fog, Blur, Shadow, Velvet, Asterion, Deadspace, Buckets, Ritual, Gaze

**CONFIDENCE: MEDIUM** -- control names verified from multiple sources but exact count and positions require the PDF manual.

### Ikarie (8HP) -- Verified from Manual PDF (downloaded, in references/)

From the annotated panel diagram (page 7 of manual) with numbered controls:

**Knobs (4):**
- 3. CUTOFF -- Large knob at top. LP (CCW) to HP (CW). Center = open filter
- 7. STEREO -- Medium knob. Controls panning (PAN mode) or filter frequency spread (SPREAD mode). Center = no effect
- 4. MOD -- Medium attenuverter knob. Controls cutoff modulation amount. Center = no modulation. CW = positive, CCW = inverted
- 1. INPUT -- Medium knob. 0x to 5x gain. Controls input level and overdrive character

**Fader (1):**
- 5. RESONANCE -- Diagonal/vertical fader. Emphasizes cutoff frequency, can self-oscillate at maximum

**Switch (1):**
- PAN/SPREAD -- 2-position toggle between stereo modes (near STEREO knob)
- 6/9. FOLLOW speed -- 3-position toggle: SLOW (pumping), MID (tight), FAST (full-wave rectifier)

**Input Jacks (4):**
- L IN (normalled to R IN)
- R IN
- V/OCT (1V/oct cutoff tracking, with front-panel scaling trimmer)
- MOD (normalled from FOLLOW output)

**Output Jacks (4):**
- L OUT (MONO -- sums both channels when only this patched)
- R OUT
- BEYOND (spectral difference of the two filters -- band-pass/twin-peak behavior)
- FOLLOW (envelope follower CV output)

**CV Input (1):**
- 8. VCA CV -- Controls output VCA. 0-5V range, silence to unity gain. No cable = normal level

**Other (2):**
- Stereo CV input jacks (the two small hex nuts near STEREO and MOD -- these are the CV modulation inputs for stereo and resonance)

**Total functional controls for panel data: ~17** (4 knobs, 1 fader, 2 switches, 4 input jacks, 4 output jacks, 1 CV input + 2 CV modulation inputs = ~18)

**Key architectural insight from manual:** FOLLOW output is normalled to MOD input -- the filter auto-wahs by default without any patching. This is critical for session 1 (foundations) to explain.

**Patch tips from manual (inspiration for sessions):**
1. Formant Filtering -- mono dual-peak formant sounds
2. Quad Acid -- 4 resonant sweeps from one knob turn
3. Beyond Stereo -- L OUT + BEYOND as stereo pair
4. Pinging & FM Pinging -- trigger pulses into filter for percussive sounds
5. Self Oscillation -- resonance to max, input to min, play with V/OCT
6. Post Filter Ring Modulator -- BEYOND output + PAN mode stereo modulation
7. Waveform Crossfading -- stereo outputs as crossfaded waveforms
8. Aggressive 24dB Filtering -- chain L OUT into R IN for steeper slope

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

### Pitfall 1: Swells Panel Without PDF
**What goes wrong:** Panel controls placed from memory or web descriptions produce incorrect layouts
**Why it happens:** Current reference is a placeholder text file, not a real manual
**How to avoid:** D-08 requires downloading the PDF first. Plan 30-03 must start with a manual download task. If PDF unavailable via curl, document that user needs to manually download from intellijel.com
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
**How to avoid:** Study pages 3-4 of the Plaits manual carefully; render LEDs as a decorative array element, not individual interactive controls
**Warning signs:** LED positions not matching the physical 2x8 column layout shown in manual

### Pitfall 5: Beads Multi-Function Controls
**What goes wrong:** Controls that change behavior based on mode (latched vs clocked vs gated grain generation) are documented as single-function
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

### Pitfall 8: Ikarie FOLLOW Normalling Not Documented
**What goes wrong:** Session 1 doesn't explain why the filter already auto-wahs without any cables
**Why it happens:** FOLLOW output is normalled to MOD input -- this is invisible on the panel
**How to avoid:** Session 01 (foundations) must explicitly explain the FOLLOW-to-MOD normalling and how patching a cable into MOD breaks it
**Warning signs:** Learner confused by filter moving on its own

### Pitfall 9: Plaits Internal Envelope/LPG Attenuverter Confusion
**What goes wrong:** Attenuverter behavior is documented incorrectly when no CV is patched
**Why it happens:** When CV input is left unpatched and TRIG is patched, the attenuverter controls how much the internal decaying envelope modulates the parameter. Unplugging a CV cable without resetting the attenuverter to 12 o'clock means the internal envelope takes over
**How to avoid:** Session 01 must explain the dual-function attenuverter behavior. Reference manual page 3 (control F description)
**Warning signs:** Sessions describing attenuverters as simple CV scalers without mentioning the internal envelope interaction

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
  'plaits': { x: 0, y: 0, width: 100, height: 100 },  // single-module panels have one section
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
    expect(Object.keys(CONTROL_METADATA).length).toBeGreaterThanOrEqual(17);
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
- [ ] `src/lib/__tests__/plaits-panel-data.test.ts` -- covers Plaits panel data (built in this phase alongside curriculum)
- [ ] `src/lib/__tests__/beads-panel-data.test.ts` -- covers PANEL-04
- [ ] `src/lib/__tests__/swells-panel-data.test.ts` -- covers PANEL-02
- [ ] `src/lib/__tests__/ikarie-panel-data.test.ts` -- covers PANEL-08
- [ ] Corresponding component test files for each panel

## Open Questions

1. **Swells PDF manual availability**
   - What we know: Intellijel's website requires browser download; all direct URL attempts (multiple patterns) return 404
   - What's unclear: Exact control positions and full control count without the PDF
   - Recommendation: Plan 30-03 (Swells) should start with a manual download task; if automated download fails, document that user needs to manually download from https://intellijel.com/shop/eurorack/swells/ (Manual tab). Use product photos + web documentation as fallback for control identification

2. **Plaits panel already assigned to Phase 28 (PANEL-03)?**
   - What we know: REQUIREMENTS.md assigns PANEL-03 to Phase 28, but Phase 28 hasn't been executed yet
   - What's unclear: Whether the Plaits panel should be built in Phase 28 or Phase 30
   - Recommendation: Build it in Phase 30 alongside the curriculum since D-11 says "complete curriculum + panel for each module as a self-contained plan." PANEL-03 requirement will be satisfied here

3. **Generic ModulePanel renderer (PANEL-01) status**
   - What we know: PANEL-01 is assigned to Phase 28; current module panel page is "coming soon" placeholder
   - What's unclear: Whether a generic renderer exists yet or if each module gets its own component
   - Recommendation: Each module gets its own panel component (data file + TSX) following the established per-instrument pattern. Integration with the generic renderer is a Phase 28 concern -- panel data files created here will be consumed by it

4. **Ikarie power specs mismatch**
   - What we know: module.json says +12V: 50mA / -12V: 40mA. Manual PDF says +12V: 100mA / -12V: 95mA
   - What's unclear: Which is correct (manual PDF is authoritative)
   - Recommendation: Update module.json power_specs to match the manual values during the Ikarie plan

## Sources

### Primary (HIGH confidence)
- `references/plaits-manual.pdf` -- Complete front plate diagrams (pp. 3-5), all 16 synthesis modes with per-mode HARMONICS/TIMBRE/MORPH descriptions (pp. 7-11), inputs/outputs (p. 5)
- `references/beads-manual.pdf` -- Complete annotated diagrams for all panel sections (pp. 4-14), grain generation modes (latched/clocked/gated), attenurandomizer behavior, delay and wavetable synth modes
- `references/ikarie-manual.pdf` -- Downloaded from bastl-instruments.com. Complete numbered panel diagram, signal flow diagram, all 10 control descriptions, 8 patch tips with panel illustrations
- `.claude/skills/synth-panel-builder/SKILL.md` -- Panel building methodology, data-driven vs inline pattern decision, testing patterns

### Secondary (MEDIUM confidence)
- Intellijel product page + ModularGrid for Swells control list -- names verified but exact layout needs PDF
- SYNTH ANATOMY article -- 9 algorithm names confirmed (Fog, Blur, Shadow, Velvet, Asterion, Deadspace, Buckets, Ritual, Gaze)

### Tertiary (LOW confidence)
- Swells panel exact control positions -- cannot be determined without PDF manual
- Swells total control count (estimated 40-45) -- requires PDF verification

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, all existing patterns
- Architecture: HIGH -- 3 existing panel implementations + synth-panel-builder skill provide clear template
- Module control inventories: HIGH for Plaits/Beads/Ikarie (PDF manuals verified), MEDIUM for Swells (web sources only)
- Curriculum structure: HIGH -- locked decisions from CONTEXT.md are specific and well-defined
- Pitfalls: HIGH -- based on documented issues in CLAUDE.md, skill changelog, and manual edge cases

**Research date:** 2026-04-18
**Valid until:** 2026-05-18 (stable domain -- synth hardware doesn't change)
