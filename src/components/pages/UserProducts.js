import React, { useState, useEffect } from 'react'
import { userProducts } from '../../API/productsAPI'
import { isAuthenticated } from '../../API/userAPI'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Usersidebar from '../layout/usersidebar'
import Products from '../Products'

const UserProducts = () => {
    const [product, setProduct] = useState([])
    const { user } = isAuthenticated()

    useEffect(() => {
        userProducts(user._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProduct(data)
                }
            })
    }, [])
    return (
        <>
            <Navbar />
            <div classname='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Usersidebar />
                    </div>
                    <div className='col-md-9'>
                        <h1>MY Products </h1>
                        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">

                            {
                                product.map((item, i) => {
                                    return <Products product={item} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default UserProducts