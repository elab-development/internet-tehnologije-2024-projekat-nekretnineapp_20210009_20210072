import { useState, useEffect } from "react";
import axios from "axios";

const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        let allProperties = [];

        // Fetch Page 1
        const response1 = await axios.get("http://127.0.0.1:8000/api/properties?page=1");
        if (response1.data && response1.data.properties) {
          allProperties = [...response1.data.properties];
        }

        // Fetch Page 2 if it exists
        if (response1.data.pagination?.last_page > 1) {
          const response2 = await axios.get("http://127.0.0.1:8000/api/properties?page=2");
          if (response2.data && response2.data.properties) {
            allProperties = [...allProperties, ...response2.data.properties];
          }
        }

        setProperties(allProperties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  return { properties, loading, error };
};

export default useProperties;
