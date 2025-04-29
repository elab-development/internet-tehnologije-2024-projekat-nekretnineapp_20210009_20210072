import { useState, useEffect } from "react";
import axios from "axios";

const usePropertyDetails = (id) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/properties/${id}`);
        
        if (response.data && response.data.data) {
          const propertyData = response.data.data;
          setProperty(propertyData);


          const { property_latitude, property_longitude } = propertyData;
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

  return { property, loading, error, location };
};

export default usePropertyDetails;
