import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',
      background: '#f0f4f8', padding: 40,
    }}>
      <h1>ICTAK Exam Registration Portal</h1>
      <p>Welcome ICTAK students and test admins</p>
      <Link to="/login" style={{
        padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: 5,
        textDecoration: 'none', fontWeight: 'bold', fontSize: 18
      }}>Login</Link>
    </div>
  );
}