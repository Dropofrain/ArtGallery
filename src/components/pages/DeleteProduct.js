import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, deleteProduct } from '../../API/productsAPI'
import { isAuthenticated } from '../../API/userAPI'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const DeleteProduct = () => {
    const {token} = isAuthenticated()
    const [product, setProduct] = useState('')
    const { id } = useParams()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        getProduct(id)
            .then(data => setProduct(data))
    }, [])

    const delete_product = () => {
        deleteProduct(id, token)
            .then(data => {
                if (data.error) {
                    setSuccess(false)
                    console.log(data.error)
                }
                else {
                    setSuccess(true)
                }
            })
    }

    return (
        <>
            <Navbar />

            <div className='container my-5 p-5 d-flex mx-auto shadow-lg'>
                <div className='img-container w-50'>
                    <img src={`http://localhost:5000/${product.product_image}`}
                        alt={product.product_name} className='w-100 h-100' />
                </div>
                <div className='product-info w-50 text-start p-5 mt-5 border-start border-3'>
                    <label htmlFor='product_name'>Product Name</label>
                    <h4>{product.product_name}</h4>
                    <label htmlFor='product_price'>Product Price</label>
                    <h4>{product.product_price}</h4>
                    <label htmlFor='product_desc'>Product Description</label>
                    <h4>{product.product_description}</h4>



                    <hr className='my-3' />
                    {
                        success ? 
                        <>
                        <div className='alert alert-success'> Product deleted Successfully</div>
                        <Link to='/' className='btn btn-secondary form-control mt-3'>Home</Link>
                        </>
                        :
                        <>
                    Are you sure, you want to delete this product?<br />
                    <button className='btn btn-danger form-control mt-3' onClick={delete_product}>Confirm Delete</button>
                        </>
                    }

                </div>
            </div>

            <Footer />
        </>
    )
}

export default DeleteProduct