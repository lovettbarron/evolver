# Octatrack Patches

Patches for the Octatrack are documented differently than synthesizer patches. Since the OT is a sampler/sequencer, a "patch" is really a **project state**: a combination of samples, machine assignments, effects, scenes, and pattern data.

## Naming Convention

- `basic-project.md` — The reference starting state (clean project, Track 1 with sample)
- `exercise-XX-description.md` — Project states from session exercises
- `composition-description.md` — Compositions created using the full workflow
- `performance-description.md` — Live set configurations

## Patch Format

```markdown
# [Patch/Composition Name]

**Session**: XX | **Bank**: X | **Type**: composition/performance/exercise

## Description
One sentence: what this sounds like and when you'd use it.

## Sample List
| Slot | Sample | Type | Notes |
|------|--------|------|-------|
| Flex 01 | kick-808.wav | Drums | Main kick |

## Track Configuration
| Track | Machine | Sample | FX1 | FX2 |
|-------|---------|--------|-----|-----|
| T1 | Flex | kick-808 | Compressor | None |

## Pattern Map
| Pattern | Part | Description |
|---------|------|-------------|
| A01 | 1 | Intro — sparse |

## Scene Notes
Scene B: [what it does]

## Performance Tips
How to perform this live (crossfader gestures, mute sequences, etc.)

## Tags
#octatrack #[type]
```
