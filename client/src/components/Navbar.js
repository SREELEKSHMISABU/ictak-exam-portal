import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const showControls = token && location.pathname.includes('dashboard');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1565c0' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Left side: Logo + Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/assets/images/LOGO_ICTAK.png" 
            alt="Logo" 
            style={{ height: 40, marginRight: 12, cursor: 'pointer' }} 
            onClick={() => navigate('/')}
          />
          <Typography variant="h6" sx={{ml: 10,cursor: 'default' }}>
            {showControls && user?.role
              ? `ICTAK Exam Portal - ${user.role.toUpperCase()}`
              : 'ICTAK Exam Portal'}
          </Typography>
        </Box>

        {/* Right side: Buttons */}
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>

          {showControls && (
            <>
              <Button color="inherit" onClick={() => navigate(`/${user.role}-dashboard`)}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
