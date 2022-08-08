import React from 'react'
import { Link } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import './products.css'

const Products = ({ product }) => {
    console.log(product)
    return (
        <>

            <div className="col mb-4">
                 <div className="card shadow-lg">
                    <img src={`http://localhost:5000/${product.product_image}`} className="card-img-top" alt={product.product_name} />
                    <div className="card-body text-center">
                        <h5 className="card-title">{product.product_name}</h5>
                        <h5 className="card-title">{product.product_price}</h5>
                        <p className="text-truncate">{product.product_description}</p>

                        <Link to={`/product/${product._id}`}>
                            <button className='btn btn-warning'>view Details</button>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Products