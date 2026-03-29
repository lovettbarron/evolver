---
title: "Session 22: Sequencer Basics -- Steps, Destinations, Triggers"
module: "Sequencer"
session_number: 22
duration: 25
prerequisite: 21
output_type: patch
difficulty: intermediate
tags: [sequencer, steps, destinations, triggers, basics, melody]
instrument: evolver
reference: "Anu Kirk p.75-79, DSI Manual p.27-32"
---

# Session 22: Sequencer Basics -- Steps, Destinations, Triggers

**Objective:** Understand the Evolver's 4-track, 16-step sequencer by programming a simple 8-step melody and learning how step values, destinations, resets, and trigger modes work.

> [!tip] If you only have 5 minutes
> Load the basic patch. Press SEQ EDIT. Select Seq 1. Set Destination to `OAF` (Osc All Freq). Program steps 1-8: `52, 42, 46, 36, 38, 28, 38, 42`. Set step 9 to `rST` (Reset). Press START/STOP. You have a melody.

## Warm-Up (2 min)

Load your dirty lead patch from Session 21. Play a few notes to hear the distortion character. Everything so far has been played live from the keyboard. Today you meet the sequencer -- the Evolver's most distinctive feature, which turns it into a self-playing instrument. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0`, **Osc 4 Level** to `0` (analog only for clarity)
- Verify **Trigger Select** (in Misc Params) = `Seq or Key` -- envelopes fire from both sequencer and keyboard
- Verify **Key Off/Xpose** = `-24`
- Set **BPM** to `120`
- Set **Clock Divide** to `Eighth` (eighth notes, so BPM x 2 = 240 steps per minute)

## Exercises

### Exercise 1: Your First Sequence (7 min)

The sequencer is 4 rows of 16 steps. Each row (track) has a destination parameter it modulates. Step values range from 0-100 (Anu Kirk p.75-79).

1. Press **SEQ EDIT** to enter sequencer mode (the shared knobs now control step values)
2. Press **Seq 1** to select Track 1
3. Set **Seq 1 Destination** to `OAF` (Osc All Freq) -- the sequencer will control the pitch of all oscillators
4. Program the following 8 steps by turning each step knob:
   - Step 1 = `52` (C), Step 2 = `42` (F below), Step 3 = `46` (Ab), Step 4 = `36` (Eb below)
   - Step 5 = `38` (E below), Step 6 = `28` (Bb below), Step 7 = `38` (E), Step 8 = `42` (F)
5. Set **Step 9** to `rST` (Reset) -- past value 100. This creates an 8-step loop instead of 16
6. Press **START/STOP** -- your sequence plays. You should hear a repeating 8-note melody
7. Press **START/STOP** again to stop

**Key insight**: When a sequence destination is set to oscillator frequency, each knob increment equals half a semitone (quarter-tones). So a change of 2 in step value = 1 semitone (DSI Manual p.29).

### Exercise 2: Understanding Step Values and Reset (5 min)

1. While the sequence plays, try changing individual step values -- you hear the melody change in real time
2. Move the **Reset** point: set Step 9 back to `0`, then set **Step 5** to `rST` -- now you have a 4-step loop. Set Step 5 back to `38` and put Reset back at Step 9
3. Set **Step 13** to `rST` -- this has no effect because Step 9 already resets first. Only the first Reset in a track matters (Anu Kirk p.77)
4. Press **RESET** button -- the sequence jumps back to step 1 immediately, whether playing or stopped. It also acts as all-notes-off (DSI Manual p.29)

### Exercise 3: Trigger Modes (6 min)

The Trigger Select parameter determines when envelopes fire. This changes how the sequencer interacts with your keyboard (DSI Manual p.24-25).

1. Open **Misc Params** and find **Trigger Select**
2. Set to `Seq Only` -- now the keyboard does not trigger any sound. Only the sequencer fires the envelopes. Press START/STOP and listen -- same melody, but keys do nothing
3. Set to `Key Only` -- now the sequencer runs but does not trigger envelopes. Press START/STOP, then play keys on the keyboard. The sequencer still steps through values (you can see the step LEDs advance) but only your key presses produce sound. Each key press plays whatever pitch the sequencer happens to be on at that moment
4. Set to `Key, Gates Seq` -- the sequence only plays when a key is held. Release the key and it goes silent. Press and hold a key -- the sequence plays, transposed to your key pitch. This is the "motif" mode (Anu Kirk p.87)
5. Set to `KeyGates Seq Rst` -- same as above but the sequence restarts from step 1 every time you press a key. This is the most useful performance mode
6. Return to `Seq or Key` for the default behavior

### Exercise 4: Keyboard Entry and Rests (5 min)

You can program sequences from the keyboard, which is faster than turning knobs (DSI Manual p.29-30).

1. Press **WRITE** then **START/STOP** -- you are in sequence record mode
2. Play 8 notes on the keyboard: the sequencer automatically advances to the next step after each note. The step LEDs show your progress
3. Press **START/STOP** or **WRITE** to finish recording
4. Press **START/STOP** to hear your keyboard-entered sequence
5. Now add rests: in Seq 1 only, set **Step 4** past Reset to `oFF`. Set **Step 8** to `oFF`
6. Play the sequence -- steps 4 and 8 are silent. Rests in Sequence 1 affect all four tracks (DSI Manual p.27-28)

**Save this patch** as your "First Sequence" patch.

## Exploration (optional, hyperfocus days)

- Try different Clock Divide settings: `16th` for fast arpeggiated patterns, `Quartr` for slower, more deliberate melodies
- Change BPM while the sequence plays to find the right feel
- Use Trigger Select `Key Steps Seq` -- each key press advances one step of the sequence, letting you "play" the sequence at your own tempo

## Output Checklist

- [ ] Simple 8-step melody sequence saved
- [ ] Understand step values (0-100), Reset (creates shorter loops), and Rest/oFF (creates silence)
- [ ] Tried at least 3 Trigger Select modes and understand how they change sequencer-keyboard interaction
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The Evolver's sequencer is 4 tracks of 16 steps each, running in parallel -- each track modulates a chosen destination parameter
- Step values for oscillator frequency use quarter-tone increments (2 steps = 1 semitone). Reset creates shorter loops. Rest (oFF) in Track 1 creates silence across all tracks
- Trigger Select is the key to making the sequencer musical -- it determines whether keys, the sequencer, or both control when notes sound

## Next Session Preview

Session 23 dives deeper into pitch sequences -- programming melodic basslines with specific note values, using the MIDI-to-sequencer value conversion table, and creating polyphonic sequences with separate oscillator control.
