import { ElectricalServices, ElectricalServicesTwoTone } from '@mui/icons-material'
import { Box, Typography, Grid } from '@mui/material'
import React from 'react'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const Services = () => {
  return (
    <>
      <Navbar />
      <Typography variant='h4'>Services</Typography>
      <Box className="mx-auto" width='75%'>
        <Grid container spacing={3}>
          <Grid item xs={6} backgroundColor='yellow' marginBottom={2}>
            <ElectricalServicesTwoTone Size='large' />
            <br />
            <Typography variant='body1' align='justify' p={3}>
              This is a services performed.
            </Typography>
          </Grid>


          <Grid item xs={6} backgroundColor='red' marginBottom={2}>
            <ElectricalServicesTwoTone Size='large' />
            <br />
            <Typography variant='body1' align='justify' p={3}>
              This is a services performed.
            </Typography>
          </Grid>


          <Grid item xs={6} backgroundColor='green' marginBottom={2}>
            <ElectricalServicesTwoTone Size='large' />
            <br />
            <Typography variant='body1' align='justify' p={3}>
              This is a services performed.
            </Typography>
          </Grid>


          <Grid item xs={6} backgroundColor='blue' marginBottom={2}>
            <ElectricalServicesTwoTone Size='large' />
            <br />
            <Typography variant='body1' align='justify' p={3}>
              This is a services performed.
            </Typography>
          </Grid>


        </Grid>
      </Box>

      <Footer />
    </>
  )
}

export default Services