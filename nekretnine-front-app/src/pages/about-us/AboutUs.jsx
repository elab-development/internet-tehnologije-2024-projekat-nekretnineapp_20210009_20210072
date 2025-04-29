import React from "react";
import "./AboutUs.css";
import { FaBuilding, FaGlobe, FaUsers, FaRobot } from "react-icons/fa"; 
import journeyImage from "../../assets/back-city-2.png"; 
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="about-container">
        <nav className="breadcrumbs">
              <Link to="/">Home</Link> / <span>About Us</span>
        </nav>

      <div className="about-header">
        <h1 className="about-title">Our Journey</h1>
        <p className="about-description">
          Estate Flow was founded with a vision to revolutionize the real estate industry 
          through cutting-edge technology and data-driven insights. Over the years, we have 
          expanded our reach, enhanced our services, and introduced AI-powered tools to help 
          clients make smarter investment decisions. Our journey is a testament to our 
          commitment to innovation and excellence in real estate.
        </p>
      </div>


      <div className="journey-section">
        <img src={journeyImage} alt="Our Journey" className="background-image" />


        <div className="timeline">
          
          <div className="timeline-item">
            <div className="circle"><FaBuilding className="icon" /></div>
            <div className="timeline-text">
              <h2>2015 - Founded Estate Flow</h2>
              <p>We launched Estate Flow to bring modern, technology-driven solutions to real estate.</p>
            </div>
          </div>

          <div className="line"></div>


          <div className="timeline-item">
            <div className="circle"><FaGlobe className="icon" /></div>
            <div className="timeline-text">
              <h2>2017 - Expanded Internationally</h2>
              <p>We grew beyond our home market, offering services worldwide.</p>
            </div>
          </div>

          <div className="line"></div>


          <div className="timeline-item">
            <div className="circle"><FaUsers className="icon" /></div>
            <div className="timeline-text">
              <h2>2020 - 1M+ Users Reached</h2>
              <p>Our platform reached over a million users globally, marking a significant milestone.</p>
            </div>
          </div>

          <div className="line"></div>


          <div className="timeline-item">
            <div className="circle"><FaRobot className="icon" /></div>
            <div className="timeline-text">
              <h2>2023 - AI Insights Launched</h2>
              <p>We introduced AI-powered insights to enhance real estate decision-making.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
