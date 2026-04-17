---
title: 'Session 18: LFO Designer & Advanced Modulation'
session_number: 18
duration: 25
prerequisite: 17
output_type: patch
difficulty: advanced
tags:
  - lfo-designer
  - custom-lfo
  - sample-scrub
  - tremolo
  - p-lock-lfo
  - advanced-modulation
instrument: octatrack
reference: Elektron Manual Ch. 11.4.9
section: Modulation & LFOs
instrument_type: instrument
---

# Session 18: LFO Designer & Advanced Modulation

**Objective:** Use the LFO Designer to draw your own 16-step custom LFO waveshape. Assign it to sample START to scrub through audio. Assign it to volume for custom tremolo. Combine LFO Designer with p-locks for deeply evolving textures.

> [!tip] If you only have 5 minutes
> Open LFO setup. Set WAVE1 = DESIGNER. Press the designer key — 16 vertical bars on screen. Adjust each bar's height. Assign to SAMPLE START. The LFO now scrubs the sample in your custom shape.

## Warm-Up (2 min)

In Session 17, you used 8 preset LFO shapes. Now you'll draw your own. Press **[PLAY]** on your current pattern. Picture: a custom 16-step shape going up-down-up-down in a pattern only you designed, applied to sample start position. The sample scrubs in a way no preset wave can produce. That's where we're heading.

## Setup

Start from the `LAB` project. You need:
- Track 1: a longer sample loaded as Flex (try a 4-bar synth pad or texture, 5-10 seconds long)
- A trig placed on step 1 with a long-held note
- Track 2: a melodic sample with note trigs (for the tremolo exercise)

## Exercises

### Exercise 1: Open the LFO Designer (4 min)

The Designer is a 16-step custom waveshape editor.

1. Press **[TRACK 1]**, then **[FUNC] + [LFO]** to open LFO SETUP
2. Find **WAVE1** parameter — turn knob to `DESIGNER`. There are typically two designer slots (DESIGNER 1 and DESIGNER 2 or similar)
3. Press **[NO]** to exit setup
4. Now access the Designer itself: it's typically `[FUNC] + [WAVE]` or accessed via the LFO designer page (firmware-dependent — check the manual or screen prompts)
5. The screen shows 16 vertical bars representing 16 steps of the custom waveform
6. Use **[TRIG 1]** through **[TRIG 16]** to select which step to edit
7. Turn a Data Entry knob to set that step's height (-64 to +64, or 0-127 — depends on firmware)

### Exercise 2: Draw a Custom Shape (5 min)

Build a shape that no preset can produce.

1. With Designer open, draw an uneven ramp:
   - Steps 1-4: low-to-high ramp (0, 30, 60, 90)
   - Steps 5-8: hold high (100, 100, 100, 100)
   - Steps 9-12: rapid descent (90, 60, 30, 0)
   - Steps 13-16: low jitter (-30, -10, -40, -20)
2. Set this Designer as WAVE1 for Track 1
3. Set DEST1 = `SRC START` (the sample start position parameter)
4. DEPTH1 = `+60`, SPEED1 = `16` (one cycle per bar)
5. Press **[PLAY]** with the long-held note on step 1
6. The sample's playback position scrubs through the custom shape — instead of playing linearly, it follows your drawn pattern. Sounds like granular resampling or tape splice manipulation

<div data-octatrack-panel
  data-sections="param"
  data-highlights="key-param-lfo:amber"
></div>

### Exercise 3: Custom Tremolo via Volume (5 min)

Apply the LFO Designer to volume for non-uniform tremolo patterns.

1. Press **[TRACK 2]** (melodic). Open LFO setup
2. Set WAVE2 = `DESIGNER` (or use a second designer slot)
3. Draw a stuttering shape:
   - Steps 1, 5, 9, 13: high (`+50`)
   - All others: low (`-50`)
4. DEST2 = `AMP VOL`, DEPTH2 = `+40`, SPEED2 = `16`, MODE2 = `TRIG`
5. Press **[PLAY]**. The melodic sample plays in stuttering 4-on-the-floor accents — tremolo at 16th-note resolution but only on certain steps
6. Adjust the shape live — make the tremolo asymmetric, off-beat, irregular. Each shape change is a new groove

### Exercise 4: P-Lock the LFO Itself (5 min)

P-locking LFO parameters per step turns one LFO into many.

1. With LFO1 active on Track 1 (modulating SRC START), let it play
2. Hold **[TRIG 5]**. P-lock the LFO1 SPEED to `8` (twice as fast)
3. Hold **[TRIG 9]**. P-lock LFO1 DEPTH to `+90` (deeper)
4. Hold **[TRIG 13]**. P-lock LFO1 DEST to `FX1 FREQ` (target changes — modulates filter instead of sample start)
5. Press **[PLAY]**. The LFO behaves differently on each locked step:
   - Step 1-4: normal scrub
   - Step 5-8: faster scrub
   - Step 9-12: deeper scrub
   - Step 13-16: filter wobble instead
6. **The implication**: the LFO is itself a sequenced parameter. Patterns within patterns

### Exercise 5: Stack Designer + Preset LFOs for Compound Motion (4 min)

LFO1 = Designer (custom rhythmic shape). LFO2 = SINE (smooth bed). LFO3 = RANDOM (chaos sprinkle).

1. On Track 1's LFO page:
   - LFO1: DESIGNER, DEST = SRC START, DEPTH = `60`, SPEED = `16`
   - LFO2: SINE, DEST = FX1 FREQ, DEPTH = `40`, SPEED = `4` (slow filter sweep)
   - LFO3: RANDOM, DEST = AMP BAL, DEPTH = `30`, SPEED = `8`, MODE = `HOLD` (jittery panning)
2. Press **[PLAY]**. The single track now has:
   - Custom-shaped sample scrubbing
   - Slow filter sweep underneath
   - Random panning jitter on top
3. Three layers of modulation, all independent, all running in parallel. The track is alive
4. Save: **[FUNC] + [PROJ]**

## Exploration (if time allows)

- Use Designer with MODE = `ONE` and DEST = AMP VOL for a custom envelope per trig — bypass the AMP envelope's limitations
- Draw a "ramp + tail" shape (steady climb then quick drop) and apply to FX2 MIX for swelling delay washes
- Combine multiple Designer LFOs across different tracks to make a coordinated rhythmic gesture (e.g., all three drum tracks scrubbing samples in synchronized custom patterns)

## Output Checklist

- [ ] I drew a custom 16-step shape in the LFO Designer
- [ ] I assigned the custom LFO to SAMPLE START and heard the sample scrub
- [ ] I drew a different shape for AMP VOL and built custom tremolo
- [ ] I p-locked at least one LFO parameter (SPEED, DEPTH, or DEST) per step
- [ ] I stacked Designer + preset LFOs on the same track for compound modulation
- [ ] I saved the project

## Key Takeaways

- **LFO Designer** = custom 16-step waveshape — you draw it, the OT loops it as an LFO
- Apply Designer to **SAMPLE START** for granular-style scrubbing; to **VOLUME** for custom tremolo; to **FILTER FREQ** for irregular filter motion
- **P-lock LFO parameters** (SPEED, DEPTH, DEST) per step — the LFO itself becomes a sequenced parameter
- Stack Designer LFOs with preset LFOs for compound, multi-layer modulation that no single LFO could produce

## Next Session Preview

Next: Module 7 — Scenes & Crossfader. The crossfader is the OT's primary performance tool. Build Scene A and Scene B, morph between them with the slider, stack scenes for smooth progressions. Performance time.
