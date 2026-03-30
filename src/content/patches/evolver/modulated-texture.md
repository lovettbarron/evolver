---
name: "Modulated Texture"
type: texture
session_origin: 29
description: "Dense, constantly evolving texture using multiple modulation sources -- LFOs, mod slots, and FM -- stacked for organic movement."
tags: [texture, modulated, evolving, dense, multi-source, experimental]
instrument: evolver
created: "2026-02-15"
---

# Modulated Texture

> [!tip] Playing Tips
> Hold a note for 30+ seconds to experience the full evolution. The patch should constantly change -- filter moving, FM shifting, pulse width changing, stereo image drifting. No two moments sound identical. This is a "set it and forget it" texture that works as a background layer.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 1 Shape | Saw |
| Osc 1 Level | 35 |
| Osc 2 Shape | Pulse 50 |
| Osc 2 Level | 35 |
| Osc 2 Fine | +8 |
| Osc 3 Shape | 40 |
| Osc 3 Level | 30 |
| Osc 4 Shape | 55 |
| Osc 4 Level | 30 |
| FM 4->3 | 15 |
| Osc Slop | 4 |

### LFOs
| Parameter | Value |
|-----------|-------|
| LFO 1 Shape | Tri |
| LFO 1 Frequency | 4 |
| LFO 1 Amount | 15 |
| LFO 1 Destination | FiL |
| LFO 2 Shape | Tri |
| LFO 2 Frequency | 3 |
| LFO 2 Amount | 12 |
| LFO 2 Destination | FM4 |
| LFO 3 Shape | Random |
| LFO 3 Frequency | 8 |
| LFO 3 Amount | 5 |
| LFO 3 Destination | OAF |
| LFO 4 Shape | Tri |
| LFO 4 Frequency | 2 |
| LFO 4 Amount | 20 |
| LFO 4 Destination | PW1 |

### Modulation Slots
| Parameter | Value |
|-----------|-------|
| Mod Slot 1 Source | Osc 3 |
| Mod Slot 1 Amount | 8 |
| Mod Slot 1 Destination | PW2 |
| Mod Slot 2 Source | LFO 1 |
| Mod Slot 2 Amount | 10 |
| Mod Slot 2 Destination | SpL |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 60 |
| Resonance | 35 |
| 4-Pole | ON |
| Env Amount | 25 |
| Key Amount | 72 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 1 Attack | 50 |
| ENV 1 Decay | 70 |
| ENV 1 Sustain | 40 |
| ENV 1 Release | 55 |
| ENV 2 Attack | 55 |
| ENV 2 Decay | 0 |
| ENV 2 Sustain | 100 |
| ENV 2 Release | 55 |

### Effects
| Parameter | Value |
|-----------|-------|
| Delay 1 Time | 3 Steps |
| Delay 1 Level | 30 |
| Feedback 1 | 35 |
| Feedback 2 | 15 |
| Feedback Level | 20 |
| Feedback Frequency | 24 |

> [!note] Technique Notes
> This is the "everything at once" patch -- four LFOs, two mod slots, and FM all running simultaneously. LFO 1 moves the filter, LFO 2 modulates FM amount, LFO 3 adds random pitch drift, and LFO 4 sweeps pulse width. Mod Slot 1 uses Osc 3 as an audio-rate modulation source for Osc 2's pulse width, while Mod Slot 2 drives filter split from LFO 1 for stereo movement. The key is keeping individual modulation amounts subtle so they combine into organic complexity without chaos.
