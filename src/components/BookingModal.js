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
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

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

  const displayPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const closeAndHandleResponse = async (response, successMessage) => {
    try {
      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(
          responseBody.message || "There was an error processing your request."
        );
      }
      console.log(responseBody.message);
      displayPopup(successMessage);

      // Set a timeout to close the modal AFTER the pop-up disappears
      setTimeout(() => {
        onClose(); // Close the modal after the pop-up has been displayed for 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Server response not OK:", error);
      displayPopup(error.toString());
      // We may not want to close the modal immediately if there is an error,
      // to give the user a chance to read the message and decide on next steps.
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
      await closeAndHandleResponse(
        response,
        "Your booking is saved as pending."
      );
    } catch (error) {
      console.error("Failed to save the slot for later:", error);
      displayPopup("Failed to save the slot. Please try again later.");
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
      await closeAndHandleResponse(response, "You have booked this facility.");
    } catch (error) {
      console.error("Failed to complete the booking:", error);
      displayPopup("Failed to complete the booking. Please try again later.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="myAppModal">
      <div className="myAppModal-content">
        {showPopup && <div className="popup">{popupMessage}</div>}

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
