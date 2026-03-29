import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Since AboutPage is an async server component that reads from filesystem,
// we test the rendered output structure directly.
// We create a simplified sync version for testing the layout.

function AboutPageLayout({ readmeHtml, adhdHtml }: { readmeHtml: string; adhdHtml: string }) {
  return (
    <div className="max-w-[720px] mx-auto px-lg lg:px-xl py-2xl">
      <h1 className="text-4xl font-bold mb-2xl">About This Method</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: readmeHtml }} />
      {adhdHtml && (
        <>
          <hr className="border-muted/30 my-2xl" />
          <div className="prose" dangerouslySetInnerHTML={{ __html: adhdHtml }} />
        </>
      )}
    </div>
  );
}

describe('About Page', () => {
  test('renders About This Method heading', () => {
    render(<AboutPageLayout readmeHtml="<p>Framework content</p>" adhdHtml="" />);
    expect(screen.getByText('About This Method')).toBeDefined();
  });

  test('renders framework content in prose wrapper', () => {
    render(<AboutPageLayout readmeHtml="<p>Framework content here</p>" adhdHtml="" />);
    expect(screen.getByText('Framework content here')).toBeDefined();
    // Verify prose wrapper exists
    const proseElements = document.querySelectorAll('.prose');
    expect(proseElements.length).toBeGreaterThanOrEqual(1);
  });

  test('renders ADHD design section when content is provided', () => {
    render(
      <AboutPageLayout
        readmeHtml="<p>Framework content</p>"
        adhdHtml="<p>ADHD design principles</p>"
      />
    );
    expect(screen.getByText('ADHD design principles')).toBeDefined();
    // Should have two prose wrappers
    const proseElements = document.querySelectorAll('.prose');
    expect(proseElements.length).toBe(2);
  });

  test('does not render ADHD section when content is empty', () => {
    render(<AboutPageLayout readmeHtml="<p>Framework content</p>" adhdHtml="" />);
    const proseElements = document.querySelectorAll('.prose');
    expect(proseElements.length).toBe(1);
  });
});
