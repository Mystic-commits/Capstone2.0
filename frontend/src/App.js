import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import TenantDashboard from './pages/TenantDashboard';
import BrowseProperties from './pages/BrowseProperties';
import MyRequests from './pages/MyRequests';

import LandlordDashboard from './pages/LandlordDashboard';
import MyProperties from './pages/MyProperties';
import AddProperty from './pages/AddProperty';
import RentalRequests from './pages/RentalRequests';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  let user = null;
  
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      user = JSON.parse(userStr);
    }
  } catch (e) {
    console.error('Error parsing user from localStorage:', e);
  }

  if (!token) return <Navigate to="/login" />;
  if (role && user && user.role !== role) return <Navigate to="/" />;

  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  let user = null;
  
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      user = JSON.parse(userStr);
    }
  } catch (e) {
    console.error('Error parsing user from localStorage:', e);
  }

  if (token && user) {
    if (user.role === 'landlord') {
      return <Navigate to="/landlord/dashboard" />;
    } else {
      return <Navigate to="/tenant/dashboard" />;
    }
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          <Route path="/tenant/dashboard" element={
            <ProtectedRoute role="tenant">
              <TenantDashboard />
            </ProtectedRoute>
          } />
          <Route path="/tenant/properties" element={
            <ProtectedRoute role="tenant">
              <BrowseProperties />
            </ProtectedRoute>
          } />
          <Route path="/tenant/requests" element={
            <ProtectedRoute role="tenant">
              <MyRequests />
            </ProtectedRoute>
          } />

          <Route path="/landlord/dashboard" element={
            <ProtectedRoute role="landlord">
              <LandlordDashboard />
            </ProtectedRoute>
          } />
          <Route path="/landlord/properties" element={
            <ProtectedRoute role="landlord">
              <MyProperties />
            </ProtectedRoute>
          } />
          <Route path="/landlord/add-property" element={
            <ProtectedRoute role="landlord">
              <AddProperty />
            </ProtectedRoute>
          } />
          <Route path="/landlord/edit-property/:id" element={
            <ProtectedRoute role="landlord">
              <AddProperty />
            </ProtectedRoute>
          } />
          <Route path="/landlord/requests" element={
            <ProtectedRoute role="landlord">
              <RentalRequests />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
