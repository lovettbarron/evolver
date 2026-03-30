---
name: "PWM Sweep"
type: texture
session_origin: 4
description: "Simple PWM sweep texture using two LFOs at different rates to modulate pulse width -- the foundation of analog string and pad sounds."
tags: [texture, pwm, sweep, strings, lfo, beginner]
instrument: evolver
created: "2026-01-15"
---

# PWM Sweep

> [!tip] Playing Tips
> Hold a sustained note for at least 10 seconds to hear the full swirling effect. The two LFOs at slightly different speeds (42 vs 32) create an ever-shifting organic texture that never quite repeats. Use the mod wheel to darken the sound (Mod Wheel closes the filter). This is your first taste of how modulation brings static sounds to life.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Shape | Pulse 52 |
| Osc 1 Level | 50 |
| Osc 2 Shape | Pulse 48 |
| Osc 2 Level | 50 |
| Osc 3 Level | 0 |
| Osc 4 Level | 0 |

### LFOs
| Parameter | Value |
|-----------|-------|
| LFO 1 Shape | Tri |
| LFO 1 Frequency | 42 |
| LFO 1 Amount | 30 |
| LFO 1 Destination | O1P |
| LFO 2 Shape | Tri |
| LFO 2 Frequency | 32 |
| LFO 2 Amount | 23 |
| LFO 2 Destination | O2P |
| LFO 3 Shape | Tri |
| LFO 3 Frequency | 5 |
| LFO 3 Amount | 14 |
| LFO 3 Destination | OAP |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 2 Attack | 61 |
| ENV 2 Release | 34 |

### Expression
| Parameter | Value |
|-----------|-------|
| Mod Wheel Destination | FiL |
| Mod Wheel Amount | -78 |

> [!note] Technique Notes
> This is the classic analog string sound from Session 04 (Anu Kirk p.13-15). Each LFO sweeps the pulse width of its oscillator at a different rate. Because LFO 1 (Freq 42) and LFO 2 (Freq 32) run at different speeds, the two oscillators are always slightly out of phase, creating rich movement. LFO 3 adds a slow, broad sweep underneath (Freq 5, Amount 14) for additional depth. The slow VCA attack (61) gives the string-like fade-in character.
