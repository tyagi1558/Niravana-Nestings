import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Properties.css';
import useProperties from '../../hooks/useProperties';
import { PuffLoader } from 'react-spinners';
import PropertyCard from "../../components/PropertyCard/PropertyCard"; // Import PropertyCard component

import SliderSection from '../../components/sliderSetting/SliderSection'; // Import SliderSection
// Import Swiper and other necessary dependencies

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState('');

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: '60vh' }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  // Filter data based on type, city, or address
  const filteredProperties = data.filter(property =>
    property.type.toLowerCase().includes(filter.toLowerCase()) ||
    property.city.toLowerCase().includes(filter.toLowerCase()) ||
    property.address.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
      <SearchBar filter={filter} setFilter={setFilter} />

{/* Display searched properties */}
{filter && filteredProperties.length > 0 && (
  <div className="paddings innerWidth r-container">
    <div className="flexColStart r-head">
      <span className="primaryText">Your Searched Properties</span>
    </div>
    <div className="property-container">
      {filteredProperties.slice(0, 8).map((card, i) => (
        <div className="property-card" key={i}>
          <PropertyCard card={card} />
        </div>
      ))}
    </div>
  </div>
)}

        {/* Display other sections only if no search filter is applied */}
        {!filter && (
          <div className="grid-container">
            {/* Future Projects Section */}
            <div className="grid-item">
              <SliderSection
                title="Future Projects"
                properties={data.filter(property => property.type.toLowerCase() === 'feature project')}
              />
            </div>

            {/* Sale Properties Section */}
            <div className="grid-item">
              <SliderSection
                title="Popular Residencies for Sale"
                properties={data.filter(property => property.type.toLowerCase() === 'sale')}
              />
            </div>

            {/* Rent Properties Section */}
            <div className="grid-item">
              <SliderSection
                title="Popular Residencies for Rent"
                properties={data.filter(property => property.type.toLowerCase() === 'rent')}
              />
            </div>

            {/* Plot Properties Section */}
            <div className="grid-item">
              <SliderSection
                title="Popular Residencies for Plot"
                properties={data.filter(property => property.type.toLowerCase() === 'plot')}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
