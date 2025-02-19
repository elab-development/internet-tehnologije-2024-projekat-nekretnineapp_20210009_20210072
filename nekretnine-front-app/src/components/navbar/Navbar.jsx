import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaBuilding, FaGlobe, FaUsers, FaSignOutAlt, FaBars, FaArrowLeft } from "react-icons/fa";
import logo from "../../assets/logo.png"; 
import avatar from "../../assets/placeholder-avatar.png"; 
import "./Navbar.css"; 
import { Link } from "react-router-dom";

/**
 * ✅ Navbar komponenta
 * Ova komponenta predstavlja navigacioni meni sa bočnom trakom (sidebar).
 * Omogućava prebacivanje između otvorenog i zatvorenog stanja menija.
 */

const Navbar = () => {
  // ⏬ Stanje za upravljanje otvaranjem i zatvaranjem sidebar-a
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar-container">
      
      {/* ✅ Gornja navigaciona traka */}
      <div className="navbar">
        {/* 🔘 Dugme za otvaranje/zatvaranje sidebar-a */}
        <div className="nav-left">
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaArrowLeft /> : <FaBars />}
          </button>
        </div>

        {/* 🏠 Logo sa imenom aplikacije */}
        <div className="nav-logo">
          <Link to="/">
            <img src={logo} alt="Estate Flow Logo" />
            <span className="nav-logo-text">Estate Flow</span>
          </Link>
        </div>        

        {/* 👤 Avatar korisnika i korisničko ime */}
        <div className="nav-user">
          <img src={avatar} alt="User Avatar" className="user-avatar" />
          <span className="username">Username</span>
        </div>
      </div>

      {/* ✅ Sidebar navigacija (bočna traka) */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <ul>
          <li><Link to="/"><FaHome /> <span className={isOpen ? "visible" : "hidden"}>Home</span></Link></li>
          <li><Link to="/about-us"><FaInfoCircle /> <span className={isOpen ? "visible" : "hidden"}>About Us</span></Link></li>
          <li><Link to="/our-properties"><FaBuilding /> <span className={isOpen ? "visible" : "hidden"}>Our Properties</span></Link></li>
          <li><Link to="/world-map"><FaGlobe /> <span className={isOpen ? "visible" : "hidden"}>World Map</span></Link></li>
          <li><Link to="/our-team"><FaUsers /> <span className={isOpen ? "visible" : "hidden"}>Our Team</span></Link></li>
          
          {/* 🔴 Logout opcija (za sada samo alert) */}
          <li onClick={() => alert("Logging out...")}>
            <FaSignOutAlt /> <span className={isOpen ? "visible" : "hidden"}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
