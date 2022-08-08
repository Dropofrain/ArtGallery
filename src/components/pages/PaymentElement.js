import React, { useEffect, useState } from 'react'
import { API } from '../../config'
import Payment from './Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const PaymentElement = () => {
  const [stripeApikey, setStripeApikey] = useState('')

  useEffect(async () => {
    await fetch(`${API}/getStripeAPIkey`, { method: "GET" })
      .then(respone => respone.json())
      .then(data => setStripeApikey(data))
      .catch(error => console.log(error))

  }, [])

  console.log(stripeApikey)

  return (

    <Elements stripe={loadStripe(stripeApikey)}>
      <Payment />
    </Elements>

  )
}

export default PaymentElement