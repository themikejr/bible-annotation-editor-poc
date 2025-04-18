// BibleEditor.jsx
import React, { useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';

// Custom extension for Bible questions
const BibleQuestion = Extension.create({
  name: 'bibleQuestion',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          isBibleQuestion: {
            default: false,
            parseHTML: element => element.hasAttribute('data-bible-question'),
            renderHTML: attributes => {
              if (!attributes.isBibleQuestion) return {};
              return { 'data-bible-question': '' };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      toggleBibleQuestion: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { isBibleQuestion: true })
          .run();
      },
      unsetBibleQuestion: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { isBibleQuestion: false })
          .run();
      },
    };
  },
});

// Custom extension for Bible warnings
const BibleWarning = Extension.create({
  name: 'bibleWarning',

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          isBibleWarning: {
            default: false,
            parseHTML: element => element.hasAttribute('data-bible-warning'),
            renderHTML: attributes => {
              if (!attributes.isBibleWarning) return {};
              return { 'data-bible-warning': '' };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      toggleBibleWarning: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { isBibleWarning: true })
          .run();
      },
      unsetBibleWarning: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { isBibleWarning: false })
          .run();
      },
    };
  },
});

// Create a custom extension to add CSS styles for our Bible elements
const BibleElementStyles = Extension.create({
  name: 'bibleElementStyles',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('bibleElementStyles'),
        props: {
          decorations: (state) => {
            // Add custom CSS to style our Bible elements
            const styleTag = document.createElement('style');
            styleTag.textContent = `
              [data-bible-question] {
                background-color: #e6f7ff;
                color: #0066cc;
                border-bottom: 2px dotted #0066cc;
                padding: 2px;
                border-radius: 4px;
              }
              
              [data-bible-warning] {
                background-color: #fff3e0;
                color: #ff6d00;
                border-bottom: 2px dotted #ff6d00;
                padding: 2px;
                border-radius: 4px;
              }
            `;
            document.head.appendChild(styleTag);

            return null;
          },
        },
      }),
    ];
  },
});

// Sample Bible text for the editor
const sampleBibleText = `
Genesis 1:1-5

In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.

And God said, "Let there be light," and there was light. God saw that the light was good, and he separated the light from the darkness. God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.
`;

const BibleEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle, // Add the TextStyle extension
      BibleQuestion,
      BibleWarning,
      BibleElementStyles,
    ],
    content: sampleBibleText,
    // Remove the problematic onSelectionUpdate callback
  });

  const markAsQuestion = () => {
    if (!editor) return;
    editor.chain().focus().toggleBibleQuestion().run();
  };

  const markAsWarning = () => {
    if (!editor) return;
    editor.chain().focus().toggleBibleWarning().run();
  };

  return (
    <div className="editor-container">
      <h1 className="editor-title">Bible Text Editor</h1>
      <p className="editor-description">Select text and use the buttons below to mark questions or warnings</p>

      <div className="editor-content-area">
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="bubble-menu">
              <button
                onClick={markAsQuestion}
                className="bubble-button bubble-button-question"
              >
                Question
              </button>
              <button
                onClick={markAsWarning}
                className="bubble-button bubble-button-warning"
              >
                Warning
              </button>
            </div>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} className="editor-main" />
      </div>

      <div className="editor-controls">
        <button
          onClick={markAsQuestion}
          className="control-button question-button"
        >
          Mark as Question
        </button>
        <button
          onClick={markAsWarning}
          className="control-button warning-button"
        >
          Mark as Warning
        </button>
      </div>

      <div className="editor-instructions">
        <h2 className="instructions-title">Instructions</h2>
        <ul className="instructions-list">
          <li>Select text by highlighting it with your cursor</li>
          <li>Use the buttons to mark selections as questions or warnings</li>
          <li>You can also use the bubble menu that appears when text is selected</li>
          <li>Edit the Bible text as needed for your annotations</li>
        </ul>
      </div>
    </div>
  );
};

export default BibleEditor;
