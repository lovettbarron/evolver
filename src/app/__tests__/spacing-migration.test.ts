import { describe, test, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Spacing migration test
 *
 * Ensures no component or page file contains hardcoded numeric Tailwind
 * spacing classes (p-1, p-4, gap-6, mt-8, etc.). All spacing must use
 * the semantic token scale defined in @theme (xs, sm, md, lg, xl, 2xl, 3xl).
 *
 * Excluded:
 * - evolver-panel.tsx, cascadia-panel.tsx (intentionally isolated SVG panels)
 * - __tests__/ directories
 * - node_modules/
 * - .claude/worktrees/
 * - src/lib/cascadia-cable-lookup.ts (data file)
 */

const EXCLUDED_FILES = [
  'evolver-panel.tsx',
  'cascadia-panel.tsx',
  'cascadia-cable-lookup.ts',
];

const EXCLUDED_DIRS = ['__tests__', 'node_modules', '.claude'];

// Matches hardcoded numeric spacing like p-1, p-2, p-4, gap-6, mt-8, etc.
// Does NOT match p-0 (zero has no token), p-xs, p-md (already tokens),
// or non-spacing like p-10 mapped to p-1 accidentally (word-boundary prevents this).
const NUMERIC_SPACING_PATTERN =
  /\b(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y)-([1-9]\d*)\b/g;

function collectTsxFiles(dir: string): string[] {
  const results: string[] = [];

  function walk(currentDir: string) {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(currentDir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        if (EXCLUDED_DIRS.includes(entry.name)) continue;
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
        if (EXCLUDED_FILES.includes(entry.name)) continue;
        results.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

describe('Spacing migration', () => {
  test('no .tsx files contain hardcoded numeric spacing classes', () => {
    const srcDir = path.resolve(__dirname, '../../');
    const componentsDir = path.join(srcDir, 'components');
    const appDir = path.join(srcDir, 'app');

    const files = [
      ...collectTsxFiles(componentsDir),
      ...collectTsxFiles(appDir),
    ];

    expect(files.length).toBeGreaterThan(0);

    const violations: { file: string; line: number; match: string; text: string }[] = [];

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let match: RegExpExecArray | null;
        NUMERIC_SPACING_PATTERN.lastIndex = 0;

        while ((match = NUMERIC_SPACING_PATTERN.exec(line)) !== null) {
          violations.push({
            file: path.relative(srcDir, filePath),
            line: i + 1,
            match: match[0],
            text: line.trim(),
          });
        }
      }
    }

    if (violations.length > 0) {
      const report = violations
        .map((v) => `  ${v.file}:${v.line} — "${v.match}" in: ${v.text}`)
        .join('\n');
      expect.fail(
        `Found ${violations.length} hardcoded numeric spacing class(es):\n${report}\n\n` +
          'Use token-based spacing instead (xs, sm, md, lg, xl, 2xl, 3xl).',
      );
    }
  });
});
