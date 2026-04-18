---
title: 'Session 05: Swell Generator Deep Dive'
session_number: 5
duration: 25
prerequisite: 4
output_type: patch
difficulty: intermediate
tags:
  - swell-generator
  - envelope-follower
  - dynamics
  - cv
  - modulation
instrument: swells
instrument_type: eurorack_module
reference: 'Swells Manual'
section: Advanced
---

# Session 05: Swell Generator Deep Dive

**Objective:** Master the Swell Generator's RISE, FALL, THRESHOLD controls and envelope follower, then build a dynamics-responsive reverb patch using the SWELL CV output.

> [!tip] If you only have 5 minutes
> Patch audio to IN L. Patch SWELL CV output to another module's CV input (filter cutoff, VCA, etc). Press the SWELL button. Play dynamically -- loud passages trigger the envelope, creating automatic modulation from your playing dynamics.

## Warm-Up (2 min)

Init state. Select Fog. Play audio to confirm routing. Today you move beyond the reverb engine into the Swell Generator -- a dynamics-processing engine that generates CV from your input signal.

## Setup

1. Init state (see [Swells Overview](/modules/swells/))
2. Audio source to **IN L**, **L** output to mixer
3. Select **Fog** algorithm (or any algorithm you like)
4. DECAY at **2 o'clock**, MIX at **1 o'clock**
5. You will need a patch cable for SWELL CV output

## Exercises

### Exercise 1: Understanding the Envelope Follower (7 min)

<div data-swells-panel
  data-highlights="knob-swells-ef-gain:amber,knob-swells-ef-high-cut:amber,switch-swells-ef-source:blue"
></div>

1. The envelope follower tracks the dynamics (volume) of your input signal and converts it to a control voltage
2. Make sure **EF SOURCE** switch is set to **IN** (follows the input signal)
3. Turn up **EF GAIN** -- this amplifies the envelope follower's sensitivity. Higher gain means quieter sounds trigger the envelope
4. Adjust **EF HIGH CUT** -- this filters the envelope follower signal. Lower settings make it respond more to bass frequencies, higher settings track transients better
5. Switch **EF SOURCE** to **SC** (sidechain) -- now the envelope follower tracks the SIDECHAIN input instead. Useful for triggering from a different source
6. Switch **EF SOURCE** to **OUT** -- now it follows the reverb output, creating feedback-style dynamics

### Exercise 2: RISE, FALL and THRESHOLD (7 min)

<div data-swells-panel
  data-highlights="knob-swells-rise:amber,knob-swells-fall:amber,knob-swells-threshold:amber,button-swells-swell:blue"
></div>

1. Press the **SWELL** button to engage the Swell Generator
2. **THRESHOLD** sets the level at which the envelope triggers. Start at noon -- play dynamically and notice when the envelope activates
3. Turn THRESHOLD counterclockwise -- the envelope triggers on quieter signals
4. Turn THRESHOLD clockwise -- only loud passages trigger the envelope
5. **RISE** controls how fast the envelope attacks when triggered. Fast RISE = immediate response. Slow RISE = gradual swell-up
6. **FALL** controls how fast the envelope releases. Fast FALL = snappy. Slow FALL = long, sustained tail
7. Try fast RISE + slow FALL for a pad-like swell. Try slow RISE + fast FALL for a reversed-sounding effect

### Exercise 3: SWELL CV as Modulation Source (7 min)

<div data-swells-panel
  data-highlights="jack-swells-swell-cv:blue,knob-swells-rise:amber,knob-swells-fall:amber,knob-swells-threshold:amber"
></div>

1. Patch **SWELL CV** output to another module's CV input -- a filter cutoff, VCA, or oscillator parameter
2. With SWELL engaged, play your source dynamically. Your playing dynamics now control the destination module
3. Adjust **THRESHOLD** to set the trigger sensitivity for your playing style
4. Set **RISE** to medium and **FALL** to slow -- this creates a smooth, swelling modulation that follows your dynamics
5. Try fast RISE + fast FALL for a more percussive, envelope-follower response
6. Experiment with different destination parameters -- SWELL CV is versatile

### Exercise 4: Dynamics-Responsive Reverb Patch (4 min)

<div data-swells-panel
  data-highlights="button-swells-swell:blue,knob-swells-rise:amber,knob-swells-fall:amber,jack-swells-swell-cv:blue,slider-swells-decay:amber"
></div>

1. Select an algorithm that responds well to dynamics (Velvet or Gaze work well)
2. Set DECAY to **2 o'clock**, MIX to **2 o'clock**
3. Engage SWELL. Set RISE to **10 o'clock** (fast), FALL to **2 o'clock** (slow), THRESHOLD to taste
4. Patch **SWELL CV** to a reverb parameter CV input (try DECAY CV or SIZE CV) -- now your playing dynamics modulate the reverb itself
5. Play dynamically -- loud passages push the reverb deeper. Document this patch

## What You Learned

- The envelope follower converts input dynamics to control voltage
- EF SOURCE selects what the follower tracks (input, sidechain, or output)
- RISE and FALL shape the envelope response
- THRESHOLD sets the trigger sensitivity
- SWELL CV output can modulate other modules for dynamics-responsive patching

## Document Your Results

Record your dynamics-responsive reverb patch: algorithm, all fader positions, Swell Generator settings (RISE, FALL, THRESHOLD, EF GAIN, EF HIGH CUT, EF SOURCE), and what you patched SWELL CV to. Note how different playing dynamics affected the result.
