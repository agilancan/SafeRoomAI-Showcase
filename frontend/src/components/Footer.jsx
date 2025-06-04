// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 2 }}>
      <Divider />
      <Container maxWidth="lg">
        <Box sx={{ py: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SafeRoom AI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}