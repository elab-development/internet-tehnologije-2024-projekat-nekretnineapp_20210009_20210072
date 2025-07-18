import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./PropertyDetails.css";
import { FaMapMarkerAlt, FaTag } from "react-icons/fa";
import CustomButton from "../../components/custom-button/CustomButton";
import usePropertyDetails from "../../hooks/usePropertyDetails";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { property, loading, error, location } = usePropertyDetails(id);

  // booking-modal state
  const [showModal, setShowModal]         = useState(false);
  const [note, setNote]                   = useState("");
  const [paymentType, setPaymentType]     = useState("cash");
  const [modalError, setModalError]       = useState("");

  // attach bearer token once
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  if (loading) return <p className="loading-text">Loading property details...</p>;
  if (error)   return <p className="error-text">{error}</p>;

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setNote("");
    setPaymentType("cash");
    setModalError("");
  };

  const handleConfirmBooking = async e => {
    e.preventDefault();
    setModalError("");
    try {
      await axios.post("/api/purchases", {
        purchase_notes: note,
        purchase_status: "pending",
        purchase_price: property.property_price,
        purchase_payment_type: paymentType,
        purchase_date: new Date().toISOString().split("T")[0],
        fk_agent_id: property.fk_agent_id,
        fk_property_id: property.property_id
      });
      closeModal();
      alert("Property booked!");
      navigate("/my-bookings-buyer");
    } catch (err) {
      setModalError(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="property-details-container">
      <nav className="breadcrumbs-2">
        <Link to="/our-properties">Our Properties</Link> / <span>Property Details</span>
      </nav>

      <div className="property-details">
        <h1>{property.property_name}</h1>
        <img
          src={property.property_image_link}
          alt={property.property_name}
          className="property-image"
        />
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
        />

        <div className="custom-buttons">
          <CustomButton
            text="Back to All Properties"
            type="solid"
            onClick={() => navigate("/our-properties")}
          />
          <CustomButton
            text="Book Now"
            type="outline"
            onClick={openModal}
          />
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="booking-modal">
            <h2>Book This Property</h2>
            {modalError && <p className="modal-error">{modalError}</p>}
            <form onSubmit={handleConfirmBooking}>
              <textarea
                placeholder="Add a note (optional)"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
              <select
                value={paymentType}
                onChange={e => setPaymentType(e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="credit_card">Card</option>
              </select>
              <div className="modal-buttons">
                <CustomButton text="Confirm" type="solid" />
                <CustomButton text="Cancel" type="outline" onClick={closeModal} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
