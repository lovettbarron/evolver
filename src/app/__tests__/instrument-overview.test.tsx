import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InstrumentOverview } from '@/components/instrument-overview';

// Mock next/link to render as a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('InstrumentOverview', () => {
  const defaultProps = {
    title: 'Evolver Architecture Overview',
    manufacturer: 'Dave Smith Instruments',
    overviewHtml: '<p>The Evolver is a hybrid synthesizer.</p>',
    signalFlowHtml: '<p>Left channel: Osc 1 to Filter L</p>',
    hasBasicPatch: true,
    sessionCount: 35,
    slug: 'evolver',
  };

  test('renders instrument title', () => {
    render(<InstrumentOverview {...defaultProps} />);
    expect(screen.getByText('Evolver Architecture Overview')).toBeDefined();
  });

  test('renders manufacturer name', () => {
    render(<InstrumentOverview {...defaultProps} />);
    expect(screen.getByText('Dave Smith Instruments')).toBeDefined();
  });

  test('renders Start Curriculum CTA with correct href', () => {
    render(<InstrumentOverview {...defaultProps} />);
    const cta = screen.getByText('Start Curriculum');
    expect(cta).toBeDefined();
    expect(cta.closest('a')?.getAttribute('href')).toBe('/instruments/evolver/sessions');
  });

  test('renders session count', () => {
    render(<InstrumentOverview {...defaultProps} />);
    expect(screen.getByText('35 sessions')).toBeDefined();
  });

  test('renders Signal Flow section when signalFlowHtml is provided', () => {
    render(<InstrumentOverview {...defaultProps} />);
    expect(screen.getByText('Signal Flow')).toBeDefined();
  });

  test('does not render Signal Flow section when signalFlowHtml is null', () => {
    render(<InstrumentOverview {...defaultProps} signalFlowHtml={null} />);
    expect(screen.queryByText('Signal Flow')).toBeNull();
  });

  test('renders Basic Patch Reference link when hasBasicPatch is true', () => {
    render(<InstrumentOverview {...defaultProps} />);
    const link = screen.getByText('Basic Patch Reference');
    expect(link.closest('a')?.getAttribute('href')).toBe('/instruments/evolver/basic-patch');
  });

  test('does not render Basic Patch Reference link when hasBasicPatch is false', () => {
    render(<InstrumentOverview {...defaultProps} hasBasicPatch={false} />);
    expect(screen.queryByText('Basic Patch Reference')).toBeNull();
  });
});
