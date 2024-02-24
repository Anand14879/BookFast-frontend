// FacilitiesList.js
import React, { useState } from "react";
import "../css/FacilitiesList.css";

const CategoryFacilityList = ({
  facilities,
  handleBookNowClick,
  HeaderName,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const facilitiesPerPage = 3;

  const lastIndex = currentPage * facilitiesPerPage + facilitiesPerPage;
  const firstIndex = lastIndex - facilitiesPerPage;

  // Get unique categories for dropdown
  const categories = [
    "All",
    ...new Set(facilities.map((facility) => facility.Category)),
  ];

  // Filter facilities by selected category
  const filteredFacilities =
    selectedCategory === "All"
      ? facilities
      : facilities.filter((facility) => facility.Category === selectedCategory);

  const currentFacilities = filteredFacilities.slice(firstIndex, lastIndex);

  const nextPage = () => {
    setCurrentPage((prev) =>
      lastIndex < filteredFacilities.length ? prev + 1 : prev
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div>
      <h1>{HeaderName}</h1>
      <div className="category-selector">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(0); // Reset to first page
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="myfacility-container">
        <button
          className="mynavigation-button prev"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          &#x2B05;
        </button>
        <div className="myfacilities">
          {currentFacilities.map((facility) => (
            <div className="myfacility" key={facility.id}>
              {facility.Facility_Image ? (
                <img
                  src={facility.Facility_Image}
                  alt={facility.Name || "Facility image"}
                  className="myfacility-image"
                />
              ) : (
                <p>No image available</p>
              )}
              <h2>{facility.Name || "No name"}</h2>
              <p>
                Description:{" "}
                {facility.Description || "No description available"}
              </p>
              <p>Capacity: {facility.Capacity || "No capacity mentioned"}</p>
              <p>Category: {facility.Category || "No category mentioned"}</p>
              <p>
                Daily-Cost: Rs.{" "}
                {facility.Daily_Cost || "No description available"}
              </p>
              <div className="myfacility-footer">
                <button onClick={() => handleBookNowClick(facility.id)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="mynavigation-button next"
          onClick={nextPage}
          disabled={lastIndex >= facilities.length}
        >
          &#x27A1;
        </button>
      </div>
    </div>
  );
};

export default CategoryFacilityList;
