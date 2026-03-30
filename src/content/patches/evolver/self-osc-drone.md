---
name: "Self-Oscillating Drone"
type: texture
session_origin: 13
description: "Ethereal, watery drone using the self-oscillating filter as a sine wave oscillator with noise texture and keyboard tracking."
tags: [texture, drone, self-oscillation, filter, ethereal, experimental]
instrument: evolver
created: "2026-01-28"
---

# Self-Oscillating Drone

> [!tip] Playing Tips
> Play notes across the full keyboard range -- the self-oscillating filter tracks your notes via MIDI Note routing. The noise adds a pitched, tonal texture shaped by the extreme resonance. Try adding Filter Split = 30 to hear two different pitched filter tones from each channel. For ethereal swoops, use ENV 1 with long Attack (78) and Decay (98).

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Level | 0 |
| Osc 2 Level | 0 |
| Osc 3 Level | 0 |
| Osc 4 Level | 0 |
| Noise Volume | 50 |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 0 |
| Resonance | 100 |
| 4-Pole | ON |

### Modulation
| Parameter | Value |
|-----------|-------|
| Mod Slot 1 Source | Nno (MIDI Note) |
| Mod Slot 1 Amount | 99 |
| Mod Slot 1 Destination | FiL |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 2 Attack | 0 |
| ENV 2 Decay | 70 |
| ENV 2 Sustain | 0 |
| ENV 2 Release | 30 |

> [!note] Technique Notes
> This patch uses no oscillators -- all sound comes from the self-oscillating filter (Anu Kirk p.45-48). In 4-pole mode with Resonance at 100, the filter's feedback generates a pure sine tone at the cutoff frequency. MIDI Note Number routed to filter frequency (Mod Slot 1, Amount 99) makes the filter playable from the keyboard. LPF Frequency is set to 0 as the base, with the mod slot providing all pitch tracking. Noise Volume at 50 adds texture -- the extreme resonance shapes the noise into a pitched, tonal quality described by Anu Kirk as "ethereal, mysterious, almost watery."
