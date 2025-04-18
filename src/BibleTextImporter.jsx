// BibleTextImporter.jsx (Optional)
import React, { useState } from 'react';

const BibleTextImporter = ({ onImport }) => {
  const [rawText, setRawText] = useState('');
  const [showImporter, setShowImporter] = useState(false);

  const handleTextChange = (e) => {
    setRawText(e.target.value);
  };

  const processVerseNumbers = (text) => {
    // Identify verse numbers and wrap them in <strong> tags
    return text.replace(/^(\d+)[\.\s](.+)$/gm, '<p><strong>$1</strong> $2</p>');
  };

  const handleImport = () => {
    if (rawText.trim()) {
      const processedHTML = processVerseNumbers(rawText);
      onImport(processedHTML);
      setShowImporter(false);
      setRawText('');
    }
  };

  return (
    <div className="bible-importer">
      {!showImporter ? (
        <button
          className="importer-toggle-button"
          onClick={() => setShowImporter(true)}
        >
          Import Bible Text
        </button>
      ) : (
        <div className="importer-panel">
          <h3>Import Bible Text</h3>
          <p className="importer-instructions">
            Paste Bible text with verse numbers (e.g., "1 In the beginning..." or "1. In the beginning...")
          </p>
          <textarea
            className="importer-textarea"
            value={rawText}
            onChange={handleTextChange}
            placeholder="34 &quot;Be careful, or your hearts will be weighed down...&quot;&#10;35 For it will come on all those who live...&#10;36 Be always on the watch, and pray..."
            rows={10}
          />
          <div className="importer-actions">
            <button
              className="importer-cancel-button"
              onClick={() => setShowImporter(false)}
            >
              Cancel
            </button>
            <button
              className="importer-submit-button"
              onClick={handleImport}
              disabled={!rawText.trim()}
            >
              Import Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleTextImporter;
