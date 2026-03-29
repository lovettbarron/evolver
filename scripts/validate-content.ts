#!/usr/bin/env tsx

import { SessionSchema, PatchSchema, InstrumentFileSchema } from '../src/lib/content/schemas.js';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

interface ValidationResult {
  file: string;
  schema: string;
  errors: string[];
}

async function validateFiles(
  pattern: string,
  root: string,
  schemaName: string,
  schema: { safeParse: (data: unknown) => { success: boolean; error?: { issues: Array<{ path: (string | number)[]; message: string }> } } },
  skip?: (file: string) => boolean,
): Promise<ValidationResult[]> {
  const files = await glob(pattern, { cwd: root });
  const failures: ValidationResult[] = [];

  for (const file of files) {
    if (skip?.(file)) continue;

    try {
      const raw = await fs.readFile(path.join(root, file), 'utf-8');
      const { data } = matter(raw);
      const result = schema.safeParse(data);

      if (!result.success) {
        const errors = result.error!.issues.map(
          (issue) => `  ${issue.path.join('.')}: ${issue.message}`,
        );
        failures.push({ file, schema: schemaName, errors });
      }
    } catch (err) {
      failures.push({
        file,
        schema: schemaName,
        errors: [`  Read error: ${err instanceof Error ? err.message : String(err)}`],
      });
    }
  }

  return failures;
}

async function validate() {
  const root = process.argv[2] || path.join(process.cwd(), 'src/content');
  let totalFiles = 0;
  let totalFailures = 0;

  console.log(`Validating content in: ${root}\n`);

  // Validate sessions
  const sessionFiles = await glob('sessions/**/*.md', { cwd: root });
  const sessionFailures = await validateFiles('sessions/**/*.md', root, 'SessionSchema', SessionSchema);
  totalFiles += sessionFiles.length;
  totalFailures += sessionFailures.length;

  // Validate instrument files
  const instrumentFiles = await glob('instruments/**/*.md', { cwd: root });
  const instrumentFailures = await validateFiles('instruments/**/*.md', root, 'InstrumentFileSchema', InstrumentFileSchema);
  totalFiles += instrumentFiles.length;
  totalFailures += instrumentFailures.length;

  // Validate patches (skip README.md)
  const patchFiles = await glob('patches/**/*.md', { cwd: root });
  const patchFailures = await validateFiles(
    'patches/**/*.md',
    root,
    'PatchSchema',
    PatchSchema,
    (file) => file.endsWith('README.md'),
  );
  totalFiles += patchFiles.length;
  totalFailures += patchFailures.length;

  // Report failures
  const allFailures = [...sessionFailures, ...instrumentFailures, ...patchFailures];
  for (const failure of allFailures) {
    console.error(`FAIL [${failure.schema}]: ${failure.file}`);
    for (const error of failure.errors) {
      console.error(error);
    }
    console.error('');
  }

  // Summary
  console.log(`\n${totalFiles} files validated, ${totalFailures} failures`);

  if (totalFailures > 0) {
    process.exit(1);
  } else {
    console.log('All content files validated successfully');
    process.exit(0);
  }
}

validate().catch((err) => {
  console.error('Validation script error:', err);
  process.exit(1);
});
