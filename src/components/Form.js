// import React,{ useState }  from 'react'
// import { useDispatch } from 'react-redux'

// const Form = () => {
// const [name, setName] = useState('')
// const [address, setAddress] = useState('')
// const dispatch = useDispatch()
//   return (
//     <div>
//         <input type={'text'}onChange={(e)=>{
//             setName(e.target.value)}
//         }/>
//         <button onClick={()=>{
//             dispatch({type:"UPDATE_NAME",payload:name})
//         }}>update value</button>

//           <input type={"text"} onChange={(e)=>{
//            setAddress(e.target.value)}}/>
//           <button onClick={()=>{
//             dispatch({
//           type:"UPDATE_ADDRESS",payload: address})
//         }}>update address</button>

//     </div>
//   )
// }

// export default Form