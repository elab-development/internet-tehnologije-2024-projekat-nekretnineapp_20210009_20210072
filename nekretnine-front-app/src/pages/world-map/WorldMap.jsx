import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./WorldMap.css";
import customMarker from "../../assets/custom-marker.png";

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
  useEffect(() => {
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
      <button className="zoom-btn" onClick={() => map.zoomIn()}>+</button>
      <button className="zoom-btn" onClick={() => map.zoomOut()}>−</button>
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
    <div className="search-bar">
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

const WorldMap = () => {
  const [properties, setProperties] = useState([]);
  const [locations, setLocations] = useState({});
  const [activeMarker, setActiveMarker] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let allProperties = [];
        let page = 1;
        let lastPage = 1;

        while (page <= lastPage) {
          const response = await axios.get(`http://127.0.0.1:8000/api/properties?page=${page}`);
          if (response.data && response.data.properties) {
            allProperties = [...allProperties, ...response.data.properties];
            lastPage = response.data.pagination.last_page;
          }
          page++;
        }
        setProperties(allProperties);
        allProperties.forEach(fetchLocation);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  // Fetch City & Country using OpenStreetMap
  const fetchLocation = async (property) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${property.property_latitude}&lon=${property.property_longitude}`;
    try {
      const res = await axios.get(url);
      if (res.data && res.data.address) {
        const { city, town, village, country } = res.data.address;
        const location = `${city || town || village || "Unknown City"}, ${country || "Unknown Country"}`;
        setLocations((prev) => ({ ...prev, [property.property_id]: location }));
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocations((prev) => ({ ...prev, [property.property_id]: "Location Unavailable" }));
    }
  };

  return (
    <div className="world-map-container">
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
                  <Link to={`/our-properties/${property.property_id}`} className="popup-view-btn">
                    View Property
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend (Top Right) */}
        <div className="map-legend">
          <p><strong>Number of Properties:</strong> {properties.length}</p>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
