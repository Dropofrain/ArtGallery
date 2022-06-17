import { combineReducers } from "redux"
import itemReducer from "./itemReducer"




const rootReducer = combineReducers({
    itemStore: itemReducer,
    cartStore: cardReduce
})
export default rootReducer