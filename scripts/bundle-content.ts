#!/usr/bin/env tsx

/**
 * Bundle content from project root directories into src/content/
 * for use in demo mode (no vault path configured).
 *
 * Copies:
 *   instruments/ -> src/content/instruments/
 *   sessions/    -> src/content/sessions/
 *   patches/     -> src/content/patches/
 *   references/  -> src/content/references/
 */

import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DEST = path.join(ROOT, 'src', 'content');

interface CopyStats {
  dirs: number;
  files: number;
}

function copyDir(src: string, dest: string): CopyStats {
  const stats: CopyStats = { dirs: 0, files: 0 };

  if (!fs.existsSync(src)) {
    console.warn(`  SKIP: ${src} does not exist`);
    return stats;
  }

  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });

  // Count what was copied
  const entries = fs.readdirSync(dest, { withFileTypes: true, recursive: true });
  for (const entry of entries) {
    if (entry.isDirectory()) stats.dirs++;
    else stats.files++;
  }

  return stats;
}

function ensurePatchesReadme(dest: string): void {
  const readmePath = path.join(dest, 'patches', 'evolver', 'README.md');
  if (!fs.existsSync(readmePath)) {
    fs.mkdirSync(path.dirname(readmePath), { recursive: true });
    fs.writeFileSync(
      readmePath,
      `# Evolver Patches

This directory stores documented patches created during learning sessions.

Each patch file includes full parameter values so you can recreate it exactly on
your Evolver. Patches are created as outputs of sessions -- every session produces
something tangible, and patches are the most common output type.

No patches have been created yet. Work through the sessions and your patches will
appear here as you go.
`,
      'utf-8',
    );
    console.log('  Created patches/evolver/README.md (placeholder)');
  }
}

function main(): void {
  console.log('Bundling content into src/content/\n');

  const sources = ['instruments', 'sessions', 'patches', 'references'];
  let totalFiles = 0;

  for (const dir of sources) {
    const src = path.join(ROOT, dir);
    const dest = path.join(DEST, dir);
    const stats = copyDir(src, dest);
    totalFiles += stats.files;
    console.log(`  ${dir}/: ${stats.files} files copied`);
  }

  // Ensure patches/evolver/README.md exists even if patches/ was empty
  ensurePatchesReadme(DEST);

  console.log(`\nDone. ${totalFiles} total files bundled into src/content/`);
}

main();
