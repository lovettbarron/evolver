import type { Root, Element, Text } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * rehype plugin that converts Obsidian-style #tag syntax into styled spans.
 *
 * Detects pattern: whitespace or start-of-text followed by #[a-zA-Z0-9_-]+
 * Does NOT match heading # (those are already parsed to <h1>-<h6> elements).
 *
 * Output: <span class="obsidian-tag" data-tag="tag-name">#tag-name</span>
 */
export function rehypeObsidianTags() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index === undefined) return;
      // Don't process text inside headings, code blocks, or pre elements
      const parentEl = parent as Element;
      if (
        parentEl.tagName === 'code' ||
        parentEl.tagName === 'pre' ||
        parentEl.tagName === 'a'
      ) return;

      const tagPattern = /(^|\s)#([a-zA-Z0-9_-]+)/g;
      const text = node.value;
      let match: RegExpExecArray | null;
      const parts: any[] = [];
      let lastIndex = 0;

      while ((match = tagPattern.exec(text)) !== null) {
        const [fullMatch, prefix, tagName] = match;
        const matchStart = match.index;

        // Add text before the match
        if (matchStart + prefix.length > lastIndex) {
          parts.push({
            type: 'text',
            value: text.slice(lastIndex, matchStart + prefix.length),
          });
        }

        // Add the tag span
        parts.push({
          type: 'element',
          tagName: 'span',
          properties: {
            className: ['obsidian-tag'],
            'data-tag': tagName,
          },
          children: [{ type: 'text', value: `#${tagName}` }],
        });

        lastIndex = matchStart + fullMatch.length;
      }

      if (parts.length === 0) return;

      // Add remaining text
      if (lastIndex < text.length) {
        parts.push({ type: 'text', value: text.slice(lastIndex) });
      }

      // Replace the text node with the parts
      (parent as Element).children.splice(index, 1, ...parts);

      // Return the index to skip over the newly inserted nodes
      return index + parts.length;
    });
  };
}
