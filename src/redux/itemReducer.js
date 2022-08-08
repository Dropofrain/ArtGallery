const initialData ={
    no_of_items: 100
}

const itemReducer = (state=initialData) => {
    switch(action.type){
        case "INCREASE":
            return{no_of_item:++state.no_of_items}
        case "DECREASE":
            return{no_of_item:--state.no_of_items}
        case "RESET":
            return{no_of_item:100}
            default:
                return state
    }
 
}
export default itemReducer