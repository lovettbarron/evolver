---
title: 'Session 10: VCF Modes and Resonance'
session_number: 10
duration: 25
prerequisite: 9
output_type: technique
difficulty: intermediate
tags:
  - filter
  - vcf
  - multimode
  - resonance
  - self-oscillation
  - curriculum
instrument: cascadia
reference: Cascadia Manual pp. 24-27
section: Filters & LPG
instrument_type: instrument
---

# Session 10: VCF Modes and Resonance

**Objective:** Explore Cascadia's 8 VCF filter modes and understand how resonance shapes the harmonic content of a signal, from subtle emphasis to self-oscillation.

> [!tip] If you only have 5 minutes
> Set SAW at ~50% in the Mixer, play and hold a note, then slowly rotate the MODE selector through all 8 positions while listening. Each mode removes different frequencies from the same sawtooth wave. That is what a multimode filter does.

## What Is a Multimode Filter?

A **filter** removes frequencies from a sound. The simplest filter is a low-pass -- it lets low frequencies through and cuts the highs, making a bright sound duller. But that is only one way to carve a spectrum. A **multimode filter** offers several filter types in one module, each cutting a different slice of the frequency spectrum.

The main filter types are: **low-pass** (cuts highs, warm and dark), **high-pass** (cuts lows, thin and bright), **band-pass** (cuts both extremes, keeping a narrow band -- nasal and vocal), **notch** (cuts a narrow band in the middle, keeping everything else -- hollow), and **phaser** (shifts phase relationships to create sweeping cancellations). Filters also have **slope** -- measured in dB per octave -- which determines how aggressively they cut. A 6dB slope (1-pole) is gentle; a 24dB slope (4-pole) is steep and dramatic.

**Resonance** (also called Q) boosts the frequencies right at the cutoff point. Low resonance adds subtle emphasis; high resonance creates a ringing peak; maximum resonance causes **self-oscillation** where the filter generates its own sine wave with no audio input at all.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Now set Envelope A to a percussive shape (Attack ~0%, Decay ~20%, Sustain ~0%) and flip VCA CONTROL to UP -- recall the LPG bongo from Session 9. Flip VCA CONTROL back to DOWN and reset Envelope A to noon/center for this session.

## Setup

From the normalled default:
- Mixer SAW at ~75%, all other Mixer sliders at 0%
- VCO A OCTAVE at 4
- VCF FREQ at ~50% (center)
- VCF Q at 0%
- VCF LEVEL at ~50% (unity, no overdrive)
- VCF MODE selector at LP4 (4-pole low-pass)
- Envelope B in ENV mode, all sliders at noon

## Exercises

<div data-cascadia-panel
  data-sections="vcf"
  data-knobs="slider-vcf-freq:64,slider-vcf-q:0"
  data-highlights="switch-vcf-mode:blue,slider-vcf-freq:blue,slider-vcf-q:amber,knob-vcf-level:amber"
></div>

### Exercise 1: Tour the 8 Filter Modes (8 min)

1. Play and hold a note in the middle of your keyboard. With VCF FREQ at ~50%, you should hear a moderately bright sawtooth -- the LP4 filter is removing some high harmonics
2. Slowly rotate the MODE selector one click at a time. At each position, play and hold a note. Listen for how the timbre changes:
   - **LP1** (6dB/oct): Very gentle rolloff. Barely different from unfiltered -- you should hear most of the brightness still present
   - **LP2** (12dB/oct): Moderate rolloff. Noticeably darker than LP1 but still open
   - **LP4** (24dB/oct): Steep rolloff. The classic "fat" low-pass sound -- warm, round, rich
   - **BP2** (12dB/oct): Both lows and highs are cut. You should hear a thinner, nasal, vocal-like quality
   - **BP4** (24dB/oct): Narrower bandpass -- even more nasal and resonant
   - **HP4** (24dB/oct): Lows are removed. Thin, bright, almost tinny
   - **NT2** (notch): A narrow scoop in the middle. Sounds slightly hollow, like a phaser frozen at one position
   - **PHZR** (phaser): Phase cancellations create a sweepy, jet-like quality

> [!info] Cascadia's VCF offers 8 simultaneous filter modes through the MODE selector -- most semi-modular synths provide only 1 or 2. The dedicated LP4 OUT and HP4 OUT jacks are always active regardless of which MODE is selected, meaning you can tap the low-pass and high-pass outputs for parallel processing while using a different mode on VCF OUT.

3. Return MODE to LP4. Now sweep VCF FREQ slowly from ~0% to ~100% -- you should hear the timbre go from very dark and muffled (low cutoff) to fully bright (high cutoff, filter wide open). This is the classic filter sweep

### Exercise 2: Resonance -- From Subtle to Self-Oscillation (8 min)

1. Set MODE to LP4, VCF FREQ at ~40%. Play and hold a note. Slowly raise VCF Q from 0% toward ~30% -- you should hear a subtle nasal emphasis appear around the cutoff frequency. The filter is boosting a narrow band
2. Continue raising Q to ~60% -- the resonant peak becomes a pronounced ringing. The sound becomes thinner overall as the resonance dominates. You should hear an almost vocal "wah" quality
3. Raise Q to ~85% -- the ringing is now very strong. Short notes may produce an audible "ping" as the filter rings after the note ends
4. Push Q to ~100% -- the filter begins to **self-oscillate**. You should hear a pure sine tone even between notes. This sine comes from the filter itself, not from VCO A. Sweep FREQ slowly and the pitch of the sine changes -- the filter is now acting as a sine oscillator

> [!info] Cascadia's VCF self-oscillates in all 8 filter modes, not just the low-pass. Try switching MODE with Q at ~100% -- each mode produces a self-oscillation tone with a slightly different character. BP4 self-oscillation is particularly strong and clear.

5. With Q still at ~100%, set FREQ to ~50%. Now play MIDI notes -- you should hear both VCO A's sawtooth and the filter's sine tone. The sine does not track your keyboard by default. To make it track, raise VCF FM 2 to ~50% (this uses the normalled MIDI PITCH signal)
6. Set Q back to ~25% for a musically useful amount of resonance. This is a good starting point for most patches

<div data-cascadia-panel
  data-sections="vcf"
  data-knobs="slider-vcf-q:127,slider-vcf-freq:64"
  data-highlights="slider-vcf-q:blue,slider-vcf-freq:blue,knob-vcf-level:amber,jack-vcf-lp4-out:amber,jack-vcf-hp4-out:amber"
></div>

### Exercise 3: LEVEL Pre-Gain Distortion (5 min)

1. Set MODE to LP4, FREQ at ~50%, Q at ~25%. Play a note -- clean filtered sawtooth
2. Raise VCF LEVEL from ~50% toward ~75%. You should hear the signal get louder and slightly grittier -- you are pushing the signal harder into the filter input
3. Push LEVEL to ~100%. The sound should be noticeably distorted -- crunchy and aggressive. The LEVEL LED lights red indicating clipping. This is **pre-filter distortion**: the signal clips before the filter shapes it, which produces a different character than distortion after the filter

> [!info] Cascadia's VCF LEVEL knob provides pre-filter gain with an LED indicator. This is a deliberate design feature for adding grit and character before filtering -- most semi-modular filters lack a dedicated input drive control.

4. Return LEVEL to ~50% for clean operation

## Exploration (optional, hyperfocus days)

- With Q at ~100% (self-oscillating), try each of the 8 modes. Notice how NT2 and PHZR self-oscillation sounds different from the low-pass modes
- Patch VCO A SAW OUT -> VCF IN (overriding MIXER normalling) to isolate just the sawtooth. Compare the sound of each mode with only a raw saw as input
- Try moderate Q (~50%) with LEVEL at ~80% -- the combination of resonance and drive creates aggressive, characterful tones

## Output Checklist

- [ ] Heard all 8 VCF filter modes and can identify the general character of each
- [ ] Heard resonance (Q) from subtle to self-oscillation
- [ ] Heard the filter self-oscillate and produce a sine tone
- [ ] Heard pre-filter distortion using the LEVEL knob
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- A multimode filter offers multiple ways to carve a spectrum -- Cascadia's VCF provides 8 modes with slopes from 6dB to 24dB per octave
- Resonance (Q) boosts frequencies at the cutoff; at maximum it causes self-oscillation, turning the filter into a sine oscillator
- The VCF LEVEL knob adds pre-filter distortion for gritty character, a separate tool from resonance or post-filter effects

## Next Session Preview

Session 11 explores **filter frequency modulation** -- using envelopes, LFOs, and audio-rate signals to move the filter cutoff dynamically, creating everything from subtle envelope sweeps to aggressive FM metallic tones.
