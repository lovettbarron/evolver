---
title: 'Session 13: LFO Deep Dive'
session_number: 13
duration: 25
prerequisite: 12
output_type: technique
difficulty: intermediate
tags:
  - lfo
  - modulation
  - polyrhythm
  - rate-divider
  - vibrato
  - pwm
  - curriculum
instrument: cascadia
reference: Cascadia Manual pp. 35-36
section: Modulation & Utilities
instrument_type: instrument
---

# Session 13: LFO Deep Dive

**Objective:** Explore Cascadia's linked triple-LFO system, understand rate dividers for polyrhythmic modulation, and route LFOs to pitch, filter, and pulse width destinations.

> [!tip] If you only have 5 minutes
> Play a note, then slowly turn the LFO RATE knob from ~10% to ~70%. Listen to VCO A's pulse width undulate (LFO Y is normalled to PWM). At ~70%, the modulation is fast enough to become a timbral effect rather than a rhythmic pulse. That transition from movement to texture is the heart of LFO modulation.

## What Is a Low Frequency Oscillator?

An **LFO** (Low Frequency Oscillator) generates a repeating voltage waveform below the range of hearing -- typically 0.05 Hz to 20 Hz. Where audio-rate oscillators produce tones you hear directly, LFOs produce voltages that **move other things**: a filter cutoff, an oscillator's pitch, a pulse width. The LFO itself is inaudible; you hear its effect on the destination.

The simplest LFO application is **vibrato** -- a slow pitch wobble. Route an LFO to an oscillator's pitch input and you get a singing, human quality. Route the same LFO to a filter and you get rhythmic brightness changes. Route it to pulse width and you get timbral undulation. The same modulation source creates entirely different musical effects depending on where you send it.

**Rate** determines the speed of the modulation (slow = gentle sweeps, fast = rapid pulsing). **Depth** (controlled by the destination's modulation amount) determines how extreme the movement is.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Raise VCF FM 1 to ~60% and play notes -- recall the envelope-to-filter sweep from Session 11. Return FM 1 to noon.

## Setup

From the normalled default:
- Mixer SAW at ~50%, PULSE at ~50%, all other Mixer sliders at 0%
- VCO A OCTAVE at 4
- VCO A PW at ~50% (square wave -- PWM will be visible)
- VCO A PW MOD at ~50%
- VCF FREQ at ~60%, Q at ~15%
- LFO RATE at ~30% (slow)
- LFO Y RATE DIVIDER at center (x1)
- LFO Z RATE DIVIDER at center (x1)

## Exercises

<div data-cascadia-panel
  data-sections="lfo-xyz,vco-a"
  data-knobs="knob-lfo-xyz-rate:38,slider-vco-a-pw-mod:64"
  data-highlights="knob-lfo-xyz-rate:blue,switch-lfo-xyz-y-divider:amber,switch-lfo-xyz-z-divider:amber,slider-vco-a-pw-mod:blue,jack-lfo-xyz-x-out:amber,jack-lfo-xyz-y-out:amber,jack-lfo-xyz-z-out:amber"
></div>

### Exercise 1: LFO Y and Pulse Width Modulation (7 min)

> [!info] Normalled: LFO Y OUT -> VCO A PWM IN. LFO Y is already connected to VCO A's pulse width modulation input. The PW MOD slider controls how much LFO Y affects the pulse width.

1. Play and hold a note. With PW MOD at ~50% and RATE at ~30%, you should hear the pulse wave's timbre slowly undulating -- thinner and fuller in a repeating cycle. This is pulse width modulation (PWM) driven by LFO Y
2. Raise PW MOD to ~75% -- the PWM depth increases. The timbre swings more dramatically between thin and full. At extreme width, you may hear the wave almost disappear momentarily as the pulse width reaches near 0% or 100%
3. Lower RATE to ~10% -- the modulation becomes a slow, gentle drift. This is useful for pads and sustained sounds where you want subtle movement
4. Raise RATE to ~60% -- the modulation becomes a rapid flutter. The pulse wave sounds almost like a chorus effect at this speed
5. Watch the LFO Y output LED on the front panel -- it blinks in sync with the modulation rate. At slow rates you can see individual green/red cycles. At fast rates it shimmers

### Exercise 2: LFO X to Filter Cutoff (7 min)

This exercise requires one cable.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | LFO X OUT | VCF FM 3 IN | Rhythmic filter modulation | Nothing (FM 3 has no normal) |

<div data-cascadia-panel
  data-sections="lfo-xyz,vcf"
  data-highlights="jack-lfo-xyz-x-out:amber,jack-vcf-fm-3-in:blue,slider-vcf-fm-3:blue,knob-lfo-xyz-rate:blue,switch-lfo-xyz-y-divider:blue"
  data-cables="jack-lfo-xyz-x-out>jack-vcf-fm-3-in:mod"
></div>

1. Patch Cable 1: **LFO X OUT** -> **VCF FM 3 IN**. Set VCF FM 3 to ~30%
2. Play and hold a note. You should hear the filter cutoff sweeping up and down rhythmically -- the "wah-wah" effect. LFO X sweeps the filter while LFO Y simultaneously modulates pulse width. Two layers of movement from one RATE knob
3. Raise FM 3 to ~60% -- the filter sweep becomes dramatic, from dark to bright and back. Combined with the PWM, the sound has a rich, evolving character
4. Change RATE to ~20% -- both the filter sweep and PWM slow down together since they share the same base rate. This coordinated movement sounds musical and coherent
5. Now set LFO Y RATE DIVIDER to **div3**. LFO Y now runs at 1/3 the rate of LFO X. Play and hold a note -- the filter sweep (LFO X) cycles 3 times for every 1 PWM cycle (LFO Y). You should hear a polyrhythmic modulation pattern

> [!info] Cascadia's 3 linked LFOs share one RATE knob. LFO Y can be divided by 3 or 4, LFO Z by 5 or 8. This creates polyrhythmic modulation relationships where different parameters cycle at musically related but different rates -- impossible with a single LFO.

6. Try div4 on LFO Y -- now 4:1 ratio. The rhythmic relationship changes. Return LFO Y RATE DIVIDER to center (x1)

### Exercise 3: Audio-Rate LFO Effects (5 min)

1. Keep Cable 1 patched. Set FM 3 to ~25%, RATE to ~50%
2. Slowly push RATE from ~50% toward ~90%. Listen as the filter modulation transitions from a clear rhythmic sweep into a buzzy, grainy texture. Around ~75-80%, the individual sweep cycles merge into a continuous timbre change
3. At RATE ~90% (approaching ~75Hz), you are in audio-rate territory. The LFO is now fast enough that it adds sidebands to the filter response rather than creating audible sweeps. The sound becomes gritty and FM-like

> [!info] Cascadia's LFOs reach approximately 75Hz at maximum rate -- well into audio territory. Not all semi-modular LFOs can reach audio rates. This means Cascadia's LFOs can serve double duty as modulation sources at low rates and as rudimentary FM sources at high rates.

4. Pull RATE back to ~35% for musical modulation. Remove Cable 1

## Exploration (optional, hyperfocus days)

- Set LFO Y RATE DIVIDER to div3 and LFO Z RATE DIVIDER to div8. Patch LFO Z OUT -> VCO A FM 1 IN for subtle pitch modulation. Now three parameters (pitch, filter, PWM) modulate at rates in a 1:3:8 relationship -- complex evolving textures from one RATE knob
- Try LFO X -> VCF Q MOD IN (requires cable to Q MOD IN) for rhythmically pulsing resonance
- Adjust the RATE TRIMMERS with a small screwdriver to offset LFO Y and Z rates from their factory alignment (not recommended unless you want to experiment -- factory settings are carefully chosen)

## Output Checklist

- [ ] Heard LFO Y pulse width modulation via the normalled PWM path
- [ ] Patched LFO X to VCF FM 3 for rhythmic filter sweeps
- [ ] Used rate dividers to create polyrhythmic modulation (e.g., 3:1 filter-to-PWM ratio)
- [ ] Heard the transition from rhythmic modulation to audio-rate texture effects
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- LFOs create movement by modulating parameters below (or at) hearing range -- the destination determines the musical effect (vibrato, filter sweep, PWM, etc.)
- Cascadia's three linked LFOs with rate dividers enable polyrhythmic modulation from a single RATE knob -- musically related but independent modulation cycles
- LFOs that reach audio rates (~75Hz) blur the line between modulation and timbral effects, adding sidebands and grit when pushed fast enough

## Next Session Preview

Session 14 explores the **Sample & Hold** and **Slew Limiter** -- utilities that transform random noise into stepped or smoothed random voltages for generative, ever-changing modulation that never repeats.
