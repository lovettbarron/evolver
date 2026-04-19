---
title: 'Session 01: Architecture and First Slopes'
session_number: 1
duration: 25
prerequisite: null
output_type: technique
difficulty: beginner
tags:
  - foundations
  - architecture
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Foundations
---

# Session 01: Architecture and First Slopes

**Objective:** Understand Just Friends' three-mode architecture, trigger input normalling, and create your first triggered slopes in Shape/Transient mode.

> [!tip] If you only have 5 minutes
> Set JF to Shape/Transient init state. Patch a gate to IDENTITY trigger input. Patch MIX output to a VCA or mixer. Send a gate -- watch all six LEDs rise and fall together. That is trigger normalling in action. Turn INTONE clockwise and send another gate -- now the LEDs move at different speeds. That is the core of Just Friends.

## What You'll Learn

- Just Friends' three modes (Shape, Cycle, Sound) and what each switch does
- How trigger input normalling works (IDENTITY cascades to 6N)
- Creating basic triggered envelopes in Shape/Transient mode

## What You'll Need

- Mannequins Just Friends (14HP)
- A gate or trigger source (sequencer, keyboard gate, clock)
- Patch cables (2 minimum)
- A destination to hear the output (VCA, mixer, or audio interface)

## Starting State

Set all controls to the recommended init state:

| Control | Position |
|---------|----------|
| SOUND/SHAPE | Shape |
| MODE | Transient |
| TIME | 12 o'clock |
| INTONE | 12 o'clock |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock |
| Patches | None |

## Exercises

### Exercise 1: Meet the Panel (3 min)

<div data-just-friends-panel
  data-highlights="switch-jf-sound-shape:blue,switch-jf-mode:blue,knob-jf-time:amber,knob-jf-intone:amber"
></div>

Before patching anything, study the panel layout:

1. Find the two switches: **SOUND/SHAPE** (2-way, center-left) selects function generator vs oscillator. **MODE** (3-way, far left) selects Transient, Sustain, or Cycle
2. Find the five knobs: **TIME** (upper right, large), **INTONE** (upper left, large), **FM** (center), **CURVE** (right), **RAMP** (left)
3. Notice the six trigger inputs in a row (labeled TRIGGERS), the six LEDs above them, and the six output jacks at the bottom (IDENTITY through 6N)
4. Find the **MIX** output (dark square, right side) -- this mixes all six channels

### Exercise 2: First Triggered Slopes (7 min)

<div data-just-friends-panel
  data-highlights="jack-jf-identity-trig:amber,jack-jf-mix-out:amber"
  data-knobs="knob-jf-time:64,knob-jf-intone:64"
></div>

1. Patch a gate source to **IDENTITY trigger** input (leftmost trigger jack)
2. Patch **MIX output** to your VCA CV input or mixer
3. Send a single gate -- watch all six LEDs brighten and then dim together
4. All six channels fired from one trigger. This is **trigger normalling**: IDENTITY cascades down to 2N, 3N, 4N, 5N, and 6N automatically

> [!info] Trigger Normalling
> Just Friends' trigger inputs are normalled in a chain: IDENTITY -> 2N -> 3N -> 4N -> 5N -> 6N. Patching a cable into any jack breaks the chain at that point. Channels above the patched jack still receive the normalized trigger; channels below do not.

5. Send repeated gates at a moderate tempo and listen to the envelope shape in your output

### Exercise 3: INTONE -- Harmonic Spread (8 min)

<div data-just-friends-panel
  data-highlights="knob-jf-intone:amber"
  data-knobs="knob-jf-intone:100"
></div>

1. With the same patch, slowly turn **INTONE** clockwise from noon
2. Send a gate and watch the LEDs -- they no longer move together. Each channel now has a different speed
3. IDENTITY stays at the base rate. 2N moves at 2x speed. 3N at 3x. And so on up to 6N at 6x
4. Turn INTONE fully clockwise and send a gate -- the higher channels (5N, 6N) fire very fast while IDENTITY is still slow
5. Turn INTONE counter-clockwise past noon -- channels compress below the fundamental rate
6. Return INTONE to noon (all channels at the same rate)

> [!info] Listen For
> When INTONE is spread, the MIX output becomes a complex waveshape -- the sum of six envelopes at different speeds. This is one of JF's most distinctive sounds.

### Exercise 4: TIME -- Speed Control (5 min)

<div data-just-friends-panel
  data-highlights="knob-jf-time:amber"
  data-knobs="knob-jf-time:32"
></div>

1. Turn **TIME** counter-clockwise to about 9 o'clock -- send a gate. The envelopes are now very slow (seconds-long slopes)
2. Turn TIME clockwise to about 3 o'clock -- send a gate. The envelopes are fast (barely visible LED movement)
3. Return TIME to noon

> [!info] TIME Range
> TIME spans from 60 seconds per cycle (fully CCW) to 60Hz (fully CW). In Sound mode, TIME becomes the pitch control with 1V/octave tracking via the TIME CV input.

## Output

Document your understanding of Just Friends' architecture:
- Three mode combinations (Shape/Sound x Transient/Sustain/Cycle)
- Trigger normalling: one trigger at IDENTITY fires all six channels
- INTONE spreads channels across harmonic ratios
- TIME controls the base speed for all channels

## Next Session Preview

Session 02 explores the two controls that fundamentally change JF's behavior in every mode: **RUN** (continuous operation) and **INTONE** (harmonic spread). You will learn how RUN transforms triggered envelopes into continuous LFOs and how INTONE creates musical relationships between channels.
