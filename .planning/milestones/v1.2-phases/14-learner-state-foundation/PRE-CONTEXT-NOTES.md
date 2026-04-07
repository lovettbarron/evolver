# Phase 14: Pre-Context Notes

Captured before formal discuss-phase. Feed into discussion when v1.2 activates.

## Content Sourcing Architecture

**Issue discovered:** `getContentRoot()` in `src/lib/content/reader.ts` uses a single root (vault OR bundled) for all content types. When `vaultPath` is set in `evolver.config.json`, sessions/instruments/patches all read from the vault.

**Problem:** Cascadia sessions exist in `src/content/sessions/cascadia/` (bundled) but not in `~/song/sessions/cascadia/` (vault). The vault only has `evolver/` sessions. Result: Cascadia sessions page is empty.

**User's decision:** Content should split into two categories:
- **App-authored (always bundled):** sessions, instruments, modules — curriculum ships with the app, not user data
- **User-owned (vault):** patches, progress — personal data that lives in Obsidian

**Implication for Phase 14:** The content reader needs a split sourcing strategy. `listSessions()` and instrument helpers should always read from `src/content/`. Only patches and learner state (completion, last-visited) should consult the vault. This directly affects LSTATE-03 (vault+manual merge) since the vault's role narrows to patches and progress, not curriculum.

**File:** `src/lib/content/reader.ts` — `getContentRoot()` at line 23
