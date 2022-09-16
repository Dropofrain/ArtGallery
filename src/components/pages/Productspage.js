import { Checkbox, FormControl, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Products from '../Products'
import { Container, FormControlLabel, Box, Radio, Link } from '@mui/material'
//import { Box } from '@mui/system'
//import StarIcon from '@mui/icons-material/Star';
//import StarBorderIcon from '@mui/icons-material/Star';
import { filterProduct } from '../../API/productsAPI'
//import { convertLength } from '@mui/material/styles/cssUtils'
import Checkbox_category from '../Checkbox_category'
import RadioButton from '../RadioButton'
import { Prices } from '../prices'

const Productspage = () => {
  const [sortBy, setSortBy] = useState('Rating')
  const [order, setOrder] = useState(-1)
  const [limit, setLimit] = useState(8)
  const [skip, setskip] = useState(0)

  const [filteredProduct, setFilteredProduct] = useState([])
  const [size, setSize] = useState(0)

  const [myfilters, setMyFilters] = useState({
    filters: { category: [], product_price: [] }
  })

  useEffect(() => {
    filterProduct(sortBy, order, limit, skip, myfilters)
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
        else {
          setFilteredProduct(data.product)
          console.log(data.product)
          setSize(data.size)
          console.log(filteredProduct)
        }
      })
      .catch(err => console.log(err))
  }, [myfilters])

  const handleFilters = (filters, filterBy) => {
    const newfilter = { ...myfilters }
    newfilter.filters[filterBy] = filters
    // category: mobile_id -> filters: mobile_id, filterBy: category
    //price: price_id -> filters: price_id, filterBy: price
    if (filterBy === 'product_price') {
      newfilter.filters[filterBy] = handlePrice(filters)
    }
    setMyFilters(newfilter)
    console.log(newfilter)
  }

  const handlePrice = (index) => {
    const data = Prices
    const price = data.find(price => price.id == index)
    console.log(price.value)
    return price.value
  }

  return (
    <>
      <Navbar />
      <Container maxWidth='xl'>
        <div className='row'>
          <div className='col-md-3'>
            <Checkbox_category handleFilters={handleFilters} />
            <RadioButton handleFilters={handleFilters} />

          </div>
          <div className='col-md-9'>

            <div className='container mx-auto mt-5'>
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                {
                 filteredProduct.map(product => {
                    return <Products product={product} key={product._id} />
                  })
                } 
                {/* <Products /> */}
              </div>
            </div>
          </div>

        </div>
      </Container>


      <Footer />
    </>
  )

}

export default Productspage