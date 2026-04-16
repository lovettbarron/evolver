---
title: "Session 11: Time-Based FX — Delay, Reverb, Chorus, Phaser, Flanger"
module: "Effects"
session_number: 11
duration: 25
prerequisite: 10
output_type: patch
difficulty: intermediate
tags: [effects, delay, reverb, chorus, phaser, flanger, echo-freeze, fx2]
instrument: octatrack
reference: "Elektron Manual Ch. 11.4.10, Appendix B"
---

# Session 11: Time-Based FX — Delay, Reverb, Chorus, Phaser, Flanger

**Objective:** Master the OT's time-based effects — the signature Echo Freeze Delay (with its buffer freeze trick), the three reverbs (Plate, Spring, Dark), and the modulation FX (chorus, phaser, flanger). Build a dub-style delay pattern.

> [!tip] If you only have 5 minutes
> FX2 = ECHO FREEZE DELAY. Set TIME = 32 (half-note sync), FB = 70 (lots of feedback). Place a single trig on step 1 with a vocal or stab sample. The delay carries it through the whole pattern. That's dub.

## Warm-Up (2 min)

From Session 10, your filter-and-EQ chops are sharp. Now we add depth and space. Press **[PLAY]** on a pattern with a drum loop. Imagine: that loop in a small bathroom (slap delay), a concert hall (long reverb), a cassette recorder (chorus pitch wobble). All three are coming.

## Setup

Start from the `LAB` project with Track 1 = drum loop and Track 2 = a melodic sample (synth stab, chord, vocal phrase). Have at least one trig on each track. Press **[PLAY]** to confirm.

## Exercises

### Exercise 1: Echo Freeze Delay — The OT's Signature Effect (8 min)

Every Octatrack player knows Echo Freeze. It's not just a delay — it can capture and loop the buffer.

1. Press **[TRACK 2]** (your melodic track), then **[FUNC] + [FX2]** to open FX2 SETUP
2. Choose `ECHO FREEZE DELAY`. Press **[NO]**
3. FX2 parameters:
   - **TIME** (knob A) — delay time. Sync mode: 1=32nd, 2=16th, 4=8th, 8=quarter, 16=half, 32=whole. Free mode = ms
   - **FB** (knob B) — feedback amount, 0-127. Above 100 starts to self-oscillate
   - **HP / LP** — high-pass / low-pass on the feedback path (color the repeats)
   - **WIDTH** — stereo spread of repeats
   - **MIX** — wet/dry balance
   - **FREEZE** — toggle. Captures and loops the current buffer
4. Set TIME = `8` (8th note), FB = `60`, MIX = `30`. Press **[PLAY]**
5. The melodic stab now has a series of repeats — classic delay
6. Turn FB up to `90`. Repeats get longer and more dense. Approaching feedback chaos
7. Turn HP up to `40` — repeats become thinner, less muddy. Standard dub move
8. Turn LP down to `60` — repeats get darker, more vintage

<div data-octatrack-panel
  data-sections="param"
  data-highlights="key-param-fx2:amber"
></div>

### Exercise 2: The Freeze Trick (4 min)

Freeze captures whatever is currently in the delay buffer and loops it indefinitely.

1. With Echo Freeze running on Track 2, set FB = `70` so there's a healthy delay tail
2. Hold **[TRIG]** on a step where a strong note hits. While the note is in the delay buffer, **toggle FREEZE = ON** (turn the FREEZE knob)
3. The current buffer locks — repeating endlessly. Even if the source stops, the freeze keeps going
4. Now play the source again. Freeze is still locked, so the new audio passes dry through
5. Toggle FREEZE = OFF when you want to release — the delay tail unfreezes and decays naturally
6. **P-lock the freeze**: hold a [TRIG], turn FREEZE to ON, release. That step toggles freeze; another step can toggle it off. You can sequence freeze on/off rhythmically

### Exercise 3: The Three Reverbs (5 min)

OT has three reverb algorithms — each has a distinct character.

1. Press **[TRACK 1]** (drum loop). Press **[FUNC] + [FX1]** → choose `GATEBOX PLATE REVERB`. Press **[NO]**
2. FX1 parameters:
   - **TIME** — decay length
   - **PRE** — pre-delay (silence before reverb starts)
   - **HP / LP** — frequency shaping on the reverb tail
   - **GATE** — gate length (Gatebox = gated reverb, classic 80s drums)
   - **MIX** — wet/dry
3. Set TIME = `60`, PRE = `20`, MIX = `30`. Listen — the drums get a Phil Collins-style ambient halo
4. Now switch the effect: **[FUNC] + [FX1]** → `SPRING REVERB`. Distinctive boingy character — surf-rock guitar amp
5. Switch again: `DARK REVERB`. Dense, atmospheric, long. Best for ambient pads
6. **Pick the right reverb**: Plate for vocals/snares (smooth), Spring for character (boingy), Dark for textures (atmospheric)

### Exercise 4: Modulation FX — Chorus, Phaser, Flanger (4 min)

Three quick stops on the modulation FX tour.

1. Press **[TRACK 2]** (your melodic). Set **[FUNC] + [FX1]** → `2 10 TAP CHORUS`. TIME = `40`, FB = `30`, MIX = `40`. Listen — adds width and shimmer
2. Switch FX1 → `2 10 STAGE PHASER`. Adjust SPEED, FB. Get the classic sweeping movement (sounds like a jet)
3. Switch FX1 → `FLANGER`. Like phaser but more metallic/sharper. SPEED low + FB high = comb-filter resonance
4. **Quick mental map**:
   - **Chorus** = thickening, width (subtle)
   - **Phaser** = swirling movement (medium intensity)
   - **Flanger** = metallic jet whoosh (intense)

### Exercise 5: Build a Dub-Style Pattern (2 min)

Combine everything.

1. Track 1 (drums) — FX1 = Plate Reverb (TIME = 40, MIX = 20)
2. Track 2 (stab) — FX1 = Multi Mode Filter (LP, slowly modulated cutoff via LFO Module 6 preview), FX2 = Echo Freeze Delay (TIME = 16, FB = 70, MIX = 35)
3. Mute Track 2 with **[FUNC] + [TRACK 2]**. Drums alone with reverb tails
4. Unmute Track 2. The stab fires, delay carries it through. Mute again — delay tails ring out over the drums
5. Save: **[FUNC] + [PROJ]**

## Exploration (if time allows)

- Try TIME = `64` (whole note) on Echo Freeze with FB = 30 for slow dub-style washes
- P-lock the FREEZE parameter to toggle on at step 1 and off at step 9 — half-bar of frozen buffer
- On the Chorus, set TIME high and FB high — turns into a comb-filter-like resonance, not a chorus

## Output Checklist

- [ ] I configured Echo Freeze Delay on at least one track
- [ ] I used the Freeze toggle to lock and release the delay buffer
- [ ] I tried all three reverbs (Plate, Spring, Dark) and can describe their differences
- [ ] I sampled the chorus, phaser, and flanger
- [ ] I built a dub-style pattern with delay tails carrying over muted/unmuted melodic tracks
- [ ] I saved the project

## Key Takeaways

- **Echo Freeze Delay** is the OT's most distinctive effect — sync to tempo, freeze for ambient pads, p-lock for rhythmic freeze gestures
- **Three reverbs**: Plate (smooth), Spring (boingy/character), Dark (atmospheric/long)
- **Modulation trio**: Chorus (subtle thickening), Phaser (swirling sweep), Flanger (metallic jet)
- Time-based effects + muting = dub workflow: source mutes but the tails keep going

## Next Session Preview

Next: character effects — Lo-Fi Collection (bit/sample-rate reduction), Dynamix Compressor (glue), Comb Filter (metallic resonance), Spatializer (stereo width). The "destruction and detail" effects.
