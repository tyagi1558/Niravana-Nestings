import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Slider from "react-slick";

import "./Residencies.css";
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from 'react-spinners'

const Residencies = () => {
  const { data, isError, isLoading } = useProperties()

  if (isError) {
    return (
      <div className='wrapper'>
        <span>Error while fetching data</span>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    )
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // Adjust the autoplay speed here (in milliseconds)
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
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>
        <Slider {...settings} beforeChange={handleImageLoad}>
          {/* slider */}
          {data.slice(0, 8).map((card, i) => (
            <SwiperSlide key={i}>
              <PropertyCard card={card} />
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Residencies;
