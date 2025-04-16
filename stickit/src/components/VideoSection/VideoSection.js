import React from 'react';
import './VideoSection.css';
import video from '../../assets/video.mp4'; // Импортируем видео

const VideoSection = () => {
  return (
    <div className="video-section">
      <video
        autoPlay // Автопроигрывание
        loop // Зацикливание
        muted // Без звука
        playsInline // Для корректного воспроизведения на мобильных устройствах
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <div className="text-container">
          <h2 className="video-title">Give Your Gear Second Life</h2>
          <button className="sell-now-button">Sell Now</button>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;