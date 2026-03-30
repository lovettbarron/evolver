---
name: "Sync Lead"
type: lead
session_origin: 28
description: "Aggressive Prophet-style hard sync lead with envelope-swept harmonics and mod wheel expression."
tags: [lead, sync, aggressive, prophet, performance]
instrument: evolver
created: "2026-02-12"
---

# Sync Lead

> [!tip] Playing Tips
> Use the mod wheel to darken the sound (mapped to filter with negative amount). Apply aftertouch for vibrato -- pressure activates LFO 1 routed to pitch. Play with varying velocity: harder playing opens the filter more (Filter Velocity = 35). This lead cuts through any mix.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Sync 2->1 | ON |
| Osc 1 Shape | Pulse 50 |
| Osc 1 Level | 55 |
| Osc 1 Frequency | C2 |
| Osc 2 Shape | Saw |
| Osc 2 Level | 0 |
| Osc 3 Level | 0 |
| Osc 4 Level | 0 |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 85 |
| Resonance | 25 |
| 4-Pole | ON |
| Env Amount | 30 |
| ENV 1 Decay | 60 |
| ENV 1 Sustain | 40 |
| Filter Velocity | 35 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 2 Attack | 5 |
| ENV 2 Decay | 0 |
| ENV 2 Sustain | 100 |
| ENV 2 Release | 25 |
| ENV 3 Destination | O1F |
| ENV 3 Amount | 67 |
| ENV 3 Attack | 15 |
| ENV 3 Decay | 87 |
| ENV 3 Sustain | 0 |
| ENV 3 Release | 20 |

### Expression
| Parameter | Value |
|-----------|-------|
| Mod Wheel Destination | FiL |
| Mod Wheel Amount | -60 |
| Pressure Destination | LF1A |
| Pressure Amount | 30 |
| LFO 1 Shape | Tri |
| LFO 1 Frequency | 50 |
| LFO 1 Amount | 0 |
| LFO 1 Destination | OAF |

> [!note] Technique Notes
> Hard sync forces Osc 1 to restart every time Osc 2 resets, creating complex harmonics at a locked pitch. Osc 1 is set above Osc 2 (C2 vs C0) to produce the timbral complexity. ENV 3 sweeps Osc 1's frequency (O1F) with a slow decay (87) for a pronounced attack sweep -- this is the classic Prophet-5 sync sound. The mod wheel darkens the sound by closing the filter (negative amount), and aftertouch adds vibrato by controlling LFO 1 amount routed to all oscillator frequencies.
