import React,{useState} from 'react'

const UserStateHook = () => {
  const [count, setCount] = useState(0)

  //const [state_variable, function] = useState(initial value)
  


    return (
    <>
    <h1>{count}</h1>
    </>
  )
}

export default UserStateHook