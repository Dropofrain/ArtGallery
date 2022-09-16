import React from 'react'
//import { Link } from 'react-router-dom'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addItemToCart, removeItemFromCart } from '../../redux/action/cartActions'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const Cart = () => {
    const cart_items = useSelector(state => state.cart.cartItems)
    const dispatch = useDispatch()

    const increaseQuantity = (id, quantity, stock) => {
        let new_quantity = quantity + 1
        if (new_quantity > stock) {
            toast.error('cannot increase quantity more then stock')
            return
        }
        else {
            dispatch(addItemToCart(id, new_quantity))
            toast.success('quantity increased')
        }
    }

    const deacreaseQuantity = (id, quantity) => {
        let new_quantity = quantity - 1
        if (new_quantity <= 0) {
            toast.error('cannot decrease quantity . Remove item instead')
            return
        }
        else {
            dispatch(addItemToCart(id, new_quantity))
            toast.success('quantity decreased')
        }
    }
    const removeFromCart = (id, name) => {
        dispatch(removeItemFromCart(id))
        toast.success(name + 'remove from cart')
        toast.success(`${name} remove from cart`)
    }


    return (
        <>
            <ToastContainer theme='colored' position='top-right' />
            <Navbar />
            <div className='container mx-auto'>
                <h3 className='text-center'>Cart Item</h3>
                <hr />

                <table className='table text-center align-middle'>
                    <thead>
                        <tr>
                            <th width="10%">S.No</th>
                            <th width="20%">Product Image</th>
                            <th width="50%">Product Details</th>
                            <th>Price</th>
                            <th width="20%">Action</th>
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
                                        {/* <h6>{item.description}</h6> */}
                                        {/* <p>Beutiful Girls with nature</p> */}
                                    </td>
                                    <td>
                                        <h5>Rs. {item.price}</h5>
                                    </td>
                                    {/* <td >
                                        <div className='d-flex'>
                                            <button className='btn btn-danger' onClick={() => deacreaseQuantity(item.product, item.quantity)}>-</button>
                                            <input className='px-2 text-center' type='text' value={item.quantity} readOnly style={{ width: '50px' }} />
                                            <button className='btn btn-info' onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                        </div>
                                    </td> */}
                                    <td>

                                        <button className='btn btn-danger' onClick={() => removeFromCart(item.product, item.name)}>  <i class="bi bi-trash"></i></button>

                                    </td>
                                </tr>
                            })
                        }


                        {/* <tr>
                            <td>2</td>
                            <td>
                                <img src='./images/3image.jpg' alt='image2' style={{ "width": "100%" }} />
                            </td>
                            <td>
                                <h4>Eye</h4>
                                <h5>Rs.40000</h5>
                                <p>Drawing of Beautiful eye</p>
                            </td>
                            <td></td>
                            <td>
                                <button className='btn btn-warning'>Update</button>
                                <button className='btn btn-danger'>Remove</button>
                            </td>
                        </tr> */}

                        {/* <tr>
                            <td>3</td>
                            <td>
                                <img src='./images/5image.jpg' alt='image3' style={{ "width": "100%" }} />
                            </td>
                            <td>
                                <h4>Girls</h4>
                                <h5>Rs.20000</h5>
                                <p>Girl with nature</p>
                            </td>
                            <td></td>
                            <td>
                                <button className='btn btn-warning'>Update</button>
                                 <Link to ={`/category/update/${category_id}`}><button className='btn btn-warning'>UPDATE</button></Link>  
                                <button className='btn btn-danger' >Remove</button>
                            </td>
                        </tr> */}


                    </tbody>
                </table>



                <div className='container mx-auto my-3'>
                    <Link to='/confirmorder' className='btn btn-warning'>Confime Order</Link>
                </div>
            </div>

            <Footer />

        </>
    )
}

export default Cart