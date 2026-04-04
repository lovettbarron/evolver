---
title: "Session 25: Ambient Sound Design"
module: "Sound Design"
session_number: 25
duration: 30
prerequisite: 24
output_type: patch
difficulty: advanced
tags: [ambient, sound-design, recipe, evolving, capstone, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 11-40"
---

# Session 25: Ambient Sound Design

**Objective:** Build a spacious, evolving ambient patch that combines techniques from every prior module -- slow LFOs, S&H drift, long envelopes, wave folding, and FX routing -- as the Cascadia curriculum capstone.

> [!tip] If you only have 5 minutes
> Set Envelope A Attack to ~50%, Release to ~60% (Med speed). Mixer SAW ~30%, PULSE ~25%. VCF FREQ ~35%, MODE LP4. Patch LFO X -> VCF FM 3 at ~15% with RATE at ~10%. Hold a note and let the slow swell and glacial filter movement wash over you. That is the ambient foundation.

## Sound Design Strategy: Ambient

Ambient sound design is about creating **space and time**. The patch should feel like an environment rather than an instrument -- something that surrounds the listener and evolves on a scale of minutes rather than beats. Every technique from the curriculum converges here: slow modulation (Module 5), long envelopes (Module 3), subtle FM (Module 6), wave folding (explored throughout), and optional external effects (Module 6).

The principles: **glacial envelopes** (5-10 second attack/release), **barely perceptible modulation** (you feel the movement more than hear it), **harmonically rich but soft** (wave folding + low-pass filtering), and **pitch drift** (S&H through slew for organic imperfection). The patch should reward patience -- the longer you hold a note, the more it reveals.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Think about the journey: Session 1 was "play your first note." Now you are combining every module into one patch. Take a moment to appreciate how far you have come.

## Building the Patch

**Cables for this patch:**

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | LFO X OUT | VCF FM 3 IN | Glacial filter drift | Nothing (FM 3 has no normal) |
| 2 | SLEW OUT | VCO A FM 1 IN | Smoothed random pitch wandering | Nothing (FM 1 has no normal) |
| 3 | VCO B TRIANGLE OUT | MIXER IN 2 | Detuned second oscillator | VCO A SINE normalling on IN 2 |
| 4 | LPF B OUT | MAIN 2 IN | LPG pad layer to output | Nothing |
| 5 | Envelope A ENV OUT | VCA/LPF B CV IN | Envelope shapes LPG pad layer | +5V DC normalling |

### VCO A
- OCTAVE: 4
- PITCH: noon
- PW: ~50%
- PW MOD: ~30% (slow drift)
- INDEX: ~10% (subtle FM shimmer from VCO B)
- TZFM/EXP: TZFM
- AC/DC: AC
- SYNC TYPE: Off

### VCO B
- OCTAVE: 4
- PITCH: very slightly flat of noon (~48%, about -3 cents)
- PITCH SOURCE: PITCH A+B
- VCO/LFO: VCO

### Mixer
- SAW: ~30%
- PULSE: ~25%
- IN 2: ~25% (VCO B triangle via Cable 3)
- NOISE: ~10% (barely there, adds air)
- NOISE TYPE: PINK
- All other sliders: 0%

### VCF
- FREQ: ~35% (warm, dark starting point)
- Q: ~12% (gentle warmth)
- MODE: LP4
- LEVEL: ~50%
- FM 1: ~25% (gentle envelope sweep)
- FM 2: noon
- FM 3: ~15% (LFO drift via Cable 1)

### Envelope B (filter)
- Attack: ~40%
- Decay: ~45%
- Sustain: ~45%
- Release: ~55%

### Envelope A (amplitude + LPG layer)
- Attack: ~50% (very slow swell)
- Decay: ~40%
- Sustain: ~80%
- Release: ~60% (very long fade)
- ENVELOPE SPEED: Med
- HOLD POSITION: Off
- CTRL SOURCE: Off

### VCA A
- LEVEL: ~30%
- LEVEL MOD: ~55%
- AUX IN: 0%

### VCA B / LPF
- CV AMOUNT: ~55%
- VCA CONTROL: DOWN (LPF only -- softer than LPG mode for ambient)

### Wave Folder
- FOLD: ~15%
- MOD: 0%

### LFO
- RATE: ~10% (glacial)
- LFO Y RATE DIVIDER: center (x1)
- LFO Z RATE DIVIDER: div8 (very slow relative to X)

### Utilities — Slew Limiter
- SLEW RATE: ~65% (heavy smoothing)
- SLEW DIRECTION: Both
- SLEW SHAPE: EXP

### Output Control
- MAIN DRIVE: noon
- SOFT CLIP: On (warm, rounded output)
- MAIN LEVEL: ~50%

**Step-by-step build:**

1. Set VCO A OCTAVE to 4. Mixer SAW to ~30%, PULSE to ~25%, NOISE to ~10% (PINK). Play and hold a note -- a warm, harmonically rich tone with a subtle breath of noise
2. Patch Cable 3: **VCO B TRIANGLE OUT** -> **MIXER IN 2**. Set IN 2 to ~25%. Set VCO B PITCH slightly flat of noon. Hold a note -- the slight detuning creates a slow beating, a gentle pulse of thickness. This is the chorus foundation of the ambient patch

> [!info] Normalled: VCO A SINE -> Mixer IN 2. Cable 3 overrides this with VCO B's triangle wave, adding a detuned second oscillator to the mix.

3. Set VCF FREQ to ~35%, MODE LP4, Q to ~12%. The tone darkens to a warm, round pad. Set VCF FM 1 to ~25%, Envelope B: Attack ~40%, Decay ~45%, Sustain ~45%, Release ~55%. Hold a note -- the filter swells open slowly and settles into a warm sustain
4. Set Envelope A: Attack ~50%, Decay ~40%, Sustain ~80%, Release ~60%, ENVELOPE SPEED Med. Hold a note for at least 5 seconds -- the full swell takes time to develop. Release and listen to the long fade. This is the glacial envelope that defines ambient
5. Patch Cable 1: **LFO X OUT** -> **VCF FM 3 IN**. Set FM 3 to ~15%, RATE to ~10%. Hold a note -- the filter cutoff drifts almost imperceptibly over 10+ seconds. You feel the movement more than hear it. Set PW MOD to ~30% -- pulse width drifts alongside the filter
6. Set VCO A INDEX to ~10%. Subtle FM shimmer from the normalled VCO B adds harmonic complexity to the oscillator before it reaches the filter
7. Patch Cable 2: **SLEW OUT** -> **VCO A FM 1 IN**. Set VCO A FM 1 to ~3% (barely perceptible). Set Slew RATE to ~65%, SHAPE EXP, DIRECTION Both. Hold a note -- the pitch wanders ever so slightly, like a tape machine with subtle wow. This organic imperfection is essential for ambient sound

> [!info] Normalled: S&H OUT -> Slew/Follow IN. The Slew Limiter smooths the S&H random steps into gentle drifts. At SLEW RATE ~65% with EXP shape, transitions take several seconds -- perfect for ambient-scale movement.

8. Set Wave Folder FOLD to ~15%. Hold a note -- subtle harmonic depth appears in the sustained tone, adding richness without brightness
9. Patch Cable 5: **Envelope A ENV OUT** -> **VCA/LPF B CV IN**. Patch Cable 4: **LPF B OUT** -> **MAIN 2 IN**. Set VCA CONTROL to DOWN (LPF only), CV AMOUNT to ~55%. Now the Envelope A also controls a second filter path through VCA B/LPF. The LPF B output adds a filtered version of the VCA B input (normalled from Ring Mod) to the output, giving the ambient patch a metallic shimmer layer that swells with the main voice

> [!info] Normalled: Ring Mod OUT -> VCA B IN. With no cable in VCA B IN, the ring-modulated signal (VCO A x VCO B) passes through VCA B's low-pass filter. In LPF-only mode (VCA CONTROL DOWN), the envelope controls only the filter cutoff, creating a gentle, filtered ring mod pad layer.

10. Enable SOFT CLIP on Output Control. This rounds off any peaks from the multiple layered signals, adding warmth to the final output

## Playing Tips

- Hold notes for 10-30 seconds minimum. This patch is designed to evolve on a long timescale
- Play single notes or very simple two-note intervals (octaves, fifths). Complex chords muddy the ambient space
- Layer with Session 24's texture patch for a complete ambient environment
- If you have a reverb pedal, patch VCF LP4 OUT -> FX SEND and FX MIX -> any available input for spatial depth (see Session 18)

## Variations

- **Brighter ambient**: Raise FREQ to ~50% and FM 1 to ~35% for a more open, airy character
- **Deep drone**: Lower VCO A OCTAVE to 2, set Envelope A Sustain to ~95%, Attack to ~60%. Pure, deep, evolving drone
- **Glitch ambient**: Raise FM 3 to ~40% and lower Slew RATE to ~20% for more aggressive, less predictable movement

## Output Checklist

- [ ] Ambient patch combines techniques from every curriculum module
- [ ] Glacial envelopes (5+ second attack/release) create slow, evolving swells
- [ ] LFO filter drift and S&H pitch wandering provide organic movement
- [ ] VCO B detuning adds natural chorus
- [ ] VCA B/LPF adds a filtered ring mod shimmer layer
- [ ] Wave folding and soft clipping add warmth and harmonic depth
- [ ] Patch documented in patches/cascadia/ambient-drift-recipe.md with full cable routing and knob settings
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Ambient sound design rewards patience and subtlety -- glacial envelopes, barely perceptible modulation, and slow evolution create immersive sonic environments
- Layering multiple signal paths (main VCA A + VCA B/LPF) with the same envelope creates harmonically complex swells from a single note
- This patch uses techniques from every prior module: oscillators (M1-2), envelopes (M3), filtering (M4), LFO/S&H modulation (M5), FM/ring mod (M6), and recipe construction (M7)

---

**Congratulations!** You have completed the 25-session Cascadia curriculum. You now have a solid foundation in semi-modular synthesis, from basic signal flow to complex ambient sound design. Every technique you have learned is transferable to other synthesizers and modular systems. Keep experimenting, keep documenting your patches, and keep making music.
