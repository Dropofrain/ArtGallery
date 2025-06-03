import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { findProduct, findRelated, updateProduct } from "../../API/productsAPI";
import { isAuthenticated } from "../../API/userAPI";
import { addItemToCart } from "../../redux/action/cartActions";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Products from "../Products";
import "react-toastify/dist/ReactToastify.css";
import { Chip, Rating } from "@mui/material";
import { Box, Typography, Button, Divider, Paper, Stack } from "@mui/material";

const ProductsDetails = () => {
  const { user, token } = isAuthenticated();

  const params = useParams();
  const id = params.id;

  let [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    findProduct(id)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProduct(data);
          console.log(data);
        }
      })
      .catch((err) => console.log(err));

    findRelated(id)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("related Products" + relatedProduct);
          setRelatedProduct(data);
        }
      })
      .catch((err) => console.log(err));
  }, [params, Rating]);

  const addToCart = () => {
    dispatch(addItemToCart(id, 1));
    toast.success("Item added to cart");
  };

  const [rating, setRating] = useState(0);
  const handleRating = (e) => {
    e.preventDefault();
    let new_user_rating = Number(e.target.value);
    let old_rating = Number(product.Rating);
    let no_of_reviews = Number(product.no_of_reviews);
    setRating(
      Number(
        (old_rating * no_of_reviews + new_user_rating) / (no_of_reviews + 1)
      )
    );
    product = { ...product, Rating: rating, no_of_reviews: no_of_reviews + 1 };

    console.log(rating);
    updateProduct(product._id, product, token);
  };

  return (
    <>
      <ToastContainer theme="colored" position="top-right" />
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 4,
          py: 6,
          px: { xs: 2, md: 8 },
          minHeight: "90vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        {/* Product Image */}
        <Box
          sx={{
            flex: 1,
            minWidth: 320,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 6,
            transform: "translateY(10px)",
          }}
        >
          <img
            src={`http://localhost:5000/${product.product_image}`}
            alt={product.product_name}
            style={{
              width: "100%",
              height: "80%",
              objectFit: "cover",
              display: "block",
              borderRadius: "12px",
            }}
          />
        </Box>

        {/* Product Info */}
        <Paper
          elevation={6}
          sx={{
            flex: 1,
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            boxShadow: "0 10px 50px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "text.primary",
              }}
            >
              {product.product_name}
            </Typography>

            {/* <Typography variant="subtitle1" color="text.secondary" mb={1}>
              Category: {product.category?.category_name}
            </Typography> */}
            <Chip label={product.category?.category_name} color="primary" />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "primary.main",
              mb: 2,
            }}
          >
            Rs {product.product_price}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mb: 3,
              lineHeight: 1.6,
            }}
          >
            {product.product_description}
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              Rating:
            </Typography>
            <Rating value={product.Rating} onChange={handleRating} />
          </Box>

          <Divider sx={{ my: 3 }} />

          {user?.role === 1 || user?._id === product.user ? (
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                component={Link}
                to={`/product/update/${id}`}
                color="warning"
                sx={{ textTransform: "capitalize", fontWeight: 600 }}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to={`/product/delete/${id}`}
                color="error"
                sx={{ textTransform: "capitalize", fontWeight: 600 }}
              >
                Delete
              </Button>
            </Stack>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={addToCart}
              size="large"
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: 600,
                textTransform: "capitalize",
                borderRadius: 3,
                boxShadow: "0 8px 24px rgba(0,123,255,0.2)",
              }}
            >
              Add to Cart
            </Button>
          )}
        </Paper>
      </Box>

      <div className="container mx-auto">
        <h2 className="text-center mb-4">Related Products</h2>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {relatedProduct.slice(0, 4).map((product) => {
            return <Products product={product} key={product._id} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsDetails;
