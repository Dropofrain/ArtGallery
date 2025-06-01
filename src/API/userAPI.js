import { API } from "../config";
// API = http://localhost:5000/api

export const userRegister = (name, email, password) => {
  const user = { name, email, password };
  return (
    fetch(`${API}/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body : JSON.stringify({name, email, password})
      body: JSON.stringify(user),
    })
      // .the
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err))
  );
};

export const confirmation = (token) => {
  return fetch(`${API}/confirmuser/${token}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const signIn = (email, password) => {
  const user = { email, password };
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

// to user keep signed in
export const authenticate = (data, navigate) => {
  const user = data?.user;
  localStorage.setItem(`jwt`, JSON.stringify(data));
  if (user && user.role === 0) {
    return navigate("/user/profile");
  }
  if (user && user.role === 1) {
    return navigate("/admin/dashboard");
  }
};

//to check if user signed in to authentication
export const isAuthenticated = () => {
  if (localStorage.getItem(`jwt`)) {
    return JSON.parse(localStorage.getItem(`jwt`));
  } else {
    return false;
  }
};

// to signout
export const signOut = () => {
  localStorage.removeItem(`jwt`);
  return fetch(`${API}/signout`, {
    methout: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

// to forget password
export const ForgetPassword = (email) => {
  return fetch(`${API}/forgetpassword`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

// to resetPassword
export const resetPassword = (password, token) => {
  return fetch(`${API}/resetpassword/${token}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};
