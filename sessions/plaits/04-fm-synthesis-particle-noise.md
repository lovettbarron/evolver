---
title: 'Session 04: FM Synthesis & Particle Noise'
session_number: 4
duration: 25
prerequisite: 3
output_type: patch
difficulty: intermediate
tags:
  - mode-pairs
  - fm-synthesis
  - particle-noise
  - bank-1-model-3
  - bank-2-model-3
instrument: plaits
instrument_type: eurorack_module
reference: 'Plaits Manual pp. 8, 10'
section: Mode Pairs
cross_references:
  - ref: 'ikarie/03-envelope-follower-modulation'
    reason: 'Route Plaits FM output through Ikarie for resonant filtering of digital harmonics'
---

# Session 04: FM Synthesis & Particle Noise

**Objective:** Explore two-operator FM synthesis (Bank 1 Model 3) and particle noise (Bank 2 Model 3) -- both create frequency-domain complexity, but FM is precise and harmonically rich while particle noise is chaotic and textural.

> [!tip] If you only have 5 minutes
> Set init state. Select Bank 1 Model 3 (FM). Sweep TIMBRE to hear the modulation index go from clean sine to metallic clanging. Then sweep MORPH past noon -- feedback makes operator 2 modulate its own phase, creating chaotic FM. That crossover from order to chaos is the heart of this session.

## Warm-Up (2 min)

Set init state. Briefly switch to Bank 1 Model 2 (waveshaping from last session) and sweep TIMBRE once to reconnect. Then press MODEL 1 once more to reach Model 3 (FM).

## Setup

1. Set all controls to init state
2. Patch V/OCT to **V/OCT**, OUT to mixer
3. Select Bank 1 Model 3 (third LED in left column)

## Exercises

### Exercise 1: Two-Operator FM (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:30,knob-plaits-morph:40"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue"
></div>

1. With Bank 1 Model 3 selected, start with TIMBRE low (near CCW). You should hear a clean sine-like tone -- low modulation index
2. Slowly sweep **TIMBRE** clockwise: this is the modulation index. The tone grows increasingly metallic and harmonically complex. Classic FM territory -- electric pianos, bells, brass
3. Return TIMBRE to about 10 o'clock. Sweep **HARMONICS**: this controls the frequency ratio between the two FM operators. At certain ratios (noon, various positions) you get harmonic tones; between ratios, inharmonic metallic sounds emerge
4. Now explore **MORPH**: before 12 o'clock, operator 2 modulates operator 1's phase (clean FM). Past 12 o'clock, operator 2 also modulates its own phase -- this is FM feedback, producing increasingly rough and chaotic tones
5. AUX carries a sub-oscillator -- useful for grounding the FM tone with a stable low-frequency foundation

### Exercise 2: Particle Noise (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:80,knob-plaits-morph:40"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:amber"
></div>

1. Switch to Bank 2 Model 3 (press MODEL 2 three times -- third LED in right column). This is particle noise: dust noise processed by filter networks
2. Sweep **TIMBRE**: this controls particle density. Low = sparse, crackling dust. High = dense, hissing texture
3. Sweep **HARMONICS**: this controls the amount of frequency randomization in the filter networks
4. Sweep **MORPH**: this is key. Before noon, the filters are all-pass networks creating a reverberating, metallic quality. Past noon, they become increasingly resonant band-pass filters, adding pitched, ringing character to the noise
5. AUX carries the raw dust noise before filtering -- the unprocessed source material

### Exercise 3: Order vs Chaos (5 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-morph:amber"
></div>

1. On Bank 1 Model 3 (FM), set TIMBRE at about 1 o'clock (moderate modulation). Sweep MORPH slowly from CCW to CW and listen to the transition from clean FM to chaotic feedback
2. Switch to Bank 2 Model 3 (particle noise). Set TIMBRE at noon. Sweep MORPH from CCW to CW -- similar transition from all-pass reverb to resonant pitched filtering
3. Both models use MORPH to control a spectrum from smooth/diffuse to resonant/chaotic. Same concept, different sonic domains

## Session Output

Document in your Obsidian daily note:

- **FM bell patch:** Note the HARMONICS ratio and TIMBRE index that produced the most bell-like tone
- **FM feedback threshold:** At what MORPH position did the FM become noticeably chaotic?
- **Particle noise favorite:** Note settings for your preferred particle texture (sparse crackle vs dense hiss)

## What's Next

In the next session, you will explore formant-based synthesis from both banks: the granular formant oscillator (Bank 1 Model 4) and vowel/speech synthesis (Bank 2 Model 8) -- both produce voice-like timbres through different mechanisms.
