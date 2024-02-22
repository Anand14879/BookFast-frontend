import React, { useState, useEffect } from "react";
import Header from "./Header";
import BookingModal from "./BookingModal"; // Import the Modal component

const Home = () => {
  const [facilities, setFacilities] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUserId(user.id); // Assuming that the ID is stored with the key 'id'
    }
    const fetchFacilities = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/facilities");
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        const data = await response.json();
        // If the data is directly an array of facilities
        setFacilities(data);
        // If the data comes in a 'data' property, you would use:
        // setFacilities(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFacilities();
  }, []);
  const handleBookNowClick = (facilityId) => {
    setSelectedFacilityId(facilityId);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div>
        <h1>Most Popular Venues</h1>
        {error && <p>{error}</p>}
        {Array.isArray(facilities) &&
          facilities.map((facility) => (
            <div key={facility.id}>
              {facility.Facility_Image ? (
                <img
                  src={facility.Facility_Image}
                  alt={facility.Name || "Facility image"}
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
              <button onClick={() => handleBookNowClick(facility.id)}>
                Book Now
              </button>
            </div>
          ))}
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        facilityId={selectedFacilityId}
        userId={userId}
      />
    </>
  );
};

export default Home;
