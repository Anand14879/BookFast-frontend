// Contact.js
import React from "react";
import Header from "./Header";
import "../css/Contact.css"; // Ensure to create this CSS file

const Contact = () => {
  return (
    <>
      <Header />
      <div className="contact-background">
        <div className="contact-card">
          <div className="contact-form-section">
            <h2>Contact Us</h2>
            <form className="contact-form">
              <input type="text" placeholder="name" />
              <input type="email" placeholder="email" />
              <textarea placeholder="tell us all about it"></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
          <div className="contact-info-section">
            <h2>Open hours</h2>
            <p>Monday - Saturday</p>
            <p>8am - 9pm</p>
            <p>Closed on Sunday</p>
            <h2>Address</h2>
            <p>213 Olive Street, NAC</p>
            <h2>Contact</h2>
            <p>support@csg.com</p>
            <p>+1234567890</p>
            <h2>Socials</h2>
            {/* Social icons here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
