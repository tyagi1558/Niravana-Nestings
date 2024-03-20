import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import "./SearchBar.css";

const SearchBar = ({ filter, setFilter }) => {
  const handleCityChange = (e) => {
    setFilter({ ...filter, city: e.target.value });
  };

  const handleTypeChange = (e) => {
    setFilter({ ...filter, type: e.target.value });
  };

  const handleBudgetChange = (e) => {
    setFilter({ ...filter, budget: e.target.value });
  };

  const handleApplyFilter = () => {
    // Apply filter logic here
  };

  return (
    <div className="search-bar">
     
      <div className="select-wrapper">
        <select value={filter.city} onChange={handleCityChange}>
          <option value="">Select City</option>
          <option value="Gurgaon">Gurgaon</option>
          <option value="Delhi">Delhi</option>
          <option value="Noida">Noida</option>
        </select>
      </div>
      <div className="select-wrapper">
        <select value={filter.type} onChange={handleTypeChange}>
          <option value="">Select Type</option>
          <optgroup label="Residential">
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Plot">Plots</option>
            <option value="Farmhouses">Farmhouses</option>
            <option value="Builder Floors">Builder Floors</option>
            <option value="Villas">Villas</option>
          </optgroup>
          <optgroup label="Commercial">
            <option value="Shops">Shops</option>
            <option value="Offices">Offices</option>
          </optgroup>
        </select>
      </div>
      <div className="select-wrapper">
        <select value={filter.budget} onChange={handleBudgetChange}>
          <option value="">Select Budget</option>
          <option value="Above 8cr">Above 8 Cr</option>
          <option value="8cr-7cr">8 Cr - 7 Cr</option>
          <option value="7cr-6cr">7 Cr - 6 Cr</option>
          <option value="6cr-5cr">6 Cr - 5 Cr</option>
          <option value="5cr-4cr">5 Cr - 4 Cr</option>
          <option value="4cr-3cr">4 Cr - 3 Cr</option>
          <option value="3cr-2cr">3 Cr - 2 Cr</option>
          <option value="2cr-1cr">2 Cr - 1 Cr</option>
          <option value="Below 1cr">Below 1 Cr</option>
        </select>
      </div>
      <div className="select-wrapper">
        <HiLocationMarker color="var(--blue)" size={25} />
        <input
          placeholder="Search.."
          type="text"
          value={filter.query}
          onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        />
      </div>
     
    </div>
  );
};

export default SearchBar;
