import React, { useEffect } from 'react'
import { isAuthenticated } from '../../API/userAPI'
import { myOrder } from '../../redux/action/orderActions'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Usersidebar from '../layout/usersidebar'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const UserOrders = () => {
    const { user, token } = isAuthenticated()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(myOrder(user._id, token))
    }, [])
    console.log(user._id)

    const myOrders = useSelector(state => state.myOrder.orders)

    console.log(myOrders)
    return (
        <>
            <Navbar />

            <div classname='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Usersidebar />
                    </div>
                    <div className='col-md-9'>
                        <h4 className='text-center mt-3'><u>My Orders</u></h4>
                        <table className='table text-center w-75 mx-auto table-bordered table-hover shadow-lg mt-5'>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>No. of Items</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                        {
                            
                            myOrders &&
                            myOrders.map((item, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.orderItemsIds.length}</td>
                                    <td>{item.totalOrderPrice}</td>
                                    <td>{item.status}</td>
                                    <td><Link to={`/user/order/${item._id}`}>View Details</Link></td>
                                </tr>
                            })
                        }
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default UserOrders