---
title: 'Session 09: Pickup Machines — Your First Loop'
session_number: 9
duration: 25
prerequisite: 8
output_type: recording
difficulty: beginner
tags:
  - pickup-machine
  - looping
  - live-recording
  - overdub
  - machines
instrument: octatrack
reference: 'Elektron Manual Ch. 9.3, 17.1.4-17.1.5; Merlin Ch. 9'
section: Machines & Playback
instrument_type: instrument
---

# Session 09: Pickup Machines — Your First Loop

**Objective:** Record a live loop using the Pickup machine, overdub layers on top, and understand the Master/Slave relationship. This is the gateway to using the OT as a live looper.

> [!tip] If you only have 5 minutes
> Set Track 8 to Pickup machine (SRC Setup > MACH = PICKUP). Connect audio to Input A/B. Press [TRACK 8] + [REC1] to start recording. Play 4 bars. Press [TRACK 8] + [REC1] again to stop and loop. You are looping.

## Warm-Up (2 min)

From the basic project, select Track 1 and press [PLAY]. While it plays, mute and unmute using [FUNC] + [TRACK]. Practice the timing -- mute on the downbeat, unmute on the downbeat. This rhythmic precision will matter when recording loops.

## Setup

Start from the basic project (Track 1 with a drum loop, Tracks 2-8 empty). Connect an external sound source (synth, guitar, mic, phone) to **Input A/B** on the rear panel.

Check levels: press **[MIX]** and verify **GAIN A/B** shows a healthy signal (adjust until the level bar moves without clipping). Press **[NO]** to close.

## Exercises

### Exercise 1: Set Up the Pickup Machine (3 min)

1. Press **[TRACK 8]** to select the last track (keeping it separate from your drum loop on Track 1)
2. Press **[FUNC] + [SRC]** to open the SRC Setup page
3. Set **MACH** to `PICKUP` using Data Entry knob A
4. Set **INAB** to `ON` (enable Input A/B as the recording source)
5. Press **[NO]** to exit setup
6. Press **[SRC]** to see the main Source page -- you should see Pickup machine parameters

### Exercise 2: Record Your First Loop (8 min)

1. Press **[PLAY]** to start the sequencer (your drum loop on Track 1 should be playing)
2. Set the BPM to something comfortable: press **[TEMPO]**, turn the Level knob to adjust. Try `90` BPM
3. Now record the loop: press **[TRACK 8] + [REC1]** (hold Track 8, press REC1)
   - Recording starts -- the track icon shows a recording symbol
   - Play your external instrument for **4 bars** (listen to the drum loop for timing)
4. After 4 bars, press **[TRACK 8] + [REC1]** again to stop recording
   - The loop immediately starts playing back. You should hear your recording looped on top of the drums
5. If the timing is off, that's normal for the first try. Press **[TRACK 8] + [PLAY]** to stop the pickup loop. Press **[TRACK 8] + [REC1]** to record again

**Important**: The first loop you record on a Pickup machine sets the **Master loop length**. All subsequent Pickup machines will sync to this length.

### Exercise 3: Overdub (5 min)

1. With your loop playing, press **[TRACK 8] + [REC1]** again to start **overdubbing**
   - Now everything you play is added *on top of* the existing loop
2. Add a second layer -- maybe a bass note, a chord, or a percussive hit
3. Press **[TRACK 8] + [REC1]** to stop overdubbing
4. Listen to the layered result. Overdub again to add more. Each layer is mixed on top
5. If you overdo it, there is no per-layer undo -- you would need to start fresh. This encourages commitment: play with intention

### Exercise 4: Pickup Machine Controls (5 min)

With your loop playing, try these controls:

1. **Reverse**: Hold **[FUNC]** and press **[TRACK 8]** -- the loop plays backwards. Press again to go forward
2. **Volume**: Turn the **Level** knob to adjust the pickup track volume relative to your drums
3. **Effects**: Press **[FX1]** while on Track 8. Assign an effect (try the Echo Freeze Delay). Now your loop has effects. Adjust the delay time and feedback with the Data Entry knobs
4. **Stop the loop**: Press **[TRACK 8] + [STOP]** to stop the pickup machine playback
5. **Restart**: Press **[TRACK 8] + [PLAY]** to start it again

### Exercise 5: Master and Slave (2 min)

1. The loop you recorded on Track 8 is the **Master** -- it defines the loop length
2. If you set Track 7 to Pickup as well, it becomes a **Slave** -- its loop length automatically matches Track 8
3. Try it: press **[TRACK 7]**, **[FUNC] + [SRC]**, set MACH to `PICKUP`, INAB to `ON`
4. Record on Track 7: **[TRACK 7] + [REC1]** -- notice it automatically stops recording at the same loop length as Track 8
5. Now you have two synchronized loops. This is the foundation of live loop performance -- layer by layer, track by track

## Exploration (if time allows)

- **Multiply**: Press **[FUNC] + [UP]** while a Pickup machine is playing to double the loop length. The next overdub pass will be twice as long. Useful for building verse/chorus structures
- **Half-speed**: Press **[FUNC] + [DOWN]** to halve playback speed (drops pitch an octave). Creative for ambient textures
- **Clear the loop**: Press **[FUNC] + [PLAY]** on the Pickup track to clear its buffer and start fresh

## Output Checklist

- [ ] I set up a Pickup machine on Track 8
- [ ] I recorded a 4-bar loop from an external source
- [ ] I overdubbed at least one layer on top
- [ ] I used reverse playback
- [ ] I added an effect to the pickup track
- [ ] I understand that the first Pickup recording sets the Master loop length

## Key Takeaways

- **Pickup machines are the OT's looper**: Record, overdub, multiply. No sample management needed -- just press record and play
- **Master sets the length**: The first Pickup loop defines the length. Other Pickups (Slaves) follow
- **Overdub is additive**: Each pass layers on top. Commit to your playing -- there is no per-layer undo
- **Effects work on Pickup tracks**: FX1 and FX2 process the loop in real-time, just like any other track

## Next Session Preview

Next: we dive into the OT's effects engine. You have machines making sound -- now let's shape and mangle that sound through filters, delays, reverbs, and lo-fi degradation.
