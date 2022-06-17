import React from 'react'
import { Link } from 'react-router-dom'
import './Second.css'

const Second = () => {
  return (
    <>
        This is second compoment.
        <link className='custom-link' to='/'style={{"color":"red","fontSize":"30px"}}>Goto first pages</link>
        {/* JSON format- {"key":"value"} */}
    </>
  )
}

export default Second