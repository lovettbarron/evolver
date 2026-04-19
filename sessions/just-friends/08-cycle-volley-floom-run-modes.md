---
title: 'Session 08: Cycle -- Volley and Floom (RUN Modes)'
session_number: 8
duration: 30
prerequisite: 7
output_type: patch
difficulty: advanced
tags:
  - cycle-mode
  - volley
  - floom
  - run
  - dynamics
  - just-friends
instrument: just-friends
instrument_type: eurorack_module
reference: 'Just Friends docs'
section: Cycle Mode
---

# Session 08: Cycle -- Volley and Floom (RUN Modes)

**Objective:** Master the two RUN modes in Cycle mode -- Volley (gated bursts of cycling) and Floom (smooth amplitude crossfade via CV) -- to add dynamic control to cycling textures.

> [!tip] If you only have 5 minutes
> Shape mode, MODE=Cycle, INTONE at 2 o'clock. Patch a slow square wave to RUN. Cycling starts and stops with the square wave -- that is Volley. Now replace the square wave with a slow triangle LFO. The cycling fades in and out smoothly -- that is Floom. Two very different textures from the same RUN jack.

## What You'll Learn

- Volley: gating cycling on/off with a gate signal at RUN
- Floom: crossfading cycling amplitude with CV at RUN
- How the two behaviors emerge from the same RUN input based on signal type
- Performance techniques using RUN as a dynamic control

## What You'll Need

- Mannequins Just Friends
- A gate source (sequencer, clock, manual gate) for Volley
- A CV source (LFO, envelope, expression) for Floom
- Patch cables (4-6)
- A mixer or audio interface to monitor output

## Starting State

| Control | Position |
|---------|----------|
| SOUND/SHAPE | Shape |
| MODE | Cycle |
| TIME | 10 o'clock (slow, visible cycling) |
| INTONE | 2 o'clock |
| CURVE | 12 o'clock |
| RAMP | 12 o'clock |
| FM | 12 o'clock |
| RUN | Unpatched |

## Warm-Up (3 min)

Patch RUN high (steady voltage) and confirm all six channels are cycling at different INTONE-spread rates. Patch MIX to your mixer. Remove the RUN patch -- cycling stops. Reconnect -- cycling resumes. This on/off behavior is the foundation for Volley.

## Exercises

### Exercise 1: Volley -- Gated Cycling (8 min)

<div data-just-friends-panel
  data-highlights="jack-jf-run-in:amber,jack-jf-mix-out:blue"
></div>

1. Patch a slow clock or square wave (1-2 Hz) to **RUN**
2. Watch the LEDs: cycling starts when the gate goes high and stops when it goes low. This is **Volley** -- the gate controls whether JF is actively cycling
3. Adjust the clock speed -- faster gates create rhythmic "stuttering" of the cycling. Slower gates create longer phrases of activity
4. Try a sequencer gate output with varying gate lengths -- short gates produce brief cycling bursts, long gates produce sustained cycling passages
5. With INTONE spread, each channel retains its harmonic position. Volley affects all channels simultaneously

> [!info] Listen For
> Volley creates a "gated modulation bank" effect. When the gate opens, six harmonically related LFOs start together with aligned phase. When it closes, they stop wherever they are. The next gate restarts them from their stopped positions, creating phase accumulation over time.

### Exercise 2: Floom -- Smooth Crossfade (10 min)

<div data-just-friends-panel
  data-highlights="jack-jf-run-in:amber,knob-jf-intone:blue"
  data-knobs="knob-jf-intone:95"
></div>

1. Replace the gate at RUN with a **slow triangle or sine LFO** (0.1-0.5 Hz)
2. Now the cycling does not switch on and off abruptly -- instead, it fades smoothly in and out. This is **Floom**: the CV level controls the amplitude of the cycling
3. At low RUN voltage, the channels barely move. As voltage rises, cycling amplitude increases until full cycling at high voltage
4. Patch individual channel outputs to modulation destinations -- the modulation depth rises and falls with the Floom CV
5. Try an envelope at RUN -- cycling amplitude follows the envelope shape, creating "modulation with an envelope"

> [!info] Volley vs Floom
> The difference is in the input signal. Hard gates (0V/5V) produce Volley (on/off switching). Smooth CV produces Floom (amplitude crossfade). JF responds continuously to the RUN voltage -- there is no mode switch between Volley and Floom, just the character of the input signal.

### Exercise 3: Performance Patch (6 min)

<div data-just-friends-panel
  data-highlights="jack-jf-run-in:amber,jack-jf-identity-out:blue,jack-jf-3n-out:blue,jack-jf-6n-out:blue"
></div>

1. Patch three channel outputs to different modulation destinations (filter, VCA, pitch)
2. Patch an expressive CV source to RUN -- an envelope follower, pressure CV, or manually controlled offset
3. Play with the RUN level to control the intensity of all modulation simultaneously
4. This creates a "modulation depth" performance control: low RUN = subtle, high RUN = dramatic
5. Combine with TIME changes for speed shifts and INTONE for ratio changes
6. Practice making a musical arc: start with low RUN (quiet modulation), increase to full cycling, then pull back

## Output

Save your dynamic cycling patch:
- **Volley patch:** Gate source speed, INTONE position, channel routing
- **Floom patch:** CV source type, RUN voltage range, modulation depth character
- **Performance settings:** Document how you mapped RUN to create expressive control
- Note the difference in texture between Volley and Floom with the same channel routing

## Next Session Preview

Session 09 switches to **Sound mode** -- the oscillator domain. Just Friends becomes six oscillators with INTONE creating chord intervals and TIME setting the root pitch. You will build chords from a single module and explore JF's harmonic voice architecture.
