---
title: "Session 01: Navigation & The Basic Patch"
module: "Foundations"
session_number: 1
duration: 20
prerequisite: null
output_type: patch
difficulty: beginner
tags: [navigation, basic-patch, save, recall, foundations]
instrument: evolver
reference: "Anu Kirk p.5-8, DSI Manual p.1-3, p.9-14"
---

# Session 01: Navigation & The Basic Patch

**Objective:** Learn to navigate the Evolver's interface and program the basic patch from scratch so you have a reliable starting point for every future session.

> [!tip] If you only have 5 minutes
> Skip to Exercise 2, step 1. Enter the oscillator values from the basic patch table. Save the patch to Bank 1, Program 128. You now have a home base.

## Warm-Up (2 min)

Play any note on the keyboard. Turn any knob. Watch the LCD display change. That is the whole interface -- knobs change values, the display shows what you changed. Press the PROGRAM switch to go back to program selection.

## Setup

Turn on your Evolver. Make sure audio outputs are connected to your monitors or headphones. You should hear the currently loaded factory program when you play a key.

## Exercises

### Exercise 1: Navigate Programs and Banks (5 min)

1. Press the **PROGRAM** switch so the LCD shows the program number and name
2. Turn the **PARAM 1** knob to scroll through programs -- you should hear different sounds as you move through them
3. Turn the **PARAM 2** knob to change banks (1-4) -- Bank 3 programs are sequencer-based (hit Start/Stop to hear them), Bank 4 programs 1-19 are drones (always playing)
4. Press **+/YES** and **-/NO** to step through programs one at a time -- useful for careful browsing
5. Find **Bank 1, Program 128** -- this is the factory init patch, a good starting point. Play a few notes to hear what it sounds like

See Anu Kirk p.5 ("Before We Start"), DSI Manual p.1-2 ("Quick Start"), p.9 ("Basic Operation")

### Exercise 2: Program the Basic Patch (10 min)

Navigate to an empty program slot (Bank 1, Program 128 is a good choice). We will now enter the basic patch values from Anu Kirk p.7-8. This is your "lab bench" -- a neutral, known state where you can isolate the effect of any single parameter change.

Enter these values by selecting each oscillator/section and turning the corresponding knob:

**Oscillators (press OSC 1-4 switches to select each):**
1. Set **Osc 1 Frequency** to `C0`, **Fine** to `0`, **Shape** to `Saw`, **Level** to `50`, **Glide** to `0`
2. Set **Osc 2** to identical values: Frequency `C0`, Fine `0`, Shape `Saw`, Level `50`, Glide `0`
3. Set **Osc 3 Frequency** to `C0`, **Fine** to `0`, **Shape** to `1` (sine wave), **Level** to `50`, **Glide** to `0`, **FM 4->3** to `0`, **Ring Mod 4->3** to `0`
4. Set **Osc 4** to identical values as Osc 3, with **FM 3->4** to `0`, **Ring Mod 3->4** to `0`
5. Set **Sync 2->1** to `OFF`, **Osc Slop** to `0`
6. Set **Noise Volume** to `0`

**Filter:**
7. Set **LPF Frequency** to `164` (wide open), **Resonance** to `0`, **2/4 Pole** to `2P`
8. Set **Env Amount** to `0`, **Velocity** to `0`, **Key Amount** to `0`, **Audio Mod** to `0`, **Split** to `0`
9. Set filter envelope (ENV 1): **Attack** `0`, **Decay** `0`, **Sustain** `100`, **Release** `0`

**VCA:**
10. Set **VCA Level** to `0`, **Env Amount** to `100`, **Velocity** to `0`
11. Set VCA envelope (ENV 2): **Attack** `0`, **Decay** `0`, **Sustain** `100`, **Release** `0`
12. Set **Output Pan** to `St1`, **Volume** to `100`

**Everything else OFF:**
13. Set **Highpass** to `0`, **Feedback Level** to `0`, **Distortion** to `0`, **Output Hack** to `0`
14. Set all 3 **Delay** taps: Time `0`, Level `0`. Set **Feedback 1** to `0`, **Feedback 2** to `0`
15. Set all 4 **LFOs**: Amount `0`, Destination `OFF`
16. Set all 4 **Mod Slots**: Source `OFF`, Amount `0`, Destination `OFF`

Now play middle C. You should hear a bright, buzzy, sustained sawtooth tone in stereo. If you hear modulation, filtering, echo, or distortion, something is still set wrong.

See Anu Kirk p.7-8 ("The Basic Patch"), DSI Manual p.14-26 (all parameter definitions)

### Exercise 3: Save Your Patch (3 min)

1. Press the **WRITE** switch -- the LCD shows "Write? P:xxx B:x"
2. Use PARAM 1 to select **Program 128**, PARAM 2 to select **Bank 1**
3. Press **+/YES** to confirm the save
4. Now save a backup: press **WRITE** again, select a different location (e.g., Bank 2 Program 128), press **+/YES**
5. Navigate away to any other program, then come back to Bank 1 Program 128 -- your basic patch should be there, sounding exactly the same

See DSI Manual p.9 ("Saving a Program")

## Exploration (optional, hyperfocus days)

- Try the **COMPARE** switch while editing a program -- it toggles between your edits and the stored version
- Check the **Pot Mode** setting in Global parameters (press GLOBAL) -- **Relative** is recommended for learning (DSI Manual p.13). Try switching to **Jump** mode to feel the difference
- Navigate to Global page 1 and check **Transpose** and **Fine Tune** settings -- these affect the entire keyboard

## Output Checklist

- [ ] Basic patch programmed and saved to Bank 1, Program 128
- [ ] Backup copy saved to a second location
- [ ] Can navigate between programs and banks confidently
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The Evolver interface is simple: select a section (oscillator, filter, etc.), turn knobs to edit, LCD shows values
- The basic patch is your "lab bench" -- a neutral starting point where every parameter is at a known, minimal state
- Always save patches to two locations so you have a backup

## Next Session Preview

Next time you will explore the factory presets -- over 500 sounds organized by type. You will pick 5 favorites that show off what the Evolver can do, giving you sonic landmarks to aim for as you learn.
