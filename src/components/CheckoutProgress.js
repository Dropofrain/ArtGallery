import React from 'react'
import { Link } from 'react-router-dom'


const CheckoutProgress = ({Shipping, Payment}) => {
    return (
        <>
            <div className='container d-flex my-3 mx-auto justify-content-evenly'>
                <Link to='/cart'>
                    <button className='btn btn-danger'>Back to card</button>
                </Link>
                <Link to='/confirmOrder'>
                    <button className='btn btn-warning'>confirm Order</button>
                </Link>
                {
                   Shipping ? <Link to='/shipping'><button className='btn btn-warning'>Shipping</button></Link> :
                        <button className='btn btn-warning disabled'>Back to card</button>
                }

                {
                    Payment ? <Link to ='/Payment'><button className='btn btn-waring'>Payment</button></Link>:
                        <button className='btn btn-warning disabled'>Payment</button>
                }
            </div>
        </>
    )
}

export default CheckoutProgress