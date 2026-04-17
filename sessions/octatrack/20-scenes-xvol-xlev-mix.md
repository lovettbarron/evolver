---
title: 'Session 20: XVOL, XLEV, and Mix Scenes'
session_number: 20
duration: 20
prerequisite: 19
output_type: patch
difficulty: intermediate
tags:
  - scenes
  - xvol
  - xlev
  - mix-fade
  - performance
  - track-volume
instrument: octatrack
reference: Elektron Manual Ch. 10.3.4
section: Scenes & Crossfader
instrument_type: instrument
---

# Session 20: XVOL, XLEV, and Mix Scenes

**Objective:** Use the two scene-only volume parameters — XVOL (pre-FX) and XLEV (post-FX) — to build smooth professional mix fades. Build one scene that fades tracks in via XLEV, and another that fades them out via XVOL while letting reverb tails ring.

> [!tip] If you only have 5 minutes
> On the AMP page, the VOL knob has a sibling: XVOL. On the MIXER page, the LEV knob has a sibling: XLEV. The X-prefixed versions only respond to scenes. With crossfader right, lower XLEV on a track to 0 — that track now fades out as you slide right.

## Warm-Up (3 min)

In Session 19 you used the crossfader for filter sweeps and FX changes. Now we use it for the most important performance gesture: mix automation. Press [PLAY] on a 4-track pattern from your `LAB` project. Move the crossfader. The track volumes don't change yet — that's because no XVOL/XLEV is set. By the end of this session, the slider will be your mix fader.

## Setup

Start from the `LAB` project. You need a pattern with at least 4 active tracks (Track 1 drums, Track 2 bass, Track 3 melodic, Track 4 texture). Each track should have an FX2 with reverb (Gatebox Plate or Spring) — the reverb tails matter for Exercise 3.

Place the crossfader at the center to start. Verify Scene A and Scene B exist (assign empty ones to TRIG 1 and TRIG 2 if needed via Session 19's gesture).

## Exercises

### Exercise 1: XLEV vs. VOL — What's the Difference (3 min)

Get the parameters straight before using them.

1. Press **[TRACK 1]**, then **[FUNC] + [MIX]** — or open MIXER PAGE (firmware-dependent route)
2. You'll see two volume controls per track: **LEV** (the always-on track level you've been using) and **XLEV** (only responds to scenes)
3. Press **[AMP]** on Track 1. You see **VOL** (always-on amp volume) and **XVOL** (scene-only amp volume)
4. **The distinction**:
   - **VOL / LEV** = the static value, what you hear when no scenes are pulling on the parameter
   - **XVOL / XLEV** = the scene-modulated value. When the crossfader is at one edge, the scene's XVOL/XLEV gets applied
5. **Pre-FX vs Post-FX**: XVOL is in the AMP stage, *before* FX1/FX2. XLEV is the MIXER's post-FX track level. This matters for reverb tails (next exercise)

<div data-octatrack-panel
  data-sections="scene,param"
  data-highlights="key-scene-a:amber,key-scene-b:amber,key-param-amp:cyan"
></div>

### Exercise 2: Build a Fade-In Scene with XLEV (6 min)

Make a scene where tracks gradually fade in as you slide the crossfader.

1. Slide the crossfader **fully left** (Scene A active). Set ALL tracks' LEV to taste — this is your "everything playing normally" baseline
2. Slide the crossfader **fully right** (Scene B active). Now you're editing Scene B's snapshot
3. On Track 2 (bass), open MIXER. Set **XLEV = 0** (silent in Scene B)
4. On Track 3 (melodic), set **XLEV = 0**
5. On Track 4 (texture), set **XLEV = 0**
6. Leave Track 1 (drums) at full XLEV
7. Slide the crossfader fully left — all 4 tracks play normally
8. Slide slowly toward the right. Tracks 2, 3, 4 fade out one by one (or simultaneously, depending on their starting LEV)
9. Now invert: Slide fully right. Set Track 2's XLEV back to full. Slide fully left, set Track 2's LEV to 0. Now Track 2 *fades in* as you slide right — it's silent at the left edge and full at the right
10. **The technique**: opposite values on each side = a fade in one direction; matching values = no change

### Exercise 3: Fade Out via XVOL — Let Reverb Tails Ring (5 min)

XVOL fades the *amp* signal pre-FX. The FX1/FX2 chains keep processing, so reverb tails continue. This is the classic "fade the dry signal, leave the reverb hanging" gesture.

1. Make sure Track 3 (melodic) has a generous reverb on FX2 (DECAY = 80, MIX = 60)
2. Slide crossfader **fully left** (Scene A). Track 3's VOL is normal — you hear the dry sound + reverb wash
3. Slide crossfader **fully right** (Scene B). On Track 3 AMP page, set **XVOL = 0**
4. Press [PLAY]. Slide the crossfader from left to right slowly. The dry signal fades to silence, but the reverb tail keeps ringing for several seconds — pre-FX volume cut, post-FX wash continues
5. Now do the same with **XLEV = 0** instead. The track's *post-FX* output is muted, so the reverb is killed alongside the dry signal — abrupt
6. **The rule**:
   - **XVOL = 0** → fade the dry, keep the wet (reverb tails ring out)
   - **XLEV = 0** → kill the whole channel (no tails)
7. Reverb-tail fades sound expensive and produced. Use them on chorus → outro transitions

<div data-octatrack-panel
  data-sections="scene,mix,param"
  data-highlights="slider-mix-crossfader:amber,key-param-amp:cyan,key-param-fx2:cyan"
></div>

### Exercise 4: Live Performance Mix (3 min)

Combine fade-ins and fade-outs into a 4-track performance gesture.

1. Slide left = baseline (all 4 tracks playing)
2. Slide right configuration:
   - Track 1 drums: XLEV unchanged (drums stay full)
   - Track 2 bass: XVOL = 0 (bass dry fades, leaving the reverb)
   - Track 3 melodic: XLEV = 0 (melodic disappears completely)
   - Track 4 texture: XLEV = 100 (boosted — texture takes over)
3. Press **[PLAY]**. Slowly slide left → right over 8 bars. Hear the mix transform: bass fades to wash, melody disappears, texture rises, drums stay solid
4. Slide back left over 8 bars. Hear the inverse: texture fades, melody returns, bass dry comes back over the still-decaying reverb
5. This is the OT as a 4-track performance mixer — every fade-in, fade-out, and crossfade you'd do in Ableton, but with one slider

## Output Checklist

- [ ] I located XVOL on the AMP page and XLEV on the MIXER page (separate from VOL/LEV)
- [ ] I built a scene where one track fades out as the crossfader moves right
- [ ] I built a scene where one track fades in as the crossfader moves right
- [ ] I used XVOL = 0 to fade a dry signal while keeping the reverb tail
- [ ] I performed a 4-track crossfade gesture using only the slider

## Key Takeaways

- **XVOL** = pre-FX amp volume, scene-only. Cuts the dry signal but leaves the FX tails ringing
- **XLEV** = post-FX track volume, scene-only. Cuts the entire channel including FX tails
- **Crossfader at one edge → that side's scene is being edited.** Tweaks update the snapshot, not the live values
- **Opposite values on the two scenes** = a fade in one direction. Matching values = no change. Ramped values = a slow morph
- The crossfader is the OT's mix automation lane — every track's volume can be on it

## Next Session Preview

Next: scene stacking. Instead of two scenes, you'll build progressions of 8 scenes on each side that escalate gradually. The crossfader becomes a long-form arrangement tool, walking you from intro intensity to chorus chaos and back.
