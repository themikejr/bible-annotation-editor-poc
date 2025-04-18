// DescriptionSettings.jsx - Optional component to customize badge descriptions
import React, { useState } from 'react';

// Component to allow users to customize badge descriptions
const DescriptionSettings = ({ descriptions, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedDescriptions, setEditedDescriptions] = useState({ ...descriptions });

  const handleToggle = () => {
    setIsOpen(!isOpen);
    // Reset edited descriptions to current values when opening
    if (!isOpen) {
      setEditedDescriptions({ ...descriptions });
    }
  };

  const handleChange = (type, value) => {
    setEditedDescriptions({
      ...editedDescriptions,
      [type]: value
    });
  };

  const handleSave = () => {
    onUpdate(editedDescriptions);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setEditedDescriptions({ ...descriptions });
    setIsOpen(false);
  };

  return (
    <div className="description-settings">
      <button
        className="settings-toggle-button"
        onClick={handleToggle}
      >
        {isOpen ? 'Close Description Settings' : 'Customize Explanations'}
      </button>

      {isOpen && (
        <div className="settings-panel">
          <h3>Customize Badge Explanations</h3>
          <p className="settings-description">
            Edit the explanatory text that appears when hovering over badges
          </p>

          <div className="settings-form">
            <div className="form-group">
              <label htmlFor="warning-description">Warning Explanation:</label>
              <textarea
                id="warning-description"
                value={editedDescriptions.warning || ''}
                onChange={(e) => handleChange('warning', e.target.value)}
                rows={3}
                placeholder="Explanation for warning badges..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="instruction-description">Instruction Explanation:</label>
              <textarea
                id="instruction-description"
                value={editedDescriptions.instruction || ''}
                onChange={(e) => handleChange('instruction', e.target.value)}
                rows={3}
                placeholder="Explanation for instruction badges..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="question-description">Question Explanation:</label>
              <textarea
                id="question-description"
                value={editedDescriptions.question || ''}
                onChange={(e) => handleChange('question', e.target.value)}
                rows={3}
                placeholder="Explanation for question badges..."
              />
            </div>

            <div className="settings-actions">
              <button
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="save-button"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DescriptionSettings;
