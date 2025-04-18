// BibleEditor.jsx with fixed badge click handling
import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import { Mark } from '@tiptap/core';
import BibleTextImporter from './BibleTextImporter';

// Custom mark for Bible annotations with badges
const BibleAnnotation = Mark.create({
  name: 'bibleAnnotation',

  addAttributes() {
    return {
      type: {
        default: null, // Can be 'warning', 'instruction', 'question', etc.
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-bible-annotation]',
        getAttrs: element => ({
          type: element.getAttribute('data-annotation-type'),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const type = HTMLAttributes.type;

    let typeLabel = '';
    let typeClass = '';

    if (type === 'warning') {
      typeLabel = 'WARNING';
      typeClass = 'annotation-warning';
    } else if (type === 'instruction') {
      typeLabel = 'INSTRUCTION';
      typeClass = 'annotation-instruction';
    } else if (type === 'question') {
      typeLabel = 'QUESTION';
      typeClass = 'annotation-question';
    }

    return ['span',
      {
        'data-bible-annotation': '',
        'data-annotation-type': type,
        'class': `bible-annotation ${typeClass}`
      },
      ['span', {
        class: 'annotation-badge',
        'data-badge-selectable': 'true'
      }, typeLabel],
      ['span', { class: 'annotation-content' }, 0]
    ];
  },

  addCommands() {
    return {
      setAnnotationType: type => ({ chain }) => {
        return chain()
          .setMark('bibleAnnotation', { type })
          .run();
      },
      unsetAnnotation: () => ({ chain }) => {
        return chain()
          .unsetMark('bibleAnnotation')
          .run();
      },
    };
  },
});

// Sample Bible text with verse numbers
const sampleBibleText = `
<p><strong>34</strong> "Be careful, or your hearts will be weighed down with carousing, drunkenness and the anxieties of life, and that day will close on you suddenly like a trap.</p>

<p><strong>35</strong> For it will come on all those who live on the face of the whole earth.</p>

<p><strong>36</strong> Be always on the watch, and pray that you may be able to escape all that is about to happen, and that you may be able to stand before the Son of Man."</p>
`;

const BibleEditor = () => {
  const [selectedAnnotationType, setSelectedAnnotationType] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      BibleAnnotation,
    ],
    content: sampleBibleText,
    onSelectionUpdate: ({ editor }) => {
      // When selection changes, check if we're in an annotation and what type it is
      if (!editor.isActive) return;

      const annotationType = editor.isActive('bibleAnnotation')
        ? editor.getAttributes('bibleAnnotation').type
        : null;

      setSelectedAnnotationType(annotationType);
    },
  });

  useEffect(() => {
    // Add a global click handler for badges
    const handleBadgeClick = (event) => {
      if (event.target.hasAttribute('data-badge-selectable') && editor) {
        const annotationSpan = event.target.closest('.bible-annotation');
        if (!annotationSpan) return;

        // Get the annotation content element
        const contentElement = annotationSpan.querySelector('.annotation-content');
        if (!contentElement) return;

        // We'll use DOM selection API for more direct control
        const selection = window.getSelection();
        const range = document.createRange();

        // Select the content of the annotation
        range.selectNodeContents(contentElement);
        selection.removeAllRanges();
        selection.addRange(range);

        // Focus the editor
        editor.commands.focus();

        // Prevent default behavior
        event.preventDefault();
      }
    };

    document.addEventListener('click', handleBadgeClick);

    return () => {
      document.removeEventListener('click', handleBadgeClick);
    };
  }, [editor]);

  const handleTextImport = (html) => {
    if (editor) {
      editor.commands.setContent(html);
    }
  };

  const markAsWarning = () => {
    if (!editor) return;
    // First unset any existing annotation to ensure clean application
    if (editor.isActive('bibleAnnotation')) {
      editor.chain().focus().unsetAnnotation().run();
    }
    editor.chain().focus().setAnnotationType('warning').run();
  };

  const markAsInstruction = () => {
    if (!editor) return;
    // First unset any existing annotation to ensure clean application
    if (editor.isActive('bibleAnnotation')) {
      editor.chain().focus().unsetAnnotation().run();
    }
    editor.chain().focus().setAnnotationType('instruction').run();
  };

  const markAsQuestion = () => {
    if (!editor) return;
    // First unset any existing annotation to ensure clean application
    if (editor.isActive('bibleAnnotation')) {
      editor.chain().focus().unsetAnnotation().run();
    }
    editor.chain().focus().setAnnotationType('question').run();
  };

  const clearMark = () => {
    if (!editor) return;
    // Improved clearing to ensure it works properly
    editor.chain().focus().unsetMark('bibleAnnotation').run();
  };

  return (
    <div className="editor-container">
      <h1 className="editor-title">Bible Text Editor</h1>
      <p className="editor-description">Select text and use the buttons below to add annotations</p>

      <BibleTextImporter onImport={handleTextImport} />

      <div className="editor-content-area">
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="bubble-menu">
              <button
                onClick={markAsWarning}
                className="bubble-button bubble-warning"
              >
                Warning
              </button>
              <button
                onClick={markAsInstruction}
                className="bubble-button bubble-instruction"
              >
                Instruction
              </button>
              <button
                onClick={markAsQuestion}
                className="bubble-button bubble-question"
              >
                Question
              </button>
              <button
                onClick={clearMark}
                className="bubble-button bubble-clear"
              >
                Clear
              </button>
            </div>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} className="editor-main" />
      </div>

      <div className="editor-controls">
        <button
          onClick={markAsWarning}
          className={`control-button warning-button ${selectedAnnotationType === 'warning' ? 'active' : ''}`}
        >
          Mark as Warning
        </button>
        <button
          onClick={markAsInstruction}
          className={`control-button instruction-button ${selectedAnnotationType === 'instruction' ? 'active' : ''}`}
        >
          Mark as Instruction
        </button>
        <button
          onClick={markAsQuestion}
          className={`control-button question-button ${selectedAnnotationType === 'question' ? 'active' : ''}`}
        >
          Mark as Question
        </button>
        <button
          onClick={clearMark}
          className="control-button clear-button"
        >
          Clear Mark
        </button>
      </div>

      <div className="editor-instructions">
        <h2 className="instructions-title">Instructions</h2>
        <ul className="instructions-list">
          <li>Select any text by highlighting it</li>
          <li>Use the buttons to mark the selection as a Warning, Instruction, or Question</li>
          <li>The text will show a badge with the corresponding label and highlight the text</li>
          <li>Click on any badge to select the entire annotated text (for easy modification)</li>
          <li>Use the bubble menu that appears when text is selected for quick access</li>
          <li>Use the Clear Mark button to remove annotations</li>
          <li>Use the Import Bible Text button to add new content</li>
        </ul>
      </div>
    </div>
  );
};

export default BibleEditor;
