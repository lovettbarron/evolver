---
title: "Session 24: Texture Sound Design"
module: "Sound Design"
session_number: 24
duration: 25
prerequisite: 23
output_type: patch
difficulty: advanced
tags: [texture, sound-design, recipe, noise, sample-hold, wave-folder, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 20-21, 24-27, 28-29, 37-38"
---

# Session 24: Texture Sound Design

**Objective:** Build an evolving noise/texture patch using noise through the VCF with S&H modulation, wave folding for harmonic complexity, and LFO movement for organic, non-pitched sound design.

> [!tip] If you only have 5 minutes
> Set Mixer NOISE to ~70% (WHITE), all other Mixer sliders to 0%. Set VCF MODE to BP4, FREQ to ~40%, Q to ~45%. Play a note -- the filtered noise with resonance creates an eerie, windy texture. Sweep FREQ slowly for an evolving atmosphere.

## Sound Design Strategy: Texture

Texture patches occupy a different role than tonal patches. They do not have a clear pitch or rhythm -- instead they provide **atmosphere, movement, and space**. Think of them as the weather in a mix: wind, rain, rustling, hissing, crackling. Good textures evolve slowly and never quite repeat, giving the listener a sense of organic life beneath the tonal elements.

The building blocks are **noise** (the raw material), **filtering** (to shape the noise spectrum), **modulation** (to create movement), and **wave folding** (to add harmonic complexity that takes the sound beyond simple filtered noise). S&H and slew-smoothed random voltages are essential for creating movement that never repeats.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Set Mixer NOISE to ~50%, SAW to 0%, and listen to filtered noise. Switch NOISE TYPE through WHITE, PINK, ALT. Return to noon.

## Building the Patch

**Cables for this patch:**

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | S&H OUT | VCF FM 3 IN | Stepped random modulation on filter | S&H OUT -> Slew normalling stays active |
| 2 | SLEW OUT | Wave Folder FOLD MOD IN | Smoothed random modulates fold depth | Nothing |
| 3 | LFO X OUT | VCF Q MOD IN | LFO modulates resonance | Nothing |

### VCO A
- OCTAVE: 4 (for occasional pitched undertone)
- PITCH: noon

### Mixer
- NOISE: ~65% (primary source)
- NOISE TYPE: WHITE
- SAW: ~15% (subtle pitched undertone blended with noise)
- All other sliders: 0%

### VCF
- FREQ: ~35% (moderate cutoff shapes noise spectrum)
- Q: ~40% (resonance adds tonal character to noise)
- MODE: BP4 (narrow bandpass concentrates the noise)
- LEVEL: ~55%
- FM 1: ~25% (envelope shapes noise on each trigger)
- FM 2: noon
- FM 3: ~35% (S&H random on cutoff -- Cable 1)
- QM: ~30% (LFO modulates resonance -- Cable 3)

### Envelope B (filter)
- Attack: ~10%
- Decay: ~50%
- Sustain: ~35%
- Release: ~40%

### Envelope A (amplitude)
- Attack: ~15%
- Decay: ~35%
- Sustain: ~65%
- Release: ~45%
- ENVELOPE SPEED: Med
- HOLD POSITION: Off
- CTRL SOURCE: Off

### VCA A
- LEVEL: ~35%
- LEVEL MOD: ~50%
- AUX IN: 0%

### Wave Folder
- FOLD: ~20% (base fold amount)
- MOD: ~40% (S&H modulates fold depth -- Cable 2)

### LFO
- RATE: ~20% (slow modulation)

### Utilities — Slew Limiter
- SLEW RATE: ~40%
- SLEW DIRECTION: Both
- SLEW SHAPE: EXP

### Output Control
- MAIN DRIVE: noon
- MAIN LEVEL: ~50%

<div data-cascadia-panel
  data-sections="mixer,vcf,utilities,wave-folder,lfo-xyz,envelope-a,vca-a"
  data-knobs="slider-mixer-noise:83,slider-mixer-saw:19,slider-vcf-freq:44,slider-vcf-q:51,slider-vcf-fm-3:44,slider-vcf-qm:38,slider-wave-folder-fold:25,slider-wave-folder-mod:51,knob-utilities-slew-rate:51,knob-lfo-xyz-rate:25"
  data-highlights="jack-utilities-sh-out:amber,jack-vcf-fm-3-in:blue,jack-utilities-slew-out:amber,jack-wave-folder-mod-in:blue,jack-lfo-xyz-x-out:amber,jack-vcf-q-mod-in:blue"
  data-cables="jack-utilities-sh-out>jack-vcf-fm-3-in:cv,jack-utilities-slew-out>jack-wave-folder-mod-in:cv,jack-lfo-xyz-x-out>jack-vcf-q-mod-in:mod"
  data-zoom="false"
></div>

**Step-by-step build:**

1. Set Mixer NOISE to ~65%, NOISE TYPE to WHITE, SAW to ~15%. Set VCF MODE to BP4, FREQ to ~35%, Q to ~40%. Play and hold a note -- you should hear a concentrated band of noise with a resonant, almost tonal character. The bandpass focuses the noise into a narrow frequency range
2. Set VCF FM 1 to ~25%, Envelope B: Attack ~10%, Decay ~50%, Sustain ~35%, Release ~40%. Play notes -- each trigger sweeps the filter through the noise spectrum, creating a "whoosh" quality on each note
3. Patch Cable 1: **S&H OUT** -> **VCF FM 3 IN**. Set FM 3 to ~35%. The filter cutoff now jumps to random positions on each MIDI clock tick (or PUSH GATE press), creating unpredictable spectral changes in the noise

> [!info] Normalled: Internal digital noise -> S&H IN, MIDI CLK -> S&H TRIG IN. The Sample & Hold generates random voltages automatically. S&H OUT is also normalled to Slew/Follow IN, so the Slew Limiter receives these random steps simultaneously.

4. Set Wave Folder FOLD to ~20%. The noise gains harmonic complexity -- the wave folder adds overtone patterns to the noise spectrum that would not exist from simple filtering
5. Patch Cable 2: **SLEW OUT** -> **Wave Folder FOLD MOD IN**. Set Wave Folder MOD to ~40%. Set Slew RATE to ~40%, SHAPE EXP, DIRECTION Both. Now the fold depth wanders smoothly as the slew-smoothed random voltage changes. The harmonic complexity evolves organically

> [!info] Normalled: S&H OUT -> Slew/Follow IN. The S&H feeds the Slew Limiter automatically. Cable 1 sends raw S&H steps to the filter (abrupt changes), while Cable 2 sends slew-smoothed S&H to the wave folder (gradual changes). Same random source, two different characters.

6. Patch Cable 3: **LFO X OUT** -> **VCF Q MOD IN**. Set QM to ~30%, LFO RATE to ~20%. The resonance now pulses slowly -- sometimes the noise has a sharp, ringing quality, sometimes it is broader and flatter. This adds another layer of movement
7. Set Envelope A: Attack ~15%, Decay ~35%, Sustain ~65%, Release ~45%, ENVELOPE SPEED Med. Play and hold -- the texture swells in gently and sustains with continuous movement from the S&H, slew, and LFO modulation

## Playing Tips

- Hold notes for 10+ seconds to hear the full evolving character. The S&H and slew create changes that unfold over time
- Play at different pitches -- the pitched sawtooth undertone shifts, subtly coloring the noise texture
- Try NOISE TYPE PINK for a warmer, less hissy texture. Try ALT for digital, metallic noise character
- This patch works well as a background element layered under other instruments

## Variations

- **Metallic texture**: Switch NOISE TYPE to ALT, raise Q to ~55%, and add Mixer IN 1 at ~25% for ring mod metallic content
- **Dark rumble**: Switch MODE to LP4, lower FREQ to ~20%, lower Q to ~15%, use PINK noise for a deep, dark atmosphere
- **Crackle**: Use ALT noise with very short Envelope B (Decay ~10%, Sustain ~0%), high FM 3 (~50%). Each clock tick creates a short, random-pitched pop

## Output Checklist

- [ ] Texture patch built from noise through BP4 filter with resonance
- [ ] S&H provides stepped random filter modulation
- [ ] Slew-smoothed random modulates wave fold depth for evolving harmonics
- [ ] LFO modulates resonance for pulsing spectral character
- [ ] Patch documented in patches/cascadia/granular-texture-recipe.md with full cable routing and knob settings
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Texture patches use noise as the primary source material, shaped by filtering, modulation, and wave folding into evolving atmospheres
- Splitting the same random source (S&H) into stepped (direct) and smoothed (slewed) versions creates two complementary modulation characters from one source
- Resonance modulation via LFO adds a pulsing, breathing quality that makes textures feel organic rather than static

## Next Session Preview

Session 25 is the **curriculum capstone**: an ambient patch that combines techniques from every module -- slow LFOs, S&H drift, long envelopes, wave folding, and FX integration. You will build the most complex patch in the curriculum.
