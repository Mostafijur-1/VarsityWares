import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Sidebar from "./SideBar";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import AppRoutes from "./AppRoutes";

import "../Styles/search.css";
import "../Styles/container.css";
import "../Styles/loader.css";
import "../Styles/card.css";
import "../Styles/productDetails.css";
import "../Styles/sidebar.css";
import Navbar from "../layouts/Navbar";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    setSearchTerm("");
  };

  return (
    <Router>
      <Navbar />
      <h2 className="mt-3 text-primary heading">Varsity Wares</h2>
      <Sidebar isVisible={isSidebarVisible} onClose={toggleSidebar} />

      <div className="main">
        <div className="container">
          <SearchBar
            searchTerm={searchTerm}
            handleSearchInputChange={handleSearchInputChange}
          />
          {loading ? (
            <Loader />
          ) : (
            <AppRoutes products={products} searchTerm={searchTerm} />
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
