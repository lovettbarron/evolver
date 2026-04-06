---
title: "Session 27: Partial Recipe -- Modular Drum Hit"
module: "Transitional"
session_number: 27
duration: 25
prerequisite: 26
output_type: patch
difficulty: advanced
tags: [partial-recipe, transitional, sound-design, percussion]
instrument: cascadia
---

# Session 27: Partial Recipe -- Modular Drum Hit

**Objective:** Build a snappy, punchy drum hit using short envelopes, the VCA/LPG, and noise. This session provides the skeleton of the patch -- you fill in the blanks that determine the character of the hit.

> [!tip] If you only have 5 minutes
> Remove all cables. Mixer NOISE ~60% (WHITE). Envelope A: Attack 0%, Decay ~15%, Sustain 0%, Release ~10%, ENVELOPE SPEED Fast. VCF FREQ ~40%, MODE LP2. Trigger a note -- instant snappy hit.

## Target Sound

A short, percussive hit with a sharp transient and fast decay. Think electronic snare or hi-hat -- a burst of noise shaped by a fast envelope through a filter. The sound should have a clear attack, a defined body, and stop cleanly. Modular percussion is about envelopes and filters working together at speed.

## Starting Patch

Remove all cables. Set all knobs and sliders to noon/center.

## Steps

1. Set **Mixer**: NOISE = ~55%, NOISE TYPE = `____` (hint: Session 17 covered sample and hold and noise sources -- which noise color has the right spectral content for a crisp percussive hit? Think about what WHITE vs PINK sound like and which cuts through a mix.)

2. Set all other Mixer sliders to 0% (pure noise source for the drum hit)

3. Set **Envelope A**: Attack = 0%, Decay = `____`, Sustain = 0%, Release = ~8%, ENVELOPE SPEED = Fast (hint: Session 23 built percussion patches -- how short should the decay be for a tight, snappy hit versus a longer, boomy one? The decay length defines whether this is a click, a snare, or a tom.)

4. Set **VCF MODE** = LP2

5. Set **VCF FREQ** = ~40%, **Q** = ~25%

6. Set **VCF FM 1** = ~50% (envelope sweeps the filter hard and fast on each hit)

7. Set **Envelope B**: Attack = 0%, Decay = ~20%, Sustain = 0%, Release = ~10%, ENVELOPE SPEED = Fast

8. Patch **Envelope A ENV OUT** -> **VCA/LPF B CV IN**. Set **VCA CONTROL** = `____`, **CV AMOUNT** = ~65% (hint: Session 23 used the LPG for percussion -- which VCA CONTROL position gives you the snappiest transient response? Remember the three modes: UP is VCA+LPF, CENTER is VCA only, DOWN is LPF only.)

9. Patch **LPF B OUT** -> **MAIN 2 IN** to route the VCA/LPG output to the second main output

10. Set **Wave Folder FOLD** = ~10% (adds a slight edge to the transient)

11. Trigger single notes rapidly. Each hit should be a clean, defined percussion event with a sharp attack and fast decay.

## Variations

After filling in the blanks and getting the basic hit:

- **Pitched drum:** Add VCO A to the Mixer (SAW ~30%) alongside the noise. The oscillator adds tonal body -- more kick-like or tom-like
- **Metallic hit:** Raise Wave Folder FOLD to ~35% and Q to ~40% for a harsh, industrial percussion sound
- **Longer tail:** Double the Envelope A Decay for a more boomy, reverberant hit

## Listen For

- A sharp, clean transient on the attack -- the hit should snap, not fade in
- A fast decay that stops cleanly without ringing or tailing off
- The filter sweep adding tonal shape to the noise burst -- brighter at the attack, darker as it decays
- The LPG/VCA adding its characteristic response to the envelope

## Reflection

Percussion synthesis strips everything down to the essentials: a noise source, an envelope, and a filter. The three blanks you filled in define the character of the hit -- noise color sets the spectral content, decay length sets the size, and VCA mode sets the transient shape. Compare your drum hit to Session 23's percussion patches. How does yours differ? Try the variations above and note which settings you prefer.

## Output Checklist

- [ ] Modular drum hit patch completed with all blanks filled in
- [ ] Cable routing documented (Env A -> VCA/LPF B, LPF B -> Main 2)
- [ ] Parameter values documented with reasoning
- [ ] Patch documented in patches/cascadia/ with full knob settings and cable routing
- [ ] Session logged in Obsidian daily note
