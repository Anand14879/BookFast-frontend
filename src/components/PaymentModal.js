import React, { useState, useEffect } from "react";
import "../css/PaymentModal.css";
import FacilitySlot from "./FacilitySlot";
import HandleKhaltiPayment from "./HandleKhaltiPayment";

const PaymentModal = ({ booking, onClose }) => {
  const [amount, setAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      // Assuming you have an endpoint `/api/facility/details` that accepts a facility_id and returns facility details
      const response = await fetch(
        `http://127.0.0.1:8000/api/facility/details?facility_id=${booking.facility_id}`
      );
      const data = await response.json();
      setAmount(data.Daily_Cost * 1.1); // Set the fetched amount Plus 10% charge for app
    };

    if (booking) {
      fetchFacilityDetails();
    }
  }, [booking]);

  const processPayment = async () => {
    setIsProcessing(true);
    try {
      // Assuming `/api/payment/add` is your endpoint for adding a new payment
      const response = await fetch("http://127.0.0.1:8000/api/payment/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          payment_date: new Date().toISOString().slice(0, 10), // e.g., YYYY-MM-DD
          payment_status: "completed", // Assuming a simple status
          booking_id: booking.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment processing failed");
      }
      window.location.reload();
      onClose(); // Close the modal after processing the payment
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!booking) return null;

  return (
    <div className="payment-modal-backdrop">
      <div className="payment-modal">
        <h2>Payment for Booking #{booking.id}</h2>
        {/* <p>Facility Id: {booking.facility_id}</p>
        <p>Slot Id: {booking.slot_id}</p> */}
        <FacilitySlot
          facilityId={booking.facility_id}
          slotId={booking.slot_id}
          info="Facility Details"
        />
        <p>Booking Charge: {"10%"}</p>
        <p>Total Amount: {amount}</p>
        {/* Going to integrate Khalti payement here */}
        <button onClick={HandleKhaltiPayment}>Esewa Payment</button>
        {/* <></> */}
        <button onClick={processPayment} disabled={isProcessing}>
          Confirm Payment
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PaymentModal;
