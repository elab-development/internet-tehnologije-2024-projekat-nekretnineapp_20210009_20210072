import React from "react";
import "./Home.css";
import cityImage from "../../assets/background-city.png"; 
import { Link } from "react-router-dom";
import CustomButton from "../../components/custom-button/CustomButton";

const Home = () => {
  return (
    <div className="home-container">

      <img src={cityImage} alt="City Skyline" className="background-city" />


      <div className="home-content">
        <h1 className="home-title">Discover Your Dream Property</h1>
        <h2 className="home-subtitle">Seamless Real Estate Solutions</h2>
        <p className="home-text">
          Find the perfect home, office, or investment property with Estate Flow.
          Our modern and transparent platform connects you with the best listings
          and expert insights.
        </p>


        <div className="home-buttons">
          <Link to="/our-properties">
            <CustomButton text="Explore Listings" type="solid" />
          </Link>
          <Link to="/world-map">
            <CustomButton text="Explore Locations" type="outline" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
