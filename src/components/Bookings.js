import React, { useState, useEffect } from "react";
import Header from "./Header";
import CategoryBookingsList from "./CategoryBookingList";
// This is the bookings page where we can see all of the bookings made or which are pending
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUserId(user.id); // Assuming that the ID is stored with the key 'id'
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/bookings/${userId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]); // userId is included as a dependency here

  return (
    <>
      <Header />
      {error && <div className="error">Error: {error}</div>}
      <CategoryBookingsList bookings={bookings} HeaderName={"All Bookings"} />
    </>
  );
};

export default Bookings;
