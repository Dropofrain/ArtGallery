import React from 'react'
import { useDispatch } from 'react-redux'

const Item = () => {
    const dispatch = useDispatch()

    return (
    <div>
        <button onClick={()=>{
            dispatch({type:"INCREASE"})
        }}>INCREASE</button>
    

        <button onClick={()=>{
            dispatch({type:"DECREASE"})
        }}>DECREASE</button>

    </div>
  )
}

export default Item