import React, { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import "./sliderSetting.css";

const SliderSection = ({ title, properties }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [autoSlideInterval, setAutoSlideInterval] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Update window width state when the component mounts
    setWindowWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener('resize', handleWindowResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? properties.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    if (properties.length - currentIndex >= 3) {
      setCurrentIndex((prevIndex) => (prevIndex === properties.length - 1 ? 0 : prevIndex + 1));
    }
  };


  // Update prev/next button visibility based on currentIndex and properties length
  useEffect(() => {
    setShowPrev(currentIndex !== 0);
    setShowNext(properties.length > 3 || currentIndex < properties.length - 3);
  }, [currentIndex, properties]);

  return (
    <div className="slider-frame" style={{ position: 'relative' }}>
      <button className="custom-prev-btn" onClick={prevSlide} disabled={!showPrev}>&#10094;</button>
      <div className="slider">
        <div className="slider-header">
          <span className="primaryText">{title}</span>
        </div>
        <div className="properties-container">
          <div className="properties-row" style={{ display: 'flex', flexDirection: 'row' }}>
            {properties.slice(currentIndex, currentIndex + (windowWidth < 768 ? 1 : 3)).map((card, i) => (
              <div className="property-card" key={i}>
                <PropertyCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="custom-next-btn" onClick={nextSlide} disabled={!showNext}>&#10095;</button>
    </div>
  );
};

export default SliderSection;
