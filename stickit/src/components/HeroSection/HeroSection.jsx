import React from 'react';
import './HeroSection.css';
import heroImage from '../../assets/hero-image.jpg';

function HeroSection() {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <h1 className="hero-title">
          Buy, Sell & Trade <br /> Hockey <br /> Equipment Easily
        </h1>
        <button className="shop-now-button">Shop Now</button>
      </div>
    </section>
  );
}

export default HeroSection;