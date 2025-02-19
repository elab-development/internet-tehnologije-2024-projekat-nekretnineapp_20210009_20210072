import React from "react";
import { useParams } from "react-router-dom";
import "./PropertyDetails.css";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa"; 
import CustomButton from "../../components/custom-button/CustomButton"; 
import usePropertyDetails from "../../hooks/usePropertyDetails"; 
import { Link } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const { property, loading, error, location } = usePropertyDetails(id);

  if (loading) return <p className="loading-text">Loading property details...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="property-details-container">
        <nav className="breadcrumbs-2">
              <Link to="/">Home</Link> / <Link to="/our-properties">Our Properties</Link> / <span>Property Details</span>
        </nav>
      <div className="property-details">

        <h1>{property.property_name}</h1>


        <img src={property.property_image_link} alt={property.property_name} className="property-image" />


        <div className="property-info-box">
          <h3>Property Details</h3>
          <p><FaTag /> <strong>Price:</strong> ${property.property_price.toLocaleString()}</p>
          <p><FaMapMarkerAlt /> <strong>Location:</strong> {location}</p>
          <p><strong>Description:</strong> {property.property_description}</p>
        </div>

        <h2>360° View</h2>
        <iframe
          src={property.property_360_image_link}
          title="360 View"
          className="iframe-360"
          allowFullScreen
        ></iframe>

        <div className="custom-buttons">
   
            <CustomButton
              text="Back to All Properties"
              type="solid"
              onClick={() => window.history.back()}
            />
        </div>
        <div className="custom-buttons">
   
            <CustomButton
              text="Book Now"
              type="outline"
              onClick={() => alert("Property Booked!")}
            />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
