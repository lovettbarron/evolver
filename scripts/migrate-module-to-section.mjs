#!/usr/bin/env node
/**
 * Migration script: Rename `module` -> `section` in session frontmatter
 * and add `instrument_type: instrument` field.
 *
 * Processes files in 4 locations:
 *   1. sessions/ (working tree)
 *   2. src/content/sessions/ (bundled)
 *   3. ~/song/sessions/ (vault)
 *   4. src/lib/content/__tests__/__fixtures__/sessions/ (fixtures)
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import matter from 'gray-matter';

const ROOT = path.resolve(import.meta.dirname, '..');

const locations = [
  { label: 'sessions/', dir: path.join(ROOT, 'sessions') },
  { label: 'src/content/sessions/', dir: path.join(ROOT, 'src/content/sessions') },
  { label: '~/song/sessions/', dir: path.join(os.homedir(), 'song', 'sessions') },
  { label: 'fixtures/', dir: path.join(ROOT, 'src/lib/content/__tests__/__fixtures__/sessions') },
];

function findMdFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

let totalProcessed = 0;

for (const loc of locations) {
  const files = findMdFiles(loc.dir);
  let count = 0;

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(raw);

    let changed = false;

    // Rename module -> section
    if ('module' in parsed.data && !('section' in parsed.data)) {
      parsed.data.section = parsed.data.module;
      delete parsed.data.module;
      changed = true;
    }

    // Add instrument_type if missing
    if (!('instrument_type' in parsed.data)) {
      parsed.data.instrument_type = 'instrument';
      changed = true;
    }

    if (changed) {
      // Reorder keys: put section where module was, insert instrument_type after instrument
      const ordered = {};
      const origKeys = Object.keys(matter(raw).data);
      for (const key of origKeys) {
        if (key === 'module') {
          ordered.section = parsed.data.section;
        } else {
          ordered[key] = parsed.data[key];
        }
        // Insert instrument_type right after instrument
        if (key === 'instrument' && !origKeys.includes('instrument_type')) {
          ordered.instrument_type = parsed.data.instrument_type;
        }
      }
      // Catch any remaining keys
      for (const key of Object.keys(parsed.data)) {
        if (!(key in ordered)) {
          ordered[key] = parsed.data[key];
        }
      }

      const output = matter.stringify(parsed.content, ordered);
      fs.writeFileSync(filePath, output, 'utf-8');
      count++;
    }
  }

  console.log(`${loc.label}: ${count} files migrated (${files.length} found)`);
  if (files.length > 0 && count === 0) {
    // Files found but none migrated — might already be migrated, check
    const sample = matter(fs.readFileSync(files[0], 'utf-8'));
    if ('section' in sample.data) {
      console.log(`  (already migrated)`);
    }
  }
  totalProcessed += count;
}

console.log(`\nTotal: ${totalProcessed} files migrated`);

if (totalProcessed === 0) {
  // Check if already migrated
  const sampleFile = findMdFiles(locations[0].dir)[0];
  if (sampleFile) {
    const sample = matter(fs.readFileSync(sampleFile, 'utf-8'));
    if ('section' in sample.data && 'instrument_type' in sample.data) {
      console.log('All files already migrated. Exiting successfully.');
      process.exit(0);
    }
  }
  console.error('ERROR: No files were migrated in any location!');
  process.exit(1);
}
