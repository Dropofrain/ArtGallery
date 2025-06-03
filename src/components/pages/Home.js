import React from "react";
import Carousel from "../Carousel";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import Products from "../Products";
import Productspage from "./Productspage";

const Home = () => {
  return (
    <>
      <Navbar />
      <Carousel />
      {/* <Products /> */}
      <Productspage />
      <Footer />
    </>
  );
};

export default Home;
