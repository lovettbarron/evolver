---
title: 'Session 20: Bass Sound Design'
session_number: 20
duration: 25
prerequisite: 19
output_type: patch
difficulty: advanced
tags:
  - bass
  - sound-design
  - recipe
  - curriculum
instrument: cascadia
reference: 'Cascadia Manual pp. 11-18, 24-27'
section: Sound Design
instrument_type: instrument
---

# Session 20: Bass Sound Design

**Objective:** Build a deep, usable bass patch from scratch, documenting every cable and knob setting.

> [!tip] If you only have 5 minutes
> The key to this bass is a low octave sawtooth through LP4 with the cutoff set low (~25%) and a tight envelope sweep via FM 1 (~50%). That combination gives you the attack definition and warm body that defines a great synth bass.

## Sound Design Strategy: Bass

A great bass patch needs three things: **weight** (low fundamental with strong harmonics), **definition** (a clear attack that cuts through a mix), and **control** (tight envelope behavior so notes start and stop precisely). In subtractive synthesis, weight comes from a harmonically rich oscillator at a low octave. Definition comes from a filter envelope that opens the brightness briefly on each attack. Control comes from fast envelopes with zero sustain for staccato or moderate sustain for held bass lines.

The sawtooth wave is the classic bass oscillator because its complete harmonic series gives the filter maximum material to shape. The sub-oscillator adds fundamental weight below the main oscillator, filling out the very lowest frequencies that the sawtooth's upper harmonics complement.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Set VCO A OCTAVE to 2 and play a low note. Recall how the normalled signal path works: oscillator -> mixer -> filter -> wave folder -> VCA -> output.

## Building the Patch

**Cables for this patch:**

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| (none) | -- | -- | This patch uses the normalled signal path only | -- |

This bass patch requires zero cables. Everything runs through Cascadia's normalled path.

**Module-by-module settings:**

### VCO A
- OCTAVE: 2 (bass range)
- PITCH: noon (centered)
- PW: ~50% (square wave, for the sub-enriched moments)
- PW MOD: ~15% (subtle LFO movement on pulse width)
- INDEX: 0% (no FM)
- All switches at defaults (TZFM, AC, Sync Off, Center)

### Mixer
- SAW: ~70% (primary bass timbre)
- SUB: ~45% (adds weight one octave below)
- SUB TYPE: SUB -1 (one octave down)
- All other sliders: 0%
- NOISE TYPE: WHITE (unused, slider at 0%)

### VCF
- FREQ: ~25% (low cutoff -- dark body)
- Q: ~15% (subtle warmth, not resonant)
- MODE: LP4 (classic fat bass rolloff)
- LEVEL: ~55% (slight pre-filter warmth)
- FM 1: ~50% (envelope opens filter on attack)
- FM 2: noon (default keyboard tracking)
- FM 3: 0%

### Envelope B (filter envelope, normalled to VCF FM 1)
- Attack: ~0%
- Decay: ~30%
- Sustain: ~15%
- Release: ~15%
- MODE SELECT: ENV

### Envelope A (amplitude, normalled to VCA A)
- Attack: ~0%
- Decay: ~25%
- Sustain: ~60%
- Release: ~10%
- ENVELOPE SPEED: Fast
- HOLD POSITION: Off
- CTRL SOURCE: Level

### VCA A
- LEVEL: ~30%
- LEVEL MOD: ~65%
- AUX IN: 0%

### Wave Folder
- FOLD: ~10% (barely adds grit on the attack)
- MOD: 0%

### LFO
- RATE: ~20% (slow, for subtle PWM drift)

### Output Control
- MAIN DRIVE: noon
- MAIN LEVEL: ~50%

<div data-cascadia-panel
  data-sections="vco-a,mixer,vcf,envelope-a,envelope-b,vca-a,wave-folder,lfo-xyz,output-control"
  data-knobs="slider-mixer-saw:89,slider-mixer-sub:57,slider-vcf-freq:32,slider-vcf-q:19,slider-vcf-fm-1:64,slider-envelope-b-rise:0,slider-envelope-b-fall:38,slider-envelope-a-attack:0,slider-envelope-a-decay:32,slider-envelope-a-sustain:76,slider-envelope-a-release:13,slider-wave-folder-fold:13,slider-vco-a-pw-mod:19,knob-lfo-xyz-rate:25"
  data-highlights="slider-mixer-saw:blue,slider-mixer-sub:blue,switch-mixer-sub-type:blue,slider-vcf-freq:blue,slider-vcf-fm-1:blue,slider-wave-folder-fold:amber"
  data-zoom="false"
></div>

**Step-by-step build:**

1. Set VCO A OCTAVE to 2. Play a note -- deep sawtooth
2. Set Mixer SAW to ~70%, SUB to ~45%, SUB TYPE to SUB -1. Play a note -- you should hear a deeper, fuller bass with the sub-octave reinforcing the low end
3. Set VCF FREQ to ~25%, MODE to LP4, Q to ~15%. Play a note -- the bass is now dark and warm, the filter removing the harsh upper harmonics
4. Set VCF FM 1 to ~50%. Set Envelope B: Attack ~0%, Decay ~30%, Sustain ~15%, Release ~15%. Play notes -- each note should have a bright "pluck" on the attack that settles into the warm body. This is the definition you need for the bass to cut through
5. Set Envelope A: Attack ~0%, Decay ~25%, Sustain ~60%, Release ~10%, ENVELOPE SPEED Fast. Play a note and hold -- the bass sustains at a moderate level. Play staccato -- tight, controlled notes
6. Set Wave Folder FOLD to ~10%. Play notes -- a subtle grit appears on the attack where the filter envelope is open. This adds presence without muddying the low end
7. Set VCO A PW MOD to ~15%, LFO RATE to ~20%. Hold a note -- the pulse width drifts very slowly, adding subtle movement to sustained notes

## Playing Tips

- Play in the C1-C3 range for the deepest bass. C2 is the sweet spot for most mix contexts
- Staccato playing emphasizes the filter envelope pluck. Legato playing emphasizes the warm sustain body
- Velocity (via CTRL SOURCE at Level) naturally gives harder strikes more volume -- play dynamically for an expressive bass line
- Try octave jumps (C2 to C3) for classic synth bass movement

## Variations

- **Aggressive bass**: Raise VCF LEVEL to ~75% and FOLD to ~25% for pre-filter distortion and wave folding grit
- **Deep dub bass**: Lower FM 1 to ~25% and raise Sustain on both envelopes for a darker, more sustained tone
- **Pluck bass**: Set both Envelope A and B Sustain to ~0% for a tight, staccato-only bass with no sustain

## Output Checklist

- [ ] Bass patch built from normalled default with all knob settings documented
- [ ] Patch produces a deep, warm bass with attack definition from the filter envelope
- [ ] Sub-oscillator adds low-end weight
- [ ] Patch documented in patches/cascadia/deep-sub-bass-recipe.md with full cable routing and knob settings
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Bass patch weight comes from a low octave oscillator plus sub-oscillator; definition comes from a filter envelope that briefly opens brightness on each attack
- Zero cables needed -- Cascadia's normalled path provides a complete subtractive bass signal chain
- Subtle wave folding and PWM add movement and presence without muddying the fundamental

## Next Session Preview

Session 21 builds a **lead patch** -- cutting, expressive, designed to sit on top of a mix. You will add VCO B detuning for thickness, moderate resonance for presence, and wave folding for edge.
