import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuickRefPanel } from '@/components/quick-ref-panel';

// Mock lucide-react
vi.mock('lucide-react', () => ({
  X: ({ size }: { size: number }) => (
    <svg data-testid="x-icon" width={size} height={size} />
  ),
}));

const mockContent = [
  { label: 'Basic Patch', html: '<p>Basic patch values here</p>' },
  { label: 'Signal Flow', html: '<p>Signal flow diagram here</p>' },
];

describe('QuickRefPanel', () => {
  test('renders content when isOpen is true', () => {
    render(
      <QuickRefPanel content={mockContent} isOpen={true} onClose={vi.fn()} />,
    );

    expect(screen.getByRole('dialog')).toBeDefined();
    expect(
      screen.getByLabelText('Close quick reference panel'),
    ).toBeDefined();
    expect(screen.getByText('Basic patch values here')).toBeDefined();
  });

  test('panel has translate-x-full when isOpen is false', () => {
    render(
      <QuickRefPanel content={mockContent} isOpen={false} onClose={vi.fn()} />,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('translate-x-full');
  });

  test('panel has translate-x-0 when isOpen is true', () => {
    render(
      <QuickRefPanel content={mockContent} isOpen={true} onClose={vi.fn()} />,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('translate-x-0');
  });

  test('Escape key calls onClose', () => {
    const onClose = vi.fn();
    render(
      <QuickRefPanel content={mockContent} isOpen={true} onClose={onClose} />,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('renders tab buttons for multiple content items', () => {
    render(
      <QuickRefPanel content={mockContent} isOpen={true} onClose={vi.fn()} />,
    );

    expect(screen.getByText('Basic Patch')).toBeDefined();
    expect(screen.getByText('Signal Flow')).toBeDefined();
  });

  test('switching tabs changes displayed content', () => {
    render(
      <QuickRefPanel content={mockContent} isOpen={true} onClose={vi.fn()} />,
    );

    // Initially shows first tab content
    expect(screen.getByText('Basic patch values here')).toBeDefined();

    // Click second tab
    fireEvent.click(screen.getByText('Signal Flow'));
    expect(screen.getByText('Signal flow diagram here')).toBeDefined();
  });
});
