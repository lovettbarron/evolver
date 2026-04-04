---
title: "Session 15: Mixuverter and Voltage Processing"
module: "Modulation & Utilities"
session_number: 15
duration: 20
prerequisite: 14
output_type: technique
difficulty: intermediate
tags: [mixuverter, attenuverter, voltage-processing, cv, offset, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 37-38"
---

# Session 15: Mixuverter and Voltage Processing

**Objective:** Use the Mixuverter as a DC offset source, attenuverter, and CV mixer to scale, invert, and combine modulation signals for precise control over modulation depth and polarity.

> [!tip] If you only have 5 minutes
> With no cables patched, flip the Mixuverter POLARITY to -/+ (bipolar) and slowly sweep the ATTENUATOR knob from center to fully clockwise, then fully counterclockwise. Patch one MIXUVERTER OUTPUT to VCF FM 3 IN with FM 3 at ~50%. You are now manually sweeping the filter with a DC voltage you created from nothing. That is the Mixuverter as a DC source.

## What Is an Attenuverter?

In modular synthesis, **voltage processing** is the unsung essential. Raw modulation sources (LFOs, envelopes) often output signals that are too strong, the wrong polarity, or need to be combined. An **attenuverter** (attenuator + inverter) solves all three problems:

- **Attenuate**: Reduce a signal's strength. An LFO output of +/-5V becomes +/-2V, making the modulation more subtle
- **Invert**: Flip a signal's polarity. A rising envelope becomes a falling one. An LFO that sweeps the filter up now sweeps it down
- **Offset**: Add a fixed voltage to shift a signal's center point. A bipolar +/-5V LFO becomes a unipolar 0-10V signal

Without these tools, modulation is all-or-nothing. With them, you dial in exactly the right amount and direction of movement. Voltage processing is what separates a patch that sounds "sort of right" from one that sounds precisely musical.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Patch S&H OUT -> VCF FM 3 IN, set FM 3 to ~30%, and tap the PUSH GATE button a few times -- recall the random filter steps from Session 14. Remove the cable.

## Setup

From the normalled default:
- Mixer SAW at ~60%, all other Mixer sliders at 0%
- VCO A OCTAVE at 4
- VCF FREQ at ~50%, Q at ~15%
- Mixuverter ATTENUATOR at noon (center)
- Mixuverter x2 switch OFF
- Mixuverter POLARITY switch at UNI

## Exercises

<div data-cascadia-panel
  data-sections="utilities,patchbay"
  data-highlights="knob-utilities-attenuator:blue,switch-utilities-x2:amber,switch-utilities-polarity:blue,jack-utilities-mixuverter-out-a:amber,jack-utilities-mixuverter-out-b:amber"
></div>

### Exercise 1: Mixuverter as DC Offset Source (5 min)

> [!info] Normalled: Internal +5V DC -> Mixuverter MAIN INPUT. With no cable patched, the Mixuverter receives a constant +5V. The ATTENUATOR knob scales this voltage from 0V to +5V (UNI mode) or -5V to +5V (-/+ mode). This makes the Mixuverter a controllable voltage source with no input cable needed.

This exercise requires one cable.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | MIXUVERTER OUTPUT (any of 3) | VCF FM 3 IN | DC voltage to filter cutoff | Nothing (FM 3 has no normal) |

1. Patch Cable 1: **MIXUVERTER OUTPUT** -> **VCF FM 3 IN**. Set VCF FM 3 to ~50%
2. With POLARITY at UNI, slowly turn the ATTENUATOR from fully counterclockwise (~0%) to fully clockwise (~100%). You should hear the filter cutoff rise as you increase the voltage -- you are manually controlling the filter brightness with a knob that creates voltage from nothing
3. Switch POLARITY to **-/+** (bipolar). Now the ATTENUATOR at center = 0V, clockwise = positive voltage (filter opens), counterclockwise = negative voltage (filter closes below the FREQ setting). Sweep the knob through its full range -- the filter goes from darker-than-FREQ through FREQ to brighter-than-FREQ
4. Enable the **x2** switch. The voltage range doubles. With POLARITY at -/+ and x2 on, the Mixuverter outputs up to +/-10V. Sweep the ATTENUATOR -- the filter sweep range is now much wider. Disable x2

### Exercise 2: Attenuverting an LFO Signal (7 min)

This exercise requires two cables.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | LFO X OUT | MIXUVERTER MAIN INPUT | Feed LFO into Mixuverter | +5V DC -> MAIN INPUT normalling |
| 2 | MIXUVERTER OUTPUT | VCF FM 3 IN | Processed LFO to filter | Nothing |

1. Patch Cable 1: **LFO X OUT** -> **MIXUVERTER MAIN INPUT**. Patch Cable 2: **MIXUVERTER OUTPUT** -> **VCF FM 3 IN**. Set VCF FM 3 to ~60%, LFO RATE to ~30%
2. Set POLARITY to UNI, ATTENUATOR to ~100%. Play and hold a note -- you should hear a strong filter wobble, the full LFO signal reaching the filter
3. Lower ATTENUATOR to ~50% -- the wobble becomes more subtle. You have attenuated the LFO. Lower to ~25% -- barely perceptible movement. This is how you dial in the precise modulation depth you want
4. Switch POLARITY to **-/+**. Set ATTENUATOR to center (noon) -- the modulation disappears (0V output). Turn clockwise -- positive LFO wobble returns. Now turn counterclockwise past center -- the filter wobble returns but **inverted**: when the LFO rises, the filter closes; when the LFO falls, the filter opens. You have inverted the modulation

> [!info] Cascadia's Mixuverter POLARITY switch selects between unipolar (0 to +max) and bipolar (-max to +max) attenuation. In bipolar mode, the center position is zero output, making it easy to dial from inverted through zero to normal polarity in one smooth motion.

5. Return POLARITY to -/+, ATTENUATOR slightly clockwise of center for a moderate, non-inverted filter wobble

<div data-cascadia-panel
  data-sections="utilities,lfo-xyz,vcf"
  data-highlights="jack-lfo-xyz-x-out:amber,jack-utilities-main-input:blue,jack-utilities-mixuverter-out-a:amber,jack-vcf-fm-3-in:blue,knob-utilities-attenuator:blue,switch-utilities-polarity:blue"
  data-cables="jack-lfo-xyz-x-out>jack-utilities-main-input:mod,jack-utilities-mixuverter-out-a>jack-vcf-fm-3-in:cv"
></div>

### Exercise 3: Combining Two Modulation Sources (5 min)

Keep Cables 1-2 patched (LFO X -> Mixuverter -> VCF FM 3). Add one more cable:

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 3 | Envelope A ENV OUT | MIXUVERTER SECONDARY INPUT | Add envelope to LFO modulation | Nothing (SECONDARY INPUT has no normal) |

1. Patch Cable 3: **Envelope A ENV OUT** -> **MIXUVERTER SECONDARY INPUT**. Set Envelope A to a percussive shape: Attack ~0%, Decay ~30%, Sustain ~0%
2. Play notes -- you should hear the LFO wobble on the filter PLUS a per-note brightness spike from the envelope. The Mixuverter sums both signals and sends the combined CV to the filter. The LFO provides rhythmic movement while the envelope provides per-note articulation
3. Use the ATTENUATOR to scale the LFO's contribution: turn it down to ~25% to emphasize the envelope, or up to ~75% to emphasize the LFO. The SECONDARY INPUT is not attenuated -- it passes through at full strength, so the ATTENUATOR only scales the LFO portion
4. Enable **x2** -- the LFO contribution doubles in strength, making it dominant over the envelope. Disable x2 for a balanced mix
5. Remove all cables

## Exploration (optional, hyperfocus days)

- Use the Mixuverter as a unipolar-to-bipolar converter: patch an envelope (0V to +5V) into MAIN INPUT, set POLARITY to -/+, ATTENUATOR at noon. The output swings from -2.5V to +2.5V -- now the envelope goes both up AND down from center, useful for creating pitch dips on note attack
- The patchbay section includes a dedicated BI>UNI converter normalled from LFO Z. Patch a bipolar LFO into BI>UNI IN and take the output -- it converts +/-5V to 0-5V. Compare this with the Mixuverter's approach
- Try combining S&H OUT (random) with an LFO via the Mixuverter for "structured randomness" -- the LFO provides a predictable base movement while the S&H adds unpredictable variation on top

## Output Checklist

- [ ] Used the Mixuverter as a DC voltage source to manually sweep the filter
- [ ] Attenuated an LFO signal to control modulation depth precisely
- [ ] Inverted an LFO signal using bipolar (-/+) mode
- [ ] Combined an LFO and envelope through the Mixuverter's two inputs
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- The Mixuverter is a DC source with no input (normalled +5V), an attenuverter with one input (scale and invert), and a CV mixer with two inputs (sum and scale) -- three tools in one
- Voltage processing transforms raw modulation into precisely scaled and directed control, essential for musical patches where "too much" or "wrong direction" ruins the effect
- The x2 switch doubles the voltage range for stronger modulation or wider DC offset, and the POLARITY switch enables instant signal inversion

## Next Session Preview

Session 16 moves into **Advanced Patching** with FM chains and cross-modulation -- using one oscillator to modulate another at audio rates, the Ring Mod as a modulation source, and building complex timbral chains that combine everything from Modules 1-5.
