# Phase 32: Progress, Demo + Cross-Module Polish - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-19
**Phase:** 32-progress-demo-cross-module-polish
**Areas discussed:** Cross-module references, Category suggestions

---

## Cross-Module References

### Authoring Format

| Option | Description | Selected |
|--------|-------------|----------|
| Frontmatter array (Recommended) | A `cross_references` field in session frontmatter listing slugs. Structured, queryable, easy to validate | ✓ |
| Inline markdown links | Natural-language references in session body text. More readable but harder to query programmatically | |
| Both | Frontmatter for programmatic discovery + inline links where pedagogically useful | |

**User's choice:** Frontmatter array
**Notes:** None

### Rendering

| Option | Description | Selected |
|--------|-------------|----------|
| Related sessions card (Recommended) | A 'Related Sessions' section at bottom of session page showing linked sessions as small cards with module name, session title, and reason | ✓ |
| Inline callout | Callout boxes inline within session content, placed contextually near relevant steps | |
| Sidebar list | Compact list in session page sidebar showing linked sessions as simple text links | |

**User's choice:** Related sessions card
**Notes:** None

### Detail Level

| Option | Description | Selected |
|--------|-------------|----------|
| Slug + reason (Recommended) | Each cross-reference includes a short reason explaining the connection | ✓ |
| Slug only | Just the session path — simpler frontmatter, no explanation of relationship | |

**User's choice:** Slug + reason
**Notes:** None

### Directionality

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, auto-bidirectional (Recommended) | If A references B, B automatically shows A in Related Sessions — computed at build time | ✓ |
| One-way only | Only the session with the frontmatter entry shows the reference | |

**User's choice:** Auto-bidirectional
**Notes:** None

---

## Category Suggestions

### Source of Modules

| Option | Description | Selected |
|--------|-------------|----------|
| All modules in category (Recommended) | Show all modules sharing the same category. Since this is a personal tool, every module in the system is one you own | ✓ |
| User-configured rack | Let users mark which modules they own in settings | |
| You decide | Claude picks the approach that fits the existing architecture best | |

**User's choice:** All modules in category
**Notes:** None

### Placement

| Option | Description | Selected |
|--------|-------------|----------|
| Overview page bottom (Recommended) | 'Related Modules' section at bottom of module overview page, after module content and sessions | ✓ |
| Sidebar card | Compact sidebar section showing related modules by category | |
| Both overview + session pages | Show on overview page AND at bottom of individual session pages | |

**User's choice:** Overview page bottom
**Notes:** None

### Grouping

| Option | Description | Selected |
|--------|-------------|----------|
| Grouped by category (Recommended) | Separate headings per category: 'Other VCOs', 'Other Modulators', etc. | ✓ |
| Flat list, deduplicated | One flat 'Related Modules' list with all modules sharing any category, no grouping | |

**User's choice:** Grouped by category
**Notes:** None

---

## Claude's Discretion

- Zustand store key strategy for module completions
- Synthetic journey pacing for Maths and Plaits demo data
- SessionSchema extension for cross_references field
- Prerequisite badge implementation for module sessions
- Related Sessions card component design
- Which specific sessions get cross-references

## Deferred Ideas

None — discussion stayed within phase scope
