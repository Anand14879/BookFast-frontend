import React, { useState, useEffect } from "react";

const FacilitySlot = ({ facilityId, slotId, info }) => {
  const [facilityDetails, setFacilityDetails] = useState({});
  const [slotDetails, setSlotDetails] = useState({});

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/facilities/${facilityId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch facility details");
        }
        const data = await response.json();
        setFacilityDetails(data);
      } catch (error) {
        console.error("Error fetching facility details:", error);
        // Handle the error appropriately in your app
      }
    };

    const fetchSlotDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/slots/${slotId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch slot details");
        }
        const data = await response.json();
        setSlotDetails(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching facility details:", error);
        // Handle the error appropriately in your app
      }
    };

    fetchFacilityDetails();
    fetchSlotDetails();
  }, [facilityId, slotId]);

  return (
    <div className="facility-slot-details">
      <h3>{info}</h3>
      <p>Name: {facilityDetails.Name}</p>
      <p>Institution Name: {facilityDetails.Institution_Name}</p>
      <p>Facility Cost: Rs. {facilityDetails.Daily_Cost}</p>
      <p>Date: {slotDetails.Date}</p>
    </div>
  );
};

export default FacilitySlot;
