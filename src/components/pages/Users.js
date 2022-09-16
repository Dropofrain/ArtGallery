import React from 'react'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

export const Users = () => {
  
  return (
    <>
      <Navbar />

<div className='container mx-auto my-5 shadow-lg px-5 pb-5'>
        <h3 className='mt-5 border-bottom border-3 mb-5'> Total User</h3>
        <table className='table text-center align-middle shadow-lg my-3 p-3'>
          <thead>
            <tr>
              <td>S.no.</td>
              <td>Name</td>
              <td>Email</td>
              <td>Address</td>
              <td>Phone</td>
            </tr>
          </thead>
          <tbody>
          {/* <div className="card">
          <img src="img.jpg" alt="John" style={{ width: "100%" }} />
          <h1>John Doe</h1>
          <p className="title">CEO &amp; Founder, Example</p>
          <p>Harvard University</p> */}
             
          </tbody>
        </table>
      </div>

      <Footer />

    </>
  )
}
export default Users