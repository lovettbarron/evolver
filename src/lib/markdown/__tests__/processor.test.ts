import { describe, it, expect } from 'vitest';
import { renderMarkdown, createMarkdownProcessor } from '../processor';

describe('renderMarkdown', () => {
  describe('basic rendering', () => {
    it('renders headings with id attributes', async () => {
      const html = await renderMarkdown('## Hello');
      expect(html).toContain('<h2 id="hello">');
    });

    it('renders paragraphs', async () => {
      const html = await renderMarkdown('Hello world');
      expect(html).toContain('<p>Hello world</p>');
    });
  });

  describe('GFM tables', () => {
    it('renders a markdown table to HTML table', async () => {
      const md = '| Param | Value |\n|---|---|\n| LPF | 50 |';
      const html = await renderMarkdown(md);
      expect(html).toContain('<table>');
      expect(html).toContain('<thead>');
      expect(html).toContain('<tbody>');
    });
  });

  describe('callouts', () => {
    it('renders tip callout with data-callout attribute', async () => {
      const md = '> [!tip]\n> This is a tip';
      const html = await renderMarkdown(md);
      expect(html).toContain('data-callout="tip"');
    });

    it('renders warning callout', async () => {
      const md = '> [!warning]\n> Warning text';
      const html = await renderMarkdown(md);
      expect(html).toContain('data-callout="warning"');
    });
  });

  describe('wikilinks', () => {
    it('renders wikilink with permalink as app route', async () => {
      const html = await renderMarkdown('[[basic-patch]]', ['basic-patch']);
      expect(html).toContain('href="/instruments/evolver/basic-patch"');
      expect(html).toContain('class="wikilink"');
    });

    it('renders aliased wikilink with display text', async () => {
      const html = await renderMarkdown('[[basic-patch|Basic Patch]]', ['basic-patch']);
      expect(html).toContain('href="/instruments/evolver/basic-patch"');
      expect(html).toContain('>Basic Patch</a>');
    });

    it('renders broken wikilink with distinct class', async () => {
      const html = await renderMarkdown('[[unknown]]', []);
      expect(html).toContain('wikilink-broken');
    });
  });

  describe('mermaid', () => {
    it('renders mermaid code block as placeholder div', async () => {
      const md = '```mermaid\ngraph LR\n```';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="mermaid-placeholder"');
      expect(html).toContain('data-chart="graph LR"');
    });

    it('does not syntax-highlight mermaid blocks', async () => {
      const md = '```mermaid\ngraph LR\n```';
      const html = await renderMarkdown(md);
      expect(html).not.toContain('hljs');
    });
  });

  describe('code blocks', () => {
    it('renders code blocks with syntax highlighting classes', async () => {
      const md = '```javascript\nconst x = 1;\n```';
      const html = await renderMarkdown(md);
      expect(html).toContain('hljs');
      expect(html).toContain('language-javascript');
    });
  });

  describe('tags', () => {
    it('renders inline #tag as obsidian-tag span', async () => {
      const md = 'text #tag-name more';
      const html = await renderMarkdown(md);
      expect(html).toContain('<span class="obsidian-tag" data-tag="tag-name">#tag-name</span>');
    });

    it('does not treat heading # as tag', async () => {
      const md = '# Heading';
      const html = await renderMarkdown(md);
      expect(html).not.toContain('obsidian-tag');
    });
  });

  describe('parameter tables', () => {
    it('wraps parameter tables with param-table class', async () => {
      const md = '| Parameter | Value |\n|---|---|\n| LPF | 50 |';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="param-table"');
    });

    it('does not wrap non-parameter tables', async () => {
      const md = '| City | Population |\n|---|---|\n| NYC | 8M |';
      const html = await renderMarkdown(md);
      expect(html).not.toContain('param-table');
    });

    it('adds param-name and param-value classes to cells', async () => {
      const md = '| Parameter | Value |\n|---|---|\n| LPF | 50 |';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="param-name"');
      expect(html).toContain('class="param-value"');
    });
  });

  describe('embeds', () => {
    it('renders ![[file]] as embed placeholder', async () => {
      const md = '![[basic-patch]]';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="obsidian-embed"');
      expect(html).toContain('data-embed="basic-patch"');
    });
  });

  describe('frontmatter', () => {
    it('strips frontmatter YAML from rendered output', async () => {
      const md = '---\ntitle: Test\n---\n# Content';
      const html = await renderMarkdown(md);
      expect(html).not.toContain('title: Test');
      expect(html).toContain('Content');
    });
  });

  describe('heading anchors', () => {
    it('adds anchor links to headings', async () => {
      const md = '## Exercises';
      const html = await renderMarkdown(md);
      expect(html).toContain('heading-anchor');
      expect(html).toContain('href="#exercises"');
    });
  });
});

describe('createMarkdownProcessor', () => {
  it('returns a processor that can process markdown', async () => {
    const processor = createMarkdownProcessor([]);
    const result = await processor.process('# Test');
    expect(String(result)).toContain('Test');
  });
});
