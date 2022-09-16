import React from 'react'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'
import Usersidebar from '../layout/usersidebar'

const UserDashboard = () => {
  return (
    <>
      <Navbar/>

      <div classname='container-fluid'>
        <div className='row'>
          <div className='col-md-3'>
            <Usersidebar/>
          </div>
          <div className='col-md-9'>
            <h1>Hello welcome to dashboard for user side</h1>
            <img src="../images/12image.jpg" alt="" width="900" height="300" />
          </div>
        </div>
      </div>

      <Footer/>
    </>
  )
}

export default UserDashboard