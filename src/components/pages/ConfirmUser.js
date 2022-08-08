import { ConfirmationNumber, FormatQuoteRounded } from '@mui/icons-material'
import React, { useState, Confirmation, params, success, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { confirmation } from '../../API/userAPI'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'


const ConfirmUser = () => {
    // to get values from url
    const params= useParams()
    const token = params.token
    
    // to check sucess or error
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    //call api function
    useEffect(()=>{
        confirmation(token)
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setSuccess(data.message)
            }

        })
        .catch(err=>console.log(err))
    },[params]) 

    // to display error or sucess message
    const showError = () =>{
        if(error){
            return <div className='alert alert-danger'>{error}</div>
        }
        }
    const showSuccess = () =>{
        if(success){
                return<div className='alert alert-success'>{success}</div>
        }
    }
  return (
      <>
      <Navbar/>
{showError()}
{showSuccess()}
<Footer/>
      </>
   
  )
}

export default ConfirmUser