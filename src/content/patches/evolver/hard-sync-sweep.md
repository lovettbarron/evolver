---
name: "Hard Sync Sweep"
type: lead
session_origin: 5
description: "Classic Prophet-style hard sync lead with envelope sweep on the slave oscillator frequency -- aggressive, biting attack tone."
tags: [lead, sync, prophet, sweep, classic, aggressive]
instrument: evolver
created: "2026-01-18"
---

# Hard Sync Sweep

> [!tip] Playing Tips
> Play melodic lines and listen for the aggressive bite on each note attack. The ENV 3 sweep creates a timbral arc from bright to dark. Try adding velocity expression (ENV 3 Velocity = 60) so harder playing produces more dramatic sync sweeps. Add Osc Slop = 3 for vintage character.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Sync 2->1 | ON |
| Osc 1 Shape | Pulse 50 |
| Osc 1 Level | 50 |
| Osc 1 Frequency | C2 |
| Osc 2 Level | 0 |
| Osc 3 Level | 0 |
| Osc 4 Level | 0 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 3 Destination | O1F |
| ENV 3 Amount | 67 |
| ENV 3 Attack | 15 |
| ENV 3 Decay | 87 |
| ENV 3 Sustain | 0 |
| ENV 3 Release | 0 |

> [!note] Technique Notes
> Hard sync forces Osc 1 to restart every time Osc 2's waveform resets (Anu Kirk p.17-21). When Osc 1 is set higher than Osc 2 (C2 vs C0), the pitch stays locked to Osc 2's frequency while the timbre becomes harmonically complex. ENV 3 sweeps Osc 1's frequency (O1F) with Amount 67, Attack 15, and a long Decay 87 -- this produces the signature Prophet-5 sync sound: an aggressive bite on the attack that gradually settles to a simpler tone. Only Osc 1 is heard (others at Level 0).
