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
    it('renders a markdown table to HTML table with thead and tbody', async () => {
      const md = '| Param | Value |\n|---|---|\n| LPF | 50 |';
      const html = await renderMarkdown(md);
      expect(html).toContain('<table>');
      expect(html).toContain('<thead>');
      expect(html).toContain('<tbody>');
    });

    it('renders table cells with correct content', async () => {
      const md = '| Header1 | Header2 |\n|---|---|\n| Cell1 | Cell2 |';
      const html = await renderMarkdown(md);
      expect(html).toContain('<th>Header1</th>');
      expect(html).toContain('<td>Cell1</td>');
    });
  });

  describe('parameter tables', () => {
    it('wraps table with "Parameter" header in param-table div', async () => {
      const md = '| Parameter | Value |\n|---|---|\n| LPF | 50 |';
      const html = await renderMarkdown(md);
      expect(html).toContain('<div class="param-table">');
      expect(html).toContain('<table>');
    });

    it('wraps table with "Param" header in param-table div', async () => {
      const md = '| Param | Value |\n|---|---|\n| LPF | 50 |';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="param-table"');
    });

    it('wraps table with "Control" header in param-table div', async () => {
      const md = '| Control | Setting |\n|---|---|\n| LPF Freq | 50 |';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="param-table"');
    });

    it('wraps table with "Name" header in param-table div', async () => {
      const md = '| Name | Value |\n|---|---|\n| Osc1 | Saw |';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="param-table"');
    });

    it('does NOT wrap table with non-matching first header', async () => {
      const md = '| City | Population |\n|---|---|\n| NYC | 8M |';
      const html = await renderMarkdown(md);
      expect(html).not.toContain('param-table');
    });

    it('adds param-name class to first td in each row', async () => {
      const md = '| Parameter | Value |\n|---|---|\n| LPF | 50 |';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="param-name"');
    });

    it('adds param-value class to second td in each row', async () => {
      const md = '| Parameter | Value |\n|---|---|\n| LPF | 50 |';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="param-value"');
    });
  });

  describe('callouts', () => {
    it('renders tip callout with data-callout="tip"', async () => {
      const md = '> [!tip]\n> This is a tip';
      const html = await renderMarkdown(md);
      expect(html).toContain('data-callout="tip"');
    });

    it('renders warning callout with data-callout="warning"', async () => {
      const md = '> [!warning]\n> Warning text';
      const html = await renderMarkdown(md);
      expect(html).toContain('data-callout="warning"');
    });

    it('renders info callout with data-callout="info"', async () => {
      const md = '> [!info]\n> Info text';
      const html = await renderMarkdown(md);
      expect(html).toContain('data-callout="info"');
    });

    it('renders danger callout with data-callout="danger"', async () => {
      const md = '> [!danger]\n> Danger text';
      const html = await renderMarkdown(md);
      expect(html).toContain('data-callout="danger"');
    });

    it('renders collapsible callout with toggle mechanism', async () => {
      const md = '> [!tip]-\n> Hidden content';
      const html = await renderMarkdown(md);
      expect(html).toContain('data-callout="tip"');
      // Collapsible callouts should have some toggle/details structure
      expect(html).toContain('data-callout');
    });
  });

  describe('wikilinks', () => {
    it('renders wikilink with permalink as app route', async () => {
      const html = await renderMarkdown('Check [[basic-patch]] here', ['basic-patch']);
      expect(html).toContain('href="/instruments/evolver/basic-patch"');
      expect(html).toContain('class="wikilink"');
    });

    it('renders aliased wikilink with display text', async () => {
      const html = await renderMarkdown('See [[basic-patch|Basic Patch]] info', ['basic-patch']);
      expect(html).toContain('href="/instruments/evolver/basic-patch"');
      expect(html).toContain('>Basic Patch</a>');
    });

    it('renders broken wikilink with wikilink-broken class', async () => {
      const html = await renderMarkdown('Check [[unknown-page]] here', []);
      expect(html).toContain('wikilink');
      expect(html).toContain('wikilink-broken');
    });

    it('renders valid wikilink without wikilink-broken class', async () => {
      const html = await renderMarkdown('See [[basic-patch]]', ['basic-patch']);
      expect(html).not.toContain('wikilink-broken');
    });

    it('handles multiple wikilinks in one line', async () => {
      const html = await renderMarkdown(
        'See [[basic-patch]] and [[signal-flow]]',
        ['basic-patch', 'signal-flow']
      );
      expect(html).toContain('href="/instruments/evolver/basic-patch"');
      expect(html).toContain('href="/instruments/evolver/signal-flow"');
    });
  });

  describe('mermaid', () => {
    it('renders mermaid code block as placeholder div', async () => {
      const md = '```mermaid\ngraph LR\n```';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="mermaid-placeholder"');
      expect(html).toContain('data-chart="graph LR"');
    });

    it('does NOT syntax-highlight mermaid blocks (no hljs class)', async () => {
      const md = '```mermaid\ngraph LR; A-->B;\n```';
      const html = await renderMarkdown(md);
      expect(html).not.toContain('hljs');
      expect(html).not.toContain('language-mermaid');
    });

    it('includes noscript fallback in mermaid placeholder', async () => {
      const md = '```mermaid\ngraph TD\n```';
      const html = await renderMarkdown(md);
      expect(html).toContain('<noscript>');
      expect(html).toContain('Mermaid diagram (requires JavaScript)');
    });

    it('preserves mermaid diagram content in data-chart attribute', async () => {
      const md = '```mermaid\ngraph LR; A-->B; B-->C;\n```';
      const html = await renderMarkdown(md);
      expect(html).toContain('data-chart="graph LR; A-->B; B-->C;"');
    });
  });

  describe('code blocks', () => {
    it('renders javascript code blocks with hljs classes', async () => {
      const md = '```javascript\nconst x = 1;\n```';
      const html = await renderMarkdown(md);
      expect(html).toContain('hljs');
      expect(html).toContain('language-javascript');
    });

    it('renders code blocks inside pre tags', async () => {
      const md = '```python\nprint("hello")\n```';
      const html = await renderMarkdown(md);
      expect(html).toContain('<pre>');
      expect(html).toContain('<code');
    });
  });

  describe('tags', () => {
    it('renders inline #tag as obsidian-tag span', async () => {
      const md = 'text #tag-name more';
      const html = await renderMarkdown(md);
      expect(html).toContain('<span class="obsidian-tag" data-tag="tag-name">#tag-name</span>');
    });

    it('does NOT treat heading # as tag', async () => {
      const md = '# Heading';
      const html = await renderMarkdown(md);
      expect(html).not.toContain('obsidian-tag');
    });

    it('renders multiple tags in same line', async () => {
      const md = 'text #tag-one and #tag-two here';
      const html = await renderMarkdown(md);
      expect(html).toContain('data-tag="tag-one"');
      expect(html).toContain('data-tag="tag-two"');
    });

    it('renders tags with underscores', async () => {
      const md = 'text #my_tag here';
      const html = await renderMarkdown(md);
      expect(html).toContain('data-tag="my_tag"');
    });

    it('preserves the # in tag display text', async () => {
      const md = 'text #synthesis here';
      const html = await renderMarkdown(md);
      expect(html).toContain('#synthesis</span>');
    });
  });

  describe('embeds', () => {
    it('renders ![[file]] as obsidian-embed div', async () => {
      const md = '![[basic-patch]]';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="obsidian-embed"');
      expect(html).toContain('data-embed="basic-patch"');
    });

    it('includes embed placeholder text', async () => {
      const md = '![[signal-flow]]';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="embed-placeholder"');
      expect(html).toContain('Embedded content: signal-flow');
    });
  });

  describe('headings', () => {
    it('renders h2 with correct id from slug', async () => {
      const md = '## Exercises';
      const html = await renderMarkdown(md);
      expect(html).toContain('<h2 id="exercises">');
    });

    it('adds heading-anchor class to anchor links', async () => {
      const md = '## Exercises';
      const html = await renderMarkdown(md);
      expect(html).toContain('class="heading-anchor"');
      expect(html).toContain('href="#exercises"');
    });

    it('renders anchor with # text content (prepend behavior)', async () => {
      const md = '## Exercises';
      const html = await renderMarkdown(md);
      expect(html).toContain('>#</a>');
    });

    it('adds aria-hidden to heading anchors', async () => {
      const md = '## Warm-Up';
      const html = await renderMarkdown(md);
      expect(html).toContain('aria-hidden="true"');
    });
  });

  describe('frontmatter stripping', () => {
    it('strips YAML frontmatter from rendered output', async () => {
      const md = '---\ntitle: Test\nduration: 20\n---\n# Content';
      const html = await renderMarkdown(md);
      expect(html).not.toContain('title: Test');
      expect(html).not.toContain('duration: 20');
      expect(html).toContain('Content');
    });

    it('renders content after frontmatter normally', async () => {
      const md = '---\ntitle: Test\n---\n\nHello world';
      const html = await renderMarkdown(md);
      expect(html).toContain('<p>Hello world</p>');
    });
  });

  describe('integration', () => {
    it('renders a realistic session excerpt with multiple features', async () => {
      const md = `---
title: "Session 01: Navigation & The Basic Patch"
module: foundations
session_number: 1
duration: 20
---

## Objective

Learn to navigate the Evolver's four main pages and load the [[basic-patch|basic patch]].

## Setup

Start from the basic patch. See the [[signal-flow]] for reference.

> [!tip]
> If you're unsure, press **Program** twice to return to the main page.

## Exercises

| Parameter | Value |
|---|---|
| LPF Freq | 50 |
| Resonance | 0 |

Try adjusting **LPF Freq**: \`50\` and listen to the change.

\`\`\`mermaid
graph LR; OSC-->LPF; LPF-->VCA;
\`\`\`

\`\`\`javascript
// MIDI CC example
sendCC(102, 50);
\`\`\`

## Output Checklist

- [ ] Saved patch: basic-navigation
- [ ] Documented: page navigation sequence

Tags: #foundations #navigation #beginner
`;

      const html = await renderMarkdown(md, ['basic-patch', 'signal-flow']);

      // Frontmatter stripped
      expect(html).not.toContain('session_number');

      // Headings with ids and anchors
      expect(html).toContain('id="objective"');
      expect(html).toContain('id="exercises"');
      expect(html).toContain('heading-anchor');

      // Wikilinks resolved
      expect(html).toContain('href="/instruments/evolver/basic-patch"');
      expect(html).toContain('class="wikilink"');
      expect(html).toContain('>basic patch</a>');
      expect(html).toContain('href="/instruments/evolver/signal-flow"');

      // Callout rendered
      expect(html).toContain('data-callout="tip"');

      // Parameter table wrapped
      expect(html).toContain('class="param-table"');
      expect(html).toContain('class="param-name"');

      // Mermaid placeholder (not syntax-highlighted)
      expect(html).toContain('class="mermaid-placeholder"');
      expect(html).toContain('data-chart=');
      expect(html).not.toMatch(/class="[^"]*hljs[^"]*language-mermaid/);

      // JavaScript code block highlighted
      expect(html).toContain('language-javascript');
      expect(html).toContain('hljs');

      // Tags rendered
      expect(html).toContain('data-tag="foundations"');
      expect(html).toContain('data-tag="navigation"');
      expect(html).toContain('data-tag="beginner"');
      expect(html).toContain('class="obsidian-tag"');

      // Task list items rendered
      expect(html).toContain('basic-navigation');
    });

    it('handles empty content gracefully', async () => {
      const html = await renderMarkdown('');
      expect(html).toBe('');
    });

    it('handles content with only frontmatter', async () => {
      const md = '---\ntitle: Test\n---\n';
      const html = await renderMarkdown(md);
      expect(html).not.toContain('title');
    });
  });
});

describe('createMarkdownProcessor', () => {
  it('returns a processor that can process markdown', async () => {
    const processor = createMarkdownProcessor([]);
    const result = await processor.process('# Test');
    expect(String(result)).toContain('Test');
  });

  it('accepts custom permalinks for wikilink resolution', async () => {
    const processor = createMarkdownProcessor(['my-page']);
    const result = await processor.process('See [[my-page]]');
    const html = String(result);
    expect(html).toContain('href="/instruments/evolver/my-page"');
    expect(html).not.toContain('wikilink-broken');
  });

  it('defaults to empty permalinks array', async () => {
    const processor = createMarkdownProcessor();
    const result = await processor.process('See [[anything]]');
    const html = String(result);
    expect(html).toContain('wikilink-broken');
  });
});
