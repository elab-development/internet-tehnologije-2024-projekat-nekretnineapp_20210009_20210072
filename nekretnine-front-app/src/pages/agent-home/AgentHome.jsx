// src/pages/agent-home/AgentHome.jsx
import React from "react";
import "./AgentHome.css";            // identical to Home.css
import cityImage from "../../assets/background-city.png";
import { Link } from "react-router-dom";
import CustomButton from "../../components/custom-button/CustomButton";

const AgentHome = () => {
  return (
    <div className="home-container">
      <img
        src={cityImage}
        alt="City Skyline"
        className="background-city"
      />

      <div className="home-content">
        <h1 className="home-title">Welcome, Agent</h1>
        <h2 className="home-subtitle">Manage Your Listings and Bookings</h2>
        <p className="home-text">
          As an estate agent, list new properties and keep track of all your bookings in one place.
        </p>

        <div className="home-buttons">
          <Link to="/my-properties">
            <CustomButton text="Start Selling" type="solid" />
          </Link>
          <Link to="/my-bookings">
            <CustomButton text="See Your Bookings" type="outline" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentHome;
