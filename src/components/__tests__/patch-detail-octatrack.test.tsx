import { describe, it } from 'vitest';

/**
 * PatchDetail — octatrack project-state rendering (Phase 25 Wave 0 stubs).
 *
 * Octatrack patches are "project-state" patches: no cable_routing (all
 * Octatrack I/O is rear-panel audio, not patched CV like Cascadia) and
 * no knob_settings (Octatrack state is the PRJ/PART/BANK stack, not a
 * knob snapshot like Evolver). Patch rendering therefore needs to:
 *   1. render the markdown body as-is
 *   2. render <OctatrackPanel /> below the body (hero subset, highlights
 *      the keys mentioned in the session text)
 *   3. NOT render a cable-routing section or a knob-settings table
 *
 * Wave 0 is stub-only: a real assertion needs (a) the Wave 2 bundled
 * octatrack instrument.json + at least one bundled patch, and (b) the
 * Wave 2 PatchDetail branch that emits <OctatrackPanel /> below the body.
 * Wave 2 (plan 25-02) flips the todos into real `it(...)` assertions.
 */

describe('PatchDetail — octatrack project-state rendering', () => {
  it.todo('renders without cable_routing and without knob_settings for octatrack patches');
  it.todo('renders OctatrackPanel below the markdown body for octatrack patches');
  it.todo('does not render cable-routing diagram section for octatrack patches');
});
