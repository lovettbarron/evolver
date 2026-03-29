# Evolver

A structured system for deeply learning electronic instruments — starting with the Dave Smith Mono Evolver. Built around micro-sessions (15-30 min) with clear outcomes and shareable output.

## What This Is

A **35-session curriculum** for mastering the Mono Evolver, built on a **reusable framework** that works for any synthesizer, drum machine, or electronic instrument. Each session has a single focused objective and produces something tangible — a patch, a technique, a recording snippet.

The framework is designed for **focused micro-sessions**: zero startup friction, immediate hands-on within 2 minutes, visible progress tracking, and a hard stop at 30 minutes. See [framework/adhd-design.md](framework/adhd-design.md) for the design rationale.

## Web App

A Next.js companion app lets you browse sessions, view instrument details, and track your progress. Run it locally:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── framework/                    # Reusable learning methodology
│   ├── README.md                 # Framework overview & principles
│   └── adhd-design.md            # Session design decisions
├── instruments/evolver/          # Evolver-specific reference
│   ├── overview.md               # Architecture, capabilities, identity
│   ├── signal-flow.md            # Audio path diagram
│   ├── basic-patch.md            # Home base patch (full parameter dump)
│   └── modules.md                # 10-module curriculum map
├── sessions/evolver/             # The actual learning sessions
├── patches/evolver/              # Documented patches with full values
├── obsidian/                     # Templates for Obsidian vault integration
├── references/                   # Source manuals (PDFs)
├── src/                          # Next.js web application
│   ├── app/                      # App router pages
│   ├── components/               # UI components
│   └── lib/                      # Data helpers and utilities
└── CLAUDE.md                     # Project context for AI sessions
```

## Learning Path

35 sessions across 10 modules. At 3-4 sessions per week, this is a ~10 week program.

| Module | Sessions | Focus | You'll Build |
|--------|----------|-------|-------------|
| 1. Foundations | 01-02 | Navigation, basic patch, factory tour | Confidence with the interface |
| 2. Analog Oscillators | 03-06 | Waveshapes, PWM, hard sync, detuning | PWM strings, sync lead, fat patches |
| 3. Digital Oscillators | 07-10 | Waveshapes, FM, ring mod, hybrid layers | FM bells, metallic textures, hybrid sounds |
| 4. Filters & Envelopes | 11-14 | LPF, HPF, ADSR, stereo split | Plucks, pads, acid bass, split stereo |
| 5. Modulation | 15-18 | LFOs, mod slots, expression, stacking | Evolving textures, expressive patches |
| 6. Effects | 19-21 | Delay, feedback, Karplus-Strong, distortion | Rhythmic delay, plucked strings, dirt |
| 7. Sequencer | 22-26 | Steps, pitch, parameter mod, multi-track | Basslines, generative patches, drum beats |
| 8. Sound Design | 27-30 | Bass, leads, pads, drums from scratch | 12+ recipe patches for compositions |
| 9. Performance | 31-32 | Expression mapping, external processing | Performance-ready setups |
| 10. Integration | 33-35 | DAW workflow, mixing, composition | Songs with Evolver as primary voice |

## Session Design

Every session follows these rules:
- **One objective**, stated in one sentence
- **2-minute warm-up** — you're making sound immediately, not reading
- **Specific parameter values** — no "explore freely"
- **15-30 minute hard stop** — consistency over intensity
- **Tangible output** — a saved patch, a documented technique, something you can point to
- **5-minute minimum viable session** — for low-energy days
- **No calendar dates** — sessions are sequenced, not scheduled

## Extending to Other Instruments

This framework is designed to be reused. To add a new instrument:

1. Create `instruments/<name>/` with overview, signal flow, basic patch, and module map
2. Map the instrument's features to the [Module Taxonomy](framework/README.md#module-taxonomy)
3. Write sessions following the [session template](framework/README.md#session-template)
4. Add an instrument tracker to your Obsidian vault

## Key References

The session curriculum references two key sources (not included in this repo — obtain your own copies):

- **DSI Mono Evolver Manual v1.3** — Official operation manual (available from Sequential)
- **The Definitive Guide to Evolver** by Anu Kirk — Pedagogical, exercise-based guide

Place PDFs in `references/` if you want the web app to serve them locally.

## License

[MIT](LICENSE)
