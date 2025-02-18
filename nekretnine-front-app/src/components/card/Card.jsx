import React, { useState, useEffect } from "react";
import "./Card.css";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Card = ({ property }) => {
  const [location, setLocation] = useState("Loading location...");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${property.property_latitude}&lon=${property.property_longitude}`;

        const response = await axios.get(url);
        const result = response.data;

        if (result.address) {
          const { city, town, village, country } = result.address;
          const locationName = `${city || town || village || "Unknown City"}, ${country || "Unknown Country"}`;
          setLocation(locationName);
        } else {
          setLocation("Location unavailable");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        setLocation("Location unavailable");
      }
    };

    fetchLocation();
  }, [property.property_latitude, property.property_longitude]);

  // Format price with commas
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(property.property_price);

  return (
    <div className="property-card">
      <img src={property.property_image_link} alt={property.property_name} className="property-image" />

      <div className="property-info">
        <h3>{property.property_name}</h3>
        <p className="price">
          <FaTag /> {formattedPrice}
        </p>
        <p className="location">
          <FaMapMarkerAlt /> {location}
        </p>
        <Link to={`/our-properties/${property.property_id}`} className="details-btn">View Details</Link>
      </div>
    </div>
  );
};

export default Card;
