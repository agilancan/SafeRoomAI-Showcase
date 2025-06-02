// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const baseTheme = {
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#007bff',
      light: '#4dabf7',
      dark: '#0056b3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6c757d',
      light: '#adb5bd',
      dark: '#495057',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#6c757d',
    },
    error: {
      main: '#dc3545',
      light: '#f8d7da',
      dark: '#721c24',
    },
    warning: {
      main: '#ffc107',
      light: '#fff3cd',
      dark: '#856404',
    },
    success: {
      main: '#28a745',
      light: '#d4edda',
      dark: '#155724',
    },
    info: {
      main: '#17a2b8',
      light: '#d1ecf1',
      dark: '#0c5460',
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d6efd',
      light: '#6ea8fe',
      dark: '#0a58ca',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6c757d',
      light: '#adb5bd',
      dark: '#495057',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#adb5bd',
    },
    error: {
      main: '#dc3545',
      light: '#f8d7da',
      dark: '#721c24',
    },
    warning: {
      main: '#ffc107',
      light: '#fff3cd',
      dark: '#856404',
    },
    success: {
      main: '#28a745',
      light: '#d4edda',
      dark: '#155724',
    },
    info: {
      main: '#17a2b8',
      light: '#d1ecf1',
      dark: '#0c5460',
    },
  },
  components: {
    ...baseTheme.components,
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          boxShadow: '0 2px 8px rgba(255,255,255,0.05)',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(255,255,255,0.08)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
  },
});
