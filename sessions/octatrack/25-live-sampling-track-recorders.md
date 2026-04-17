---
title: 'Session 25: Track Recorder Basics — Capture External Audio'
session_number: 25
duration: 25
prerequisite: 24
output_type: recording
difficulty: intermediate
tags:
  - track-recorder
  - live-sampling
  - recording
  - sampling
  - flex-machine
instrument: octatrack
reference: 'Elektron Manual Ch. 9.1-9.2, 17.1.1-17.1.3; Merlin Ch. 9'
section: Live Sampling & Looping
instrument_type: instrument
---

# Session 25: Track Recorder Basics — Capture External Audio

**Objective:** Record external audio with the track recorder, play it back immediately via a Flex machine, and explore sequenced vs. manual sampling. This is different from Pickup machines -- Track Recorders write to the sample slot list, giving you full control over the captured audio.

> [!tip] If you only have 5 minutes
> Select Track 1 (Flex machine). Press [REC1] + [TRACK 1] to arm the recorder. Press [REC1] to start recording from Input A/B. Play something. Press [REC1] to stop. The recording is in the Flex slot list -- Track 1 plays it immediately.

## Warm-Up (3 min)

Load your basic project. Press [PLAY] to start a drum pattern on Track 1. Mute it ([FUNC] + [TRACK 1]). Now unmute on the next downbeat. Practice this 3 times -- you need tight timing for sampling.

## Setup

Start from a project with a drum pattern on Track 1. Set Tracks 2-4 to Flex machines (if not already). Connect an external sound source to Input A/B.

Verify input levels: press **[MIX]**, check **GAIN A/B** is set appropriately. Press **[NO]** to close.

## Exercises

### Exercise 1: Manual Sampling (7 min)

1. Press **[TRACK 2]** to select Track 2 (Flex machine, empty sample slot)
2. Open the Recording Setup: press **[FUNC] + [REC1]** to enter RECORDING SETUP 1
3. Set **SRC** (source) to `INAB` (Input A/B)
4. Set **RLEN** (recording length) to `16` steps (one bar at the current scale)
5. Press **[NO]** to close setup
6. Start your drum pattern: press **[PLAY]**
7. Start recording: press **[TRACK 2]** + **[REC1]** -- recording begins immediately
8. Play something on your external instrument for one bar
9. Recording stops automatically after 16 steps (because you set RLEN)
10. The recording is now in Track 2's record buffer (Flex slot list, recording buffer 2)
11. Press **[TRIG 1]** on Track 2 while in Grid Recording mode to place a trigger -- you should hear your recording play back on beat 1

**What happened**: The track recorder captured audio from Input A/B into a record buffer. That buffer lives in the Flex sample slot list. Track 2's Flex machine automatically points to it.

### Exercise 2: Sequenced Sampling with Recorder Trigs (8 min)

Manual sampling works, but **sequenced sampling** is tighter because the sequencer controls timing.

1. Press **[TRACK 3]** to select Track 3 (Flex machine)
2. Open Recording Setup: **[FUNC] + [REC1]**, set SRC to `INAB`, RLEN to `16` steps
3. Press **[NO]** to close
4. Enter Grid Recording: press **[RECORD]**
5. Now hold **[REC1]** and press **[TRIG 1]** -- this places a **Recorder Trig** on step 1. The LED shows a different color/pattern than a regular trig
6. Press **[RECORD]** to exit Grid Recording
7. Also place a regular sample trig on Track 3: **[RECORD]** > **[TRIG 1]** on Track 3
8. Press **[PLAY]** to start the pattern
9. On the first loop, the recorder trig fires on step 1 -- it records Input A/B for 16 steps into Track 3's record buffer
10. On the second loop, the same recorder trig fires again -- it re-records, overwriting the previous capture
11. Play your external instrument -- each loop you hear the new recording replace the old one. The Flex machine on Track 3 plays it back immediately

**Key insight**: Recorder trigs let the sequencer handle timing. The recording is always perfectly in sync.

### Exercise 3: One-Shot Recorder Trigs (5 min)

Sometimes you want to record once, not every loop.

1. On Track 3, hold the recorder trig you placed (hold **[TRIG 1]** while **[REC1]** is held)
2. Press **[YES]** to arm it as a **One-Shot** trig -- the LED changes to indicate one-shot status
3. Press **[PLAY]** -- the recorder fires once, captures your input, then disarms itself
4. Subsequent loops play the captured audio but do not re-record
5. To re-arm: press **[YES]** while holding the one-shot trig, or press **[FUNC] + [YES]** to arm all one-shot trigs

This is the equivalent of Ableton Live's "record a clip once" workflow -- capture something, then it loops forever until you decide to re-record.

### Exercise 4: Playback and Manipulation (5 min)

Now that you have recorded audio in the Flex slot list:

1. Press **[TRACK 2]** to select the track with your first recording
2. Press **[SRC]** -- you can see the sample slot. Turn knobs to adjust STRT (start point), LEN (length)
3. Press **[AMP]** -- adjust the envelope. Try shortening the release for a chopped feel
4. Press **[FX1]** -- add a filter. Sweep the cutoff while your recording loops
5. Try **parameter locking** the pitch: enter Grid Recording, hold a TRIG key, and turn the PTCH knob on the SRC page. Each step can have a different pitch. Your recording is now a melodic instrument
6. Open the Audio Editor (**[AED]**) to see your recording waveform. You can trim, slice, and set loop points on captured audio just like any other sample

## Exploration (if time allows)

- **Record the main output**: Change the track recorder source to `MAIN` in Recording Setup. Now you are recording the OT's own output. Place a recorder trig, and you capture a snapshot of your current mix as a sample. This is live resampling
- **Record the cue output**: Route specific tracks to cue (hold [CUE] + [TRACK]), then set recorder source to `CUE`. This lets you record a submix (only the tracks you chose) while the main output continues unaffected
- **Dedicating a pattern for recording**: Per Merlin's guide, set up one pattern purely with recorder trigs (no playback trigs). Use it as a "recording station" -- switch to it, capture audio, switch away, use the captured samples elsewhere

## Output Checklist

- [ ] I recorded external audio manually using Track Recorder + REC1
- [ ] I set up a sequenced Recorder Trig that captures audio every loop
- [ ] I converted a Recorder Trig to One-Shot (capture once, play forever)
- [ ] I manipulated captured audio with pitch, filter, and start point changes
- [ ] I understand the difference between Track Recorders (→ slot list) and Pickup machines (→ loop buffer)

## Key Takeaways

- **Track Recorders write to the Flex sample slot list** -- captured audio is instantly available to any Flex machine in any pattern
- **Recorder Trigs automate the process** -- the sequencer handles timing, so recordings are always tight
- **One-Shot Trigs capture once** -- record something good and keep it looping without re-recording
- **Track Recorders ≠ Pickup Machines**: Recorders give you a sample in the slot list (editable, sliceable, lockable). Pickups give you a live looper (overdub, multiply, real-time performance). Use both for different purposes

## Next Session Preview

Next: Pickup Machine mastery. You used Pickups briefly in Module 3 -- now we go deep with multi-layer loops, Master/Slave synchronization, and building a full live set from nothing but a single input.
