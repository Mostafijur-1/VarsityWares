import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ categoriesData, varsityData, sidebarRef, closeSidebar }) => {
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
      className="fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-sky-800 to-cyan-900 shadow-lg transition-transform transform -translate-x-full z-40"
    >
      <div className="flex justify-end p-4">
        <button
          className="text-white hover:text-gray-300 rounded-lg text-4xl"
          onClick={closeSidebar}
        >
          &times;
        </button>
      </div>

      <div className="p-4 ml-10">
        <h3 className="text-white font-bold text-xl mb-4">Categories</h3>
        <ul className="space-y-2">
          <li className="cursor-pointer select-none">
            <input
              type="radio"
              id="category-all"
              name="category"
              value=""
              className="mr-2 accent-white"
              checked={selectedCategory === null || selectedCategory === ""}
              onChange={() => setSelectedCategory(null)}
            />
            <label htmlFor="category-all" className="text-white">
              All
            </label>
          </li>
          {categoriesData &&
            categoriesData.map((category, index) => (
              <li key={index} className="cursor-pointer select-none">
                <input
                  type="radio"
                  id={`category-${index}`}
                  name="category"
                  value={category.title}
                  className="mr-2 accent-white"
                  checked={selectedCategory === category.title}
                  onChange={() => setSelectedCategory(category.title)}
                />
                <label htmlFor={`category-${index}`} className="text-white">
                  {category.title}
                </label>
              </li>
            ))}
        </ul>
      </div>

      <div className="p-4 ml-10">
        <h3 className="text-white font-bold text-xl mb-4">Varsity</h3>
        <ul className="space-y-2">
          <li className="cursor-pointer select-none">
            <input
              type="radio"
              id="varsity-all"
              name="varsity"
              value=""
              className="mr-2 accent-white"
              checked={selectedVarsity === null || selectedVarsity === ""}
              onChange={() => setSelectedVarsity(null)}
            />
            <label htmlFor="varsity-all" className="text-white">
              All
            </label>
          </li>
          {varsityData &&
            varsityData.map((varsity, index) => (
              <li key={index} className="cursor-pointer select-none">
                <input
                  type="radio"
                  id={`varsity-${index}`}
                  name="varsity"
                  value={varsity.title}
                  className="mr-2 accent-white"
                  checked={selectedVarsity === varsity.title}
                  onChange={() => setSelectedVarsity(varsity.title)}
                />
                <label htmlFor={`varsity-${index}`} className="text-white">
                  {varsity.title}
                </label>
              </li>
            ))}
        </ul>
      </div>

      <div className="p-4">
        <button
          className="bg-white text-sky-900 font-bold p-2 rounded-lg w-full hover:bg-gray-200 transition"
          onClick={handleSubmit}
        >
          Filter Products
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
