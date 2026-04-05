---
title: "Session 08: Envelope B — The Triple-Mode Function Generator"
module: "Envelopes & Amplitude"
session_number: 8
duration: 25
prerequisite: 7
output_type: technique
difficulty: intermediate
tags: [envelopes, function-generator, lfo, burst, filter-modulation, lfv, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 29-31"
---

# Session 08: Envelope B — The Triple-Mode Function Generator

**Objective:** Understand what a function generator is and why it is more versatile than a dedicated envelope or LFO, then explore Envelope B's three modes (Envelope, LFO, Burst) and their sub-modes through dedicated exercises that reveal how a single module can modulate the filter in fundamentally different ways.

> [!tip] If you only have 5 minutes
> From the normalled default, set VCF FM 1 to ~50%. Play a note -- hear the filter sweep? Now switch Envelope B MODE SELECT from ENV to LFO. Play again -- the filter now wobbles continuously instead of sweeping once. That single switch changed an envelope into an LFO.

## What Is a Function Generator?

In modular synthesis, a *function generator* is a multipurpose module that can produce different types of control signals depending on its configuration. Unlike dedicated modules (a separate envelope module and a separate LFO module), a function generator combines these functions into one circuit that morphs its behavior based on mode switches.

The concept comes from analog computer design, where a "function generator" produced arbitrary waveshapes for mathematical operations. In synthesis, it means a module whose output can be:
- A **one-shot envelope** (triggered once per note, then stops)
- A **free-running LFO** (continuously oscillating, independent of notes)
- A **burst generator** (a rapid series of pulses within a time window)

The advantage is flexibility and space efficiency -- one module does the work of three. The trade-off is that you can only use one mode at a time. When you need a filter envelope AND an LFO simultaneously, you need additional modules or creative patching.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Now adjust Envelope A Attack to ~75% and back to ~5% -- recall how Attack shapes the note onset from Session 7.

## Setup

From the normalled default:
- Mixer SAW at ~50%, all other Mixer sliders at 0%
- VCF FREQ at ~30% (filter mostly closed so envelope/LFO modulation is clearly audible)
- VCF FM 1 at ~50% (enough modulation depth to hear Envelope B's output clearly)
- Wave Folder FOLD at 0%
- VCO A OCTAVE at 4
- Envelope A: Attack ~5%, Decay ~40%, Sustain ~60%, Release ~30%, ENVELOPE SPEED Med (so amplitude stays musical while you focus on filter changes)
- Envelope B: MODE SELECT at ENV, TYPE SELECT at AD, RISE at ~30%, FALL at ~50%, SHAPE at noon

> [!info] Normalled: Envelope B ENV OUT -> VCF FM 1 IN. Envelope B's output modulates the filter cutoff frequency automatically. The VCF FM 1 slider controls how much Envelope B affects the filter. Patching into VCF FM 1 IN overrides this connection.

## Exercises

<div data-cascadia-panel
  data-sections="envelope-b,vcf"
  data-knobs="slider-vcf-fm-1:64,slider-envelope-b-rise:38,slider-envelope-b-fall:64"
  data-highlights="switch-envelope-b-mode-select:blue,switch-envelope-b-type-select:blue,slider-envelope-b-rise:blue,slider-envelope-b-fall:blue,slider-envelope-b-shape:amber"
></div>

### Exercise 1: Envelope Mode — Three Envelope Types (8 min)

Envelope B starts in its most familiar role: a triggered envelope that sweeps the filter once per note.

1. With MODE SELECT at ENV and TYPE SELECT at AD, play a note. You should hear the filter sweep up and back down in a single motion -- the AD (Attack/Decay) envelope fires a one-shot sweep regardless of how long you hold the key
2. Set RISE to ~30% (attack speed) and FALL to ~50% (decay speed). Play short staccato notes -- each one produces the same complete filter sweep. The gate length does not matter in AD mode
3. Adjust SHAPE below noon -- the sweep becomes logarithmic (percussive, fast initial rise). Adjust SHAPE above noon -- the sweep becomes exponential (slow start, then accelerating). Return SHAPE to noon for linear
4. Switch TYPE SELECT to AHR (center position). Play and HOLD a note -- the filter sweeps up (Rise) and then HOLDS at the peak for as long as you keep the key pressed. Release the key and the filter sweeps back down (Fall). This is gate-responsive: short notes = short sweeps, long notes = held bright filter

> [!info] Cascadia's Envelope B in AHR mode holds at peak for the full gate duration. This is fundamentally different from AD mode where the envelope always completes its full cycle. AHR gives you direct, real-time control over the filter brightness through your playing -- hold longer for brighter, release for darker.

5. Switch TYPE SELECT to CYCLE (bottom position). Without playing any notes, you should hear the filter cycling on its own -- the envelope continuously re-triggers itself, rising and falling in an infinite loop. Adjust RISE and FALL to change the cycling speed. This turns the envelope into a free-running unipolar LFO
6. Play a note while in CYCLE mode -- a MIDI gate resets the cycle to the start of the Rise stage, syncing the filter sweep to your playing. Release the key and the cycling continues from wherever it is

### Exercise 2: LFO Mode — Free, Synced, and Chaotic (8 min)

Now switch Envelope B to a completely different function: a continuously running oscillator.

1. Switch MODE SELECT to LFO (center position). TYPE SELECT should be at FREE (top position). Without playing any notes, you should hear the filter wobbling continuously -- Envelope B is now a free-running bipolar LFO modulating the filter cutoff

> [!info] Cascadia's Envelope B in LFO mode outputs a bipolar signal (+/- voltage), unlike Envelope mode which is unipolar (0 to +5V). This means the filter cutoff sweeps both ABOVE and BELOW the VCF FREQ setting. You hear the filter open brighter AND close darker than its resting position.

2. RISE is now RATE -- set it to ~50% for a moderate wobble speed. You should hear the filter sweep up and down rhythmically. Lower RATE (~20%) for a slow, evolving sweep; raise RATE (~80%) for a fast vibrato-like wobble
3. SHAPE is now TILT -- at the bottom it produces a sawtooth shape (fast rise, slow fall), at center a triangle (even rise and fall), at top a ramp (slow rise, fast fall). Set TILT to the bottom -- hear how the filter snaps up and glides down. Move to the top -- now it glides up and snaps down
4. Switch TYPE SELECT to SYNC (center position). In SYNC mode, the LFO locks to an external clock -- without a clock patched in, it may behave differently from FREE mode. Switch back to FREE for now (clock sync is explored in later sessions with sequencing)
5. Switch TYPE SELECT to LFV (bottom position). This is the **Low Frequency Vacillator** -- listen carefully. The filter movement is no longer predictable. It wanders, shifts, and changes character over time. Each cycle is slightly different from the last

> [!info] Cascadia's LFV (Low Frequency Vacillator) mode is unique to this synthesizer. Unlike a standard LFO which repeats the same shape forever, the LFV generates chaotic, non-repeating oscillations. FALL becomes DELTA (how far each cycle can deviate from the previous one) and SHAPE becomes SLEW (smoothing between values). Low DELTA + high SLEW = gentle organic wandering. High DELTA + low SLEW = erratic jumps.

6. In LFV mode, set FALL (DELTA) to ~25% and SHAPE (SLEW) to ~75% -- the filter wanders gently and organically, like a slowly drifting analog circuit. Now set DELTA to ~75% and SLEW to ~25% -- the filter movement becomes erratic and unpredictable, jumping between cutoff frequencies. This is modulation that never repeats -- ideal for evolving ambient textures

<div data-cascadia-panel
  data-sections="envelope-b"
  data-highlights="switch-envelope-b-mode-select:blue,switch-envelope-b-type-select:blue,slider-envelope-b-rise:amber,slider-envelope-b-fall:amber,slider-envelope-b-shape:amber"
></div>

### Exercise 3: Burst Mode — Ratcheting Envelopes (3 min)

A brief taste of Envelope B's third function: generating rapid burst patterns.

1. Switch MODE SELECT to BURST (bottom position). TYPE SELECT at AD (top position)
2. Play a note -- instead of a single filter sweep, you should hear a rapid series of filter pulses within a short time window. Each pulse sweeps the filter, creating a ratcheting or stuttering effect
3. RISE is now RATE (how fast the pulses repeat within the burst) -- raise it to ~70% for rapid-fire filter stutters. FALL is now LENGTH (how long the burst lasts) -- set it to ~40% for a short burst, ~70% for a longer one
4. Play a few notes to hear the burst pattern. This mode is powerful for rhythmic effects and will be explored further in sequencing sessions. Switch MODE SELECT back to ENV when done

## Exploration (optional, hyperfocus days)

- In LFO FREE mode, patch the three Envelope B CV mod inputs: try Envelope A ENV OUT -> RISE MOD IN with RISE MOD slider at ~50% to have the amplitude envelope modulate the LFO rate. Faster notes = faster filter wobble
- Compare Envelope B CYCLE sub-mode (unipolar, resets on gate) vs LFO FREE mode (bipolar, ignores gate) -- they are subtly different even at similar speeds
- In LFV mode, try extreme DELTA (~90%) with moderate SLEW (~50%) for truly chaotic filter behavior -- great for experimental sound design

## Output Checklist

- [ ] Can switch between Envelope, LFO, and Burst modes and hear the difference
- [ ] Understand AD vs AHR vs CYCLE sub-modes in Envelope mode
- [ ] Heard FREE vs LFV in LFO mode (predictable vs chaotic)
- [ ] Briefly experienced Burst mode ratcheting
- [ ] Understand that RISE/FALL/SHAPE controls change meaning per mode
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- A function generator is a multipurpose module that can be an envelope, LFO, or burst generator -- Envelope B packs three tools into one
- In Envelope mode: AD fires a complete cycle on trigger, AHR holds at peak for the gate duration, CYCLE self-triggers continuously
- In LFO mode: FREE runs predictably, SYNC locks to a clock, LFV generates unique chaotic oscillations that never repeat
- The same RISE/FALL/SHAPE sliders change their meaning in each mode -- RISE becomes Rate in LFO mode, FALL becomes Delta in LFV mode
- The LFV (Low Frequency Vacillator) is unique to Cascadia and produces organic, non-repeating modulation
- Burst mode generates rapid pulse series within a time window -- useful for ratcheting effects

## Next Session Preview

VCA B is not just another amplifier -- it combines a VCA with a 4-pole low-pass filter to create a Low Pass Gate, a West Coast synthesis technique where volume and brightness decay together naturally. You will patch cables to route a signal through VCA B/LPF and create the classic "Buchla bongo" percussion sound.
