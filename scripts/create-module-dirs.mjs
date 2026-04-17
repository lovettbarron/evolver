#!/usr/bin/env node
/**
 * Create module directories with module.json and overview.md
 * Triple-write to: modules/, src/content/modules/, ~/song/modules/
 */
import fs from 'fs';
import path from 'path';
import os from 'os';

const MODULES = [
  {
    slug: 'maths',
    config: {
      display_name: 'Maths',
      tagline: 'Analog computer for control voltage',
      manufacturer: 'Make Noise',
      hp_width: 20,
      categories: ['function-generator', 'envelope-generator', 'modulator'],
      power_specs: { plus_12v_ma: 60, minus_12v_ma: 50 },
      reference_pdfs: [{ label: 'Maths Manual (2020 Rev)', file: 'maths-manual.pdf' }],
    },
  },
  {
    slug: 'plaits',
    config: {
      display_name: 'Plaits',
      tagline: 'Macro oscillator with 16 synthesis models',
      manufacturer: 'Mutable Instruments',
      hp_width: 12,
      categories: ['vco'],
      power_specs: { plus_12v_ma: 50, minus_12v_ma: 5 },
      reference_pdfs: [{ label: 'Plaits Manual', file: 'plaits-manual.pdf' }],
    },
  },
  {
    slug: 'beads',
    config: {
      display_name: 'Beads',
      tagline: 'Granular texture synthesizer',
      manufacturer: 'Mutable Instruments',
      hp_width: 14,
      categories: ['effects'],
      power_specs: { plus_12v_ma: 100, minus_12v_ma: 10 },
      reference_pdfs: [{ label: 'Beads Manual', file: 'beads-manual.pdf' }],
    },
  },
  {
    slug: 'just-friends',
    config: {
      display_name: 'Just Friends',
      tagline: 'Six-channel function generator and oscillator',
      manufacturer: 'Mannequins',
      hp_width: 14,
      categories: ['vco', 'modulator', 'envelope-generator'],
      power_specs: { plus_12v_ma: 55, minus_12v_ma: 20 },
      reference_pdfs: [{ label: 'Just Friends Manual', file: 'just-friends-manual.pdf' }],
    },
  },
  {
    slug: 'crow',
    config: {
      display_name: 'Crow',
      tagline: 'Scriptable USB-CV bridge with i2c',
      manufacturer: 'Monome',
      hp_width: 2,
      categories: ['modulator'],
      power_specs: { plus_12v_ma: 50, minus_12v_ma: 0 },
      reference_pdfs: [{ label: 'Crow Documentation', file: 'crow-docs.pdf' }],
    },
  },
  {
    slug: 'swells',
    config: {
      display_name: 'Swells',
      tagline: 'Multi-algorithm stereo reverb with swell generator',
      manufacturer: 'Intellijel',
      hp_width: 20,
      categories: ['effects'],
      power_specs: { plus_12v_ma: 146, minus_12v_ma: 21 },
      reference_pdfs: [{ label: 'Swells Manual', file: 'swells-manual.pdf' }],
    },
  },
  {
    slug: 'ikarie',
    config: {
      display_name: 'Ikarie',
      tagline: 'Stereo dual-peak resonant filter with envelope follower',
      manufacturer: 'Bastl Instruments',
      hp_width: 8,
      categories: ['filter'],
      power_specs: { plus_12v_ma: 50, minus_12v_ma: 40 },
      reference_pdfs: [{ label: 'Ikarie Manual', file: 'ikarie-manual.pdf' }],
    },
  },
];

function makeOverview(mod) {
  return `---
type: overview
instrument: ${mod.slug}
title: "${mod.config.display_name} Overview"
manufacturer: "${mod.config.manufacturer}"
---

# ${mod.config.display_name}

Architecture, controls reference, and recommended init state will be added during curriculum development (Phase 29-31).
`;
}

const PROJECT_ROOT = process.cwd();
const TARGETS = [
  path.join(PROJECT_ROOT, 'modules'),
  path.join(PROJECT_ROOT, 'src', 'content', 'modules'),
  path.join(os.homedir(), 'song', 'modules'),
];

for (const mod of MODULES) {
  for (const target of TARGETS) {
    const dir = path.join(target, mod.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'module.json'), JSON.stringify(mod.config, null, 2) + '\n');
    fs.writeFileSync(path.join(dir, 'overview.md'), makeOverview(mod));
    console.log(`Created: ${dir}`);
  }
}

console.log(`\nDone: ${MODULES.length} modules x ${TARGETS.length} locations = ${MODULES.length * TARGETS.length} directories`);
