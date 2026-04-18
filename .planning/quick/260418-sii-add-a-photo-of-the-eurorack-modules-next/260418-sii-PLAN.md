---
phase: quick
plan: 260418-sii
type: execute
wave: 1
depends_on: []
files_modified:
  - src/lib/content/schemas.ts
  - src/app/modules/[slug]/panel/page.tsx
  - public/modules/maths.jpg
  - public/modules/plaits.jpg
  - public/modules/beads.jpg
  - public/modules/swells.jpg
  - public/modules/ikarie.jpg
autonomous: true
requirements: []

must_haves:
  truths:
    - "Each module panel page shows a photo of the physical module alongside the SVG panel"
    - "Photos are fetched from ModularGrid and served locally"
  artifacts:
    - path: "public/modules/maths.jpg"
      provides: "Maths panel photo from ModularGrid"
    - path: "public/modules/plaits.jpg"
      provides: "Plaits panel photo from ModularGrid"
    - path: "public/modules/beads.jpg"
      provides: "Beads panel photo from ModularGrid"
    - path: "public/modules/swells.jpg"
      provides: "Swells panel photo from ModularGrid"
    - path: "public/modules/ikarie.jpg"
      provides: "Ikarie panel photo from ModularGrid"
    - path: "src/app/modules/[slug]/panel/page.tsx"
      provides: "Panel page with photo displayed alongside SVG"
  key_links:
    - from: "src/app/modules/[slug]/panel/page.tsx"
      to: "public/modules/{slug}.jpg"
      via: "Next.js Image component"
      pattern: "src=.*/modules/.*\\.jpg"
---

<objective>
Add a photo of each eurorack module (sourced from ModularGrid) next to its SVG panel rendering on the module panel page.

Purpose: Users can compare the SVG panel diagram against the real module photo, making the interactive panel more useful as a reference.
Output: Downloaded module photos in public/modules/ and updated panel page layout showing photo + SVG side by side.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/app/modules/[slug]/panel/page.tsx
@src/app/modules/[slug]/panel/module-panel-client.tsx
@src/lib/content/schemas.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Download ModularGrid panel photos to public/modules/</name>
  <files>public/modules/maths.jpg, public/modules/plaits.jpg, public/modules/beads.jpg, public/modules/swells.jpg, public/modules/ikarie.jpg</files>
  <action>
Create the `public/modules/` directory and download full-resolution panel photos from ModularGrid for each module:

```bash
mkdir -p public/modules
curl -o public/modules/maths.jpg "https://modulargrid.net/img/modcache/423.f.jpg"
curl -o public/modules/plaits.jpg "https://modulargrid.net/img/modcache/16165.f.jpg"
curl -o public/modules/beads.jpg "https://modulargrid.net/img/modcache/31911.f.jpg"
curl -o public/modules/swells.jpg "https://modulargrid.net/img/modcache/57778.f.jpg"
curl -o public/modules/ikarie.jpg "https://modulargrid.net/img/modcache/30517.f.jpg"
```

Verify each downloaded file is a valid JPEG (not an HTML error page) by checking file size is > 10KB.
  </action>
  <verify>
    <automated>ls -la public/modules/*.jpg && file public/modules/*.jpg</automated>
  </verify>
  <done>All 5 module photos exist as valid JPEG files in public/modules/</done>
</task>

<task type="auto">
  <name>Task 2: Update panel page to show photo alongside SVG panel</name>
  <files>src/app/modules/[slug]/panel/page.tsx</files>
  <action>
Modify `src/app/modules/[slug]/panel/page.tsx` to display the ModularGrid photo next to the SVG panel rendering.

Layout: Use a two-column flex layout (side by side on desktop, stacked on mobile):
- Left column: The ModularGrid photo (using Next.js `Image` component from `next/image`)
- Right column: The existing SVG panel (`ModulePanelClient`)

Add a `modulargrid_id` to the `PANEL_CONFIG` record so each module maps to its photo path. Use the slug to reference `/modules/{slug}.jpg`.

Add a small attribution line below the photo: "Photo: ModularGrid" in `text-xs text-muted` styling.

For the photo column, constrain height to match the SVG panel area (use `max-h-[600px]` with `object-contain`). On mobile (`flex-col`), show photo above the SVG panel at a reasonable width.

Update the page layout:
- Remove the current `max-w-[Npx] mx-auto` wrapper per-module (it constrains too tight for side-by-side)
- Use `max-w-[900px] mx-auto` for the overall container
- Flex row with `gap-xl items-start`
- Photo column: `flex-shrink-0 w-[200px]` (fixed width for the photo)
- SVG column: `flex-1 {config.maxWidth}` (retains existing max-width on just the SVG)

Check if the photo file exists using a try/catch around `fs.access` or simply render conditionally — if the module has no photo, just show the SVG alone (graceful fallback for modules like crow/just-friends that don't have photos yet).

Since this is a server component, use `import fs from 'fs/promises'` and `import path from 'path'` to check if the photo exists at build/request time, then conditionally render the Image component.
  </action>
  <verify>
    <automated>cd /Users/albair/src/evolver && npx next build 2>&1 | tail -20</automated>
  </verify>
  <done>Panel pages for maths, plaits, beads, swells, and ikarie show the ModularGrid photo alongside the SVG panel. Modules without photos gracefully show just the SVG.</done>
</task>

</tasks>

<verification>
- Visit `/modules/maths/panel` — photo of Maths appears next to SVG panel
- Visit `/modules/plaits/panel` — photo of Plaits appears next to SVG panel
- Visit `/modules/crow/panel` — no photo, just "Panel coming soon" (no crash)
- Build completes without errors
</verification>

<success_criteria>
- All 5 module photos downloaded and served from public/modules/
- Panel page renders photo + SVG side by side on desktop
- Mobile layout stacks photo above SVG
- Photo attribution "Photo: ModularGrid" visible
- Modules without photos render gracefully
- Next.js build succeeds
</success_criteria>

<output>
After completion, create `.planning/quick/260418-sii-add-a-photo-of-the-eurorack-modules-next/260418-sii-SUMMARY.md`
</output>
