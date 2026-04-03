# Phase 11: Curriculum Modules 4-7 + Demo Mode - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Complete the 25-session Cascadia curriculum by writing sessions 10-25 across Modules 4-7, produce named patches from recipe sessions, bundle all Cascadia content into src/content/ for Vercel demo mode, create a synthetic Cascadia learner journey showing ~50% independent progress, and verify the landing page shows both instruments with session/patch counts.

</domain>

<decisions>
## Implementation Decisions

### Module boundaries (3-3-4-6 split)
- **D-01:** 16 sessions split unevenly: Module 4 (3 sessions), Module 5 (3 sessions), Module 6 (4 sessions), Module 7 (6 sessions)
- **D-02:** Module 4 — Filter + LPG focus: VCF modes, resonance, filter FM, plus the low-pass gate for west coast percussion. LPG is Cascadia's signature and deserves dedicated session time
- **D-03:** Module 5 — Modulation/Utilities: LFOs, sample & hold, mixuverter, utility modules for modulation routing
- **D-04:** Module 6 — Complex modulation + FX: Cross-modulation (FM chains, ring mod as modulator), self-patching feedback loops, FX pedal integration, audio-rate modulation
- **D-05:** Module 7 — Sound Design (recipe-driven): 6 sessions, each builds a complete patch from scratch. Categories: bass, lead, pad, percussion, texture, ambient. Heavy on named patch output. Synthesizes everything learned across Modules 1-6
- **D-06:** Weighting rationale: lighter early modules (filter basics, modulation basics), heavier advanced patching and sound design — mirrors increasing complexity and synthesis of prior concepts

### Session format continuity
- **D-07:** All Phase 10 session conventions carry forward unchanged: percentage knob notation, normalled default as basic patch, concept-first structure, Cascadia-unique callouts, cable summary + inline pattern
- **D-08:** Warm-ups return to normalled default then reinforce previous session (Phase 10, D-11)
- **D-09:** Recipe sessions (especially Module 7) produce named patches with full cable routing and knob settings in patches/cascadia/ format (Phase 9 schema)

### Synthetic Cascadia journey
- **D-10:** Same ADHD pacing shape as Evolver (enthusiastic start -> slowdown -> break -> steady return), but offset — starts later and progresses slower. Shows someone who picked up Cascadia after getting into Evolver
- **D-11:** Journey stops at end of Module 5: 12 sessions complete (Modules 1-5 done), currently in Module 6 with no Module 6 sessions completed. Clean module boundary
- **D-12:** Journey data lives in the same file as Evolver: `src/lib/synthetic-daily-notes.ts` with separate exports (SYNTHETIC_CASCADIA_COMPLETED_SESSIONS, SYNTHETIC_CASCADIA_JOURNEY_WEEKS)

### Content bundling
- **D-13:** Copy all 25 Cascadia sessions into `src/content/sessions/cascadia/` — same pattern as Evolver. Full curriculum is public content; only progress data is synthetic
- **D-14:** Curriculum patches from recipe sessions get added to `src/content/patches/cascadia/` alongside the 13 existing demo patches from Phase 9
- **D-15:** No reader code changes — existing fallback to src/content/ when no vault path is set handles everything

### Landing page
- **D-16:** Verify instrument auto-discovery works with Cascadia content in src/content/ (should just work given existing reader + instrument config)
- **D-17:** Add session count and patch count to InstrumentCard components so demo visitors see the scope (e.g., "25 sessions, 17 patches")
- **D-18:** Fix any edge cases where Cascadia content doesn't render properly in demo mode

### Claude's Discretion
- Exact session topics and exercise design within the 3-3-4-6 module boundaries
- Which sessions produce named patches and what those patches are (especially in Module 7's 6 recipe sessions)
- Exercise sequencing within sessions for optimal ADHD flow
- Session numbering continuation (10-25) and slug format
- Specific LPG techniques to cover in Module 4
- Synthetic journey week-by-week schedule detail (following the agreed shape and endpoint)
- How to display session/patch counts on InstrumentCard (badge, subtitle, etc.)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements
- `.planning/ROADMAP.md` — Phase 11 success criteria (5 criteria) and requirements CCURR-01, CCURR-06, CDEMO-01, CDEMO-02, CDEMO-03
- `.planning/REQUIREMENTS.md` — Full requirement definitions for CCURR-06, CDEMO-01, CDEMO-02, CDEMO-03

### Cascadia manual
- `references/cascadia_manual_v1.1_2023.04.18.pdf` — Full manual for all module controls, jacks, normals. Source for session content on filter, LPG, modulation, utilities
- `references/cascadia_manual_v1.1_2023.04.18.pdf` pp. 11-16 — "Make a Sound" walkthrough (Module 1 reference, already implemented)

### Instrument data (Phase 8 output)
- `src/content/instruments/cascadia/overview.md` — Cascadia architecture and quick-start
- `src/content/instruments/cascadia/signal-flow.md` — Normalled signal path
- `src/content/instruments/cascadia/modules/` — All 17 module docs with controls, jacks, normals (canonical source for cable labels and knob names)

### Existing sessions (Phase 10 output)
- `sessions/cascadia/` — 9 existing sessions (01-09) establishing the Cascadia session format, numbering, and pedagogical patterns
- `sessions/cascadia/09-envelopes-vca-b-mixer-dynamics.md` — Last session written, reference for continuity

### ADHD design framework
- `framework/adhd-design.md` — Session structure template, ADHD anti-patterns to avoid

### Demo mode implementation
- `src/lib/synthetic-daily-notes.ts` — Evolver synthetic journey (pattern to extend for Cascadia)
- `src/lib/content/reader.ts` — Content reader with vault/bundled fallback logic
- `src/lib/config.ts` — Demo mode configuration

### Bundled content reference
- `src/content/sessions/evolver/` — Evolver bundled sessions (pattern to follow for Cascadia)
- `src/content/patches/cascadia/` — 13 existing demo patches (curriculum patches added alongside)

### Landing page
- `src/app/page.tsx` — Landing page with instrument auto-discovery
- `src/components/instrument-card.tsx` — InstrumentCard component (needs session/patch counts)

### Prior phase context
- `.planning/phases/10-curriculum-modules-1-3/10-CONTEXT.md` — Session format decisions, module boundaries, pedagogical patterns (all carry forward)
- `.planning/phases/09-patch-documentation-demo-patches/09-CONTEXT.md` — Patch format decisions, cable routing schema, knob settings format

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `sessions/cascadia/` — 9 sessions establishing format, frontmatter schema, ADHD structure, and Cascadia-specific callout patterns
- `src/content/instruments/cascadia/modules/` — 17 module docs for referencing cable labels and knob names
- `src/content/patches/cascadia/` — 13 demo patches with cable routing and knob settings (format reference for curriculum patches)
- `src/lib/synthetic-daily-notes.ts` — Evolver journey pattern to extend with Cascadia exports
- `framework/adhd-design.md` — Session author checklist

### Established Patterns
- Session frontmatter: title, module, session_number, duration, prerequisite, output_type, difficulty, tags, instrument, reference
- Session structure: Objective -> Tip -> Warm-up -> Setup -> Exercises -> Output Checklist
- Patch frontmatter: cable_routing array, knob_settings map, session_origin for curriculum patches
- Content bundling: copy files into src/content/ for Vercel demo mode
- Synthetic journey: Set of completed session numbers + weekly schedule array

### Integration Points
- `src/content/sessions/cascadia/` — New directory for bundled Cascadia sessions (does not exist yet)
- `src/content/patches/cascadia/` — Existing directory, add curriculum patches alongside demo patches
- `src/lib/synthetic-daily-notes.ts` — Add Cascadia journey exports
- `src/components/instrument-card.tsx` — Add session/patch counts display
- `src/app/instruments/[slug]/progress/page.tsx` — Must read Cascadia journey data for progress display

</code_context>

<specifics>
## Specific Ideas

- The 3-3-4-6 split mirrors how real synth learning works: basics go fast, then you spend most of your time on advanced techniques and actual sound design. Module 7 being the biggest feels right — it's the payoff.
- Filter + LPG in one module makes sense because the LPG is essentially a filter-meets-VCA, and Cascadia's LPG is a signature west coast feature. Keeping them together avoids an artificial split.
- Recipe-driven sound design means every Module 7 session produces a finished, documented patch. This maximizes the tangible output principle from the ADHD framework.
- The Cascadia journey starting later than Evolver tells a natural story: "I got the Evolver first, then added the Cascadia a few weeks later."

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 11-curriculum-modules-4-7-demo-mode*
*Context gathered: 2026-04-03*
