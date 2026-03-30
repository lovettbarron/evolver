---
name: "FM Snare"
type: drum
session_origin: 30
description: "Sharp, metallic snare with noise body and FM transient -- the crack comes from envelope-controlled FM between digital oscillators."
tags: [drum, snare, noise, fm, metallic, percussion]
instrument: evolver
created: "2026-02-18"
---

# FM Snare

> [!tip] Playing Tips
> Increase Noise Volume for more body, decrease for more crack. Try different Osc 4 Frequency intervals for different metallic characters. Adjust ENV 2 Decay for snare length: 20 for tight, 35 for loose. The FM transient is strongest at the very start of each note.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Level | 0 |
| Osc 2 Level | 0 |
| Osc 3 Shape | 1 (sine) |
| Osc 3 Level | 35 |
| Osc 3 Frequency | C2 |
| Osc 4 Shape | 1 (sine) |
| Osc 4 Level | 0 |
| Osc 4 Frequency | E3 |
| FM 4->3 | 60 |
| Noise Volume | 55 |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 75 |
| Resonance | 10 |
| 4-Pole | ON |
| Env Amount | 40 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 1 Attack | 0 |
| ENV 1 Decay | 30 |
| ENV 1 Sustain | 0 |
| ENV 1 Release | 10 |
| ENV 2 Attack | 0 |
| ENV 2 Decay | 25 |
| ENV 2 Sustain | 0 |
| ENV 2 Release | 10 |
| ENV 3 Destination | FM4 |
| ENV 3 Amount | 70 |
| ENV 3 Attack | 0 |
| ENV 3 Decay | 15 |
| ENV 3 Sustain | 0 |
| ENV 3 Release | 5 |

> [!note] Technique Notes
> The snare combines two elements: noise provides the body (the "shhh" of the snare wires) and FM between digital oscillators provides the transient attack (the "crack"). Osc 4 at E3 modulating Osc 3 at C2 creates a non-harmonic interval that produces metallic, inharmonic overtones. ENV 3 controls the FM amount with an extremely fast decay (15) -- the FM is strongest at the very start of each note and disappears almost immediately, leaving only the noise tail.
