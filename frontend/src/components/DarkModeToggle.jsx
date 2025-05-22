// src/components/DarkModeToggle.jsx
import React from 'react';

function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button onClick={onToggle} className="toggle-btn">
      {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}

export default DarkModeToggle;