---
title: 'Session 05: Attenurandomizers & CV Modulation'
session_number: 5
duration: 20
prerequisite: 4
output_type: technique
difficulty: intermediate
tags:
  - attenurandomizer
  - cv-modulation
  - randomization
  - modulation
instrument: beads
instrument_type: eurorack_module
reference: 'Beads Manual pp. 12-13'
section: Modulation
---

# Session 05: Attenurandomizers & CV Modulation

**Objective:** Master the four attenurandomizers and their dual-function behavior -- CV modulation depth (clockwise from noon) and randomization amount (counterclockwise from noon) -- plus the CV ASSIGN button for modulating feedback, dry/wet, and reverb.

> [!tip] If you only have 5 minutes
> Set init state with grains running. Patch an LFO to TIME CV. Turn the TIME attenurandomizer clockwise from noon -- the LFO now modulates TIME. Turn it counterclockwise from noon instead -- now TIME is randomized internally. That dual-function behavior is the core concept.

## Warm-Up (2 min)

Set Beads to init state with audio patched and DENSITY at 1 o'clock. Confirm the four attenurandomizers (small knobs between the large knobs and the jacks) are all at noon. At noon, they have no effect -- no modulation, no randomization.

## Exercises

### Exercise 1: CV Modulation with an LFO (5 min)

<div data-beads-panel
  data-knobs="knob-beads-density:80,knob-beads-time-atten:90"
  data-highlights="knob-beads-time-atten:amber,jack-beads-time-cv:blue"
></div>

1. Patch a slow **LFO** (0.5-2 Hz) to the **TIME CV** input jack
2. The TIME attenurandomizer is at noon -- you hear no modulation effect yet
3. Slowly turn the **TIME attenurandomizer clockwise** from noon -- the LFO begins to modulate TIME. The buffer read position sweeps back and forth with the LFO
4. At full clockwise, the modulation is at maximum depth. The grains scan through the buffer in sync with the LFO, creating a rhythmic scrubbing effect
5. Return to noon. Turn the attenurandomizer slightly clockwise -- subtle modulation. This is usually the sweet spot: enough movement to add life without losing coherence

> [!info] **How attenurandomizers work:**
> - **Clockwise from noon** = attenuator for external CV. Controls how much the patched CV signal affects the parameter. Full CW = full CV depth
> - **Counterclockwise from noon** = randomizer. Adds internal randomization to the parameter. The randomization distribution changes: peaky near noon (values clustered at center), uniform near full CCW (wide random spread)
> - **At noon** = no modulation, no randomization. The parameter responds only to its main knob

### Exercise 2: Randomization Without CV (5 min)

<div data-beads-panel
  data-knobs="knob-beads-density:80,knob-beads-time-atten:30"
  data-highlights="knob-beads-time-atten:amber"
></div>

1. **Unplug** the LFO from TIME CV (or leave it unplugged if you did not patch one)
2. Turn the TIME attenurandomizer **counterclockwise from noon** -- now each grain reads from a slightly randomized buffer position. No external CV needed
3. At slightly CCW from noon, the randomization is subtle and peaky (most values near the current TIME setting, occasional jumps)
4. Turn further CCW -- the randomization becomes more uniform and extreme. Grains scatter widely across the buffer, creating a jumbled, unpredictable texture
5. This is powerful for adding organic variation: instead of every grain reading from the same buffer position, each grain gets a slightly different position

### Exercise 3: Combining CV and Randomization on Different Parameters (5 min)

<div data-beads-panel
  data-knobs="knob-beads-density:80,knob-beads-time-atten:85,knob-beads-pitch-atten:30"
  data-highlights="knob-beads-time-atten:amber,knob-beads-pitch-atten:blue,jack-beads-time-cv:amber"
></div>

1. Patch an LFO to **TIME CV**. Set the TIME attenurandomizer **clockwise** from noon (CV modulation on TIME)
2. Set the PITCH attenurandomizer **counterclockwise** from noon (randomization on PITCH)
3. Listen -- TIME sweeps smoothly with the LFO while PITCH gets randomized per grain. The combination creates a texture with structured movement in time position but scattered pitch
4. Try the reverse: TIME attenurandomizer CCW (random time) + PITCH attenurandomizer CW with a different CV source patched to PITCH CV (structured pitch movement)
5. Experiment with SIZE and SHAPE attenurandomizers too -- SIZE randomization creates grains of varying length, SHAPE randomization creates grains with varying envelope character

### Exercise 4: CV ASSIGN for Mixing Parameters (3 min)

<div data-beads-panel
  data-highlights="button-beads-cv-assign:amber,jack-beads-assign-cv:blue,knob-beads-feedback:blue,knob-beads-dry-wet:blue,knob-beads-reverb:blue"
></div>

1. Patch an LFO or envelope to the **ASSIGN CV** input jack [7]
2. Press **CV ASSIGN** [M] -- the LED under one of the three mixing knobs (FEEDBACK, DRY/WET, or REVERB) illuminates to show which parameter receives the CV
3. Press CV ASSIGN again to cycle to the next parameter
4. Press again to cycle to the third
5. Hold CV ASSIGN and turn FEEDBACK, DRY/WET, or REVERB to individually adjust how much CV modulation each receives
6. Listen to the effect of modulating DRY/WET with an LFO -- the granular texture fades in and out rhythmically

## Session Output

Document the following in your Obsidian daily note:

- **CV modulation depth:** What attenurandomizer position gave the best LFO-to-TIME modulation?
- **Randomization character:** How did CCW randomization differ from CV modulation in feel?
- **Best combination:** Which parameter did you prefer with CV (structured) and which with randomization (scattered)?
- **CV ASSIGN:** Which mixing parameter (feedback/dry-wet/reverb) benefited most from modulation?

## What's Next

In the final session, you will combine everything -- quality modes, freeze, grain modes, delay mode, and attenurandomizer modulation -- into a creative granular composition, including exploring the hidden wavetable synth mode.
