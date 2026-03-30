---
name: "PWM Pad"
type: pad
session_origin: 29
description: "Lush, chorus-like pad using pulse width modulation on both analog oscillators for natural stereo movement."
tags: [pad, pwm, chorus, lush, analog, stereo]
instrument: evolver
created: "2026-02-15"
challenge_id: "29-1"
---

# PWM Pad

> [!tip] Playing Tips
> Hold notes for at least 10 seconds to hear the full PWM movement. The slow attack (40) means the sound fades in gradually -- allow time for the envelope to open. The two LFOs at different rates create an ever-shifting stereo image that never quite repeats.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Shape | Pulse 50 |
| Osc 1 Level | 50 |
| Osc 2 Shape | Pulse 50 |
| Osc 2 Level | 45 |
| Osc 2 Fine | +5 |
| Osc 3 Level | 0 |
| Osc 4 Level | 0 |
| Osc Slop | 3 |

### LFOs
| Parameter | Value |
|-----------|-------|
| LFO 1 Shape | Tri |
| LFO 1 Frequency | 6 |
| LFO 1 Amount | 35 |
| LFO 1 Destination | PW1 |
| LFO 2 Shape | Tri |
| LFO 2 Frequency | 5 |
| LFO 2 Amount | 30 |
| LFO 2 Destination | PW2 |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 65 |
| Resonance | 15 |
| 4-Pole | ON |
| Env Amount | 20 |
| Key Amount | 72 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 1 Attack | 30 |
| ENV 1 Decay | 50 |
| ENV 1 Sustain | 60 |
| ENV 1 Release | 45 |
| ENV 2 Attack | 40 |
| ENV 2 Decay | 0 |
| ENV 2 Sustain | 100 |
| ENV 2 Release | 45 |

### Effects
| Parameter | Value |
|-----------|-------|
| Delay 1 Time | 3 Steps |
| Delay 1 Level | 20 |
| Feedback 1 | 25 |

> [!note] Technique Notes
> PWM creates a natural chorus effect by constantly shifting the harmonic content of pulse waves. Each oscillator is modulated by a separate LFO at slightly different rates (6 vs 5), so the two oscillators are always slightly out of phase -- this creates rich, organic movement without any external chorus effect. The slight detuning (Fine +5) and Osc Slop (3) add further width. Slow envelopes (Attack 40, Release 45) define the pad character with gradual fade-in and fade-out.
