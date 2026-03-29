import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SourceRef } from '@/components/source-ref';

describe('SourceRef', () => {
  test('renders as superscript', () => {
    render(<SourceRef reference="p.42" />);

    const button = screen.getByRole('button');
    expect(button.textContent).toBe('[p.42]');

    // Check that button is inside a <sup> element
    const sup = button.closest('sup');
    expect(sup).not.toBeNull();
  });

  test('clicking shows tooltip with reference text', () => {
    render(<SourceRef reference="p.42" detail="Anu Kirk, page 42" />);

    // Tooltip not visible initially
    expect(screen.queryByRole('tooltip')).toBeNull();

    // Click to show
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeDefined();
    expect(screen.getByText('Anu Kirk, page 42')).toBeDefined();
  });

  test('clicking again hides tooltip', () => {
    render(<SourceRef reference="p.42" detail="Anu Kirk, page 42" />);

    // Open
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeDefined();

    // Close
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  test('displays reference text as fallback when no detail provided', () => {
    render(<SourceRef reference="p.42" />);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('p.42')).toBeDefined();
  });
});
