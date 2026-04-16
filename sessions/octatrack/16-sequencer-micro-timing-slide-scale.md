---
title: "Session 16: Micro Timing, Slide Trigs, Scale Settings"
module: "Sequencer Deep Dive"
session_number: 16
duration: 25
prerequisite: 15
output_type: recording
difficulty: advanced
tags: [sequencer, micro-timing, slide-trigs, scale, polymetric, swing, time-signature]
instrument: octatrack
reference: "Elektron Manual Ch. 12.6-12.7"
---

# Session 16: Micro Timing, Slide Trigs, Scale Settings

**Objective:** Use micro timing to shift individual trigs off the grid by up to 23/384th of a step (humanization). Use slide trigs to glide parameters smoothly between steps (portamento). Use scale settings to set per-track lengths (polymetric), time signature, and per-pattern tempo.

> [!tip] If you only have 5 minutes
> Hold a [TRIG]. Find MICRO TIMING. Nudge it by +5 (slightly late). Release. That step now plays microscopically late — that's how humanization works on the OT. Now do it on a few steps with negative values too.

## Warm-Up (2 min)

You've made patterns generative (Session 15). They evolve. But they still feel like a machine — perfectly on the grid. This session adds the human element: tiny timing shifts, smooth glides, polyrhythms. Press **[PLAY]** on a current pattern. Notice how rigid the timing feels. Time to break the grid.

## Setup

Start from the `LAB` project. Have a working multi-track pattern (drums + at least one melodic track with note trigs and pitch p-locks from Session 14). Press **[PLAY]** to confirm sound.

## Exercises

### Exercise 1: Micro Timing — Per-Step Nudges (6 min)

Shift individual trigs forward or backward by fractions of a step.

1. Press **[STOP]**. Press **[TRACK 3]** (your hat track)
2. **Hold [TRIG 3]**. Look for the **MICRO TIMING** parameter (sometimes labeled MICRO or μT). Range is typically -23 to +23 (in 23/384ths of a step)
3. Set MICRO = `+5` (slightly late). Release
4. Hold **[TRIG 7]** + MICRO = `-3` (slightly early). Release
5. Hold **[TRIG 11]** + MICRO = `+8` (laid back)
6. Hold **[TRIG 15]** + MICRO = `-2` (pushed)
7. Press **[PLAY]**. The hat track has subtle timing variation — feels human, not machine
8. **Pro tip**: positive values = later (laid back, drag); negative = earlier (pushed, ahead). Most "humanization" uses small positives on offbeats

<div data-octatrack-panel
  data-sections="trig,data"
  data-highlights="key-trig-3:cyan,key-trig-7:cyan,knob-data-a:amber"
></div>

### Exercise 2: Push and Pull — Genre Feel (4 min)

Different genres have characteristic timing pushes/pulls.

1. **Hip-hop drag**: snare slightly late. Hold your snare trig (step 5 or 13) + MICRO = `+8`
2. **Drum & bass push**: hat 16ths slightly early. Hold all 16th-note hat trigs + MICRO = `-3` to `-5`
3. **Boom-bap swing**: kick on the beat, snare slightly late, hat behind the kick. Combine all three
4. Press **[PLAY]**. The pattern feels wholly different from the same trigs at MICRO = 0
5. Save snapshot of timings — write them in your notes for that style

### Exercise 3: Slide Trigs — Parameter Glides (5 min)

Slide trigs interpolate parameter values between consecutive trigs.

1. Press **[TRACK 2]** (your melodic with pitch p-locks from Session 14)
2. Confirm steps 1, 5, 9, 13 have pitch p-locks (e.g., 0, +5, +7, +10)
3. Now make step 5 a slide trig: in many firmware, hold [TRIG 5] + press a SLIDE key (or convert via the trig types menu)
4. The trig icon changes — slide trig has a distinctive look
5. Press **[PLAY]**. Pitch from step 1 (`0`) glides smoothly to step 5's value (`+5`) over the 4 steps in between
6. Make step 9 also a slide trig — pitch glides from `+5` to `+7`
7. Make step 13 a slide trig — pitch glides from `+7` to `+10`
8. Result: continuous portamento melody — like a synth with full glide
9. Slide works on ANY parameter, not just pitch — try it on filter cutoff, FX wet level, volume

### Exercise 4: Scale Settings — Per-Track Length (5 min)

Each track can have a different pattern length — polyrhythms, polymeters, evolving textures.

1. Press **[FUNC] + [PAGE]** (or **[SCALE]** key, varies by firmware) to enter the SCALE menu
2. Two modes: **MASTER LENGTH** (whole pattern) and **PER-TRACK** (each track independent)
3. Switch to PER-TRACK mode if not already
4. With Track 3 (hat) selected, set its length to `12 steps` instead of `16`
5. Now Track 3 loops every 12 steps while other tracks loop every 16. Press **[PLAY]**
6. Listen — the hat shifts position relative to the kick over multiple bars. After 4 cycles of the master pattern (16 × 4 = 64 steps), Track 3 has cycled 5+ times (12 × 5 = 60, then partial)
7. Try Track 2 = `15 steps`, Track 1 = `16 steps`. The kick anchors, snare and hat drift. Polymeric magic
8. Reset to all 16 if it gets too chaotic for your composition needs

### Exercise 5: Scale — Time Signature & Per-Pattern Tempo (3 min)

Two more scale-page powers.

1. In the SCALE menu, find **TIME SIGNATURE**. Default is `4/4`. Try `3/4` (waltz), `5/4`, `7/8` (odd meter)
2. The pattern length adjusts — at `5/4`, you have 20 steps per bar instead of 16
3. Place trigs accordingly to feel the new meter
4. Find **PER PATTERN TEMPO** — set this pattern to a different BPM than the project default
5. Now switching from this pattern to another (via PTN + TRIG) auto-changes tempo
6. **Use case**: pattern A01 = 90 BPM hip-hop, pattern A02 = 140 BPM DnB — pattern change becomes tempo + style change

## Exploration (if time allows)

- Combine MICRO timing + slide trigs + p-locked pitch — fully expressive monophonic synth from a single sample
- Set a track to length `7` for a polyrhythmic shaker that never lines up the same way twice across long sections
- Set TIME SIGNATURE = `7/8` and build a pattern in odd meter — escape 4/4

## Output Checklist

- [ ] I added MICRO timing to at least 4 steps with mixed positive/negative values
- [ ] I created a "feel" by combining MICRO timings (drag, push, etc.)
- [ ] I converted at least 2 trigs to slide trigs and heard parameter interpolation
- [ ] I set a track to a non-16 length and heard polymeter
- [ ] I tried a non-4/4 time signature on at least one pattern
- [ ] I saved the project

## Key Takeaways

- **Micro timing** = per-step humanization in 23/384ths of a step (positive = late, negative = early)
- **Slide trigs** = parameter interpolation between steps — works on pitch, filter, FX, anything
- **Per-track length** = polymetric patterns. Tracks of different lengths drift against each other
- **Time signature + per-pattern tempo** unlocks compositions in odd meters and tempo-changing arrangements

## Next Session Preview

Next: Module 6 — modulation. The OT has 3 LFOs per track. Set LFO1 to wobble the filter, LFO2 to pan, LFO3 to vary delay time. Movement in every dimension.
