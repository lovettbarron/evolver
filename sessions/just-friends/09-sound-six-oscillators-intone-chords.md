---
title: 'Session 09: Sound -- Six Oscillators and INTONE Chords'
session_number: 9
duration: 25
prerequisite: 8
output_type: recording
difficulty: intermediate
tags:
  - sound-mode
  - oscillator
  - chords
  - intone
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Sound Mode
---

# Session 09: Sound -- Six Oscillators and INTONE Chords

**Objective:** Switch Just Friends into Sound mode to use it as a six-voice oscillator bank. Explore how INTONE creates chord intervals and how TIME sets the root pitch.

> [!tip] If you only have 5 minutes
> Flip SOUND/SHAPE to Sound, MODE to Cycle. Patch MIX output to your mixer/interface. Turn TIME to about 1 o'clock (audible pitch). Turn INTONE clockwise from noon -- you will hear a chord emerge as the channels spread to harmonic intervals. That is six oscillators from one module.

## What You'll Learn

- How Sound mode transforms JF into six audio-rate oscillators
- Using INTONE to build harmonic-series chords
- V/Oct pitch control via the TIME CV input
- Waveshaping oscillators with CURVE and RAMP

## What You'll Need

- Mannequins Just Friends
- A V/Oct pitch source (keyboard, sequencer, or manual offset)
- Patch cables (2-4)
- Audio interface or mixer to hear the output
- Optionally: a tuner or spectrum analyzer to see the harmonics

## Starting State

| Control | Position |
|---------|----------|
| SOUND/SHAPE | **Sound** |
| MODE | Cycle |
| TIME | 1 o'clock (audible pitch range) |
| INTONE | 12 o'clock |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock (no FM) |

## Warm-Up (2 min)

Patch MIX output to your mixer or audio interface. You should hear a tone -- all six oscillators at the same pitch creating a thick unison. Turn TIME clockwise and counter-clockwise to hear the pitch range. Return to about 1 o'clock.

## Exercises

### Exercise 1: Harmonic Series Chords (8 min)

<div data-just-friends-panel
  data-highlights="knob-jf-intone:amber,jack-jf-mix-out:blue"
  data-knobs="knob-jf-intone:90"
></div>

1. With INTONE at noon, you hear a thick unison -- six oscillators at identical pitch
2. Slowly turn **INTONE** clockwise. Listen carefully as the channels separate into different pitches
3. At about 1 o'clock, you hear a bright, open chord built on the harmonic series: root, octave, fifth, two octaves, major third, etc.
4. Continue turning INTONE clockwise -- the chord spreads wider. At full clockwise, the intervals span several octaves
5. Turn INTONE counter-clockwise from noon -- the pitches compress below the fundamental, creating a dense, beating cluster
6. Find an INTONE position that creates a chord you find musically pleasing and hold it

> [!info] Listen For
> The harmonic series produces intervals that are "just-intoned" (mathematically pure). The chord at moderate INTONE has a distinctive bright, consonant quality different from equal-tempered chords. This is where the module gets its name -- "Just Friends" refers to just intonation friendships between channels.

### Exercise 2: Pitch Control with TIME CV (8 min)

<div data-just-friends-panel
  data-highlights="jack-jf-time-in:amber,knob-jf-intone:blue"
  data-knobs="knob-jf-intone:85"
></div>

1. Keep INTONE at a pleasing chord position
2. Patch a V/Oct source (keyboard CV, sequencer) to **TIME CV** input
3. Play notes -- the entire chord transposes together. All six oscillators track the same V/Oct input
4. The TIME knob sets the base pitch; the CV input transposes from there
5. Try a slow sequence -- you get a chord progression from a monophonic sequence
6. Notice that INTONE ratios remain constant regardless of pitch. A major-third interval at C2 is the same ratio as at C4

### Exercise 3: Oscillator Waveshaping (5 min)

<div data-just-friends-panel
  data-highlights="knob-jf-curve:amber,knob-jf-ramp:amber"
  data-knobs="knob-jf-curve:100,knob-jf-ramp:30"
></div>

1. Turn **CURVE** clockwise -- the waveform becomes more harmonically rich (brighter, buzzier)
2. Turn CURVE counter-clockwise -- the waveform becomes softer and rounder
3. Adjust **RAMP** -- this changes the waveform asymmetry. Clockwise gives a sawtooth-like character. Counter-clockwise gives a more pulse-like character
4. CURVE and RAMP together give you a wide timbral palette from soft sine-like tones to bright, complex waveforms
5. Find a combination that sounds good with your chord and note the positions

## Output

Record a short chord passage (30-60 seconds):
- **Harmonic chord:** INTONE position, TIME position, CURVE/RAMP settings
- **Pitch sequence:** Note the V/Oct source and sequence used
- Document 2-3 favorite INTONE positions and describe the chord quality at each
- Save the recording as a reference for Sound mode timbres

## Next Session Preview

Session 10 explores **FM synthesis** in Sound mode -- patching an audio-rate signal to the FM input for through-zero frequency modulation. You will create metallic, bell-like, and complex timbres using JF's built-in FM capabilities.
