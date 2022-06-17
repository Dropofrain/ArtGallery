import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, signOut } from '../../API/userAPI';
import './navbar.css';

const Navbar = () => {
    const user = isAuthenticated()
    const navigate = useNavigate()
    const signout = () => {
        signOut()
            .then(data => {
                console.log(data.message)
                navigate('/')
            })
    }

return (
    <>
        <div className='row pt-1 bg-dark'>
            <div className='col-md-3 text-center'>
                <Link className="navbar-brand fs-3 fw-bold text-white" to="/">Navbar</Link>
            </div>
            <div className='col-md-6'>

                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-warning" type="submit">Search</button>
                </form>
            </div>
            <div className='col-md-3 d-flex justify-content-evenly'>
                {!user &&
                    <>
                        <Link to='/signin'><i class="bi bi-box-arrow-in-left fs-3 fw-bold text-white"></i></Link>
                        <Link to='/signup'><i class="bi bi-person-plus-fill fs-3 fw-bold text-white"></i></Link>
                    </>
                }

                {
                    (!user || (user && user.role === 0)) &&
                    <Link to='/cart'><i class="bi bi-cart-plus fs-3 fw-bold text-white"></i></Link>
                }

                {
                    user && user.role === 0 &&
                    <>
                        <Link to=''><i class="bi bi-person.circle fs-3 fw-bold text-white "></i>
                        </Link>
                    </>
                }

                {
                    user && user.role === 1 &&
                    <>
                        <Link to='admin/dashboard'><i class="bi bi-speedometerfs-3 fw-bold text-white "></i>
                        </Link>
                    </>

                }
                {
                    user &&
                    <Link to=''> <i class="bi bi-box-arrow.right fs-3 fw-bold text-white"
                        onClick={signout}
                    ></i> </Link>

                }
            </div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-light bg-secondery">
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/services">Services</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/blogs">Blogs</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    </>
)
            }

export default Navbar;