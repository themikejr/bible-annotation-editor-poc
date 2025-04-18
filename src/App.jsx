// App.jsx
import React, { useState } from 'react';
import BibleEditor from './BibleEditor';
import DiscourseEditor from './DiscourseEditor';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('bible');

  return (
    <div className="App">
      <div className="tab-navigation">
        <button
          onClick={() => setActiveTab('bible')}
          className={activeTab === 'bible' ? 'active' : ''}
        >
          Bible Editor
        </button>
        <button
          onClick={() => setActiveTab('discourse')}
          className={activeTab === 'discourse' ? 'active' : ''}
        >
          Discourse Editor
        </button>
      </div>

      {activeTab === 'bible' && <BibleEditor />}
      {activeTab === 'discourse' && <DiscourseEditor />}
    </div>
  );
}

export default App;
