---
title: "Session 21: Lead Sound Design"
module: "Sound Design"
session_number: 21
duration: 25
prerequisite: 20
output_type: patch
difficulty: advanced
tags: [lead, sound-design, recipe, detune, wave-folder, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 11-18, 24-27, 28-29"
---

# Session 21: Lead Sound Design

**Objective:** Build a cutting, expressive lead patch from scratch with VCO B detuning, filter resonance, and wave folding for edge.

> [!tip] If you only have 5 minutes
> The secret to this lead is VCO A saw + VCO B slight detune (PITCH slightly off noon) through BP2 with moderate resonance (~35%). The bandpass cuts lows and highs, leaving a focused, vocal mid-range presence that cuts through any mix.

## Sound Design Strategy: Lead

A lead patch must **cut through a mix** and **respond expressively to playing**. Cutting through means occupying a focused frequency range with enough harmonic presence to stand out against pads and bass. Expressiveness means the sound changes with velocity, note length, and register.

Key techniques: **detuned oscillators** for thickness (two oscillators slightly out of tune create a natural chorus), **bandpass or resonant low-pass filtering** for mid-range focus, **moderate attack time** so notes have a slight "swell" that draws the ear, and **wave folding** for harmonic edge that adds overtones without the harshness of distortion.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Set VCO A OCTAVE to 2, Mixer SAW to ~70%, SUB to ~45% -- recall the bass setup from Session 20. Return to noon/center.

## Building the Patch

**Cables for this patch:**

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | VCO B TRIANGLE OUT | MIXER IN 2 | Blend detuned VCO B into mix | VCO A SINE normalling on IN 2 |

### VCO A
- OCTAVE: 4 (lead range)
- PITCH: noon
- PW: ~60% (slightly asymmetric for brightness)
- PW MOD: ~20% (subtle LFO chorus)
- INDEX: ~15% (subtle FM adds harmonic shimmer)
- TZFM/EXP: TZFM
- AC/DC: AC

### VCO B
- OCTAVE: 4 (same as VCO A)
- PITCH: slightly sharp of noon (~52%, about +3 cents detune)
- PITCH SOURCE: PITCH A+B (tracks keyboard)
- VCO/LFO: VCO

### Mixer
- SAW: ~55% (VCO A saw, primary)
- IN 2: ~40% (VCO B triangle, blended -- Cable 1 overrides VCO A SINE normalling)
- All other sliders: 0%

### VCF
- FREQ: ~45%
- Q: ~35% (resonant presence)
- MODE: BP2 (bandpass for focused mid-range)
- LEVEL: ~55%
- FM 1: ~45% (envelope bite on attack)
- FM 2: noon (keyboard tracking)
- FM 3: 0%

### Envelope B (filter)
- Attack: ~5%
- Decay: ~35%
- Sustain: ~25%
- Release: ~20%

### Envelope A (amplitude)
- Attack: ~5% (slight swell)
- Decay: ~30%
- Sustain: ~70%
- Release: ~20%
- ENVELOPE SPEED: Fast
- HOLD POSITION: Off
- CTRL SOURCE: Level

### VCA A
- LEVEL: ~35%
- LEVEL MOD: ~60%
- AUX IN: 0%

### Wave Folder
- FOLD: ~20% (harmonic edge)
- MOD: 0%

### LFO
- RATE: ~25% (for PWM drift)

### Output Control
- MAIN DRIVE: noon
- MAIN LEVEL: ~50%

<div data-cascadia-panel
  data-sections="vco-a,vco-b,mixer,vcf,envelope-a,envelope-b,vca-a,wave-folder,lfo-xyz"
  data-knobs="slider-mixer-saw:70,slider-mixer-in-2:51,slider-vcf-freq:57,slider-vcf-q:44,slider-vcf-fm-1:57,slider-vco-a-index:19,slider-wave-folder-fold:25"
  data-highlights="jack-vco-b-triangle-out:amber,jack-mixer-in-2:blue,slider-mixer-saw:blue,slider-mixer-in-2:blue,switch-vcf-mode:blue,slider-wave-folder-fold:blue"
  data-cables="jack-vco-b-triangle-out>jack-mixer-in-2:audio"
  data-zoom="false"
></div>

**Step-by-step build:**

1. Set VCO A OCTAVE to 4, Mixer SAW to ~55%. Play notes -- clean sawtooth lead
2. Patch Cable 1: **VCO B TRIANGLE OUT** -> **MIXER IN 2**. Set Mixer IN 2 to ~40%. Set VCO B OCTAVE to 4, PITCH slightly sharp of noon. Play a note -- you should hear a thicker, chorused tone from the two slightly detuned oscillators

> [!info] Normalled: VCO A SINE -> Mixer IN 2. Patching Cable 1 overrides this, substituting VCO B's triangle wave. Triangle is chosen over saw for a softer blend that thickens without muddying.

3. Set VCF MODE to BP2, FREQ to ~45%, Q to ~35%. Play notes -- the tone narrows to a focused, vocal mid-range. The bandpass cuts low mud and high harshness, leaving just the cutting lead frequencies
4. Set VCF FM 1 to ~45%, Envelope B: Attack ~5%, Decay ~35%, Sustain ~25%, Release ~20%. Play notes -- each note has a filter "bite" on attack that adds presence and articulation
5. Set Envelope A: Attack ~5%, Decay ~30%, Sustain ~70%, Release ~20%. The slight attack swell gives the lead a singing quality rather than a harsh onset
6. Set Wave Folder FOLD to ~20%. Play notes -- harmonic overtones add edge and presence. The wave folder gives the lead a complex, slightly aggressive character that helps it cut through
7. Set VCO A INDEX to ~15% for subtle FM shimmer. Set PW to ~60%, PW MOD to ~20%, RATE to ~25% for gentle pulse width movement on the underlying sawtooth

## Playing Tips

- This lead responds well to velocity -- softer playing for mellow phrases, harder strikes for cutting accents
- The BP2 filter with resonance creates a vocal quality that responds to FREQ changes -- sweep FREQ during performance for a "wah" effect
- Play legato (overlapping notes) for smooth, singing phrases. Play staccato for punchy, rhythmic leads
- Highest expressiveness is in the C4-C6 range where the bandpass resonance is most present

## Variations

- **Screaming lead**: Raise Q to ~55% and FM 1 to ~65% for an aggressive, resonant attack
- **Mellow lead**: Switch MODE to LP2, lower FOLD to 0%, reduce Q to ~15% for a smoother, warmer character
- **Sync lead**: Set VCO A SYNC TYPE to Hard. Sweep VCO A PITCH or OCTAVE for classic hard sync timbral sweeps

## Output Checklist

- [ ] Lead patch built with VCO B detuning for thickness
- [ ] BP2 filter with resonance provides focused mid-range presence
- [ ] Wave folding adds harmonic edge without harshness
- [ ] Patch documented in patches/cascadia/searing-lead-recipe.md with full cable routing and knob settings
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Lead patches need mid-range focus (bandpass filtering) and harmonic edge (wave folding) to cut through a mix
- Detuning VCO B against VCO A creates natural thickness and chorusing from two analog oscillators
- A slight attack swell (~5%) on both amplitude and filter envelopes gives a singing, expressive quality

## Next Session Preview

Session 22 builds an **evolving pad** -- slow, lush, textured. LFO modulation on filter and PWM creates movement, long envelopes create swells, and optional S&H drift adds unpredictability.
