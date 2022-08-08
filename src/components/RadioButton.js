import { FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { Prices } from './prices'

const RadioButton = (handleFilters) => {
    const handleChange = (e) => {
        console.log(e.target.value)
        handleFilters(e.target.value, 'product_price')
    }
    return (
        <>
            <Typography variant='h4' color='secondary' mt={5} pt={5} >Prices</Typography>

            <RadioGroup>

                {
                    Prices.map(price => {
                        return <FormControlLabel key={price.id} value={price.id} control={<Radio />} label={price.name} onChange={handleChange} />

                    })
                }
            </RadioGroup>
        </>
    )
}

export default RadioButton