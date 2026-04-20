---
title: 'Session 06: Cycle -- LFO Textures and Phase Relationships'
session_number: 6
duration: 25
prerequisite: 5
output_type: patch
difficulty: intermediate
tags:
  - cycle-mode
  - lfo
  - phase
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Cycle Mode
cross_references:
  - ref: 'beads/02-granular-mode'
    reason: 'Use Just Friends polyphonic LFOs to modulate Beads grain parameters'
---

# Session 06: Cycle -- LFO Textures and Phase Relationships

**Objective:** Use Just Friends as a six-channel LFO bank with harmonically related rates and explore phase relationships between channels using INTONE.

> [!tip] If you only have 5 minutes
> Shape mode, MODE=Cycle, RUN=high. Set TIME to about 10 o'clock (slow visible cycling). Turn INTONE to 2 o'clock. Watch the six LEDs -- each pulses at a different rate in the harmonic series. Patch 2-3 channel outputs to different modulation destinations. You now have a harmonically synchronized modulation source.

## What You'll Learn

- Using Just Friends as a multi-rate LFO source
- How INTONE creates phase relationships between channels
- Patching individual channel outputs for harmonically related modulation
- Using CURVE and RAMP to shape LFO waveshapes

## What You'll Need

- Mannequins Just Friends
- A steady voltage for RUN (offset module or gate held high)
- Patch cables (4-6)
- Multiple modulation destinations (VCFs, VCAs, VCOs, other parameters)

## Starting State

| Control | Position |
|---------|----------|
| SOUND/SHAPE | Shape |
| MODE | Cycle |
| TIME | 10 o'clock (slow) |
| INTONE | 12 o'clock |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock |
| RUN | Patched high (steady voltage) |

## Warm-Up (2 min)

Patch RUN high and confirm all six LEDs are cycling in unison. Patch MIX to your mixer to hear the combined waveform. Verify that INTONE at noon produces synchronized movement.

## Exercises

### Exercise 1: Six LFOs from One Module (8 min)

<div data-just-friends-panel
  data-highlights="jack-jf-identity-out:blue,jack-jf-3n-out:blue,jack-jf-6n-out:blue"
  data-knobs="knob-jf-intone:95"
></div>

1. Turn INTONE to about 2 o'clock so channels have different rates
2. Patch **IDENTITY output** to a filter cutoff CV input -- this is your slowest modulation
3. Patch **3N output** to a VCA CV input -- this is 3x the base rate
4. Patch **6N output** to an oscillator pitch CV input (through an attenuator) -- this is 6x the base rate, creating vibrato
5. Listen to how the three modulations interact. They are mathematically related (same harmonic series), so they create a coherent rhythmic pattern even at different speeds
6. Adjust TIME to change the overall modulation speed -- all three destinations shift together proportionally

### Exercise 2: Waveshape Sculpting (8 min)

<div data-just-friends-panel
  data-highlights="knob-jf-curve:amber,knob-jf-ramp:amber"
  data-knobs="knob-jf-curve:100,knob-jf-ramp:90"
></div>

1. With the multi-output patch active, turn **CURVE** clockwise -- the LFO waveshape becomes more exponential. Notice how the modulation character changes: it spends more time at the extremes and sweeps quickly through the middle
2. Turn CURVE counter-clockwise -- logarithmic shape. The opposite behavior: more time in the middle, quick sweeps at the extremes
3. Now adjust **RAMP** -- clockwise gives a sawtooth-like shape (fast rise, slow fall). Counter-clockwise gives a reverse saw (slow rise, fast fall)
4. CURVE and RAMP together give you a wide range of LFO shapes without needing separate waveshaping modules

> [!info] Listen For
> Different LFO shapes create very different modulation feels. Exponential curves on a filter cutoff create dramatic sweeps. Logarithmic curves create subtle, organic movement. Sawtooth shapes (via RAMP) create directional sweeps.

### Exercise 3: Phase Relationships (5 min)

1. Return CURVE and RAMP to noon. Set INTONE to noon (all channels in sync)
2. Watch the LEDs -- all six pulse together. This is phase-locked unison
3. Slowly turn INTONE clockwise. As channels spread to different rates, their phase relationships diverge
4. At musical INTONE settings (1-2 o'clock), the channels create a **polyrhythmic pattern** -- they drift in and out of alignment, creating a slowly evolving modulation texture
5. This evolving pattern is why JF as an LFO source sounds more alive than six independent LFOs: the mathematical relationships ensure the pattern always resolves

## Output

Save your multi-LFO patch configuration:
- **Harmonically related LFOs:** INTONE 2 o'clock, TIME 10 o'clock, CURVE noon, RAMP noon
- Document which channels you patched to which destinations
- Note the CURVE and RAMP settings that produced your preferred waveshape

## Next Session Preview

Session 07 explores using INTONE for **rhythmic modulation patterns** -- pushing INTONE further to create integer-ratio rhythmic relationships and polymetric textures.
