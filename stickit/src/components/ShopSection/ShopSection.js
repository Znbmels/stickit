import React from 'react';
import './ShopSection.css';

const ShopSection = () => {
  return (
    <div className="shop-section">
      {/* Контейнер с надписью SHOP и кнопкой Visit Shop */}
      <div className="shop-header">
        <h2 className="shop-title">SHOP</h2>
        <button className="visit-shop-button">Visit Shop</button>
      </div>
      {/* Контейнер с квадратными кнопками */}
      <div className="shop-categories">
        <a href="#sticks" className="category-item" id="sticks">STICKS</a>
        <a href="#skates" className="category-item" id="skates">SKATES</a>
        <a href="#helmets" className="category-item" id="helmets">HELMETS</a>
        <a href="#pads" className="category-item" id="pads">PADS</a>
        <a href="#bags" className="category-item" id="bags">BAGS & ACCESSORIES</a>
        <a href="#other" className="category-item" id="other">OTHER</a>
      </div>
    </div>
  );
};

export default ShopSection;