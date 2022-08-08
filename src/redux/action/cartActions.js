import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants"
import { API } from "../../config"
import axios from "axios"
import Shipping from "../../components/pages/Shipping"

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API}/productdetails/${id}`)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data._id,
            name: data.product_name,
            price: data.product_price,
            image: data.product_image,
            stock: data.count_in_stock,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`${API}/productdetails/${id}`)
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {
            product:id
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = (shipping_info) => async(dispatch, getState)=>{
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload:{
            shipping_info: shipping_info
        }
    })
    localStorage.setItem('shippingInfo', JSON.stringify(getState().cart.shippingInfo))
}


