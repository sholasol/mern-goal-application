import axios from 'axios'

//we have added proxy to the package.json to enable us use http://localhost:5000
const API_URL = '/api/users/'

//register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + "login", userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout Service
const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    register,
    logout,
    login
}

export default authService