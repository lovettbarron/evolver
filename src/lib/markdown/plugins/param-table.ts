import type { Root, Element, Text } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Detection headers that identify a "parameter table".
 * If the first <th> text content matches one of these, the table gets wrapped.
 */
const PARAM_TABLE_HEADERS = ['parameter', 'param', 'name', 'control'];

/**
 * rehype plugin that wraps parameter tables in a <div class="param-table"> container
 * and adds param-name/param-value classes to table cells.
 *
 * Detection rule: first column header text (lowercased) matches PARAM_TABLE_HEADERS.
 */
export function rehypeParamTable() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (
        node.tagName !== 'table' ||
        !parent ||
        index === undefined
      ) return;

      // Find the first <th> in the table
      const firstThText = findFirstThText(node);
      if (!firstThText) return;

      const normalized = firstThText.trim().toLowerCase();
      if (!PARAM_TABLE_HEADERS.includes(normalized)) return;

      // Add classes to <td> cells in tbody rows
      addCellClasses(node);

      // Wrap the table in a <div class="param-table">
      const wrapper: Element = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['param-table'] },
        children: [node],
      };

      (parent as Element).children[index] = wrapper;
    });
  };
}

function findFirstThText(table: Element): string | null {
  for (const child of table.children) {
    if ((child as Element).tagName === 'thead') {
      for (const row of (child as Element).children) {
        if ((row as Element).tagName === 'tr') {
          for (const cell of (row as Element).children) {
            if ((cell as Element).tagName === 'th') {
              return extractText(cell);
            }
          }
        }
      }
    }
  }
  return null;
}

function addCellClasses(table: Element): void {
  for (const child of table.children) {
    if ((child as Element).tagName === 'tbody') {
      for (const row of (child as Element).children) {
        if ((row as Element).tagName === 'tr') {
          const cells = (row as Element).children.filter(
            (c): c is Element => (c as Element).tagName === 'td'
          );
          if (cells.length >= 1) {
            cells[0].properties = { ...cells[0].properties, className: ['param-name'] };
          }
          if (cells.length >= 2) {
            cells[1].properties = { ...cells[1].properties, className: ['param-value'] };
          }
        }
      }
    }
  }
}

function extractText(node: any): string {
  if (node.type === 'text') return node.value;
  if (node.children) return node.children.map(extractText).join('');
  return '';
}
