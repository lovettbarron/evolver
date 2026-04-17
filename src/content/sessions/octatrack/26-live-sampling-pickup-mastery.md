---
title: 'Session 26: Pickup Machine Mastery — Loop, Overdub, Multiply'
session_number: 26
duration: 25
prerequisite: 25
output_type: recording
difficulty: intermediate
tags:
  - pickup-machines
  - master-slave
  - overdub
  - multiply
  - live-looping
  - loop-length
instrument: octatrack
reference: Elektron Manual Ch. 17.1.4-17.1.5; Merlin Ch. 9
section: Live Sampling & Looping
instrument_type: instrument
---

# Session 26: Pickup Machine Mastery — Loop, Overdub, Multiply

**Objective:** Go deep with Pickup machines. Master/Slave relationship: first loop sets length, subsequent Pickups sync to it. Multi-track live looping. Multiply (double the loop length and add new material). End with a 4-track layered loop performance from one external instrument.

> [!tip] If you only have 5 minutes
> Set Track 8 = Pickup (Master). [TRACK 8] + [REC1] to record 4 bars. Stop. Now set Track 7 = Pickup (Slave). [TRACK 7] + [REC1] — it auto-stops at the same loop length. Two synced loops from one instrument.

## Warm-Up (3 min)

You first met Pickup machines in Session 09. Session 25 introduced Track Recorders for capturing audio into the slot list. This session is the deep dive on Pickups specifically: layered looping, Master/Slave sync, and the Multiply gesture that doubles loop length on the fly. Press **[PLAY]** on a saved pattern. Imagine: 4 separate Pickup loops layering up, all synced, all overdubbing — a full performance from a single instrument input.

## Setup

Start from a clean project (or an empty bank in your `LAB` project). Connect your external instrument (synth, guitar, mic, phone) to **Input A/B** on the rear panel.

Verify input levels: press **[MIX]** and check **GAIN A/B** is showing healthy signal without clipping. Press **[NO]** to close.

Set up the four Pickup tracks now:
- **Track 5**: Pickup (will be a Slave for textures)
- **Track 6**: Pickup (will be a Slave for bass)
- **Track 7**: Pickup (will be a Slave for melody)
- **Track 8**: Pickup (will be the **Master** — sets loop length)

For each: **[TRACK N]** → **[FUNC] + [SRC]** → set MACH = `PICKUP`, INAB = `ON`. **[NO]** to close.

## Exercises

### Exercise 1: Master Loop — Set the Length (5 min)

The first Pickup recording defines the Master loop length. This is the most important moment of a live looping session — get it right.

1. Set BPM to a comfortable tempo: **[TEMPO]** + Level knob. Try `90` BPM
2. Press **[PLAY]** to start the sequencer (silence — nothing programmed)
3. Decide your loop length. **8 bars** is a good default for live performance (long enough to sit on, short enough to overdub responsively)
4. **Record the Master**: press **[TRACK 8] + [REC1]**. The TRACK 8 LED shows recording status
5. Play your foundational material on the external instrument for **exactly 8 bars** (count carefully — listen to a metronome via headphone CUE if you need it). Try a chord progression or rhythmic figure
6. After 8 bars, press **[TRACK 8] + [REC1]** again to stop. The loop immediately starts playing back. You should hear your 8-bar foundation looping
7. **The Master's length is now locked**. All other Pickup machines (Tracks 5-7) will sync to this 8-bar boundary

<div data-octatrack-panel
  data-sections="track,rec,scene"
  data-highlights="key-track-8:amber,key-rec-1:amber,slider-mix-crossfader:blue"
  data-zoom="track,rec"
></div>

### Exercise 2: Slave Pickup — Auto-Synced (5 min)

Slaves automatically match the Master's length.

1. With the Master loop playing on Track 8, set up Track 7 as a Slave Pickup
2. Press **[TRACK 7] + [REC1]** to start recording on Track 7
3. Play complementary material on your instrument — a counter-melody, a bass line, a different rhythm
4. **Don't watch the clock.** The Slave automatically stops recording when it hits the Master's loop boundary (8 bars). It then immediately starts playing back synced to the Master
5. Listen — Track 8 (Master) and Track 7 (Slave) loop together, perfectly in sync
6. Repeat for **Track 6** (bass): **[TRACK 6] + [REC1]** to record. Play bass material for the 8 bars. Stops automatically. Plays synced
7. Repeat for **Track 5** (texture): high pads, ambient drones, glitch sounds — anything you want as the textural layer
8. **Result**: 4 synced layers, all from the same single instrument input, all looping together

<div data-octatrack-panel
  data-sections="track,rec"
  data-highlights="key-track-5:amber,key-track-6:amber,key-track-7:amber,key-track-8:cyan,key-rec-1:amber"
></div>

### Exercise 3: Overdub on the Master (4 min)

Add layers to the existing Master loop. Overdubs are *additive* — they mix on top, no per-layer undo.

1. With all 4 Pickup tracks playing, focus on Track 8 (Master) — it currently has your foundational material from Exercise 1
2. Press **[TRACK 8] + [REC1]** to **start overdubbing**. The track LED indicates overdub mode (different from initial-record indicator)
3. Play additional material on the same external instrument — counter-rhythms, accents, additional notes
4. Each pass through the loop adds whatever you play *on top of* what's already there
5. Press **[TRACK 8] + [REC1]** again to stop overdubbing
6. The Master now has the original + your overdub mixed together. Listen
7. **Important**: there is no "undo last overdub" gesture. Each overdub commits permanently. This forces you to play with intention — a creative constraint, not a bug
8. To clear and start fresh: **[FUNC] + [PLAY]** on the Pickup track clears the buffer (firmware-dependent gesture; some require a different chord — check your manual)

### Exercise 4: Multiply — Double the Loop Length (4 min)

Multiply lets you grow a loop by adding a section that's twice as long.

1. With your 8-bar Master loop playing, press **[FUNC] + [UP]** on Track 8 (or check your firmware for the exact Multiply gesture — sometimes it's a dedicated PICKUP MENU option)
2. The loop length doubles to **16 bars**. The first 8 bars play back (your existing recording), and the next 8 bars are **silence ready for overdubbing**
3. Press **[TRACK 8] + [REC1]** to overdub during those new 8 bars. Play *new* material — a B-section, a verse counterpart to the original "chorus", etc.
4. Stop overdubbing at the 16-bar boundary
5. Now your Master is 16 bars long: bars 1-8 = original material, bars 9-16 = the new B-section
6. **Slave Pickups (Tracks 5-7) remain at 8 bars** — they loop *twice* under the Master's single 16-bar cycle. This polymeter creates a song-like build naturally
7. **Use case**: live looping into verse/chorus structure. Master holds a 16-bar A+B section, Slaves hold an 8-bar groove that repeats throughout

### Exercise 5: Performance Move — Mute, Reverse, Stop (3 min)

Use the Pickup tracks as performance instruments after they're recorded.

1. Mute a Pickup mid-loop: **[FUNC] + [TRACK 6]** (mute Track 6, the bass). The bass drops out. **[FUNC] + [TRACK 6]** again to bring it back
2. Reverse a Pickup playback: **[FUNC] + [TRACK 7]** holds, then... actually the reverse gesture is firmware-dependent — try **[FUNC] + [TRACK]** on the playing track (per Session 09's exploration). The loop plays backwards
3. Stop a single Pickup without stopping the sequencer: **[TRACK 5] + [STOP]**. Track 5 stops; others continue
4. Restart it: **[TRACK 5] + [PLAY]**. Resumes from the loop start
5. **Use scenes for live filtering** (Session 19): build Scene B with closed filters and lo-fi on all Pickup tracks, slide the crossfader to morph the entire 4-loop performance through processing in real-time

### Exercise 6: Save the Loops as Samples (1 min)

Pickup buffers are volatile. To preserve them across sessions, you need to capture them.

1. While a Pickup loop is playing, set up a Track Recorder (Session 25) with SRC = the pickup track number. Place a one-shot recorder trig
2. The captured Pickup loop is now in the Flex sample slot list — survives Project save/reload
3. Without this step, Pickup recordings are gone when you switch projects

## Output Checklist

- [ ] I set Track 8 as Master Pickup and recorded an 8-bar foundational loop
- [ ] I set Tracks 5-7 as Slave Pickups, each auto-synced to the Master length
- [ ] I overdubbed at least one layer on the Master
- [ ] I used Multiply to double the Master loop length and added new material in the second half
- [ ] I performed mute/unmute and reverse gestures on the running loops
- [ ] I have a 4-track synced layered loop performance running

## Key Takeaways

- **Master sets the length, Slaves sync.** The first Pickup recording defines the loop boundary; all subsequent Pickups conform
- **Overdub is additive — no per-layer undo.** Play with intention. Clear with [FUNC] + [PLAY] on the track if you need to start over
- **Multiply doubles the length** of the Master loop and creates space for new material in the new half. Slaves continue at the original length, creating natural polymeter
- **Pickup loops are volatile** — they live in record buffers, not in the slot list. Capture them via Track Recorder to preserve across sessions
- **Pickup tracks behave like normal tracks once recorded** — mutes, FX, scenes, reverse all work on them

## Next Session Preview

Next: live resampling. Pickups capture *external* audio. Track Recorders can capture the OT's *own* output (MAIN). Set the recorder source to MAIN, place a recorder trig, and you've sampled your own performance. Slice it, p-lock it, mangle it — the OT eating its own tail.
