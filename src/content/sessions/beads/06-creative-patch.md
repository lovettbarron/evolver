---
title: 'Session 06: Creative Patch -- Granular Composition'
session_number: 6
duration: 25
prerequisite: 5
output_type: recording
difficulty: advanced
tags:
  - creative
  - composition
  - wavetable
  - performance
instrument: beads
instrument_type: eurorack_module
reference: 'Beads Manual pp. 13-14'
section: Creative
---

# Session 06: Creative Patch -- Granular Composition

**Objective:** Combine all Beads techniques into a multi-layered granular composition, including quality cycling, freeze snapshots, mode switching, CV modulation, and the hidden wavetable synth mode.

> [!tip] If you only have 5 minutes
> Unplug all inputs from Beads and wait 10 seconds. Beads switches to its internal wavetable synth -- you now have a granular sound source with no input needed. Turn DENSITY, PITCH, and TIME to sculpt the wavetable texture. That is the hidden mode.

## Warm-Up (2 min)

Set Beads to init state. Patch audio and confirm grains with DENSITY at 1 o'clock. Sweep each knob briefly: TIME (buffer position), PITCH (transposition), SIZE (grain length), SHAPE (envelope). Turn one attenurandomizer CCW to confirm randomization works. Return everything to init positions.

## Exercises

### Exercise 1: The Hidden Wavetable Synth (5 min)

<div data-beads-panel
  data-knobs="knob-beads-density:80,knob-beads-pitch:64,knob-beads-time:64"
  data-highlights="knob-beads-density:amber,knob-beads-pitch:blue"
></div>

1. **Unplug all audio inputs** from Beads (both IN L and IN R)
2. Wait approximately 10 seconds -- Beads detects no input and switches to an internal wavetable oscillator
3. Turn DENSITY past noon -- you should hear a synthesized tone rather than processed audio. This is Beads functioning as a sound source
4. Sweep **PITCH** -- you are playing the wavetable at different pitches
5. Sweep **TIME** -- this scrolls through different wavetable positions, changing the timbre
6. Try different **QUALITY** modes -- each affects the wavetable character differently
7. This mode is useful for drones, ambient textures, or when you want Beads to generate sound rather than process it

### Exercise 2: Freeze Snapshot Composition (5 min)

<div data-beads-panel
  data-knobs="knob-beads-density:90,knob-beads-size:80"
  data-highlights="button-beads-freeze:amber,knob-beads-time:blue,knob-beads-pitch:blue"
></div>

1. Reconnect your audio source. Set DENSITY to 2 o'clock for dense grains
2. Feed an interesting sound -- a chord, a vocal phrase, a textured synth pad
3. Press **FREEZE** to capture the buffer
4. Now you have a fixed audio snapshot. Sweep TIME to scan through it. Each position gives different grain content
5. Add PITCH shifting (+5 or -7 semitones) to harmonize the frozen material
6. Set SIZE to long (2 o'clock) and SHAPE to reversed (CW) for ambient pads from the frozen buffer
7. Release FREEZE, feed a different sound, and FREEZE again -- you have a new snapshot to work with
8. Practice the FREEZE-play-release-capture cycle as a performance technique

### Exercise 3: Quality Mode as a Musical Effect (3 min)

<div data-beads-panel
  data-highlights="button-beads-quality:amber,knob-beads-feedback:blue"
></div>

1. Set moderate FEEDBACK (10-11 o'clock) so you can hear the quality affect the feedback path
2. Start in high quality (bright LED) -- clean, crystalline feedback
3. Press QUALITY to cycle to cold digital -- grittier feedback
4. Press to sunny tape -- warm, rounded feedback with tape character
5. Press to scorched cassette -- heavily degraded, lo-fi feedback that saturates and warbles
6. Choose the quality that fits your composition and stay there

### Exercise 4: Multi-Layered Granular Composition (8 min)

<div data-beads-panel
  data-knobs="knob-beads-density:100,knob-beads-time:50,knob-beads-pitch:75,knob-beads-size:85,knob-beads-shape:90,knob-beads-feedback:50,knob-beads-dry-wet:100,knob-beads-reverb:60"
  data-highlights="knob-beads-time-atten:amber,knob-beads-pitch-atten:blue,knob-beads-reverb:amber"
></div>

1. **Start recording** your composition (DAW, audio interface, or recorder)
2. Begin with a simple audio source and moderate grain settings
3. **Layer 1 (0:00-0:30):** Dense grains with TIME attenurandomizer slightly CCW (subtle position randomization). Let the texture establish itself
4. **Layer 2 (0:30-1:00):** Press FREEZE to capture the current state. Add PITCH shift (+7 semitones). The frozen buffer plays back as a harmonized granular pad
5. **Layer 3 (1:00-1:30):** Release FREEZE and switch to delay mode (SIZE fully CW). Add FEEDBACK for repeating echoes. The texture shifts from granular cloud to rhythmic delay
6. **Layer 4 (1:30-2:00):** Return SIZE to noon. Turn PITCH attenurandomizer CCW for scattered pitch randomization. Add REVERB to about 1 o'clock. The composition becomes an ambient wash
7. **Ending (2:00-2:30):** Gradually reduce DENSITY toward noon. The grains thin out and disappear. Turn DRY/WET toward dry. Let the reverb tail ring out
8. **Stop recording**

### Exercise 5: Document Your Patch (2 min)

1. Note all final knob positions
2. Note the quality mode you chose
3. Note any CV patching you used
4. Note the grain generation mode
5. Save this as your Beads reference patch

## Session Output

Document the following in your Obsidian daily note:

- **Wavetable synth mode:** What did the internal sound source remind you of?
- **Freeze as performance tool:** How did the capture-play-release cycle feel?
- **Quality mode choice:** Which quality setting did you use for the composition and why?
- **Composition recording:** Save your 2-3 minute granular composition
- **Final patch settings:** Document all knob positions and modes for reproducibility

## Curriculum Complete

You have completed the Beads curriculum. You now know how to:
- Control grain generation with DENSITY in all three modes (latched, clocked, gated)
- Time-stretch and pitch-shift audio using granular processing
- Transform Beads into a delay with SIZE fully clockwise
- Use attenurandomizers for structured CV modulation and organic randomization
- Use FREEZE for buffer snapshots and performance
- Access the hidden wavetable synth mode
- Build multi-layered compositions combining all techniques

Return to any session for refresher practice, or explore cross-module patching with other eurorack modules in your system.
