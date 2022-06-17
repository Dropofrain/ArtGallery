import React from 'react'
import Carousel from '../Carousel'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Products from '../Products'

const Home = () => {
  return (
    <>
        <Navbar/>
        <Carousel/>
        <Products/>
        <Footer/>
    </>
  )
}

export default Home