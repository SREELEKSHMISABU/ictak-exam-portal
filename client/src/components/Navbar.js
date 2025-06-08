import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userRole = 'user' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1565c0' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ICTAK Exam Portal - {userRole.toUpperCase()}
        </Typography>
        <Box>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
