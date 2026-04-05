# Phase 10: Curriculum Modules 1-3 - Research

**Researched:** 2026-03-31
**Domain:** Content authoring -- 9 Cascadia learning sessions across 3 modules with ADHD-optimized structure
**Confidence:** HIGH

## Summary

Phase 10 is a pure content-authoring phase: 9 Markdown session files in `sessions/cascadia/` and 3-4 patch files in `patches/cascadia/`. No code changes, no schema modifications, no UI work. The authoring surface is well-defined: the session format is established across 35 Evolver sessions, the ADHD design framework provides explicit authoring checklists, all 17 Cascadia module docs exist with complete control/jack/normalling tables, and the signal flow diagram documents the normalled default state.

The primary research question is pedagogical: how to sequence 9 sessions that teach generalized synthesis concepts using the Cascadia as the hands-on vehicle, while respecting ADHD constraints (15-30 min, zero startup friction, specific parameter values, tangible output). Module 1 is constrained by the manual's "Make a Sound" walkthrough (pp. 11-16), which provides a manufacturer-recommended learning sequence. Modules 2 and 3 are at Claude's discretion within the boundaries set by CONTEXT.md decisions D-03 and D-04.

**Primary recommendation:** Author sessions sequentially (1-9), using the normalled default as the starting state for every session. Each session opens with a concept paragraph, uses Cascadia-specific callouts for normalling and unique features, and follows the exact Evolver session structure (frontmatter, objective, warm-up, setup, exercises with specific values, output checklist).

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** 3 modules with 3 sessions each (3-3-3 split)
- **D-02:** Module 1 (Foundations): 3 sessions following the manual's "Make a Sound" walkthrough (pp. 11-16) -- orientation + first sound, PWM + sub oscillator, filter envelope + wave folding + FM + FX
- **D-03:** Module 2 (Oscillators): 3 sessions covering VCO-A shapes/tuning, VCO-B + FM/sync, and wave folder as a sound source modifier
- **D-04:** Module 3 (Envelopes/Amplitude): 3 sessions covering Envelope A + VCA-A, Envelope B triple-mode (AD/ASR/cycle), and VCA-B/mixer dynamics
- **D-05:** Wave folder belongs in Module 2 (Oscillators) -- in the signal path between oscillators and filter
- **D-06:** Starting state is the normalled default (zero cables, all knobs at noon/default)
- **D-07:** Session 1 documents what the normalled default sounds like
- **D-08:** Cable instructions appear in BOTH a summary box at the top of exercises AND inline within exercise steps
- **D-09:** Knob positions use percentage estimates (~75%, ~25%, ~50%)
- **D-10:** Sessions use percentages for instructional precision; patches use clock positions for player-friendly notation
- **D-11:** Warm-ups start by returning to normalled default then do one action from the previous session
- **D-12:** Some sessions (not all) produce new named patches -- approximately 3-4 across 9 sessions
- **D-13:** Phase 10 creates full patch files in patches/cascadia/ with complete cable routing, knob settings, and session_origin
- **D-14:** Demo patches from Phase 9 are referenced as examples: "see patch: sub-bass-01 for a finished version"
- **D-15:** Curriculum patches and demo patches coexist -- curriculum patches have session_origin set
- **D-16:** Concept-first structure: each session opens with a 1-2 paragraph explanation of the generalized synthesis concept
- **D-17:** Cascadia-unique features highlighted in callout boxes: `> [!info] Cascadia's PWM knob is pre-normalled to LFO-XYZ`
- **D-18:** Unique features like Envelope B triple-mode get dedicated numbered exercises
- **D-19:** Normalling documented via inline callouts when a session uses a normalled connection
- **D-20:** Each session satisfies both CCURR-02 (generalized concept) and CCURR-03 (Cascadia-specific) through concept-first + callout pattern

### Claude's Discretion
- Exact session topics and exercise design within the module boundaries
- Which specific sessions produce patches (3-4 of 9) and what those patches are
- How to sequence exercises within sessions for optimal ADHD flow
- Session numbering and slug format
- Which demo patches from Phase 9 to reference in which sessions
- Frontmatter tag choices and difficulty progression across 9 sessions

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CCURR-01 | 25 Cascadia sessions across 7 modules (15-30 min each, ADHD-paced) | Phase 10 covers 9 of 25 (Modules 1-3). Session format, ADHD framework, and frontmatter schema are fully established from Evolver sessions |
| CCURR-02 | Each session teaches a generalized synthesis concept using Cascadia as the vehicle | Concept-first structure (D-16) with opening paragraphs. Concept mapping provided below for all 9 sessions |
| CCURR-03 | Each session highlights what is unique to Cascadia's implementation | Callout pattern (D-17, D-19) with `[!info]` boxes. Unique features identified per module from module docs |
| CCURR-04 | Sessions document which normalled connections are active and what patching overrides | Normalling documented inline (D-19). Complete normalling data available in signal-flow.md and each module doc |
| CCURR-05 | Module 1 follows the manual's "Make a Sound" progression | "Make a Sound" walkthrough (pp. 11-16) mapped to 3 sessions below. Quick-start in overview.md provides secondary reference |
</phase_requirements>

## Architecture Patterns

### Recommended File Structure

```
sessions/
└── cascadia/
    ├── 01-foundations-orientation-first-sound.md
    ├── 02-foundations-pwm-sub-oscillator.md
    ├── 03-foundations-filter-wavefold-fm-fx.md
    ├── 04-oscillators-vco-a-shapes-tuning.md
    ├── 05-oscillators-vco-b-fm-sync.md
    ├── 06-oscillators-wave-folder.md
    ├── 07-envelopes-envelope-a-vca-a.md
    ├── 08-envelopes-envelope-b-triple-mode.md
    └── 09-envelopes-vca-b-mixer-dynamics.md

patches/
└── cascadia/
    ├── [demo patches from Phase 9]
    ├── [3-4 curriculum patches with session_origin set]
    └── ...
```

**Naming convention:** Two-digit number, module slug, topic slug. Matches the Evolver pattern (`01-foundations-navigation.md`, `03-analog-osc-waveshapes.md`). Cascadia sessions start at 01 (fresh numbering, not continuing from Evolver's 35).

### Session Frontmatter Schema

```yaml
---
title: "Session 01: Orientation & First Sound"
module: "Foundations"
session_number: 1
duration: 20
prerequisite: null
output_type: technique  # or 'patch' for sessions producing named patches
difficulty: beginner
tags: [foundations, normalling, first-sound, orientation]
instrument: cascadia
reference: "Cascadia Manual pp. 11-12"
---
```

**Key differences from Evolver sessions:**
- `instrument: cascadia` (not `evolver`)
- `reference` cites the Cascadia manual, not Anu Kirk's guide
- `prerequisite` is session number within the Cascadia series (not Evolver)

### Curriculum Patch Frontmatter Schema

```yaml
---
title: "Filter Sweep Pad"
type: pad
difficulty: beginner
instrument: cascadia
session_origin: 3   # Links back to the session that created it
cable_routing:
  - source: "LFO X Out"
    destination: "VCF FM 3 In"
    purpose: "Slow filter sweep"
knob_settings:
  VCF:
    - control: "FREQ"
      value: "~25%"
    - control: "Q"
      value: "~40%"
  Envelope A:
    - control: "A"
      value: "~60%"
    - control: "R"
      value: "~75%"
---
```

**Note:** Curriculum patches use percentage notation for knob values (matching session convention per D-09/D-10), while demo patches from Phase 9 use clock positions. The `session_origin` field distinguishes curriculum patches from demo patches (which have `session_origin: null`).

### Session Body Structure Template

```markdown
# Session XX: [Title]

**Objective:** [One sentence]

> [!tip] If you only have 5 minutes
> [Quick version targeting the core learning]

## [Synthesis Concept Name]

[1-2 paragraphs explaining the generalized synthesis concept -- what it is,
why it matters, how it works in any synthesizer. No Cascadia-specific
content here.]

## Warm-Up (2 min)

Remove all cables. Set all knobs to noon. Play a MIDI note -- you should
hear [expected sound]. Now [one action from previous session to trigger recall].

## Setup

From the normalled default:
- [Specific knob/cable instructions with percentage values]

> **Cables for this session:**
> | Cable | From | To | Purpose |
> |-------|------|----|---------|
> | 1 | [source] | [destination] | [why] |

## Exercises

### Exercise 1: [Name] (X min)

> [!info] Normalled: [connection]. You hear this without any cables.
> Patching into [jack] overrides this connection.

1. [Specific step with percentage value and expected audible result]
2. [Next step...]

> [!info] Cascadia's [feature] is [unique thing].
> [Why this matters for this exercise]

### Exercise 2: [Name] (X min)

...

## Exploration (optional, hyperfocus days)

- [Bounded suggestion 1]
- [Bounded suggestion 2]

## Output Checklist

- [ ] [Tangible output 1]
- [ ] [Tangible output 2]
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- [Takeaway 1]
- [Takeaway 2]

## Next Session Preview

[What you will learn next time, connecting to the next concept]
```

### Anti-Patterns to Avoid

- **"Explore freely" exercises:** Every exercise must have specific parameter values and expected audible results (ADHD design principle #4)
- **Reading-heavy concept sections:** The concept paragraph is 1-2 paragraphs max. If it needs more, the concept is too broad for one session. Split.
- **Undocumented normalling:** Every normalled connection used in a session gets a `[!info]` callout the first time it appears. Learners need to understand what they are hearing and why.
- **Missing cable override context:** When a cable is patched, always state what normalled connection it breaks: "Patching into VCF FM 1 IN overrides the Envelope B connection."
- **Vague knob instructions:** "Turn up the filter" fails. "Set VCF FREQ to ~75%" succeeds. Always use percentage estimates per D-09.
- **Sessions over 30 minutes:** Non-negotiable. If a session has too much content, split it. The ADHD constraint is the constraint.

## Module-by-Module Content Mapping

### Module 1: Foundations (Sessions 1-3) -- "Make a Sound" Walkthrough

Based on the manual's pp. 11-16 walkthrough and the overview.md quick-start:

**Session 1: Orientation & First Sound (~20 min)**
- **Concept:** What is a semi-modular synthesizer? (normalling, signal path, the relationship between modules)
- **Exercises:** Connect MIDI + audio, power on, play notes (hear normalled default), explore what normalled default sounds like (VCO A saw -> mixer -> VCF -> wave folder -> VCA A -> output), identify the sound
- **Normalling callouts:** MIDI/CV -> VCO A pitch, VCO A -> Mixer, Mixer -> VCF, VCF -> Wave Folder, Wave Folder -> VCA A, Envelope A -> VCA A, VCA A -> Output Control
- **Output:** Documented description of what the normalled default sounds like; understanding of the signal path
- **Cascadia-unique:** The normalling philosophy -- "plays with zero cables but rewards patching"

**Session 2: Pulse Width Modulation & Sub-Oscillator (~25 min)**
- **Concept:** What is pulse width modulation? What is a sub-oscillator?
- **Exercises:** Raise PW MOD slider (LFO Y normalled to PWM), hear PWM effect, adjust PW slider for base pulse width, raise SUB slider in Mixer, explore SUB TYPE switch (-1, OR, -2), combine PWM + sub
- **Normalling callouts:** LFO Y -> VCO A PWM IN (breaks on patching)
- **Output:** Understanding of PWM and sub-oscillator techniques; possibly a patch
- **Cascadia-unique:** LFO Y pre-normalled to PWM (no cable needed), three sub-oscillator types including the OR mode

**Session 3: Filter Envelope, Wave Folding, FM & FX (~25 min)**
- **Concept:** How does a filter envelope shape timbre over time? What is wave folding? What is frequency modulation?
- **Exercises:** Adjust Envelope B (normalled to VCF FM 1) to hear filter envelope, adjust VCF FREQ and Q, raise Wave Folder FOLD slider, adjust VCO A INDEX slider (VCO B sine normalled to FM 2), FX send/return overview
- **Normalling callouts:** Envelope B -> VCF FM 1, VCO B Sine -> VCO A FM 2
- **Output:** First curriculum patch (filter sweep + wave folding combo)
- **Cascadia-unique:** Wave folder position after VCF in signal chain, FX send/return anywhere in chain
- **Note:** This session covers a lot of ground. FX is a brief taste (2-3 min), not deep dive. The manual walkthrough pp. 14-16 covers these topics in quick succession.

### Module 2: Oscillators (Sessions 4-6)

**Session 4: VCO A Shapes & Tuning (~20 min)**
- **Concept:** What are oscillator waveshapes and how do they determine timbre?
- **Exercises:** Hear each VCO A output via Mixer (Saw slider, Pulse slider, raise IN 2 for sine), adjust OCTAVE selector, use PITCH knob for fine tuning, compare waveshapes at different octaves, explore PULSE POSITION switch
- **Normalling callouts:** VCO A -> Mixer (saw/pulse direct, sine via IN 2)
- **Output:** Ear training -- identify waveshapes by sound
- **Cascadia-unique:** Mixer direct outs (VCO A TRI OUT, SAW OUT, PULSE OUT), IN 2 normalled from VCO A sine, PULSE POSITION switch (center vs edge)

**Session 5: VCO B, FM Synthesis & Sync (~25 min)**
- **Concept:** What is frequency modulation synthesis? What is oscillator sync?
- **Exercises:** Raise INDEX slider to hear FM (VCO B sine normalled to FM 2), switch TZFM/EXP, switch AC/DC coupling, detune VCO B with PITCH knob (PITCH SOURCE in B mode), engage SYNC TYPE switch (hard/soft), adjust VCO A PITCH while sync is on
- **Normalling callouts:** VCO B Sine -> VCO A FM 2 IN, VCO B Saw -> VCO A SYNC IN
- **Output:** Curriculum patch -- an FM bell or metallic tone
- **Cascadia-unique:** Through-zero FM (analog TZFM is rare), AC/DC coupling switch, soft sync "flip" mode, VCO B's VCO/LFO switch

**Session 6: Wave Folder as Sound Shaper (~20 min)**
- **Concept:** What is wave folding? How does it differ from filtering and distortion?
- **Exercises:** Start with minimum FOLD, gradually increase to hear harmonics added, patch different sources into WF IN (override VCF normalling), modulate FOLD with an LFO via FOLD MOD IN, compare wave folding before vs after filter (re-patching exercise)
- **Normalling callouts:** VCF OUT -> Wave Folder IN, Wave Folder -> VCA A
- **Output:** Understanding of West Coast vs East Coast timbral shaping
- **Cascadia-unique:** Wave folder position post-VCF (unusual -- most West Coast synths have it pre-filter), MOD input for CV control of fold depth
- **Note:** This session uses the first intentional cable patching beyond the normalled state

### Module 3: Envelopes & Amplitude (Sessions 7-9)

**Session 7: Envelope A & VCA A (~20 min)**
- **Concept:** What is an ADSR envelope? How does an envelope shape amplitude?
- **Exercises:** Adjust A/D/S/R sliders on Envelope A hearing amplitude changes, explore HOLD POSITION switch (Off/AHDSR/Gate Ext), try ENVELOPE SPEED switch (Fast/Med/Slow), adjust VCA A LEVEL slider vs LEVEL MOD slider balance, raise AUX IN to blend wave-folded signal
- **Normalling callouts:** Envelope A -> VCA A LEVEL MOD IN, Wave Folder -> VCA A AUX IN, Envelope A -> VCO A IM IN
- **Output:** Understanding of envelope-to-VCA relationship; curriculum patch with shaped dynamics
- **Cascadia-unique:** Hold stage with three modes (AHDSR, Gate Extender, Off), ENVELOPE SPEED rescaling, CTRL SOURCE velocity integration, AUX IN normalled from Wave Folder

**Session 8: Envelope B Triple-Mode (~25 min)**
- **Concept:** What is a function generator? How do envelope, LFO, and burst modes differ?
- **Exercises:** Envelope mode -- AD, AHR, and Cycle sub-modes with specific RISE/FALL/SHAPE values; LFO mode -- FREE, SYNC, and LFV sub-modes; Burst mode -- brief taste of burst triggering; use Envelope B to modulate filter (normalled) and other targets
- **Normalling callouts:** Envelope B -> VCF FM 1 IN
- **Output:** Understanding of function generators as multipurpose tools
- **Cascadia-unique:** Triple-mode design is the headline feature. LFV (Low Frequency Vacillator) chaotic mode is unique. Burst generator for ratcheting. Attenuverters on all three CV inputs.

**Session 9: VCA B, Low Pass Gate & Mixer Dynamics (~25 min)**
- **Concept:** What is a Low Pass Gate? How does mixing affect the final sound?
- **Exercises:** Patch a signal into VCA B IN (override ring mod normalling), use VCA CONTROL switch to compare LPG vs LPF-only, send envelope to VCA/LPF B CV IN, explore Mixer dynamics -- soft clip, noise types, IN 1 ring mod normalling, blending multiple sources into MAIN 2
- **Normalling callouts:** Ring Mod -> VCA B IN, +5V -> VCA/LPF B CV IN, VCA A -> MAIN 1
- **Output:** Curriculum patch using the Low Pass Gate for bongo/pluck sounds
- **Cascadia-unique:** VCA B/LPF combo as a genuine Low Pass Gate (West Coast heritage), soft clip on mixer, digital noise ALT modes

## Normalling Reference for Session Authors

Each session must document active normalled connections. This is the complete normalling map from signal-flow.md and module docs, organized by which sessions need which callouts:

| Connection | What It Does | First Appears |
|-----------|-------------|---------------|
| MIDI/CV -> VCO A Pitch | Sets oscillator pitch from MIDI | Session 1 |
| MIDI/CV -> VCO B Pitch | Keeps both oscillators in tune (PITCH A+B mode) | Session 1 |
| VCO A -> Mixer | Saw and pulse waveforms feed the mixer | Session 1 |
| Mixer OUT -> VCF IN | Mixed signal enters the filter | Session 1 |
| VCF OUT -> Wave Folder IN | Filtered signal passes through wave folder | Session 1 |
| Wave Folder -> VCA A | Wave folder output to primary VCA | Session 1 |
| VCA A -> Output Control MAIN 1 | VCA output to final output stage | Session 1 |
| Envelope A -> VCA A LEVEL MOD | Amplitude envelope shapes note volume | Session 1 |
| MIDI/CV -> Envelope A Gate | MIDI note triggers the amplitude envelope | Session 1 |
| MIDI/CV -> Envelope B Gate | MIDI note triggers the filter envelope | Session 1 |
| LFO Y -> VCO A PWM IN | LFO modulates pulse width | Session 2 |
| Envelope B -> VCF FM 1 | Envelope B modulates filter cutoff | Session 3 |
| VCO B Sine -> VCO A FM 2 | VCO B is the default FM modulator | Session 3/5 |
| VCO B Saw -> VCO A SYNC IN | VCO B is the default sync source | Session 5 |
| MIDI/CV -> VCF FM 2 | Keyboard tracking for filter | Session 3 |
| Envelope A -> VCO A IM IN | Envelope controls FM depth | Session 7 |
| MIDI/CV -> Envelope A Velocity | Velocity sensitivity | Session 7 |
| Wave Folder -> VCA A AUX IN | Folded signal available at VCA | Session 7 |
| Ring Mod -> VCA B IN | Ring mod signal at VCA B | Session 9 |
| +5V -> VCA/LPF B CV IN | Manual control normalling | Session 9 |
| LFO Z -> MULT IN 1 / BI>UNI | LFO distribution via patchbay | Not in Phase 10 |
| Mixer IN 1 normalled from Ring Mod | Ring mod available at mixer | Session 9 |
| Mixer IN 2 normalled from VCO A Sine | Sine available at mixer | Session 4 |

## Patch Candidates (3-4 across 9 sessions)

Recommended sessions to produce curriculum patches:

| Session | Patch Name (suggested) | Type | Cable Count |
|---------|----------------------|------|-------------|
| 3 | "foundations-filter-sweep" | pad/texture | 0-1 cables |
| 5 | "fm-bell" | lead | 0 cables (normalled FM) |
| 7 | "shaped-dynamics" | bass/lead | 0-1 cables |
| 9 | "lpg-bongo" | drum | 1-2 cables |

These cover multiple categories, use increasing cable complexity, and each emerges naturally from the session's learning objectives.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Session format | Custom template | Copy Evolver session structure exactly | 35 sessions establish the pattern; consistency across instruments |
| ADHD validation | Ad hoc quality check | 6-question checklist from `framework/adhd-design.md` | Every session must pass all 6 questions |
| Control/jack names | Improvised labels | Module docs in `src/content/instruments/cascadia/modules/` | Canonical source for every control name, jack name, and normalling description |
| Normalling descriptions | Free-form text | Signal flow doc + module normalling sections | Canonical source for what connects to what and what patching overrides |
| Patch format | New schema | Phase 9 patch format (cable_routing array + knob_settings map) | Schema must be consistent with demo patches |

## Common Pitfalls

### Pitfall 1: Session Scope Creep
**What goes wrong:** A session tries to cover too many concepts (especially Session 3 which touches filter envelope + wave folding + FM + FX)
**Why it happens:** The manual's "Make a Sound" walkthrough covers these topics in rapid succession
**How to avoid:** FX in Session 3 is a 2-3 minute taste, not a deep dive. FM is "raise the INDEX slider and hear what happens," not a full FM tutorial (that comes in Session 5). The session objective stays singular: "Experience the complete signal path."
**Warning signs:** Session exceeds 25 minutes, or has more than 4 exercises

### Pitfall 2: Inconsistent Control Names
**What goes wrong:** Session says "turn up the filter cutoff" but the control is called "FREQ" on the Cascadia
**Why it happens:** Generic synth terminology vs. Cascadia-specific labels
**How to avoid:** Always use the exact control name from the module docs. Reference the module doc before writing any exercise step. Use the pattern: "Set VCF **FREQ** to ~75%"
**Warning signs:** A control name that doesn't appear in the corresponding module doc

### Pitfall 3: Forgetting Cable Override Context
**What goes wrong:** Session says "patch LFO X into VCF FM 1" without mentioning that this breaks the Envelope B normalling
**Why it happens:** Author knows the normalling but doesn't document the override for the learner
**How to avoid:** Every cable instruction must include what it overrides: "Patch LFO X Out -> VCF FM 1 In. This overrides the normalled Envelope B connection -- you will no longer hear filter envelope sweeps unless you patch Envelope B elsewhere."
**Warning signs:** Cable instruction without an override note

### Pitfall 4: Assuming Module Knowledge
**What goes wrong:** Session 6 references VCO B's TZFM mode without explaining what TZFM is, assuming Session 5 covered it
**Why it happens:** Sessions build on each other, but learners may have gaps
**How to avoid:** Brief 1-sentence reminders when referencing concepts from earlier sessions: "Using FM synthesis (which you explored in Session 5), raise the INDEX slider..."
**Warning signs:** A session step that would be confusing to someone who skipped the previous session

### Pitfall 5: Missing Audible Results
**What goes wrong:** Exercise step says "Set Envelope A Attack to ~75%" without describing what the learner should hear
**Why it happens:** Author focuses on the action, not the feedback
**How to avoid:** Every step must have an audible result: "Set Envelope A **A** (Attack) to ~75% -- you should hear the note fade in slowly over about 1 second instead of starting instantly"
**Warning signs:** A numbered step without "you should hear" or equivalent

### Pitfall 6: Percentage vs. Clock Position Confusion
**What goes wrong:** Session uses "2 o'clock" notation instead of "~65%" for knob positions
**Why it happens:** Clock positions are natural for synth players (and used in patches per D-06 from Phase 9)
**How to avoid:** Sessions always use percentages (D-09). Patches use clock positions. If a session produces a patch, the session text uses percentages but the patch file uses clock positions.
**Warning signs:** Clock positions appearing in session markdown files

## Code Examples

### Session File (complete example for Session 1)

```markdown
---
title: "Session 01: Orientation & First Sound"
module: "Foundations"
session_number: 1
duration: 20
prerequisite: null
output_type: technique
difficulty: beginner
tags: [foundations, normalling, signal-path, orientation, first-sound]
instrument: cascadia
reference: "Cascadia Manual pp. 11-12"
---

# Session 01: Orientation & First Sound

**Objective:** Hear what Cascadia sounds like with zero cables patched and
understand the normalled signal path that makes it work.

> [!tip] If you only have 5 minutes
> Connect MIDI and audio. Power on. Play a note. That sound is VCO A's saw
> wave traveling through the entire normalled signal path to your speakers.
> You just heard 7 modules working together with zero cables.

## What Is a Semi-Modular Synthesizer?

A modular synthesizer is a collection of independent modules -- oscillators,
filters, amplifiers, envelopes -- that you connect with patch cables to create
a signal path. A *semi-modular* synthesizer pre-wires the most useful
connections internally, so it works as a complete instrument out of the box.
Every internal connection can be overridden by plugging a cable into the
corresponding input jack.

This means you start with a working instrument and *add* complexity by
patching, rather than building from silence. The pre-wired connections are
called **normalled connections**.

## Warm-Up (2 min)

This is your first session -- no previous material to review. Instead: look
at the Cascadia panel from left to right. Count the sections (modules). There
are 17. You will learn them over the coming sessions, but today you only need
to find VCO A, the Mixer, VCF, Wave Folder, VCA A, and Output Control.

## Setup

1. Connect a MIDI keyboard to the rear MIDI IN jack (or USB MIDI port)
2. Connect the rear LINE OUT to your speakers, or plug headphones into PHONES OUT
3. Power on -- flip the rear power switch
4. Ensure all sliders are at their lowest position and all knobs are at noon

## Exercises

### Exercise 1: Hear the Normalled Default (5 min)

1. Play a note on your MIDI keyboard -- you should hear a bright, buzzy
   sustained tone. This is VCO A's saw wave

> [!info] Normalled: MIDI/CV -> VCO A Pitch. Your MIDI keyboard controls
> VCO A's pitch through an internal connection. Patching into VCO A PITCH IN
> overrides this.

2. Play notes across the keyboard -- the pitch should track accurately.
   Low notes sound deep, high notes sound thin and bright

> [!info] Normalled: VCO A -> Mixer -> VCF -> Wave Folder -> VCA A ->
> Output Control. The sound travels through 6 modules with zero cables.

3. Hold a note and listen to the sustain -- it should sustain as long as
   you hold the key, then stop when you release

> [!info] Normalled: Envelope A -> VCA A. The amplitude envelope shapes
> each note. With all sliders down, it defaults to a simple gate (instant
> on/off).

...
```

### Callout Patterns

**Normalling callout (first time a connection is used):**
```markdown
> [!info] Normalled: LFO Y -> VCO A PWM IN. Raising VCO A's PW MOD slider
> adds pulse width modulation automatically -- no cable needed. Patching into
> PWM IN overrides this LFO Y connection.
```

**Cascadia-unique feature callout:**
```markdown
> [!info] Cascadia's Envelope B is actually a triple-mode function generator.
> The same physical controls (RISE, FALL, SHAPE) change meaning depending on
> the MODE SELECT switch position: Envelope, LFO, or Burst Generator.
```

**Cable summary box:**
```markdown
> **Cables for this session:**
> | # | From | To | Purpose | Overrides |
> |---|------|----|---------|-----------|
> | 1 | LFO X Out | VCF FM 3 In | Slow filter sweep | Nothing (FM 3 has no normal) |
> | 2 | VCO A Pulse Out | Wave Folder In | Fold pulse wave directly | VCF -> Wave Folder normal |
```

### Curriculum Patch File Example

```markdown
---
title: "FM Bell"
type: lead
difficulty: beginner
instrument: cascadia
tags: [fm, bell, metallic, curriculum]
session_origin: 5
cable_routing: []
knob_settings:
  VCO A:
    - control: "INDEX"
      value: "~60%"
    - control: "TZFM/EXP"
      value: "TZFM"
    - control: "AC/DC"
      value: "AC"
  VCO B:
    - control: "OCTAVE"
      value: "2 octaves above VCO A"
    - control: "PITCH SOURCE"
      value: "PITCH A+B"
  Envelope A:
    - control: "A"
      value: "0%"
    - control: "D"
      value: "~50%"
    - control: "S"
      value: "0%"
    - control: "R"
      value: "~40%"
---

# FM Bell

A clean, metallic bell tone using Cascadia's through-zero FM. No cables needed
-- uses the normalled VCO B -> VCO A FM connection.

## How to Play

Play staccato notes in the upper register (C4-C6) for the clearest bell
tones. Lower notes produce more complex, gong-like timbres.

## What Makes It Work

VCO B's sine wave modulates VCO A's frequency through the normalled FM 2
connection. Through-zero FM with AC coupling produces clean, pitch-stable
bell harmonics that track the keyboard accurately.

## Created In

[Session 05: VCO B, FM Synthesis & Sync](/instruments/cascadia/sessions/05)
```

## Difficulty Progression

| Session | Difficulty | Cable Count | New Concepts |
|---------|-----------|-------------|--------------|
| 1 | beginner | 0 | Normalling, signal path |
| 2 | beginner | 0 | PWM, sub-oscillator |
| 3 | beginner | 0-1 | Filter envelope, wave folding, FM (taste), FX (taste) |
| 4 | beginner | 0 | Waveshapes, tuning |
| 5 | beginner | 0 | FM synthesis, sync |
| 6 | intermediate | 1-2 | Wave folding, re-patching, signal routing |
| 7 | intermediate | 0-1 | ADSR, amplitude shaping, velocity |
| 8 | intermediate | 0-1 | Function generators, LFO mode, burst mode |
| 9 | intermediate | 1-2 | Low Pass Gate, mixer dynamics, parallel paths |

The progression starts with zero cables (Modules 1-2) and introduces patching in Module 2 Session 6 and Module 3, matching the "normalled default first, then override" pedagogy.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Load a "basic patch" from memory | Use normalled default (zero cables, noon knobs) | Cascadia design (2022) | Lower friction -- no patch memory, no save/recall, just remove cables |
| Describe knob positions as "turn it up a bit" | Percentage estimates (~75%, ~25%) | D-09 (this project) | Reproducible results across sessions |
| Separate theory and practice sections | Concept-first paragraph then immediate hands-on | D-16 (this project) | ADHD-optimized: minimal reading before doing |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Manual content review (no automated test framework for markdown content) |
| Config file | N/A -- content authoring phase |
| Quick run command | `ls sessions/cascadia/*.md \| wc -l` (verify 9 files exist) |
| Full suite command | Manual review against ADHD checklist + normalling accuracy check |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CCURR-01 | 9 sessions exist as markdown files | smoke | `ls sessions/cascadia/*.md \| wc -l` (expect 9) | No -- Wave 0 |
| CCURR-02 | Each session teaches a generalized concept | manual | Review: does each session have a concept section? | N/A |
| CCURR-03 | Each session highlights Cascadia-unique features | manual | Review: does each session have `[!info]` callouts? | N/A |
| CCURR-04 | Sessions document normalled connections | manual | `grep -l "Normalled:" sessions/cascadia/*.md \| wc -l` (expect 9) | No -- Wave 0 |
| CCURR-05 | Module 1 follows "Make a Sound" progression | manual | Review: Sessions 1-3 match manual pp. 11-16 sequence | N/A |

### Sampling Rate
- **Per task commit:** `ls sessions/cascadia/*.md | wc -l` + spot check latest session
- **Per wave merge:** Verify all sessions against ADHD 6-question checklist
- **Phase gate:** All 9 sessions + 3-4 patches present; normalling callouts in every session; ADHD checklist passed

### Wave 0 Gaps
- [ ] `sessions/cascadia/` directory does not exist yet -- create it
- [ ] `patches/cascadia/` directory may not exist yet (depends on Phase 9 completion) -- create if needed
- [ ] No automated content validation exists -- rely on grep-based smoke tests and manual review

## Open Questions

1. **Phase 9 completion status**
   - What we know: Phase 9 creates demo patches and the patch schema. Phase 10 depends on Phase 9.
   - What's unclear: Whether Phase 9 is complete at the time Phase 10 executes. If not, curriculum patches cannot use the refined schema.
   - Recommendation: Phase 10 planner should check for `src/content/patches/cascadia/` existence and the refined PatchSchema before creating curriculum patches. If Phase 9 is incomplete, defer curriculum patch files to the final wave.

2. **Manual pp. 11-16 content**
   - What we know: The overview.md "Make a Sound" section mirrors the manual's walkthrough. The PDF could not be rendered for direct verification.
   - What's unclear: Whether the overview.md covers everything on pp. 11-16 or is a condensed version.
   - Recommendation: Use overview.md as the primary reference since it was authored from the manual. The 7 steps in the quick-start map cleanly to Sessions 1-3.

3. **Demo patch names for cross-referencing**
   - What we know: Phase 9 will create 12-16 demo patches. Sessions should reference them per D-14.
   - What's unclear: The exact patch names and slugs from Phase 9.
   - Recommendation: Author sessions with placeholder references like "see patch: [sub-bass demo] for a finished version" and fill in exact slugs after Phase 9 patches exist. Or, author sessions after Phase 9 is complete.

## Sources

### Primary (HIGH confidence)
- `src/content/instruments/cascadia/signal-flow.md` -- Complete normalled signal path diagram and descriptions
- `src/content/instruments/cascadia/modules/*.md` -- All 17 module docs with controls, jacks, normals, LEDs
- `src/content/instruments/cascadia/overview.md` -- "Make a Sound" walkthrough (mirrors manual pp. 11-16)
- `sessions/evolver/01-foundations-navigation.md` -- Reference session format
- `sessions/evolver/03-analog-osc-waveshapes.md` -- Reference for oscillator-teaching session
- `framework/adhd-design.md` -- ADHD design principles and session author checklist
- `.planning/phases/10-curriculum-modules-1-3/10-CONTEXT.md` -- All implementation decisions

### Secondary (MEDIUM confidence)
- `references/cascadia_manual_v1.1_2023.04.18.pdf` pp. 11-16 -- Could not render PDF directly; relied on overview.md which was authored from this manual

## Metadata

**Confidence breakdown:**
- Session format/structure: HIGH -- 35 Evolver sessions establish the pattern, ADHD framework provides validation checklist
- Module content accuracy: HIGH -- all 17 module docs exist with complete control/jack/normalling data
- Pedagogical sequence: HIGH -- Module 1 follows manufacturer walkthrough, Modules 2-3 follow logical signal-path progression
- Patch integration: MEDIUM -- depends on Phase 9 completion for schema and demo patch names

**Research date:** 2026-03-31
**Valid until:** 2026-06-30 (stable -- content authoring, no dependency version drift)
