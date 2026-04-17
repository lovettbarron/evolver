---
title: 'Session 29: Pads and Textures -- PWM, Waveshape, and Modulated'
session_number: 29
duration: 25
prerequisite: 28
output_type: patch
difficulty: advanced
tags:
  - recipes
  - pads
  - textures
  - pwm
  - waveshape
  - modulation
  - sound-design
instrument: evolver
reference: >-
  Anu Kirk p.13-15 (PWM), p.22-25 (waveshapes), p.70-74 (mod routing), DSI
  Manual p.15-17, p.21-23
section: Sound Design Recipes
instrument_type: instrument
---

# Session 29: Pads and Textures -- PWM, Waveshape, and Modulated

**Objective:** Build three pad and texture patches -- PWM pad, waveshape pad, and modulated texture -- using slow envelopes, detuning, and layered modulation for sounds that fill space and evolve over time.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Osc 1 Shape = `Pulse 50`, Osc 2 Shape = `Pulse 50`, Fine = `+5`. LFO 1: Shape = `Tri`, Freq = `6`, Amount = `35`, Dest = `PW1`. LFO 2: Shape = `Tri`, Freq = `5`, Amount = `30`, Dest = `PW2`. ENV 2: Attack = `40`, Release = `45`. Instant lush PWM pad.

## Warm-Up (2 min)

Load your filtered lead from Session 28. Sweep the mod wheel from zero to full while holding a note -- hear the warm-to-bright transition. Lead patches respond to immediate gestures. Pads are the opposite: they evolve slowly, filling space over time. Load the basic patch.

## Setup

Each recipe starts from the basic patch. Have 3 empty program slots ready for saving.

## Exercises

### Recipe 1: PWM Pad (7 min)

Lush, chorus-like pad using pulse width modulation on both analog oscillators (from Session 04 technique, Anu Kirk p.13-15). The constantly shifting pulse width creates natural movement without external effects.

1. From the basic patch:
   - **Osc 1 Shape** = `Pulse 50`, **Level** = `50`
   - **Osc 2 Shape** = `Pulse 50`, **Level** = `45`, **Fine** = `+5` (slight detuning for width)
   - **Osc 3 Level** = `0`, **Osc 4 Level** = `0`
   - **Osc Slop** = `3` (analog drift adds to the organic feel)
2. Slow PWM modulation -- each oscillator modulated at a different rate:
   - **LFO 1**: Shape = `Tri`, Frequency = `6`, Amount = `35`, Destination = `PW1` (Osc 1 Pulse Width)
   - **LFO 2**: Shape = `Tri`, Frequency = `5`, Amount = `30`, Destination = `PW2` (Osc 2 Pulse Width)
   - The different rates create a constantly shifting stereo image
3. Filter -- warm and rounded:
   - **LPF Frequency** = `65`, **Resonance** = `15`, **4-Pole** ON
   - **Env Amount** = `20`, ENV 1: **Attack** = `30`, **Decay** = `50`, **Sustain** = `60`, **Release** = `45`
   - **Key Amount** = `72`
4. Slow VCA envelope for pad behavior:
   - ENV 2: **Attack** = `40`, **Decay** = `0`, **Sustain** = `100`, **Release** = `45`
5. Add subtle stereo delay:
   - **Delay 1 Time** = `3 Steps`, **Level** = `20`, **Feedback 1** = `25`
<div data-evolver-panel data-knobs="knob-osc-shapepw:64,knob-osc-level:50,knob-osc-fine:69,knob-lfo-frequency:6,knob-lfo-amount:35,knob-filter-frequency:65,knob-filter-resonance:15,knob-filter-envamount:20,knob-filter-keyamount:72,knob-filter-attack:30,knob-filter-decay:50,knob-filter-sustain:60,knob-filter-release:45,knob-amp-attack:40,knob-amp-sustain:100,knob-amp-release:45,knob-delay-time:40,knob-delay-level:20,knob-delay-feedback1:25" data-highlights="knob-lfo-frequency:amber,knob-lfo-amount:amber,switch-lfo1:amber,switch-lfo2:amber,knob-amp-attack:amber,knob-amp-release:amber" data-sections="oscillators,lfos,filter,amp"></div>

6. Hold a chord (or single notes -- the Evolver is mono, but the patch should sound full). The PWM creates a natural chorus effect without any chorus processor. You should hear the tone width constantly shifting

**Save as "PWM Pad"**.

### Recipe 2: Waveshape Pad (8 min)

Evolving digital pad using waveshape morphing and detuning between digital and analog layers (Anu Kirk p.22-25).

1. Load the basic patch fresh:
   - **Osc 1 Shape** = `Saw`, **Level** = `30`, **Fine** = `+3`
   - **Osc 2 Shape** = `Saw`, **Level** = `30`, **Fine** = `-3`
   - **Osc 3 Shape** = `15` (a complex waveshape), **Level** = `35`
   - **Osc 4 Shape** = `22` (different complex waveshape), **Level** = `35`
   - **Osc Slop** = `2`
2. Waveshape modulation -- slowly morph between digital waveshapes:
   - **LFO 1**: Shape = `Tri`, Frequency = `3` (very slow), Amount = `20`, Destination = `O3S` (Osc 3 Shape)
   - **LFO 2**: Shape = `Tri`, Frequency = `2` (even slower), Amount = `15`, Destination = `O4S` (Osc 4 Shape)
   - As the LFOs sweep, the harmonic content of the digital oscillators gradually shifts -- the pad never sounds the same twice
3. Filter -- gently sculpted:
   - **LPF Frequency** = `70`, **Resonance** = `20`, **4-Pole** ON
   - **Env Amount** = `15`, ENV 1: **Attack** = `35`, **Decay** = `60`, **Sustain** = `55`, **Release** = `50`
   - **Key Amount** = `72`
4. Pad envelope:
   - ENV 2: **Attack** = `45`, **Decay** = `0`, **Sustain** = `100`, **Release** = `50`
5. Add **Filter Split** = `15` for subtle stereo separation between the L and R filter cutoffs
6. Add delay for space: **Delay 1 Time** = `4 Steps`, **Level** = `25`, **Feedback 1** = `30`
<div data-evolver-panel data-knobs="knob-osc-level:30,knob-osc-fine:67,knob-lfo-frequency:3,knob-lfo-amount:20,knob-filter-frequency:70,knob-filter-resonance:20,knob-filter-envamount:15,knob-filter-keyamount:72,knob-filter-attack:35,knob-filter-decay:60,knob-filter-sustain:55,knob-filter-release:50,knob-filter-lrsplit:15,knob-amp-attack:45,knob-amp-sustain:100,knob-amp-release:50,knob-delay-time:50,knob-delay-level:25,knob-delay-feedback1:30" data-highlights="knob-lfo-frequency:amber,knob-lfo-amount:amber,switch-lfo1:amber,switch-lfo2:amber,knob-filter-lrsplit:amber,switch-osc3:amber,switch-osc4:amber" data-zoom="false"></div>

7. Hold a note and listen for 20 seconds. The tone character slowly morphs as the waveshapes change underneath the analog layer

**Save as "Waveshape Pad"**.

### Recipe 3: Modulated Texture (8 min)

Dense, evolving texture using multiple modulation sources stacked together -- LFOs, mod slots, and sequencer. This is the "everything at once" patch (Anu Kirk p.70-74 modulation routing).

1. Load the basic patch fresh:
   - **Osc 1 Shape** = `Saw`, **Level** = `35`
   - **Osc 2 Shape** = `Pulse 50`, **Level** = `35`, **Fine** = `+8`
   - **Osc 3 Shape** = `40`, **Level** = `30`
   - **Osc 4 Shape** = `55`, **Level** = `30`
   - **FM 4->3** = `15` (subtle FM between digital oscillators)
   - **Osc Slop** = `4`
2. Modulation layer 1 -- LFOs for slow movement:
   - **LFO 1**: Shape = `Tri`, Frequency = `4`, Amount = `15`, Destination = `FiL` (filter)
   - **LFO 2**: Shape = `Tri`, Frequency = `3`, Amount = `12`, Destination = `FM4` (FM amount)
   - **LFO 3**: Shape = `Random`, Frequency = `8`, Amount = `5`, Destination = `OAF` (subtle pitch drift)
   - **LFO 4**: Shape = `Tri`, Frequency = `2`, Amount = `20`, Destination = `PW1` (pulse width)
3. Modulation layer 2 -- mod slots for cross-modulation:
   - **Mod Slot 1**: Source = `Osc 3`, Amount = `8`, Destination = `PW2` (digital osc modulates analog pulse width)
   - **Mod Slot 2**: Source = `LFO 1`, Amount = `10`, Destination = `SpL` (LFO drives filter split for stereo movement)
4. Filter -- moderately open with resonance:
   - **LPF Frequency** = `60`, **Resonance** = `35`, **4-Pole** ON
   - **Env Amount** = `25`, ENV 1: **Attack** = `50`, **Decay** = `70`, **Sustain** = `40`, **Release** = `55`
   - **Key Amount** = `72`
5. Long envelope:
   - ENV 2: **Attack** = `55`, **Decay** = `0`, **Sustain** = `100`, **Release** = `55`
6. Add effects for depth:
   - **Delay 1 Time** = `3 Steps`, **Level** = `30`, **Feedback 1** = `35`, **Feedback 2** = `15`
   - **Feedback Level** = `20`, **Feedback Frequency** = `24`
<div data-evolver-panel data-knobs="knob-osc-level:35,knob-osc-fine:72,knob-osc-fm:15,knob-lfo-frequency:4,knob-lfo-amount:15,knob-filter-frequency:60,knob-filter-resonance:35,knob-filter-envamount:25,knob-filter-keyamount:72,knob-filter-attack:50,knob-filter-decay:70,knob-filter-sustain:40,knob-filter-release:55,knob-amp-attack:55,knob-amp-sustain:100,knob-amp-release:55,knob-delay-time:40,knob-delay-level:30,knob-delay-feedback1:35,knob-delay-feedback2:15,knob-feedback-amount:20,knob-feedback-frequency:24,knob-mod-amount:8" data-highlights="knob-lfo-frequency:amber,switch-lfo1:amber,switch-lfo2:amber,switch-lfo3:amber,switch-lfo4:amber,knob-osc-fm:amber,knob-mod-amount:amber,knob-feedback-amount:amber" data-zoom="false"></div>

7. Hold a note and listen for 30+ seconds. The patch should constantly evolve -- filter moving, FM shifting, pulse width changing, stereo image drifting. No two moments sound identical

**Save as "Modulated Texture"**.

## Exploration (optional, hyperfocus days)

- Add the sequencer to the modulated texture: Seq 1 Dest = `O3S`, 8 random values -- waveshape changes on every step
- Try the PWM pad with hard sync enabled: creates a more aggressive, harmonically rich pad
- Layer all three approaches: PWM on analog oscillators, waveshape modulation on digital, FM and mod slots all active simultaneously

## Output Checklist

- [ ] PWM Pad patch saved -- lush, shifting stereo, chorus-like
- [ ] Waveshape Pad patch saved -- evolving harmonic content, analog+digital layers
- [ ] Modulated Texture patch saved -- dense, multi-source modulation, constantly evolving
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Pad patches need slow attack and release envelopes (30-55 range) to create the gradual fade-in/out that defines a pad
- PWM creates natural chorus without effects by constantly shifting the harmonic content of pulse waves -- using different LFO rates on L and R creates stereo width
- Layering multiple slow modulation sources (LFOs, mod slots, FM) creates textures that evolve organically -- the key is keeping individual amounts subtle so they combine without chaos

## Next Session Preview

Session 30 creates drum and percussion patches -- kick, snare, and hats using short envelopes, noise, and FM. You will also build a complete drum beat sequence using the Evolver's 4-track sequencer.
