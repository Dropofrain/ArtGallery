import React, { useState } from 'react'
import { ForgetPassword } from '../../API/userAPI'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'


export const Forgetpassword = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const clickSubmit = e => {
      e.preventDefault()
      ForgetPassword(email)
      .then(data=>{
          if(data.error){
              setError(data.error)
              setSuccess('')
          }
          else{
              setError('')
              setSuccess(data.message)
          }
      })
    }
  
    const showError = () =>{
      if(error){
          return <div className='alert alert-danger'>{error}</div>
      }
    }
    const showSuccess = () =>{
      if(success){
          return <div className='alert alert-success'>{success}</div>
      }
    }
    return (
        <>
            <Navbar />

            {showError()}
            {showSuccess()}
            <form className='w-50 mx-auto my-5 shadow-lg p-5'>
                <label htmlFor='email'>Email:</label>
                <input type={'text'} id='email' className='form-control' onChange={e => setEmail(e.target.value)} />
                <button className='btn btn-warning mt-2 form-control' onClick={clickSubmit}>Forget Password</button>
            </form>

            <Footer />
        </>
    )
}

export default Forgetpassword