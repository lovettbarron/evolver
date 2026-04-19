---
title: 'Session 05: Shape -- Burst and Strata (Cycle + RUN)'
session_number: 5
duration: 30
prerequisite: 4
output_type: patch
difficulty: intermediate
tags:
  - shape-mode
  - cycle
  - run
  - burst
  - strata
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Shape Mode
---

# Session 05: Shape -- Burst and Strata (Cycle + RUN)

**Objective:** Explore burst and strata behaviors that emerge when Shape mode is combined with MODE=Cycle and the RUN jack. Create rhythmic envelope patterns from the interaction of triggered shapes and continuous cycling.

> [!tip] If you only have 5 minutes
> Shape mode, MODE=Cycle. Patch a gate to RUN. When the gate goes high, all channels cycle continuously (strata). When the gate goes low, cycling stops. Now try short triggers to RUN instead -- you get bursts of cycling that stop after the trigger ends.

## What You'll Learn

- How MODE=Cycle changes Shape mode behavior
- Strata: gated continuous cycling via RUN
- Burst: triggered finite cycling via trigger inputs
- Combining these with INTONE for polyrhythmic textures

## What You'll Need

- Mannequins Just Friends
- A gate source for RUN (sequencer gate, LFO square wave, manual gate)
- A separate trigger source for channel triggers
- Patch cables (3-5)
- A mixer or VCA to monitor output

## Starting State

| Control | Position |
|---------|----------|
| SOUND/SHAPE | Shape |
| MODE | **Cycle** |
| TIME | 11 o'clock |
| INTONE | 12 o'clock |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock |

## Warm-Up (3 min)

Set MODE to Transient and send a few triggers to confirm basic envelope behavior. Then switch MODE to Cycle -- send a trigger. Notice that the channel now cycles a few times before stopping (it runs through its slope repeatedly). Switch back and forth between Transient and Cycle to feel the difference. Leave MODE at Cycle.

## Exercises

### Exercise 1: Strata -- Gated Cycling (8 min)

<div data-just-friends-panel
  data-highlights="jack-jf-run-in:amber,jack-jf-mix-out:blue,switch-jf-mode:blue"
></div>

1. Patch a gate source to the **RUN** jack. Leave all trigger inputs unpatched
2. Send a long gate (hold high) -- all six channels begin cycling continuously. The LEDs pulse rhythmically
3. Release the gate -- cycling stops immediately. This is **Strata**: the RUN gate controls whether channels are active
4. Try toggling RUN on and off rhythmically -- you get bursts of cycling activity that start and stop with the gate
5. Patch MIX output to your mixer and listen to the cycling waveforms

### Exercise 2: INTONE + Strata (8 min)

<div data-just-friends-panel
  data-highlights="knob-jf-intone:amber,jack-jf-run-in:blue"
  data-knobs="knob-jf-intone:100"
></div>

1. Keep RUN patched with a steady high gate
2. Turn **INTONE** to about 2 o'clock -- now each channel cycles at a different rate. The LEDs create a polyrhythmic pattern
3. Listen to MIX -- it is a complex, evolving waveform created by the sum of six LFOs at harmonically related rates
4. Try patching individual channel outputs (IDENTITY, 3N, 6N) to different destinations. Each gives you a different modulation rate derived from the same TIME setting
5. Adjust TIME to change the overall speed -- slower for evolving ambient textures, faster for rhythmic modulation

### Exercise 3: Burst -- Triggered Cycling (8 min)

<div data-just-friends-panel
  data-highlights="jack-jf-identity-trig:amber,jack-jf-run-in:blue"
></div>

1. Remove the RUN patch. Patch a trigger source to **IDENTITY** trigger input
2. With MODE still at Cycle, send a trigger -- the channels burst into cycling for a moment, then gradually stop. Each trigger restarts the cycling
3. This is **Burst** behavior: a trigger initiates a finite burst of cycles rather than a single slope
4. Turn TIME faster (clockwise) -- the bursts are quicker and more percussive
5. Turn TIME slower (counter-clockwise) -- the bursts are longer, creating sustained rhythmic activity from a single trigger
6. Now patch RUN high again while also sending triggers to IDENTITY -- the two interact. RUN keeps channels cycling, triggers reset the phase

## Output

Save your rhythmic burst patch:
- **Strata texture:** MODE=Cycle, RUN=high, INTONE 2 o'clock, TIME 11 o'clock
- **Burst percussion:** MODE=Cycle, trigger at IDENTITY, INTONE noon, TIME 1 o'clock
- Note how CURVE and RAMP change the character of the cycling waveform

## Next Session Preview

Session 06 switches to **Cycle mode** proper (SOUND/SHAPE=Shape, MODE=Cycle with no triggered input) to explore LFO textures and phase relationships between channels. You will use INTONE to create musically related modulation rates.
