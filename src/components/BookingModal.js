import React, { useEffect, useState, useCallback } from "react";
import "../css/BookingModal.css";

const BookingModal = ({ isOpen, onClose, facilityId, userId }) => {
  const [slots, setSlots] = useState([]);

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
    } catch (error) {
      console.error("Error fetching slots:", error);
      // Handle the error based on your use case
    }
  }, [facilityId]); // Dependency array for useCallback

  useEffect(() => {
    if (isOpen) {
      fetchSlots();
    }
  }, [isOpen, fetchSlots]);

  if (!isOpen) return null;

  const renderSlots = () => {
    return slots.map((slot) => (
      <div key={slot.id}>
        <p>Slot ID: {slot.id}</p>
        {/* Render other slot details here */}
      </div>
    ));
  };

  return (
    <div className="myAppModal">
      <div className="myAppModal-content">
        <h2>Book Facility (ID: {facilityId})</h2>
        <h2>User (ID: {userId})</h2>
        {slots.length > 0 ? renderSlots() : <p>No available slots.</p>}
        {/* Add form or booking details here */}
        <button onClick={onClose}>Close</button>
      </div>
      <div className="myAppModal-overlay" onClick={onClose} />
    </div>
  );
};

export default BookingModal;
