import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({
  categoriesData,
  varsityData,
  setShowSidebar,
  sidebarRef,
  closeSidebar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVarsity, setSelectedVarsity] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const varsity = params.get("varsity");
    setSelectedCategory(category);
    setSelectedVarsity(varsity);
  }, [location.search]);

  const handleSubmit = () => {
    let url = "/products?";
    if (selectedCategory) url += `category=${selectedCategory}&`;
    if (selectedVarsity) url += `varsity=${selectedVarsity}`;
    navigate(url);
    closeSidebar();
  };

  return (
    <div
      ref={sidebarRef}
      className="fixed top-0 left-0 w-64 h-full bg-white shadow-md transition-transform transform -translate-x-full z-40"
    >
      <div className="flex justify-end p-2">
        <button
          className="text-gray-500 hover:text-gray-800 rounded-lg  text-4xl"
          onClick={closeSidebar}
        >
          &times;
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-bold">Categories</h3>
        <ul>
          <li className="cursor-pointer select-none">
            <input
              type="radio"
              id="category-all"
              name="category"
              value=""
              className="mr-2"
              checked={selectedCategory === null || selectedCategory === ""}
              onChange={() => setSelectedCategory(null)}
            />
            <label htmlFor="category-all">All</label>
          </li>
          {categoriesData &&
            categoriesData.map((category, index) => (
              <li key={index} className="cursor-pointer select-none">
                <input
                  type="radio"
                  id={`category-${index}`}
                  name="category"
                  value={category.title}
                  className="mr-2"
                  checked={selectedCategory === category.title}
                  onChange={() => setSelectedCategory(category.title)}
                />
                <label htmlFor={`category-${index}`}>{category.title}</label>
              </li>
            ))}
        </ul>
      </div>

      <div className="p-4">
        <h3 className="font-bold">Varsity</h3>
        <ul>
          <li className="cursor-pointer select-none">
            <input
              type="radio"
              id="varsity-all"
              name="varsity"
              value=""
              className="mr-2"
              checked={selectedVarsity === null || selectedVarsity === ""}
              onChange={() => setSelectedVarsity(null)}
            />
            <label htmlFor="varsity-all">All</label>
          </li>
          {varsityData &&
            varsityData.map((varsity, index) => (
              <li key={index} className="cursor-pointer select-none">
                <input
                  type="radio"
                  id={`varsity-${index}`}
                  name="varsity"
                  value={varsity.title}
                  className="mr-2"
                  checked={selectedVarsity === varsity.title}
                  onChange={() => setSelectedVarsity(varsity.title)}
                />
                <label htmlFor={`varsity-${index}`}>{varsity.title}</label>
              </li>
            ))}
        </ul>
      </div>

      <div className="p-4">
        <button
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
          onClick={handleSubmit}
        >
          filter products
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
