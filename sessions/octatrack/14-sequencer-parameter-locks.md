---
title: 'Session 14: Parameter Locks & Sample Locks'
session_number: 14
duration: 25
prerequisite: 13
output_type: patch
difficulty: intermediate
tags:
  - sequencer
  - p-locks
  - parameter-locks
  - sample-locks
  - melodic-sequence
  - per-step
instrument: octatrack
reference: Elektron Manual Ch. 12; Merlin Ch. 4 (parameter locks)
section: Sequencer Deep Dive
instrument_type: instrument
---

# Session 14: Parameter Locks & Sample Locks

**Objective:** Master the OT's most powerful compositional feature — parameter locks. Lock any parameter on any step, swap samples per step (sample locks), and build a melody from a single sample using pitch p-locks.

> [!tip] If you only have 5 minutes
> Hold a [TRIG] step. While holding, turn any Data Entry knob. That step is now p-locked — its parameter value differs from the rest of the pattern. Release. Magic.

## Warm-Up (2 min)

In Session 10, you p-locked the filter cutoff on a few steps. That was a teaser. This session is the full method. Press **[PLAY]** on any pattern with at least one trig per beat. Imagine: every step could have completely different parameter values. That's what we're about to unlock.

## Setup

Start from the `LAB` project. You need:
- Track 1: a drum kit Flex slot OR a sliced break loop (if you completed Session 06)
- Track 2: a melodic sample — single note, pitched (a synth one-shot, a sung note, a piano hit)
- Trigs already placed on both tracks (e.g., trigs on 1, 5, 9, 13)

## Exercises

### Exercise 1: Your First Parameter Lock (4 min)

The fundamental gesture: hold a trig, turn a knob, release.

1. Press **[STOP]**. Press **[TRACK 1]**. Place trigs on **[TRIG 1, 5, 9, 13]**
2. Press **[FX1]** to view the FX1 page (assuming Multi Mode Filter from Session 10)
3. Set FREQ = `100` (open filter). All trigs play with cutoff at 100
4. **Hold [TRIG 5]** — keep it pressed. The screen shows "STEP 5 LOCKED" with current parameter values
5. While still holding, turn **knob B** (FREQ) down to `40`. The screen updates — step 5's locked FREQ value
6. **Release [TRIG 5]**. Step 5 LED color changes (often brighter or different hue) — that's the visual indicator of a locked step
7. Press **[PLAY]**. You hear: kick, kick (filtered), kick, kick. Step 5 is filtered, others are open

<div data-octatrack-panel
  data-sections="trig,param,data"
  data-highlights="key-trig-5:amber,key-param-fx1:cyan,knob-data-b:cyan"
></div>

### Exercise 2: Multiple P-Locks on One Step (4 min)

A single step can lock as many parameters as you want.

1. With step 5 already locking FREQ, hold **[TRIG 5]** again
2. Switch to FX2 by pressing **[FX2]** (still holding TRIG 5? — release and re-hold if needed; some firmware requires re-hold per parameter page)
3. While holding TRIG 5 on the FX2 page (Echo Freeze if you set it up), turn knob A (TIME) to `16` (half-note)
4. Release. Step 5 now has p-locks on FREQ (FX1) AND TIME (FX2) AND any others you add
5. Press **[PLAY]** — step 5 is filtered AND has a different delay time

### Exercise 3: Build a Filter Sweep Across the Pattern (4 min)

P-lock the same parameter on multiple steps to create motion.

1. Stop the sequencer. On Track 1, hold **[TRIG 1]** + set FREQ to `30`
2. Hold **[TRIG 5]** + set FREQ to `60`
3. Hold **[TRIG 9]** + set FREQ to `90`
4. Hold **[TRIG 13]** + set FREQ to `120`
5. Press **[PLAY]**. Each kick opens the filter further — manual filter sweep without an LFO
6. **Slide trig trick** (from Session 13): convert each of those trigs to a slide trig — the FREQ now interpolates smoothly from one step to the next instead of jumping

### Exercise 4: Sample Locks — Different Sample Per Step (5 min)

Beyond parameter locks, the OT lets you lock the SAMPLE itself per step.

1. Press **[TRACK 1]**. Make sure track is FLEX with a slot list (at least 4 samples loaded — kick, snare, hat, clap)
2. Trigs on 1, 5, 9, 13 with kick (slot 1) — pattern plays kicks
3. Hold **[TRIG 5]** — while holding, press the **YES** key (or in some firmware, hold + tap a different slot). The sample lock menu opens
4. Choose a different slot (say, slot 2 = snare). Confirm
5. Release. Step 5's sample is now snare instead of kick — visible by a different LED color or indicator
6. Repeat for steps 9 (= hat from slot 3), 13 (= clap from slot 4)
7. Press **[PLAY]**. Pattern is now: kick, snare, hat, clap — full drum pattern from a single track using sample locks

### Exercise 5: Build a Melody from a Single Note Sample (6 min)

This is the OT's killer compositional move.

1. Press **[TRACK 2]**. Make sure it has a melodic single-note sample (e.g., a synth note in C2)
2. Set up some trigs: place trigs on **[TRIG 1, 3, 5, 7, 9, 11, 13, 15]** (every other step)
3. Press **[SRC]** to see the source page. The PITCH parameter is on this page (knob B on most firmware)
4. With trigs in place but pitch all default, you hear the same note 8 times — boring
5. Now lock pitches per step:
   - Hold **[TRIG 1]**, set PITCH to `0` (C, root)
   - Hold **[TRIG 3]**, set PITCH to `+3` (Eb, minor 3rd)
   - Hold **[TRIG 5]**, set PITCH to `+5` (F)
   - Hold **[TRIG 7]**, set PITCH to `+7` (G, fifth)
   - Hold **[TRIG 9]**, set PITCH to `+10` (Bb, minor 7th)
   - Hold **[TRIG 11]**, set PITCH to `+12` (C, octave)
   - Hold **[TRIG 13]**, set PITCH to `+7` (G)
   - Hold **[TRIG 15]**, set PITCH to `+5` (F)
6. Press **[PLAY]**. You just composed a minor pentatonic melodic line from one sample
7. **The point**: the OT is a melodic sequencer disguised as a sampler. Pitch p-locks turn any sample into a playable instrument

## Exploration (if time allows)

- Combine sample locks AND p-locks on the same step: hold [TRIG 9], change the sample to a snare AND lock the FX1 reverb wet to 80. The snare on step 9 has different sound AND different FX
- P-lock the LFO depth or destination per step (Module 6 preview) for moving modulation
- View all p-locks on a track: press **[FUNC] + [TRACK]** in some modes to highlight which steps have locks (firmware-dependent)
- Save the project — your p-locked patterns are valuable

## Output Checklist

- [ ] I p-locked at least one parameter on at least one step
- [ ] I p-locked multiple parameters on the same step
- [ ] I built a manual filter sweep using p-locks across 4+ steps
- [ ] I sample-locked at least one step to a different slot
- [ ] I built a melody from a single sample using pitch p-locks across 8 steps
- [ ] I saved the project with my p-locked pattern

## Key Takeaways

- **Hold [TRIG] + turn knob = p-lock**. The single most-used gesture for OT composition
- **Sample locks** swap the sample per step — turns one track into a multi-sample instrument
- **Pitch p-locks** turn a single-note sample into a melodic instrument — the OT's secret weapon
- A single step can carry many p-locks (parameter locks AND sample locks AND pitch locks AND FX locks) — full sound design per step

## Next Session Preview

Next: conditional trigs and fill mode. Make patterns generative — trigs that fire every other loop, on a 50% chance, only during fills. Patterns that evolve over 32 loops without ever repeating identically.
