// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaBuilding,
  FaGlobe,
  FaUsers,
  FaCalendarAlt,
  FaTachometerAlt,
  FaBars,
  FaArrowLeft,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaAddressBook } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // pull & parse user from sessionStorage
  const stored = sessionStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  const fullName = user?.name || "Guest";
  const role = user?.role || "";

  // build initials (up to two letters)
  const initials = fullName   // "Milica Petakovic"
    .split(" ")    //["", "Milica", "Petakovic"]
    .filter(Boolean) // false --> false, 0, "", null, NA... truthy --> sve ostalo;   vi bi dobili ["Milica", "Petakovic"]
    .map((w) => w[0]) // ["M", "P"}
    .slice(0, 2) 
    .join("") // "MP"
    .toUpperCase(); // u velika ako vec nisu

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
          <div className="user-avatar">{initials}</div>
          <div className="user-details">
            <span className="username">{fullName}</span>
            {role && <span className="user-role">{role}</span>}
          </div>
        </div>
      </div>

      {/* sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <ul>
          {role === "admin" ? (
            <>
              <li>
                <Link to="/admin-home">
                  <FaHome />
                  <span className={isOpen ? "visible" : "hidden"}>
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <FaTachometerAlt />
                  <span className={isOpen ? "visible" : "hidden"}>
                    Dashboard
                  </span>
                </Link>
              </li>
            </>
          ) : role === "agent" ? (
            <>
              <li>
                <Link to="/agent-home">
                  <FaHome />
                  <span className={isOpen ? "visible" : "hidden"}>
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/my-properties">
                  <FaBuilding />
                  <span className={isOpen ? "visible" : "hidden"}>
                    My Properties
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/my-bookings">
                  <FaCalendarAlt />
                  <span className={isOpen ? "visible" : "hidden"}>
                    My Bookings
                  </span>
                </Link>
              </li>
            </>
          ) : (
            /* buyer */
            <>
              <li>
                <Link to="/">
                  <FaHome />
                  <span className={isOpen ? "visible" : "hidden"}>
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/about-us">
                  <FaInfoCircle />
                  <span className={isOpen ? "visible" : "hidden"}>
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/our-properties">
                  <FaBuilding />
                  <span className={isOpen ? "visible" : "hidden"}>
                    Our Properties
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/world-map">
                  <FaGlobe />
                  <span className={isOpen ? "visible" : "hidden"}>
                    World Map
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/our-team">
                  <FaUsers />
                  <span className={isOpen ? "visible" : "hidden"}>
                    Our Team
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/my-bookings-buyer">
                  <FaAddressBook />
                  <span className={isOpen ? "visible" : "hidden"}>
                    My Bookings
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
