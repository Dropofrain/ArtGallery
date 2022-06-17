import React from 'react'
import { createContext } from 'react'

export const GobalContext = createContext()

const GobalContextProvider = (props) => {


  return (
    <div>
        <GobalContext.Provider value = {"reactjs"}>
           
            {props.children}

        </GobalContext.Provider>
    </div>
  )
}

export default GobalContextProvider