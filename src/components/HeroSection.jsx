import React from 'react';
import '../App.css';

export default function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <div className="hero-content">
          <div className="subtitle">Save The Date</div>
          <h1>Ahmed & Ethar</h1>
          <div className="subtitle">For the Wedding Ceremony</div>

          <div className="date-box">
            <div>On</div>
            <span>09 / 08 / 2025</span>
            <div>at 8:00 PM</div>
          </div>

          <div className="location">
            Wady Elamar Hall<br />
            Elmahala Tanta Road
          </div>

          <a
            className="map-link"
            href="https://maps.app.goo.gl/ah1si1mD79fRCBWQ9"
            target="_blank"
            rel="noreferrer"
          >
            View Location on Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
