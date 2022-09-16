import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct, updateProduct } from '../../API/productsAPI'
import { isAuthenticated } from '../../API/userAPI'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const UpdateProduct = () => {
    const {token} = isAuthenticated()
    const [product, setProduct] = useState({
        product_name: "",
        product_price: "",
        product_description: ""
    })
    const [success, setSuccess] = useState(false)

    const update_product = (e) => {
        e.preventDefault()
        updateProduct(id, product, token)
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

    const { product_name, product_price, product_description } = product
    const { id } = useParams()

    const handleChange = name => e => {
        setProduct({ ...product, [name]: e.target.value })
    }

    useEffect(() => {
        getProduct(id)
            .then(data => setProduct(data))
    }, [])

    return (
        <>
            <Navbar />

            <div className='container my-5 p-5 d-flex mx-auto shadow-lg'>
                <div className='img-container w-50'>
                    <img src={`http://localhost:5000/${product.product_image}`}
                        alt={product.product_name} className='w-100 h-100' />
                </div>
                <div className='product-info w-50 text-start p-5 mt-5 border-start border-3'>
                    <h3 className='text-decoration-underline'>Product Information</h3>

                    <label htmlFor='product_name'>Product Name</label>
                    <h4>{product.product_name}</h4>
                    <label htmlFor='product_price'>Product Price</label>
                    <h5>{product.product_price}</h5>
                    <label htmlFor='product_desc'>Product Description</label>
                    <h6>{product.product_description}</h6>

                    {
                        success ? 
                        <>
                        <div className='alert alert-success my-3'>Product Updated Successfully </div>
                        <Link to='/' className='btn btn-secondary form-control mt-3'>Go to Home</Link> 
                        </>
                        :
                            <form>
                                <hr className='my-3' />
                                <h3 className='text-decoration-underline'>Update Information</h3>
                                <label htmlFor='product_name'>Product Name</label>
                                <input type={'text'} className='form-control' value={product_name} onChange={handleChange('product_name')} />
                                <label htmlFor='product_price'>Product Price</label>
                                <input type={'text'} className='form-control' value={product_price} onChange={handleChange('product_price')} />
                                <label htmlFor='product_desc'>Product Description</label>
                                <input type={'text'} className='form-control' value={product_description} onChange={handleChange('product_description')} />

                                <button className='btn btn-warning form-control mt-3' onClick={update_product}>Confirm Update</button>
                            </form>

                    }
                </div>
            </div>

            <Footer />
        </>
    )
}

export default UpdateProduct