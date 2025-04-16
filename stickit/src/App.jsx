import React from 'react';
import TopBar from './components/TopBar/TopBar';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import ListImage from './assets/List.jpg';
import FavoriteLabel from './components/FavoriteLabel/FavoriteLabel';
import VideoSection from './components/VideoSection/VideoSection';
import ShopSection from './components/ShopSection/ShopSection';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const searchItems = [
    { id: 'sticks', name: 'STICKS', type: 'category' },
    { id: 'skates', name: 'SKATES', type: 'category' },
    { id: 'helmets', name: 'HELMETS', type: 'category' },
    { id: 'pads', name: 'PADS', type: 'category' },
    { id: 'bags', name: 'BAGS & ACCESSORIES', type: 'category' },
    { id: 'other', name: 'OTHER', type: 'category' },
    { id: 'favorite-skate-1', name: 'Hockey Skate 1', type: 'favorite', price: 150 },
    { id: 'favorite-stick', name: 'Hockey Stick', type: 'favorite', price: 100 },
    { id: 'favorite-helmet', name: 'Hockey Helmet', type: 'favorite', price: 80 },
    { id: 'favorite-skate-2', name: 'Hockey Skate 2', type: 'favorite', price: 160 },
  ];

  return (
    <CartProvider>
      <div className="app">
        <TopBar />
        <Header searchItems={searchItems} />
        <div className="content-placeholder">
          <HeroSection />
          <img
            src={ListImage}
            alt="List"
            style={{ width: '100%', maxWidth: '1200px', marginTop: '10px' }}
          />
          <FavoriteLabel />
          <VideoSection />
          <ShopSection categories={searchItems.filter((item) => item.type === 'category')} />
          <Cart />
          <Footer />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;