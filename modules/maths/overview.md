---
type: overview
instrument: maths
title: "Maths Overview"
manufacturer: "Make Noise"
---

# Make Noise Maths

*Analog computer for control voltage*

**20HP** | Function Generator, Envelope Generator, Modulator

## Architecture

Maths is a four-channel analog function generator built around two pairs of complementary circuits. Channels 1 and 4 are full-featured analog function generators, each with independently adjustable Rise and Fall times, a continuously variable response curve (Vari-Response), and a Cycle mode that turns the function generator into a self-oscillating LFO or audio-rate oscillator. Channels 2 and 3 are simple attenuverters -- they scale, invert, or offset any voltage you feed them.

Each channel processes or generates voltage independently. Channels 1 and 4 can be triggered externally via gate or trigger inputs to produce envelopes, or they can self-cycle to produce LFOs and oscillators. The Signal IN jack on each channel provides a direct-coupled input for slew limiting (portamento), lag processing, and ASR (attack-sustain-release) envelope behavior. The Rise and Fall times span an enormous range -- from sub-millisecond audio-rate oscillation to 25-minute glacial sweeps.

Three bus outputs combine all four channels automatically and are always active. The OR output provides the highest voltage present across all four channels at any moment. The SUM output adds all four channel outputs together. The INV output is the inverted SUM -- whatever SUM produces, INV produces the opposite polarity. These buses give you free mixing, voltage combining, and polarity inversion without any patching.

Channels 1 and 4 each provide a timing trigger output. Channel 1 outputs an End-of-Rise (EOR) trigger pulse at the moment its voltage reaches the peak of the rise stage. Channel 4 outputs an End-of-Cycle (EOC) trigger pulse at the end of its complete rise-then-fall cycle. These triggers enable cascading envelopes, clock division, complex timing relationships, and self-patching logic where one channel's completion triggers another's start.

## Controls Reference

### Channel 1

| Control | Type | Range | Function |
|---------|------|-------|----------|
| Rise | Knob | ~0.5ms to 25 min | Sets rise time of voltage function |
| Fall | Knob | ~0.5ms to 25 min | Sets fall time of voltage function |
| Vari-Response | Knob | Log to Exp | Shapes response curve (logarithmic to linear to exponential) |
| Attenuverter | Knob | -1 to +1 | Scales and/or inverts channel output |
| Cycle | Button + LED | On/Off | Enables self-cycling (LFO mode) |
| Signal IN | Jack | -10V to +10V | Direct-coupled input for slew/lag/ASR |
| Trigger IN | Jack | Gate/Pulse | Triggers envelope regardless of Signal IN |
| Rise CV | Jack | CV | Voltage control of rise time |
| Fall CV | Jack | CV | Voltage control of fall time |
| Both CV | Jack | CV | Controls both rise and fall time simultaneously |
| Cycle IN | Jack | Gate | External cycle enable/disable |
| Unity OUT | Jack | 0-8V | Full-scale unattenuated output |
| EOR OUT | Jack | Gate | End-of-rise trigger pulse |
| Variable OUT | Jack | Scaled | Attenuverter-scaled output |

### Channels 2 and 3

| Control | Type | Range | Function |
|---------|------|-------|----------|
| Attenuverter | Knob | -1 to +1 | Scales and/or inverts input voltage |
| Signal IN | Jack | -10V to +10V | Input voltage to be processed |
| Variable OUT | Jack | Scaled | Attenuverter-scaled output |

### Channel 4

| Control | Type | Range | Function |
|---------|------|-------|----------|
| Rise | Knob | ~0.5ms to 25 min | Sets rise time of voltage function |
| Fall | Knob | ~0.5ms to 25 min | Sets fall time of voltage function |
| Vari-Response | Knob | Log to Exp | Shapes response curve (logarithmic to linear to exponential) |
| Attenuverter | Knob | -1 to +1 | Scales and/or inverts channel output |
| Cycle | Button + LED | On/Off | Enables self-cycling (LFO mode) |
| Signal IN | Jack | -10V to +10V | Direct-coupled input for slew/lag/ASR |
| Trigger IN | Jack | Gate/Pulse | Triggers envelope regardless of Signal IN |
| Rise CV | Jack | CV | Voltage control of rise time |
| Fall CV | Jack | CV | Voltage control of fall time |
| Both CV | Jack | CV | Controls both rise and fall time simultaneously |
| Cycle IN | Jack | Gate | External cycle enable/disable |
| Unity OUT | Jack | 0-8V | Full-scale unattenuated output |
| EOC OUT | Jack | Gate | End-of-cycle trigger pulse |
| Variable OUT | Jack | Scaled | Attenuverter-scaled output |

### Buses

| Control | Type | Range | Function |
|---------|------|-------|----------|
| OR OUT | Jack | 0-8V | Highest voltage from all channels |
| SUM OUT | Jack | Bipolar | Sum of all channels |
| INV OUT | Jack | Bipolar | Inverted SUM |

## Basic Patch (Init State)

All sessions start from this known state. Set these positions before beginning any session.

| Control | Position | Result |
|---------|----------|--------|
| Ch1 Rise | 10 o'clock (~9:00) | ~50ms rise time |
| Ch1 Fall | 2 o'clock (~15:00) | ~200ms fall time |
| Ch1 Vari-Response | 12 o'clock (noon) | Linear response |
| Ch1 Attenuverter | Fully clockwise (+1) | Full positive output |
| Ch1 Cycle | Off (LED off) | Single-shot envelope mode |
| Ch2 Attenuverter | 12 o'clock (noon) | Unity pass-through |
| Ch3 Attenuverter | 12 o'clock (noon) | Unity pass-through |
| Ch4 Rise | 10 o'clock | ~50ms rise time |
| Ch4 Fall | 2 o'clock | ~200ms fall time |
| Ch4 Vari-Response | 12 o'clock | Linear response |
| Ch4 Attenuverter | Fully clockwise (+1) | Full positive output |
| Ch4 Cycle | Off (LED off) | Single-shot envelope mode |
| All cables | Removed | Clean start |

**What you should hear/see:** Sending a gate to Ch1 Trigger IN produces a smooth attack-decay envelope visible on the Ch1 Unity LED. The LED rises and falls smoothly. This is your home base.

## Sessions

See the [Sessions tab](/modules/maths/sessions/) for the complete Maths curriculum.

## Further Reading

- **Maths Illustrated Supplement** -- The most beginner-friendly introduction to what each section of Maths does. This visual walkthrough uses clear patch diagrams and step-by-step explanations to demonstrate every function generator capability. Available as a PDF from the Make Noise community and often bundled with the module.
- **Make Noise Maths Patch Guides** -- Official patch ideas and recipes from Make Noise covering envelope, LFO, slew, timing logic, and audio-rate applications. Available on the Make Noise website and included with the module. These provide tested starting points for exploring each capability.
- **Official Maths Manual** -- The complete technical reference covering all controls, specifications, and signal ranges. Essential for understanding exact voltage ranges and timing characteristics. Available from [Make Noise](https://www.makenoisemusic.com/modules/maths) or see `references/maths-manual.pdf`.
