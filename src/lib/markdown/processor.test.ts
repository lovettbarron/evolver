import { describe, it, expect } from 'vitest';
import { renderMarkdown } from './processor';

describe('markdown processor', () => {
  describe('challenge callout', () => {
    it('renders [!challenge] with data-callout="challenge" attribute', async () => {
      const markdown = `> [!challenge] Test Challenge\n> This is a challenge callout.`;
      const result = await renderMarkdown(markdown);
      expect(result).toContain('data-callout="challenge"');
    });

    it('renders challenge callout with "Challenge" title text', async () => {
      const markdown = `> [!challenge] My Challenge\n> Description here.`;
      const result = await renderMarkdown(markdown);
      expect(result).toContain('Challenge');
    });

    it('preserves existing callout types (tip still works)', async () => {
      const markdown = `> [!tip] A Tip\n> Tip content.`;
      const result = await renderMarkdown(markdown);
      expect(result).toContain('data-callout="tip"');
    });
  });
});
