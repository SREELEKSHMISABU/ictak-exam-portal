import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { useNavigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the ICTAK Exam Registration Portal</h1>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
}

export default Home;

reportWebVitals();
