---
title: "Session 03: Filter Envelope, Wave Folding, FM & FX"
module: "Foundations"
session_number: 3
duration: 25
prerequisite: 2
output_type: patch
difficulty: beginner
tags: [foundations, filter, envelope, wave-folding, fm, fx, curriculum-patch]
instrument: cascadia
reference: "Cascadia Manual pp. 13-16"
---

# Session 03: Filter Envelope, Wave Folding, FM & FX

**Objective:** Hear how a filter envelope shapes timbre over time, explore wave folding as a harmonic generator, taste FM synthesis, and get a brief overview of the FX send/return -- then save your first curriculum patch.

> [!tip] If you only have 5 minutes
> Set VCF FREQ to ~25% and VCF FM 1 slider to ~60%. Play a note -- hear the filter sweep. Raise Wave Folder FOLD to ~40%. That combination is the foundation of the patch you will save today.

## How Does a Filter Envelope Shape Timbre?

A synthesizer filter removes frequencies from a sound -- typically everything above a cutoff frequency (in a low-pass filter). By itself, a static filter just makes a sound darker or brighter. The magic happens when you connect an *envelope* to the filter cutoff. Now the brightness changes over time with each note: the cutoff sweeps up during the attack, holds during sustain, and falls back during release. This is the classic "filter envelope sweep" heard in every genre from funk bass to ambient pads.

Wave folding is a different approach to timbral shaping. Instead of removing harmonics (like a filter), a wave folder *adds* harmonics by folding the peaks of a waveform back toward the center whenever they exceed a threshold. The result is a complex, metallic, harmonically rich tone that becomes more intense as you increase the fold amount. Frequency modulation (FM) generates harmonics by using one oscillator to modulate the frequency of another, creating bell-like and metallic timbres. This session gives you a taste of each.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default sawtooth tone. Now raise the Mixer PULSE slider to ~50% and the PW MOD slider to ~50% -- recall the animated PWM sound from Session 2. Return both to 0%.

## Setup

From the normalled default:
- Mixer SAW at ~50%, all other Mixer sliders at 0%
- VCO A OCTAVE set to a comfortable range (4 or 5)
- VCF MODE selector set to LP4 (24dB/oct lowpass)
- VCF FREQ at ~50%
- All other VCF sliders at their starting positions

## Exercises

<div data-cascadia-panel
  data-sections="vcf,envelope-b"
  data-knobs="slider-vcf-freq:32,slider-vcf-fm-1:76"
  data-highlights="slider-vcf-freq:blue,slider-vcf-fm-1:blue,slider-envelope-b-rise:blue,slider-envelope-b-fall:blue"
></div>

### Exercise 1: The Filter Envelope Sweep (8 min)

> [!info] Normalled: Envelope B -> VCF FM 1. Envelope B's output is pre-wired to the filter's first frequency modulation input. The VCF FM 1 slider controls how much Envelope B affects the cutoff. Patching into VCF FM 1 IN overrides this connection.

1. Set VCF FREQ to ~25% -- the sound should be noticeably darker and duller as the filter is mostly closed
2. Raise the VCF FM 1 slider to ~50% -- play a note. You should hear the filter sweep open as Envelope B fires, then close as it decays. The sound starts bright and becomes darker
3. Raise VCF FM 1 to ~75% -- the sweep becomes more dramatic and pronounced
4. Now adjust Envelope B's RISE slider to ~40% -- the filter sweep should open more slowly, creating a gradual swell of brightness
5. Set Envelope B FALL to ~60% -- the brightness should decay over a longer period, creating a more sustained sweep
6. Try Envelope B RISE at ~10% and FALL at ~30% -- a quick, plucky filter sweep. Then try RISE at ~50% and FALL at ~75% -- a slow, pad-like sweep
7. Settle on RISE at ~30% and FALL at ~50% for a balanced sweep sound. Keep VCF FM 1 at ~60%

> [!info] Cascadia's Envelope B is actually a triple-mode function generator (Envelope/LFO/Burst), but in this session we use it in its default Envelope mode. You will explore the other modes in Module 3.

<div data-cascadia-panel
  data-sections="wave-folder,vco-a"
  data-highlights="slider-wave-folder-fold:blue,slider-vco-a-index:amber"
></div>

### Exercise 2: Add Wave Folding (6 min)

> [!info] Normalled: VCF OUT -> Wave Folder IN. The filtered signal passes through the wave folder automatically. The FOLD slider controls how much folding is applied. Even at 0%, signal passes through cleanly.

1. With your filter sweep settings from Exercise 1, raise the Wave Folder FOLD slider from 0% to ~25% -- you should hear new harmonics appear, adding a metallic edge to the filtered tone
2. Raise FOLD to ~50% -- the harmonics become more intense and complex
3. Raise FOLD to ~75% -- the sound becomes dramatically more aggressive and buzzy
4. Set FOLD to ~30% for a moderate effect that adds character without overwhelming the filter sweep
5. Play notes at different pitches -- notice how the folding interacts differently with the filter sweep at different frequencies

> [!info] Cascadia's wave folder sits *after* the VCF in the normalled signal chain. This is unusual -- most instruments filter last. Here, you fold an already-filtered signal, which means the filter controls what harmonics go *into* the folder. This creates timbres unique to Cascadia's signal path topology.

### Exercise 3: A Taste of FM Synthesis (5 min)

> [!info] Normalled: VCO B Sine -> VCO A FM 2. VCO B's sine wave output is pre-wired to VCO A's second FM input. The INDEX slider on VCO A controls the FM depth. Patching into VCO A FM 2 IN overrides this connection.

1. Set Wave Folder FOLD back to 0% and VCF FREQ to ~75% (open the filter so you can hear FM clearly)
2. Slowly raise VCO A INDEX slider from 0% to ~30% -- you should hear the tone become more complex and slightly metallic as VCO B modulates VCO A's frequency
3. Raise INDEX to ~60% -- the sound becomes bell-like or clangorous depending on the pitch relationship
4. Return INDEX to ~25% for a subtle FM flavor. This is just a taste -- you will explore FM in depth in Module 2
5. Return INDEX to 0%

<div data-cascadia-panel
  data-sections="fx-send-return"
  data-highlights="jack-fx-send-return-send:amber,jack-fx-send-return-mix:amber,knob-fx-send-return-dry-wet:blue"
></div>

### Exercise 4: FX Send/Return Overview (2 min)

The FX Send/Return section on Cascadia lets you insert external effects pedals anywhere in the signal chain using two cables: one from any signal to the FX SEND jack, and one from the FX MIX output back into the signal path.

1. Look at the FX Send/Return section on the panel -- note the FX SEND input, FX MIX output, and the DRY/WET knob
2. If you have an effects pedal available: connect a cable from VCA A OUT (in Output Control) to FX SEND, connect rear panel SEND to your pedal input, pedal output to rear RETURN, then patch FX MIX to MAIN 1 IN. Adjust DRY/WET to taste
3. If you do not have a pedal, skip this -- we will revisit FX in later sessions

> [!info] Cascadia's FX Send/Return can be patched anywhere in the signal chain, not just at the output. You could insert a reverb pedal between the filter and wave folder, or a distortion pedal before the filter. This flexibility is a key advantage of the modular architecture.

### Save Your Patch (3 min)

Set up your final patch settings -- this is the Foundations Filter Sweep patch:
- VCF FREQ at ~25%
- VCF Q at ~30%
- VCF FM 1 at ~60%
- Envelope B RISE at ~30%
- Envelope B FALL at ~50%
- Wave Folder FOLD at ~30%
- VCO A INDEX at 0% (no FM for this patch)
- All other settings at normalled defaults

Play a sustained note -- you should hear a filter sweep with moderate wave folding adding harmonic complexity. This is your first curriculum patch. Document it in `patches/cascadia/foundations-filter-sweep.md` (see the patch file for exact values in clock-position notation).

## Exploration (optional, hyperfocus days)

- Try raising VCF Q to ~50% and hear how resonance emphasizes the sweep frequency -- the filter "rings" as it sweeps
- Experiment with Wave Folder FOLD at ~60% combined with different VCF FREQ settings -- hear how the interaction between filter and folder changes the character
- With INDEX at ~30%, toggle VCO A's TZFM/EXP switch between the two positions -- hear the difference between through-zero FM and exponential FM

## Output Checklist

- [ ] Can hear the filter envelope sweep and adjust its speed with Envelope B RISE/FALL
- [ ] Can hear wave folding adding harmonics to the filtered signal
- [ ] Tasted FM synthesis using the normalled VCO B -> VCO A connection
- [ ] Foundations Filter Sweep patch saved and documented in patches/cascadia/
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- A filter envelope creates dynamic timbre changes over the life of each note -- the foundation of expressive synthesis
- Wave folding adds harmonics rather than removing them, creating complex timbres distinct from filtering or distortion
- FM synthesis using Cascadia's normalled VCO B -> VCO A connection is available at the turn of a slider

## Next Session Preview

Module 2 begins with a deep dive into VCO A -- its waveform shapes, octave tuning, and how different waveshapes interact with the filter and wave folder. You will create patches that highlight each waveform's unique character.
