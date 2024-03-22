import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import './Properties.css';
import useProperties from '../../hooks/useProperties';
import { PuffLoader } from 'react-spinners';
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import SliderSection from '../../components/sliderSetting/SliderSection'; // Import SliderSection

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


 

  // Function to convert property price to a consistent format for comparison
  const getPropertyPrice = (price) => {
    const lowercasePrice = price.toLowerCase();
    let numericValue = 0;

    if (lowercasePrice.includes('lpa')) {
      numericValue = parseFloat(lowercasePrice.match(/\d+/)[0]) * 100000;
    } else if (lowercasePrice.includes('cr')) {
      numericValue = parseFloat(lowercasePrice.match(/\d+/)[0]) * 10000000;
    }
    return numericValue;
  };

  const filteredProperties = data.filter(property => {
    // Check if any filter is selected
    if (filter) {
      // Filter by city
      if (filter.city && !property?.city.toLowerCase().includes(filter.city.toLowerCase())) {
        return false;
      }
  
      // Filter by type
      if (filter.type && !property?.type.toLowerCase().includes(filter.type.toLowerCase())) {
        return false;
      }
  
 // Filter by budget
if (filter.budget) {
  // Ensure that property has a price field
  if (!property.price) {
    return false;
  }
  
  // Convert price to consistent format for comparison
  const propertyPrice = getPropertyPrice(property.price);
  
  switch (filter.budget) {
    case 'Above 8cr':
      if (propertyPrice <= 80000000) {
        return false;
      }
      break;
    case '8cr-7cr':
      if (!(propertyPrice >= 70000000 && propertyPrice < 80000000)) {
        return false;
      }
      break;
    case '7cr-6cr':
      if (!(propertyPrice >= 60000000 && propertyPrice < 70000000)) {
        return false;
      }
      break;
    case '6cr-5cr':
      if (!(propertyPrice >= 50000000 && propertyPrice < 60000000)) {
        return false;
      }
      break;
    case '5cr-4cr':
      if (!(propertyPrice >= 40000000 && propertyPrice < 50000000)) {
        return false;
      }
      break;
    case '4cr-3cr':
      if (!(propertyPrice >= 30000000 && propertyPrice < 40000000)) {
        return false;
      }
      break;
    case '3cr-2cr':
      if (!(propertyPrice >= 20000000 && propertyPrice < 30000000)) {
        return false;
      }
      break;
    case '2cr-1cr':
      if (!(propertyPrice >= 10000000 && propertyPrice < 20000000)) {
        return false;
      }
      break;
    case 'Below 1cr':
      if (propertyPrice >= 10000000) {
        return false;
      }
      break;
    default:
      break;
  }
}

  
      // Filter by general query
      if (filter.query) {
        const query = filter.query.toLowerCase();
        if (
          !property?.title?.toLowerCase().includes(query) &&
          !property?.type?.toLowerCase().includes(query) &&
          !property?.propertySubtype?.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
    }
  
    return true; 
  });
  
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        {/* Display searched properties */}
        {filter && filteredProperties.length > 0 && (
       <div className="container-padding inner-width container-container">
       <div className="flex-column-start container-header">
         <span className="header-text">Your Searched Properties</span>
       </div>
       <div className="property-grid">
         {filteredProperties.slice(0, 8).map((property, i) => (
           <div className="property-item" key={i}>
             <PropertyCard card={property} />
           </div>
         ))}
       </div>
     </div>
     
        )}

        {/* Display other sections only if no search filter is applied */}
        {!filter && (
          <div className="grid-container">
            {/* Residential Section */}
            <div className="grid-item">
              <h2>Residential</h2>
              <div className="subgrid-container">
                {/* Upcoming Projects */}
                <div className="subgrid-item">
                  <SliderSection
                    title="Upcoming Projects"
                    properties={data.filter(property => property?.type?.toLowerCase() === 'residential')}
                  />
                </div>

                {/* Ready to Move */}
                <div className="subgrid-item">
                  <SliderSection
                    title="Ready to Move"
                    properties={data.filter(property => property?.type?.toLowerCase() === 'rent')}
                  />
                </div>

                {/* Luxury Living */}
                <div className="subgrid-item">
                  <SliderSection
                    title="Luxury Living"
                    properties={data.filter(property => property?.type?.toLowerCase() === 'feature project')}
                  />
                </div>

                {/* Builder Floors */}
                <div className="subgrid-item">
                  <SliderSection
                    title="Builder Floors"
                    properties={data.filter(property => property?.type?.toLowerCase() === 'plot')}
                  />
                </div>

                {/* Affordable Living */}
                <div className="subgrid-item">
                  <SliderSection
                    title="Affordable Living"
                    properties={data.filter(property => property?.type?.toLowerCase() === 'sale')}
                  />
                </div>

                {/* Plots */}
                <div className="subgrid-item">
                  <SliderSection
                    title="Plots"
                    properties={data.filter(property => property?.type?.toLowerCase() === 'plot')}
                  />
                </div>
              </div>
            </div>

            {/* Commercial Section */}
            <div className="grid-item">
              <h2>Commercial</h2>
              <div className="subgrid-container">
                {/* Shops */}
                <div className="subgrid-item">
                  <SliderSection
                    title="Shops"
                    properties={data.filter(property => property?.type?.toLowerCase() === 'rent')}
                  />
                </div>

                {/* Offices */}
                <div className="subgrid-item">
                  <SliderSection
                    title="Offices"
                    properties={data.filter(property => property?.type?.toLowerCase() === 'sale')}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
