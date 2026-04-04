---
title: "Session 18: FX Pedal Integration"
module: "Advanced Patching"
session_number: 18
duration: 20
prerequisite: 17
output_type: technique
difficulty: intermediate
tags: [fx, effects, pedal, send-return, advanced, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 39-40"
---

# Session 18: FX Pedal Integration

**Objective:** Use Cascadia's FX Send/Return to integrate an external effects pedal into the signal chain, exploring impedance matching, dry/wet mixing, and different insertion points.

> [!tip] If you only have 5 minutes
> Patch VCF LP4 OUT -> FX SEND. Connect your pedal to the rear SEND and RETURN jacks. Set LINE/PEDAL to PEDAL, FX SEND LEVEL to ~50%, FX RETURN LEVEL to ~50%, DRY/WET to noon. Patch FX MIX -> MAIN 2 IN. Play a note -- you should hear your pedal processing Cascadia's filtered signal, blended with the dry output.

## Why Use External Effects with a Synthesizer?

A synthesizer generates and shapes sound. **External effects** add spatial dimension, character, and movement that the synth alone cannot provide. Reverb places the sound in a virtual space. Delay creates echoes and rhythmic patterns. Distortion adds harmonics and grit. Chorus adds width and shimmer.

The key question is **where** in the signal chain to insert the effect. Effects before the filter are shaped by the filter afterward -- a reverb tail gets darker as the filter closes. Effects after the filter preserve the filter's articulation -- a reverb tail rings out with the filtered tone intact. The choice depends on the musical goal: pre-filter effects for "effects as a sound source," post-filter effects for "effects as a spatial tool."

Cascadia's FX Send/Return can be patched at any point in the signal chain, making this choice yours for every patch.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Raise Mixer IN 1 to ~20% and listen to the Ring Mod character blended in -- recall that Mixer IN 1 is normalled from Ring Mod OUT. Return IN 1 to 0%.

## Setup

From the normalled default:
- Mixer SAW at ~60%, all other Mixer sliders at 0%
- VCO A OCTAVE at 4
- VCF FREQ at ~55%, Q at ~15%, MODE at LP4
- VCF FM 1 at ~40% (envelope on filter)
- Envelope B: Attack ~0%, Decay ~35%, Sustain ~20%, Release ~25%
- FX SEND LEVEL at ~50%
- FX RETURN LEVEL at ~50%
- DRY/WET FX MIX at noon (~50%)
- SEND LEVEL switch at PEDAL (for guitar pedals) or LINE (for rack effects)
- PHASE switch at Normal

**External connections (rear panel):**
- SEND jack -> pedal input
- Pedal output -> RETURN jack

If you do not have a pedal, read through the exercises to understand the signal flow. The concepts apply whenever you add one later.

## Exercises

<div data-cascadia-panel
  data-sections="fx-send-return,vcf,output-control"
  data-highlights="jack-vcf-lp4-out:amber,jack-fx-send-return-send:blue,jack-fx-send-return-mix:amber,jack-output-control-main-2-in:blue,knob-fx-send-return-send-level:blue,knob-fx-send-return-return-level:blue,knob-fx-send-return-dry-wet:blue"
  data-cables="jack-vcf-lp4-out>jack-fx-send-return-send:audio,jack-fx-send-return-mix>jack-output-control-main-2-in:audio"
></div>

### Exercise 1: Post-Filter Effects Loop (7 min)

This exercise requires two internal cables plus the external pedal connections.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | VCF LP4 OUT | FX SEND | Send filtered audio to effects loop | Nothing |
| 2 | FX MIX | MAIN 2 IN | Return processed audio to output | Nothing |

1. Patch Cable 1: **VCF LP4 OUT** -> **FX SEND**. Patch Cable 2: **FX MIX** -> **MAIN 2 IN**
2. Play notes. You should hear both the dry signal (through the normal VCA A -> MAIN 1 path) and the wet signal (through the FX loop -> MAIN 2). The DRY/WET knob on FX Send/Return controls the wet/dry balance of the FX MIX output only
3. If using a reverb pedal: play staccato notes. You should hear the dry attack followed by the reverb tail. Turn DRY/WET fully wet -- now MAIN 2 carries only the reverb. Turn fully dry -- MAIN 2 carries the clean filtered signal. Find a balance at ~60% wet for musical reverb

> [!info] Cascadia's FX Send/Return includes a LINE/PEDAL impedance switch. PEDAL mode matches guitar pedal levels (lower voltage, higher impedance). LINE mode matches professional rack effects (higher voltage, lower impedance). Using the wrong setting results in either too-quiet or too-loud signal at the pedal. If the sound is distorted, try switching modes.

4. If the FX RETURN LEVEL LED lights red, lower FX RETURN LEVEL until the LED stays off -- this prevents the return signal from distorting
5. Try the PHASE switch. If your pedal inverts phase (some do), switching to Inverted corrects it. You will hear the dry and wet signals reinforce each other properly instead of partially canceling. If the sound gets thinner when blending dry and wet, try flipping PHASE

<div data-cascadia-panel
  data-sections="fx-send-return,mixer,vcf"
  data-highlights="jack-mixer-vco-a-saw-out:amber,jack-fx-send-return-send:blue,jack-fx-send-return-mix:amber,jack-vcf-in:blue,switch-fx-send-return-level-type:amber,switch-fx-send-return-phase:amber"
  data-cables="jack-mixer-vco-a-saw-out>jack-fx-send-return-send:audio,jack-fx-send-return-mix>jack-vcf-in:audio"
></div>

### Exercise 2: Pre-Filter Effects (5 min)

Now try inserting the effect before the filter so the filter shapes the effect's output.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | VCO A SAW OUT | FX SEND | Send raw oscillator to effects | Nothing |
| 2 | FX MIX | VCF IN | Return processed signal to filter input | MIXER OUT -> VCF IN normalling |

1. Remove previous cables. Patch Cable 1: **VCO A SAW OUT** -> **FX SEND**. Patch Cable 2: **FX MIX** -> **VCF IN** (this overrides the Mixer normalling)
2. Play notes with the filter envelope active (FM 1 at ~40%). If using a reverb, the reverb tail is now shaped by the filter -- as the envelope closes, the reverb gets darker. This is a fundamentally different sound from post-filter reverb
3. Try different VCF FREQ and Q settings with the pre-filter effects. Low FREQ with high Q creates a resonant sweep over the reverb tail. High FREQ passes the effect through relatively unchanged
4. This pre-filter placement turns your effect pedal into a sound source that Cascadia filters and shapes, rather than a spatial effect on an already-shaped sound

### Exercise 3: FX Loop as Signal Router (4 min)

Even without a pedal, the FX loop is useful as a signal routing tool.

1. Remove all cables. With no pedal connected, the FX Send/Return passes signal from SEND through the rear panel jacks. If nothing is connected externally, the RETURN receives silence
2. Patch **VCF LP4 OUT** -> **FX SEND** and **FX MIX** -> **MAIN 2 IN**. Set DRY/WET to fully dry. Now FX MIX outputs the unprocessed LP4 signal through MAIN 2, giving you a second monitor point for the filter output
3. This routing technique is useful for recording: send the dry synth to one channel and the FX loop to another for separate processing in your DAW
4. Remove all cables

## Exploration (optional, hyperfocus days)

- If you have multiple pedals, chain them between the SEND and RETURN jacks (pedal 1 -> pedal 2 -> RETURN). The entire chain becomes part of Cascadia's signal flow
- Try patching FX SEND from the NOISE OUT jack. Running noise through a reverb or delay creates ambient textures and percussion that can be blended back in via MAIN 2
- Use the FX loop with a looper pedal: send a phrase, loop it, then change Cascadia's patch while the loop plays back through RETURN -- instant layered textures

## Output Checklist

- [ ] Understand the FX Send/Return signal flow (SEND -> pedal -> RETURN -> FX MIX)
- [ ] Set up a post-filter effects loop (LP4 OUT -> FX SEND, FX MIX -> MAIN 2 IN)
- [ ] Understand the difference between pre-filter and post-filter effects placement
- [ ] Know how LINE/PEDAL, PHASE, and DRY/WET controls affect the signal
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Cascadia's FX Send/Return can be patched anywhere in the signal chain, making external effects fully integrated rather than output-only
- Post-filter effects preserve the filter's articulation; pre-filter effects get shaped by the filter, creating fundamentally different results
- The LINE/PEDAL switch, PHASE correction, and DRY/WET mix handle the practical challenges of integrating external gear with modular-level signals

## Next Session Preview

Session 19 is the Advanced Patching capstone: **audio-rate modulation mastery**. You will explore the continuum from vibrato to FM, stack multiple audio-rate modulation sources, and use the Ring Mod for classic amplitude modulation tones.
