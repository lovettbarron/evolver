# Phase 10: Curriculum Modules 1-3 - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

9 Cascadia sessions across 3 learning modules (Foundations, Oscillators, Envelopes/Amplitude) with ADHD-paced design. Each session teaches a generalized synthesis concept using Cascadia as the hands-on vehicle, highlights Cascadia-unique features, and documents active normalled connections. Some sessions produce named patches with full cable routing and knob settings. Validates the session format for semi-modular instruments before committing to the full 25-session curriculum in Phase 11.

</domain>

<decisions>
## Implementation Decisions

### Module boundaries
- **D-01:** 3 modules with 3 sessions each (3-3-3 split)
- **D-02:** Module 1 (Foundations): 3 sessions following the manual's "Make a Sound" walkthrough (pp. 11-16) — orientation + first sound, PWM + sub oscillator, filter envelope + wave folding + FM + FX
- **D-03:** Module 2 (Oscillators): 3 sessions covering VCO-A shapes/tuning, VCO-B + FM/sync, and wave folder as a sound source modifier
- **D-04:** Module 3 (Envelopes/Amplitude): 3 sessions covering Envelope A + VCA-A, Envelope B triple-mode (AD/ASR/cycle), and VCA-B/mixer dynamics
- **D-05:** Wave folder belongs in Module 2 (Oscillators) — it's in the signal path between oscillators and filter, shaping the raw oscillator sound

### Session adaptation for semi-modular
- **D-06:** Starting state is the normalled default (zero cables, all knobs at noon/default). The normalled state IS the basic patch — no patch memory needed
- **D-07:** Session 1 documents what the normalled default sounds like, establishing the reference point
- **D-08:** Cable instructions appear in BOTH a summary box at the top of exercises AND inline within exercise steps. Summary for overview, inline for step-by-step context
- **D-09:** Knob positions use percentage estimates (~75%, ~25%, ~50%) — more precise than descriptive ranges, consistent feel for sessions
- **D-10:** Note: This differs from Phase 9 patch documentation which uses clock positions (D-06 from Phase 9). Sessions use percentages for instructional precision; patches use clock positions for player-friendly notation
- **D-11:** Warm-ups start by returning to normalled default: "Remove all cables. Set all knobs to noon. Play a MIDI note." Then do one action from the previous session to trigger recall

### Patch integration
- **D-12:** Some sessions (not all) produce new named patches — approximately 3-4 across 9 sessions, with output_type: 'patch' in frontmatter
- **D-13:** Phase 10 creates full patch files in patches/cascadia/ with complete cable routing, knob settings, and session_origin linking back to the session
- **D-14:** Demo patches from Phase 9 are referenced as examples: "see patch: sub-bass-01 for a finished version of this technique" — forward references for context, not build targets
- **D-15:** Curriculum patches and demo patches coexist in the patch library — curriculum patches have session_origin set, demo patches have session_origin: null

### Cascadia-specific pedagogy
- **D-16:** Concept-first structure: each session opens with a 1-2 paragraph explanation of the generalized synthesis concept (e.g., "what is pulse width modulation"), then exercises use Cascadia to explore it
- **D-17:** Cascadia-unique features highlighted in callout boxes within exercises: `> [!info] Cascadia's PWM knob is pre-normalled to LFO-XYZ`
- **D-18:** Unique features like Envelope B triple-mode get dedicated numbered exercises with specific patching and parameter values — full hands-on exploration, not just mentions
- **D-19:** Normalling documented via inline callouts when a session uses a normalled connection: `> [!info] Normalled: VCO-A Saw -> Mixer Ch 1. You hear this without any cables. Patching into Mixer Ch 1 overrides this connection.`
- **D-20:** Each session satisfies both CCURR-02 (generalized concept) and CCURR-03 (Cascadia-specific implementation) through the concept-first + callout pattern

### Claude's Discretion
- Exact session topics and exercise design within the module boundaries
- Which specific sessions produce patches (3-4 of 9) and what those patches are
- How to sequence exercises within sessions for optimal ADHD flow
- Session numbering and slug format (continuing from Evolver pattern or fresh numbering for Cascadia)
- Which demo patches from Phase 9 to reference in which sessions
- Frontmatter tag choices and difficulty progression across 9 sessions

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements
- `.planning/ROADMAP.md` — Phase 10 success criteria (5 criteria) and requirements CCURR-01 through CCURR-05
- `.planning/REQUIREMENTS.md` — Full requirement definitions for CCURR-01 through CCURR-06

### Cascadia manual
- `references/cascadia_manual_v1.1_2023.04.18.pdf` pp. 11-16 — "Make a Sound" walkthrough that Module 1 follows
- `references/cascadia_manual_v1.1_2023.04.18.pdf` — Full manual for all module controls, jacks, and normals

### Instrument data (Phase 8 output)
- `src/content/instruments/cascadia/overview.md` — Cascadia overview with architecture and quick-start
- `src/content/instruments/cascadia/signal-flow.md` — Normalled signal path (what the learner hears with zero cables)
- `src/content/instruments/cascadia/modules/` — All 17 module docs with controls, jacks, normals, and LEDs (canonical source for cable labels and knob names)
- `src/content/instruments/cascadia/modules.md` — Module index in panel order

### Existing session format (Phase 1 output)
- `sessions/evolver/01-foundations-navigation.md` — Reference session format: frontmatter, ADHD structure, warm-up, exercises, output checklist
- `sessions/evolver/03-analog-osc-waveshapes.md` — Reference for oscillator-teaching session structure

### ADHD design framework
- `framework/adhd-design.md` — ADHD-aware learning design principles, session structure template, anti-patterns to avoid

### Prior phase context
- `.planning/phases/08-cascadia-instrument-data/08-CONTEXT.md` — Module doc structure, content sourcing approach
- `.planning/phases/09-patch-documentation-demo-patches/09-CONTEXT.md` — Patch format decisions (cable routing labels, knob settings format, demo patch scope)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `sessions/evolver/` — 35 Evolver sessions establishing the session format, frontmatter schema, and ADHD structure pattern
- `src/content/instruments/cascadia/modules/` — 17 module docs with controls/jacks tables to reference for cable routing labels and knob names
- `src/content/instruments/cascadia/signal-flow.md` — Normalled signal path document for normalling callout content
- `framework/adhd-design.md` — Session author checklist (6 questions to validate each session)
- `src/content/patches/cascadia/` — Demo patches from Phase 9 (format reference for curriculum patches)

### Established Patterns
- Session frontmatter: `title`, `module`, `session_number`, `duration`, `prerequisite`, `output_type`, `difficulty`, `tags`, `instrument`, `reference`
- Session structure: Objective (1 sentence) -> Tip callout -> Warm-up (2 min) -> Setup -> Exercises (numbered steps with specific values) -> Output Checklist
- Patch frontmatter: `cable_routing` array, `knob_settings` map, `session_origin` field for curriculum patches
- Markdown callouts: `[!tip]`, `[!info]`, `[!note]` already supported in rehype pipeline

### Integration Points
- `sessions/cascadia/` — New directory for Cascadia session files (does not exist yet)
- `patches/cascadia/` — Curriculum patch files alongside demo patches
- `src/content/` — Bundled content for demo mode (Phase 11 handles bundling)

</code_context>

<specifics>
## Specific Ideas

- The normalled default as "basic patch" is elegant — unlike Evolver where you program a patch, Cascadia's default state is always available by removing cables and centering knobs. This is actually LOWER friction than Evolver's approach.
- Percentage notation for sessions vs. clock positions for patches creates a nice pedagogical distinction: sessions are instructional (precise), patches are reference (player-friendly).
- The cable summary + inline pattern mirrors how good hardware manuals work: overview diagram at the start of a section, then step-by-step references.
- Module 1 following the manual's "Make a Sound" is pedagogically sound — it's the manufacturer's recommended learning path, ADHD-optimized with specific values and audible results at each step.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 10-curriculum-modules-1-3*
*Context gathered: 2026-03-31*
