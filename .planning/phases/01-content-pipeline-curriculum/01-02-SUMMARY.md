---
phase: 01-content-pipeline-curriculum
plan: 02
subsystem: content
tags: [unified, remark, rehype, markdown, obsidian, mermaid, wikilinks, callouts, syntax-highlighting]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Project scaffolding, package.json with remark/rehype dependencies, vitest config"
provides:
  - Unified markdown-to-HTML rendering pipeline (renderMarkdown, createMarkdownProcessor)
  - Custom rehype plugin: mermaid-placeholder (code block to data-chart div)
  - Custom rehype plugin: param-table (detection + wrapper for parameter tables)
  - Custom rehype plugin: obsidian-tags (inline #tag to styled span)
  - Custom remark plugin: obsidian-embeds (![[file]] to placeholder div)
affects: [01-03, 01-04, 01-05, 01-06, 02-01, 02-02]

# Tech tracking
tech-stack:
  added: []
  patterns: [unified-pipeline-plugin-ordering, custom-rehype-hast-visitor, custom-remark-mdast-visitor]

key-files:
  created:
    - src/lib/markdown/processor.ts
    - src/lib/markdown/plugins/mermaid-placeholder.ts
    - src/lib/markdown/plugins/param-table.ts
    - src/lib/markdown/plugins/obsidian-tags.ts
    - src/lib/markdown/plugins/obsidian-embeds.ts
    - src/lib/markdown/__tests__/processor.test.ts
  modified: []

key-decisions:
  - "Plugin order: mermaid-placeholder runs BEFORE rehype-highlight to prevent syntax highlighting of diagram code"
  - "remark-wiki-link configured with newClassName='wikilink-broken' for broken link detection"
  - "obsidian-embeds is a remark plugin (mdast level) using raw HTML nodes, while other custom plugins are rehype (hast level)"
  - "param-table detection uses 4 header keywords: Parameter, Param, Name, Control"

patterns-established:
  - "Custom rehype plugin pattern: visit hast tree, find elements by tagName, transform in place"
  - "Custom remark plugin pattern: visit mdast tree, replace text nodes with html nodes for raw HTML injection"
  - "15-plugin unified pipeline with strict ordering for Obsidian feature compatibility"

requirements-completed: [PIPE-04]

# Metrics
duration: 4min
completed: 2026-03-29
---

# Phase 1 Plan 02: Markdown Rendering Pipeline Summary

**Unified remark/rehype pipeline with 4 custom plugins rendering Obsidian-flavored markdown (callouts, wikilinks, mermaid, param tables, tags, embeds) to HTML with UI-SPEC class contracts**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-29T12:04:01Z
- **Completed:** 2026-03-29T12:08:09Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Complete markdown-to-HTML rendering pipeline with 15 plugins in correct dependency order
- 4 custom plugins handling Obsidian-specific features not covered by standard remark/rehype ecosystem
- 46 passing tests covering every HTML class contract from the UI-SPEC
- Integration test verifying all features work together in a realistic session excerpt

## Task Commits

Each task was committed atomically:

1. **Task 1: Core markdown pipeline + custom plugins** - `b1fb3c2` (feat)
2. **Task 2: Comprehensive markdown processor tests** - `4fc3615` (test)

## Files Created/Modified
- `src/lib/markdown/processor.ts` - createMarkdownProcessor and renderMarkdown with 15-plugin unified pipeline
- `src/lib/markdown/plugins/mermaid-placeholder.ts` - Replaces mermaid code blocks with data-chart placeholder divs
- `src/lib/markdown/plugins/param-table.ts` - Detects and wraps parameter tables with param-name/param-value cell classes
- `src/lib/markdown/plugins/obsidian-tags.ts` - Converts inline #tag syntax to styled spans (excludes headings)
- `src/lib/markdown/plugins/obsidian-embeds.ts` - Converts ![[file]] embed syntax to placeholder divs
- `src/lib/markdown/__tests__/processor.test.ts` - 46 tests across 13 describe blocks

## Decisions Made
- Plugin ordering is critical: mermaid-placeholder must run before rehype-highlight to prevent syntax highlighting of diagram source code
- remark-wiki-link's `newClassName` option set to `wikilink-broken` (default is `new`) for clearer semantic class names
- obsidian-embeds implemented as a remark plugin (mdast level) since it needs to inject raw HTML before the remark-rehype bridge
- param-table detection uses 4 header keywords matching the UI-SPEC: Parameter, Param, Name, Control

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- renderMarkdown function is ready for Plans 01-03 through 01-06 (instrument docs, curriculum writing, bundling)
- HTML class contracts match UI-SPEC exactly, ready for Phase 2 CSS styling
- All Obsidian features supported: callouts, wikilinks, mermaid, code highlighting, tags, embeds, param tables, heading anchors, frontmatter stripping

## Self-Check: PASSED

All 6 created files verified present. Both task commits verified in git log (b1fb3c2, 4fc3615).

---
*Phase: 01-content-pipeline-curriculum*
*Completed: 2026-03-29*
