---
name: "FM Bass"
type: bass
session_origin: 27
description: "Metallic, punchy bass using FM between digital oscillators with envelope-controlled FM amount for complex attack."
tags: [bass, fm, metallic, digital, punchy]
instrument: evolver
created: "2026-02-10"
---

# FM Bass

> [!tip] Playing Tips
> Play in the C1-C3 range. The metallic attack comes from high FM at note onset that decays to a simpler tone. Try different Osc 4 frequency ratios: set Osc 4 to C1 (octave up) for a different harmonic series, or G0 for a 3:2 ratio. Add Distortion = 10 for extra grit.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Level | 0 |
| Osc 2 Level | 0 |
| Osc 3 Shape | 1 (sine) |
| Osc 3 Level | 55 |
| Osc 3 Frequency | C0 |
| Osc 4 Shape | 1 (sine) |
| Osc 4 Level | 0 |
| Osc 4 Frequency | C0 |
| FM 4->3 | 45 |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 55 |
| Resonance | 20 |
| 4-Pole | ON |
| Env Amount | 40 |
| Key Amount | 72 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 1 Attack | 0 |
| ENV 1 Decay | 50 |
| ENV 1 Sustain | 15 |
| ENV 1 Release | 15 |
| ENV 2 Attack | 0 |
| ENV 2 Decay | 35 |
| ENV 2 Sustain | 65 |
| ENV 2 Release | 15 |
| ENV 3 Destination | FM4 |
| ENV 3 Amount | 55 |
| ENV 3 Attack | 0 |
| ENV 3 Decay | 40 |
| ENV 3 Sustain | 10 |
| ENV 3 Release | 15 |

> [!note] Technique Notes
> FM bass uses Osc 4 as a modulator (Level 0 so it is not heard directly) modulating Osc 3's frequency at a ratio of 1:1 (both at C0). ENV 3 controls the FM amount over time -- high FM at note onset creates the metallic, complex attack, then the FM decays leaving a simpler sustained tone. The FM ratio (frequency relationship between oscillators) determines the harmonic character. Analog oscillators are silenced to keep this purely digital.
