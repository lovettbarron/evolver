import type { ParameterDef } from './types';

/**
 * Complete Evolver program parameter map (128 parameters, indices 0-127).
 * Sourced from DSI Evolver Keyboard Manual v1.3, pp.48-52.
 */
export const PROGRAM_PARAMETERS: ParameterDef[] = [
  // Oscillator 1 (Analog, Left Channel) - indices 0-3
  { index: 0,   key: 'osc1_freq',                name: 'Oscillator 1 Frequency',              section: 'oscillators',    min: 0, max: 120 },
  { index: 1,   key: 'osc1_fine',                 name: 'Oscillator 1 Fine Tune',              section: 'oscillators',    min: 0, max: 100 },
  { index: 2,   key: 'osc1_shape',                name: 'Oscillator 1 Shape',                  section: 'oscillators',    min: 0, max: 102 },
  { index: 3,   key: 'osc1_level',                name: 'Oscillator 1 Level',                  section: 'oscillators',    min: 0, max: 100 },

  // Oscillator 2 (Analog, Right Channel) - indices 4-7
  { index: 4,   key: 'osc2_freq',                 name: 'Oscillator 2 Frequency',              section: 'oscillators',    min: 0, max: 120 },
  { index: 5,   key: 'osc2_fine',                 name: 'Oscillator 2 Fine Tune',              section: 'oscillators',    min: 0, max: 100 },
  { index: 6,   key: 'osc2_shape',                name: 'Oscillator 2 Shape',                  section: 'oscillators',    min: 0, max: 102 },
  { index: 7,   key: 'osc2_level',                name: 'Oscillator 2 Level',                  section: 'oscillators',    min: 0, max: 100 },

  // Oscillator 3 (Digital, Left Channel) - indices 8-11
  { index: 8,   key: 'osc3_freq',                 name: 'Oscillator 3 Frequency',              section: 'oscillators',    min: 0, max: 120 },
  { index: 9,   key: 'osc3_fine',                 name: 'Oscillator 3 Fine Tune',              section: 'oscillators',    min: 0, max: 100 },
  { index: 10,  key: 'osc3_shape',                name: 'Oscillator 3 Shape',                  section: 'oscillators',    min: 0, max: 127 },
  { index: 11,  key: 'osc3_level',                name: 'Oscillator 3 Level',                  section: 'oscillators',    min: 0, max: 100 },

  // Oscillator 4 (Digital, Right Channel) - indices 12-15
  { index: 12,  key: 'osc4_freq',                 name: 'Oscillator 4 Frequency',              section: 'oscillators',    min: 0, max: 120 },
  { index: 13,  key: 'osc4_fine',                 name: 'Oscillator 4 Fine Tune',              section: 'oscillators',    min: 0, max: 100 },
  { index: 14,  key: 'osc4_shape',                name: 'Oscillator 4 Shape',                  section: 'oscillators',    min: 0, max: 127 },
  { index: 15,  key: 'osc4_level',                name: 'Oscillator 4 Level',                  section: 'oscillators',    min: 0, max: 100 },

  // Filter - indices 16-23
  { index: 16,  key: 'filter_freq',               name: 'Filter Frequency',                    section: 'filter',         min: 0, max: 164 },
  { index: 17,  key: 'filter_env_amount',          name: 'Filter Envelope Amount',              section: 'filter',         min: 0, max: 198 },
  { index: 18,  key: 'filter_env_attack',          name: 'Filter Envelope Attack',              section: 'envelopes',      min: 0, max: 110 },
  { index: 19,  key: 'filter_env_decay',           name: 'Filter Envelope Decay',               section: 'envelopes',      min: 0, max: 110 },
  { index: 20,  key: 'filter_env_sustain',         name: 'Filter Envelope Sustain',             section: 'envelopes',      min: 0, max: 100 },
  { index: 21,  key: 'filter_env_release',         name: 'Filter Envelope Release',             section: 'envelopes',      min: 0, max: 110 },
  { index: 22,  key: 'filter_resonance',           name: 'Resonance',                           section: 'filter',         min: 0, max: 100 },
  { index: 23,  key: 'filter_key_amount',          name: 'Filter Keyboard Amount',              section: 'filter',         min: 0, max: 100 },

  // VCA - indices 24-31
  { index: 24,  key: 'vca_level',                  name: 'VCA Level',                           section: 'vca',            min: 0, max: 100 },
  { index: 25,  key: 'vca_env_amount',             name: 'VCA Envelope Amount',                 section: 'vca',            min: 0, max: 100 },
  { index: 26,  key: 'vca_env_attack',             name: 'VCA Envelope Attack',                 section: 'envelopes',      min: 0, max: 110 },
  { index: 27,  key: 'vca_env_decay',              name: 'VCA Envelope Decay',                  section: 'envelopes',      min: 0, max: 110 },
  { index: 28,  key: 'vca_env_sustain',            name: 'VCA Envelope Sustain',                section: 'envelopes',      min: 0, max: 100 },
  { index: 29,  key: 'vca_env_release',            name: 'VCA Envelope Release',                section: 'envelopes',      min: 0, max: 110 },
  { index: 30,  key: 'output_pan',                 name: 'Output Pan',                          section: 'vca',            min: 0, max: 6 },
  { index: 31,  key: 'program_volume',             name: 'Program Volume',                      section: 'vca',            min: 0, max: 100 },

  // Feedback - indices 32-34
  { index: 32,  key: 'feedback_freq',              name: 'Feedback Frequency',                  section: 'feedback',       min: 0, max: 48 },
  { index: 33,  key: 'feedback_amount',            name: 'Feedback Amount',                     section: 'feedback',       min: 0, max: 100 },
  { index: 34,  key: 'feedback_grunge',            name: 'Grunge',                              section: 'feedback',       min: 0, max: 1 },

  // Delay 1 + output hack - indices 35-39
  { index: 35,  key: 'delay1_time',                name: 'Delay 1 Time',                        section: 'delay',          min: 0, max: 166 },
  { index: 36,  key: 'delay1_level',               name: 'Delay 1 Level',                       section: 'delay',          min: 0, max: 100 },
  { index: 37,  key: 'delay_feedback_to_delay',    name: 'Delay Feedback to Delay Input',       section: 'delay',          min: 0, max: 100 },
  { index: 38,  key: 'delay_feedback_to_filter',   name: 'Delay Feedback to Filter Input',      section: 'delay',          min: 0, max: 100 },
  { index: 39,  key: 'output_hack',                name: 'Output Hack Amount',                  section: 'misc',           min: 0, max: 14 },

  // LFO 1 - indices 40-43
  { index: 40,  key: 'lfo1_freq',                  name: 'LFO 1 Frequency',                    section: 'lfos',           min: 0, max: 160 },
  { index: 41,  key: 'lfo1_shape',                 name: 'LFO 1 Shape',                        section: 'lfos',           min: 0, max: 4 },
  { index: 42,  key: 'lfo1_amount',                name: 'LFO 1 Amount',                       section: 'lfos',           min: 0, max: 200 },
  { index: 43,  key: 'lfo1_destination',           name: 'LFO 1 Destination',                  section: 'lfos',           min: 0, max: 68 },

  // LFO 2 - indices 44-47
  { index: 44,  key: 'lfo2_freq',                  name: 'LFO 2 Frequency',                    section: 'lfos',           min: 0, max: 160 },
  { index: 45,  key: 'lfo2_shape',                 name: 'LFO 2 Shape',                        section: 'lfos',           min: 0, max: 4 },
  { index: 46,  key: 'lfo2_amount',                name: 'LFO 2 Amount',                       section: 'lfos',           min: 0, max: 200 },
  { index: 47,  key: 'lfo2_destination',           name: 'LFO 2 Destination',                  section: 'lfos',           min: 0, max: 68 },

  // Envelope 3 - indices 48-53
  { index: 48,  key: 'env3_amount',                name: 'Envelope 3 Amount',                   section: 'envelopes',      min: 0, max: 198 },
  { index: 49,  key: 'env3_destination',           name: 'Envelope 3 Destination',              section: 'envelopes',      min: 0, max: 68 },
  { index: 50,  key: 'env3_attack',                name: 'Envelope 3 Attack',                   section: 'envelopes',      min: 0, max: 110 },
  { index: 51,  key: 'env3_decay',                 name: 'Envelope 3 Decay',                    section: 'envelopes',      min: 0, max: 110 },
  { index: 52,  key: 'env3_sustain',               name: 'Envelope 3 Sustain',                  section: 'envelopes',      min: 0, max: 100 },
  { index: 53,  key: 'env3_release',               name: 'Envelope 3 Release',                  section: 'envelopes',      min: 0, max: 110 },

  // Misc - indices 54-55
  { index: 54,  key: 'trigger_select',             name: 'Trigger Select',                      section: 'misc',           min: 0, max: 13 },
  { index: 55,  key: 'key_off_transpose',          name: 'Key Off / Transpose',                 section: 'misc',           min: 0, max: 73 },

  // Sequencer destinations - indices 56-59
  { index: 56,  key: 'seq1_destination',           name: 'Sequencer 1 Destination',             section: 'sequencer',      min: 0, max: 75 },
  { index: 57,  key: 'seq2_destination',           name: 'Sequencer 2 Destination',             section: 'sequencer',      min: 0, max: 75 },
  { index: 58,  key: 'seq3_destination',           name: 'Sequencer 3 Destination',             section: 'sequencer',      min: 0, max: 75 },
  { index: 59,  key: 'seq4_destination',           name: 'Sequencer 4 Destination',             section: 'sequencer',      min: 0, max: 75 },

  // Noise + External Input - indices 60-63
  { index: 60,  key: 'noise_volume',               name: 'Noise Volume',                        section: 'oscillators',    min: 0, max: 100 },
  { index: 61,  key: 'ext_input_volume',           name: 'External Input Volume',               section: 'external_input', min: 0, max: 100 },
  { index: 62,  key: 'ext_input_mode',             name: 'External Input Mode',                 section: 'external_input', min: 0, max: 2 },
  { index: 63,  key: 'input_hack_amount',          name: 'Input Hack Amount',                   section: 'external_input', min: 0, max: 14 },

  // Oscillator glide, sync, tempo - indices 64-67
  { index: 64,  key: 'osc1_glide',                 name: 'Oscillator 1 Glide',                  section: 'oscillators',    min: 0, max: 200 },
  { index: 65,  key: 'osc_sync',                   name: 'Sync',                                section: 'oscillators',    min: 0, max: 1 },
  { index: 66,  key: 'program_tempo',              name: 'Program Tempo',                       section: 'misc',           min: 30, max: 250 },
  { index: 67,  key: 'program_clock_divide',       name: 'Program Clock Divide',                section: 'misc',           min: 0, max: 12 },

  // Oscillator 2 glide, slop, pitch bend, key mode - indices 68-71
  { index: 68,  key: 'osc2_glide',                 name: 'Oscillator 2 Glide',                  section: 'oscillators',    min: 0, max: 200 },
  { index: 69,  key: 'osc_slop',                   name: 'Oscillator Slop',                     section: 'oscillators',    min: 0, max: 5 },
  { index: 70,  key: 'pitch_bend_range',           name: 'Pitch Bend Range',                    section: 'misc',           min: 0, max: 12 },
  { index: 71,  key: 'key_mode',                   name: 'Key Mode',                            section: 'misc',           min: 0, max: 23 },

  // Oscillator 3 extras - indices 72-75
  { index: 72,  key: 'osc3_glide',                 name: 'Oscillator 3 Glide',                  section: 'oscillators',    min: 0, max: 200 },
  { index: 73,  key: 'osc3_fm',                    name: 'FM Oscillator 4 to 3',                section: 'oscillators',    min: 0, max: 100 },
  { index: 74,  key: 'osc3_shape_mod',             name: 'Shape Mod Oscillator 3',              section: 'oscillators',    min: 0, max: 4 },
  { index: 75,  key: 'osc3_ring_mod',              name: 'Ring Mod Oscillator 4 to 3',          section: 'oscillators',    min: 0, max: 100 },

  // Oscillator 4 extras - indices 76-79
  { index: 76,  key: 'osc4_glide',                 name: 'Oscillator 4 Glide',                  section: 'oscillators',    min: 0, max: 200 },
  { index: 77,  key: 'osc4_fm',                    name: 'FM Oscillator 3 to 4',                section: 'oscillators',    min: 0, max: 100 },
  { index: 78,  key: 'osc4_shape_mod',             name: 'Shape Mod Oscillator 4',              section: 'oscillators',    min: 0, max: 4 },
  { index: 79,  key: 'osc4_ring_mod',              name: 'Ring Mod Oscillator 3 to 4',          section: 'oscillators',    min: 0, max: 100 },

  // Filter extras - indices 80-84
  { index: 80,  key: 'filter_poles',               name: '2/4 Pole Select',                     section: 'filter',         min: 0, max: 1 },
  { index: 81,  key: 'filter_env_velocity',        name: 'Filter Envelope Velocity',            section: 'filter',         min: 0, max: 100 },
  { index: 82,  key: 'filter_audio_mod',           name: 'Filter Audio Modulation',             section: 'filter',         min: 0, max: 100 },
  { index: 83,  key: 'filter_split',               name: 'Filter Split',                        section: 'filter',         min: 0, max: 100 },
  { index: 84,  key: 'highpass_filter',            name: 'Highpass Filter Cutoff',              section: 'filter',         min: 0, max: 199 },

  // Modulation 1 - indices 85-87
  { index: 85,  key: 'mod1_source',                name: 'Modulation 1 Source',                 section: 'modulation',     min: 0, max: 24 },
  { index: 86,  key: 'mod1_amount',                name: 'Modulation 1 Amount',                 section: 'modulation',     min: 0, max: 198 },
  { index: 87,  key: 'mod1_destination',           name: 'Modulation 1 Destination',            section: 'modulation',     min: 0, max: 68 },

  // Envelope shape + VCA velocity - indices 88-89
  { index: 88,  key: 'env_shape',                  name: 'Linear/Exponential Envelopes',        section: 'envelopes',      min: 0, max: 1 },
  { index: 89,  key: 'vca_env_velocity',           name: 'VCA Envelope Velocity',               section: 'vca',            min: 0, max: 100 },

  // Modulation 2 - indices 90-92
  { index: 90,  key: 'mod2_source',                name: 'Modulation 2 Source',                 section: 'modulation',     min: 0, max: 24 },
  { index: 91,  key: 'mod2_amount',                name: 'Modulation 2 Amount',                 section: 'modulation',     min: 0, max: 198 },
  { index: 92,  key: 'mod2_destination',           name: 'Modulation 2 Destination',            section: 'modulation',     min: 0, max: 68 },

  // Modulation 3 - indices 93-95
  { index: 93,  key: 'mod3_source',                name: 'Modulation 3 Source',                 section: 'modulation',     min: 0, max: 24 },
  { index: 94,  key: 'mod3_amount',                name: 'Modulation 3 Amount',                 section: 'modulation',     min: 0, max: 198 },
  { index: 95,  key: 'mod3_destination',           name: 'Modulation 3 Destination',            section: 'modulation',     min: 0, max: 68 },

  // Modulation 4 - indices 96-98
  { index: 96,  key: 'mod4_source',                name: 'Modulation 4 Source',                 section: 'modulation',     min: 0, max: 24 },
  { index: 97,  key: 'mod4_amount',                name: 'Modulation 4 Amount',                 section: 'modulation',     min: 0, max: 198 },
  { index: 98,  key: 'mod4_destination',           name: 'Modulation 4 Destination',            section: 'modulation',     min: 0, max: 68 },

  // Delay 2 + Delay 3 - indices 99-102
  { index: 99,  key: 'delay2_time',                name: 'Delay 2 Time',                        section: 'delay',          min: 0, max: 166 },
  { index: 100, key: 'delay2_level',               name: 'Delay 2 Level',                       section: 'delay',          min: 0, max: 100 },
  { index: 101, key: 'delay3_time',                name: 'Delay 3 Time',                        section: 'delay',          min: 0, max: 166 },
  { index: 102, key: 'delay3_level',               name: 'Delay 3 Level',                       section: 'delay',          min: 0, max: 100 },

  // Distortion - index 103
  { index: 103, key: 'distortion',                 name: 'Distortion',                          section: 'misc',           min: 0, max: 199 },

  // LFO 3 - indices 104-107
  { index: 104, key: 'lfo3_freq',                  name: 'LFO 3 Frequency',                    section: 'lfos',           min: 0, max: 160 },
  { index: 105, key: 'lfo3_shape',                 name: 'LFO 3 Shape',                        section: 'lfos',           min: 0, max: 4 },
  { index: 106, key: 'lfo3_amount',                name: 'LFO 3 Amount',                       section: 'lfos',           min: 0, max: 200 },
  { index: 107, key: 'lfo3_destination',           name: 'LFO 3 Destination',                  section: 'lfos',           min: 0, max: 68 },

  // LFO 4 - indices 108-111
  { index: 108, key: 'lfo4_freq',                  name: 'LFO 4 Frequency',                    section: 'lfos',           min: 0, max: 160 },
  { index: 109, key: 'lfo4_shape',                 name: 'LFO 4 Shape',                        section: 'lfos',           min: 0, max: 4 },
  { index: 110, key: 'lfo4_amount',                name: 'LFO 4 Amount',                       section: 'lfos',           min: 0, max: 200 },
  { index: 111, key: 'lfo4_destination',           name: 'LFO 4 Destination',                  section: 'lfos',           min: 0, max: 68 },

  // Envelope 3 extras - indices 112-113
  { index: 112, key: 'env3_delay',                 name: 'Envelope 3 Delay',                    section: 'envelopes',      min: 0, max: 100 },
  { index: 113, key: 'env3_velocity',              name: 'Envelope 3 Velocity',                 section: 'envelopes',      min: 0, max: 100 },

  // External Input extras - indices 114-117
  { index: 114, key: 'ext_input_peak_amount',      name: 'External Input Peak Amount',          section: 'external_input', min: 0, max: 198 },
  { index: 115, key: 'ext_input_peak_destination', name: 'External Input Peak Destination',     section: 'external_input', min: 0, max: 68 },
  { index: 116, key: 'ext_input_envfollow_amount', name: 'External Input Env Follower Amount',  section: 'external_input', min: 0, max: 198 },
  { index: 117, key: 'ext_input_envfollow_dest',   name: 'External Input Env Follower Dest',    section: 'external_input', min: 0, max: 68 },

  // MIDI Controllers - indices 118-127
  { index: 118, key: 'velocity_amount',            name: 'Velocity Amount',                     section: 'modulation',     min: 0, max: 198 },
  { index: 119, key: 'velocity_destination',       name: 'Velocity Destination',                section: 'modulation',     min: 0, max: 68 },
  { index: 120, key: 'mod_wheel_amount',           name: 'Mod Wheel Amount',                    section: 'modulation',     min: 0, max: 198 },
  { index: 121, key: 'mod_wheel_destination',      name: 'Mod Wheel Destination',               section: 'modulation',     min: 0, max: 68 },
  { index: 122, key: 'pressure_amount',            name: 'Pressure Amount',                     section: 'modulation',     min: 0, max: 198 },
  { index: 123, key: 'pressure_destination',       name: 'Pressure Destination',                section: 'modulation',     min: 0, max: 68 },
  { index: 124, key: 'breath_amount',              name: 'Breath Controller Amount',            section: 'modulation',     min: 0, max: 198 },
  { index: 125, key: 'breath_destination',         name: 'Breath Controller Destination',       section: 'modulation',     min: 0, max: 68 },
  { index: 126, key: 'foot_amount',                name: 'Foot Controller Amount',              section: 'modulation',     min: 0, max: 198 },
  { index: 127, key: 'foot_destination',           name: 'Foot Controller Destination',         section: 'modulation',     min: 0, max: 68 },
];

/**
 * Sequencer step parameters (64 entries: 4 tracks x 16 steps).
 * These occupy raw bytes 128-191 in the program dump.
 */
export const SEQUENCER_PARAMETERS: ParameterDef[] = Array.from({ length: 64 }, (_, i) => {
  const track = Math.floor(i / 16) + 1;
  const step = (i % 16) + 1;
  const stepStr = step.toString().padStart(2, '0');
  return {
    index: i,
    key: `seq${track}_step_${stepStr}`,
    name: `Sequencer ${track} Step ${step}`,
    section: 'sequencer' as const,
    min: 0,
    max: 127,
  };
});

/** Lookup map for fast key-based parameter access */
const parameterKeyMap = new Map<string, ParameterDef>(
  PROGRAM_PARAMETERS.map(p => [p.key, p])
);

/** Find a program parameter by its key */
export function getParameterByKey(key: string): ParameterDef | undefined {
  return parameterKeyMap.get(key);
}
