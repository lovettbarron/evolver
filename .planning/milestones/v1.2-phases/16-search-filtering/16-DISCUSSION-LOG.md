# Phase 16: Search & Filtering - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-06
**Phase:** 16-search-filtering
**Areas discussed:** Search UX, Filter & sort controls, Search scope & matching, Empty & loading states

---

## Search UX

### Where should search live?

| Option | Description | Selected |
|--------|-------------|----------|
| Global search bar in nav | Persistent search input in top nav, always accessible. Zero friction ADHD principle | ✓ |
| Dedicated /search page | Separate page with full-width input and rich results | |
| Inline on existing pages | Search inputs added directly to Sessions and Patches pages | |

**User's choice:** Global search bar in nav
**Notes:** None

### How should results appear?

| Option | Description | Selected |
|--------|-------------|----------|
| Dropdown overlay | Floating dropdown below search bar as you type, stay on current page | ✓ |
| Navigate to /search page | Typing navigates to full search results page | |
| You decide | Claude picks | |

**User's choice:** Dropdown overlay
**Notes:** None

### What info per result?

| Option | Description | Selected |
|--------|-------------|----------|
| Title + type badge | Minimal: session number + title + module, patch name + type badge | ✓ |
| Title + description snippet | Title plus matching text snippet, highlighted | |
| You decide | Claude picks density | |

**User's choice:** Title + type badge
**Notes:** None

### Search scope

| Option | Description | Selected |
|--------|-------------|----------|
| Current instrument only | Scoped to whichever instrument you're browsing | ✓ |
| Global across all instruments | Returns results from all instruments, grouped | |
| You decide | Claude picks | |

**User's choice:** Current instrument only
**Notes:** None

---

## Filter & Sort Controls

### Patch type filter appearance

| Option | Description | Selected |
|--------|-------------|----------|
| Pill/chip toggles | Horizontal row of toggleable pills above grid, multiple = OR | ✓ |
| Dropdown select | Dropdown menus for type and tags separately | |
| Sidebar filters | Vertical filter panel with checkboxes | |

**User's choice:** Pill/chip toggles
**Notes:** None

### Tag filtering alongside type filters

| Option | Description | Selected |
|--------|-------------|----------|
| Second row of tag pills | Tags as second row below type pills, AND with type filters | ✓ |
| Inline with type pills | Mix type and tag pills in one row, different visual treatment | |
| You decide | Claude picks | |

**User's choice:** Second row of tag pills
**Notes:** None

### Sort control placement

| Option | Description | Selected |
|--------|-------------|----------|
| Small dropdown right-aligned | Compact "Sort: Name ▼" aligned right of filter pills | ✓ |
| Segmented toggle | Three-button toggle inline with pills | |
| You decide | Claude picks | |

**User's choice:** Small dropdown right-aligned
**Notes:** None

---

## Search Scope & Matching

### Match depth

| Option | Description | Selected |
|--------|-------------|----------|
| Title + description + tags | Frontmatter fields only, no body text | ✓ |
| Full-text including body | Also search markdown body content | |
| You decide | Claude picks based on volume | |

**User's choice:** Title + description + tags (frontmatter only)
**Notes:** None

### Matching strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Case-insensitive substring | Simple includes(), "filt" matches "Filter Basics" | ✓ |
| Fuzzy matching | Typo-tolerant Levenshtein distance matching | |
| You decide | Claude picks | |

**User's choice:** Case-insensitive substring
**Notes:** None

---

## Empty & Loading States

### Search empty state

| Option | Description | Selected |
|--------|-------------|----------|
| Friendly message + clear action | "No results for [query]" with suggestion + Clear search button | ✓ |
| Show nearest matches | "Did you mean...?" with closest partial matches | |
| You decide | Claude picks | |

**User's choice:** Friendly message + clear action
**Notes:** None

### Filter empty state

| Option | Description | Selected |
|--------|-------------|----------|
| Contextual message | "No [type] patches match your filters" + Clear filters button | ✓ |
| Same as search empty | Generic "No results" for both search and filter | |
| You decide | Claude picks | |

**User's choice:** Contextual message
**Notes:** None

---

## Claude's Discretion

- Search bar visual treatment (width, placeholder, icon)
- Dropdown max height, scroll, keyboard navigation
- Debounce timing for search input
- Pill/chip visual styling (colors, hover, active states)
- Sort dropdown implementation
- Filter state persistence (URL params vs local state)

## Deferred Ideas

None — discussion stayed within phase scope
