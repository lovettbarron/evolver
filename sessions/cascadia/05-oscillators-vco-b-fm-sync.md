---
title: "Session 05: VCO B, FM Synthesis & Sync"
module: "Oscillators"
session_number: 5
duration: 25
prerequisite: 4
output_type: patch
difficulty: beginner
tags: [oscillators, vco-b, fm-synthesis, through-zero-fm, sync, bell, curriculum-patch]
instrument: cascadia
reference: "Cascadia Manual pp. 17-20"
---

# Session 05: VCO B, FM Synthesis & Sync

**Objective:** Use VCO B to frequency-modulate VCO A, hear the difference between through-zero and exponential FM, explore oscillator sync, and save an FM bell curriculum patch.

> [!tip] If you only have 5 minutes
> Raise VCO A INDEX to ~60% and play a note in the C4-C5 range. You should hear a metallic, bell-like tone. That is FM synthesis using the normalled VCO B -> VCO A connection, with zero cables.

## What Is Frequency Modulation Synthesis?

Frequency modulation (FM) synthesis uses one oscillator (the *modulator*) to rapidly change the frequency of another (the *carrier*). When the modulator runs at audio rates, this does not sound like vibrato -- instead, it generates entirely new harmonic frequencies called *sidebands*. The result ranges from subtle shimmer to complex metallic and bell-like tones, depending on the modulation depth and the frequency ratio between the two oscillators.

When the modulator and carrier are tuned to simple ratios (octaves, fifths), the sidebands are harmonically related and the sound is musical -- bells, electric piano, marimba tones. When they are detuned to non-integer ratios, the sidebands become inharmonic -- clangy, metallic, noisy. FM depth (called the *modulation index*) controls how many sidebands appear: low index = subtle warmth, high index = complex metallic spectra.

*Oscillator sync* is a different technique: it forces one oscillator to restart its cycle whenever the other completes a cycle. This creates harmonically rich tones that sweep dramatically when you change the synced oscillator's pitch.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default sawtooth tone. Now raise Mixer PULSE to ~50% and lower Mixer SAW to 0% -- recall the hollow pulse wave from Session 4. Return SAW to ~50% and PULSE to 0%.

## Setup

From the normalled default:
- Mixer SAW at ~50%, all other Mixer sliders at 0%
- VCO A OCTAVE at 4 or 5 (mid-range)
- VCO A INDEX at 0% (FM off to start)
- VCO A TZFM/EXP switch set to TZFM
- VCO A AC/DC switch set to AC
- VCO A SYNC TYPE switch set to Off (center position)
- VCF FREQ at ~75% (open filter to hear FM character clearly)
- VCF FM 1 at 0% (no filter sweep)
- Wave Folder FOLD at 0% (no folding)

## Exercises

<div data-cascadia-panel
  data-sections="vco-a,vco-b"
  data-highlights="slider-vco-a-index:blue,switch-vco-a-tzfm:amber,switch-vco-a-ac-dc:amber,knob-vco-b-pitch:amber,switch-vco-b-octave:amber,switch-vco-b-pitch-source:blue"
></div>

### Exercise 1: Dial In FM with VCO B (8 min)

> [!info] Normalled: VCO B Sine -> VCO A FM 2 IN. VCO B's sine wave output is pre-wired to VCO A's second frequency modulation input. The INDEX slider on VCO A controls how much VCO B's sine wave affects VCO A's frequency. Patching into VCO A FM 2 IN overrides this connection.

1. With INDEX at 0%, play a sustained note around C4 -- you should hear a clean sawtooth tone with no FM character
2. Slowly raise VCO A INDEX to ~15% -- you should hear a subtle brightening and shimmer as the first sidebands appear
3. Raise INDEX to ~30% -- the tone becomes noticeably metallic with a bell-like quality
4. Raise INDEX to ~60% -- the sound is now a complex, bright bell tone with many sidebands. This is the FM sweet spot for bell sounds
5. Raise INDEX to ~90% -- the sound becomes harsh and clangy as the sideband count overwhelms the fundamental. Return INDEX to ~60%

> [!info] Cascadia's through-zero FM (TZFM) is rare in analog synthesizers. Unlike standard FM which only speeds up the oscillator, TZFM allows the carrier frequency to pass through zero and reverse direction. This produces cleaner, more pitch-stable bell tones that track accurately across the keyboard -- historically a digital-only capability (think Yamaha DX7) achieved here with analog circuits.

### Exercise 2: Compare TZFM vs. Exponential and AC vs. DC (5 min)

1. With INDEX at ~60%, play a note and listen to the current TZFM/AC sound -- bright, bell-like, pitch-stable
2. Flip the TZFM/EXP switch to EXP -- play the same note. You should hear the pitch shift and the bell quality become less clean, more chaotic. Exponential FM detunes the carrier as depth increases
3. Return to TZFM. Now flip the AC/DC switch from AC to DC -- play a note. You should hear a deeper, more dramatic modulation effect. DC coupling passes the full modulator signal including its DC offset
4. Return to AC. The combination of TZFM + AC produces the cleanest, most pitch-stable FM tones -- ideal for bell and keyboard sounds

> [!info] Cascadia's AC/DC coupling switch gives two FM flavors from a single modulator. AC coupling blocks the DC component of VCO B's signal, keeping the carrier pitch centered. DC coupling passes everything, creating deeper modulation ideal for drone and noise textures.

### Exercise 3: Detune VCO B for Interval Ratios (5 min)

1. Set VCO B PITCH SOURCE switch to "PITCH A+B" -- both oscillators now track MIDI pitch together
2. With INDEX at ~60%, click VCO B OCTAVE two positions higher than VCO A -- you should hear a brighter, more harmonic bell tone. A 2-octave interval (4:1 ratio) creates widely spaced, musical sidebands
3. Click VCO B OCTAVE back to match VCO A -- the bell becomes denser and more complex (1:1 ratio)
4. Now slowly turn VCO B PITCH knob from noon toward ~65% -- you should hear the sidebands become inharmonic and metallic as the ratio departs from an integer. This is the "clangorous" FM territory
5. Return VCO B PITCH to noon. Set VCO B OCTAVE two clicks above VCO A for the final bell sound

<div data-cascadia-panel
  data-sections="vco-a,vco-b"
  data-knobs="slider-vco-a-index:76"
  data-highlights="slider-vco-a-index:blue,switch-vco-a-tzfm:blue,switch-vco-a-ac-dc:blue,switch-vco-b-octave:blue,switch-vco-a-sync-type:amber"
></div>

### Exercise 4: Oscillator Sync (5 min)

> [!info] Normalled: VCO B Saw -> VCO A SYNC IN. VCO B's saw wave output is pre-wired to VCO A's sync input. The SYNC TYPE switch on VCO A selects Hard/Off/Soft sync mode. Patching into VCO A SYNC IN overrides this connection.

1. Set VCO A INDEX to 0% (turn off FM so you hear sync clearly). Set VCO A SYNC TYPE to Hard (up position)
2. Play a sustained note -- you should hear a bright, harmonically complex tone. VCO B is forcing VCO A to restart its waveform on every VCO B cycle
3. Slowly turn VCO A PITCH from noon toward ~75% -- you should hear a dramatic harmonic sweep as VCO A tries to run at a different frequency but keeps getting reset by VCO B. This is the classic sync sweep
4. Flip SYNC TYPE to Soft (down position) -- play the same note and sweep PITCH again. You should hear a gentler, less aggressive sweep. Soft sync flips the waveform direction instead of hard-resetting it
5. Return SYNC TYPE to Off (center). Return VCO A PITCH to noon

> [!info] Cascadia's soft sync uses a "flip" technique -- instead of resetting the oscillator's waveform to zero (hard sync), it reverses the direction of the triangle core. This produces a smoother, less aggressive timbral character than hard sync, giving you two distinct sync flavors from the same normalled connection.

### Save Your Patch: FM Bell (3 min)

Return to these settings for the FM Bell curriculum patch:
- VCO A INDEX at ~60%
- VCO A TZFM/EXP set to TZFM
- VCO A AC/DC set to AC
- VCO A SYNC TYPE set to Off
- VCO B OCTAVE set 2 positions above VCO A
- VCO B PITCH SOURCE set to "PITCH A+B"
- VCO B PITCH at noon
- Mixer SAW at ~50%, all other Mixer sliders at 0%
- VCF FREQ at ~75%
- Envelope A: ATTACK at ~0% (minimum), DECAY at ~50%, SUSTAIN at ~0% (minimum), RELEASE at ~40%
- Envelope A ENVELOPE SPEED at Fast
- All other settings at normalled defaults

Play staccato notes in the C4-C6 range -- you should hear clean, metallic bell tones that decay naturally. Lower notes (C2-C3) produce gong-like timbres. Document this patch in `patches/cascadia/fm-bell.md` (see the patch file for exact values in clock-position notation).

## Exploration (optional, hyperfocus days)

- With the FM Bell settings, raise Wave Folder FOLD to ~25% -- hear how folding adds extra complexity to the FM sidebands
- Try VCO B in LFO mode (flip VCO/LFO switch) with INDEX at ~30% -- you get slow, evolving FM modulation instead of audio-rate sidebands
- Combine sync and FM: set SYNC TYPE to Hard and INDEX to ~30%, then sweep VCO A PITCH -- the sync sweep interacts with the FM sidebands for extremely complex tones

## Output Checklist

- [ ] Can hear FM synthesis using the normalled VCO B -> VCO A connection
- [ ] Heard the difference between TZFM and EXP FM modes
- [ ] Heard the difference between AC and DC coupling
- [ ] Heard how detuning VCO B changes the FM character (harmonic vs. inharmonic)
- [ ] Heard both hard and soft oscillator sync sweeps
- [ ] FM Bell patch saved and documented in patches/cascadia/
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- FM synthesis generates new harmonics (sidebands) by using one oscillator to modulate another's frequency -- no filtering or folding needed
- The modulation index (INDEX slider) controls how many sidebands appear: low = subtle warmth, high = complex metallic tones
- Through-zero FM (TZFM) with AC coupling produces the cleanest, most pitch-stable FM tones -- Cascadia achieves this in analog
- Oscillator sync creates harmonically rich tones that sweep dramatically when you change the synced oscillator's pitch

## Next Session Preview

Next time you will explore Cascadia's wave folder as a sound-shaping tool distinct from both filtering and FM. You will patch your first cable -- routing VCO A's pulse wave directly into the wave folder, bypassing the filter -- and use an LFO to modulate the fold amount for dynamic harmonic animation.
