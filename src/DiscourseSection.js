// DiscourseSection.js
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import DiscourseSectionView from './DiscourseSectionView';

// Custom node for discourse sections that can be nested
export const DiscourseSection = Node.create({
  name: 'discourseSection',

  group: 'block',

  // Allow nesting by making it content-editable
  content: 'block+ discourseSection*',

  // Define which attributes the node can have
  addAttributes() {
    return {
      // The type of discourse section (e.g., argument, evidence, conclusion)
      type: {
        default: null,
      },
      // The level of nesting (0 = top level, 1 = first nested level, etc.)
      level: {
        default: 0,
      },
      // Optional ID for cross-referencing
      id: {
        default: null,
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-discourse-section]',
        getAttrs: element => ({
          type: element.getAttribute('data-section-type'),
          level: parseInt(element.getAttribute('data-section-level') || '0', 10),
          id: element.getAttribute('data-section-id'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(
        {
          'data-discourse-section': '',
          'data-section-type': HTMLAttributes.type,
          'data-section-level': HTMLAttributes.level,
          'data-section-id': HTMLAttributes.id,
          'class': `discourse-section discourse-${HTMLAttributes.type} level-${HTMLAttributes.level}`
        }
      ),
      0 // Content placeholder
    ];
  },

  addCommands() {
    return {
      // Command to create a new discourse section
      createDiscourseSection: (attributes) => ({ chain }) => {
        return chain()
          .insertContent({
            type: this.name,
            attrs: attributes,
            content: [{ type: 'paragraph' }]
          })
          .run();
      },

      // Command to nest a new section inside the current one
      nestDiscourseSection: (attributes) => ({ chain, state }) => {
        const { selection } = state;
        const { $anchor } = selection;

        // Find the parent discourse section if it exists
        let parentLevel = 0;
        let node = $anchor.node();

        while (node && node.type.name !== this.name && $anchor.depth > 0) {
          $anchor.depth--;
          node = $anchor.node();
        }

        if (node && node.type.name === this.name) {
          parentLevel = node.attrs.level;
        }

        // Create a new section with increased level
        return chain()
          .createDiscourseSection({
            ...attributes,
            level: parentLevel + 1
          })
          .run();
      },

      // Command to change the type of a discourse section
      setDiscourseSectionType: (type) => ({ chain }) => {
        return chain()
          .updateAttributes(this.name, { type })
          .run();
      }
    };
  },

  // Use a custom React component for rendering
  addNodeView() {
    return ReactNodeViewRenderer(DiscourseSectionView);
  }
});

export default DiscourseSection;
