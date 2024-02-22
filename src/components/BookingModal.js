// BookingModal.js
import React from "react";
import "../css/BookingModal.css";

const BookingModal = ({ isOpen, onClose, facilityId, userId }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Book Facility (ID: {facilityId})</h2>
        <h2>User (ID: {userId})</h2>
        {/* Add form or booking details here */}
        <button onClick={onClose}>Close</button>
      </div>
      <div className="modal-overlay" onClick={onClose} />
    </div>
  );
};

export default BookingModal;
