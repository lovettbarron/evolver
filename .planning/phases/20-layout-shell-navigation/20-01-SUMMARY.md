---
phase: 20-layout-shell-navigation
plan: 01
subsystem: navigation
tags: [nav, tokens, css, brand, active-state, accessibility]
dependency_graph:
  requires: [Phase 18 tokens, Phase 19 typography]
  provides: [--nav-height, --color-accent-cascadia, --content-wide 1200px, restyled nav bar, per-instrument accent override]
  affects: [sticky-header.tsx, all pages via globals.css tokens]
tech_stack:
  added: []
  patterns: [per-instrument CSS override via data-attribute, accent bottom-bar active state]
key_files:
  created: []
  modified:
    - src/app/globals.css
    - src/components/nav.tsx
    - src/components/sticky-header.tsx
    - src/components/__tests__/nav.test.tsx
decisions:
  - "Nav height set to 60px (within D-01 range of 56-64px)"
  - "Per-instrument accent via [data-instrument] CSS override, no JS runtime cost"
  - "Active link uses 2px accent bottom bar instead of underline"
  - "Nav links hidden on mobile with hidden md:flex for future hamburger menu (plan 03)"
metrics:
  duration: "~2 min"
  completed: "2026-04-10"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 20 Plan 01: Nav Restyle with Tokens, Brand Wordmark, Active Indicators Summary

Restyled navigation bar from a minimal 48px strip to a 60px elevated surface with Space Grotesk brand wordmark, 2px accent bottom-bar active states, and new CSS tokens for Phase 20 layout work.

## What Was Done

### Task 1: Add Phase 20 CSS tokens and update globals.css
- Added `--nav-height: 60px` token to @theme block
- Updated `--content-wide` from `960px` to `1200px`
- Added `--color-teal-500: oklch(0.75 0.12 185)` primitive
- Added `--color-accent-cascadia: var(--color-teal-500)` semantic alias
- Updated `scroll-padding-top` from `48px` to `60px`
- Added `[data-instrument="cascadia"]` CSS override for per-instrument accent color
- **Commit:** 33e6e79

### Task 2: Restyle nav bar with brand wordmark, active indicators, and visual weight
- Nav bar: `h-[60px]`, `bg-surface-raised`, `sticky top-0 z-sticky`, subtle shadow
- Brand wordmark: `font-display text-[20px] font-bold tracking-[-0.025em]` with accent hover
- Active link: `aria-current="page"` + absolute-positioned 2px accent bottom bar
- Inactive links: `text-muted hover:text-text` with 150ms transition (no underline)
- Focus: `outline-2 outline-accent outline-offset-2` on all nav links
- Mobile: links hidden with `hidden md:flex` for hamburger menu in plan 03
- Sticky header: `top-[60px]` instead of `top-0` to stack below nav
- Tests: 6 new tests covering brand wordmark, active indicator, muted inactive, height, positioning
- Fixed pre-existing `useRouter` mock gap in nav tests
- **Commit:** bbcca41

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed missing useRouter mock in nav tests**
- **Found during:** Task 2 (test execution)
- **Issue:** SearchBar component (rendered inside Nav) calls `useRouter()` which was not included in the `next/navigation` mock
- **Fix:** Added `useRouter` to the mock returning push/replace/prefetch stubs
- **Files modified:** src/components/__tests__/nav.test.tsx
- **Commit:** bbcca41

## Decisions Made

1. **Nav height 60px** — Within the D-01 discretion range (56-64px), chosen for clean alignment with spacing scale
2. **Per-instrument accent via data-attribute** — CSS-only, SSR-friendly, no JS runtime cost (D-11)
3. **Active state: accent bottom bar** — 2px bar replaces underline, proven pattern for elevated nav bars (D-04)
4. **Mobile links hidden** — `hidden md:flex` prepares for hamburger menu in plan 03 (D-03)

## Known Stubs

None — all functionality is fully wired.

## Self-Check: PASSED

- All 4 modified files exist on disk
- Commit 33e6e79 (Task 1) verified in git log
- Commit bbcca41 (Task 2) verified in git log
- All 12 nav tests pass
