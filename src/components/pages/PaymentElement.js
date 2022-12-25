import React, { useEffect, useState } from 'react'
import { API } from '../../config'
import Payment from './Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const PaymentElement = () => {
  const [stripeApikey, setStripeApikey] = useState('')

  useEffect(async () => {
    await fetch(`${API}/getStripeAPIKey`, { method: "GET" })
      .then(respone => respone.json())
      .then(data => setStripeApikey(data.stripeAPIKey))
      .catch(error => console.log(error))

  }, [])


  return (

    <Elements stripe={loadStripe(stripeApikey)}>
      <Payment />
    </Elements>

  )
}

export default PaymentElement