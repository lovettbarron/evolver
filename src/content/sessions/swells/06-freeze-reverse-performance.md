---
title: 'Session 06: Freeze, Reverse & Performance'
session_number: 6
duration: 25
prerequisite: 5
output_type: patch
difficulty: advanced
tags:
  - freeze
  - reverse
  - burst
  - lo-fi
  - performance
  - creative
instrument: swells
instrument_type: eurorack_module
reference: 'Swells Manual'
section: Creative
---

# Session 06: Freeze, Reverse & Performance

**Objective:** Master the performance features (Freeze, Reverse, Burst, LO-FI) and build a performance-ready effects patch that combines multiple features.

> [!tip] If you only have 5 minutes
> Select any algorithm with long DECAY. Play audio and press FREEZE -- the reverb tail captures and holds indefinitely. Press REVERSE while frozen -- the captured tail plays backwards. Press BURST for an explosion of reverb. These three buttons are your live performance tools.

## Warm-Up (2 min)

Init state. Select Velvet (or your favorite algorithm from previous sessions). Play audio to confirm routing. Today is about performance features -- real-time manipulation of the reverb for live use.

## Setup

1. Init state (see [Swells Overview](/modules/swells/))
2. Audio source to **IN L**, stereo outputs to mixer
3. Select an algorithm with a rich tail (**Velvet** or **Gaze** recommended)
4. DECAY at **3 o'clock**, SIZE at **2 o'clock**, MIX at **2 o'clock**

## Exercises

### Exercise 1: Freeze -- Capturing the Tail (5 min)

<div data-swells-panel
  data-highlights="button-swells-freeze:amber,slider-swells-decay:blue,slider-swells-size:blue"
></div>

1. Play audio into Swells and let a reverb tail build
2. Press **FREEZE** -- the reverb tail is captured and held indefinitely. New audio input is blocked
3. Listen to the frozen tail -- it loops seamlessly. Adjust **SIZE** while frozen to change the character of the loop
4. Press **FREEZE** again to release -- the tail decays naturally and new audio enters again
5. Practice the timing: play a chord, wait for a nice tail, FREEZE. Release, play another chord, FREEZE at a different moment
6. FREEZE is latching -- press once to engage, press again to release

### Exercise 2: Reverse -- Playing Backwards (5 min)

<div data-swells-panel
  data-highlights="button-swells-reverse:amber,button-swells-freeze:blue"
></div>

1. Build a reverb tail and press **REVERSE** -- the reverb tail plays backwards in real-time
2. REVERSE works best combined with FREEZE: FREEZE a tail, then press REVERSE to hear it backwards
3. Try FREEZE + REVERSE together: capture a moment, then reverse it for a backwards texture
4. Release REVERSE (press again) to return to forward playback
5. Practice: play a phrase, FREEZE, REVERSE, listen to the backwards version, release both

### Exercise 3: Burst -- Explosive Energy (4 min)

<div data-swells-panel
  data-highlights="button-swells-burst:amber,slider-swells-decay:blue"
></div>

1. With audio playing and a medium reverb tail, press **BURST**
2. BURST injects a burst of reverb energy -- like an explosion of the current reverb state
3. Try BURST with different DECAY settings: short DECAY = quick burst, long DECAY = sustained explosion
4. BURST works well as a punctuation in a performance -- a dramatic accent
5. Try combining BURST with FREEZE: freeze a tail, then BURST it for maximum drama

### Exercise 4: LO-FI Mode (4 min)

<div data-swells-panel
  data-highlights="switch-swells-lo-fi:amber,slider-swells-decay:blue"
></div>

1. Set **LO-FI** switch to **MIN** -- listen to the bit-crush and sample-rate reduction added to the reverb. Subtle degradation
2. Set **LO-FI** to **MAX** -- aggressive degradation. The reverb becomes gritty and crunchy
3. Try LO-FI MAX with the Deadspace algorithm -- extremely dark and degraded
4. Try LO-FI with FREEZE -- capture a clean tail, then switch to LO-FI while frozen
5. Return LO-FI to **OFF** when done

### Exercise 5: Performance Patch (5 min)

<div data-swells-panel
  data-highlights="button-swells-freeze:amber,button-swells-reverse:amber,button-swells-burst:amber,button-swells-swell:blue,switch-swells-lo-fi:blue"
></div>

1. Choose your favorite algorithm and set it up for performance:
   - DECAY at **2-3 o'clock** (enough tail to freeze)
   - SIZE at **2 o'clock**
   - MIX at **2 o'clock** (wet enough to hear effects clearly)
   - DRIVE to taste
2. Practice this performance sequence:
   - Play a phrase, let the tail build
   - FREEZE the tail
   - REVERSE the frozen tail
   - Release REVERSE, BURST for drama
   - Release FREEZE, continue playing
3. Add SWELL (from Session 05) for dynamics-responsive behavior during the performance
4. Try engaging LO-FI MIN during the performance for a gritty transition
5. Document your final performance patch settings

## What You Learned

- FREEZE captures and holds the reverb tail indefinitely
- REVERSE plays the reverb tail backwards (best combined with FREEZE)
- BURST injects explosive reverb energy as a dramatic accent
- LO-FI adds bit-crush degradation in 3 levels
- All performance features can be combined for complex, real-time manipulation

## Document Your Results

Record your performance patch: algorithm, all fader positions, which performance features you used, and the sequence that felt most natural. This is your go-to Swells performance preset -- you should be able to recall it from memory.
