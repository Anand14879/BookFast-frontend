import React, { useState } from "react";
import "../css/CategoryBookingList.css";
import PaymentModal from "./PaymentModal";

//Here the main aim is to sort out the bookings based on their category/status
const CategoryBookingList = ({ bookings, HeaderName }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("All");
  //Below are to handle payment
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const bookingsPerPage = 3;

  //code to open payment modal
  const openPaymentModal = (booking) => {
    setSelectedBooking(booking);
    setShowPaymentModal(true);
  };
  //code to close payment modal
  const closePaymentModal = () => {
    setShowPaymentModal(false);
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
    const imageSrc = booking.status === "Booked" ? "booked.png" : "pending.png";
    const buttonText =
      booking.status === "Booked" ? "Pay Now" : "Complete Booking";
    const buttonClass =
      booking.status === "Booked" ? "pay-button" : "complete-button";

    return (
      <div className="booking-card" key={booking.id}>
        <img src={imageSrc} alt={booking.status} className="status-image" />
        <p>Facility Id: {booking.facility_id}</p>
        <p>Slot Id: {booking.slot_id}</p>
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
    </div>
  );
};

export default CategoryBookingList;
