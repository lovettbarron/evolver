---
title: 'Session 03: Audio-Rate Maths -- Listen to This!'
session_number: 3
duration: 20
prerequisite: 2
output_type: recording
difficulty: beginner
tags:
  - foundations
  - audio-rate
  - oscillator
  - cycle
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. 6-7, Maths Illustrated Supplement'
section: Foundations
---

# Session 03: Audio-Rate Maths -- Listen to This!

**Objective:** Discover that Maths can be an oscillator by enabling Cycle mode with fast Rise and Fall times, and make a short recording of the sound.

> [!tip] If you only have 5 minutes
> Turn Ch1 Rise and Fall fully counterclockwise. Press Cycle to turn on the LED. Patch Ch1 Unity OUT to your mixer or audio input. You should hear a tone. Turn Rise and Fall slightly clockwise to change the pitch. Record 10 seconds.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Send a gate to Ch1 Trigger IN -- confirm the envelope fires and the Unity LED rises and falls. Disconnect the gate source -- you will not need it for this session.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Remove the gate cable from Ch1 Trigger IN -- we will use Cycle mode instead of external triggers
3. Patch **Ch1 Unity OUT** directly to your mixer, audio interface, or headphones path
4. Start with your monitoring volume low -- audio-rate Maths can be loud

## Exercises

### Exercise 1: Maths Becomes an Oscillator (8 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:5,knob-ch1-fall:5"
  data-highlights="button-ch1-cycle:amber,led-ch1-cycle:blue,jack-ch1-unity-out:amber"
></div>

1. Turn **Rise** fully counterclockwise (minimum time)
2. Turn **Fall** fully counterclockwise (minimum time)
3. Press the **Cycle** button -- the Cycle LED should light up
4. You should hear a tone coming from Unity OUT. Maths is now oscillating at audio rate -- the function generator is cycling so fast that the rise-and-fall becomes a waveform you can hear

> [!info] When Cycle is on, Maths continuously cycles through its rise and fall stages without needing an external trigger. At slow speeds this is an LFO (Session 04). At fast speeds -- fully counterclockwise -- it enters audio range and becomes an oscillator. This is the same circuit doing both jobs.

5. Slowly turn **Rise** clockwise while listening -- the pitch drops as the rise time gets longer
6. Return Rise to fully counterclockwise. Slowly turn **Fall** clockwise -- the pitch drops again
7. Return both to fully counterclockwise -- you are back at the highest pitch

### Exercise 2: Shape the Waveform (5 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:5,knob-ch1-fall:5,knob-ch1-vari-response:64"
  data-highlights="knob-ch1-vari-response:amber,knob-ch1-rise:blue,knob-ch1-fall:blue"
></div>

1. With Cycle on and both Rise/Fall fully counterclockwise, turn the **Vari-Response** knob slowly from noon to fully clockwise (exponential) -- listen to how the timbre changes
2. Turn Vari-Response fully counterclockwise (logarithmic) -- the timbre changes again
3. Return to noon (linear) -- this produces a triangle-like waveform
4. Now set Rise and Fall to slightly different positions (try Rise at 8 o'clock, Fall at 7 o'clock) -- the asymmetry creates a waveform closer to a sawtooth character

> [!info] The Vari-Response knob continuously morphs the waveshape from logarithmic through linear to exponential curves. At audio rate, these different shapes produce audibly different timbres -- just like choosing between triangle, sawtooth, and other waveforms on a conventional oscillator.

### Exercise 3: Record It (3 min)

1. Set Rise and Fall to positions that produce a pitch you find interesting
2. Experiment with the Vari-Response knob to find a timbre you like
3. Record 15-30 seconds of Maths as an oscillator into your DAW or phone
4. Press **Cycle** to turn it off -- the sound stops. This confirms Maths is the sound source

## Session Output

Document and save in your Obsidian daily note:

- **Recording:** Short audio clip of Maths as oscillator (save to your recordings folder)
- **Rise/Fall positions for your favorite pitch:** (clock positions)
- **Vari-Response observation:** How did log vs linear vs exponential change the sound?
- **Reaction:** What surprised you about Maths making sound directly?

## What's Next

In the next session, you will use Cycle mode at much slower speeds to create an LFO -- a low-frequency oscillator that modulates other modules over time. Same Cycle button, same Rise and Fall knobs, completely different musical purpose.
