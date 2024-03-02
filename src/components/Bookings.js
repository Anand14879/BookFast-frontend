import React, { useState, useEffect } from "react";
import Header from "./Header";
import CategoryBookingsList from "./CategoryBookingList";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/bookings");
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <Header />
      {error && <div className="error">Error: {error}</div>}
      <CategoryBookingsList bookings={bookings} HeaderName={"All Bookings"} />
    </>
  );
};

export default Bookings;
