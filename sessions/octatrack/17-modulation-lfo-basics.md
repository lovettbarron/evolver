---
title: "Session 17: LFO Basics — 3 LFOs Per Track"
module: "Modulation & LFOs"
session_number: 17
duration: 20
prerequisite: 16
output_type: patch
difficulty: intermediate
tags: [lfo, modulation, wobble, sync, free-running, per-track]
instrument: octatrack
reference: "Elektron Manual Ch. 11.4.7-11.4.9"
---

# Session 17: LFO Basics — 3 LFOs Per Track

**Objective:** Use the OT's three per-track LFOs to add automated movement. LFO1 modulates filter frequency for classic wobble. LFO2 modulates panning for stereo motion. Understand sync vs. free-running modes and trig vs. continuous behavior.

> [!tip] If you only have 5 minutes
> Press [LFO]. Set DEST1 = FILTER FREQ, DEPTH1 = 60, SPEED1 = 16 (sync to 16th notes). Wave1 = SINE. You hear a wobble bass — instant dub. That's LFO1, used.

## Warm-Up (2 min)

You've shaped sound, sequenced it, and added micro-feel. Now we add automated movement. Each track has 3 LFOs running in parallel — that's 24 modulation sources across an 8-track pattern. Press **[PLAY]** on your current pattern. Imagine: the filter on track 1 sweeping rhythmically, the panning on track 2 swirling, the delay time on track 3 wandering. All hands-free.

## Setup

Start from the `LAB` project. Tracks 1-3 should have working content (drums + melodic). Track 1 should have a filter assigned to FX1 (Multi Mode Filter from Session 10) so we have a target. Press **[PLAY]** to confirm.

## Exercises

### Exercise 1: Open the LFO Page (3 min)

Each track has its own LFO page with 3 LFOs.

1. Press **[TRACK 1]** to select your track
2. Press **[LFO]** to open the LFO page (the Track Parameter page for LFOs)
3. The screen shows 3 LFO rows, each with parameters:
   - **WAVE** (waveform: SINE, TRI, SQUARE, SAW, RAMP, EXP, RANDOM, NOISE)
   - **SPEED** (rate: 0-127. Free mode = absolute, sync mode = beat divisions)
   - **DEPTH** (modulation amount: -64 to +64 — bipolar)
   - **DEST** (destination parameter)
   - **MODE** (FREE, TRIG, HOLD, ONE)
   - **MULT** (speed multiplier)

<div data-octatrack-panel
  data-sections="param"
  data-highlights="key-param-lfo:amber"
></div>

### Exercise 2: LFO1 — Filter Wobble (5 min)

The classic dub filter wobble.

1. On the LFO page for Track 1:
   - **WAVE1** = `SINE`
   - **SPEED1** = `16` (in sync mode = 16th notes)
   - **DEPTH1** = `60`
   - **DEST1** = `FX1 FREQ` (the Multi Mode Filter cutoff)
   - **MODE1** = `FREE` (LFO runs continuously, ignores trigs)
2. Press **[PLAY]**. The kick now has a smooth filter wobble at 16th-note rate
3. Try faster: SPEED1 = `8` (8th note wobble — more obvious). Or slower: SPEED1 = `32` (slow undulation)
4. Try different waves:
   - `SQUARE` = stepped, on/off filter
   - `SAW` = ramp down then snap up — sounds like a slow tape stop loop
   - `RANDOM` = jittery, glitchy filter (S&H style)
5. Adjust DEPTH1 to taste — `+30` is subtle, `+90` is dramatic, `-50` modulates inversely

### Exercise 3: LFO2 — Panning Movement (4 min)

Add LFO2 on top — they run independently.

1. On the same LFO page (Track 1):
   - **WAVE2** = `SINE`
   - **SPEED2** = `4` (very slow, 4 beats per cycle)
   - **DEPTH2** = `40`
   - **DEST2** = `AMP BAL` (panning balance)
   - **MODE2** = `FREE`
2. Press **[PLAY]**. The track now wobbles in filter AND drifts left-right in stereo
3. Two modulation lines moving independently — already a much richer sound from one track

### Exercise 4: LFO Modes — TRIG vs. FREE vs. HOLD (4 min)

The MODE parameter changes when the LFO restarts.

1. Set MODE1 = `TRIG`. Press **[PLAY]**. The LFO restarts from phase 0 every time a trig fires
2. Listen — every kick is in the same phase of the wobble (predictable, rhythmic)
3. Now set MODE1 = `FREE`. The LFO runs continuously regardless of trigs — the wobble's phase relative to the beat drifts
4. Set MODE1 = `HOLD`. LFO stops at its current value when no trigs are firing — useful for sample-and-hold style modulation
5. Set MODE1 = `ONE`. Plays through one cycle on each trig, then stops — perfect for envelope-like ramps
6. **When to use which**:
   - `TRIG` for tight, on-the-grid modulation (every kick gets the same wobble)
   - `FREE` for floating, ambient modulation (drifts)
   - `HOLD` for stepped sequences via S&H + RANDOM wave
   - `ONE` for one-shot envelope-like modulation per trig

### Exercise 5: SPEED Sync vs. Free Mode (4 min)

Sync mode locks LFO speed to musical divisions; free mode is absolute Hz.

1. Hold the SPEED1 knob (or look for a sync toggle on the LFO setup page — **[FUNC] + [LFO]**)
2. In sync mode (default), SPEED values represent musical divisions: `1`=128th, `2`=64th, `4`=32nd, `8`=16th, `16`=8th, `32`=quarter, `64`=half, `128`=whole
3. Switch to free mode — SPEED is now in Hz. Useful for non-musical modulation (slow drift cycles, sub-audio rates)
4. Try free mode SPEED = `1.5 Hz` for a slow swelling motion that doesn't lock to the beat — feels organic, alive
5. **Rule of thumb**: sync for rhythmic modulation, free for organic/ambient modulation

## Exploration (if time allows)

- Try LFO3 on FX2 MIX (delay wet level) — your delay swells in and out automatically
- Set LFO1 + LFO2 to the same destination (FILTER FREQ) but different speeds and depths — complex compound modulation
- P-lock the LFO depth or destination per step — the same LFO modulates different parameters at different sections of the pattern

## Output Checklist

- [ ] I assigned LFO1 to FX1 FREQ with sync speed and heard the wobble
- [ ] I tried different waveforms (SINE, SQUARE, SAW, RANDOM) and described their character
- [ ] I assigned LFO2 to AMP BAL for stereo panning movement
- [ ] I tried all 4 LFO modes (FREE, TRIG, HOLD, ONE) and felt the difference
- [ ] I switched between sync and free SPEED modes
- [ ] I saved the project with at least 2 active LFOs

## Key Takeaways

- **3 LFOs per track** = 24 modulation sources across an 8-track pattern. Use them all
- **DEST** can target almost any parameter — filter, pan, delay time, volume, even other LFO speeds
- **MODE** matters: `TRIG` for grid-aligned, `FREE` for drifting, `HOLD` for S&H, `ONE` for envelope-like
- **Sync vs. free SPEED**: sync for musical rhythm, free for organic drift

## Next Session Preview

Next: the LFO Designer. Draw your own 16-step custom waveshape. Assign it to sample START — the LFO scrubs through the sample. Combine with p-locks for deeply evolving textures. The OT's most distinctive modulation tool.
