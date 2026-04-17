---
title: 'Session 05: Audio Editor — Trim, Loop, Attributes'
session_number: 5
duration: 25
prerequisite: 4
output_type: technique
difficulty: beginner
tags:
  - aed
  - audio-editor
  - trim
  - loop-points
  - gain
  - sample-attributes
instrument: octatrack
reference: Elektron Manual Ch. 13
section: Sample Management
instrument_type: instrument
---

# Session 05: Audio Editor — Trim, Loop, Attributes

**Objective:** Open the Audio Editor (AED), set sample start and end points, define loop modes, normalize gain levels across samples, and save edits back to the slot. Stop relying on your computer for sample prep.

> [!tip] If you only have 5 minutes
> Select a slot. Press [FUNC] + [BANK] to open AED. Move the start point in (knob A) and end point in (knob B). Save with [FUNC] + [YES]. Your sample is now trimmed.

## Warm-Up (2 min)

From the previous session, you have 8 samples loaded across Flex slots. Some are probably too long, too quiet, or have silence at the start. Press **[TRACK 1]**, **[SRC]**, cycle through your slots and identify one that needs trimming or normalization. That's your editing target.

## Setup

Start from the `LAB` project. Have at least one sample loaded that needs editing — ideally a drum loop with silence at the start, or a one-shot with extra tail. If all your samples are perfect, load a fresh untrimmed sample into a new slot before the exercises.

## Exercises

### Exercise 1: Open the Audio Editor (3 min)

The AED is a screen unto itself — it edits a single sample slot at a time.

1. Press **[TRACK 1]** to make the track active
2. Press **[FUNC] + [BANK]** to open the **AUDIO EDITOR** (AED) for the current track's slot
3. The screen shows: a waveform, a transport bar, and editing parameters in the bottom row
4. Press **[YES]** to PREVIEW the current sample state — listen to confirm it's the right one
5. Use **[UP]/[DOWN]** to navigate sections: TRIM, SLICE, ATTRIBUTES. Stay on TRIM for this exercise

<div data-octatrack-panel
  data-sections="func"
  data-highlights="key-func-aed:amber"
></div>

### Exercise 2: Set Start and End Points (Trim) (6 min)

Trimming removes silence from the start and unwanted tail from the end.

1. On the TRIM page, find:
   - **TRIG** — playback start point (sample position where playback begins)
   - **TRIM START** — the actual start point of the audio (silence before this is skipped)
   - **TRIM END** — the actual end point (audio after this is skipped)
   - **LOOP START** — where loop returns to (used in next exercise)
2. Turn **Data Entry knob A** to nudge **TRIM START** forward — watch the waveform's left bracket move. Listen with **[YES]** between adjustments
3. When the silence is gone and the transient hits at the very start, you're done with the start
4. Turn **Data Entry knob B** for **TRIM END** — pull it in until the trailing silence is gone, but leave the natural decay
5. Hold **[FUNC]** while turning the knob for fine-grained adjustment (single sample steps)
6. Press **[YES]** to preview the trimmed sample — it should start instantly and end clean

### Exercise 3: Loop Mode (5 min)

Loop modes change how the sample replays after the END point is reached.

1. On the TRIM page, find **LOOP** parameter (turn knob C):
   - `OFF` — sample plays once, stops at TRIM END (default for one-shots)
   - `LOOP` — sample plays from LOOP START to TRIM END, then jumps back to LOOP START — repeats indefinitely
   - `PIPO` (ping-pong) — plays forward to END, then backward to LOOP START, then forward again
2. Set LOOP to `LOOP`
3. Set **LOOP START** (knob D) somewhere mid-sample — try halfway through a sustained note in a synth sample
4. Trigger the sample with a long note (place a TRIG, hold play). It should loop the second half indefinitely
5. Useful for: turning a one-shot pad into a sustaining drone, looping the steady portion of a tom hit, creating granular textures

### Exercise 4: GAIN Attribute — Normalize Volumes (5 min)

Different samples come at wildly different volumes. The GAIN attribute brings them in line at the slot level.

1. From the AED, navigate to the **ATTRIBUTES** page (press **[DOWN]** until you see ATTRIBUTES at the top)
2. Find **GAIN** — bipolar parameter from -24 dB to +24 dB
3. Trigger the sample (press **[TRIG 1]** while the sequencer is stopped) and listen
4. If it's quiet relative to other slots, turn knob A (GAIN) up by +6 dB. Trigger again. Compare against another slot's level
5. Aim for: every slot triggers at roughly the same perceived loudness without clipping
6. Other ATTRIBUTES you'll see (set later or leave default for now):
   - **TEMPO** — sample's natural BPM (used for tempo-locked playback)
   - **TIME SIGNATURE** — for proper tempo locking
   - **QUANTIZE** — quantization on/off

### Exercise 5: Save the Edit Back to the Slot (4 min)

AED edits are not permanent until you save them.

1. With your trimmed, looped, gain-adjusted sample in front of you, press **[FUNC] + [YES]**
2. The OT writes the edits to the slot's metadata. The original audio file on the CF card is untouched — just the playback parameters change
3. Press **[NO]** to close the AED
4. Press **[FUNC] + [PROJ]** to save the project
5. Reload the project to confirm: **[PROJ] > LOAD > LAB**, **[YES]**. The sample plays trimmed and looped just as you left it

## Exploration (if time allows)

- Edit a drum loop: trim the very start tighter so it locks to the grid. Even 20 ms of silence at the start makes a loop feel late
- On the ATTRIBUTES page, set TEMPO to the loop's BPM (e.g., `120`). Now the OT can pitch-shift the loop to match the project tempo automatically
- Try **NORMALIZE** (in some firmware versions, under ATTRIBUTES) — auto-sets gain so the loudest peak hits 0 dBFS

## Output Checklist

- [ ] I opened the AED with **[FUNC] + [BANK]**
- [ ] I trimmed silence off the start and end of at least one sample
- [ ] I set a sample to LOOP mode and confirmed it loops
- [ ] I adjusted the GAIN attribute on at least 2 slots to even out volumes
- [ ] I saved an AED edit back to the slot with **[FUNC] + [YES]**
- [ ] I saved the project after my edits

## Key Takeaways

- The **AED** edits a slot — every track using that slot inherits the edits
- **TRIM START / TRIM END** are non-destructive (the original .wav file is untouched)
- **LOOP MODE** turns one-shots into sustaining sounds — huge for pads and texture work
- **GAIN attribute** is your slot-level mixer trim — even out volumes here, not at the track level

## Next Session Preview

Next: slicing. Take a drum loop, chop it into 16 hits, and now any slice can play on any step via the START parameter. Combined with sample locks (Module 5), this lets you completely re-arrange a break loop on the fly.
