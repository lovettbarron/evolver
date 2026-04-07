# Phase 17: Content & Pedagogy - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-06
**Phase:** 17-content-pedagogy
**Areas discussed:** Troubleshooting guide format, Troubleshooting guide scope, Partial recipe session design, Navigation & discovery

---

## Troubleshooting Guide Format

| Option | Description | Selected |
|--------|-------------|----------|
| Symptom-based checklist | "I hear nothing" → numbered checklist of things to verify. Quick, scannable, ADHD-friendly | ✓ |
| Decision tree flowchart | Yes/No branches leading to specific fixes. More guided but harder to scan | |
| Prose paragraphs | Narrative explanation of common issues. More context but slower | |

**User's choice:** Symptom-based checklist
**Notes:** None — clear preference for scannable format

### Content Home

| Option | Description | Selected |
|--------|-------------|----------|
| Vault markdown | Lives in ~/song, uses content pipeline, editable in Obsidian | |
| Static app pages | Hardcoded in src/app/ as React components | |
| Instrument data file | Add to instruments/ alongside overview.md | |

**User's choice:** None of the above — user clarified that content files live in the app (`src/content/`), NOT in the Obsidian vault. Vault is only for practice data and patches. Troubleshooting should be markdown with a custom Zod schema in `src/content/instruments/<instrument>/troubleshooting.md`
**Notes:** Important architectural clarification — the vault/app content split was already established but not reflected in the initial options

### File Structure

| Option | Description | Selected |
|--------|-------------|----------|
| One file per instrument | Single page with all symptoms as H2 sections | ✓ |
| Separate file per symptom | Individual files per symptom category | |

**User's choice:** One file per instrument
**Notes:** Colocated with existing instrument data (overview.md, signal-flow.md)

### Specificity

| Option | Description | Selected |
|--------|-------------|----------|
| Specific values | Exact parameter names and threshold values from the manual | ✓ |
| General guidance | Descriptive instructions without exact values | |
| You decide | Claude uses best judgment per item | |

**User's choice:** Specific values
**Notes:** Matches session style — no ambiguity, zero decision fatigue

---

## Troubleshooting Guide Scope

### Evolver Symptom Categories

| Option | Description | Selected |
|--------|-------------|----------|
| No audio output | Volume, cables, program state, oscillator levels, filter cutoff, VCA | ✓ |
| Filter sounds wrong | Filter mode confusion, envelope amount, cutoff range, resonance | ✓ |
| Modulation not working | Mod slot routing, source/destination mismatch, amount at zero | ✓ |
| MIDI/SysEx issues | Channel mismatch, SysEx receive disabled, program dump failures | ✓ |

**User's choice:** All four categories
**Notes:** Comprehensive coverage for Evolver

### Cascadia Symptom Categories

| Option | Description | Selected |
|--------|-------------|----------|
| No audio output | Normalled path broken, VCA not opening, mixer levels | ✓ |
| No output from patch point | Wrong jack, normalled connection broken, signal level mismatch | ✓ |
| Unexpected sound behavior | Self-oscillation, wave folder clipping, FM amount, envelope triggering | ✓ |
| Modulation routing issues | CV level, attenuverter at noon, S&H not clocking, LFO range | ✓ |

**User's choice:** All four categories
**Notes:** Tailored to Cascadia's semi-modular architecture

### Depth

| Option | Description | Selected |
|--------|-------------|----------|
| 3-5 checks per symptom | Quick and scannable, covers most common causes | ✓ |
| 5-8 checks per symptom | More thorough, covers edge cases | |
| You decide | Claude adjusts depth per symptom | |

**User's choice:** 3-5 checks per symptom
**Notes:** None

---

## Partial Recipe Session Design

### Placement

| Option | Description | Selected |
|--------|-------------|----------|
| After existing sessions | Evolver: 36+, Cascadia: 26+. Bridge between guided and freeform | ✓ |
| Interleaved in existing modules | Insert between existing sessions | |
| Standalone unnumbered | Separate challenges section | |

**User's choice:** After existing sessions
**Notes:** Clear progression signal — positioned as the bridge to freeform practice

### Gap Ratio

| Option | Description | Selected |
|--------|-------------|----------|
| Target sound + starting patch, gaps in middle | Give destination, leave 2-3 key parameter steps blank | ✓ |
| Full recipe with one key step missing | Almost complete, only 1 critical step blank | |
| Just the target sound description | Maximum freedom, no parameter values | |

**User's choice:** Target sound + starting patch, gaps in middle
**Notes:** Learner knows the destination but must find the path

### Count

| Option | Description | Selected |
|--------|-------------|----------|
| 1 per instrument | Minimum viable | |
| 2 per instrument | Two different sound types per instrument | ✓ |
| 3+ per instrument | One per major sound category | |

**User's choice:** 2 per instrument
**Notes:** Shows the pattern isn't a one-off

### Hints

| Option | Description | Selected |
|--------|-------------|----------|
| Hints with session references | Each gap has "(hint: Session 06 covered detuning)" | ✓ |
| Blank gaps only | Just underscores with no hints | |
| You decide | Claude decides per gap | |

**User's choice:** Hints with session references
**Notes:** Reduces frustration, gives a lifeline without giving the answer

---

## Navigation & Discovery

### Troubleshooting Access

| Option | Description | Selected |
|--------|-------------|----------|
| Card on instrument home | Troubleshooting card alongside Sessions, Patches, Progress | ✓ |
| Nav sidebar link | Add to instrument nav | |
| Both card + nav link | Maximum discoverability | |

**User's choice:** Card on instrument home
**Notes:** Always visible, zero clicks to discover

### Route Rendering

| Option | Description | Selected |
|--------|-------------|----------|
| Own route page | /instruments/[slug]/troubleshooting — bookmarkable, consistent | ✓ |
| Modal/overlay | Slide-over from instrument home | |

**User's choice:** Own route page
**Notes:** Consistent with existing page pattern

### Partial Recipe Visual Treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Same as regular sessions | No special badge, standard session row | ✓ |
| Visual badge or tag | Small 'Partial Recipe' badge on session row | |
| You decide | Claude determines if distinction is warranted | |

**User's choice:** Same as regular sessions
**Notes:** None

---

## Claude's Discretion

- Troubleshooting card visual treatment (icon, description, hover state)
- Specific checklist items per symptom (following manual references)
- Which sound types for partial recipes per instrument
- Which parameters to leave as gaps and which sessions to reference
- Troubleshooting page layout and checklist visual treatment
- Zod schema shape for troubleshooting content type

## Deferred Ideas

None — discussion stayed within phase scope
