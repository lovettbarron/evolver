import { describe, it, expect } from 'vitest';
import {
  resolveCascadiaCableId,
  getCascadiaCableSignalType,
} from '@/lib/cascadia-cable-lookup';

describe('resolveCascadiaCableId', () => {
  // Sources from existing patches
  it('resolves "LFO X OUT" to jack-lfo-xyz-x-out', () => {
    expect(resolveCascadiaCableId('LFO X OUT')).toBe('jack-lfo-xyz-x-out');
  });

  it('resolves "LFO Y OUT" to jack-lfo-xyz-y-out', () => {
    expect(resolveCascadiaCableId('LFO Y OUT')).toBe('jack-lfo-xyz-y-out');
  });

  it('resolves "LFO Z OUT" to jack-lfo-xyz-z-out', () => {
    expect(resolveCascadiaCableId('LFO Z OUT')).toBe('jack-lfo-xyz-z-out');
  });

  it('resolves "ENV A OUT" to jack-envelope-a-out', () => {
    expect(resolveCascadiaCableId('ENV A OUT')).toBe('jack-envelope-a-out');
  });

  it('resolves "ENV B OUT" to jack-envelope-b-out', () => {
    expect(resolveCascadiaCableId('ENV B OUT')).toBe('jack-envelope-b-out');
  });

  it('resolves "Envelope A ENV OUT" to jack-envelope-a-out', () => {
    expect(resolveCascadiaCableId('Envelope A ENV OUT')).toBe('jack-envelope-a-out');
  });

  it('resolves "VCO A SAW OUT" to jack-mixer-vco-a-saw-out', () => {
    expect(resolveCascadiaCableId('VCO A SAW OUT')).toBe('jack-mixer-vco-a-saw-out');
  });

  it('resolves "VCO B SAW OUT" to jack-vco-b-saw-out', () => {
    expect(resolveCascadiaCableId('VCO B SAW OUT')).toBe('jack-vco-b-saw-out');
  });

  it('resolves "VCO B SINE OUT" to jack-vco-b-sine-out', () => {
    expect(resolveCascadiaCableId('VCO B SINE OUT')).toBe('jack-vco-b-sine-out');
  });

  it('resolves "VCO B TRIANGLE OUT" to jack-vco-b-triangle-out', () => {
    expect(resolveCascadiaCableId('VCO B TRIANGLE OUT')).toBe('jack-vco-b-triangle-out');
  });

  it('resolves "S&H OUT" to jack-utilities-sh-out', () => {
    expect(resolveCascadiaCableId('S&H OUT')).toBe('jack-utilities-sh-out');
  });

  it('resolves "SLEW OUT" to jack-utilities-slew-out', () => {
    expect(resolveCascadiaCableId('SLEW OUT')).toBe('jack-utilities-slew-out');
  });

  it('resolves "NOISE OUT" to jack-mixer-noise-out', () => {
    expect(resolveCascadiaCableId('NOISE OUT')).toBe('jack-mixer-noise-out');
  });

  it('resolves "LINE IN OUT" to jack-line-in-out', () => {
    expect(resolveCascadiaCableId('LINE IN OUT')).toBe('jack-line-in-out');
  });

  it('resolves "LPF B OUT" to jack-vca-b-lpf-out', () => {
    expect(resolveCascadiaCableId('LPF B OUT')).toBe('jack-vca-b-lpf-out');
  });

  // Destinations from existing patches
  it('resolves "VCF FM 1 IN" to jack-vcf-fm-1-in', () => {
    expect(resolveCascadiaCableId('VCF FM 1 IN')).toBe('jack-vcf-fm-1-in');
  });

  it('resolves "VCF FM 3 IN" to jack-vcf-fm-3-in', () => {
    expect(resolveCascadiaCableId('VCF FM 3 IN')).toBe('jack-vcf-fm-3-in');
  });

  it('resolves "VCF Q MOD IN" to jack-vcf-q-mod-in', () => {
    expect(resolveCascadiaCableId('VCF Q MOD IN')).toBe('jack-vcf-q-mod-in');
  });

  it('resolves "VCA A LEVEL MOD IN" to jack-vca-a-level-mod-in', () => {
    expect(resolveCascadiaCableId('VCA A LEVEL MOD IN')).toBe('jack-vca-a-level-mod-in');
  });

  it('resolves "VCA/LPF B CV IN" to jack-vca-b-lpf-cv-in', () => {
    expect(resolveCascadiaCableId('VCA/LPF B CV IN')).toBe('jack-vca-b-lpf-cv-in');
  });

  it('resolves "VCA B IN" to jack-vca-b-lpf-in', () => {
    expect(resolveCascadiaCableId('VCA B IN')).toBe('jack-vca-b-lpf-in');
  });

  it('resolves "MAIN 2 IN" to jack-output-control-main-2-in', () => {
    expect(resolveCascadiaCableId('MAIN 2 IN')).toBe('jack-output-control-main-2-in');
  });

  it('resolves "MIXER IN 2" to jack-mixer-in-2', () => {
    expect(resolveCascadiaCableId('MIXER IN 2')).toBe('jack-mixer-in-2');
  });

  it('resolves "FOLD MOD IN" to jack-wave-folder-mod-in', () => {
    expect(resolveCascadiaCableId('FOLD MOD IN')).toBe('jack-wave-folder-mod-in');
  });

  it('resolves "Wave Folder FOLD MOD IN" to jack-wave-folder-mod-in', () => {
    expect(resolveCascadiaCableId('Wave Folder FOLD MOD IN')).toBe('jack-wave-folder-mod-in');
  });

  it('resolves "VCO A FM 1 IN" to jack-vco-a-fm-1-in', () => {
    expect(resolveCascadiaCableId('VCO A FM 1 IN')).toBe('jack-vco-a-fm-1-in');
  });

  it('resolves "VCO A IM IN" to jack-vco-a-im-in', () => {
    expect(resolveCascadiaCableId('VCO A IM IN')).toBe('jack-vco-a-im-in');
  });

  it('resolves "VCO B FM 1 IN" to jack-vco-b-fm-1-in', () => {
    expect(resolveCascadiaCableId('VCO B FM 1 IN')).toBe('jack-vco-b-fm-1-in');
  });
});

describe('getCascadiaCableSignalType', () => {
  it('returns "modulation" for jack-lfo-xyz-x-out', () => {
    expect(getCascadiaCableSignalType('jack-lfo-xyz-x-out')).toBe('modulation');
  });

  it('returns "modulation" for jack-vcf-fm-1-in', () => {
    expect(getCascadiaCableSignalType('jack-vcf-fm-1-in')).toBe('modulation');
  });

  it('returns "modulation" for jack-vco-a-fm-1-in', () => {
    expect(getCascadiaCableSignalType('jack-vco-a-fm-1-in')).toBe('modulation');
  });

  it('returns "default" for nonexistent IDs', () => {
    expect(getCascadiaCableSignalType('nonexistent-id')).toBe('default');
  });

  it('returns "audio" for jack-vco-b-saw-out', () => {
    expect(getCascadiaCableSignalType('jack-vco-b-saw-out')).toBe('audio');
  });

  it('returns "gate" for jack-envelope-a-eoh-out', () => {
    expect(getCascadiaCableSignalType('jack-envelope-a-eoh-out')).toBe('gate');
  });
});
