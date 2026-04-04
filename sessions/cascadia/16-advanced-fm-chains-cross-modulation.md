---
title: "Session 16: FM Chains and Cross-Modulation"
module: "Advanced Patching"
session_number: 16
duration: 25
prerequisite: 15
output_type: technique
difficulty: advanced
tags: [fm, cross-modulation, ring-mod, sidebands, advanced, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 11-18, 24-27"
---

# Session 16: FM Chains and Cross-Modulation

**Objective:** Use VCO B to frequency-modulate VCO A at audio rates, explore the Ring Mod as a modulation source, and build a multi-stage timbral chain combining FM and ring modulation with filtering.

> [!tip] If you only have 5 minutes
> Play a note, then slowly raise VCO A INDEX from 0% to ~60%. You will hear the tone go from a pure sine to a complex, bell-like timbre as VCO B sine (normalled to VCO A FM 2) modulates VCO A's frequency. That is FM synthesis in action.

## What Is Cross-Modulation?

**Cross-modulation** means using one audio-rate signal to modulate another. The result is **sidebands** -- new frequencies that did not exist in either original signal. When oscillator B modulates oscillator A's frequency (FM), the sidebands appear at frequencies equal to the carrier (A) plus and minus multiples of the modulator (B). Simple integer ratios between carrier and modulator (2:1, 3:2) produce harmonic, musical timbres like bells and electric pianos. Non-integer ratios produce inharmonic, metallic, clangorous sounds.

**Ring modulation** is a related but different process: it multiplies two signals together, producing only the sum and difference frequencies while suppressing the originals. This creates hollow, robotic, metallic tones. Where FM adds complexity on top of the carrier, ring mod replaces the originals with something entirely new.

Both techniques generate timbres impossible to achieve with filtering alone -- they are the foundation of metallic, evolving, and otherworldly sounds.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Turn the Mixuverter ATTENUATOR while patching a MIXUVERTER OUTPUT to VCF FM 3 -- recall the voltage processing from Session 15. Remove the cable and reset.

## Setup

From the normalled default:
- Mixer IN 2 at ~60% (VCO A sine through Mixer), all other Mixer sliders at 0%
- VCO A OCTAVE at 4
- VCO A INDEX at 0% (no FM yet)
- VCO A INDEX MOD (IM) at 0%
- VCO A TZFM/EXP switch at TZFM
- VCO A AC/DC switch at AC
- VCO B OCTAVE at 4 (same octave as VCO A for harmonic ratios)
- VCO B PITCH SOURCE at PITCH A+B (tracks VCO A)
- VCF FREQ at ~65%, Q at ~10%, MODE at LP4
- VCF FM 1 at ~40% (envelope on filter for articulation)

## Exercises

<div data-cascadia-panel
  data-sections="vco-a,vco-b,mixer"
  data-highlights="slider-vco-a-index:blue,slider-vco-a-index-mod:amber,switch-vco-a-tzfm:amber,switch-vco-a-ac-dc:amber,switch-vco-b-octave:blue,switch-vco-b-pitch-source:blue,slider-mixer-in-1:amber"
></div>

### Exercise 1: Basic FM with VCO B (8 min)

> [!info] Normalled: VCO B SINE OUT -> VCO A FM 2 IN. VCO B's sine wave is already connected to VCO A's second FM input. The INDEX slider controls the FM depth (how much VCO B modulates VCO A's frequency).

1. Play and hold a note. With INDEX at 0%, you should hear a clean sine tone (from Mixer IN 2 which is normalled from VCO A SINE)
2. Slowly raise VCO A INDEX from 0% to ~20%. You should hear subtle harmonic content appearing -- the sine becomes slightly brighter and more complex. These are the first sidebands from FM
3. Continue raising INDEX to ~40%. The timbre is now clearly bell-like or metallic -- many sidebands are present. The sound is rich and complex despite starting from a simple sine wave
4. Push INDEX to ~70%. The sound becomes aggressive and dense with harmonics. At very high FM depth, the timbre can become noisy and chaotic
5. With INDEX at ~40%, try changing VCO B OCTAVE: at 3 (one octave below VCO A), the ratio is 2:1 -- the FM tones are harmonic and musical. At 5 (one octave above), the ratio is 1:2 -- different harmonic content. Set VCO B to OCTAVE 4 and detune VCO B PITCH slightly off center -- the inharmonic ratio creates evolving, beating metallic tones

> [!info] Cascadia's VCO A supports Through-Zero FM (TZFM), which produces cleaner, more pitch-stable FM timbres than standard exponential FM. The TZFM/EXP switch selects the mode; AC/DC coupling selects between pitch-accurate tonal FM (AC) and deeper modulation for LFO sources (DC).

6. Set INDEX back to ~35% for a musical bell-like timbre

### Exercise 2: Ring Mod as Modulation Source (8 min)

This exercise requires one cable.

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | Mixer IN 1 (Ring Mod signal) or MAIN OUT tap | VCF FM 3 IN | Ring mod signal to filter FM | Nothing (FM 3 has no normal) |

The Ring Mod output is normalled to Mixer IN 1. Instead of patching from the Ring Mod directly (there is no separate Ring Mod output jack on the front panel), we will use the Mixer to blend ring mod into the audio path and also route it to the filter.

1. First, listen to the ring mod. Raise Mixer IN 1 to ~40% (this blends the Ring Mod output into the mix). Play notes -- you should hear metallic, bell-like tones added to the sound. The Ring Mod multiplies VCO A sine by VCO B sine, producing sum and difference frequencies

> [!info] Normalled: VCO A SINE and VCO B SINE -> Ring Mod inputs. Mixer IN 1 -> Ring Mod OUT. Cascadia's Ring Mod is always active, multiplying the two oscillator sines. Raising Mixer IN 1 blends this metallic signal into your mix with no cables needed.

2. With VCO A INDEX at ~35% (FM active) and IN 1 at ~40% (Ring Mod blended), play notes across the keyboard. The combination of FM and ring mod creates a complex, evolving metallic sound -- sidebands from both processes interact
3. Try VCO B OCTAVE at 3 (ring mod produces octave-related sum/difference tones) vs 5 (higher, more dissonant ring mod tones). Return to OCTAVE 4
4. Lower IN 1 back to 0%. Now patch Cable 1: take the VCA B OUT jack and route it -- actually, let us use a simpler approach. Lower INDEX to 0% and raise Mixer SAW to ~60% instead of IN 2 for a richer source
5. The ring mod is an internal resource you have explored. Understanding that it is always available as a timbral color via Mixer IN 1 is the key takeaway

<div data-cascadia-panel
  data-sections="vco-a,vco-b,vcf,envelope-b"
  data-knobs="slider-vco-a-index:45,slider-vcf-fm-1:64"
  data-highlights="slider-vco-a-index:blue,slider-vco-a-index-mod:blue,slider-vcf-fm-1:blue,slider-mixer-in-1:amber"
></div>

### Exercise 3: FM Chain with Filter Envelope (5 min)

Now combine FM synthesis with the filter envelope to create a complete timbral chain.

1. Set Mixer IN 2 at ~50% (sine), SAW at ~30%. VCO A INDEX at ~35%, VCO B OCTAVE at 4, PITCH SOURCE at PITCH A+B
2. Set VCF FM 1 at ~50% (Envelope B shapes filter), VCF FREQ at ~35% (low cutoff so envelope sweeps are dramatic), Q at ~20%
3. Set Envelope B: Attack ~0%, Decay ~35%, Sustain ~15%, Release ~20%
4. Play notes -- you should hear a complex FM tone that starts bright (envelope opens filter) and closes to a darker, still harmonically rich sound. The FM provides the harmonic complexity; the filter envelope provides the dynamic articulation. This is a complete FM + subtractive chain

> [!info] Normalled: Envelope A ENV OUT -> VCO A IM IN. Envelope A can dynamically control the FM index depth, making the FM brighter on attack and simpler during sustain -- mimicking how acoustic instruments produce more harmonics when struck harder. Raise VCO A INDEX MOD (IM) to activate this.

5. Raise VCO A INDEX MOD (IM) to ~40%. Now Envelope A controls the FM depth over time -- the sound is harmonically richest at the attack and simplifies as the note sustains. Combined with the filter envelope, you have two independent envelopes shaping timbre: one controlling FM complexity, one controlling filter brightness

## Exploration (optional, hyperfocus days)

- Try TZFM/EXP switch at EXP for a different FM character -- exponential FM is less pitch-stable but grittier
- Set VCO B to LFO mode and raise INDEX -- slow FM creates vibrato at low depths and dramatic pitch sweeps at high depths, very different from audio-rate FM
- Combine ring mod IN 1 with wave folding: raise Wave Folder FOLD to ~40% with ring mod in the mix for extremely complex harmonic content

## Output Checklist

- [ ] Heard FM synthesis using the normalled VCO B -> VCO A FM 2 path
- [ ] Explored different FM ratios by changing VCO B OCTAVE
- [ ] Heard Ring Mod tones via Mixer IN 1
- [ ] Built a complete FM + filter envelope timbral chain
- [ ] Used INDEX MOD (IM) for envelope-controlled FM depth
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- FM synthesis creates sidebands (new frequencies) by modulating one oscillator's frequency with another at audio rates -- integer ratios produce harmonic tones, non-integer ratios produce metallic/inharmonic tones
- Cascadia's Ring Mod is always active and available via Mixer IN 1, providing instant access to sum/difference frequency tones
- Combining FM with filter envelopes and index modulation creates complete timbral chains where multiple dimensions of the sound evolve independently over time

## Next Session Preview

Session 17 explores **self-patching and feedback loops** -- routing Cascadia's outputs back to its own inputs for resonant, chaotic, and emergent timbres. A safety warning: feedback can be dangerously loud, so you will learn to start quiet and build carefully.
