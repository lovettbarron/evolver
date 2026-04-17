---
title: 'Session 36: Partial Recipe -- Growling Bass'
session_number: 36
duration: 25
prerequisite: 35
output_type: patch
difficulty: advanced
tags:
  - partial-recipe
  - transitional
  - sound-design
  - bass
instrument: evolver
section: Transitional
instrument_type: instrument
---

# Session 36: Partial Recipe -- Growling Bass

**Objective:** Build a growling, aggressive bass patch with filter movement and analog warmth. This session gives you the target sound and most of the steps -- but leaves key decisions to you. The blanks are not random: each one draws on a specific skill from earlier in the curriculum.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Osc 1 Shape = Saw, Osc 2 Shape = Saw. Detune Osc 2 Fine to +5. LPF Freq = 35, Resonance = 55, 4-Pole ON. Env Amount = 90, Decay = 55, Sustain = 10. Play low notes. Instant growl.

## Target Sound

A thick, detuned bass with a snarling filter sweep on every note. The attack should bite, the sustain should rumble, and the filter should add an angry vocal quality without tipping into self-oscillation. Think industrial bassline meets analog warmth.

## Starting Patch

Load the basic patch. Every partial recipe starts from a known state so the parameter values are meaningful.

## Steps

1. Set **Osc 1 Shape** = `Saw` and **Osc 1 Level** = `100`

2. Set **Osc 2 Shape** = `Saw` and **Osc 2 Level** = `90`

3. Set **Osc 2 Fine** = `____` (hint: Session 06 covered analog detuning -- what amount of fine offset creates that thick, beating unison feel without sounding out of tune?)

4. Enable **4-Pole** mode on the lowpass filter

5. Set **LPF Frequency** = `____` (hint: Session 11 covered lowpass basics -- where should the cutoff sit so the bass is warm and full but not muddy or muffled?)

6. Set **Resonance** = `____` (hint: Session 13 explored resonance character -- how much resonance adds a growling, vocal quality to the filter sweep without tipping into self-oscillation?)

7. Set **Filter Envelope Amount** = `90`

8. Set **Amp Envelope**: Attack = `0`, Decay = `55`, Sustain = `15`, Release = `25`

9. Set **Filter Envelope**: Attack = `0`, Decay = `60`, Sustain = `0`, Release = `30`

10. Set **Delay Time** = `0` (no delay -- this is a tight bass, not a wash)

11. Set **Distortion Amount** = `25` to add grit to the low end

12. Play notes in the C1-C3 range. The filter should sweep down on each note with an aggressive bark at the top

## Listen For

- A thick, detuned low end from the two sawtooth oscillators beating against each other
- An aggressive filter sweep on each note attack that adds a snarling, almost vocal quality
- The resonance should add character without the filter squealing or becoming thin
- The decay should leave a warm, sustained rumble that sits solidly in the low register

## Reflection

What values did you choose for the three blanks? Write them down alongside your reasoning. Compare your choices to the recipes in Session 27 -- did you land in the same ballpark, or did you find a different sweet spot? There is no single correct answer. The point is that you can hear the difference and make a deliberate choice.

## Output Checklist

- [ ] Growling bass patch completed with all blanks filled in
- [ ] Parameter values documented with reasoning
- [ ] Patch saved to a program slot
- [ ] Patch documented in patches/evolver/ with full parameter dump
- [ ] Session logged in Obsidian daily note
