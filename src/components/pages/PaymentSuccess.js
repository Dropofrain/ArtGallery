import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const PaymentSuccess = () => {
  return (
    <div>
        <Navbar/>


<div className='alert alert-success'> Your order has been placed. Go to <Link to='/'>Home</Link></div>
        <Footer/>
    </div>
  )
}

export default PaymentSuccess