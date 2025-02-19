import { useState, useEffect } from "react";
import axios from "axios";

const useLocations = (properties) => {
  // 📌 Stanje u kojem čuvamo informacije o lokacijama nekretnina
  const [locations, setLocations] = useState({});

  useEffect(() => {
    // 🛑 Ako nema dostupnih nekretnina, prekidamo izvršavanje
    if (!properties || properties.length === 0) {
      console.log("No properties available to fetch locations.");
      return;
    }

    // 📌 Funkcija koja dohvaća lokacije pomoću OpenStreetMap API-ja
    const fetchLocations = async () => {
      const newLocations = {}; // Privremeni objekat u kojem čuvamo podatke

      // 🔄 Iteriramo kroz sve nekretnine i paralelno šaljemo zahteve API-ju
      await Promise.all(
        properties.map(async (property) => {
          try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${property.property_latitude}&lon=${property.property_longitude}`;
            console.log(`Fetching location for: ${property.property_id} - ${url}`);

            const res = await axios.get(url);

            if (res.data && res.data.address) {
              // 📌 Ekstrahujemo grad i državu iz API odgovora
              const { city, town, village, country } = res.data.address;
              newLocations[property.property_id] = `${city || town || village || "Unknown City"}, ${country || "Unknown Country"}`;
              console.log(`Fetched location: ${newLocations[property.property_id]}`);
            } else {
              newLocations[property.property_id] = "Location unavailable";
            }
          } catch (error) {
            console.error(`Error fetching location for ${property.property_id}:`, error);
            newLocations[property.property_id] = "Location unavailable";
          }
        })
      );

      // 📌 Ažuriramo stanje sa dohvaćenim lokacijama
      setLocations(newLocations);
    };

    fetchLocations();
  }, [properties]); // 🔄 Ova funkcija se ponovo izvršava kada se promeni `properties`

  return locations;
};

export default useLocations;
