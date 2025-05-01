// components/Carousel.js
import { useState } from 'react';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const items = [
    "ad-imgs/1.png",
    "ad-imgs/15.png",
    "ad-imgs/16.png",
  ]

  const goToPrev = () => {
    const isFirstItem = currentIndex === 0;
    const newIndex = isFirstItem ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastItem = currentIndex === items.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToItem = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button className="carousel-arrow left-arrow" onClick={goToPrev}>
          &lt;
        </button>
        <div className="slide">
          <img
            src={items[currentIndex]}
            className="slide-image"
          />
        </div>
        <button className="carousel-arrow right-arrow" onClick={goToNext}>
          &gt;
        </button>
      </div>
      <div className="dots-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
            onClick={() => goToItem(index)}
          >
            •
          </div>
        ))}
      </div>
    </div>
  );
};
