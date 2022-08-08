import {API} from '../config'

export const getProducts = (sortBy, order, limit) =>{
return fetch(`${API}/productlist`,{
    method: "GET"

})
.then(res=>res.json())
.catch(err=>console.log(err))
}

export const addProduct = (product, token) => {
    return fetch(`${API}/addproduct`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${token}`
        },
        body:product
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const filterProduct = (sortBy, order, limit, skip, filters)=>{
    return fetch(`${API}/filterproduct`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filters)
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const findProduct = (product_id) =>{
    return fetch(`${API}/productdetails/${product_id}`,{
        method:"GET"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}

export const findRelated= (product_id) =>{
    return fetch(`${API}/findrelated/${product_id}`,{
        method:"GET"
    })
    .then(res=>res.json())
    .catch(err=>console.log(err))
}