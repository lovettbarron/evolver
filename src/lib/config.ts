import fs from 'fs/promises';
import path from 'path';
import { ConfigSchema } from './content/schemas.js';

export type { AppConfig } from './content/schemas.js';

export async function loadConfig() {
  const configPath = path.join(process.cwd(), 'evolver.config.json');
  try {
    const raw = await fs.readFile(configPath, 'utf-8');
    return ConfigSchema.parse(JSON.parse(raw));
  } catch {
    // File missing or parse fails -> demo mode (no vault path)
    return ConfigSchema.parse({});
  }
}
