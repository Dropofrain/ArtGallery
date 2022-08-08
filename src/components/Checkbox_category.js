import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { viewCategories } from '../API/categoryAPI'

 const Checkbox_category = ({handleFilters}) => {
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])

    const handleChange = (e) => {
        const new_checked_categories = [...checked]
        const new_category = e.target.value

        //check if new_category is already in checked_categories
        //mobile, laptop, household, beauty -> new_checked_categories
        //new_category -> laptop
        
        const index = new_checked_categories.findIndex(category=>category===new_category)
        // if found return index, else return -1
        if (index === -1) {
            new_checked_categories.push(new_category)
        }
        else {
            new_checked_categories.splice(index,1)
        }
        setChecked(new_checked_categories)
        console.log(new_checked_categories)
        handleFilters(new_checked_categories, 'category')
    }

    useEffect(() => {
        viewCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                }
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Typography variant='h4' color='secondary' pl={5} pt={5} >Department</Typography>
            <Box pt={5} textAlign={'left'}>
                {
                    categories.map(category => {
                        return <FormControlLabel control={<Checkbox />} label={category.category_name} value={category._id} onChange={handleChange} />
                    })
                }


            </Box>
        </>
    )
}

export default Checkbox_category
