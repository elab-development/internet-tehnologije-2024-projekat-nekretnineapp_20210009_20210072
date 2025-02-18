import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./PropertyDetails.css";
import { FaMapMarkerAlt, FaTag, FaGlobe, FaLayerGroup, FaArrowLeft } from "react-icons/fa"; 

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/properties/${id}`);
        
        if (response.data && response.data.data) {
          setProperty(response.data.data);
          
          // Fetch location using OpenStreetMap Reverse Geocoding (No API Key Needed)
          const { property_latitude, property_longitude } = response.data.data;
          const locationUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${property_latitude}&lon=${property_longitude}`;
          
          const locationResponse = await axios.get(locationUrl);
          const address = locationResponse.data.address;
          if (address) {
            const city = address.city || address.town || address.village || "Unknown City";
            const country = address.country || "Unknown Country";
            setLocation(`${city}, ${country}`);
          } else {
            setLocation("Location unavailable");
          }
        } else {
          throw new Error("Invalid property data received");
        }
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details. The property might not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="loading-text">Loading property details...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="property-details-container">
      <div className="property-details">
        
        {/* Property Title */}
        <h1>{property.property_name}</h1>

        {/* Property Image */}
        <img src={property.property_image_link} alt={property.property_name} className="property-image" />

        {/* Property Details Box */}
        <div className="property-info-box">
          <h3>Property Details</h3>
          <p><FaTag /> <strong>Price:</strong> ${property.property_price.toLocaleString()}</p>
          <p><FaMapMarkerAlt /> <strong>Location:</strong> {location}</p>
          <p><strong>Description:</strong> {property.property_description}</p>
        </div>

        {/* 360° View */}
        <h2>360° View</h2>
        <iframe
          src={property.property_360_image_link}
          title="360 View"
          className="iframe-360"
          allowFullScreen
        ></iframe>

        {/* Back Button */}
        <Link to="/our-properties" className="back-button">
          Back to All Properties
        </Link>

        {/* Book Now Button - Styled Like "Get in Touch" */}
        <button className="book-now-button" onClick={() => alert("Property Booked!")}>
          Book Now
        </button>

      </div>
    </div>
  );
};

export default PropertyDetails;
