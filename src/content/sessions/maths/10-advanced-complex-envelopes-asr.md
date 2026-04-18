---
title: 'Session 10: Complex Envelopes & ASR'
session_number: 10
duration: 25
prerequisite: 9
output_type: patch
difficulty: intermediate
tags:
  - advanced
  - envelope
  - asr
  - vari-response
  - complex-shapes
instrument: maths
instrument_type: eurorack_module
reference: 'Maths Manual pp. 6-8, Maths Illustrated Supplement'
section: Advanced
---

# Session 10: Complex Envelopes & ASR

**Objective:** Use Signal IN for ASR (attack-sustain-release) envelope behavior and push Vari-Response to its extremes for expressive curve shaping.

> [!tip] If you only have 5 minutes
> Set Maths to init state. Patch a gate (not trigger) into Ch1 Signal IN. Patch Ch1 Unity OUT to a VCA. Hold the gate -- the voltage rises, then sustains at the peak as long as you hold. Release -- the voltage falls. This is ASR. Now turn Vari-Response fully CW -- the attack snaps exponentially. Fully CCW -- it fades in logarithmically.

## Warm-Up (2 min)

Set Maths to the Basic Patch init state. Enable Ch1 Cycle, turn Rise and Fall fully counterclockwise -- confirm you hear a tone (review from session 09). Turn Cycle off, return Rise and Fall to init positions. You are back in envelope territory.

## Setup

1. Set all Maths controls to the Basic Patch init state (see [Maths Overview](/modules/maths/))
2. Patch a **gate source** (keyboard gate, sequencer, or manual gate button) to **Ch1 Signal IN** -- note: Signal IN, not Trigger IN. This is essential for ASR behavior
3. Patch **Ch1 Unity OUT** to a VCA or filter where you can hear the envelope shape
4. Make sure Ch1 Cycle is **off**

## Exercises

### Exercise 1: AD vs ASR (8 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:48,knob-ch1-fall:80"
  data-highlights="jack-ch1-signal-in:amber,jack-ch1-trig-in:blue,jack-ch1-unity-out:amber"
></div>

1. With your gate patched to **Signal IN**, send a short gate -- the Unity LED rises and falls, similar to the AD envelope from session 01
2. Now send a **long gate** (hold it for 2-3 seconds) -- watch carefully. The LED rises during the attack, then sustains at the peak as long as the gate is held. When you release, it falls
3. This is ASR: attack-sustain-release. The sustain stage is new -- it only happens with Signal IN, not Trigger IN
4. Move your cable from Signal IN to **Trigger IN** and send the same long gate -- the LED rises and falls immediately regardless of gate length. Trigger IN ignores gate duration
5. Move the cable back to **Signal IN** -- you want ASR behavior for the rest of this session

> [!info] Trigger IN fires a one-shot AD (attack-decay) envelope regardless of gate length. Signal IN creates an ASR envelope that sustains at the peak for the duration of the gate. This distinction is critical for playing Maths from a keyboard or sequencer -- ASR gives you held notes, AD gives you percussive hits.

### Exercise 2: Vari-Response Curve Shaping (10 min)

<div data-maths-panel
  data-sections="ch1"
  data-knobs="knob-ch1-rise:48,knob-ch1-fall:80,knob-ch1-vari-response:127"
  data-highlights="knob-ch1-vari-response:amber"
></div>

1. Set Ch1 Rise to 12 o'clock (moderate attack) so you can clearly hear the curve shape
2. Turn **Vari-Response** fully clockwise (exponential) -- send a gate and hold. The attack snaps up quickly, then decelerates near the peak. This is punchy and percussive
3. Turn **Vari-Response** fully counterclockwise (logarithmic) -- send a gate and hold. The attack starts slowly and accelerates. This is gradual and swelling
4. Turn **Vari-Response** to noon (linear) -- send a gate and hold. The attack is a straight ramp, even and mechanical
5. Now focus on the release: release the gate with Vari-Response fully CW -- the fall is exponential (fast initial drop, slow tail). Fully CCW -- the fall is logarithmic (slow initial drop, fast final cutoff)
6. Find the Vari-Response position that creates the most musical envelope for your destination

> [!info] Vari-Response simultaneously shapes both the rise and fall curves. Fully CW (exponential) creates punchy attacks and natural decays -- similar to acoustic instrument envelopes. Fully CCW (logarithmic) creates slow swells and abrupt cutoffs. Noon (linear) is mechanical and even. Most musical envelopes sit between noon and fully CW.

### Exercise 3: Multi-Stage Complex Envelope (5 min)

<div data-maths-panel
  data-sections="ch1,ch4,buses"
  data-knobs="knob-ch1-vari-response:100,knob-ch4-vari-response:30"
  data-highlights="jack-ch1-signal-in:amber,jack-sum-out:blue,knob-ch1-vari-response:amber,knob-ch4-vari-response:amber"
></div>

1. Patch the same gate to both **Ch1 Signal IN** and **Ch4 Signal IN** -- both channels will produce ASR envelopes from the same gate
2. Set Ch1 Vari-Response to about 2 o'clock (slightly exponential) and Ch4 Vari-Response to about 10 o'clock (slightly logarithmic)
3. Set Ch1 Rise fast (9 o'clock) and Ch4 Rise slow (1 o'clock)
4. Patch **SUM OUT** to your destination -- send a gate and hold
5. Listen -- the SUM combines both ASR envelopes into a complex shape: Ch1's fast exponential attack overlaid with Ch4's slow logarithmic swell. The result has a punch followed by a gradual build
6. Experiment with different Vari-Response and Rise/Fall combinations on each channel -- the SUM bus gives you a single complex envelope output from two simple ones

## Session Output

Document the following in your Obsidian daily note:

- **ASR concept:** Signal IN creates attack-sustain-release; Trigger IN creates attack-decay only
- **Vari-Response sweet spot:** What position created the most musical envelope shape for your patch?
- **CW vs CCW character:** "Exponential = punchy attack, natural decay. Logarithmic = slow swell, abrupt cutoff"
- **Multi-stage trick:** Two channels with different Vari-Response settings into SUM = complex single envelope

## What's Next

In the next session, you will take Maths out of isolation and patch it into your Cascadia -- using Ch1 as an envelope for Cascadia's filter and Ch4 as an LFO for Cascadia's oscillator pitch. This is where Maths becomes a practical part of your music-making setup.
