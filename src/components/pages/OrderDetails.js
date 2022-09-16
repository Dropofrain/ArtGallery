import React, { useEffect } from 'react'
import { isAuthenticated } from '../../API/userAPI'
import { loadOrderDetails } from '../../redux/action/orderActions'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Usersidebar from '../layout/usersidebar'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Products2 from '../ProductsUserOrder'

const OrderDetails = () => {
    const { user, token } = isAuthenticated()
    const { order_id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadOrderDetails(order_id, token))
    }, [])

    const order = useSelector(state => state.orderDetail.order)
    console.log(order)

    return (
        <>
            <Navbar />

            <div classname='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Usersidebar />
                    </div>
                    <div className='col-md-9'>
                        <h1><u>Order Details</u></h1>
                        {
                            order &&
                            <>
                                <h3>Total Price: Rs.{order.totalOrderPrice}</h3>
                                <h3>Status: {order.status}</h3>
                                <h3>Order Items:</h3>
                                <div className='row row-cols-3'>
                                    {
                                        order.orderItemsIds.map((item, i) => {
                                            return <Products2 product={item.product} />
                                        })
                                    }
                                </div>
                            </>
                        }
                    <Link to='/user/order'>Go Back</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default OrderDetails