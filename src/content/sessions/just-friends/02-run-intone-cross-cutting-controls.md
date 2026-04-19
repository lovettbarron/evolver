---
title: 'Session 02: Run and Intone -- Cross-Cutting Controls'
session_number: 2
duration: 25
prerequisite: 1
output_type: technique
difficulty: beginner
tags:
  - foundations
  - run
  - intone
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Foundations
---

# Session 02: Run and Intone -- Cross-Cutting Controls

**Objective:** Understand how RUN and INTONE fundamentally change Just Friends' behavior across all modes, and experience the difference between triggered and continuous operation.

> [!tip] If you only have 5 minutes
> Patch a steady high voltage (or a gate held high) to the RUN jack. Set Shape/Transient. All six LEDs should cycle continuously. Now turn INTONE clockwise -- the LEDs move at different speeds, creating a mesmerizing polyrhythmic light show. That is RUN + INTONE.

## What You'll Learn

- How the RUN jack enables continuous cycling in any mode
- How INTONE creates musical relationships between channels
- The interaction between RUN and INTONE across modes

## What You'll Need

- Mannequins Just Friends
- A steady voltage source for RUN (offset module, gate held high, or a slow LFO)
- Patch cables (3-4)
- A mixer or audio interface to monitor multiple outputs

## Starting State

| Control | Position |
|---------|----------|
| SOUND/SHAPE | Shape |
| MODE | Transient |
| TIME | 12 o'clock |
| INTONE | 12 o'clock |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock |

## Warm-Up (2 min)

Patch a gate to IDENTITY and MIX to your mixer. Send a few gates to confirm you get triggered envelopes from Session 01. Verify INTONE at noon produces identical LEDs, INTONE clockwise produces spread rates. Remove the gate patch when done.

## Exercises

### Exercise 1: RUN -- Continuous Operation (8 min)

<div data-just-friends-panel
  data-highlights="jack-jf-run-in:amber,jack-jf-mix-out:blue"
  data-knobs="knob-jf-time:64,knob-jf-intone:64"
></div>

1. Patch a steady high voltage (5V offset, or hold a gate high) to the **RUN** jack
2. All six LEDs should now cycle continuously -- rising and falling on their own, without any trigger input
3. Patch **MIX output** to your mixer. You should hear a repeating waveshape
4. Turn **TIME** slowly counter-clockwise -- the cycling slows down. Turn clockwise -- it speeds up
5. Remove the RUN voltage -- cycling stops immediately. This is the key: RUN enables continuous operation, removing it returns to triggered-only behavior

> [!info] RUN Changes Everything
> The RUN jack is one of Just Friends' most powerful features. It transforms the module from a triggered device into a continuously running one. The specific behavior depends on the current mode, but in all cases, RUN means "keep going without external triggers."

### Exercise 2: INTONE Deep Dive (8 min)

<div data-just-friends-panel
  data-highlights="knob-jf-intone:amber"
  data-knobs="knob-jf-intone:100"
></div>

1. Keep RUN patched high. Set TIME to about 10 o'clock (slow enough to see individual LED movements)
2. Start with **INTONE** at noon -- all six LEDs cycle in unison
3. Slowly turn INTONE clockwise. Watch the LEDs carefully:
   - First, 6N starts moving faster, then 5N, then 4N
   - At about 2 o'clock, each channel is clearly at a different speed
   - The relationship is harmonic: 2N = 2x IDENTITY, 3N = 3x, etc.
4. Listen to the MIX output as you turn INTONE -- the combined waveshape becomes increasingly complex
5. Now turn INTONE counter-clockwise past noon -- channels compress below the fundamental. The spread reverses
6. Try INTONE at about 2 o'clock with TIME at noon -- this is a sweet spot for musically interesting polyrhythmic modulation

### Exercise 3: RUN + INTONE Across Modes (5 min)

1. Keep RUN high and INTONE at about 2 o'clock
2. Flip MODE from **Transient** to **Sustain** -- notice how the waveshape changes. Sustain mode produces different slope shapes
3. Flip MODE to **Cycle** -- the cycling behavior changes again. In Cycle mode, the phase relationships between channels are preserved
4. Return to **Transient** mode
5. Now flip SOUND/SHAPE to **Sound** -- the cycling is now at audio rate. You should hear pitched content through MIX. INTONE creates chord intervals between the six oscillators
6. Return to **Shape/Transient** for the next session

> [!info] Listen For
> In Sound mode with RUN and INTONE spread, MIX produces a rich chord. The chord intervals are determined by the harmonic series: octave, fifth, two octaves, major third, etc. This is one of Just Friends' signature sounds.

## Output

Document the RUN + INTONE interaction:
- RUN enables continuous cycling in any mode
- INTONE at noon = all channels identical, spread = harmonic ratios
- The combination creates polyrhythmic modulation (Shape/Cycle) or chord voicings (Sound)
- These two controls span all modes -- they are "cross-cutting" in that they transform any mode's behavior

## Next Session Preview

Session 03 dives into **Shape mode with Transient** -- creating triggered envelopes and learning how CURVE and RAMP shape the slope character. You will patch individual triggers to create independent envelope patterns.
