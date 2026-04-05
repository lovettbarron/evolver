# Phase 10: Curriculum Modules 1-3 - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-03-31
**Phase:** 10-curriculum-modules-1-3
**Areas discussed:** Module boundaries, Session adaptation, Patch integration, Cascadia-specific pedagogy

---

## Module Boundaries

### Module 1 session count

| Option | Description | Selected |
|--------|-------------|----------|
| 3 sessions | Session 1: orientation + first sound. Session 2: PWM + sub. Session 3: filter envelope + wave folding + FM + FX. | ✓ |
| 4 sessions | Slower pace — split wave folding/FM/FX into separate sessions. | |
| 2 sessions | Compressed — orientation + basics in one, then all sound shaping in another. | |

**User's choice:** 3 sessions
**Notes:** Matches the manual's progression (pp. 11-16) in digestible chunks.

### Module 2-3 split

| Option | Description | Selected |
|--------|-------------|----------|
| 3 + 3 | Module 2 (Oscillators): VCO-A, VCO-B+FM/sync, wave folder. Module 3 (Envelopes/Amplitude): Env A+VCA-A, Env B triple-mode, VCA-B/mixer. | ✓ |
| 4 + 2 | Module 2 gets 4, Module 3 gets 2. | |
| 2 + 4 | Module 2 gets 2, Module 3 gets 4. | |

**User's choice:** 3 + 3
**Notes:** Even split across both modules.

### Wave folder placement

| Option | Description | Selected |
|--------|-------------|----------|
| Module 2 (Oscillators) | Wave folder is in the signal path between oscillators and filter — shapes raw oscillator sound. | ✓ |
| Module 3 (Envelopes/Amplitude) | Wave folder interacts heavily with envelope modulation. | |
| You decide | Claude uses best judgment. | |

**User's choice:** Module 2
**Notes:** Natural signal flow order.

---

## Session Adaptation

### Starting state

| Option | Description | Selected |
|--------|-------------|----------|
| Normalled default | Zero cables, all knobs at noon/default. The normalled state IS the basic patch. | ✓ |
| Photo reference patch | Define specific knob positions as the "basic patch." | |
| Previous session state | Chain-based progression from last session. | |

**User's choice:** Normalled default
**Notes:** Lowest friction — always available without recall.

### Cable instruction format

| Option | Description | Selected |
|--------|-------------|----------|
| Inline with exercises | Cable instructions embedded in exercise steps. | |
| Separate cable setup section | A 'Cables' section before exercises. | |
| Both — summary + inline | Cable summary box at top PLUS inline references in exercises. | ✓ |

**User's choice:** Both — summary + inline
**Notes:** Gives both overview and step-by-step context.

### Knob position notation

| Option | Description | Selected |
|--------|-------------|----------|
| Clock positions | "2 o'clock", "full CW", "noon". Matches Phase 9 patch format. | |
| Percentage estimates | "~75%", "~25%". More precise than clock positions. | ✓ |
| Descriptive ranges | "about halfway", "mostly open". Most natural but least reproducible. | |

**User's choice:** Percentage estimates
**Notes:** Differs from Phase 9 patch format (clock positions). Sessions use percentages for instructional precision.

### Warm-up approach

| Option | Description | Selected |
|--------|-------------|----------|
| Return to normalled default | Remove all cables, set knobs to noon, play a note. Then do one thing from last session. | ✓ |
| Rebuild last session's patch | Re-patch key cables from previous session. | |
| Audio-only warm-up | Just play a note and listen. Skip patching. | |

**User's choice:** Return to normalled default
**Notes:** Reset + one recall action.

---

## Patch Integration

### Session patch production

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, some sessions | 3-4 patches across 9 sessions with output_type: 'patch'. | ✓ |
| No — defer to Phase 11 | Techniques only, no patch files. | |
| Yes, every session | Every session produces at least one patch. | |

**User's choice:** Yes, some sessions
**Notes:** Validates patch format without forcing it on every session.

### Demo patch references

| Option | Description | Selected |
|--------|-------------|----------|
| Reference as examples | "See patch: sub-bass-01 for a finished version." Forward references for context. | ✓ |
| Build toward demo patches | Sessions explicitly reconstruct demo patches step by step. | |
| No cross-references | Sessions and demo patches remain independent. | |

**User's choice:** Reference as examples
**Notes:** Lightweight connection without constraining exercise design.

### Patch file creation

| Option | Description | Selected |
|--------|-------------|----------|
| Create full patch files | Full cable routing, knob settings, session_origin in patches/cascadia/. | ✓ |
| Session references only | No patch files — user creates them. | |
| Stub patch files | Frontmatter + routing only, user fills in details. | |

**User's choice:** Create full patch files
**Notes:** Curriculum patches are documented examples of what the session teaches.

---

## Cascadia-Specific Pedagogy

### General concept vs. Cascadia-specific balance

| Option | Description | Selected |
|--------|-------------|----------|
| Concept first, then Cascadia | 1-2 paragraph concept explanation, then exercises use Cascadia. Callout boxes for unique features. | ✓ |
| Cascadia-native, concepts embedded | Written as "here's what Cascadia does" with concepts woven in. | |
| Split sections | Explicit ## Synthesis Concept and ## On the Cascadia sections. | |

**User's choice:** Concept first, then Cascadia
**Notes:** Universal knowledge + instrument-specific implementation.

### Normalling documentation

| Option | Description | Selected |
|--------|-------------|----------|
| Inline callouts | Callout boxes when a normalled connection is relevant to the current exercise. | ✓ |
| Per-session normal map | Separate ## Active Normals section listing all relevant normals. | |
| Reference link only | Link to signal-flow.md. | |

**User's choice:** Inline callouts
**Notes:** Contextual, not a separate reference section. Doesn't break flow.

### Unique feature depth

| Option | Description | Selected |
|--------|-------------|----------|
| Dedicated exercises | Unique features get their own numbered exercises with patching and values. | ✓ |
| Callout mentions only | Noted in callouts but not exercised. | |
| Comparison tables | Table comparing standard vs. Cascadia implementation. | |

**User's choice:** Dedicated exercises
**Notes:** Full hands-on exploration for Cascadia-unique features.

---

## Claude's Discretion

- Exact session topics and exercise design within module boundaries
- Which specific sessions produce patches and what those patches are
- Exercise sequencing for optimal ADHD flow
- Session numbering and slug format
- Which demo patches to reference in which sessions
- Frontmatter tag choices and difficulty progression

## Deferred Ideas

None — discussion stayed within phase scope.
