---
title: 'Session 07: Cycle -- Rhythmic Modulation with INTONE'
session_number: 7
duration: 25
prerequisite: 6
output_type: patch
difficulty: intermediate
tags:
  - cycle-mode
  - intone
  - rhythm
  - polyrhythm
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Cycle Mode
---

# Session 07: Cycle -- Rhythmic Modulation with INTONE

**Objective:** Push INTONE further to create integer-ratio rhythmic relationships between channels, producing polymetric modulation textures from a single module.

> [!tip] If you only have 5 minutes
> Shape mode, MODE=Cycle, RUN=high, TIME at 11 o'clock. Turn INTONE fully clockwise. Patch IDENTITY and 6N to two different filter cutoffs. IDENTITY cycles once while 6N cycles six times -- a 1:6 polyrhythm from one knob position.

## What You'll Learn

- How INTONE's integer ratios create polyrhythmic patterns
- Patching individual channels as rhythmically related modulators
- Using TIME to shift the entire rhythmic grid
- Musical applications of harmonic-series modulation

## What You'll Need

- Mannequins Just Friends
- A steady voltage for RUN (offset module or gate held high)
- Patch cables (4-6)
- Multiple modulation destinations (VCFs, VCAs, other parameters)
- Optionally: a clock source to compare against JF's rhythms

## Starting State

| Control | Position |
|---------|----------|
| SOUND/SHAPE | Shape |
| MODE | Cycle |
| TIME | 11 o'clock |
| INTONE | 12 o'clock |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock |
| RUN | Patched high (steady voltage) |

## Warm-Up (2 min)

Confirm all six channels are cycling with RUN high and INTONE at noon (synchronized movement). Patch MIX output to your mixer. Slowly turn INTONE clockwise and watch the LEDs spread to different rates -- this is the territory you will explore in this session.

## Exercises

### Exercise 1: Integer Ratios (8 min)

<div data-just-friends-panel
  data-highlights="knob-jf-intone:amber,jack-jf-identity-out:blue,jack-jf-2n-out:blue,jack-jf-3n-out:blue"
  data-knobs="knob-jf-intone:127"
></div>

1. Turn INTONE fully clockwise. Now the channels are at their maximum harmonic spread: IDENTITY = 1x, 2N = 2x, 3N = 3x, 4N = 4x, 5N = 5x, 6N = 6x
2. Patch **IDENTITY output** to a filter cutoff -- this is your slowest rhythm (the "downbeat")
3. Patch **2N output** to a VCA -- this is 2x the rate (an "eighth note" to IDENTITY's "quarter note")
4. Patch **3N output** to a different modulation destination -- this is 3x the rate, creating a cross-rhythm against 2N
5. Listen for the moment all three channels realign -- this is the polyrhythmic "resolution point." The pattern repeats every IDENTITY cycle
6. Adjust TIME to find a speed where the rhythmic pattern is musically useful (not too fast for modulation, not too slow to perceive)

### Exercise 2: Subharmonic Territory (8 min)

<div data-just-friends-panel
  data-highlights="knob-jf-intone:amber"
  data-knobs="knob-jf-intone:20"
></div>

1. Turn INTONE fully counter-clockwise. Now channels are compressed below the fundamental rate
2. Watch the LEDs -- they move at nearly the same speed but slightly offset. The higher channels (5N, 6N) are actually slower than IDENTITY
3. This is the subharmonic territory: instead of integer multiples, you get fractional relationships
4. Slowly bring INTONE back toward noon and listen to how the channels converge. At noon they lock into perfect unison
5. Find a position between fully CCW and noon where the channels create a slow, evolving phase pattern -- this is excellent for ambient modulation

> [!info] Listen For
> Subharmonic INTONE creates drifting, phase-music textures. The channels almost sync but never quite lock together, producing slow beating patterns. This is fundamentally different from the crisp polyrhythms of clockwise INTONE.

### Exercise 3: Rhythmic Modulation Patch (5 min)

1. Set INTONE to about 2 o'clock (moderate harmonic spread)
2. Patch **IDENTITY** to a VCO pitch (through an attenuator) -- slow pitch wobble
3. Patch **3N** to a filter cutoff -- 3x rate rhythmic filter sweep
4. Patch **6N** to a VCA -- 6x rate tremolo
5. Adjust TIME until the combined effect feels musical -- you are modulating three parameters at harmonically related rates from a single module
6. Try different CURVE settings: exponential (CW) makes the modulation more aggressive; logarithmic (CCW) makes it smoother

## Output

Save your rhythmic modulation patch:
- **Polyrhythmic modulation:** INTONE 2 o'clock, TIME 11 o'clock, destinations for IDENTITY/3N/6N
- **Subharmonic drift:** INTONE 9 o'clock, note which channels created the most interesting beating patterns
- Document the CURVE setting that worked best for each modulation destination

## Next Session Preview

Session 08 explores **Volley and Floom** -- two RUN modes in Cycle that add dynamics to cycling. Volley gates the cycling on and off, while Floom smoothly crossfades the cycling amplitude with CV. These add performance control to the LFO textures you have been building.
