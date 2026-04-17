---
title: 'Session 28: Lead Sounds -- Sync, FM, and Filtered'
session_number: 28
duration: 20
prerequisite: 27
output_type: patch
difficulty: advanced
tags:
  - recipes
  - leads
  - sync-lead
  - fm-lead
  - filtered-lead
  - performance
  - sound-design
instrument: evolver
reference: 'Anu Kirk p.17-21, p.26-32, p.95-98, DSI Manual p.15-17, p.23-24'
section: Sound Design Recipes
instrument_type: instrument
---

# Session 28: Lead Sounds -- Sync, FM, and Filtered

**Objective:** Build three performance-ready lead patches -- sync lead, FM lead, and filtered lead -- each with expression mappings for mod wheel, velocity, and aftertouch.

> [!tip] If you only have 5 minutes
> Load the basic patch. Set Sync 2->1 ON, Osc 1 Shape = `Pulse 50`, Osc 1 Freq = `C2`, Osc 2 Level = `0`. ENV 3 Dest = `O1F`, Amount = `67`, Attack = `15`, Decay = `87`. Mod Wheel Dest = `FiL`, Amount = `-60`. Play and sweep the mod wheel -- instant classic sync lead.

## Warm-Up (2 min)

Load your acid bass from Session 27. Play a few notes to hear the filter squelch and glide. You built bass from multiple techniques. Now you apply the same approach to lead sounds -- melodic patches designed for playing expressively. Load the basic patch.

## Setup

Each recipe starts from the basic patch. Have 3 empty program slots ready.

## Exercises

### Recipe 1: Sync Lead (6 min)

The classic Prophet sync sound -- hard sync creates aggressive, harmonically rich timbres (from Session 05 technique, Anu Kirk p.17-21).

1. From the basic patch:
   - **Sync 2->1** = ON
   - **Osc 1 Shape** = `Pulse 50`, **Level** = `55`, **Frequency** = `C2` (above Osc 2 for sync to produce harmonics)
   - **Osc 2 Shape** = `Saw`, **Level** = `0` (master clock only, not heard)
   - **Osc 3 Level** = `0`, **Osc 4 Level** = `0`
2. Envelope sweep on sync slave pitch:
   - **ENV 3**: Destination = `O1F` (Osc 1 Freq), Amount = `67`, Attack = `15`, Decay = `87`, Sustain = `0`, Release = `20`
3. Filter -- slightly open to let the sync harmonics through:
   - **LPF Frequency** = `85`, **Resonance** = `25`, **4-Pole** ON
   - **Env Amount** = `30`, ENV 1: **Decay** = `60`, **Sustain** = `40`
4. VCA:
   - ENV 2: **Attack** = `5`, **Decay** = `0`, **Sustain** = `100`, **Release** = `25`
5. Expression mappings:
   - **Mod Wheel Destination** = `FiL`, **Amount** = `-60` (darkens the sound)
   - **Pressure Destination** = `LF1A` (LFO 1 Amount), **Amount** = `30`
   - **LFO 1**: Shape = `Tri`, Frequency = `50`, Amount = `0`, Destination = `OAF` (vibrato via aftertouch)
   - **Filter Velocity** = `35`
<div data-evolver-panel data-knobs="knob-osc-shapepw:64,knob-osc-level:55,knob-osc-frequency:24,knob-filter-frequency:85,knob-filter-resonance:25,knob-filter-envamount:30,knob-filter-velocity:35,knob-filter-decay:60,knob-filter-sustain:40,knob-amp-attack:5,knob-amp-sustain:100,knob-amp-release:25,knob-env3-destination:33,knob-env3-amount:67,knob-env3-attack:15,knob-env3-decay:87,knob-env3-sustain:0,knob-env3-release:20" data-highlights="switch-sync:amber,knob-env3-amount:amber,knob-env3-destination:amber,knob-osc-frequency:amber" data-sections="oscillators,filter,envelope3"></div>

6. Play melodic lines. The sync creates a biting, aggressive tone that cuts through any mix

**Save as "Sync Lead"**.

### Recipe 2: FM Lead (7 min)

Bright, bell-like lead using FM synthesis between digital oscillators (from Session 08 technique, Anu Kirk p.26-32).

1. Load the basic patch fresh:
   - **Osc 1 Level** = `0`, **Osc 2 Level** = `0`
   - **Osc 3 Shape** = `1` (sine), **Level** = `55`, **Frequency** = `C0`
   - **Osc 4 Shape** = `3` (square-ish), **Level** = `20`, **Frequency** = `C1` (octave above Osc 3 = 2:1 ratio)
   - **FM 4->3** = `35`
2. Filter -- open enough for FM harmonics:
   - **LPF Frequency** = `90`, **Resonance** = `15`
   - **Env Amount** = `25`, ENV 1: **Decay** = `55`, **Sustain** = `50`
   - **Key Amount** = `72`
3. VCA:
   - ENV 2: **Attack** = `3`, **Decay** = `0`, **Sustain** = `100`, **Release** = `30`
4. FM dynamics -- velocity controls FM amount:
   - **Mod Slot 1**: Source = `Vel` (Velocity), Amount = `40`, Destination = `FM4` (FM 4->3)
   - This means harder playing = more FM = brighter, more complex tone
5. Expression:
   - **Mod Wheel Destination** = `FM4`, **Amount** = `50` (mod wheel adds FM complexity)
   - **Pressure Destination** = `OAF` (pitch vibrato), **Amount** = `15`
   - **LFO 1**: Shape = `Tri`, Frequency = `50`, Amount = `8`, Destination = `OAF`
<div data-evolver-panel data-knobs="knob-osc-level:55,knob-osc-fm:35,knob-filter-frequency:90,knob-filter-resonance:15,knob-filter-envamount:25,knob-filter-keyamount:72,knob-filter-decay:55,knob-filter-sustain:50,knob-amp-attack:3,knob-amp-sustain:100,knob-amp-release:30,knob-lfo-frequency:50,knob-lfo-amount:8" data-highlights="knob-osc-fm:amber,switch-osc3:amber,switch-osc4:amber,knob-mod-source:amber,knob-mod-dest:amber,knob-mod-amount:amber" data-sections="oscillators,filter,modulators"></div>

6. Play melodic lines. Soft playing produces a warm, simple tone; hard playing produces a bright, complex FM character. The mod wheel adds more complexity on demand

**Save as "FM Lead"**.

### Recipe 3: Filtered Lead (5 min)

Warm, expressive lead using resonant filter sweep and mod wheel control (classic subtractive approach).

1. Load the basic patch fresh:
   - **Osc 1 Shape** = `Saw`, **Level** = `50`
   - **Osc 2 Shape** = `Saw`, **Level** = `45`, **Fine** = `+5` (detuned for thickness)
   - **Osc 3 Shape** = `3`, **Level** = `20` (digital layer for shimmer)
   - **Osc 4 Level** = `0`
   - **Osc Slop** = `3`
2. Rich filter with strong envelope:
   - **LPF Frequency** = `55`, **Resonance** = `55`, **4-Pole** ON
   - **Env Amount** = `65`
   - ENV 1: **Attack** = `5`, **Decay** = `60`, **Sustain** = `35`, **Release** = `30`
   - **Key Amount** = `72`
3. VCA:
   - ENV 2: **Attack** = `5`, **Decay** = `0`, **Sustain** = `100`, **Release** = `35`
4. Expression -- the mod wheel IS the performance:
   - **Mod Wheel Destination** = `FiL`, **Amount** = `70` (mod wheel opens filter dramatically)
   - **Filter Velocity** = `45` (velocity also opens filter)
   - **Pressure Destination** = `LF1A`, **Amount** = `25`
   - **LFO 1**: Shape = `Tri`, Frequency = `48`, Amount = `0`, Destination = `OAF`
5. Add slight delay: **Delay 1 Time** = `2 Steps`, **Level** = `30`, **Feedback 1** = `25`
<div data-evolver-panel data-knobs="knob-osc-shapepw:0,knob-osc-level:50,knob-osc-fine:69,knob-filter-frequency:55,knob-filter-resonance:55,knob-filter-envamount:65,knob-filter-velocity:45,knob-filter-keyamount:72,knob-filter-attack:5,knob-filter-decay:60,knob-filter-sustain:35,knob-filter-release:30,knob-amp-attack:5,knob-amp-sustain:100,knob-amp-release:35,knob-delay-time:30,knob-delay-level:30,knob-delay-feedback1:25" data-highlights="knob-filter-frequency:amber,knob-filter-resonance:amber,knob-filter-envamount:amber,knob-filter-velocity:amber,knob-delay-level:blue" data-sections="oscillators,filter,delay"></div>

6. Play with the mod wheel at zero: dark, subdued. Push the wheel up: bright, singing, resonant. This lead responds to your playing style

**Save as "Filtered Lead"**.

## Exploration (optional, hyperfocus days)

- Add distortion (15-30) to any lead for extra edge and harmonics
- Try the sync lead with a sequenced pattern -- sync leads sound incredible with the sequencer
- Layer two lead approaches: set Osc 1-2 to sync lead settings and Osc 3-4 to FM settings for a hybrid

## Output Checklist

- [ ] Sync Lead patch saved -- hard sync, aggressive, envelope-swept
- [ ] FM Lead patch saved -- velocity-sensitive FM, bell-like to complex
- [ ] Filtered Lead patch saved -- mod wheel expression, warm to bright
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Lead patches need expression mappings to be musically useful -- velocity, mod wheel, and aftertouch transform a static sound into a responsive instrument
- Hard sync excels at cutting, aggressive leads; FM creates bell-like brightness; resonant filter sweep produces warm, singing tones
- The mod wheel is the lead player's primary performance control -- map it to the parameter that most defines the sound's character

## Next Session Preview

Session 29 creates pad and texture patches -- PWM pad, waveshape pad, and modulated texture. These use slow envelopes, detuning, and layered modulation for sounds that fill space and evolve over time.
