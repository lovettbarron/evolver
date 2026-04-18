---
title: 'Session 05: In-Context Patch -- Ikarie in a Voice Chain'
session_number: 5
duration: 25
prerequisite: 03-envelope-follower-modulation
output_type: recording
difficulty: advanced
tags:
  - creative
  - voice-chain
  - composition
  - integration
instrument: ikarie
instrument_type: eurorack_module
reference: 'Ikarie Manual Patch Tips 7'
section: Creative
---

# Session 05: In-Context Patch -- Ikarie in a Voice Chain

**Objective:** Build a complete voice chain with Ikarie as the main filter, use external modulation for cutoff control, route FOLLOW output to create dynamics-responsive behavior across multiple modules, and record a short musical phrase.

> [!tip] If you only have 5 minutes
> Patch VCO -> Ikarie L IN -> L OUT -> VCA -> mixer. Patch an envelope to MOD input for filter sweeps on each note. You have a complete synth voice with Ikarie as the filter. Play a few notes and listen to how the filter shapes the sound.

## Warm-Up (2 min)

From init state with a sound source patched to L IN, sweep CUTOFF from LP to HP. Set FOLLOW SPEED to MID and MOD at about 1 o'clock -- hear the auto-wah on your source. This is the behavior we will build on in a full voice chain.

## Setup

1. Set all Ikarie controls to the Basic Patch init state
2. Required modules for the voice chain:
   - **VCO** (any oscillator -- Plaits, or another oscillator in your system)
   - **Ikarie** (the filter)
   - **VCA** (for amplitude control)
   - **Envelope generator** (Maths, or any ADSR/AD envelope)
   - **Keyboard/sequencer** (for pitch and gate)
3. Patch the basic voice chain: **VCO OUT -> Ikarie L IN -> Ikarie L OUT -> VCA IN -> VCA OUT -> mixer**

## Exercises

### Exercise 1: Basic Voice Chain (5 min)

<div data-ikarie-panel
  data-knobs="knob-ikarie-cutoff:80,knob-ikarie-input:64"
  data-highlights="jack-ikarie-l-in:amber,jack-ikarie-l-out:amber"
></div>

1. Patch the voice chain as described in Setup
2. Patch keyboard/sequencer **gate** to your envelope generator trigger, and envelope output to **VCA CV**
3. Patch keyboard/sequencer **V/OCT** to your VCO pitch input
4. Set Ikarie **CUTOFF** to about 2 o'clock (slightly into HP, keeping the sound bright)
5. Set **INPUT** to about noon (unity gain)
6. Play notes -- you should hear the VCO filtered through Ikarie with the VCA providing note articulation
7. Sweep CUTOFF to find a starting filter position that sounds good with your oscillator

### Exercise 2: Envelope-Controlled Filter Sweeps (6 min)

<div data-ikarie-panel
  data-knobs="knob-ikarie-cutoff:40,knob-ikarie-mod:100"
  data-highlights="jack-ikarie-mod-in:amber,knob-ikarie-mod:amber,knob-ikarie-cutoff:blue"
></div>

1. Patch a second envelope (or mult your existing envelope) to Ikarie's **MOD** input
2. **Note:** This breaks the FOLLOW normalling -- you are now controlling the filter with an external envelope
3. Set CUTOFF to about 10 o'clock (closed, LP territory)
4. Turn **MOD** fully clockwise -- the envelope now opens the filter on each note
5. Play notes and adjust the envelope attack and decay to shape the filter sweep
6. This is the classic subtractive synthesis sound: oscillator -> filter with envelope -> VCA with envelope
7. Try different MOD positions -- less clockwise = subtler sweep, counterclockwise = inverted sweep

### Exercise 3: FOLLOW for Sidechain-Style Ducking (5 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-follow:amber"
></div>

1. Patch Ikarie's **FOLLOW** output to the CV input of another module in your system:
   - Another VCA controlling a pad or drone level
   - A mixer channel CV input
   - A reverb mix CV
2. FOLLOW tracks the amplitude of the audio going through Ikarie. When the voice plays loud notes, FOLLOW rises; during silence, FOLLOW falls
3. Use this to create sidechain-like ducking: when the Ikarie voice plays, the other sound ducks
4. Set FOLLOW SPEED to match the rhythmic character you want -- SLOW for pumping, MID for natural, FAST for tight
5. Invert the FOLLOW CV (using Maths Ch2/3 attenuverter or another inverter) for the opposite effect

### Exercise 4: Waveform Crossfading (4 min)

<div data-ikarie-panel
  data-highlights="jack-ikarie-l-out:amber,jack-ikarie-r-out:amber,knob-ikarie-stereo:amber,switch-ikarie-pan-spread:blue"
  data-knobs="knob-ikarie-stereo:64"
></div>

1. Patch both **L OUT** and **R OUT** to separate mixer channels
2. Set **PAN/SPREAD** to **PAN**
3. Automate or slowly turn the **STEREO** knob -- this crossfades the output between L and R
4. Each output has a slightly different filter character due to the dual-core architecture
5. This is Patch Tip 7: "Waveform Crossfading" -- use the stereo outputs as timbral variations of the same source
6. Try patching an LFO to **STEREO CV** for automatic crossfading

### Exercise 5: Record a Musical Phrase (5 min)

<div data-ikarie-panel
  data-knobs="knob-ikarie-cutoff:50,knob-ikarie-mod:90,slider-ikarie-resonance:60"
  data-highlights="knob-ikarie-cutoff:blue,slider-ikarie-resonance:blue,knob-ikarie-mod:blue"
></div>

1. With your complete voice chain patched and sounding good, set up your DAW or recorder
2. Choose your favorite settings from the exercises above:
   - Filter sweep depth (MOD position)
   - Resonance amount
   - Base cutoff position
   - Any FOLLOW routing
3. Play or sequence a short musical phrase (4-8 bars)
4. Record it -- this is your Ikarie voice chain output
5. Listen back and note how Ikarie's dual-peak character colors the sound differently from a standard filter

## What You Learned

- Ikarie works as the filter stage in a complete VCO -> VCF -> VCA voice chain
- Patching an envelope to MOD breaks FOLLOW normalling but enables classic subtractive synthesis
- FOLLOW output can drive dynamics-responsive behavior in other modules simultaneously
- L/R outputs provide stereo crossfading variations via the STEREO knob
- The dual-peak architecture gives Ikarie a distinctive character in a voice chain

## Session Output

Record and document your voice chain:
- VCO type and waveform
- Ikarie settings: CUTOFF, RESONANCE, MOD, STEREO, PAN/SPREAD, FOLLOW SPEED
- Envelope settings for filter and VCA
- Where FOLLOW output is routed (if anywhere)
- Describe the overall sound character
