import React, { useState } from "react";
import "../css/CategoryBookingList.css";
import FacilitySlot from "./FacilitySlot";
import PaymentModal from "./PaymentModal";
import BookingModalAgain from "./BookingModalAgain";
import bookingLogo from "../images/booked.png";
import pendingLogo from "../images/pending.png";
import paidLogo from "../images/paid.png";
import refundedLogo from "../images/refunded.png";
import defaultLogo from "../images/default.png";

//Here the main aim is to sort out the bookings based on their category/status
const CategoryBookingList = ({ bookings, HeaderName }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("All");
  //Below are to handle payment
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const bookingsPerPage = 3;

  const refundPayment = async (booking) => {
    if (!booking || !booking.id) {
      console.error("Invalid booking details provided.");
      return;
    }

    try {
      // Assuming the endpoint is `/api/booking/refund/{bookingId}`
      const response = await fetch(
        `http://127.0.0.1:8000/api/booking/refund/${booking.id}`,
        {
          method: "POST", // this could be a POST or PUT request
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
      if (!response.ok) {
        throw new Error("Failed to process refund.");
      }
    } catch (error) {
      console.error("Error processing refund:", error.message);
    }
  };

  const deleteBooking = async (booking) => {
    if (!booking || !booking.id) {
      console.error("Invalid booking details provided.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/booking/${booking.id}`,
        {
          method: "DELETE", // Matching the HTTP method we defined in our Laravel route
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete booking.");
      }

      window.location.reload(); // Close the modal after successful booking
    } catch (error) {
      console.error("Error deleting booking:", error.message);
    }
  };
  //code to open payment modal
  const openPaymentModal = (booking) => {
    setSelectedBooking(booking);
    setShowPaymentModal(true);
  };
  //code to close payment modal
  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  //code to open booking modal
  const openBookingModal = (booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };
  //code to close close modal
  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  const lastIndex = currentPage * bookingsPerPage + bookingsPerPage;
  const firstIndex = lastIndex - bookingsPerPage;

  const statuses = [
    "All",
    ...new Set(bookings.map((booking) => booking.status)),
  ];

  const filteredBookings =
    selectedStatus === "All"
      ? bookings
      : bookings.filter((booking) => booking.status === selectedStatus);

  const currentBookings = filteredBookings.slice(firstIndex, lastIndex);

  const nextPage = () => {
    setCurrentPage((prev) =>
      lastIndex < filteredBookings.length ? prev + 1 : prev
    );
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const renderCard = (booking) => {
    let imageSrc;
    switch (booking.status) {
      case "Booked":
        imageSrc = bookingLogo;
        break;
      case "Pending":
        imageSrc = pendingLogo;
        break;
      case "Paid":
        imageSrc = paidLogo;
        break;
      case "Refunded":
        imageSrc = refundedLogo;
        break;
      default:
        imageSrc = defaultLogo; // If there's a default logo for other cases
    }
    const buttonText =
      booking.status === "Booked" ? "Pay Now" : "Complete Booking";
    const buttonClass =
      booking.status === "Booked" ? "pay-button" : "complete-button";

    return (
      <div className="booking-card" key={booking.id}>
        <img src={imageSrc} alt={booking.status} className="status-image" />
        {/* <p>Facility Id: {booking.facility_id}</p>
        <p>Slot Id: {booking.slot_id}</p> */}
        <FacilitySlot
          facilityId={booking.facility_id}
          slotId={booking.slot_id}
        />
        <p>Status: {booking.status}</p>
        {/* <button className={`action-button ${buttonClass}`}>{buttonText}</button> */}
        {booking.status === "Booked" && (
          <button
            className={`action-button ${buttonClass}`}
            onClick={() => openPaymentModal(booking)}
          >
            {buttonText}
          </button>
        )}

        {booking.status === "Pending" && (
          <button
            className={`action-button ${buttonClass}`}
            onClick={() => openBookingModal(booking)}
          >
            {buttonText}
          </button>
        )}
        {booking.status === "Booked" && (
          <button className="delete" onClick={() => deleteBooking(booking)}>
            Delete Booking
          </button>
        )}
        {booking.status === "Pending" && (
          <button className="delete" onClick={() => deleteBooking(booking)}>
            Cancel
          </button>
        )}
        {booking.status === "Paid" && (
          <button className="delete" onClick={() => refundPayment(booking)}>
            Refund
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bookings-list-container">
      <h1 className="header">{HeaderName}</h1>
      <div className="status-selector">
        <select
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(0);
          }}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="bookings-navigation-container">
        <button
          className="nav-button prev-button"
          onClick={prevPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <div className="booking-container">
          {currentBookings.map(renderCard)}
        </div>
        <button
          className="nav-button next-button"
          onClick={nextPage}
          disabled={lastIndex >= filteredBookings.length}
        >
          Next &#8594;
        </button>
      </div>
      {showPaymentModal && (
        <PaymentModal booking={selectedBooking} onClose={closePaymentModal} />
      )}
      {showBookingModal && (
        <BookingModalAgain
          booking={selectedBooking}
          onClose={closeBookingModal}
        />
      )}
    </div>
  );
};

export default CategoryBookingList;
