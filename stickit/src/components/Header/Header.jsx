import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

function Header({ searchItems }) {
  const { cartItems } = useCart();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isAboutPopupVisible, setIsAboutPopupVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const aboutRef = useRef(null);
  const inputRef = useRef(null); // Добавляем реф для поля ввода

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query) {
      const results = searchItems.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (item) => {
    document.querySelectorAll('.category-item, .photo-item').forEach((item) => {
      item.classList.remove('highlighted');
    });

    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.classList.add('highlighted');
    }

    setSearchQuery('');
    setSearchResults([]);
    setIsSearchVisible(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
    if (!isSearchVisible && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0); // Автофокус на поле ввода
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
        setSearchResults([]);
        setSearchQuery('');
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target)) {
        setIsAboutPopupVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <nav className="categories">
          <a href="#sticks">STICKS</a>
          <a href="#skates">SKATES</a>
          <a href="#helmets">HELMETS</a>
          <a href="#pads">PADS</a>
          <a href="#bags">BAGS & ACCESSORIES</a>
        </nav>
        <div className="right-section">
          <div
            className="about-wrapper"
            ref={aboutRef}
            onMouseEnter={() => setIsAboutPopupVisible(true)}
            onMouseLeave={() => setIsAboutPopupVisible(false)}
          >
            <a href="#about">ABOUT</a>
            {isAboutPopupVisible && (
              <div className="about-popup">
                <p>StickIT - Your Ultimate Hockey Gear Destination</p>
              </div>
            )}
          </div>
          <a href="#profile">PROFILE</a>
          <div className="search-wrapper" ref={searchRef}>
            <FaSearch className="search-icon" onClick={toggleSearch} />
            {isSearchVisible && (
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  value={searchQuery}
                  onChange={handleSearch}
                  ref={inputRef} // Привязываем реф к полю ввода
                />
                {searchResults.length > 0 && (
                  <div className="search-results">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="search-result-item"
                        onClick={() => handleResultClick(result)}
                      >
                        {result.name} {result.type === 'favorite' && `($${result.price})`}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <a href="#favorites">
            <FaHeart className="fav-icon" />
          </a>
          <a href="#cart" className="cart-icon-wrapper"> {/* Убрали точку */}
            <FaShoppingCart className="cart-icon" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;