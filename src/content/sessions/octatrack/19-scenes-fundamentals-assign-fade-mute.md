---
title: "Session 19: Scene Fundamentals — Assign, Fade, Mute"
module: "Scenes & Crossfader"
session_number: 19
duration: 25
prerequisite: 18
output_type: technique
difficulty: intermediate
tags: [scenes, crossfader, parameter-snapshots, scene-mute, performance]
instrument: octatrack
reference: "Elektron Manual Ch. 10.3; Merlin Ch. 6"
---

# Session 19: Scene Fundamentals — Assign, Fade, Mute

**Objective:** Assign your first scenes (Scene A and Scene B). Use the crossfader to morph between them. Use scene mutes for instant jumps between mix states. The crossfader becomes your most expressive performance tool.

> [!tip] If you only have 5 minutes
> Hold [SCENE A] + [TRIG 1] to assign. Hold [SCENE B] + [TRIG 1] to assign B. Move the crossfader from left to right. You're morphing between two parameter snapshots in real time.

## Warm-Up (2 min)

In Module 6 you used LFOs to add motion. Scenes are different — they capture a *snapshot* of any parameter values, and the crossfader interpolates between two snapshots in real time. Press **[PLAY]** on a pattern from your `LAB` project. Move the crossfader fully left, then fully right. If nothing changes, no scenes are assigned yet — that's what this session fixes.

## Setup

Start from the `LAB` project with at least one good-sounding pattern: drums on Track 1, a bass or melodic sample on Track 2, and a texture/pad on Track 3. Each should have a few trigs and an FX1 with a Multi Mode Filter (Session 10's setup is fine).

Press **[STOP]** twice to reset to step 1. Make sure the **crossfader is fully left** (Scene A position) before assigning anything.

## Exercises

### Exercise 1: Assign Your First Scene (5 min)

The fundamental gesture: hold a SCENE key + tap a TRIG slot to assign.

1. The OT has 16 scene slots, addressed by [TRIG 1] through [TRIG 16]. Slot assignments are independent for the A and B sides
2. **Hold [SCENE A]** — keep it pressed. The screen shows scene assignment mode
3. While holding, **tap [TRIG 1]** to assign Scene A to slot 1. Scene A now points at slot 1, which currently captures the live parameter values
4. Release. The [TRIG 1] LED indicates Scene A's assignment
5. Now switch which scene is captured: **Hold [SCENE B] + tap [TRIG 2]** to assign Scene B to slot 2

<div data-octatrack-panel
  data-sections="scene,mix,param"
  data-highlights="key-scene-a:amber,key-scene-b:amber,slider-mix-crossfader:blue"
></div>

### Exercise 2: Capture a "Destroyed" Scene B (6 min)

Scenes only become useful when they capture different states. Build Scene B to sound dramatically different from Scene A.

1. Make sure **crossfader is at the right edge** (Scene B is fully active). Any parameter you change now will be captured into Scene B's snapshot
2. Press **[TRACK 1]** then **[FX1]**. Lower the filter FREQ to `30` (closed)
3. Press **[FX2]**. If you have Echo Freeze Delay set up, raise the FEEDBACK to `90`
4. Press **[TRACK 2]** then **[FX1]**. Lower FREQ to `40` and raise RESONANCE to `100` for screaming filter
5. Press **[TRACK 3]** then **[AMP]**. Boost the LEVEL by 20
6. Now slowly **slide the crossfader fully left** (Scene A). You should hear everything snap back to clean
7. Slide right again. Filtered, feedback delay, resonant, louder. The transformation is complete

**The mental model**: Scene A and Scene B each store a parameter snapshot. The crossfader interpolates between them. Anything you tweak while the crossfader is at one edge updates *that* scene's snapshot.

### Exercise 3: Crossfader as an Expression Controller (5 min)

The slider is not a switch — it's a continuous controller. Practice using it musically.

1. Press **[PLAY]**. Start with crossfader fully left (clean Scene A)
2. **Slow morph (4 bars)**: Across 4 bars, slide the crossfader from left to right. Hear how each parameter interpolates: filter opens → closes, delay feedback grows, level rises. This is your "build into the drop" gesture
3. **Snap-and-return**: Slide all the way right on a downbeat, then snap back to left on the next downbeat. This is your "moment of chaos" gesture
4. **Edge-only**: Hover near the right edge so Scene B is mostly active but not fully — you get partial-scene textures unique to that crossfader position
5. The slider's resolution is high; tiny movements produce tiny parameter shifts. Use it like a violin bow

### Exercise 4: Scene Mute as Instant Jump (5 min)

Sometimes you don't want a slow morph — you want an instant transformation. Scene mutes give you that.

1. With the crossfader at one edge (say, fully left = Scene A active), press **[FUNC] + [SCENE B]** to **mute Scene B**. The crossfader's right-side influence is now disabled even if you slide it all the way right
2. Press [PLAY]. Slide the crossfader to the right. Nothing changes — Scene B is muted
3. **Unmute on the downbeat**: Press [FUNC] + [SCENE B] again right on a beat. Scene B snaps active immediately at the crossfader's current position. *Instant* transformation, perfectly synced to the beat
4. Repeat for Scene A: press [FUNC] + [SCENE A] to mute, then unmute. The crossfader's left side is gated
5. **Performance trick**: Pre-position the crossfader fully right with Scene B muted. On the drop, unmute Scene B — the entire mix transforms in zero time. This is the OT's instant-drop gesture

<div data-octatrack-panel
  data-sections="scene,mix"
  data-highlights="key-scene-a:amber,key-scene-b:amber,slider-mix-crossfader:cyan"
></div>

### Exercise 5: Save and Reload (2 min)

Scenes are stored in the Part. If you don't save, they're lost on Part reload.

1. Press **[STOP]**. Save the Part: **[FUNC] + [PART]** → SAVE → confirm
2. Test the safety net: change a Scene B parameter (turn any knob with crossfader right), then reload the Part: **[FUNC] + [CUE]**. The change reverts. You're back to the saved Scene B
3. Save the Project: **[FUNC] + [PROJ]** → confirm

## Output Checklist

- [ ] I assigned Scene A to one TRIG slot and Scene B to a different TRIG slot
- [ ] Scene A and Scene B sound dramatically different
- [ ] I morphed between them with the crossfader (slow and fast gestures)
- [ ] I muted and unmuted scenes for instant jumps
- [ ] I saved the Part and Project

## Key Takeaways

- **Hold [SCENE A/B] + [TRIG] = assign that scene to that slot**. Slots are addressed by the 16 TRIG keys
- **Crossfader interpolates between Scene A's snapshot and Scene B's snapshot** — it's not a switch, it's a continuous morph controller
- **Whichever scene side is "active" (crossfader at that edge) is the side being edited** when you turn knobs
- **[FUNC] + [SCENE A/B] = mute that scene** — gates the crossfader so you can pre-set a destination and snap to it on the beat
- Scenes live in the Part — save the Part to keep them

## Next Session Preview

Next: XVOL, XLEV, and using scenes specifically for mix fades. The two volume parameters are the secret to professional-sounding scene transitions — fade tracks in, let reverb tails ring, control headroom. Performance mixing.
