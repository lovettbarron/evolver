---
title: "Session 05: Hard Sync -- The Classic Sound"
module: "Analog Oscillators"
session_number: 5
duration: 25
prerequisite: 3
output_type: patch
difficulty: intermediate
tags: [analog-oscillators, hard-sync, sync-lead, prophet, timbre]
instrument: evolver
reference: "Anu Kirk p.17-21, DSI Manual p.15"
---

# Session 05: Hard Sync -- The Classic Sound

**Objective:** Understand and use hard sync to create harmonically complex, aggressive timbres -- the signature sound of Dave Smith's synthesizers since the Prophet-5.

> [!tip] If you only have 5 minutes
> Load the basic patch, set Osc 3+4 Level to 0, Osc 2 Level to 0, turn Sync 2->1 ON. Hold a note and slowly raise Osc 1 Frequency from C0 to C4. You will hear the timbre morph while the pitch stays locked.

## Warm-Up (3 min)

Load your PWM Strings patch from Session 04. Play a sustained note and listen to the swirling pulse width modulation. That was LFO-driven timbral movement. Today you will explore a different kind of timbral transformation using hard sync. Load the basic patch when ready.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0`
- Set **Osc 2 Level** to `0` (we want to hear only Osc 1, but Osc 2 will control it)
- Set **Osc 1 Shape** to `Saw`
- Verify both oscillators are at Frequency `C0`

<div data-evolver-panel data-knobs="knob-osc-frequency:0,knob-osc-shapepw:64,knob-osc-level:0" data-highlights="knob-osc-level:blue,switch-sync:amber" data-sections="oscillators" data-zoom="oscillators"></div>

## Exercises

### Exercise 1: What Sync Does (5 min)

1. Turn **Sync 2->1** to `ON` (the SYNC switch lights up) -- "whenever oscillator 2 resets, it will also reset oscillator 1" (DSI Manual p.15)
2. Play a note -- you should hear it sound the same as before, because both oscillators are at the same frequency so sync has no effect
3. Now slowly raise **Osc 2 Frequency** from `C0` up through `C1`, `C2`, `C3` -- you should hear the pitch change because Osc 2 now controls Osc 1's pitch
4. Set Osc 2 back to `C0`. Now raise **Osc 1 Frequency** instead, from `C0` up to `C4` -- you should hear the pitch stay the same but the timbre change dramatically
5. Try different **Osc 1 Shape** settings while Osc 1 is at `C2`: switch between `Saw`, `Tri`, and `P-50` -- you should hear each shape produce a different sync character. "Oscillator 2's shape or timbre is irrelevant. All that matters is the frequency" (Anu Kirk p.20)

**The rules of hard sync** (Anu Kirk p.18-20):
- Osc 2 controls the pitch (it forces Osc 1 to restart)
- Osc 1's frequency controls the timbre (harmonic content shifts)
- Osc 2's waveshape does not matter -- only its frequency
- Osc 1's waveshape does matter

See Anu Kirk p.17-20 ("Hard Sync", Exercises 1-2)

### Exercise 2: The Timbre Sweep (5 min)

Set Osc 2 to `C0`, Osc 1 to `C0`. Sync ON. Osc 1 Shape = `Saw`.

1. Hold a note and slowly turn **Osc 1 Frequency** upward from `C0` to `C4` -- you should hear the pitch stay constant while the timbre morphs through bright, metallic, and vocal-like textures
2. Return Osc 1 to `C0`. Set Osc 1 Shape to **Tri** and sweep up again -- you should hear the triangle wave get rough and buzzy in spots (Anu Kirk p.20)
3. Try **P-50** and sweep again -- different character again

This is the core sync effect: timbral morphing at constant pitch. "As you pass C1 and go higher, the timbre begins to change fairly dramatically" (Anu Kirk p.20).

### Exercise 3: Classic Prophet Sync Lead (10 min)

This is the sound that made the Prophet-5 famous. Enter these values exactly:

1. **Sync 2->1** = `ON`
2. **Osc 2, 3, 4 Level** = `0` (only hear Osc 1)
3. **Osc 1 Shape** = `P-50`
4. **Osc 1 Frequency** = `C2` (higher than Osc 2 -- this is what creates the timbral complexity)
5. **Osc 2 Frequency** = `C0` (Osc 2 sets the pitch)

Now set up **ENV 3** to sweep Osc 1's frequency:
6. Set **Attack** to `15` (short attack gives a nice bite -- Anu Kirk p.21)
7. Set **Decay** to `87` (longer decay emphasizes the effect)
8. Set **Sustain** to `0`
9. Set **Release** to `0`
10. Set **Amount** to `67`
11. Set **Destination** to `O1F` (Osc 1 Frequency)

<div data-evolver-panel data-knobs="knob-osc-frequency:24,knob-osc-shapepw:50,knob-osc-level:0,knob-env3-attack:15,knob-env3-decay:87,knob-env3-sustain:0,knob-env3-release:0,knob-env3-amount:67" data-highlights="knob-osc-frequency:amber,knob-env3-amount:amber,switch-sync:amber" data-sections="oscillators,envelope3"></div>

Play a note. You should hear an aggressive, biting lead tone with a pronounced attack sweep.

**Quick test**: Turn Sync OFF. Play a note -- you should hear just a pitch sweep (boring). Turn Sync back ON. The same envelope sweep now produces a timbral sweep instead. That is the magic of hard sync.

**Dial it in** by trying these variations:
- **Attack** = `0` -- you should hear maximum bite on the attack
- **Decay** = `50` -- you should hear a quicker, punchier response
- **Amount** = `90` -- you should hear a more extreme timbral sweep
- **Osc 1 Shape** = `Saw` -- you should hear a different, fuller character

When you find a version you like, save it.

See Anu Kirk p.20-21 ("Exercise 3: A Classic Prophet-5/Dave Smith sound")

### Exercise 4: Add Velocity Expression (2 min)

Make the lead respond to your playing dynamics:

1. Set **ENV 3 Velocity** to `60`

Now play harder -- you should hear more dramatic sync sweeps on hard key presses. Play softly -- you should hear mellower, less swept tones. This makes the sync lead feel alive under your fingers.

## Exploration (optional, hyperfocus days)

- Add delay: **Delay 1 Time** = `125`, **Delay 1 Level** = `60` -- hear the lead in a spatial context
- Try mod wheel control: **Mod Wheel Dest** = `O1F`, **Mod Wheel Amount** = `40` -- sweep the timbre in real time while playing
- Set **Osc Slop** to `3` for vintage analog character

## Output Checklist

- [ ] Can explain what hard sync does in one sentence
- [ ] Classic sync lead patch saved
- [ ] Understand the relationship: Osc 2 = pitch, Osc 1 frequency = timbre
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Hard sync forces Osc 1 to restart every time Osc 2's waveform resets, creating complex harmonics at a locked pitch
- The interesting sounds come when Osc 1's frequency is higher than Osc 2's -- Osc 1's waveshape matters, Osc 2's does not
- Using an envelope to sweep the synced oscillator's frequency produces the classic aggressive lead tone that defined the Prophet-5

## Next Session Preview

Next time you will explore detuning, oscillator slop, and stereo layering -- techniques for making sounds fat, wide, and organic without effects or complex modulation.
