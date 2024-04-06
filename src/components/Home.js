import React, { useState, useEffect } from "react";
import Header from "./Header";
import BookingModal from "./BookingModal"; // Import the Modal component
// import FacilitiesList from "./FacilitiesList";
import CategoryFacilityList from "./CategoryFacilityList";

const Home = () => {
  const [facilities, setFacilities] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacilityId, setSelectedFacilityId] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUserName(user.name);
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
    // console.log(userId);
    if (userId) {
      setSelectedFacilityId(facilityId);
      setIsModalOpen(true);
    } else {
      window.location.href = "http://localhost:3000/login";
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <CategoryFacilityList
        facilities={facilities}
        handleBookNowClick={handleBookNowClick}
        HeaderName={"Categories"}
      />
      {/* <FacilitiesList
        facilities={facilities}
        handleBookNowClick={handleBookNowClick}
        HeaderName={"Popular Venues"}
      /> */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        facilityId={selectedFacilityId}
        userId={userId}
        userName={userName}
        facilities = {facilities}
      />
    </>
  );
};

export default Home;
