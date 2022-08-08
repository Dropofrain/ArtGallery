import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, SAVE_SHIPPING_INFO } from "./constants/cartConstants"

const initiationData = {
    cartItems: [],
    shippingInfo: {}
}

export const cartReducer = (state=initiationData, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload
            const itemExists = state.cartItems.find(i => i.product === item.product)
            if (itemExists) { 
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === itemExists.product ? item : i)
                  

                }
            }
            else {
                return {
                    ...state,
                    cartItems : [...state.cartItems, item]
                }
            }


        case REMOVE_FROM_CART:
            console.log(action.payload)
            return {
                ...state,
                cartItems : state.cartItems.filter(i=>i.product!=action.payload.product)
            }
            
        case CLEAR_CART:
            return{
                ...state,
                cartItems : {}
            }

        case SAVE_SHIPPING_INFO  :
                return{
                    ...state,
                    shippingInfo: action.payload.shipping_info
                }

        default:
            return state

    }
}