import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../API/userAPI'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import { API } from '../../config'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createOrder } from '../../redux/action/orderActions'


const Payment = () => {
    const cart_items = JSON.parse(localStorage.getItem('cartItems'))
    const shipping_info = JSON.parse(localStorage.getItem('shippingInfo'))
    let order_total = sessionStorage.getItem('total_price') ? sessionStorage.getItem('total_price') : 0
    const { user, token } = isAuthenticated()
    let stripe = useStripe()
    let elements = useElements()
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let order = {
        orderItems: cart_items,
        user: user._id,
        shipping_address: shipping_info.shipping_address,
        alternate_shipping_address: shipping_info.alternate_shipping_address,
        city: shipping_info.city,
        country: shipping_info.country,
        phone: shipping_info.phone,
        zipcode: shipping_info.zipcode
    }

    const makePayment = async (e) => {
        e.preventDefault()
        document.getElementById('payBtn').disabled = true
        let amount = order_total * 100

        let res
        try {
            res = await fetch(`${API}/processpayment`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ amount })
            },
            )
                .then(response => response.json())
                .catch(error => toast.error(error))

            const client_secret = res.client_secret

            if (!stripe || !elements) {
                return
            }

            let result = await stripe.confirmCardPayment(`${client_secret}`, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.username,
                        email: user.email
                    }
                }
            })
            if (result.error) {
                toast.error(result.error.message)
                document.getElementById('payBtn').disabled = false
            }
            else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.payment_info = {
                        id: (await result).paymentIntent.id,
                        status: (await result).paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    toast.success('Your order has been placed successfully')
                    localStorage.removeItem('cartItems')
                    document.getElementById('payBtn').disabled = false
                    setTimeout(() => {
                        navigate('/paymentSuccess')
                    }, [5000])
                }
            }




        }
        catch (error) {
            toast.error(error.message)
            document.getElementById('payBtn').disabled = false

        }
    }



    return (
        <div>
            <ToastContainer theme='colored' position='top-right' />
            <Navbar />
            {/* <Checkout_progress shipping payment /> */}

            <div className='container shadow-lg mx-auto p-5 row my-5'>
                <div className='col-md-8'>
                    <h3 className='text-decoration-underline'>Order Summary</h3>
                    <div className='container mx-auto my-5 text-start ps-5'>
                        <table className='table text-center align-middle'>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Products</th>
                                    <th>Products Name</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                                {
                                    cart_items &&
                                    cart_items.map((item, i) => {
                                        return <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <img src={`${API}/${item.image}`} style={{ height: '100px' }} />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>Rs.{item.price}</td>
                                            <td>{item.quantity}</td>
                                            <td>Rs.{item.quantity * item.price}</td>
                                        </tr>
                                    })
                                }
                                <tr>
                                    <td colSpan={6}><h3>Total Amount: Rs.{order_total}</h3></td>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>


                        <hr className='my-3' />
                        <h3 className='text-decoration-underline'>Shipping Address</h3>
                        <h4>{user.username}</h4>
                        <h4>{shipping_info.shipping_address}</h4>
                        {shipping_info &&
                            <h4>{shipping_info.alternate_shipping_address}</h4>}
                        <h4>{shipping_info.city}, {shipping_info.zipcode}</h4>
                        <h4>{shipping_info.country}</h4>
                        <h4>{shipping_info.phone}</h4>
                        <hr className='my-3' />

                    </div>
                </div>

                <div className='col-md-4 border-start border-5 mt-3 text-start ps-5'>
                    <div className='p-3 shadow-lg'>
                        <h4 className='text-center mb-4'><u>Card Information</u></h4>
                        <label htmlFor='card-number' className='ms-2'>Card Number</label>
                        <CardNumberElement type='text' className='form-control' id='card-number' />
                        <label htmlFor='card-expiry' className='mt-2 ms-2'>Card Expiry Date</label>
                        <CardExpiryElement type='text' className='w-50 form-control' id='card-expiry' />
                        <label htmlFor='card-cvc' className='mt-2 ms-2'>Card CVC</label>
                        <CardCvcElement type='text' className='w-50 form-control' id='card-cvc' />
                        <button className='btn btn-warning mt-3 form-control' id="payBtn" onClick={makePayment}>Pay Now</button>
                    </div>

                </div>
            </div>


            <Footer />
        </div>
    )
}

export default Payment