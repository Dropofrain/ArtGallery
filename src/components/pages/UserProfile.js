import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../API/userAPI'
import { myOrder } from '../../redux/action/orderActions'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const UserProfile = () => {
  const { user, token } = isAuthenticated()

  const orders = useSelector(state => state.myOrder.orders)
  console.log("Orders", orders)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(myOrder(user._id, token))
  }, [])

  return (
    <>
      <Navbar />

      <div className='container mx-auto my-5 shadow-lg px-5 pb-5'>
        <h3 className='mt-5 border-bottom border-3 mb-5'>Order History</h3>
        <table className='table text-center align-middle shadow-lg my-3 p-3'>
          <thead>
            <tr>
              <td>S.no.</td>
              <td>Items</td>
              <td>Order Price</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              orders &&
              orders.map((orderItem, i) => {
                return <tr key={i}>
                  <td>{i + 1}</td>
                  <td> </td>
                  <td>
                    {orderItem.orderItemsIds.map((item, i) => {
                      return <h5>{item.product.product_name}</h5>
                    })}
                  </td>
                  <td>
                    {orderItem.status}
                  </td>
                  <td>Rs. {orderItem.totalOrderPrice}</td>
                  <td>{orderItem.status}</td>
                  <td><Link to={`/orderdetails/${orderItem._id}`}> View Details </Link> </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  )
}

export default UserProfile