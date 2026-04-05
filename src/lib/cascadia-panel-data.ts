/**
 * Cascadia Panel Control Metadata
 *
 * Maps SVG control IDs to human-readable names, module membership, control types,
 * and (for jacks) signal types. Derived from the 17 Cascadia module documentation files.
 *
 * ID naming convention:
 * - Knobs:   knob-{module}-{name-kebab}
 * - Sliders: slider-{module}-{name-kebab}
 * - Switches: switch-{module}-{name-kebab}
 * - Jacks:   jack-{module}-{name-kebab}
 * - LEDs:    led-{module}-{name-kebab}
 */

export interface CascadiaControlMeta {
  id: string;
  name: string;
  module: string;
  type: 'knob' | 'slider' | 'switch' | 'jack-in' | 'jack-out' | 'led';
  signalType?: 'audio' | 'cv' | 'gate' | 'modulation';
}

/**
 * Complete mapping of all SVG control IDs to metadata.
 * 179 entries across 17 modules (84 controls/switches/LEDs + 95 jacks).
 */
export const CONTROL_METADATA: Record<string, CascadiaControlMeta> = {
  // ===== MIDI/CV (3 EXT IN jacks + 8 MIDI out jacks = 11) =====
  'jack-midi-cv-pitch-in': { id: 'jack-midi-cv-pitch-in', name: 'PITCH', module: 'midi-cv', type: 'jack-in', signalType: 'cv' },
  'jack-midi-cv-gate-in': { id: 'jack-midi-cv-gate-in', name: 'GATE', module: 'midi-cv', type: 'jack-in', signalType: 'gate' },
  'jack-midi-cv-trig-in': { id: 'jack-midi-cv-trig-in', name: 'TRIG', module: 'midi-cv', type: 'jack-in', signalType: 'gate' },
  'jack-midi-cv-pitch-out': { id: 'jack-midi-cv-pitch-out', name: 'MIDI PITCH', module: 'midi-cv', type: 'jack-out', signalType: 'cv' },
  'jack-midi-cv-cc-out': { id: 'jack-midi-cv-cc-out', name: 'MIDI CC', module: 'midi-cv', type: 'jack-out', signalType: 'cv' },
  'jack-midi-cv-lfo-out': { id: 'jack-midi-cv-lfo-out', name: 'MIDI LFO', module: 'midi-cv', type: 'jack-out', signalType: 'modulation' },
  'jack-midi-cv-clk-out': { id: 'jack-midi-cv-clk-out', name: 'MIDI CLK', module: 'midi-cv', type: 'jack-out', signalType: 'gate' },
  'jack-midi-cv-vel-out': { id: 'jack-midi-cv-vel-out', name: 'MIDI VEL', module: 'midi-cv', type: 'jack-out', signalType: 'cv' },
  'jack-midi-cv-mod-out': { id: 'jack-midi-cv-mod-out', name: 'MIDI MOD', module: 'midi-cv', type: 'jack-out', signalType: 'modulation' },
  'jack-midi-cv-gate-out': { id: 'jack-midi-cv-gate-out', name: 'MIDI GATE', module: 'midi-cv', type: 'jack-out', signalType: 'gate' },
  'jack-midi-cv-trig-out': { id: 'jack-midi-cv-trig-out', name: 'MIDI TRIG', module: 'midi-cv', type: 'jack-out', signalType: 'gate' },

  // ===== VCO A (11 controls + 6 jacks = 17) =====
  'knob-vco-a-pitch': { id: 'knob-vco-a-pitch', name: 'Pitch', module: 'vco-a', type: 'knob' },
  'knob-vco-a-octave': { id: 'knob-vco-a-octave', name: 'OCTAVE', module: 'vco-a', type: 'knob' },
  'slider-vco-a-pw-mod': { id: 'slider-vco-a-pw-mod', name: 'PW MOD', module: 'vco-a', type: 'slider' },
  'slider-vco-a-pw': { id: 'slider-vco-a-pw', name: 'PW', module: 'vco-a', type: 'slider' },
  'slider-vco-a-fm-1': { id: 'slider-vco-a-fm-1', name: 'FM 1', module: 'vco-a', type: 'slider' },
  'slider-vco-a-index-mod': { id: 'slider-vco-a-index-mod', name: 'Index Mod', module: 'vco-a', type: 'slider' },
  'slider-vco-a-index': { id: 'slider-vco-a-index', name: 'Index', module: 'vco-a', type: 'slider' },
  'switch-vco-a-tzfm': { id: 'switch-vco-a-tzfm', name: 'TZFM/EXP', module: 'vco-a', type: 'switch' },
  'switch-vco-a-ac-dc': { id: 'switch-vco-a-ac-dc', name: 'AC/DC', module: 'vco-a', type: 'switch' },
  'switch-vco-a-sync-type': { id: 'switch-vco-a-sync-type', name: 'Sync Type', module: 'vco-a', type: 'switch' },
  'switch-vco-a-pulse-position': { id: 'switch-vco-a-pulse-position', name: 'Pulse Position', module: 'vco-a', type: 'switch' },
  'jack-vco-a-pitch-in': { id: 'jack-vco-a-pitch-in', name: 'PITCH IN', module: 'vco-a', type: 'jack-in', signalType: 'cv' },
  'jack-vco-a-pwm-in': { id: 'jack-vco-a-pwm-in', name: 'PWM IN', module: 'vco-a', type: 'jack-in', signalType: 'modulation' },
  'jack-vco-a-fm-1-in': { id: 'jack-vco-a-fm-1-in', name: 'FM 1 IN', module: 'vco-a', type: 'jack-in', signalType: 'modulation' },
  'jack-vco-a-im-in': { id: 'jack-vco-a-im-in', name: 'IM IN', module: 'vco-a', type: 'jack-in', signalType: 'modulation' },
  'jack-vco-a-fm-2-in': { id: 'jack-vco-a-fm-2-in', name: 'FM 2 IN', module: 'vco-a', type: 'jack-in', signalType: 'audio' },
  'jack-vco-a-sync-in': { id: 'jack-vco-a-sync-in', name: 'SYNC IN', module: 'vco-a', type: 'jack-in', signalType: 'audio' },

  // ===== VCO B (5 controls + 6 jacks = 11) =====
  'knob-vco-b-octave': { id: 'knob-vco-b-octave', name: 'OCTAVE', module: 'vco-b', type: 'knob' },
  'knob-vco-b-pitch': { id: 'knob-vco-b-pitch', name: 'Pitch', module: 'vco-b', type: 'knob' },
  'switch-vco-b-vco-lfo': { id: 'switch-vco-b-vco-lfo', name: 'VCO/LFO', module: 'vco-b', type: 'switch' },
  'switch-vco-b-pitch-source': { id: 'switch-vco-b-pitch-source', name: 'Pitch Source', module: 'vco-b', type: 'switch' },
  'led-vco-b-rate': { id: 'led-vco-b-rate', name: 'Rate LED', module: 'vco-b', type: 'led' },
  'jack-vco-b-pitch-in': { id: 'jack-vco-b-pitch-in', name: 'PITCH IN', module: 'vco-b', type: 'jack-in', signalType: 'cv' },
  'jack-vco-b-sync-in': { id: 'jack-vco-b-sync-in', name: 'SYNC IN', module: 'vco-b', type: 'jack-in', signalType: 'audio' },
  'jack-vco-b-sine-out': { id: 'jack-vco-b-sine-out', name: 'SINE', module: 'vco-b', type: 'jack-out', signalType: 'audio' },
  'jack-vco-b-triangle-out': { id: 'jack-vco-b-triangle-out', name: 'TRIANGLE', module: 'vco-b', type: 'jack-out', signalType: 'audio' },
  'jack-vco-b-saw-out': { id: 'jack-vco-b-saw-out', name: 'SAW', module: 'vco-b', type: 'jack-out', signalType: 'audio' },
  'jack-vco-b-square-out': { id: 'jack-vco-b-square-out', name: 'SQUARE', module: 'vco-b', type: 'jack-out', signalType: 'audio' },

  // ===== ENVELOPE A (8 controls + 6 jacks = 14) =====
  'slider-envelope-a-hold': { id: 'slider-envelope-a-hold', name: 'Hold', module: 'envelope-a', type: 'slider' },
  'slider-envelope-a-attack': { id: 'slider-envelope-a-attack', name: 'Attack', module: 'envelope-a', type: 'slider' },
  'slider-envelope-a-decay': { id: 'slider-envelope-a-decay', name: 'Decay', module: 'envelope-a', type: 'slider' },
  'slider-envelope-a-sustain': { id: 'slider-envelope-a-sustain', name: 'Sustain', module: 'envelope-a', type: 'slider' },
  'slider-envelope-a-release': { id: 'slider-envelope-a-release', name: 'Release', module: 'envelope-a', type: 'slider' },
  'switch-envelope-a-hold-position': { id: 'switch-envelope-a-hold-position', name: 'Hold Position', module: 'envelope-a', type: 'switch' },
  'switch-envelope-a-speed': { id: 'switch-envelope-a-speed', name: 'Envelope Speed', module: 'envelope-a', type: 'switch' },
  'switch-envelope-a-ctrl-source': { id: 'switch-envelope-a-ctrl-source', name: 'Ctrl Source', module: 'envelope-a', type: 'switch' },
  'jack-envelope-a-gate-in': { id: 'jack-envelope-a-gate-in', name: 'GATE IN', module: 'envelope-a', type: 'jack-in', signalType: 'gate' },
  'jack-envelope-a-ctrl-in': { id: 'jack-envelope-a-ctrl-in', name: 'CTRL IN', module: 'envelope-a', type: 'jack-in', signalType: 'cv' },
  'jack-envelope-a-retrig-in': { id: 'jack-envelope-a-retrig-in', name: 'RETRIG IN', module: 'envelope-a', type: 'jack-in', signalType: 'gate' },
  'jack-envelope-a-eoh-out': { id: 'jack-envelope-a-eoh-out', name: 'EOH', module: 'envelope-a', type: 'jack-out', signalType: 'gate' },
  'jack-envelope-a-eoa-out': { id: 'jack-envelope-a-eoa-out', name: 'EOA', module: 'envelope-a', type: 'jack-out', signalType: 'gate' },
  'jack-envelope-a-out': { id: 'jack-envelope-a-out', name: 'ENV A', module: 'envelope-a', type: 'jack-out', signalType: 'modulation' },

  // ===== ENVELOPE B (9 controls + 6 jacks = 15) =====
  'switch-envelope-b-mode-select': { id: 'switch-envelope-b-mode-select', name: 'Mode Select', module: 'envelope-b', type: 'switch' },
  'switch-envelope-b-type-select': { id: 'switch-envelope-b-type-select', name: 'Type Select', module: 'envelope-b', type: 'switch' },
  'slider-envelope-b-rise': { id: 'slider-envelope-b-rise', name: 'Rise', module: 'envelope-b', type: 'slider' },
  'slider-envelope-b-fall': { id: 'slider-envelope-b-fall', name: 'Fall', module: 'envelope-b', type: 'slider' },
  'slider-envelope-b-shape': { id: 'slider-envelope-b-shape', name: 'Shape', module: 'envelope-b', type: 'slider' },
  'slider-envelope-b-rise-mod': { id: 'slider-envelope-b-rise-mod', name: 'Rise Mod', module: 'envelope-b', type: 'slider' },
  'slider-envelope-b-fall-mod': { id: 'slider-envelope-b-fall-mod', name: 'Fall Mod', module: 'envelope-b', type: 'slider' },
  'slider-envelope-b-shape-mod': { id: 'slider-envelope-b-shape-mod', name: 'Shape Mod', module: 'envelope-b', type: 'slider' },
  'led-envelope-b-sync': { id: 'led-envelope-b-sync', name: 'Sync LED', module: 'envelope-b', type: 'led' },
  'jack-envelope-b-rise-mod-in': { id: 'jack-envelope-b-rise-mod-in', name: 'RISE MOD IN', module: 'envelope-b', type: 'jack-in', signalType: 'modulation' },
  'jack-envelope-b-fall-mod-in': { id: 'jack-envelope-b-fall-mod-in', name: 'FALL MOD IN', module: 'envelope-b', type: 'jack-in', signalType: 'modulation' },
  'jack-envelope-b-shape-mod-in': { id: 'jack-envelope-b-shape-mod-in', name: 'SHAPE MOD IN', module: 'envelope-b', type: 'jack-in', signalType: 'modulation' },
  'jack-envelope-b-gate-sync-in': { id: 'jack-envelope-b-gate-sync-in', name: 'GATE/SYNC IN', module: 'envelope-b', type: 'jack-in', signalType: 'gate' },
  'jack-envelope-b-eof-out': { id: 'jack-envelope-b-eof-out', name: 'EOF', module: 'envelope-b', type: 'jack-out', signalType: 'gate' },
  'jack-envelope-b-out': { id: 'jack-envelope-b-out', name: 'ENV B', module: 'envelope-b', type: 'jack-out', signalType: 'modulation' },

  // ===== LINE IN (1 control + 1 jack = 2) =====
  'slider-line-in-level': { id: 'slider-line-in-level', name: 'Level', module: 'line-in', type: 'slider' },
  'jack-line-in-out': { id: 'jack-line-in-out', name: 'LINE IN', module: 'line-in', type: 'jack-out', signalType: 'audio' },

  // ===== MIXER (8 controls + 7 jacks = 15) =====
  'slider-mixer-in-1': { id: 'slider-mixer-in-1', name: 'IN 1', module: 'mixer', type: 'slider' },
  'slider-mixer-in-2': { id: 'slider-mixer-in-2', name: 'IN 2', module: 'mixer', type: 'slider' },
  'slider-mixer-pulse': { id: 'slider-mixer-pulse', name: 'Pulse', module: 'mixer', type: 'slider' },
  'slider-mixer-saw': { id: 'slider-mixer-saw', name: 'Saw', module: 'mixer', type: 'slider' },
  'slider-mixer-sub': { id: 'slider-mixer-sub', name: 'Sub', module: 'mixer', type: 'slider' },
  'slider-mixer-noise': { id: 'slider-mixer-noise', name: 'Noise', module: 'mixer', type: 'slider' },
  'switch-mixer-sub-type': { id: 'switch-mixer-sub-type', name: 'Sub Type', module: 'mixer', type: 'switch' },
  'switch-mixer-noise-type': { id: 'switch-mixer-noise-type', name: 'Noise Type', module: 'mixer', type: 'switch' },
  'switch-mixer-soft-clip': { id: 'switch-mixer-soft-clip', name: 'Soft Clip', module: 'mixer', type: 'switch' },
  'jack-mixer-in-1': { id: 'jack-mixer-in-1', name: 'MIXER IN 1', module: 'mixer', type: 'jack-in', signalType: 'audio' },
  'jack-mixer-in-2': { id: 'jack-mixer-in-2', name: 'MIXER IN 2', module: 'mixer', type: 'jack-in', signalType: 'audio' },
  'jack-mixer-vco-a-tri-out': { id: 'jack-mixer-vco-a-tri-out', name: 'VCO A TRI', module: 'mixer', type: 'jack-out', signalType: 'audio' },
  'jack-mixer-vco-a-saw-out': { id: 'jack-mixer-vco-a-saw-out', name: 'VCO A SAW', module: 'mixer', type: 'jack-out', signalType: 'audio' },
  'jack-mixer-vco-a-pulse-out': { id: 'jack-mixer-vco-a-pulse-out', name: 'VCO A PULSE', module: 'mixer', type: 'jack-out', signalType: 'audio' },
  'jack-mixer-noise-out': { id: 'jack-mixer-noise-out', name: 'NOISE', module: 'mixer', type: 'jack-out', signalType: 'audio' },
  'jack-mixer-out': { id: 'jack-mixer-out', name: 'MIXER', module: 'mixer', type: 'jack-out', signalType: 'audio' },

  // ===== VCF (8 controls + 8 jacks = 16) =====
  'slider-vcf-fm-1': { id: 'slider-vcf-fm-1', name: 'FM 1', module: 'vcf', type: 'slider' },
  'slider-vcf-fm-2': { id: 'slider-vcf-fm-2', name: 'FM 2', module: 'vcf', type: 'slider' },
  'slider-vcf-fm-3': { id: 'slider-vcf-fm-3', name: 'FM 3', module: 'vcf', type: 'slider' },
  'slider-vcf-qm': { id: 'slider-vcf-qm', name: 'QM', module: 'vcf', type: 'slider' },
  'slider-vcf-freq': { id: 'slider-vcf-freq', name: 'FREQ', module: 'vcf', type: 'slider' },
  'slider-vcf-q': { id: 'slider-vcf-q', name: 'Q', module: 'vcf', type: 'slider' },
  'knob-vcf-mode': { id: 'knob-vcf-mode', name: 'MODE', module: 'vcf', type: 'knob' },
  'knob-vcf-level': { id: 'knob-vcf-level', name: 'Level', module: 'vcf', type: 'knob' },
  'jack-vcf-fm-1-in': { id: 'jack-vcf-fm-1-in', name: 'FM 1 IN', module: 'vcf', type: 'jack-in', signalType: 'modulation' },
  'jack-vcf-fm-2-in': { id: 'jack-vcf-fm-2-in', name: 'FM 2 IN', module: 'vcf', type: 'jack-in', signalType: 'cv' },
  'jack-vcf-fm-3-in': { id: 'jack-vcf-fm-3-in', name: 'FM 3 IN', module: 'vcf', type: 'jack-in', signalType: 'modulation' },
  'jack-vcf-q-mod-in': { id: 'jack-vcf-q-mod-in', name: 'Q MOD IN', module: 'vcf', type: 'jack-in', signalType: 'modulation' },
  'jack-vcf-in': { id: 'jack-vcf-in', name: 'VCF IN', module: 'vcf', type: 'jack-in', signalType: 'audio' },
  'jack-vcf-lp4-out': { id: 'jack-vcf-lp4-out', name: 'LP4', module: 'vcf', type: 'jack-out', signalType: 'audio' },
  'jack-vcf-hp4-out': { id: 'jack-vcf-hp4-out', name: 'HP4', module: 'vcf', type: 'jack-out', signalType: 'audio' },
  'jack-vcf-out': { id: 'jack-vcf-out', name: 'VCF', module: 'vcf', type: 'jack-out', signalType: 'audio' },

  // ===== WAVE FOLDER (2 controls + 2 jacks = 4) =====
  'slider-wave-folder-mod': { id: 'slider-wave-folder-mod', name: 'Mod', module: 'wave-folder', type: 'slider' },
  'slider-wave-folder-fold': { id: 'slider-wave-folder-fold', name: 'Fold', module: 'wave-folder', type: 'slider' },
  'jack-wave-folder-mod-in': { id: 'jack-wave-folder-mod-in', name: 'FOLD MOD IN', module: 'wave-folder', type: 'jack-in', signalType: 'modulation' },
  'jack-wave-folder-in': { id: 'jack-wave-folder-in', name: 'IN', module: 'wave-folder', type: 'jack-in', signalType: 'audio' },

  // ===== VCA A (3 controls + 3 jacks = 6) =====
  'slider-vca-a-aux-in': { id: 'slider-vca-a-aux-in', name: 'AUX IN', module: 'vca-a', type: 'slider' },
  'slider-vca-a-level-mod': { id: 'slider-vca-a-level-mod', name: 'Level Mod', module: 'vca-a', type: 'slider' },
  'slider-vca-a-level': { id: 'slider-vca-a-level', name: 'Level', module: 'vca-a', type: 'slider' },
  'jack-vca-a-aux-in': { id: 'jack-vca-a-aux-in', name: 'AUX IN', module: 'vca-a', type: 'jack-in', signalType: 'audio' },
  'jack-vca-a-in': { id: 'jack-vca-a-in', name: 'VCA IN', module: 'vca-a', type: 'jack-in', signalType: 'audio' },
  'jack-vca-a-level-mod-in': { id: 'jack-vca-a-level-mod-in', name: 'LEVEL MOD IN', module: 'vca-a', type: 'jack-in', signalType: 'modulation' },

  // ===== PUSH GATE (1 control + 1 jack = 2) =====
  'switch-push-gate-manual': { id: 'switch-push-gate-manual', name: 'Manual Gate', module: 'push-gate', type: 'switch' },
  'jack-push-gate-out': { id: 'jack-push-gate-out', name: 'GATE', module: 'push-gate', type: 'jack-out', signalType: 'gate' },

  // ===== UTILITIES (8 controls + 9 jacks = 17) =====
  // --- Sample & Hold ---
  'led-utilities-sh': { id: 'led-utilities-sh', name: 'S&H LED', module: 'utilities', type: 'led' },
  'jack-utilities-sh-trig-in': { id: 'jack-utilities-sh-trig-in', name: 'TRIG IN', module: 'utilities', type: 'jack-in', signalType: 'gate' },
  'jack-utilities-sh-in': { id: 'jack-utilities-sh-in', name: 'S&H IN', module: 'utilities', type: 'jack-in', signalType: 'modulation' },
  'jack-utilities-sh-out': { id: 'jack-utilities-sh-out', name: 'S&H', module: 'utilities', type: 'jack-out', signalType: 'cv' },
  // --- Slew Limiter / Envelope Follower ---
  'knob-utilities-slew-rate': { id: 'knob-utilities-slew-rate', name: 'Slew Rate', module: 'utilities', type: 'knob' },
  'switch-utilities-slew-direction': { id: 'switch-utilities-slew-direction', name: 'Slew Direction', module: 'utilities', type: 'switch' },
  'switch-utilities-slew-shape': { id: 'switch-utilities-slew-shape', name: 'Slew Shape', module: 'utilities', type: 'switch' },
  'switch-utilities-env-follow': { id: 'switch-utilities-env-follow', name: 'Env Follow', module: 'utilities', type: 'switch' },
  'jack-utilities-slew-in': { id: 'jack-utilities-slew-in', name: 'SLEW/FOLLOW IN', module: 'utilities', type: 'jack-in', signalType: 'cv' },
  'jack-utilities-slew-out': { id: 'jack-utilities-slew-out', name: 'SLEW', module: 'utilities', type: 'jack-out', signalType: 'cv' },
  // --- Mixuverter ---
  'knob-utilities-attenuator': { id: 'knob-utilities-attenuator', name: 'Attenuator', module: 'utilities', type: 'knob' },
  'switch-utilities-x2': { id: 'switch-utilities-x2', name: 'x2 Switch', module: 'utilities', type: 'switch' },
  'switch-utilities-polarity': { id: 'switch-utilities-polarity', name: 'Polarity', module: 'utilities', type: 'switch' },
  'jack-utilities-main-input': { id: 'jack-utilities-main-input', name: 'Main Input', module: 'utilities', type: 'jack-in', signalType: 'cv' },
  'jack-utilities-secondary-input': { id: 'jack-utilities-secondary-input', name: 'Secondary Input', module: 'utilities', type: 'jack-in', signalType: 'cv' },
  'jack-utilities-mixuverter-out-a': { id: 'jack-utilities-mixuverter-out-a', name: 'MIX A', module: 'utilities', type: 'jack-out', signalType: 'cv' },
  'jack-utilities-mixuverter-out-b': { id: 'jack-utilities-mixuverter-out-b', name: 'MIX B', module: 'utilities', type: 'jack-out', signalType: 'cv' },
  'jack-utilities-mixuverter-out-c': { id: 'jack-utilities-mixuverter-out-c', name: 'MIX C', module: 'utilities', type: 'jack-out', signalType: 'cv' },

  // ===== LFO X/Y/Z (4 controls + 4 jacks = 8) =====
  'knob-lfo-xyz-rate': { id: 'knob-lfo-xyz-rate', name: 'RATE', module: 'lfo-xyz', type: 'knob' },
  'switch-lfo-xyz-y-divider': { id: 'switch-lfo-xyz-y-divider', name: 'Y ÷3/÷4', module: 'lfo-xyz', type: 'switch' },
  'switch-lfo-xyz-z-divider': { id: 'switch-lfo-xyz-z-divider', name: 'Z ÷5/÷8', module: 'lfo-xyz', type: 'switch' },
  'jack-lfo-xyz-x-out': { id: 'jack-lfo-xyz-x-out', name: 'LFO X', module: 'lfo-xyz', type: 'jack-out', signalType: 'modulation' },
  'jack-lfo-xyz-y-out': { id: 'jack-lfo-xyz-y-out', name: 'LFO Y', module: 'lfo-xyz', type: 'jack-out', signalType: 'modulation' },
  'jack-lfo-xyz-z-out': { id: 'jack-lfo-xyz-z-out', name: 'LFO Z', module: 'lfo-xyz', type: 'jack-out', signalType: 'modulation' },
  'jack-lfo-xyz-rate-cv': { id: 'jack-lfo-xyz-rate-cv', name: 'LFO RATE CV', module: 'lfo-xyz', type: 'jack-in', signalType: 'cv' },

  // ===== PATCHBAY (1 control + 17 jacks = 18) =====
  // --- Exponential Source ---
  'knob-patchbay-exp-level': { id: 'knob-patchbay-exp-level', name: 'EXP Level', module: 'patchbay', type: 'knob' },
  // --- Multiples ---
  'jack-patchbay-mult-in-1': { id: 'jack-patchbay-mult-in-1', name: 'MULT IN 1', module: 'patchbay', type: 'jack-in', signalType: 'cv' },
  'jack-patchbay-mult-in-2': { id: 'jack-patchbay-mult-in-2', name: 'MULT IN 2', module: 'patchbay', type: 'jack-in', signalType: 'cv' },
  'jack-patchbay-mult-in-3': { id: 'jack-patchbay-mult-in-3', name: 'MULT IN 3', module: 'patchbay', type: 'jack-in', signalType: 'cv' },
  'jack-patchbay-mult-out-1': { id: 'jack-patchbay-mult-out-1', name: 'MULT OUT 1', module: 'patchbay', type: 'jack-out', signalType: 'cv' },
  'jack-patchbay-mult-out-2': { id: 'jack-patchbay-mult-out-2', name: 'MULT OUT 2', module: 'patchbay', type: 'jack-out', signalType: 'cv' },
  'jack-patchbay-mult-out-3': { id: 'jack-patchbay-mult-out-3', name: 'MULT OUT 3', module: 'patchbay', type: 'jack-out', signalType: 'cv' },
  // --- Summing ---
  'jack-patchbay-sum-in-1': { id: 'jack-patchbay-sum-in-1', name: 'SUM IN 1', module: 'patchbay', type: 'jack-in', signalType: 'cv' },
  'jack-patchbay-sum-in-2': { id: 'jack-patchbay-sum-in-2', name: 'SUM IN 2', module: 'patchbay', type: 'jack-in', signalType: 'cv' },
  'jack-patchbay-sum-out': { id: 'jack-patchbay-sum-out', name: 'SUM', module: 'patchbay', type: 'jack-out', signalType: 'cv' },
  // --- Inverter ---
  'jack-patchbay-inverter-in': { id: 'jack-patchbay-inverter-in', name: 'INVERTER IN', module: 'patchbay', type: 'jack-in', signalType: 'modulation' },
  'jack-patchbay-inverter-out': { id: 'jack-patchbay-inverter-out', name: 'INVERTER', module: 'patchbay', type: 'jack-out', signalType: 'modulation' },
  // --- Bipolar-to-Unipolar ---
  'jack-patchbay-bi-in': { id: 'jack-patchbay-bi-in', name: 'BI IN', module: 'patchbay', type: 'jack-in', signalType: 'modulation' },
  'jack-patchbay-uni-out': { id: 'jack-patchbay-uni-out', name: 'UNI', module: 'patchbay', type: 'jack-out', signalType: 'modulation' },
  // --- Exponential Source ---
  'jack-patchbay-exp-src-in': { id: 'jack-patchbay-exp-src-in', name: 'EXP SRC IN', module: 'patchbay', type: 'jack-in', signalType: 'cv' },
  // --- Ring Modulator ---
  'jack-patchbay-ringmod-in-1': { id: 'jack-patchbay-ringmod-in-1', name: 'RINGMOD IN 1', module: 'patchbay', type: 'jack-in', signalType: 'audio' },
  'jack-patchbay-ringmod-in-2': { id: 'jack-patchbay-ringmod-in-2', name: 'RINGMOD IN 2', module: 'patchbay', type: 'jack-in', signalType: 'audio' },
  'jack-patchbay-ringmod-out': { id: 'jack-patchbay-ringmod-out', name: 'RINGMOD', module: 'patchbay', type: 'jack-out', signalType: 'audio' },

  // ===== VCA B / LPF (3 controls + 4 jacks = 7) =====
  'knob-vca-b-lpf-cv-amount': { id: 'knob-vca-b-lpf-cv-amount', name: 'CV Amount', module: 'vca-b-lpf', type: 'knob' },
  'led-vca-b-lpf-cv-level': { id: 'led-vca-b-lpf-cv-level', name: 'CV Level LED', module: 'vca-b-lpf', type: 'led' },
  'switch-vca-b-lpf-vca-control': { id: 'switch-vca-b-lpf-vca-control', name: 'VCA/LPF', module: 'vca-b-lpf', type: 'switch' },
  'jack-vca-b-lpf-in': { id: 'jack-vca-b-lpf-in', name: 'IN', module: 'vca-b-lpf', type: 'jack-in', signalType: 'audio' },
  'jack-vca-b-lpf-cv-in': { id: 'jack-vca-b-lpf-cv-in', name: 'CV IN', module: 'vca-b-lpf', type: 'jack-in', signalType: 'modulation' },
  'jack-vca-b-lpf-vca-out': { id: 'jack-vca-b-lpf-vca-out', name: 'VCA B', module: 'vca-b-lpf', type: 'jack-out', signalType: 'audio' },
  'jack-vca-b-lpf-out': { id: 'jack-vca-b-lpf-out', name: 'LPF B', module: 'vca-b-lpf', type: 'jack-out', signalType: 'audio' },

  // ===== FX SEND/RETURN (5 controls + 2 jacks = 7) =====
  'knob-fx-send-return-send-level': { id: 'knob-fx-send-return-send-level', name: 'SEND', module: 'fx-send-return', type: 'knob' },
  'switch-fx-send-return-level-type': { id: 'switch-fx-send-return-level-type', name: 'FX IN', module: 'fx-send-return', type: 'switch' },
  'switch-fx-send-return-phase': { id: 'switch-fx-send-return-phase', name: 'Phase', module: 'fx-send-return', type: 'switch' },
  'knob-fx-send-return-return-level': { id: 'knob-fx-send-return-return-level', name: 'RETURN', module: 'fx-send-return', type: 'knob' },
  'knob-fx-send-return-dry-wet': { id: 'knob-fx-send-return-dry-wet', name: 'FX MIX', module: 'fx-send-return', type: 'knob' },
  'jack-fx-send-return-send': { id: 'jack-fx-send-return-send', name: 'FX SEND', module: 'fx-send-return', type: 'jack-in', signalType: 'audio' },
  'jack-fx-send-return-mix': { id: 'jack-fx-send-return-mix', name: 'FX MIX', module: 'fx-send-return', type: 'jack-out', signalType: 'audio' },

  // ===== OUTPUT CONTROL (3 controls + 5 jacks = 8) =====
  'knob-output-control-drive': { id: 'knob-output-control-drive', name: 'Main Drive', module: 'output-control', type: 'knob' },
  'switch-output-control-soft-clip': { id: 'switch-output-control-soft-clip', name: 'Soft Clip', module: 'output-control', type: 'switch' },
  'knob-output-control-level': { id: 'knob-output-control-level', name: 'Main Level', module: 'output-control', type: 'knob' },
  'jack-output-control-fold-out': { id: 'jack-output-control-fold-out', name: 'FOLD', module: 'output-control', type: 'jack-out', signalType: 'audio' },
  'jack-output-control-vca-a-out': { id: 'jack-output-control-vca-a-out', name: 'VCA A', module: 'output-control', type: 'jack-out', signalType: 'audio' },
  'jack-output-control-main-1-in': { id: 'jack-output-control-main-1-in', name: 'MAIN 1 IN', module: 'output-control', type: 'jack-in', signalType: 'audio' },
  'jack-output-control-main-2-in': { id: 'jack-output-control-main-2-in', name: 'MAIN 2 IN', module: 'output-control', type: 'jack-in', signalType: 'audio' },
  'jack-output-control-main-out': { id: 'jack-output-control-main-out', name: 'MAIN', module: 'output-control', type: 'jack-out', signalType: 'audio' },
};

/**
 * Section bounds for the 17 Cascadia modules.
 * ViewBox: 0 0 1800 350. Modules arranged left-to-right matching physical panel.
 * Layout matches the physical Cascadia panel: 4 zones arranged in rows.
 * ViewBox: 0 0 1000 750
 *
 * Top strip (y: 5-55):    FX send/return, Output control
 * Row 1 (y: 72-290):      MIDI/CV, LINE IN, MIXER, VCF, WAVE FOLDER, VCA A
 * Row 2 (y: 310-495):     Utilities, LFO XYZ, Patchbay, VCA B/LPF, Push Gate
 * Row 3 (y: 512-745):     VCO B, VCO A, ENVELOPE A, ENVELOPE B
 */
export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  // Top strip (starts above mixer pulse slider)
  'fx-send-return':  { x: 210,  y: 5,   width: 270, height: 55 },
  'output-control':  { x: 600,  y: 5,   width: 395, height: 55 },
  // Row 1
  'midi-cv':         { x: 5,    y: 72,  width: 90,  height: 150 },
  'line-in':         { x: 100,  y: 72,  width: 55,  height: 150 },
  'mixer':           { x: 160,  y: 72,  width: 200, height: 150 },
  'vcf':             { x: 365,  y: 72,  width: 240, height: 150 },
  'wave-folder':     { x: 615,  y: 72,  width: 95,  height: 150 },
  'vca-a':           { x: 715,  y: 72,  width: 180, height: 150 },
  // Left column (S&H breaks grid) + Slew/Mixuverter in Row 2
  'utilities':       { x: 5,    y: 244, width: 410, height: 165 },
  'vco-b':           { x: 5,    y: 342, width: 145, height: 200 },
  // Row 2 (x:155+)
  'lfo-xyz':         { x: 420,  y: 244, width: 155, height: 165 },
  'patchbay':        { x: 580,  y: 244, width: 230, height: 165 },
  'vca-b-lpf':       { x: 895,  y: 244, width: 105, height: 165 },
  'push-gate':       { x: 965,  y: 400, width: 35,  height: 220 },
  // Row 3 (x:155+)
  'vco-a':           { x: 155,  y: 400, width: 310, height: 220 },
  'envelope-a':      { x: 470,  y: 400, width: 255, height: 220 },
  'envelope-b':      { x: 730,  y: 400, width: 265, height: 220 },
};

/**
 * Convert a MIDI value (0-127) to knob rotation in degrees.
 * Returns -135 for 0 (7 o'clock), 0 for center (noon), +135 for 127 (5 o'clock).
 */
export function midiToRotation(value: number): number {
  return ((value / 127) * 270) - 135;
}

/**
 * Convert a MIDI value (0-127) to a slider position (0.0 to 1.0).
 */
export function midiToSliderPosition(value: number): number {
  return value / 127;
}

/**
 * Look up which module a control belongs to.
 */
export function getModuleForControl(controlId: string): string | undefined {
  return CONTROL_METADATA[controlId]?.module;
}
