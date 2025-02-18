import React from "react";
import "./Home.css";
import cityImage from "../../assets/background-city.png"; // City skyline

const Home = () => {
  return (
    <div className="home-container">
      {/* Background Images */}
      <img src={cityImage} alt="City Skyline" className="background-city" />

      {/* Text Content */}
      <div className="home-content">
        <h1 className="home-title">Discover Your Dream Property</h1>
        <h2 className="home-subtitle">Seamless Real Estate Solutions</h2>
        <p className="home-text">
          Find the perfect home, office, or investment property with Estate Flow.
          Our modern and transparent platform connects you with the best listings
          and expert insights.
        </p>

        {/* Buttons */}
        <div className="home-buttons">
          <button className="btn btn-primary">Explore Listings</button>
          <button className="btn btn-secondary">Get in Touch</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
