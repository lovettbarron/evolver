import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModuleCategoryTabs } from '@/components/module-category-tabs';

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock('@/components/motion/spring-card', () => ({
  SpringCard: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockReplace = vi.fn();
const mockSearchParams = new URLSearchParams();
vi.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => '/modules',
}));

const modules = [
  { slug: 'plaits', displayName: 'Plaits', manufacturer: 'Mutable', hpWidth: 12, categories: ['vco'], sessionCount: 0 },
  { slug: 'maths', displayName: 'Maths', manufacturer: 'Make Noise', hpWidth: 20, categories: ['function-generator', 'modulator'], sessionCount: 0 },
];

describe('ModuleCategoryTabs', () => {
  beforeEach(() => {
    mockReplace.mockReset();
  });

  test('renders All tab and category tabs', () => {
    render(<ModuleCategoryTabs modules={modules} />);
    expect(screen.getByRole('tablist')).toBeDefined();
    expect(screen.getByText('All')).toBeDefined();
    expect(screen.getByText('VCO')).toBeDefined();
    expect(screen.getByText('Function Generator')).toBeDefined();
  });

  test('shows all modules when All tab is active (default)', () => {
    render(<ModuleCategoryTabs modules={modules} />);
    expect(screen.getByText('Plaits')).toBeDefined();
    expect(screen.getByText('Maths')).toBeDefined();
  });

  test('renders empty state when no modules match category', () => {
    render(<ModuleCategoryTabs modules={[]} />);
    expect(screen.getByText('No modules in this category')).toBeDefined();
  });
});
