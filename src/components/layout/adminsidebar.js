import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signOut } from "../../API/userAPI";

const Adminsidebar = () => {
  const { user } = isAuthenticated();
  const navigate = useNavigate();
  const signout = () => {
    signOut().then((data) => {
      console.log(data.message);
      navigate("/");
    });
  };
  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Dashboard</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">
              Home
            </Link>
          </li>
          <li>
            <Link to="/categories" className="nav-link text-white">
              View Categories
            </Link>
          </li>
          <li>
            <Link to="/category/add" className="nav-link text-white">
              Add Categories
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="nav-link text-white">
              View Products
            </Link>
          </li>
          <li>
            <Link to="/admin/product/add" className="nav-link text-white">
              Add Products
            </Link>
          </li>
          <li>
            <Link to="/admin/user-management" className="nav-link text-white">
              User Management
            </Link>
          </li>
          {/* <li>
            <Link to="/user/order" className="nav-link text-white">

              My Orders
            </Link>
          </li> */}
        </ul>
        <hr />
        <div className="dropdown">
          <Link
            to="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/> */}
            <strong>{user.name}</strong>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <Link className="dropdown-item" to="#">
                {user.email}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                {user.name}
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="#" onClick={signout}>
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Adminsidebar;
