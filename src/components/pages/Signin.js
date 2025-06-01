import React, { useState } from "react";
import { Link, navigate, useNavigate } from "react-router-dom";
import { authenticate, isAuthenticated, signIn } from "../../API/userAPI";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const Signin = () => {
  const { user } = isAuthenticated();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // for sucess or error
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  const clickSubmit = (e) => {
    e.preventDefault();
    signIn(email, password)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
          authenticate(data, Navigate);
        }
      })
      .catch((err) => console.log(err));
  };

  // to display error or success message
  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };

  //   const showSuccess = () => {
  //     if (success) {
  //       if (user && user.role === 0) {
  //         return Navigate("/user/profile");
  //       }
  //       if (user && user.role === 1) {
  //         return Navigate("/admin/dashboard");
  //       }
  //     }
  //   };

  return (
    <>
      <Navbar />
      {showError()}
      {/* {showSuccess()} */}

      <main className="form-signin w-50 mx-auto my-5 shadow-lg p-5">
        <form>
          <div className="text-center">
            <h3 className="h3 mb-3 fw-normal">Login page</h3>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={clickSubmit}
            >
              Sign in
            </button>
            <br />
            If you forget the password
            <Link to="/forgetpassword">Forget Password</Link>
            <br />
            Do not have an account. Plz register new account{" "}
            <Link to="/signup">Register</Link>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
};

export default Signin;
