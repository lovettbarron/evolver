---
title: "Session 11: Filter FM and Filter as Sound Source"
module: "Filters & LPG"
session_number: 11
duration: 25
prerequisite: 10
output_type: technique
difficulty: intermediate
tags: [filter, fm, frequency-modulation, self-oscillation, keyboard-tracking, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 24-27"
---

# Session 11: Filter FM and Filter as Sound Source

**Objective:** Use envelopes, LFOs, and audio-rate signals to modulate the VCF cutoff frequency, and explore playing the self-oscillating filter as a keyboard-tracked sine oscillator.

> [!tip] If you only have 5 minutes
> Play a note and sweep VCF FM 1 from 0% to ~75% -- you will hear Envelope B dynamically opening and closing the filter on every note. That is filter FM with an envelope, and it is the single most common technique in subtractive synthesis.

## What Is Filter Frequency Modulation?

**Filter FM** means using a control voltage to move the filter's cutoff frequency over time. Without modulation, the filter sits at a fixed point -- static brightness. With modulation, the filter sweeps, creating movement and life in the sound.

The most common filter FM source is an **envelope**: the filter opens bright on attack and closes as the note decays, mimicking how acoustic instruments work (a plucked string is brightest at the moment of pluck). An **LFO** creates rhythmic, repeating filter sweeps -- the classic "wah-wah" effect. An **audio-rate oscillator** modulating the filter creates metallic, sideband-rich timbres similar to FM synthesis but applied to the filter instead of an oscillator.

The speed and shape of the modulation source determines the character: slow envelopes for expressive sweeps, medium LFOs for rhythmic movement, fast audio-rate signals for timbral complexity.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Rotate the VCF MODE selector through 3-4 positions, recalling the different filter characters from Session 10. Return MODE to LP4.

## Setup

From the normalled default:
- Mixer SAW at ~75%, all other Mixer sliders at 0%
- VCO A OCTAVE at 4
- VCF FREQ at ~25% (low cutoff -- dark starting point so envelope sweeps are audible)
- VCF Q at ~20% (slight resonance to emphasize the cutoff movement)
- VCF MODE at LP4
- VCF FM 1 at 0%, FM 2 at 0%, FM 3 at 0%
- Envelope B in ENV mode: Attack ~0%, Decay ~40%, Sustain ~20%, Release ~25%

## Exercises

<div data-cascadia-panel
  data-sections="vcf,envelope-b"
  data-knobs="slider-vcf-freq:32,slider-vcf-q:25"
  data-highlights="slider-vcf-fm-1:blue,slider-vcf-fm-2:amber,slider-vcf-fm-3:amber"
></div>

### Exercise 1: Envelope-to-Filter Sweep (7 min)

> [!info] Normalled: Envelope B ENV OUT -> VCF FM 1 IN. By default, Envelope B is already connected to the filter's first FM input. The FM 1 slider controls how much envelope reaches the filter.

1. Play a note -- you should hear a dark, muffled sawtooth because FREQ is low and FM 1 is at 0% (no envelope reaching the filter)
2. Slowly raise VCF FM 1 from 0% to ~30%. Play notes -- you should hear the filter open slightly on each note attack, then close during the decay. The sound has a subtle "bwow" quality
3. Raise FM 1 to ~60%. Play notes -- the envelope sweep is now dramatic. Each note starts bright and closes to dark, like a plucked string. This is the bread-and-butter of subtractive synthesis
4. Raise FM 1 to ~100%. Play notes -- the sweep is extreme, reaching into very bright territory on attack. Try different Envelope B shapes: set Decay to ~15% for a short "pluck", then Decay to ~75% for a slow, gradual close
5. Try changing VCF Q to ~40% while FM 1 is at ~60%. The resonant peak rides the envelope sweep, creating a more vocal, "wah" quality. Return Q to ~20%

### Exercise 2: LFO-to-Filter Wobble (7 min)

This exercise requires one cable.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | LFO X OUT | VCF FM 3 IN | Rhythmic filter modulation | Nothing (FM 3 has no normal) |

<div data-cascadia-panel
  data-sections="vcf,lfo-xyz"
  data-highlights="jack-lfo-xyz-x-out:amber,jack-vcf-fm-3-in:blue,slider-vcf-fm-3:blue,knob-lfo-xyz-rate:blue"
  data-cables="jack-lfo-xyz-x-out>jack-vcf-fm-3-in:mod"
></div>

1. Keep FM 1 at ~30% (subtle envelope). Patch Cable 1: **LFO X OUT** -> **VCF FM 3 IN**
2. Set VCF FM 3 to ~25%. Set LFO RATE to ~30% (slow). You should hear the filter cutoff gently sweeping up and down in a repeating cycle -- the classic filter wobble
3. Raise FM 3 to ~50% -- the wobble becomes deeper and more dramatic. Raise LFO RATE to ~50% -- the wobble speeds up into a rhythmic pulsing
4. Set LFO Y RATE DIVIDER to div3 and LFO Z RATE DIVIDER to div5. While LFO X modulates the filter, the other two LFOs are now running at related but different rates -- this creates polyrhythmic modulation if you route them to additional destinations later

> [!info] Cascadia's 3 linked LFOs (X/Y/Z) share a single RATE knob but each can be divided independently. LFO Y divides by 3 or 4; LFO Z divides by 5 or 8. This creates musically related polyrhythmic modulation from one control.

5. Push LFO RATE to ~80% -- the LFO approaches audio rate and the wobble becomes a buzzy, grainy texture rather than a clean sweep. This is the threshold between modulation and audio-rate FM. Pull RATE back to ~40%
6. Remove Cable 1

### Exercise 3: Playing the Self-Oscillating Filter (7 min)

1. Remove all cables. Set VCF FREQ at ~50%, raise VCF Q to ~100%. You should hear the filter self-oscillating -- a pure sine tone
2. Play MIDI notes -- the sine tone does not change pitch because the filter is not tracking your keyboard yet

> [!info] Normalled: MIDI PITCH -> VCF FM 2 IN. The keyboard pitch signal is already connected to FM 2. The FM 2 slider controls how much pitch tracking reaches the filter.

3. Slowly raise VCF FM 2 from 0% toward ~50%. Play notes across the keyboard -- the self-oscillating filter now tracks your pitch. At ~50%, it should roughly follow your keyboard. You are playing the filter as a sine oscillator
4. Fine-tune FM 2 until playing an octave on the keyboard produces an audible octave from the filter. The exact value depends on your tuning -- typically ~45-55%
5. Set FREQ to tune the filter's base pitch. Lower FREQ = lower starting note. Combined with FM 2 keyboard tracking, you now have a playable sine oscillator with no VCO involved
6. Try reducing Q slightly to ~85% -- the self-oscillation becomes quieter and less pure, blending with the input signal. At moderate Q with keyboard tracking, the resonant filter adds a singing overtone on top of your sawtooth. Return Q to ~25% and FM 2 to 0%

## Exploration (optional, hyperfocus days)

- Patch VCO B SINE OUT -> VCF FM 3 IN (1 cable). Set VCO B to audio rate and raise FM 3 gradually -- this is audio-rate filter FM, creating metallic sidebands similar to oscillator FM but applied to the filter's cutoff
- Combine all three FM sources simultaneously: envelope on FM 1 (~40%), keyboard tracking on FM 2 (~50%), LFO on FM 3 (~20%) -- this is how complex, expressive filter behavior is built
- Try self-oscillation in BP4 mode instead of LP4 -- the bandpass self-oscillation has a different, more focused character

## Output Checklist

- [ ] Heard envelope-to-filter sweep using the normalled Envelope B -> FM 1 path
- [ ] Patched LFO X -> VCF FM 3 for rhythmic filter wobble
- [ ] Played the self-oscillating filter as a keyboard-tracked sine oscillator via FM 2
- [ ] Understand the difference between the 3 VCF FM inputs (envelope, 1V/oct, linear)
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Filter FM is the primary way to add movement and expression to subtractive synthesis -- envelopes for per-note sweeps, LFOs for rhythmic wobble, audio-rate signals for metallic complexity
- Cascadia's VCF has 3 dedicated FM inputs with different scaling: FM 1 for envelopes, FM 2 for 1V/oct keyboard tracking, FM 3 for general-purpose linear modulation
- A self-oscillating filter with keyboard tracking becomes a playable sine oscillator, adding a third tone source beyond VCO A and VCO B

## Next Session Preview

Session 12 returns to the **Low Pass Gate** from Session 9, going deeper into percussion techniques. You will explore different source waveforms through the LPG, vary envelope shapes for different timbres, and build a palette of percussion tones.
