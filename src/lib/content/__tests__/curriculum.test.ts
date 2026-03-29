import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { InstrumentFileSchema, SessionSchema } from '../schemas.js';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');
const SESSIONS_DIR = path.join(CONTENT_ROOT, 'sessions', 'evolver');
const INSTRUMENTS_DIR = path.join(CONTENT_ROOT, 'instruments', 'evolver');
const REFERENCES_DIR = path.join(CONTENT_ROOT, 'references');

function getSessionFiles(): string[] {
  return fs
    .readdirSync(SESSIONS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort();
}

function readSession(filename: string): { data: Record<string, unknown>; content: string } {
  const raw = fs.readFileSync(path.join(SESSIONS_DIR, filename), 'utf-8');
  return matter(raw);
}

describe('session count', () => {
  it('has at least 30 session files in src/content/sessions/evolver/', () => {
    const files = getSessionFiles();
    expect(files.length).toBeGreaterThanOrEqual(30);
  });
});

describe('session structure', () => {
  const files = getSessionFiles();

  it.each(files)('%s contains required sections', (filename) => {
    const { content } = readSession(filename);

    // Warm-Up (case-insensitive)
    expect(content).toMatch(/## Warm-[Uu]p/);
    // Setup
    expect(content).toMatch(/## Setup/);
    // Exercises (either ## Exercises or ### Exercise)
    expect(content).toMatch(/###? Exercise/);
    // Output Checklist
    expect(content).toMatch(/## Output Checklist/);
  });
});

describe('adhd', () => {
  const files = getSessionFiles();

  it.each(files)('%s has duration between 5 and 30 minutes', (filename) => {
    const { data } = readSession(filename);
    const parsed = SessionSchema.safeParse(data);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.duration).toBeGreaterThanOrEqual(5);
      expect(parsed.data.duration).toBeLessThanOrEqual(30);
    }
  });

  it.each(files)('%s has valid output_type', (filename) => {
    const { data } = readSession(filename);
    const parsed = SessionSchema.safeParse(data);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(['patch', 'technique', 'recording', 'composition']).toContain(parsed.data.output_type);
    }
  });
});

describe('basic-patch', () => {
  it('exists and has valid InstrumentFileSchema frontmatter with type basic-patch', () => {
    const filePath = path.join(INSTRUMENTS_DIR, 'basic-patch.md');
    expect(fs.existsSync(filePath)).toBe(true);

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const parsed = InstrumentFileSchema.parse(data);
    expect(parsed.type).toBe('basic-patch');

    // Should contain at least 20 parameter table rows (| ... | ... |)
    const tableRows = content.match(/^\|[^|]+\|[^|]+\|/gm) || [];
    // Filter out header separator rows (|---|---|)
    const dataRows = tableRows.filter((row) => !row.match(/^\|\s*-+\s*\|/));
    expect(dataRows.length).toBeGreaterThanOrEqual(20);
  });
});

describe('instrument-docs', () => {
  const expectedFiles = [
    { filename: 'overview.md', type: 'overview' },
    { filename: 'signal-flow.md', type: 'signal-flow' },
    { filename: 'basic-patch.md', type: 'basic-patch' },
    { filename: 'modules.md', type: 'modules' },
  ] as const;

  it.each(expectedFiles)('$filename exists with correct type $type', ({ filename, type }) => {
    const filePath = path.join(INSTRUMENTS_DIR, filename);
    expect(fs.existsSync(filePath)).toBe(true);

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(raw);
    const parsed = InstrumentFileSchema.parse(data);
    expect(parsed.type).toBe(type);
  });
});

describe('pdf-access', () => {
  it('src/content/references/ directory exists', () => {
    expect(fs.existsSync(REFERENCES_DIR)).toBe(true);
  });

  it('contains at least 1 PDF file', () => {
    const files = fs.readdirSync(REFERENCES_DIR);
    const pdfs = files.filter((f) => f.toLowerCase().endsWith('.pdf'));
    expect(pdfs.length).toBeGreaterThanOrEqual(1);
  });
});
