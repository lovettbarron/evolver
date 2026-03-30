---
name: "FM Hi-Hat"
type: drum
session_origin: 30
description: "Bright, short hi-hat using filtered noise with optional FM metallic ring -- closed and open hat variations via envelope decay."
tags: [drum, hi-hat, noise, bright, percussion, fm]
instrument: evolver
created: "2026-02-18"
---

# FM Hi-Hat

> [!tip] Playing Tips
> For a closed hi-hat, use the default short decay (ENV 2 Decay = 8). For an open hi-hat variation, increase ENV 2 Decay to 35 and Release to 20. Add Osc 3 Level = 15 and FM 4->3 = 45 for extra metallic ring on top of the noise.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Level | 0 |
| Osc 2 Level | 0 |
| Osc 3 Shape | 1 (sine) |
| Osc 3 Level | 0 |
| Osc 4 Shape | 1 (sine) |
| Osc 4 Level | 0 |
| Noise Volume | 70 |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 95 |
| Resonance | 5 |
| HPF Frequency | 60 |
| Env Amount | 15 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 1 Attack | 0 |
| ENV 1 Decay | 12 |
| ENV 1 Sustain | 0 |
| ENV 1 Release | 5 |
| ENV 2 Attack | 0 |
| ENV 2 Decay | 8 |
| ENV 2 Sustain | 0 |
| ENV 2 Release | 3 |

> [!note] Technique Notes
> Hi-hats are primarily noise shaped by filters and ultra-short envelopes. The highpass filter (HPF 60) removes all low-end content, leaving only bright noise. The lowpass filter is nearly wide open (95) to preserve the brightness. The VCA envelope is extremely short (Decay 8, Release 3) for the characteristic closed hat "tick". The Evolver's noise generator feeds both channels equally, and the HPF shapes it into the metallic brightness expected from hi-hats. Adding FM (Osc 3 + FM 4->3) layers metallic ring on top.
