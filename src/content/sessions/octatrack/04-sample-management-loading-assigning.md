---
title: "Session 04: Loading & Assigning Samples"
module: "Sample Management"
session_number: 4
duration: 20
prerequisite: 3
output_type: technique
difficulty: beginner
tags: [samples, flex, static, quick-assign, src-setup]
instrument: octatrack
reference: "Elektron Manual Ch. 8, 11.3"
---

# Session 04: Loading & Assigning Samples

**Objective:** Master the two ways to load samples (Quick Assign and SRC Setup), understand when to use Flex vs. Static, and learn to swap samples between tracks without breaking your pattern.

> [!tip] If you only have 5 minutes
> On any track, press [SRC], turn Data Entry knob A to highlight the SLOT, press [YES] — Quick Assign opens. Browse, pick a sample. You just loaded a sample. Repeat on any track.

## Warm-Up (2 min)

From the `LAB` project (Session 03), you already have 8 samples in the Flex slot list. Press **[TRACK 1]**, **[SRC]**, look at the slot. Turn Data Entry knob A — the slot number changes between your loaded samples. The sample on Track 1 follows. Cycle through slots 1-8 quickly to refresh which sample is which.

## Exercises

### Exercise 1: Quick Assign — The Fast Path (4 min)

Quick Assign is the workflow you'll use 90% of the time.

1. Press **[TRACK 2]** (any unused track)
2. Press **[SRC]** — Source page open
3. Turn **Data Entry knob A** to highlight the SLOT field. Press **[YES]**
4. Quick Assign menu opens — it shows the project's Flex slot list and the Audio Pool
5. Use **[UP]/[DOWN]** to browse, **[RIGHT]** to enter a folder, **[LEFT]** to go up
6. Find a sample, press **[YES]** — it's assigned to Track 2 AND added to the next free Flex slot
7. Press **[NO]** to close. Track 2 now has a sample. Place a **[TRIG]** and press **[PLAY]** to confirm

### Exercise 2: SRC Setup — When You Need Control (5 min)

SRC Setup is for when Quick Assign is too quick — when you want to choose which slot, change machine type, or modify slot attributes.

1. Press **[TRACK 3]**, then **[FUNC] + [SRC]** to open SRC SETUP (a deeper menu than the SRC parameter page)
2. Top of the SRC SETUP page:
   - **MACH** — machine type: FLEX, STATIC, THRU, NEIGHBOR, PICKUP, MASTER
   - **SLOT** — which slot from the project's slot list (Flex or Static)
   - **MIDI MODE** (lower) — for MIDI tracks; ignore for now
3. Turn knob A to keep MACH = `FLEX`. Turn knob B to choose a SLOT — try slot 5 (whatever you loaded there in Session 03)
4. Press **[NO]** to exit SRC SETUP — you're back on the SRC parameter page
5. Track 3 is now playing slot 5's sample. Place a **[TRIG]** to confirm

<div data-octatrack-panel
  data-sections="param,func"
  data-highlights="key-param-src:amber,key-func-func:cyan"
></div>

### Exercise 3: Flex vs. Static — Choose by Use Case (5 min)

Both are for sample playback. The difference matters for performance and longer audio.

1. Press **[TRACK 4]**, **[FUNC] + [SRC]**, set **MACH** to `STATIC`. Press **[NO]**
2. Press **[YES]** in the SLOT field — Static has its own slot list (separate from Flex). Browse to a long sample (a 30-second drone or a backing track loop). Assign it
3. Place a single **[TRIG 1]** trigger and press **[PLAY]**. Listen — Static plays the sample directly from the CF card

**The trade-offs:**

| Aspect | Flex | Static |
|---|---|---|
| Storage location | RAM (80 MB total across all flex slots) | Streamed from CF card |
| Sample length | Short to medium (loops, hits) | Long (full backing tracks, ambient beds) |
| Swap speed | Instant (RAM-fast) | Slight load when changing slots |
| P-lock-friendliness | Excellent — every step can be a different slot | Limited — fewer slot swaps per second |
| Use case | Drums, melodic loops, anything p-locked | Backing tracks, long ambient, vocal stems |

3. **Rule of thumb**: drums and short loops → Flex. Anything > 10 seconds or for backing → Static. You can mix both in one project freely.

### Exercise 4: Sample Swap While Playing (4 min)

This is the OT's killer feature for live use.

1. With your pattern playing (kick on Track 1, snare on Track 2, hat on Track 3), press **[TRACK 1]**
2. Press **[SRC]**, turn **Data Entry knob A** — SLOT changes in real-time
3. Cycle through your 8 Flex slots while the pattern plays. The kick slot becomes a snare slot becomes a hat slot
4. Settle on a sample you like for the kick role. Press **[FUNC] + [PROJ]** to save
5. Repeat on Tracks 2, 3 — find new samples for the snare and hat without stopping
6. The pattern's structure (which steps trigger) doesn't change — only the *sound* on each track. This is why p-locked sample swaps are so powerful in Module 5

## Exploration (if time allows)

- In Quick Assign, press **[FUNC] + [YES]** to assign WITHOUT adding to the slot list (uses an existing slot). Useful when slots are filling up
- Hold **[FUNC]** while turning Data Entry knob A on the SRC page — jumps slots faster
- Look at the slot list directly: from any page, press **[FUNC] + [BANK]** then navigate — the full Flex and Static slot lists for the project

## Output Checklist

- [ ] I used Quick Assign to load a sample into a track
- [ ] I used SRC Setup to manually choose machine type and slot
- [ ] I loaded at least one Static machine with a longer sample
- [ ] I swapped samples between tracks while a pattern was playing
- [ ] I can describe when to choose Flex vs. Static
- [ ] I saved the project after my changes

## Key Takeaways

- **Quick Assign** = fast load (knob A → [YES] → browse → [YES])
- **SRC Setup** = full control (FUNC + SRC → choose MACH and SLOT explicitly)
- **Flex** for short, p-lockable, instant-swap samples; **Static** for longer streaming material
- The slot list is your project's sample inventory — keep it tidy, label slots if you can

## Next Session Preview

Next: the Audio Editor (AED) — set start/end points, define loop modes, normalize gain, save edits back to the slot. Once you can edit samples on the OT itself, you stop needing your computer for half the work.
