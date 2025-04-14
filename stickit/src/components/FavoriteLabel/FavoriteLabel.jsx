import React, { useRef, useState, useEffect } from 'react';
import './FavoriteLabel.css';
import { useCart } from '../../context/CartContext';

import photo1 from '../../assets/photo1.jpg';
import photo2 from '../../assets/photo2.jpg';
import photo3 from '../../assets/photo3.jpg';
import photo4 from '../../assets/photo4.jpg';

const FavoriteLabel = ({ leftOffset = 10 }) => {
  const { addToCart } = useCart();
  const photosContainerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const items = [
    { id: 'favorite-skate-1', name: 'Hockey Skate 1', price: 150, image: photo1 },
    { id: 'favorite-stick', name: 'Hockey Stick', price: 100, image: photo2 },
    { id: 'favorite-helmet', name: 'Hockey Helmet', price: 80, image: photo3 },
    { id: 'favorite-skate-2', name: 'Hockey Skate 2', price: 160, image: photo4 },
  ];

  const duplicatedItems = [...items, ...items, ...items, ...items, ...items, ...items];

  const handleBuyNow = (item) => {
    addToCart(item);
    alert(`${item.name} added to cart!`);
  };

  const scrollLeft = () => {
    if (photosContainerRef.current) {
      let start = photosContainerRef.current.scrollLeft;
      const end = start - 350;
      const duration = 500; // Длительность анимации в миллисекундах
      const startTime = performance.now();
  
      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress * (2 - progress); // Ease-in-out эффект
  
        photosContainerRef.current.scrollLeft = start + (end - start) * ease;
  
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
  
      requestAnimationFrame(animateScroll);
    }
  };
  
  const scrollRight = () => {
    if (photosContainerRef.current) {
      let start = photosContainerRef.current.scrollLeft;
      const end = start + 350;
      const duration = 500;
      const startTime = performance.now();
  
      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress * (2 - progress);
  
        photosContainerRef.current.scrollLeft = start + (end - start) * ease;
  
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
  
      requestAnimationFrame(animateScroll);
    }
  };
  // Бесконечная прокрутка с помощью JavaScript
  useEffect(() => {
    const container = photosContainerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollSpeed = 1; // Скорость прокрутки (пиксели за кадр)
    const maxScroll = container.scrollWidth / 2; // Прокручиваем до половины, так как элементы дублируются

    const scroll = () => {
      if (!isHovered) {
        scrollAmount += scrollSpeed;
        container.scrollLeft = scrollAmount;

        // Если достигли половины пути, возвращаемся в начало
        if (scrollAmount >= maxScroll) {
          scrollAmount = 0;
          container.scrollLeft = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <div className="favorite-wrapper" id="favorites">
      <div className="favorite-container" style={{ paddingLeft: `${leftOffset}px` }}>
        <span className="favorite-text">Favorite</span>
      </div>
      <div
        className="photos-container"
        ref={photosContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="photos-inner">
          {duplicatedItems.map((item, index) => (
            <div className="photo-item" id={`${item.id}-${index}`} key={`${item.id}-${index}`}>
              <img src={item.image} alt={item.name} />
              <button
                className="buy-now-button"
                onClick={() => handleBuyNow(item)}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
        {isHovered && (
          <>
            <button className="scroll-arrow left" onClick={scrollLeft}>
              ←
            </button>
            <button className="scroll-arrow right" onClick={scrollRight}>
              →
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoriteLabel;