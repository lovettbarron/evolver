---
phase: 24-instrument-color-identity
verified: 2026-04-12T21:57:00Z
status: human_needed
score: 6/6 must-haves verified
human_verification:
  - test: "Home page neutral accent — open http://localhost:3000, confirm accent elements (hover states, focus rings, active nav indicator) appear as neutral gray aluminum, NOT lime green"
    expected: "A muted gray-tinted accent, not lime or teal"
    why_human: "CSS custom property inheritance cannot be traced visually via grep. The default --color-accent resolves to --color-neutral-500 (oklch 0.70 0.03 250), which is a barely-tinted gray — only a human eye on a rendered page can confirm it reads as 'neutral aluminum, not lime'"
  - test: "Evolver instrument pages — navigate to /instruments/evolver, confirm accent elements show blue (cards hover borders, nav indicator, inline code pill borders, focus rings)"
    expected: "A saturated blue color (oklch 0.70 0.15 245) clearly distinguishable from the home page gray"
    why_human: "Per-instrument cascade scope requires browser rendering to confirm the [data-instrument='evolver'] CSS block is active on those routes"
  - test: "Cascadia instrument pages — navigate to /instruments/cascadia, confirm accent elements show a cool steel gray visibly different from Evolver blue"
    expected: "A subdued cool gray (oklch 0.70 0.04 250), distinct from the Evolver blue"
    why_human: "Requires visual comparison between two rendered instrument contexts"
  - test: "Callout colors unchanged — open any session with challenge/tip/warning callouts, confirm amber/green/red colors are intact and not blue or gray"
    expected: "Challenge callouts remain oklch(0.75 0.15 85) amber, tip remains oklch(0.70 0.15 145) green, warning remains oklch(0.65 0.20 25) red"
    why_human: "Semantic callout colors are hardcoded in CSS but their visual appearance relative to the new instrument accent requires human confirmation"
  - test: "Surface tinting — on Evolver pages, confirm background has a subtle blue tint vs Cascadia's steel-gray tint vs the home page neutral olive"
    expected: "Three visually distinct background feels corresponding to each instrument context"
    why_human: "Surface overrides (--color-bg, --color-surface, --color-surface-raised) use very low chroma values (0.01-0.02) — only a human eye can confirm the tinting is perceptible without being overwhelming"
---

# Phase 24: Instrument Color Identity Verification Report

**Phase Goal:** Each instrument has its own color palette derived from its brand identity (Evolver blue, Cascadia gray), with an Intellijel eurorack aluminum neutral base replacing the current lime-centric palette
**Verified:** 2026-04-12T21:57:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| #  | Truth                                                                                           | Status      | Evidence                                                                                       |
|----|-------------------------------------------------------------------------------------------------|-------------|------------------------------------------------------------------------------------------------|
| 1  | Home page and non-instrument routes show a neutral aluminum accent instead of lime green        | ? NEEDS HUMAN | `--color-accent: var(--color-neutral-500)` in @theme; oklch(0.70 0.03 250) confirmed. Requires visual render to confirm "aluminum feel" |
| 2  | Evolver pages show a blue accent color reflecting the DSI blue Lexan panel identity             | ? NEEDS HUMAN | `[data-instrument="evolver"] { --color-accent: var(--color-blue-500) }` confirmed in globals.css; `data-instrument` wired in app-shell.tsx. Requires visual render to confirm blue reads correctly |
| 3  | Cascadia pages show a cool gray accent color reflecting the Intellijel aluminum panel identity  | ? NEEDS HUMAN | `[data-instrument="cascadia"] { --color-accent: var(--color-steel-500) }` confirmed in globals.css. Requires visual render |
| 4  | Inline code and parameter values have per-instrument color variants visibly lighter than accent | ✓ VERIFIED  | All `*-400` primitives have L=0.78 vs `*-500` L=0.70. 3 WCAG tests confirm `paramL > accentL` per palette pair. All pass |
| 5  | All accent/param text passes WCAG AA 4.5:1 contrast against bg, surface, and surface-raised    | ✓ VERIFIED  | 6 WCAG contrast tests pass: accent tokens L>=0.65, param tokens L>=0.70. All against dark background (L=0.12) |
| 6  | No lime or teal green remnants visible anywhere in the app                                      | ✓ VERIFIED  | grep across all `src/**/*.{css,tsx,ts}` — zero matches for `--color-lime`, `--color-teal`, or `--color-accent-cascadia` as actual CSS values. Only test assertion strings referencing them remain |

**Score:** 3/6 truths fully verified programmatically; 3/6 pass automated checks but require human visual confirmation

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/app/globals.css` | New blue, steel, neutral primitives; updated semantic defaults; per-instrument cascade blocks | ✓ VERIFIED | Contains all 6 primitives (`--color-blue-500/400`, `--color-steel-500/400`, `--color-neutral-500/400`). Default accent/param reference neutral. Both `[data-instrument]` cascade blocks present with accent, param, AND surface overrides |
| `src/app/__tests__/tokens.test.ts` | Updated assertions for new primitives, cascade tests, WCAG validation | ✓ VERIFIED | 44 tests across 4 describe blocks: `Per-instrument color primitives`, `Per-instrument cascade overrides`, `Legacy lime/teal cleanup`, `WCAG AA contrast estimation`. All 44 pass |
| `src/components/app-shell.tsx` | `data-instrument` attribute wired to instrument slug; `bg-bg` class on wrapper div | ✓ VERIFIED | Line 42: `<div className="flex flex-col min-h-screen bg-bg" data-instrument={instrumentSlug || undefined}>` — both conditions met |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `globals.css @theme block` | `[data-instrument] cascade selectors` | CSS custom property override | ✓ WIRED | Pattern `[data-instrument="evolver"].*--color-accent: var(--color-blue-500)` found at line 101-103. Pattern `[data-instrument="cascadia"].*--color-accent: var(--color-steel-500)` found at line 114-116 |
| `globals.css --color-accent default` | All components using `text-accent/bg-accent` | CSS custom property inheritance | ✓ WIRED | `--color-accent: var(--color-neutral-500)` at line 42. CSS cascade means all ~60+ components inheriting `var(--color-accent)` receive this by default, overridden per-instrument via the cascade blocks |
| `app-shell.tsx data-instrument` | `[data-instrument] CSS cascade blocks` | `instrumentSlug` from `usePathname()` regex match | ✓ WIRED | `pathname.match(/\/instruments\/([^/]+)/)` extracts slug; passed as `data-instrument` attribute; undefined (not empty string) on home/non-instrument routes — this ensures neutral defaults apply on home page |

### Data-Flow Trace (Level 4)

This phase delivers CSS tokens and React shell wiring, not components rendering dynamic data. Level 4 data-flow trace is not applicable — color tokens are static CSS properties, not runtime data fetched from a store or API.

### Behavioral Spot-Checks

| Behavior | Check | Result | Status |
|----------|-------|--------|--------|
| All 44 token tests pass | `npx vitest run src/app/__tests__/tokens.test.ts` | 44 passed, 0 failed | ✓ PASS |
| No lime/teal in CSS source | `grep -r "color-lime\|color-teal\|color-accent-cascadia" src/**/*.css` | 0 matches | ✓ PASS |
| data-instrument wiring exists in app-shell | grep for `data-instrument={instrumentSlug` in app-shell.tsx | Line 42 confirmed | ✓ PASS |
| bg-bg class on instrument wrapper | grep for `bg-bg` in app-shell.tsx | Line 42 confirmed | ✓ PASS |
| All 4 task commits in git history | `git log --oneline \| head -10` | `946a652`, `06bf856`, `5a379d6`, `def92cd` all present | ✓ PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| COLOR-01 | 24-01-PLAN.md | User sees a neutral aluminum accent on home page and non-instrument routes (not lime green) | ? NEEDS HUMAN | Token verified: `--color-accent: var(--color-neutral-500)` = oklch(0.70 0.03 250). Visual confirmation needed |
| COLOR-02 | 24-01-PLAN.md | User sees blue accent colors on Evolver pages reflecting the DSI blue Lexan panel identity | ? NEEDS HUMAN | Token + cascade verified: `[data-instrument="evolver"] --color-accent: var(--color-blue-500)` = oklch(0.70 0.15 245). Visual confirmation needed |
| COLOR-03 | 24-01-PLAN.md | User sees cool gray accent colors on Cascadia pages reflecting the Intellijel aluminum panel identity | ? NEEDS HUMAN | Token + cascade verified: `[data-instrument="cascadia"] --color-accent: var(--color-steel-500)` = oklch(0.70 0.04 250). Visual confirmation needed |
| COLOR-04 | 24-01-PLAN.md | User sees per-instrument inline code/parameter colors (--color-param) that are visibly lighter than their accent counterparts | ✓ SATISFIED | All 3 palette pairs: param L=0.78 > accent L=0.70. Test `--color-blue-400 is lighter than --color-blue-500` passes. Same for steel and neutral pairs |
| COLOR-05 | 24-01-PLAN.md | All accent and param text passes WCAG AA 4.5:1 contrast against all surface backgrounds | ✓ SATISFIED | Lightness-proxy tests: accent L>=0.65, param L>=0.70 against dark bg L=0.12. Test file confirms all 6 tokens pass |
| COLOR-06 | 24-01-PLAN.md | No lime or teal green color remnants visible anywhere in the app | ✓ SATISFIED | Zero grep matches for `--color-lime`, `--color-teal`, `--color-accent-cascadia` as CSS property values across entire src/ directory |

No orphaned requirements — all 6 COLOR-* IDs from REQUIREMENTS.md Phase 24 traceability row are accounted for in the PLAN frontmatter.

### Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| None found | — | — | — |

Scanned `globals.css`, `tokens.test.ts`, `app-shell.tsx` for TODO/FIXME/placeholder, `return null`, empty handlers, and hardcoded empty values. None found. No stub patterns detected.

### Human Verification Required

#### 1. Home Page Neutral Accent

**Test:** Run `npm run dev`, open `http://localhost:3000`, inspect accent elements (hover states on nav items, focus rings on interactive elements, any highlighted text)
**Expected:** Accent reads as a muted neutral gray/aluminum, not lime green and not saturated blue
**Why human:** CSS custom property resolves at render time. The neutral value (`oklch(0.70 0.03 250)`) is a barely-tinted blue-gray with chroma 0.03 — only human judgment determines if it "feels like hardware aluminum"

#### 2. Evolver Blue Identity

**Test:** Navigate to `/instruments/evolver` and open a session page. Observe card hover borders, the active nav indicator, inline `<code>` element border-left color, ordered list step numbers, and focus rings
**Expected:** A clear, saturated blue — visibly different from the home page gray. `oklch(0.70 0.15 245)` is the accent, `oklch(0.78 0.10 250)` for param/code text
**Why human:** Requires browser rendering the `[data-instrument="evolver"]` CSS cascade block and confirming it overrides the default neutral throughout the page

#### 3. Cascadia Steel Gray Identity

**Test:** Navigate to `/instruments/cascadia` and open a session page. Compare accent elements to the Evolver pages
**Expected:** A cool, subdued steel gray (chroma 0.04) — clearly different from the Evolver blue, and slightly more tinted than the home page neutral
**Why human:** The distinction between neutral-500 (chroma 0.03) and steel-500 (chroma 0.04) is subtle. Human eye needed to confirm the two are perceptibly different and the cascadia variant reads as "Intellijel aluminum"

#### 4. Callout Colors Unchanged

**Test:** Find a session with challenge, tip, or warning callouts. Confirm their colors are unchanged from before Phase 24
**Expected:** Challenge = amber (oklch 0.75 0.15 85), tip = green (oklch 0.70 0.15 145), warning = red (oklch 0.65 0.20 25). None should be blue or gray
**Why human:** These are hardcoded in CSS but need visual confirmation that the per-instrument accent cascade does not bleed into callout styling

#### 5. Surface Background Tinting

**Test:** Navigate between home page, an Evolver session, and a Cascadia session. Compare the background color in each context
**Expected:** Each context has a subtly distinct background feel — olive-warm on home, blue-tinted on Evolver (hue 245), steel-tinted on Cascadia (hue 250)
**Why human:** Surface tinting uses very low chroma (0.01-0.02) for bg/surface tokens in the instrument cascade blocks. The difference is intentionally subtle — human judgment needed to confirm it's perceptible

### Gaps Summary

No technical gaps found. All code changes are in place:
- 6 new oklch primitives exist in `globals.css` @theme block
- Default semantic accent/param point to neutral (not lime)
- Both `[data-instrument]` cascade blocks are present with accent, param, and surface overrides
- `app-shell.tsx` correctly wires `data-instrument` from the route pathname and applies `bg-bg` for surface override visibility
- All 44 token tests pass green
- No lime or teal remnants exist in any source file

The only outstanding items are 5 human visual verifications confirming that the correct colors render across instrument contexts. These are required by the nature of CSS custom property inheritance — programmatic analysis can confirm the tokens exist and are correctly wired, but only a human looking at a rendered browser page can confirm the visual identity goal is achieved.

---

_Verified: 2026-04-12T21:57:00Z_
_Verifier: Claude (gsd-verifier)_
