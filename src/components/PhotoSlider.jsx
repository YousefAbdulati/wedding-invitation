import React, { useEffect, useState, useRef } from 'react';
import '../App.css';

const images = ['img/p2.png', 'img/p3.jpg', 'img/p4.jpg'];

export default function PhotoSlider() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToSlide = (i) => setIndex(i);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      const swipeThreshold = 50; 
      if (distance > swipeThreshold) {
        nextSlide();
        resetTimer();
      } else if (distance < -swipeThreshold) {
        prevSlide();
        resetTimer();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section id="photos" className="image-slider section">
      <div className="container">
        <h2 className="section-title">Our Photos</h2>
        <div
          className="slider-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="slider"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((src, i) => (
              <div className="slider-item" key={i}>
                <img src={src} alt={`Image ${i + 1}`} />
              </div>
            ))}
          </div>
          <a
            className="prev"
            onClick={() => {
              prevSlide();
              resetTimer();
            }}
          >
            &#10094;
          </a>
          <a
            className="next"
            onClick={() => {
              nextSlide();
              resetTimer();
            }}
          >
            &#10095;
          </a>
        </div>
        <div className="slider-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={i === index ? 'active' : ''}
              onClick={() => {
                goToSlide(i);
                resetTimer();
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
