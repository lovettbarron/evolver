---
title: "Session 09: Ring Modulation"
module: "Digital Oscillators"
session_number: 9
duration: 20
prerequisite: 7
output_type: patch
difficulty: intermediate
tags: [digital-oscillators, ring-modulation, metallic, inharmonic, textures]
instrument: evolver
reference: "Anu Kirk p.33-35, DSI Manual p.16"
---

# Session 09: Ring Modulation

**Objective:** Use ring modulation between the digital oscillators to create metallic, bell-like, and inharmonic textures, and understand how ring mod differs from FM.

> [!tip] If you only have 5 minutes
> Load the basic patch, set all Osc Levels to 0, set Ring Mod 4->3 to 100. Play notes up and down the keyboard. That metallic, bell-like quality is ring modulation.

## Warm-Up (2 min)

Load your FM bell patch from Session 08. Play a few notes and listen to the FM harmonics decay. Today you will explore a related but different technique: ring modulation. Where FM warps the carrier's frequency, ring mod multiplies two signals together to produce sum and difference frequencies. Load the basic patch.

## Setup

From the basic patch:
- Set **all oscillator Levels** to `0` (Osc 1, 2, 3, and 4)
- Verify **Osc 3 Frequency** = `C0`, **Osc 4 Frequency** = `C0`
- Verify **Osc 3 Shape** = `1`, **Osc 4 Shape** = `1`

## Exercises

### Exercise 1: Basic Ring Mod (5 min)

1. Set **Ring Mod 4->3** to `100` -- "Use OSC 4 to modulate OSC 3" (Anu Kirk p.33)
2. Play notes up and down the keyboard -- you should hear sound even though all oscillator levels are at 0. "You will get output from the Oscillator even if the Oscillator Level is set to zero" (DSI Manual p.16)
3. Notice the sound has a metallic, bell-like quality -- this is where "ring modulation" gets its name
4. Change **Ring Mod 4->3** to `50`, then `25` -- you should hear that changing the ring mod amount only changes the volume of the ring mod signal, not the timbre itself. It acts as a level control
5. Return **Ring Mod 4->3** to `100`

See Anu Kirk p.33-34 ("Exercise 1: Basic Ring Mod")

### Exercise 2: Modulator Frequency Shapes the Timbre (5 min)

The frequency relationship between the two oscillators determines the harmonic content, just like with FM:

1. Change **Osc 4 Frequency** to `G1` (a fifth above) -- you should hear a distinctly different tonal character
2. Try **Osc 4 Frequency** to `D#0` -- you should hear a darker, more dissonant quality
3. Try **Osc 4 Frequency** to `C#3` (high) -- you should hear a bright, clangorous quality
4. Now try the **Osc 4 Fine** parameter: with Osc 4 at `C0`, set Fine to `+10` -- you should hear interesting beating and variation as the oscillators slowly phase against each other (Anu Kirk p.34)
5. Try Fine at `+25` -- the beating should be faster and more obvious

"Notice how detuning even a little bit can introduce some very interesting variation to the sound" -- Anu Kirk p.34

### Exercise 3: Complex Waveshapes with Ring Mod (5 min)

Unlike FM, ring mod produces the sum and difference of ALL harmonics in both waveforms. Complex waveshapes produce very complex results:

1. Set **Osc 4 Frequency** back to `C0`, **Fine** to `0`
2. Change **Osc 4 Shape** to `4` -- you should hear a much more complex, textured result than with sine waves (Anu Kirk p.34)
3. Now set **Osc 3 Shape** to `8` and **Osc 4 Shape** to `52` -- play some low notes. You should hear an almost vocal quality (Anu Kirk p.34)
4. Try **Osc 3 Shape** to `1` (sine) and **Osc 4 Shape** to `2` (sawtooth) -- you should hear how the sawtooth modulator creates more harmonics than the sine
5. Experiment with 3-4 other waveshape combinations of your choosing, playing in different octave ranges

"If waveforms other than sine waves are used, the ring modulator's output is more complex, including the sum and difference frequencies of all of the waveform's harmonics too" -- Anu Kirk p.34

### Exercise 4: Ring Mod Texture Patch (3 min)

Create a usable ring mod texture by combining with other elements:

1. Set **Osc 3 Shape** to `8`, **Osc 4 Shape** to `15`
2. **Ring Mod 4->3** = `100`
3. **Osc 4 Frequency** = `G1`, **Osc 4 Fine** = `+5`
4. Bring back analog warmth: **Osc 1 Level** = `30`, **Osc 1 Shape** = `Saw`
5. **VCA Envelope**: Attack = `35`, Decay = `0`, Sustain = `100`, Release = `50`
6. **LPF Frequency** = `100`, **Resonance** = `30`

Play some notes. You should hear a metallic texture with analog warmth underneath and a slow attack envelope. The ring mod creates the shimmer while the analog saw grounds it.

**Save this patch** as your ring mod texture.

## Exploration (optional, hyperfocus days)

- Set **Osc 4 Glide** to `OFF` (keyboard off) to create a fixed-frequency modulator -- this produces more traditional, dissonant ring mod where different keyboard notes produce wildly different timbres (Anu Kirk p.34)
- Ring Mod is bidirectional: **Ring Mod 4->3** and **Ring Mod 3->4** should sound the same for the same settings since A x B = B x A (Anu Kirk p.35). Verify this
- Try combining ring mod with FM: set both **Ring Mod 4->3** to `50` AND **FM 4->3** to `10` for very complex results

## Output Checklist

- [ ] Ring mod texture patch saved
- [ ] Understand how ring mod differs from FM (multiplication vs frequency modulation)
- [ ] Can hear how oscillator frequency ratios and waveshape choices affect ring mod character
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Ring modulation multiplies two signals together, producing sum and difference frequencies -- this creates metallic, bell-like timbres
- Unlike FM, changing the ring mod amount only changes the volume, not the harmonic content -- the frequency relationship between oscillators is what shapes the timbre
- Both oscillators track the keyboard by default, which keeps the ring mod musically useful. Setting one oscillator's glide to OFF creates more traditional, dissonant ring mod

## Next Session Preview

Next time you will combine analog and digital oscillators together in hybrid patches, learning to balance warmth and complexity. You will also explore the Shape Sequence feature for waveshape changes per sequencer step.
