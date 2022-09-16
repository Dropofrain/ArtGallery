import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../../API/productsAPI'
import Adminsidebar from '../layout/adminsidebar'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Products from '../Products'

const ProductsAdmin = () => {
    const [Products, setProduct] = useState([])
    useEffect(() => {
        getProducts("CreatedAt",-1,1000)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                    setProduct(data)
                }
            })
            .catch(err => console.log(err))
    },[])
    return (
        <>

            <Navbar />

            <div classname='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Adminsidebar />
                    </div>
                    <div className='col-md-9'>
                        <h1>Products</h1>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Product Image</th>
                                    <th>Product description</th>
                                    <th>Count in stock</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Products.map((item, i) => {

                                        return <tr key={item._id}>

                                            <td>{i + 1}</td>
                                            <td>
                                                <img src={`http://localhost:5000/${item.product_image}`} alt={item.product_name} height='150px' />
                                            </td>
                                            <td>
                                                <h5>{item.product_name}</h5>
                                                <h5>Rs.{item.product_price}</h5>
                                                <p><h5>{item.product_description}</h5></p>

                                            </td>
                                            <td>
                                                {item.count_in_stock}
                                            </td>
                                            <td>
                                                <Link to={`/product/${item._id}`}><button className='btn btn-warning'>View Details</button></Link>
                                            </td>
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

export default ProductsAdmin