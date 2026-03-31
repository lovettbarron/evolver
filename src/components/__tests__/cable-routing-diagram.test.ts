import { describe, it, expect } from 'vitest';
import { generateMermaid } from '../cable-routing-diagram';

describe('generateMermaid', () => {
  it('generates graph LR with correct nodes and edge for single cable', () => {
    const result = generateMermaid([
      {
        source: 'LFO X Out',
        destination: 'VCO A FM 1 In',
        purpose: 'Slow pitch vibrato',
      },
    ]);

    expect(result).toContain('graph LR');
    expect(result).toContain('LFOXYZ["LFO X/Y/Z"]');
    expect(result).toContain('VCOA["VCO A"]');
    expect(result).toContain('LFOXYZ -->|"Slow pitch vibrato"| VCOA');
  });

  it('deduplicates nodes when multiple cables share source module', () => {
    const result = generateMermaid([
      {
        source: 'Envelope A Out',
        destination: 'VCF FM 1 In',
        purpose: 'Filter sweep',
      },
      {
        source: 'Envelope A Out',
        destination: 'VCA A CV In',
        purpose: 'Amplitude',
      },
    ]);

    const matches = result.match(/EnvelopeA\["Envelope A"\]/g);
    expect(matches).toHaveLength(1);
    expect(result).toContain('EnvelopeA -->|"Filter sweep"| VCF');
    expect(result).toContain('EnvelopeA -->|"Amplitude"| VCAA');
  });

  it('strips spaces, slashes, hyphens from node IDs', () => {
    const result = generateMermaid([
      {
        source: 'VCA B / LPF Out',
        destination: 'Output Control In',
        purpose: 'Signal path',
      },
    ]);

    expect(result).toContain('VCABLPF["VCA B / LPF"]');
    expect(result).toContain('OutputControl["Output Control"]');
  });

  it('includes purpose text in edge labels', () => {
    const result = generateMermaid([
      {
        source: 'VCO B Sine Out',
        destination: 'VCO A TZFM In',
        purpose: 'FM carrier-modulator pair',
      },
    ]);

    expect(result).toContain('-->|"FM carrier-modulator pair"|');
  });

  it('falls back to first word for unknown module names', () => {
    const result = generateMermaid([
      {
        source: 'CustomMod Out',
        destination: 'VCF In',
        purpose: 'Test',
      },
    ]);

    expect(result).toContain('CustomMod["CustomMod"]');
    expect(result).toContain('VCF["VCF"]');
  });
});
