import { z } from 'zod';

export const SessionSchema = z.object({
  title: z.string(),
  module: z.string(),
  session_number: z.number().int().positive(),
  duration: z.number().int().min(5).max(30),
  prerequisite: z.union([z.number(), z.null()]),
  output_type: z.enum(['patch', 'technique', 'recording', 'composition']),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  tags: z.array(z.string()),
  instrument: z.string(),
  reference: z.string().optional(),
}).passthrough();

export const PatchSchema = z.object({
  name: z.string(),
  type: z.enum(['bass', 'lead', 'pad', 'drum', 'texture', 'sequence']),
  session_origin: z.union([z.number(), z.null()]),
  description: z.string(),
  tags: z.array(z.string()),
  instrument: z.string(),
  created: z.string(),
  // SysEx integration fields (Phase 4)
  source: z.enum(['manual', 'sysex']).optional(),
  capture_date: z.string().optional(),
  program_number: z.number().int().min(0).max(127).optional(),
  challenge_id: z.string().optional(),
}).passthrough();

export const InstrumentFileSchema = z.object({
  type: z.enum(['overview', 'signal-flow', 'basic-patch', 'modules']),
  instrument: z.string(),
  title: z.string(),
  manufacturer: z.string(),
}).passthrough();

// Inferred types
export type Session = z.infer<typeof SessionSchema>;
export type Patch = z.infer<typeof PatchSchema>;
export type InstrumentFile = z.infer<typeof InstrumentFileSchema>;

// Config schema (also used by config.ts)
export const ConfigSchema = z.object({
  vaultPath: z.string().optional(),
  instrument: z.string().default('evolver'),
}).passthrough();

export type AppConfig = z.infer<typeof ConfigSchema>;
