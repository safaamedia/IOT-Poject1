import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

/*Pages */
import Temperature from "./pages/Temperature"
import Humidity from './pages/Humidity';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/temperature" element={<Temperature />} />
      <Route path="/humidity" element={<Humidity />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
