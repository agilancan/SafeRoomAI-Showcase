// src/components/DarkModeToggle.jsx
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <Tooltip title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton
        onClick={onToggle}
        color="inherit"
        sx={{
          ml: 1,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        {darkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
}

export default DarkModeToggle;