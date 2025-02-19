import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./WorldMap.css";
import customMarker from "../../assets/custom-marker.png";
import CustomButton from "../../components/custom-button/CustomButton"; 
import useProperties from "../../hooks/useProperties"; 
import useLocations from "../../hooks/useLocations"; 
import { Link } from "react-router-dom";

// 🟢 Kreiranje prilagođene zelene ikone markera za prikaz nekretnina na mapi
const greenMarkerIcon = new L.Icon({
  iconUrl: customMarker,
  iconSize: [40, 55], 
  iconAnchor: [20, 55], 
  popupAnchor: [0, -50], 
});

// 🔄 Komponenta za popravljanje problema sa renderovanjem mape
const FixMapRendering = () => {
  const map = useMap();
  useState(() => {
    setTimeout(() => {
      map.invalidateSize(); // Ponovno iscrtavanje mape nakon kratkog vremena
    }, 400);
  }, [map]);
  return null;
};

// 🔍 Prilagođene dugmići za zumiranje mape
const CustomZoomControl = () => {
  const map = useMap();
  return (
    <div className="custom-zoom-controls">
      <button className="zoom-btn" onClick={() => map.zoomIn()}>+</button>
      <button className="zoom-btn" onClick={() => map.zoomOut()}>−</button>
    </div>
  );
};

// 🔎 Komponenta za pretragu nekretnina na mapi
const SearchBar = ({ properties, setActiveMarker }) => {
  const map = useMap();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // Pretraga nekretnina po imenu
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
      <input 
        type="text" 
        placeholder="Search properties..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

// 🌍 Glavna komponenta za prikaz mape sa nekretninama
const WorldMap = () => {
  const { properties, loading, error } = useProperties(); // Dohvatanje liste nekretnina pomoću useProperties hook-a
  const locations = useLocations(properties); // Dohvatanje lokacija pomoću useLocations hook-a
  const [activeMarker, setActiveMarker] = useState(null); // State za praćenje aktivnog markera
  const navigate = useNavigate(); // Hook za navigaciju ka detaljima nekretnine

  if (loading) return <p className="loading-text">Loading properties...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="world-map-container">
      {/* 🔗 Navigacioni put (breadcrumbs) */}
      <nav className="breadcrumbs-3">
        <Link to="/">Home</Link> / <span>World Map</span>
      </nav>

      <h1 className="world-title">World Map</h1>

      <div className="map-wrapper">
        {/* 📍 Kreiranje Leaflet mape */}
        <MapContainer center={[20, 0]} zoom={2} className="map" attributionControl={false}>
          <FixMapRendering />
          <CustomZoomControl />
          <SearchBar properties={properties} setActiveMarker={setActiveMarker} />

          {/* 🗺️ Dodavanje sloja sa mapom */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          {/* 📍 Dodavanje markera za svaku nekretninu */}
          {properties.map((property) => (
            <Marker
              key={property.property_id}
              position={[parseFloat(property.property_latitude), parseFloat(property.property_longitude)]}
              icon={greenMarkerIcon}
            >
              <Popup autoOpen={activeMarker === property.property_id}>
                <div className="popup-content">
                  {/* 🏠 Prikaz informacija o nekretnini */}
                  <img src={property.property_image_link} alt={property.property_name} className="popup-image" />
                  <h3>{property.property_name}</h3>
                  <p>{locations[property.property_id] || "Fetching location..."}</p>
                  <p className="popup-price">$ {property.property_price.toLocaleString()}</p>

                  {/* 🔘 Dugme za prikaz detalja nekretnine */}
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

        {/* ℹ️ Prikaz broja dostupnih nekretnina */}
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
