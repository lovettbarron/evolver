---
title: "Session 23: Percussion Sound Design"
module: "Sound Design"
session_number: 23
duration: 30
prerequisite: 22
output_type: patch
difficulty: advanced
tags: [percussion, drum, sound-design, recipe, lpg, ring-mod, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 20-21, 32-34"
---

# Session 23: Percussion Sound Design

**Objective:** Build a complex, multi-layered percussion patch combining the LPG, ring modulation, noise, and multiple envelope shapes for a rich drum sound that goes beyond the basic bongo.

> [!tip] If you only have 5 minutes
> Repatch the Session 9 LPG bongo (VCO A SAW OUT -> VCA B IN, Envelope A -> VCA/LPF B CV IN, VCA CONTROL UP), then raise Mixer IN 1 to ~25%. The ring mod adds metallic overtones to the woody LPG strike, transforming a simple bongo into a complex percussion hit.

## Sound Design Strategy: Percussion

Great synthesized percussion layers multiple timbral elements: a **body** (pitched oscillator through an LPG for the fundamental thump), a **transient** (noise burst for the initial click/snap), and **character** (ring modulation, FM, or wave folding for metallic or tonal color). Each element has its own envelope shape -- the transient is fastest, the body slightly longer, the character somewhere in between.

The LPG is the foundation because its coupled amplitude-filter response creates naturally musical percussion dynamics. Layering noise and ring mod on top adds the complexity that separates a synthesized drum from a basic bleep.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Set Envelope A to Attack ~0%, Decay ~20%, Sustain ~0%, ENVELOPE SPEED Fast -- recall the percussive envelope from Session 12. Return to noon.

## Building the Patch

**Cables for this patch:**

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | VCO A SAW OUT | VCA B IN | Route sawtooth to LPG | Ring Mod OUT -> VCA B IN normalling |
| 2 | Envelope A ENV OUT | VCA/LPF B CV IN | Percussive envelope controls LPG | +5V DC normalling |
| 3 | LPF B OUT | MAIN 2 IN | LPG output to second output channel | Nothing |

### VCO A
- OCTAVE: 3 (percussion range)
- PITCH: noon
- INDEX: ~10% (subtle FM adds metallic overtones)
- TZFM/EXP: TZFM
- AC/DC: AC

### VCO B
- OCTAVE: 5 (high ratio for metallic FM sidebands)
- PITCH SOURCE: PITCH A+B
- VCO/LFO: VCO

### Mixer
- SAW: ~35% (blended into main path for transient layer)
- NOISE: ~25% (noise click transient)
- NOISE TYPE: PINK (warmer noise for percussion)
- IN 1: ~20% (ring mod metallic character)
- All other sliders: 0%

### VCF
- FREQ: ~55%
- Q: ~10%
- MODE: LP4
- LEVEL: ~50%
- FM 1: ~55% (sharp envelope sweep on main path)
- FM 2: noon
- FM 3: 0%

### Envelope B (filter on main path)
- Attack: ~0%
- Decay: ~20%
- Sustain: ~0%
- Release: ~10%

### Envelope A (LPG percussion -- routed via Cable 2)
- Attack: ~0%
- Decay: ~25%
- Sustain: ~0%
- Release: ~10%
- ENVELOPE SPEED: Fast
- HOLD POSITION: Off
- CTRL SOURCE: Level

### VCA B / LPF
- CV AMOUNT: ~80%
- VCA CONTROL: UP (LPG mode)

### VCA A
- LEVEL: ~25%
- LEVEL MOD: ~50%
- AUX IN: 0%

### Wave Folder
- FOLD: ~15% (slight harmonic crunch)
- MOD: 0%

### Output Control
- MAIN DRIVE: noon
- MAIN LEVEL: ~50%

<div data-cascadia-panel
  data-sections="vco-a,vco-b,mixer,vcf,envelope-a,envelope-b,vca-a,vca-b-lpf,wave-folder,output-control"
  data-knobs="slider-mixer-saw:44,slider-mixer-noise:32,slider-mixer-in-1:25,slider-vcf-fm-1:70,slider-envelope-a-attack:0,slider-envelope-a-decay:32,slider-envelope-a-sustain:0,knob-vca-b-lpf-cv-amount:102"
  data-highlights="jack-mixer-vco-a-saw-out:amber,jack-vca-b-lpf-in:blue,jack-envelope-a-out:amber,jack-vca-b-lpf-cv-in:blue,jack-vca-b-lpf-out:amber,jack-output-control-main-2-in:blue,switch-vca-b-lpf-vca-control:blue"
  data-cables="jack-mixer-vco-a-saw-out>jack-vca-b-lpf-in:audio,jack-envelope-a-out>jack-vca-b-lpf-cv-in:mod,jack-vca-b-lpf-out>jack-output-control-main-2-in:audio"
  data-zoom="false"
></div>

**Step-by-step build:**

1. Set VCO A OCTAVE to 3. Set Mixer SAW to ~35%, NOISE to ~25%, NOISE TYPE to PINK, IN 1 to ~20%
2. Set Envelope B: Attack ~0%, Decay ~20%, Sustain ~0%, Release ~10%. Set VCF FM 1 to ~55%, FREQ to ~55%, MODE LP4. Play a note -- you should hear a short, snappy filtered hit with a noise click and subtle ring mod character in the main path
3. Patch Cable 1: **VCO A SAW OUT** -> **VCA B IN**. Patch Cable 2: **Envelope A ENV OUT** -> **VCA/LPF B CV IN**. Set VCA CONTROL to UP (LPG mode), CV AMOUNT to ~80%

> [!info] Normalled: Ring Mod OUT -> VCA B IN. Cable 1 overrides this, sending VCO A's raw sawtooth directly to the LPG. The Ring Mod is still active and blended through Mixer IN 1.

> [!info] Normalled: +5V DC -> VCA/LPF B CV IN. Cable 2 overrides the constant voltage with Envelope A's percussive shape, giving the LPG its dynamic response.

4. Set Envelope A: Attack ~0%, Decay ~25%, Sustain ~0%, Release ~10%, ENVELOPE SPEED Fast. Play a note -- the LPG produces the woody bongo percussion from Session 12
5. Patch Cable 3: **LPF B OUT** -> **MAIN 2 IN**. Now the LPG output sums with the main signal path at the output. Play a note -- you should hear both the main path (filtered sawtooth + noise + ring mod) AND the LPG percussion simultaneously. The result is a complex, layered drum hit
6. Set VCO A INDEX to ~10%, VCO B OCTAVE to 5. The FM adds metallic shimmer to the sawtooth before it enters the LPG, giving the percussion a tonal complexity beyond a simple bongo
7. Set VCA A LEVEL to ~25%, LEVEL MOD to ~50%. This controls the main path contribution. Adjust the balance between main path (noise + ring mod transient) and LPG (woody body) by tweaking MAIN LEVEL vs Cable 3's signal level at the output
8. Set Wave Folder FOLD to ~15%. The main path gets a slight harmonic crunch that adds aggression to the transient layer

## Playing Tips

- Play staccato notes at C2-C4 for the best percussion response. Lower notes produce deeper drums; higher notes produce more metallic clicks
- Velocity controls the LPG strike intensity (CTRL SOURCE at Level) -- soft taps for ghost notes, hard strikes for accents
- Rapid rhythmic playing creates convincing drum patterns. Try alternating C2 and C3 for a kick/snare-like pattern
- Experiment with VCO A OCTAVE: position 2 for kick-like thuds, position 4 for snare-like snaps

## Variations

- **Deeper kick**: Lower VCO A OCTAVE to 2, set Mixer NOISE to 0%, IN 1 to 0%. Pure LPG body with no transient layers
- **Metallic hit**: Raise INDEX to ~30% and VCO B OCTAVE to 6 for stronger FM metallic character
- **Noisy snare**: Raise NOISE to ~50%, switch to WHITE noise, set Envelope B Decay to ~15% for a short, snappy, noise-heavy hit

## Output Checklist

- [ ] Complex percussion patch layers LPG body, noise transient, ring mod character, and FM metallic overtones
- [ ] LPG operates in VCA+LPF mode with Envelope A providing the percussive strike
- [ ] Main path and LPG output sum at Output Control for multi-layered drum sound
- [ ] Velocity sensitivity provides dynamic accent control
- [ ] Patch documented in patches/cascadia/complex-percussion-recipe.md with full cable routing and knob settings
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Complex percussion layers multiple timbral elements: LPG body, noise transient, ring mod character, and FM metallic overtones
- Cascadia's dual output paths (VCA A main + VCA B/LPF secondary) can be summed at Output Control for multi-source drum sounds
- Each layer has its own envelope characteristics -- the LPG handles the body, the main path filter envelope handles the transient character

## Next Session Preview

Session 24 builds a **texture patch** -- noise through the filter with S&H modulation, wave folding, and self-patching for an evolving, non-pitched sound design element.
