// About.js
import React from "react";
import Header from "./Header";
import "../css/About.css"; // make sure to create this CSS file
import logo from "../images/team.webp";

const About = () => {
  return (
    <>
      <Header />
      <div className="about-page">
        <section className="about-header">
          <h1>About</h1>
          <p>
            Get to know the creative minds behind BookFast and discover our
            commitment to pushing artistic boundaries and delivering exceptional
            design solutions.
          </p>
        </section>
        <section className="about-main">
          <div className="about-image">
            <img src={logo} alt="Our Team" />
          </div>
          <div className="about-content">
            <h2>Our Philosophy</h2>
            <p>
              At BookFast, our success is a symphony of creativity, expertise,
              and relentless dedication, harmonized by our incredible team.
            </p>
            <p>
              We invite you to embark on a journey to discover the individuals
              who wield their unique talents, day in and day out, to transform
              your digital aspirations into vivid reality.
            </p>
            <p>
              Our team is more than just a collection of professionals; we are a
              close-knit family united by a shared passion for innovation and
              excellence.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
