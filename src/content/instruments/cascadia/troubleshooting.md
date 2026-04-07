---
type: troubleshooting
instrument: cascadia
title: "Cascadia Troubleshooting Guide"
---

## No Audio Output

- [ ] **VCA LEVEL** knob is above 30% — this is the final amplifier stage; if it's at zero, nothing passes through
- [ ] **Mixer** has at least one source level above 0 — raise the VCO A, SUB, or NOISE slider to feed signal into the chain
- [ ] **VCF FREQ** is not fully closed (above 10%) — a closed filter removes all harmonics and most fundamental
- [ ] **Audio cable** is in the correct output — use rear LINE OUT for speakers or PHONES OUT for headphones
- [ ] **VCA CV normalled connection** is intact — if a cable is patched into the VCA CV input jack, that cable must carry a gate/envelope signal; removing the cable restores the normalled Envelope A connection

## No Output from Patch Point

- [ ] **Cable is fully inserted** — a half-inserted cable breaks the normalled connection without making contact with the new source
- [ ] **Correct jack type** — output jacks are filled white, input jacks are dark; patching an output into an output produces no signal
- [ ] **Source module is generating signal** — check that the upstream module is active (e.g., LFO rate is up, envelope is being triggered)
- [ ] **Attenuator/attenuverter** in the signal path is above 0 — check any inline level controls between source and destination
- [ ] **Normalled connection is intentionally broken** — inserting any cable into a normalled input disconnects the internal wiring; if the patch point seems dead, verify your new routing replaces what was normalled

## Unexpected Sound Behavior

- [ ] **VCF MODE** is set to the expected type — LP4, LP1, BP, HP, Notch, and Phaser all sound dramatically different on the same patch
- [ ] **Wave Folder SYMMETRY and SHAPE** are at noon for a neutral starting point — off-center settings add harmonics and asymmetry
- [ ] **VCO FINE TUNE** is near center — small drift from noon is normal on analog oscillators, but large offsets detune noticeably
- [ ] **Multiple modulation sources** may be summing at one destination — check what cables and normalled connections feed the same CV input
- [ ] **Mixer SUB TYPE** switch is in the expected position — Sub (sub-oscillator) and Noise produce very different timbral results

## Modulation Routing Issues

- [ ] **Attenuverter knob position** determines polarity and depth — noon = zero, clockwise = positive, counter-clockwise = inverted; a knob at noon passes nothing
- [ ] **LFO RATE** is not at minimum — a stopped LFO produces a static voltage, not modulation
- [ ] **Envelope ATTACK and RELEASE** are not at extremes unless intended — very long attack means modulation ramps slowly; very long release means it lingers after the gate ends
- [ ] **S&H RATE** is above 0 if using Sample & Hold — at zero the S&H clock is stopped and the output is frozen
- [ ] **CV cable is patched to the correct input** — FM and CV inputs are different jacks on most modules; patching into an output jack instead of an input produces no effect
