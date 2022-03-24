import axios from '@/api/axios'

const register = credential =>{
    return axios.post('/users', {user:credential})
}

const login = credential =>{
    return axios.post('/users/login', {user:credential})
}

export default{
    register,
    login
}


//sdwdsadxxaaw11111@dasdad.asdad 1234567890