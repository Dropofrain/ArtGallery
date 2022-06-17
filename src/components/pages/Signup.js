import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { userRegister } from '../../API/userAPI'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const Signup = () => {
// to store name, email, password
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

// to display error or sucess
const [error, setError] = useState('')
const [success, setSuccess] = useState('')

//
const clickSubmit = (event) => {
event.preventDefault()
userRegister(name,email,password)
.then(data =>{
  if(data.error){
    setError(data.error)
    setSuccess('')
  }
  else{
    setSuccess("user registered sucessfully . verify to continue")
    setError('')
    setName('')
    setEmail('')
    setPassword('')

  }
})
.catch(error=>console.log(error))
}

const showError =() =>{
  if(error){
    return <div className='alert alert-dangar'>{error}</div>
  }
}

const showSuccess =() =>{
  if(success){
    return <div className='alert alert-success'>{success}</div>
  }
}
  return (
    <>
      <Navbar />
      {showError()}
      {showSuccess()}
      <main className="form-signin w-50 mx-auto my-5 shadow-lg p-5">
        <form>
          {/* <img className="mb-4" src="logo512.png" alt="" width="72" height="57" /> */}
          <h1 className="h3 mb-3 fw-normal">Register</h1>

          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="firstname" placeholder="user name" onChange={e=>setName(e.target.value)} />
            <label for="firstname">Name</label>
          </div>
  
          {/* <div className="form-floating mb-2">
            <input type="text" className="form-control" id="firstname" placeholder="first name" />
            <label for="firstname">First Name</label>
          </div>

          <div className="form-floating mb-2">
            <input type="text" className="form-control" id="lastname" placeholder="Last name" />
            <label for="lastname">Last Name</label>
          </div>  */}

           {/* <div className="form-floating mb-2">
            <input type="date" className="form-control" id="dob" placeholder="date of birth" />
            <label for="dob">Date of birth</label>
          </div> */}

         {/* <div className='form-floating mb-2'>
          <div classNameName='d-flex form-control '>
         
          <div classNameName="form-check">
            <input className="form-check-input mt-1 me-2" type="checkbox" value="" id="flexCheckDefault1" />
            <label className="form-check-label" for="flexCheckDefault1">
              Male
            </label>
          </div>
          <div classNameName="form-check">
            <input className="form-check-input mt-1 me-2" type="checkbox" value="" id="flexCheckDefault2" />
            <label className="form-check-label" for="flexCheckDefault2">
              female
            </label>
          </div>
          <div classNameName="form-check">
            <input className="form-check-input mt-1 me-2" type="checkbox" value="" id="flexCheckDefault3" />
            <label className="form-check-label" for="flexCheckDefault3">
              other
            </label>
          </div>
          </div>
          <lable> Gender</lable>
          </div> */}

          <div className="form-floating mb-2">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e=>setEmail(e.target.value)} />
            <label for="floatingInput">Email address</label>
          </div>

          <div className="form-floating mb-2">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            <label for="floatingPassword">Password</label>
          </div>

          {/* <div className="form-floating mb-2">
            <input type="password" className="form-control" id="floatingCPassword" placeholder="Confirm Password" />
            <label for="floatingPassword">Confirm Password</label>
          </div> */}

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" />I agree to the term and conditions.
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={clickSubmit}>Register</button>
          Already have an account.<Link to='/signin'>Sign in</Link> 

          {/* <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p> */}
        </form>
      </main>

      <Footer />
    </>
  )
}

export default Signup