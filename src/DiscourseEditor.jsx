// DiscourseEditor.jsx
import React, { useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import { createBibleAnnotation } from './BibleEditor'; // Reusing your annotation extension
import DiscourseSection from './DiscourseSection';
import './DiscourseEditor.css';
import discourseBibleSample from './discourseBibleSample';

const BibleAnnotation = createBibleAnnotation();

// Sample discourse structure
const sampleDiscourseText = `
<div data-discourse-section data-section-type="premise" data-section-level="0">
  <p><strong>Core Premise</strong>: The Bible contains various types of discourse that can be analyzed for structure and meaning.</p>
  
  <div data-discourse-section data-section-type="claim" data-section-level="1">
    <p><strong>Claim</strong>: Understanding discourse structure helps reveal deeper meaning in biblical texts.</p>
    
    <div data-discourse-section data-section-type="evidence" data-section-level="2">
      <p><strong>34</strong> "Be careful, or your hearts will be weighed down with carousing, drunkenness and the anxieties of life, and that day will close on you suddenly like a trap.</p>
    </div>
    
    <div data-discourse-section data-section-type="explanation" data-section-level="2">
      <p>This verse uses a warning structure to emphasize the urgency of spiritual alertness.</p>
    </div>
  </div>
  
  <div data-discourse-section data-section-type="objection" data-section-level="1">
    <p><strong>Objection</strong>: Not all biblical texts follow clear discourse patterns.</p>
    
    <div data-discourse-section data-section-type="rebuttal" data-section-level="2">
      <p><strong>Rebuttal</strong>: Even seemingly unstructured texts reveal patterns when analyzed carefully.</p>
    </div>
  </div>
</div>
`;

const DiscourseEditor = () => {
  const [selectedSectionType, setSelectedSectionType] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      BibleAnnotation,
      DiscourseSection,
    ],
    content: discourseBibleSample,
    onSelectionUpdate: ({ editor }) => {
      // When selection changes, check if we're in a discourse section and what type it is
      if (!editor.isActive) return;

      const sectionType = editor.isActive('discourseSection')
        ? editor.getAttributes('discourseSection').type
        : null;

      setSelectedSectionType(sectionType);
    },
  });

  // Add a new top-level discourse section
  const addTopLevelSection = (type) => {
    if (!editor) return;

    editor.chain()
      .focus()
      .createDiscourseSection({ type, level: 0 })
      .run();
  };

  // Add a nested section within the currently selected section
  const addNestedSection = (type) => {
    if (!editor) return;

    editor.chain()
      .focus()
      .nestDiscourseSection({ type })
      .run();
  };

  // Define the discourse section types (should match those in DiscourseSectionView)
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
  };

  return (
    <div className="discourse-editor-container">
      <h1 className="editor-title">Discourse Flow Editor</h1>
      <p className="editor-description">Model discourse flow with nested sections and semantic labels</p>

      <div className="discourse-controls">
        <div className="control-group">
          <h3>Add Top-Level Section</h3>
          <div className="button-row">
            {Object.entries(discourseSectionTypes).map(([value, label]) => (
              <button
                key={value}
                onClick={() => addTopLevelSection(value)}
                className={`discourse-button ${value}-button`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <h3>Add Nested Section</h3>
          <div className="button-row">
            {Object.entries(discourseSectionTypes).map(([value, label]) => (
              <button
                key={value}
                onClick={() => addNestedSection(value)}
                className={`discourse-button ${value}-button`}
                disabled={!editor?.isActive('discourseSection')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="editor-content-area">
        <EditorContent editor={editor} className="editor-main" />
      </div>

      <div className="editor-instructions">
        <h2 className="instructions-title">Instructions</h2>
        <ul className="instructions-list">
          <li>Use the "Add Top-Level Section" buttons to create new main sections</li>
          <li>Select a section and use "Add Nested Section" to create a sub-section</li>
          <li>Each section has its own semantic type (Premise, Claim, Evidence, etc.)</li>
          <li>Sections can be nested to represent complex discourse relationships</li>
          <li>Use the dropdown in each section to change its type</li>
          <li>You can also use text annotations within each section</li>
        </ul>
      </div>
    </div>
  );
};

export default DiscourseEditor;
