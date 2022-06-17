import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

const Navbar = () => {
//const item_store = useSelector(store=>store);
//const no_of_item = item_store.no_of_item;

const name_store = useSelector(store=>store.namestore);
  return (
    <>
    {/* <div className='Navbar'>
        <Link to='/'>Home</Link>
        <Link to='/cart'>Cart
        (no. of item)</Link>
        Name: {name_store.name}
        Address :{name_store.address}
    </div> */}
    </>
  )
}

export default Navbar