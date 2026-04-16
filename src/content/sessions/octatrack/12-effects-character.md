---
title: "Session 12: Character FX — Lo-Fi, Compressor, Comb Filter, Spatializer"
module: "Effects"
session_number: 12
duration: 25
prerequisite: 11
output_type: patch
difficulty: intermediate
tags: [effects, lo-fi, compressor, comb-filter, spatializer, dynamix, character]
instrument: octatrack
reference: "Elektron Manual Ch. 11.4.10, Appendix B"
---

# Session 12: Character FX — Lo-Fi, Compressor, Comb Filter, Spatializer

**Objective:** Use the OT's "character" effects — Lo-Fi Collection for degradation, Dynamix Compressor for glue and punch, Comb Filter for metallic resonances, Spatializer for stereo width. Build a complete lo-fi beat from scratch.

> [!tip] If you only have 5 minutes
> Track 1 with a drum loop. FX1 = LO-FI COLLECTION, BIT = 8, RATE = 80. Boom — instant lo-fi character. Add FX2 = DYNAMIX COMPRESSOR with RATIO = 60 to glue the crunch together.

## Warm-Up (2 min)

You've shaped frequency (Session 10) and added time/space (Session 11). Now we add personality — degradation, dynamics, resonance, width. Press **[PLAY]** on your last project. Imagine: this beat as a tape recording from 1992 (lo-fi), as a tight 90s hip-hop drum bus (compressor), as a metallic alien transmission (comb filter). All three are one knob away.

## Setup

Start from the `LAB` project. Track 1 should have a drum loop. Track 2 should have a melodic stab or vocal. Press **[PLAY]** to confirm both tracks have audible content.

## Exercises

### Exercise 1: Lo-Fi Collection — Beautiful Degradation (6 min)

Lo-Fi degrades audio in three controllable ways.

1. Press **[TRACK 1]**, then **[FUNC] + [FX1]** → `LO-FI COLLECTION`. Press **[NO]**
2. FX1 parameters:
   - **AMNT** (knob A) — overall amount/wet level
   - **BIT** — bit depth (16 = clean, 4 = crushed)
   - **SRR** — sample rate reduction (127 = original, 0 = destroyed)
   - **CSP** — vinyl crackle/noise
   - **WAR** — pitch wobble (warble, like worn tape)
   - **MIX** — wet/dry
3. Press **[PLAY]**. Set BIT = `8`, SRR = `100`, MIX = `50`. The drums get crunchy
4. Drop SRR to `60` — sounds like a 90s sampler (12-bit hip-hop territory)
5. Add CSP = `40`, WAR = `30` — vinyl crackle and tape wobble. Lo-fi hip-hop in one effect
6. **Pro move**: keep MIX moderate (40-60). Full wet kills the source's transients

### Exercise 2: Dynamix Compressor — Glue and Punch (5 min)

Compression evens out volume peaks. On the OT it also gives drums punch through pumping.

1. Press **[TRACK 1]**, **[FUNC] + [FX2]** → `DYNAMIX COMPRESSOR`. Press **[NO]**
2. FX2 parameters:
   - **THR** — threshold (loudness above which compression kicks in)
   - **RAT** — ratio (how much compression)
   - **ATK** — attack speed (fast = catches transients, slow = lets them through)
   - **REL** — release speed
   - **MIX** — wet/dry (parallel compression possible)
   - **MUP** — makeup gain (loudness compensation)
3. Set THR = `40`, RAT = `60`, ATK = `30`, REL = `60`, MUP = `40`
4. Press **[PLAY]**. Drums sound tighter, denser. The compressor is gluing them together
5. **Pumping trick**: set THR very low (= `10`), RAT very high (= `100`), REL slow (= `30`). Now the compressor "breathes" — sucks down on each kick, releases for the rest of the beat. Sidechain-style pumping without a sidechain
6. Combine with Lo-Fi (FX1) for crunchy, glued, punchy drums

### Exercise 3: Comb Filter — Metallic Resonance (4 min)

A comb filter creates resonant peaks at harmonic intervals — the sound of metal pipes, tube resonance.

1. Press **[TRACK 2]** (melodic), **[FUNC] + [FX1]** → `COMB FILTER`. Press **[NO]**
2. FX1 parameters:
   - **PIT** — pitch of the resonance (where the comb tuning sits)
   - **FB** — feedback (how strong the resonance)
   - **LP** — low-pass on the feedback (smooths metallic harshness)
   - **WIDTH** — stereo spread
   - **MIX** — wet/dry
3. Press **[PLAY]**. Set PIT = `60`, FB = `80`, MIX = `50`
4. Sweep PIT slowly — you hear the resonance retune like a tuned percussion instrument
5. Drop LP to `60` for a darker, smoother resonance. Push it to `127` for sharp metallic ringing
6. **Tonal trick**: set PIT to musical pitches — try PIT values that align to your project key. Comb filter at the right pitch turns noise into pitched material

### Exercise 4: Spatializer — Stereo Width (3 min)

Mono signal in, wide stereo out. Cheap and effective.

1. Press **[TRACK 2]**, **[FUNC] + [FX2]** → `SPATIALIZER`. Press **[NO]**
2. FX2 parameters:
   - **WIDTH** — stereo expansion (0 = mono, 127 = max width)
   - **OFFSET** — phase offset between L/R
   - **MIX** — wet/dry
3. Press **[PLAY]**. Drag WIDTH from 0 to 127. Mono melodic stab spreads across the stereo field
4. Adjust OFFSET — the spread shifts left or right. Useful when you have multiple tracks that need different stereo placements
5. **Caution**: spatializer can cause phase issues if a sound plays back in mono later. Always check by collapsing to mono (or using a mono headphone)

### Exercise 5: Build a Lo-Fi Beat from Scratch (5 min)

Layer everything you learned into a 4-track lo-fi pattern.

1. **Track 1 (kick)** — Flex, kick sample. FX1 = Lo-Fi Collection (BIT = 8, SRR = 80, WAR = 20). FX2 = Dynamix Compressor (THR = 30, RAT = 70). Punchy + lo-fi
2. **Track 2 (snare)** — Flex, snare sample. FX1 = Lo-Fi (lighter — BIT = 12, SRR = 100, MIX = 30). FX2 = Plate Reverb (TIME = 30, MIX = 25). Dusty 90s snare
3. **Track 3 (hat)** — Flex, hat sample. FX1 = Multi Mode Filter (HP, FREQ = 50). Trims low end, tight clicks
4. **Track 4 (chord stab)** — Flex, chord one-shot. FX1 = Comb Filter (light: PIT = 60, FB = 30, MIX = 25). FX2 = Spatializer (WIDTH = 90)
5. Place trigs:
   - Track 1: 1, 5, 9, 13 (kicks on every beat)
   - Track 2: 5, 13 (snares on 2 and 4)
   - Track 3: 3, 7, 11, 15 (hats on offbeats)
   - Track 4: 1, 9 (chords on beats 1 and 3)
6. Press **[PLAY]**. You have a lo-fi beat with character on every track. Save: **[FUNC] + [PROJ]**

## Exploration (if time allows)

- Try the Lo-Fi Collection on the master via a Master track (Module 8) for cohesive lo-fi treatment across the full mix
- P-lock the Comb Filter PIT parameter on individual steps — it becomes a tuned percussion sequence
- Use Spatializer on a mono Static backing track to widen it without re-recording in stereo

## Output Checklist

- [ ] I tried all 5 Lo-Fi parameters (BIT, SRR, CSP, WAR, MIX) and heard their effect
- [ ] I used the Dynamix Compressor for glue and tried the pumping trick (low THR, high RAT, slow REL)
- [ ] I swept the Comb Filter PIT to hear metallic retuning
- [ ] I widened a track with the Spatializer
- [ ] I built a complete 4-track lo-fi beat from scratch
- [ ] I saved the project

## Key Takeaways

- **Lo-Fi Collection** = bit reduction + sample rate reduction + crackle + wobble — full vintage character in one effect
- **Dynamix Compressor** = glue, punch, optional pumping — typically on drums/bus material
- **Comb Filter** = pitched resonant peaks — turns noise into metallic tone
- **Spatializer** = mono-to-stereo widener — but watch for phase if sources collapse to mono later

## Next Session Preview

Next: sequencer deep dive starts. Module 5 — grid recording vs. live recording, all 7 trig types (sample, note, lock, trigless, one-shot, swing, slide). The sequencer is where your patterns transform from beats into compositions.
