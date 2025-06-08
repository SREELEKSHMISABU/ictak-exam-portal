import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    if(!email || !password) {
      setError('Email and Password are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if(res.data.user.role === 'student') navigate('/student-dashboard');
      else if(res.data.user.role === 'admin') navigate('/admin-dashboard');
      else setError('Unknown user role');
    } catch(err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoFocus
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
        />
        {error && <div style={{color:'red', marginBottom:12}}>{error}</div>}
        <button type="submit" style={{padding:'10px 20px', width:'100%'}}>Login</button>
      </form>
      <p style={{fontSize:'small', marginTop:12}}>Students login with their Paatshala credentials.</p>
    </div>
  );
}