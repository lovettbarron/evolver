---
title: "Session 12: LPG Deep Dive and Percussion Palette"
module: "Filters & LPG"
session_number: 12
duration: 25
prerequisite: 11
output_type: technique
difficulty: intermediate
tags: [lpg, low-pass-gate, percussion, west-coast, vca-b, envelope, curriculum]
instrument: cascadia
reference: "Cascadia Manual pp. 32-34, 20-21"
---

# Session 12: LPG Deep Dive and Percussion Palette

**Objective:** Expand on Session 9's LPG bongo by exploring different source waveforms, envelope shapes, and mixing techniques to build a palette of 3-4 distinct percussion tones through the Low Pass Gate.

> [!tip] If you only have 5 minutes
> Repatch the LPG bongo from Session 9 (VCO A SAW OUT -> VCA B IN, Envelope A ENV OUT -> VCA/LPF B CV IN, VCA CONTROL UP). Then swap Cable 1 to VCO A TRI OUT instead -- hear how the percussion goes from woody to rounder and softer. That one cable change shows how source waveform shapes LPG character.

## The Low Pass Gate: Amplitude Meets Filtering

In Session 9 you discovered the **Low Pass Gate** -- how coupling a VCA and filter under one envelope creates naturally musical dynamics where louder equals brighter. This session goes deeper into that concept.

The key insight is that an LPG's character depends on **three variables**: the source waveform going in, the envelope shape controlling it, and the filter behavior coupling amplitude with brightness. A sawtooth through a fast envelope produces a sharp woody "bonk." A triangle through a slower envelope produces a rounder, mellower "thud." Noise through a very fast envelope produces a click or snap. By varying these three elements systematically, you can build an entire percussion kit from a single LPG -- no samples, no presets, just voltage and waveforms.

## Warm-Up (2 min)

Remove all cables. Set all knobs and sliders to noon/center. Play a MIDI note -- you should hear the normalled default tone. Sweep VCF MODE through a few positions, then raise Q to ~80% to hear the resonant peak -- recall the filter modes and resonance from Sessions 10-11. Return Q to ~20% and MODE to LP4.

## Setup

From the normalled default:
- Mixer SAW at 0%, all other Mixer sliders at 0% (we will route audio through VCA B, not the main path)
- VCO A OCTAVE at 3 (percussion range)
- VCA A LEVEL at ~20%, LEVEL MOD at ~20% (keep main voice quiet so the LPG output is prominent)
- Envelope A: Attack ~0%, Decay ~20%, Sustain ~0%, Release ~10%, ENVELOPE SPEED at Fast, HOLD POSITION at Off
- VCA CONTROL switch at UP (LPG mode)
- CV AMOUNT at ~75%

**Cables for this session:**

| # | From | To | Purpose | Overrides |
|---|------|----|---------|-----------|
| 1 | VCO A SAW OUT (Mixer section) | VCA B IN | Routes raw sawtooth to LPG | Ring Mod OUT -> VCA B IN normalling |
| 2 | Envelope A ENV OUT | VCA/LPF B CV IN | Envelope controls LPG dynamics | +5V DC -> VCA/LPF B CV IN normalling |

> [!info] Normalled: Ring Mod OUT -> VCA B IN. Patching Cable 1 overrides this, sending VCO A's raw waveform directly to the LPG instead of the ring-modulated signal.

> [!info] Normalled: +5V DC -> VCA/LPF B CV IN. Patching Cable 2 overrides the static voltage with Envelope A's dynamic output, giving the LPG its percussive behavior.

Patch both cables. Play short staccato notes -- you should hear the LPG bongo from Session 9.

## Exercises

### Exercise 1: Source Waveform Tasting (7 min)

Keep everything patched. You will swap Cable 1's source to hear how different waveforms change the LPG percussion character.

1. **Sawtooth** (current): Play short notes at C2-C3. You should hear a bright, woody "bonk" with harmonic richness -- the saw's many overtones give the LPG lots of material to shape
2. Unplug Cable 1 from VCO A SAW OUT and repatch to **VCO A TRI OUT**. Play the same notes -- you should hear a rounder, softer "thud" with less bite. The triangle has fewer harmonics, so the LPG's filter has less to work with
3. Repatch Cable 1 to **VCO A PULSE OUT**. Play notes -- you should hear a punchier, more hollow percussion. The pulse wave's strong odd harmonics give a different edge than the sawtooth. Try adjusting VCO A PW to ~75% -- the pulse becomes asymmetric and the percussion takes on a more nasal, reedy quality
4. Repatch Cable 1 to **NOISE OUT** (Mixer section). Set NOISE TYPE to WHITE. Play notes -- you should hear a short burst of noise shaped by the envelope. This is a snare-like or shaker sound. Try PINK noise -- warmer and thumpier. Try ALT noise for metallic, digital percussion textures

> [!info] Cascadia's VCA B/LPF uses a 4-pole ladder diode topology that adds its own resonant character to whatever source passes through it. This means even simple waveforms like triangle gain a slight harmonic emphasis that contributes to the LPG's distinctive sound.

5. Return Cable 1 to VCO A SAW OUT for the remaining exercises

### Exercise 2: Envelope Shape Variations (7 min)

Now vary the envelope to change the percussion feel while keeping the sawtooth source.

1. **Tight bongo** (current): Envelope A Attack ~0%, Decay ~20%, Sustain ~0%. Play notes -- short, woody bonk
2. **Slower tom**: Raise Decay to ~40%, Release to ~20%. Play notes -- the tone rings longer and the brightness decays more gradually. You should hear a deeper, more resonant drum sound
3. **Snappy click**: Set Decay to ~10%, keep Sustain at ~0%. Switch ENVELOPE SPEED to Fast if not already. Play notes -- very short, almost a click. The filter barely opens before closing. Good for hi-hat-like transients (especially with noise source)
4. **Sustained mallet**: Raise Sustain to ~30%, set Decay to ~35%, Release to ~40%. Hold a note -- the tone sustains at a lower brightness level after the initial attack, like a marimba with the note ringing. Release the key and it fades
5. Try CV AMOUNT at ~50% vs ~100% -- lower CV AMOUNT means the envelope opens the LPG less, producing quieter and darker tones. Higher CV AMOUNT means fully open, bright percussion. Set CV AMOUNT to ~75%

### Exercise 3: Combining LPG with Main Voice (7 min)

Now blend the LPG percussion with the main signal path using the Mixer.

1. Keep Cables 1-2 patched. Set Envelope A back to the bongo shape: Attack ~0%, Decay ~20%, Sustain ~0%
2. Raise Mixer SAW to ~50% and VCA A LEVEL to ~50%, LEVEL MOD to ~50%. Play notes -- you should hear both the main filtered sawtooth (through VCA A and VCF) AND the LPG percussion simultaneously. The LPG adds a percussive transient layer on top of the sustained tone
3. Lower VCO A OCTAVE to 2. Play notes -- the main voice is now a bass tone with the LPG adding a percussive attack. This layering technique is fundamental to creating sounds with both body and transient definition
4. Try different OCTAVE settings: at 4, the combination sounds like a plucked string. At 2, like a bass with a pick attack. The LPG transient adds definition regardless of register

## Exploration (optional, hyperfocus days)

- Build a "4-piece kit" by noting settings for 4 different percussion sounds: bongo (saw + fast decay), tom (saw + medium decay), snap (noise + very fast decay), mallet (triangle + sustain). Write down the settings for each
- Try feeding VCO B into VCA B IN instead of VCO A: set VCO B to a different octave for a two-pitch percussion layer
- Experiment with HOLD POSITION on Envelope A: set it to AHDSR with H at ~10% for a percussion sound that sustains briefly at peak brightness before decaying

## Output Checklist

- [ ] Heard LPG percussion with at least 3 different source waveforms (saw, triangle, pulse, noise)
- [ ] Shaped percussion character by varying Envelope A decay and sustain settings
- [ ] Combined LPG percussion with the main signal path for layered transient + sustain tones
- [ ] Can describe how source waveform, envelope shape, and CV AMOUNT each affect LPG character
- [ ] Session logged in Obsidian daily note

## Key Takeaways

- LPG percussion character depends on three variables: source waveform (harmonic content), envelope shape (time profile), and CV amount (dynamic range)
- Sawtooth gives woody/bright percussion, triangle gives round/soft, pulse gives punchy/hollow, noise gives snare/shaker textures
- Layering LPG percussion with the main signal path adds transient definition to sustained tones -- a fundamental sound design technique

## Next Session Preview

Session 13 shifts to **modulation** with a deep dive into Cascadia's linked LFO system. You will explore rate ranges, polyrhythmic dividers, and how LFOs create movement in patches when routed to pitch, filter, and pulse width destinations.
