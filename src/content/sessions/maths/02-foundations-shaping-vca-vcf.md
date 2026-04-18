---
title: 'Session 02: Shaping Sounds with Maths'
session_number: 2
duration: 25
prerequisite: 1
output_type: patch
difficulty: beginner
tags:
  - foundations
  - envelope
  - vca
  - vcf
  - filter-sweep
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. 4-8'
section: Foundations
---

# Session 02: Shaping Sounds with Maths

**Objective:** Use Maths Channel 1 envelope to control a VCA for volume shaping and a VCF for filter sweeps, hearing how the same envelope produces different musical results at different destinations.

> [!tip] If you only have 5 minutes
> Patch Ch1 Variable OUT to your VCF cutoff CV input. Set Rise to 10 o'clock, Fall to 2 o'clock, Attenuverter to 2 o'clock. Send gates and listen to the filter sweep. Turn the Attenuverter to hear how depth changes the character.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Send a gate to Ch1 Trigger IN and watch the Unity LED -- confirm you see the smooth rise-and-fall envelope from Session 01. If the LED does not respond, check your gate source and cable.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Patch a gate source to **Ch1 Trigger IN**
3. Have an oscillator running into a VCA and VCF (filter) -- you need destinations to hear the envelope's effect
4. Start with **no cables** from Maths to the VCA or VCF yet

## Exercises

### Exercise 1: Envelope to VCA -- Volume Shaping (8 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:48,knob-ch1-fall:80,knob-ch1-attenuverter:127"
  data-highlights="jack-ch1-unity-out:amber,jack-ch1-var-out:blue"
></div>

1. Patch **Ch1 Unity OUT** to your VCA's CV input (level modulation input)
2. Send a gate -- you should hear the sound swell up and fade away, shaped by the Maths envelope
3. Adjust **Rise** counterclockwise for a snappier attack -- send gates and listen. This is a percussive envelope
4. Adjust **Rise** clockwise for a slow swell -- send gates. This is a pad-style envelope
5. Return Rise to 10 o'clock. Now adjust **Fall** -- short fall for staccato, long fall for sustained tails
6. Find a Rise/Fall combination you like and note the approximate knob positions

### Exercise 2: Envelope to VCF -- Filter Sweep (10 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:48,knob-ch1-fall:80,knob-ch1-attenuverter:96"
  data-highlights="jack-ch1-var-out:amber,knob-ch1-attenuverter:amber"
></div>

1. Disconnect from the VCA. Patch **Ch1 Variable OUT** to your VCF's cutoff CV input
2. Set the VCF's base cutoff fairly low (so you can hear the envelope open the filter)
3. Set the Maths **Attenuverter** to about 2 o'clock
4. Send a gate -- you should hear the filter sweep open and close with the envelope
5. Turn the **Attenuverter** toward noon -- the sweep gets shallower (less modulation depth)
6. Turn the **Attenuverter** past noon toward fully clockwise -- the sweep gets deeper
7. Now try turning the Attenuverter counterclockwise past noon -- the envelope is inverted. The filter starts open and closes on each gate, then returns

> [!info] This is why Variable OUT exists. Unity OUT always sends the full 0-8V envelope. Variable OUT lets you control how much envelope reaches the filter and whether it sweeps up (positive) or down (negative). For filter sweeps, Variable OUT with the Attenuverter is almost always what you want.

8. Set the Attenuverter to a position where the sweep sounds musical to you

### Exercise 3: Compare Both Destinations (5 min)

1. Use a mult or stackable cable to send Ch1's envelope to both the VCA and VCF simultaneously
2. Send gates -- now the envelope shapes both volume and brightness together. This is how most synthesizer voices work
3. Try different Rise/Fall combinations:
   - **Fast Rise, Fast Fall** (both at 9 o'clock): percussive pluck
   - **Fast Rise, Slow Fall** (Rise 9, Fall 3): sharp attack with long decay
   - **Slow Rise, Slow Fall** (both at 2 o'clock): soft pad
4. Notice how the same envelope values create different feels depending on whether they control volume, brightness, or both

## Session Output

Document your favorite filter sweep patch in your Obsidian daily note:

- **Rise position:** (clock position)
- **Fall position:** (clock position)
- **Attenuverter position:** (clock position and direction -- positive or inverted?)
- **VCF base cutoff:** (approximate position)
- **Character description:** (what does it sound like? plucky? swoopy? breathy?)

## What's Next

In the next session, you will discover that Maths can do something unexpected -- by turning Rise and Fall fully counterclockwise and enabling Cycle mode, Maths becomes an oscillator. You will hear it make sound directly. It is a short, exciting session.
