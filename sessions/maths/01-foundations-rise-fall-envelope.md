---
title: 'Session 01: Rise and Fall -- Your First Envelope'
session_number: 1
duration: 20
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - envelope
  - rise-fall
  - attack-decay
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. 4-6'
section: Foundations
---

# Session 01: Rise and Fall -- Your First Envelope

**Objective:** Create a basic attack-decay envelope using Channel 1's Rise and Fall knobs, and learn to read the envelope shape from the Unity LED.

> [!tip] If you only have 5 minutes
> Set Ch1 to the Basic Patch init state. Patch a gate source to Ch1 Trigger IN. Patch Ch1 Unity OUT to a VCA or mixer. Send a gate and watch the LED rise and fall. Change the Rise knob and send another gate -- notice the attack gets longer or shorter. That is the whole concept.

## Warm-Up (2 min)

This is your first Maths session -- no warm-up needed. Take a moment to look at the module's front panel. Notice the four vertical columns: Channel 1 on the left, Channels 2 and 3 in the center, and Channel 4 on the right. The three bus outputs (OR, SUM, INV) sit at the bottom center.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Patch a gate or trigger source (keyboard gate, sequencer, or clock) to **Ch1 Trigger IN**
3. Patch **Ch1 Unity OUT** to a destination where you can hear or see the result -- a VCA CV input, a mixer level input, or an oscilloscope if available
4. Make sure Ch1 Cycle is **off** (LED dark)

## Exercises

### Exercise 1: Your First Envelope (5 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:48,knob-ch1-fall:80"
  data-highlights="jack-ch1-trig-in:amber,jack-ch1-unity-out:amber,led-ch1-unity:blue"
></div>

1. Send a single gate to Ch1 Trigger IN -- watch the Unity LED. It should brighten quickly (the rise stage) and then dim slowly (the fall stage)
2. Send another gate and watch carefully -- the LED traces out the envelope shape. Rise = how fast the voltage goes up. Fall = how fast it comes back down
3. If you are patched to a VCA, you should hear the sound swell up and fade away with each gate

### Exercise 2: Shape the Envelope (8 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:20,knob-ch1-fall:80"
  data-highlights="knob-ch1-rise:amber,knob-ch1-fall:amber"
></div>

1. Turn **Rise** fully counterclockwise (fast) -- send a gate. The attack is now nearly instant, like a percussive hit
2. Turn **Rise** to 12 o'clock -- send a gate. The attack is slower, like a swell
3. Turn **Rise** to 3 o'clock -- send a gate. The attack is very slow, like a pad fade-in
4. Return **Rise** to 10 o'clock. Now turn **Fall** fully counterclockwise -- send a gate. The decay is very short, like a click
5. Turn **Fall** to 12 o'clock -- send a gate. Medium decay
6. Turn **Fall** to 3 o'clock -- send a gate. Long decay, the sound rings out

> [!info] Rise and Fall times range from ~0.5 milliseconds (fully counterclockwise) to over 25 minutes (fully clockwise). The usable envelope range for most musical purposes is between 8 o'clock and 3 o'clock.

7. Return Rise and Fall to the init positions (Rise at 10 o'clock, Fall at 2 o'clock)

### Exercise 3: Unity OUT vs Variable OUT (5 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-attenuverter:127"
  data-highlights="jack-ch1-unity-out:blue,jack-ch1-var-out:amber,knob-ch1-attenuverter:amber"
></div>

1. Move your patch cable from **Unity OUT** to **Variable OUT** -- send a gate. With the Attenuverter fully clockwise, the output should sound identical to Unity OUT
2. Turn the **Attenuverter** to 12 o'clock (noon) -- send a gate. The output is now zero. Variable OUT is silent
3. Turn the Attenuverter to about 2 o'clock -- send a gate. The envelope is now scaled down (quieter, or less modulation depth if patched to a CV destination)
4. Turn the Attenuverter fully counterclockwise -- send a gate. The envelope is now inverted -- the voltage goes negative instead of positive

> [!info] Unity OUT always gives you the full 0-8V envelope. Variable OUT scales and optionally inverts the envelope via the Attenuverter knob. Use Unity OUT when you want full strength, Variable OUT when you need to control the depth or flip the polarity.

5. Return the Attenuverter to fully clockwise and move your cable back to Unity OUT

## Session Output

Document the following in your Obsidian daily note:

- **Rise at 10 o'clock, Fall at 2 o'clock:** What did this envelope sound/look like? (your init reference)
- **Fastest attack (Rise fully CCW):** How did this change the character?
- **Slowest useful decay (Fall at 3 o'clock):** How long did the tail last?
- **Variable OUT with Attenuverter at noon:** Confirmed zero output?

## What's Next

In the next session, you will use this envelope to shape real sounds -- patching Ch1's output to a VCA for volume control and a VCF for filter sweeps. You will hear how the same Rise/Fall envelope produces very different musical results depending on where you send it.
