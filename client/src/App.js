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
        {/* Home and Login pages — no dashboard/logout controls */}
        <Route
          path="/"
          element={
            <Layout showControls={false}>
              <HomePage />
            </Layout>
          }
        />
        <Route path="/login" element={
  <Layout>
    <LoginPage />
  </Layout>
} />


        {/* Student Dashboard — show dashboard/logout */}
        <Route
          path="/student-dashboard"
          element={
            <PrivateRoute role="student">
              <Layout showControls={true} userRole="student">
                <StudentDashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Admin Dashboard — show dashboard/logout */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute role="admin">
              <Layout showControls={true} userRole="admin">
                <AdminDashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
