import React from "react";
import { Routes, Route } from "react-router-dom";
import CategoryPage from "./CategoryPage";
import ProductDetails from "./ProductDetails";

const AppRoutes = ({
  products,
  searchTerm,
  priceRange,
  selectedVarsity,
  selectedCategory,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <CategoryPage
            products={products}
            searchTerm={searchTerm}
            priceRange={priceRange}
            selectedVarsity={selectedVarsity}
            selectedCategory={selectedCategory}
          />
        }
      />
      <Route
        path="/varsitywares/"
        element={
          <CategoryPage
            products={products}
            searchTerm={searchTerm}
            priceRange={priceRange}
            selectedVarsity={selectedVarsity}
            selectedCategory={selectedCategory}
          />
        }
      />
      <Route
        path="/varsitywares/category/:slug"
        element={
          <CategoryPage
            products={products}
            searchTerm={searchTerm}
            priceRange={priceRange}
            selectedVarsity={selectedVarsity}
            selectedCategory={selectedCategory}
          />
        }
      />
      <Route
        path="/varsitywares/product/:slug"
        element={<ProductDetails products={products} searchTerm={searchTerm} />}
      />
    </Routes>
  );
};

export default AppRoutes;
