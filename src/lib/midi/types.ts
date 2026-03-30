export interface ParameterDef {
  index: number;
  key: string;        // snake_case: "osc1_freq"
  name: string;       // Human: "Oscillator 1 Frequency"
  section: string;    // Group key from PARAMETER_SECTIONS
  min: number;
  max: number;
}

export interface ParsedPatch {
  parameters: Record<string, number>;  // key -> value for 128 program params
  sequencer: {
    seq1_steps: number[];  // 16 values
    seq2_steps: number[];
    seq3_steps: number[];
    seq4_steps: number[];
  };
}

export interface SysexJson {
  format_version: 1;
  raw_byte_count: 192;
  parameters: Record<string, number>;
  sequencer: {
    seq1_steps: number[];
    seq2_steps: number[];
    seq3_steps: number[];
    seq4_steps: number[];
  };
}

export const PARAMETER_SECTIONS = [
  'oscillators',
  'filter',
  'envelopes',
  'vca',
  'feedback',
  'delay',
  'lfos',
  'modulation',
  'sequencer',
  'external_input',
  'misc',
] as const;

export type ParameterSection = typeof PARAMETER_SECTIONS[number];
