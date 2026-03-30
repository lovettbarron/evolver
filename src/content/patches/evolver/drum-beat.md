---
name: "Drum Beat"
type: sequence
session_origin: 30
description: "Complete drum pattern using the 4-track sequencer to morph a single patch into kick, snare, and hat sounds per step."
tags: [sequence, drums, sequencer, pattern, beat, percussion]
instrument: evolver
created: "2026-02-18"
---

# Drum Beat

> [!tip] Playing Tips
> Set Trigger Select to "Seq Only" and press START/STOP to hear the pattern. The sequencer modulates filter, resonance, and noise to create different drum characters on each step. Adjust BPM (default 120) to taste. Try BPM = 80 with Clock Divide = 8th for a half-time feel. Add Distortion = 12 for weight.

## Key Parameters

### Oscillators
| Parameter | Value |
|-----------|-------|
| Osc 3 Shape | 1 (sine) |
| Osc 3 Level | 30 |
| Osc 3 Frequency | C2 |
| Osc 4 Shape | 1 (sine) |
| Osc 4 Level | 0 |
| Osc 4 Frequency | E3 |
| FM 4->3 | 20 |
| Noise Volume | 40 |

### Filter
| Parameter | Value |
|-----------|-------|
| LPF Frequency | 60 |
| Resonance | 50 |
| 4-Pole | ON |
| HPF Frequency | 20 |
| Env Amount | 70 |

### Envelopes
| Parameter | Value |
|-----------|-------|
| ENV 1 Attack | 0 |
| ENV 1 Decay | 20 |
| ENV 1 Sustain | 0 |
| ENV 1 Release | 5 |
| ENV 2 Attack | 0 |
| ENV 2 Decay | 18 |
| ENV 2 Sustain | 0 |
| ENV 2 Release | 5 |

### Sequencer
| Parameter | Value |
|-----------|-------|
| BPM | 120 |
| Clock Divide | 16th |
| Trigger Select | Seq Only |

#### Track 1 -- Filter Cutoff (Dest: FiL)
| Step | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
|------|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|-----|
| Value | 30 | oFF | 90 | 90 | 65 | oFF | 90 | oFF | 30 | 90 | 90 | 65 | 30 | oFF | 90 | 65 |

Step 17 = rST

#### Track 2 -- Resonance (Dest: RES)
| Step | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
|------|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|-----|
| Value | 90 | oFF | 5 | 5 | 20 | oFF | 5 | oFF | 90 | 5 | 5 | 20 | 90 | oFF | 5 | 20 |

Step 17 = rST

#### Track 3 -- Noise Volume (Dest: NoV)
| Step | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
|------|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|-----|
| Value | 10 | oFF | 70 | 60 | 80 | oFF | 60 | oFF | 10 | 60 | 60 | 80 | 10 | oFF | 60 | 80 |

Step 17 = rST

### Effects
| Parameter | Value |
|-----------|-------|
| Distortion | 12 |
| Delay 1 Time | 3 Steps |
| Delay 1 Level | 15 |

> [!note] Technique Notes
> This patch demonstrates the Evolver as a one-voice drum machine. A single patch is morphed into different drum characters on each sequencer step by modulating three parameters simultaneously: filter cutoff (low = kick, mid = snare, high = hat), resonance (high for kick self-oscillation, low for hats), and noise volume (low for kick, high for snare/hat). Kicks land on steps 1, 9, 13 (low filter, high resonance, low noise). Snares on steps 5, 12, 16 (mid filter, some noise). Hats fill in between (high filter, low resonance, high noise).
