import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";

const CategoryPage = ({
  products,
  searchTerm,
  priceRange,
  selectedVarsity,
  selectedCategory,
}) => {
  let filteredProducts = products;

  // Filter products by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filter products by category slug
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.slug === selectedCategory
    );
  }

  // Filter products by varsity
  if (selectedVarsity) {
    filteredProducts = filteredProducts.filter(
      (product) => product.varsity.name === selectedVarsity
    );
  }

  // Filter products by price range
  if (priceRange) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when category changes
  }, [selectedCategory]);

  return (
    <div className="row mt-3">
      {filteredProducts.length === 0 ? (
        <h3 style={{ padding: "20px", margin: "20px", color: "orange" }}>
          No product found !!!
        </h3>
      ) : (
        filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <SingleProduct product={product} />
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryPage;
