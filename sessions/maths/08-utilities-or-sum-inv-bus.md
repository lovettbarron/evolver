---
title: 'Session 08: The OR/SUM/INV Bus'
session_number: 8
duration: 20
prerequisite: 7
output_type: patch
difficulty: intermediate
tags:
  - utilities
  - or
  - sum
  - inv
  - mixing
  - voltage-combining
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. 12-14'
section: Utilities
---

# Session 08: The OR/SUM/INV Bus

**Objective:** Use the OR, SUM, and INV bus outputs to combine multiple Maths channels into complex single-output modulation signals.

> [!tip] If you only have 5 minutes
> Set Ch1 as a slow LFO (Cycle on, Rise/Fall at noon). Set Ch4 as a fast LFO (Cycle on, Rise/Fall at 9 o'clock). Patch SUM OUT to a filter cutoff -- you hear both LFOs combined. Now move the cable to OR OUT -- you hear only the highest voltage at any moment. Move to INV OUT -- you hear the inverted sum. Three free outputs, no extra patching.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Send a gate to Ch1 Trigger IN and watch Ch1's Unity LED fire. Now patch Ch1 EOR OUT to Ch4 Trigger IN and send a gate -- confirm Ch4 fires after Ch1's rise completes (review from session 07). Disconnect the cascade patch and return to init.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. You will need a destination where you can hear or measure the bus outputs -- a VCA, filter cutoff, or oscilloscope
3. No external gate source needed for most exercises -- you will use Cycle mode

## Exercises

### Exercise 1: SUM vs OR (8 min)

<div data-maths-panel
  data-sections="ch1,ch4,buses"
  data-highlights="jack-sum-out:amber,jack-or-out:blue,led-sum-pos:blue,led-sum-neg:blue"
></div>

1. Enable **Ch1 Cycle** (Cycle LED on). Set Ch1 Rise and Fall both to 12 o'clock -- a moderate LFO speed
2. Enable **Ch4 Cycle**. Set Ch4 Rise and Fall both to 9 o'clock -- a faster LFO
3. Patch **SUM OUT** to your destination -- listen. You should hear a complex undulating modulation that is the mathematical sum of both LFOs. Watch the SUM+ and SUM- LEDs -- they flicker as the combined voltage swings positive and negative
4. Move the cable to **OR OUT** -- listen. The character changes. OR outputs only the highest voltage present across all channels at any moment. When Ch1 is higher, you hear Ch1. When Ch4 is higher, you hear Ch4. The transitions between them create a stepped, peak-holding quality
5. Switch back and forth between SUM and OR a few times to internalize the difference

> [!info] SUM adds all channels together -- the result can exceed any individual channel's range and can go negative. OR takes the maximum voltage across all channels -- it is always positive and never exceeds 8V. SUM is additive mixing. OR is peak selection.

### Exercise 2: INV -- The Inverted Sum (5 min)

<div data-maths-panel
  data-sections="buses"
  data-highlights="jack-sum-out:blue,jack-inv-out:amber,led-sum-pos:blue,led-sum-neg:blue"
></div>

1. Keep both LFOs running from Exercise 1
2. Patch **INV OUT** to your destination -- listen. The modulation shape is identical to SUM but flipped upside down. Where SUM goes positive, INV goes negative, and vice versa
3. If you have two destinations available, patch SUM to one and INV to the other simultaneously -- you get complementary modulation. One opens as the other closes
4. This is free bipolar modulation -- no extra inverter module needed

> [!info] INV is simply the inverted SUM. If SUM outputs +3V, INV outputs -3V at the same moment. This is invaluable for creating complementary modulation pairs -- for example, filter opening while VCA closes, or two oscillators detuning in opposite directions.

### Exercise 3: Four-Channel Bus Mix (5 min)

<div data-maths-panel
  data-sections="ch1,ch2-3,ch4,buses"
  data-knobs="knob-ch2-attenuverter:96,knob-ch3-attenuverter:32"
  data-highlights="jack-sum-out:amber,knob-ch2-attenuverter:amber,knob-ch3-attenuverter:amber"
></div>

1. Keep Ch1 and Ch4 as LFOs from the previous exercises
2. Turn **Ch2 Attenuverter** to 2 o'clock -- this adds a positive static voltage offset to the SUM bus (even with nothing patched to Ch2 Signal IN, the attenuverter generates a DC offset)
3. Turn **Ch3 Attenuverter** to 10 o'clock -- this adds a negative static voltage offset
4. Patch **SUM OUT** to your destination -- you are now hearing all four channels combined: two LFOs plus two static offsets. The offsets shift the overall modulation center point up or down
5. Adjust Ch2 and Ch3 Attenuverters while listening -- you can bias the entire modulation signal without changing the LFO shapes

> [!info] All four channels always feed the buses, whether you are using their individual outputs or not. Ch2 and Ch3's attenuverters work as DC offset generators when nothing is patched to their Signal IN. This gives you free voltage offset and bias control over the bus outputs.

## Session Output

Document the following in your Obsidian daily note:

- **SUM:** Adds all channels together (can go negative, LEDs show polarity)
- **OR:** Outputs the highest voltage at any moment (peak selection, always positive)
- **INV:** Inverted SUM (complementary modulation, free bipolar output)
- **DC offset trick:** Ch2/Ch3 attenuverters bias the bus even with nothing patched to their inputs
- **Best use case discovered:** Which bus output created the most interesting modulation?

## What's Next

In the next session, you will return to audio-rate territory for a full deep dive -- using both Ch1 and Ch4 as simultaneous oscillators and exploring FM synthesis between them. This builds on the brief audio-rate taste from session 03 with much more depth.
