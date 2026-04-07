---
phase: 1
slug: content-pipeline-curriculum
status: draft
shadcn_initialized: false
preset: none
created: 2026-03-29
---

# Phase 1 — UI Design Contract

> Visual and interaction contract for the content pipeline phase. This phase has no browser UI -- it produces HTML strings from the markdown rendering pipeline. This contract defines the **HTML class and structure conventions** that the renderer must emit, so Phase 2 can style them without modifying the pipeline.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none (Phase 1 is backend-only; shadcn deferred to Phase 2) |
| Preset | not applicable |
| Component library | none |
| Icon library | none |
| Font | not applicable (no rendered pages in this phase) |

**Note:** Phase 1 outputs HTML strings via the remark/rehype pipeline. No React component library or design system is initialized. The shadcn gate will run at Phase 2 (Session Browser) when the app shell is built.

---

## Spacing Scale

Not applicable to Phase 1. The markdown renderer outputs semantic HTML with CSS classes. Spacing values will be defined in Phase 2 when the app shell exists.

Exceptions: none

---

## Typography

Not applicable to Phase 1. The markdown renderer outputs `<h1>` through `<h4>`, `<p>`, `<code>`, `<strong>`, and `<em>` tags. Typographic values (sizes, weights, line heights) will be assigned in Phase 2.

---

## Color

Not applicable to Phase 1. The markdown renderer outputs CSS class names on callouts, tags, and inline parameters. Color values will be assigned in Phase 2.

---

## Markdown Rendering Contract

This is the primary visual contract for Phase 1. The remark/rehype pipeline MUST emit the following HTML structures and class names. Phase 2 will style these without modifying the pipeline.

### Callout/Admonition Classes

rehype-callouts emits these by default. Confirm the output matches:

| Obsidian Syntax | Emitted Class | Purpose |
|-----------------|---------------|---------|
| `> [!tip]` | `.callout[data-callout="tip"]` | Tips and tricks |
| `> [!warning]` | `.callout[data-callout="warning"]` | Warnings about parameter values or signal flow |
| `> [!info]` | `.callout[data-callout="info"]` | Background context |
| `> [!danger]` | `.callout[data-callout="danger"]` | "Do not do this" warnings |
| `> [!note]` | `.callout[data-callout="note"]` | General notes |
| `> **If you only have 5 minutes**` | `.callout[data-callout="tip"]` or custom | ADHD bail-out option (must be visually distinct) |

The collapsible callout variants (`> [!tip]-` and `> [!tip]+`) must render with a toggle mechanism. Use `<details>` / `<summary>` HTML.

### Parameter Table Classes

GFM tables rendered by remark-gfm. The pipeline MUST wrap parameter tables in a container:

```html
<div class="param-table">
  <table>
    <thead>...</thead>
    <tbody>
      <tr>
        <td class="param-name">LPF Freq</td>
        <td class="param-value">50</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Detection rule:** A table is a "parameter table" if its first column header is one of: `Parameter`, `Param`, `Name`, `Control`. Apply `.param-table` wrapper via a custom rehype plugin.

### Inline Parameter Styling

Per CONTEXT.md: "parameter names get visual treatment (bold/monospace/colored) so they pop visually for ADHD scanning."

Session content will use the pattern: `**LPF Freq**: \`50\``

The pipeline does NOT need a custom plugin for this. The existing `<strong>` + `<code>` rendering is sufficient. Phase 2 will style the combination `strong + code` for ADHD scanning visibility.

CSS selector contract for Phase 2: `p > strong + code` or `p > strong:has(+ code)` targets parameter name-value pairs.

### Mermaid Diagram Placeholder

The pipeline MUST replace ` ```mermaid ` code blocks with a placeholder element, NOT render them as syntax-highlighted code:

```html
<div class="mermaid-placeholder" data-chart="graph LR; A-->B;">
  <noscript>Mermaid diagram (requires JavaScript)</noscript>
</div>
```

The `data-chart` attribute contains the raw Mermaid source. Phase 2's `<MermaidDiagram>` client component reads this attribute and renders the SVG.

### Tag Rendering

Obsidian `#tag` syntax (inline, not at line start) MUST be rendered as:

```html
<span class="obsidian-tag" data-tag="tag-name">#tag-name</span>
```

Implemented via a custom rehype plugin (see RESEARCH.md Open Question 2). Detection rule: `#word` pattern where `#` is not at position 0 of a line and `word` is `[a-zA-Z0-9_-]+`.

### Wikilink Resolution

`[[target]]` links MUST render as:

```html
<a href="/instruments/evolver/target" class="wikilink">target</a>
```

`[[target|display text]]` links MUST render as:

```html
<a href="/instruments/evolver/target" class="wikilink">display text</a>
```

Broken wikilinks (target not in permalink map) MUST render with a distinct class:

```html
<a href="#" class="wikilink wikilink-broken" title="Link target not found: unknown-page">unknown-page</a>
```

### Embed Syntax

`![[file]]` embeds are deferred -- render as a placeholder for Phase 2 to resolve:

```html
<div class="obsidian-embed" data-embed="file">
  <p class="embed-placeholder">Embedded content: file</p>
</div>
```

### Code Block Classes

rehype-highlight adds language-specific classes. The pipeline MUST preserve:

```html
<pre><code class="hljs language-{lang}">...</code></pre>
```

No additional class contract needed. Phase 2 will apply an hljs theme stylesheet.

### Heading IDs

rehype-slug adds `id` attributes to all headings:

```html
<h2 id="exercises">Exercises</h2>
```

rehype-autolink-headings adds anchor links inside headings. Use `prepend` behavior:

```html
<h2 id="exercises">
  <a class="heading-anchor" href="#exercises" aria-hidden="true">#</a>
  Exercises
</h2>
```

### Session Content Structure

Every rendered session MUST produce HTML containing these landmark sections (detected by heading content):

| Section | Required | Heading Level |
|---------|----------|---------------|
| Objective | Yes | h2 |
| Warm-Up | Yes | h2 |
| Setup | Yes | h2 |
| Exercises | Yes | h2 |
| Output Checklist | Yes | h2 |
| If You Only Have 5 Minutes | Yes (ADHD bail-out) | h2 or callout |
| References | No | h2 |

This structure is enforced by the `validate-content` script (CURR-02) and the curriculum integration tests.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Not applicable (no interactive UI in Phase 1) |
| Empty state heading | Not applicable |
| Empty state body | Not applicable |
| Error state (validation) | "Validation failed: {file}: {field} — {zod error message}" (CLI output, not UI) |
| Error state (file not found) | "Content not found: {path}. Check vault path in evolver.config.json" (CLI output) |
| validate-content success | "All content files validated successfully" |
| validate-content failure | "{N} file(s) failed validation" with per-file error details above |

### Session Copywriting Standards

These apply to the 35 curriculum sessions (authored content, not app UI):

| Element | Convention |
|---------|-----------|
| Session title format | "Session {NN}: {Descriptive Title}" e.g. "Session 01: Navigation & The Basic Patch" |
| Objective | Single sentence starting with a verb: "Learn to...", "Build a...", "Explore..." |
| Warm-Up | 2-3 minute activity referencing previous session output |
| Setup instruction | Exact patch state: "Start from the basic patch" or "Load your {previous session} patch" |
| Exercise instructions | Imperative mood with specific values: "Set **LPF Freq** to `50`" not "Adjust the filter" |
| Output checklist | Checkboxes: `- [ ] Saved patch: {descriptive-name}` or `- [ ] Documented technique: {name}` |
| ADHD bail-out | Callout or section titled "If You Only Have 5 Minutes" with a meaningful subset of the session |
| Reference citation | "See Anu Kirk p.{page}" or "See DSI Manual p.{page}" inline where relevant |
| Duration marker | Frontmatter `duration` field, 15-30 range enforced by Zod schema |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| Not applicable | Phase 1 has no UI components | N/A |

No shadcn components, no third-party registries. The remark/rehype plugins are npm packages vetted in RESEARCH.md, not shadcn registry blocks.

---

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PENDING (validation CLI messages + session authoring standards defined)
- [ ] Dimension 2 Visuals: PENDING (markdown HTML class contracts defined, no pixel-level visuals in this phase)
- [ ] Dimension 3 Color: N/A (no color values in Phase 1; class names defined for Phase 2 styling)
- [ ] Dimension 4 Typography: N/A (semantic HTML tags emitted; sizing deferred to Phase 2)
- [ ] Dimension 5 Spacing: N/A (no layout in Phase 1; HTML structure defined for Phase 2)
- [ ] Dimension 6 Registry Safety: PASS (no registries used)

**Approval:** pending

---

## Phase 2 Handoff Notes

When Phase 2 (Session Browser) begins, the UI researcher MUST:

1. **Initialize shadcn** — this is a React/Next.js project. Run the shadcn gate at Phase 2 start
2. **Define the full design system** — spacing, typography, color, all deferred from Phase 1
3. **Style the markdown class contracts** defined above — every `.callout`, `.param-table`, `.mermaid-placeholder`, `.obsidian-tag`, `.wikilink`, and heading anchor class needs CSS
4. **Apply ADHD scanning principles** — high contrast parameter values, clear visual hierarchy in callouts, distinct bail-out section styling
5. **Choose an hljs theme** for code block syntax highlighting
6. **Define Mermaid theme** — the `<MermaidDiagram>` component needs a theme that matches the app's color palette
