import React, { useState, useEffect } from "react";

const SlotDate = ({ slot_id }) => {
  // const [slotid, setSlotId] = useState([]);
  const [slotDetails, setSlotDetails] = useState([]);

  // setSlotId(slot_id);

  useEffect(() => {
    const fetchSlotDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/slots/${slot_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch slot details");
        }
        const data = await response.json();
        setSlotDetails(() => data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching slot details:", error);
      }
    };

    fetchSlotDetails();
  }, [slot_id]);

  return (
    // <div>{<p>Date: {slotDetails[0]?.date}</p>}</div>
    <div>{<p>Date: {slotDetails.date}</p>}</div>
  );
};

export default SlotDate;
