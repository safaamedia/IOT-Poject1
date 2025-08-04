import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Temperature from "./pages/Temperature";
import Humidity from "./pages/Humidity";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public routes - no authentication required */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />

          {/* Protected routes - only Temperature and Humidity pages */}
          <Route
            path="/temperature"
            element={
              <ProtectedRoute>
                <Temperature />
              </ProtectedRoute>
            }
          />
          <Route
            path="/humidity"
            element={
              <ProtectedRoute>
                <Humidity />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
