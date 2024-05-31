import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./SideBar";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import AppRoutes from "./AppRoutes";
import Navbar from "../layouts/Navbar";

import "../Styles/search.css";
import "../Styles/container.css";
import "../Styles/loader.css";
import "../Styles/card.css";
import "../Styles/productDetails.css";
import "../Styles/sidebar.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [filters, setFilters] = useState({
    selectedVarsity: "",
    selectedCategory: "",
    priceRange: [0, 100000],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `http://localhost:5000/api/products?`;
        if (filters.selectedVarsity) {
          url += `&varsity=${filters.selectedVarsity}`;
        }
        if (filters.selectedCategory) {
          url += `&category=${filters.selectedCategory}`;
        }
        if (filters.priceRange) {
          url += `&priceRange=${filters.priceRange.join(",")}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.payload.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setSearchTerm("");
  };

  const handleApplyFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <Router>
      <Navbar />
      <h2 className="mt-3 text-primary heading">Varsity Wares</h2>
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={toggleSidebar}
        onApplyFilters={handleApplyFilters}
      />
      <div className="main">
        <div className="container">
          <SearchBar
            searchTerm={searchTerm}
            handleSearchInputChange={handleSearchInputChange}
          />
          {loading ? (
            <Loader />
          ) : (
            <AppRoutes
              products={products}
              searchTerm={searchTerm}
              priceRange={filters.priceRange}
              selectedVarsity={filters.selectedVarsity}
              selectedCategory={filters.selectedCategory}
            />
          )}
        </div>
        {isSidebarVisible && (
          <div className="sidebar-overlay" onClick={toggleSidebar}></div>
        )}
      </div>
    </Router>
  );
};

export default AllProducts;
