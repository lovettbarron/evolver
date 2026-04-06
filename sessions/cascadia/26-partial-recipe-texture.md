---
title: "Session 26: Partial Recipe -- Metallic Texture"
module: "Transitional"
session_number: 26
duration: 25
prerequisite: 25
output_type: patch
difficulty: advanced
tags: [partial-recipe, transitional, sound-design, texture]
instrument: cascadia
---

# Session 26: Partial Recipe -- Metallic Texture

**Objective:** Build a shimmering, metallic texture using wave folding, FM, and modulation. This session gives you the target sound and most of the steps -- but leaves key decisions to you. Each blank draws on a specific skill you developed earlier in the curriculum.

> [!tip] If you only have 5 minutes
> Remove all cables. VCO A OCTAVE 5, Mixer SAW ~40%. Wave Folder FOLD ~45%. VCF FREQ ~55%, MODE BP. Hold a note -- instant metallic shimmer.

## Target Sound

A bright, harmonically complex texture that glitters and shifts. Think struck metal slowly vibrating in a reverberant space -- the wave folder generates dense overtones while modulation creates evolving spectral movement. The sound should be static enough to feel like a texture rather than a melody, but alive enough that sustained listening reveals constant subtle change.

## Starting Patch

Remove all cables. Set all knobs and sliders to noon/center. This is the Cascadia equivalent of loading the basic patch -- a known, neutral starting state.

## Steps

1. Set **VCO A OCTAVE** = `5` and **PITCH** = noon

2. Set **Mixer**: SAW = ~40%, all other sliders = 0%

3. Set **Wave Folder FOLD** = `____` (hint: Session 03 covered wave folding and FM -- how much folding adds dense metallic harmonics without turning into noise? Think about where the sweet spot sits between subtle warmth and aggressive crunch.)

4. Set **VCF MODE** = `____` (hint: Session 10 explored filter modes -- which mode lets the wave-folded harmonics through while still shaping the tone? Consider what each mode removes and what it preserves.)

5. Set **VCF FREQ** = ~55%, **Q** = ~20%

6. Set **Envelope B**: Attack = ~10%, Decay = ~50%, Sustain = ~30%, Release = ~45%

7. Set **VCF FM 1** = ~30% (envelope shapes the filter sweep on each note)

8. Set **Envelope A**: Attack = ~5%, Decay = ~35%, Sustain = ~60%, Release = ~40%, ENVELOPE SPEED = Fast

9. Patch **LFO X OUT** -> **VCF FM 3 IN**. Set **FM 3** = ~20%, **LFO RATE** = `____` (hint: Session 14 covered LFO basics -- what rate creates evolving metallic shimmer rather than obvious wobble? Think about the difference between rhythmic modulation and textural drift.)

10. Set **VCO A INDEX** = ~15% for subtle FM shimmer from the normalled VCO B

11. Set **SOFT CLIP** = On for warmth on the output

12. Hold a note in the C4-C6 range. The sound should glitter and shift -- dense harmonics from the wave folder, shaped by the filter, with slow LFO movement adding life.

## Listen For

- Dense, metallic overtones from the wave folder that shimmer rather than screech
- A filter character that shapes the texture without removing the harmonics that define it
- Slow spectral movement from the LFO modulating the filter -- perceptible but not distracting
- Subtle FM richness from the VCO A INDEX adding complexity to the oscillator tone

## Reflection

What values did you choose for the three blanks? The wave folder amount determines whether the texture is warm-metallic or harsh-digital. The filter mode determines which harmonics survive. The LFO rate determines whether the sound feels static or alive. Compare your choices to Session 24's texture patch -- how does your approach differ? Write down your values and reasoning.

## Output Checklist

- [ ] Metallic texture patch completed with all blanks filled in
- [ ] Cable routing documented (LFO X -> VCF FM 3)
- [ ] Parameter values documented with reasoning
- [ ] Patch documented in patches/cascadia/ with full knob settings and cable routing
- [ ] Session logged in Obsidian daily note
