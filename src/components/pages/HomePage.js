import React from 'react'
//import Form from '../Form'
//import Item from '../Item'
import Navbar from '../layout/Navbar'
import { Typography, Button, ButtonGroup, lab } from '@mui/material'
import { AddIcCallTwoTone } from '@mui/icons-material'

const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* <Item/>
       <Form/> */}

      <Typography variant='h4' color='primary'>
        HomePage
      </Typography>

      <Typography variant='' align='justify' noWrap='true' sx={{ "background": "yellow" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio molestias veritatis perspiciatis quis placeat? Molestiae, amet odit delectus repudiandae dolor voluptates ipsum omnis distinctio quis rerum atque molestias temporibus cumque.
      </Typography>

      <ButtonGroup>
        <Button color='error' size='large' variant='contained'>Click me</Button>
        <Button color='warning' size='small' variant='contained'>Click me</Button>
        <Button color='info' size='small' variant='contained'>Click me</Button>
        <Button color='sucess' size='small' variant='contained'>Click me</Button>
        <Button color='primary' size='small' variant='contained'>Click me</Button>
      </ButtonGroup>

      <lab color="primary" aria-label="add">
        <AddIcCallTwoTone/>
      </lab>
    </>
  )
}

export default HomePage