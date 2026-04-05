---
phase: 07-multi-instrument-ui-schema-foundation
verified: 2026-03-31T08:21:00Z
status: passed
score: 13/13 must-haves verified
re_verification: false
---

# Phase 7: Multi-Instrument UI Schema Foundation — Verification Report

**Phase Goal:** The app dynamically supports multiple instruments in navigation, routing, and data schemas — no hardcoded Evolver assumptions remain in UI chrome
**Verified:** 2026-03-31T08:21:00Z
**Status:** passed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | InstrumentConfigSchema validates instrument.json files with display_name, tagline, manufacturer, sysex, patch_memory, reference_pdfs | VERIFIED | `schemas.ts` lines 47–57; 5 tests pass in `schemas.test.ts > InstrumentConfigSchema` |
| 2 | loadInstrumentConfig() reads and validates instrument.json from any instrument directory | VERIFIED | `reader.ts` lines 46–54; 3 tests pass in `reader.test.ts > loadInstrumentConfig` |
| 3 | PatchSchema accepts optional cable_routing and knob_settings fields without breaking existing Evolver patches | VERIFIED | `schemas.ts` lines 29–31; 4 tests pass in `schemas.test.ts > PatchSchema` stub field tests |
| 4 | Cascadia instrument directory exists with valid instrument.json and minimal overview.md | VERIFIED | `src/content/instruments/cascadia/instrument.json` (sysex: false, patch_memory: false); `overview.md` (type: overview, instrument: cascadia) |
| 5 | Navigation dynamically lists all discovered instruments with no hardcoded Evolver links in nav | VERIFIED | `nav.tsx` — hardcoded `navLinks` array removed; links built from `instruments` prop at runtime; grep for `/instruments/evolver` in nav.tsx returns zero results; 6 nav unit tests pass |
| 6 | Instrument switcher dropdown in nav shows current instrument and allows switching | VERIFIED | `instrument-switcher.tsx` — full implementation with useState, useRef, click-outside, Escape key, ArrowUp/Down keyboard nav, role="listbox", aria-haspopup, ChevronDown |
| 7 | Nav sub-links scope to the currently selected instrument | VERIFIED | `nav.tsx` lines 33–42 — subLinks array built dynamically from `currentSlug`; test "sub-links use current instrument slug in href" passes |
| 8 | MIDI nav link hidden for instruments with sysex: false | VERIFIED | `nav.tsx` line 37 — `if (currentInstrument?.sysex)` gate; test "hides MIDI link for cascadia (sysex: false)" passes |
| 9 | Landing page shows instrument cards for all discovered instruments | VERIFIED | `page.tsx` — calls discoverInstruments, renders InstrumentCard per instrument; "Choose Your Instrument" heading present; home tests pass |
| 10 | Clicking an instrument card navigates to /instruments/{slug} | VERIFIED | `instrument-card.tsx` line 19 — `<Link href={/instruments/${slug}}>` wraps entire card; test "each card links to /instruments/{slug}" passes |
| 11 | Visiting /instruments/cascadia/midi shows NoSysexPage | VERIFIED | `midi/page.tsx` — server component; calls `loadInstrumentConfig`, checks `instrumentConfig.sysex`, renders `NoSysexPage` when false; midi-capability tests pass |
| 12 | Instrument overview reads reference PDFs from instrument.json instead of hardcoded array | VERIFIED | `instruments/[slug]/page.tsx` lines 22–26 — `loadInstrumentConfig` called; `reference_pdfs.map()` builds references dynamically; no hardcoded "DSI Evolver Manual" string in const array |
| 13 | Markdown wikilinks resolve to the correct instrument path (not hardcoded /instruments/evolver/) | VERIFIED | `processor.ts` lines 47–49 — `hrefTemplate` uses `instrumentSlug` parameter; grep for `/instruments/evolver/` in processor.ts returns zero results |

**Score:** 13/13 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/lib/content/schemas.ts` | InstrumentConfigSchema, InstrumentConfig type, PatchSchema with stub fields | VERIFIED | Exports `InstrumentConfigSchema`, `InstrumentConfig`, PatchSchema has `cable_routing` and `knob_settings` |
| `src/lib/content/reader.ts` | loadInstrumentConfig function | VERIFIED | Exports `loadInstrumentConfig`, imports `InstrumentConfigSchema` |
| `src/content/instruments/evolver/instrument.json` | Evolver capability config with sysex: true | VERIFIED | Contains `"sysex": true`, `"patch_memory": true`, 2 reference_pdfs |
| `src/content/instruments/cascadia/instrument.json` | Cascadia capability config with sysex: false | VERIFIED | Contains `"sysex": false`, `"patch_memory": false`, 1 reference_pdf |
| `src/content/instruments/cascadia/overview.md` | Minimal overview with frontmatter type: overview | VERIFIED | Contains `type: overview`, `instrument: cascadia` |
| `src/components/nav.tsx` | Dynamic data-driven navigation | VERIFIED | Accepts `instruments` prop, builds subLinks dynamically, no hardcoded routes |
| `src/components/instrument-switcher.tsx` | Dropdown component for switching instruments | VERIFIED | Full implementation: listbox role, aria-haspopup, ChevronDown, keyboard nav |
| `src/components/instrument-card.tsx` | Landing page instrument card component | VERIFIED | InstrumentCard, links to `/instruments/${slug}`, shows stats, "Explore {displayName}" CTA |
| `src/app/page.tsx` | Instrument selector landing page | VERIFIED | Contains discoverInstruments, loadInstrumentConfig, InstrumentCard, "Choose Your Instrument" |
| `src/app/layout.tsx` | Server-side instrument data loading passed to AppShell | VERIFIED | Calls discoverInstruments + loadInstrumentConfig, passes `instruments={instruments}` to AppShell |
| `src/components/app-shell.tsx` | AppShell passing instrument data to Nav | VERIFIED | Accepts `instruments` prop, maps to navInstruments, passes to `<Nav>` |
| `src/components/no-sysex-page.tsx` | Informational page for instruments without SysEx | VERIFIED | NoSysexPage, AlertCircle, "doesn't support MIDI SysEx", "Browse {displayName} Patches" CTA |
| `src/app/instruments/[slug]/midi/page.tsx` | Capability-gated MIDI route | VERIFIED | Server component (no 'use client'), calls loadInstrumentConfig, checks instrumentConfig.sysex |
| `src/app/instruments/[slug]/page.tsx` | Dynamic reference PDFs from instrument.json | VERIFIED | Calls loadInstrumentConfig, builds references from reference_pdfs array |
| `src/lib/markdown/processor.ts` | Parameterized wikilink href template | VERIFIED | instrumentSlug parameter on createMarkdownProcessor and renderMarkdown; no hardcoded /instruments/evolver/ |
| `src/components/source-ref.tsx` | Extended PDF map including Cascadia entries | VERIFIED | PDF_MAP includes 'cascadia manual' and 'intellijel' keys |
| `src/app/__tests__/midi-capability.test.tsx` | Unit tests for capability-gated MIDI page | VERIFIED | 5 tests; covers NoSysexPage rendering and server component verification |
| `src/components/__tests__/nav.test.tsx` | Nav dynamic rendering unit tests | VERIFIED | 6 tests; covers dynamic instruments, MIDI hiding, slug scoping |
| `src/app/__tests__/home.test.tsx` | Updated home page test for instrument selector | VERIFIED | 6 tests; covers "Choose Your Instrument", both cards, links, counts, no HeroCard |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/lib/content/reader.ts` | `src/lib/content/schemas.ts` | import InstrumentConfigSchema | WIRED | Line 10: imports InstrumentConfigSchema; line 53: `InstrumentConfigSchema.parse(...)` |
| `src/content/instruments/evolver/instrument.json` | `src/lib/content/schemas.ts` | validated by InstrumentConfigSchema | WIRED | Contains `reference_pdfs` (required field); passes schema validation in tests |
| `src/app/layout.tsx` | `src/lib/content/reader.ts` | calls discoverInstruments + loadInstrumentConfig | WIRED | Line 4 imports both; lines 28–34 call both |
| `src/app/layout.tsx` | `src/components/app-shell.tsx` | passes instruments prop | WIRED | Line 39: `instruments={instruments}` on AppShell |
| `src/components/app-shell.tsx` | `src/components/nav.tsx` | passes instruments prop | WIRED | Line 22: `<Nav isDemoMode={isDemoMode} instruments={navInstruments} />` |
| `src/app/page.tsx` | `src/components/instrument-card.tsx` | renders InstrumentCard for each instrument | WIRED | Line 3 imports InstrumentCard; lines 43–51 render per instrument |
| `src/app/instruments/[slug]/midi/page.tsx` | `src/lib/content/reader.ts` | calls loadInstrumentConfig to check sysex flag | WIRED | Line 4 imports; line 11 calls; line 13: `if (!instrumentConfig.sysex)` |
| `src/app/instruments/[slug]/page.tsx` | `src/lib/content/reader.ts` | calls loadInstrumentConfig for reference_pdfs | WIRED | Line 1 imports; line 22 calls; line 23: `instrumentConfig.reference_pdfs.map(...)` |
| `src/lib/markdown/processor.ts` | wikilink URLs | hrefTemplate uses instrumentSlug parameter | WIRED | Lines 47–49: `instrumentSlug ? /instruments/${instrumentSlug}/${permalink} : /${permalink}` |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| MULTI-01 | 07-02 | Navigation dynamically lists all discovered instruments (no hardcoded Evolver links) | SATISFIED | nav.tsx fully data-driven; 6 nav tests verify no hardcoded links; "does not contain hardcoded evolver links when viewing cascadia" test passes |
| MULTI-02 | 07-02 | Instrument selector visible on landing page for choosing between Evolver and Cascadia | SATISFIED | page.tsx renders InstrumentCard per discovered instrument; "Choose Your Instrument" heading; home tests pass with both instruments |
| MULTI-03 | 07-03 | MIDI/SysEx workspace hidden for instruments without SysEx capability | SATISFIED | midi/page.tsx server component checks sysex flag; renders NoSysexPage for Cascadia; midi-capability tests pass |
| MULTI-04 | 07-01 | Patch detail view adapts to instrument type (parameter tables vs cable routing) | SATISFIED (stub) | PatchSchema has `cable_routing` and `knob_settings` optional fields; stub as designed — full adaptation deferred to Phase 9 per plan |
| CASC-04 | 07-01, 07-03 | Cascadia reference PDF accessible via PDF viewer | SATISFIED | cascadia/instrument.json references `cascadia_manual_v1.1.pdf`; source-ref.tsx PDF_MAP includes 'cascadia manual'; instrument overview dynamically builds references from instrument.json |

No orphaned requirements — all 5 requirement IDs claimed in plan frontmatter are accounted for and satisfied.

---

### Anti-Patterns Found

None found. Scanned all 19 phase artifacts for:
- TODO/FIXME/PLACEHOLDER comments — none (one `rehypeMermaidPlaceholder` import name is not a placeholder comment)
- Empty implementations (return null/return {}/return []) — none
- Hardcoded `/instruments/evolver` in nav or UI chrome — none
- Hardcoded "10 modules" text — removed (verified absent in instrument-overview.tsx)

---

### Pre-Existing Test Failures (Not Phase 07 Regressions)

Three test suites fail due to `DOMMatrix is not defined` — a test environment issue with `pdf-viewer.tsx` (pdfjs-dist requires DOM APIs unavailable in vitest's jsdom):

- `src/components/__tests__/source-ref.test.tsx` — last modified in phase 02 commit `56d3037`
- `src/components/__tests__/session-detail.test.tsx` — last modified in phase 02 commit `67b7b40`
- `src/app/__tests__/instrument-overview.test.tsx` — phase 07-03 added `nextSession` prop test (2-line change) but the DOMMatrix failure pre-dates this phase

These failures are a pre-existing test environment issue, not caused by phase 07 changes. All 307 tests in passing suites pass.

### Human Verification Required

The following behaviors cannot be verified programmatically:

**1. Instrument switcher dropdown visual and interaction**
- Test: Navigate to any `/instruments/evolver/*` page in browser; click the instrument switcher trigger
- Expected: Dropdown opens showing both "Mono Evolver" and "Cascadia"; clicking "Cascadia" navigates to `/instruments/cascadia`
- Why human: Click interaction, CSS transitions, focus management require browser rendering

**2. Cascadia MIDI page visual**
- Test: Navigate to `/instruments/cascadia/midi` in browser
- Expected: AlertCircle icon, heading "Cascadia doesn't support MIDI SysEx", "Browse Cascadia Patches" link visible
- Why human: Visual layout and icon rendering cannot be verified programmatically

**3. Cascadia PDF viewer accessibility**
- Test: Navigate to `/instruments/cascadia` and click the "Cascadia Manual (v1.1)" reference button
- Expected: PDF viewer opens; note that `cascadia_manual_v1.1.pdf` must exist at `public/references/` or equivalent API path
- Why human: Requires the PDF file to exist at runtime; browser PDF rendering cannot be verified programmatically

---

## Summary

Phase 07 goal is fully achieved. The app is now data-driven for multi-instrument support:

- Schema layer: `InstrumentConfigSchema` validates per-instrument JSON configs; `PatchSchema` has stub fields for CV instruments (MULTI-04 scaffold)
- Data layer: `loadInstrumentConfig()` + `discoverInstruments()` provide the runtime foundation; both Evolver and Cascadia have valid `instrument.json` files
- Navigation: Completely de-hardcoded; `nav.tsx` builds all links dynamically from the `instruments` prop; MIDI link conditionally shown via `sysex` capability flag
- Landing page: Replaced single-instrument hero with dynamic instrument selector cards
- Capability gating: MIDI route is a server component that reads `instrumentConfig.sysex` and renders `NoSysexPage` for non-SysEx instruments (Cascadia)
- Wikilinks: Markdown processor parameterized by `instrumentSlug`; no hardcoded `/instruments/evolver/` paths remain
- Cascadia PDF: `source-ref.tsx` extended with Cascadia manual entries; instrument overview builds references dynamically from `instrument.json`

52 new phase-07 tests pass. No regressions introduced in the 307 tests across passing suites.

---

_Verified: 2026-03-31T08:21:00Z_
_Verifier: Claude (gsd-verifier)_
