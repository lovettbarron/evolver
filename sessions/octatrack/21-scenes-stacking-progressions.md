---
title: "Session 21: Scene Stacking for Smooth Progressions"
module: "Scenes & Crossfader"
session_number: 21
duration: 25
prerequisite: 20
output_type: patch
difficulty: advanced
tags: [scenes, scene-stacking, progressions, live-set, tension-release, crossfader-gestures]
instrument: octatrack
reference: "Merlin Ch. 6 (scene stacking)"
---

# Session 21: Scene Stacking for Smooth Progressions

**Objective:** Build progressions of 8 stacked scenes per side, where each scene adds incremental change on top of the previous. Use the crossfader to walk through them as a continuous escalation, then unwind it. The slider becomes a long-form arrangement tool.

> [!tip] If you only have 5 minutes
> Assign Scene A to TRIG 1, 2, 3, 4. Each one adds slightly more (filter opens, delay grows, level rises). Re-assign Scene A to TRIG 4 — that's the "fully escalated" position. Slide the crossfader full left, then re-assign Scene A to TRIG 1, full right re-assign Scene A back to TRIG 4. The slider now walks through your incremental changes.

## Warm-Up (2 min)

You've used scenes as A vs. B (Sessions 19, 20). Now we use the 16 slots as a *bank of progressions*. From Merlin's guide: scenes 1-8 on the left side build escalation in one direction; scenes 9-16 on the right side build escalation in another. Press [PLAY] on a pattern from your `LAB` project. Picture: each TRIG slot is a different mix snapshot. The slider walks through them.

## Setup

Start from the `LAB` project. You need a pattern with at least 4 active tracks, varied effects (filter on FX1, delay or reverb on FX2). The pattern should have enough material that you can hear *gradual* changes — if the pattern is sparse, scene transitions feel abrupt.

Save the current state as Part 1 before experimenting. You'll be doing a lot of re-assignment.

## Exercises

### Exercise 1: Why Stack? The Single-Scene Limitation (3 min)

Two scenes (A vs. B) give you a binary morph. Stacked scenes give you a *progression*.

1. With current Scene A and Scene B from Session 19, slide the crossfader. You hear a single morph from one snapshot to another
2. The limitation: there's no *intermediate stop*. You can park mid-slider, but the position is continuous, not discrete
3. **The stacking idea**: instead of using TRIG 1 and TRIG 2 as the only assignment slots, use TRIG 1 → TRIG 8 as a sequence of slowly evolving snapshots. Re-assign Scene A to whichever slot you want as the current "left edge state"
4. The crossfader still does the morph, but you can now choose *which two snapshots to morph between* by re-assigning A and B mid-performance

<div data-octatrack-panel
  data-sections="scene,mix"
  data-highlights="key-scene-a:amber,key-scene-b:amber,slider-mix-crossfader:cyan"
></div>

### Exercise 2: Build the Left-Side Progression (Scenes 1-8) (8 min)

Capture 8 incremental snapshots in slots 1-8.

Slide crossfader **fully left** (Scene A active). Whatever you tweak now is captured to whichever slot Scene A is currently assigned to.

1. **Scene 1 (TRIG 1)**: baseline. Hold [SCENE A] + [TRIG 1] to assign. Set all FX FREQ to 100 (open), all delay/reverb MIX to default. This is the "clean" starting state
2. **Scene 2 (TRIG 2)**: subtle move. Hold [SCENE A] + [TRIG 2] to re-assign. Slightly close Track 2's filter (FREQ = 80). Slight increase to FX2 reverb MIX on Track 3 (+10)
3. **Scene 3 (TRIG 3)**: more motion. Re-assign Scene A to TRIG 3. Track 2 filter to 60. Track 3 reverb MIX +20. Track 4 LFO depth +10
4. **Scene 4 (TRIG 4)**: midpoint tension. Re-assign to TRIG 4. Track 1 (drums) FX1 FREQ to 80 (slight filter). Track 2 RES to 40 (resonance creeping in). Track 3 reverb MIX +30. Delay FEEDBACK on Track 4 raised to 50
5. **Scene 5-8**: continue the escalation. Each scene closes filters more, raises feedback more, intensifies one or two parameters
6. **Scene 8** should be the maximum-intensity left-side state. Closed filters, screaming resonance, max delay feedback that's about to self-oscillate

<div data-octatrack-panel
  data-sections="scene"
  data-highlights="key-scene-a:amber"
></div>

### Exercise 3: Build the Right-Side Progression (Scenes 9-16) (5 min)

Now stack the B side. Slide **fully right**. Whatever you tweak captures to wherever Scene B is assigned.

1. **Scene 9 (TRIG 9)**: a *different kind* of escalation. Hold [SCENE B] + [TRIG 9]. This is your "destination" baseline. Maybe you go in the opposite direction — tracks fade out via XLEV rather than getting more processed
2. **Scene 10 (TRIG 10)**: re-assign B. Track 2 XLEV down to 50 (bass starts fading)
3. **Scene 11 (TRIG 11)**: Track 3 XLEV down to 40, Track 2 XLEV to 0 (bass gone)
4. **Scene 12 (TRIG 12)**: Track 4 XLEV down to 30, Track 1 (drums) FX1 RES boosted to 60
5. **Scene 13-16**: progressive deconstruction. Tracks fade out, but FX intensify on what's left. The mix becomes a single screaming filtered drum pattern by Scene 16
6. The two sides give you different *flavors*: left side = additive intensity (more is happening), right side = subtractive intensity (less is happening, but what's left is more processed)

### Exercise 4: Walk the Progression Live (5 min)

Now perform the escalation by walking through the assignments.

1. **Bar 1-2**: Hold [SCENE A] + [TRIG 1]. Hold [SCENE B] + [TRIG 2]. Crossfader morphs between scene 1 and scene 2 — tiny, subtle morph
2. **Bar 3-4**: Re-assign Scene A to TRIG 2, Scene B to TRIG 3. Slide crossfader fully right, then fully left — you've moved one step further into the progression
3. **Bar 5-6**: Re-assign A=3, B=4. Continue the walk
4. **Bar 7-8**: A=4, B=5. The mix is gradually intensifying
5. **Bar 9-10**: A=5, B=6. ... and so on through Scenes 7-8
6. **The result**: a long, slow build over 16 bars where the crossfader stays small/centered but the assignment walks the progression forward
7. **The unwind**: re-assign in reverse (A=7→6→5→...→1) over 8 bars to bring the mix back down

<div data-octatrack-panel
  data-sections="scene,mix"
  data-highlights="key-scene-a:amber,key-scene-b:amber,slider-mix-crossfader:amber"
></div>

### Exercise 5: Save the Progression (2 min)

Stacked scenes are stored in the Part. The current Scene A/B assignment is also stored — make sure you save the assignment you want to be the default starting state.

1. Re-assign Scene A to TRIG 1, Scene B to TRIG 2 (the default starting positions)
2. Save the Part: **[FUNC] + [PART]** → SAVE → confirm
3. Save the Project: **[FUNC] + [PROJ]** → confirm
4. **Document**: in your session notes, jot down what each TRIG slot represents (e.g., "TRIG 4 = midpoint tension, TRIG 8 = max intensity left, TRIG 12 = bass-out moment"). Future-you needs this map

## Output Checklist

- [ ] I assigned Scene A to 8 different TRIG slots and built incremental snapshots in each
- [ ] I assigned Scene B to slots 9-16 with a different flavor of escalation (subtractive vs additive)
- [ ] I performed a "walking" gesture: re-assigning A and B mid-pattern to advance through the progression
- [ ] I performed an unwind: walking the assignments backward to bring intensity down
- [ ] I documented what each scene slot represents
- [ ] I saved the Part and Project

## Key Takeaways

- **Scenes are slots, not positions.** TRIG 1-16 each store a snapshot. Scene A and Scene B are *pointers* to which slot is currently active
- **Re-assign A and B during play** to walk through the 16 slots as a progression. The crossfader morphs the current pair; the assignment chooses which pair
- **Left side (1-8) and right side (9-16)** are conceptually independent escalations. Use them for different gestures (e.g., additive vs subtractive)
- **Scene 4 + Scene 12** become natural "midpoint" assignments for tension-release sections
- **Document your progression map** — without notes, future-you won't remember what each slot does

## Next Session Preview

Next module: Parts & Pattern Workflow. You've built scenes inside one Part — now we look at saving multiple Parts and using them for radical timbral shifts between song sections. Verse vs. chorus, but with different machines and effects, all sharing the same trigger patterns.
