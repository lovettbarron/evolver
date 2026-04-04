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
  // ===== MIDI/CV (4 controls + 8 jacks = 12) =====
  'switch-midi-cv-pitch-button': { id: 'switch-midi-cv-pitch-button', name: 'PITCH Button', module: 'midi-cv', type: 'switch' },
  'switch-midi-cv-cc-button': { id: 'switch-midi-cv-cc-button', name: 'MIDI CC Button', module: 'midi-cv', type: 'switch' },
  'switch-midi-cv-lfo-button': { id: 'switch-midi-cv-lfo-button', name: 'MIDI LFO Button', module: 'midi-cv', type: 'switch' },
  'switch-midi-cv-clk-button': { id: 'switch-midi-cv-clk-button', name: 'MIDI CLK Button', module: 'midi-cv', type: 'switch' },
  'jack-midi-cv-pitch-out': { id: 'jack-midi-cv-pitch-out', name: 'MIDI PITCH OUT', module: 'midi-cv', type: 'jack-out', signalType: 'cv' },
  'jack-midi-cv-cc-out': { id: 'jack-midi-cv-cc-out', name: 'MIDI CC OUT', module: 'midi-cv', type: 'jack-out', signalType: 'cv' },
  'jack-midi-cv-lfo-out': { id: 'jack-midi-cv-lfo-out', name: 'MIDI LFO OUT', module: 'midi-cv', type: 'jack-out', signalType: 'modulation' },
  'jack-midi-cv-clk-out': { id: 'jack-midi-cv-clk-out', name: 'MIDI CLK OUT', module: 'midi-cv', type: 'jack-out', signalType: 'gate' },
  'jack-midi-cv-vel-out': { id: 'jack-midi-cv-vel-out', name: 'MIDI VEL OUT', module: 'midi-cv', type: 'jack-out', signalType: 'cv' },
  'jack-midi-cv-mod-out': { id: 'jack-midi-cv-mod-out', name: 'MIDI MOD OUT', module: 'midi-cv', type: 'jack-out', signalType: 'modulation' },
  'jack-midi-cv-gate-out': { id: 'jack-midi-cv-gate-out', name: 'MIDI GATE OUT', module: 'midi-cv', type: 'jack-out', signalType: 'gate' },
  'jack-midi-cv-trig-out': { id: 'jack-midi-cv-trig-out', name: 'MIDI TRIG OUT', module: 'midi-cv', type: 'jack-out', signalType: 'gate' },

  // ===== VCO A (11 controls + 6 jacks = 17) =====
  'knob-vco-a-pitch': { id: 'knob-vco-a-pitch', name: 'Pitch', module: 'vco-a', type: 'knob' },
  'switch-vco-a-octave': { id: 'switch-vco-a-octave', name: 'Octave', module: 'vco-a', type: 'switch' },
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
  'switch-vco-b-octave': { id: 'switch-vco-b-octave', name: 'Octave', module: 'vco-b', type: 'switch' },
  'knob-vco-b-pitch': { id: 'knob-vco-b-pitch', name: 'Pitch', module: 'vco-b', type: 'knob' },
  'switch-vco-b-vco-lfo': { id: 'switch-vco-b-vco-lfo', name: 'VCO/LFO', module: 'vco-b', type: 'switch' },
  'switch-vco-b-pitch-source': { id: 'switch-vco-b-pitch-source', name: 'Pitch Source', module: 'vco-b', type: 'switch' },
  'led-vco-b-rate': { id: 'led-vco-b-rate', name: 'Rate LED', module: 'vco-b', type: 'led' },
  'jack-vco-b-pitch-in': { id: 'jack-vco-b-pitch-in', name: 'PITCH IN', module: 'vco-b', type: 'jack-in', signalType: 'cv' },
  'jack-vco-b-sync-in': { id: 'jack-vco-b-sync-in', name: 'SYNC IN', module: 'vco-b', type: 'jack-in', signalType: 'audio' },
  'jack-vco-b-sine-out': { id: 'jack-vco-b-sine-out', name: 'SINE OUT', module: 'vco-b', type: 'jack-out', signalType: 'audio' },
  'jack-vco-b-triangle-out': { id: 'jack-vco-b-triangle-out', name: 'TRIANGLE OUT', module: 'vco-b', type: 'jack-out', signalType: 'audio' },
  'jack-vco-b-saw-out': { id: 'jack-vco-b-saw-out', name: 'SAW OUT', module: 'vco-b', type: 'jack-out', signalType: 'audio' },
  'jack-vco-b-square-out': { id: 'jack-vco-b-square-out', name: 'SQUARE OUT', module: 'vco-b', type: 'jack-out', signalType: 'audio' },

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
  'jack-envelope-a-eoh-out': { id: 'jack-envelope-a-eoh-out', name: 'EOH OUT', module: 'envelope-a', type: 'jack-out', signalType: 'gate' },
  'jack-envelope-a-eoa-out': { id: 'jack-envelope-a-eoa-out', name: 'EOA OUT', module: 'envelope-a', type: 'jack-out', signalType: 'gate' },
  'jack-envelope-a-out': { id: 'jack-envelope-a-out', name: 'ENV A OUT', module: 'envelope-a', type: 'jack-out', signalType: 'modulation' },

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
  'jack-envelope-b-eof-out': { id: 'jack-envelope-b-eof-out', name: 'EOF OUT', module: 'envelope-b', type: 'jack-out', signalType: 'gate' },
  'jack-envelope-b-out': { id: 'jack-envelope-b-out', name: 'ENV B OUT', module: 'envelope-b', type: 'jack-out', signalType: 'modulation' },

  // ===== LINE IN (1 control + 1 jack = 2) =====
  'slider-line-in-level': { id: 'slider-line-in-level', name: 'Level', module: 'line-in', type: 'slider' },
  'jack-line-in-out': { id: 'jack-line-in-out', name: 'LINE IN OUT', module: 'line-in', type: 'jack-out', signalType: 'audio' },

  // ===== MIXER (8 controls + 7 jacks = 15) =====
  'slider-mixer-in-1': { id: 'slider-mixer-in-1', name: 'IN 1', module: 'mixer', type: 'slider' },
  'slider-mixer-in-2': { id: 'slider-mixer-in-2', name: 'IN 2', module: 'mixer', type: 'slider' },
  'slider-mixer-pulse': { id: 'slider-mixer-pulse', name: 'Pulse', module: 'mixer', type: 'slider' },
  'slider-mixer-saw': { id: 'slider-mixer-saw', name: 'Saw', module: 'mixer', type: 'slider' },
  'slider-mixer-sub': { id: 'slider-mixer-sub', name: 'Sub', module: 'mixer', type: 'slider' },
  'slider-mixer-noise': { id: 'slider-mixer-noise', name: 'Noise', module: 'mixer', type: 'slider' },
  'switch-mixer-sub-type': { id: 'switch-mixer-sub-type', name: 'Sub Type', module: 'mixer', type: 'switch' },
  'switch-mixer-noise-type': { id: 'switch-mixer-noise-type', name: 'Noise Type', module: 'mixer', type: 'switch' },
  'jack-mixer-in-1': { id: 'jack-mixer-in-1', name: 'MIXER IN 1', module: 'mixer', type: 'jack-in', signalType: 'audio' },
  'jack-mixer-in-2': { id: 'jack-mixer-in-2', name: 'MIXER IN 2', module: 'mixer', type: 'jack-in', signalType: 'audio' },
  'jack-mixer-vco-a-tri-out': { id: 'jack-mixer-vco-a-tri-out', name: 'VCO A TRI OUT', module: 'mixer', type: 'jack-out', signalType: 'audio' },
  'jack-mixer-vco-a-saw-out': { id: 'jack-mixer-vco-a-saw-out', name: 'VCO A SAW OUT', module: 'mixer', type: 'jack-out', signalType: 'audio' },
  'jack-mixer-vco-a-pulse-out': { id: 'jack-mixer-vco-a-pulse-out', name: 'VCO A PULSE OUT', module: 'mixer', type: 'jack-out', signalType: 'audio' },
  'jack-mixer-noise-out': { id: 'jack-mixer-noise-out', name: 'NOISE OUT', module: 'mixer', type: 'jack-out', signalType: 'audio' },
  'jack-mixer-out': { id: 'jack-mixer-out', name: 'MIXER OUT', module: 'mixer', type: 'jack-out', signalType: 'audio' },

  // ===== VCF (8 controls + 8 jacks = 16) =====
  'slider-vcf-fm-1': { id: 'slider-vcf-fm-1', name: 'FM 1', module: 'vcf', type: 'slider' },
  'slider-vcf-fm-2': { id: 'slider-vcf-fm-2', name: 'FM 2', module: 'vcf', type: 'slider' },
  'slider-vcf-fm-3': { id: 'slider-vcf-fm-3', name: 'FM 3', module: 'vcf', type: 'slider' },
  'slider-vcf-qm': { id: 'slider-vcf-qm', name: 'QM', module: 'vcf', type: 'slider' },
  'slider-vcf-freq': { id: 'slider-vcf-freq', name: 'Frequency', module: 'vcf', type: 'slider' },
  'slider-vcf-q': { id: 'slider-vcf-q', name: 'Resonance', module: 'vcf', type: 'slider' },
  'switch-vcf-mode': { id: 'switch-vcf-mode', name: 'Mode', module: 'vcf', type: 'switch' },
  'knob-vcf-level': { id: 'knob-vcf-level', name: 'Level', module: 'vcf', type: 'knob' },
  'jack-vcf-fm-1-in': { id: 'jack-vcf-fm-1-in', name: 'FM 1 IN', module: 'vcf', type: 'jack-in', signalType: 'modulation' },
  'jack-vcf-fm-2-in': { id: 'jack-vcf-fm-2-in', name: 'FM 2 IN', module: 'vcf', type: 'jack-in', signalType: 'cv' },
  'jack-vcf-fm-3-in': { id: 'jack-vcf-fm-3-in', name: 'FM 3 IN', module: 'vcf', type: 'jack-in', signalType: 'modulation' },
  'jack-vcf-q-mod-in': { id: 'jack-vcf-q-mod-in', name: 'Q MOD IN', module: 'vcf', type: 'jack-in', signalType: 'modulation' },
  'jack-vcf-in': { id: 'jack-vcf-in', name: 'VCF IN', module: 'vcf', type: 'jack-in', signalType: 'audio' },
  'jack-vcf-lp4-out': { id: 'jack-vcf-lp4-out', name: 'LP4 OUT', module: 'vcf', type: 'jack-out', signalType: 'audio' },
  'jack-vcf-hp4-out': { id: 'jack-vcf-hp4-out', name: 'HP4 OUT', module: 'vcf', type: 'jack-out', signalType: 'audio' },
  'jack-vcf-out': { id: 'jack-vcf-out', name: 'VCF OUT', module: 'vcf', type: 'jack-out', signalType: 'audio' },

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
  'jack-push-gate-out': { id: 'jack-push-gate-out', name: 'GATE OUT', module: 'push-gate', type: 'jack-out', signalType: 'gate' },

  // ===== UTILITIES (8 controls + 9 jacks = 17) =====
  // --- Sample & Hold ---
  'led-utilities-sh': { id: 'led-utilities-sh', name: 'S&H LED', module: 'utilities', type: 'led' },
  'jack-utilities-sh-trig-in': { id: 'jack-utilities-sh-trig-in', name: 'TRIG IN', module: 'utilities', type: 'jack-in', signalType: 'gate' },
  'jack-utilities-sh-in': { id: 'jack-utilities-sh-in', name: 'S&H IN', module: 'utilities', type: 'jack-in', signalType: 'modulation' },
  'jack-utilities-sh-out': { id: 'jack-utilities-sh-out', name: 'S&H OUT', module: 'utilities', type: 'jack-out', signalType: 'cv' },
  // --- Slew Limiter / Envelope Follower ---
  'knob-utilities-slew-rate': { id: 'knob-utilities-slew-rate', name: 'Slew Rate', module: 'utilities', type: 'knob' },
  'switch-utilities-slew-direction': { id: 'switch-utilities-slew-direction', name: 'Slew Direction', module: 'utilities', type: 'switch' },
  'switch-utilities-slew-shape': { id: 'switch-utilities-slew-shape', name: 'Slew Shape', module: 'utilities', type: 'switch' },
  'switch-utilities-env-follow': { id: 'switch-utilities-env-follow', name: 'Env Follow', module: 'utilities', type: 'switch' },
  'jack-utilities-slew-in': { id: 'jack-utilities-slew-in', name: 'SLEW/FOLLOW IN', module: 'utilities', type: 'jack-in', signalType: 'cv' },
  'jack-utilities-slew-out': { id: 'jack-utilities-slew-out', name: 'SLEW OUT', module: 'utilities', type: 'jack-out', signalType: 'cv' },
  // --- Mixuverter ---
  'knob-utilities-attenuator': { id: 'knob-utilities-attenuator', name: 'Attenuator', module: 'utilities', type: 'knob' },
  'switch-utilities-x2': { id: 'switch-utilities-x2', name: 'x2 Switch', module: 'utilities', type: 'switch' },
  'switch-utilities-polarity': { id: 'switch-utilities-polarity', name: 'Polarity', module: 'utilities', type: 'switch' },
  'jack-utilities-main-input': { id: 'jack-utilities-main-input', name: 'Main Input', module: 'utilities', type: 'jack-in', signalType: 'cv' },
  'jack-utilities-secondary-input': { id: 'jack-utilities-secondary-input', name: 'Secondary Input', module: 'utilities', type: 'jack-in', signalType: 'cv' },
  'jack-utilities-mixuverter-out-a': { id: 'jack-utilities-mixuverter-out-a', name: 'Mixuverter Out A', module: 'utilities', type: 'jack-out', signalType: 'cv' },
  'jack-utilities-mixuverter-out-b': { id: 'jack-utilities-mixuverter-out-b', name: 'Mixuverter Out B', module: 'utilities', type: 'jack-out', signalType: 'cv' },

  // ===== LFO X/Y/Z (4 controls + 4 jacks = 8) =====
  'knob-lfo-xyz-rate': { id: 'knob-lfo-xyz-rate', name: 'Rate', module: 'lfo-xyz', type: 'knob' },
  'switch-lfo-xyz-y-divider': { id: 'switch-lfo-xyz-y-divider', name: 'LFO Y Rate Divider', module: 'lfo-xyz', type: 'switch' },
  'switch-lfo-xyz-z-divider': { id: 'switch-lfo-xyz-z-divider', name: 'LFO Z Rate Divider', module: 'lfo-xyz', type: 'switch' },
  'knob-lfo-xyz-trimmers': { id: 'knob-lfo-xyz-trimmers', name: 'Rate Trimmers', module: 'lfo-xyz', type: 'knob' },
  'jack-lfo-xyz-x-out': { id: 'jack-lfo-xyz-x-out', name: 'LFO X OUT', module: 'lfo-xyz', type: 'jack-out', signalType: 'modulation' },
  'jack-lfo-xyz-y-out': { id: 'jack-lfo-xyz-y-out', name: 'LFO Y OUT', module: 'lfo-xyz', type: 'jack-out', signalType: 'modulation' },
  'jack-lfo-xyz-z-out': { id: 'jack-lfo-xyz-z-out', name: 'LFO Z OUT', module: 'lfo-xyz', type: 'jack-out', signalType: 'modulation' },
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
  'jack-patchbay-sum-out': { id: 'jack-patchbay-sum-out', name: 'SUM OUT', module: 'patchbay', type: 'jack-out', signalType: 'cv' },
  // --- Inverter ---
  'jack-patchbay-inverter-in': { id: 'jack-patchbay-inverter-in', name: 'INVERTER IN', module: 'patchbay', type: 'jack-in', signalType: 'modulation' },
  'jack-patchbay-inverter-out': { id: 'jack-patchbay-inverter-out', name: 'INVERTER OUT', module: 'patchbay', type: 'jack-out', signalType: 'modulation' },
  // --- Bipolar-to-Unipolar ---
  'jack-patchbay-bi-in': { id: 'jack-patchbay-bi-in', name: 'BI IN', module: 'patchbay', type: 'jack-in', signalType: 'modulation' },
  'jack-patchbay-uni-out': { id: 'jack-patchbay-uni-out', name: 'UNI OUT', module: 'patchbay', type: 'jack-out', signalType: 'modulation' },
  // --- Exponential Source ---
  'jack-patchbay-exp-src-in': { id: 'jack-patchbay-exp-src-in', name: 'EXP SRC IN', module: 'patchbay', type: 'jack-in', signalType: 'cv' },
  // --- Ring Modulator ---
  'jack-patchbay-ringmod-in-1': { id: 'jack-patchbay-ringmod-in-1', name: 'RINGMOD IN 1', module: 'patchbay', type: 'jack-in', signalType: 'audio' },
  'jack-patchbay-ringmod-in-2': { id: 'jack-patchbay-ringmod-in-2', name: 'RINGMOD IN 2', module: 'patchbay', type: 'jack-in', signalType: 'audio' },
  'jack-patchbay-ringmod-out': { id: 'jack-patchbay-ringmod-out', name: 'RINGMOD OUT', module: 'patchbay', type: 'jack-out', signalType: 'audio' },

  // ===== VCA B / LPF (3 controls + 4 jacks = 7) =====
  'knob-vca-b-lpf-cv-amount': { id: 'knob-vca-b-lpf-cv-amount', name: 'CV Amount', module: 'vca-b-lpf', type: 'knob' },
  'led-vca-b-lpf-cv-level': { id: 'led-vca-b-lpf-cv-level', name: 'CV Level LED', module: 'vca-b-lpf', type: 'led' },
  'switch-vca-b-lpf-vca-control': { id: 'switch-vca-b-lpf-vca-control', name: 'VCA Control', module: 'vca-b-lpf', type: 'switch' },
  'jack-vca-b-lpf-in': { id: 'jack-vca-b-lpf-in', name: 'VCA B IN', module: 'vca-b-lpf', type: 'jack-in', signalType: 'audio' },
  'jack-vca-b-lpf-cv-in': { id: 'jack-vca-b-lpf-cv-in', name: 'VCA/LPF B CV IN', module: 'vca-b-lpf', type: 'jack-in', signalType: 'modulation' },
  'jack-vca-b-lpf-vca-out': { id: 'jack-vca-b-lpf-vca-out', name: 'VCA B OUT', module: 'vca-b-lpf', type: 'jack-out', signalType: 'audio' },
  'jack-vca-b-lpf-out': { id: 'jack-vca-b-lpf-out', name: 'LPF B OUT', module: 'vca-b-lpf', type: 'jack-out', signalType: 'audio' },

  // ===== FX SEND/RETURN (5 controls + 2 jacks = 7) =====
  'knob-fx-send-return-send-level': { id: 'knob-fx-send-return-send-level', name: 'FX Send Level', module: 'fx-send-return', type: 'knob' },
  'switch-fx-send-return-level-type': { id: 'switch-fx-send-return-level-type', name: 'Send Level Type', module: 'fx-send-return', type: 'switch' },
  'switch-fx-send-return-phase': { id: 'switch-fx-send-return-phase', name: 'Phase', module: 'fx-send-return', type: 'switch' },
  'knob-fx-send-return-return-level': { id: 'knob-fx-send-return-return-level', name: 'FX Return Level', module: 'fx-send-return', type: 'knob' },
  'knob-fx-send-return-dry-wet': { id: 'knob-fx-send-return-dry-wet', name: 'Dry/Wet FX Mix', module: 'fx-send-return', type: 'knob' },
  'jack-fx-send-return-send': { id: 'jack-fx-send-return-send', name: 'FX SEND', module: 'fx-send-return', type: 'jack-in', signalType: 'audio' },
  'jack-fx-send-return-mix': { id: 'jack-fx-send-return-mix', name: 'FX MIX', module: 'fx-send-return', type: 'jack-out', signalType: 'audio' },

  // ===== OUTPUT CONTROL (3 controls + 5 jacks = 8) =====
  'knob-output-control-drive': { id: 'knob-output-control-drive', name: 'Main Drive', module: 'output-control', type: 'knob' },
  'switch-output-control-soft-clip': { id: 'switch-output-control-soft-clip', name: 'Soft Clip', module: 'output-control', type: 'switch' },
  'knob-output-control-level': { id: 'knob-output-control-level', name: 'Main Level', module: 'output-control', type: 'knob' },
  'jack-output-control-fold-out': { id: 'jack-output-control-fold-out', name: 'FOLD OUT', module: 'output-control', type: 'jack-out', signalType: 'audio' },
  'jack-output-control-vca-a-out': { id: 'jack-output-control-vca-a-out', name: 'VCA A OUT', module: 'output-control', type: 'jack-out', signalType: 'audio' },
  'jack-output-control-main-1-in': { id: 'jack-output-control-main-1-in', name: 'MAIN 1 IN', module: 'output-control', type: 'jack-in', signalType: 'audio' },
  'jack-output-control-main-2-in': { id: 'jack-output-control-main-2-in', name: 'MAIN 2 IN', module: 'output-control', type: 'jack-in', signalType: 'audio' },
  'jack-output-control-main-out': { id: 'jack-output-control-main-out', name: 'MAIN OUT', module: 'output-control', type: 'jack-out', signalType: 'audio' },
};

/**
 * Section bounds for the 17 Cascadia modules.
 * ViewBox: 0 0 1800 350. Modules arranged left-to-right matching physical panel.
 * Widths proportional to control density with ~15px inter-module gaps.
 */
export const SECTION_BOUNDS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'midi-cv':        { x: 10,   y: 10, width: 90,  height: 320 },
  'vco-a':          { x: 115,  y: 10, width: 130, height: 320 },
  'vco-b':          { x: 260,  y: 10, width: 90,  height: 320 },
  'envelope-a':     { x: 365,  y: 10, width: 110, height: 320 },
  'envelope-b':     { x: 490,  y: 10, width: 110, height: 320 },
  'line-in':        { x: 615,  y: 10, width: 40,  height: 320 },
  'mixer':          { x: 670,  y: 10, width: 120, height: 320 },
  'vcf':            { x: 805,  y: 10, width: 120, height: 320 },
  'wave-folder':    { x: 940,  y: 10, width: 50,  height: 320 },
  'vca-a':          { x: 1005, y: 10, width: 60,  height: 320 },
  'push-gate':      { x: 1080, y: 10, width: 40,  height: 320 },
  'utilities':      { x: 1135, y: 10, width: 130, height: 320 },
  'lfo-xyz':        { x: 1280, y: 10, width: 80,  height: 320 },
  'patchbay':       { x: 1375, y: 10, width: 150, height: 320 },
  'vca-b-lpf':      { x: 1540, y: 10, width: 70,  height: 320 },
  'fx-send-return':  { x: 1625, y: 10, width: 80,  height: 320 },
  'output-control':  { x: 1720, y: 10, width: 80,  height: 320 },
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
