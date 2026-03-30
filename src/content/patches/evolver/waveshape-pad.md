---
name: "Waveshape Pad"
type: pad
session_origin: 29
description: "Evolving digital pad using waveshape morphing on digital oscillators layered with detuned analog saws."
tags: [pad, waveshape, evolving, digital, analog-digital, layers]
instrument: evolver
created: "2026-02-15"
---

# Waveshape Pad

> [!tip] Playing Tips
> Hold a note for 20+ seconds to hear the waveshape morphing in action. The tone character slowly changes as the LFOs sweep through different digital waveshapes underneath the analog layer. No two moments sound identical. Filter Split at 15 adds subtle stereo separation.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Shape | Saw |
| Osc 1 Level | 30 |
| Osc 1 Fine | +3 |
| Osc 2 Shape | Saw |
| Osc 2 Level | 30 |
| Osc 2 Fine | -3 |
| Osc 3 Shape | 15 |
| Osc 3 Level | 35 |
| Osc 4 Shape | 22 |
| Osc 4 Level | 35 |
| Osc Slop | 2 |

### LFOs
| Parameter | Value |
|-----------|-------|
| LFO 1 Shape | Tri |
| LFO 1 Frequency | 3 |
| LFO 1 Amount | 20 |
| LFO 1 Destination | O3S |
| LFO 2 Shape | Tri |
| LFO 2 Frequency | 2 |
| LFO 2 Amount | 15 |
| LFO 2 Destination | O4S |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 70 |
| Resonance | 20 |
| 4-Pole | ON |
| Env Amount | 15 |
| Key Amount | 72 |
| Filter Split | 15 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 1 Attack | 35 |
| ENV 1 Decay | 60 |
| ENV 1 Sustain | 55 |
| ENV 1 Release | 50 |
| ENV 2 Attack | 45 |
| ENV 2 Decay | 0 |
| ENV 2 Sustain | 100 |
| ENV 2 Release | 50 |

### Effects
| Parameter | Value |
|-----------|-------|
| Delay 1 Time | 4 Steps |
| Delay 1 Level | 25 |
| Feedback 1 | 30 |

> [!note] Technique Notes
> This pad layers analog and digital oscillators. The analog saws (detuned +3/-3) provide a warm foundation, while the digital oscillators (Shapes 15 and 22) add complex harmonic content. Very slow LFOs (Freq 3 and 2) morph the digital waveshapes over time, gradually shifting the harmonic content so the pad never sounds static. Filter Split at 15 creates subtle stereo separation between the L and R filter cutoffs for additional width.
