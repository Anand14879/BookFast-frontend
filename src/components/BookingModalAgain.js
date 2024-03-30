import React, { useState } from "react";
import "../css/BookingModalAgain.css";

const BookingModalAgain = ({ booking, onClose }) => {
  const [error, setError] = useState(null);

  if (!booking) return null; // Don't render the modal if there's no booking

  const completeBooking = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/completebookingstatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: booking.user_id,
            facility_id: booking.facility_id,
            slot_id: booking.slot_id,
            status: "Booked", // Indicating the desired status explicitly
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "HTTP error!");
      }

      //   const data = await response.json();
      //   console.log("Booking completed:", data);

      onClose();
      window.location.reload(); // Close the modal after successful booking
    } catch (error) {
      console.error("Failed to complete the booking:", error);
      setError(error.message); // Set error state
    }
  };

  return (
    <div className="booking-modal-backdrop">
      <div className="booking-modal">
        <h2>Complete Booking for #{booking.id}</h2>
        <p>Facility Id: {booking.facility_id}</p>
        <p>Slot Id: {booking.slot_id}</p>
        {error && <p className="error-message">Error: {error}</p>}
        <button onClick={completeBooking}>Complete Booking</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default BookingModalAgain;
