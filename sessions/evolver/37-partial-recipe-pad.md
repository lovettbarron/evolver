---
title: 'Session 37: Partial Recipe -- Evolving Pad'
session_number: 37
duration: 25
prerequisite: 36
output_type: patch
difficulty: advanced
tags:
  - partial-recipe
  - transitional
  - sound-design
  - pad
instrument: evolver
section: Transitional
instrument_type: instrument
---

# Session 37: Partial Recipe -- Evolving Pad

**Objective:** Build a lush, slowly evolving pad that changes character over time through modulation. This session provides the structure and most settings -- you fill in the blanks that shape how the pad breathes and moves.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Osc 1 Shape = Pulse 50, Osc 2 Shape = Saw, Osc 2 Fine = +3. LPF Freq = 65, Resonance = 15, 4-Pole ON. Amp Envelope Attack = 45, Decay = 80, Sustain = 70, Release = 75. Hold a chord. Instant warm pad.

## Target Sound

A warm, expansive pad that swells slowly into the mix and shimmers as modulation routes shift the timbre over several seconds. It should feel like a held chord on a vintage string machine -- rich, wide, and gently alive. The modulation should be felt more than heard, creating subtle movement that rewards sustained listening.

## Starting Patch

Load the basic patch.

## Steps

1. Set **Osc 1 Shape** = `Pulse 50` and **Osc 1 Level** = `80`

2. Set **Osc 2 Shape** = `Saw` and **Osc 2 Level** = `75`

3. Set **Osc 2 Fine** = `+3` for gentle detuning

4. Enable **4-Pole** mode on the lowpass filter

5. Set **LPF Frequency** = `70` and **Resonance** = `12`

6. Set **Amp Envelope**: Attack = `50`, Decay = `90`, Sustain = `75`, Release = `80`

7. Set **Filter Envelope**: Attack = `35`, Decay = `70`, Sustain = `40`, Release = `60`

8. Set **Filter Envelope Amount** = `45`

9. Open the **Mod Matrix**. Assign a modulation route: Source = `____`, Destination = `____`, Amount = `____` (hint: Session 18 introduced the mod matrix -- which source creates slow, cyclic movement, and which destination makes the timbre evolve over time? Think about what you want the listener to feel shifting beneath the surface.)

10. Set **Delay Time** = `45`, **Delay Feedback** = `35`, **Delay Mix** = `20` for spatial depth

11. Assign a second mod route to add movement to the stereo field or pulse width: Source = `____`, Destination = `____`, Amount = `____` (hint: Session 22 explored pad design techniques -- what modulation adds that shimmering, alive quality to a sustained pad without making it sound wobbly?)

12. Set **Distortion Amount** = `0` (pads want warmth, not grit)

13. Hold a chord (root + fifth or root + octave) in the C3-C5 range. Let it sustain for at least 8 seconds. The pad should swell in, shimmer gently, and fade out slowly when released.

## Listen For

- A slow, smooth attack that builds the sound gradually rather than hitting immediately
- Gentle timbral movement in the sustained portion -- the filter or pulse width shifting slowly
- Stereo width from the detuned oscillators and delay
- A long, graceful release that lets the pad fade naturally rather than cutting off

## Reflection

The two mod matrix blanks are the heart of this patch. What sources and destinations did you choose? Play the pad with and without the mod routes active (set amounts to 0, then back). Can you hear the difference? The best pad modulation is the kind where you do not notice it until it is gone. Compare your approach to the pads in Session 22 and Session 29.

## Output Checklist

- [ ] Evolving pad patch completed with all blanks filled in
- [ ] Mod matrix routing documented with reasoning
- [ ] Patch saved to a program slot
- [ ] Patch documented in patches/evolver/ with full parameter dump
- [ ] Session logged in Obsidian daily note
