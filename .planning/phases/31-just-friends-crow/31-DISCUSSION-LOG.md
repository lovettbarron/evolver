# Phase 31: Just Friends + Crow - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-18
**Phase:** 31-just-friends-crow
**Areas discussed:** Crow standalone scope, i2c combined sessions, JF mode coverage, Reference docs strategy

---

## Crow Standalone Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal standalone (2-3 sessions) | Cover Crow basics (what it is, USB setup, simple I/O scripts) then move quickly to i2c with JF | ✓ |
| Full standalone (4-6 sessions) | Crow as its own instrument: scripting fundamentals, standalone CV generation, clock/trigger patterns, ASL, THEN i2c | |
| Orientation only (1-2 sessions) | Just enough to understand what Crow is and connect it. Combined sessions do the heavy lifting | |

**User's choice:** Minimal standalone (2-3 sessions)

### Follow-up: Standalone Focus

| Option | Description | Selected |
|--------|-------------|----------|
| Hardware + simple scripts | Session 1: Crow/USB/Druid. Session 2: basic I/O scripts. Session 3: ASL slope language | ✓ |
| Hardware + i2c prep | Session 1: Crow/USB/Druid. Session 2: standalone I/O + i2c concepts. Gets to JF faster | |
| You decide | Claude picks the progression | |

**User's choice:** Hardware + simple scripts
**Notes:** 3 standalone sessions: hardware/REPL, basic I/O scripting, ASL slope language

---

## i2c Combined Sessions

| Option | Description | Selected |
|--------|-------------|----------|
| Under Crow's namespace | `sessions/crow/04-i2c-jf-*.md` — Crow drives JF. JF stays standalone. Frontmatter marks JF as required | ✓ |
| Shared namespace | New `sessions/jf-crow/` directory. Neither module owns them | |
| Under Just Friends | `sessions/just-friends/09-i2c-*.md` — i2c extends JF curriculum. Crow is the tool | |

**User's choice:** Under Crow's namespace

### Follow-up: Combined Session Count

| Option | Description | Selected |
|--------|-------------|----------|
| 2-3 combined sessions | First i2c connection, Crow sequences JF polyphonically, creative patch | ✓ |
| 1 combined session | Single capstone showing i2c | |
| You decide | Claude picks based on what i2c enables | |

**User's choice:** 2-3 combined sessions

---

## JF Mode Coverage

| Option | Description | Selected |
|--------|-------------|----------|
| Equal depth (3-3-3) | 3 sessions per mode + 1 foundations. 10 sessions total | ✓ |
| Sound mode emphasis | 2 Shape, 2 Cycle, 3-4 Sound + 1 foundations. 8-10 sessions | |
| Progressive unlock | 1 foundations, 2 Shape, 2 Cycle, 3 Sound. 8 sessions | |
| You decide | Claude distributes pedagogically | |

**User's choice:** Equal depth (3-3-3)

### Follow-up: Run/Intone Coverage

| Option | Description | Selected |
|--------|-------------|----------|
| Weave in naturally | Introduce Run/Intone within mode sessions where they make sense | |
| Dedicated session | Give Run/Intone their own session early on — they span all modes fundamentally | ✓ |
| You decide | Claude places Run/Intone where it fits | |

**User's choice:** Dedicated session

### Follow-up: Total Session Count

| Option | Description | Selected |
|--------|-------------|----------|
| 10 sessions (trim one mode) | Stay within CURR-04 range. Claude decides which mode loses a session | |
| 11 sessions (stretch) | Run/Intone justifies one extra. JF is deep enough | ✓ |
| You decide | Claude picks the count | |

**User's choice:** 11 sessions (stretch the range)

---

## Reference Docs Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Scrape web docs to local markdown | Download key pages from whimsicalraps.com and monome.org as local markdown in references/ | ✓ |
| Save product photos + use web docs live | Download panel photos for hand-placement, reference web docs by URL | |
| You decide | Claude picks the approach | |

**User's choice:** Scrape web docs to local markdown

### Follow-up: Crow Panel Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Full panel SVG | Same treatment as every other module. Consistency — interactive panel with tooltips and annotations | ✓ |
| Simplified static panel | At 2HP it's barely a column of jacks. Simpler static representation | |
| You decide | Claude picks for a 2HP module | |

**User's choice:** Full panel SVG

---

## Claude's Discretion

- Specific session topics and titles within mode/progression constraints
- Panel SVG control placement coordinates
- Session frontmatter tags, difficulty progression, warm-up design
- Specific i2c integration exercises and creative patch ideas
- Which web pages to scrape and local markdown structure

## Deferred Ideas

None — discussion stayed within phase scope
