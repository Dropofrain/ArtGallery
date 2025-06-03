import { Rating } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import "./products.css";

const Products = ({ product = {} }) => {
  console.log(product);
  const [rating, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };
  return (
    <>
      <div className="col mb-4" style={{ transition: "all 0.3s ease" }}>
        <div
          className="card h-100 border-0 shadow-sm hover-shadow-lg overflow-hidden"
          style={{
            borderRadius: "12px",
            transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          }}
        >
          {/* Product Image with Hover Zoom Effect */}
          <div
            className="position-relative overflow-hidden"
            style={{ height: "200px" }}
          >
            <img
              src={`http://localhost:5000/${product.product_image}`}
              className="card-img-top h-100 w-100 object-fit-cover"
              alt={product.product_name}
              style={{
                transition: "transform 0.5s ease",
                objectPosition: "center",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
            {/* Quick View Badge */}
            <div className="position-absolute top-0 end-0 m-2">
              <span className="badge bg-dark bg-opacity-10 text-white px-2 py-1 rounded-pill">
                <i className="bi bi-eye-fill"></i>
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="card-body p-3 d-flex flex-column">
            {/* Product Name & Price */}
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5
                className="card-title mb-0 fs-6 fw-bold text-truncate"
                style={{ maxWidth: "70%" }}
              >
                {product.product_name}
              </h5>
              <h5 className="card-title mb-0 fs-6 fw-bold text-primary">
                Rs.{product.product_price}
              </h5>
            </div>

            {/* Rating */}
            <div className="mb-2">
              <div className="d-flex justify-content-center">
                <Rating
                  readOnly
                  onClick={handleRating}
                  value={product.Rating}
                />
                <span className="ms-2 small text-muted">
                  ({product.Rating || 0})
                </span>
              </div>
            </div>

            {/* Description (Truncated) */}
            <p
              className="card-text text-muted small mb-3"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.product_description}
            </p>

            {/* View Details Button */}
            <div className="mt-auto text-center">
              <Link
                to={`/product/${product._id}`}
                className="text-decoration-none"
              >
                <button className="btn btn-outline-primary btn-sm w-100 py-2 rounded-pill fw-bold">
                  View Details
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
