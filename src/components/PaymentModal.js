import React, { useState, useEffect } from "react";
import "../css/PaymentModal.css";
import FacilitySlot from "./FacilitySlot";

const PaymentModal = ({ booking, onClose }) => {
  const [amount, setAmount] = useState(0);
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUsername(user.name); // Assuming that the ID is stored with the key 'id'
      setEmail(user.email);
      setPhone(user.phone);
    }

    const fetchFacilityDetails = async () => {
      // Assuming you have an endpoint `/api/facility/details` that accepts a facility_id and returns facility details
      const response = await fetch(
        `http://127.0.0.1:8000/api/facility/details?facility_id=${booking.facility_id}`
      );
      const data = await response.json();
      // console.log(data.Daily_Cost)
      setAmount(parseInt(data.Daily_Cost * 1.1));
      // console.log(amount);
      // Set the fetched amount Plus 10% charge for app
    };

    if (booking) {
      fetchFacilityDetails();
    }
  }, [booking]);

  const initiateKhaltiPayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/khalti-initiate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId: booking.id,
            amount: amount,
            name: name,
            email: email,
            phone: phone, // Ensure 'amount' is defined appropriately in the context
          }),
        }
      );

      if (!response.ok) {
        // Fixed the check here from `response.of` to `response.ok`
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.payment_url) {
        // Redirect the user to the Khalti payment page
        window.location.href = data.payment_url;
      } else {
        // Handle any errors that come from your backend
        console.error("Error initiating payment:", data.error);
      }
    } catch (error) {
      console.error("Failed to initiate payment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

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
          info="Facility Details"
        />
        <p>Booking Charge: {"10%"}</p>
        <p>Total Amount: {amount}</p>
        {/* Going to integrate Khalti payement here */}
        <button onClick={initiateKhaltiPayment}>Khalti Payment</button>
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
