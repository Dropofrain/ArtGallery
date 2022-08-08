import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { resetPassword } from '../../API/userAPI'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'


export const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const {token} = useParams()
    const clickSubmit = e => {
      e.preventDefault()
      resetPassword(password, token)
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
                <label htmlFor='password'>password:</label>
                <input type={'text'} id='password' className='form-control' onChange={e => setPassword(e.target.value)} />
                <button className='btn btn-warning mt-2 form-control' onClick={clickSubmit}>Reset Password</button>
            </form>

            <Footer />
        </>
    )
}

export default ResetPassword