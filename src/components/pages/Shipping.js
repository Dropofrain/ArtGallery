import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutProgress from '../CheckoutProgress'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify'
import { saveShippingInfo } from '../../redux/action/cartActions'
import { isAuthenticated } from '../../API/userAPI'
import { createrOrder } from '../../redux/action/orderActions'
// import { saveShippingInfo } from '../../redux/action/cartActions'



const Shipping = () => {
    const cart_items = useSelector(state => state.cart.cartItems)
    const shipping_info = useSelector(state => state.cart.shippingInfo)
    const [total_order, setTotalOrder] = useState(0)
    const [total_price, setTotalPrice] = useState(0)
    const {user} = isAuthenticated()

    const navigate = useNavigate()

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

    let order = {
        orderItems: cart_items,
        user: user._id,
        shipping_address: shipping_info.shipping_address,
        alternate_shipping_address: shipping_info.alternate_shipping_address,
        city: shipping_info.city,
        country: shipping_info.country,
        phone: shipping_info.phone
        //totalOrderPrice: totalprice
    }
    const handleShippingAddress = name => event => {
        setShippingAddress({ ...shipping_add, [name]: event.target.value })
    }

    const saveShippingInfoHandle = (event) => {
        event.preventDefault()
        dispatch(saveShippingInfo(shipping_add))
        toast.success('Shipping address saved')
    }

    useEffect(() => {
        let quantity_array = cart_items.map(item => { return item.quantity })
        let totalOrder = (quantity_array.reduce((acc, cur) => acc + cur))
        setTotalOrder(totalOrder)
        let price_array = cart_items.map(item => { return item.price })
        let totalPrice = price_array.reduce((acc, cur) => acc + cur)
        setTotalPrice(totalPrice)
        setShippingAddress({ ...shipping_add, totalOrderPrice: totalPrice })

    }, [])

    const confirmOrder = e => {
        e.preventDefault()
        dispatch(createrOrder(order))

        toast.success("your order has placed successfully")
        localStorage.removeItem("cartItems")
        setTimeout(() => {
            navigate('/')
        }, 3000);

    }
    return (
        <>
            <ToastContainer theme='colored' position='top-left' />
            <Navbar />
            <div className='row  d-flex'>
                <div className='form-signin mx-auto my-5 shadow-lg p-5' style={{ width: "60%" }}>
                    <div className='order-details  '>
                        <CheckoutProgress Shipping />
                        <hr className='my-3' />

                        <h4 className='text-center mt-3'>Order Detail</h4>
                        <table className='table text-center'>
                            <thead>
                                <tr>
                                    <th >S.No</th>
                                    <th >Product Image</th>
                                    <th >Product Details</th>
                                    {/* <th>unit price</th>
                                <th>Number</th> */}
                                    {/* <th >Price</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart_items.map((item, i) => {
                                        return <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ "height": "150px" }} />
                                            </td>
                                            <td>
                                                <h4>{item.name}</h4>
                                                <h5>Rs. {item.price}</h5>

                                            </td>
                                            {/* <td>
                                            <h4>{item.quantity}</h4>
                                        </td>
                                        <td>
                                            <h4>{item.quantity * item.price}</h4>
                                        </td> */}

                                            {/* <td>
                                                <button className='btn btn-warning'>Update</button>
                                                <button className='btn btn-danger'>Remove</button>

                                            </td> */}
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='order-summery col-md-9 text-center my-5 p-5 shadow-lg' style={{ width: "40%" }}>
                    <h4 className='mb-3'>Order Summary</h4>
                    <hr />
                    {/* <h3 className='mb-2 mt-3'>Order Items:{total_order}</h3> */}
                    <h3 className='mb-2'>Price:{total_price}</h3>
                    <hr />


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

                        <button className='btn btn-warning form-control mt-2' onClick={saveShippingInfoHandle}> Save Shipping Info</button>

                        {
                            localStorage.getItem('shippingInfo') &&
                            <div className='mt-2 p-5 shadow-lg'>
                                <>
                                    <h4>Shipping Address:</h4>
                                    <p>{shipping_info.shipping_address}, {shipping_info.city}, {shipping_info.country}, Phone: {shipping_info.phone}</p>
                                    <br />
                                    Alternate Shipping Address:
                                    <p>{shipping_info.shipping_address}, {shipping_info.city}, {shipping_info.country}, Phone: {shipping_info.phone}</p>

                                </>

                            </div>
                        }
                    </form>

                    <Link to="/Payment">
                    <button className='btn btn-warning mt-3 form-control'>Proceed to Payment</button>
                    </Link>
                </div>
                {/* <div className='container mx-auto my-3'>
                    <Link to='/confirmorder' className='btn btn-warning'>Confime Order</Link>
                </div> */}

            </div>
            <Footer />


        </>
    )
}

export default Shipping