import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userRole = 'user' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const goToDashboard = () => {
    if (userRole === 'admin') navigate('/admin-dashboard');
    else if (userRole === 'student') navigate('/student-dashboard');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1565c0' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={goToDashboard}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ICTAK Exam Portal – {userRole.toUpperCase()}
        </Typography>
        <Box>
          <Tooltip title="Dashboard">
            <IconButton color="inherit" onClick={goToDashboard}>
              <DashboardIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
