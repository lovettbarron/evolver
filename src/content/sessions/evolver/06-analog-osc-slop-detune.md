---
title: "Session 06: Detuning, Oscillator Slop & Stereo Layering"
module: "Analog Oscillators"
session_number: 6
duration: 20
prerequisite: 3
output_type: patch
difficulty: beginner
tags: [analog-oscillators, detuning, osc-slop, stereo, fat-sounds]
instrument: evolver
reference: "Anu Kirk p.11, p.16-17, DSI Manual p.15, p.26"
---

# Session 06: Detuning, Oscillator Slop & Stereo Layering

**Objective:** Use detuning, oscillator slop, and analog-digital layering to create fat, wide, organic sounds without any modulation or effects.

> [!tip] If you only have 5 minutes
> Load the basic patch, set Osc 1 Fine to +3, Osc 2 Fine to -3, and Osc Slop to 3. Play a chord. That thick, alive sound is detuning plus analog drift.

## Warm-Up (2 min)

Load your sync lead patch from Session 05. Play a few notes to hear that aggressive, envelope-swept timbre. Today is the opposite approach -- subtle, organic techniques that add warmth and width. Load the basic patch.

## Setup

From the basic patch:
- Set **Osc 3 Level** to `0` and **Osc 4 Level** to `0` (start with just the analog oscillators)
- Both oscillators at **Saw**, Frequency `C0`, Level `50`

## Exercises

### Exercise 1: Fine Detuning (5 min)

Detuning means setting oscillators to slightly different pitches so they beat against each other, creating thickness and movement.

<div data-evolver-panel data-knobs="knob-osc-frequency:0,knob-osc-shapepw:0,knob-osc-level:50,knob-osc-fine:0" data-highlights="switch-osc1:amber,switch-osc2:amber,knob-osc-fine:amber" data-sections="oscillators"></div>

1. Play a sustained note and listen -- you should hear two sawtooth waves in stereo, clean and static
2. Set **Osc 1 Fine** to `+3` -- you should hear a slow, gentle beating as the oscillators drift in and out of phase
3. Set **Osc 2 Fine** to `-3` -- you should hear the beating become richer, with a wider chorus-like quality (total detuning is now 6 cents)
4. Try **Osc 1 Fine** to `+7`, **Osc 2 Fine** to `-7` -- you should hear a more obvious, aggressive detuning. This amount was popular in rave and trance sounds (Anu Kirk p.11)
5. Try extreme values: **Osc 1 Fine** to `+25`, **Osc 2 Fine** to `-25` -- you should hear almost two separate pitches. This is too much for most musical uses
6. Return to **Osc 1 Fine** = `+3`, **Osc 2 Fine** = `-3` -- this sweet spot adds thickness without obvious pitch conflict

"Small values (+/- 2-3 cents) are useful for fattening up sounds or creating a kind of chorusing effect known as detuning" -- Anu Kirk p.11

### Exercise 2: Oscillator Slop (5 min)

Oscillator Slop simulates the pitch instability of vintage analog synthesizers. It makes the oscillators randomly drift in and out of tune.

1. Set both **Fine** values back to `0`
2. Set **Osc Slop** to `0` -- play a note. You should hear a clean, stable tone
3. Set **Osc Slop** to `1` -- play and hold a note for 10 seconds. You should hear very subtle, barely noticeable pitch drift
4. Set **Osc Slop** to `3` -- you should hear a pleasant, organic quality. The oscillators wander slightly, creating natural movement
5. Set **Osc Slop** to `5` (maximum) -- you should hear more obvious drift, like a slightly out-of-tune vintage synth

"It is useful if you want to add some unpredictability or a vintage quality to your sounds. It is subtle, but tasty." -- Anu Kirk p.17

Try combining detuning and slop: set **Osc 1 Fine** to `+2`, **Osc 2 Fine** to `-2`, **Osc Slop** to `3`. You should hear a rich, alive tone that moves naturally.

### Exercise 3: Octave Layering (3 min)

Tuning oscillators to different octaves creates big, stacked sounds:

1. Set **Osc 1 Frequency** to `C0`, **Osc 2 Frequency** to `C-1` (one octave lower) -- you should hear a much fuller sound with sub-bass weight from Osc 2
2. Try **Osc 2 Frequency** at `C1` (one octave higher) -- you should hear brightness added on the right side
3. Try **Osc 1** at `C0`, **Osc 2** at `C-2` (two octaves lower) -- you should hear a massive low-end foundation

"You can set a single oscillator down an octave or two and use it as a sub-oscillator, which is common in some classic synthesizer architectures" -- Anu Kirk p.10

### Exercise 4: Add Digital Oscillators for Hybrid Width (5 min)

Now bring in the digital oscillators to create a hybrid layered sound:

1. Set **Osc 1 Frequency** to `C0`, **Osc 2 Frequency** to `C0`, both Shape `Saw`
2. Set **Osc 1 Fine** to `+3`, **Osc 2 Fine** to `-3`
3. Set **Osc Slop** to `3`
4. Set **Osc 3 Level** to `30`, **Osc 4 Level** to `30` (bring digital back at lower volume)
5. Set **Osc 3 Shape** to `1` (sine wave), **Osc 4 Shape** to `1` -- you should hear a subtle warmth added underneath the analog brightness
6. Try **Osc 3 Shape** to `4`, **Osc 4 Shape** to `4` -- you should hear more harmonic complexity blended in
7. Adjust digital levels: try `15` for subtle support, `50` for equal presence -- find a balance where the analog warmth and digital detail complement each other

<div data-evolver-panel data-knobs="knob-osc-frequency:0,knob-osc-fine:3,knob-osc-shapepw:0,knob-osc-level:45" data-highlights="switch-osc1:amber,switch-osc2:amber,switch-osc3:amber,switch-osc4:amber,knob-osc-fine:amber,knob-osc-level:amber" data-zoom="false"></div>

**Save this patch** as your "Fat Detuned" patch.

## Exploration (optional, hyperfocus days)

- Try setting Osc 1 and 2 to different waveshapes (e.g., Osc 1 = Saw, Osc 2 = P-48) with detuning -- different shapes create more complex beating patterns
- Use the **Output Pan** setting: try `St2` or `St3` for narrower stereo -- compare the width difference
- Add a slow LFO to Osc 1 Fine (LFO 1 Dest = O1F, Amount = 3, Freq = 8) for a subtle chorus effect using frequency modulation instead of detuning

## Output Checklist

- [ ] Fat detuned patch saved with analog + digital layering
- [ ] Can hear the difference between detuning, slop, and no processing
- [ ] Understand how octave layering creates fuller sounds
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Small detuning (+/- 2-3 cents on Fine) creates chorus-like thickness without any effects processing
- Oscillator Slop (1-5) adds organic, vintage-style pitch drift that makes sounds feel alive
- The Evolver's stereo architecture (analog L + analog R + digital L + digital R) gives you four independent layers to create wide, complex sounds

## Next Session Preview

Next time you enter the digital oscillator world -- 96 different waveshapes from the Prophet-VS lineage, each with its own harmonic character. You will find your favorites among these more complex timbres.
