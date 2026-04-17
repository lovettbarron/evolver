---
title: "Session 30: MIDI Sequencer — Controlling External Gear"
module: "Songwriting & Arrangement"
session_number: 30
duration: 25
prerequisite: 29
output_type: technique
difficulty: advanced
tags: [midi, midi-sequencer, external-gear, cc, arpeggiator, brain, integration]
instrument: octatrack
reference: "Elektron Manual Ch. 15"
---

# Session 30: MIDI Sequencer — Controlling External Gear

**Objective:** Use the Octatrack's 8 MIDI tracks to sequence an external synthesizer. Program notes, automate CCs for filter sweeps, and engage the arpeggiator. By the end, the OT drives both its own audio tracks and an external instrument -- the brain of a multi-device setup.

> [!tip] If you only have 5 minutes
> Press [MIDI] to enter MIDI mode. On MIDI Track 1, set the MIDI channel to match your external synth. Enter Grid Recording and place 4 note trigs. Press [PLAY]. Your synth plays the sequence. The OT is now a MIDI sequencer.

## Warm-Up (2 min)

In Session 29, you built an arrangement from audio patterns. But the Octatrack is not just a sampler -- it has a full 8-track MIDI sequencer running alongside the 8 audio tracks. That means 16 tracks total: 8 for samples and effects, 8 for sequencing external synths, drum machines, and effects processors. Press **[MIDI]** to peek at MIDI mode (the screen changes to show MIDI tracks M1-M8). Press **[MIDI]** again to return to audio mode. You will move between these two worlds throughout this session.

## Setup

Connect the Octatrack's **MIDI OUT** to your external synthesizer's **MIDI IN** using a standard 5-pin DIN MIDI cable (or USB adapter if your synth requires it).

Set the external synth to receive on a known MIDI channel (e.g., channel 1). Consult your synth's manual if unsure.

On the Octatrack:
1. Press **[MIDI]** to switch to MIDI mode
2. Press **[TRACK 1]** to select MIDI Track 1 (M1)
3. Open the MIDI Setup: **[FUNC] + [SRC]** (or **[FUNC] + [PLAYBACK]** depending on firmware)
4. Set **CHAN** = `1` (matching your external synth's receive channel)
5. Set **NOTE** = `C4` (default root note -- you will override per step)
6. Press **[NO]** to close

Verify: press a **[TRIG]** key while in MIDI Live Recording or just press **[TRACK 1]** + **[TRIG 1]** in grid mode. If your synth makes a sound, the connection works.

<div data-octatrack-panel
  data-sections="func,nav"
  data-highlights="key-func-midi:amber,key-nav-pattern:blue"
></div>

## Exercises

### Exercise 1: Program a MIDI Melody (6 min)

Build a note sequence that plays on your external synth.

1. Press **[RECORD]** to enter Grid Recording on MIDI Track 1
2. Place trigs on steps 1, 5, 9, 13 (quarter notes). Hold each trig after placing it to access the NOTE page
3. **P-lock the note values**: hold **[TRIG 1]**, set NOTE = `C3`. Hold **[TRIG 5]**, set NOTE = `E3`. Hold **[TRIG 9]**, set NOTE = `G3`. Hold **[TRIG 13]**, set NOTE = `C4`. You now have a C major arpeggio ascending over 4 beats
4. Exit Grid Recording: **[RECORD]**
5. Press **[PLAY]** -- the external synth plays C3, E3, G3, C4 in rhythm. The OT is sequencing it
6. Add more notes: re-enter Grid Recording and place trigs on steps 3, 7, 11, 15. P-lock these to `D3`, `F3`, `A3`, `B3`. Now you have an 8-note melody
7. Adjust velocity: hold a trig, find the VEL parameter, set it lower for ghost notes or higher for accents. Velocity variation gives the MIDI sequence a human feel

### Exercise 2: Automate CCs for Filter Sweeps (5 min)

Control your external synth's parameters from the OT sequencer using MIDI CC messages.

1. On MIDI Track 1, navigate to the **CC page**: press **[LEFT/RIGHT]** arrows until you see the CC parameters (CC1, CC2, CC3... up to CC10 per MIDI track)
2. Find out which CC controls your synth's filter cutoff (often CC 74 or CC 71 -- check your synth's MIDI implementation chart)
3. Set **CC1** target to your synth's filter CC number: in the CC Setup page, assign CC1 = `74` (or whichever is correct)
4. Now **p-lock CC1** across steps to create a filter sweep:
   - Hold **[TRIG 1]**, set CC1 = `20` (filter mostly closed)
   - Hold **[TRIG 5]**, set CC1 = `50`
   - Hold **[TRIG 9]**, set CC1 = `90`
   - Hold **[TRIG 13]**, set CC1 = `127` (filter fully open)
5. Press **[PLAY]** -- the synth plays the melody AND the filter opens gradually across the 4 beats. You are automating the synth's parameters from the OT
6. **Add a second CC**: assign CC2 to resonance (often CC 71 or CC 77). P-lock it inversely (high → low as the filter opens). Now the filter opens while resonance drops -- a classic subtractive sweep

<div data-octatrack-panel
  data-sections="func,track"
  data-highlights="key-func-midi:amber,key-track-1:cyan"
></div>

### Exercise 3: The MIDI Arpeggiator (5 min)

Each MIDI track has a built-in arpeggiator that transforms held notes into rhythmic patterns.

1. On MIDI Track 1, navigate to the **ARP page** (press arrows until you find ARP mode, ARP speed, ARP range)
2. Set **ARP** = `ON`, **MODE** = `UP`, **SPD** = `1/16` (sixteenth notes), **RANGE** = `2` (2 octaves)
3. Press **[PLAY]** -- the arpeggiator takes each note trig and plays it as a rapid ascending pattern across 2 octaves. Your 4-note melody becomes a cascading sixteenth-note arpeggio
4. Try different modes:
   - **DOWN**: descending pattern
   - **UP-DOWN**: bouncing pattern (classic trance arp)
   - **RANDOM**: unpredictable note order
   - **TRUE**: plays notes in the order they were entered
5. Adjust **LENGTH** to control how many arp steps play per trig. Shorter = staccato bursts. Longer = flowing runs
6. **Combine with CCs**: the filter sweep from Exercise 2 still applies. The arp plays sixteenth notes while the filter opens over the bar. The combination creates complex, evolving sequences from simple input

### Exercise 4: Multi-Track MIDI Setup (4 min)

Use multiple MIDI tracks for a complete external setup.

1. Press **[TRACK 2]** (still in MIDI mode) to select MIDI Track 2
2. Set **CHAN** = `2` (or `10` for General MIDI drums, if your external gear supports it)
3. Program a simple pattern: kicks on 1 and 9, snares on 5 and 13 (using note values that trigger drum sounds on your external device)
4. Now you have two MIDI tracks: M1 sequencing a melodic synth, M2 sequencing a drum machine (or a second synth on a different channel)
5. Press **[MIDI]** to return to audio mode. Your audio tracks (with OT samples and effects) continue playing. Press **[MIDI]** again -- the MIDI sequences are independent of the audio tracks. Both run simultaneously
6. **The OT as brain**: 8 audio tracks handle sampling, looping, and effects. 8 MIDI tracks sequence external gear. Together: 16 tracks of integrated audio + MIDI composition from one box

### Exercise 5: Program Changes and Song Integration (3 min)

Switch your external synth's patches from the OT.

1. On MIDI Track 1, find the **PROG** (Program Change) parameter
2. Set a program change value that corresponds to a preset on your external synth. When the pattern starts, the OT sends the program change and your synth switches to that preset
3. **Combine with the Arranger** (Session 29): different patterns can have different program change values on the same MIDI track. When the Arranger switches from the verse pattern to the chorus pattern, the external synth changes presets automatically
4. Save the Part and the Project to preserve your MIDI setup

## Output Checklist

- [ ] I programmed a MIDI melody with p-locked note values on at least 4 steps
- [ ] I automated at least one CC parameter (filter cutoff or similar) across steps
- [ ] I engaged the MIDI arpeggiator and tried at least 2 modes
- [ ] I set up at least 2 MIDI tracks on different channels
- [ ] I understand the relationship: [MIDI] key toggles between audio tracks (1-8) and MIDI tracks (M1-M8), both play simultaneously

## Key Takeaways

- **Press [MIDI] to access the parallel universe**: 8 MIDI tracks live alongside the 8 audio tracks. Same sequencer, same p-locks, same conditional trigs -- but sending MIDI instead of playing samples
- **P-lock everything**: Note values, velocities, CCs, program changes -- all lockable per step, just like audio track parameters. The same muscle memory applies
- **CCs are your remote control**: Any parameter your external synth exposes via MIDI CC can be automated from the OT sequencer. Filter, resonance, envelope, effects -- all controllable per step
- **The arpeggiator multiplies complexity**: A simple 4-note sequence becomes a 32-note cascade. Combine with CC automation for sequences that sound far more complex than they are to program
- **One box to rule them all**: Audio tracks for samples and processing, MIDI tracks for external gear. The Arranger sequences both. This is the OT's endgame -- the central brain of a hybrid setup

## Next Session Preview

Next: the capstone composition session. You have every tool in the Octatrack's arsenal: sampling, sequencing, effects, scenes, parts, the arranger, and now MIDI control. Session 31 walks you through composing a complete piece from a blank project to a documented, arranged song.
