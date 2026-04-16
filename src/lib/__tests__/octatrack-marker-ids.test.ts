import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { CONTROL_METADATA, SECTION_BOUNDS } from '@/lib/octatrack-panel-data';

/**
 * Octatrack session panel-marker validator (Phase 25 Wave 0).
 *
 * Walks every `sessions/octatrack/*.md` file and extracts
 * `<div data-octatrack-panel ...></div>` markers. For each marker, parses
 * `data-highlights`, `data-knobs`, `data-sections`, and `data-zoom` attrs
 * and asserts that every referenced control ID exists in CONTROL_METADATA
 * and every referenced section ID exists in SECTION_BOUNDS.
 *
 * Wave 0 state: sessions contain no markers yet, so this test passes
 * trivially (0 invalid IDs found). Wave 3 (plan 25-03a/b) will add markers
 * to sessions — this validator catches typos the moment they land.
 *
 * The regex mirrors the authoritative OCTATRACK_PANEL_RE + attr parsing
 * in `src/components/session-detail.tsx` (kept in sync manually — if that
 * regex changes, update this file too).
 */

const SESSIONS_DIR = join(process.cwd(), 'sessions/octatrack');
const MARKER_RE = /<div data-octatrack-panel((?:[^>"]|"[^"]*")*)>\s*<\/div>/g;
const ATTR_RE = /data-(highlights|knobs|sections|zoom)="([^"]*)"/g;

function extractIds(attrString: string): { controlIds: string[]; sectionIds: string[] } {
  const controlIds: string[] = [];
  const sectionIds: string[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(ATTR_RE);
  while ((m = re.exec(attrString)) !== null) {
    const kind = m[1];
    const value = m[2];
    if (kind === 'highlights' || kind === 'knobs') {
      for (const pair of value.split(',')) {
        const id = pair.split(':')[0].trim();
        if (id) controlIds.push(id);
      }
    } else if (kind === 'sections') {
      for (const id of value.split(',')) {
        const trimmed = id.trim();
        if (trimmed) sectionIds.push(trimmed);
      }
    } else if (kind === 'zoom' && value !== 'false') {
      for (const id of value.split(',')) {
        const trimmed = id.trim();
        if (trimmed) sectionIds.push(trimmed);
      }
    }
  }
  return { controlIds, sectionIds };
}

describe('Octatrack session panel markers', () => {
  const sessionFiles = existsSync(SESSIONS_DIR)
    ? readdirSync(SESSIONS_DIR).filter((f) => f.endsWith('.md'))
    : [];

  it('has at least one session file to validate', () => {
    expect(sessionFiles.length).toBeGreaterThan(0);
  });

  it('imports CONTROL_METADATA and SECTION_BOUNDS from the authoritative source', () => {
    // Guard: these objects must be non-empty. If the import ever resolves
    // to `undefined` or an empty record, every marker-ID test would pass
    // vacuously — this assertion catches that failure mode.
    expect(Object.keys(CONTROL_METADATA).length).toBeGreaterThan(0);
    expect(Object.keys(SECTION_BOUNDS).length).toBeGreaterThan(0);
  });

  for (const file of sessionFiles) {
    it(`${file}: all panel-marker IDs exist in CONTROL_METADATA or SECTION_BOUNDS`, () => {
      const content = readFileSync(join(SESSIONS_DIR, file), 'utf-8');
      let match: RegExpExecArray | null;
      const markerRe = new RegExp(MARKER_RE);
      const invalidControls: string[] = [];
      const invalidSections: string[] = [];
      while ((match = markerRe.exec(content)) !== null) {
        const { controlIds, sectionIds } = extractIds(match[1]);
        for (const id of controlIds) {
          if (!(id in CONTROL_METADATA)) invalidControls.push(id);
        }
        for (const id of sectionIds) {
          if (!(id in SECTION_BOUNDS)) invalidSections.push(id);
        }
      }
      expect(invalidControls, `invalid control IDs in ${file}`).toEqual([]);
      expect(invalidSections, `invalid section IDs in ${file}`).toEqual([]);
    });
  }
});
