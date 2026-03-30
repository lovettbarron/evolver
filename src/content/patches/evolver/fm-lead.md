---
name: "FM Lead"
type: lead
session_origin: 28
description: "Bright, bell-like FM lead with velocity-sensitive complexity -- soft playing is warm, hard playing is bright and complex."
tags: [lead, fm, bell, velocity, digital, performance]
instrument: evolver
created: "2026-02-12"
---

# FM Lead

> [!tip] Playing Tips
> Velocity controls FM amount -- play softly for warm, simple tones and hard for bright, complex FM character. The mod wheel adds even more FM complexity on demand. Apply aftertouch for subtle pitch vibrato. This lead responds dynamically to your playing intensity.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Level | 0 |
| Osc 2 Level | 0 |
| Osc 3 Shape | 1 (sine) |
| Osc 3 Level | 55 |
| Osc 3 Frequency | C0 |
| Osc 4 Shape | 3 (square-ish) |
| Osc 4 Level | 20 |
| Osc 4 Frequency | C1 |
| FM 4->3 | 35 |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 90 |
| Resonance | 15 |
| Env Amount | 25 |
| ENV 1 Decay | 55 |
| ENV 1 Sustain | 50 |
| Key Amount | 72 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 2 Attack | 3 |
| ENV 2 Decay | 0 |
| ENV 2 Sustain | 100 |
| ENV 2 Release | 30 |

### Modulation & Expression
| Parameter | Value |
|-----------|-------|
| Mod Slot 1 Source | Vel (Velocity) |
| Mod Slot 1 Amount | 40 |
| Mod Slot 1 Destination | FM4 |
| Mod Wheel Destination | FM4 |
| Mod Wheel Amount | 50 |
| Pressure Destination | OAF |
| Pressure Amount | 15 |
| LFO 1 Shape | Tri |
| LFO 1 Frequency | 50 |
| LFO 1 Amount | 8 |
| LFO 1 Destination | OAF |

> [!note] Technique Notes
> FM lead uses a 2:1 frequency ratio (Osc 4 at C1, Osc 3 at C0) which produces harmonic overtones in octave relationships -- the basis of bell-like timbres. Velocity is routed to FM amount via Mod Slot 1, making harder playing produce more complex FM harmonics. Osc 4 is audible at Level 20, adding a subtle second partial to the sound. The filter is nearly wide open (90) to let the FM harmonics through, with just enough envelope shaping to add movement.
