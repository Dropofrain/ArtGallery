import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutProgress from '../CheckoutProgress'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import { Link } from 'react-router-dom'
import { saveShippingInfo } from '../../redux/action/cartActions'


const Shipping = () => {
    const cart_items = useSelector(state => state.cart.cartItem)
    const shipping_info = useSelector(state => state.cart.shippingInfo)
    const [total_order, setTotalOrder] = useState(0)
    const [total_price, setTotalPrice] = useState(0)

    const [shipping_add, setShippingAddress] = useState({
        shipping_address: '',
        alternate_shipping_address: '',
        city: '',
        country: '',
        phone: '',
        totalOrderPrice: '',
    })
    const { shipping_address, alternate_shipping_address, city, country, phone, totalOrderPrice }
        = shipping_add

    const dispatch = useDispatch()

    const handleShippingAddress = name => event => {
        setShippingAddress({ ...shipping_add, [name]: event.target.value })
    }

    const saveShippingInfo = (event) => {
        event.preventDefault()
        dispatch(saveShippingInfo(shipping_add))
    }

    useEffect(() => {
        let quantity_array = cart_items.map(item => { return item.quantity })
        let totalOrder = (quantity_array.reduce((acc, cur) => acc + cur))
        setTotalOrder(totalOrder)
        let price_array = cart_items.map(item => { return item.quanty * item.price })
        let totalPrice = price_array.reduce((acc, cur) => acc + cur)
        setTotalPrice(totalPrice)
        setShippingAddress({ ...shipping_add, totalOrderPrice: totalPrice })

    }, [])
    return (
        <>
            <Navbar />
            <div className='row  d-flex'>
                <div className='order-details col-md-3'>
                    <CheckoutProgress Shipping />
                    {
                        localStorage.getItem('shippinginfo') &&
                        <div className='mt-2 p-5 shadow-lg'>
                            <>
                                Shipping Address:
                                <p>{shipping_info.shipping_address}, {shipping_info.city}, {shipping_info.country}, Phone: {shipping_info.phone}</p>
                                <br />
                                Alternate Shipping Address:
                                <p>{shipping_info.shipping_address}, {shipping_info.city}, {shipping_info.country}, Phone: {shipping_info.phone}</p>
                               
                            </>

                        </div>
                    }
                    <form className='w-75 p-5 shadow-lg mx-auto mt-2'>
                        <h4 className='text-center mt-3'>Shipping Information</h4>
                        <hr />
                        <label htmlFor='street'>Street Address1:</label>
                        <input type={'text'} id='street' className='form-control' onChange={handleShippingAddress('shipping_address')} value={shipping_address} />
                        <label htmlFor='street'>Street Address2:</label>
                        <input type={'text'} id='street2' className='form-control' onChange={handleShippingAddress('alternate_shipping_address')} value={alternate_shipping_address} />
                        <label htmlFor='city'>City:</label>
                        <input type={'text'} id='city' className='form-control' onChange={handleShippingAddress('city')} value={city} />
                        {/* <label htmlFor='zipcode'>Zip code:</label>
                        <input type={'text'} id='zipcode' className='form-control' onChange={handleShippingAddress('zipcode')} value={zipcode} /> */}
                        <label htmlFor='country'>Country:</label>
                        <input type={'text'} id='country' className='form-control' onChange={handleShippingAddress('country')} value={country} />
                        <label htmlFor='phone'>Phone number:</label>
                        <input type={'text'} id='phone' className='form-control' onChange={handleShippingAddress('phone')} value={phone} />

                        <button className='btn btn-warning form-control mt-2' onClick={saveShippingInfo}> Save Shipping Info</button>
                    </form>
                    <hr className='my-3' />

                    <h4 className='text-center mt-3'>  order Detail</h4>
                    <table className='table text-center'>
                        <thead>
                            <tr>
                                <th >S.No</th>
                                <th >Product Image</th>
                                <th >Product Details</th>
                                <th>unit price</th>
                                <th>Number</th>
                                <th >total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart_items.map((item, i) => {
                                    return <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ "width": "100%" }} />
                                        </td>
                                        <td>
                                            <h4>{item.name}</h4>
                                        </td>
                                        <td>
                                            <h5>Rs. {item.price}</h5>

                                        </td>
                                        <td>
                                            <h4>{item.quantity}</h4>
                                        </td>
                                        <td>
                                            <h4>{item.quantity * item.price}</h4>
                                        </td>

                                        <td>
                                            <button className='btn btn-warning'>Update</button>
                                            <button className='btn btn-danger'>Remove</button>

                                        </td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>
                <div className='order-summery col-md-3  my-5 p-5 shadow-lg'>
                    <h4 className='mb-3'>Order Summary</h4>
                    <hr />
                    <h3 className='mb-2 mt-3'>Order Items:{total_order}</h3>
                    <h3 className='mb-2'>total_price:{total_price}</h3>
                    <hr />
                    <button className='btn btn-warning mt-3 form-control'>Proceed to Shipping</button>

                </div>
            </div>
            <Footer />


        </>
    )
}

export default Shipping