import React, { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
    <div className="slider-frame">
      <div className="slider-header">
        <span className="primaryText">{title}</span>
       
      </div>
      <div className="slider-content">
        <div className="properties-container">
          {properties.slice(currentIndex, currentIndex + 3).map((card, i) => ( // Display 4 cards
            <div className="property-card" key={i}>
              <PropertyCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSection;
