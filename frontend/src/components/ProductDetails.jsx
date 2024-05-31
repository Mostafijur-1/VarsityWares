// import React from "react";
import { useParams } from "react-router-dom";

import StarRating from "./StarRating";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = ({ products, searchTerm }) => {
  const { slug } = useParams();

  const product = products.find((product) => product.slug === slug);

  const { name, price, description, category, varsity, image, rating } =
    product;

  return (
    <div>
      <div className="product-details">
        <div className="product-image-container">
          <img src={image} alt={name} className="product-image" />
        </div>
        <div className="product-info">
          <h2 className="product-title">{name}</h2>
          <p className="product-price">Price: ${price}</p>
          <p className="product-category">Category: {category.name}</p>
          <p className="product-varsity">Varsity: {varsity.name}</p>
          <div className="product-rating">
            <StarRating rating={rating} />
            <span className="rating-count">({rating} reviews)</span>
          </div>
          <p className="product-description">{description}</p>
          <button className="addCart">add to cart</button>
          <button className="order-button">Place Order</button>
        </div>
      </div>
      <br />
      <br />
      <h4 className="related-head">Related Products</h4>
      <RelatedProducts
        products={products}
        searchTerm={searchTerm}
        category={category}
      />
    </div>
  );
};

export default ProductDetails;
