// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout';

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  if (!token || !userStr) return <Navigate to="/login" />;
  const user = JSON.parse(userStr);
  if (role && user.role !== role) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student-dashboard" element={
          <PrivateRoute role="student">
            <Layout>
              <StudentDashboard />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/admin-dashboard" element={
          <PrivateRoute role="admin">
            <Layout>
              <AdminDashboard />
            </Layout>
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
