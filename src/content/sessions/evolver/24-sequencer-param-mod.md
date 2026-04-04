---
title: "Session 24: Parameter Modulation Sequences"
module: "Sequencer"
session_number: 24
duration: 20
prerequisite: 23
output_type: patch
difficulty: intermediate
tags: [sequencer, parameter-modulation, filter-sequence, rhythmic, timbral]
instrument: evolver
reference: "Anu Kirk p.91-93, DSI Manual p.27-32"
---

# Session 24: Parameter Modulation Sequences

**Objective:** Use sequencer tracks to rhythmically modulate filter cutoff, resonance, delay, and other parameters -- turning the sequencer into a timbral animation source independent of pitch.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set LPF Freq to `50`, Resonance to `60`, 4-Pole ON. Set Seq 1 Dest = `FiL` (Filter Freq). Program steps 1-8: `20, 80, 40, 90, 10, 70, 50, 60`. Step 9 = `rST`. Press START/STOP and hold a key. The filter dances rhythmically.

## Warm-Up (2 min)

Load your acid bass sequence from Session 23. Press START/STOP and listen to the pitch pattern. So far you have used the sequencer for pitch only. Today you will route sequencer tracks to non-pitch destinations -- the sequencer becomes a rhythmic modulation source. Stop the sequence and load the basic patch.

## Setup

From the basic patch:
- Set **Osc 1 Shape** to `Saw`, **Level** to `50`
- Set **Osc 2 Shape** to `Pulse 50`, **Level** to `45`, **Fine** to `+3`
- Set **LPF Frequency** to `50`, **Resonance** to `60`, **4-Pole** ON
- Set **Key Amount** to `72`
- Set ENV 2 (VCA): **Attack** = `0`, **Decay** = `0`, **Sustain** = `100`, **Release** = `20`
- Set **BPM** to `120`, **Clock Divide** to `16th`
- Set **Trigger Select** to `Key, Gates Seq` (sequence plays only when you hold a key)

This gives a resonant, sustained sound that will clearly show filter modulation from the sequencer.

<div data-evolver-panel data-knobs="knob-osc-shapepw:0,knob-osc-level:50,knob-filter-frequency:50,knob-filter-resonance:60,knob-filter-keyamount:72" data-highlights="knob-filter-frequency:amber,knob-filter-resonance:amber,switch-4pole:blue" data-sections="filter,sequencer" data-zoom="false"></div>

## Exercises

### Exercise 1: Filter Cutoff Sequence (5 min)

Route a sequencer track to filter frequency for rhythmic brightness changes (Anu Kirk p.91-93).

1. Press **SEQ EDIT**, select **Seq 1**
2. Set **Seq 1 Destination** to `FiL` (Filter Frequency)
3. Program steps 1-8 with contrasting values: `20, 80, 40, 90, 10, 70, 50, 60`
4. Set **Step 9** to `rST`
5. Press **START/STOP**, then hold a note -- you should hear the filter cutoff jump to a different value on each step, creating a rhythmic brightness pattern while the pitch stays constant
6. Try smoother values: reprogram to `30, 40, 50, 60, 70, 80, 70, 60` -- a gradual filter sweep in 8 steps
7. The sequence values add to the base filter frequency. So step value 0 = no change from the LPF Frequency knob setting, and higher values open the filter more

### Exercise 2: Resonance Sequence (4 min)

Add a second track to modulate resonance independently.

1. Select **Seq 2**, set Destination to `RES` (Resonance)
2. Program Seq 2: `10, 70, 10, 70, 30, 90, 30, 90`, Step 9 = `rST`
3. Hold a note -- now both filter cutoff AND resonance change per step. Some steps have high resonance with low cutoff (quacky), others have low resonance with high cutoff (bright and smooth)
4. Try making Seq 2 a different length: set Step 7 to `rST` (7-step loop while Seq 1 is 8 steps). The different lengths create shifting patterns that do not repeat identically until step 56 (7 x 8). This is one of the sequencer's most powerful features (Anu Kirk p.78)

### Exercise 3: Multi-Parameter Sequences (6 min)

Use all 4 tracks for maximum animation.

1. Keep Seq 1 (filter) and Seq 2 (resonance) from above
2. Select **Seq 3**, set Destination to `DL1` (Delay 1 Level)
3. Set up a delay: **Delay 1 Time** = `1 Step`, **Feedback 1** = `30`
4. Program Seq 3: `0, 0, 80, 0, 0, 0, 80, 80`, Step 9 = `rST` -- delay only appears on certain steps
5. Select **Seq 4**, set Destination to `OAP` (All Osc Pulse Width)
6. Program Seq 4: `20, 30, 40, 50, 60, 70, 80, 90`, Step 9 = `rST` -- gradual pulse width sweep
7. Hold a note -- you now have 4 parameters changing simultaneously per step. The sound has rhythmic filter movement, variable resonance, delay that appears and disappears, and evolving pulse width

<div data-evolver-panel data-knobs="knob-filter-frequency:50,knob-filter-resonance:60,knob-delay-time:100,knob-delay-feedback1:30" data-highlights="switch-seq1:amber,switch-seq2:amber,switch-seq3:amber,switch-seq4:amber,knob-filter-frequency:blue,knob-delay-time:blue" data-sections="sequencer,filter,delay" data-zoom="false"></div>

**Save this patch** as your "Rhythmic Filter Sequence" patch.

### Exercise 4: Sequencer as Modulation via Mod Slots (3 min)

You can also route a sequencer track through a mod slot for scaled control (Anu Kirk p.91).

1. Stop the sequence. Set **Seq 3 Destination** to `OFF` and **Seq 4 Destination** to `OFF`
2. Set **Mod Slot 1**: Source = `Seq1` (Sequencer Track 1), Amount = `25`, Destination = `FiL`
3. Set **Seq 1 Destination** to `OAF` (back to pitch)
4. Reprogram Seq 1 with a melody: `48, 52, 55, 48, 60, 55, 52, 48`, Step 9 = `rST`
5. Hold a note and listen -- the sequencer drives pitch via its destination AND filter via the mod slot simultaneously. The same sequence values create both a melody and a filter pattern. The mod slot amount (25) scales the filter effect so it is subtle

## Exploration (optional, hyperfocus days)

- Route a sequence to `FM4` (FM 4->3 Amount) with Osc 3 and 4 active. FM amount changes per step create wild timbral shifts
- Route a sequence to `DT1` (Delay Time 1) with a short delay and high feedback. The delay pitch changes per step, creating pitched echo patterns
- Try Clock Mod destination: Seq 1 Dest = `CLO` (Clock Mod). Values around 40 = normal speed, below 40 = faster, above 40 = slower (Anu Kirk p.84-85)

## Output Checklist

- [ ] Rhythmic filter sequence patch saved with multi-parameter modulation
- [ ] Understand routing sequencer tracks to non-pitch destinations
- [ ] Heard the effect of different-length sequences creating shifting patterns
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The sequencer is far more than a note player -- routing tracks to filter, resonance, delay, FM, or any modulation destination creates rhythmic timbral animation
- Different-length sequences on different tracks create evolving, non-repeating patterns that are much more interesting than identical-length loops
- Sequencer tracks can also be used as mod slot sources for scaled, combined modulation alongside their primary destination

## Next Session Preview

Session 25 covers rests, tempo control, clock division, and variable step lengths -- the tools for creating complex rhythmic patterns with swing, syncopation, and tempo variation.
