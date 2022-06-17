
import { API } from "../config"
// API = http://localhost:5000/api



export const userRegister = (name, email, password) => {
    const user = { name, email, password }
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        // body : JSON.stringify({name, email, password})
        body: JSON.stringify(user)
    })
        // .the
        .then((res) => { return res.json() })
        .catch(err => console.log(err))
}

export const signIn = (email, password) => {
    const user = { email, password }
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((res) => { return res.json() })
        .catch(err => console.log(err))
}




// to userkeep signed in
export const authenticate = (data) => {
    localStorage.setItem(`jwt`, JSON.stringify(data))
}

//to check if user signed in to authentication
export const isAuthenticated = () => {
    if (localStorage.getItem(`jwt`)) {
        return JSON.parse(localStorage.getItem(`JWT`))
    }
    else {
        return false
    }
}

// to signout
export const signOut = () => {
    localStorage.removetem(`JWT`)
    return fetch(`${API}/signout`, {
        methout: "GET"
    })
    .then(res=> res.json())
    .catch(err => console.log(err))
}