import React from "react";
import "../css/BookingModal.css";

const BookingModal = ({ isOpen, onClose, facilityId, userId }) => {
  // console.log("Modal rendering, isOpen:", isOpen);

  if (!isOpen) return null;

  return (
    <div className="myAppModal">
      <div className="myAppModal-content">
        <h2>Book Facility (ID: {facilityId})</h2>
        <h2>User (ID: {userId})</h2>
        {/* Add form or booking details here */}

        <button onClick={onClose}>Close</button>
      </div>
      <div className="myAppModal-overlay" onClick={onClose} />
    </div>
  );
};

export default BookingModal;
