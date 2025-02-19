import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OurProperties.css";
import Card from "../../components/card/Card";
import { FaSearch } from "react-icons/fa";
import CustomButton from "../../components/custom-button/CustomButton"; // Import CustomButton

const OurProperties = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByPrice, setSortByPrice] = useState(null);
  const propertiesPerPage = 3;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
        if (response1.data.pagination.last_page > 1) {
          const response2 = await axios.get("http://127.0.0.1:8000/api/properties?page=2");
          if (response2.data && response2.data.properties) {
            allProperties = [...allProperties, ...response2.data.properties];
          }
        }

        setProperties(allProperties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  if (loading) return <p className="loading-text">Loading properties...</p>;

  // Filtering and Sorting
  const filteredProperties = properties
    .filter((p) => p.property_name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortByPrice === "asc") return a.property_price - b.property_price;
      if (sortByPrice === "desc") return b.property_price - a.property_price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  return (
    <div className="our-properties-container">
      {/* Fixed Header Section */}
      <div className="fixed-header">
        <h1 className="properties-title">Explore Our Properties</h1>
        <div className="filters">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Button with Dynamic Arrow Icon */}
          <CustomButton
            text={`Sort by Price ${sortByPrice === "asc" ? "▼" : sortByPrice === "desc" ? "▲" : ""}`}
            type="outline"
            onClick={() => setSortByPrice(sortByPrice === "asc" ? "desc" : "asc")}
          />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="properties-grid">
        {paginatedProperties.length > 0 ? (
          paginatedProperties.map((property) => (
            <Card key={property.property_id} property={property} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <CustomButton
          text="Previous"
          type="outline"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        />

        <span>
          Page {currentPage} out of {totalPages}
        </span>

        <CustomButton
          text="Next"
          type="outline"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * propertiesPerPage >= filteredProperties.length}
        />
      </div>
    </div>
  );
};

export default OurProperties;
