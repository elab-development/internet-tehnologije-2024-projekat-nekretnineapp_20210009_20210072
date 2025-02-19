import React, { useEffect, useState } from "react";
import "./Card.css";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomButton from "../custom-button/CustomButton";

const Card = ({ property, locations }) => {
  // 📌 Stanje za lokaciju, podrazumevano prikazuje "učitavanje..."
  const [location, setLocation] = useState("Location loading...");

  useEffect(() => {
    // 🔄 Kada se lokacije ažuriraju, proveravamo da li postoji vrednost za trenutni ID nekretnine
    if (locations && property.property_id in locations) {
      console.log(`Updating location for ${property.property_id}: ${locations[property.property_id]}`);
      setLocation(locations[property.property_id]); // 📌 Postavljamo preuzetu lokaciju u stanje
    }
  }, [locations, property.property_id]);

  // 🛑 Ako podaci o nekretnini ne postoje, prikazujemo poruku o grešci
  if (!property) {
    return <p className="error-text">Property data is missing...</p>;
  }

  // 💲 Formatiranje cene u američkim dolarima
  const formattedPrice = property.property_price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(property.property_price)
    : "N/A";

  return (
    <div className="property-card">
      {/* 🏡 Ako postoji slika nekretnine, prikazujemo je, inače prikazujemo placeholder */}
      {property.property_image_link ? (
        <img src={property.property_image_link} alt={property.property_name} className="property-image" />
      ) : (
        <div className="placeholder-image">No Image</div>
      )}

      <div className="property-info">
        {/* 📌 Prikaz naziva nekretnine, ako ne postoji prikazuje se "Unknown Property" */}
        <h3>{property.property_name || "Unknown Property"}</h3>

        {/* 💲 Prikaz cene nekretnine */}
        <p className="price">
          <FaTag /> {formattedPrice}
        </p>

        {/* 📍 Prikaz lokacije nekretnine */}
        <p className="location">
          <FaMapMarkerAlt /> {location}
        </p>

        {/* 🔘 Dugme za prikaz detalja nekretnine */}
        {property.property_id ? (
          <Link to={`/our-properties/${property.property_id}`}>
            <CustomButton text="View Details" type="outline" />
          </Link>
        ) : (
          <p className="error-text">Invalid property data</p>
        )}
      </div>
    </div>
  );
};

export default Card;
