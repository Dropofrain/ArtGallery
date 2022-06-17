import React from 'react'
import './products.css'

const Products = () => {
    return (
        <>
        <div className='container mx-auto mt-5'>
            <div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-4">
                <div className="col">
                    <div className="card shadow-lg">
                        <img src="./images/11image.jpg" className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h5 className="card-title">Card title</h5>
                                <button className='btn btn-warning'>view Details</button>
                        </div>
                    </div>
                </div>
          

          
                <div className="col">
                    <div className="card shadow-lg">
                        <img src="./images/12image.jpg" className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h5 className="card-title">Card title</h5>
                                <button className='btn btn-warning'>view Details</button>
                        </div>
                    </div>
                </div>
          

           
                <div className="col">
                    <div className="card shadow-lg">
                        <img src="./images/13image.jpg" className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h5 className="card-title">Card title</h5>
                                <button className='btn btn-warning'>view Details</button>
                        </div>
                    </div>
                </div>
           

          
                <div className="col">
                    <div className="card shadow-lg">
                        <img src="./images/15img.jpg" className="card-img-top" alt="..." />
                        <div className="card-body text-center">
                            <h5 className="card-title">Card title</h5>
                                <button className='btn btn-warning'>view Details</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}

export default Products