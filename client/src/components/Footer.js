import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1976d2', 
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 4,
        flexGrow: 0
      }}
    >
      <Typography variant="body2">
        &copy; 2025 ICTAK Exam Portal. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
