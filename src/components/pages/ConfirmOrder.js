import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutProgress from '../CheckoutProgress'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const ConfirmOrder = () => {
    const cart_items = useSelector(state => state.cart.cartItem)
    const [total_order, setTotalOrder] = useState(0)
    const [total_price, setTotalPrice] = useState(0)

    useEffect(() => {
        let quantity_array = cart_items.map(item => {return item.quanty })
        let totalOrder = (quantity_array.reduce((acc,cur) => acc + cur))
        setTotalOrder(totalOrder)

        let price_array = cart_items.map(item =>{return item.quanty * item.price})
        let totalPrice = price_array.reduce((acc,cur)=>acc+cur)
        setTotalPrice(totalPrice)

    }, [])
    return (
        <>
            <Navbar />
            <div className='row  d-flex justify-content-evenly'>
                <div className='order-details col-md-8'>
                    <CheckoutProgress />
                    <h4 className='text-center mt-3'>  order Detail</h4>
                    <table className='table text-center'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Product Image</th>
                                <th>Product Details</th>
                                <th>unit price</th>
                                <th>Number</th>
                                <th >Total price</th>
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
                                            <h5>{item.name}</h5>
                                        </td>
                                        <td>
                                            <h5>Rs. {item.price}</h5>
                                        </td>
                                        <td>
                                            <h5>{item.quantity}</h5>
                                        </td>
                                        <td>
                                            <h5>Rs. {item.quantity * item.price}</h5>
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
                <div className='order-summary col-md-3  my-5 p-5 shadow-lg'>
                    <h4 className='mb-3'>Order Summary</h4>
                    <hr />
                    <h3 className='mb-2 mt-3'>Order Items:{total_order}</h3>
                    <h3 className='mb-2'>Total_price:{total_price}</h3>
                    <hr />
                    <Link to='/shipping'>
                    <button className='btn btn-warning mt-3 form-control'>Proceed to Shipping</button>
                    </Link>

                </div>
            </div>
            <Footer />


        </>
    )
}

export default ConfirmOrder