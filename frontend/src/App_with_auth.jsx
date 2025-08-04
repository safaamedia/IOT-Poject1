import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import Temperature from './pages/Temperature';
import Humidity from './pages/Humidity';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/temperature" element={
            <ProtectedRoute>
              <Temperature />
            </ProtectedRoute>
          } />
          <Route path="/humidity" element={
            <ProtectedRoute>
              <Humidity />
            </ProtectedRoute>
          } />
          
          {/* Redirect to login for any other path */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
