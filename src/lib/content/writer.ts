import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { getContentRoot } from './reader';
import type { AppConfig } from './schemas';

export interface CapturedPatchInput {
  name: string;
  type: 'bass' | 'lead' | 'pad' | 'drum' | 'texture' | 'sequence';
  tags: string[];
  instrument: string;
  description: string;
  parameters: Record<string, number>;
  sequencer: {
    seq1_steps: number[];
    seq2_steps: number[];
    seq3_steps: number[];
    seq4_steps: number[];
  };
  programNumber?: number;
}

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function saveCapturedPatch(
  input: CapturedPatchInput,
  config: AppConfig,
): Promise<{ slug: string; mdPath: string; jsonPath: string }> {
  const root = getContentRoot(config);
  const dir = path.join(root, 'patches', input.instrument);
  const slug = toSlug(input.name);
  const mdPath = path.join(dir, `${slug}.md`);
  const jsonPath = path.join(dir, `${slug}.sysex.json`);

  // Check for existing files — do not overwrite
  try {
    await fs.access(mdPath);
    throw new Error(`Patch file already exists: ${slug}.md`);
  } catch (e: unknown) {
    if (e instanceof Error && e.message.startsWith('Patch file already exists')) throw e;
    // File doesn't exist, continue
  }

  // Ensure directory exists
  await fs.mkdir(dir, { recursive: true });

  // Build frontmatter
  const frontmatter: Record<string, unknown> = {
    name: input.name,
    type: input.type,
    session_origin: null,
    description: input.description,
    tags: input.tags,
    instrument: input.instrument,
    created: new Date().toISOString().split('T')[0],
    source: 'sysex' as const,
    capture_date: new Date().toISOString(),
  };
  if (input.programNumber !== undefined) {
    frontmatter.program_number = input.programNumber;
  }

  // Write markdown with frontmatter
  const mdContent = matter.stringify(
    `\n## Captured Patch\n\nThis patch was captured from the ${input.instrument} via SysEx dump.\n\n${input.description}\n`,
    frontmatter,
  );
  await fs.writeFile(mdPath, mdContent, 'utf-8');

  // Write JSON sidecar
  const sysexJson = {
    format_version: 1,
    raw_byte_count: 192,
    parameters: input.parameters,
    sequencer: input.sequencer,
  };
  await fs.writeFile(jsonPath, JSON.stringify(sysexJson, null, 2) + '\n', 'utf-8');

  return { slug, mdPath, jsonPath };
}
