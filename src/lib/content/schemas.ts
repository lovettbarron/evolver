import { z } from 'zod';

export const SessionSchema = z.object({
  title: z.string(),
  section: z.string(),
  session_number: z.number().int().positive(),
  duration: z.number().int().min(5).max(30),
  prerequisite: z.union([z.number(), z.null()]),
  output_type: z.enum(['patch', 'technique', 'recording', 'composition']),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  tags: z.array(z.string()),
  instrument: z.string(),
  instrument_type: z.enum(['instrument', 'eurorack_module']).default('instrument'),
  reference: z.string().optional(),
}).passthrough();

export const CableConnectionSchema = z.object({
  source: z.string(),
  destination: z.string(),
  purpose: z.string(),
});

export const KnobSettingSchema = z.object({
  control: z.string(),
  value: z.string(),
});

export const PatchSchema = z.object({
  name: z.string(),
  type: z.enum(['bass', 'lead', 'pad', 'drum', 'texture', 'sequence', 'fx']),
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
  // Phase 9: typed fields for CV-based instruments
  cable_routing: z.array(CableConnectionSchema).optional(),
  knob_settings: z.record(z.string(), z.array(KnobSettingSchema)).optional(),
  audio_preview: z.string().optional(),
}).passthrough();

export const InstrumentFileSchema = z.object({
  type: z.enum(['overview', 'signal-flow', 'basic-patch', 'modules', 'module']),
  instrument: z.string(),
  title: z.string(),
  manufacturer: z.string(),
  category: z.enum(['sound-source', 'shaper', 'modulator', 'utility']).optional(),
  control_count: z.number().int().nonnegative().optional(),
  jack_count: z.number().int().nonnegative().optional(),
  has_normals: z.boolean().optional(),
}).passthrough();

export const TroubleshootingSchema = z.object({
  type: z.literal('troubleshooting'),
  instrument: z.string(),
  title: z.string(),
}).passthrough();

export type Troubleshooting = z.infer<typeof TroubleshootingSchema>;

// Inferred types
export type Session = z.infer<typeof SessionSchema>;
export type Patch = z.infer<typeof PatchSchema>;
export type InstrumentFile = z.infer<typeof InstrumentFileSchema>;
export type CableConnection = z.infer<typeof CableConnectionSchema>;
export type KnobSetting = z.infer<typeof KnobSettingSchema>;

// Instrument configuration schema (Phase 7: multi-instrument support; Phase 25: sampler flags)
export const InstrumentConfigSchema = z.object({
  display_name: z.string(),
  tagline: z.string(),
  manufacturer: z.string(),
  sysex: z.boolean(),                       // Phase 7 — MIDI SysEx capability (Evolver has, Cascadia/Octatrack don't)
  patch_memory: z.boolean(),                // Phase 7 — patch-dump memory (Evolver has, Cascadia/Octatrack don't)
  sampler: z.boolean().optional(),          // Phase 25 / D-08 — has_sampler (Octatrack: true)
  sequencer: z.boolean().optional(),        // Phase 25 / D-08 — has_sequencer (Octatrack: true)
  midi_sequencer: z.boolean().optional(),   // Phase 25 / D-08, D-10 — has_midi_sequencer (Octatrack: true — informational for now)
  reference_pdfs: z.array(z.object({
    label: z.string(),
    file: z.string(),
  })),
}).passthrough();

export type InstrumentConfig = z.infer<typeof InstrumentConfigSchema>;

// Config schema (also used by config.ts)
export const ConfigSchema = z.object({
  vaultPath: z.string().optional(),
  instrument: z.string().default('evolver'),
}).passthrough();

export type AppConfig = z.infer<typeof ConfigSchema>;
