import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  const { slug, image, name, price } = product;

  const handleViewDetailsClick = () => {
    window.scrollTo(0, 0); // Scroll to top when "View Details" button is clicked
  };

  return (
    <div className="card product-card">
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Price: ${price}</p>
        <Link
          to={`/varsitywares/product/${slug}`}
          className="btn btn-primary"
          onClick={handleViewDetailsClick}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default SingleProduct;
