import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Navbar from '../components/Navbar';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar disableGutters>
        <Navbar />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
