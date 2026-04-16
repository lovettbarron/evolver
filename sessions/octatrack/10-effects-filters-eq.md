---
title: "Session 10: Filters & EQ — Multi Mode, Parametric, DJ Kill"
module: "Effects"
session_number: 10
duration: 25
prerequisite: 9
output_type: patch
difficulty: intermediate
tags: [effects, filter, multi-mode, parametric-eq, dj-kill-eq, fx1]
instrument: octatrack
reference: "Elektron Manual Ch. 11.4.10, Appendix B"
---

# Session 10: Filters & EQ — Multi Mode, Parametric, DJ Kill

**Objective:** Master the OT's three frequency-shaping effects — the 12/24dB Multi Mode Filter for sweeps, the Parametric EQ for surgery, and the DJ Kill EQ for performance. Apply a filter to a drum loop and automate the cutoff via a p-lock.

> [!tip] If you only have 5 minutes
> Track 1 with a drum loop. FX1 = 12/24DB MULTI MODE FILTER, MODE = LP, FREQ = 60. You hear muted thump. Turn FREQ to 100 — the loop opens. That's the workhorse effect, learned.

## Warm-Up (2 min)

From Session 09, you have a Pickup machine looping. Press **[PLAY]**. While it plays, you might already be thinking "I want this part to be brighter, that part darker." That instinct is what filters and EQ exist for. Stop. Time to build the toolkit.

## Setup

Start from the `LAB` project. Track 1 should have a drum loop or beat (any 1-2 bar loop). Place trigs across the pattern (e.g., trigs on 1, 5, 9, 13 for kicks; or use a sliced break with sample locks). Press **[PLAY]** to confirm sound.

## Exercises

### Exercise 1: 12/24dB Multi Mode Filter — The Workhorse (7 min)

The Multi Mode Filter is on every OT track. You'll use it more than any other effect.

1. Press **[TRACK 1]**, then **[FUNC] + [FX1]** to open FX1 SETUP
2. Turn knob A to choose `12/24DB MULTI MODE FILTER`. Press **[NO]** to exit
3. On the FX1 page, the parameters are now:
   - **MODE** (knob A) — `LP1`, `LP2`, `BP1`, `BP2`, `HP1`, `HP2`, `BR` (band reject), `PK` (peak)
   - **FREQ** (knob B) — cutoff, 0-127
   - **RES** (knob C) — resonance, 0-127
   - **TYPE** (knob D) — `12DB` (smooth) or `24DB` (steeper)
   - **ATK / DEC** (knob E/F) — envelope on the filter
4. Set MODE = `LP2`, FREQ = `60`, RES = `40`, TYPE = `12DB`. Press **[PLAY]**
5. Slowly turn FREQ from 0 to 127 — classic filter sweep
6. Bring RES up to `90` — resonant peak emerges. Beautiful and dangerous
7. Try MODE = `HP2` for a high-pass sweep (removes low end as you raise FREQ)
8. Try MODE = `BP2` for a band-pass (only mid frequencies pass)

<div data-octatrack-panel
  data-sections="param"
  data-highlights="key-param-fx1:amber"
></div>

### Exercise 2: P-Lock the Filter Cutoff (5 min)

Static filters are fine. Animated filters are music.

1. With FX1 = Multi Mode Filter set up, set FREQ = `100` (open) and stop the sequencer
2. Hold **[TRIG 5]** — the screen shows "Step 5 LOCKED". While holding, turn knob B (FREQ) down to `40`
3. Release [TRIG 5]. Step 5 now has a p-lock: the cutoff drops on that step only
4. Press **[PLAY]**. You'll hear a momentary filter close on beat 2 (where step 5 is in a 16-step pattern)
5. Repeat: hold **[TRIG 9]** + turn FREQ to `30`. Hold **[TRIG 13]** + turn FREQ to `60`. Now the filter is animated across the pattern
6. Look at the pattern — locked trigs show a different LED color (often amber/yellow vs. red)

### Exercise 3: 2-Band Parametric EQ — Surgical Cuts (5 min)

Parametric EQ is for fixing problems and shaping tone, not for sweeps.

1. Press **[FUNC] + [FX2]** to open FX2 SETUP. Choose `2 BAND PARAMETRIC EQ`. Press **[NO]**
2. FX2 parameters:
   - **F1 / F2** — frequency for band 1 and band 2
   - **G1 / G2** — gain for each band (cut or boost)
   - **Q1 / Q2** — bandwidth (narrow or wide)
3. Set F1 = `40` (low-mid), G1 = `-12` (cut), Q1 = `60` (medium width)
4. Set F2 = `90` (high), G2 = `+6` (boost), Q2 = `40` (wider)
5. Press **[PLAY]** — the loop has its low-mids cut (often muddy area) and highs boosted (presence)
6. **Surgical cut workflow**: boost a band by +12, sweep the FREQ to find an offending resonance, then flip the gain to -12 to cut just that frequency. Standard mixing technique

### Exercise 4: DJ Style Kill EQ — Performance Mode (4 min)

DJ Kill is built for hands-on performance. Three bands, each can be cut to silence.

1. Press **[TRACK 2]** — load a different sample/loop, or duplicate Track 1's content
2. Press **[FUNC] + [FX1]** → choose `DJ STYLE KILL EQ`. Press **[NO]**
3. FX1 parameters:
   - **HI** — high band (cut/pass)
   - **MID** — mid band
   - **LO** — low band
4. Press **[PLAY]**. With all 3 bands at center (no cut), audio is full-range
5. Pull **LO** all the way down — bass disappears. Pull **MID** down — vocals/melody disappear. Pull **HI** down — top end disappears
6. **Performance trick**: kill the LO during a buildup, slam it back in on the drop. Use scenes (Module 7) to automate this with the crossfader

### Exercise 5: Combine All Three (2 min)

Build a pattern that uses everything you learned.

1. Track 1 (drum loop): FX1 = Multi Mode Filter (LP, RES = 50, p-locked cutoff per step), FX2 = Parametric EQ (cut low-mid mud, boost high)
2. Track 2 (bass): FX1 = DJ Kill (LO open, MID/HI cut for bass-only)
3. Press **[PLAY]**. Listen to the sculpted mix
4. Save the project: **[FUNC] + [PROJ]**

## Exploration (if time allows)

- Try MODE = `BR` (band reject / notch) — cuts a narrow band rather than passing one. Useful for de-essing or removing a specific frequency
- Set the Multi Mode Filter MODE = `PK` (peak) for a resonant boost at FREQ — like a wah pedal frozen in place
- Use an LFO on FILTER FREQ (Module 6) for hands-free filter sweeps

## Output Checklist

- [ ] I assigned the 12/24dB Multi Mode Filter to FX1 and swept the cutoff
- [ ] I p-locked the filter cutoff on at least 3 steps
- [ ] I used the Parametric EQ to cut a problem frequency and boost another
- [ ] I performed with the DJ Kill EQ — pulling bands down and back up
- [ ] I built a pattern combining filter + EQ on multiple tracks
- [ ] I saved the project

## Key Takeaways

- **Multi Mode Filter** is your most-used effect — sweeps, resonant peaks, modes for any flavor (LP/HP/BP/BR/PK)
- **Parametric EQ** is for tone shaping and surgical fixes — not for sweeps
- **DJ Kill EQ** is for performance — pull bands down for buildups and breakdowns
- P-locking the FREQ parameter on a filter is one of the most musical things you can do on the OT

## Next Session Preview

Next: time-based effects — delay, reverb, chorus, phaser, flanger. The Echo Freeze Delay is the OT's signature effect; you'll learn the freeze trick and build a dub-style pattern.
