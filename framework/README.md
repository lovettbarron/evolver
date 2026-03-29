# Instrument Deep Learning Framework

A structured methodology for deeply learning any electronic instrument — synthesizers, drum machines, effects units, or modular systems. Designed for people who buy gear they love but don't go deep enough to use it fluently in compositions.

**See also**: [adhd-design.md](adhd-design.md) — ADHD-specific design rationale that shapes every session.

## The Problem

You buy an instrument. You love the sounds. You noodle. You never truly learn it. It sits underused while you reach for the familiar. This framework fixes that.

## Core Principles

### 1. Isolation Before Integration
Learn each subsystem in isolation before combining. You can't debug a patch if you don't know what each component does independently.

### 2. Basic Patch as Home Base
Every instrument needs a "basic patch" — a minimal, known-good starting state that isolates the thing you're studying. Always return here before exploring a new concept.

### 3. Micro-Sessions with Tangible Output
Sessions are 15-30 minutes. Every session ends with something concrete: a documented patch, a technique you can name, a recording snippet, or a composition element. No noodling sessions.

### 4. Progressive Complexity
Follow the signal flow. Start with oscillators (sound generation), move to filters (sound shaping), then modulation (movement), then effects (space), then sequencer (pattern), then integration (composition). Each layer builds on the last.

### 5. Spaced Repetition Through Warm-Ups
Each session begins with a 2-3 minute warm-up that reinforces the previous session's concept. This prevents the "I learned this last week but forgot" problem.

### 6. Document Everything
Patches are ephemeral if undocumented. Every patch worth saving gets a full parameter dump. Every technique gets a name and a description. This builds your personal reference library.

### 7. Composition-Driven Goals
The endgame is always "use this in a song." Sessions progress from isolated exercises to compositional applications. The final modules are always about integration with your DAW and existing workflow.

## Framework Structure

### For Each Instrument

```
instruments/<name>/
├── overview.md          # What this instrument is, architecture, signal flow
├── signal-flow.md       # Visual/textual signal flow diagram
├── parameters.md        # Complete parameter reference (from manual)
├── basic-patch.md       # The "home base" patch with all parameter values
└── modules.md           # Learning module sequence with dependencies

sessions/<name>/
├── 01-foundations-*.md   # Module 1 sessions
├── 02-oscillators-*.md   # Module 2 sessions
├── ...
└── XX-integration-*.md   # Final integration module

patches/<name>/
├── basic-patch.md        # The reference basic patch
├── exercise-*.md         # Patches created during exercises
└── song-*.md             # Patches used in actual compositions
```

### Module Taxonomy

Every instrument maps to this module sequence (skip what doesn't apply):

| # | Module | Focus | Prerequisite |
|---|--------|-------|-------------|
| 1 | Foundations | Basic operation, navigation, saving/loading | None |
| 2 | Sound Sources | Oscillators, noise, samples, external input | 1 |
| 3 | Sound Shaping | Filters, waveshaping, distortion | 2 |
| 4 | Envelopes | ADSR, amplitude, time-based shaping | 2 |
| 5 | Modulation | LFOs, mod matrix, velocity, aftertouch | 3, 4 |
| 6 | Effects | Delay, reverb, chorus, distortion | 3 |
| 7 | Sequencer/Arp | Step sequencer, arpeggiator, pattern | 5 |
| 8 | Sound Design | Combining everything, recipe-based patches | 5, 6 |
| 9 | Performance | Live playing techniques, expression, MIDI | 8 |
| 10 | Integration | DAW workflow, recording, using in songs | 8, 9 |

### Session Template

Every session follows this structure:

```markdown
# Session XX: [Topic]
Module: [module name] | Duration: [15-30] min | Prerequisite: [session #]

## Objective
One sentence: what you will be able to do after this session.

## Warm-Up (2-3 min)
Quick exercise reinforcing the previous session's concept.

## Setup
Starting patch state (basic patch or specified modifications).

## Exercises
Numbered steps with specific parameter values and expected results.

## Exploration Prompts
"Try this..." suggestions for going beyond the exercise.

## Session Output
What to save/document before ending:
- [ ] Patch saved? (name and location)
- [ ] Technique documented?
- [ ] Obsidian daily note updated?

## Next Session Preview
One sentence about what's coming next and why it builds on this.
```

## Adding a New Instrument

1. Create `instruments/<name>/overview.md` — read the manual, document architecture
2. Create `instruments/<name>/signal-flow.md` — trace the audio path
3. Create `instruments/<name>/basic-patch.md` — define your home base
4. Create `instruments/<name>/modules.md` — map the module taxonomy to this instrument's features
5. Create sessions following the module sequence
6. Add Obsidian templates if needed

## Progress Tracking

Progress is tracked in an Obsidian vault through:
- **Daily notes**: Session log entries with tags
- **Instrument progress notes**: Per-instrument tracker with module completion
- **Patch library**: Linked notes for documented patches

See `obsidian/` for templates.

## Philosophy

This framework exists because deep learning of an instrument requires:
- **Structure** to prevent aimless noodling
- **Accountability** to maintain momentum across sessions
- **Documentation** to compound knowledge
- **Composition focus** to ensure learning serves music-making

The goal is never "know every parameter." The goal is "reach for this instrument confidently when making music, and know how to get the sound in your head out of it."
