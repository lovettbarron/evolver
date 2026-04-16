---
title: "Session 22: Parts Deep Dive — Save, Reload, Copy"
module: "Parts & Pattern Workflow"
session_number: 22
duration: 25
prerequisite: 21
output_type: technique
difficulty: intermediate
tags: [parts, pattern-workflow, save, reload, copy, part-vs-pattern, mental-model]
instrument: octatrack
reference: "Elektron Manual Ch. 10.1-10.2; Merlin Ch. 7"
---

# Session 22: Parts Deep Dive — Save, Reload, Copy

**Objective:** Internalize what a Part stores vs. what a Pattern stores. Save your current state as Part 1. Copy it to Part 2. Modify Part 2 (different bass sample, different effects). End up with two completely different sounds sharing the same trigger patterns. This is the cornerstone of Octatrack songwriting.

> [!tip] If you only have 5 minutes
> Press [FUNC] + [PART] → SAVE → confirm. That captures all your machines, FX, scenes, and volumes as Part 1. Press [PART], select Part 2, copy from Part 1, switch to Part 2. Now swap Track 2's sample for something different. Same triggers, different sound.

## Warm-Up (2 min)

Up to now you've been working in one Part. The Part is the OT's "preset slot" — it stores everything *except* the trigger patterns themselves. Press [FUNC] + [CUE] right now to reload the current Part. Anything you'd changed reverts. That gesture is your safety net, and Parts are about to become your songwriting structure.

## Setup

Start from the `LAB` project with a 4-track pattern: Track 1 drums, Track 2 bass (a single bass sample with pitch p-locks from Session 14, ideally), Track 3 melodic pad, Track 4 hat or shaker. Each should have a Multi Mode Filter on FX1 and a reverb on FX2.

Save the Part now (you're about to overwrite it intentionally — better to have a clean baseline first): **[FUNC] + [PART]** → SAVE → confirm.

## Exercises

### Exercise 1: What's in a Part vs. a Pattern (4 min)

Get the mental model straight before doing any operations.

**A Part stores:**
- Track machine assignments (which slot is Flex/Static/Thru/Neighbor/Pickup)
- Sample slot list assignments per track
- All FX settings (FX1 type and parameters, FX2 type and parameters)
- LFO setup (waveforms, destinations, depths, speeds)
- Scene snapshots (all 16 slots, both Scene A and Scene B assignments)
- Track volumes (LEV) and mixer settings
- AMP envelope settings

**A Pattern stores:**
- Trigger placements (which steps fire on which tracks)
- Parameter locks (per-step parameter overrides)
- Sample locks (per-step sample swaps)
- Trig conditions (1:2, FILL, etc.)
- Trig types (sample trig, recorder trig, one-shot, slide, swing)
- Pattern length and time signature
- Tempo (when in pattern-tempo mode)

**The split**: Parts = sound design. Patterns = arrangement. A single Part can be paired with many Patterns. A single Pattern can be played under many Parts.

<div data-octatrack-panel
  data-sections="func,nav"
  data-highlights="key-func-part:amber,key-nav-pattern:amber"
></div>

### Exercise 2: Save Part 1 — The Verse Sound (4 min)

Capture your current state as Part 1 deliberately.

1. With your 4-track pattern playing nicely, press **[STOP]**
2. Press **[PART]** to open the Part menu — you see Part 1 highlighted (with a name slot if it has one)
3. Press **[FUNC] + [PART]** to access Part operations. Select **SAVE**, confirm with **[YES]**
4. Optionally rename: in the Part menu, edit the Part name to "VERSE" or similar (firmware-dependent gesture; usually a NAME or RENAME option)
5. Save the Project: **[FUNC] + [PROJ]** → confirm. The Part is now persisted to the CF card

**What just happened**: Part 1 = a snapshot of your sound design. Even if you change everything in the next 10 minutes, [FUNC] + [CUE] reloads back to this exact state.

### Exercise 3: Copy Part 1 to Part 2 (4 min)

Cloning a Part lets you preserve the verse sound while you experiment with a chorus variation.

1. Press **[PART]** to open the Part menu
2. Highlight **Part 1** (the source). Open the Part operations: **[FUNC] + [PART]**
3. Select **COPY** (or COPY PART) and confirm
4. Highlight **Part 2** (the destination)
5. Open Part operations again: **[FUNC] + [PART]**, select **PASTE** (or PASTE PART), confirm with **[YES]**
6. **Switch to Part 2**: in the Part menu, navigate to Part 2 and press [YES]. The screen shows you're now editing Part 2
7. Press **[PLAY]**. The pattern plays exactly as before — Part 2 is currently identical to Part 1
8. Save Part 2 immediately so you have a fresh baseline: **[FUNC] + [PART]** → SAVE

<div data-octatrack-panel
  data-sections="func,nav"
  data-highlights="key-func-part:amber,key-func-proj:cyan,key-nav-yes:cyan"
></div>

### Exercise 4: Transform Part 2 — Different Sound, Same Triggers (8 min)

Now diverge Part 2 dramatically while leaving the trigger patterns alone.

1. With Part 2 active and pattern playing:
2. **Track 2 (bass)**: Open SRC. Use Quick Assign to swap the bass sample for something more aggressive (a distorted bass, a saw stab, an FM bass). The pitch p-locks from before still fire — same melody, different timbre
3. **Track 1 (drums)**: Press **[FX1]**. Increase the filter RESONANCE to `60`, lower FREQ to `80`. Drums become more aggressive
4. **Track 3 (pad)**: Press **[FX2]**. Swap the reverb type from Plate to Dark Reverb. Boost the MIX to `70`. The pad becomes a wash of darker atmosphere
5. **Track 4 (hat)**: Open AMP. Swap the AMP envelope to a much shorter release. The hats become tighter
6. Press **[PLAY]**. Listen — same drum hits, same bass notes, same pad rhythm, but the *sound* is completely different. This is Part 2 as the chorus
7. Save Part 2: **[FUNC] + [PART]** → SAVE

### Exercise 5: Toggle Between the Two Parts Live (3 min)

Switching Parts mid-pattern is a song-section transition.

1. Press **[PLAY]**. Pattern plays under Part 2 (the chorus sound)
2. Press **[PART]**, navigate to Part 1, press **[YES]**. The Part switches *between bars* (typically — the OT quantizes Part changes to the pattern boundary so it doesn't glitch mid-bar)
3. The same triggers now sound like Part 1 (the verse). Switch back to Part 2 — chorus
4. **Use Cases**:
   - Verse/chorus toggling within a single pattern
   - Switching Parts to test variations during composition
   - Live-set "drop the chorus version" moves
5. **Important**: changes you make to a Part are LOST if you switch away without saving. **[FUNC] + [CUE]** is your safety net, and **[FUNC] + [PART] → SAVE** is your commit gesture

### Exercise 6: The Reload Discipline (Quick — 2 min)

Make sure you internalize the save-or-reload rule.

1. With Part 2 active, change something obvious (turn down all of Track 1's LEV)
2. Press **[FUNC] + [CUE]** — the Part reloads. Track 1 is back at full LEV
3. Now make the same change AND press **[FUNC] + [PART]** → SAVE before reloading
4. Press **[FUNC] + [CUE]** — the Part reloads, but Track 1 stays muted because you saved it that way
5. **The discipline**: if you like a change, SAVE. If you don't, RELOAD. Never assume the OT remembers tweaks you didn't commit

## Output Checklist

- [ ] I can articulate (in my own words) what a Part stores vs. what a Pattern stores
- [ ] I saved my current state as Part 1
- [ ] I copied Part 1 → Part 2
- [ ] Part 2 has a meaningfully different sound (different bass sample, different FX) while sharing Part 1's triggers
- [ ] I switched between Part 1 and Part 2 with the pattern playing
- [ ] I practiced the save-or-reload discipline ([FUNC] + [PART] → SAVE vs [FUNC] + [CUE])

## Key Takeaways

- **Parts = sound design (machines, FX, scenes, LFOs, volumes). Patterns = arrangement (triggers, p-locks, conditions).** This split is what gives the OT its compositional power
- **One Part + many Patterns** = same sound across multiple sections (intro/verse/chorus all share Part 1)
- **Many Parts + one Pattern** = same triggers, different sounds (verse Part vs chorus Part)
- **[FUNC] + [PART] → SAVE** is your commit gesture. **[FUNC] + [CUE]** is your reload gesture. Use them constantly
- **Part changes during play quantize to the pattern boundary** — you don't get glitchy mid-bar transitions

## Next Session Preview

Next: pattern variations. With Part 1 as your verse sound, you'll create A01-A04 as four different patterns (intro, verse, chorus, break) all sharing Part 1. Different triggers and p-locks per pattern, same sound design. Pattern chaining. The basic shape of a song.
