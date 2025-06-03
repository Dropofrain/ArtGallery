import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  Paper,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Products from "../Products";
import { Container, FormControlLabel, Box, Radio, Link } from "@mui/material";
//import { Box } from '@mui/system'
//import StarIcon from '@mui/icons-material/Star';
//import StarBorderIcon from '@mui/icons-material/Star';
import { filterProduct } from "../../API/productsAPI";
//import { convertLength } from '@mui/material/styles/cssUtils'
import CheckboxCategory from "../Checkbox_category";
import RadioButton from "../RadioButton";
import { Prices } from "../prices";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { useLocation } from "react-router-dom";

const Productspage = () => {
  const [sortBy, setSortBy] = useState("Rating");
  const [order, setOrder] = useState(-1);
  const [limit, setLimit] = useState(8);
  const [skip, setskip] = useState(0);

  // get query params from URL
  const queryParams = new URLSearchParams(window.location.search);
  const searchQuery = queryParams.get("query");

  console.log("Search Query:", searchQuery);

  const [filteredProduct, setFilteredProduct] = useState([]);
  const [size, setSize] = useState(0);

  const [myfilters, setMyFilters] = useState({
    filters: { category: [], product_price: [] },
  });

  useEffect(() => {
    filterProduct(sortBy, order, limit, skip, myfilters)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setFilteredProduct(data.product);
          console.log(data.product);
          setSize(data.size);
          console.log(filteredProduct);
        }
      })
      .catch((err) => console.log(err));
  }, [myfilters]);

  const handleFilters = (filters, filterBy) => {
    const newfilter = { ...myfilters };
    newfilter.filters[filterBy] = filters;
    // category: mobile_id -> filters: mobile_id, filterBy: category
    //price: price_id -> filters: price_id, filterBy: price
    if (filterBy === "product_price") {
      newfilter.filters[filterBy] = handlePrice(filters);
    }
    setMyFilters(newfilter);
    console.log(newfilter);
  };

  const clearFilters = () => {
    // redirect to the same page to clear filters
    setMyFilters({ filters: { category: [], product_price: [] } });
    setFilteredProduct([]);
    setSize(0);
    setSortBy("Rating");
    setOrder(-1);
    setLimit(8);
    setskip(0);
    window.location.href = "/products"; // Redirect to products page
  };

  const handlePrice = (index) => {
    const data = Prices;
    const price = data.find((price) => price.id == index);
    console.log(price.value);
    return price.value;
  };

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {!isHome && <Navbar />}
      <Container maxWidth="xxl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Filters Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                backdropFilter: "blur(4px)",
                minWidth: 280,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 4,
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 700, mb: 3 }}
                >
                  🔍 Filters
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={clearFilters}
                  sx={{ mb: 3, textTransform: "none" }}
                >
                  Clear Filters
                </Button>
              </Box>

              <Box sx={{ mb: 4 }}>
                <CheckboxCategory handleFilters={handleFilters} />
              </Box>

              <Box sx={{ mt: "20px !important" }}>
                <RadioButton handleFilters={handleFilters} />
              </Box>
            </Paper>
          </Grid>

          {/* Products Grid */}
          <Grid item xs={12} md={9}>
            {filteredProduct.length > 0 ? (
              <Grid container spacing={3}>
                {filteredProduct?.map((product) => {
                  return product?.product_name?.includes(searchQuery || "") ? (
                    <Grid item xs={6} sm={4} md={4} lg={3} key={product._id}>
                      <Products product={product} />
                    </Grid>
                  ) : (
                    <NoData />
                  );
                })}
              </Grid>
            ) : (
              <NoData />
            )}
          </Grid>
        </Grid>
      </Container>
      {!isHome && <Footer />}
    </>
  );
};

export default Productspage;

const NoData = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        textAlign: "center",
        width: "100%",
      }}
    >
      <SentimentDissatisfiedIcon
        sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
      />
      <Typography variant="h5" color="text.secondary" gutterBottom>
        No Products Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Try adjusting your search or filters.
      </Typography>
    </Box>
  );
};
