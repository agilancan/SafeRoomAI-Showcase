// src/components/NotFound.jsx
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ErrorOutline, Home } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
        gap={3}
      >
        <ErrorOutline sx={{ fontSize: 120, color: 'primary.main' }} />

        <Typography variant="h1" component="h1" fontWeight="bold" color="primary">
          404
        </Typography>

        <Typography variant="h5" color="text.secondary" gutterBottom>
          Page Not Found
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<Home />}
          sx={{ px: 4, py: 1.5 }}
        >
          Go Home
        </Button>
      </Box>
    </Container>
  );
}