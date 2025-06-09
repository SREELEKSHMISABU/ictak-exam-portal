import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (res.data.user.role === 'student') navigate('/student-dashboard');
      else if (res.data.user.role === 'admin') navigate('/admin-dashboard');
      else setError('Unknown user role');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 4,
        backgroundColor: '#f9f9f9',
        boxShadow: 3,
        borderRadius: 2,
        mt: 6
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Students login with their Paatshala credentials.
      </Typography>
    </Box>
  );
}
