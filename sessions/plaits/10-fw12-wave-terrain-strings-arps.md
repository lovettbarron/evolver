---
title: 'Session 10: Firmware 1.2 — Wave Terrain, Strings & Arps'
session_number: 10
duration: 25
prerequisite: 9
output_type: composition
difficulty: advanced
tags:
  - firmware-1.2
  - orange-bank
  - bank-3-model-6
  - bank-3-model-7
  - bank-3-model-8
  - wave-terrain
  - string-machine
  - arpeggiator
instrument: plaits
instrument_type: eurorack_module
reference: 'Plaits Firmware 1.2 Infographic by Rochefsky'
section: Firmware 1.2
---

# Session 10: Firmware 1.2 — Wave Terrain, Strings & Arps

**Objective:** Explore the final three unique Orange bank models: wave terrain synthesis, string machine emulation with stereo filter + chorus, and four variable square voices for chords and arpeggios. Create a layered composition using these new textures.

> [!tip] If you only have 5 minutes
> Go to Orange Model 7 (string machine). Play a chord via V/OCT and sweep TIMBRE -- you will hear a lush, chorus-drenched string ensemble emerge. This is Roland RS-style string synthesis from a single eurorack module.

**Note:** Orange Models 4 and 5 are the same as Green Models 4 and 5 (Granular Formant Oscillator and Harmonic Oscillator). They are not covered again here.

## Setup

1. Set all controls to init state
2. Patch V/OCT to **V/OCT**, OUT to mixer
3. Navigate to Orange bank, Model 6

## Exercises

### Exercise 1: Wave Terrain Synthesis (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue"
></div>

Orange Model 6 does continuous interpolation between 8 2D terrains -- a synthesis method where a point traces a path across a 3D surface:

1. Start with all knobs at noon. Sweep **HARMONICS**: this selects the terrain -- each position is a different 2D surface with different harmonic content
2. Sweep **TIMBRE**: path radius. Small radius = simple waveshape (near the terrain center). Large radius = complex, harmonically rich (tracing a wide orbit)
3. Sweep **MORPH**: path offset. This shifts where the orbit sits on the terrain, revealing different spectral regions
4. **OUT** carries the direct terrain height. **AUX** carries the terrain height interpreted as phase distortion -- two complementary flavors
5. Try slow modulation on TIMBRE (patch an LFO to the TIMBRE CV): the path radius changes create evolving, organic textures that are impossible with standard subtractive synthesis

### Exercise 2: String Machine Emulation (8 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue"
></div>

Switch to Orange Model 7. This emulates classic string machines (Solina, RS-505) with stereo filter and chorus:

1. Play and hold a note. Sweep **TIMBRE**: this is the chorus/filter amount. Hear the sound go from dry, thin oscillators to a lush, wide ensemble
2. Sweep **HARMONICS**: this selects the chord voicing. Different positions produce different intervals stacked above the root
3. Sweep **MORPH**: waveform selection. Different positions give different raw string timbres -- from thin and reedy to full and warm
4. **OUT** carries voices 1 and 3 predominantly. **AUX** carries voices 2 and 4 -- pan them left/right for stereo string ensemble
5. Compare to Green Model 7 (Chords): the string machine has built-in chorus and filtering that chords mode doesn't. It's optimized for sustained pads rather than rhythmic stabs

### Exercise 3: Four Variable Square Voices — Chords & Arps (7 min)

<div data-plaits-panel
  data-knobs="knob-plaits-frequency:64,knob-plaits-harmonics:64,knob-plaits-timbre:64,knob-plaits-morph:64"
  data-highlights="knob-plaits-harmonics:amber,knob-plaits-timbre:blue,knob-plaits-morph:blue,jack-plaits-trig:amber"
></div>

Switch to Orange Model 8. Four square-wave voices that can play chords or arpeggios:

1. Play a note. Sweep **HARMONICS**: chord type selection, similar to Green Model 7 but with square-wave character
2. Sweep **TIMBRE**: this controls arpeggio type or chord inversion. The TIMBRE attenuverter controls the internal envelope shape when TRIG is patched
3. Sweep **MORPH**: pulse width / sync. This changes the raw timbre of each square-wave voice
4. Patch **TRIG** from a clock: the TRIG input clocks the arpeggiator. The four voices cycle through the chord notes rhythmically
5. **OUT** carries the square wave voices. **AUX** carries NES-style triangle voice -- 8-bit character
6. Try different clock speeds on TRIG: slow clocks = gentle arpeggios, fast clocks = chiptune sequences

## Session Output

Document in your Obsidian daily note:

- **Wave terrain:** Describe the textures -- how does it differ from wavetable synthesis (Green Model 6)?
- **String machine settings:** Best pad sound -- note HARMONICS (chord), TIMBRE (chorus), MORPH (waveform)
- **Arp patch:** Clock speed, chord type (HARMONICS), and how TRIG interacts with the arpeggiator
- **Orange bank summary:** Which of the 6 unique Orange models will you use most? How do they complement Green and Red?

## Firmware 1.2 Curriculum Complete

With Sessions 09-10, you have now explored all 24 synthesis models across all three banks. The Orange bank adds subtractive synthesis (Model 1), CZ-style phase distortion (Model 2), DX7 FM (Model 3), wave terrain (Model 6), string machines (Model 7), and chiptune arps (Model 8) to the original 16 models.
