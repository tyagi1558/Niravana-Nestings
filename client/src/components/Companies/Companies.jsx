import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Companies.css';

const Companies = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 800, // Adjust the autoplay speed here (in milliseconds)
    pauseOnHover: true,
    // Remove the previous arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Function to maintain aspect ratio of logos
  const handleImageLoad = (index) => {
    const imgElements = document.querySelectorAll('.c-slide img');
    const firstImage = imgElements[index];
    if (firstImage) {
      const aspectRatio = firstImage.width / firstImage.height;
      imgElements.forEach(img => {
        img.style.height = `${img.offsetWidth / aspectRatio}px`;
      });
    }
  };

  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth">
        <Slider {...settings} beforeChange={handleImageLoad}>
          <div className="c-slide">
            <img src="./godrej1.png" alt="" />
          </div>
        
          <div className="c-slide">
            <img src="./equinix.png" alt="" />
          </div>
          <div className="c-slide">
            <img src="./tower.png" alt="" />
          </div>
          <div className="c-slide">
            <img src="./equinix.png" alt="" />
          </div>
          <div className="c-slide">
            <img src="./Emaar.png" alt="" />
          </div>
          <div className="c-slide">
            <img src="./realty.png" alt="" />
          </div>
          <div className="c-slide">
            <img src="./DLF.png" alt="" />
          </div>
          <div className="c-slide">
            <img src="./elan.png" alt="" />
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Companies;
