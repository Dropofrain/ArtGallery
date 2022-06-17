import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCategory, updateCategory } from '../../API/categoryAPI'
import { isAuthenticated } from '../../API/userAPI'
import Adminsidebar from '../layout/adminsidebar'
import Footer from '../layout/Footer'
import Navbar from '../layout/Navbar'

const EditCategory = () => {
    const { token } = isAuthenticated()
    const params = useParams()
    const category_id = params.category_id
    const [category, setCategory] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [prevCategory, setPrevCategory] = useState('')

    // useEffect()
    useEffect(() => {
        getCategory(category_id)
            .then(data => {
                if (data.error) {
                    setError(data.error)

                }
                else {
                    setPrevCategory(data)

                }
            })
            
    }, [success])


    const clickSubmit = (e) => {
        e.preventDefault()
        updateCategory(category, category_id)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                }
                else {
                    setSuccess('category update sucessfully')
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
            <Navbar />

            <div classname='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Adminsidebar />
                    </div>
                    <div className='col-md-9'>
                        <div className='container-w-5 mt-3'>
                            <h1>Update category</h1>
                            {showError()}
                            {showSuccess()}
                            <form>
                                <div className='mt-3 p-5'>
                                    <label>Category Name</label>
                                    <input type={'text'} className='disabled form-control' readOnly value={prevCategory.category_name} />

                                    {

                                        !success &&
                                        <>
                                            <label htmlFor='new_cat' >New Category Name:</label>
                                            <input type={'text'} className='form-control' onChange={e => setCategory(e.target.value)} />
                                            <button className='btn btn-warnning mt-2' onClick={clickSubmit}> Update Button</button>
                                        </>
                                    }

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default EditCategory