# Phase 26: Data Model + Content Pipeline - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-17
**Phase:** 26-data-model-content-pipeline
**Areas discussed:** Module config shape, Content directory layout, Category taxonomy, Session file paths

---

## Module Config Shape

### Q1: How much hardware metadata should module.json capture?

| Option | Description | Selected |
|--------|-------------|----------|
| Essential only | display_name, tagline, manufacturer, hp_width, categories[], reference_pdfs[]. Enough for rendering and taxonomy. | |
| Full hardware spec | Add power_specs, patch_point_count, control_count, depth_mm, firmware_version. | |
| Essential + power | Essential fields plus power_specs (+12V/-12V mA draw). Practical info learners reference. | ✓ |

**User's choice:** Essential + power
**Notes:** Power draw is practical info learners check when adding modules to a case.

### Q2: Should module.json include an init_state reference?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, init_state field | String pointing to init/default state doc. | |
| Not in config | Init state is curriculum content, not hardware metadata. Config stays lean. | ✓ |
| Optional field | init_state as optional string for modules with meaningful zero state. | |

**User's choice:** Not in config (Recommended)
**Notes:** Init state belongs in curriculum content (overview.md or sessions), not hardware metadata.

---

## Content Directory Layout

### Q3: Where should module directories live in the content hierarchy?

| Option | Description | Selected |
|--------|-------------|----------|
| Top-level modules/ | modules/<slug>/ parallel to instruments/<slug>/. Clean separation. | ✓ |
| Under instruments/ | instruments/<slug>/ for everything, with a distinguishing flag. | |
| Nested under eurorack/ | eurorack/modules/<slug>/ — namespaced for future eurorack content. | |

**User's choice:** Top-level modules/ (Recommended)
**Notes:** None.

### Q4: What files should live inside each modules/<slug>/ directory?

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal: module.json + overview.md | Config and overview. Additional docs added as curriculum needs emerge. | ✓ |
| Full mirror of instruments | module.json, overview.md, signal-flow.md, controls/ subfolder. | |
| Config only, docs elsewhere | Just module.json. Overview and curriculum docs live elsewhere. | |

**User's choice:** Minimal: module.json + overview.md (Recommended)
**Notes:** None.

### Q5: Triple-write pipeline for module content?

| Option | Description | Selected |
|--------|-------------|----------|
| Same triple-write | modules/<slug>/ in working tree, src/content/modules/, ~/song/modules/. | ✓ |
| Skip working tree copy | Only src/content/modules/ and ~/song/modules/. | |

**User's choice:** Same triple-write (Recommended)
**Notes:** Consistent with instrument pattern, Obsidian vault stays source of truth.

---

## Category Taxonomy

### Q6: Should the category list be a fixed enum or free-form array?

| Option | Description | Selected |
|--------|-------------|----------|
| Fixed enum | Zod enum of known categories. Catches typos, easy to extend. | ✓ |
| Free-form string array | Any string works. Max flexibility, no typo protection. | |
| Enum + 'other' escape hatch | Fixed enum with optional free-form tags array. | |

**User's choice:** Fixed enum (Recommended)
**Notes:** None.

### Q7: What should the initial category enum values be?

| Option | Description | Selected |
|--------|-------------|----------|
| Functional roles | vco, filter, effects, modulator, function-generator, envelope-generator. | ✓ |
| Broader groupings | sound-source, sound-shaper, modulation, utility. | |
| Manufacturer-style | oscillator, filter, delay-reverb, modulator, function, sequencer, utility. | |

**User's choice:** Functional roles (Recommended)
**Notes:** None.

---

## Session File Paths

### Q8: Where should eurorack module sessions live?

| Option | Description | Selected |
|--------|-------------|----------|
| sessions/<module-slug>/ | Same pattern as instruments. Works with existing listSessions(). | ✓ |
| sessions/modules/<module-slug>/ | Namespaced to avoid slug collision. Requires reader update. | |
| Inside module directory | modules/maths/sessions/. Self-contained but breaks convention. | |

**User's choice:** sessions/<module-slug>/ (Recommended)
**Notes:** None.

### Q9: How should module sessions be distinguished from instrument sessions?

| Option | Description | Selected |
|--------|-------------|----------|
| Frontmatter field | instrument_type in SessionSchema: 'instrument' or 'eurorack_module'. | ✓ |
| Separate schema | ModuleSessionSchema extends SessionSchema. | |
| Directory-based detection | Detect based on path matching known modules. | |

**User's choice:** Frontmatter field (Recommended)
**Notes:** None.

### Q10: Combine module→section rename with instrument_type addition?

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, combine both | Single batch: rename + add instrument_type: instrument. One migration pass. | ✓ |
| Rename only, add type later | Just module→section now. Two migration passes. | |

**User's choice:** Yes, combine both (Recommended)
**Notes:** None.

---

## Claude's Discretion

- Exact Zod schema field structure for power_specs
- Migration script approach for 95-session rename + type addition
- `discoverModules()` implementation details

## Deferred Ideas

None — discussion stayed within phase scope.
