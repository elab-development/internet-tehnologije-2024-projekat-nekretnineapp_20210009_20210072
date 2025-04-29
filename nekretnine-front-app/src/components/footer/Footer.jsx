import React from "react";
import { FaPhoneAlt, FaEnvelope, FaPowerOff } from "react-icons/fa";
import logo from "../../assets/logo.png"; 
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
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
        <FaPowerOff className="logout-icon" onClick={() => alert("Logging out...")} />
      </div>
    </footer>
  );
};

export default Footer;
