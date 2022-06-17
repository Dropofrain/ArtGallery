import { Checkbox, FormControl, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Products from '../Products'
import {Container, FormControlLabel, Box, Radio, Link } from '@mui/material'
//import { Box } from '@mui/system'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/Star';

const Productspage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth='xl'>
        <div className='row'>
          <div className='col-md-3'>
            <Typography variant='h4' color='secondary' pl={5} pt={5} >Department</Typography>
            <Box pl={5} mt={3}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="All" />
              <br />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Computer" />
              <br />
              <Checkbox id="checkbox2" />
              <label htmlFor='checkbox2'>Mobiles</label>
              <br />
              <FormControlLabel control={<Checkbox />} label="Camers" />
              <br />
              <FormControlLabel control={<Checkbox />} label="Beauty" />
              <br />

              <FormControlLabel control={<Checkbox />} label="Fitness" />
              <br />
            </Box>

            <Typography variant='h4' color='secondary' mt={5} pt={5} >Prices</Typography>

            <RadioGroup
              aria-describedby="demo-radio-buttons-group-label" defaultValue="female"
              name="radio-button-group"  >
              <FormControlLabel value="other1" control={<Radio />} label="Below $25" /><br />
              <FormControlLabel value="other2" control={<Radio />} label="$25 - $105" /><br />
              <FormControlLabel value="other3" control={<Radio />} label="$105 - $205" /><br />
              <FormControlLabel value="other4" control={<Radio />} label="$205 -$350" /><br />
              <FormControlLabel value="other5" control={<Radio />} label="$350 -$1000" /><br />
            </RadioGroup>

            <Typography variant='h4' color='secondary' mt={5} pt={5} >Discount</Typography>

            <RadioGroup
              aria-describedby="demo-radio-buttons-group-label" defaultValue="female"
              name="radio-button-group2"  >
              <FormControlLabel value="discount1" control={<Radio />} label="upto 5%" /><br />
              <FormControlLabel value="discount2" control={<Radio />} label="Upto 10%" /><br />
              <FormControlLabel value="discount3" control={<Radio />} label="Upto 25%" /><br />
              <FormControlLabel value="discount4" control={<Radio />} label="Upto 50%" /><br />
              <FormControlLabel value="discount5" control={<Radio />} label="Upto 60%" /><br />
            </RadioGroup>

            <Typography variant='h4' color='secondary' mt={5} pt={5} >Deals</Typography>
            <Link href="" component="button" variant="h5" color={'success.main'}>Deals of the day</Link> <br />
            <Link href="" component="button" variant="h5" color={'success.dark'}>Flash deals</Link> <br />

            <Link href="" component="button" variant="h5" color={'success.light'}>Most Popular</Link> <br />

            <Typography variant='h4' color='secondary' mt={5} pt={5} >Avg.customer review</Typography>
            <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /><br />
            <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarBorderIcon /><br />
            <StarIcon /><StarIcon /><StarIcon /><StarBorderIcon /><StarBorderIcon /><br />
            <StarIcon /><StarIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><br />
            <StarIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon /><br />
          </div>
          <div className='col-md-9'>
            <Products />
          </div>

        </div>
      </Container>


      <Footer />
    </>
  )
}

export default Productspage