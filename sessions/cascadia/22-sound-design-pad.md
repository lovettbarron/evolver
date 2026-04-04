---
title: "Session 22: Pad Sound Design"
module: "Sound Design"
session_number: 22
duration: 25
prerequisite: 21
output_type: patch
difficulty: advanced
tags: [pad, sound-design, recipe, lfo, evolving, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 11-18, 24-27, 35-38"
---

# Session 22: Pad Sound Design

**Objective:** Build an evolving, textured pad patch with slow LFO modulation, long envelopes, subtle wave folding, and optional S&H drift for organic movement.

> [!tip] If you only have 5 minutes
> Long Envelope A (Attack ~40%, Release ~50%) through LP4 with FREQ at ~40% and LFO on FM 3 at ~20% depth. Hold a chord -- the slow attack swell and gentle filter movement create an evolving, breathing pad texture.

## Sound Design Strategy: Pad

Pads fill space. They should be **warm**, **evolving**, and **non-fatiguing** over long holds. The key is **movement without drama**: slow LFOs, gentle filter modulation, drifting pulse widths. A pad that stays perfectly static becomes boring after a few seconds. A pad with too much movement becomes distracting. The sweet spot is subtle, continuous change that your ear registers as "alive" without demanding attention.

Long attack times (~1-3 seconds) create swells that blend into a mix. Long release times mean notes overlap and layer naturally. Low-pass filtering with moderate cutoff removes harshness while preserving enough harmonics for warmth. Wave folding at low amounts adds subtle overtone complexity that gives the pad "depth."

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Set Envelope A Attack to ~40% and hold a note -- recall how long attack creates a swell. Return to noon.

## Building the Patch

**Cables for this patch:**

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | LFO X OUT | VCF FM 3 IN | Slow filter movement | Nothing (FM 3 has no normal) |
| 2 | SLEW OUT | VCO A FM 1 IN | Smoothed random pitch drift | Nothing (FM 1 has no normal) |

### VCO A
- OCTAVE: 4
- PITCH: noon
- PW: ~50%
- PW MOD: ~35% (moderate LFO PWM for timbral drift)
- INDEX: 0%
- SYNC TYPE: Off

### Mixer
- SAW: ~40%
- PULSE: ~35% (blend saw + pulse for harmonic richness)
- All other sliders: 0%

### VCF
- FREQ: ~40% (warm, not dark)
- Q: ~10% (very subtle warmth, no resonant peak)
- MODE: LP4 (smooth rolloff)
- LEVEL: ~50%
- FM 1: ~30% (gentle envelope sweep)
- FM 2: noon
- FM 3: ~20% (LFO filter movement -- Cable 1)

### Envelope B (filter)
- Attack: ~30%
- Decay: ~40%
- Sustain: ~40%
- Release: ~45%

### Envelope A (amplitude)
- Attack: ~40% (slow swell)
- Decay: ~30%
- Sustain: ~75% (full, sustained)
- Release: ~50% (long fade)
- ENVELOPE SPEED: Med
- HOLD POSITION: Off
- CTRL SOURCE: Off

### VCA A
- LEVEL: ~30%
- LEVEL MOD: ~55%
- AUX IN: 0%

### Wave Folder
- FOLD: ~15% (subtle harmonic depth)
- MOD: 0%

### LFO
- RATE: ~15% (very slow)
- LFO Y RATE DIVIDER: center (x1)
- LFO Z RATE DIVIDER: div5

### Utilities — Slew Limiter
- SLEW RATE: ~55% (moderate smoothing on S&H random)
- SLEW DIRECTION: Both
- SLEW SHAPE: EXP

### Output Control
- MAIN DRIVE: noon
- MAIN LEVEL: ~50%

**Step-by-step build:**

1. Set VCO A OCTAVE to 4. Mixer SAW to ~40%, PULSE to ~35%. Play a note -- blended saw + pulse gives harmonic richness
2. Set VCF FREQ to ~40%, MODE to LP4, Q to ~10%. Play a note -- warm and round, high harmonics gently rolled off
3. Set Envelope A: Attack ~40%, Decay ~30%, Sustain ~75%, Release ~50%, ENVELOPE SPEED Med. Hold a note -- the pad swells in slowly and fades out gradually. This is the breathing quality you want
4. Set VCF FM 1 to ~30%, Envelope B: Attack ~30%, Decay ~40%, Sustain ~40%, Release ~45%. Hold notes -- the filter opens slowly with the attack and settles to a warm sustain level. The brightness follows the volume swell
5. Patch Cable 1: **LFO X OUT** -> **VCF FM 3 IN**. Set FM 3 to ~20%, LFO RATE to ~15%. Hold a note -- the filter cutoff drifts slowly up and down, adding gentle movement to the sustained pad. You should hear the brightness shifting subtly over several seconds
6. Set VCO A PW MOD to ~35%. Hold a note -- the pulse width drifts alongside the filter movement, adding timbral undulation. Two layers of slow movement from the linked LFOs
7. Set Wave Folder FOLD to ~15%. Hold a note -- subtle overtone complexity appears, giving the pad depth without brightness

> [!info] Normalled: S&H OUT -> Slew/Follow IN. The Sample & Hold generates random voltages (from normalled internal noise triggered by MIDI clock). The Slew Limiter smooths these steps into gentle drifts. SLEW OUT provides wandering random modulation with no cables needed in the S&H->Slew chain.

8. Patch Cable 2: **SLEW OUT** -> **VCO A FM 1 IN**. Set VCO A FM 1 to ~5% (very subtle). Set Slew RATE to ~55%, SHAPE to EXP, DIRECTION to Both. Hold a note -- the pitch wanders almost imperceptibly, adding organic life. If the drift is too much, lower FM 1 to ~3%

## Playing Tips

- Hold notes for at least 3-4 seconds to hear the full swell and evolving movement
- Play simple two- or three-note chords in the C3-C5 range. The slow attack means notes blend smoothly
- Layer this pad under a lead or bass from earlier sessions for a complete arrangement
- The long release means notes overlap naturally -- play slowly and let the tails blend

## Variations

- **Brighter pad**: Raise FREQ to ~55% and FM 1 to ~45% for a more open, airy character
- **Dark drone**: Lower FREQ to ~25%, RATE to ~8%, remove Cable 2. Set both Sustain controls to ~90% for a deep, slow-moving drone
- **Shimmery pad**: Raise PW MOD to ~50% and add VCO A INDEX at ~10% for FM shimmer on top of the filter movement

## Output Checklist

- [ ] Pad patch built with slow LFO filter movement and long envelope swells
- [ ] Pulse width modulation adds timbral drift
- [ ] Smoothed S&H provides subtle random pitch wandering
- [ ] Wave folding adds harmonic depth without brightness
- [ ] Patch documented in patches/cascadia/evolving-pad-recipe.md with full cable routing and knob settings
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Pad patches need slow, continuous movement from multiple sources (LFO on filter, LFO on PWM, S&H drift on pitch) to stay alive without becoming distracting
- Long attack and release times on both amplitude and filter envelopes create the breathing, swelling quality that defines a good pad
- Subtle wave folding adds "depth" -- harmonic complexity that your ear registers as richness without identifying as a specific effect

## Next Session Preview

Session 23 builds **complex percussion** -- expanding the LPG bongo from Session 12 with ring modulation, noise layering, and modulation for a multi-textured drum sound.
