import React, { useEffect, useState, useCallback } from "react";
import "../css/BookingModal.css";

const BookingModal = ({ isOpen, onClose, facilityId, userId }) => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

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
      // Optionally, pre-select the first slot
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

  const saveForLater = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/saveforlater", {
        // Ensure this URL is correct
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include authentication tokens if required
        },
        body: JSON.stringify({
          user_id: userId, // Ensure the keys match those expected by the server
          facility_id: facilityId,
          slot_id: selectedSlot,
        }),
      });

      if (!response.ok) {
        // If the server response is not ok, log the status and statusText
        console.error(
          "Server response not OK:",
          response.status,
          response.statusText
        );
        const errorText = await response.text(); // Read the text from the response
        console.error("Server response:", errorText);
        // Handle non-OK response here, perhaps set an error message in your state
      } else {
        const data = await response.json();
        console.log(data.message);
        // Handle successful response here
      }
    } catch (error) {
      console.error("Failed to save the slot for later:", error);
      // Handle fetch errors here
    }
  };

  const completeBooking = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/completebooking",
        {
          // Ensure this URL is correct
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include authentication tokens if required
          },
          body: JSON.stringify({
            user_id: userId, // Ensure the keys match those expected by the server
            facility_id: facilityId,
            slot_id: selectedSlot,
          }),
        }
      );

      if (!response.ok) {
        // If the server response is not ok, log the status and statusText
        console.error(
          "Server response not OK:",
          response.status,
          response.statusText
        );
        const errorText = await response.text(); // Read the text from the response
        console.error("Server response:", errorText);
        // Handle non-OK response here, perhaps set an error message in your state
      } else {
        const data = await response.json();
        console.log(data.message);
        // Handle successful response here
      }
    } catch (error) {
      console.error("Failed to save the slot for later:", error);
      // Handle fetch errors here
    }
  };

  if (!isOpen) return null;

  return (
    <div className="myAppModal">
      <div className="myAppModal-content">
        <h2>Book Facility (ID: {facilityId})</h2>
        <h2>User (ID: {userId})</h2>
        {slots.length > 0 ? renderSlots() : <p>No available slots.</p>}
        {/* Add form or booking details here */}
        <button onClick={saveForLater}>Save For Later</button>
        <button onClick={completeBooking}>Complete Booking</button>

        <button onClick={onClose}>Close</button>
      </div>
      <div className="myAppModal-overlay" onClick={onClose} />
    </div>
  );
};

export default BookingModal;
