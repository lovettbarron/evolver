---
title: 'Session 10: Sound -- FM Synthesis and Impulse Trains'
session_number: 10
duration: 25
prerequisite: 9
output_type: patch
difficulty: advanced
tags:
  - sound-mode
  - fm-synthesis
  - impulse
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Sound Mode
---

# Session 10: Sound -- FM Synthesis and Impulse Trains

**Objective:** Use Just Friends' FM input for through-zero frequency modulation, creating metallic, bell-like, and complex harmonic timbres. Explore impulse train techniques at audio rates.

> [!tip] If you only have 5 minutes
> Sound mode, MODE=Cycle, INTONE at noon (unison). Patch an external oscillator to the FM input. Set the FM knob to about 1 o'clock. Slowly increase the external oscillator's pitch -- you will hear the timbre shift from gentle vibrato to metallic clanging. That is through-zero FM.

## What You'll Learn

- Through-zero FM synthesis using the FM input
- How the FM attenuverter knob controls modulation depth
- Impulse train techniques when FM is pushed to extremes
- Combining FM with INTONE for harmonic FM chords

## What You'll Need

- Mannequins Just Friends
- An external oscillator (for FM modulator signal)
- Patch cables (3-5)
- Audio interface or mixer
- Optionally: a second oscillator or function generator for modulating FM depth

## Starting State

| Control | Position |
|---------|----------|
| SOUND/SHAPE | Sound |
| MODE | Cycle |
| TIME | 1 o'clock (audible pitch) |
| INTONE | 12 o'clock (unison) |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock (centered, no modulation) |

## Warm-Up (2 min)

Confirm JF is producing a tone in Sound/Cycle mode. Patch MIX to your mixer. Try turning the FM knob without anything patched to FM -- it acts as a fine-tune control. Return FM to noon.

## Exercises

### Exercise 1: Basic FM -- Vibrato to Clang (8 min)

<div data-just-friends-panel
  data-highlights="jack-jf-fm-in:amber,knob-jf-fm:amber"
  data-knobs="knob-jf-fm:85"
></div>

1. Patch an external oscillator (set to a low frequency, about 2 Hz) to **FM input**
2. Turn **FM knob** to about 1 o'clock -- you hear a gentle vibrato. The external LFO is modulating JF's pitch
3. Slowly increase the external oscillator's frequency toward audio rate (100 Hz, then 200 Hz, then higher)
4. As the modulator enters audio range, the timbre transforms: smooth vibrato becomes rough, metallic FM tones
5. At higher modulator frequencies, you get classic FM synthesis sidebands -- bell-like, inharmonic, or metallic depending on the frequency ratio
6. Adjust the FM knob to control modulation depth: subtle (just past noon) gives mild spectral enrichment; extreme (fully CW) gives aggressive FM

> [!info] Through-Zero FM
> JF implements through-zero FM, meaning the modulator can push the carrier frequency through zero and out the other side. This is crucial for stable FM timbres -- without through-zero capability, FM synthesis produces pitch drift. JF's through-zero implementation keeps the timbre stable as you change modulation depth.

### Exercise 2: Ratio Tuning (8 min)

<div data-just-friends-panel
  data-highlights="jack-jf-fm-in:amber,jack-jf-time-in:blue,knob-jf-fm:amber"
></div>

1. Set the external modulator to the same pitch as JF (match by ear or with a tuner). This is a 1:1 ratio -- you get a bright, buzzy tone
2. Tune the modulator up one octave (2:1 ratio) -- the timbre becomes more organ-like, with even harmonics
3. Tune to a 3:2 ratio (a fifth above) -- this produces a rich, slightly metallic tone
4. Try irrational ratios (detune the modulator slightly off a nice interval) -- these produce inharmonic, bell-like timbres
5. The FM knob controls how dramatic the effect is at any ratio. Start subtle and increase

> [!info] Listen For
> Integer ratios (1:1, 2:1, 3:1) produce harmonic spectra -- tones with a clear pitch. Non-integer ratios produce inharmonic spectra -- metallic, percussive, bell-like sounds. This is the same principle as classic Yamaha DX7 FM synthesis.

### Exercise 3: FM with INTONE Chords (5 min)

<div data-just-friends-panel
  data-highlights="knob-jf-intone:amber,jack-jf-fm-in:blue,knob-jf-fm:blue"
  data-knobs="knob-jf-intone:90,knob-jf-fm:80"
></div>

1. Keep the FM patch active with a moderate FM depth
2. Turn **INTONE** clockwise to spread the channels -- now you have six oscillators at different pitches, all receiving the same FM modulation
3. Each channel produces a different FM timbre because the carrier-to-modulator ratio is different for each
4. IDENTITY (lowest pitch) gets the most dramatic FM effect; 6N (highest pitch) gets a more subtle effect relative to its pitch
5. This creates a rich, evolving chord with each voice having its own FM character

## Output

Save your FM synthesis patch:
- **Bell tone:** Modulator frequency, FM depth, carrier pitch (TIME position)
- **Metallic texture:** Ratio that produced the most interesting inharmonic spectrum
- **FM chord:** INTONE position + FM settings that created the richest chord
- Note which ratios produced harmonic vs inharmonic results

## Next Session Preview

Session 11 explores **Plume** mode and **dynamic voice allocation** -- the most advanced Sound mode behavior. With RUN active in Sound mode, JF becomes a polyphonic/paraphonic synthesizer where individual triggers assign voices from a pool.
