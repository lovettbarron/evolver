---
title: "Session 06: Slicing & Slice Playback"
module: "Sample Management"
session_number: 6
duration: 25
prerequisite: 5
output_type: patch
difficulty: intermediate
tags: [slicing, slices, start-param, flex, drum-loop, slice-menu]
instrument: octatrack
reference: "Elektron Manual Ch. 13.5; Merlin Ch. 3"
---

# Session 06: Slicing & Slice Playback

**Objective:** Slice a drum loop into 16 individual hits, switch the Flex machine to slice playback mode, and use the START parameter to select which slice plays on each step. This unlocks the OT's "any sound on any step" superpower.

> [!tip] If you only have 5 minutes
> Open AED on a drum loop slot. Press [DOWN] to SLICE. Press [YES] to auto-slice into 16. Save with [FUNC] + [YES]. In SRC Setup, set SLICE = ON. Now turn the START parameter — different slices play. You're slicing.

## Warm-Up (2 min)

Open AED on one of your existing samples (**[FUNC] + [BANK]**). Look at the waveform. Now imagine 16 vertical lines dividing it into equal pieces. That's slicing — telling the OT "treat this sample as 16 chunks I can call up by index."

## Setup

Start from the `LAB` project. Load a **drum break or beat loop** (1-2 bars of drums, 90-130 BPM) into a Flex slot. Try the classic Amen break, a James Brown funk break, or any 4/4 drum loop with clear hits. If you don't have one, any drum loop with 16 distinct transients works.

## Exercises

### Exercise 1: Auto-Slice the Loop (5 min)

The OT can slice automatically based on transient detection or equal divisions.

1. Select the track with your drum loop. Press **[FUNC] + [BANK]** to open AED
2. Press **[DOWN]** to navigate to the **SLICE** page
3. Find the auto-slice options:
   - **SLICE COUNT** (knob A) — how many slices. Set to `16` (one per 16th note in a 1-bar loop)
   - **CREATE METHOD** — usually `LINEAR` (equal division) or `TRANSIENT` (detected hits)
4. Set CREATE METHOD to `LINEAR` — predictable equal slices
5. Press **[YES]** to slice. The waveform now shows 16 numbered vertical lines
6. Each slice has a number `1` through `16` — the START parameter on the SRC page picks which slice plays

<div data-octatrack-panel
  data-sections="func,param"
  data-highlights="key-func-aed:amber,key-param-src:cyan"
></div>

### Exercise 2: Refine Slices Manually (4 min)

Linear slicing is fast but rarely perfect. Nudge slices to land on transients.

1. Still in AED on the SLICE page, navigate slice-by-slice: turn **knob B** to highlight slice 1
2. Press **[YES]** to preview just that slice — it should be the kick (or whatever's on beat 1)
3. If the slice cuts in late or chops a transient, turn **knob C** to nudge that slice's start point
4. Step through slices 1-16, previewing each. Adjust any that sound wrong
5. **Pro tip**: usually slices 1, 5, 9, 13 are the strong beats (kicks/snares) — get those clean first

### Exercise 3: Save Slices and Enable Slice Playback (4 min)

Slicing is non-destructive metadata — but the slot needs to know to use it.

1. Press **[FUNC] + [YES]** to save the slice grid back to the slot
2. Press **[NO]** to exit AED
3. Now switch the Flex machine to slice mode: press **[FUNC] + [SRC]** to open SRC SETUP
4. Find the **SLICE** parameter — turn it to `ON`
5. Press **[NO]** to exit SRC SETUP — you're back on the SRC parameter page
6. Now look at the SRC page parameters — you'll see **START** prominently. This selects which slice plays
7. Place a single **[TRIG 1]**, press **[PLAY]** — slice 1 plays on every beat 1

### Exercise 4: Sweep the START Parameter (5 min)

This is where slicing comes alive — the START parameter selects slices.

1. With your single trig playing on beat 1, turn **Data Entry knob A** (the START knob on the SRC page) slowly
2. Watch the value: 0 plays slice 1, higher values play higher slices, 127 plays the last slice
3. As you turn, you hear the loop "scrubbing" through slices — kick, snare, hat, ghost note, kick, etc.
4. Stop on a snare-only slice. Now place trigs on **[TRIG 1, 5, 9, 13]** — boom, snares on every beat
5. The pattern of triggers stays — but you're now controlling which slice plays globally with one knob
6. This is the foundation of slice-based patterns

### Exercise 5: Hint at Sample Locks — Different Slice Per Step (3 min)

You've seen global slice change. Module 5 teaches **sample locks** — different slice per step.

1. With your 4 trigs (1, 5, 9, 13) playing the same slice, **hold [TRIG 5]** (don't tap — hold)
2. While holding, turn **Data Entry knob A** — the START value shows in the screen
3. Set step 5's START to a different slice number (try slice 5 — usually the snare in a typical break)
4. Release **[TRIG 5]**. Step 5 now has a sample lock — it plays a different slice than steps 1, 9, 13
5. Hold **[TRIG 9]** + turn knob A → set to slice 9. Hold **[TRIG 13]** + turn knob A → set to slice 13
6. You've just rebuilt the original break loop using sample locks on a single sliced sample. Module 5 dives deep into this technique

## Exploration (if time allows)

- Try `TRANSIENT` slicing — set SLICE COUNT to `0` and CREATE METHOD to `TRANSIENT`. The OT detects hits and slices accordingly. Often more musical than LINEAR
- Slice a melodic loop (a short synth phrase, 4 bars). Each slice is one note. P-lock the START to play notes in a different order — instant remix
- On the AED SLICE page, try **GRID** (manual mode) to set slice points by tapping **[TRIG]** keys at the desired sample positions

## Output Checklist

- [ ] I sliced a drum loop into 16 slices using AED
- [ ] I refined at least one slice's start point manually
- [ ] I saved the slices back to the slot with **[FUNC] + [YES]**
- [ ] I enabled SLICE = ON in SRC SETUP
- [ ] I used the START parameter to scrub through slices in real time
- [ ] I sample-locked at least one trig step to play a specific slice (Module 5 preview)

## Key Takeaways

- **Slicing** divides a sample into addressable chunks — each chunk is selectable by index via START
- **AED slice page** is where you create and refine slice grids; **SRC SETUP > SLICE = ON** activates slice playback
- The **START parameter** picks which slice plays — turn it to scrub, p-lock it for per-step variation
- Slice + sample lock = "any slice on any step" — the OT's killer compositional pattern (full lesson in Session 14)

## Next Session Preview

Next: machine types deep dive. We've been using Flex throughout — now compare Flex (RAM, instant) vs. Static (streamed, longer samples) side by side, and learn when each is the right tool for the track.
