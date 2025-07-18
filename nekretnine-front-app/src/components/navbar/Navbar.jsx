// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaBuilding,
  FaGlobe,
  FaUsers,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // pull & parse user from sessionStorage
  const stored = sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const fullName = user?.name || "Guest";
  const role = user?.role || "";

  // build initials (up to two letters)
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="navbar-container">
      {/* top bar */}
      <div className="navbar">
        <div className="nav-left">
          <button
            className="toggle-btn"
            onClick={() => setIsOpen((o) => !o)}
          >
            {isOpen ? <FaArrowLeft /> : <FaBars />}
          </button>
        </div>

        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Estate Flow Logo" />
            <span className="nav-logo-text">Estate Flow</span>
          </Link>
        </div>

        <div className="nav-user">
          {/* circular initials avatar */}
          <div className="user-avatar">{initials}</div>
          {/* name + role */}
          <div className="user-details">
            <span className="username">{fullName}</span>
            {role && <span className="user-role">{role}</span>}
          </div>
        </div>
      </div>

      {/* sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <ul>
          <li>
            <Link to="/">
              <FaHome />{" "}
              <span className={isOpen ? "visible" : "hidden"}>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/about-us">
              <FaInfoCircle />{" "}
              <span className={isOpen ? "visible" : "hidden"}>About Us</span>
            </Link>
          </li>
          <li>
            <Link to="/our-properties">
              <FaBuilding />{" "}
              <span className={isOpen ? "visible" : "hidden"}>
                Our Properties
              </span>
            </Link>
          </li>
          <li>
            <Link to="/world-map">
              <FaGlobe />{" "}
              <span className={isOpen ? "visible" : "hidden"}>World Map</span>
            </Link>
          </li>
          <li>
            <Link to="/our-team">
              <FaUsers />{" "}
              <span className={isOpen ? "visible" : "hidden"}>Our Team</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
);

};

export default Navbar;
