---
title: "Session 23: Pitch Sequences -- Melodies and Basslines"
module: "Sequencer"
session_number: 23
duration: 25
prerequisite: 22
output_type: patch
difficulty: intermediate
tags: [sequencer, pitch, melody, bassline, polyphony, transposition]
instrument: evolver
reference: "Anu Kirk p.80-86, p.103, DSI Manual p.27-30"
---

# Session 23: Pitch Sequences -- Melodies and Basslines

**Objective:** Program melodic pitch sequences including basslines with specific note values, fake polyphony using separate oscillator tracks, and live transposition from the keyboard.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Seq 1 Dest = `OAF`. Program a minor bassline: steps 1-8 = `36, 36, 48, 48, 43, 43, 46, 46`. Step 9 = `rST`. Set BPM = `110`, Clock Divide = `16th`. Press START/STOP. Instant acid bassline.

## Warm-Up (2 min)

Load your first sequence patch from Session 22. Press START/STOP and listen to the melody you programmed. You understand steps, resets, and triggers. Today you will program specific musical intervals and build a proper bassline. Stop the sequence and load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0`, **Osc 4 Level** to `0`
- Set **LPF Frequency** to `70`, **Resonance** to `55`, **4-Pole** ON
- Set **Env Amount** (filter) to `60`, ENV 1: **Decay** = `50`, **Sustain** = `10`
- Set ENV 2 (VCA): **Decay** = `50`, **Sustain** = `80`, **Release** = `15`
- Set **BPM** to `110`, **Clock Divide** to `16th`
- Set **Key Off/Xpose** to `Off` (disconnect keyboard pitch from oscillators so the sequencer has full control)

This creates a resonant filter sound ideal for bass sequences.

## Exercises

### Exercise 1: The Note Value System (5 min)

Sequencer values map to pitches at quarter-tone resolution. Two step values = one semitone. The reference table is in Anu Kirk Appendix A (p.103).

1. Press **SEQ EDIT**, select **Seq 1**, set Destination to `OAF` (Osc All Freq)
2. Key reference values (with Key Off/Xpose at Off, Osc Freq at C0):
   - `0` = C0 (lowest), `24` = C1, `48` = C2, `60` = C3 (middle C area), `72` = C4
   - Each +2 = one semitone up. So `50` = D2, `52` = E2, `54` = F#2, etc.
3. Program a C minor scale ascending: steps 1-8 = `48, 52, 55, 60, 64, 67, 72, 76`
4. Set **Step 9** to `rST`
5. Press **START/STOP** -- you should hear a C minor scale stepping up. If intervals sound wrong, double-check your values

**Quick reference**: From any note, +2 = half step, +4 = whole step, +7 = perfect 4th, +10 = minor 3rd, +14 = perfect 5th, +24 = octave.

### Exercise 2: Programming a Bassline (7 min)

Build a proper bass sequence with rhythmic interest using rests.

1. Stop the sequence. Program Seq 1 with this pattern (a driving minor bassline):
   - Step 1 = `36`, Step 2 = `36`, Step 3 = `48`, Step 4 = `48`
   - Step 5 = `43`, Step 6 = `43`, Step 7 = `46`, Step 8 = `oFF`
   - Step 9 = `36`, Step 10 = `36`, Step 11 = `48`, Step 12 = `oFF`
   - Step 13 = `43`, Step 14 = `50`, Step 15 = `48`, Step 16 = `46`
2. No Reset needed -- this is a full 16-step pattern
3. Press **START/STOP** -- you should hear a rhythmic bass pattern with the oFF steps creating syncopation
4. Adjust **LPF Frequency** between `50` and `90` while the sequence plays -- hear how the filter changes the bass character from deep and dark to bright and acid
5. Increase **Resonance** to `70` -- the classic acid squelch appears on the filter sweeps

**Save this** as your "Acid Bass Sequence" patch.

### Exercise 3: Fake Polyphony -- Two Oscillator Tracks (7 min)

By assigning different sequencer tracks to different oscillators, you can create chord-like sequences from this monophonic synth (Anu Kirk p.81-82).

1. Stop the sequence. Turn **Osc 1 Level** to `45`, **Osc 2 Level** to `45`
2. Set **Seq 1 Destination** to `O1F` (Osc 1 Freq -- left channel)
3. Set **Seq 2 Destination** to `O2F` (Osc 2 Freq -- right channel)
4. Program Seq 1 (melody): `52, 42, 46, 36, 38, 28, 38, 42`, Step 9 = `rST`
5. Program Seq 2 (harmony, a 5th above): `66, 56, 60, 50, 52, 42, 52, 56`, Step 9 = `rST`
6. Press **START/STOP** -- you hear two pitch lines playing simultaneously, one from each channel in stereo. The left oscillator plays the melody, the right plays the harmony
7. Try different intervals for Seq 2: a 3rd above, an octave below, or a completely independent counter-melody
8. Set **Output Pan** to `Mono` to hear both lines blended, then back to `St1` for stereo separation

### Exercise 4: Live Transposition (4 min)

The keyboard can transpose a running sequence on the fly (Anu Kirk p.87-88).

1. Set **Key Off/Xpose** back to `-24` (reconnect keyboard)
2. Set **Trigger Select** to `KeyGates Seq Rst` (gated mode with reset)
3. Press **START/STOP** -- the sequence is loaded but silent until you hold a key
4. Hold **middle C** -- the sequence plays, transposed to your key. Release and it stops
5. Hold **G** above middle C -- the entire sequence shifts up a 5th
6. Play different notes to transpose the sequence around. Each key press restarts from step 1
7. This is the performance mode -- you are playing the sequence like an instrument

## Exploration (optional, hyperfocus days)

- Program the "fake arpeggiator" from Anu Kirk p.89: Seq 1 = `60, 68, 74, 84, 74, 68`, Step 7 = `rST`. With KeyGates Seq Rst trigger mode, play keys to create arpeggiated patterns
- Try different Seq lengths: make Seq 1 = 16 steps and Seq 2 = 5 steps. The different loop lengths create shifting, evolving patterns (Anu Kirk p.78)
- Add your rhythmic delay from Session 19 to the bassline

## Output Checklist

- [ ] Sequenced bassline patch saved with specific note values and rhythmic rests
- [ ] Understand the quarter-tone step value system (+2 = semitone, +24 = octave)
- [ ] Created a two-oscillator "polyphonic" sequence with separate tracks
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Sequencer step values use quarter-tone increments: +2 per semitone, +24 per octave. Memorize a few anchor values (48 = C2, 60 = C3) and calculate intervals from there
- Assigning different sequencer tracks to different oscillator frequencies creates fake polyphony -- each oscillator can play a different melodic line
- Live transposition (KeyGates Seq Rst trigger mode) turns programmed sequences into playable instruments -- the keyboard shifts the entire pattern

## Next Session Preview

Session 24 explores parameter modulation sequences -- using sequencer tracks to control filter cutoff, delay time, FM amount, or any other destination. The sequencer becomes a rhythmic modulation source, not just a note player.
