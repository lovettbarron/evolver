import fs from 'fs/promises';
import { existsSync } from 'fs';
import os from 'os';
import path from 'path';
import { ConfigSchema } from './content/schemas';

export type { AppConfig } from './content/schemas';

export async function loadConfig() {
  const configPath = path.join(process.cwd(), 'evolver.config.json');
  try {
    const raw = await fs.readFile(configPath, 'utf-8');
    const config = ConfigSchema.parse(JSON.parse(raw));

    // If vaultPath is set, verify it exists on disk.
    // Falls back to demo mode (bundled src/content/) on deploy environments like Vercel.
    if (config.vaultPath) {
      const resolved = config.vaultPath.startsWith('~')
        ? path.join(os.homedir(), config.vaultPath.slice(1))
        : config.vaultPath;
      if (!existsSync(resolved)) {
        return ConfigSchema.parse({});
      }
    }

    return config;
  } catch {
    // File missing or parse fails -> demo mode (no vault path)
    return ConfigSchema.parse({});
  }
}
