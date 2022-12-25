import axios from "axios"
import { isAuthenticated } from "../../API/userAPI"
import { API } from "../../config"
import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL,MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ORDER_DETAILS_FAIL} from "../constants/orderConstants"

export const createOrder = (order) => async (dispatch) => {
    const { token } = isAuthenticated()
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        // POST datein to backend
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        // axios -> response.data
        //fetch -> response.json()
        // const { data } = await axios.post(`${API}/placeorder`, order, config)

        const data = await fetch(`${API}/placeorder`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },body:JSON.stringify(order)
        }).then(res=>res.json())

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    }

    catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.error
        })
    }
}



export const myOrder = (user_id, token) => async (dispatch, getState) => {
    const { token } = isAuthenticated()
    try {
        dispatch({
            type: MY_ORDER_REQUEST
        })

        // POST datein to backend
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        // axios -> response.data
        //fetch -> response.json()
        const { data } = await axios.get(`${API}/userorder/${user_id}`, config)

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data
        })
    }

    catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.error
        })
    }
}


export const loadOrderDetails = (order_id, token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        // POST date into backend
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.get(`${API}/orderdetails/${order_id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    }

    catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.error
        })
    }
}