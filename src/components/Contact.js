// Contact.js

import React, { useState } from "react";
import Header from "./Header";
import "../css/Contact.css"; // Ensure to create this CSS file

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // POST request with fetch API
    fetch("http://127.0.0.1:8000/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Show popup message
        setShowPopup(true);
        // Clear form fields by resetting the formData state
        setFormData({
          name: "",
          email: "",
          description: "",
        });
        console.log("Success:", data);
        // Hide popup after 3 seconds
        setTimeout(() => setShowPopup(false), 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <Header />
      {showPopup && (
        <div className="popup-message">
          <p>Your questions have been delivered.</p>
        </div>
      )}
      <div className="contact-background">
        <div className="contact-card">
          <div className="contact-form-section">
            <h2>Contact Us</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="name"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={handleChange}
              />
              <textarea
                name="description"
                placeholder="tell us all about it"
                onChange={handleChange}
              ></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
          <div className="contact-info-section">
            <h2>Open hours</h2>
            <p>Monday - Saturday</p>
            <p>8am - 9pm</p>
            <p>Closed on Sunday</p>
            <h2>Address</h2>
            <p>243 Basundhara Marg, KTM</p>
            <h2>Contact</h2>
            <p>support@csg.com</p>
            <p>+977 98412341234</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
