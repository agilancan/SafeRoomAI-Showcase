// src/components/ErrorAlert.jsx
import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

export default function ErrorAlert({ 
  title = 'Error', 
  message, 
  severity = 'error',
  onRetry,
  sx = {} 
}) {
  return (
    <Box sx={{ mb: 2, ...sx }}>
      <Alert 
        severity={severity} 
        icon={<ErrorOutline />}
        action={
          onRetry && (
            <button onClick={onRetry} style={{ 
              background: 'none', 
              border: 'none', 
              color: 'inherit', 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}>
              Retry
            </button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}
