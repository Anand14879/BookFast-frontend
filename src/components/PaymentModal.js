import React from "react";
import "../css/PaymentModal.css";
//The Payment Modal is there to make payment of the booking possible
const PaymentModal = ({ booking, onClose }) => {
  if (!booking) return null; // Don't render the modal if there's no booking.

  // Implement payment processing logic here...
  const processPayment = () => {
    console.log("Processing payment for", booking.id);
    // You would have your payment logic here or call to an API
    onClose(); // Close the modal after processing the payment
  };

  return (
    <div className="payment-modal-backdrop">
      <div className="payment-modal">
        <h2>Payment for Booking #{booking.id}</h2>
        <p>Facility Id: {booking.facility_id}</p>
        <p>Slot Id: {booking.slot_id}</p>
        <p>Total Amount: {/* Calculate and show the total amount here */}</p>
        <button onClick={processPayment}>Confirm Payment</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PaymentModal;
