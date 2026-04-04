---
title: "Session 12: Filter Envelope & VCA -- Classic Subtractive Shapes"
module: "Filters & Envelopes"
session_number: 12
duration: 25
prerequisite: 11
output_type: patch
difficulty: beginner
tags: [filters, envelope, adsr, vca, pluck, pad, subtractive]
instrument: evolver
reference: "Anu Kirk p.38-41, p.46-49, DSI Manual p.17-18"
---

# Session 12: Filter Envelope & VCA -- Classic Subtractive Shapes

**Objective:** Use the filter envelope (ENV 1) and VCA envelope (ENV 2) to create plucks, pads, and other classic subtractive synthesis shapes that give each note a timbral and volume contour.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Osc 3+4 Level to 0, LPF Frequency to 0, Env Amount to 99, ENV 1 Attack to 0, Decay to 29, Sustain to 10. Play a note. That punchy pluck is the filter envelope at work.

## Warm-Up (2 min)

Load your filter sweep patch from Session 11. Play notes while moving the mod wheel to sweep the filter. You are manually controlling filter cutoff. Today you will automate that sweep using envelopes so every note has its own timbral contour. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0`
- Set **LPF Frequency** to `0` (filter fully closed -- envelopes will open it)
- Set **4-Pole** to ON

## Exercises

### Exercise 1: ADSR Basics on the VCA (5 min)

The VCA envelope (ENV 2) shapes the volume of every note. Start by hearing what different envelope shapes sound like:

1. Set ENV 2 to **A=0, D=25, S=0, R=0** -- play a note. You should hear a short, percussive "tick". Fast attack, quick decay to silence
2. Set ENV 2 to **A=0, D=60, S=0, R=0** -- you should hear a longer pluck, like a marimba hit
3. Set ENV 2 to **A=50, D=0, S=100, R=50** -- you should hear a slow fade-in that sustains while you hold the key, then fades out. This is a pad/string envelope
4. Set ENV 2 to **A=20, D=20, S=75, R=0** -- you should hear a short swell that settles to a moderate level. This is a woodwind-style envelope
5. Return ENV 2 to **A=0, D=0, S=100, R=0** (basic patch default -- instant on, sustains, instant off)

"Strings: slow attack (A=50), no decay (D=0), full sustain (S=100), and long release (R=50)" -- Anu Kirk p.39

See Anu Kirk p.38-39 ("ADSR Explained", "Exercise 1: Some Basic VCA Envelopes")

### Exercise 2: Filter Envelope for Plucks (8 min)

The filter envelope (ENV 1) shapes the brightness of every note. With the filter starting closed, the envelope opens it briefly:

1. Set **LPF Frequency** to `0` (closed), **Resonance** to `30`
2. Set **Env Amount** to `99` (full positive envelope amount)
3. Set ENV 1: **Attack** = `0`, **Decay** = `29`, **Sustain** = `10`, **Release** = `0`
<div data-evolver-panel data-knobs="knob-filter-frequency:0,knob-filter-resonance:30,knob-filter-envamount:99,knob-filter-attack:0,knob-filter-decay:29,knob-filter-sustain:10,knob-filter-release:0" data-highlights="knob-filter-envamount:amber,knob-filter-decay:amber,knob-filter-sustain:amber,knob-filter-resonance:blue" data-sections="filter"></div>

4. Play a note -- you should hear a punchy, plucky sound. The filter opens instantly on the attack, then closes quickly during the decay, letting only a small amount of brightness sustain

Now try variations:
5. **Decay** = `15` -- you should hear a tighter, more percussive pluck
6. **Decay** = `50` -- you should hear a longer, more mellow pluck
7. **Resonance** = `60` -- you should hear the pluck become more "quacky" as the resonance peak emphasizes the sweep
8. Set **Key Amount** to `72` so the filter tracks the keyboard -- play up and down. You should hear consistent brightness across the range (Anu Kirk p.45)
9. Add **Filter Velocity** = `50` -- harder key presses should now open the filter more, making the pluck brighter on harder hits

See Anu Kirk p.46-47 ("Exercise 1: Filter Sweep", "Exercise 2: Filter Pop")

### Exercise 3: Filter Envelope for Pads (5 min)

Create a pad that slowly brightens:

1. Set ENV 1: **Attack** = `98`, **Decay** = `0`, **Sustain** = `100`, **Release** = `50`
2. Set **Env Amount** to `99`, **LPF Frequency** to `0`, **Resonance** to `20`
3. Set ENV 2 (VCA): **Attack** = `50`, **Decay** = `0`, **Sustain** = `100`, **Release** = `50`
<div data-evolver-panel data-knobs="knob-filter-frequency:0,knob-filter-resonance:20,knob-filter-envamount:99,knob-filter-attack:98,knob-filter-sustain:100,knob-filter-release:50,knob-amp-attack:50,knob-amp-sustain:100,knob-amp-release:50" data-highlights="knob-filter-attack:amber,knob-filter-envamount:amber,knob-amp-attack:amber,knob-amp-release:blue" data-sections="filter,amp"></div>

4. Play a sustained note -- you should hear the volume and brightness both swell in slowly. The filter envelope and VCA envelope working together create the pad character (Anu Kirk p.46-47)

### Exercise 4: Inverted Envelope (5 min)

The filter Env Amount is bipolar (-99 to +99). Negative values invert the envelope direction:

1. Set **LPF Frequency** to `130` (mostly open)
2. Set **Env Amount** to `-80`
3. Set ENV 1: **Attack** = `0`, **Decay** = `50`, **Sustain** = `30`, **Release** = `20`
4. Play a note -- you should hear the filter close on the attack (getting darker) then partially reopen. This is the opposite of a normal pluck -- brightness is subtracted rather than added

"Env Amount can be positive or negative, allowing inverted envelope control of the filter" -- DSI Manual p.17

**Save your favorite pluck or pad patch** from this session.

## Exploration (optional, hyperfocus days)

- Try different **Env Shape** settings (in Misc Params): switch between **Exp** (exponential -- more natural curves) and **Lin** (linear -- straight lines). You should hear a subtle difference in how the envelope sweeps feel (Anu Kirk p.41)
- Create a "pluck to pad" morph using the mod wheel: Mod Wheel Dest = ENV 1 Attack, Amount = 60. Low mod wheel = pluck, high mod wheel = pad
- Try adding VCA Velocity = `60` so that dynamics affect both volume and filter (if filter velocity is also set)

## Output Checklist

- [ ] Pluck and/or pad patches saved
- [ ] Understand how filter envelope (ENV 1) shapes brightness over time
- [ ] Understand how VCA envelope (ENV 2) shapes volume over time
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The filter envelope (ENV 1) controls brightness over time by sweeping the cutoff frequency -- short decays make plucks, slow attacks make pads
- The VCA envelope (ENV 2) controls volume over time -- together with the filter envelope, these two envelopes define the basic character of any subtractive synth sound
- Bipolar Env Amount (-99 to +99) allows inverted filter envelopes where notes start bright and get darker

## Next Session Preview

Next time you will push the filter to extremes -- self-oscillation at maximum resonance where the filter becomes a sine wave generator, and audio-rate modulation where an oscillator modulates the filter directly.
