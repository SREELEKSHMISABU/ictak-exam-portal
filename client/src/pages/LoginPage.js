import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // default selection
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
        role, // include role in request if needed
      });
      localStorage.setItem('token', res.data.token);

      if (res.data.role === 'student') navigate('/student-dashboard');
      else if (res.data.role === 'admin') navigate('/admin-dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          <input
            type="radio"
            value="student"
            checked={role === 'student'}
            onChange={() => setRole('student')}
          /> Student
        </label>{' '}
        <label>
          <input
            type="radio"
            value="admin"
            checked={role === 'admin'}
            onChange={() => setRole('admin')}
          /> Admin
        </label>
      </div>

      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />
      <button onClick={handleLogin} style={{ marginBottom: '1rem' }}>
        Login
      </button>

      <p style={{ fontSize: '0.9rem', color: 'gray' }}>
        * Students can login with the Paatshala credentials.
      </p>
    </div>
  );
}

export default LoginPage;
