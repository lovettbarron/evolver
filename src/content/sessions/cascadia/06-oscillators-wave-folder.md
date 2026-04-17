---
title: 'Session 06: Wave Folder as Sound Shaper'
session_number: 6
duration: 20
prerequisite: 5
output_type: technique
difficulty: intermediate
tags:
  - oscillators
  - wave-folder
  - west-coast
  - harmonics
  - patching
  - lfo-modulation
instrument: cascadia
reference: Cascadia Manual pp. 22-23
section: Oscillators
instrument_type: instrument
---

# Session 06: Wave Folder as Sound Shaper

**Objective:** Understand wave folding as a harmonic generation technique distinct from filtering and distortion, patch your first intentional cable to route a raw oscillator waveform into the wave folder, and use an LFO to modulate fold depth dynamically.

> [!tip] If you only have 5 minutes
> From the normalled default, raise Wave Folder FOLD to ~50% and play a note. Hear the metallic harmonics? Now lower it to ~25%. That is wave folding -- adding harmonics by folding the waveform back on itself.

## What Is Wave Folding?

Sound-shaping in synthesis falls into three broad families. *Filtering* (East Coast synthesis, pioneered by Robert Moog) removes harmonics from a harmonically rich source -- you start bright and carve away. *Wave folding* (West Coast synthesis, pioneered by Don Buchla) adds harmonics to a simple source by folding the waveform's peaks back whenever they exceed a threshold -- you start simple and build complexity. *Distortion/clipping* adds harmonics by flattening peaks, which tends to sound harsh and compressed.

Wave folding produces a distinctive timbral sweep as you increase the fold amount: the first fold adds a few harmonics with a metallic shimmer, and each subsequent fold adds more, creating increasingly complex and buzzy tones. Unlike distortion, the folding produces harmonics that are musically related to the input -- the result sounds otherworldly rather than simply harsh.

In this session you will also patch your first cable, intentionally overriding a normalled connection to route a specific oscillator waveform directly into the wave folder. This is where the semi-modular architecture becomes truly powerful.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default sawtooth tone. Now raise VCO A INDEX to ~60% -- recall the FM bell tone from Session 5. Return INDEX to 0%.

## Setup

From the normalled default:
- Mixer SAW at ~50%, all other Mixer sliders at 0%
- VCO A OCTAVE at 4 or 5
- VCF FREQ at ~75% (filter open)
- VCF FM 1 at 0% (no filter sweep)
- Wave Folder FOLD at 0% (starting clean)
- Wave Folder MOD at 0%
- VCO A INDEX at 0% (no FM)

## Exercises

<div data-cascadia-panel
  data-sections="wave-folder,vcf"
  data-highlights="slider-wave-folder-fold:blue,slider-wave-folder-mod:amber,jack-wave-folder-in:amber"
></div>

### Exercise 1: Hear the Fold Progression (6 min)

> [!info] Normalled: VCF OUT -> Wave Folder IN. The filtered signal from the VCF passes through the wave folder automatically. Even with FOLD at 0%, the signal passes through cleanly to VCA A. Patching into the Wave Folder IN jack overrides this connection.

1. Play a sustained note around C3. With FOLD at 0%, you should hear a clean, filtered sawtooth -- the signal passes through the wave folder without being affected
2. Raise FOLD to ~25% -- you should hear subtle new harmonics appearing on top of the filtered tone, a metallic shimmer
3. Raise FOLD to ~50% -- the harmonics become more pronounced and the tone takes on a buzzy, complex quality distinct from both the raw oscillator and a resonant filter
4. Raise FOLD to ~75% -- the sound becomes aggressively complex with many overlapping harmonics. You can hear individual "folds" as bright peaks in the spectrum
5. Try FOLD at ~100% -- maximum complexity. The tone is very buzzy and harmonically dense
6. Return FOLD to ~35% for a moderate, musical effect. Play notes across the keyboard -- notice how the folding interacts differently at different pitches (lower notes fold more dramatically because their amplitude is higher)

> [!info] Cascadia's wave folder sits *after* the VCF in the normalled signal chain. This is unusual -- most West Coast synthesizers place the wave folder before the filter. Cascadia's topology means you fold an already-filtered signal, giving the filter control over what harmonics enter the folder. This produces smoother, more controlled folding than applying it to raw oscillator output.

### Exercise 2: Patch a Cable -- Raw Oscillator into Wave Folder (6 min)

This is your first intentional cable patch. You will route VCO A's pulse wave directly into the wave folder, bypassing the VCF entirely.

**Cables for this session:**

| Cable | From | To | Overrides |
|-------|------|----|-----------|
| 1 | VCO A PULSE OUT (Mixer section) | Wave Folder IN | VCF OUT -> Wave Folder normalled connection |
| 2 | LFO X OUT | Wave Folder FOLD MOD IN | Nothing (FOLD MOD IN has no normalled source) |

<div data-cascadia-panel
  data-sections="mixer,wave-folder,lfo-xyz"
  data-highlights="jack-mixer-vco-a-pulse-out:amber,jack-wave-folder-in:blue,jack-lfo-xyz-x-out:amber,jack-wave-folder-mod-in:blue"
  data-cables="jack-mixer-vco-a-pulse-out>jack-wave-folder-in:audio,jack-lfo-xyz-x-out>jack-wave-folder-mod-in:mod"
></div>

1. Take a patch cable and connect **VCO A PULSE OUT** (the direct output jack in the Mixer section) to **Wave Folder IN** -- you should hear the sound change immediately. The pulse wave is now entering the wave folder directly, bypassing the VCF

> [!info] When you patch into Wave Folder IN, you override the normalled VCF OUT -> Wave Folder connection. The wave folder now receives the raw VCO A pulse wave instead of the filtered mixer output. The VCF still processes the Mixer output, but that signal no longer reaches the wave folder.

2. With FOLD at ~35%, play a note -- you should hear a different character than before. The raw pulse wave has a sharper, more defined fold because it has not been softened by the filter first
3. Adjust VCO A PW slider to ~75% -- hear how a narrower pulse folds differently than a square wave. The asymmetric waveform creates asymmetric folding
4. Return PW to ~50%. Compare: raise FOLD to ~60% with the cable in, then remove the cable (restoring the normalled VCF -> Wave Folder path) and hear the difference at the same FOLD setting. The filtered version is smoother; the raw version is edgier
5. Reconnect the cable (VCO A PULSE OUT -> Wave Folder IN) for Exercise 3

### Exercise 3: Modulate Fold Depth with LFO (6 min)

Now patch a second cable to add dynamic motion to the wave folding.

1. Take a second patch cable and connect **LFO X OUT** to **Wave Folder FOLD MOD IN**

> [!info] The Wave Folder's FOLD MOD IN has no normalled source -- it is open by default. Patching LFO X into this input adds CV-controlled modulation of the fold depth. The MOD slider attenuates how much the LFO affects the fold amount.

2. Set Wave Folder MOD to ~50% and FOLD to ~25%. Play a sustained note -- you should hear the fold amount rise and fall rhythmically as LFO X sweeps. The timbre pulses between clean and harmonically rich
3. Adjust LFO RATE knob to taste -- slower rates create a breathing, evolving texture; faster rates create a tremolo-like harmonic animation
4. Raise MOD to ~75% -- the fold sweep becomes more dramatic, ranging from nearly clean to heavily folded
5. Try different FOLD base amounts: at ~0% with MOD at ~75%, the LFO sweeps from silence to folded. At ~50% with MOD at ~50%, the LFO adds subtle movement to an already-folded tone
6. Set LFO RATE to a slow speed (~25%) for a gentle, evolving texture. This is the wave folder at its most musical

## Exploration (optional, hyperfocus days)

- Remove Cable 1 (restore VCF -> Wave Folder normalling) but keep Cable 2 (LFO -> FOLD MOD). Now the filtered signal gets dynamically folded -- a combination of East Coast filtering and West Coast folding
- Try patching VCO A TRI OUT (Mixer section) into Wave Folder IN instead of PULSE OUT -- triangles fold very differently from pulses, producing smoother harmonic sweeps
- With both cables connected, add some FM: raise VCO A INDEX to ~30%. FM + wave folding creates extremely complex timbres

## Output Checklist

- [ ] Can hear the difference between unfolded, lightly folded, and heavily folded signals
- [ ] Understand that wave folding adds harmonics (unlike filtering which removes them)
- [ ] Successfully patched Cable 1: VCO A PULSE OUT -> Wave Folder IN (overriding VCF -> WF normalling)
- [ ] Successfully patched Cable 2: LFO X OUT -> Wave Folder FOLD MOD IN
- [ ] Heard LFO-modulated fold depth creating dynamic timbral movement
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- Wave folding generates harmonics by folding waveform peaks back on themselves -- it builds complexity rather than removing it
- Cascadia's post-VCF wave folder position means you normally fold a pre-filtered signal, but you can bypass this with a cable for raw oscillator folding
- Patching into a normalled input overrides the default connection -- your first taste of how cables reconfigure the signal path
- LFO modulation of fold depth creates dynamic, evolving timbres that sound distinctly West Coast

## Next Session Preview

Module 3 begins with Envelope A and VCA A -- the modules that shape every note's volume over time. You will learn how attack, decay, sustain, and release create different articulations (plucks, pads, swells) and explore Cascadia's unique Hold stage and Envelope Speed switch.
