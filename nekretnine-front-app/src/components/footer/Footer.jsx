import React, { useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaPowerOff } from "react-icons/fa";
import logo from "../../assets/logo.png"; 
import "./Footer.css";
import { Link, useNavigate  } from "react-router-dom";
import axios from 'axios';

const Footer = () => {
  const navigate = useNavigate();
  // attach token
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  const handleLogout = async () => {
    sessionStorage.clear();
    await axios.post(`/api/logout`);
    navigate("/login", { replace: true });
  };

  return (
    <footer className="footer">

      <div className="footer-header">
        <Link to="/">
          <img src={logo} alt="Estate Flow Logo" className="footer-logo" />
          <span className="nav-logo-text1">Estate Flow</span>
        </Link>
      </div>


      <div className="footer-details">
        <p className="footer-text">
          <FaPhoneAlt className="footer-icon" /> +1 234 567 890
        </p>
        <p className="footer-text">
          <FaEnvelope className="footer-icon" /> contact@estateflow.com
        </p>
      </div>


      <div className="logout-button">
        <FaPowerOff className="logout-icon" onClick={() => handleLogout()} />
      </div>
    </footer>
  );
};

export default Footer;
