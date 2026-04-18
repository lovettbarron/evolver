---
title: 'Session 06: Voltage Processing with Ch2 and Ch3'
session_number: 6
duration: 20
prerequisite: 5
output_type: technique
difficulty: intermediate
tags:
  - modulation
  - attenuverter
  - voltage-processing
  - scaling
  - inversion
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. 8-9'
section: Modulation
---

# Session 06: Voltage Processing with Ch2 and Ch3

**Objective:** Use the attenuverter channels to scale, offset, and invert control voltages, understanding how Channels 2 and 3 serve as simple but essential voltage processors.

> [!tip] If you only have 5 minutes
> Patch any CV source into Ch2 Signal IN. Patch Ch2 Variable OUT to a destination. Turn the Ch2 Attenuverter knob -- fully clockwise passes the signal at full strength, noon is zero output, fully counterclockwise inverts the signal. That is the whole concept.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Look at the center of the panel -- Channels 2 and 3 each have just three elements: an Attenuverter knob, a Signal IN jack, and a Variable OUT jack. These are the simplest channels on Maths, but they solve a problem you will encounter constantly in modular synthesis.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Have a modulation source ready -- an LFO, envelope, or sequencer CV output
3. Have a destination module with a CV input -- filter cutoff, oscillator pitch, or VCA level
4. You will use both Ch2 and Ch3 in this session

## Exercises

### Exercise 1: Scaling a Signal (7 min)

<div data-maths-panel
  data-sections="ch2-3"
  data-knobs="knob-ch2-attenuverter:127"
  data-highlights="jack-ch2-signal-in:amber,jack-ch2-var-out:amber,knob-ch2-attenuverter:amber"
></div>

1. Patch your modulation source (LFO, envelope, etc.) into **Ch2 Signal IN**
2. Patch **Ch2 Variable OUT** to your destination (e.g., filter cutoff CV input)
3. Set the **Ch2 Attenuverter** fully clockwise -- the signal passes through at full strength. You should hear the full modulation effect
4. Slowly turn the Attenuverter toward noon -- the modulation depth decreases smoothly
5. At noon (12 o'clock), the output is zero -- no signal passes through, regardless of what enters Signal IN
6. This is an attenuator -- it reduces the strength of a signal without changing its character

> [!info] Many modular CV inputs have no built-in attenuator. Without Maths (or a dedicated attenuator), an LFO's full-range output might be far too much modulation for a filter cutoff. Ch2 and Ch3 give you precise, continuous control over modulation depth before the signal reaches its destination.

### Exercise 2: Inverting a Signal (7 min)

<div data-maths-panel
  data-sections="ch2-3"
  data-knobs="knob-ch2-attenuverter:0"
  data-highlights="knob-ch2-attenuverter:amber,jack-ch2-var-out:blue"
></div>

1. With the same patch from Exercise 1, turn the **Ch2 Attenuverter** from noon counterclockwise
2. As you pass noon going counterclockwise, the modulation reappears -- but inverted. Where the LFO used to sweep the filter up, it now sweeps it down
3. Turn fully counterclockwise -- the signal is at full strength but completely inverted
4. Slowly sweep the knob through its full range: fully CW (full positive) -> noon (zero) -> fully CCW (full negative inverted)

> [!info] This is what "attenuverter" means: attenuator + inverter. The clockwise half scales the signal positively (0 to +1). The counterclockwise half scales and inverts it (0 to -1). Noon is always zero. This single knob replaces both an attenuator and an inverter module.

5. Set the Attenuverter to about 10 o'clock -- the signal is inverted at moderate depth. Listen to how this changes the musical character of the modulation

### Exercise 3: Processing Two Signals Simultaneously (4 min)

<div data-maths-panel
  data-sections="ch2-3"
  data-knobs="knob-ch2-attenuverter:96,knob-ch3-attenuverter:32"
  data-highlights="jack-ch2-signal-in:amber,jack-ch3-signal-in:amber,jack-ch2-var-out:blue,jack-ch3-var-out:blue,knob-ch2-attenuverter:amber,knob-ch3-attenuverter:amber"
></div>

1. Keep the Ch2 patch from the previous exercises
2. Patch a second modulation source into **Ch3 Signal IN**
3. Patch **Ch3 Variable OUT** to a different destination (or the same destination if you want to combine two modulations)
4. Set **Ch2 Attenuverter** to 2 o'clock (positive, moderate) and **Ch3 Attenuverter** to 10 o'clock (inverted, moderate)
5. Listen to both modulations simultaneously -- one positive, one inverted. If both go to the same destination, they partially cancel each other, creating complex movement

> [!info] Ch2 and Ch3 feed into the SUM and OR buses automatically. Even when you are using their Variable OUTs for direct patching, their processed voltages still contribute to the SUM, INV, and OR bus outputs. This becomes important in later sessions when you combine all four channels.

## Session Output

Document the following in your Obsidian daily note:

- **Attenuverter concept:** "CW = full positive, noon = zero, CCW = full inverted"
- **Scaling use case:** What modulation did you scale, and what depth worked best?
- **Inversion use case:** How did inverting the modulation change the musical result?
- **Dual processing:** What two signals did you process, and what destinations?

## What's Next

In the next session, you will learn about EOC and EOR -- the timing trigger outputs from Channels 1 and 4 that let you cascade envelopes and create complex timing relationships. This is where Maths starts becoming a logic and sequencing tool, not just a modulation source.
