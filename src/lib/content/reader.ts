import { z } from 'zod';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import {
  SessionSchema,
  PatchSchema,
  InstrumentFileSchema,
  type AppConfig,
  type Session,
  type Patch,
  type InstrumentFile,
} from './schemas.js';

/**
 * Determine the content root directory based on config.
 * If vaultPath is set, use it. Otherwise, use bundled content at src/content/.
 */
export function getContentRoot(config: AppConfig): string {
  return config.vaultPath ?? path.join(process.cwd(), 'src/content');
}

/**
 * Read a content file, extract frontmatter, and validate against a Zod schema.
 * Returns { data, content } where data is validated frontmatter and content is the markdown body.
 */
export async function readContentFile<T extends z.ZodType>(
  filePath: string,
  schema: T,
  config: AppConfig,
): Promise<{ data: z.infer<T>; content: string }> {
  const root = getContentRoot(config);
  const fullPath = path.join(root, filePath);
  const raw = await fs.readFile(fullPath, 'utf-8');
  const { data, content } = matter(raw);
  const validated = schema.parse(data);
  return { data: validated, content };
}

/**
 * Discover instruments by scanning the instruments/ directory for subdirectories.
 * Filters out dotfiles and non-directory entries.
 */
export async function discoverInstruments(config: AppConfig): Promise<string[]> {
  const root = getContentRoot(config);
  const instrumentsDir = path.join(root, 'instruments');
  const entries = await fs.readdir(instrumentsDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort();
}

/**
 * List all sessions for an instrument, sorted by session_number.
 */
export async function listSessions(
  instrument: string,
  config: AppConfig,
): Promise<Array<{ data: Session; content: string; slug: string }>> {
  const root = getContentRoot(config);
  const pattern = path.join(root, 'sessions', instrument, '*.md');
  const files = await glob(pattern);

  const results = await Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const validated = SessionSchema.parse(data);
      const slug = path.basename(filePath, '.md');
      return { data: validated, content, slug };
    }),
  );

  return results.sort((a, b) => a.data.session_number - b.data.session_number);
}

/**
 * List all patches for an instrument.
 * Skips README.md files.
 */
export async function listPatches(
  instrument: string,
  config: AppConfig,
): Promise<Array<{ data: Patch; content: string; slug: string }>> {
  const root = getContentRoot(config);
  const pattern = path.join(root, 'patches', instrument, '*.md');
  const files = await glob(pattern);

  const results = await Promise.all(
    files
      .filter((f) => !f.endsWith('README.md'))
      .map(async (filePath) => {
        const raw = await fs.readFile(filePath, 'utf-8');
        const { data, content } = matter(raw);
        const validated = PatchSchema.parse(data);
        const slug = path.basename(filePath, '.md');
        return { data: validated, content, slug };
      }),
  );

  return results;
}

/**
 * List all instrument files (overview, signal-flow, etc.) for an instrument.
 */
export async function listInstrumentFiles(
  instrument: string,
  config: AppConfig,
): Promise<Array<{ data: InstrumentFile; content: string; slug: string }>> {
  const root = getContentRoot(config);
  const pattern = path.join(root, 'instruments', instrument, '*.md');
  const files = await glob(pattern);

  const results = await Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, 'utf-8');
      const { data, content } = matter(raw);
      const validated = InstrumentFileSchema.parse(data);
      const slug = path.basename(filePath, '.md');
      return { data: validated, content, slug };
    }),
  );

  return results;
}
