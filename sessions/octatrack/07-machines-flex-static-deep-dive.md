---
title: "Session 07: Flex & Static Machines Deep Dive"
module: "Machines & Playback"
session_number: 7
duration: 25
prerequisite: 6
output_type: patch
difficulty: intermediate
tags: [machines, flex, static, sample-swap, long-sample]
instrument: octatrack
reference: "Elektron Manual Ch. 11.1-11.2; Merlin Ch. 4"
---

# Session 07: Flex & Static Machines Deep Dive

**Objective:** Compare Flex and Static machines side by side. Load the same sample as both, hear the difference, and build a pattern that uses each for what it does best — Static for a long backing track, Flex for fast-swapping drums.

> [!tip] If you only have 5 minutes
> Set Track 1 = Flex (drum hit), Track 2 = Static (long pad or drone). Trigger both. Notice the Flex hit is instant; the Static fills the space with a longer sound. That's the whole distinction.

## Warm-Up (2 min)

From Session 06, you have a sliced drum loop on Flex. Press **[PLAY]** and listen — Flex's instant slot swaps make slicing possible. Press **[STOP]**. The point of this session: what Flex *can't* do well, Static can.

## Setup

Start from the `LAB` project. You'll need:
- One short sample (drum loop or hit) loaded in a Flex slot
- One **long sample** (30 seconds to 2 minutes) — a backing track, ambient drone, vocal stem, or extended pad. If you don't have one, find any long .wav file in your Audio Pool

## Exercises

### Exercise 1: Same Sample, Both Machine Types (5 min)

The clearest way to feel the difference: load identical audio as both Flex and Static.

1. Pick a medium-length sample — try a 4-bar drum break (~8 seconds)
2. Set **Track 1** to Flex, load the sample (you should already have one in your slot list — pick that)
3. Set **Track 2** to Static: press **[TRACK 2]**, **[FUNC] + [SRC]**, MACH = `STATIC`. Press **[NO]**
4. In SLOT, press **[YES]** to open Quick Assign — browse to the **same** .wav file. Press **[YES]** to load (it adds to the Static slot list)
5. Place a single trig on **[TRIG 1]** for both tracks. Press **[PLAY]**
6. Listen. With a short sample, the difference is subtle: Flex preloads to RAM (instant); Static streams from CF (tiny load delay on first trigger, then cached)

<div data-octatrack-panel
  data-sections="param,func"
  data-highlights="key-param-src:amber,key-func-func:cyan"
></div>

### Exercise 2: Sample Swap Speed Test (5 min)

This is where Flex shines. Stress-test both with rapid slot changes.

1. On Track 1 (Flex), place 8 trigs at every other step: [1, 3, 5, 7, 9, 11, 13, 15]
2. Press **[PLAY]**. Now turn **Data Entry knob A** (START / SLOT) rapidly — sample changes between each trigger. Smooth, no glitches
3. Stop. On Track 2 (Static), place 8 trigs the same way. Press **[PLAY]**
4. Turn knob A — slower, less responsive. With long samples especially, you may hear the load
5. **Verdict**: Flex is for high-frequency slot variation (per-step sample locks, slicing). Static fights you when you try this

### Exercise 3: Static Excels at Long Material (6 min)

Flex caps at 80 MB total RAM. A 5-minute stereo loop at 44.1 kHz is ~50 MB — eats most of your Flex budget. Static streams it for free.

1. Set **Track 3** to Static. Load your long sample (30 sec to 2 min)
2. Place a single **[TRIG 1]** trigger
3. Press **[PLAY]** — the long sample plays from beginning to end
4. While it plays, you have Tracks 1, 2, 4-8 free for drums, layers, etc. Static handed you a full backing track for ~zero RAM cost
5. **Trick**: open AED on the Static slot and set LOOP = ON, with LOOP START at 0 and TRIM END at the natural loop point. Now the long sample loops continuously — perfect for ambient backing
6. **Trick 2**: place multiple trigs at different steps but use SLICE on the Static (yes, Static can slice too) to jump to different sections of the long sample as it plays

### Exercise 4: Build a Pattern Using Both (5 min)

Putting it together — a typical OT setup.

1. **Track 1 (Flex)** — kick. Trigs on 1, 5, 9, 13. p-lock-friendly
2. **Track 2 (Flex)** — snare. Trigs on 5, 13
3. **Track 3 (Flex)** — hat. Trigs on 3, 7, 11, 15
4. **Track 4 (Static)** — long ambient pad / drone. Single trig on 1, looping
5. **Track 5 (Flex)** — bass one-shot. Trigs on 1, 7, 9, 13 with p-locked pitch (Module 5 preview)
6. Press **[PLAY]**. Move the **crossfader** to feel space (we'll design scenes later)
7. **Track allocation principle**: Flex for anything you'll p-lock heavily. Static for anything long and stable

### Exercise 5: When to Reach for Each (2 min)

Mental model:

| If the sample is... | Use... | Why |
|---|---|---|
| Drum hit, 100 ms | Flex | RAM-instant, p-lock-friendly |
| Drum loop, 1-4 bars | Flex | Slice + sample-lock workflow |
| Synth one-shot | Flex | Pitch-lock per step |
| Vocal phrase, 4 bars | Either | Flex if you'll mangle, Static if you'll let it play |
| Backing track, 30+ seconds | Static | Saves Flex RAM for percussive work |
| Ambient drone, 1+ minutes | Static | Same as above, plus loop in AED |
| Field recording, 30 seconds | Static | Stream from card, mangle with effects |

## Exploration (if time allows)

- Set Track 4 to Static, load a vocal stem, trigger once at step 1, and use **[FX1]** Echo Freeze Delay to dub it out — the Static + delay combo is a signature OT sound
- Stress-test Flex RAM: try loading a 2-minute stereo sample as Flex. The OT will refuse or warn. That's the 80 MB limit announcing itself
- Use **[FUNC] + [BANK]** (AED) on a Static slot to verify that all the editing operations from Session 05 work the same — they do

## Output Checklist

- [ ] I loaded the same sample as both Flex and Static and heard the difference
- [ ] I tested rapid slot changes on Flex (smooth) vs. Static (less so)
- [ ] I loaded a long sample as Static and let it play as a backing track
- [ ] I built a pattern using Flex on tracks 1-3, 5 and Static on track 4
- [ ] I can articulate the use case for each machine type

## Key Takeaways

- **Flex** = RAM-loaded, instant slot swaps, p-lock friendly. Use for drums, slices, anything you'll mangle
- **Static** = streamed from CF, longer samples, lower RAM cost. Use for backing tracks, drones, vocal stems
- A typical OT project uses **6 Flex + 2 Static** or **7 Flex + 1 Static** — flex-heavy because most musical work involves p-locking
- The 80 MB Flex RAM cap is real — Static is your escape hatch for long material

## Next Session Preview

Next: Thru and Neighbor machines. We've been playing samples; now we route external audio through the OT for real-time effects processing. Connect a synth to Input A/B, set Track 1 to Thru, and the OT becomes an effects unit.
