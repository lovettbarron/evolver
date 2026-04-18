---
title: 'Session 12: Maths as Modulation Hub'
session_number: 12
duration: 25
prerequisite: 11
output_type: patch
difficulty: intermediate
tags:
  - integration
  - plaits
  - ikarie
  - cross-module
  - composition
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual, Plaits Manual, Ikarie Manual'
section: Integration
---

# Session 12: Maths as Modulation Hub

**Objective:** Use all four Maths channels simultaneously to modulate multiple modules, creating a composition element with Maths as the control voltage center.

> [!tip] If you only have 5 minutes
> Patch Ch1 envelope to Plaits Timbre input and Ch4 LFO to Ikarie filter cutoff. Send a gate -- Plaits' timbre sweeps while Ikarie's filter undulates. Two cables, two modules, one Maths. Now add Ch2 and Ch3 as static offsets to bias other parameters -- all four channels working at once.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Patch Ch1 Unity OUT to any destination and send a gate -- confirm the envelope fires (review from session 11). Disconnect. You are ready to build a multi-destination patch.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Set up **Plaits** with a sound you like -- any model/algorithm, with its output patched to your mixer
3. Set up **Ikarie** in the signal path -- either processing Plaits' output or another sound source, with its output patched to your mixer
4. Have a gate source ready for triggering Maths Ch1
5. You will use all four Maths channels in this session

## Exercises

### Exercise 1: Ch1 Envelope to Plaits (7 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:32,knob-ch1-fall:80,knob-ch1-attenuverter:90"
  data-highlights="jack-ch1-trig-in:amber,jack-ch1-var-out:amber,knob-ch1-attenuverter:amber"
></div>

1. Patch your gate source to **Ch1 Trigger IN**
2. Patch **Ch1 Variable OUT** to Plaits' **Timbre CV input** (or Harmonics, or Morph -- whichever parameter you want to sweep)
3. Set Ch1 **Attenuverter** to about 2 o'clock -- full range may be too much for Plaits' timbre
4. Send a gate -- you should hear Plaits' timbre sweep with the envelope shape. Each trigger produces a timbral evolution from dark to bright and back
5. Adjust Ch1 Rise and Fall to shape the timbral sweep -- try fast Rise for percussive timbre hits, or slow Rise for evolving textures
6. Fine-tune the Attenuverter to control the sweep range -- find the depth that sounds musical

### Exercise 2: Ch4 LFO to Ikarie (7 min)

<div data-maths-panel
  data-sections="ch4"
  data-knobs="knob-ch4-rise:72,knob-ch4-fall:72,knob-ch4-attenuverter:85"
  data-highlights="button-ch4-cycle:amber,jack-ch4-var-out:amber,knob-ch4-attenuverter:amber"
></div>

1. Keep the Ch1-to-Plaits patch from Exercise 1
2. Enable **Ch4 Cycle** -- set Rise and Fall to about 1 o'clock for a slow, evolving LFO
3. Patch **Ch4 Variable OUT** to Ikarie's **filter cutoff CV input** (or tilt/spread parameter)
4. Set Ch4 **Attenuverter** to about 2 o'clock for moderate modulation depth
5. You should hear Ikarie's filter continuously sweeping with the LFO -- a slow, undulating tonal movement
6. Now trigger Ch1 while Ch4's LFO runs -- you hear timbral envelope hits on Plaits while Ikarie's filter drifts independently. Two modules, two different modulation types, one Maths

> [!info] This is the core idea of Maths as a modulation hub: Ch1 provides triggered envelopes for event-based modulation (gate-dependent), while Ch4 provides free-running LFO for continuous modulation (always moving). Together they create both rhythmic and ambient movement in your patch.

### Exercise 3: All Four Channels Active (9 min)

<div data-maths-panel
  data-sections="ch1,ch2-3,ch4,buses"
  data-knobs="knob-ch1-rise:32,knob-ch1-fall:80,knob-ch2-attenuverter:96,knob-ch3-attenuverter:40,knob-ch4-rise:72,knob-ch4-fall:72"
  data-highlights="jack-ch1-var-out:amber,jack-ch2-var-out:blue,jack-ch3-var-out:blue,jack-ch4-var-out:amber"
></div>

1. Keep the Ch1-to-Plaits and Ch4-to-Ikarie patches from the previous exercises
2. Patch a modulation source (or nothing -- use the DC offset) into **Ch2 Signal IN**. Set **Ch2 Attenuverter** to 2 o'clock and patch **Ch2 Variable OUT** to another parameter on Plaits or Ikarie -- for example, Plaits' Morph input or Ikarie's resonance
3. Set **Ch3 Attenuverter** to 10 o'clock (inverted) and patch **Ch3 Variable OUT** to yet another parameter -- for example, an oscillator's FM depth or a VCA level
4. You now have all four Maths channels driving different destinations:
   - **Ch1:** Triggered envelope -> Plaits Timbre (event-based timbral sweeps)
   - **Ch2:** Scaled/offset voltage -> second parameter (static or processed bias)
   - **Ch3:** Inverted voltage -> third parameter (complementary bias)
   - **Ch4:** Free-running LFO -> Ikarie filter (continuous movement)
5. Send gates while the LFO runs and the offsets hold -- listen to the full patch as a composition element
6. Make small adjustments to any channel -- each change ripples through the whole patch. This is Maths as the nerve center of your system

> [!info] With all four channels active, Maths is simultaneously an envelope generator, an LFO, and two voltage processors -- driving four different destinations from one 20HP module. This is why Maths is considered essential in eurorack: it replaces multiple dedicated modules with one flexible tool.

## Session Output

Document the following in your Obsidian daily note:

- **Full patch diagram:** All four channels and their destinations
- **Ch1 -> Plaits:** Which parameter, what Rise/Fall/Attenuverter settings
- **Ch4 -> Ikarie:** Which parameter, what LFO speed, what depth
- **Ch2/Ch3 offsets:** What parameters did you bias, and how did it affect the overall patch?
- **Curriculum reflection:** Looking back across 12 sessions -- what is your strongest Maths technique? What do you want to explore further?

## Curriculum Complete

You have completed the Maths curriculum. Over 12 sessions you have learned:

1. **Foundations:** Rise/Fall envelopes, shaping VCA/VCF, audio-rate oscillation
2. **Modulation:** LFO with waveshaping, slew limiting/portamento, voltage processing with Ch2/Ch3
3. **Utilities:** EOC/EOR cascading, OR/SUM/INV bus mixing
4. **Advanced:** FM synthesis between channels, ASR envelopes via Signal IN, Vari-Response curve shaping
5. **Integration:** Maths as envelope + LFO for Cascadia, multi-module modulation hub for Plaits + Ikarie

Maths is now a tool you can reach for confidently. Every capability you have learned -- envelope, LFO, slew, oscillator, logic, mixing -- is available simultaneously from the same module. The next step is using these techniques in your compositions.
