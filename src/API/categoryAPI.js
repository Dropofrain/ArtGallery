import { API } from "../config"

// to view all categories
export const viewCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(res => res.json())
    .catch(err => console.json(err))
}

// to add category
export const addCategory = ({ category_name }, token) => {
  return fetch(`${API}/addcategory`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "cpntent-Type": "application/json",
      Authorization: `Beater ${token}`
    },
    body: JSON.stringify(category_name)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

// to update category
export const updateCategory = (category_name, category_id, token) => {
  return fetch(`${API}/updatecategory/${category_id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "cpntent-Type": "application/json",
      Authorization: `Beater ${token}`
    },
    body: JSON.stringify(category_name)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

// to get category
export const getCategory = (category_id) => {
  return fetch(`${API}/findcategory/${category_id}`, {
    method: "GET"
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

// tp delete category
export const deleteCategory = (category_id,token) => {
  return fetch(`${API}/deletecategory/${category_id}`, {
    method: "DELETE",
    headers:{
      Accept:"application/json",
      "content-Type":"application/json",
      Authorization:`Bearer ${token}`
    }

  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
