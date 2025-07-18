import React from "react";
import { Link } from "react-router-dom";
import cityImage from "../../assets/background-city.png";
import CustomButton from "../../components/custom-button/CustomButton";
import "./AdminHome.css";

export default function AdminHome() {
  return (
    <div className="admin-container">
      <img
        src={cityImage}
        alt="City Skyline"
        className="admin-background"
      />

      <div className="admin-content">
        <h1 className="admin-title">Welcome, Administrator</h1>
        <h2 className="admin-subtitle">Platform Management Dashboard</h2>
        <p className="admin-text">
          From here you can oversee all users, properties, and bookings.
          Use the buttons below to jump into your admin tools and keep
          Estate Flow running smoothly.
        </p>

        <div className="admin-buttons">
          <Link to="/dashboard">
            <CustomButton text="Go to Dashboard" type="solid" />
          </Link>
        </div>
      </div>
    </div>
);
}
