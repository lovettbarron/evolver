---
title: 'Session 14: Sample & Hold and Slew Limiter'
session_number: 14
duration: 25
prerequisite: 13
output_type: technique
difficulty: intermediate
tags:
  - sample-hold
  - slew
  - random
  - generative
  - voltage-processing
  - curriculum
instrument: cascadia
reference: Cascadia Manual pp. 37-38
section: Modulation & Utilities
instrument_type: instrument
---

# Session 14: Sample & Hold and Slew Limiter

**Objective:** Use the Sample & Hold to generate stepped random voltages and the Slew Limiter to smooth them, creating generative modulation for filter cutoff and pitch.

> [!tip] If you only have 5 minutes
> Patch S&H OUT -> VCF FM 3 IN. Set FM 3 to ~40% and play notes while a MIDI clock is running (or tap the PUSH GATE button rhythmically). The filter cutoff jumps to a new random value on each trigger -- that is Sample & Hold creating stepped random modulation.

## What Are Sample & Hold and Slew Limiting?

**Sample & Hold (S&H)** takes a "snapshot" of whatever voltage is at its input each time it receives a trigger pulse. It holds that voltage at its output until the next trigger arrives. If the input is noise (a rapidly changing random signal), each snapshot captures a different random voltage -- creating a staircase of random steps. This is the classic "computer beeping" sound when routed to pitch, or random filter jumps when routed to a filter.

**Slew limiting** smooths voltage transitions by limiting how fast the output can change. Feed it a staircase of abrupt voltage steps and it turns them into gentle slopes and curves. Applied to the S&H output, it transforms harsh random jumps into fluid, wandering modulation -- like the difference between a pinball bouncing between bumpers (S&H) and a leaf floating on a breeze (S&H through slew).

The combination of S&H and Slew is one of the most powerful generative modulation tools in modular synthesis: randomness that you can dial from abrupt and chaotic to smooth and organic.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Turn LFO RATE to ~30% and raise PW MOD to ~60% -- recall the PWM effect from Session 13. Return PW MOD and RATE to noon.

## Setup

From the normalled default:
- Mixer SAW at ~60%, all other Mixer sliders at 0%
- VCO A OCTAVE at 4
- VCF FREQ at ~45%, Q at ~25% (slight resonance to highlight cutoff changes)
- VCF FM 3 at 0%
- Slew RATE at ~30%
- Slew DIRECTION at Both (center)
- Slew SHAPE at LIN

## Exercises

<div data-cascadia-panel
  data-sections="utilities,vcf"
  data-highlights="jack-utilities-sh-out:amber,jack-vcf-fm-3-in:blue,slider-vcf-fm-3:blue,knob-utilities-slew-rate:amber,jack-utilities-slew-out:amber"
  data-cables="jack-utilities-sh-out>jack-vcf-fm-3-in:cv"
></div>

### Exercise 1: S&H Driving the Filter (8 min)

This exercise requires one cable.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | S&H OUT | VCF FM 3 IN | Random stepped voltages to filter cutoff | S&H OUT -> Slew IN normalling stays active (multed) |

> [!info] Normalled: MIDI CLK OUT -> S&H TRIG IN. The Sample & Hold triggers on MIDI clock by default. If no MIDI clock is running, press the PUSH GATE button to trigger manually.

> [!info] Normalled: Internal digital noise -> S&H IN. The S&H samples from a dedicated internal noise source, generating random voltages with no patching required. This noise is separate from the Mixer's NOISE TYPE selection.

1. Patch Cable 1: **S&H OUT** -> **VCF FM 3 IN**. Set VCF FM 3 to ~30%
2. If you have a MIDI clock running, play notes -- on each clock tick, the filter cutoff should jump to a new random brightness. Each note has a different filter character. If no MIDI clock is available, tap the **PUSH GATE** button rhythmically while holding a note -- each press triggers a new sample
3. Raise FM 3 to ~50% -- the random jumps become more extreme, swinging between dark and bright. Each clock tick is a surprise
4. Lower FM 3 to ~15% -- the randomness becomes subtle, adding slight unpredictable variation to the filter. This is useful for adding "life" to repetitive sequences
5. Try different clock rates if available. Faster clock = more frequent random changes. Slower clock = the filter holds each random value longer

### Exercise 2: Smoothing with the Slew Limiter (8 min)

> [!info] Normalled: S&H OUT -> Slew/Follow IN. The S&H output is already connected to the Slew Limiter input. The slewed signal appears at SLEW OUT.

1. Keep Cable 1 patched. The signal chain is now: noise -> S&H -> Slew (normalled) -> and S&H OUT also goes to VCF FM 3 (via cable). You are hearing the un-slewed S&H output on the filter
2. Now add a second cable:

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 2 | SLEW OUT | VCF FM 3 IN | Smoothed random to filter | Cable 1 (move cable from S&H OUT to SLEW OUT) |

Remove Cable 1 from VCF FM 3 IN. Patch Cable 2: **SLEW OUT** -> **VCF FM 3 IN**. Now the filter receives the slew-smoothed version of the S&H output

3. Set Slew RATE to ~20% and play notes. Instead of abrupt jumps, the filter cutoff now glides smoothly between random values. The "staircase" has become "rolling hills." You should hear a wandering, organic filter movement
4. Raise Slew RATE to ~60% -- the smoothing is more extreme. Each random value takes longer to reach, creating slow, gentle drifts. Very ambient and organic
5. Lower Slew RATE to ~5% -- nearly instant. The output is close to the raw S&H steps, with just a tiny rounding on the edges
6. Try Slew DIRECTION switch positions:
   - **Up Only** (up position): Rising voltages are slewed but falling voltages snap instantly. You should hear slow filter openings but instant drops -- a "breathing in" quality
   - **Down Only** (down position): The opposite -- instant rises, slow falls. Filter snaps bright then slowly darkens
   - **Both** (center): Both directions slewed equally. Smooth in all directions

> [!info] Cascadia's Slew Limiter has independent direction control (Rise Only / Both / Fall Only) and a shape switch (Linear / Exponential). Most utility slew limiters offer only a single rate knob. The direction and shape controls give you precise control over how voltages transition.

7. Try SHAPE switch: **EXP** produces curves that start fast and decelerate (exponential approach). **LIN** produces constant-rate slopes. EXP sounds more natural for most musical applications

<div data-cascadia-panel
  data-sections="utilities,vcf,vco-a"
  data-highlights="jack-utilities-slew-out:amber,jack-vcf-fm-3-in:blue,jack-vco-a-fm-1-in:blue,knob-utilities-slew-rate:blue,switch-utilities-slew-direction:blue,switch-utilities-slew-shape:amber"
  data-cables="jack-utilities-slew-out>jack-vcf-fm-3-in:cv,jack-utilities-slew-out>jack-vco-a-fm-1-in:cv"
></div>

### Exercise 3: Smoothed Random to Pitch (5 min)

1. Keep Cable 2 patched (SLEW OUT -> VCF FM 3). Set FM 3 to ~20% for subtle filter variation
2. Add one more cable:

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 3 | SLEW OUT | VCO A FM 1 IN | Smoothed random to pitch | Nothing (FM 1 has no normal) |

3. Patch Cable 3: **SLEW OUT** -> **VCO A FM 1 IN**. Set VCO A FM 1 to ~10% (very subtle)
4. Set Slew RATE to ~50%, SHAPE to EXP. Play and hold notes -- the pitch should wander gently, drifting sharp and flat in a slow, organic way. Combined with the random filter movement, the sound has a living, breathing quality
5. Reduce FM 1 to ~5% for barely perceptible pitch drift -- just enough to make a sustained note feel alive without sounding out of tune. This is a classic ambient synthesis technique
6. Remove all cables

## Exploration (optional, hyperfocus days)

- Patch an LFO instead of noise into S&H IN (LFO X OUT -> S&H IN). Now instead of random voltages, the S&H samples the LFO at clock rate, creating quantized stepped versions of the LFO wave
- Try the Envelope Follower: flip the ENV FOLLOW switch to ON and patch an audio signal into SLEW/FOLLOW IN. The output tracks the amplitude of the input signal -- useful for making one sound's dynamics control another parameter
- Route S&H OUT to VCO A pitch (FM 1) with no slew for classic "random computer beeps" -- the signature sound of early electronic music

## Output Checklist

- [ ] Heard S&H generating stepped random voltages on the filter cutoff
- [ ] Heard the Slew Limiter smooth S&H steps into organic wandering modulation
- [ ] Tried different Slew directions (rise only, fall only, both) and heard the difference
- [ ] Applied smoothed random modulation to pitch for gentle drift
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Sample & Hold captures random voltage snapshots at a clock rate -- stepped, unpredictable modulation that works with zero patching on Cascadia thanks to normalled noise and MIDI clock
- The Slew Limiter smooths abrupt voltage changes into gradual transitions, turning harsh random steps into organic wandering
- Direction and shape controls on the Slew Limiter give precise control over how voltages transition -- enabling effects from "breathing" one-directional smoothing to full bidirectional drift

## Next Session Preview

Session 15 explores the **Mixuverter** -- Cascadia's voltage processing utility that can attenuate, invert, double, and offset control voltages. You will learn to scale modulation depth, create bipolar modulation from unipolar envelopes, and combine multiple CV sources.
