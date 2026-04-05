/**
 * Cascadia Cable Lookup
 *
 * Resolves human-readable cable labels from patch YAML (e.g., "LFO X OUT", "VCF FM 1 IN")
 * to CONTROL_METADATA jack IDs (e.g., "jack-lfo-xyz-x-out", "jack-vcf-fm-1-in").
 *
 * The challenge: patch YAML labels are free-text descriptions written by humans,
 * while CONTROL_METADATA IDs follow {type}-{module}-{name-kebab} convention.
 * Names on the panel (silk-screen) don't always match the human descriptions.
 */

import { CONTROL_METADATA, type CascadiaControlMeta } from '@/lib/cascadia-panel-data';

type SignalType = 'audio' | 'cv' | 'gate' | 'modulation' | 'default';

/**
 * Known aliases mapping human-readable patch YAML labels to CONTROL_METADATA jack IDs.
 * These handle cases where the patch label diverges from the silk-screen name.
 * Keys are lowercased for case-insensitive matching.
 */
const LABEL_ALIASES: Record<string, string> = {
  // Envelope outputs: "ENV A/B OUT" -> envelope module output jacks
  'env a out': 'jack-envelope-a-out',
  'env b out': 'jack-envelope-b-out',
  'envelope a env out': 'jack-envelope-a-out',

  // LFO outputs: "LFO X/Y/Z OUT" -> lfo-xyz module jacks
  'lfo x out': 'jack-lfo-xyz-x-out',
  'lfo y out': 'jack-lfo-xyz-y-out',
  'lfo z out': 'jack-lfo-xyz-z-out',

  // VCO A waveform outputs live in the MIXER module on Cascadia
  'vco a saw out': 'jack-mixer-vco-a-saw-out',
  'vco a tri out': 'jack-mixer-vco-a-tri-out',
  'vco a pulse out': 'jack-mixer-vco-a-pulse-out',

  // VCO B waveform outputs are on the VCO B module
  'vco b saw out': 'jack-vco-b-saw-out',
  'vco b sine out': 'jack-vco-b-sine-out',
  'vco b triangle out': 'jack-vco-b-triangle-out',
  'vco b square out': 'jack-vco-b-square-out',

  // S&H and Slew are in the utilities module
  's&h out': 'jack-utilities-sh-out',
  'slew out': 'jack-utilities-slew-out',

  // Noise output is in the mixer module
  'noise out': 'jack-mixer-noise-out',

  // LINE IN module output
  'line in out': 'jack-line-in-out',

  // LPF B output is in the vca-b-lpf module
  'lpf b out': 'jack-vca-b-lpf-out',

  // VCF inputs: label includes module prefix "VCF"
  'vcf fm 1 in': 'jack-vcf-fm-1-in',
  'vcf fm 2 in': 'jack-vcf-fm-2-in',
  'vcf fm 3 in': 'jack-vcf-fm-3-in',
  'vcf q mod in': 'jack-vcf-q-mod-in',

  // VCA A inputs
  'vca a level mod in': 'jack-vca-a-level-mod-in',

  // VCA B / LPF inputs: multiple label variants
  'vca/lpf b cv in': 'jack-vca-b-lpf-cv-in',
  'vca b in': 'jack-vca-b-lpf-in',

  // Output control
  'main 2 in': 'jack-output-control-main-2-in',
  'main 1 in': 'jack-output-control-main-1-in',

  // Mixer inputs
  'mixer in 2': 'jack-mixer-in-2',
  'mixer in 1': 'jack-mixer-in-1',

  // Wave folder
  'fold mod in': 'jack-wave-folder-mod-in',
  'wave folder fold mod in': 'jack-wave-folder-mod-in',

  // VCO A inputs with module prefix
  'vco a fm 1 in': 'jack-vco-a-fm-1-in',
  'vco a fm 2 in': 'jack-vco-a-fm-2-in',
  'vco a im in': 'jack-vco-a-im-in',
  'vco a pwm in': 'jack-vco-a-pwm-in',
  'vco a pitch in': 'jack-vco-a-pitch-in',
  'vco a sync in': 'jack-vco-a-sync-in',

  // VCO B inputs with module prefix
  'vco b fm 1 in': 'jack-vco-b-fm-1-in',
  'vco b pitch in': 'jack-vco-b-pitch-in',
  'vco b sync in': 'jack-vco-b-sync-in',
};

/**
 * Reverse lookup map: lowercased CONTROL_METADATA name -> jack ID.
 * Built once at module load time from CONTROL_METADATA.
 */
const nameLookup: Record<string, string> = {};

// Build the reverse lookup from CONTROL_METADATA jack entries
for (const [id, meta] of Object.entries(CONTROL_METADATA)) {
  if (meta.type !== 'jack-in' && meta.type !== 'jack-out') continue;
  const nameLower = meta.name.toLowerCase();

  // Map the silk-screen name directly (e.g., "lfo x" -> "jack-lfo-xyz-x-out")
  nameLookup[nameLower] = id;

  // Also map with OUT/IN suffix for outputs/inputs
  if (meta.type === 'jack-out') {
    nameLookup[`${nameLower} out`] = id;
  } else {
    nameLookup[`${nameLower} in`] = id;
  }
}

/**
 * Resolve a human-readable cable label from patch YAML to a CONTROL_METADATA jack ID.
 *
 * Tries multiple strategies:
 * 1. Exact match in known aliases
 * 2. Exact match in name lookup (built from CONTROL_METADATA)
 * 3. Fallback: naive kebab-case transform
 */
export function resolveCascadiaCableId(label: string): string {
  const lower = label.toLowerCase().trim();

  // Strategy 1: Known aliases (handles most divergent cases)
  if (LABEL_ALIASES[lower]) {
    return LABEL_ALIASES[lower];
  }

  // Strategy 2: Direct name match from CONTROL_METADATA
  if (nameLookup[lower]) {
    return nameLookup[lower];
  }

  // Strategy 3: Fallback to naive transform
  return `jack-${lower.replace(/[&/]/g, '').replace(/\s+/g, '-')}`;
}

/**
 * Look up the signal type for a resolved jack ID from CONTROL_METADATA.
 * Returns 'default' if the jack ID is not found.
 */
export function getCascadiaCableSignalType(jackId: string): SignalType {
  const meta: CascadiaControlMeta | undefined = CONTROL_METADATA[jackId];
  return meta?.signalType ?? 'default';
}
