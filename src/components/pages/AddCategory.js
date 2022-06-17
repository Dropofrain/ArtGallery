import React, { useState } from 'react'
import { addCategory } from '../../API/categoryAPI'
import { isAuthenticated } from '../../API/userAPI'
import Adminsidebar from '../layout/adminsidebar'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const AddCategory = () => {
    const [category, setCategory] = useState('')
    const[error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const {token} = isAuthenticated()

    const clickSubmit = (e) => {
        e.preventDefault()
        addCategory(category, token)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess(false)
                }
                else {
                    setSuccess(true)
                    setError('')
                }
            })
            .catch(err => console.log(err))
    }

    const showError = () => {
        if (error) {
            return <div className='alert alert-danger'>{error}</div>
        }
    }

    const showSuccess = () => {
        if (success) {
            return <div className='alert alert-success'>Category added successfully</div>
        }
    }

    return (
        <>
            <Navbar/>
            {showError()}
            {showSuccess()}

            <div classname='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 p-0'>
                        <Adminsidebar/>
                    </div>
                    <div className='col-md-9'>
                        <div className='container w-50 mt-5 p-5'>
                            <h1>Add Category</h1>
                            <form>
                                <label htmfor='category_name'> Category Name</label>
                                <input type={'text'} id='category_name' className='form-control' placeholder='ebter category name here' onChange={e => setCategory(e.target.value)} />
                                <button className='btn btn-warning form-control' onClick={clickSubmit}>Add Category</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}

export default AddCategory