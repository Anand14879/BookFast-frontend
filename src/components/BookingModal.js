import React, { useEffect, useState, useCallback } from "react";
import "../css/BookingModal.css";
import generalLogo from "../images/general.jpg";
import sportLogo from "../images/sport.jpg";

const BookingModal = ({
  isOpen,
  onClose,
  facilityId,
  userId,
  userName,
  facilities,
}) => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const facility = facilities.find((facility) => facility.id === facilityId);

  const fetchSlots = useCallback(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/slots/${facilityId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSlots(data);
      if (data.length > 0) {
        setSelectedSlot(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  }, [facilityId]);

  useEffect(() => {
    if (isOpen) {
      fetchSlots();
    }
  }, [isOpen, fetchSlots]);

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const renderSlots = () => {
    return (
      <div>
        <p>Available Dates</p>
        <select value={selectedSlot} onChange={handleSlotChange}>
          {slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.date} (Slot ID: {slot.id})
            </option>
          ))}
        </select>
      </div>
    );
  };

  const closeAndHandleResponse = async (response) => {
    if (!response.ok) {
      console.error(
        "Server response not OK:",
        response.status,
        response.statusText
      );
      const errorText = await response.text();
      console.error("Server response:", errorText);
    } else {
      const data = await response.json();
      console.log(data.message);
      onClose(); // Close the modal after successful operation
    }
  };

  const saveForLater = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/saveforlater", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          facility_id: facilityId,
          slot_id: selectedSlot,
        }),
      });
      await closeAndHandleResponse(response);
    } catch (error) {
      console.error("Failed to save the slot for later:", error);
    }
  };

  const completeBooking = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/completebooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            facility_id: facilityId,
            slot_id: selectedSlot,
          }),
        }
      );
      await closeAndHandleResponse(response);
    } catch (error) {
      console.error("Failed to complete the booking:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="myAppModal">
      <div className="myAppModal-content">
        <img
          src={
            facility && facility.Facility_Image === "general.jpg"
              ? generalLogo
              : sportLogo
          }
          alt={facility ? facility.Name : "Facility"}
          className="myfacility-image"
        />
        <h2>Book Facility (ID: {facilityId})</h2>
        <h2>User (ID: {userId})</h2>
        <h2>User (Name: {userName})</h2>
        {facility ? (
          <>
            <h2>Facility (Name: {facility.Name})</h2>
            <div className="facility-description">
              <p>Facility (Description: {facility.Description})</p>
            </div>
          </>
        ) : (
          <p>Facility details not found.</p>
        )}
        {slots.length > 0 ? (
          <>
            {renderSlots()}
            <button onClick={saveForLater}>Save For Later</button>
            <button onClick={completeBooking}>Complete Booking</button>
          </>
        ) : (
          <p>No available slots.</p>
        )}
        <button onClick={onClose}>Close</button>
      </div>
      <div className="myAppModal-overlay" onClick={onClose}></div>
    </div>
  );
};

export default BookingModal;
