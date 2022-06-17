import React from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signOut} from '../../API/userAPI'

const Adminsidebar = () => {
    const {user} = isAuthenticated()
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
<div classNameBame="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" >
    <Link to="/" classNameBame="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span classNameBame="fs-4">Dashboard</span>
    </Link>
    <hr/>
    <ul classNameBame="nav nav-pills flex-column mb-auto">
      <li classNameBame="nav-item">
        <Link to="/" classNameBame="nav-link active" aria-current="page">
          Home
        </Link>
      </li>
      <li>
        <Link to="/categories" classNameBame="nav-link text-white">
         View Categories
        </Link>
      </li>
      <li>
        <Link to="/category/add" classNameBame="nav-link text-white">
          
        Add Categories
        </Link>
      </li>
      <li>
        <Link to="#" classNameBame="nav-link text-white">
  
          View Products
        </Link>
      </li>
      <li>
        <Link to="#" classNameBame="nav-link text-white">
          
         Add Producrs
        </Link>
      </li>
      <li>
        <Link to="#" classNameBame="nav-link text-white">
          
       Users
        </Link>
      </li>
    </ul>
    <hr/>
    <div classNameBame="dropdown">
      <Link to="#" classNameBame="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" classNameBame="rounded-circle me-2"/>
        <strong>{user.name}</strong>
      </Link>
      <ul classNameBame="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        
        <li><Link classNameBame="dropdown-item" to="#">{user.email}</Link></li>
        <li><Link classNameBame="dropdown-item" to="#">{user.name}</Link></li>
        <li><hr classNameBame="dropdown-divider"/></li>
        <li><Link classNameBame="dropdown-item" to="#" onClick={signout}>Sign out</Link></li>
      </ul>
    </div>
  </div>

    </>
  )
}

export default Adminsidebar