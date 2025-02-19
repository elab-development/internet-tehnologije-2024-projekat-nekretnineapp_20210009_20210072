import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./WorldMap.css";
import customMarker from "../../assets/custom-marker.png";
import CustomButton from "../../components/custom-button/CustomButton"; // Import CustomButton
import useProperties from "../../hooks/useProperties"; // Import custom property hook
import useLocations from "../../hooks/useLocations"; // Import custom location hook
import { Link } from "react-router-dom";

// Custom Green Marker Icon
const greenMarkerIcon = new L.Icon({
  iconUrl: customMarker,
  iconSize: [40, 55],
  iconAnchor: [20, 55],
  popupAnchor: [0, -50],
});

// Fix Map Rendering
const FixMapRendering = () => {
  const map = useMap();
  useState(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 400);
  }, [map]);
  return null;
};

// Custom Zoom Buttons
const CustomZoomControl = () => {
  const map = useMap();
  return (
    <div className="custom-zoom-controls">
      <button className="zoom-btn" onClick={() => map.zoomIn()}>
        +
      </button>
      <button className="zoom-btn" onClick={() => map.zoomOut()}>
        −
      </button>
    </div>
  );
};

// Search Bar (Appears Over the Map in the Top Middle)
const SearchBar = ({ properties, setActiveMarker }) => {
  const map = useMap();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const foundProperty = properties.find((prop) =>
      prop.property_name.toLowerCase().includes(query.toLowerCase())
    );

    if (foundProperty) {
      map.setView([foundProperty.property_latitude, foundProperty.property_longitude], 10);
      setActiveMarker(foundProperty.property_id);
    }
  };

  return (
    <div className="search-bar1">
      <input type="text" placeholder="Search properties..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const WorldMap = () => {
  const { properties, loading, error } = useProperties();
  const locations = useLocations(properties);
  const [activeMarker, setActiveMarker] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  if (loading) return <p className="loading-text">Loading properties...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="world-map-container">
              <nav className="breadcrumbs-3">
                    <Link to="/">Home</Link> / <span>World Map</span>
              </nav>
      <h1 className="world-title">World Map</h1>
      <div className="map-wrapper">
        <MapContainer center={[20, 0]} zoom={2} className="map" attributionControl={false}>
          <FixMapRendering />
          <CustomZoomControl />

          {/* Search Bar (Top Middle) */}
          <SearchBar properties={properties} setActiveMarker={setActiveMarker} />

          {/* More Detailed OSM Skin */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          {properties.map((property) => (
            <Marker
              key={property.property_id}
              position={[parseFloat(property.property_latitude), parseFloat(property.property_longitude)]}
              icon={greenMarkerIcon}
            >
              <Popup autoOpen={activeMarker === property.property_id}>
                <div className="popup-content">
                  <img src={property.property_image_link} alt={property.property_name} className="popup-image" />
                  <h3>{property.property_name}</h3>
                  <p>{locations[property.property_id] || "Fetching location..."}</p>
                  <p className="popup-price">$ {property.property_price.toLocaleString()}</p>

                  {/* View Property Button using CustomButton */}
                  <CustomButton
                    text="View Property"
                    type="outline"
                    onClick={() => navigate(`/our-properties/${property.property_id}`)}
                  />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend (Top Right) */}
        <div className="map-legend">
          <p>
            <strong>Number of Properties:</strong> {properties.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
