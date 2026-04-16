import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import type { Patch } from '@/lib/content/types';

/**
 * PatchDetail — octatrack project-state rendering (Phase 25 Wave 2).
 *
 * Octatrack patches are "project-state" patches: no cable_routing (all
 * Octatrack I/O is rear-panel audio, not patched CV like Cascadia) and
 * no knob_settings (Octatrack state is the PRJ/PART/BANK stack, not a
 * knob snapshot like Evolver). Patch rendering therefore needs to:
 *   1. render the markdown body as-is
 *   2. render <OctatrackPanel /> below the body (hero subset)
 *   3. NOT render a cable-routing section or a knob-settings table
 *
 * Wave 2 (plan 25-02) flips the Wave 0 todos into real `it(...)`
 * assertions now that the bundled octatrack instrument exists.
 */

// Mock next/link to render as a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

// Mock motion/react — OctatrackPanel renders motion.svg etc. Mirror the
// pattern from standalone-panel-client.test.tsx so motion components render
// as plain SVG elements that we can inspect.
vi.mock('motion/react', () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        return React.forwardRef((props: Record<string, unknown>, ref: React.Ref<unknown>) => {
          const { animate, whileInView, transition, viewport, ...rest } = props;
          const dataProps: Record<string, string> = {};
          const animateValue = whileInView || animate;
          if (animateValue) dataProps['data-animate'] = JSON.stringify(animateValue);
          if (transition) dataProps['data-transition'] = JSON.stringify(transition);
          return React.createElement(prop, { ...rest, ...dataProps, ref });
        });
      },
    },
  );
  return { motion };
});

// Import after mocks so PatchDetail's transitive motion import is intercepted.
import { PatchDetail } from '@/components/patch-detail';

const octatrackPatch: Patch = {
  name: 'Test Octatrack Patch',
  type: 'texture',
  session_origin: null,
  description: 'Project-state patch for testing',
  tags: ['octatrack', 'test'],
  instrument: 'octatrack',
  created: '2026-04-17',
  // Deliberately no cable_routing, no knob_settings — project-state pattern
};

describe('PatchDetail — octatrack project-state rendering', () => {
  it('renders without cable_routing and without knob_settings for octatrack patches', () => {
    render(
      <PatchDetail
        patch={octatrackPatch}
        html="<p>Sample list + tracks</p>"
        instrumentSlug="octatrack"
        originSession={null}
      />,
    );

    // Cable routing list/diagram headings should not appear
    expect(screen.queryByText(/cable routing/i)).toBeNull();
    // Knob settings table heading should not appear
    expect(screen.queryByText(/knob settings/i)).toBeNull();
  });

  it('renders OctatrackPanel below the markdown body for octatrack patches', () => {
    const { container } = render(
      <PatchDetail
        patch={octatrackPatch}
        html="<p>Sample list + tracks</p>"
        instrumentSlug="octatrack"
        originSession={null}
      />,
    );

    // OctatrackPanel renders an SVG with viewBox "0 0 1000 500".
    // Filter out lucide icons (24x24) — only the panel SVG matches.
    const allSvgs = Array.from(container.querySelectorAll('svg'));
    const panelSvg = allSvgs.find(s => s.getAttribute('viewBox') === '0 0 1000 500');
    expect(panelSvg).toBeDefined();
    expect(panelSvg).not.toBeNull();

    // Panel section heading "Panel View" appears
    expect(screen.getByText('Panel View')).toBeDefined();

    // Markdown body still renders above the panel
    expect(container.innerHTML).toContain('Sample list + tracks');
  });

  it('does not render cable-routing diagram section for octatrack patches', () => {
    const { container } = render(
      <PatchDetail
        patch={octatrackPatch}
        html="<p>Sample list + tracks</p>"
        instrumentSlug="octatrack"
        originSession={null}
      />,
    );

    // CableRoutingDiagram and CableRoutingList are explicitly conditional on
    // hasCableRouting — for an octatrack patch (no cable_routing field), neither
    // should be present in the DOM.
    expect(container.querySelector('[data-testid="cable-routing-diagram"]')).toBeNull();
    expect(container.querySelector('[data-testid="cable-routing-list"]')).toBeNull();

    // Belt-and-braces: no cable-routing-related text in the rendered output.
    expect(screen.queryByText(/cable routing/i)).toBeNull();

    // The OctatrackPanel itself accepts a cables prop but ignores it; the
    // PatchDetail octatrack branch passes no cables, so this is satisfied
    // by the absence of a cables-section above.
  });
});
