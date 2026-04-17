---
title: 'Session 27: Live Resampling — Recording Internal Audio'
session_number: 27
duration: 20
prerequisite: 26
output_type: recording
difficulty: intermediate
tags:
  - resampling
  - internal-audio
  - track-recorder
  - main-output
  - self-sampling
  - slice
instrument: octatrack
reference: Elektron Manual Ch. 17.2
section: Live Sampling & Looping
instrument_type: instrument
---

# Session 27: Live Resampling — Recording Internal Audio

**Objective:** Record the Octatrack's own output back into itself. Set a Track Recorder source to MAIN or to a specific track, capture a performance, then slice and mangle the result. This is live resampling -- the OT eating its own tail.

> [!tip] If you only have 5 minutes
> Load any playing pattern. On an empty track, press [FUNC] + [REC1] and set SRC = MAIN, RLEN = 16. Place a one-shot recorder trig on step 1. Press [PLAY]. The OT captures its own output into a Flex slot. Press [TRACK] + [SRC] to assign that slot, and you are playing back a recording of yourself.

## Warm-Up (2 min)

In Session 25, you used Track Recorders to capture *external* audio from Input A/B. In Session 26, Pickup machines looped external instruments. Now you turn the recorder inward. Instead of SRC = INAB, you set SRC = MAIN (the main output bus) or SRC = a specific track number. Everything the OT produces becomes raw material for further manipulation. Press **[PLAY]** on a saved pattern and listen -- in a moment, you will capture and re-perform this exact output.

## Setup

Load a project with a good-sounding pattern (use work from any previous session). You want at least 3-4 tracks actively producing sound -- drums, bass, melody, texture. The richer the source, the more interesting the resample.

Designate **Track 4** as the resampling track (it will hold the captured audio). Make sure Track 4 is currently empty (no machine assigned, or set to Flex with no sample loaded).

<div data-octatrack-panel
  data-sections="track,rec"
  data-highlights="key-rec-1:amber,key-track-4:amber"
></div>

## Exercises

### Exercise 1: Capture the Main Output (5 min)

Record everything the OT is producing into a single Flex sample.

1. Press **[FUNC] + [REC1]** to open the Recorder Setup for Recorder 1
2. Set **SRC** = `MAIN` (this captures the stereo main output bus -- everything you hear)
3. Set **RLEN** = `16` (record 16 steps = 1 bar at default scale). For a longer capture, try `64` (4 bars)
4. Set **TRIG** = `ONE` (one-shot: records once, then stops)
5. Press **[NO]** to close
6. On Track 4, enter Grid Recording: **[RECORD]** + **[TRIG 1]** to place a recorder trig on step 1
7. Exit Grid Recording: **[RECORD]**
8. Press **[PLAY]** -- the pattern plays. On step 1, the recorder captures the main output for 16 steps (or 64). The recording lands in Track 4's Flex sample slot
9. After the recording completes (the REC1 LED stops flashing), press **[TRACK 4]** + **[SRC]** to verify the sample is loaded. You should see the waveform of your captured output

### Exercise 2: Play Back the Resample (4 min)

Now you have a recording of your own performance. Use it as a sample.

1. On Track 4, place triggers in Grid Recording: a simple 4-on-the-floor, or a scattered pattern -- experiment
2. Press **[PLAY]** and listen. Track 4 is now playing back a captured slice of your pattern's output. The other tracks continue playing live. You hear the original *and* the captured version layered
3. **Mute the original tracks** ([FUNC] + [TRACK 1], [FUNC] + [TRACK 2], etc.) to hear *only* the resample. The captured audio now stands alone
4. **Pitch it**: hold a trig on Track 4, go to the SRC page, adjust PTCH. Pitched-down resamples create instant bass drones. Pitched-up creates glitchy textures
5. **Reverse it**: on Track 4's Playback page, set DIR = REV. The resample plays backwards -- instant reverse cymbal, reversed melody, backwards drums

### Exercise 3: Slice the Resample (4 min)

Slicing a resample gives you surgical control over which moments to replay.

1. Press **[TRACK 4]** then open the Audio Editor: **[FUNC] + [CUE]** (or your firmware's AED shortcut)
2. In the slice menu, create **8 or 16 even slices** across the captured waveform
3. Exit the Audio Editor
4. On Track 4's SRC page, set **SLICE** = `ON`
5. Now each trig's **STRT** parameter selects a different slice. Place 16 trigs and p-lock STRT on each: step 1 = slice 1, step 5 = slice 8, step 9 = slice 3 -- rearrange the order of your own performance
6. The result: a chopped, rearranged version of what the OT was playing 30 seconds ago

<div data-octatrack-panel
  data-sections="track,rec"
  data-highlights="key-track-4:amber,key-rec-1:cyan,key-track-cue:blue"
></div>

### Exercise 4: Resample a Single Track (3 min)

Instead of capturing MAIN (everything), capture one specific track for focused mangling.

1. Press **[FUNC] + [REC2]** to open Recorder 2's setup
2. Set **SRC** = `T1` (Track 1 -- your drum track, for example)
3. Set **RLEN** = `64` (4 bars to capture variation from conditional trigs)
4. Set **TRIG** = `ONE`
5. Place a recorder trig and capture Track 1's output alone
6. Assign the captured sample to Track 5 (a spare Flex track)
7. Now you have an isolated drum recording. Add heavy effects on Track 5: lo-fi, delay, compressor. The original drums on Track 1 stay clean; Track 5 has the mangled version. Blend with the Level knob or use scenes to crossfade between clean and destroyed drums

### Exercise 5: Feedback Resampling (2 min)

The experimental frontier: resample the resample.

1. Set Recorder 1's SRC back to `MAIN`
2. Place a recorder trig on Track 4 (which is already playing back a resample from Exercise 2)
3. Press **[PLAY]** -- the OT records its output (which includes Track 4's playback of the *previous* resample) into a *new* recording
4. Each generation degrades and transforms the audio. After 2-3 passes, the original material is unrecognizable -- it has become something entirely new
5. **Caution**: feedback resampling can build volume rapidly. Keep the Level knob on Track 4 below unity to prevent clipping. This is a creative tool, not a default workflow

## Output Checklist

- [ ] I captured the main output into a Flex sample using a Track Recorder with SRC = MAIN
- [ ] I played back the resample on a separate track and heard it layered with the live pattern
- [ ] I sliced the resample and rearranged the slice order via p-locked STRT values
- [ ] I resampled a single track (SRC = T1) for isolated processing
- [ ] I attempted at least one feedback resample pass (resampling the resample)

## Key Takeaways

- **SRC = MAIN captures everything**: The main output bus includes all unmuted tracks, effects, and scene processing. One recorder trig = one snapshot of your entire mix
- **SRC = Track N isolates one voice**: Capture a single track for focused slicing and mangling without affecting the others
- **Slicing resamples is composition**: Rearranging slices of your own output creates new sequences from existing material. This is the OT's version of tape cut-up
- **Feedback resampling degrades intentionally**: Each generation adds artifacts, shifts pitch, smears time. Use it sparingly for textural evolution
- **Resamples are Flex samples**: Everything you know about Flex machines (p-locks, slices, effects, LFOs) applies to resampled audio. It is just another sample -- but one you made 10 seconds ago

## Next Session Preview

Next: the improvisation session. You now have live looping (Pickup machines), external capture (Track Recorders), and internal resampling. Session 28 combines all three into a 15-minute improvised performance from silence to completed piece.
