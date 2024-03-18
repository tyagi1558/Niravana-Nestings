import React, { useState,useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard';

const SliderSection = ({ title, properties }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? properties.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === properties.length - 1 ? 0 : prevIndex + 1));
  };

  // Update prev/next button visibility based on currentIndex and properties length
  useEffect(() => {
    setShowPrev(currentIndex !== 0);
    setShowNext(currentIndex !== properties.length - 1);
  }, [currentIndex, properties]);

  return (
    <div className="slider">
      <div className="slider-header">
        <span className="primaryText">{title}</span>
        <div className="slider-controls">
          <button className="prev-btn" onClick={prevSlide} disabled={!showPrev}>&#10094;</button>
          <button className="next-btn" onClick={nextSlide} disabled={!showNext}>&#10095;</button>
        </div>
      </div>
      <div className="properties-container">
        {properties.slice(currentIndex, currentIndex + Math.min(3, properties.length)).map((card, i) => (
          <div className="property-card" key={i}>
            <PropertyCard card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderSection;
