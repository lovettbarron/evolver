---
title: 'Session 11: Maths + Cascadia'
session_number: 11
duration: 25
prerequisite: 10
output_type: patch
difficulty: intermediate
tags:
  - integration
  - cascadia
  - cross-module
  - envelope
  - lfo
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual, Cascadia Manual'
section: Integration
---

# Session 11: Maths + Cascadia

**Objective:** Patch Maths into the Cascadia to create an integrated voice with Maths providing envelope and LFO modulation.

> [!tip] If you only have 5 minutes
> Set Maths to init state and Cascadia to its default normalled signal path. Patch Ch1 Unity OUT to Cascadia's VCF FM input. Send a gate to Ch1 Trigger IN -- you should hear Cascadia's filter sweep open and close with each trigger. That single cable connection demonstrates Maths as an external modulation source.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Patch a gate to Ch1 Signal IN and Ch1 Unity OUT to a destination -- send a long gate and confirm ASR behavior (the voltage sustains while the gate is held, review from session 10). Disconnect and return to init.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Set Cascadia to its default normalled signal path -- VCO A through the VCF and VCA, with the VCA open enough to hear the signal
3. Have patch cables ready for connecting Maths outputs to Cascadia CV inputs
4. You will need a gate source that can trigger Maths (keyboard, sequencer, or clock)

## Exercises

### Exercise 1: Maths Envelope to Cascadia Filter (8 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:32,knob-ch1-fall:96"
  data-highlights="jack-ch1-trig-in:amber,jack-ch1-unity-out:amber"
></div>

1. Patch your gate source to **Ch1 Trigger IN**
2. Patch **Ch1 Unity OUT** to Cascadia's **VCF FM input** (or VCF cutoff CV input)
3. Set Cascadia's VCF cutoff fairly low -- you want to hear the filter open when Maths sends voltage
4. Send a gate -- Maths fires its envelope, and you should hear Cascadia's filter sweep upward (bright) and then close (dark)
5. Adjust Ch1 **Rise** for attack speed -- fast Rise (9 o'clock) gives a percussive pluck, slow Rise (1 o'clock) gives a gradual swell
6. Adjust Ch1 **Fall** for decay length -- short Fall gives a tight filter blip, long Fall gives a resonant sweep
7. Dial in a filter envelope that sounds musical to you

> [!info] This is one of the most common uses for Maths in a system -- providing an external envelope to a module that has limited or no built-in envelope generator. Cascadia has its own EG, but Maths gives you independent control with Vari-Response curve shaping that Cascadia's EG does not have.

### Exercise 2: Maths LFO to Cascadia Pitch (8 min)

<div data-maths-panel
  data-sections="ch4"
  data-knobs="knob-ch4-rise:64,knob-ch4-fall:64,knob-ch4-attenuverter:80"
  data-highlights="button-ch4-cycle:amber,jack-ch4-var-out:amber,knob-ch4-attenuverter:amber"
></div>

1. Keep the Ch1 filter envelope patch from Exercise 1
2. Enable **Ch4 Cycle** -- set Rise and Fall both to 12 o'clock for a moderate LFO speed
3. Patch **Ch4 Variable OUT** to Cascadia's **VCO A pitch CV input** (1V/Oct or FM input)
4. You should hear Cascadia's pitch wobbling -- this is vibrato from Maths
5. The vibrato is probably too deep. Turn **Ch4 Attenuverter** toward noon to reduce the depth -- find a subtle vibrato that sounds musical (around 1-2 o'clock is usually good for pitch modulation)
6. Adjust Ch4's Rise and Fall to change the vibrato speed -- try very slow (2 o'clock) for a gentle drift, or faster (10 o'clock) for a pronounced wobble

> [!info] Variable OUT with the Attenuverter is essential for pitch modulation -- Unity OUT sends the full 0-8V range, which would detune the oscillator by several octaves. The Attenuverter lets you dial in subtle vibrato depth. This is exactly why Ch2/Ch3's attenuverter lesson (session 06) matters in practice.

### Exercise 3: Integrated Voice -- Envelope + LFO Together (7 min)

<div data-maths-panel
  data-sections="ch1,ch4"
  data-knobs="knob-ch1-rise:32,knob-ch1-fall:96,knob-ch4-rise:64,knob-ch4-fall:64,knob-ch4-attenuverter:80"
  data-highlights="jack-ch1-unity-out:amber,jack-ch4-var-out:amber"
></div>

1. You should now have two simultaneous Maths-to-Cascadia connections: Ch1 envelope to filter, Ch4 LFO to pitch
2. Send gates to Ch1 -- each trigger gives you a filter sweep with continuous pitch vibrato underneath. This is a complete voice articulation from Maths alone
3. Try adjusting Ch1's **Vari-Response** for envelope character -- exponential (CW) for snappy filter plucks, logarithmic (CCW) for swelling pads
4. Try adjusting Ch4's **Vari-Response** for LFO waveshape -- the vibrato character changes from smooth triangle (noon) to asymmetric curves
5. Document the final knob positions for both channels -- this is your integrated Maths+Cascadia voice patch

## Session Output

Document the following in your Obsidian daily note:

- **Patch diagram:** Ch1 Unity OUT -> Cascadia VCF, Ch4 Variable OUT -> Cascadia VCO pitch
- **Ch1 envelope settings:** Rise, Fall, and Vari-Response positions for your best filter sweep
- **Ch4 LFO settings:** Rise, Fall, Attenuverter, and Vari-Response positions for musical vibrato
- **Integration insight:** How did using Maths as Cascadia's modulation source differ from Cascadia's built-in EG?

## What's Next

In the final session, you will expand this integration concept to multiple modules -- using Maths as a modulation hub for Plaits and Ikarie, with all four channels driving different destinations simultaneously. This is Maths as the center of your modular system.
