import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useFetchFilters from "../useFetchFilters";

const Sidebar = ({ isVisible, onClose, onApplyFilters }) => {
  const { categories, categoriesLoading, categoriesError } =
    useFetchFilters("categories");
  const { varsities, varsitiesLoading, varsitiesError } =
    useFetchFilters("varsities");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedVarsity, setSelectedVarsity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prevRange) =>
      name === "min"
        ? [Number(value), prevRange[1]]
        : [prevRange[0], Number(value)]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({ selectedVarsity, selectedCategory, priceRange });
    onClose(false);
  };

  return (
    <div className={`sidebar ${isVisible ? "visible" : ""}`}>
      <FaBars className="category-bar" onClick={() => onClose(true)} />
      <IoIosCloseCircleOutline
        className="close-button"
        onClick={() => onClose(false)}
      />
      <h4 className="filter-head">Filter by</h4>
      <hr />
      <div className="filter-section">
        <label htmlFor="varsity-select">Varsity</label>
        {varsitiesLoading && <p>Loading varsities...</p>}
        {varsitiesError && <p>Error loading varsities</p>}
        {!varsitiesLoading && !varsitiesError && (
          <select
            id="varsity-select"
            value={selectedVarsity}
            onChange={(e) => setSelectedVarsity(e.target.value)}
          >
            <option value="">All</option>
            {varsities.map((varsity, index) => (
              <option key={index} value={varsity.slug}>
                {varsity.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="filter-section">
        <label htmlFor="category-select">Category</label>
        {categoriesLoading && <p>Loading categories...</p>}
        {categoriesError && <p>Error loading categories</p>}
        {!categoriesLoading && !categoriesError && (
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="filter-section">
        <label htmlFor="price-range">
          Price Range: {`$${priceRange[0]} - $${priceRange[1]}`}
        </label>
        <label htmlFor="min-price">Min Price:</label>
        <input
          type="number"
          id="min-price"
          name="min"
          min="0"
          step="10"
          value={priceRange[0]}
          onChange={handlePriceChange}
        />
        <label htmlFor="max-price">Max Price:</label>
        <input
          type="number"
          id="max-price"
          name="max"
          min="10"
          step="10"
          value={priceRange[1]}
          onChange={handlePriceChange}
        />
      </div>

      <button onClick={handleApplyFilters} className="find-button">
        Find
      </button>
    </div>
  );
};

export default Sidebar;
