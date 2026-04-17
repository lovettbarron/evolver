---
title: 'Session 31: Performance Mappings -- Wheel, Pressure, and Pedal'
session_number: 31
duration: 25
prerequisite: 30
output_type: patch
difficulty: advanced
tags:
  - performance
  - expression
  - mod-wheel
  - aftertouch
  - pedal
  - velocity
  - mappings
instrument: evolver
reference: >-
  Anu Kirk p.99-101 (performance tips), DSI Manual p.12-13 (global params),
  p.23-24 (modulators)
section: Performance & Expression
instrument_type: instrument
---

# Session 31: Performance Mappings -- Wheel, Pressure, and Pedal

**Objective:** Create a performance-ready patch with comprehensive expression mappings -- mod wheel, aftertouch, velocity, and pedal -- that responds dynamically to your playing style, turning the Evolver into an expressive instrument.

> [!tip] If you only have 5 minutes
> Load your filtered lead from Session 28. Add: Mod Wheel Dest = `FiL`, Amount = `70`. Pressure Dest = `LF1A`, Amount = `30`. LFO 1: Tri, Freq = `50`, Amount = `0`, Dest = `OAF`. Filter Velocity = `45`. Now play -- the patch responds to how hard you hit, how much pressure you apply, and where the mod wheel sits.

## Warm-Up (2 min)

Load your filtered lead from Session 28. Play a few notes while sweeping the mod wheel. The lead already has basic expression mapped. Today you expand this into a complete performance system where every physical gesture has a musical result. Load the basic patch.

## Setup

From the basic patch, build a versatile performance sound:
- **Osc 1 Shape** = `Saw`, **Level** = `50`
- **Osc 2 Shape** = `Pulse 50`, **Level** = `45`, **Fine** = `+4`
- **Osc 3 Shape** = `15`, **Level** = `25`
- **Osc 4 Level** = `0`
- **Osc Slop** = `3`
- **LPF Frequency** = `50`, **Resonance** = `40`, **4-Pole** ON
- **Key Amount** = `72`
- **Env Amount** = `55`, ENV 1: **Attack** = `5`, **Decay** = `55`, **Sustain** = `35`, **Release** = `30`
- ENV 2: **Attack** = `3`, **Decay** = `0`, **Sustain** = `100`, **Release** = `30`

This creates a warm sound with a moderate filter envelope -- a good canvas for expression.

<div data-evolver-panel data-knobs="knob-osc-shapepw:0,knob-osc-level:50,knob-osc-fine:68,knob-filter-frequency:50,knob-filter-resonance:40,knob-filter-envamount:55,knob-filter-keyamount:72,knob-filter-attack:5,knob-filter-decay:55,knob-filter-sustain:35,knob-filter-release:30,knob-amp-attack:3,knob-amp-sustain:100,knob-amp-release:30" data-highlights="knob-filter-frequency:blue,knob-filter-resonance:blue,knob-filter-envamount:blue" data-sections="oscillators,filter,amp"></div>

## Exercises

### Exercise 1: Velocity Mappings (5 min)

Make the patch respond to how hard you play.

1. Set **Filter Velocity** = `45`
   - Play softly: filter stays relatively closed, dark tone
   - Play hard: filter opens further, bright and aggressive
   - This is the most fundamental expression mapping -- dynamics create timbral variation
2. Set **VCA Velocity** (ENV 2) = `30`
   - Soft notes are quieter, hard notes are louder and brighter
   - Combined with filter velocity, soft playing = dark and quiet, hard playing = bright and loud
3. Test across the keyboard range. Key Amount should keep the brightness consistent across octaves while velocity adds dynamics on top
4. Adjust **Velocity Destination** = `FM4`, **Velocity Amount** = `25`
   - Now hard playing also adds subtle FM complexity from Osc 4
   - Set **Osc 4 Shape** = `1`, **Osc 4 Level** = `0`, **Osc 4 Frequency** = `C1`, **FM 4->3** = `10`
   - Hard hits get an FM "edge" that soft notes lack

### Exercise 2: Mod Wheel -- The Primary Performance Control (5 min)

Map the mod wheel to the sound's defining character.

1. Set **Mod Wheel Destination** = `FiL`, **Mod Wheel Amount** = `70`
   - Wheel at zero: dark, subdued baseline
   - Wheel at maximum: fully open, bright, resonant
   - The mod wheel becomes your brightness control during performance
2. Play a melodic phrase while slowly moving the mod wheel. The sound should transition from warm pad-like tones to bright, cutting lead tones
3. Try different mod wheel destinations:
   - `RES` with Amount = `50` -- wheel controls resonance intensity (subtle to screaming)
   - `FM4` with Amount = `60` -- wheel adds FM complexity (clean to metallic)
   - `DIS` with Amount = `40` -- wheel adds distortion (clean to dirty)
4. Return to `FiL`, Amount = `70` -- filter cutoff is the most musically versatile mod wheel destination for this patch

### Exercise 3: Aftertouch -- Vibrato and Intensity (5 min)

Map key pressure to modulation that deepens the longer you hold a note.

1. Set up vibrato via aftertouch:
   - **LFO 1**: Shape = `Tri`, Frequency = `50`, Amount = `0`, Destination = `OAF` (pitch vibrato)
   - **Pressure Destination** = `LF1A` (LFO 1 Amount), **Pressure Amount** = `35`
   - Now: play a note normally = no vibrato. Press harder = vibrato increases
   - This mimics how string and wind players add vibrato with physical effort
2. Add a secondary pressure mapping via mod slot:
   - **Mod Slot 1**: Source = `Pressure`, Amount = `20`, Destination = `FiL`
   - Pressing harder now also opens the filter slightly -- adding brightness with intensity
3. Test by playing a sustained note: start with light pressure, gradually press harder. You should hear vibrato appear and the tone brighten simultaneously
4. The combination of aftertouch-controlled vibrato + filter creates a very natural expression curve

### Exercise 4: Pedal and Breath Mapping (5 min)

If you have an expression pedal or breath controller connected, map them. If not, configure the mappings so they are ready when you connect one.

1. Expression pedal (most common):
   - **Foot Controller Destination** = `FiL`, **Foot Controller Amount** = `60`
   - The pedal becomes a foot-operated filter sweep -- useful when both hands are on the keyboard
   - If you have a pedal connected: test sweeping it while playing. The filter responds to your foot
2. Breath controller (if available):
   - **Breath Destination** = `VCA` (Volume), **Breath Amount** = `80`
   - Blowing harder = louder. Creates wind-instrument dynamics
3. Check the **Velocity Curve** in Global Parameters (DSI Manual p.13):
   - Curve 1 = linear (default), Curve 2 = lighter touch, Curve 3 = heavier touch, Curve 4 = switch-like (light=off, heavy=on)
   - Try Curve 2 if you have a lighter playing style
   - Access via: press GLOBAL, navigate to Velocity Curve parameter
4. Final integration: play a musical phrase using ALL expression sources simultaneously:
   - Velocity controls attack brightness
   - Mod wheel controls overall brightness
   - Aftertouch adds vibrato and filter intensity
   - Pedal (if available) adds another filter layer

<div data-evolver-panel data-knobs="knob-osc-level:50,knob-osc-fine:68,knob-osc-fm:10,knob-filter-frequency:50,knob-filter-resonance:40,knob-filter-envamount:55,knob-filter-velocity:45,knob-filter-keyamount:72,knob-lfo-frequency:50,knob-lfo-amount:0,knob-mod-amount:20" data-highlights="knob-filter-velocity:amber,knob-lfo-frequency:amber,knob-mod-amount:amber,switch-mod1:amber" data-sections="filter,lfos,modulators" data-zoom="false"></div>

**Save as "Performance Patch"**.

### Exercise 5: Quick Performance Template (3 min)

Create a minimal expression template you can apply to ANY patch.

These mappings work with almost any Evolver sound:
- **Filter Velocity** = `35-45` (dynamics)
- **Mod Wheel Dest** = `FiL`, Amount = `60-80` (brightness control)
- **Pressure Dest** = `LF1A`, Amount = `25-35` with LFO 1 → `OAF` (vibrato)
- **Foot Controller Dest** = `FiL`, Amount = `50-70` (hands-free filter)

Document these values for easy recall when building future patches.

## Exploration (optional, hyperfocus days)

- Map mod wheel to two destinations simultaneously using a mod slot: Mod Slot 2 Source = `Wheel`, Amount = `30`, Dest = `RES` -- now the wheel controls both filter cutoff and resonance
- Try negative amounts: Mod Wheel Amount = `-70` on filter means the wheel CLOSES the filter instead of opening it -- useful for creating a "wah" effect
- Set up velocity to Env 3 Amount, with Env 3 going to FM -- harder playing triggers more FM, creating velocity-sensitive timbral complexity

## Output Checklist

- [ ] Performance patch saved with velocity, mod wheel, aftertouch, and pedal mappings
- [ ] Tested all expression sources independently and together
- [ ] Performance template values documented for future patches
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Expression mappings transform a static patch into a responsive instrument -- the same patch can sound like a pad (soft, wheel down) or a lead (hard, wheel up)
- Aftertouch-controlled vibrato via LFO Amount mimics acoustic instrument expression: the harder you push, the more vibrato appears
- A standard expression template (velocity to filter, wheel to filter, pressure to vibrato) can be applied to any patch as a starting point for performance readiness

## Next Session Preview

Session 32 explores the Evolver as an external audio processor -- routing audio through the Evolver's filters, effects, and modulation for real-time sound transformation.
