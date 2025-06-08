import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
     
      <div className="home-hero">
        <h1>Welcome to the ICTAK Exam Registration Portal</h1>
        <p>Your gateway to the Exit Test Registration</p>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
     
    </div>
  );
}

export default Home;
