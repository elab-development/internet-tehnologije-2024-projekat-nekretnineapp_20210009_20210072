import { useState, useEffect } from "react";
import axios from "axios";

const useLocations = (properties) => {
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const fetchLocations = async () => {
      const newLocations = {};

      await Promise.all(
        properties.map(async (property) => {
          try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${property.property_latitude}&lon=${property.property_longitude}`;
            const res = await axios.get(url);

            if (res.data && res.data.address) {
              const { city, town, village, country } = res.data.address;
              newLocations[property.property_id] = `${city || town || village || "Unknown City"}, ${
                country || "Unknown Country"
              }`;
            } else {
              newLocations[property.property_id] = "Location Unavailable";
            }
          } catch (error) {
            console.error("Error fetching location:", error);
            newLocations[property.property_id] = "Location Unavailable";
          }
        })
      );

      setLocations(newLocations);
    };

    if (properties.length > 0) {
      fetchLocations();
    }
  }, [properties]);

  return locations;
};

export default useLocations;
