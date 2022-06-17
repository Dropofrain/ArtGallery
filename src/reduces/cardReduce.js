const initialData={
    name:'Ram',
    address :"Kathmandu"
}

const cardReduce = (state=initialData, action) =>
    {
    switch(action.type){
        case"UPDATE_NAME":
        return {...state, name:action.payload}

// ... -> rest operator , save previous state

        case"UPDATE_ADDRESS":
        return {...state, address:action.payload}

        default:
            return state
    }
}