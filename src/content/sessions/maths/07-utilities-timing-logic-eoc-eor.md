---
title: 'Session 07: Timing Logic -- EOC & EOR'
session_number: 7
duration: 25
prerequisite: 6
output_type: patch
difficulty: intermediate
tags:
  - utilities
  - eoc
  - eor
  - timing
  - trigger-chains
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. 10-12, Maths Illustrated Supplement'
section: Utilities
---

# Session 07: Timing Logic -- EOC & EOR

**Objective:** Use Channel 1's End-of-Rise (EOR) trigger and Channel 4's End-of-Cycle (EOC) trigger to create cascading envelope chains.

> [!tip] If you only have 5 minutes
> Set Maths to init state. Patch a gate to Ch1 Trigger IN and Ch1 Unity OUT to a VCA. Now patch Ch1 EOR OUT to Ch4 Trigger IN, and Ch4 Unity OUT to a second destination. Send a gate -- Ch1 fires, and when its rise stage completes, Ch4 automatically fires. You have a two-stage cascaded envelope.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Patch a CV source through Ch2 -- turn the Ch2 Attenuverter from fully CW through noon to fully CCW. Confirm you see the signal scale, zero out, and invert (review from session 06). Disconnect Ch2 and return to init.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Patch a gate or trigger source to **Ch1 Trigger IN**
3. Patch **Ch1 Unity OUT** to a VCA, filter, or mixer where you can hear the result
4. Have a second destination ready for Ch4 (another VCA input, a different filter, or the same mixer on a different channel)

## Exercises

### Exercise 1: Meet Channel 4 (7 min)

<div data-maths-panel
  data-sections="ch1,ch4"
  data-knobs="knob-ch1-rise:48,knob-ch1-fall:80,knob-ch4-rise:48,knob-ch4-fall:80"
  data-highlights="jack-ch4-trig-in:amber,jack-ch4-unity-out:amber,led-ch4-unity:blue"
></div>

1. Patch a gate source to **Ch4 Trigger IN** and **Ch4 Unity OUT** to your second destination
2. Send a gate -- watch Ch4's Unity LED. It should rise and fall just like Ch1. Channel 4 is a mirror of Channel 1 with its own independent Rise, Fall, Vari-Response, and Attenuverter
3. Adjust Ch4's **Rise** and **Fall** knobs independently -- confirm they behave exactly like Ch1's controls
4. Set Ch4 back to the init positions (Rise at 10 o'clock, Fall at 2 o'clock)

> [!info] Channels 1 and 4 are nearly identical function generators. The key difference is their timing outputs: Ch1 has an EOR (End-of-Rise) output, while Ch4 has an EOC (End-of-Cycle) output. This asymmetry is what makes cascading possible.

### Exercise 2: Cascading with EOR (10 min)

<div data-maths-panel
  data-sections="ch1,ch4"
  data-knobs="knob-ch1-rise:48,knob-ch1-fall:80,knob-ch4-rise:64,knob-ch4-fall:96"
  data-highlights="jack-ch1-eor-out:amber,jack-ch4-trig-in:amber"
  data-cables="jack-ch1-eor-out>jack-ch4-trig-in"
></div>

1. Remove the gate cable from Ch4 Trigger IN
2. Patch **Ch1 EOR OUT** to **Ch4 Trigger IN** -- this is the cascade connection
3. Send a gate to Ch1 -- watch both Unity LEDs. Ch1 rises, and the moment it reaches its peak (end of rise), Ch4 fires automatically
4. The result is a two-stage envelope: Ch1's attack, then Ch4's full attack-decay cycle begins exactly when Ch1's rise completes
5. Try making Ch1's Rise very slow (2 o'clock) -- Ch4 now waits longer before firing
6. Try making Ch4's Fall very long (3 o'clock) -- the second stage rings out after Ch1 has finished

> [!info] EOR fires a trigger pulse at the exact moment Ch1's voltage reaches its peak -- the transition point between the rise and fall stages. This is different from EOC, which fires after the entire cycle (rise + fall) completes.

### Exercise 3: Two-Stage Envelope to One Destination (6 min)

<div data-maths-panel
  data-sections="ch1,ch4,buses"
  data-highlights="jack-ch1-eor-out:amber,jack-ch4-trig-in:amber,jack-sum-out:blue"
  data-cables="jack-ch1-eor-out>jack-ch4-trig-in"
></div>

1. Keep the EOR-to-Trigger cascade patch from Exercise 2
2. Instead of separate destinations, patch the **SUM OUT** to a single VCA or filter -- the SUM bus automatically adds Ch1 and Ch4 together
3. Send a gate -- you should hear a complex envelope shape: Ch1's attack-decay overlapping with Ch4's attack-decay, which starts partway through Ch1's cycle
4. Adjust the relative Rise and Fall times on both channels to shape the combined envelope -- try Ch1 fast attack / slow decay with Ch4 slow attack / fast decay for a swell-then-snap character

## Session Output

Document the following in your Obsidian daily note:

- **EOR concept:** "Ch1 EOR fires a trigger when Ch1's rise stage completes"
- **Cascade patch:** Ch1 EOR OUT -> Ch4 Trigger IN creates a linked two-stage envelope
- **SUM trick:** SUM output combines both channels into one complex shape
- **Best Rise/Fall combo:** What Ch1 and Ch4 timing settings produced the most musical two-stage envelope?

## What's Next

In the next session, you will explore the OR, SUM, and INV bus outputs in depth -- learning how to combine all four Maths channels into complex single-output modulation signals using the automatic mixing bus.
