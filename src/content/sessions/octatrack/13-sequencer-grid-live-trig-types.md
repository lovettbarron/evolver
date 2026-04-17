---
title: 'Session 13: Grid & Live Recording — All Trig Types'
session_number: 13
duration: 20
prerequisite: 12
output_type: recording
difficulty: intermediate
tags:
  - sequencer
  - grid-recording
  - live-recording
  - trig-types
  - sample-trigs
  - note-trigs
  - lock-trigs
instrument: octatrack
reference: Elektron Manual Ch. 12; Merlin Ch. 4
section: Sequencer Deep Dive
instrument_type: instrument
---

# Session 13: Grid & Live Recording — All Trig Types

**Objective:** Switch fluently between Grid Recording (step entry) and Live Recording (real-time tap-in), and place each of the OT's 7 trig types — sample, note, lock, trigless, one-shot, swing, slide. Hear the difference each makes.

> [!tip] If you only have 5 minutes
> Press [RECORD] = Grid Mode (place trigs). Press [PLAY] + [RECORD] = Live Mode (tap trigs in real time). Try each. Live mode feels like a drum machine; Grid mode feels like a piano roll.

## Warm-Up (2 min)

Up to now, you've placed trigs in Grid Recording mode (press **[RECORD]**, tap **[TRIG]** keys). That's one of two recording modes. The other — Live Recording — turns the OT into a real-time drum machine. You're about to feel the difference.

## Setup

Start from the `LAB` project. Track 1 should have a drum loop or kit (a kick on a Flex slot is fine). Tracks 2-3 should have other percussion or melodic samples. Set tempo to `120` BPM (**[TEMPO]** + Level knob).

## Exercises

### Exercise 1: Grid Recording — Step Entry (4 min)

Grid mode places trigs on specific steps without playback running.

1. Press **[STOP]** (sequencer stopped). Press **[RECORD]** — RECORD LED steady on
2. Press **[TRACK 1]**. Now press **[TRIG 1]**, **[TRIG 5]**, **[TRIG 9]**, **[TRIG 13]** — kicks on every beat
3. Press **[TRACK 2]** (snare). Press **[TRIG 5]**, **[TRIG 13]** — snares on beats 2 and 4
4. Press **[TRACK 3]** (hat). Press **[TRIG 3]**, **[TRIG 7]**, **[TRIG 11]**, **[TRIG 15]** — hats on offbeats
5. Press **[PLAY]** to listen — basic 4-on-the-floor with hat. Press **[STOP]**, **[RECORD]** to exit grid mode

### Exercise 2: Live Recording — Real-Time Tap (4 min)

Live mode lets you tap trigs while the sequencer plays — like playing a drum pad live.

1. Clear the pattern: **[FUNC] + [CLEAR]** while in Grid Recording (clears track), or just press **[TRIG]** keys to remove trigs
2. Press **[PLAY]** — sequencer running with empty pattern. Press **[RECORD]** while playing — both LEDs lit. You're in **Live Recording**
3. Press **[TRACK 1]** (kick). Now tap **[TRIG 1]** in time with the click — tap once per bar
4. Switch to Track 2 (**[TRACK 2]**), tap **[TRIG 1]** to lay snares on the beat
5. Live mode quantizes to the nearest step (default). Your taps land on grid positions
6. Press **[RECORD]** to exit live mode but keep playing. Press **[STOP]** to end

### Exercise 3: Sample Trigs vs. Note Trigs (3 min)

Two fundamentally different trig types.

1. Press **[STOP]**, **[RECORD]**. Press **[TRACK 1]**. Tap **[TRIG 1]** — that's a **SAMPLE TRIG** (default). It plays the track's current sample
2. Now make a NOTE TRIG: hold **[FUNC]** + tap **[TRIG 1]** to remove the sample trig. Then press **[TRIG 5]** — sample trig
3. **Note trigs** are for melodic playback: hold a [TRIG] key + turn knob A on the SRC page to set a pitch. Note trigs play the sample at that pitch
4. Hold **[TRIG 5]**, look at the screen — it shows current parameters for that step. Turn Data Entry knob B (or look for PITCH) to set the played pitch
5. Note trigs are LEDed slightly differently than sample trigs — usually a different color brightness

<div data-octatrack-panel
  data-sections="trig"
  data-highlights="key-trig-1:cyan,key-trig-5:amber,key-trig-9:cyan,key-trig-13:amber"
></div>

### Exercise 4: Lock Trigs, Trigless Trigs, One-Shot Trigs (4 min)

Three less-common but powerful trig types.

1. **Lock trig** — a trig that *only* changes parameters, doesn't trigger sample. Useful for parameter changes mid-pattern without re-triggering audio
   - Hold a step that's already a sample trig. Press **[FUNC]** while holding to convert to a lock trig (or vice-versa). LED color changes. Now that step's p-locks apply, but the sample doesn't re-trigger
2. **Trigless trig** — pure parameter automation, no sample play. Same as a lock trig in newer firmware. Used heavily for filter sweeps without re-triggering each step
3. **One-shot trig** — fires only once, then stops the trig. Useful for fills that happen exactly once (you have to manually re-arm). Held **[FUNC] + [TRIG]** in Bank Selector mode toggles ONE SHOT (firmware-dependent)

### Exercise 5: Swing Trigs and Slide Trigs (5 min)

Two trig types that change feel.

1. **Swing**: not a trig type per se, but a per-track or per-pattern setting. Press **[FUNC] + [TEMPO]** to access SWING — adjust 50-80% (50% = no swing, 60% = light swing, 75% = heavy shuffle)
2. With swing at 60%, your hat pattern (3, 7, 11, 15) feels groovier — the offbeats land slightly late
3. **Slide trig**: glides parameters from the previous step's value to this step's value. Useful for portamento, filter sweeps, pitch slides
   - Hold a [TRIG] step that has different parameter values from the previous step. Press the SLIDE button (or use the trig types menu, firmware-dependent)
   - On playback, the parameters interpolate smoothly between steps instead of jumping
4. Try slide on a note trig: step 1 plays note `C2`, step 9 plays note `G2`, slide trig on step 9 — pitch glides from C2 to G2 over the intervening time

## Exploration (if time allows)

- In Live Recording mode, press **[FUNC] + [TRACK]** to mute that track during recording — useful for "drop-in" overdubs
- Try unquantized live recording: in PROJECT > MIDI/SYNC, set RECORD QUANTIZE = OFF. Now your taps land exactly when you tapped (microtiming)
- Combine: place sample trigs on beats 1, 5, 9, 13. Place lock trigs on 3, 7, 11, 15 — those steps p-lock the filter cutoff to descending values. Result: 4-on-the-floor with a stair-step filter sweep, but the sample only re-triggers on the kick

## Output Checklist

- [ ] I placed trigs in Grid Recording mode
- [ ] I placed trigs in Live Recording mode while playback ran
- [ ] I created at least one note trig with a custom pitch
- [ ] I converted a sample trig to a lock/trigless trig
- [ ] I adjusted swing and heard the rhythmic shift
- [ ] I tried at least one slide trig with parameter interpolation

## Key Takeaways

- **[RECORD] alone = Grid Recording** (step entry, sequencer stopped); **[PLAY] + [RECORD] = Live Recording** (tap in time)
- **7 trig types**: sample (default), note (pitched), lock (params only), trigless (=lock), one-shot, swing (groove setting), slide (parameter glide)
- **Lock/trigless trigs** are the secret to changing sound mid-pattern without re-triggering — heavy use case in p-lock-driven patterns
- **Swing** and **slide** are the feel/expression layer — they make patterns groove instead of march

## Next Session Preview

Next: parameter locks. The OT's most powerful compositional feature. Lock the filter cutoff on step 5. Lock a different sample on step 9. Build a melody from a single note sample by p-locking pitch. This is where compositions emerge from beats.
