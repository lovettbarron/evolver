---
title: 'Session 11: Sound -- Plume and Dynamic Voice Allocation'
session_number: 11
duration: 30
prerequisite: 10
output_type: patch
difficulty: advanced
tags:
  - sound-mode
  - plume
  - voice-allocation
  - polyphony
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Sound Mode
---

# Session 11: Sound -- Plume and Dynamic Voice Allocation

**Objective:** Activate Plume mode (Sound + RUN) and explore dynamic voice allocation, where individual triggers assign oscillator voices from JF's six-channel pool. Build polyphonic and paraphonic patches.

> [!tip] If you only have 5 minutes
> Sound mode, MODE=Transient, RUN=high. Patch MIX to your mixer. Now patch a trigger to IDENTITY -- you hear a plucked note. Patch a different trigger to 3N -- a second voice sounds at a different pitch (set by INTONE). Each triggered channel becomes an independent voice with its own pitch and decay. That is Plume.

## What You'll Learn

- How Plume mode works (Sound + RUN)
- Dynamic voice allocation across six channels
- Polyphonic techniques using individual trigger inputs
- Paraphonic patches with shared timbral controls

## What You'll Need

- Mannequins Just Friends
- A steady voltage for RUN (offset module or gate held high)
- Multiple trigger/gate sources (sequencer with multiple gate outputs, or multiple trigger sources)
- Patch cables (5-8)
- Audio interface or mixer
- Optionally: V/Oct source for TIME CV

## Starting State

| Control | Position |
|---------|----------|
| SOUND/SHAPE | Sound |
| MODE | Transient |
| TIME | 1 o'clock (audible pitch) |
| INTONE | 12 o'clock |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock |
| RUN | **Patched high** |

## Warm-Up (3 min)

With Sound/Transient and RUN patched high, patch a trigger to IDENTITY. Each trigger produces a plucked, decaying tone -- the oscillator sounds and then fades. This is different from Sound/Cycle (continuous drone). The Transient MODE gives each voice a natural attack-decay envelope. Patch MIX to hear all voices together.

## Exercises

### Exercise 1: Six Independent Voices (10 min)

<div data-just-friends-panel
  data-highlights="jack-jf-identity-trig:amber,jack-jf-3n-trig:amber,jack-jf-6n-trig:amber,jack-jf-mix-out:blue"
  data-knobs="knob-jf-intone:90"
></div>

1. Turn INTONE to about 2 o'clock so each channel has a different pitch
2. Patch trigger sources to **IDENTITY**, **3N**, and **6N** trigger inputs (use three different gate outputs from a sequencer, or three clocks at different rates)
3. Listen to MIX output -- you hear three independent voices, each at a different pitch determined by INTONE, each triggered independently
4. Because trigger normalling is broken by patching, only the patched channels sound. Unpatched channels stay silent
5. Add triggers to more channels (2N, 4N, 5N) for up to six independent voices
6. Adjust INTONE to change the chord voicing -- each channel's pitch shifts while maintaining the harmonic ratio

> [!info] Listen For
> With Plume, JF behaves like a six-voice polyphonic synthesizer. Each voice has its own pitch (set by INTONE ratio) but shares global timbral controls (CURVE, RAMP, FM). This paraphonic architecture -- independent pitch and triggering but shared timbre -- is characteristic of analog polysynths.

### Exercise 2: Rhythmic Polyphony (8 min)

<div data-just-friends-panel
  data-highlights="jack-jf-identity-trig:blue,jack-jf-2n-trig:blue,jack-jf-3n-trig:blue,jack-jf-4n-trig:blue,jack-jf-5n-trig:blue,jack-jf-6n-trig:blue"
></div>

1. Patch a single clock to IDENTITY (breaking normalling). Patch the same clock divided by 2 to 3N. Patch divided by 3 to 6N
2. Set INTONE to a pleasing chord position (about 1-2 o'clock)
3. Listen to the resulting pattern: the fastest voice plays on every beat, the middle voice on every other beat, the lowest voice every third beat
4. This creates a self-harmonizing rhythmic pattern -- the rhythm and pitch are both derived from integer relationships
5. Adjust TIME to transpose the entire chord while maintaining the rhythmic pattern
6. Try MODE=Sustain instead of Transient -- now gate length controls how long each note sustains, adding another rhythmic dimension

### Exercise 3: Voice Allocation with Normalling (6 min)

<div data-just-friends-panel
  data-highlights="jack-jf-identity-trig:amber,knob-jf-intone:amber,knob-jf-time:blue"
  data-knobs="knob-jf-intone:100"
></div>

1. Remove all trigger patches except IDENTITY. Normalling is restored -- one trigger fires all six channels
2. With INTONE spread, each trigger produces a full six-note chord (all voices fire together with different pitches)
3. Patch a V/Oct source to TIME CV and play a melody -- each note is a rich chord
4. Adjust INTONE to change the chord quality: wide spread = open voicing, narrow spread = cluster, noon = unison power chord
5. Try patching a second trigger to 4N -- this breaks normalling at that point. Now IDENTITY triggers voices 1-3 and 4N triggers voices 4-6, creating two independent chord groups

> [!info] Normalling as Voice Grouping
> By strategically patching trigger inputs at different points in the normalling chain, you can create voice groups. IDENTITY alone = six-note chord. IDENTITY + 4N = two three-note chords. IDENTITY + 3N + 5N = three two-note chords. Each grouping creates a different musical arrangement.

## Output

Save your Plume voice allocation patch:
- **Polyphonic settings:** INTONE position, trigger assignments per channel, TIME/CV pitch source
- **Rhythmic pattern:** Clock divisions used, resulting rhythmic pattern description
- **Voice grouping:** Document which normalling breaks created which voice groupings
- Record a 30-60 second passage demonstrating the polyphonic capabilities

## Next Session Preview

You have completed the Just Friends curriculum. You now understand all three modes (Shape, Cycle, Sound), the cross-cutting controls (RUN, INTONE), and advanced techniques (FM synthesis, Plume voice allocation). If you have a Monome Crow module, the Crow curriculum will eventually introduce i2c control of Just Friends, unlocking even more capabilities like Synthesis mode and Geode rhythmic patterns.
