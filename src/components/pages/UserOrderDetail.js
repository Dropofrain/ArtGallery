import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { isAuthenticated } from '../../API/userAPI'
import { loadOrderDetails } from '../../redux/action/orderActions'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const UserOrderDetail = () => {
    const {order_id} = useParams()
    // const params = useParams()
    // const order_id = params.order_id

    const { token } = isAuthenticated()
    // const data = isAuthentication()
    //const token = data.token

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadOrderDetails(order_id, token))
    }, [])

    //const orderStore = useSelector(state=>state.orderDetail)
    //const order =  orderStore.data
    const order = useSelector(state => state.orderDetail.data)
    return (
        <>
            <Navbar />
            <div className='container mx-auto my-5 shadow-g p-5 text-center'>
                <h3 className='mb-3'>Order Details</h3>
                <hr className='mb-3' />
                {order &&
                    <div className='text-start ps-5'>
                        <h4>Order ID: <u>{order._id}</u></h4>
                        <h4>No. of Items: <u>{order.length}</u></h4>
                        <h4>Total Orders Price: <u>{order.totalOrderPrice}</u></h4>
                        <h4>Status: <u>{order.status}</u></h4>
                        <h4>Items: </h4>
                        {
                            order.orderItemsIds.map(item => {
                                return <div className="row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                                    <div className="col mb-4">
                                        <div className="card shadow-lg">
                                            <img src={`http://localhost:5000/${item.product.product_image}`} className="card-img-top" alt={item.product.product_name} />
                                            <div className="card-body text-center">
                                                <h5 className="card-title">{item.product.product_name}</h5>
                                                <h5 className="card-title">Price: RS.{item.product.product_price}</h5>
                                                <h5 className='card-title'>Quantity:{item.quantity}</h5>
                                                <p className="text-truncate">Description: {item.product.product_description}</p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                }

<Link to='/user/profile'>Go Back</Link>
            </div>
            <Footer />
        </>
    )
}
export default UserOrderDetail