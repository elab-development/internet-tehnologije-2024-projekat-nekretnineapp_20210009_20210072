import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import AgentHome from './pages/agent-home/AgentHome';
import AdminHome from './pages/admin-home/AdminHome';
import AboutUs from './pages/about-us/AboutUs';
import OurProperties from './pages/our-properties/OurProperties';
import OurTeam from './pages/our-team/OurTeam';
import WorldMap from './pages/world-map/WorldMap';
import PropertyDetails from './pages/property-details/PropertyDetails';
import MyProperties from './pages/my-properties/MyProperties';

import './App.css';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  // Poll sessionStorage every second for login/logout
  useEffect(() => {
    const id = setInterval(() => {
      const t = sessionStorage.getItem('token');
      if (t !== token) setToken(t);
    }, 1000);
    return () => clearInterval(id);
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        {token && <Navbar />}

        <div className="content">
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected: only token matters, role-specific landing handled in Login */}
            <Route
              path="/"
              element={token ? <Home /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/agent-home"
              element={token ? <AgentHome /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/my-properties"
              element={token ? <MyProperties /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/admin-home"
              element={token ? <AdminHome /> : <Navigate to="/login" replace />}
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
              path="/world-map"
              element={token ? <WorldMap /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/our-properties/:id"
              element={token ? <PropertyDetails /> : <Navigate to="/login" replace />}
            />

            {/* Catch-all */}
            <Route
              path="*"
              element={token ? <Navigate to="/" replace /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </div>

        {token && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;
