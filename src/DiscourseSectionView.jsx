// DiscourseSectionView.jsx
import React from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

// Dictionary of discourse section types and their display names
const discourseSectionTypes = {
  premise: 'Premise',
  claim: 'Claim',
  evidence: 'Evidence',
  objection: 'Objection',
  rebuttal: 'Rebuttal',
  conclusion: 'Conclusion',
  question: 'Question',
  answer: 'Answer',
  example: 'Example',
  definition: 'Definition',
  explanation: 'Explanation',
  inference: 'Inference',
  // Add more types as needed
};

// Color palette for different discourse types
const typeColors = {
  premise: '#6d9eeb',    // Light blue
  claim: '#e06666',      // Red
  evidence: '#93c47d',   // Green
  objection: '#c27ba0',  // Purple
  rebuttal: '#f6b26b',   // Orange
  conclusion: '#8e7cc3', // Purple
  question: '#76a5af',   // Teal
  answer: '#d5a6bd',     // Pink
  example: '#a2c4c9',    // Light teal
  definition: '#b6d7a8', // Light green
  explanation: '#d9d2e9', // Light purple
  inference: '#ffe599',  // Yellow
  // Add more color mappings as needed
};

// React component for rendering a discourse section
const DiscourseSectionView = ({
  node,
  updateAttributes,
  getPos,
  editor,
}) => {
  const { type, level } = node.attrs;

  // Calculate left margin based on nesting level
  const indentationLevel = level || 0;
  const leftMargin = indentationLevel * 20; // 20px per level of nesting

  // Add a new nested section within this one
  const addNestedSection = (newType) => {
    const pos = getPos() + node.nodeSize;

    editor.chain().focus().insertContentAt(pos, {
      type: 'discourseSection',
      attrs: {
        type: newType,
        level: indentationLevel + 1
      },
      content: [{ type: 'paragraph' }]
    }).run();
  };

  // Change the type of this section
  const changeType = (newType) => {
    updateAttributes({ type: newType });
  };

  return (
    <NodeViewWrapper
      className={`discourse-section discourse-${type} level-${indentationLevel}`}
      style={{
        marginLeft: `${leftMargin}px`,
        borderLeft: `3px solid ${typeColors[type] || '#ccc'}`,
        padding: '0.5rem 1rem',
        marginBottom: '1rem',
        background: `${typeColors[type] || '#ccc'}10` // Use the color at 10% opacity
      }}
    >
      <div className="discourse-section-header">
        <div className="discourse-section-badge"
          style={{ backgroundColor: typeColors[type] || '#ccc' }}>
          {discourseSectionTypes[type] || 'Section'}
        </div>

        <div className="discourse-section-controls">
          <select
            value={type || ''}
            onChange={(e) => changeType(e.target.value)}
            className="discourse-type-selector"
          >
            <option value="">Select Type</option>
            {Object.entries(discourseSectionTypes).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <button
            onClick={() => addNestedSection('premise')}
            className="add-nested-button"
            title="Add nested section"
          >
            + Nest
          </button>
        </div>
      </div>

      <NodeViewContent className="discourse-section-content" />
    </NodeViewWrapper>
  );
};

export default DiscourseSectionView;
