---
title: 'Session 17: Self-Patching and Feedback Loops'
session_number: 17
duration: 25
prerequisite: 16
output_type: technique
difficulty: advanced
tags:
  - self-patching
  - feedback
  - resonance
  - chaos
  - advanced
  - curriculum
instrument: cascadia
reference: 'Cascadia Manual pp. 24-27, 28-29'
section: Advanced Patching
instrument_type: instrument
---

# Session 17: Self-Patching and Feedback Loops

**Objective:** Create controlled feedback loops by routing Cascadia's outputs back to its own inputs, using the Mixuverter as a feedback attenuator, and explore the spectrum from subtle resonant character to complex emergent textures.

> [!warning] Feedback can produce dangerously loud signals. ALWAYS start with all feedback amounts at MINIMUM (0%) and increase slowly. Keep your monitoring volume low. If the sound becomes painfully loud or unstable, immediately turn the feedback amount down to 0% before adjusting anything else.

> [!tip] If you only have 5 minutes
> Patch VCF LP4 OUT -> MIXER IN 1 (overriding Ring Mod normalling). Set Mixer IN 1 to 0%. Play a note, then slowly raise IN 1 to ~20%. You should hear the filter's character change -- the feedback adds a resonant, singing quality on top of the normal filter tone. That is self-patching at its simplest.

## What Is Self-Patching?

**Self-patching** means routing an output from a module back to an input on the same instrument, creating a **feedback loop**. The signal passes through the processing chain, comes out changed, and goes back in to be changed again -- each cycle adding more processing on top of the previous one.

At low feedback levels, self-patching adds **resonant character** -- a subtle singing or ringing quality that makes filters and oscillators sound more alive. At medium levels, it creates **complex harmonics** that cannot be achieved any other way -- the recursive processing generates timbres that are genuinely new. At high levels, feedback becomes **chaotic and unpredictable** -- the sound takes on a life of its own, oscillating and screaming in ways you cannot fully control.

The key to musical feedback is **attenuation**: controlling how much of the output feeds back to the input. Without attenuation, feedback quickly spirals to maximum volume and distortion. With careful level control, feedback becomes one of the most powerful sound design tools available.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Raise VCO A INDEX to ~30% -- recall the FM bell tone from Session 16. Return INDEX to 0%.

## Setup

From the normalled default:
- Mixer SAW at ~50%, all other Mixer sliders at 0%
- VCO A OCTAVE at 4
- VCF FREQ at ~50%, Q at ~20%, MODE at LP4
- VCF LEVEL at ~50%
- Wave Folder FOLD at 0%
- VCA A LEVEL at ~40%, LEVEL MOD at ~50%
- **MAIN LEVEL on Output Control at ~30%** (start quiet for safety)

## Exercises

<div data-cascadia-panel
  data-sections="vcf,mixer"
  data-highlights="jack-vcf-lp4-out:amber,jack-mixer-in-1:blue,slider-mixer-in-1:blue,slider-vcf-freq:amber,slider-vcf-q:amber"
  data-cables="jack-vcf-lp4-out>jack-mixer-in-1:audio"
></div>

### Exercise 1: Simple Filter Feedback (8 min)

This exercise requires one cable.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | VCF LP4 OUT | MIXER IN 1 | Feed filtered signal back to mixer input | Ring Mod OUT -> Mixer IN 1 normalling |

> [!warning] Start with Mixer IN 1 at 0%. Increase slowly.

1. Patch Cable 1: **VCF LP4 OUT** -> **MIXER IN 1**. Keep Mixer IN 1 at 0%
2. Play and hold a note. You hear the normal filtered sawtooth. Now slowly raise Mixer IN 1 from 0% to ~15%. You should hear a subtle change in the filter's character -- slightly more resonant and alive, as if Q were higher than it actually is. The LP4 output is feeding back through the mixer and filter again

> [!info] Cascadia's VCF has three simultaneous outputs: LP4 OUT, HP4 OUT, and VCF OUT (mode-selectable). These are always active regardless of MODE setting. This means you can feed back one filter output while listening to a different one, creating complex cross-feedback paths.

3. Raise IN 1 to ~25%. The resonant character becomes more pronounced. The filter sings on note attacks. Play staccato notes -- each note has a ringing tail from the feedback
4. Raise IN 1 to ~35%. The feedback is now clearly audible as a separate tonal element. The sound may become unstable or start to self-oscillate. If it gets too loud, lower IN 1 immediately
5. Lower IN 1 to ~20% (a musically useful amount). Try changing VCF FREQ -- notice how the feedback character shifts with the cutoff frequency. At higher FREQ, the feedback is brighter and rings more. At lower FREQ, it is darker and more subdued
6. Try switching VCF MODE while feedback is active. BP4 feedback has a very different, more focused character than LP4 feedback. HP4 feedback is thinner and more metallic

### Exercise 2: Wave Folder in the Feedback Path (8 min)

1. Keep Cable 1 patched (VCF LP4 OUT -> MIXER IN 1) with IN 1 at ~15%
2. Raise Wave Folder FOLD from 0% to ~25%. The fed-back signal now passes through the wave folder before reaching the VCA and output. You should hear additional harmonic content appearing -- the fold adds new overtones to the already-complex feedback signal
3. Raise FOLD to ~40% -- the harmonics multiply. Each pass through the feedback loop adds more folds, creating progressively more complex timbres. The sound becomes buzzy and harmonically dense
4. With FOLD at ~30% and IN 1 at ~15%, play notes at different pitches. Low notes produce denser, growling feedback. High notes produce thinner, more ring-like feedback. The interaction between pitch, filter feedback, and wave folding creates a wide palette of textures
5. Lower FOLD back to 0%

<div data-cascadia-panel
  data-sections="vcf,mixer,utilities,envelope-a"
  data-highlights="jack-vcf-lp4-out:amber,jack-utilities-main-input:blue,jack-envelope-a-out:amber,jack-utilities-secondary-input:blue,jack-utilities-mixuverter-out-a:amber,jack-mixer-in-1:blue"
  data-cables="jack-vcf-lp4-out>jack-utilities-main-input:audio,jack-envelope-a-out>jack-utilities-secondary-input:mod,jack-utilities-mixuverter-out-a>jack-mixer-in-1:audio"
></div>

### Exercise 3: Envelope-Controlled Feedback via Mixuverter (5 min)

This exercise uses the Mixuverter to control feedback amount dynamically with an envelope.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | VCF LP4 OUT | MIXUVERTER MAIN INPUT | Feed filter output to Mixuverter | +5V DC normalling |
| 2 | Envelope A ENV OUT | MIXUVERTER SECONDARY INPUT | Envelope controls feedback amount | Nothing |
| 3 | MIXUVERTER OUTPUT | MIXER IN 1 | Processed feedback to mixer | Ring Mod normalling |

> [!warning] Set Mixuverter ATTENUATOR to ~0% before patching. Increase slowly.

1. Remove Cable 1. Repatch as shown above: Cable 1 to MIXUVERTER MAIN INPUT, Cable 2 from Envelope A ENV OUT to MIXUVERTER SECONDARY INPUT, Cable 3 from MIXUVERTER OUTPUT to MIXER IN 1
2. Set POLARITY to UNI, ATTENUATOR at ~0%, x2 OFF. Set Mixer IN 1 to ~40%. Set Envelope A to a percussive shape: Attack ~0%, Decay ~25%, Sustain ~0%
3. With ATTENUATOR at ~0%, the feedback is minimal. Slowly raise ATTENUATOR to ~20%. Play notes -- the feedback amount now follows the envelope. On each note attack, the envelope peaks and feeds back more signal; during decay, the feedback drops. You should hear a burst of resonant character on each attack that fades quickly
4. Raise ATTENUATOR to ~35%. The feedback bursts become more intense on each attack. The sound has an aggressive "spit" on the transient that decays into a cleaner tone
5. Try different Envelope A Decay settings: ~10% for a very short feedback burst (percussive accent), ~40% for a longer feedback tail (singing resonance)
6. Remove all cables. Return MAIN LEVEL to ~50%

## Exploration (optional, hyperfocus days)

- Patch VCF HP4 OUT back to MIXER IN 1 instead of LP4 OUT -- high-pass feedback has a different, thinner resonant character
- Try feedback from the Output Control's FOLD OUT jack -> MIXER IN 1. This feeds the post-wave-folder signal back, creating recursive folding that generates extreme harmonic complexity
- Create a "screaming" patch: VCF LP4 OUT -> MIXER IN 1 at ~30%, Q at ~60%, FREQ swept manually. The combination of feedback and resonance creates aggressive, vocal-like screams. Keep volume LOW

## Output Checklist

- [ ] Created a simple filter feedback loop (VCF LP4 OUT -> MIXER IN 1)
- [ ] Heard the spectrum from subtle resonant character to intense feedback
- [ ] Combined feedback with wave folding for complex harmonics
- [ ] Used the Mixuverter to create envelope-controlled dynamic feedback
- [ ] Maintained safe volume levels throughout all feedback experiments
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Self-patching feeds an output back to an input, creating recursive processing that adds resonant character at low levels and chaotic complexity at high levels
- Attenuation is essential -- the Mixuverter or Mixer level sliders are your safety valve for controlling feedback amount
- Cascadia's multiple simultaneous filter outputs (LP4, HP4, MODE) enable creative feedback routing where you can feed back one filter type while listening to another

## Next Session Preview

Session 18 introduces **FX pedal integration** -- using Cascadia's built-in FX Send/Return loop to insert external effects pedals anywhere in the signal chain, with impedance matching and dry/wet mixing.
