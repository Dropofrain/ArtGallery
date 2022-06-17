import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const Cart = () => {
  return (
      <>
    <Navbar/>
<div className='container mx-auto'>
    <h3 className='text-center'>Cart Item</h3>
    <hr />

    <table className='table text-center'>
        <thead>
<tr>
    <th width="10%">S.No</th>
    <th width="20%">Product Image</th>
    <th width="50%">Product Details</th>
    <th width="20%">Action</th>
</tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>
                    <img src='./images/4image.jpg' alt='image1' style={{"width":"100%"}}/>
                </td>
                <td>
                    <h4>Beautiful Girls</h4>
                    <h5>Rs.30000</h5>
                    <p>Beutiful Girls with nature</p>
                </td>
                <td></td>
                <td>
                    <button className='btn btn-warning'>Update</button>
                    <button className='btn btn-danger'>Remove</button>
                </td>
            </tr>

            <tr>
                <td>2</td>
                <td>
                    <img src='./images/3image.jpg' alt='image2' style={{"width":"100%"}}/>
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
            </tr>

            <tr>
                <td>3</td>
                <td>
                    <img src='./images/5image.jpg' alt='image3' style={{"width":"100%"}}/>
                </td>
                <td>
                    <h4>Girls</h4>
                    <h5>Rs.20000</h5>
                    <p>Girl with nature</p>
                </td>
                <td></td>
                <td>
                    <button className='btn btn-warning'>Update</button>
                 {/* <Link to ={`/category/update/${category_id}`}><button className='btn btn-warning'>UPDATE</button></Link>  */}
                    <button className='btn btn-danger'>Remove</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<Footer/>

    </>
  )
}

export default Cart