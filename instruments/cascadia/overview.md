---
type: overview
instrument: cascadia
title: "Intellijel Cascadia"
manufacturer: "Intellijel"
---

# Intellijel Cascadia

## Identity

- **Manufacturer**: Intellijel
- **Type**: Semi-modular analog synthesizer
- **Format**: Desktop / Eurorack-compatible
- **Year**: 2022
- **Patch Points**: 90+
- **Modules**: 17 hardware modules

## Design Philosophy

Cascadia is rooted in West Coast synthesis heritage -- the Buchla-inspired tradition of wave folding, waveshaping, and complex timbral manipulation, as opposed to the East Coast subtractive approach of oscillator-into-filter. But Cascadia does not pick sides. It includes a full multimode VCF alongside its wave folder, giving you both synthesis paradigms in one instrument.

The semi-modular architecture means every important connection is pre-wired internally through **normalling**. With zero cables patched, Cascadia is a complete playable synthesizer: MIDI notes drive oscillators, envelopes shape amplitude and filter, and audio reaches the output. But every normalled connection can be overridden by patching a cable into the corresponding input jack. This makes Cascadia an instrument that plays with zero cables but rewards patching -- the more cables you add, the more you reshape its voice.

The normalling philosophy is deliberate: rather than requiring cables for basic operation (as a fully modular system would), Cascadia pre-wires the most musically useful default connections. Patching is additive exploration, not a prerequisite for sound.

## Panel Layout

The 17 hardware modules are arranged left to right across the panel:

1. **MIDI/CV** -- MIDI-to-CV conversion with 8 assignable outputs
2. **VCO A** -- Primary oscillator with through-zero FM, sync, and PWM
3. **VCO B** -- Secondary oscillator, switchable to LFO rates
4. **Envelope A** -- ADSR with Hold stage and velocity sensitivity
5. **Envelope B** -- Triple-mode function generator (Envelope / LFO / Burst)
6. **Line In** -- External audio input with level control
7. **Mixer** -- Combines VCO A waveforms, noise, sub-oscillator, and external inputs
8. **VCF** -- Multimode voltage-controlled filter (LP/BP/HP/Notch/Phaser)
9. **Wave Folder** -- Buchla-inspired waveform folding with symmetry control
10. **VCA A** -- Primary voltage-controlled amplifier
11. **Push Gate** -- Manual gate button for triggering envelopes
12. **Utilities** -- Sample & Hold, Slew Limiter / Envelope Follower, Mixuverter
13. **LFO X/Y/Z** -- Three rate-linked triangle LFOs with dividers
14. **Patchbay** -- Multiples, Summer, Inverter, Bi-to-Uni, Expression Source, Ring Modulator
15. **VCA B / LPF** -- Second VCA with integrated low-pass filter (Low Pass Gate mode)
16. **FX Send/Return** -- Effects loop for external pedals and stompboxes
17. **Output Control** -- Final output stage with drive, soft clip, and level

## Normalling Overview

Normalling means modules are pre-connected internally. Playing a MIDI note produces a complete voice -- oscillator through filter through amplifier to output -- with no cables. The MIDI/CV section converts note data to pitch and gate voltages, which drive the oscillators and envelopes. Envelope A shapes VCA A (amplitude), and the mixer feeds VCO A's output through the VCF and Wave Folder before reaching the output.

Patching a cable into a normalled input **breaks** that internal connection and substitutes your signal. For example, the VCF input is normalled from the Mixer. Patching a cable into VCF IN disconnects the Mixer and feeds whatever you patched instead. This lets Cascadia work as both a self-contained synth and a modular patch canvas.

[View full signal flow diagram](/instruments/cascadia/signal-flow)

## What You Can Do With It

- **West Coast timbres** -- Waveshaping and wave folding via the dedicated Wave Folder, creating harmonically rich sounds without traditional filtering
- **East Coast subtractive** -- Classic oscillator-into-filter with the multimode VCF (8 filter types including self-oscillating LP, BP, HP, Notch, and Phaser)
- **FM synthesis** -- VCO A supports both exponential and through-zero linear FM, with VCO B normalled as the modulator
- **Complex modulation** -- Triple-mode Envelope B (Envelope / LFO / Burst Generator), three utility LFOs, and extensive CV routing
- **Effects processing** -- External audio input via Line In, plus a dedicated FX Send/Return loop for integrating pedals anywhere in the signal chain
- **Self-patching for generative sounds** -- With 90+ patch points, feedback loops and cross-modulation create evolving, self-playing textures
- **Ring modulation** -- Built-in ring modulator with VCO A and VCO B sine waves as default inputs, producing metallic and inharmonic timbres

## Make a Sound

This is a quick orientation to get sound out of Cascadia. The full walkthrough is in the curriculum Module 1.

1. **Connect MIDI and audio** -- Plug a MIDI keyboard into the rear MIDI IN jack (or USB MIDI port). Connect the rear LINE OUT to your speakers or headphones to the PHONES OUT jack.
2. **Power on** -- Flip the rear power switch. With all sliders down and the default normalling active, you should hear VCO A's output through the normalled signal path.
3. **Play notes** -- Press keys on your MIDI controller. Pitch tracks via MIDI through the normalled connection to VCO A and VCO B.
4. **Shape the pulse width** -- Raise VCO A's PW MOD slider. LFO Y is normalled to this input, so you will hear the pulse width modulating automatically.
5. **Add the sub-oscillator** -- In the Mixer section, raise the SUB slider to blend in a sub-oscillator one or two octaves below VCO A.
6. **Sweep the filter** -- Move the VCF FREQ slider to hear the filter open and close across the frequency range.
7. **Shape the note** -- Adjust Envelope A's ATTACK, DECAY, SUSTAIN, and RELEASE sliders. Envelope A is normalled to VCA A, so these controls shape every note's amplitude.

This is just orientation -- the full walkthrough is in the curriculum Module 1.

[Explore all modules](/instruments/cascadia/modules)
