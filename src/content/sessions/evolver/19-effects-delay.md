---
title: "Session 19: Digital Delay -- Time, Taps, and Sync"
module: "Effects"
session_number: 19
duration: 25
prerequisite: 18
output_type: patch
difficulty: intermediate
tags: [effects, delay, multi-tap, sync, rhythmic, feedback]
instrument: evolver
reference: "Anu Kirk p.58-65, DSI Manual p.20-21"
---

# Session 19: Digital Delay -- Time, Taps, and Sync

**Objective:** Use the Evolver's 3-tap digital delay for rhythmic echo, ambient space, and sound design through multi-tap configuration, tempo sync, and feedback paths.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Delay 1 Time to `125`, Level to `70`, Feedback 1 to `50`. Play short notes and hear the echoes trail off. Now change Time to `1 Step` (past 150) and hear the delay lock to the sequencer clock.

## Warm-Up (2 min)

Load your evolving texture patch from Session 18. Play a sustained chord and listen to the modulation layers you built. That complexity came from stacking modulation sources. Today you enter the effects domain -- delay, feedback, and distortion -- where post-processing transforms raw synthesis into finished sounds. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0` (analog oscillators only for clarity)
- Set ENV 2 (VCA): **Decay** = `60`, **Sustain** = `0`, **Release** = `25` (short percussive notes so echoes are distinct)
- Verify **LPF Frequency** = `164` (wide open)

This gives a bright, short pluck so every delay tap is clearly audible.

## Exercises

### Exercise 1: Single-Tap Delay Basics (5 min)

The Evolver's delay sums L+R to mono input, provides up to 1 second at 16-bit 48kHz, and outputs to both channels equally (DSI Manual p.20).

1. Press **Delay 1** to select it
2. Set **Delay 1 Time** to `144` (long delay, close to 1 second)
3. Set **Delay 1 Level** to `75`

<div data-evolver-panel data-knobs="knob-delay-time:144,knob-delay-level:75,knob-delay-feedback1:0" data-highlights="knob-delay-time:amber,knob-delay-level:amber,switch-delay1:blue" data-sections="delay"></div>

4. Play a short note -- you should hear a clear echo roughly 1 second later. This is a basic single-tap delay
5. Change **Delay 1 Time** to `110` -- shorter delay, about 500ms. Play staccato notes and hear the slapback echo
6. Add **Feedback 1** = `50` -- play a note and hear it repeat multiple times, each echo quieter than the last. Feedback routes the delay output back to the delay input (DSI Manual p.20)
7. Try **Feedback 1** = `85` -- echoes barely decay. At `100` they would sustain indefinitely and eventually distort

**Key insight**: Time sets delay duration (0-150 for free, past 150 for sync). Level sets first echo volume. Feedback 1 sets number of repeats.

### Exercise 2: Tempo-Synced Delay (5 min)

Musical delay locks to your tempo. Delay time values past 150 provide synchronized times (DSI Manual p.20).

1. Set **Feedback 1** back to `40`
2. Scroll **Delay 1 Time** past `150` until you see `1 Step` -- the delay now equals one sequencer step in length
3. Press **START/STOP** to start the sequencer (you do not need sequences programmed -- you just need the clock running)
4. Play a rhythmic pattern of short notes -- the echoes lock perfectly to the beat
5. Change to `2 Steps` -- classic echo feel, wider spacing
6. Change to `4 Steps` -- spacious ambient echo
7. Try `1/2 Step` -- tight, doubled rhythm. The delay fills in between your notes
8. Stop the sequencer when done

Sync settings depend on BPM and Clock Divide. At 120 BPM / 8th notes, `1 Step` = one eighth note.

### Exercise 3: Multi-Tap Delay (8 min)

Three independent taps can create complex rhythmic delay patterns (Anu Kirk p.60).

1. Set **Delay 1 Time** to `110`, **Level** to `65`
2. Press **Delay 2** to select it. Set **Delay 2 Time** to `125`, **Level** to `50`
3. Press **Delay 3** to select it. Set **Delay 3 Time** to `140`, **Level** to `35`
4. Set **Feedback 1** to `30`

<div data-evolver-panel data-knobs="knob-delay-time:110,knob-delay-level:65,knob-delay-feedback1:30" data-highlights="switch-delay1:amber,switch-delay2:amber,switch-delay3:amber,knob-delay-time:amber,knob-delay-level:amber,knob-delay-feedback1:blue" data-sections="delay"></div>

5. Play a short note -- you should hear three distinct echoes at different time intervals, creating a rhythmic cascade. The levels decrease so the pattern fades naturally
6. Now change to synced times for a musical pattern: **Delay 1 Time** = `1 Step`, **Delay 2 Time** = `2 Steps`, **Delay 3 Time** = `4 Steps`
7. Play notes against the sequencer clock -- the three taps create a dotted rhythm pattern

**Important**: When using all 3 taps, keep individual levels moderate (35-70 each) to prevent overload distortion from the summed signals (DSI Manual p.20).

### Exercise 4: Feedback Paths and Sound Design (5 min)

Feedback 2 routes delay output back to the analog filter input, enabling extreme effects (DSI Manual p.20).

1. Keep the multi-tap setup from Exercise 3
2. Lower **LPF Frequency** to `80`, set **Resonance** to `50`
3. Set **Feedback 2** to `35` (Feedback 1 still at `30`)
4. Play a note -- the echoes now pass through the filter each time they repeat, getting progressively darker and more resonant. This is a fundamentally different character from Feedback 1
5. Now try very short delay times for metallic effects: **Delay 1 Time** = `10`, **Level** = `60`, **Delay 2 Time** = `15`, **Level** = `55`, **Delay 3 Time** = `20`, **Level** = `50`
6. Set **Feedback 1** to `55`, **Feedback 2** to `0`
7. Play a note -- this is not an echo anymore. The short delays create comb filtering, adding a metallic, resonant character to the sound

**Save this patch** as your "Rhythmic Delay" patch (use the synced multi-tap version from step 6 of Exercise 3).

## Exploration (optional, hyperfocus days)

- Route an LFO to Delay 1 Time (LFO Dest = `DT1`): at short delay times, this creates chorus and flange effects (Anu Kirk p.61-63). Try LFO Freq = `25`, Amount = `15`, Shape = `Tri` with Delay 1 Time = `85`
- Set Feedback 1 to `90` and play a single note -- listen to the delay build up and self-oscillate
- Load your sync lead from Session 05 and add the synced multi-tap delay. A solo sound becomes a rhythmic event

## Output Checklist

- [ ] Rhythmic delay patch saved with tempo-synced multi-tap configuration
- [ ] Understand Time / Level / Feedback 1 / Feedback 2 and what each controls
- [ ] Heard multi-tap delay creating rhythmic patterns at different sync values
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The Evolver's delay has three independent taps, each with separate time and level -- this allows complex rhythmic patterns from a single note
- Tempo-synced delay times (past value 150) lock echoes to the sequencer clock, making delay musical rather than random
- Feedback 2 routes echoes through the analog filter, progressively darkening repeats -- a fundamentally different sound from standard Feedback 1

## Next Session Preview

Session 20 explores the Evolver's tuned feedback and Karplus-Strong synthesis -- using delay and feedback to create plucked string, marimba, and physical modeling sounds. This is one of the Evolver's most unique capabilities.
