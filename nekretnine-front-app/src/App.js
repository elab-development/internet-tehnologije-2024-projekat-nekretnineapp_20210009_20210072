// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import AboutUs from './pages/about-us/AboutUs';
import OurProperties from './pages/our-properties/OurProperties';
import OurTeam from './pages/our-team/OurTeam';
import PropertyDetails from './pages/property-details/PropertyDetails';
import WorldMap from "./pages/world-map/WorldMap";

import './App.css';

function App() {
  // keep token in state so re-renders happen when it changes
  const [token, setToken] = useState(() => sessionStorage.getItem('token'));

  useEffect(() => {
    const id = setInterval(() => {
      const current = sessionStorage.getItem('token');
      if (current !== token) {
        setToken(current);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        {/* show navbar/footer only when token is truthy */}
        {token && <Navbar />}

        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={token ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" replace /> : <Register />}
          />

          {/* Protected routes */}
          <Route
            path="/"
            element={token ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/about-us"
            element={token ? <AboutUs /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/our-properties"
            element={token ? <OurProperties /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/our-team"
            element={token ? <OurTeam /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/our-properties/:id"
            element={token ? <PropertyDetails /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/world-map"
            element={token ? <WorldMap /> : <Navigate to="/login" replace />}
          />

          {/* catch-all */}
          <Route
            path="*"
            element={
              token
                ? <Navigate to="/" replace />
                : <Navigate to="/login" replace />
            }
          />
        </Routes>

        {token && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
