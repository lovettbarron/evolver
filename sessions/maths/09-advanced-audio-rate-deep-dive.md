---
title: 'Session 09: Audio-Rate Deep Dive'
session_number: 9
duration: 25
prerequisite: 8
output_type: recording
difficulty: intermediate
tags:
  - advanced
  - audio-rate
  - oscillator
  - fm-synthesis
  - cross-modulation
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. 6-7, Maths Illustrated Supplement'
section: Advanced
---

# Session 09: Audio-Rate Deep Dive

**Objective:** Use both Channel 1 and Channel 4 as simultaneous audio-rate oscillators and explore FM synthesis between them.

> [!tip] If you only have 5 minutes
> Enable Cycle on both Ch1 and Ch4. Turn all Rise and Fall knobs fully counterclockwise. Patch SUM OUT to your mixer -- you hear two oscillators combined. Now patch Ch1 Variable OUT into Ch4 Both CV IN -- you hear FM synthesis. Record 15 seconds.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Enable Ch1 Cycle, turn Rise and Fall fully counterclockwise -- confirm you hear a tone from Ch1 Unity OUT (review from session 03). Turn Cycle off and return to init.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Patch **SUM OUT** to your mixer, audio interface, or headphones path -- you will listen to the combined output of both oscillators
3. Start with monitoring volume low -- two audio-rate oscillators through SUM can be loud
4. Have your recording setup ready (DAW or phone) for Exercise 3

## Exercises

### Exercise 1: Two-Oscillator Maths (8 min)

<div data-maths-panel
  data-sections="ch1,ch4,buses"
  data-knobs="knob-ch1-rise:5,knob-ch1-fall:5,knob-ch4-rise:5,knob-ch4-fall:5"
  data-highlights="button-ch1-cycle:amber,button-ch4-cycle:amber,jack-sum-out:blue"
></div>

1. Enable **Ch1 Cycle** and turn Ch1 Rise and Fall fully counterclockwise -- Ch1 is now oscillating at audio rate
2. Enable **Ch4 Cycle** and turn Ch4 Rise and Fall fully counterclockwise -- Ch4 is also oscillating
3. Listen to **SUM OUT** -- you should hear both oscillators combined. They are at similar but not identical pitches, creating a beating or chorusing effect
4. Slowly turn Ch4's **Rise** knob slightly clockwise -- the pitch drops. Tune Ch4 to create an interval you like (octave, fifth, or something dissonant)
5. Try Ch4's **Fall** knob independently -- notice that Rise and Fall together determine the pitch, but their ratio determines the waveform shape

> [!info] When both channels oscillate at audio rate, SUM acts as a two-oscillator mixer. Unlike a traditional dual-VCO setup, you cannot tune Maths to precise musical intervals -- the Rise and Fall knobs are continuous and unmarked. Tune by ear and embrace the imprecision.

### Exercise 2: FM Synthesis (10 min)

<div data-maths-panel
  data-sections="ch1,ch4"
  data-knobs="knob-ch1-rise:5,knob-ch1-fall:5,knob-ch4-rise:5,knob-ch4-fall:5,knob-ch1-attenuverter:80"
  data-highlights="jack-ch1-var-out:amber,jack-ch4-both-cv-in:amber"
  data-cables="jack-ch1-var-out>jack-ch4-both-cv-in"
></div>

1. Keep both channels oscillating from Exercise 1
2. Patch **Ch1 Variable OUT** into **Ch4 Both CV IN** -- this is FM synthesis. Ch1's audio-rate output is now modulating Ch4's speed (both Rise and Fall times simultaneously)
3. Listen -- the sound should be dramatically different. You are hearing Ch4's frequency being swept by Ch1 at audio rate, creating complex harmonic and inharmonic sidebands
4. Turn **Ch1 Attenuverter** toward noon -- the FM depth decreases. At noon, there is no modulation. This gives you continuous control over the FM intensity
5. Sweep the Attenuverter slowly from noon to fully CW -- hear the FM spectrum develop from subtle to extreme
6. Change Ch1's pitch (Rise/Fall positions) while FM is active -- different modulator frequencies produce different harmonic structures

> [!info] This is the same principle as FM synthesis on a DX7 or FM8, but with analog imprecision and continuous waveshaping. Ch1 is the modulator, Ch4 is the carrier. The Attenuverter controls modulation index (FM depth). Both CV IN modulates both Rise and Fall simultaneously, which is what you want for FM -- it changes Ch4's overall frequency without changing its waveform asymmetry.

### Exercise 3: Vari-Response as Waveshaper + Record (5 min)

<div data-maths-panel
  data-sections="ch1,ch4"
  data-knobs="knob-ch1-vari-response:127,knob-ch4-vari-response:0"
  data-highlights="knob-ch1-vari-response:amber,knob-ch4-vari-response:amber"
  data-cables="jack-ch1-var-out>jack-ch4-both-cv-in"
></div>

1. Keep the FM patch from Exercise 2
2. Turn **Ch1 Vari-Response** fully clockwise (exponential) -- listen to how the FM timbre changes. The modulator waveform is now exponential, producing different sideband patterns
3. Turn **Ch1 Vari-Response** fully counterclockwise (logarithmic) -- the timbre changes again
4. Now sweep **Ch4 Vari-Response** (the carrier) through its range -- this changes the carrier waveshape under FM, producing yet more timbral variation
5. Find a combination of both Vari-Response knobs that sounds interesting
6. **Record 30-60 seconds** -- slowly sweep one or both Vari-Response knobs during the recording to capture the timbral evolution

> [!info] At audio rate, Vari-Response acts as a waveshaper -- it morphs the oscillator waveform continuously from logarithmic through linear (triangle) to exponential curves. Combined with FM, you have four continuous timbral controls: Ch1 pitch, Ch4 pitch, Ch1 Vari-Response (modulator waveshape), and Ch4 Vari-Response (carrier waveshape).

## Session Output

Document and save in your Obsidian daily note:

- **Recording:** 30-60 seconds of FM synthesis using only Maths (save to your recordings folder)
- **FM patch:** Ch1 Variable OUT -> Ch4 Both CV IN, with Attenuverter controlling FM depth
- **Best Vari-Response positions:** What combination of Ch1 and Ch4 curve shapes sounded best?
- **Tuning observation:** How did changing Ch1's pitch (modulator) affect the FM harmonic structure?

## What's Next

In the next session, you will explore complex envelope techniques -- using Signal IN for ASR (attack-sustain-release) behavior and pushing Vari-Response to its extremes for expressive curve shaping. This returns to the envelope domain but with much more sophisticated control.
