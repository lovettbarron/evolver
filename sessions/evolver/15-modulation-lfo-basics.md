---
title: "Session 15: LFO Basics -- Shapes, Rates, Destinations"
module: "Modulation"
session_number: 15
duration: 25
prerequisite: 11
output_type: patch
difficulty: beginner
tags: [modulation, lfo, vibrato, tremolo, filter-animation, movement]
instrument: evolver
reference: "Anu Kirk p.70-71, DSI Manual p.22"
---

# Session 15: LFO Basics -- Shapes, Rates, Destinations

**Objective:** Use the Evolver's four LFOs to add vibrato, tremolo, and filter animation to sounds, understanding how shape, rate, and destination combine to create movement.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set LFO 1: Shape = Tri, Frequency = 50, Amount = 8, Destination = O1F (Osc 1 Frequency). Play a note. That wobble is vibrato -- LFO modulating pitch.

## Warm-Up (2 min)

Load your stereo split filter patch from Session 14. Play notes while the LFO modulates the split parameter, hearing the stereo movement. You already used LFOs for PWM strings and filter split -- today you will build a systematic understanding of what LFOs can do. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0`
- Verify all LFOs are at Amount `0`, Destination `OFF`

## Exercises

### Exercise 1: Vibrato -- LFO to Pitch (5 min)

Vibrato is the most fundamental LFO application: a small, regular pitch variation.

**LFO 1** (press LFO 1 switch):
1. Set **Shape** to `Tri` (triangle -- smoothest for vibrato)
2. Set **Frequency** to `50` (moderate speed)
3. Set **Amount** to `8` (subtle -- too much and it sounds out of tune)
4. Set **Destination** to `O1F` (Osc 1 Frequency)

Play a sustained note. You should hear a gentle pitch wobble -- classic vibrato.

5. Increase **Amount** to `15` -- you should hear wider, more dramatic vibrato
6. Increase to `30` -- you should hear it become a siren-like effect. This is too much for musical vibrato but useful for effects
7. Return to `8`. Change **Frequency** to `30` (slower) -- you should hear a slower, more dramatic vibrato
8. Change **Frequency** to `75` (faster) -- you should hear a tight, nervous vibrato
9. Return to Frequency `50`, Amount `8` -- this is the sweet spot for natural vibrato

"Classic vibrato = LFO to osc frequency" -- See Anu Kirk p.70-71, DSI Manual p.22

### Exercise 2: LFO Shapes (5 min)

Each LFO shape produces a different modulation character. Keep the vibrato settings and change only the shape:

1. **Tri** (Triangle) -- smooth up-and-down. You should hear natural, musical vibrato. Best for most modulation tasks
2. **RevSaw** (Reverse Sawtooth) -- ramps up, drops down instantly. You should hear an asymmetric wobble that rises and snaps back
3. **Saw** (Sawtooth) -- ramps down, jumps up. You should hear the opposite pattern -- drops and snaps up
4. **Square** -- jumps between two values. You should hear the pitch alternate between two pitches, like a trill
5. **Random** (Sample & Hold) -- changes to a random value once per cycle. You should hear unpredictable pitch steps. "Changes once per cycle for sample-and-hold effects" (DSI Manual p.22)

Return to **Tri** for the remaining exercises.

### Exercise 3: Tremolo -- LFO to Volume (5 min)

Tremolo is volume modulation -- the LFO raises and lowers the amplitude:

1. Set LFO 1 Amount to `0` (turn off vibrato)
2. Set **LFO 2**: Shape = `Tri`, Frequency = `50`, Amount = `40`, Destination = `VCA` (VCA Level)
3. Play a sustained note -- you should hear the volume pulsing up and down. This is tremolo
4. Increase **Amount** to `70` -- you should hear the sound cut in and out more dramatically
5. Change **Shape** to `Square` -- you should hear a choppy, gated tremolo effect where the volume switches between on and off
6. Change **Frequency** to `80` -- you should hear fast, helicopter-like tremolo
7. Change **Frequency** to `15` -- you should hear slow, gentle breathing

### Exercise 4: Filter Animation -- LFO to Filter (8 min)

Modulating the filter cutoff with an LFO creates the "wah" and sweeping effects used in countless sounds:

1. Set LFO 2 Amount to `0` (turn off tremolo)
2. Set **LPF Frequency** to `50`, **Resonance** to `50`, **4-Pole** ON
3. Set **LFO 3**: Shape = `Tri`, Frequency = `30`, Amount = `40`, Destination = `FiL` (Filter Frequency)
4. Play a sustained note -- you should hear the filter sweep back and forth, creating a "wah" effect
5. Increase **Resonance** to `70` -- you should hear the wah become more pronounced and vocal
6. Change LFO 3 Shape to **RevSaw** -- you should hear the filter ramp up slowly and drop back quickly, creating a rhythmic quality
7. Try **Key Sync** ON (press the Key Sync switch for LFO 3) -- now the LFO restarts with every note. You should hear the filter sweep start from the same point on every key press, making it more predictable and rhythmic

Now save a combined vibrato + filter animation patch:
8. Re-enable LFO 1: Amount `6`, Destination `OAF` (All Osc Frequency) for subtle vibrato
9. Keep LFO 3 on filter. Set **LPF Frequency** to `40`, **Resonance** to `45`

**Save this patch** as your "Vibrato + Filter LFO" patch.

See Anu Kirk p.70-71 ("Low Frequency Oscillators 1-4")

## Exploration (optional, hyperfocus days)

- LFO frequencies above 90 step in semitones up to 150 (middle C) for audio-rate effects (DSI Manual p.22). Set LFO 1 Destination to FiL, Frequency to 100, Amount to 30 -- you should hear a buzzy, ring-mod-like effect on the filter
- Try all 4 LFOs active simultaneously on different destinations: LFO 1 = vibrato, LFO 2 = tremolo, LFO 3 = filter, LFO 4 = split. Each at different rates for complex, evolving movement
- Sync an LFO to tempo: set Frequency past 150 to the sync values (e.g., "1 Step" means one LFO cycle per sequencer step). This locks modulation to your BPM

## Output Checklist

- [ ] Vibrato and/or filter animation patch saved
- [ ] Can set up vibrato (LFO to pitch), tremolo (LFO to VCA), and filter animation (LFO to filter)
- [ ] Understand how LFO shape, frequency, and amount interact
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- LFOs add movement to any parameter: pitch (vibrato), volume (tremolo), filter (wah/sweep), or anything else
- Shape determines the character of movement (smooth triangle, choppy square, random steps), frequency determines the speed, amount determines the depth
- Key Sync restarts the LFO on every note press, making modulation more predictable and rhythmic

## Next Session Preview

Next time you will explore the Evolver's 4 modulation slots -- flexible routing that lets any source (including audio-rate signals like oscillators and noise) modulate any destination. This is where the Evolver becomes a modulation powerhouse.
