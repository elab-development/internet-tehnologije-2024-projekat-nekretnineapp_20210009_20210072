import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaBuilding, FaGlobe, FaUsers, FaPhone, FaSignOutAlt, FaBars, FaArrowLeft } from "react-icons/fa";
import logo from "../../assets/logo.png"; // Import the logo from assets
import avatar from "../../assets/placeholder-avatar.png"; // Import avatar image
import "./Navbar.css"; // Import CSS file

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar-container">
      {/* Top Navbar */}
      <div className="navbar">
        <div className="nav-left">
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaArrowLeft /> : <FaBars />}
          </button>
        </div>

        {/* Centered Logo */}
        <div className="nav-logo">
          <img src={logo} alt="Estate Flow Logo" />
          <span className="nav-logo-text">Estate Flow</span>
        </div>

        {/* Avatar and Username */}
        <div className="nav-user">
          <img src={avatar} alt="User Avatar" className="user-avatar" />
          <span className="username">Username</span>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <ul>
          <li><FaHome /> <span className={isOpen ? "visible" : "hidden"}>Home</span></li>
          <li><FaInfoCircle /> <span className={isOpen ? "visible" : "hidden"}>About Us</span></li>
          <li><FaBuilding /> <span className={isOpen ? "visible" : "hidden"}>Our Properties</span></li>
          <li><FaGlobe /> <span className={isOpen ? "visible" : "hidden"}>World Map</span></li>
          <li><FaUsers /> <span className={isOpen ? "visible" : "hidden"}>Our Team</span></li>
          <li><FaPhone /> <span className={isOpen ? "visible" : "hidden"}>Contact Us</span></li>
          <li><FaSignOutAlt /> <span className={isOpen ? "visible" : "hidden"}>Logout</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
