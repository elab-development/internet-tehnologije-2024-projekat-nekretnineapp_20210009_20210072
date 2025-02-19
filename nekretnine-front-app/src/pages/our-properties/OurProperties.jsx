import React, { useState } from "react";
import "./OurProperties.css";
import Card from "../../components/card/Card";
import { FaSearch } from "react-icons/fa";
import CustomButton from "../../components/custom-button/CustomButton";
import useProperties from "../../hooks/useProperties";
import useLocations from "../../hooks/useLocations";
import { Link } from "react-router-dom";

const OurProperties = () => {
  const { properties, loading, error } = useProperties();
  const locations = useLocations(properties); // Fetch locations
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByPrice, setSortByPrice] = useState(null);
  const propertiesPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <p className="loading-text">Loading properties...</p>;
  if (error) return <p className="error-text">{error}</p>;

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
      <nav className="breadcrumbs-1">
        <Link to="/">Home</Link> / <span>Our Properties</span>
      </nav>

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

          <CustomButton
            text={`Sort by Price ${sortByPrice === "asc" ? "▼" : sortByPrice === "desc" ? "▲" : ""}`}
            type="outline"
            onClick={() => setSortByPrice(sortByPrice === "asc" ? "desc" : "asc")}
          />
        </div>
      </div>

      <div className="properties-grid">
        {paginatedProperties.length > 0 ? (
          paginatedProperties.map((property) => (
            <Card key={property.property_id} property={property} locations={locations} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>

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
